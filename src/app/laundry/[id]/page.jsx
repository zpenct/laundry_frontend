"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsFillClockFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { redirect } from "next/navigation";

function LoundryDetail() {
  const { user } = useAuthContext()
  const { id } = useParams();
  const router = useRouter();
  const [nama_, setNama] = useState("");
  const [lokasi_, setLokasi] = useState("");
  const [fasilitasList_, setFasilitas] = useState([]);
  const [jamBuka, setJamBuka] = useState("");
  const [jamTutup, setJamTutup] = useState("");
  const [noHp, setNoHp] = useState("");

  const fetchDetail = async () => {
    const res = await axios(`http://localhost:8081/v1/laundry/${id}`);
    console.log(res.data);
    const { nama, lokasi, fasilitasList, jam_buka, jam_tutup, no_hp } =
      res.data;
    setNama(nama);
    setLokasi(lokasi);
    setFasilitas(fasilitasList);
    setJamBuka(jam_buka);
    setJamTutup(jam_tutup);
    setNoHp(no_hp);
  };

  useEffect(() => {
    if (!user) {
      redirect("/auth/signin");
    }else{
      fetchDetail();
    }
  }, []);

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="mt-20 w-[570px] p-6 bg-white border border-gray-200 rounded-lg shadow">
        <button
          className="py-1.5 rounded-md px-3 text-md text-blue-dark hover:bg-sky-50 flex items-center gap-2 transition-all duration-200"
          onClick={() => router.back()}
        >
          <IoMdArrowRoundBack /> Kembali
        </button>
        <div className="pl-10 pt-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {nama_}
          </h5>
          <p className="mb-3 font-normal text-gray-500 gap-2 text-sm flex items-center">
            {" "}
            <IoLocationSharp /> {lokasi_}
          </p>
          <p className="mb-3 font-normal text-gray-500 gap-2 text-sm flex items-center">
            <BsFillClockFill /> {jamBuka} - {jamTutup}
          </p>
          <p className="mb-3 font-normal text-gray-500 gap-2 text-sm flex items-center">
            <BsFillTelephoneFill />
            {noHp}
          </p>
          <h4 className="text-blue-dark mt-10 mb-2 font-extrabold text-md">Fasilitas</h4>
          <ul>
            {fasilitasList_.map((fasilitas) => (
              <li
                key={fasilitas.id}
                className="flex items-center space-x-3 rtl:space-x-reverse text-sm"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4 text-green-800 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span className="font-semibold leading-8 ">
                  {fasilitas.fasilitas}
                </span>
                <span>Rp{fasilitas.harga}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoundryDetail;
