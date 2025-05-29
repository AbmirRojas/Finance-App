export default function Logout() {
    return (
        <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2 border-stone-300 justify-end text-xs">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font bold">Finatic</p>
                    <p className="text-stone-500">Hello</p>
                </div>
                <button className="px-2 py-1.5 font-medium bg-stone-950 hover:bg-stone-700 text-stone-50 transition-colors rounded">
                    Logout
                </button>
            </div>
        </div>
    )
}