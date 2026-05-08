import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  key?: string | number;
  product: {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
    [key: string]: any;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col p-3 relative transition-all hover:shadow-md hover:-translate-y-1">
      <Link
        to={`/store/${product.id}`}
        className="absolute inset-0 z-10"
      ></Link>

      <div className="relative aspect-square overflow-hidden bg-[#fbfbfb] rounded-xl mb-3 flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 px-1">
        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1 line-clamp-1">
          {product.category}
        </span>
        <h3 className="text-[#1d1d1f] font-semibold text-sm leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-bold text-base tracking-tight text-[#1d1d1f]">
            {product.price}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center bg-[#1d1d1f] hover:bg-black text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors z-20"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
