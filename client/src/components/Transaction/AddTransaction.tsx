import { FaMoneyBillWheat } from "react-icons/fa6";
import { useState } from "react";

export default function AddTransaction() {
    const [transactionType, setTransactionType] = useState("");
    
    return (
        <div className="col-span-12 flex flex-col items-center border border-stone-300 rounded shadow px-4">
            <h2 className="flex items-center gap-1.5 text-2xl font-medium my-3">
                <FaMoneyBillWheat /> Add Transaction
            </h2>
            <div className="flex items-center justify-between w-full px-2 py-1.5 gap-2">
                <div>
                    <select 
                        name="transactionType" 
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className='bg-stone-200 rounded p-1 text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400 cursor-pointer min-w-[140px]'
                    >
                        <option value="" className="text-stone-400">Income or Expense</option>
                        <option value="income" className="text-green-600 font-medium">Income</option>
                        <option value="expense" className="text-red-600 font-medium">Expense</option>
                    </select>
                </div>
                <div className="flex items-center px-2 py-1.5 gap-2">
                    <input 
                        name="merchant" 
                        className='bg-stone-200 rounded p-1 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400' 
                        type="text" 
                        placeholder='Merchant'
                    />
                    <input 
                        name="category" 
                        className='bg-stone-200 rounded p-1 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400' 
                        type="text" 
                        placeholder='Category'
                    />
                    <input 
                        name="date" 
                        className='bg-stone-200 rounded p-1 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400' 
                        type="date" 
                        placeholder='date'
                    />
                    <input 
                        name="amount" 
                        className={`bg-stone-200 rounded p-1 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 ${
                            transactionType === 'income' ? 'text-green-600' : 
                            transactionType === 'expense' ? 'text-red-600' : 'text-stone-700'
                        }`}
                        type="number" 
                        placeholder={
                            transactionType === 'income' ? '+Amount' : 
                            transactionType === 'expense' ? '-Amount' : 'Amount'
                        }
                        step="0.01"
                    />   
                </div>
                <div className="flex items-center px-2 py-1.5 gap-2">
                    <div className="bg-stone-950 hover:bg-stone-500 rounded flex items-center justify-center p-1.5 transition-colors">
                        <button className="text-stone-100">Add</button>
                    </div>
                    <div className="bg-stone-200 hover:bg-stone-400 rounded flex items-center justify-center p-1.5 transition-colors">
                        <button className="text-stone-950">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}