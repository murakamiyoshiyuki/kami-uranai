import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-shrine-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-shrine-red rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-shrine-navy mb-6">
            古事記の神様があなたを導く
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            生年月日と簡単な質問から、あなたの守護神を診断。
            <br />
            古事記に登場する個性豊かな神様たちが、あなたの人生にアドバイスを贈ります。
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/fortune"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-shrine-red to-shrine-red/90 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Star className="w-5 h-5" />
              今すぐ占いを始める
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 flex justify-center items-center gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-shrine-gold">13柱</div>
              <div className="text-sm text-gray-600">の神様</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-shrine-gold">3つ</div>
              <div className="text-sm text-gray-600">の占術</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-shrine-gold">∞</div>
              <div className="text-sm text-gray-600">の可能性</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}