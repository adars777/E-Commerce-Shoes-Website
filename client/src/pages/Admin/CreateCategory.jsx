import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import FormCategory from "../../components/Form/FormCategory";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState(null);

  // create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = getToken();
      // console.log(token);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          headers: {
            // Include JWT token in the Authorization header
            Authorization: auth?.token,
          },
        }
      );

      if (data?.success) {
        console.log("created");
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category");
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update the category
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updateName },
        {
          headers: {
            // Include JWT token in the Authorization header
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`${updateName} is updated.`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("something went wrong..");
    }
  };

  // delete the category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`,
        {
          headers: {
            // Include JWT token in the Authorization header
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`category is deleted.`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("something went wrong..");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="relative bottom-10">
        <AdminMenu />
        <h2 className="text-center font-semibold py-2 bg-gray-300">
          Manage Category
        </h2>
        <div>
          <FormCategory
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="overflow-x-auto relative pt-10">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((row) => (
                <tr key={row._id}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {row.name}
                    </div>
                  </td>
                  <td className="px-6 py-2 flex items-center gap-10 whitespace-nowrap">
                    <button
                      className="bg-blue-500 px-2 py-1 text-white font-semibold rounded-md hover:bg-blue-800"
                      onClick={() => {
                        setVisible(true);
                        setUpdateName(row.name);
                        setSelected(row);
                      }}
                    >
                      EDIT
                    </button>

                    <button
                      className="bg-red-500 px-2 py-1 text-white font-semibold rounded-md hover:bg-red-800"
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal onCancel={() => setVisible(false)} open={visible} footer={null}>
          <FormCategory
            value={updateName}
            setValue={setUpdateName}
            handleSubmit={handleUpdateSubmit}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
