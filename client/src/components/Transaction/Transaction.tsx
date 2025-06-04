import TransactionTopBar from "./TransactionTopBar"
import AddTransaction from "./AddTransaction"
import TransactionTable from "./TransactionTable"

export default function Transaction() {
    return (
        <div className="bg-white rounded-lg pb-4 shadow">
            <TransactionTopBar />
            <div className="px-4 grid grid-cols-12 gap-3">
                <AddTransaction />
                <TransactionTable />
            </div>
        </div>
    )
}