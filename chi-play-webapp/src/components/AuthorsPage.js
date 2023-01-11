import React from 'react';
import { useState, useEffect } from 'react';
import Search from './Search';

/**
 * AuthorsPage component
 * 
 * This component is responsible for displaying a list of authors
 * Uses a use effect to immediatley request author data from the API
 * and sets that to authors constant
 * This is then filtered, mapped, and returned
 * 
 * @author Kieran Hodgson
 */

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

    /**
     * Search the list of authors for the search term
     */
    const searchAuthors = (value) => {
        const fullname = value.first_name + " " + value.middle_initial + " " + value.last_name;
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }

    /**
     * return a list of mapped authors, filtered by the search term
     */
    const listOfAuthors = <ul>
        {authors.filter(searchAuthors).map(
            (value, key) =>
                <section key={key}>
                    {value.first_name} {value.middle_initial ? value.middle_initial : <></>} {value.last_name}
                </section>
        )}
    </ul>


    const searchHandler = (event) => { setSearchTerm(event) }



    return (
        <div>
            <h1>Authors</h1>
            <Search searchTerm={searchTerm} handler={searchHandler} />
            {loading && <p>Loading...</p>}
            {listOfAuthors}
        </div>
    );
}


export default AuthorsPage;