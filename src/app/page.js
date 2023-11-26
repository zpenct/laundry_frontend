"use client";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { LaundryItem } from "./components/LandryItem";
import { useLaundry } from "@/hooks/useLaundry";

export default function Home() {
  const fullLaundry = useLaundry()
  const [locationInput, setLocationInput] = useState("");
  const [loundryList, setLoundryList] = useState(fullLaundry);
  const [debouncedValue] = useDebounce(locationInput, 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(locationInput);
  };

  const handleOnChange = (e) => {
    setLocationInput(e.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/v1/laundry/lokasi?lokasi=${locationInput}`
      );
      setLoundryList(res.data);
      console.log(loundryList);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedValue]);

  return (
    <main className="flex justify-center items-center ">
      <div className="mt-10 mx-5 md:w-3/4 bg-slate-50 border-2 border-sky-100 shadow rounded-lg min-h-[500px] w-full pb-10 ">
        <div>
          <form
            className="mx-auto py-10 md:px-5 px-8 flex flex-row justify-center w-full md:w-[600px] gap-3"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 "
              placeholder="Cari berdasarkan Lokasi"
              onChange={handleOnChange}
            />

            <button
              type="submit"
              className="rounded-md flex gap-2 justify-between items-center text-white  bg-blue-dark px-4 py-2"
            >
              <FaSearch /> Cari
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6">
          <LaundryItem
            name="Laundry Mama"
            address="Jln Manggis"
            jam_buka="12.00"
            jam_tutup="20.00"
          />
          <LaundryItem
            name="Laundry Mama"
            address="Jln Manggis"
            jam_buka="12.00"
            jam_tutup="20.00"
          />
          <LaundryItem
            name="Laundry Mama"
            address="Jln Manggis"
            jam_buka="12.00"
            jam_tutup="20.00"
          />
          <LaundryItem
            name="Laundry Mama"
            address="Jln Manggis"
            jam_buka="12.00"
            jam_tutup="20.00"
          />
        </div>
      </div>
    </main>
  );
}
