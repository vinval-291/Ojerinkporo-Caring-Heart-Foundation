import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, CreditCard, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const amounts = [10, 25, 50, 100, 250, 500];

export default function Donate() {
  const [donationType, setDonationType] = useState<'one-time' | 'recurring'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-brand-green/10 p-6 rounded-full mb-8"
        >
          <CheckCircle2 className="w-16 h-16 text-brand-green" />
        </motion.div>
        <h1 className="text-4xl font-bold text-brand-navy mb-4">Thank You for Your Generosity!</h1>
        <p className="text-brand-text-light max-w-md mx-auto mb-8">
          Your donation has been received. Together, we are nurturing hope and empowering lives. A receipt has been sent to your email.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen">
      <section className="bg-brand-navy py-12 md:py-20 px-6 text-center text-white">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">Support the Mission</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your contribution directly impacts lives. Every dollar counts toward education, empowerment, and community care.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-4xl mx-auto">
          <div className="bg-white rounded-[40px] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-brand-royal p-10 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Donate?</h2>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="bg-white/20 p-2 rounded-lg shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Provide scholarships for underserved children.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-white/20 p-2 rounded-lg shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Empower widows with entrepreneurship grants.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-white/20 p-2 rounded-lg shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Fund community health and food outreach programs.</p>
                  </li>
                </ul>
              </div>
              <div className="mt-12 pt-12 border-t border-white/20">
                <p className="text-xs italic opacity-70">
                  "Your support is the bridge between a difficult present and a hopeful future."
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="md:col-span-3 p-10 space-y-8">
              {/* Donation Type */}
              <div className="flex bg-brand-bg p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                    donationType === 'one-time' ? "bg-white shadow-sm text-brand-navy" : "text-brand-text-light"
                  )}
                >
                  One-time
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('recurring')}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                    donationType === 'recurring' ? "bg-white shadow-sm text-brand-navy" : "text-brand-text-light"
                  )}
                >
                  Monthly
                </button>
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-brand-navy uppercase tracking-widest">Select Amount</label>
                <div className="grid grid-cols-3 gap-3">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={cn(
                        "py-4 rounded-2xl border-2 font-bold transition-all",
                        selectedAmount === amount ? "border-brand-accent bg-brand-accent/5 text-brand-accent" : "border-gray-100 text-brand-text-light hover:border-gray-200"
                      )}
                    >
                      ${amount}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedAmount('custom')}
                    className={cn(
                      "py-4 rounded-2xl border-2 font-bold transition-all",
                      selectedAmount === 'custom' ? "border-brand-accent bg-brand-accent/5 text-brand-accent" : "border-gray-100 text-brand-text-light hover:border-gray-200"
                    )}
                  >
                    Custom
                  </button>
                </div>
                {selectedAmount === 'custom' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-accent outline-none font-bold"
                      required
                    />
                  </motion.div>
                )}
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-text-light uppercase">First Name</label>
                  <input type="text" required className="w-full p-3 rounded-xl bg-brand-bg border-none focus:ring-2 focus:ring-brand-accent outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-text-light uppercase">Last Name</label>
                  <input type="text" required className="w-full p-3 rounded-xl bg-brand-bg border-none focus:ring-2 focus:ring-brand-accent outline-none" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-brand-text-light uppercase">Email Address</label>
                  <input type="email" required className="w-full p-3 rounded-xl bg-brand-bg border-none focus:ring-2 focus:ring-brand-accent outline-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white py-5 rounded-2xl font-bold text-lg shadow-lg transition-all hover:scale-[1.02]"
              >
                Complete Donation
              </button>
              <p className="text-center text-xs text-brand-text-light">
                Secure SSL Encrypted Payment
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
