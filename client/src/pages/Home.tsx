import { useState } from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import Dashboard from "../components/Dasboard/Dashboard"
import Team from "../components/Team/Team";
import AddTransaction from "../components/AddTransaction/AddTransaction";

export default function App() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Team":
        return <Team />;
      case "AddTransaction":
        return <AddTransaction />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <main className="grid gap-4 p-4 grid-cols-[200px_1fr] h-screen">
      <SideMenu setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </main>
  );
}