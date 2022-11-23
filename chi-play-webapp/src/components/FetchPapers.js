import React, { useState, useEffect } from 'react';

function FetchPapers() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://unn-w20002249.newnumyspace.co.uk/kf6012/api/papers')
        .then(response => response.json())
        .then( 
            (json) => {
                setLoading(false);
                setPapers(json.data);
            } 
          )
          .catch((err) => {
            console.log(err.message);
          });
    }, []);

    const listOfPapers = <ul>
    { papers.map(
        (value, key) => <li key={key}>{value.paper_id} {value.title}</li>
    )}
</ul>
    return (
        <div>
            {loading && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}
 
 
export default FetchPapers;