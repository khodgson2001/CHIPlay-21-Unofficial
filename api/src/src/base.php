<?php
 /**
  * Base endpoint
  * 
  * @author Kieran Hodgson
  */
 class Base extends Endpoint
 {
    /**
     * Override Endpoint intialiaise SQL Method
     * 
     */
    protected function initialiseSQL(){
        $sql = "SELECT conference_information.name FROM conference_information;";
        $this->setSql($sql); // use setSQL method from Endpoint class
        $this->setParams([]); // use setParams method from Endpoint class, no params to pass in so empty array
    }

    
    public function __construct($req){ //overwrite constructor as adding own info
        $this->validateParams($this->endpointParams()); // make sure params are valid
        $req->validateRequestMethod(array("GET"));

        $db = new Database('database/chiplay.sqlite'); //load in db using db class

        $this->initialiseSQL();

        $content = $db->executeSQL($this->sql, $this->params);

        $this->setContent(array(
            "name" => "Kieran Hodgson",
            "id" => "w20002249",
            "conference" => $content[0]['name'] //associative array, just want the name
        ));

    }
 
 }