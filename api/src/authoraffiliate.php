<?php

/**
 * AuthorAffiliate endpoint
 * 
 * @author Kieran Hodgson
*/
class AuthorAffiliate extends Endpoint
{
    /**
     * initialiseSQL method
     * 
     * @var String $sql - sql query that will select [author_id, country, state, city, institution, dept, paper_id] from affiliation table
     * @var Array $sqlParams - blank sql params array
     * @var String $where - blank where clause
     * 
     * Initialises the SQL query and parameters, the SQL query is set using the
     * setSQL method from the Endpoint class, the parameters are set using the
     * setParams method from the Endpoint class
     * 
     * If the author_id param is set, the query is modified to select the
     * affiliations of the author with the id specified in the author_id param
     * 
     * If the paper_id param is set, the query is modified to select the
     * affiliations of the authors that have written the paper with the id
     * specified in the paper_id param
     * 
     * 
     * @return void
     * 
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT *
            FROM affiliation";

        $sqlParams = [];

        if (filter_has_var(INPUT_GET, 'author_id')) {
            if (isset($where)) {
                $where .= " AND author_id = :author_id";
            } else {
                $where = " WHERE author_id = :author_id";
            }
            $sqlParams['author_id'] = $_GET['author_id'];
        }
        
        if (filter_has_var(INPUT_GET, 'paper_id')) {
            if (isset($where)) {
                $where .= " AND paper_id = :paper_id";
            } else {
                $where = " WHERE paper_id = :paper_id";
            }
            $sqlParams['paper_id'] = $_GET['paper_id'];
        }

        if (isset($where)) {
            $sql .= $where;
        }

        $this->setSQL($sql);
        $this->setParams($sqlParams);
    }

    /**
     * array of all available params for the endpoint
     */
    protected function endpointParams()
    {
        return ['author_id', 'paper_id'];
    }
}
