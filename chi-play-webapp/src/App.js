import './App.css';
import { Routes, Route } from "react-router-dom";

import Menu from './components/Menu';
import HomePage from './components/HomePage';
import PapersPage from './components/PapersPage';
import AuthorsPage from './components/AuthorsPage';

function App() {
  return (
    <div className="App">
           <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </div>
  );
}

export default App;
