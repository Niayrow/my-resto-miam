"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, Plus, Minus, Trash2, ChevronLeft, ShoppingCart, Zap, CreditCard, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// --- Types ---
interface Product {
    id: number; name: string; category: string; price: string;
    shortDesc: string; longDesc: string; image: string; calories: string;
}

const CATEGORIES = ["Sandwiches", "Burgers", "Salades", "Desserts", "Boissons"];

const PRODUCTS: Product[] = [
    // --- SANDWICHES ---
    { id: 1, category: "Sandwiches", name: "Master Vrap v1", price: "10.90", shortDesc: "Un wrap généreux et savoureux.", longDesc: "Viande marinée et grillée à la perfection, accompagnée de notre sauce blanche maison et de légumes frais.", image: "/img/Master Vrap v1.jpg", calories: "650 kcal" },
    { id: 2, category: "Sandwiches", name: "Mega Durum X", price: "11.50", shortDesc: "Format XXL pour les grandes faims.", longDesc: "Double portion de viande kebab, frites dorées et crudités croquantes dans une galette moelleuse.", image: "/img/Mega Durum X.jpg", calories: "820 kcal" },
    { id: 3, category: "Sandwiches", name: "Cyber Kebab", price: "9.90", shortDesc: "L'authentique kebab berlinois.", longDesc: "Pain pide artisanal, viande grillée à la broche, légumes du marché et épices fines.", image: "/img/Cyber Kebab.jpg", calories: "600 kcal" },

    // --- BURGERS ---
    { id: 4, category: "Burgers", name: "Neon Burger", price: "13.90", shortDesc: "Un classique revisité.", longDesc: "Bœuf Black Angus, cheddar affiné, oignons confits et notre sauce signature.", image: "/img/Neon Burger.jpg", calories: "750 kcal" },
    { id: 5, category: "Burgers", name: "Plasma Stack", price: "15.50", shortDesc: "L'ultime expérience burger.", longDesc: "Triple steak haché frais, bacon croustillant, double cheddar et sauce barbecue fumée.", image: "/img/Plasma Stack.jpg", calories: "980 kcal" },
    { id: 6, category: "Burgers", name: "Quantum Cheese", price: "12.00", shortDesc: "Pour les amateurs de fromage.", longDesc: "Steak juteux, abondance de cheddar fondu et pickles maison dans un bun brioché.", image: "/img/Quantum Cheese.jpg", calories: "710 kcal" },

    // --- SALADES ---
    { id: 7, category: "Salades", name: "Hydro Mix", price: "9.50", shortDesc: "Une explosion de fraîcheur.", longDesc: "Salade mesclun, tomates cerises, concombre, et vinaigrette légère au citron.", image: "/img/Hydro Mix.jpg", calories: "250 kcal" },
    { id: 8, category: "Salades", name: "Data Green", price: "10.50", shortDesc: "Santé et plaisir.", longDesc: "Base de quinoa, avocat crémeux, éclats de grenade et pointes d'agrumes.", image: "/img/Data Green.jpg", calories: "320 kcal" },
    { id: 9, category: "Salades", name: "Solar Bowl", price: "11.00", shortDesc: "Le bowl ensoleillé.", longDesc: "Filet de poulet épicé, pois chiches rôtis, légumes de saison et sauce tahini onctueuse.", image: "/img/Solar Bowl.jpg", calories: "410 kcal" },

    // --- DESSERTS ---
    { id: 10, category: "Desserts", name: "Digital Brownie", price: "4.50", shortDesc: "Intensément chocolat.", longDesc: "Brownie fait maison avec des noix de pécan caramélisées et un cœur fondant.", image: "/img/Digital Brownie.jpg", calories: "350 kcal" },
    { id: 11, category: "Desserts", name: "Plasma Cookie", price: "3.50", shortDesc: "Le cookie parfait.", longDesc: "Cookie aux trois chocolats, croustillant à l'extérieur et moelleux à l'intérieur.", image: "/img/Plasma Cookie.jpg", calories: "280 kcal" },
    { id: 12, category: "Desserts", name: "Cyber Muffin", price: "4.00", shortDesc: "Douceur fruitée.", longDesc: "Muffin aux myrtilles sauvages avec un cœur de confiture artisanale.", image: "/img/Cyber Muffin.jpg", calories: "310 kcal" },

    // --- BOISSONS ---
    { id: 13, category: "Boissons", name: "Liquid Neon", price: "3.50", shortDesc: "Rafraîchissement intense.", longDesc: "Limonade artisanale à la framboise bleue et citron vert.", image: "/img/Liquid Neon.jpg", calories: "140 kcal" },
    { id: 14, category: "Boissons", name: "Blue Ion", price: "3.00", shortDesc: "L'hydratation naturelle.", longDesc: "Eau de source, plate ou gazeuse, servie très fraîche.", image: "/img/Blue Ion.jpg", calories: "0 kcal" },
    { id: 15, category: "Boissons", name: "Solar Juice", price: "4.50", shortDesc: "Vitaminé et piquant.", longDesc: "Jus d'orange fraîchement pressé avec une pointe de gingembre bio.", image: "/img/Solar Juice.jpg", calories: "110 kcal" },
];

export default function MenuPage() {
    const { cart, addToCart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
    const [activeCat, setActiveCat] = useState("Sandwiches");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState<{ show: boolean, name: string }>({ show: false, name: "" });

    useEffect(() => {
        document.documentElement.style.overflow = (isCartOpen || selectedProduct) ? "hidden" : "";
    }, [isCartOpen, selectedProduct]);

    const handleAdd = (product: Product) => {
        if ("vibrate" in navigator) navigator.vibrate(15);
        setNotification({ show: true, name: product.name });
        setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 2500);
        addToCart(product);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white pb-32 overflow-x-hidden relative">

            {/* FOND CYBER DYNAMIQUE */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] animate-grid"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10">
                {/* NOTIFICATION HUD */}
                <AnimatePresence>
                    {notification.show && (
                        <motion.div initial={{ y: -100, x: "-50%", opacity: 0 }} animate={{ y: 20, x: "-50%", opacity: 1 }} exit={{ y: -100, x: "-50%", opacity: 0 }} className="fixed top-0 left-1/2 z-[100] w-[90%] max-w-sm">
                            <div className="bg-white/10 backdrop-blur-2xl border border-brand-orange/30 p-4 rounded-3xl flex items-center gap-4 shadow-2xl">
                                <div className="bg-brand-orange p-2 rounded-xl text-black"><CheckCircle2 size={20} /></div>
                                <div className="flex-1"><p className="text-[10px] uppercase font-black text-brand-orange">Commande Enregistrée</p><p className="text-sm font-bold">{notification.name}</p></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HEADER */}
                <header className="sticky top-0 z-40 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center">
                    <Link href="/" className="p-2.5 bg-white/5 rounded-2xl border border-white/10"><ChevronLeft size={22} /></Link>
                    <img src="/img/logo.png" alt="MYRESTO MIAM" className="h-10 w-auto drop-shadow-[0_0_15px_rgba(255,77,0,0.4)]" />
                    <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 bg-brand-orange text-black rounded-2xl shadow-[0_0_20px_rgba(255,77,0,0.3)]">
                        <ShoppingCart size={22} />
                        {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#050505]">{totalItems}</span>}
                    </button>
                </header>

                {/* LE DOCK DE CATÉGORIES (Sélecteur Pro) */}
                <div className="sticky top-[73px] z-30 py-6 px-4 bg-gradient-to-b from-[#050505] to-transparent">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar bg-white/5 p-1.5 rounded-[2rem] border border-white/10 backdrop-blur-md max-w-2xl mx-auto">
                        <LayoutGroup id="categories">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCat(cat)}
                                    className={`relative px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 z-10 whitespace-nowrap ${activeCat === cat ? "text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    {activeCat === cat && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-brand-orange rounded-full z-[-1] shadow-[0_0_15px_#ff4d0066]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {cat}
                                </button>
                            ))}
                        </LayoutGroup>
                    </div>
                </div>

                {/* GRILLE DE PRODUITS (15 ARTICLES) */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <AnimatePresence mode="popLayout">
                        {PRODUCTS.filter(p => p.category === activeCat).map((product, idx) => (
                            <motion.div
                                key={product.id}
                                layoutId={`card-${product.id}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedProduct(product)}
                                className="group bg-white/[0.03] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col cursor-pointer hover:border-brand-orange/40 hover:bg-white/[0.05] transition-all duration-500 shadow-2xl"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-6 bg-brand-orange text-black px-4 py-1.5 rounded-full font-black text-sm">
                                        {product.price}€
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col justify-between flex-1">
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-brand-orange transition-colors glitch-effect">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                            {product.shortDesc}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                                        className="mt-8 w-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] transition-all"
                                    >
                                        <Plus size={16} /> Ajouter
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* BOUTON PANIER FLOTTANT */}
            <AnimatePresence>
                {totalItems > 0 && !isCartOpen && (
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
                        <button onClick={() => setIsCartOpen(true)} className="w-full bg-white text-black p-5 rounded-[2.5rem] flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-t border-white/20 font-black uppercase italic group overflow-hidden relative active:scale-95 transition-transform">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="bg-black text-white w-10 h-10 rounded-xl flex items-center justify-center">{totalItems}</div>
                                <span>Voir ma sélection</span>
                            </div>
                            <span className="relative z-10 text-2xl tracking-tighter">{totalPrice.toFixed(2)}€</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DRAWER PANIER */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60]" />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#080808] border-l border-white/10 z-[70] flex flex-col">
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Votre <span className="text-brand-orange">Panier</span></h2>
                                <button onClick={() => setIsCartOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                                {cart.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-gray-600 italic">Le terminal est vide...</div> : cart.map((item) => (
                                    <div key={item.id} className="flex gap-6 items-center bg-white/[0.02] p-4 rounded-3xl border border-white/5">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                                        <div className="flex-1">
                                            <h4 className="font-black uppercase text-[10px] text-brand-orange tracking-widest">{item.name}</h4>
                                            <p className="text-lg font-black">{item.price}€</p>
                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center bg-black/50 rounded-xl border border-white/10 p-1">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:text-brand-orange transition-colors"><Minus size={14} /></button>
                                                    <span className="px-4 font-mono text-sm font-bold">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:text-brand-orange transition-colors"><Plus size={14} /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 ml-auto transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {cart.length > 0 && (
                                <div className="p-8 bg-[#0a0a0a] border-t border-white/10 space-y-6">
                                    <div className="flex justify-between text-3xl font-black italic uppercase"><span>Total</span><span className="text-brand-orange">{totalPrice.toFixed(2)}€</span></div>
                                    <Link href="/checkout" className="w-full bg-brand-orange text-black font-black uppercase py-6 rounded-3xl flex items-center justify-center gap-3 shadow-2xl">Commander <CreditCard /></Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* MODAL DÉTAILS PRODUIT */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
                        <motion.div layoutId={`card-${selectedProduct.id}`} className="relative bg-[#080808] w-full max-w-3xl md:rounded-[4rem] rounded-t-[4rem] border-t md:border border-white/10 overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-20 p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/10"><X /></button>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="h-80 md:h-full"><img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} /></div>
                                <div className="p-10 md:p-16 flex flex-col justify-center">
                                    <span className="text-brand-orange font-black text-xs uppercase tracking-[0.4em] mb-4 block">{selectedProduct.category}</span>
                                    <h2 className="text-5xl font-black italic uppercase mb-6 leading-[0.9] text-brand-orange">{selectedProduct.name}</h2>
                                    <div className="flex items-center gap-6 mb-8">
                                        <span className="text-4xl font-black text-white italic">{selectedProduct.price}€</span>
                                        <span className="text-brand-cyan font-mono text-xs flex items-center gap-2 bg-brand-cyan/10 px-4 py-2 rounded-full border border-brand-cyan/20"><Zap size={14} /> {selectedProduct.calories}</span>
                                    </div>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-12 border-l-2 border-brand-orange/30 pl-6 italic">{selectedProduct.longDesc}</p>
                                    <button onClick={() => { handleAdd(selectedProduct); setSelectedProduct(null); }} className="w-full bg-white text-black font-black uppercase py-6 rounded-3xl shadow-2xl text-lg">Confirmer l'ajout</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}