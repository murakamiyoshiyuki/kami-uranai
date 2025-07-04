import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gods } from '../data/gods';

const godsList = Object.values(gods);

export function GodsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % godsList.length);
    }, 4000);

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
    <section className="py-16 px-4 bg-white/50">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center text-shrine-navy mb-12">
          登場する神様たち
        </h3>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGod.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div 
                    className="w-32 h-32 mx-auto md:mx-0 rounded-full mb-6"
                    style={{ backgroundColor: currentGod.color + '20' }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-6xl">
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
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-2" style={{ color: currentGod.color }}>
                    {currentGod.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">{currentGod.title}</p>
                </div>

                <div>
                  <p className="text-gray-700 mb-4">{currentGod.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">性格：</h5>
                    <div className="flex flex-wrap gap-2">
                      {currentGod.personality.map((trait, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="italic text-gray-600 border-l-4 pl-4" style={{ borderColor: currentGod.color }}>
                    「{currentGod.catchphrase}」
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ナビゲーションボタン */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* インジケーター */}
          <div className="flex justify-center gap-2 mt-6">
            {godsList.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-shrine-red'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}