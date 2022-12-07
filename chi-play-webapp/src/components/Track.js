import React, {useState, useEffect} from 'react';
import Search from './Search';
import PaperAuthors from './PaperAuthors';

function Track(props){

    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectValue, setSelectValue] = useState('all');

   
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

    const paperType = (value) => (value.short_name === props.short_name);

const showPaperTypes = 
    <div>
        { papers.filter(paperType).filter(searchPapers).filter(selectPapers).map(
        (value, key) => <section key={key}>
        <PaperAuthors data={value}/>
    </section>
    )}</div>
    
    const onChangeSelect = (event) => setSelectValue(event.target.value);
    const searchHandler = (event) => { setSearchTerm(event) }

    
    return (
        <div>
            <h1>Papers ({props.short_name})</h1>
            <div>
            <select value={selectValue} onChange={onChangeSelect}>
                <option value="all">All</option>
                <option value="true">Has Award</option>
                <option value="">Hasn't Award</option>
                </select>
            </div>
            <Search searchTerm={searchTerm} handler={searchHandler} />            

            {loading && <p>Loading...</p>}
            {showPaperTypes}
        </div>
    )
    

}

export default Track;
