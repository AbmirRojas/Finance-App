import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import axios from "axios";
import { useUser } from "../../context/UserContext";

interface TransactionDatabase {
  id_transaction: number;
  category: string;
  id_member: number;
  amount: number;
  date: Date;
  merchant: string;
  type: "income" | "expense";
}

interface UserData {
  id_user: number;
  email: string;
}

interface MonthlyIncomeData {
  name: string;
  Income: number;
}

export default function ActivityGraph() {
  const { user } = useUser();
  const [data, setData] = useState<MonthlyIncomeData[]>([]);
  const [semester, setSemester] = useState<"first" | "second">("first");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      try {
        const token = localStorage.getItem("token");
        const users = await axios.get<UserData[]>(
          "http://localhost:3000/getAllUsers",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const currentUser = users.data.find((u) => u.email === user.email);
        if (!currentUser) {
          setError("Usuario no encontrado");
          return;
        }

        const transactions = await axios.get<TransactionDatabase[]>(
          `http://localhost:3000/userTransactions/${currentUser.id_user}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const graphData = generateMonthlyIncomeData(transactions.data, semester);
        setData(graphData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al obtener las transacciones"
        );
      }
    };

    fetchData();
  }, [user?.email, semester]);

  function generateMonthlyIncomeData(
    transactions: TransactionDatabase[],
    semester: "first" | "second"
  ) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const year = new Date().getFullYear();
    const start = semester === "first" ? 0 : 6;
    const end = semester === "first" ? 5 : 11;

    const monthlyData: MonthlyIncomeData[] = Array.from({ length: end - start + 1 }, (_, i) => ({
      name: months[start + i],
      Income: 0,
    }));

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const txMonth = txDate.getMonth();
      const txYear = txDate.getFullYear();

      if (
        tx.type === "income" &&
        txYear === year &&
        txMonth >= start &&
        txMonth <= end
      ) {
        const index = txMonth - start;
        monthlyData[index].Income += tx.amount;
      }
    });

    return monthlyData;
  }

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300 shadow">
      <div className="p-4 flex justify-between items-center">
        <h3 className="flex items-center gap-1.5 font-medium">
          <RiMoneyEuroCircleLine /> Activity ({semester === "first" ? "Jan – June" : "July – Dec"})
        </h3>
        <button
          onClick={() => setSemester(semester === "first" ? "second" : "first")}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Switch to {semester === "first" ? "2nd" : "1st"} Semester
        </button>
      </div>

      {error && <div className="px-4 text-sm text-red-600">Error: {error}</div>}

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Income" stroke="#1d4ed8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
