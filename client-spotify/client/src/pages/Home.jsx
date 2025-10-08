import React from "react";
import Layout from "./Layout";
import AllSongs from "./AllSongs";

const Home = () => {
  return (
    <Layout>
<div>
        <nav className="fixed ">
      <ul className="flex space-x-4">
        <li>All</li>
        <li>Music</li>
        <li>Podcast</li>
      </ul>
      </nav>

      {/* Example scrollable content */}
      <div className="mt-20">
     
        <AllSongs/>

      </div>
</div>
    </Layout>
  );
};

export default Home;
