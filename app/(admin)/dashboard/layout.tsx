import AdminMenu from "@/components/reusable/AdminMenu";
import Loader from "@/components/reusable/Loader";
import React, { Suspense } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  // console.log("render")

  return (
    <Suspense fallback={<Loader />}>


      <AdminMenu>{children}</AdminMenu>

    </Suspense>
  );
}

export default AdminLayout;
