<?php

/**
 * Author endpoint
 * 
 * @author Kieran Hodgson
*/
class Author extends Endpoint
{
    /**
     * initialiseSQL method
     * 
     * @var String $sql - sql query that will select [author_id, first_name, middle_initial, last_name] from author table
     * @var Array $sqlParams - blank sql params array
     * @var String $where - blank where clause
     * 
     * Initialises the SQL query and parameters, the SQL query is set using the
     * setSQL method from the Endpoint class, the parameters are set using the
     * setParams method from the Endpoint class
     * 
     * If the id param is set, the query is modified to select the author with the
     * id specified in the id param
     * 
     * If the paper_id param is set, the query is modified to select the authors
     * that have written the paper with the id specified in the paper_id param
     * 
     * If the id param and the paper_id param are both set, the query is modified
     * to select the author with the id specified in the id param that has written
     * the paper with the id specified in the paper_id param
     * 
     * @return void
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT * FROM author";

        $sqlParams = [];

        if (filter_has_var(INPUT_GET, 'id')) {
            if (isset($where)) {
                $where .= " AND author.author_id = :author_id";
            } else {
                $where = " WHERE author.author_id = :author_id";
            }
            $sqlParams['author_id'] = $_GET['id'];
        }
        
        if (filter_has_var(INPUT_GET, 'paper_id')) {
            $sql .= " JOIN paper_has_author ON (paper_has_author.author_id = author.author_id)";
            if (isset($where)) {
                $where .= " AND paper_has_author.paper_id = :paper_id";
            } else {
                $where = " WHERE paper_has_author.paper_id = :paper_id";
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
     * 
     * @return Array - array of all available params for the endpoint
     */
    protected function endpointParams()
    {
        return ['id', 'paper_id'];
    }
}
