import React from "react";

const FormCategory = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <div className="max-w-md mx-auto mt-10 ">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <input
              id="inputField"
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Category Name"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCategory;
