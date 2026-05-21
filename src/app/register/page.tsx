"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    
    const res = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    });
    
    if (res.ok) {
      alert("Registration successful! Please login.");
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="glass-panel p-10 rounded-2xl w-96 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-blue-400 focus:outline-none transition" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-blue-400 focus:outline-none transition" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-500 p-3 rounded-xl font-bold hover:bg-blue-400 transition shadow-lg shadow-blue-500/25">Register</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
