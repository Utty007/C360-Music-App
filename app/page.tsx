import Card from "./Components/SectionOne/MSOne"
import TopCharts from "./Components/SectionOne/TopCharts"
import NewReleases from "./Components/SectionOne/NewReleases"

export default function Home() {
  return (
    <div className="relative top-16 left-32">
      <div className="flex flex-wrap">
        <Card />
        <TopCharts />
      </div>
      <div>
        <NewReleases />
      </div>
    </div>
  )
}
