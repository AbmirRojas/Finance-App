import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserImages from "../components/RegisterForm/UserImages";
import Inputs from "../components/RegisterForm/Inputs";
import { useUser } from "../context/UserContext"; 

export default function Register() {
  const { setUser } = useUser(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (imageNumber: number, currentPage: number) => {
    const imageId = `adventurer-${currentPage + imageNumber}`;
    setSelectedImage(imageId);
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return setError("El nombre es requerido"), false;
    if (!formData.lastName.trim()) return setError("El apellido es requerido"), false;
    if (!formData.email.trim()) return setError("El email es requerido"), false;
    if (!formData.password) return setError("La contraseña es requerida"), false;
    if (formData.password !== formData.confirmPassword) return setError("Las contraseñas no coinciden"), false;
    if (formData.password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres"), false;
    if (!selectedImage) return setError("Por favor selecciona una imagen de perfil"), false;
    return true;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        profileImage: selectedImage
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user); // Ahora sí podemos usarlo desde contexto
        navigate("/home");
      } else {
        navigate("/login");
      }

    } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error al registrarse");
            }
        }
    };

  return (
    <div className="bg-white rounded-lg p-4 shadow my-2.5 mx-2.5 px-4 flex justify-center items-center">
      <div className="p-8 rounded-2xl border border-stone-100 shadow-xl w-1/2 flex flex-col justify-center gap-8 bg-white">
        <div className="flex flex-col items-center text-center space-y-3">
          <h1 className="text-4xl font-bold text-stone-900">Congrats on Being the<br />
            <span className="text-stone-600">Next Participant!</span>
          </h1>
          <p className="text-xl text-stone-400 font-light">Welcome</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-stone-700">Select an Image</h2>
            <UserImages onImageSelect={handleImageSelect} selectedImage={selectedImage} />
          </div>

          <div className="space-y-3">
            <Inputs formData={formData} onChange={handleInputChange} />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-950 hover:bg-stone-500 disabled:bg-stone-400 text-stone-100 font-semibold py-3 px-6 rounded transition-colors duration-200"
            >
              {loading ? "Registrando..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-4">
          <p className="text-lg text-stone-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
