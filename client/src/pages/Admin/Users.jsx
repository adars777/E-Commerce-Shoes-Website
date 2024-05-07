import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Dashboard - all users"}>
      <div className="relative bottom-10">
        <AdminMenu />
        <h2>all the users</h2>
      </div>
    </Layout>
  );
};

export default Users;
