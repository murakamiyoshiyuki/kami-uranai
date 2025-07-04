import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { gods } from '../data/gods';

const godsList = Object.values(gods);

export function GodsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const mouseX = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % godsList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + godsList.length) % godsList.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % godsList.length);
  };

  const currentGod = godsList[currentIndex];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-gold-primary font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            13柱の神様
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            登場する神様たち
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            古事記に登場する個性豊かな神様たちが、あなたの運命を照らします
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGod.id}
              initial={{ opacity: 0, scale: 0.95, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                rotateY,
                transformPerspective: 1200,
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                mouseX.set(x);
              }}
              onMouseLeave={() => mouseX.set(0)}
              className="glass rounded-3xl p-8 md:p-12 backdrop-blur-xl"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* God Avatar and Info */}
                <div className="text-center md:text-left">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative inline-block mb-8"
                  >
                    <div 
                      className="w-40 h-40 mx-auto md:mx-0 rounded-full relative overflow-hidden"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentGod.color}20, ${currentGod.color}40)`,
                      }}
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-full h-full flex items-center justify-center text-7xl"
                      >
                        {currentGod.element === '太陽' && '☀️'}
                        {currentGod.element === '月' && '🌙'}
                        {currentGod.element === '嵐' && '⛈️'}
                        {currentGod.element === '創造' && '✨'}
                        {currentGod.element === '生命' && '🌸'}
                        {currentGod.element === '知恵' && '📚'}
                        {currentGod.element === '芸能' && '💃'}
                        {currentGod.element === '中心' && '🎯'}
                        {currentGod.element === '生成' && '🌱'}
                        {currentGod.element === '産霊' && '💎'}
                        {currentGod.element === '力' && '💪'}
                        {currentGod.element === '祝詞' && '📜'}
                        {currentGod.element === '占い' && '🔮'}
                      </motion.div>
                    </div>
                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 rounded-full blur-2xl opacity-30"
                      style={{ backgroundColor: currentGod.color }}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 
                      className="text-3xl md:text-4xl font-display font-bold mb-2"
                      style={{ color: currentGod.color }}
                    >
                      {currentGod.name}
                    </h3>
                    <p className="text-gray-400 mb-6">{currentGod.title}</p>
                    
                    {/* Element Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <span className="text-sm text-gray-300">元素:</span>
                      <span className="text-sm font-medium" style={{ color: currentGod.color }}>
                        {currentGod.element}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* God Details */}
                <div className="space-y-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    {currentGod.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h5 className="font-semibold text-white mb-3">性格特性</h5>
                    <div className="flex flex-wrap gap-2">
                      {currentGod.personality.map((trait, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="px-4 py-2 glass rounded-full text-sm font-medium text-white/90"
                        >
                          {trait}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.blockquote
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative pl-6 py-4"
                  >
                    <div 
                      className="absolute left-0 top-0 w-1 h-full rounded-full"
                      style={{ backgroundColor: currentGod.color }}
                    />
                    <p className="text-xl italic text-white/80">
                      「{currentGod.catchphrase}」
                    </p>
                  </motion.blockquote>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-3 glass glass-hover rounded-full group"
            aria-label="Previous god"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-gold-primary transition-colors" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-3 glass glass-hover rounded-full group"
            aria-label="Next god"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-gold-primary transition-colors" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {godsList.map((god, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className="relative group"
                aria-label={`Go to ${god.name}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-12 bg-gradient-to-r from-gold-dark to-gold-light'
                      : 'bg-white/30 group-hover:bg-white/50'
                  }`}
                />
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 w-12 h-2 rounded-full bg-gradient-to-r from-gold-dark to-gold-light blur-sm"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}