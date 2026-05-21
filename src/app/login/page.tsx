"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    
    const res = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    });
    
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="glass-panel p-10 rounded-2xl w-96 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500"></div>
        <h2 className="text-3xl font-bold mb-6 text-primary">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary focus:outline-none transition" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary focus:outline-none transition" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-primary p-3 rounded-xl font-bold hover:bg-primary/80 transition shadow-lg shadow-primary/25">Access Dashboard</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Do not have an account? <a href="/register" className="text-primary hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
