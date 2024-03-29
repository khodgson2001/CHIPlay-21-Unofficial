import React, { useState } from 'react';
import AuthorAffiliation from './AuthorAffiliation';

/**
 * Paper Information component
 *
 * Responsible for returning a list of papers, and the authors associated to those papers
 * 
 * @author Kieran Hodgson
 */
function PaperInformation(props) {


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

    /**
     * returns a list of mapped authors
     * has author affiliation component which takes in the paper id and author id, and then returns the authors location when creating paper
     */
    const AllAuthors = authors.map(
        (value, key) =>
            <div key={key}>
                <div>
                    <strong>Name: </strong> 
                    {value.first_name} {value.middle_initial} {value.last_name} | <AuthorAffiliation paper_id={props.data.paper_id} author_id={value.author_id}></AuthorAffiliation>
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
                        {!readMore && props.data.abstract.slice(0, 150) + "..."}<b> <i>Read {readMore ? "Less" : "More"}</i></b>
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


export default PaperInformation;