import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import spriteUrl from '../../assets/sprite.svg';
import axios from "axios";
import { useUser } from "../../context/UserContext"; 


interface UserData {
        id_user: number;
        first_name: string;
        last_name: string;
        email: string;
        profile_image: string;
        balance: number; 
    }

export default function AccountToggle() {
    const { user } = useUser();
    const [error, setError] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);

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


    return (
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300">

        {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
        )}

            <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
                <svg className='size-8 rounded shrink-0 bg-violet-500 shadow"'>
                    <use xlinkHref={`${spriteUrl}#${userData?.profile_image}`}></use>
                </svg>
                <div className="text-start">
                    <span className="text-sm font-semibold block">{userData && userData.first_name + " " + userData.last_name}</span>
                    <span className="text-xs block text-stone-500">{userData && userData.email}</span>
                </div>
                <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs"/>
                <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs"/>
            </button>
        </div>
    );
}