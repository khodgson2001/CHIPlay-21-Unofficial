<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// include and register the autoloader
include 'config/autoloader.php';
spl_autoload_register('autoloader');

$req = new Request();


// Route the request as appropriate
switch ($req->getPath()) {
    case '/':
        $endpoint = new Base($req);
        break;
    case '/paper/':
    case '/paper':
    case '/papers/':
    case '/papers':
        $endpoint = new Paper();
        break;
    case '/author/':
    case '/author':
    case '/authors/':
    case '/authors':
        $endpoint = new Author();
        break;
    default:
        $endpoint = new ClientError("Path not found: " . $req->getPath(), 404);
}



$response = $endpoint->getContent();
echo json_encode($response);
