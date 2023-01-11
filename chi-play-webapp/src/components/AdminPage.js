import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import UpdateAward from './UpdateAward';
import Search from './Search';

/**
 * AdminPage component
 * This component contains several short functions for handling several parts,
 * including username, password, paper searching, onClick for logging in,
 * signing out, and using the refresh button.
 * 
 * Page used to either login (if bearer token is not set in local storage),
 * or to display the UpdateAward component
 *  
 * @author Kieran Hodgson
 * 
 */
function AdminPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectLogin, setIncorrectLogin] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(
    () => {
      if (localStorage.getItem('token')) {
        props.handleAuthenticated(true)
      }
    }
    , [])

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const searchPapers = (value) => {
    const fullname = value.title;
    return fullname.toLowerCase().includes(searchTerm.toLowerCase());
  }

  /**
   * Handle the click event on the submit button for logging in
   * Send a POST request to the server
   * The server will return a JSON object
   * If the JSON object contains a message property with the value "success"
   * then the user has been authenticated
   * If the JSON object contains a message property with the value "failure"
   * then the user has not been authenticated
   * 
   * If the user has been authenticated, then the token property of the JSON object
   * will be stored in local storage, the authenticated state variable will be set to true,
   * and the username and password state variables will be set to empty strings for when
   * the user signs out of the form.
   * 
   * If the user has not been authenticated, then the incorrectLogin state variable
   * will be incremented
   */
  const handleClick = () => {
    const encodedString = Buffer.from(
      username + ":" + password
    ).toString('base64');

    fetch("http://unn-w20002249.newnumyspace.co.uk/kf6012/api/auth",
      {
        method: 'POST',
        headers: new Headers({ "Authorization": "Basic " + encodedString })
      })
      .then(
        (response) => {
          return response.json()
        })
      .then(
        (json) => {
          if (json.message === "success") {
            props.handleAuthenticated(true);
            localStorage.setItem('token', json.data.token);
            setUsername("")
            setPassword("");
          } else {
            setIncorrectLogin(incorrectLogin + 1);
          }
        })
      .catch(
        (e) => {
          console.log(e.message)
        }
      )
  }

  /**
   * Handle the click event on the sign out button
   * Set the authenticated state variable to false
   * Remove the token from local storage
   */
  const handleSignOut = () => {
    props.handleAuthenticated(false);
    localStorage.removeItem('token')
  }

  /**
   * Map the papers array to a list of UpdateAward components
   * Each UpdateAward component will be passed a paper object
   * The paper object will be used to populate the form
   */
  const papers = props.papers.filter(searchPapers).map(
    (value, key) => <section key={key}>
      <UpdateAward paper={value} /> {/* pass the paper object to the UpdateAward component */}
    </section>
  )

  const searchHandler = (event) => { setSearchTerm(event) }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      {props.authenticated &&
        <div>
          <input type="button" value="Sign Out" onClick={handleSignOut} />
          <input type="button" value="Refresh" onClick={refreshPage} />
          <h2> Update Award Status </h2>
          <p>Make sure to refresh the page in order to see your changes.</p>
          <Search searchTerm={searchTerm} handler={searchHandler} />

          {papers}
        </div>
      }
      {!props.authenticated &&
        <div>
          <h2> Sign In</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsername} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword} />

          <input type="button"
            value="Submit"
            onClick={handleClick}
          />

          {(incorrectLogin) ? <p>Incorrect username or password x {incorrectLogin}</p> : <></>}
        </div>
      }
    </div>
  )

}

export default AdminPage;