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
    <div onClick={() => setShowSearchOutput(false)} className="relative top-20 mt-6 pb-32 pl-28">
      <div className="flex flex-wrap">
        <Card />
        <TopCharts />
      </div>
      <div className="w-full">
        <NewReleases>New Releases</NewReleases>
        {songsError? <div role="alert" className="alert alert-error cursor-pointer" onClick={()=> getSongs()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>An error occured! Click here to try again.</span>
        </div> : <NewReleases> Popular in your area </NewReleases>}
      </div>
    </div>
  )
}

export default Home;
