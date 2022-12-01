import React, {useState, useEffect} from 'react';

function FilteredPapers(props){

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

    const paperType = (value) => (value.short_name === props.short_name);

const showPaperTypes = 
    <div>
        { papers.filter(paperType).map(
        (value, key) => <section key={key}>
        <h2>{value.title}</h2>
        <p>Paper Type: {value.short_name}</p>
        <p>Abstract: {value.abstract}</p>
    </section>
    )}</div>
    
    
    return (
        <div>
            <h1>Papers ({props.short_name})</h1>
            {loading && <p>Loading...</p>}
            {showPaperTypes}
        </div>
    )
    

}

export default FilteredPapers;
