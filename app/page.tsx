"use client"

import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { client } from "./api/lib/client"
import { nanoid } from "nanoid"

const ANIMAL = ["Lion", "Tiger", "Bear", "Wolf", "Fox", "Eagle", "Shark", "Dolphin"]
const STORAGE_KEY = "chat_username"

const generateUsername = () => {
  const word = ANIMAL[Math.floor(Math.random() * ANIMAL.length)]
  return `anonymous-${word}-${nanoid(5)}`
}

export default function Home() {
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      // schedule state update
      setTimeout(() => setUsername(stored), 0)
    } else {
      const newName = generateUsername()
      localStorage.setItem(STORAGE_KEY, newName)
      setTimeout(() => setUsername(newName), 0)
    }
  }, [])


  // create room mutation, mutation means action that changes data on server
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post()
      console.log("Room create response:", res)

      if (res.status === 200) {
        if (!res.data?.roomId) {
          console.error("No roomId in response data:", res.data)
          return
        }
        router.push(`/room/${res.data.roomId}`)
      } else {
        console.error("Room create failed:", res)
      }
    },
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            {">"}private_chat
          </h1>
          <p className="text-zinc-500 text-sm">A private, self-destructing chat room.</p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Your Identity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>

            <button
              onClick={() => mutate()}
              disabled={!username}
              className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 transition-colors mt-2 disabled:opacity-50"
            >
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}