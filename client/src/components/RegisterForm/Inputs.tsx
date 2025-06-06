import React from "react";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface InputsProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Inputs({ formData, onChange }: InputsProps) {
    return (
        <>
            <div className="flex gap-4">
                <div className="bg-stone-200 w-1/2 rounded flex items-center px-2 py-1.5">
                    <input 
                        name="firstName" 
                        className='bg-transparent placeholder:text-stone-400 focus:outline-none w-full' 
                        type="text" 
                        placeholder='First Name'
                        value={formData.firstName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="bg-stone-200 w-1/2 rounded flex items-center px-2 py-1.5">
                    <input 
                        name="lastName" 
                        className='bg-transparent placeholder:text-stone-400 focus:outline-none w-full' 
                        type="text" 
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
            <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
                <input 
                    name="email" 
                    className='bg-transparent placeholder:text-stone-400 focus:outline-none w-full' 
                    type="email" 
                    placeholder='Email'
                    value={formData.email}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
                <input 
                    name="password" 
                    className='bg-transparent placeholder:text-stone-400 focus:outline-none w-full' 
                    type="password" 
                    placeholder='Password'
                    value={formData.password}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
                <input 
                    name="confirmPassword" 
                    className='bg-transparent placeholder:text-stone-400 focus:outline-none w-full' 
                    type="password" 
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={onChange}
                    required
                />
            </div>
        </>
    );
}