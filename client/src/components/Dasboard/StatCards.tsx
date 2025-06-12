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

interface TransactionDatabase {
    id_transaction: number;
    category: string;
    id_member: number;
    amount: number;
    date: Date;
    merchant: string;
    type: "income" | "expense";
}

export default function StatCards() {
    const { user } = useUser();
    const [error, setError] = useState("");
    const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
    const [grossIncome, setGrossIncome] = useState<number | null>(null);
    const [incomeTrend, setIncomeTrend] = useState<"up" | "down" | null>(null);
    const [balanceTrend, setBalanceTrend] = useState<"up" | "down" | null>(null);
    const [yearTotal, setYearTotal] = useState<number | null>(null);



    function calculateGrossIncome(userTransactions: TransactionDatabase[]) {
        const incomeTotal = userTransactions
            .filter((transaction) => transaction.type === "income")
            .reduce((acc, transaction) => acc + transaction.amount, 0);
    
        return incomeTotal;
    }

    function calculateTotalExpense(userTransactions: TransactionDatabase[]) {
        const expenseTotal = userTransactions
            .filter((transaction) => transaction.type === "expense")
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        return expenseTotal;
    }

    function calcularBalanceAnual(transacciones: TransactionDatabase[]) {
    const hoy = new Date();
    const inicioDelAnio = new Date(hoy.getFullYear(), 0, 1); // Enero 1

    const transaccionesDelAnio = transacciones.filter((tx) =>
        new Date(tx.date) >= inicioDelAnio && new Date(tx.date) <= hoy
    );

    const ingresos = transaccionesDelAnio
        .filter(tx => tx.type === "income")
        .reduce((acc, tx) => acc + tx.amount, 0);

    const gastos = transaccionesDelAnio
        .filter(tx => tx.type === "expense")
        .reduce((acc, tx) => acc + tx.amount, 0);

    return ingresos - gastos;
}




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
                    
                    const userTransactions = await axios.get<TransactionDatabase[]>(`http://localhost:3000/userTransactions/${matchedUser.id_user}`, {
                    headers: { Authorization: `Bearer ${token}` }});
                    
                    const totalIncome = calculateGrossIncome(userTransactions.data);
                    setGrossIncome(totalIncome);
                    const totalExpenses = calculateTotalExpense(userTransactions.data);
                    

                    const totalAnual = calcularBalanceAnual(userTransactions.data);
                    setYearTotal(totalAnual);


                    if (totalIncome >= totalExpenses) {
                        setIncomeTrend("up");
                    } else{
                        setIncomeTrend("down");
                    }
                    if (userTransactions.data[0].type === "expense") {
                        setBalanceTrend("down");
                    } else {
                        setBalanceTrend("up");
                    }
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
            value={grossIncome || null}
            pillText="%"
            trend={incomeTrend}
            period="Since account creation"
        />

        <Card
            title="Total Balance"
            value={userBalance?.user_balance || null}
            pillText="%"
            trend={balanceTrend}
            period="Since account creation"
        />

        <Card
            title="Year Total"
            value={yearTotal}
            pillText="%"
            trend={yearTotal && yearTotal >= 0 ? "up" : "down"}
            period="Since Jan 1st"
        />
        </>
    )
}

export const Card = ({title, value, pillText, trend, period }: {title: string, value: number | null, pillText: string, trend: "up" | "down" | null, period: string}) => {
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