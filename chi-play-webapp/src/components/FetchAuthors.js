import React, { useState, useEffect } from 'react';

function FetchAuthors() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://unn-w20002249.newnumyspace.co.uk/kf6012/api/authors')
        .then(response => response.json())
        .then( 
            (json) => {
                setLoading(false);
                setAuthors(json.data);
            } 
          )
          .catch((err) => {
            console.log(err.message);
          });
    }, []);

    const listOfAuthors = <ul>
    { authors.map(
        (value, key) => <li key={key}>{value.first_name} {value.last_name}</li>
    )}
</ul>
    return (
        <div>
            {loading && <p>Loading...</p>}
            {listOfAuthors}
        </div>
    );
}
 
 
export default FetchAuthors;