import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingCart } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col p-4 relative transition-shadow hover:shadow-md">
      <Link to={`/store/${product.id}`} className="absolute inset-0 z-10"></Link>
      
      <span className="text-[10px] uppercase text-blue-600 font-black tracking-widest mb-1">{product.category}</span>
      <h3 className="font-bold text-[#1d1d1f] leading-tight mb-2 line-clamp-2">
        {product.name}
      </h3>
      
      <div className="relative h-48 overflow-hidden bg-[#fbfbfb] rounded-2xl mb-4 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity p-2"
        />
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-xl tracking-tight text-[#1d1d1f]">{product.price}</span>
        <a 
          href={`https://wa.me/919876543210?text=Hi%20TGL,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center bg-gray-50 border border-gray-100 hover:border-blue-600 hover:text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors text-gray-500 z-20"
        >
          Add
        </a>
      </div>
    </div>
  );
}
