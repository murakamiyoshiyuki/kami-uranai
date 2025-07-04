import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-shrine-red to-shrine-red/90 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Sparkles className="w-8 h-8 text-shrine-gold" />
            <h1 className="text-2xl font-bold">神様占い</h1>
          </Link>
          
          <ul className="flex space-x-6 text-sm md:text-base">
            <li>
              <Link to="/fortune" className="hover:text-shrine-gold transition-colors">
                占いを始める
              </Link>
            </li>
            <li>
              <Link to="/gods" className="hover:text-shrine-gold transition-colors">
                神様図鑑
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-shrine-gold transition-colors">
                このサイトについて
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}