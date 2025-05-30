import UserImages from "../components/RegisterForm/UserImages"
import Inputs from "../components/RegisterForm/Inputs"

export default function Register() {
    return (
        <div className="bg-white rounded-lg p-4 shadow my-2.5 mx-2.5 px-4 flex justify-center items-center">
            <div className="p-8 rounded-2xl border border-stone-100 shadow-xl w-1/2 h-1/2 flex flex-col justify-center gap-8 bg-white">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <h1 className="text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                        Congrats on Being the<br/>
                        <span className="text-stone-600">Next Participant!</span>
                    </h1>
                    <p className="text-xl text-stone-400 font-light">
                        Welcome
                    </p>
                </div>
                
                {/* Image Selection Section */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-stone-700">
                        Select an Image
                    </h2>
                    <UserImages />
                </div>
                
                {/* Inputs Section */}
                <div className="space-y-3">
                    <Inputs />
                </div>
                
                {/* Button Section */}
                <div className="mt-4">
                    <button className="w-full bg-stone-950 hover:bg-stone-500 text-stone-100 font-semibold py-3 px-6 rounded">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}
