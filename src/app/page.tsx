"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, FileText, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="w-full glass z-50 sticky top-0 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-white">Insight<span className="text-primary">Engine</span></span>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <button className="px-5 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition border border-primary/20 font-medium">
              Launch App
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 text-center py-20">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-300">Next-gen AI Research Assistant</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Unlock Deep Insights from <br />
          <span className="text-gradient">Research Papers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl"
        >
          Upload PDFs, chat with local LLMs, and generate comprehensive research analytics in seconds. Powered by Ollama and RAG.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition shadow-[0_0_20px_rgba(120,20,255,0.4)]">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <button className="px-8 py-4 rounded-full glass font-bold text-white hover:bg-white/5 transition">
            View Demo
          </button>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full">
          {[
            { icon: FileText, title: "Smart PDF Parsing", desc: "Instantly process and chunk lengthy research papers with high accuracy." },
            { icon: Brain, title: "Local LLM Integration", desc: "Chat privately using Ollama models like Phi3 and Llama3 without cloud APIs." },
            { icon: Search, title: "Semantic Retrieval", desc: "Find exactly what you need with ChromaDB vector search and HuggingFace." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-start text-left hover:-translate-y-1 transition-transform"
            >
              <div className="p-3 rounded-lg bg-primary/20 text-primary mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Background Decorators */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse-glow" style={{ animationDelay: "1s" }} />
    </div>
  );
}
