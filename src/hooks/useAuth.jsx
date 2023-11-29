"use client"
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Cek apakah ada user di localStorage
    const userString = localStorage.getItem('user');

    // Jika tidak ada user, kembalikan null
    if (!userString) {
      setUserData(null);
      return;
    }

    try {
      // Ekstrak informasi pengguna dari localStorage
      const user = JSON.parse(userString);

      // Simpan informasi pengguna dalam state
      setUserData(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Tangani kesalahan parsing JSON jika diperlukan
    }
  }, []);

  return userData;
};

export default useAuth;
