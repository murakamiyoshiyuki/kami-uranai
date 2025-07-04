import { HeroSection } from '../components/HeroSection';
import { GodsCarousel } from '../components/GodsCarousel';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <GodsCarousel />
      
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-gold-primary font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              三つの占術
            </span>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              占いの仕組み
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              古来より伝わる三つの占術を組み合わせ、あなたに最適な守護神を導き出します
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '📅',
                title: '数秘術',
                description: '生年月日から導き出される運命数で、あなたの基本的な性質を読み解きます',
                color: 'from-gold-dark to-gold-primary',
              },
              {
                icon: '🔮',
                title: '四柱推命',
                description: '十干十二支の組み合わせから、より深い性格分析を行います',
                color: 'from-purple-deep to-purple-medium',
              },
              {
                icon: '⭐',
                title: '九星気学',
                description: '生まれ年から本命星を割り出し、運勢の流れを見極めます',
                color: 'from-blue-600 to-blue-400',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="glass rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative inline-block mb-6"
                  >
                    <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${item.color} opacity-20 absolute inset-0 blur-xl group-hover:opacity-30 transition-opacity`} />
                    <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${item.color} opacity-10 flex items-center justify-center relative`}>
                      <span className="text-5xl">{item.icon}</span>
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <h4 className="text-xl font-display font-bold text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className={`h-1 w-16 mx-auto mt-6 rounded-full bg-gradient-to-r ${item.color} opacity-50 group-hover:w-24 transition-all duration-300`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
              }}
              animate={{
                y: -100,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
              className="absolute w-1 h-1 bg-gold-primary/30 rounded-full"
            />
          ))}
        </div>
      </section>
    </main>
  );
}