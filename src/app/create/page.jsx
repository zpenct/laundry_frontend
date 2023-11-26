"use client";
import React, { useState, useRef } from "react";
import { IoMdAddCircle, IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function CreateLaundry() {
  const router = useRouter();
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

  const namaRef = useRef(null);
  const lokasiRef = useRef(null);
  const noHpRef = useRef(null);
  const jamBukaRef = useRef(null);
  const jamTutupRef = useRef(null);
  const fasilitasRefs = useRef([React.createRef()]);

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
    fasilitasRefs.current.push(React.createRef());

    setFormData({
      ...formData,
      fasilitasList: [...formData.fasilitasList, initialFasilitas],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dapatkan nilai langsung dari useRef
    console.log("Nama:", namaRef.current.value);
    console.log("Lokasi:", lokasiRef.current.value);
    console.log("jamBuka:", jamBukaRef.current.value);
    console.log("jamTutup:", jamTutupRef.current.value);
    console.log("no hp:", noHpRef.current.value);
    console.log("Fasilitas:", formData.fasilitasList);
  };
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="shadow-xl w-full max-w-lg p-4 mx-5 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          {subForm == 0 ? (
            <div className="flex flex-col gap-3">
              <button
                className="rounded-md py-2 text-sm text-blue-dark flex items-center gap-2"
                onClick={() => router.back()}
              >
                <IoMdArrowRoundBack /> Back
              </button>
              <label className="text-gray-800 font-semibold">
                Nama Outlet
                <input
                  className="font-normal mt-2 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                  placeholder="Laundry Royal"
                  type="text"
                  name="nama"
                  ref={namaRef}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="text-gray-800 font-semibold">
                Lokasi
                <input
                  className="font-normal mt-2 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                  placeholder="Jln Malino "
                  type="text"
                  name="lokasi"
                  ref={lokasiRef}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="text-gray-800 font-semibold">
                Nomor Kontak
                <input
                  className="font-normal mt-2 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                  placeholder="08237647847"
                  type="text"
                  name="no_hp"
                  ref={noHpRef}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="flex gap-3">
                <label className="text-gray-800 font-semibold">
                  Jam Buka
                  <input
                    className="font-normal mt-2 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                    type="text"
                    placeholder="08.00"
                    name="jam_buka"
                    ref={jamBukaRef}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="text-gray-800 font-semibold">
                  Jam Tutup
                  <input
                    className="font-normal mt-2 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5"
                    placeholder="20.30"
                    type="text"
                    name="jam_tutup"
                    ref={jamTutupRef}
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
          ) : (
            <>
              <div>
                <button
                  className="rounded-md py-2 text-sm text-blue-dark flex items-center gap-2 mb-5"
                  onClick={() => setSubForm(0)}
                >
                  <IoMdArrowRoundBack /> Back
                </button>
                <label className="text-gray-800 font-semibold">
                  Apa aja Tawarannya? (kg)
                  <div className="flex flex-col space-y-4 mt-5">
                    {formData.fasilitasList.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5 font-normal"
                          type="text"
                          name="fasilitas"
                          data-index={index}
                          ref={fasilitasRefs.current[index]}
                          placeholder="Cuci express"
                          onChange={handleChange}
                          required
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5 font-normal"
                          type="text"
                          name="harga"
                          data-index={index}
                          ref={fasilitasRefs.current[index]}
                          placeholder="12000"
                          onChange={handleChange}
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
