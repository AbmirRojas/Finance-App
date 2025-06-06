import { FaDollarSign } from "react-icons/fa6";
import { FiArrowRight, FiMoreHorizontal } from "react-icons/fi"

export default function RecentTransactions() {
    return(
        <div className="col-span-8 p-4 rounded border shadow border-stone-300">
            <div className="p-4 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FaDollarSign /> Recent Transactions
                </h3>       
                <button className="text-sm text-violet-500 hover:underline">See All</button>       
            </div>
            <table className="w-full table-auto">
                <TableHead />
                <tbody>
                    <TableRow
                        id="#48149"
                        merchant="Amazon"
                        date="Aug 2nd"
                        amount="$-9.75"
                        order={1}
                    />
                    <TableRow
                        id="#1942s"
                        merchant="Mercadona"
                        date="Aug 2nd"
                        amount="$-21.25"
                        order={2}
                    />
                    <TableRow
                        id="#4192"
                        merchant="Youtube"
                        date="Aug 1st"
                        amount="$94.75"
                        order={3}
                    />
                    <TableRow
                        id="#99481"
                        merchant="Adobe"
                        date="Aug 1st"
                        amount="$-9.44"
                        order={4}
                    />   
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