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


    //Endpoint constructor - queries DB
    public function __construct()
    {
        $this->validateParams($this->endpointParams()); // make sure params are valid
        $db = new Database('database/chiplay.sqlite'); //load in db using db class

        $this->initialiseSQL();

        $content = $db->executeSQL($this->sql, $this->params);

        $this->setContent($content);
    }

    /**
     * Set the value of sql
     */
    protected function setSql($sql)
    {
        $this->sql = $sql;
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

    /**
     * set sql and params for endpoint
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
     */
    protected function validateParams($params)
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $params)) {
                http_response_code(400);
                $output['message'] = "Invalid parameter: " . $key;
                die(json_encode($output));
            }
        }
    }
}
