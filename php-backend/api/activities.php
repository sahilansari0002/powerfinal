<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        createActivity($db);
        break;
    case 'GET':
        if(isset($_GET['id'])) {
            getActivity($db, $_GET['id']);
        } elseif(isset($_GET['category'])) {
            getActivitiesByCategory($db, $_GET['category']);
        } else {
            getAllActivities($db);
        }
        break;
    case 'PUT':
        updateActivity($db);
        break;
    case 'DELETE':
        deleteActivity($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function createActivity($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->title) && !empty($data->description) && !empty($data->category)) {
        
        $query = "INSERT INTO activities SET 
                  title=:title, 
                  description=:description, 
                  category=:category, 
                  location=:location, 
                  date=:date, 
                  participants_count=:participants_count, 
                  target_participants=:target_participants, 
                  status=:status, 
                  organizer=:organizer, 
                  budget=:budget, 
                  impact_description=:impact_description";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":title", $data->title);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":category", $data->category);
        $stmt->bindParam(":location", $data->location);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":participants_count", $data->participants_count ?? 0);
        $stmt->bindParam(":target_participants", $data->target_participants ?? null);
        $stmt->bindParam(":status", $data->status ?? 'PLANNED');
        $stmt->bindParam(":organizer", $data->organizer ?? null);
        $stmt->bindParam(":budget", $data->budget ?? null);
        $stmt->bindParam(":impact_description", $data->impact_description ?? null);
        
        if($stmt->execute()) {
            $activity_id = $db->lastInsertId();
            
            http_response_code(201);
            echo json_encode(array(
                "message" => "Activity created successfully.",
                "id" => $activity_id
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create activity."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create activity. Data is incomplete."));
    }
}

function getAllActivities($db) {
    $query = "SELECT * FROM activities ORDER BY date DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $activities = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($activities);
}

function getActivitiesByCategory($db, $category) {
    $query = "SELECT * FROM activities WHERE category = ? ORDER BY date DESC";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, strtoupper($category));
    $stmt->execute();
    
    $activities = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($activities);
}

function getActivity($db, $id) {
    $query = "SELECT * FROM activities WHERE id = ? LIMIT 0,1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $id);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($row) {
        http_response_code(200);
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Activity not found."));
    }
}

function updateActivity($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE activities SET 
              participants_count=:participants_count, 
              status=:status, 
              actual_cost=:actual_cost, 
              impact_description=:impact_description 
              WHERE id=:id";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":participants_count", $data->participants_count);
    $stmt->bindParam(":status", $data->status);
    $stmt->bindParam(":actual_cost", $data->actual_cost);
    $stmt->bindParam(":impact_description", $data->impact_description);
    $stmt->bindParam(":id", $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Activity updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update activity."));
    }
}

function deleteActivity($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "DELETE FROM activities WHERE id = ?";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Activity deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete activity."));
    }
}
?>
