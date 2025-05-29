import TopBar  from "./TopBar";
import  Grid  from "./Grid";

export default function SideMenu() {
  return (
    <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
      <TopBar />
      <Grid />
    </div>
  )
}