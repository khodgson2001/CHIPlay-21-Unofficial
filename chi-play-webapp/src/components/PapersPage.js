import React, { useState, useEffect } from 'react';
import PaperAuthors from './PaperAuthors';

/**
 * Films page component
 * 
 * This page will show information about all papers
 * 
 * @author Kieran Hodgson
 */


function PapersPage() {
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

    const listOfPapers = <ul>
        {papers.map(
            (value, key) => <section key={key}>
                <PaperAuthors data={value} />
            </section>
        )}
    </ul>
    return (
        <div>
            {loading && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}

export default PapersPage;