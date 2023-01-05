import React from 'react';
import { useState, useEffect } from 'react';
/* import Search from './Search';
 */
function LocationsPage() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
/*     const [searchTerm, setSearchTerm] = useState('');
 */
    useEffect(() => {
        fetch('http://unn-w20002249.newnumyspace.co.uk/kf6012/api/location')
            .then(response => response.json())
            .then(
                (json) => {
                    setLoading(false);
                    setLocations(json);
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

/*     const searchAuthors = (value) => {
        const fullname = value.first_name + " " + value.last_name; // will need to change this to include the middle name
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const listOfAuthors = <ul>
        {authors.filter(searchAuthors).map(
            (value, key) => <section key={key}>{value.first_name} {value.last_name}</section>
        )}
    </ul> */


/*     const searchHandler = (event) => { setSearchTerm(event) }
 */
function replacer(i, val) {
    if ( val === null ) 
    { 
       return ""; // change null to empty string
    } else {
       return val; // return unchanged
    }
   }

    return (
        <div>
            <h1>Authors</h1>
{/*             <Search searchTerm={searchTerm} handler={searchHandler} />             */}
            {loading && <p>Loading...</p>}
            {JSON.stringify(locations).replace(null, 'Not set')}
        </div>
    );
}


export default LocationsPage;