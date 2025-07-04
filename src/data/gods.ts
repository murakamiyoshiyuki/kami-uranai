export interface God {
  id: string;
  name: string;
  title: string;
  personality: string[];
  catchphrase: string;
  speechStyle: string;
  color: string;
  element: string;
  description: string;
  advice: string[];
}

export const gods: Record<string, God> = {
  amaterasu: {
    id: 'amaterasu',
    name: 'アマテラス',
    title: '天照大御神',
    personality: ['責任感が強い', '姉御肌', '面倒見が良い', '時々弱気になる'],
    catchphrase: 'もう！みんな心配かけないでよね！',
    speechStyle: '〜よ、〜わ、〜でしょ？',
    color: '#FFD700',
    element: '太陽',
    description: '高天原を統べる太陽の女神。みんなのお姉様的存在で、責任感が強く面倒見が良い。でも時々プレッシャーに押しつぶされそうになることも。',
    advice: [
      '時には自分を甘やかしても大丈夫よ',
      'みんなあなたの頑張りを見ているわ',
      '完璧じゃなくても、あなたは素敵なのよ'
    ]
  },
  susanoo: {
    id: 'susanoo',
    name: 'スサノオ',
    title: '須佐之男命',
    personality: ['やんちゃ', '素直', '寂しがり屋', '行動派'],
    catchphrase: '俺がなんとかしてやるぜ！',
    speechStyle: '〜だぜ、〜じゃねえか',
    color: '#4169E1',
    element: '嵐',
    description: '海と嵐を司る荒ぶる神。やんちゃで暴れん坊だけど、根は素直で寂しがり屋。姉のアマテラスが大好き。',
    advice: [
      '思い立ったが吉日！迷わず行動しろ！',
      '失敗を恐れるな、それも経験だ',
      '素直な気持ちが一番の武器だぜ'
    ]
  },
  tsukuyomi: {
    id: 'tsukuyomi',
    name: 'ツクヨミ',
    title: '月読命',
    personality: ['物静か', '冷静', '控えめ', '観察力がある'],
    catchphrase: '...そうですか',
    speechStyle: '...（沈黙が多い）',
    color: '#C0C0C0',
    element: '月',
    description: '夜と月を司る静かな神。アマテラスの弟。あまり喋らないが、実は周りをよく見ていて的確なアドバイスをくれる。',
    advice: [
      '静かに見守ることも大切です',
      '無理に話さなくても、伝わるものはあります',
      '月のように、穏やかに照らしていきましょう'
    ]
  },
  izanagi: {
    id: 'izanagi',
    name: 'イザナギ',
    title: '伊邪那岐命',
    personality: ['責任感が強い', '優しい', '妹思い', 'やや優柔不断'],
    catchphrase: 'どうして...こんなことに...',
    speechStyle: '〜だよ、〜だろ？',
    color: '#228B22',
    element: '創造',
    description: '日本の国土を生み出した男神。妹のイザナミと共に国造りをした。優しく責任感が強いが、時に優柔不断な一面も。',
    advice: [
      '迷った時は、初心を思い出そう',
      '大切な人のために頑張るのは素敵だよ',
      '完璧でなくても、君は十分頑張ってる'
    ]
  },
  izanami: {
    id: 'izanami',
    name: 'イザナミ',
    title: '伊邪那美命',
    personality: ['天真爛漫', '明るい', '前向き', 'お兄ちゃん大好き'],
    catchphrase: 'お兄ちゃん、一緒に行こう！',
    speechStyle: '〜だもん、〜よね！',
    color: '#FF69B4',
    element: '生命',
    description: '日本の国土を生み出した女神。イザナギの妹。天真爛漫で明るく、いつも前向き。兄のことが大好き。',
    advice: [
      '笑顔でいれば、きっと良いことがあるよ！',
      '大切な人と一緒なら、どんなことも楽しいよね',
      '今日も元気に頑張ろう！'
    ]
  },
  omoikane: {
    id: 'omoikane',
    name: 'オモイカネ',
    title: '思金神',
    personality: ['知的', '冷静', '企画力がある', '時々動揺する'],
    catchphrase: 'カチャ（メガネを直す音）',
    speechStyle: '〜です、〜ですね',
    color: '#4B0082',
    element: '知恵',
    description: '知恵の神。冷静で論理的、様々な作戦を立てる頭脳派。でも美女に弱い一面も。メガネがトレードマーク。',
    advice: [
      '論理的に考えることは大切です',
      '計画を立てて、着実に進みましょう',
      'たまには感情に従うのも良いかもしれません'
    ]
  },
  uzume: {
    id: 'uzume',
    name: 'ウズメ',
    title: '天宇受売命',
    personality: ['明るい', '天然', 'セクシー', '人懐っこい'],
    catchphrase: 'みんな〜、楽しんでる〜？☆',
    speechStyle: '〜なの〜、〜だよぉ',
    color: '#FF1493',
    element: '芸能',
    description: '芸能の女神。明るく天然で、踊りが大得意。その明るさでみんなを元気にする、高天原のムードメーカー。',
    advice: [
      '楽しいことを見つけて、思いっきり楽しもう！',
      '恥ずかしがらずに、自分を表現してみて',
      'あなたの笑顔が、みんなを幸せにするよ☆'
    ]
  },
  minakanushi: {
    id: 'minakanushi',
    name: 'ミナカヌシ',
    title: '天御中主神',
    personality: ['のんびり', '優柔不断', '優しい', '流されやすい'],
    catchphrase: 'う〜ん、どうしようかな〜',
    speechStyle: '〜かな？、〜じゃん',
    color: '#9370DB',
    element: '中心',
    description: '最初に生まれた最高神。でも威厳はなく、のんびりマイペース。優しいけど優柔不断で、よく流される。',
    advice: [
      'ゆっくりマイペースでいいんだよ',
      'みんな違ってみんないい、それでいいじゃん',
      '迷ったら、心地よい方を選ぼう'
    ]
  },
  takamimusubi: {
    id: 'takamimusubi',
    name: 'タカミムスビ',
    title: '高御産巣日神',
    personality: ['真面目', '理知的', 'メガネキャラ', '実務的'],
    catchphrase: 'カチャ...そうですね',
    speechStyle: '〜ですね、〜ですか',
    color: '#000080',
    element: '生成',
    description: '二番目に生まれた神。真面目で理知的な実務家。メガネをかけていて、実質的なリーダーシップを取ることも。',
    advice: [
      '計画性を持って進めば、必ず成功します',
      '真面目なあなたの努力は、必ず報われます',
      'たまには肩の力を抜いても良いのです'
    ]
  },
  kamumusubi: {
    id: 'kamumusubi',
    name: 'カムムスビ',
    title: '神産巣日神',
    personality: ['オネエ系', '面倒見が良い', '明るい'],
    catchphrase: 'あら〜、それは大変ねぇ',
    speechStyle: '〜わよ、〜のよ〜',
    color: '#FF00FF',
    element: '産霊',
    description: '三番目に生まれた神。オネエ言葉で話す面倒見の良い神様。装飾品がジャラジャラしている。',
    advice: [
      'あなたらしくいることが一番素敵よ',
      '困ったときは、誰かに頼ってもいいのよ〜',
      '自分を大切にすることも忘れないでね'
    ]
  },
  tajikarao: {
    id: 'tajikarao',
    name: 'タヂカラオ',
    title: '天手力男神',
    personality: ['寡黙', '力持ち', '頼れる', '方言あり'],
    catchphrase: 'ん。',
    speechStyle: '短い言葉、方言',
    color: '#8B4513',
    element: '力',
    description: '力の神。寡黙で口数は少ないが、いざという時は誰よりも頼りになる。東北弁っぽい訛りがある。',
    advice: [
      '行動で示す。それでいい',
      '言葉より、行動が大事だ',
      '黙々と。それがお前の強さだ'
    ]
  },
  koyane: {
    id: 'koyane',
    name: 'コヤネ',
    title: '天児屋命',
    personality: ['真面目', '心配性', '長話', '熱血'],
    catchphrase: '小生は思うのだが...',
    speechStyle: '〜だ！、小生は〜',
    color: '#B22222',
    element: '祝詞',
    description: '祝詞の神。真面目で心配性、話が長くなりがち。「小生」という一人称を使う、ちょっと古風な性格。',
    advice: [
      '心配することは悪いことではないのだ！',
      '準備を怠らなければ、必ず良い結果が出る',
      '熱い想いは、必ず誰かに届くはずだ！'
    ]
  },
  futodama: {
    id: 'futodama',
    name: 'フトダマ',
    title: '布刀玉命',
    personality: ['チャラい', '軽い', 'でも実は頼れる'],
    catchphrase: 'それな〜',
    speechStyle: '〜じゃね？、〜っしょ',
    color: '#FFA500',
    element: '占い',
    description: '占いの神。チャラくて軽い感じだが、実は的確な判断力を持つ。現代的な話し方をする。',
    advice: [
      '軽いノリで行こうぜ〜、深く考えすぎない方がいいっしょ',
      'なるようになるって、それが一番',
      '楽しいことだけ考えてればいいんじゃね？'
    ]
  }
};