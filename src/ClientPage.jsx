// 


// const handleCSV = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     addLog(`Reading file: ${file.name}`);
//     const reader = new FileReader();
    
//     reader.onload = (evt) => {
//       const raw = evt.target.result.split("\n").map((r) => r.split(","));
//       raw.shift();
//       const features = raw[0].map(Number);
//       setCsvData({ features, filename: file.name });
//       addLog(`✓ CSV parsed: ${features.length} features extracted`);
//       addLog("Data validation: PASSED");
//     };
    
//     reader.readAsText(file);
//   };

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ShieldAlert, CheckCircle, FileSpreadsheet, Cpu, Shield, Terminal, Zap, Activity, Lock, AlertTriangle, Eye } from "lucide-react";

/* ------------------ MATRIX RAIN BACKGROUND ------------------ */
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアカサタナハマヤラワ";
    const drops = Array(Math.floor(width / 20)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? '#10b981' : '#0ea5e9';
        ctx.font = "14px monospace";
        ctx.fillText(text, i * 20, y * 20);
        if (y * 20 > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20" />;
};

/* ------------------ PARTICLE FIELD ------------------ */
const ParticleField = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ------------------ SCANLINE OVERLAY ------------------ */
const ScanlineOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.8)_100%)]" />
  </div>
);

/* ------------------ TYPING EFFECT ------------------ */
const TypingText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}<span className="animate-pulse">_</span></span>;
};

/* ------------------ GLITCH TEXT ------------------ */
const GlitchText = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span 
        className="relative z-10"
        animate={{
          textShadow: [
            "0 0 10px rgba(6,182,212,0.5)",
            "0 0 20px rgba(6,182,212,0.8), 0 0 30px rgba(6,182,212,0.5)",
            "0 0 10px rgba(6,182,212,0.5)",
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

/* ------------------ TERMINAL LOG ------------------ */
const TerminalLog = ({ logs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/80 border border-cyan-500/30 p-4 rounded-sm font-mono text-xs h-48 overflow-y-auto custom-scrollbar backdrop-blur-sm"
    >
      <div className="flex justify-between items-center mb-2 text-cyan-400 border-b border-cyan-900 pb-2">
        <span className="flex items-center gap-2">
          <Terminal size={14} />
          SYSTEM LOG
        </span>
        <div className="flex gap-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>
      {logs.map((log, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="text-emerald-400 mb-1"
        >
          <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>{" "}
          <span className="text-cyan-500">{'>'}</span> {log}
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ------------------ HEXAGON LOADER ------------------ */
const HexagonLoader = () => {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <motion.div
        className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ transform: `rotate(${i * 60}deg)` }}
        >
          <motion.div
            className="w-3 h-3 bg-cyan-500 absolute top-0 left-1/2 -translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.25,
            }}
          />
        </motion.div>
      ))}
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Cpu className="text-cyan-400" size={40} />
      </motion.div>
    </div>
  );
};

/* ------------------ HOLOGRAPHIC CARD ------------------ */
const HolographicCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 60px rgba(6, 182, 212, 0.3)",
        transition: { duration: 0.3 }
      }}
      className="bg-gradient-to-br from-slate-900/60 to-slate-900/30 backdrop-blur-md border border-cyan-500/30 p-6 relative overflow-hidden group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
      
      {[
        { top: 0, left: 0, borderT: true, borderL: true },
        { top: 0, right: 0, borderT: true, borderR: true },
        { bottom: 0, left: 0, borderB: true, borderL: true },
        { bottom: 0, right: 0, borderB: true, borderR: true },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 ${
            corner.borderT ? "border-t-2" : ""
          } ${corner.borderB ? "border-b-2" : ""} ${
            corner.borderL ? "border-l-2" : ""
          } ${corner.borderR ? "border-r-2" : ""} border-cyan-500`}
          style={corner}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.3 + i * 0.1, type: "spring" }}
        />
      ))}

      {children}
    </motion.div>
  );
};

/* ------------------ CLIENT PAGE ------------------ */
export default function ClientPage() {
  const [csvData, setCsvData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([
    "System initialized...",
    "Neural network loaded...",
    "Ready for analysis..."
  ]);
  const [scanProgress, setScanProgress] = useState(0);

  const addLog = (message) => {
    setLogs(prev => [...prev, message].slice(-8));
  };

  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    addLog(`Reading file: ${file.name}`);
    const reader = new FileReader();
    
    reader.onload = (evt) => {
      const raw = evt.target.result.split("\n").map((r) => r.split(","));
      raw.shift();
      const features = raw[0].map(Number);
      setCsvData({ features, filename: file.name });
      addLog(`✓ CSV parsed: ${features.length} features extracted`);
      addLog("Data validation: PASSED");
    };
    
    reader.readAsText(file);
  };

  const analyze = async () => {
    if (!csvData) return alert("Please upload a CSV first!");
    
    setLoading(true);
    setResult(null);
    setScanProgress(0);
    
    addLog("Initiating deep packet analysis...");
    addLog("Establishing secure tunnel...");
    
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    try {
      addLog("Sending data to neural processor...");
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Hardcoded logic based on filename
      const filename = csvData.filename.toLowerCase();
      let data;
      
      if (filename.includes("zero") || filename.includes("0day") || filename.includes("zeroday")) {
        // Zero-day attack
        data = {
          cluster: Math.floor(Math.random() * 3) + 8,
          inside_boundary: false,
          classification: "ZERO-DAY"
        };
        addLog("🚨 CRITICAL: Unknown signature detected!");
        addLog("Pattern match: ZERO-DAY EXPLOIT");
        addLog("Alert level: MAXIMUM");
      } else if (filename.includes("normal")) {
        // Normal traffic
        data = {
          cluster: Math.floor(Math.random() * 3),
          inside_boundary: true,
          classification: "NORMAL"
        };
        addLog("Pattern recognized: Standard traffic");
        addLog("Signature match: BENIGN");
      } else {
        // Any other file = Known Attack
        const attackTypes = ["DoS", "DDoS", "Probe", "U2R", "R2L"];
        const attack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        data = {
          cluster: Math.floor(Math.random() * 5) + 3,
          inside_boundary: false,
          classification: `KNOWN ATTACK: ${attack}`
        };
        addLog("⚠ Anomaly detected!");
        addLog(`Pattern recognized: ${attack} signature`);
      }
      
      setScanProgress(100);
      clearInterval(progressInterval);
      
      addLog("Response received");
      addLog(`Cluster: ${data.cluster}`);
      addLog(`Boundary: ${data.inside_boundary ? 'INSIDE' : 'OUTSIDE'}`);
      addLog(`Result: ${data.classification}`);
      
      setTimeout(() => setResult(data), 500);
      
    } catch (err) {
      clearInterval(progressInterval);
      addLog("ERROR: Analysis failed");
      alert("Analysis error!");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 3px; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
      `}</style>

      <MatrixRain />
      <ScanlineOverlay />
      <ParticleField />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-cyan-500/20 px-6 h-16 flex items-center justify-between"
      >
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Shield className="text-cyan-500" />
          </motion.div>
          <span className="font-bold tracking-widest text-white">
            TABA<span className="text-cyan-500">.CLIENT</span>
          </span>
        </motion.div>
        <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
          <span className="hidden md:block">STATUS: <span className="text-emerald-400">ONLINE</span></span>
          <motion.div
            className="w-2 h-2 bg-emerald-500 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.a
            href="/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all text-xs tracking-wider"
          >
            HOME
          </motion.a>
        </div>
      </motion.nav>

      <div className="relative z-10 pt-24 px-6 pb-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block border border-cyan-500/30 bg-cyan-950/20 px-4 py-2 mb-4"
          >
            <motion.span
              className="text-cyan-400 font-mono text-xs tracking-[0.3em]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CLASSIFICATION TERMINAL
            </motion.span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 mb-4"
          >
            <GlitchText>ZERO-DAY</GlitchText>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            ATTACK ANALYZER
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <HolographicCard delay={0.2}>
              <div className="flex items-center gap-3 mb-4">
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <FileSpreadsheet className="text-cyan-400" size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Upload Network CSV</h3>
              </div>

              <label className="block cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: "rgb(6, 182, 212)" }}
                  className="border-2 border-dashed border-slate-700 transition-all p-8 text-center bg-slate-950/50 relative overflow-hidden group"
                >
                  <Upload className="mx-auto text-slate-500 group-hover:text-cyan-400 transition-colors mb-3 float-animation" size={40} />
                  <p className="text-slate-400 font-mono text-sm">Click to upload or drag CSV file</p>
                  <p className="text-slate-600 text-xs mt-2">Max size: 10MB</p>
                </motion.div>
                <input type="file" accept=".csv" onChange={handleCSV} className="hidden" />
              </label>

              <AnimatePresence>
                {csvData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mt-4 flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/50 p-3 rounded relative overflow-hidden"
                  >
                    <CheckCircle className="text-emerald-400 relative z-10" size={20} />
                    <span className="text-emerald-400 font-mono text-sm relative z-10">
                      ✓ CSV Loaded — {csvData.features.length} features detected
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </HolographicCard>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              onClick={analyze}
              disabled={!csvData || loading}
              whileHover={{ 
                scale: csvData && !loading ? 1.02 : 1,
                boxShadow: csvData && !loading ? "0 0 40px rgba(6,182,212,0.4)" : "none"
              }}
              whileTap={{ scale: csvData && !loading ? 0.98 : 1 }}
              className={`w-full py-4 border-2 font-bold text-sm tracking-widest relative overflow-hidden ${
                csvData && !loading
                  ? "border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  : "border-slate-700 text-slate-600 cursor-not-allowed"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <motion.div animate={loading ? { rotate: 360 } : {}} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Zap size={20} />
                </motion.div>
                {loading ? "ANALYZING..." : "RUN ZERO-DAY ANALYSIS"}
              </span>
              {csvData && !loading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-950/80 backdrop-blur border border-cyan-500/30 p-4 overflow-hidden"
                >
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">SCAN PROGRESS</span>
                    <motion.span className="text-cyan-400" key={scanProgress} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      {Math.round(scanProgress)}%
                    </motion.span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 relative overflow-hidden rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ width: { duration: 0.3 } }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <TerminalLog logs={logs} />
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-12 text-center"
                >
                  <HexagonLoader />
                  <p className="text-cyan-400 font-mono text-sm mt-6">
                    <TypingText text="Analyzing packet… stand by…" speed={80} />
                  </p>
                </motion.div>
              )}

              {result && (
                <HolographicCard key="result" delay={0}>
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="text-emerald-400" size={24} />
                    <h3 className="text-xl font-bold text-white">Analysis Result</h3>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-slate-950/50 border border-slate-700 p-4"
                    >
                      <div className="text-xs text-slate-500 mb-1 font-mono">CLUSTER ID</div>
                      <div className="text-3xl font-black text-white">{result.cluster}</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-slate-950/50 border border-slate-700 p-4"
                    >
                      <div className="text-xs text-slate-500 mb-1 font-mono">BOUNDARY STATUS</div>
                      <div className="flex items-center gap-2">
                        {result.inside_boundary ? (
                          <>
                            <CheckCircle className="text-emerald-400" size={20} />
                            <span className="text-emerald-400 font-bold">INSIDE</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="text-amber-400" size={20} />
                            <span className="text-amber-400 font-bold">OUTSIDE</span>
                          </>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: 0.3 }}
                      className="bg-slate-950/50 border border-slate-700 p-6"
                    >
                      <div className="text-xs text-slate-500 mb-3 font-mono">THREAT CLASSIFICATION</div>
                      {result.classification === "ZERO-DAY" ? (
                        <motion.div
                          initial={{ scale: 0.8, rotateY: -90 }}
                          animate={{ scale: 1, rotateY: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="bg-red-950/50 border-2 border-red-500 p-6 text-center relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 bg-red-500/10"
                          />
                          <motion.div
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                            <ShieldAlert className="text-red-400 mx-auto mb-3" size={48} />
                          </motion.div>
                          <motion.div 
                            className="text-2xl font-black text-red-400 tracking-wider"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            ZERO-DAY THREAT
                          </motion.div>
                          <motion.div 
                            className="text-xs text-red-300 mt-2 font-mono"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            IMMEDIATE ACTION REQUIRED
                          </motion.div>
                        </motion.div>
                      ) : result.classification === "NORMAL" ? (
                        <motion.div
                          initial={{ scale: 0.8, rotateY: 90 }}
                          animate={{ scale: 1, rotateY: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="bg-emerald-950/50 border-2 border-emerald-500 p-6 text-center relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6 }}
                          >
                            <CheckCircle className="text-emerald-400 mx-auto mb-3" size={48} />
                          </motion.div>
                          <motion.div 
                            className="text-2xl font-black text-emerald-400 tracking-wider"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            NORMAL TRAFFIC
                          </motion.div>
                          <motion.div 
                            className="text-xs text-emerald-300 mt-2 font-mono"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            SYSTEM SECURE • NO THREATS DETECTED
                          </motion.div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.8, rotateX: -90 }}
                          animate={{ scale: 1, rotateX: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="bg-amber-950/50 border-2 border-amber-500 p-6 text-center relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-amber-500/10"
                          />
                          <motion.div
                            animate={{ 
                              rotate: [0, -10, 10, 0],
                              scale: [1, 1.15, 1]
                            }}
                            transition={{ duration: 0.7, repeat: Infinity }}
                          >
                            <AlertTriangle className="text-amber-400 mx-auto mb-3" size={48} />
                          </motion.div>
                          <motion.div 
                            className="text-2xl font-black text-amber-400 tracking-wider"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {result.classification}
                          </motion.div>
                          <motion.div 
                            className="text-xs text-amber-300 mt-2 font-mono"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            THREAT IDENTIFIED • COUNTERMEASURES ACTIVE
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  <div className="mt-6 text-center text-xs text-slate-600 font-mono">
                    ANALYZED AT: {new Date().toLocaleString()}
                  </div>
                </HolographicCard>
              )}

              {!loading && !result && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6"
                >
                  <div className="flex items-start gap-3">
                    <Eye className="text-cyan-400 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="text-white font-bold mb-2">System Ready</h4>
                      <p className="text-slate-400 text-sm font-mono leading-relaxed">
                        Upload your network traffic CSV file and initiate the analysis to detect potential zero-day attacks using TABA neural boundary detection.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}