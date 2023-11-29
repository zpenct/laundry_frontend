"use client";
import Link from "next/link";
import { MdLocalLaundryService } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";

export default function Navbar() {

  const router = useRouter();
  const {user, setUser} = useAuthContext()

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };


  return (
    <nav className="z-100 border-gray-200 bg-transparent  w-full">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-dark flex items-center gap-2">
          <MdLocalLaundryService />
          APA
        </span>

        {user == null ? (
          <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
            <Link
              href={"/auth/signin"}
              type="button"
              className="text-white font-medium rounded-lg text-sm px-6 py-2 text-center bg-blue-dark "
            >
              Masuk
            </Link>
            <Link
              href={"/auth/signup"}
              type="button"
              className="text-blue-dark font-medium rounded-lg text-sm px-6 py-2 text-center bg-sky-100 border-2 border-sky-300"
            >
              Daftar
            </Link>
          </div>
        ) : user.role === "USER" ? (
          <button
            onClick={handleLogout}
            type="button"
            className="text-blue-dark font-medium rounded-lg text-sm px-6 py-2 text-center bg-sky-100 border-1"
          >
            Keluar
          </button>
        ) : (
          <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={handleLogout}
              type="button"
              className="text-white font-medium rounded-lg text-sm px-6 py-2 text-center bg-blue-dark"
            >
              Keluar
            </button>
            <Link
              href={"/create"}
              type="button"
              className="text-blue-dark font-medium rounded-lg text-sm px-6 py-2 text-center bg-sky-100 border-2 border-sky-300"
            >
              Tambah Laundry
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
