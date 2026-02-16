"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, MapPin, ChevronLeft, ArrowRight, CheckCircle2, User, Phone, Home, Utensils, Calendar, Lock, Truck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { cart, totalPrice, totalItems } = useCart();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // --- LOGIQUE DE LIVRAISON OFFERTE ---
    const [orderType, setOrderType] = useState<"dine-in" | "delivery">("dine-in");
    const isDeliveryFree = useMemo(() => totalPrice > 49.99, [totalPrice]);
    const deliveryFee = orderType === "delivery" ? (isDeliveryFree ? 0 : 5) : 0;
    const finalPrice = totalPrice + deliveryFee;

    useEffect(() => {
        document.documentElement.style.overflow = "hidden";
        return () => { document.documentElement.style.overflow = ""; };
    }, []);

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
        }, 3000);
    };

    if (totalItems === 0 && step !== 3) {
        return (
            <main className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-6 text-center font-sans">
                <h2 className="text-2xl font-black uppercase italic mb-4 text-brand-orange">Terminal Vide</h2>
                <Link href="/menu" className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-black uppercase">Retour au Menu</Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#030303] text-white overflow-hidden relative font-sans">
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ff4d00_0.5px,transparent_0.5px)] [background-size:24px_24px]" />

            <header className="p-6 flex items-center justify-between relative z-10 border-b border-white/5 bg-black/60 backdrop-blur-xl">
                <Link href="/menu" className="p-2 bg-white/5 rounded-xl border border-white/10">
                    <ChevronLeft size={20} />
                </Link>
                <div className="text-center uppercase tracking-[0.3em]">
                    <h2 className="text-[10px] font-bold text-gray-500">MyRestoMiam</h2>
                    <p className="text-[9px] text-brand-orange font-black italic">Check-out sécurisé</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-orange/10 border border-brand-orange/30 shadow-[0_0_10px_rgba(255,77,0,0.2)]">
                    <span className="text-brand-orange font-black text-xs">{step}/3</span>
                </div>
            </header>

            <div className="relative z-10 p-6 max-w-lg mx-auto h-[calc(100vh-100px)] flex flex-col overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">

                    {/* ÉTAPE 1 : RÉCAPITULATIF & INFOS */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 flex-1 flex flex-col">

                            {/* SÉLECTEUR DE MODE */}
                            <div className="flex p-1.5 bg-white/5 rounded-[2rem] border border-white/10">
                                <button onClick={() => setOrderType("dine-in")} className={`flex-1 py-4 rounded-[1.5rem] flex items-center justify-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest ${orderType === "dine-in" ? "bg-brand-orange text-black shadow-[0_0_20px_rgba(255,77,0,0.4)]" : "text-gray-500"}`}>
                                    <Utensils size={14} /> Sur place
                                </button>
                                <button onClick={() => setOrderType("delivery")} className={`flex-1 py-4 rounded-[1.5rem] flex items-center justify-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest ${orderType === "delivery" ? "bg-brand-orange text-black shadow-[0_0_20px_rgba(255,77,0,0.4)]" : "text-gray-500"}`}>
                                    <Truck size={14} /> Emporter {isDeliveryFree && <span className="text-[8px] bg-black/20 px-1.5 py-0.5 rounded ml-1">OFFERT</span>}
                                </button>
                            </div>

                            {/* LISTE DES PLATS VISUELLE */}
                            <div className="space-y-3">
                                <p className="text-[9px] uppercase font-black text-gray-600 tracking-[0.3em] ml-2">Votre Panier numérique</p>
                                <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar pr-2">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 bg-white/5 border border-white/5 p-2 rounded-2xl">
                                            <img src={item.image} className="w-12 h-12 rounded-xl object-cover grayscale-[0.3]" alt={item.name} />
                                            <div className="flex-1 text-[10px] font-bold uppercase tracking-tight">
                                                {item.name}
                                                <p className="text-[9px] text-gray-500 font-medium normal-case">{item.quantity} x {item.price}€</p>
                                            </div>
                                            <span className="text-xs font-black">{(parseFloat(item.price) * item.quantity).toFixed(2)}€</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FORMULAIRE */}
                            <div className="space-y-5 bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                                {orderType === "dine-in" ? (
                                    <><CheckoutInput label="Nom" placeholder="Saisir nom..." icon={<User size={18} />} /><CheckoutInput label="Prénom" placeholder="Saisir prénom..." icon={<User size={18} />} /></>
                                ) : (
                                    <><CheckoutInput label="Adresse Complète" placeholder="Rue, Bâtiment, Étage..." icon={<MapPin size={18} />} /><CheckoutInput label="Contact Mobile" placeholder="06 .. .. .. .." icon={<Phone size={18} />} /></>
                                )}
                            </div>

                            {/* RÉCAPITULATIF FINANCIER AVEC LOGIQUE DE GRATUITÉ */}
                            <div className="mt-auto space-y-4 pt-4">
                                <div className="space-y-2 px-2">
                                    <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold">
                                        <span>Sous-total</span><span>{totalPrice.toFixed(2)}€</span>
                                    </div>

                                    {orderType === "delivery" && (
                                        <div className="flex justify-between text-[10px] uppercase font-bold items-center">
                                            <span className="text-brand-cyan">Cyber-Livraison</span>
                                            <div className="flex gap-2 items-center">
                                                {isDeliveryFree ? (
                                                    <>
                                                        <span className="text-gray-600 line-through">5.00€</span>
                                                        <span className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">OFFERT</span>
                                                    </>
                                                ) : (
                                                    <span className="text-brand-cyan">+ 5.00€</span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/10 mt-4 shadow-xl">
                                        <span className="text-xs font-black uppercase italic tracking-tighter text-gray-400">Total à payer</span>
                                        <span className="text-4xl font-black italic text-brand-orange drop-shadow-[0_0_15px_rgba(255,77,0,0.6)]">{finalPrice.toFixed(2)}€</span>
                                    </div>
                                </div>

                                <button onClick={() => setStep(2)} className="w-full bg-white text-black font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                                    Aller au paiement <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ÉTAPE 2 : PAIEMENT */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8 flex-1 flex flex-col">
                            <div className="text-center py-6">
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Paiement</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black italic">Terminal de cryptage 2026</p>
                            </div>

                            <div className="space-y-4 bg-white/5 p-8 rounded-[3rem] border border-white/5">
                                <CheckoutInput label="N° de Carte" placeholder="0000 0000 0000 0000" icon={<CreditCard size={18} />} />
                                <div className="grid grid-cols-2 gap-4">
                                    <CheckoutInput label="Expiration" placeholder="MM/YY" icon={<Calendar size={18} />} />
                                    <CheckoutInput label="CVC" placeholder="***" icon={<Lock size={18} />} />
                                </div>
                            </div>

                            <div className="mt-auto space-y-6">
                                <div className="text-center text-[9px] text-gray-600 uppercase tracking-widest px-8 leading-relaxed italic">
                                    Vos informations bancaires sont traitées via un protocole décentralisé. Aucun stockage local.
                                </div>
                                <button onClick={handlePayment} disabled={isProcessing} className="w-full bg-brand-orange text-black font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-50 shadow-[0_0_30px_rgba(255,77,0,0.4)]">
                                    {isProcessing ? "Cryptage..." : `Confirmer ${finalPrice.toFixed(2)}€`}
                                    {isProcessing && <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute inset-0 bg-white/30" />}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ÉTAPE 3 : SUCCÈS */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center py-10">
                            <CheckCircle2 className="text-brand-orange mb-8 drop-shadow-[0_0_20px_#ff4d00]" size={80} />
                            <h3 className="text-4xl font-black uppercase italic mb-8 tracking-tighter text-center leading-[0.8]">Commande <br /><span className="text-brand-orange">Approuvée</span></h3>

                            <div className="w-full bg-[#111] border-2 border-dashed border-white/10 p-8 rounded-[2rem] font-mono text-[11px] relative">
                                <div className="flex justify-between border-b border-white/5 pb-4 mb-4 font-black">
                                    <span className="text-gray-500 uppercase">Service</span>
                                    <span className="text-white uppercase">{orderType === "dine-in" ? "Sur place" : "Livraison"}</span>
                                </div>
                                <div className="space-y-2 mb-6 uppercase">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between">
                                            <span className="text-gray-400">{item.quantity} x {item.name}</span>
                                            <span>{(parseFloat(item.price) * item.quantity).toFixed(2)}€</span>
                                        </div>
                                    ))}
                                    {orderType === "delivery" && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Frais de livraison</span>
                                            <span className={isDeliveryFree ? "text-green-400 font-black" : ""}>
                                                {isDeliveryFree ? "OFFERT" : "5.00€"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="border-t-2 border-white/10 pt-4 flex justify-between text-2xl font-black text-brand-orange uppercase italic">
                                    <span>Total</span><span>{finalPrice.toFixed(2)}€</span>
                                </div>
                            </div>

                            <Link href="/" className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 border-b border-gray-800 pb-2 hover:text-brand-orange transition-colors">
                                Revenir au Terminal
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

function CheckoutInput({ label, placeholder, icon }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] uppercase font-black tracking-[0.2em] text-gray-600 ml-2">{label}</label>
            <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-brand-orange transition-colors">{icon}</div>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-black/40 border border-white/5 p-4 pl-14 rounded-2xl focus:border-brand-orange focus:bg-brand-orange/5 focus:outline-none transition-all placeholder:text-gray-800 font-bold text-sm shadow-inner"
                />
            </div>
        </div>
    );
}