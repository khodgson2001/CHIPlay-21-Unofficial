import FetchAuthors from "./FetchAuthors";

/**
 * Films page component
 * 
 * This page will show information about films
 * 
 * @author first last
 */
 function AuthorsPage() {
    return (
        <div>
            <h1>Authors</h1>
            <p>Welcome to the Authors page!</p>
            <FetchAuthors />
        </div>
    );
}
 
export default AuthorsPage;