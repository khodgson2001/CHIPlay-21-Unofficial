import React, {useState, useEffect} from 'react';
import Search from './Search';

function Track(props){

    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');


   
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
    const searchPapers = (value) => {
        const fullname = value.title + " " + value.abstract;
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const paperType = (value) => (value.short_name === props.short_name);

const showPaperTypes = 
    <div>
        { papers.filter(paperType).filter(searchPapers).map(
        (value, key) => <section key={key}>
        <h2>{value.title}</h2>
        <p>Paper Type: {value.short_name}</p>
        <p>Abstract: {value.abstract}</p>
    </section>
    )}</div>
    
    const searchHandler = (event) => { setSearchTerm(event) }

    
    return (
        <div>
            <h1>Papers ({props.short_name})</h1>
            <Search searchTerm={searchTerm} handler={searchHandler} />            

            {loading && <p>Loading...</p>}
            {showPaperTypes}
        </div>
    )
    

}

export default Track;
