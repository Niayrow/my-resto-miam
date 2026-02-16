"use client";
import React, { createContext, useContext, useState, useMemo } from 'react';

interface Product {
    id: number; name: string; price: string; image: string;
}

interface CartItem extends Product { quantity: number; }

interface CartContextType {
    cart: CartItem[];
    addToCart: (p: any) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, d: number) => void;
    totalPrice: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
    };

    const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

    const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0), [cart]);
    const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};