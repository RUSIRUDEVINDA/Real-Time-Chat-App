"use client"

import React from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Content */}
            <div className="relative w-full max-w-md bg-zinc-950 border border-red-900/50 shadow-[0_0_50px_-12px_rgba(220,38,38,0.5)] p-6 font-mono animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">⚠️</span>
                    <h2 className="text-red-500 font-black text-lg uppercase tracking-tighter">
                        {title}
                    </h2>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-l-2 border-zinc-800 pl-4">
                    {message}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 py-3 text-xs font-bold uppercase tracking-widest border border-zinc-800 transition-all active:scale-95"
                    >
                        Abort
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                    >
                        Confirm Destruction
                    </button>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500" />
            </div>
        </div>
    )
}
