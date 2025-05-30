export default function Inputs () {
    return (
        <>
        <div className="flex gap-4">
            <div className="bg-stone-200 w-1/2 rounded flex items-center px-2 py-1.5">
                <input name="fName" className='bg-transparent placeholder:text-stone-400 focus:outline-none' type="text" placeholder='First Name'/>
            </div>
            <div className="bg-stone-200 w-1/2 rounded flex items-center px-2 py-1.5">
                <input name="lName" className='bg-transparent placeholder:text-stone-400 focus:outline-none' type="text" placeholder="Last Name" />
            </div>
        </div>
        <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
            <input name="email" className=' bg-transparent placeholder:text-stone-400 focus:outline-none' type="text" placeholder='Email'/>
        </div>
        <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
            <input name="password" className=' bg-transparent placeholder:text-stone-400 focus:outline-none' type="text" placeholder='Password'/>
        </div>
        <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
            <input name="password" className=' bg-transparent placeholder:text-stone-400 focus:outline-none' type="text" placeholder='Confirm Password'/>
        </div>
        </>
    )
}