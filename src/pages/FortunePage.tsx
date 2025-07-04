import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Droplet, HelpCircle, Loader2, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { useFortuneStore } from '../stores/fortuneStore';
import { 
  calculateDestinyNumber, 
  getStemBranch, 
  calculateNineStar,
  analyzePersonality,
  determineGuardianGod
} from '../utils/fortune';
import { gods } from '../data/gods';

const questions = [
  {
    id: 'q1',
    question: 'グループでの活動では、あなたはどんな役割を担うことが多い？',
    options: [
      { value: 'leader', label: 'リーダーとしてみんなを引っ張る' },
      { value: 'support', label: 'サポート役として支える' },
      { value: 'creative', label: 'アイデアを出す創造的な役割' },
      { value: 'analytical', label: '分析や計画を立てる役割' },
    ]
  },
  {
    id: 'q2',
    question: '休日の過ごし方で最も好きなのは？',
    options: [
      { value: 'active', label: 'アクティブに外出して楽しむ' },
      { value: 'peaceful', label: '家でゆっくり過ごす' },
      { value: 'creative', label: '趣味や創作活動に没頭' },
      { value: 'support', label: '友人や家族と一緒に過ごす' },
    ]
  },
  {
    id: 'q3',
    question: '困難な状況に直面した時、あなたの対処法は？',
    options: [
      { value: 'leader', label: '正面から立ち向かう' },
      { value: 'analytical', label: 'じっくり考えて計画を立てる' },
      { value: 'support', label: '信頼できる人に相談する' },
      { value: 'peaceful', label: '時間が解決するのを待つ' },
    ]
  },
];

export function FortunePage() {
  const navigate = useNavigate();
  const fortuneStore = useFortuneStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fortuneStore.setBirthDate(e.target.value);
  };

  const handleGenderChange = (gender: 'male' | 'female' | 'other') => {
    fortuneStore.setGender(gender);
  };

  const handleBloodTypeChange = (bloodType: 'A' | 'B' | 'O' | 'AB') => {
    fortuneStore.setBloodType(bloodType);
  };

  const handleAnswer = (answer: string) => {
    fortuneStore.addAnswer({
      question: questions[currentQuestionIndex].question,
      answer
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateFortune();
    }
  };

  const calculateFortune = async () => {
    setIsCalculating(true);
    
    // 計算処理（アニメーションのため少し遅延）
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const year = new Date(fortuneStore.birthDate).getFullYear();
    const destinyNumber = calculateDestinyNumber(fortuneStore.birthDate);
    const stemBranch = getStemBranch(year);
    const nineStar = calculateNineStar(year);
    const personalityTraits = analyzePersonality(fortuneStore.answers);
    
    const godId = determineGuardianGod(
      destinyNumber,
      stemBranch,
      nineStar,
      personalityTraits
    );
    
    fortuneStore.setFortuneResult({
      destinyNumber,
      stemBranch,
      nineStar,
      guardianGod: gods[godId]
    });
    
    navigate(`/result/${godId}`);
  };

  const nextStep = () => {
    if (currentStep === 1 && fortuneStore.birthDate) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="flex-1 min-h-screen flex items-center justify-center py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-gold-primary font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            あなたの守護神を見つける
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            神様診断
          </h2>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="flex justify-between mb-4">
            {['基本情報', '詳細情報', '性格診断'].map((label, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-sm font-medium ${
                  currentStep > index ? 'text-gold-primary' : 'text-gray-500'
                }`}
              >
                {label}
              </motion.span>
            ))}
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-dark to-gold-light"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Birth date */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass rounded-3xl p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 glass rounded-full">
                  <Calendar className="w-6 h-6 text-gold-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  生年月日を入力してください
                </h3>
              </div>

              <input
                type="date"
                value={fortuneStore.birthDate}
                onChange={handleDateChange}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-gold-primary focus:outline-none transition-all"
                max={new Date().toISOString().split('T')[0]}
              />

              <div className="flex justify-end mt-10">
                <button
                  onClick={nextStep}
                  disabled={!fortuneStore.birthDate}
                  className="group relative px-8 py-4 overflow-hidden rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold-light opacity-90 group-hover:opacity-100 group-disabled:opacity-50 transition-opacity" />
                  <div className="relative flex items-center gap-2 text-dark-primary font-bold">
                    <span>次へ</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Gender & Blood type */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass rounded-3xl p-8 md:p-12"
            >
              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 glass rounded-full">
                      <User className="w-6 h-6 text-gold-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white">
                      性別（任意）
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {(['male', 'female', 'other'] as const).map((gender) => (
                      <button
                        key={gender}
                        onClick={() => handleGenderChange(gender)}
                        className={`px-6 py-4 rounded-2xl border transition-all ${
                          fortuneStore.gender === gender
                            ? 'bg-gold-primary/20 border-gold-primary text-gold-primary'
                            : 'glass border-white/20 text-gray-300 hover:border-gold-primary/50'
                        }`}
                      >
                        {gender === 'male' ? '男性' : gender === 'female' ? '女性' : 'その他'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 glass rounded-full">
                      <Droplet className="w-6 h-6 text-gold-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white">
                      血液型（任意）
                    </h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {(['A', 'B', 'O', 'AB'] as const).map((bloodType) => (
                      <button
                        key={bloodType}
                        onClick={() => handleBloodTypeChange(bloodType)}
                        className={`px-6 py-4 rounded-2xl border transition-all ${
                          fortuneStore.bloodType === bloodType
                            ? 'bg-gold-primary/20 border-gold-primary text-gold-primary'
                            : 'glass border-white/20 text-gray-300 hover:border-gold-primary/50'
                        }`}
                      >
                        {bloodType}型
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-12">
                <button
                  onClick={prevStep}
                  className="group flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-white/10 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">戻る</span>
                </button>
                <button
                  onClick={nextStep}
                  className="group relative px-8 py-4 overflow-hidden rounded-full transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold-light opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-2 text-dark-primary font-bold">
                    <span>次へ</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personality questions */}
          {currentStep === 3 && !isCalculating && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass rounded-3xl p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 glass rounded-full">
                  <HelpCircle className="w-6 h-6 text-gold-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  質問 {currentQuestionIndex + 1} / {questions.length}
                </h3>
              </div>

              <motion.p
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl text-gray-200 mb-10"
              >
                {questions[currentQuestionIndex].question}
              </motion.p>

              <div className="space-y-4">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left px-6 py-5 glass rounded-2xl hover:bg-white/10 border border-white/10 hover:border-gold-primary/50 transition-all group"
                  >
                    <span className="text-gray-200 group-hover:text-white transition-colors">
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {currentQuestionIndex > 0 && (
                <div className="flex justify-start mt-10">
                  <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="group flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-white/10 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    <span className="text-gray-300 group-hover:text-white font-medium transition-colors">前の質問へ</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Calculating */}
          {isCalculating && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-16 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <Loader2 className="w-20 h-20 text-gold-primary" />
                  <div className="absolute inset-0 w-20 h-20 bg-gold-primary/20 blur-xl animate-pulse" />
                </div>
              </motion.div>
              
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                診断中...
              </h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 text-lg"
              >
                高天原の神々があなたの守護神を探しています
              </motion.p>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: Math.random() * 100 - 50,
                      y: 100,
                      opacity: 0,
                    }}
                    animate={{
                      y: -100,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-gold-primary rounded-full"
                    style={{ left: `${50 + (Math.random() - 0.5) * 80}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}