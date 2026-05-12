import { AppDispatch, store } from "@/redux/store"
import { Socket } from "socket.io-client"
import { NotificationApi } from "@/redux/features/notification/notification"

interface INotification {
    id: string;
    sender_id: string;
    receiver_id: string;
    entity_id: string;
    created_at: string;
    sender?: {
        name: string;
        email: string;
        avatar?: string;
    };
    notification_event?: {
        message?: string;
    };
}

// const updateNotification = (payload: any) => {
//     // Assuming the socket sends the notification object directly or wrapped in data
//     const newNotification: INotification = payload.data || payload;

//     store.dispatch(
//         NotificationApi.util.updateQueryData("getSocketNotification", {}, (draft) => {
//             if (!draft?.data) {
//                 draft.data = [newNotification];
//                 return;
//             }

//             const exists = draft.data.some((n: any) => n.id === newNotification.id);
//             if (exists) return;

//             draft.data.unshift(newNotification);
//         })
//     )
// }

const updateNotification = (payload: any) => {
    const newNotification = payload?.data || payload;

    store.dispatch(
        NotificationApi.util.updateQueryData(
            "getSocketNotification",
            undefined,
            (draft: any) => {

                if (!draft.data) {
                    draft.data = [];
                }

                const exists = draft.data.some(
                    (item: any) => item.id === newNotification.id
                );

                if (!exists) {
                    draft.data.unshift(newNotification);
                }
            }
        )
    );
};

export const initSocket = (socket: Socket, dispatch: AppDispatch) => {
    socket.on("receiveNotification", updateNotification)
}
