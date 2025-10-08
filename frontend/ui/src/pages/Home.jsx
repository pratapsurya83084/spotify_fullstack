import React, { useContext } from "react";
import Layout from "../components/Layout";
import SongContext from "../context/AppContext";
import AlbumCard from "../components/AlbumCard";
import SongCards from "../components/SongCards";

const Home = () => {
  const { albums, songs } = useContext(SongContext);
  console.log(songs);
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>

        <div className="flex overflow-auto">
          {albums.map((e, i) => {
            return (
              <AlbumCard
                key={i}
                image={e.thumbnail}
                name={e.title}
                desc={e.description}
                id={e.id}
              />
            );
          })}
        </div>
      </div>

      {/* songs here  */}

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl"> Today's biggest hits </h1>

        <div className="flex overflow-auto">
          {songs.map((e, i) => {
            return (
              <SongCards
                key={i}
                image={e.thumbnail}
                name={e.title}
                desc={e.description}
                audio={e.audio}
                id={e.id}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
