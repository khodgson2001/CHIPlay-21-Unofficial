import React, { useState, useEffect } from 'react';


/**
 * PaperAuthors component
 *
 * Illustrative answer from week 8 Q2. Using this code
 * will result in 'insufficient resources errors'.
 * 
 * @author Kieran Hodgson
 */
function AuthorAffiliation(props) {

    const [affiliation, setAffliation] = useState([]);


    useEffect(() => {
        fetch("http://unn-w20002249.newnumyspace.co.uk/kf6012/api/affiliations?paper_id=" + props.paper_id + "&author_id=" + props.author_id)
            .then(response => response.json())
            .then(
                (json) => {
                    setAffliation(json);
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }, []);



    
    const AllAffiliations = affiliation.map(
        (value, key) =>
            <span key={key}>
                    {isNaN(value.country) ? (" " + value.country) : ""}{isNaN(value.state) ? (", " + value.state) : ""}{isNaN(value.city) ? (", " + value.city) : ""}{isNaN(value.institution) ? (", " + value.institution) : ""}{isNaN(value.department) ? (", " + value.department) : ""} |
            </span>
    )



    return (
        AllAffiliations
    )
}
export default AuthorAffiliation;