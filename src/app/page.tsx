"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame, Globe, Shovel } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden relative">

      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Grille Cybernétique subtile */}
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:30px_30px] md:[background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Lueurs Néon */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-brand-orange/15 blur-[100px] md:blur-[130px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-brand-cyan/10 blur-[100px] md:blur-[130px] rounded-full" />

      <div className="z-10 text-center flex flex-col items-center w-full max-w-2xl">

        {/* Badge de localisation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 text-gray-400 text-[8px] md:text-[9px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 md:mb-6 bg-white/5 backdrop-blur-md"
        >
          <span className="w-1 h-1 bg-brand-orange rounded-full animate-ping" />
          Sector Creil • FR_{new Date().getFullYear()}
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-2 md:mb-4"
        >
          <img src="/img/logo.png" alt="Logo" className="w-20 md:w-32 h-auto drop-shadow-[0_0_25px_rgba(255,77,0,0.3)]" />
        </motion.div>

        {/* Titre Massive avec Scanlines */}
        <div className="relative mb-6 md:mb-8">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase"
          >
            MYRESTO<br />
            <span className="text-brand-orange drop-shadow-[0_0_20px_#ff4d0044] md:drop-shadow-[0_0_30px_#ff4d0066] animate-flicker">MIAM</span>
          </motion.h1>
          {/* Effet de reflet sur le titre */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none h-full w-full" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 md:space-y-6"
        >
          <p className="text-gray-400 text-xs md:text-lg font-medium max-w-xs md:max-w-sm mx-auto leading-relaxed uppercase tracking-tighter px-2">
            L'art de la broche, <span className="text-white">réinventé</span>. <br />
            <span className="text-gray-600">Saveurs brutes. Technologie pure. Goût radical.</span>
          </p>

          {/* BOUTON "EXPLORER LE MENU" */}
          <div className="pt-6 md:pt-8 flex justify-center">
            <Link href="/menu" className="relative group">
              {/* Double Lueur */}
              <div className="absolute -inset-1 bg-brand-orange rounded-2xl blur-xl md:blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />

              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-white text-black font-black uppercase py-4 px-10 md:py-6 md:px-14 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 shadow-[0_10px_20px_rgba(255,255,255,0.05)] md:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all"
              >
                <span className="text-base md:text-xl tracking-tighter">Commander maintenant</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[3px] group-hover:translate-x-2 transition-transform" />

                {/* Décoration bouton */}
                <div className="absolute top-0 right-0 p-1">
                  <div className="w-1.5 h-1.5 border-t border-r border-black/20" />
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Specs Minimalistes */}
        <div className="flex gap-6 md:gap-12 mt-16 md:mt-24 w-full justify-center">
          <SpecItem icon={<Flame size={18} className="md:w-[20px] md:h-[20px]" />} label="Cuisson" value="PLASMA_800" />
          <SpecItem icon={<Globe size={18} className="md:w-[20px] md:h-[20px]" />} label="Origine" value="LOCAL_BIO" />
          <SpecItem icon={<Shovel size={18} className="md:w-[20px] md:h-[20px]" />} label="Craft" value="HAND_MADE" />
        </div>
      </div>

      {/* Footer Décoratif */}
      <div className="absolute bottom-4 md:bottom-8 w-full px-4 md:px-10 flex justify-between items-end z-10">
        <div className="text-[8px] md:text-[10px] font-mono leading-tight opacity-20 pointer-events-none hidden sm:block">
          ORDER_STATUS: ONLINE<br />
          TEMP_CORE: OPTIMAL
        </div>
        <div className="text-[8px] md:text-[10px] font-mono text-center sm:text-right opacity-50 w-full sm:w-auto">
          <span className="opacity-40">© MYRESTOMIAM_CORP</span><br />
          <span className="opacity-40">ALL_RIGHTS_RESERVED</span><br />
          <Link href="https://sofianeweb.fr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors duration-300 mt-1 md:mt-2 block">
            CREATED_BY: SOFIANEWEB
          </Link>
        </div>
      </div>
    </main>
  );
}

function SpecItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-brand-orange drop-shadow-[0_0_10px_#ff4d00aa]">{icon}</div>
      <div className="space-y-0.5">
        <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest leading-none">{label}</p>
        <p className="text-[10px] text-white font-black tracking-tighter">{value}</p>
      </div>
    </div>
  );
}