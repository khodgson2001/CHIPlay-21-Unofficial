<?php

/**
 * Actor endpoint
 * 
 * @author Kieran Hodgson
*/
class AuthorAffiliate extends Endpoint
{
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
