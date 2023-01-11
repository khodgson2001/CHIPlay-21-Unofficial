import React, { useState, useEffect } from 'react';


/**
 * Author Affiliation component
 * This component is used to display the author affiliations for each paper
 * Uses a use effect to request affiliation data based on the paper id and 
 * author id parameter, and stores in the affiliation constant.
 * 
 * This is then mapped and returned
 * 
 * used in PaperInformation component
 * @author Kieran Hodgson
*/

function AuthorAffiliation(props) {

    const [affiliation, setAffliation] = useState([]); //instansiate affiliation as an empty array


    useEffect(() => {
        fetch("http://unn-w20002249.newnumyspace.co.uk/kf6012/api/affiliations?paper_id=" +
            props.paper_id + "&author_id=" + props.author_id) //fetch data from api using paper_id and author_id
            .then(response => response.json()) //convert response to json
            .then(
                (json) => { 
                    setAffliation(json); //set affiliation to json
                }
            )
            .catch(
                (err) => { //catch error
                    console.log(err.message); //log error message
                }
            );
    }, []);




    const AllAffiliations = affiliation.map(
        (value, key) =>
            <span key={key}>
                {isNaN(value.country) ? (" " + value.country) : ""}
                {isNaN(value.state) ? (", " + value.state) : ""}
                {isNaN(value.city) ? (", " + value.city) : ""}
                {isNaN(value.institution) ? (", " + value.institution) : ""}
                {isNaN(value.department) ? (", " + value.department) : ""} |
            </span>
    )



    return (
        AllAffiliations
    )
}
export default AuthorAffiliation;