<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    exit(0);
} 
include 'config/exceptionHandler.php';
set_exception_handler('exceptionHandler');

// include and register the autoloader
include 'config/autoloader.php';
spl_autoload_register('autoloader');
define('SECRET', '5Z0r?YMp@LBF`fGIB8oaqAsim,5V)R');


$req = new Request();

try {
    // Route the request as appropriate
    switch ($req->getPath()) {
        case '/':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new Base($req);
            break;
        case '/paper/':
        case '/paper':
        case '/papers/':
        case '/papers':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new Paper($req);
            break;
        case '/author/':
        case '/author':
        case '/authors/':
        case '/authors':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new Author($req);
            break;
        case '/location/':
        case '/location':
        case '/locations/':
        case '/locations':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new Location($req);
            break;
        case '/affiliation/':
        case '/affiliation':
        case '/affiliations/':
        case '/affiliations':
            $req->validateRequestMethod(array("GET"));
            $endpoint = new AuthorAffiliate($req);
            break;
        case '/auth/':
        case '/auth':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new Authenticate($req);
            break;
        case '/update/':
        case '/update':
            $req->validateRequestMethod(array("POST"));
            $endpoint = new Update($req);
            break;
        default:
            $endpoint = new ClientErrorException("Path not found: " . $req->getPath(), 404);
    }
} catch (ClientErrorException $e) {
    $endpoint = new ClientError($e->getMessage(), $e->getCode());
}


$response = $endpoint->getContent();
echo json_encode($response);
