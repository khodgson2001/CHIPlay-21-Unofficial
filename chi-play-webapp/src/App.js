import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import PapersPage from './components/PapersPage';
import AuthorsPage from './components/AuthorsPage';
import Track from './components/Track';
import Footer from './components/Footer';
import LocationsPage from './components/LocationsPage';


function App() {

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://unn-w20002249.newnumyspace.co.uk/kf6012/api/papers')
        .then(response => response.json())
        .then(
            (json) => {
                setLoading(false);
                setPapers(json);
            }
        )
        .catch((err) => {
            console.log(err.message);
        });
}, []);


  return (
    <div className="App">
    <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/papers" >
        <Route index element={<PapersPage papers={papers} loading={loading} />} />
          <Route path="Interactivity" element={<Track short_name = "Interactivity" papers={papers} loading={loading} />} />
          <Route path="wip" element={<Track short_name = "wip" papers={papers} loading={loading} />} />
          <Route path="fullpapers" element={<Track short_name = "fullpapers" papers={papers} loading={loading}/>} />
          <Route path="competition" element={<Track short_name = "competition" papers={papers} loading={loading}/>} />
          <Route path="doctoral" element={<Track short_name = "doctoral" papers={papers} loading={loading}/>} />
          <Route path="rapid" element={<Track short_name = "rapid" papers={papers} loading={loading}/>} />
        </Route>
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    <Footer />
    </div>
  );
}

export default App;
