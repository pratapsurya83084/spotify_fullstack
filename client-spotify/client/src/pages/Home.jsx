import React from "react";
import Layout from "./Layout";
import AllSongs from "./AllSongs";

const Home = () => {
  return (
    <Layout>
      {/* Example scrollable content */}
      <div className="mt-0">
        <AllSongs />
      </div>
    </Layout>
  );
};

export default Home;
