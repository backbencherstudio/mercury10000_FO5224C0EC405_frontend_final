// "use client";

// import React, {
//     createContext,
//     useContext,
//     useEffect,
//     useRef,
// } from "react";

// import { io, Socket } from "socket.io-client";
// import { CookieHelper } from "@/helper/cookie.helper";

// interface SocketContextType {
//     socket: Socket | null;
// }

// const SocketContext =
//     createContext<SocketContextType>({
//         socket: null,
//     });

// export const useSocket = () =>
//     useContext(SocketContext);

// export default function SocketProvider({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const socketRef = useRef<Socket | null>(
//         null
//     );

//     useEffect(() => {
//         if (socketRef.current) return;

//         const SOCKET_URL =
//             process.env.NEXT_PUBLIC_SOCKET_URL;

//         if (!SOCKET_URL) return;

//         const token = CookieHelper.get({
//             key: "accessToken",
//         });

//         socketRef.current = io(SOCKET_URL, {
//             transports: ["websocket"],
//             query: token
//                 ? { token }
//                 : undefined,
//         });

//         socketRef.current.on(
//             "connect",
//             () => {
//                 console.log("connected");
//             }
//         );

//         return () => {
//             socketRef.current?.disconnect();
//             socketRef.current = null;
//         };
//     }, []);

//     return (
//         <SocketContext.Provider
//             value={{
//                 socket: socketRef.current,
//             }}
//         >
//             {children}
//         </SocketContext.Provider>
//     );
// }