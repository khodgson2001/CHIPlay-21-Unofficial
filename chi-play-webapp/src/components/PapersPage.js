import React, { useState, useEffect } from 'react';
import PaperAuthors from './PaperInformation';
import Search from './Search';

/**
 * Papers page component
 * 
 * This page will show information about all papers
 * 
 * @author Kieran Hodgson
 */


function PapersPage(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectValue, setSelectValue] = useState('all');
    console.log(1234);
    console.log(props.papers);


    const searchPapers = (value) => {
        const fullname = value.title + " " + value.abstract;
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    const selectPapers = (value) => ( 
        (value.award ?  // if award is true
            (value.award.toLowerCase() === selectValue.toLowerCase()) // if award is equal to selectValue | truthy value
            : 
            selectValue === "") // if award is false
        || selectValue === "all" // selectValue is equal to "all"
      );

    const listOfPapers = <ul>
        {props.papers.filter(searchPapers).filter(selectPapers).map(
            (value, key) => <section key={key}>
                <PaperAuthors data={value} />
            </section>
        )}
    </ul>



    const onChangeSelect = (event) => setSelectValue(event.target.value);
    const searchHandler = (event) => { setSearchTerm(event) }

    return (
        <div>
            <h1>Papers</h1>

            <div>
                <select value={selectValue} onChange={onChangeSelect}>
                    <option value="all">All</option>
                    <option value="true">Has Award</option>
                    <option value="">Hasn't Award</option>
                </select>
            </div>
            
            <Search searchTerm={searchTerm} handler={searchHandler} />
            
            {props.loading && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}

export default PapersPage;