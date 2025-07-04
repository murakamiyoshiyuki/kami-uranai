import { gods } from '../data/gods';

// 運命数を計算
export function calculateDestinyNumber(birthDate: string): number {
  // YYYY-MM-DD形式から数字だけを抽出
  const numbers = birthDate.replace(/-/g, '').split('').map(Number);
  let sum = numbers.reduce((acc, num) => acc + num, 0);
  
  // マスターナンバー（11, 22, 33）以外は一桁になるまで足す
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }
  
  return sum;
}

// 十干十二支を取得
const tenHeavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const twelveEarthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export function getStemBranch(year: number) {
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  return {
    stem: tenHeavenlyStems[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: twelveEarthlyBranches[branchIndex < 0 ? branchIndex + 12 : branchIndex]
  };
}

// 九星を計算
const nineStars = ['一白水星', '二黒土星', '三碧木星', '四緑木星', '五黄土星', 
                   '六白金星', '七赤金星', '八白土星', '九紫火星'];

export function calculateNineStar(birthYear: number): string {
  // 簡易的な計算（実際はもっと複雑）
  let index = (1900 - birthYear + 9) % 9;
  if (index < 0) index += 9;
  return nineStars[index];
}

// 質問の回答から性格タイプを判定
export interface QuestionAnswer {
  question: string;
  answer: string;
}

export function analyzePersonality(answers: QuestionAnswer[]): string[] {
  const traits: string[] = [];
  
  answers.forEach(qa => {
    switch (qa.answer) {
      case 'leader':
        traits.push('リーダーシップ', '責任感');
        break;
      case 'support':
        traits.push('協調性', '優しさ');
        break;
      case 'creative':
        traits.push('創造性', '自由');
        break;
      case 'analytical':
        traits.push('分析力', '冷静さ');
        break;
      case 'active':
        traits.push('行動力', '情熱');
        break;
      case 'peaceful':
        traits.push('平和主義', '調和');
        break;
    }
  });
  
  return traits;
}

// 守護神を決定
export function determineGuardianGod(
  destinyNumber: number,
  stemBranch: { stem: string; branch: string },
  nineStar: string,
  personalityTraits: string[]
): string {
  // スコアリングシステム
  const scores: Record<string, number> = {};
  
  Object.keys(gods).forEach(godId => {
    scores[godId] = 0;
  });
  
  // 運命数によるマッピング
  switch (destinyNumber) {
    case 1:
      scores.amaterasu += 3;
      scores.susanoo += 2;
      break;
    case 2:
      scores.izanami += 3;
      scores.uzume += 2;
      break;
    case 3:
      scores.uzume += 3;
      scores.futodama += 2;
      break;
    case 4:
      scores.takamimusubi += 3;
      scores.omoikane += 2;
      break;
    case 5:
      scores.susanoo += 3;
      scores.futodama += 2;
      break;
    case 6:
      scores.kamumusubi += 3;
      scores.izanami += 2;
      break;
    case 7:
      scores.omoikane += 3;
      scores.tsukuyomi += 2;
      break;
    case 8:
      scores.tajikarao += 3;
      scores.koyane += 2;
      break;
    case 9:
      scores.minakanushi += 3;
      scores.amaterasu += 2;
      break;
    case 11:
      scores.tsukuyomi += 3;
      scores.omoikane += 2;
      break;
    case 22:
      scores.izanagi += 3;
      scores.amaterasu += 2;
      break;
    case 33:
      scores.koyane += 3;
      scores.kamumusubi += 2;
      break;
  }
  
  // 干支による調整
  if (['甲', '丙', '戊'].includes(stemBranch.stem)) {
    scores.amaterasu += 1;
    scores.susanoo += 1;
  } else if (['乙', '丁', '己'].includes(stemBranch.stem)) {
    scores.izanami += 1;
    scores.uzume += 1;
  }
  
  // 九星による調整
  if (nineStar.includes('火')) {
    scores.amaterasu += 1;
  } else if (nineStar.includes('水')) {
    scores.susanoo += 1;
    scores.tsukuyomi += 1;
  } else if (nineStar.includes('木')) {
    scores.uzume += 1;
    scores.izanami += 1;
  } else if (nineStar.includes('金')) {
    scores.takamimusubi += 1;
    scores.omoikane += 1;
  } else if (nineStar.includes('土')) {
    scores.tajikarao += 1;
    scores.minakanushi += 1;
  }
  
  // 性格特性による調整
  personalityTraits.forEach(trait => {
    if (trait.includes('リーダー') || trait.includes('責任')) {
      scores.amaterasu += 1;
      scores.izanagi += 1;
    } else if (trait.includes('協調') || trait.includes('優し')) {
      scores.izanami += 1;
      scores.kamumusubi += 1;
    } else if (trait.includes('創造') || trait.includes('自由')) {
      scores.susanoo += 1;
      scores.futodama += 1;
    } else if (trait.includes('分析') || trait.includes('冷静')) {
      scores.omoikane += 1;
      scores.tsukuyomi += 1;
    } else if (trait.includes('行動') || trait.includes('情熱')) {
      scores.susanoo += 1;
      scores.tajikarao += 1;
    } else if (trait.includes('平和') || trait.includes('調和')) {
      scores.minakanushi += 1;
      scores.tsukuyomi += 1;
    }
  });
  
  // 最高スコアの神様を選出
  let maxScore = 0;
  let selectedGod = 'amaterasu';
  
  Object.entries(scores).forEach(([godId, score]) => {
    if (score > maxScore) {
      maxScore = score;
      selectedGod = godId;
    }
  });
  
  return selectedGod;
}

// 今日の運勢を生成
export function generateDailyFortune(godId: string, date: Date) {
  const god = gods[godId];
  const seed = date.getDate() + date.getMonth() + godId.length;
  
  // シード値を使って1-5の値を生成
  const overall = ((seed * 7) % 5) + 1;
  const love = ((seed * 11) % 5) + 1;
  const work = ((seed * 13) % 5) + 1;
  const health = ((seed * 17) % 5) + 1;
  
  // メッセージを選択
  const messages = [
    `今日は${god.element}の力があなたを守ってくれるわ`,
    `${god.catchphrase}って気持ちで過ごしてみて`,
    `${god.name}様があなたに微笑んでいる日よ`,
    `${god.personality[0]}な一面を大切にする日`,
    `${god.advice[Math.floor(seed % god.advice.length)]}`
  ];
  
  return {
    overall,
    love,
    work,
    health,
    message: messages[seed % messages.length]
  };
}

// 相性診断
export function checkCompatibility(godId1: string, godId2: string): {
  score: number;
  message: string;
} {
  const compatibilityMap: Record<string, Record<string, number>> = {
    amaterasu: {
      susanoo: 3,
      tsukuyomi: 4,
      omoikane: 5,
      uzume: 5,
    },
    susanoo: {
      amaterasu: 3,
      izanami: 4,
      tajikarao: 5,
    },
    izanagi: {
      izanami: 5,
      minakanushi: 3,
    },
    izanami: {
      izanagi: 5,
      uzume: 4,
    },
    // 他の組み合わせはデフォルト値を使用
  };
  
  const score = compatibilityMap[godId1]?.[godId2] || 
                compatibilityMap[godId2]?.[godId1] || 
                3; // デフォルトスコア
  
  const messages = {
    5: '最高の相性！運命的な関係かも',
    4: 'とても良い相性。お互いを高め合える関係',
    3: '普通の相性。努力次第で良い関係に',
    2: 'ちょっと難しい相性。理解し合う努力が必要',
    1: '正反対の相性。でも惹かれ合うかも？'
  };
  
  return {
    score,
    message: messages[score as keyof typeof messages] || messages[3]
  };
}