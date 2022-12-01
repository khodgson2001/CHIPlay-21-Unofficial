import React from 'react';
import { useState, useEffect } from 'react';

function AuthorsPage() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://unn-w20002249.newnumyspace.co.uk/kf6012/api/authors')
            .then(response => response.json())
            .then(
                (json) => {
                    setLoading(false);
                    setAuthors(json);
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const onChange = (event) => setSearchTerm(event.target.value);

    const searchAuthors = (value) => {
        const fullname = value.first_name + " " + value.last_name; // will need to change this to include the middle name
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const listOfAuthors = <ul>
        {authors.filter(searchAuthors).map(
            (value, key) => <section key={key}>{value.first_name} {value.last_name}</section>
        )}
    </ul>




    return (
        <div>
            <h1>Authors</h1>
            <input value={searchTerm} onChange={onChange} />
            {loading && <p>Loading...</p>}
            {listOfAuthors}
        </div>
    );
}


export default AuthorsPage;