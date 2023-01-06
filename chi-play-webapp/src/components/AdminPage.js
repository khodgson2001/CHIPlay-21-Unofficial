import React, {useState, useEffect} from 'react';
import { Buffer } from 'buffer';

function AdminPage(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [incorrectLogin, setIncorrectLogin] = useState(0);
  
    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.handleAuthenticated(true)
            }
        }
    ,[])

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
 
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleClick = () => {
 
        const encodedString = Buffer.from(
            username + ":" + password
          ).toString('base64');
 
        fetch("http://unn-w20002249.newnumyspace.co.uk/kf6012/api/auth",
        {
            method: 'POST',
            headers: new Headers( { "Authorization": "Basic " +encodedString })
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
              }else{
                setIncorrectLogin(incorrectLogin + 1);
              }
            })
          .catch(
            (e) => {
              console.log(e.message)
            }
          )
        }
        
    const handleSignOut = () => {
        props.handleAuthenticated(false);
        localStorage.removeItem('token')
    }

    return (
        <div>
            {props.authenticated &&
                <div>
                    <input type = "button" value = "Sign Out" onClick = {handleSignOut}/>
                    <h2> Update Award Status </h2>
                </div>
                }
            {!props.authenticated && 
            <div>
                <h2> Sign In</h2>
                <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={handleUsername}/>

                <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={handlePassword}/>

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