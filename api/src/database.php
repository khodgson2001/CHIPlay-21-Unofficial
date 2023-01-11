<?php

/**
 * Database class
 * 
 * @author Kieran Hodgson
 * 
 * @var $dbConnection - database connection
 */
class Database
{
    private $dbConnection;

    public function __construct($dbName)
    {
        $this->setDbConnection($dbName);
    }

    public function setDbConnection($dbName)
    {
        try {
            $this->dbConnection = new PDO('sqlite:' . $dbName);
            $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Database Connection Error: " . $e->getMessage();
            exit();
        }
    }

    public function getDbConnection()
    {
        return $this->dbConnection;
    }
    
    public function executeSQL($sql, $params = [])
    {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
