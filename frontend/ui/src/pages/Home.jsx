import React, { useContext } from "react";
import Layout from "../components/Layout";
import SongContext from "../context/AppContext";
import AlbumCard from "../components/AlbumCard";
import SongCards from "../components/SongCards";
import Loading from "../components/Loading";

const Home = () => {
  const { albums , songs , loading } = useContext(SongContext);

  // console.log(songs);
  return (
 <div>
  {
  !loading?(
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
  {Array.isArray(songs) && songs.length > 0 ? (
    songs.map((e, i) => (
      <SongCards
        key={i}
        image={e.thumbnail}
        name={e.title}
        desc={e.description}
        audio={e.audio}
        id={e.id}
      />
    ))
  ) : (
    <p>No songs found</p>
  )}
</div>

      </div>
    </Layout>
    ):
    (
      <Loading/>
    )
  }
 </div>
  );
};

export default Home;
