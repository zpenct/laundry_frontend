"use client";
import Link from "next/link";
import { MdLocalLaundryService } from "react-icons/md";
import { useState } from "react";

export default function Navbar() {
  const [isAuthorized, setisAuthorized] = useState(false);

  return (
    <nav className="z-100 border-gray-200 bg-transparent  w-full">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-dark flex items-center gap-2">
          <MdLocalLaundryService />
          Londri
        </span>
        <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            href={"/auth/signin"}
            type="button"
            className="text-white font-medium rounded-lg text-sm px-6 py-2 text-center bg-blue-dark "
          >
            {isAuthorized ? "Masuk" : "Keluar"}
          </Link>
          <Link
            href={"/create"}
            type="button"
            className="text-blue-dark font-medium rounded-lg text-sm px-6 py-2 text-center bg-sky-100 "
          >
            Tambah Laundry
          </Link>
        </div>
      </div>
    </nav>
  );
}
