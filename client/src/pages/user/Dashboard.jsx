import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/layout/UserMenu";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="relative h-fit bottom-10">
        {/* left side bar */}
        <div>
          <UserMenu />
        </div>

        {/* --- */}
        <div className="overflow-x-auto border-2">
          <h1 className="text-center sticky bg-gray-500  text-3xl font-medium border-b-2 ">
            User Details
          </h1>
          <table className="table-auto min-w-full divide-y divide-zinc-800">
            <thead className="bg-blue-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {auth?.user?.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {auth?.user?.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {auth?.user?.phone}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* --- */}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
