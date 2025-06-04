import { useState } from "react";
import { type IconType } from "react-icons"
import { FiHome, FiUsers, FiPaperclip  } from "react-icons/fi"

interface SideMenuProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}

export default function RouteSelect({ setActiveComponent }: SideMenuProps) {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  const handleClick = (route: string) => {
    setActiveComponent(route);
    setActiveRoute(route);
  };


  return (
      <div className="space-y-1">
          <Route 
              onClick={() => handleClick("Dashboard")} 
              Icon={FiHome} 
              selected={activeRoute === "Dashboard"} 
              title="Dashboard" 
            />
            <Route 
              onClick={() => handleClick("Team")} 
              Icon={FiUsers} 
              selected={activeRoute === "Team"} 
              title="Team" 
            />
            <Route 
              onClick={() => handleClick("Transaction")} 
              Icon={FiPaperclip} 
              selected={activeRoute === "Transaction"} 
              title="Transaction" 
            />
       </div>
  )
}

const Route = ({
  selected,
  Icon,
  title,
  onClick,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};