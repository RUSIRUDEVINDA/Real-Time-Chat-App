const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const { Redis } = require("@upstash/redis")
const { nanoid } = require("nanoid")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: path.join(__dirname, "../.env") })

const app = express()
app.use(cors())
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST"],
    },
})

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const ROOM_TTL_SECONDS = 60 * 10 // 10 minutes

// REST Routes
app.post("/api/room/create", async (req, res) => {
    try {
        const roomId = nanoid()

        await redis.hset(`meta:${roomId}`, {
            connected: JSON.stringify([]),
            createdAt: Date.now(),
        })

        await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS)

        res.json({ roomId })
    } catch (error) {
        console.error("Error creating room:", error)
        res.status(500).json({ error: "Failed to create room" })
    }
})

// Socket.io Logic
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id)

    socket.on("join-room", async (roomId) => {
        socket.join(roomId)
        console.log(`User ${socket.id} joined room ${roomId}`)

        // Send initial TTL
        const ttl = await redis.ttl(`meta:${roomId}`)
        socket.emit("ttl-update", { ttl })
    })

    socket.on("update-ttl", async ({ roomId, seconds }) => {
        try {
            await redis.expire(`meta:${roomId}`, seconds)
            io.to(roomId).emit("ttl-update", { ttl: seconds })
            console.log(`Room ${roomId} TTL updated to ${seconds}s`)
        } catch (error) {
            console.error("Error updating TTL:", error)
        }
    })

    socket.on("destroy-room", async (roomId) => {
        try {
            await redis.del(`meta:${roomId}`)
            io.to(roomId).emit("room-destroyed")
            console.log(`Room ${roomId} destroyed`)
        } catch (error) {
            console.error("Error destroying room:", error)
        }
    })

    socket.on("send-message", (data) => {
        const { roomId, message, username } = data
        const messageData = {
            id: nanoid(),
            text: message,
            sender: username,
            timestamp: Date.now(),
        }
        io.to(roomId).emit("receive-message", messageData)
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id)
    })
})

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
