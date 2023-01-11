/**
 * Search component
 * 
 * Basic search component - used in multiple places.
 * 
 * @author Kieran Hodgson
 */

function Search(props) {
    const onChange = (event) => props.handler(event.target.value);
   
    return (<div>
      <label>Search: </label> <input value={props.searchTerm} onChange={onChange} />
      </div>
    )
  }
  export default Search;