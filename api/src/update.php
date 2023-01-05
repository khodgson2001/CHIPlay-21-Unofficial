<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/**
 * Class to authenticate a user using post request, extended from the Endpoint class
 * Makes use of FirebaseJWT
 * 
 * @author Kieran Hodgson
 */
class Update extends Endpoint{

    
    public function __construct($request)
    {
        $request->validateRequestMethod(['POST']);

        $this->validateToken();
        $this->validateUpdateParams();
        $db = new Database("database/chiplay.sqlite");

        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQL(), $this->getParams());

        $this->setContent( array(
            "length" => 0,
            "message" => "Sucess",
            "data" => null
        ));
    }

    protected function initialiseSQL(){
        $awards=['true'=>"true",'false'=> NULL];
        $award_id = $awards[strtolower($_POST['award'])];
        $sql = "UPDATE paper SET award = :award WHERE paper_id = :paper_id";
        $this->setSQL($sql);
        $this->setParams(array(
            'award' => $award_id,
            'paper_id' => $_POST['paper_id']
        ));
    }

    private function validateToken(){

        $key = SECRET;

        $allHeaders = getallheaders();
        $authorizationHeader = "";

        if(array_key_exists('Authorization', $allHeaders)){
            $authorizationHeader = $allHeaders['Authorization'];
        } elseif(array_key_exists('authorization', $allHeaders)){
            $authorizationHeader = $allHeaders['authorization'];
        }

        if(substr($authorizationHeader, 0,7) !== "Bearer "){
            throw new ClientErrorException("Bearer token required", 401);
        }

        $jwt = trim(substr($authorizationHeader, 7));

        try{
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        } catch(Exception $e){
            throw new ClientErrorException($e->getMessage(), 401);
        }

        if($decoded->iss !== $_SERVER['HTTP_HOST']){
            throw new ClientErrorException("Invalid issuer token", 401);
        }
    }

    private function validateUpdateParams(){
        if(!filter_has_var(INPUT_POST,'award')){
            throw new ClientErrorException("Award parameter required", 400);
        }
        if(!filter_has_var(INPUT_POST,'paper_id')){
            throw new ClientErrorException("paper_id parameter required", 400);
        }
        $award = ["true", "false"];
        if(!in_array(strtolower($_POST['award']), $award)){
            throw new ClientErrorException("Invalid award parameter", 400);
        }
    }





}