"use client";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { LaundryItem } from "./components/LandryItem";
import { useLaundry } from "@/hooks/useLaundry";
import Loading from "./components/Loading";
import { useAuthContext } from "@/context/authContext";

export default function Home() {
  const fullLaundry = useLaundry()
  const [locationInput, setLocationInput] = useState("");
  const [loundryList, setLoundryList] = useState(fullLaundry);
  const [debouncedValue] = useDebounce(locationInput, 300);
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthContext()


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(locationInput);
  };

  const handleOnChange = (e) => {
    setLocationInput(e.target.value);
  };

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`http://localhost:8081/v1/laundry?lokasi=${debouncedValue}`
      );
      setLoundryList(res.data);
      console.log(loundryList);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [debouncedValue]);


  return (
    <main className="flex justify-center items-center ">
      <div className="mt-10 mx-5 md:w-[770px] bg-slate-50 border-gray-200 rounded-lg shadow min-h-[500px] w-full pb-10 ">
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
        {user && <h1 className="pl-6 font-bold text-[20px] mb-3">Halo, {user?.username}</h1>}
        
        <div className={`grid grid-cols-1 gap-5 px-6 justify-center items-center ${isLoading ? null : "md:grid-cols-2"}`}>
          {isLoading ? <Loading /> : loundryList.map(loundry => <LaundryItem
            key={loundry.id}
            name={loundry.nama}
            address={loundry.lokasi}
            jam_buka={loundry.jam_buka}
            jam_tutup={loundry.jam_tutup}
            id={loundry.id}
          />)}
          
        </div>
      </div>
    </main>
  );
}
