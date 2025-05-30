import LogoImg from "../assets/logo.png"
import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className="bg-white rounded-lg p-4 shadow my-2.5 mx-2.5 px-4 flex justify-center items-center">
            <div className="p-8 rounded-2xl border border-stone-100 shadow-xl w-1/2 h-1/2 flex flex-col justify-center gap-6 bg-white">
                {/* Logo Section */}
                <div className="flex flex-col items-center justify-center">
                    <img className="w-[250px]" src={LogoImg} alt="Logo" />
                </div>
                
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <h1 className="text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                        Log Into Your Account
                    </h1>
                    <p className="text-lg text-stone-400 font-light">
                        Managing Your Finances Has Never Been This Easy
                    </p>
                </div>
                
                {/* Form Section */}
                <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
                    <input name="email" className='bg-transparent placeholder:text-stone-400 focus:outline-none' type="text" placeholder='Email'/>
                </div>
                <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
                    <input name="password" className='bg-transparent placeholder:text-stone-400 focus:outline-none' type="text" placeholder='Password'/>
                </div>
                
                {/* Login Button */}
                <div className="bg-stone-950 hover:bg-stone-500 rounded flex items-center justify-center h-12 text-xl font-semibold">
                    <button className="text-stone-100">Login</button>
                </div>
                
                {/* Sign Up Link */}
                <div className="flex items-center justify-center mt-4">
                    <p className="text-lg text-stone-600">
                        Don&apos;t Have an Account?{' '}
                        <Link to="/register" className="text-violet-600 hover:text-violet-700 font-semibold hover:underline transition-colors duration-200">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}