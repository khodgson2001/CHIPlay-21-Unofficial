import React, { useState } from 'react';


/**
 * PaperAuthors component
 *
 * Illustrative answer from week 8 Q2. Using this code
 * will result in 'insufficient resources errors'.
 * 
 * @author Kieran Hodgson
 */
function PaperAuthors(props) {


    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    function fetchAuthors() {

            fetch("http://unn-w20002249.newnumyspace.co.uk/kf6012/api/authors?paper_id=" + props.data.paper_id)
                .then(
                    (response) => response.json()
                )
                .then(
                    (json) => {
                        setAuthors(json);
                        setLoading(false);
                    }
                )
                .catch(
                    (e) => {
                        console.log(e.message);
                    }
                );
    };


    const AllAuthors = authors.map(
        (value, key) => <span key={key}><p>Name: {value.first_name} {value.middle_initial} {value.last_name} | {value.country}, {value.city}, {value.institution}</p></span>
    )

    const showDetails = () => {
        fetchAuthors();
        setVisible(!visible);
      }
      
    return (
        <div onClick={showDetails}>
            <h2>{props.data.title}</h2>
            { visible && <div>
            <p>Paper Type: {props.data.short_name}</p> 
            <p>Description: {props.data.abstract}</p>
            <p>Award: {props.data.award ? <i>Awarded</i> : <i>No awards</i>}</p>
            <p><strong>Authors</strong>{AllAuthors}</p>
            {loading && <p>Loading...</p>}
            </div>}
        </div>
    )


    
}


export default PaperAuthors;