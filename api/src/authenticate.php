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
     * Constructor class, takes no parameters
     * @var Database $db  - database connection
     * @var Array $queryResult - returned from querying $db
     * @var Array $data - contains the JWT for the account
     * 
     * Class validates params passed in via authorisation header,
     * creates new connection to db
     * queries the db using getSQL method from Endpoint class
     * and applies parameters from getParams from Endpoint class
     * username and password is then validated where they are both present
     * in the database, if not a ClientErrorException is thrown with correct status code.
     * A JWT is then created and returned to the user.
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
     * @var Array $queryResult - returned from querying $db
     * @var String $secretKey - secret key used to encode JWT, defined in index.php
     * @var Int $time - current time
     * @var Array $tokenPayload - contains the payload for the JWT
     * @var String $jwt - JWT for the user, encoded using HS256
     * 
     * @return String $jwt - JWT for the user
     * 
     * Creates a JWT for the user, using the username and account_id from the database
     * as the subject of the JWT. The JWT is encoded using HS256 and the secret key
     * defined in index.php
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
     * @throws ClientErrorException - if username or password is not present
     * 
     * Validates the parameters passed in via the authorisation header
     * if username or password is not present, a ClientErrorException is thrown
     * with a 401 status code
     */
    private function validateAuthParameters()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }

    /**
     * Initialises the SQL query and parameters
     * 
     * @var String $sql - SQL query to be executed
     * 
     * Initialises the SQL query and parameters, the SQL query is set using the
     * setSQL method from the Endpoint class, the parameters are set using the
     * setParams method from the Endpoint class
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
     * @var Array $data - returned from querying $db
     * 
     * @throws ClientErrorException - if username is not present
     * 
     * Validates the username, if username is not present, a ClientErrorException is thrown
     * with a 401 status code
     */
    private function validateUsername($data)
    {
        if (count($data) < 1) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }

    /**
     * Validates the password
     * @var Array $data - returned from querying $db
     * 
     * @throws ClientErrorException - if password is not present
     * 
     * Validates the password, if password is not present, a ClientErrorException is thrown
     * with a 401 status code
     */
    private function validatePassword($data)
    {
        if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
            throw new ClientErrorException('Invalid Credentials', 401);
        }
    }
}
