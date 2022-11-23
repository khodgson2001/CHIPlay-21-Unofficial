<?php 
 
/**
 * Film endpoint
 * 
 * @author Kieran Hodgson
 */
class Paper extends Endpoint
{
    /**
     * Updated to handle params, but with no error checking
     */
    protected function initialiseSQL() {
        $sql = "SELECT paper_id, title, award, abstract, track.short_name as short_name, track.name as trackName
                FROM paper
                JOIN track ON (track.track_id = paper.track_id)";
        $this->setSQL($sql);
        $sqlParams = [];
 
        if (filter_has_var(INPUT_GET, 'id')) {
            if (!filter_var($_GET['id'],FILTER_VALIDATE_INT)) {
                http_response_code(400);
                $output['message'] = "Value of id must be an integer";
                die(json_encode($output));
            }
            if (isset($where)) {
                $where .= " AND paper_id = :paper_id";
            } else {
                $where = " WHERE paper_id = :paper_id";
            }
            $sqlParams['paper_id'] = $_GET['id'];
        }
        
        
        if (filter_has_var(INPUT_GET, 'track')) {
            if (isset($where)) {
                $where .= " AND short_name LIKE :short_name";
            } else {
                $where = " WHERE short_name LIKE :short_name";
            }
            $sqlParams['short_name'] = $_GET['track'];
        }
        if (filter_has_var(INPUT_GET, 'search')) {
            $search = htmlspecialchars($_GET['search']);
            if (isset($where)) {
                $where .= " AND (title LIKE :search OR abstract LIKE :search)";
            } else {
                $where = " WHERE (title LIKE :search OR abstract LIKE :search)";
            }
            $sqlParams['search'] = '%'.$search.'%';
        }
 
        // isset will return false if there are no WHERE
        // clauses set for the query
        if (isset($where)) {
            $sql .= $where;
        }
 
        $this->setSQL($sql);
        $this->setParams($sqlParams);
    }
    /**
     * Whitelisted endpoint params
     * add as items of array
     */
    protected function endpointParams() {
        return ['id','track','search', 'award'];
     }
}