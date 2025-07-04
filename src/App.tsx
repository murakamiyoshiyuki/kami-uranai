import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { FortunePage } from './pages/FortunePage';
import { ResultPage } from './pages/ResultPage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Add dark class to html element
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router basename="/kami-uranai">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fortune" element={<FortunePage />} />
            <Route path="/result/:godId" element={<ResultPage />} />
            <Route 
              path="/gods" 
              element={
                <div className="flex-1 min-h-screen flex items-center justify-center p-8">
                  <div className="glass rounded-2xl p-8 text-center max-w-md">
                    <h2 className="text-2xl font-display font-bold text-gradient-gold mb-4">神様図鑑</h2>
                    <p className="text-gray-400">準備中...</p>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/about" 
              element={
                <div className="flex-1 min-h-screen flex items-center justify-center p-8">
                  <div className="glass rounded-2xl p-8 text-center max-w-md">
                    <h2 className="text-2xl font-display font-bold text-gradient-gold mb-4">このサイトについて</h2>
                    <p className="text-gray-400">準備中...</p>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
