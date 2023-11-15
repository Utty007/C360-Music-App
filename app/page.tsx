// /* eslint-disable @next/next/no-async-client-component */
"use client"
import Card from "./Components/SectionOne/MSOne"
import TopCharts from "./Components/SectionOne/TopCharts"
import NewReleases from "./Components/SectionOne/NewReleases"
import { useEffect } from "react";
import { useMusicStore } from "./Store/musicStore";

const Home = () => {
  const [getToken, setShowSearchOutput, getSongs] = useMusicStore(state => [state.getToken, state.setShowSearchOutput, state.getSongs])

  useEffect(() => {
    getToken();
    getSongs();
  }, [getToken, getSongs])
  
  return (
    <div onClick={() => setShowSearchOutput(false)} className="relative top-20 left-32 mt-6 pb-[200px]">
      <div className="flex flex-wrap">
        <Card />
        <TopCharts />
      </div>
      <div className="w-full">
        <NewReleases>New Releases</NewReleases>
        <NewReleases> Popular in your area </NewReleases>
      </div>
    </div>
  )
}

export default Home;
