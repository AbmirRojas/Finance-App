import AccountToggle from "./AccountToggle"
import Search from "./Search"
import RouteSelect from "./RouteSelect"
import Logout from "./Logout"

interface SideMenuProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}


export default function SideMenu({ setActiveComponent }: SideMenuProps) {
    return (
        <div>
            <div className="overflow-y-auto scrollbar-hide sticky top-4 h-[calc(100vh-32px-48px)]">
                {/*Main Side Menu content*/}
                <AccountToggle />
                <Search />
                <RouteSelect setActiveComponent={setActiveComponent}/>
            </div>
           <Logout />
        </div>
    )
}