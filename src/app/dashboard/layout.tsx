"use client";

import { Brain, LayoutDashboard, MessageSquare, Upload, LineChart, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Papers", href: "/dashboard/upload", icon: Upload },
    { name: "AI Chat", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Insights", href: "/dashboard/insights", icon: LineChart },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-border/50 glass-panel z-10">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Brain className="w-6 h-6 text-primary mr-2" />
          <span className="text-lg font-bold">InsightEngine</span>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className="block relative">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? "text-primary font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                  <link.icon className="w-5 h-5 mr-3" />
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border/50">
          <button className="flex items-center px-4 py-2 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-0">
        {/* Animated Background for main area */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
        
        <header className="h-16 flex items-center justify-between px-8 border-b border-border/50 glass-panel">
          <h1 className="text-xl font-semibold capitalize">
            {pathname.split('/').pop() || 'Overview'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
