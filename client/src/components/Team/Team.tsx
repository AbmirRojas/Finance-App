import { useState, useEffect } from "react";
import TeamTopBar from "./TeamTopBar"
import AccountDetails from "./AccountDetails"
import AccountBalance from "./AccountBalance"
import TeamDetails from "./TeamDetails"
import { FaPeopleRoof } from "react-icons/fa6";
import { useUser } from "../../context/UserContext"; 
import axios from "axios";

interface UserData {
        id_user: number;
        first_name: string;
        last_name: string;
        email: string;
        profile_image: string;
        balance?: number; // opcional por ahora
    }



export default function Team() {
    const { user } = useUser();
    const [error, setError] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [teamData, setTeamData] = useState<UserData[] | null>(null);
    

    useEffect(() => {
        if (!user?.email) return;

        const fetchUserData = async () => {
            try {
            const token = localStorage.getItem("token");
            const response = await axios.get<UserData[]>("http://localhost:3000/getAllUsers", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const matchedUser = response.data.find(
                (data) => data.email === user.email
            );

            const team = response.data.filter(
                (data) => data.email !== user.email
            );

            setTeamData(team);

            if (matchedUser) {
                setUserData(matchedUser);
            } else {
                setError("Usuario no encontrado");
            }
            } catch (err) {
            setError(err instanceof Error ? err.message : "Error al obtener los datos");
            }
        };

    fetchUserData();
    }, [user?.email]);



    const personalData = {
        name: userData?.first_name || "loading...",
        email: userData?.email || "loading...",
        balance: 200000.00,
        imgAdventurer: userData?.profile_image || "loading..."
    }

    function handleBalance(): number {
        const teamBalance = (teamData ?? []).reduce((sum, member) => {
            return sum + (member.balance ?? 0);
        }, 0);

        return teamBalance + (personalData.balance ?? 0);
    }


    const totalBalance = handleBalance();

    return (
        <div className="bg-white rounded-lg pb-4 shadow">
            <TeamTopBar />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="px-4 grid grid-cols-12 gap-3">
                <AccountDetails userName={personalData.name} userEmail={personalData.email} imgAdventurer={`#${personalData.imgAdventurer}`} />
                <AccountBalance balance={totalBalance}/>
                <div className="border rounded border-stone-300 col-span-8 flex flex-col items-center shadow p-1.5 gap-4">
                    <h2 className="flex items-center gap-1.5 text-2xl font-medium my-3"><FaPeopleRoof /> Team Accounts</h2>
                    {teamData && teamData.map((teamMember, index) => (
                        <TeamDetails 
                            key={index} 
                            userName={`${teamMember.first_name} ${teamMember.last_name}`} 
                            userEmail={teamMember.email}
                            imgAdventurer={`#${teamMember.profile_image}`} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}