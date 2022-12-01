import './App.css';
import { Routes, Route } from "react-router-dom";

import Menu from './components/Menu';
import HomePage from './components/HomePage';
import PapersPage from './components/PapersPage';
import AuthorsPage from './components/AuthorsPage';
import FilteredPapers from './components/FilteredPapers';


function App() {
  return (
    <div className="App">
           <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/papers">
        <Route index element={<PapersPage />} />
          <Route path="Interactivity" element={<FilteredPapers short_name = "Interactivity" />} />
          <Route path="wip" element={<FilteredPapers short_name = "wip" />} />
          <Route path="fullpapers" element={<FilteredPapers short_name = "fullpapers" />} />
          <Route path="competition" element={<FilteredPapers short_name = "competition" />} />
          <Route path="doctoral" element={<FilteredPapers short_name = "doctoral" />} />
          <Route path="rapid" element={<FilteredPapers short_name = "rapid" />} />
        </Route>
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </div>
  );
}

export default App;
