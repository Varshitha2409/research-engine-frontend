"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Target, Loader2, AlertCircle } from "lucide-react";

export default function InsightsPage() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("latest_paper.pdf"); // Hardcoded for demo, normally selected from a list
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiUrl}/api/insights?filename=${filename}`);
      if (!response.ok) throw new Error("Failed to fetch insights");
      const data = await response.json();
      setInsights(data.insights);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      // Fallback mock data if backend isn't ready
      setInsights({
        summary: "The recent literature emphasizes a massive shift towards transformer architectures. Attention mechanisms allow for highly parallelizable training.",
        future_scope: "- Enhancing sparse attention models.\n- Multimodal knowledge graphs.\n- Robust evaluation metrics.",
        methodology: "Transformer architecture utilizing self-attention mechanism.",
        keywords: "Machine Learning, Neural Networks, Transformer, Attention"
      });
    } finally {
      setLoading(false);
    }
  }, [apiUrl, filename]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Generated Insights</h2>
          <p className="text-gray-400 mt-2">Deep analysis and synthesized summaries of {filename}</p>
        </div>
        <button onClick={fetchInsights} disabled={loading} className="px-4 py-2 glass rounded-lg text-sm hover:bg-white/5 transition flex items-center">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Refresh"}
        </button>
      </motion.div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error} (Showing fallback insights)
        </div>
      )}

      {!insights && loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : insights ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Lightbulb className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-primary">Executive</span> Summary
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {insights.summary}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Target className="w-24 h-24 text-blue-400" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-blue-400">Future</span> Scope
                </h3>
                <div className="space-y-4 text-gray-300 whitespace-pre-wrap">
                  {insights.future_scope}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-4">Extracted Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {insights.keywords.split(',').map((kw: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {kw.trim()}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Methodology</h3>
            <p className="text-gray-300">{insights.methodology}</p>
          </motion.div>
        </>
      ) : null}
    </div>
  );
}
