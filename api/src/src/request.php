<?php
 
class Request 
{
    private $method;
    private $path;
 
    public function __construct() {
        $this->setMethod();
        $this->setPath();
    }
 
    private function setMethod() {
        $this->method = $_SERVER['REQUEST_METHOD'];
    }
 
    public function validateRequestMethod($validMethods) {
        if (!in_array($this->method, $validMethods)) {
            // Updated to use the ClientError endpoint
            $output['message'] = "Invalid request method: ".$this->method;
            die(json_encode($output));
        }
    }
 
    private function setPath() {
        $this->path = parse_url($_SERVER['REQUEST_URI'])['path'];
        $this->path = str_replace("/kf6012/api","",$this->path);
    }
 
    public function getPath() {
        return $this->path;
    }
 
/*

    Taken from index.php
    if (!in_array($_SERVER['REQUEST_METHOD'], array("GET"))){

    } else {
        
        // Work out the request from the path
        $path = parse_url($_SERVER['REQUEST_URI'])['path'];
        $path = str_replace("","",$path);*/
     
}