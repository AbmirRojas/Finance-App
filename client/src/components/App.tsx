import SideMenu from "./SideMenu/SideMenu";
import Dashboard from "./Dasboard/Dashboard";

export default function App() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[200px_1fr] h-screen">
      <SideMenu />
      <Dashboard />
    </main>
  );
}