import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, RefreshCw, Heart, Briefcase, Activity, Star, Sparkles } from 'lucide-react';
import { useFortuneStore } from '../stores/fortuneStore';
import { generateDailyFortune } from '../utils/fortune';
import { gods } from '../data/gods';
import { useEffect, useState } from 'react';

export function ResultPage() {
  const { godId } = useParams<{ godId: string }>();
  const navigate = useNavigate();
  const fortuneStore = useFortuneStore();
  const [messageIndex, setMessageIndex] = useState(0);
  
  const god = godId ? gods[godId] : null;
  
  useEffect(() => {
    if (!god || !fortuneStore.guardianGod) {
      navigate('/');
    }
  }, [god, fortuneStore.guardianGod, navigate]);

  useEffect(() => {
    // Typewriter effect for messages
    const timer = setInterval(() => {
      setMessageIndex((prev) => prev + 1);
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!god || !fortuneStore.guardianGod) {
    return null;
  }

  const todaysFortune = generateDailyFortune(godId || '', new Date());

  const handleShare = () => {
    const text = `私の守護神は${god.name}様でした！\n「${god.catchphrase}」\n\n#神様占い #古事記 #占い`;
    
    if (navigator.share) {
      navigator.share({
        title: '神様占い結果',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text + '\n' + window.location.href);
      alert('結果をクリップボードにコピーしました！');
    }
  };

  const handleRetry = () => {
    fortuneStore.reset();
    navigate('/fortune');
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 + i * 0.1 }}
      >
        <Star
          className={`w-5 h-5 ${
            i < count ? 'text-gold-primary fill-gold-primary' : 'text-gray-600'
          }`}
        />
      </motion.div>
    ));
  };

  return (
    <main className="flex-1 min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Hero section with god reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-gold-primary font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            診断完了
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-8"
          >
            あなたの守護神は...
          </motion.h2>
          
          {/* God card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            className="relative inline-block"
          >
            <div className="relative glass rounded-3xl p-12 backdrop-blur-xl">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                style={{ backgroundColor: god.color }}
              />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
                  className="relative inline-block mb-6"
                >
                  <div 
                    className="w-48 h-48 mx-auto rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${god.color}20, ${god.color}40)`,
                    }}
                  >
                    <motion.span 
                      className="text-8xl z-10"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {god.element === '太陽' && '☀️'}
                      {god.element === '月' && '🌙'}
                      {god.element === '嵐' && '⛈️'}
                      {god.element === '創造' && '✨'}
                      {god.element === '生命' && '🌸'}
                      {god.element === '知恵' && '📚'}
                      {god.element === '芸能' && '💃'}
                      {god.element === '中心' && '🎯'}
                      {god.element === '生成' && '🌱'}
                      {god.element === '産霊' && '💎'}
                      {god.element === '力' && '💪'}
                      {god.element === '祝詞' && '📜'}
                      {god.element === '占い' && '🔮'}
                    </motion.span>
                  </div>
                  <div 
                    className="absolute inset-0 rounded-full blur-2xl opacity-40"
                    style={{ backgroundColor: god.color }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-5xl font-display font-bold mb-3" style={{ color: god.color }}>
                    {god.name}
                  </h3>
                  <p className="text-xl text-gray-300 mb-6">{god.title}</p>
                  
                  <motion.blockquote 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-2xl italic text-white/80 max-w-md mx-auto"
                  >
                    「{god.catchphrase.slice(0, messageIndex)}
                    {messageIndex < god.catchphrase.length && (
                      <span className="inline-block w-0.5 h-6 bg-gold-primary animate-blink" />
                    )}
                    」
                  </motion.blockquote>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Details grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Fortune details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="glass rounded-2xl p-8"
          >
            <h4 className="text-xl font-display font-bold text-white mb-6">診断データ</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">運命数</span>
                <span className="text-2xl font-bold text-gradient-gold">
                  {fortuneStore.destinyNumber}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">干支</span>
                <span className="text-lg font-medium text-white">
                  {fortuneStore.stemBranch?.stem}{fortuneStore.stemBranch?.branch}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">九星</span>
                <span className="text-lg font-medium text-white">{fortuneStore.nineStar}</span>
              </div>
            </div>
          </motion.div>

          {/* God attributes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="glass rounded-2xl p-8"
          >
            <h4 className="text-xl font-display font-bold text-white mb-6">神様の属性</h4>
            
            <p className="text-gray-300 mb-6 leading-relaxed">{god.description}</p>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-400 block mb-2">性格特性</span>
                <div className="flex flex-wrap gap-2">
                  {god.personality.map((trait, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 + index * 0.1 }}
                      className="px-3 py-1 glass rounded-full text-sm text-white/90"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Today's fortune */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="glass rounded-2xl p-8"
          >
            <h4 className="text-xl font-display font-bold text-white mb-6">今日の運勢</h4>
            
            <div className="space-y-4">
              {[
                { icon: Star, label: '総合運', value: todaysFortune.overall, color: 'text-gold-primary' },
                { icon: Heart, label: '恋愛運', value: todaysFortune.love, color: 'text-pink-400' },
                { icon: Briefcase, label: '仕事運', value: todaysFortune.work, color: 'text-blue-400' },
                { icon: Activity, label: '健康運', value: todaysFortune.health, color: 'text-green-400' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(item.value)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divine message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="glass rounded-3xl p-10 mb-12 text-center"
        >
          <h4 className="text-2xl font-display font-bold text-white mb-6">
            {god.name}様からの神託
          </h4>
          
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            {todaysFortune.message}
          </p>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {god.advice.map((advice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + index * 0.2 }}
                className="flex items-start gap-4 text-left"
              >
                <span 
                  className="text-2xl flex-shrink-0"
                  style={{ color: god.color }}
                >
                  ✦
                </span>
                <p className="text-gray-300 leading-relaxed">{advice}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleShare}
            className="group relative px-8 py-4 overflow-hidden rounded-full transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold-light opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-2 text-dark-primary font-bold">
              <Share2 className="w-5 h-5" />
              <span>結果をシェア</span>
            </div>
          </button>
          
          <button
            onClick={handleRetry}
            className="group px-8 py-4 glass rounded-full hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-center gap-2 text-white font-medium">
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>もう一度占う</span>
            </div>
          </button>
        </motion.div>
      </div>
    </main>
  );
}