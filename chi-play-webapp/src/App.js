import './App.css';
import { Routes, Route } from "react-router-dom";

import Menu from './components/Menu';
import HomePage from './components/HomePage';
import PapersPage from './components/PapersPage';
import AuthorsPage from './components/AuthorsPage';
import Track from './components/Track';
import Footer from './components/Footer';
import LocationsPage from './components/LocationsPage';


function App() {
  return (
    <div className="App">
           <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/papers">
        <Route index element={<PapersPage />} />
          <Route path="Interactivity" element={<Track short_name = "Interactivity" />} />
          <Route path="wip" element={<Track short_name = "wip" />} />
          <Route path="fullpapers" element={<Track short_name = "fullpapers" />} />
          <Route path="competition" element={<Track short_name = "competition" />} />
          <Route path="doctoral" element={<Track short_name = "doctoral" />} />
          <Route path="rapid" element={<Track short_name = "rapid" />} />
        </Route>
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    <Footer />
    </div>
  );
}

export default App;
