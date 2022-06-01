import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexrs] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  }

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexrs(seenIndexes.data);
  }


  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [])

  return (
    <div>
      DIB DIB FIB
    </div>
  )

};

export default Fib;
