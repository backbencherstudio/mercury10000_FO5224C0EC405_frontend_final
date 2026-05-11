// "use client"

// import { APP_CONFIG } from "@/lib/constants"
// import { useAuth } from "@/redux/features/auth/useAuth"
// import { useAppDispatch } from "@/redux/store"
// import { PropsWithChildren, useEffect, useMemo, useRef } from "react"
// import { io, Socket } from "socket.io-client"
// // import { useGetMeQuery } from "../auth/authApi"
// import { initSocket } from "./socketListeners"

// export const isDevEnv = () => {
//     return process.env.NODE_ENV === 'development';
// };

// export function SocketProvider({ children }: PropsWithChildren) {
//     const { token, isAuthenticated } = useAuth()
//     const dispatch = useAppDispatch()

//     const socketRef = useRef<Socket | null>(null)
//     // const { data } = useGetMeQuery()

//     // const userId = useMemo(() => data?.id, [data])

//     useEffect(() => {
//         if (!isAuthenticated || !token) return
//         if (socketRef.current) return // Prevent duplicate connections

//         const socket = io(APP_CONFIG.socketUrl, {
//             auth: { token: token },
//             // query: { userId: userId },
//             extraHeaders: {
//                 authorization: `Bearer ${token}`,
//             },
//         })

//         if (isDevEnv()) {
//             socket.on("connect", () => {
//                 console.log("Socket connected:", socket.id)
//             })

//             socket.on("disconnect", () => {
//                 console.log("Socket disconnected")
//             })

//             socket.on("connect_error", (err) => {
//                 console.error("Socket error:", err.message)
//             })

//             socket.onAny((event, data) => {
//                 console.log("=============== Event:", event, "====================")
//                 console.log("Payload:", data)
//             })

//             socket.on("error", (err) => {
//                 console.error(err.message)
//             })
//         }

//         socketRef.current = socket
//         // initSocket(socket, dispatch)

//         return () => {
//             socket.disconnect()
//             socketRef.current = null
//         }
//     }, [dispatch, isAuthenticated, token, userId])

//     return <>{children}</>
// }
