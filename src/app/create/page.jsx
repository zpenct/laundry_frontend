"use client";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle, IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/context/authContext";

export default function CreateLaundry() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [subForm, setSubForm] = useState(0);
  const initialFasilitas = { fasilitas: "", harga: "" };
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    no_hp: "",
    jam_buka: "",
    jam_tutup: "",
    fasilitasList: [initialFasilitas],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fasilitas" || name === "harga") {
      const { index } = e.target.dataset;
      const updatedFasilitasList = [...formData.fasilitasList];
      updatedFasilitasList[index][name] = value;

      setFormData({
        ...formData,
        fasilitasList: updatedFasilitasList,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddFasilitas = () => {
    setFormData({
      ...formData,
      fasilitasList: [...formData.fasilitasList, initialFasilitas],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nama: formData.nama,
      lokasi: formData.lokasi,
      no_hp: formData.no_hp,
      jam_buka: formData.jam_buka,
      jam_tutup: formData.jam_tutup,
      fasilitasList: formData.fasilitasList,
    };

    try {
      await axios.post("http://localhost:8081/v1/laundry", data);
      router.replace("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!user && user?.role != "ADMIN") {
      redirect("/");
    }
  }, []);

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="shadow-l w-full max-w-lg p-4 mx-5 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          {subForm == 0 ? (
            <>
              <button
                className="py-1.5 rounded-md px-3 text-md text-blue-dark hover:bg-sky-50 flex items-center gap-2 transition-all duration-200"
                onClick={() => router.replace("/")}
              >
                <IoMdArrowRoundBack /> Kembali
              </button>
              <div className="mt-4 flex flex-col gap-3">
                <label className="text-gray-800 font-semibold text-sm">
                  Nama Outlet
                  <input
                    className="font-normal mt-1 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                    placeholder="Laundry Royal"
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="text-gray-800 font-semibold text-sm">
                  Lokasi
                  <input
                    className="font-normal mt-1 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                    placeholder="Jln Malino "
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="text-gray-800 font-semibold text-sm">
                  Nomor Kontak
                  <input
                    className="font-normal mt-1 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                    placeholder="08237647847"
                    type="text"
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className="flex gap-3">
                  <label className="text-gray-800 font-semibold text-sm">
                    Jam Buka
                    <input
                      className="font-normal mt-1 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                      type="text"
                      placeholder="08.00"
                      name="jam_buka"
                      value={formData.jam_buka}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="text-gray-800 font-semibold text-sm">
                    Jam Tutup
                    <input
                      className="font-normal mt-1 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                      placeholder="20.30"
                      type="text"
                      name="jam_tutup"
                      value={formData.jam_tutup}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <button
                  onClick={() => setSubForm(1)}
                  className="mt-5 w-full text-white bg-blue-dark hover:bg-blue-mid font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Selanjutnya
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  className="py-1.5 rounded-md px-3 text-md text-blue-dark hover:bg-sky-50 flex items-center gap-2 transition-all duration-200"
                  onClick={() => setSubForm(0)}
                >
                  <IoMdArrowRoundBack /> Kembali
                </button>
                <div className="mt-4">
                  <label className="text-gray-800 font-semibold text-sm">
                    Apa aja Tawarannya? (kg)
                    <div className="flex flex-col space-y-4 mt-5">
                      {formData.fasilitasList.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5 font-normal"
                            type="text"
                            name="fasilitas"
                            data-index={index}
                            value={item.fasilitas}
                            onChange={handleChange}
                            placeholder="Cuci express"
                            required
                          />
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5 font-normal "
                            type="text"
                            name="harga"
                            data-index={index}
                            value={item.harga}
                            onChange={handleChange}
                            placeholder="20000"
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFasilitas}
                      className="mt-5 flex gap-2 items-center text-blue-dark border-blue-dark border-2 font-medium rounded-lg text-sm px-4 py-2 text-center "
                    >
                      <IoMdAddCircle />
                      Fasilitas
                    </button>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 w-full text-white bg-blue-dark hover:bg-blue-mid font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Kirim
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
