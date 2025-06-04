export default function TransactionTopBar() {
    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block">Here you can add a new income or expense</span>
                    <span className="text-xs block text-stone-500">Fill all the fields</span>
                </div>      
            </div>
        </div>
    )
}