<?php

use FirebaseJWT\JWT;

/**
 * Class to authenticate a user using post request, extended from the Endpoint class
 * Makes use of FirebaseJWT
 * 
 * @author Kieran Hodgson
 */
class Authenticate extends Endpoint
{
    /**
     * Constructor class
     * 
     * @var Database $db  - database connection
     * @var Array $queryResult - returned from querying $db
     * @var Array $data - contains the JWT for the account
     * 
     * Class validates params passed in via authorisation header through validateAuthParameters method,
     * creates a new connection to the specified database,
     * queries the db using getSQL method from Endpoint class
     * and applies parameters from getParams from Endpoint class
     * username and password is then validated where they are both present
     * in the database, if not a ClientErrorException is thrown with correct status code.
     * A JWT is then created and returned to the user.
     * 
     * @return void
     * @throws ClientErrorException - if username or password is not present
     */
    public function __construct()
    {
        $this->validateAuthParameters();
        $db = new Database('database/chiplay.sqlite'); //load in db using db class

        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQL(), $this->getParams());

        $this->validateUsername($queryResult);
        $this->validatePassword($queryResult);

        $data['token'] = $this->createJWT($queryResult);
        $this->setContent(array(
            "message" => "success",
            "data" => $data
        ));
    }

    /**
     * Creates a JWT for the user
     * 
     * @param Array $queryResult - returned from querying $db
     * 
     * @var String $secretKey - secret key used to encode JWT, defined in index.php
     * @var Int $time - current time
     * @var Array $tokenPayload - contains the payload for the JWT
     * @var String $jwt - JWT for the user, encoded using HS256
     * 
     * Creates a JWT for the user, using the username and account_id from the database
     * as the subject of the JWT. The JWT is encoded using HS256 and the secret key
     * defined in index.php
     * 
     * @return String $jwt - JWT for the user
     * 
     */
    private function createJWT($queryResult)
    {
        $secretKey = SECRET;
        $time = time();
        $tokenPayload = [
            'iat' => $time,
            'exp' => strtotime('+1 day', $time),
            'iss' => $_SERVER['HTTP_HOST'],
            'sub' => $queryResult[0]['username'],
        ];
        $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
        return $jwt;
    }

    /**
     * Validates the parameters passed in via the authorisation header
     * 
     * Validates the parameters passed in via the authorisation header
     * if username or password is not present, a ClientErrorException is thrown
     * with a 401 status code
     * 
     * @return void
     * 
     * @throws ClientErrorException - if username or password is not present
     * 
     */
    private function validateAuthParameters()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }

    /**
     * initialiseSQL Function
     * 
     * @var String $sql - SQL query to be executed
     * 
     * Initialises the SQL query and parameters, the SQL query is set using the
     * setSQL method from the Endpoint class, the parameters are set using the
     * setParams method from the Endpoint class
     * 
     * @return void
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT account_id, username, password FROM account WHERE username = :username";
        $this->setSQL($sql);
        $this->setParams(array(
            'username' => $_SERVER['PHP_AUTH_USER']
        ));
    }

    /**
     * Validates the username
     * 
     * @param Array $data - returned from querying $db
     * 
     * 
     * Validates the username, if username is not present, a ClientErrorException is thrown
     * with a 401 status code
     * 
     * @return void
     * 
     * @throws ClientErrorException - if username is not present
     */
    private function validateUsername($data)
    {
        if (count($data) < 1) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }

    /**
     * Validates the password
     * 
     * @param Array $data - returned from querying $db
     * 
     * Validates the password, if password is not present, a ClientErrorException is thrown
     * with a 401 status code
     *      
     * @return void
     * 
     * @throws ClientErrorException - if password is not present
     */
    private function validatePassword($data)
    {
        if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }
}
