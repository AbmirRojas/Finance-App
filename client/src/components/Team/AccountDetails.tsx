import { BsFillPersonVcardFill } from "react-icons/bs";
import spriteUrl from '../../assets/sprite.svg';

export default function AccountDetails({ userName, userEmail, imgAdventurer }: { userName: string, userEmail: string, imgAdventurer: string }) {
    return (
        <>
        <div className="border rounded border-stone-300 col-span-8 flex flex-col items-center shadow p-1.5 gap-1.5">
            <h2 className="flex items-center gap-1.5 text-2xl font-medium my-3"><BsFillPersonVcardFill /> Personal Account</h2>

            <div className="border rounded border-stone-200 w-3/4 flex items-center justify-between gap-1.5 p-1.5">
                <div className="flex items-center gap-1">
                    <svg className='size-10 rounded shrink-0 bg-violet-500 shadow'>
                        <use xlinkHref={`${spriteUrl}${imgAdventurer}`}></use>
                    </svg>
                    <div>
                        <span className="font-medium block">{userName}</span>
                        <span className="font-light text-stone-500 block">{userEmail}</span>
                    </div>
                </div>
                <div className="flex items center">
                    <div className="rounded bg-stone-200 hover:bg-violet-200 hover:text-violet-600 p-1 mr-1">
                        <button>Edit Data</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}