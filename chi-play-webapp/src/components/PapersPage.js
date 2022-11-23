import { Link } from "react-router-dom";
import React from 'react';
import FetchPapers from "./FetchPapers";

function PapersPage() {
    return (
        <div>
            <h1>Papers</h1>
            <p>Welcome to the Papers page!</p>
            <p>See the <Link to="/authors">Authors</Link> page</p>
            <FetchPapers />
        </div>
    );
}
 
 
export default PapersPage;