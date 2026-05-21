"use client";

import { motion } from "framer-motion";
import { FileText, Layers, Clock, Zap } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    { title: "Total Papers", value: "12", icon: FileText, color: "text-blue-400" },
    { title: "Vector Chunks", value: "1,245", icon: Layers, color: "text-purple-400" },
    { title: "Avg. Processing Time", value: "4.2s", icon: Clock, color: "text-green-400" },
    { title: "AI Queries", value: "84", icon: Zap, color: "text-yellow-400" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Overview</h2>
          <p className="text-gray-400 mt-1">Your research processing at a glance.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-xl flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-1 text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 rounded-xl min-h-[300px]"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Processing Activity</h3>
          <div className="flex items-center justify-center h-48 border border-dashed border-border/50 rounded-lg">
            <p className="text-gray-500">Chart Visualization Space</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-xl min-h-[300px]"
        >
          <h3 className="text-xl font-semibold mb-4">Top Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {["Machine Learning", "Neural Networks", "Transformer", "Attention", "Generative AI"].map((kw) => (
              <span key={kw} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {kw}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
