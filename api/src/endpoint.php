<?php

/**
 * Default Endpoint Class
 * 
 * Contains everything needed in an endpoint with all common methods and parameters
 * 
 * @author Kieran Hodgson
 * 
 */

//abstract class allowing for the endpoint class not being instantiated by itself
abstract class Endpoint
{
    private $content;
    protected $sql;
    protected $params;


    /**
     * Endpoint constructor
     * 
     * @param Request $req - The request object
     * 
     * Ensures that the parameters used in the request are valid,
     * creates a database object, initialises the SQL and parameters
     * for the endpoint, executes the SQL and sets the content
     * 
     * @var Database $db - The database object
     * @var array $content - content from the query being made
     * 
     * @return void
     */
    public function __construct($req)
    {
        $this->validateParams($this->endpointParams()); // make sure params are valid
        $db = new Database('database/chiplay.sqlite'); //load in db using db class

        $this->initialiseSQL();

        $content = $db->executeSQL($this->sql, $this->params);

        $this->setContent($content);
    }

    // ---- GETTERS & SETTERS -----

    /**
     * Sets the value of sql
     */
    protected function setSql($sql)
    {
        $this->sql = $sql;
    }

    public function getSql(){
        return $this->sql;
    }

    /**
     * Set the value of content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set the value of params
     */
    protected function setParams($params)
    {
        $this->params = $params;
    }

    protected function getParams(){
        return $this->params;
    }
    // ---- END GETTERS & SETTERS -----

    /**
     * Add collate nocase to sql
     * 
     * @param String $sql - sql query
     * 
     * @return String $sql
     */
    protected function sqlRmvCase($sql){
        return $sql .= " COLLATE NOCASE";
    }

    /**
     * set sql and params for endpoint
     * 
     * @var string $sql - sql query
     * 
     * @return void
     */
    protected function initialiseSQL()
    {
        $sql = "";
        $this->setSql($sql);
        $this->setParams([]);
    }

    protected function endpointParams()
    {
        return [];
    }

    /**
     * Check the parameters used in request against an array of
     * valid parameters for the endpoint
     * 
     * @param array $params An array of valid param names (e.g. ['id'])
     * 
     * @return void
     * 
     * @throws ClientErrorException if any params are invalid
     */
    protected function validateParams($params)
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $params)) {
                throw new ClientErrorException("Invalid parameter: " . $key, 400);
            }
        }
    }
}
