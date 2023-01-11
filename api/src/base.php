<?php
 /**
  * Base endpoint
  * 
  * @author Kieran Hodgson
  */
 class Base extends Endpoint
 {
    /**
     * initialiseSQL method
     * 
     * @var String $sql - sql query that will select [name] from conference_information table
     * 
     * Initialises the SQL query and parameters, the SQL query is set using the
     * setSQL method from the Endpoint class, the parameters are set using the
     * setParams method from the Endpoint class
     * 
     * @return void
     */
    protected function initialiseSQL(){
        $sql = "SELECT conference_information.name FROM conference_information;";
        $this->setSql($sql); // use setSQL method from Endpoint class
        $this->setParams([]); // use setParams method from Endpoint class, no params to pass in so empty array
    }

    /**
     * Override Endpoint constructor
     * as format is slightly different
     * @param Request $req - the http request object
     * 
     * @var Database $db - database object
     * @var Array $content - array containing conference name
     * 
     * @return void
     */    
    public function __construct($req){ //overwrite constructor as adding own info
        $this->validateParams($this->endpointParams()); // make sure params are valid
        $db = new Database('database/chiplay.sqlite'); //load in db using db class

        $this->initialiseSQL();

        $content = $db->executeSQL($this->sql, $this->params);

        $this->setContent(array(
            "name" => "Kieran Hodgson",
            "id" => "w20002249",
            "conference" => $content[0]['name'],
            "docs" => "http://unn-w20002249.newnumyspace.co.uk/kf6012/docs"
        ));

    }
 
 }