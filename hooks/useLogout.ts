import { useRouter } from "next/navigation";
import { StorageHelper } from "@/helper/storage.helper";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      // Clear localStorage
      StorageHelper.clear();

      // Optional: Call logout API if your backend requires it
      // await logoutApi().unwrap();

      toast.success("Logged out successfully");

      // Redirect to login
      router.push("/log-in");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  return { logout };
};
