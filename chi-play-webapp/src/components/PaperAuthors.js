import React, { useState } from 'react';
import AuthorAffiliation from './AuthorAffiliation';

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
    const [allVisible, setAllVisible] = useState(false);
    const [readMore, setReadMore] = useState(false);

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
        (value, key) =>
            <div key={key}>
                <div>
                    <strong>Name: </strong> 
                    {value.first_name} {value.middle_initial} {value.last_name} | <AuthorAffiliation paper_id = {props.data.paper_id} author_id = {value.author_id}></AuthorAffiliation>
                </div>
            </div>
    )

    const showDetails = () => {
        fetchAuthors();
        setAllVisible(!allVisible);
    }

    const abstractReadMore = () => {
        setReadMore(!readMore);
    }

    return (
        <div>
            <div onClick={showDetails}>
                <h2>
                    {props.data.title}
                </h2>
            </div>
            {allVisible && 
            <div>
                <div>
                    <strong>Paper Type:</strong> {props.data.short_name}
                </div>

                <div>
                    <strong>Abstract</strong>
                    {readMore && <div>{props.data.abstract}</div>}
                    
                    <div onClick={abstractReadMore}>
                        {!readMore && props.data.abstract.slice(0, 150) + "..."}<b> Read {readMore ? "Less" : "More"}</b>
                    </div>

                </div>

                <div>
                    <strong>Award: </strong>{props.data.award ? <i>Awarded</i> : <i>No awards</i>}
                </div>

                <div>
                    <strong><u>Authors</u></strong>
                    {AllAuthors}
                </div>

                {loading && <p>Loading...</p>}
            </div>
            }
        </div>
    )



}


export default PaperAuthors;