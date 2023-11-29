"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
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
    setIsLoading(true)
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
    setIsLoading(false)
    router.replace('/auth/signin')
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
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="KOOKKO"
              onChange={handleChange}
              value={formData.username}
              required
            />
          </div>
          
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              email
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
            {isLoading ? "Loading..." : "Daftar"}
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
