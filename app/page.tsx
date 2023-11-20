// /* eslint-disable @next/next/no-async-client-component */
"use client"
import Card from "./Components/SectionOne/MSOne"
import TopCharts from "./Components/SectionOne/TopCharts"
import NewReleases from "./Components/SectionOne/NewReleases"
import { useEffect } from "react";
import { useMusicStore } from "./Store/musicStore";

const Home = () => {
  const [getToken, setShowSearchOutput, getSongs, songsError] = useMusicStore(state => [state.getToken, state.setShowSearchOutput, state.getSongs, state.songsError])

  useEffect(() => {
    getToken();
    getSongs();
  }, [getToken, getSongs])
  
  return (
    <div onClick={() => setShowSearchOutput(false)} className="relative top-20 mt-6 pb-32 pl-0 ml-5 sm:pl-28">
      <div className="flex m-flex-col">
        <Card />
        <TopCharts />
      </div>
      <div className="w-full pl-5 sm:pl-0">
        <NewReleases>New Releases</NewReleases>
      </div>
    </div>
  )
}

export default Home;
