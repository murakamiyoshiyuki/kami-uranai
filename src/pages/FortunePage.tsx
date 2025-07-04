import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Droplet, HelpCircle, Loader2 } from 'lucide-react';
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
    <main className="flex-1 py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-shrine-navy mb-8">
          あなたの守護神を診断
        </h2>

        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-sm ${currentStep >= 1 ? 'text-shrine-red' : 'text-gray-400'}`}>
              基本情報
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-shrine-red' : 'text-gray-400'}`}>
              詳細情報
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-shrine-red' : 'text-gray-400'}`}>
              性格診断
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-shrine-red to-shrine-gold transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: 生年月日 */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-shrine-red" />
                <h3 className="text-xl font-bold">生年月日を入力してください</h3>
              </div>

              <input
                type="date"
                value={fortuneStore.birthDate}
                onChange={handleDateChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-shrine-red focus:outline-none transition-colors"
                max={new Date().toISOString().split('T')[0]}
              />

              <div className="flex justify-end mt-8">
                <button
                  onClick={nextStep}
                  disabled={!fortuneStore.birthDate}
                  className="px-6 py-3 bg-shrine-red text-white rounded-lg font-semibold hover:bg-shrine-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  次へ
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: 性別・血液型 */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-6 h-6 text-shrine-red" />
                    <h3 className="text-xl font-bold">性別（任意）</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(['male', 'female', 'other'] as const).map((gender) => (
                      <button
                        key={gender}
                        onClick={() => handleGenderChange(gender)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          fortuneStore.gender === gender
                            ? 'border-shrine-red bg-shrine-red text-white'
                            : 'border-gray-300 hover:border-shrine-red'
                        }`}
                      >
                        {gender === 'male' ? '男性' : gender === 'female' ? '女性' : 'その他'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Droplet className="w-6 h-6 text-shrine-red" />
                    <h3 className="text-xl font-bold">血液型（任意）</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {(['A', 'B', 'O', 'AB'] as const).map((bloodType) => (
                      <button
                        key={bloodType}
                        onClick={() => handleBloodTypeChange(bloodType)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          fortuneStore.bloodType === bloodType
                            ? 'border-shrine-red bg-shrine-red text-white'
                            : 'border-gray-300 hover:border-shrine-red'
                        }`}
                      >
                        {bloodType}型
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-shrine-red transition-colors"
                >
                  戻る
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-shrine-red text-white rounded-lg font-semibold hover:bg-shrine-red/90 transition-all"
                >
                  次へ
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: 性格診断 */}
          {currentStep === 3 && !isCalculating && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-shrine-red" />
                <h3 className="text-xl font-bold">質問 {currentQuestionIndex + 1} / {questions.length}</h3>
              </div>

              <p className="text-lg mb-6">{questions[currentQuestionIndex].question}</p>

              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-shrine-red hover:bg-shrine-red/5 transition-all"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {currentQuestionIndex > 0 && (
                <div className="flex justify-start mt-8">
                  <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-shrine-red transition-colors"
                  >
                    前の質問へ
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* 診断中 */}
          {isCalculating && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-16 text-center"
            >
              <Loader2 className="w-16 h-16 mx-auto mb-6 text-shrine-red animate-spin" />
              <h3 className="text-2xl font-bold mb-4">診断中...</h3>
              <p className="text-gray-600">
                高天原の神々があなたの守護神を探しています
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}