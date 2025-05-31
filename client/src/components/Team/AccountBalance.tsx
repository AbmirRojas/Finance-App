

export default function AccountBalance({balance}: {balance: number}) {
    return (
        <div className="p-4 col-span-3 rounded border border-stone-300 shadow">
            <div className="flex mb-8 items-start justify-between">
                <div>
                    <h3 className="text-stone-500 text-sm">Team Total Balance</h3>
                    <p className="text-3xl font-semibold">$ {balance.toLocaleString('en')}</p>
                </div>
            </div>
            
            <p className="text-xs text-stone-500">From Jan 1st - Jul 31st</p>
        </div>  
    )
}