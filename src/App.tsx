import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { FortunePage } from './pages/FortunePage';
import { ResultPage } from './pages/ResultPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fortune" element={<FortunePage />} />
          <Route path="/result/:godId" element={<ResultPage />} />
          <Route path="/gods" element={<div className="flex-1 p-8 text-center">神様図鑑（準備中）</div>} />
          <Route path="/about" element={<div className="flex-1 p-8 text-center">このサイトについて（準備中）</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
