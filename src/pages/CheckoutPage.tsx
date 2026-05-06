import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let message = 'Hi TGL, I would like to order the following items:\n\n';
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.price} (Qty: ${item.quantity})\n`;
    });
    
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    clearCart();
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/store" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#1d1d1f] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
          </Link>
          <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
            <p className="text-gray-500 text-lg mb-6">Your cart is currently empty.</p>
            <Link to="/store" className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <ul className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <li key={item.id} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#1d1d1f] text-lg">{item.name}</h3>
                      <p className="text-gray-500 font-medium">{item.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 border border-gray-200 rounded-full px-2 py-1 bg-[#fbfbfb] self-start sm:self-auto">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-[#1d1d1f]"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-bold text-[#1d1d1f]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-[#1d1d1f]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-end sm:ml-4">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-rose-400 hover:text-rose-600 bg-rose-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#fbfbfb] p-6 sm:p-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-sm mb-1">Total items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                <p className="text-[#1d1d1f] font-bold text-xl">Checkout via WhatsApp</p>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.109 1.38 4.759 1.381 5.281.001 9.574-4.291 9.576-9.574.001-2.559-1.017-4.965-2.869-6.815-1.852-1.851-4.255-2.869-6.815-2.869-5.285 0-9.577 4.292-9.578 9.576-.001 1.832.524 3.615 1.519 5.172l-.999 3.646 3.732-.979z"/></svg>
                Send Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
