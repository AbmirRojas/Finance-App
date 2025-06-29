import { useState } from "react";
import LogoImg from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext"; 

export default function Login() {
  const { setUser } = useUser(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password
      });

      localStorage.setItem("token", response.data.token); // guarda token
      setUser(response.data.user); // actualiza el contexto global
      navigate("/home"); // redirige 

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error al iniciar sesión");
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow my-2.5 mx-2.5 px-4 flex justify-center items-center">
      <div className="p-8 rounded-2xl border border-stone-100 shadow-xl w-1/2 h-1/2 flex flex-col justify-center gap-6 bg-white">
        <div className="flex flex-col items-center justify-center">
          <img className="w-[250px]" src={LogoImg} alt="Logo" />
        </div>

        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-4xl font-bold text-stone-900">
            Log Into Your Account
          </h1>
          <p className="text-lg text-stone-400 font-light">
            Managing Your Finances Has Never Been This Easy
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
            <input
              name="email"
              className="bg-transparent placeholder:text-stone-400 focus:outline-none w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="bg-stone-200 w-full rounded flex items-center px-2 py-1.5">
            <input
              name="password"
              className="bg-transparent placeholder:text-stone-400 focus:outline-none w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-stone-950 hover:bg-stone-500 disabled:bg-stone-400 rounded flex items-center justify-center h-12 text-xl font-semibold text-stone-100 transition-colors duration-200"
          >
            {loading ? "Iniciando sesión..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <p className="text-lg text-stone-600">
            Don&apos;t Have an Account?{" "}
            <Link
              to="/register"
              className="text-violet-600 hover:text-violet-700 font-semibold hover:underline transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
