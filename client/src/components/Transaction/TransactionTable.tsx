import { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa6"
import { FiArrowRight, FiMoreHorizontal } from "react-icons/fi"
import axios from "axios";

interface TransactionDatabase {
    id_transaction: number;
    category: string;
    id_member: number;
    amount: number;
    date: Date;
    merchant: string;
    type: "income" | "expense";
}



export default function TransactionTable() {
    const [error, setError] = useState("");
    const [transactionData, setTeamTransactions] = useState<TransactionDatabase[] | null>(null);
 
    useEffect(() => {

        const fetchTransactionsData = async () => {
            try {
            const token = localStorage.getItem("token");
            const response = await axios.get<TransactionDatabase[]>("http://localhost:3000/getTeamTransactions", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTeamTransactions(response.data);
            
            } catch (err) {
            setError(err instanceof Error ? err.message : "Error al obtener los datos");
            }
        };

    fetchTransactionsData();
    }, []);

    return (
        <div className="col-span-12 border border-stone-300 rounded shadow p-4">
            <div className="flex items-center justify-center">
                <h2 className="flex items-center gap-1.5 text-2xl font-medium my-3"><FaDollarSign />All Team Transactions</h2>
            </div> 

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <table className="w-full table-auto">
                <TableHead />
                <tbody>
                    {transactionData && transactionData.map((rowData, index) => (
                        <TableRow
                            key={index}
                            id={rowData.id_transaction}
                            merchant={rowData.merchant}
                            date={rowData.date.toString()}
                            amount={rowData.amount}
                            order={index+1}
                        />
                    ))} 
                </tbody>
            </table>
        </div>
    )
}

const TableHead = () => {
    return (
        <thead>
            <tr className="text-sm font-normal text-stone-500">
                <th className="text-start p-1.5">ID</th>
                <th className="text-start p-1.5">Merchant</th>
                <th className="text-start p-1.5">Date</th>
                <th className="text-start p-1.5">Amount</th>
                <th className="w-8"></th>
            </tr>
        </thead>
    )
}

const TableRow = ({ id, merchant, date, amount, order }: { id: number, merchant: string, date: string, amount: number, order: number }) => {
    return  (
        <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm" }>
            <td className="p-1.5">
                <a href="" className="text-violet-600 underline flex items-center gap-1">
                    {id} <FiArrowRight />
                </a>
            </td>
            <td className="p-1.5">{merchant}</td>
            <td className="p-1.5">{date}</td>
            <td className="p-1.5">{amount}</td>
            <td>
                <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
                    <FiMoreHorizontal />
                </button>
            </td>
        </tr>
    )
}