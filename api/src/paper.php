<?php 
 
/**
 * Papers endpoint
 * 
 * @author Kieran Hodgson
 */
class Paper extends Endpoint
{
    /**
     * Initialise SQL method
     * 
     * Initialises the SQL query and parameters, the SQL query is set using the
     * setSQL method from the Endpoint class, the parameters are set using the
     * setParams method from the Endpoint class
     * 
     * If the id param is set, the query is modified to select the paper with the
     * id specified in the id param
     * 
     * If the track param is set, the query is modified to select the papers
     * that have are on the same track as the specified track param
     * 
     * If the search param is set, the query is modified to select the papers
     * that have the search param in the title or abstract
     * 
     * @var string $sql
     * @var array $sqlParams
     * @var string $where
     * @var string $search
     * 
     * @throws ClientErrorException when the id param is not an integer
     * 
     * @return void
     * 
     */
    protected function initialiseSQL() {
        $sql = "SELECT paper_id, title, award, abstract, track.short_name as short_name, track.name as trackName
                FROM paper
                JOIN track ON (track.track_id = paper.track_id)";
        $sqlParams = [];
 
        if (filter_has_var(INPUT_GET, 'id')) {
            if (!filter_var($_GET['id'],FILTER_VALIDATE_INT)) {
                throw new ClientErrorException("Value of id must be an integer", 400);
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
                $where .= " AND short_name = :short_name";
            } else {
                $where = " WHERE short_name = :short_name";
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
        
        
        $sql = $this->sqlRmvCase($sql);
        $this->setSQL($sql);
        $this->setParams($sqlParams);
    }
    /**
     * Whitelisted endpoint params
     * add as items of array
     */
    protected function endpointParams() {
        return ['id','track','search'];
     }
}