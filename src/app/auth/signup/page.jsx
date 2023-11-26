"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const res = await axios.post('http://localhost:8081/v1/auth/signup',formData)
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
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-bold text-gray-900 ">Buat Akun Baru!</h5>
          <div>
            <label
              htmlFor="firstname"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nama depan
            </label>
            <input
              type="text"
              name="firstName"
              id="firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="KOOKKO"
              onChange={handleChange}
              value={formData.firstName}
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nama Belakang
            </label>
            <input
              type="text"
              name="lastName"
              id="lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Has"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nono@gmail.com"
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
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Daftar
          </button>
          <div className="text-sm font-medium text-gray-500 ">
            Udah ada akun?{" "}
            <Link
              href={"/auth/signin"}
              className="text-blue-dark hover:underline "
            >
              Masuk
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
