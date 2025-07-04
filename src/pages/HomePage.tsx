import { HeroSection } from '../components/HeroSection';
import { GodsCarousel } from '../components/GodsCarousel';

export function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <GodsCarousel />
      
      <section className="py-16 px-4 bg-gradient-to-b from-white to-shrine-cream/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-shrine-navy mb-12">
            占いの仕組み
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-shrine-gold/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">📅</span>
              </div>
              <h4 className="font-bold text-lg mb-2">数秘術</h4>
              <p className="text-gray-600">
                生年月日から導き出される運命数で、あなたの基本的な性質を読み解きます
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-shrine-gold/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔮</span>
              </div>
              <h4 className="font-bold text-lg mb-2">四柱推命</h4>
              <p className="text-gray-600">
                十干十二支の組み合わせから、より深い性格分析を行います
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-shrine-gold/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">⭐</span>
              </div>
              <h4 className="font-bold text-lg mb-2">九星気学</h4>
              <p className="text-gray-600">
                生まれ年から本命星を割り出し、運勢の流れを見極めます
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}