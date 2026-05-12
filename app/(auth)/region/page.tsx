import UserResponsesPage from "@/app/(admin)/dashboard/connection/status/page";
import Login from "@/components/auth/Login";
import Rigion from "@/components/auth/Rigion";
import { Suspense } from "react";


export default function page() {
  return (
    <div>
      {/* <Rigion/> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  )
}
