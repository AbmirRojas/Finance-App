import { useState, useEffect } from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import axios from "axios";
import { useUser } from "../../context/UserContext";

interface UserBalance {
        user_balance: number; 
    }

interface UserData {
        id_user: number;
        first_name: string;
        last_name: string;
        email: string;
        profile_image: string;
        user_balance: number; 
    }

export default function StatCards() {
    const { user } = useUser();
    const [error, setError] = useState("");
    const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
    const [grossIncome, setGrossIncome] = useState(null);

    useEffect(() => {
        if (!user?.email) return;


        const fetchUserBalance = async () => {
            try {
            const token = localStorage.getItem("token");

            const response = await axios.get<UserData[]>("http://localhost:3000/getAllUsers", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const matchedUser = response.data.find(
                (data) => data.email === user.email
            );

                if (matchedUser) {
                    const personalBalance = await axios.get<UserBalance[]>(`http://localhost:3000/getUserBalance/${matchedUser.id_user}`, {
                    headers: { Authorization: `Bearer ${token}` }});
                    setUserBalance(personalBalance.data[0]);
                    

                } else {
                    setError("Usuario no encontrado");
                }
            } catch (err) {
            setError(err instanceof Error ? err.message : "Error al obtener los datos");
            }
        };

    fetchUserBalance();
    }, [user?.email]);

    return (
        <>
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        )}
        <Card
            title="Gross Income"
            value={0}
            pillText="2.75%"
            trend="up"
            period="From Jan 1st - Jul 31st"
        />

        <Card
            title="Total Balance"
            value={userBalance?.user_balance || null}
            pillText="1.01%"
            trend="down"
            period="From Jan 1st - Jul 31st"
        />

        <Card
            title="Trailing Year"
            value={0}
            pillText="60.75%"
            trend="up"
            period="Previous 365 days"
        />
        </>
    )
}

export const Card = ({title, value, pillText, trend, period }: {title: string, value: number | null, pillText: string, trend: "up" | "down", period: string}) => {
    return (
        <div className="p-4 col-span-4 rounded border border-stone-300 shadow">
            <div className="flex mb-8 items-start justify-between">
                <div>
                    <h3 className="text-stone-500 text-sm">{title}</h3>
                    <p className="text-3xl font-semibold">€ {value?.toLocaleString('en')}</p>
                </div>

                <span className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}{pillText}
                </span>
            </div>

            <p className="text-xs text-stone-500">{period}</p>
        </div>  
    )
}