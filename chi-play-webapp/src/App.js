import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import AuthorsPage from './components/AuthorsPage';
import Papers from './components/Papers';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';

/**
 * App component
 * 
 * uses a use effect to load in the commonly used feature - papers
 * components then called and data passed in as props
 * 
 * @author Kieran Hodgson
 * 
 */

function App() {

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
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
        <Route index element={<Papers papers={papers} short_name="all" loading={loading} />} />
          <Route path="interactivity" element={<Papers short_name = "Interactivity" papers={papers} loading={loading} />} />
          <Route path="wip" element={<Papers short_name = "wip" papers={papers} loading={loading} />} />
          <Route path="fullpapers" element={<Papers short_name = "fullpapers" papers={papers} loading={loading}/>} />
          <Route path="competition" element={<Papers short_name = "competition" papers={papers} loading={loading}/>} />
          <Route path="doctoral" element={<Papers short_name = "doctoral" papers={papers} loading={loading}/>} />
          <Route path="rapid" element={<Papers short_name = "rapid" papers={papers} loading={loading}/>} />
        </Route>
        <Route path="/admin" element={<AdminPage authenticated={authenticated} handleAuthenticated={setAuthenticated} papers={papers} />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    <Footer />
    </div>
  );
}

export default App;
