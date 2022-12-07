<?php

/**
 * Actor endpoint
 * 
 * @author Kieran Hodgson
 *  */
class author extends Endpoint
{
    /**
     * Updated to handle params, but with no error checking
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT author.author_id, author.first_name, author.middle_initial, author.last_name, affiliation.country, affiliation.city, affiliation.institution, affiliation.department
        FROM author
        JOIN affiliation ON (affiliation.person_id = author.author_id)
                ";
        //
        $sqlParams = [];

        if (filter_has_var(INPUT_GET, 'id')) {
            // isset will return false if there are no WHERE
            // clauses set yet
            if (isset($where)) {
                $where .= " AND author.author_id = :author_id";
            } else {
                $where = " WHERE author.author_id = :author_id";
            }
            $sqlParams['author_id'] = $_GET['id'];
        }

        if (filter_has_var(INPUT_GET, 'paper_id')) {
            // isset will return false if there are no WHERE
            // clauses set yet
            $sql .= " JOIN paper_has_author ON (paper_has_author.authorId = author.author_id)";

            if (isset($where)) {
                $where .= " AND paper_has_author.paper_id = :paper_id";
            } else {
                $where = " WHERE paper_has_author.paper_id = :paper_id";
            }
            $sqlParams['paper_id'] = $_GET['paper_id'];
        }

        // isset will return false if there are no WHERE
        // clauses set for the query
        if (isset($where)) {
            $sql .= $where;
        }

        $this->setSQL($sql);
        $this->setParams($sqlParams);
    }
    protected function endpointParams()
    {
        return ['id', 'paper_id'];
    }
}
