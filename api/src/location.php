<?php

/**
 * locations endpoint
 * 
 * Currently WIP
 * 
 * @author Kieran Hodgson
*/
class Location extends Endpoint
{

    public function __construct($req)
    {
        $this->validateParams($this->endpointParams()); // make sure params are valid
        $db = new Database('database/chiplay.sqlite'); //load in db using db class

        $this->initialiseSQL();

        $unparsedLocationData = $db->executeSQL($this->sql, $this->params);

        $locationData = [];

        foreach ($unparsedLocationData as $location) {
            $locationData["country"][$location['country']]["state"][$location['state']]["city"][$location['city']]["institution"][$location['institution']]["department"][$location['department']][] = $location['author_id'];
        }

        $this->setContent($locationData);
    }

    protected function initialiseSQL()
    {
        $sql = "SELECT country, state, city, institution, department, author_id FROM affiliation";

        $sqlParams = [];
        if (filter_has_var(INPUT_GET, 'country')) {
            if (isset($where)) {
                $where .= " AND country = :country";
            } else {
                $where = " WHERE country = :country";
            }
            $sqlParams['country'] = $_GET['country'];
        }
        
        if (filter_has_var(INPUT_GET, 'state')) {
            if (isset($where)) {
                $where .= " AND state = :state";
            } else {
                $where = " WHERE state = :state";
            }
            $sqlParams['state'] = $_GET['state'];
        }

        if (filter_has_var(INPUT_GET, 'city')) {
            if (isset($where)) {
                $where .= " AND city = :city";
            } else {
                $where = " WHERE city = :city";
            }
            $sqlParams['city'] = $_GET['city'];
        }

        if (filter_has_var(INPUT_GET, 'institution')) {
            if (isset($where)) {
                $where .= " AND institution = :institution";
            } else {
                $where = " WHERE institution = :institution";
            }
            $sqlParams['institution'] = $_GET['institution'];
        }

        if (filter_has_var(INPUT_GET, 'department')) {
            if (isset($where)) {
                $where .= " AND department = :department";
            } else {
                $where = " WHERE department = :department";
            }
            $sqlParams['department'] = $_GET['department'];
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
        return ['country', 'state', 'city', 'institution', 'department'];
    }
}
