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
 

    /**
     * Set the path of the request
     * 
     * @param Array $validMethods - An array of valid HTTP methods
     * @param int $code - The HTTP status code to return
     */
    public function validateRequestMethod($validMethods, $code = 405) {
        if (!in_array($this->method, $validMethods)) {
            // Updated to use the ClientError endpoint
            http_response_code($code);
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