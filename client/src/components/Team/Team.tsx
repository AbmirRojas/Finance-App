import TeamTopBar from "./TeamTopBar"
import AccountDetails from "./AccountDetails"
import AccountBalance from "./AccountBalance"
import TeamDetails from "./TeamDetails"
import { FaPeopleRoof } from "react-icons/fa6";

const personalData = {
    name: "Abmir Rojas",
    email: "abmirrojas15@gmail.com",
    balance: 200000.00,
}

const teamData = [
    { name: "Sandra Vera", email: "samyolimarquez@gmail.com", balance: 250000.00, imgAdventurer: "#adventurer-6"},
    { name: "Jhoan Rojas", email: "jhodaniel15@gmail.com", balance: 150000.00, imgAdventurer: "#adventurer-2" },
    { name: "Graciela Machacado", email: "cielamc22@gmail.com", balance: 150000.00, imgAdventurer: "#adventurer-3" },
]

function handleBalance() {
    let teamMemberBalance = 0;
    let prevValue = 0;
    let allBalance = 0;

    for (let i = 0; i < teamData.length; i++) {
         teamMemberBalance = teamData[i].balance;
         allBalance = teamMemberBalance + prevValue;
         prevValue = allBalance;
    }

    return allBalance + personalData.balance;
}

const totalBalance = handleBalance();

export default function Team() {
    return (
        <div className="bg-white rounded-lg pb-4 shadow">
            <TeamTopBar />
            <div className="px-4 grid grid-cols-12 gap-3">
                <AccountDetails userName={personalData.name} userEmail={personalData.email}/>
                <AccountBalance balance={totalBalance}/>
                <div className="border rounded border-stone-300 col-span-8 flex flex-col items-center shadow p-1.5 gap-4">
                    <h2 className="flex items-center gap-1.5 text-2xl font-medium my-3"><FaPeopleRoof /> Team Accounts</h2>
                    {teamData.map((teamMember, index) => (
                        <TeamDetails 
                            key={index} 
                            userName={teamMember.name} 
                            userEmail={teamMember.email}
                            imgAdventurer={teamMember.imgAdventurer} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}