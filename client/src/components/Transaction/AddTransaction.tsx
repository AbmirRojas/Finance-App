import { FaMoneyBillWheat } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

interface UserData {
    id_user: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    balance: number; 
}

interface FormData {
    id_member: number;
    category: string;
    merchant: string;
    date: string; // Cambiado de Date a string
    amount: number;
    type: string;
}

export default function AddTransaction() {
    const { user } = useUser();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [transactionType, setTransactionType] = useState("");

    // Función para obtener la fecha actual en formato YYYY-MM-DD
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState<FormData>({
        id_member: 0, // Inicializar con 0, se actualizará cuando userData esté disponible
        category: "",
        merchant: "",
        date: getCurrentDate(), // Usar string en formato correcto
        amount: 0,
        type: "",
    });

    // Actualizar formData cuando userData cambie
    useEffect(() => {
        if (userData) {
            setFormData(prev => ({
                ...prev,
                id_member: userData.id_user
            }));
        }
    }, [userData]);

    // Actualizar el tipo de transacción en formData cuando transactionType cambie
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            type: transactionType
        }));
    }, [transactionType]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'amount' ? parseFloat(value) || 0 : value 
        }));
    };

    const handleTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:3000/addTransaction", {
                id_member: formData.id_member,
                merchant: formData.merchant,
                category: formData.category,
                date: formData.date,
                amount: formData.amount,
                transactionType: formData.type,
            }, {
                headers: { Authorization: `Bearer ${token}` } // Headers deben ir en el tercer parámetro
            });

            // Limpiar el formulario después de enviar exitosamente
            setFormData({
                id_member: userData?.id_user || 0,
                category: "",
                merchant: "",
                date: getCurrentDate(),
                amount: 0,
                type: "",
            });
            setTransactionType("");
            
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error al registrar la transacción");
            }
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.category.trim()) {
            setError("La categoría es requerida");
            return false;
        }
        if (!formData.merchant.trim()) {
            setError("El merchant es requerido");
            return false;
        }
        if (!formData.date) {
            setError("La fecha es necesaria");
            return false;
        }
        if (!formData.amount || formData.amount <= 0) {
            setError("Ingresa una cantidad válida para la transacción");
            return false;
        }
        if (!formData.type.trim()) {
            setError("El tipo de transacción es necesario");
            return false;
        }
        return true;
    };

    const handleCancel = () => {
        setFormData({
            id_member: userData?.id_user || 0,
            category: "",
            merchant: "",
            date: getCurrentDate(),
            amount: 0,
            type: "",
        });
        setTransactionType("");
        setError("");
    };

    useEffect(() => {
        if (!user?.email) return;

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<UserData[]>("http://localhost:3000/getAllUsers", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const matchedUser = response.data.find(
                    (data) => data.email === user.email
                );

                if (matchedUser) {
                    setUserData(matchedUser);
                } else {
                    setError("Usuario no encontrado");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error al obtener los datos");
            }
        };

        fetchUserData();
    }, [user?.email]);
    
    return (
        <div className="col-span-12 flex flex-col items-center border border-stone-300 rounded shadow px-4">
            <h2 className="flex items-center gap-1.5 text-2xl font-medium my-3">
                <FaMoneyBillWheat /> Add Transaction
            </h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleTransaction} className="w-full">
                <div className="flex items-center justify-between w-full px-2 py-1.5 gap-2">
                    <div>
                        <select 
                            name="transactionTypeSelect" 
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            className='bg-stone-200 rounded p-1 text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400 cursor-pointer min-w-[140px]'
                            required
                        >
                            <option value="" className="text-stone-400">Income or Expense</option>
                            <option value="income" className="font-medium">Income</option>
                            <option value="expense" className="font-medium">Expense</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center px-2 py-1.5 gap-2">
                        <input 
                            name="merchant" 
                            className='bg-stone-200 rounded p-1 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400' 
                            type="text" 
                            placeholder='Merchant'
                            value={formData.merchant}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            name="category" 
                            className='bg-stone-200 rounded p-1 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400' 
                            type="text" 
                            placeholder='Category'
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            name="date" 
                            className='bg-stone-200 rounded p-1 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400' 
                            type="date" 
                            value={formData.date}
                            onChange={handleInputChange}
                            required
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
                            min="0.01"
                            value={formData.amount || ''}
                            onChange={handleInputChange}
                            required
                        />   
                    </div>
                    
                    <div className="flex items-center px-2 py-1.5 gap-2">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-stone-950 hover:bg-stone-500 disabled:bg-stone-400 rounded flex items-center justify-center p-1.5 transition-colors text-stone-100"
                        >
                            {loading ? "Loading..." : "Add"}
                        </button>
                        <button 
                            type="button"
                            onClick={handleCancel}
                            className="bg-stone-200 hover:bg-stone-400 rounded flex items-center justify-center p-1.5 transition-colors text-stone-950"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}