import { AppDispatch, store } from "@/redux/store"
import { INotificatinListItem, WithApiStatus } from "@/types"
import { Socket } from "socket.io-client"
// import notificationApi from "../dashboard/notificationApi"

const updateNotification = ({ data }: WithApiStatus<INotificatinListItem>) => {
    store.dispatch(
        notificationApi.util.updateQueryData("getAllNotifications", {}, (draft) => {
            if (!draft?.data) return

            const exists = draft.data.some((n) => n.id === data.id)
            if (exists) return

            draft.data.unshift(data)

            // if (draft.meta_data) {
            //     const meta = draft.meta_data
            //     meta.total += 1
            //     meta.page = Math.ceil(meta.total / meta.limit)
            // }
        })
    )
}

export const initSocket = (socket: Socket, dispatch: AppDispatch) => {
    socket.on("receiveNotification", updateNotification)
}
