"use client"



import { PropsWithChildren, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { initSocket } from "./Listener"
import { useAppDispatch } from "@/redux/hooks"
import { StorageHelper } from "@/helper/storage.helper"

export const isDevEnv = () => {
    return process.env.NODE_ENV === 'development';
};

export function SocketProvider({ children }: PropsWithChildren) {
    const token = StorageHelper.getAccessToken()
    const dispatch = useAppDispatch()

    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        if (!token) return
        if (socketRef.current) return // Prevent duplicate connections

        const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
            auth: { token: token },
            // query: { userId: userId },
            extraHeaders: {
                authorization: `Bearer ${token}`,
            },
        })

        if (isDevEnv()) {
            socket.on("connect", () => {
                console.log("Socket connected:", socket.id)
            })

            socket.on("disconnect", () => {
                console.log("Socket disconnected")
            })

            socket.on("connect_error", (err) => {
                console.error("Socket error:", err.message)
            })

            socket.onAny((event, data) => {
                console.log("=============== Event:", event, "====================")
                console.log("Payload:", data)
            })

            socket.on("error", (err) => {
                console.error(err.message)
            })
        }

        socketRef.current = socket
        initSocket(socket, dispatch)

        return () => {
            socket.disconnect()
            socketRef.current = null
        }
    }, [dispatch, token])

    return <>{children}</>
}
