/**
 * Home page component
 * 
 * This is the main landing page for the application
 * 
 * @author Kieran Hodgson
 */

import image from '../img/conference.jpg';

 function HomePage() {
    return (
        <div>
            <h1>CHIPlay (Computer Human Interaction Play) Conference</h1>
            <p>
                This web application is an unofficial app for the Computer Human Interaction Play Conference (CHIPlay).
                On this application you can find information in relation to papers published in the conference and authors involved.
                Should you have sufficient credentials, you can also update the award status of a paper from the conference.
            </p>
            <p>
                All information is pulled from an unofficial API, which can be found <a href="http://unn-w20002249.newnumyspace.co.uk/kf6012/api">here</a>.
            </p>
            <p>
                For information on how to make use of the API, please click <a href='http://unn-w20002249.newnumyspace.co.uk/kf6012/docs'>here</a>.
            </p>
            <img src={image} alt = "Large group of people attending a Game Developer Conference"/>
            <label for = "image">Image: https://www.flickr.com/photos/officialgdc/4439254620</label>
        </div>
    );
}
 
export default HomePage;