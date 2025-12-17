import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Shield, Terminal, Activity, Lock, Cpu, 
  Network, Scan, AlertTriangle, Eye, Server, 
  Database, Code, Radio, Zap, ChevronRight,
  Globe, Command
} from 'lucide-react';

/* --- UTILITY COMPONENTS --- */

// 1. CRT/Scanline Overlay
const ScanlineOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
    {/* Scanlines */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
    {/* Vignette */}
    <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none" />
  </div>
);

// 2. Matrix Rain Background
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / 20);
    const drops = new Array(columns).fill(1);
    
    // Katakana + Binary
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

    const draw = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0ea5e9'; // Sky-500 (Cyan-ish)
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        // Randomly color some characters green/emerald for "The Matrix" feel mixed with our blue theme
        ctx.fillStyle = Math.random() > 0.95 ? '#10b981' : '#0ea5e9'; 
        
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />;
};

// 3. Glitch Text Component
const GlitchText = ({ text, className = "", size = "text-4xl" }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className={`relative z-10 ${size} font-black tracking-tighter text-white`}>{text}</span>
      <span className={`absolute top-0 left-0 -z-10 ${size} font-black tracking-tighter text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] animate-pulse`}>{text}</span>
      <span className={`absolute top-0 left-0 -z-10 ${size} font-black tracking-tighter text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] animate-pulse delay-75`}>{text}</span>
    </div>
  );
};

// 4. Neon Button
const NeonButton = ({ children, color = "cyan", onClick }) => {
  const colors = {
    cyan: "border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    emerald: "border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    red: "border-red-500 text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 border ${colors[color]} uppercase tracking-widest text-xs md:text-sm font-bold transition-all duration-300 relative overflow-hidden group`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
    </motion.button>
  );
};

/* --- MAIN SECTIONS --- */

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
    <div className="relative z-10 max-w-5xl w-full text-center">
      {/* Glitchy Status Label */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="flex justify-center mb-6"
      >
        <div className="border border-emerald-500/50 bg-emerald-950/30 px-4 py-1 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-mono text-xs tracking-[0.2em] uppercase">System Online // Monitoring Active</span>
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-500 mb-2 tracking-tighter">
          ZERO-DAY
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-400 tracking-tight mb-8">
          ATTACK DETECTION
        </h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-slate-400 font-mono text-sm md:text-lg max-w-2xl mx-auto mb-12 border-l-2 border-cyan-500 pl-4 text-left md:text-center md:border-l-0"
      >
        INITIATING PROTOCOL: <span className="text-white font-bold">TABA</span> <br className="hidden md:block"/>
        <span className="text-cyan-400">Topology-Aware Boundary Approximation</span> enabled.
      </motion.p>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col md:flex-row items-center justify-center gap-6"
      >
        <NeonButton color="cyan">
          <Activity size={18} /> Begin Scan
        </NeonButton>
        <NeonButton color="emerald">
          <Terminal size={18} /> Open Intelligence Panel
        </NeonButton>
      </motion.div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute bottom-10 left-10 hidden md:block">
      <div className="text-slate-600 font-mono text-xs flex flex-col gap-1">
        <span>COORDS: 34.0522° N, 118.2437° W</span>
        <span>SERVER: US-WEST-2 [ENCRYPTED]</span>
      </div>
    </div>
    <div className="absolute top-32 right-10 hidden md:block">
       <Scan className="text-cyan-500/30 w-16 h-16 animate-spin-slow" />
    </div>
  </section>
);

const FeatureCard = ({ title, subtitle, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -10, boxShadow: "0 0 25px rgba(6,182,212,0.15)" }}
    className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-8 rounded-none relative group overflow-hidden"
  >
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500" />

    <div className="mb-6 relative">
      <div className="w-14 h-14 bg-slate-800 flex items-center justify-center border border-slate-600 group-hover:border-cyan-400 transition-colors">
        <Icon className="text-white group-hover:text-cyan-400 transition-colors" size={28} />
      </div>
      <div className="absolute -right-2 -top-2 text-[10px] font-mono text-slate-600">0x{Math.floor(Math.random()*999)}</div>
    </div>

    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
    <p className="text-slate-400 font-mono text-xs mb-4 text-emerald-500/80">{subtitle}</p>
    
    <div className="h-px w-full bg-slate-800 group-hover:bg-cyan-900 transition-colors mb-4" />
    
    <div className="flex flex-wrap gap-2">
       {[...Array(3)].map((_,i) => (
         <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 font-mono">
           {['HEX', 'BIN', 'OCT'][i]}:{Math.floor(Math.random() * 100)}
         </span>
       ))}
    </div>
  </motion.div>
);

const CoreFeatures = () => (
  <section className="py-24 px-6 bg-slate-950 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2">SYSTEM <span className="text-cyan-500">MODULES</span></h2>
          <p className="text-slate-500 font-mono">DEPLOYING COUNTER-MEASURES...</p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-emerald-500 font-mono text-sm animate-pulse">STATUS: OPTIMAL</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Database}
          title="Hybrid Clustering"
          subtitle="K-MEANS + GMM AGGREGATION"
          delay={0.1}
        />
        <FeatureCard 
          icon={Radio}
          title="Boundary Mapping"
          subtitle="SEMICIRCULAR GEOMETRY"
          delay={0.3}
        />
        <FeatureCard 
          icon={AlertTriangle}
          title="Anomaly Radar"
          subtitle="ZERO-DAY PATTERN RECOGNITION"
          delay={0.5}
        />
      </div>
    </div>
  </section>
);

const Node = ({ title, icon: Icon, delay }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 200, delay }}
    className="relative flex flex-col items-center gap-4 z-10 group"
  >
    <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <Icon className="text-cyan-500 group-hover:text-white transition-colors" size={32} />
    </div>
    <div className="absolute -top-8 bg-slate-800 text-cyan-400 text-[10px] px-2 py-1 font-mono border border-cyan-900 opacity-0 group-hover:opacity-100 transition-opacity">
      NODE_ID: {title.substring(0,3).toUpperCase()}
    </div>
    <span className="font-mono text-xs text-center text-slate-300 max-w-[120px] font-bold">{title}</span>
  </motion.div>
);

const Connector = () => (
  <div className="hidden md:block flex-1 h-px bg-slate-800 relative overflow-hidden mx-2">
    <motion.div 
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
    />
  </div>
);

const SystemArchitecture = () => (
  <section className="py-24 bg-slate-950 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,rgba(0,0,0,0)_70%)]" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono text-white">
          <span className="text-emerald-500">{'>'}</span> TABA ARCHITECTURE FLOW
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        <Node title="Data Preprocessing" icon={Code} delay={0.1} />
        <Connector />
        <Node title="Clustering Engine" icon={Server} delay={0.3} />
        <Connector />
        <Node title="Boundary Gen" icon={Globe} delay={0.5} />
        <Connector />
        <Node title="Attack Injection" icon={Zap} delay={0.7} />
        <Connector />
        <Node title="Zero-Day Scoring" icon={Shield} delay={0.9} />
      </div>
    </div>
  </section>
);

const Dashboard = () => {
  const [logs, setLogs] = useState([
    "Initializing TABA v2.4...",
    "Loading Topology Map...",
    "Connecting to neural nodes...",
  ]);

  useEffect(() => {
    const messages = [
      "Analyzing packet header 0x4F...",
      "Traffic spike detected in Sector 7",
      "Normalizing vectors...",
      "Boundary check: PASSED",
      "Anomaly detected: 0.004% deviation",
      "Heuristic scan complete.",
      "Updating threat database...",
      "Re-calibrating threshold...",
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, messages[Math.floor(Math.random() * messages.length)]];
        if (newLogs.length > 8) newLogs.shift();
        return newLogs;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-slate-900 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Terminal */}
        <div className="bg-black border border-slate-700 rounded-sm p-1 font-mono text-sm relative overflow-hidden shadow-2xl">
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>TERMINAL // ROOT ACCESS</span>
            <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>
          <div className="p-4 h-64 flex flex-col justify-end">
            {logs.map((log, i) => (
              <div key={i} className="text-emerald-500 mb-1">
                <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                {">"} {log}
              </div>
            ))}
            <div className="animate-pulse text-emerald-500 mt-1">_</div>
          </div>
          {/* Screen Glare */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        </div>

        {/* Radar & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Radar */}
          <div className="bg-slate-950 border border-slate-700 p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <h3 className="absolute top-4 left-4 text-xs font-mono text-cyan-500">THREAT RADAR</h3>
            <div className="relative w-48 h-48 rounded-full border border-slate-700 bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] flex items-center justify-center">
              {/* Grid Lines */}
              <div className="absolute inset-0 rounded-full border border-slate-800 scale-50" />
              <div className="absolute inset-0 rounded-full border border-slate-800 scale-75" />
              <div className="absolute top-0 bottom-0 w-px bg-slate-800" />
              <div className="absolute left-0 right-0 h-px bg-slate-800" />
              
              {/* Sweep */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.5)_360deg)] animate-spin-slow opacity-30" />
              
              {/* Blip */}
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-10 right-12 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-700 p-4">
               <div className="text-xs text-slate-500 mb-1 font-mono">SILHOUETTE SCORE</div>
               <div className="text-4xl font-black text-white">98<span className="text-cyan-500">%</span></div>
               <div className="w-full h-1 bg-slate-800 mt-2">
                 <div className="w-[99.9%] h-full bg-cyan-500" />
               </div>
            </div>
            <div className="bg-slate-950 border border-slate-700 p-4">
               <div className="text-xs text-slate-500 mb-1 font-mono">LATENCY</div>
               <div className="text-4xl font-black text-white">1.2<span className="text-emerald-500 text-lg">ms</span></div>
               <div className="flex gap-1 mt-2">
                 {[...Array(10)].map((_,i) => (
                   <div key={i} className={`h-1 flex-1 ${i < 8 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                 ))}
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-12 border-t border-slate-800 text-center font-mono text-sm relative z-10">
    <div className="flex justify-center gap-8 mb-8 text-slate-500">
      {['DOCUMENTATION', 'API_KEY', 'GITHUB_REPO', 'ENCRYPTED_CHANNEL'].map(link => (
        <a key={link} href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">
          {link}
        </a>
      ))}
    </div>
    <div className="text-slate-700">
      <span className="animate-pulse">_</span> TABA SYSTEMS © 2025. ALL RIGHTS RESERVED.
    </div>
  </footer>
);

/* --- APP WRAPPER --- */

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/50 selection:text-white overflow-x-hidden font-sans">
      <style>{`
        .bg-radial-gradient-vignette {
          background: radial-gradient(circle, transparent 60%, rgba(0,0,0,0.8) 100%);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <ScanlineOverlay />
      <MatrixRain />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Shield className="text-cyan-500" />
           <span className="font-bold tracking-widest text-white">TABA<span className="text-cyan-500">.SEC</span></span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-mono text-xs text-slate-400">
             <span>CPU: 12%</span>
             <span>RAM: 4.2GB</span>
             <span>NET: CONNECTED</span>
          </div>
          <motion.a
            href="/client"
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all text-xs font-mono tracking-wider"
          >
            CLIENT LOGIN
          </motion.a>
        </div>
      </nav>

      <main>
        <Hero />
        <CoreFeatures />
        <SystemArchitecture />
        <Dashboard />
      </main>

      <Footer />
    </div>
  );
}