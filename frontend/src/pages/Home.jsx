import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { FiArrowRight, FiDatabase, FiLock, FiShield, FiUploadCloud } from "react-icons/fi";

import ConnectWallet from "../components/ConnectWallet";

function DNA() {
  const ref = useRef();

  const points = useMemo(() => {
    const left = [];
    const right = [];

    for (let i = 0; i < 42; i += 1) {
      const t = i * 0.36;
      const y = (i - 21) * 0.11;
      left.push([Math.cos(t) * 0.75, y, Math.sin(t) * 0.75]);
      right.push([Math.cos(t + Math.PI) * 0.75, y, Math.sin(t + Math.PI) * 0.75]);
    }

    return { left, right };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.45;
  });

  return (
    <group ref={ref}>
      <Line points={points.left} color="#22d3ee" lineWidth={2} />
      <Line points={points.right} color="#60a5fa" lineWidth={2} />

      {points.left.map((point, index) => (
        <group key={index}>
          <mesh position={point}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#e0faff" emissive="#22d3ee" emissiveIntensity={1.2} />
          </mesh>

          <Line points={[point, points.right[index]]} color="#93c5fd" lineWidth={1} transparent opacity={0.35} />
        </group>
      ))}
    </group>
  );
}

function BlockchainCubes() {
  const group = useRef();

  const cubes = [
    [-2.4, -0.9, 0],
    [-1.35, -1.15, 0.25],
    [1.45, 1.05, -0.25],
    [2.5, 0.75, 0.15],
  ];

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      child.rotation.x = state.clock.elapsedTime * (0.25 + index * 0.05);
      child.rotation.y = state.clock.elapsedTime * (0.35 + index * 0.05);
    });
  });

  return (
    <group ref={group}>
      {cubes.map((position, index) => (
        <Float key={index} speed={1.6} floatIntensity={0.7}>
          <mesh position={position}>
            <boxGeometry args={[0.36, 0.36, 0.36]} />
            <meshStandardMaterial color="#172554" emissive="#06b6d4" emissiveIntensity={0.85} metalness={0.5} />
          </mesh>
        </Float>
      ))}

      <Line points={cubes.slice(0, 2)} color="#67e8f9" lineWidth={1.5} transparent opacity={0.45} />
      <Line points={cubes.slice(2, 4)} color="#67e8f9" lineWidth={1.5} transparent opacity={0.45} />
    </group>
  );
}

function MedicalCross() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.55;
  });

  return (
    <Float speed={2} floatIntensity={1}>
      <group ref={ref} position={[-2.2, 1.15, 0]}>
        <mesh>
          <boxGeometry args={[0.22, 1, 0.22]} />
          <meshStandardMaterial color="#ffffff" emissive="#22d3ee" emissiveIntensity={0.5} />
        </mesh>
        <mesh>
          <boxGeometry args={[1, 0.22, 0.22]} />
          <meshStandardMaterial color="#ffffff" emissive="#22d3ee" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0.1, 5.4], fov: 42 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#67e8f9" />
      <pointLight position={[-4, -2, 3]} intensity={1.2} color="#2563eb" />
      <Stars radius={70} depth={30} count={1400} factor={3} fade speed={0.7} />
      <DNA />
      <BlockchainCubes />
      <MedicalCross />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl border border-cyan-300/15 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl text-cyan-300">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
      <p className="text-sm leading-7 text-slate-300">{text}</p>
    </motion.div>
  );
}

function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_28rem),radial-gradient(circle_at_80%_30%,rgba(37,99,235,0.24),transparent_32rem)]" />

      <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 shadow-2xl backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-white">
          <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_#67e8f9]" />
          CareChain
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#platform" className="hover:text-cyan-300">Platform</a>
          <a href="#security" className="hover:text-cyan-300">Security</a>
          <a href="#records" className="hover:text-cyan-300">Records</a>
        </div>

        <Link to="/login" className="rounded-full border border-cyan-300/30 px-5 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-300/10">
          Login
        </Link>
      </nav>

      <section className="relative z-10 min-h-screen px-4 pt-28">
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-2 text-sm font-bold text-cyan-100 backdrop-blur-xl"
          >
            AI + Blockchain + Healthcare Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Secure Healthcare Records on Blockchain
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg"
          >
            CareChain encrypts medical records, stores them through IPFS, verifies access on blockchain,
            and gives patients complete control over doctor permissions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            
            <ConnectWallet />
            

            <Link
              to="/register"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-8 font-black text-white shadow-2xl shadow-cyan-500/25 sm:w-auto"
            >
              Get Started <FiArrowRight />
            </Link>

            <Link
              to="/login"
              className="flex h-14 w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 font-black text-white backdrop-blur-xl hover:bg-white/15 sm:w-auto"
            >
              Login
            </Link>
          </motion.div>

          <div className="mt-14 grid w-full max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              ["AES-256", "Encrypted Records"],
              ["IPFS", "Decentralized Storage"],
              ["Web3", "Wallet Identity"],
              ["24/7", "Audit Trail"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-left backdrop-blur-xl">
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="mt-1 text-sm text-slate-300">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="relative z-10 mx-auto max-w-6xl px-4 py-24">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-cyan-300">CareChain Platform</p>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Premium healthcare access control for patients and doctors.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<FiShield />}
            title="Patient Control"
            text="Grant, revoke, and monitor doctor access from a futuristic patient dashboard."
          />
          <FeatureCard
            icon={<FiUploadCloud />}
            title="Encrypted Uploads"
            text="Medical files are encrypted before IPFS storage and blockchain verification."
          />
          <FeatureCard
            icon={<FiDatabase />}
            title="IPFS Records"
            text="Decentralized storage keeps record integrity tied to immutable content hashes."
          />
          <FeatureCard
            icon={<FiLock />}
            title="Audit Trail"
            text="Every upload, view, download, grant, revoke, and emergency access is logged."
          />
        </div>
      </section>

      <section id="security" className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-3xl border border-cyan-300/15 bg-white/[0.06] p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:p-12">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-cyan-300">Blockchain Flow</p>
          <h2 className="max-w-3xl text-3xl font-black text-white md:text-5xl">
            Patient upload. AES encryption. IPFS storage. Smart contract verification.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {["Patient", "Encrypt", "IPFS", "Blockchain", "Doctor"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-center font-black text-cyan-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;