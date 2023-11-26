import { useState, useEffect } from "react";
import axios from "axios";

export const useLaundry = () => {
  const [laundryList, setLaundryList] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:8081/v1/laundry`);
    setLaundryList(res.data);
    console.log(laundryList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return laundryList

}