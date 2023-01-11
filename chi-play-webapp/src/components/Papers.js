import React, { useState } from 'react';
import Search from './Search';
import PaperInformation from './PaperInformation';

/**
 * Papers component
 * 
 * Holds the components of what makes up the papers page
 * Includes search and select functions
 * 
 * Makes use of PaperInformation component, passing in the filtered and mapped paper information
 * 
 * @author Kieran Hodgson
 */

function Papers(props) {


    const [searchTerm, setSearchTerm] = useState('');
    const [selectValue, setSelectValue] = useState('all');


    const searchPapers = (value) => {
        const fullname = value.title + " " + value.abstract;
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const selectPapers = (value) => (
        (value.award ?  // if award is set
            (value.award === selectValue) // if award is equal value & equal type to selectValue | truthy value
            :
            selectValue === "") // if award is equal value & equal type to blank string (aka null)
        || selectValue === "all" // selectValue is equal to "all"
    );

    const paperType = (value) => (value.short_name === props.short_name);


    /**
     * Two seperate options for paper types
     * Initially had two pages - one for track filtered pages, and one for all papers
     * These were almost identical, merged them by using a ternary operator to check if the short_name is "all"
     */
    const showPaperTypes =
        <div>
            {props.short_name === "all" ?
                props.papers.filter(searchPapers).filter(selectPapers).map(
                    (value, key) => <section key={key}>
                        <PaperInformation data={value} />
                    </section>
                )
                :
                props.papers.filter(paperType).filter(searchPapers).filter(selectPapers).map(
                    (value, key) => <section key={key}>
                        <PaperInformation data={value} />
                    </section>
                )
            }
        </div>

    const onChangeSelect = (event) => setSelectValue(event.target.value);
    const searchHandler = (event) => { setSearchTerm(event) }


    return (
        <div>
            <h1>Papers ({props.short_name})</h1>
            <div>
                <label>Select Award Status: </label>
                <select value={selectValue} onChange={onChangeSelect}>
                    <option value="all">All</option>
                    <option value="true">Has Award</option>
                    <option value="">Hasn't Award</option>
                </select>
            </div>
            <Search searchTerm={searchTerm} handler={searchHandler} />
            <p><i>Click the paper titles to see info!</i></p>
            {props.loading && <p>Loading...</p>}
            {showPaperTypes}
        </div>
    )


}

export default Papers;
