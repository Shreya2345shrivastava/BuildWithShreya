import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Secure Checkout - BuildWithShreya',
  description: 'Complete your purchase of First Build It, Then Make It Beautiful',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-ivory)] py-12 lg:py-20 relative overflow-hidden font-sans text-[var(--color-text-primary)]">
      {/* Background soft blurs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-bg-sage-tint)] to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--color-bg-peach-tint)] rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute top-[20%] -left-20 w-[400px] h-[400px] bg-[var(--color-bg-sage-tint)] rounded-full blur-[100px] opacity-30 -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <Link href="/" className="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors group">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[var(--color-text-primary)]">
            Secure Checkout
          </h1>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left: Payment Form */}
          <div className="w-full lg:w-3/5 bg-[var(--color-surface-elevated)]/70 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-[var(--color-border-soft)] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-2xl font-serif font-semibold mb-6">Your Information</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-text-secondary)]">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-sage)] focus:border-[var(--color-botanical-leaf)] transition-all" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-text-secondary)]">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-sage)] focus:border-[var(--color-botanical-leaf)] transition-all" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-sage)] focus:border-[var(--color-botanical-leaf)] transition-all" placeholder="jane@example.com" />
                <p className="text-xs text-[var(--color-botanical-leaf)]">Your ebook will be sent to this email address.</p>
              </div>

              <div className="pt-8 mt-8 border-t border-[var(--color-border-soft)]">
                <h2 className="text-2xl font-serif font-semibold mb-6">Payment Method</h2>
                
                {/* Payment Option Mockup */}
                <div className="p-4 border-2 border-[var(--color-botanical-leaf)] bg-[var(--color-surface-secondary)] rounded-xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full border-4 border-[var(--color-botanical-leaf)] bg-[var(--color-surface-elevated)] flex-shrink-0" />
                    <span className="font-medium text-[var(--color-text-primary)]">Pay securely with Razorpay</span>
                  </div>
                  <div className="flex space-x-2 opacity-70">
                    {/* Mock Card Icons */}
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-800">VISA</div>
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mix-blend-multiply" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mix-blend-multiply -ml-1" />
                    </div>
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-500">UPI</div>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-4 flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-[var(--color-botanical-leaf)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  Transactions are encrypted and secured. We do not store your full card details.
                </p>
              </div>

              <button 
                type="button"
                className="w-full mt-8 py-4 bg-[var(--color-botanical-moss)] hover:bg-[var(--color-text-primary)] !text-[var(--color-text-inverse)] rounded-xl font-medium text-lg transition-all duration-300 shadow-[0_10px_20px_rgba(45,58,47,0.15)] hover:shadow-[0_15px_30px_rgba(45,58,47,0.2)] flex justify-center items-center group"
              >
                Complete Purchase
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-[var(--color-surface-elevated)]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[var(--color-border-soft)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] sticky top-8">
              <h3 className="text-xl font-serif font-semibold mb-6 pb-4 border-b border-[var(--color-border-soft)]">Order Summary</h3>
              
              <div className="flex gap-6 mb-8">
                {/* Book Cover Thumbnail */}
                <div className="w-24 h-32 bg-gradient-to-br from-[var(--color-bg-sage-tint)] to-[var(--color-bg-peach-tint)] rounded-lg shadow-sm flex-shrink-0 flex items-center justify-center relative overflow-hidden group">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📖</span>
                  <div className="absolute inset-0 border border-black/5 rounded-lg"></div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <h4 className="font-serif text-lg font-semibold text-[var(--color-text-primary)] leading-tight">First Build It, Then Make It Beautiful</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">Digital Edition (PDF + EPUB)</p>
                  <p className="font-medium text-[var(--color-text-primary)] mt-3">₹999</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 pb-8 border-b border-[var(--color-border-soft)] text-sm">
                <li className="flex items-start text-[var(--color-text-secondary)]">
                  <svg className="w-4 h-4 mr-3 text-[var(--color-botanical-leaf)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Instant digital access sent to your email</span>
                </li>
                <li className="flex items-start text-[var(--color-text-secondary)]">
                  <svg className="w-4 h-4 mr-3 text-[var(--color-botanical-leaf)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Complete beautifully designed ebook</span>
                </li>
                <li className="flex items-start text-[var(--color-text-secondary)]">
                  <svg className="w-4 h-4 mr-3 text-[var(--color-botanical-leaf)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Printable 30-Day transformation challenge</span>
                </li>
              </ul>

              <div className="space-y-3 text-[var(--color-text-primary)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span>₹999</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-[var(--color-border-soft)]">
                  <span className="font-serif font-semibold text-xl">Total</span>
                  <span className="font-serif font-bold text-2xl">₹999</span>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                 <div className="flex space-x-6 opacity-60 grayscale">
                    <span className="text-xl font-bold italic tracking-tighter">razorpay</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
