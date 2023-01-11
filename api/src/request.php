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
     * 
     * @throws ClientErrorException when the request method is not valid
     * 
     * @return void
     */
    public function validateRequestMethod($validMethods, $code = 405) {
        if (!in_array($this->method, $validMethods)) {
            throw new ClientErrorException("Invalid request method: ".$this->method, $code);
        }
    }
 
    private function setPath() {
        $this->path = parse_url($_SERVER['REQUEST_URI'])['path'];
        $this->path = str_replace("/kf6012/api","",$this->path);
    }
 
    public function getPath() {
        return $this->path;
    }
 
}