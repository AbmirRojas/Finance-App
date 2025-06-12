import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaMoneyBillTransfer } from "react-icons/fa6";
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

interface MonthlyBarData {
  name: string;
  Income: number;
  Expenses: number;
}

export default function BarGraph() {
  const { user } = useUser();
  const [chartData, setChartData] = useState<MonthlyBarData[]>([]);
  const [error, setError] = useState("");
  const [semester, setSemester] = useState<"first" | "second">("first");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) return;

      try {
        const token = localStorage.getItem("token");

        const usuarios = await axios.get<UserData[]>(
          "http://localhost:3000/getAllUsers",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const usuario = usuarios.data.find((u) => u.email === user.email);
        if (!usuario) {
          setError("Usuario no encontrado");
          return;
        }

        const transacciones = await axios.get<TransactionDatabase[]>(
          `http://localhost:3000/userTransactions/${usuario.id_user}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const datos = agruparPorSemestre(transacciones.data, semester);
        setChartData(datos);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al obtener las transacciones"
        );
      }
    };

    fetchTransactions();
  }, [user?.email, semester]);

  function agruparPorSemestre(
    transacciones: TransactionDatabase[],
    semestre: "first" | "second"
  ) {
    const meses = [
      "Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec",
    ];
    const añoActual = new Date().getFullYear();
    const inicio = semestre === "first" ? 0 : 6;
    const fin = semestre === "first" ? 5 : 11;

    const resultado = Array.from({ length: fin - inicio + 1 }, (_, i) => ({
      name: meses[inicio + i],
      Income: 0,
      Expenses: 0,
    }));

    transacciones.forEach((tx) => {
      const fecha = new Date(tx.date);
      const mes = fecha.getMonth();
      const anio = fecha.getFullYear();

      if (anio === añoActual && mes >= inicio && mes <= fin) {
        const index = mes - inicio;
        if (tx.type === "income") {
          resultado[index].Income += tx.amount;
        } else if (tx.type === "expense") {
          resultado[index].Expenses += tx.amount;
        }
      }
    });

    return resultado;
  }

  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300 shadow">
      <div className="p-4 flex justify-between items-center">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FaMoneyBillTransfer /> Income & Expenses ({semester === "first" ? "Jan – June" : "July – Dec"})
        </h3>
        <button
          className="text-xs bg-blue-500 text-white px-0.5 py-0.5 rounded hover:bg-blue-600 transition"
          onClick={() => setSemester(semester === "first" ? "second" : "first")}
        >
          Switch to {semester === "first" ? "2nd" : "1st"} Semester
        </button>
      </div>

      {error && (
        <div className="px-4 text-sm text-red-600">
          Error: {error}
        </div>
      )}

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Income"
              fill="#60a5fa"
              activeBar={<Rectangle fill="#1e40af" stroke="blue" />}
            />
            <Bar
              dataKey="Expenses"
              fill="#f87171"
              activeBar={<Rectangle fill="#166534" stroke="red" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
