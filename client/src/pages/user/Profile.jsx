import React from "react";
import UserMenu from "../../components/layouts/UserMenu";
import Layout from "../../components/layouts/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">User Profile</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
