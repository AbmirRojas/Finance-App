import { FaDollarSign } from "react-icons/fa6"
import { FiArrowRight, FiMoreHorizontal } from "react-icons/fi"

const TransactionData = [
    { id: "1", merchant: "amazon", date: "Aug 20", amount: "$-9.75" },
    { id: "2", merchant: "mercadona", date: "Aug 15", amount: "$-10.00" },
    { id: "3", merchant: "ebay", date: "Aug 10", amount: "$-25.00" },  
    { id: "4", merchant: "youtube", date: "Aug 2", amount: "$15.00" },    
];

export default function TransactionTable() {
 

    return (
        <div className="col-span-12 border border-stone-300 rounded shadow p-4">
            <div className="flex items-center justify-center">
                <h2 className="flex items-center gap-1.5 text-2xl font-medium my-3"><FaDollarSign />Transactions</h2>
            </div>
            <table className="w-full table-auto">
                <TableHead />
                <tbody>
                    {TransactionData.map((rowData, index) => (
                        <TableRow
                            key={index}
                            id={rowData.id}
                            merchant={rowData.merchant}
                            date={rowData.date}
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

const TableRow = ({ id, merchant, date, amount, order }: { id: string, merchant: string, date: string, amount: string, order: number }) => {
    return  (
        <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm" }>
            <td className="p-1.5">
                <a href="#" className="text-violet-600 underline flex items-center gap-1">
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