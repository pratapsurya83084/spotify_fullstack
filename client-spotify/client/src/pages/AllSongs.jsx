// import React, { useState, useEffect, useRef } from "react";

// const AllSongs = () => {
//   const [navBg, setNavBg] = useState(false);
//   const scrollRef = useRef(null);

//   const handelSelect = (category) => {
//     console.log("selected category:", category);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollRef.current) {
//         setNavBg(scrollRef.current.scrollTop > 10);
//       }
//     };

//     const el = scrollRef.current;
//     if (el) el.addEventListener("scroll", handleScroll);

//     return () => {
//       if (el) el.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const songs = [
//     {
//       id: 1,
//       title: "The Best of Sid Sriram in Telugu",
//       desc: "Playlist • Telugu Hits",
//       img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a75368173330847.648e9fb76d648.jpg",
//     },
//     {
//       id: 2,
//       title: "Romantic Vibes",
//       desc: "Playlist • Love Songs",
//       img: "https://i.scdn.co/image/ab67706f00000002ce2d7d7c9e531f7a4ed89c8d",
//     },
//     {
//       id: 3,
//       title: "Daily Mix 1",
//       desc: "Playlist • Mix of your favorites",
//       img: "https://i.scdn.co/image/ab67616d0000b27386c15e188a89f061a71b82d3",
//     },
//     {
//       id: 4,
//       title: "Party Time",
//       desc: "Playlist • Dance Hits",
//       img: "https://i.scdn.co/image/ab67616d0000b2734a2a7f6d72e93c08ecfa00f4",
//     },
//     {
//       id: 5,
//       title: "Workout Boost",
//       desc: "Playlist • Gym Motivation",
//       img: "https://i.scdn.co/image/ab67616d0000b273b7580d98c52ffb6a7e731b02",
//     },
//     {
//       id: 6,
//       title: "Chill Beats",
//       desc: "Playlist • Lo-Fi",
//       img: "https://i.scdn.co/image/ab67616d0000b273b67879d6bcd446b5e06e9b20",
//     },
//     {
//       id: 7,
//       title: "Punjabi Pop",
//       desc: "Playlist • Desi Vibes",
//       img: "https://i.scdn.co/image/ab67616d0000b273a3c0370e998b17f7d94c0137",
//     },
//     {
//       id: 8,
//       title: "Top Global Hits",
//       desc: "Playlist • Worldwide",
//       img: "https://i.scdn.co/image/ab67616d0000b273fbf83c9317eeb1c27dcf18de",
//     },
//     {
//       id: 9,
//       title: "Soft Piano",
//       desc: "Playlist • Instrumental",
//       img: "https://i.scdn.co/image/ab67616d0000b27358c06b88aa5b4d8c6322cf6f",
//     },
//     {
//       id: 10,
//       title: "Bollywood Classics",
//       desc: "Playlist • Retro Hits",
//       img: "https://i.scdn.co/image/ab67616d0000b273dcf8e2395f912e7e707f8bb5",
//     },
//   ];

//   return (
 

//     <div className="h-screen flex flex-col bg-brown text-white relative mb-">
//   {/* Navbar */}
//   <nav
//     className={`p-3 px-6 sticky top-0 z-20 transition-all duration-500 ${
//       navBg ? "bg-gray-900/90 backdrop-blur-md" : "bg-transparent"
//     }`}
//   >
//     <ul className="flex gap-8 text-sm font-semibold">
//       <li
//         className="bg-[#262626] px-4 py-2 rounded-3xl cursor-pointer"
//         onClick={() => handelSelect("All")}
//       >
//         All
//       </li>
//       <li
//         className="bg-[#262626] px-4 py-2 rounded-3xl cursor-pointer"
//         onClick={() => handelSelect("Music")}
//       >
//         Music
//       </li>
//       <li
//         className="bg-[#262626] px-4 py-2 rounded-3xl cursor-pointer"
//         onClick={() => handelSelect("Podcasts")}
//       >
//         Podcasts
//       </li>
//     </ul>
//   </nav>

//   {/* Scrollable Cards */}
// {/* Scrollable Cards */}
// <div
//   ref={scrollRef}
//   className="flex-1 overflow-y-scroll scrollbar-hide p-4 relative"
// >


  
//   {/* Top Gradient Overlay */}
//   <div className="absolute  top-0 left-0 right-0 h-48 bg-gradient-to-b from-slate-700 via-gray-0 to-transparent pointer-events-none z-10"></div>

//   <div className="p-2 relative z-0">
//     <p className="text-sm text-gray-600">More like</p>
//     <h1 className="text-2xl font-bold ">Tollywood Pearls</h1>
//   </div>

//   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-0">
//     {songs.map((song) => (
//       <div
//         key={song.id}
//         className="h-56 w-40 bg-[#181818] rounded-xl p-3 hover:bg-[#282828] transition-all duration-500 hover:scale-105 cursor-pointer"
//       >
//         <img
//           className="rounded-lg w-full h-32 object-cover mb-3"
//           src={song.img}
//           alt={song.title}
//         />
//         <p className="text-white text-sm font-semibold mt-1 truncate">
//           {song.title}
//         </p>
//         <p className="text-gray-400 text-xs mt-1">{song.desc}</p>
//       </div>
//     ))}
//   </div>
// </div>


// </div>

//   );
// };

// export default AllSongs;






import React, { useState, useEffect, useRef } from "react";

const AllSongs = () => {
  const [navBg, setNavBg] = useState(false);
  const scrollRef = useRef(null);

  const handelSelect = (category) => {
    console.log("selected category:", category);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setNavBg(scrollRef.current.scrollTop > 10);
      }
    };

    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const songs = [
    {
      id: 1,
      title: "The Best of Sid Sriram in Telugu",
      desc: "Playlist • Telugu Hits",
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a75368173330847.648e9fb76d648.jpg",
    },
    {
      id: 2,
      title: "Romantic Vibes",
      desc: "Playlist • Love Songs",
      img: "https://i.scdn.co/image/ab67706f00000002ce2d7d7c9e531f7a4ed89c8d",
    },
    {
      id: 3,
      title: "Daily Mix 1",
      desc: "Playlist • Mix of your favorites",
      img: "https://i.scdn.co/image/ab67616d0000b27386c15e188a89f061a71b82d3",
    },
    {
      id: 4,
      title: "Party Time",
      desc: "Playlist • Dance Hits",
      img: "https://i.scdn.co/image/ab67616d0000b2734a2a7f6d72e93c08ecfa00f4",
    },
    {
      id: 5,
      title: "Workout Boost",
      desc: "Playlist • Gym Motivation",
      img: "https://i.scdn.co/image/ab67616d0000b273b7580d98c52ffb6a7e731b02",
    },
    {
      id: 6,
      title: "Chill Beats",
      desc: "Playlist • Lo-Fi",
      img: "https://i.scdn.co/image/ab67616d0000b273b67879d6bcd446b5e06e9b20",
    },
    {
      id: 7,
      title: "Punjabi Pop",
      desc: "Playlist • Desi Vibes",
      img: "https://i.scdn.co/image/ab67616d0000b273a3c0370e998b17f7d94c0137",
    },
    {
      id: 8,
      title: "Top Global Hits",
      desc: "Playlist • Worldwide",
      img: "https://i.scdn.co/image/ab67616d0000b273fbf83c9317eeb1c27dcf18de",
    },
    {
      id: 9,
      title: "Soft Piano",
      desc: "Playlist • Instrumental",
      img: "https://i.scdn.co/image/ab67616d0000b27358c06b88aa5b4d8c6322cf6f",
    },
    {
      id: 10,
      title: "Bollywood Classics",
      desc: "Playlist • Retro Hits",
      img: "https://i.scdn.co/image/ab67616d0000b273dcf8e2395f912e7e707f8bb5",
    },
  ];

  return (
    <div className="h-screen  flex flex-col bg-gradient-to-b from-brown-900 to-brown-700 text-white relative">
      {/* Navbar */}
      <nav
        className={`p-3 px-4 sm:px-6 sticky top-0 z-30 transition-all duration-500 ${
          navBg ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <ul className="flex flex-wrap gap-3 sm:gap-8 text-sm font-semibold">
          {["All", "Music", "Podcasts", "Trending", "New Releases"].map(
            (category) => (
              <li
                key={category}
                className="bg-[#262626] px-3 sm:px-4 py-2 rounded-3xl cursor-pointer text-xs sm:text-sm hover:bg-[#3a3a3a] transition"
                onClick={() => handelSelect(category)}
              >
                {category}
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex-1 mb-40 overflow-y-scroll scrollbar-hide p-2 sm:p-4 relative"
      >
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 sm:h-48 bg-gradient-to-b from-brown-900 via-brown-800 to-transparent pointer-events-none z-20"></div>

        {/* Section Header */}
        <div className="p-2 relative z-0 mb-4">
          <p className="text-sm text-gray-300">More like</p>
          <h1 className="text-xl sm:text-2xl font-bold">Tollywood Pearls</h1>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 relative z-0">
          {songs.map((song) => (
            <div
              key={song.id}
              className="h-52 sm:h-56 w-full bg-[#181818] rounded-xl p-2 sm:p-3 hover:bg-[#282828] transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <img
                className="rounded-lg w-full h-28 sm:h-32 object-cover mb-2 sm:mb-3"
                src={song.img}
                alt={song.title}
              />
              <p className="text-white text-xs sm:text-sm font-semibold truncate">
                {song.title}
              </p>
              <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
                {song.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Optional: Horizontal Scrollable Section for Mobile */}
        <div className="mt-8">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Featured</h2>
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
            {songs.map((song) => (
              <div
                key={song.id}
                className="min-w-[140px] sm:min-w-[160px] bg-[#181818] rounded-xl p-2 hover:bg-[#282828] transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <img
                  className="rounded-lg w-full h-28 object-cover mb-2"
                  src={song.img}
                  alt={song.title}
                />
                <p className="text-white text-xs font-semibold truncate">
                  {song.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSongs;
