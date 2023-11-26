"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const res = await axios.post('http://localhost:8081/v1/auth/signin',formData)
      console.log(res)

      if(!res.ok){
        throw new Error
      }
      return res
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="shadow-xl w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-bold text-gray-900 ">
            Selamat datang kembali!
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Fathi Said"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-dark focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Masuk
          </button>
          <div className="text-sm font-medium text-gray-500 ">
            Belum ada akun?{" "}
            <Link
              href={"/auth/signup"}
              className="text-blue-dark hover:underline "
            >
              Buat
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}