import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexrs] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    if (isValidData(values)) {
      setValues(values.data);
    }
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    if (isValidData(seenIndexes)) {
      setSeenIndexrs(seenIndexes.data);
    }
  };

  const isValidData = (resp) => {
    if (!resp) { return false; }
    if (resp.status !== 200) { return false; }
    if (!resp.data) { return false; }
    const { headers } = resp;
    if (!headers['content-type'] || headers['content-type'].includes('html')) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', { index: index });

    setIndex('');
    fetchValues();
    fetchIndexes();
  }

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => {
            setIndex(event.target.value);
          }}
        />
        <button>Submit!!</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
