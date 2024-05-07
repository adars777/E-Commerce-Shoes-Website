import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch(""); // Initialize keyword with an empty string
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Add 'e' parameter to the handleSubmit function
    e.preventDefault(); // Fix the typo in preventDefault

    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="flex flex-grow ml-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-900"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
