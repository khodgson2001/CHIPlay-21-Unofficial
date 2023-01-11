import React from 'react';

/**
 * Update Award Component
 * 
 * Uses a fetch request via post with auth headers (bearer token - set in local storage)
 * which updates the specified paper award status.
 * 
 * @author Kieran Hodgson
 */

function UpdateAward(props){

    const handleSelect = (event) => {
        const formData = new FormData();
        formData.append('award', event.target.value);
        formData.append('paper_id', props.paper.paper_id);

        const token = localStorage.getItem('token');
        

        fetch("http://unn-w20002249.newnumyspace.co.uk/kf6012/api/update",
        {
            method: 'POST',
            headers: new Headers( { "Authorization": "Bearer " +token }),
            body: formData
        })
        .then(
            (response) => {
                return response.json()
            })
        .then(
            (json) => {
                console.log(json);
            })
        .catch(
            (e) => {
                console.log(e.message)
            }
        )


        console.log(event.target.value);
    }

    return(
        <div>
            <b>Title:</b> {props.paper.title} <br/> <b>Award Status: </b>{props.paper.award ? <>Has Award</> : <>Not Awarded</>}

            <select defaultValue = {props.paper.award ? "true" : "false"} onChange={handleSelect}>
                <option value="false">Not Awarded</option>
                <option value="true">Awarded</option>

            </select>
            <br/>
        </div>
    )
}

export default UpdateAward;