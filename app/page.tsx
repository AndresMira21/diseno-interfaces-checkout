'use client';

import { useState } from 'react';

export default function ShoppingCart() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('mastercard');
  
  // Items del carrito
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Denim T-Shirt', ref: '002197456', color: 'Blue', quantity: 2, price: 7500, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200' },
    { id: 2, name: 'Denim Pants', ref: '011015233', color: 'Blue', quantity: 3, price: 9000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200' },
    { id: 3, name: 'Sony Smartwatch', ref: '004622901', color: 'Black', quantity: 1, price: 24500, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200' },
    { id: 4, name: 'Cognac Oxford', ref: '035772962', color: 'Brown', quantity: 1, price: 4500, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=200' }
  ]);

  // Actualizar cantidad
  const updateQuantity = (id, increment) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  // Eliminar item
  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calcular subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Manrope:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Manrope', sans-serif;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .title-font {
          font-family: 'Playfair Display', serif;
        }
        
        .item-enter {
          animation: slideIn 0.4s ease-out backwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .payment-panel {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .payment-panel.closed {
          transform: translateX(100%);
        }
        
        .payment-panel.open {
          transform: translateX(0);
        }
        
        /* Ajustar el contenedor del carrito cuando el panel está abierto en desktop */
        @media (min-width: 1024px) {
          .cart-container {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .cart-container.full-width {
            width: 100%;
            max-width: 100%;
            display: flex;
            justify-content: center;
          }
          
          .cart-container.with-panel {
            width: 60%;
            max-width: 60%;
          }
          
          .payment-panel {
            width: 40%;
            max-width: 40%;
          }
        }
        
        input:focus {
          outline: none;
          border-color: #f59e0b;
        }
      `}</style>

      {/* Contenedor principal - centrado y responsive */}
      <div className="flex flex-col lg:flex-row min-h-screen w-screen mx-auto">
        
        {/* Panel izquierdo - Carrito de compras centrado */}
        <div className={`cart-container bg-white p-4 sm:p-6 lg:p-12 overflow-y-auto transition-all duration-400 ${
          isPaymentOpen ? 'with-panel flex-1' : 'full-width w-full'
        }`}>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl sm:text-2xl font-bold title-font">Q</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-400 font-light">Your Shopping Cart</h1>
            </div>
          
          {/* Items del carrito */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 mb-6 sm:mb-8">
            {cartItems.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6 bg-gray-50 p-2 sm:p-3 lg:p-4 rounded-xl item-enter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Imagen del producto */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white rounded-lg flex-shrink-0 p-1 sm:p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                
                {/* Info del producto */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Ref: {item.ref}</p>
                </div>
                
                {/* Color - oculto en pantallas pequeñas */}
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium hidden lg:block xl:block">{item.color}</div>
                
                {/* Controles de cantidad */}
                <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-lg p-0.5 sm:p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span className="w-5 sm:w-6 lg:w-8 text-center font-semibold text-xs sm:text-sm lg:text-base">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
                
                {/* Precio */}
                <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-gray-900 w-16 sm:w-20 lg:w-24 xl:w-28 text-right">
                  {(item.price * item.quantity).toFixed(2)} NGN
                </div>
                
                {/* Botón eliminar */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          {/* Footer con subtotal */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span className="font-medium">Back to Shop</span>
            </button>
            <div className="text-left sm:text-right">
              <p className="text-sm sm:text-base text-gray-600 mb-1">Subtotal:</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{subtotal.toFixed(2)} NGN</p>
            </div>
          </div>

          {/* Botón para abrir panel de pago en móvil y desktop cuando está cerrado */}
          <button
            onClick={() => setIsPaymentOpen(true)}
            className={`${isPaymentOpen ? 'hidden' : 'block'} w-full mt-4 sm:mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transition-all`}
          >
            Proceed to Payment
          </button>
          </div>
        </div>
        
        {/* Panel derecho - Detalles de pago (colapsible en móvil y desktop) */}
        <div 
          className={`payment-panel fixed lg:relative inset-y-0 right-0 w-full sm:w-80 lg:w-auto lg:flex-1 bg-gray-800 shadow-2xl lg:shadow-none z-50 ${
            isPaymentOpen ? 'open' : 'closed'
          }`}
        >
          <div className="h-full flex flex-col p-5 sm:p-6 lg:p-8 xl:p-12 overflow-y-auto">
            {/* Botón de cerrar (solo móvil/tablet) */}
            <button
              onClick={() => setIsPaymentOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Botón de cerrar (solo desktop) */}
            <button
              onClick={() => setIsPaymentOpen(false)}
              className="hidden lg:block absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Indicador de pestaña (3 puntos) - visible en desktop cuando está cerrado */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full transition-opacity duration-300 ${
              !isPaymentOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'
            }`}>
              <button
                onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                className="bg-gray-800 rounded-l-lg p-2.5 sm:p-3 shadow-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex flex-col gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isPaymentOpen ? 'bg-gray-400' : 'bg-amber-400'
                  }`}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-amber-400 text-xl sm:text-2xl lg:text-3xl font-semibold title-font mb-6 sm:mb-8 lg:mb-12">Card Details</h2>
              
              {/* Selección de tipo de tarjeta */}
              <div className="mb-5 sm:mb-6 lg:mb-8">
                <p className="text-gray-300 mb-3 sm:mb-4 font-medium text-sm sm:text-base">Select Card Type</p>
                <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                  {[
                    { id: 'mastercard', name: 'Mastercard', logo: '/card_11378185.png' },
                    { id: 'visa', name: 'Visa', logo: '/visa_5968397.png' },
                    { id: 'verve', name: 'Verve', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Verve_logo.png' }
                  ].map((card) => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      className={`flex items-center justify-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                        selectedCard === card.id
                          ? 'bg-white text-gray-900 ring-2 ring-amber-400'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      <img 
                        src={card.logo} 
                        alt={card.name}
                        className={`h-6 sm:h-7 lg:h-8 w-auto object-contain transition-all ${
                          selectedCard === card.id ? 'filter brightness-0' : 'filter brightness-0 opacity-70'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Número de tarjeta */}
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-sm sm:text-base">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-transparent border-b-2 border-gray-600 pb-2 sm:pb-3 text-white text-sm sm:text-base lg:text-lg focus:border-amber-400 transition-colors"
                />
              </div>
              
              {/* Fecha de expiración y CVV */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-5 sm:mb-6 lg:mb-8">
                <div>
                  <label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm lg:text-base">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full bg-transparent border-b-2 border-gray-600 pb-2 sm:pb-3 text-white text-sm sm:text-base lg:text-lg focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-gray-300 mb-2 sm:mb-3 block font-medium text-xs sm:text-sm lg:text-base">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-transparent border-b-2 border-gray-600 pb-2 sm:pb-3 text-white text-sm sm:text-base lg:text-lg focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>
            </div>
            
            {/* Botón de checkout */}
            <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 py-3 sm:py-4 lg:py-5 rounded-xl text-gray-900 font-bold text-sm sm:text-base lg:text-lg hover:shadow-lg hover:-translate-y-1 transition-all">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar el panel en móvil - solo visible cuando el panel está abierto */}
      {isPaymentOpen && (
        <div
          onClick={() => setIsPaymentOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </div>
  );
}