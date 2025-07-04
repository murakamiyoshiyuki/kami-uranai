import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, RefreshCw, Heart, Briefcase, Activity, Star } from 'lucide-react';
import { useFortuneStore } from '../stores/fortuneStore';
import { generateDailyFortune } from '../utils/fortune';
import { gods } from '../data/gods';

export function ResultPage() {
  const { godId } = useParams<{ godId: string }>();
  const navigate = useNavigate();
  const fortuneStore = useFortuneStore();
  
  const god = godId ? gods[godId] : null;
  
  if (!god || !fortuneStore.guardianGod) {
    navigate('/');
    return null;
  }

  const todaysFortune = generateDailyFortune(godId || '', new Date());

  const handleShare = () => {
    const text = `私の守護神は${god.name}様でした！\n「${god.catchphrase}」\n\n#神様占い #古事記project`;
    
    if (navigator.share) {
      navigator.share({
        title: '神様占い結果',
        text: text,
        url: window.location.href,
      });
    } else {
      // フォールバック: クリップボードにコピー
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
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < count ? 'text-shrine-gold fill-shrine-gold' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <main className="flex-1 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-shrine-navy mb-4">
            あなたの守護神は...
          </h2>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="inline-block"
          >
            <div 
              className="w-40 h-40 mx-auto rounded-full mb-6 flex items-center justify-center shadow-2xl"
              style={{ backgroundColor: god.color + '20' }}
            >
              <span className="text-8xl">
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
              </span>
            </div>
            
            <h3 className="text-4xl font-bold mb-2" style={{ color: god.color }}>
              {god.name}
            </h3>
            <p className="text-xl text-gray-600">{god.title}</p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 診断結果詳細 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h4 className="text-xl font-bold mb-4">診断結果の詳細</h4>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">運命数</span>
                <p className="text-2xl font-bold text-shrine-red">
                  {fortuneStore.destinyNumber}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">干支</span>
                <p className="text-lg font-semibold">
                  {fortuneStore.stemBranch?.stem}{fortuneStore.stemBranch?.branch}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">九星</span>
                <p className="text-lg font-semibold">{fortuneStore.nineStar}</p>
              </div>
            </div>
          </motion.div>

          {/* 神様の説明 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h4 className="text-xl font-bold mb-4">守護神について</h4>
            
            <p className="text-gray-700 mb-4">{god.description}</p>
            
            <div className="mb-4">
              <h5 className="font-semibold mb-2">性格の特徴</h5>
              <div className="flex flex-wrap gap-2">
                {god.personality.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            <blockquote 
              className="italic text-gray-600 border-l-4 pl-4" 
              style={{ borderColor: god.color }}
            >
              「{god.catchphrase}」
            </blockquote>
          </motion.div>
        </div>

        {/* 今日の運勢 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-shrine-cream to-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <h4 className="text-2xl font-bold mb-6 text-center">今日の運勢</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-5 h-5 text-shrine-gold" />
                <span className="font-semibold">総合運</span>
              </div>
              <div className="flex justify-center">
                {renderStars(todaysFortune.overall)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="font-semibold">恋愛運</span>
              </div>
              <div className="flex justify-center">
                {renderStars(todaysFortune.love)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">仕事運</span>
              </div>
              <div className="flex justify-center">
                {renderStars(todaysFortune.work)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="font-semibold">健康運</span>
              </div>
              <div className="flex justify-center">
                {renderStars(todaysFortune.health)}
              </div>
            </div>
          </div>
          
          <div className="text-center bg-white/50 rounded-lg p-4">
            <p className="text-lg font-medium" style={{ color: god.color }}>
              {todaysFortune.message}
            </p>
          </div>
        </motion.div>

        {/* 神様からのアドバイス */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <h4 className="text-2xl font-bold mb-6 text-center">
            {god.name}様からのアドバイス
          </h4>
          
          <div className="space-y-4">
            {god.advice.map((advice, index) => (
              <div key={index} className="flex items-start gap-3">
                <span 
                  className="text-2xl"
                  style={{ color: god.color }}
                >
                  ✦
                </span>
                <p className="text-gray-700">{advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* アクションボタン */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-shrine-red text-white rounded-full font-semibold hover:bg-shrine-red/90 transition-all"
          >
            <Share2 className="w-5 h-5" />
            結果をシェア
          </button>
          
          <button
            onClick={handleRetry}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-shrine-red text-shrine-red rounded-full font-semibold hover:bg-shrine-red/10 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            もう一度占う
          </button>
        </motion.div>
      </div>
    </main>
  );
}