function Search(props) {
    const onChange = (event) => props.handler(event.target.value);
   
    return (
      <input value={props.searchTerm} onChange={onChange} />
    )
  }
  export default Search;