<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        createHelpRequest($db);
        break;
    case 'GET':
        if(isset($_GET['id'])) {
            getHelpRequest($db, $_GET['id']);
        } else {
            getAllHelpRequests($db);
        }
        break;
    case 'PUT':
        updateHelpRequest($db);
        break;
    case 'DELETE':
        deleteHelpRequest($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function createHelpRequest($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->name) && !empty($data->city) && !empty($data->phone) && !empty($data->problemDescription)) {
        
        // Determine priority based on keywords
        $priority = determinePriority($data->problemDescription);
        
        $query = "INSERT INTO help_requests SET name=:name, city=:city, phone=:phone, problem_description=:problem_description, priority=:priority";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":city", $data->city);
        $stmt->bindParam(":phone", $data->phone);
        $stmt->bindParam(":problem_description", $data->problemDescription);
        $stmt->bindParam(":priority", $priority);
        
        if($stmt->execute()) {
            $help_request_id = $db->lastInsertId();
            
            // Send notification email (you can integrate with your email service)
            sendNotificationEmail($data, $priority, $help_request_id);
            
            http_response_code(201);
            echo json_encode(array(
                "message" => "Help request created successfully.",
                "id" => $help_request_id,
                "priority" => $priority
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create help request."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create help request. Data is incomplete."));
    }
}

function getAllHelpRequests($db) {
    $query = "SELECT * FROM help_requests ORDER BY 
              CASE priority 
                WHEN 'EMERGENCY' THEN 1 
                WHEN 'HIGH' THEN 2 
                WHEN 'MEDIUM' THEN 3 
              END, 
              created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $help_requests = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $help_requests[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($help_requests);
}

function getHelpRequest($db, $id) {
    $query = "SELECT * FROM help_requests WHERE id = ? LIMIT 0,1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $id);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($row) {
        http_response_code(200);
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Help request not found."));
    }
}

function updateHelpRequest($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE help_requests SET 
              status=:status, 
              assigned_to=:assigned_to, 
              notes=:notes 
              WHERE id=:id";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":status", $data->status);
    $stmt->bindParam(":assigned_to", $data->assigned_to);
    $stmt->bindParam(":notes", $data->notes);
    $stmt->bindParam(":id", $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Help request updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update help request."));
    }
}

function deleteHelpRequest($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "DELETE FROM help_requests WHERE id = ?";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Help request deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete help request."));
    }
}

function determinePriority($description) {
    $emergencyKeywords = ["abuse", "violence", "threat", "danger", "emergency", "urgent"];
    $highPriorityKeywords = ["harassment", "divorce", "legal", "court", "police"];
    
    $lowerDesc = strtolower($description);
    
    foreach($emergencyKeywords as $keyword) {
        if(strpos($lowerDesc, $keyword) !== false) {
            return "EMERGENCY";
        }
    }
    
    foreach($highPriorityKeywords as $keyword) {
        if(strpos($lowerDesc, $keyword) !== false) {
            return "HIGH";
        }
    }
    
    return "MEDIUM";
}

function sendNotificationEmail($data, $priority, $id) {
    // Email notification logic
    $to = "support@womensupportngo.org";
    $subject = "New Help Request - Priority: " . $priority;
    $message = "
    New help request received:
    
    ID: " . $id . "
    Name: " . $data->name . "
    City: " . $data->city . "
    Phone: " . $data->phone . "
    Priority: " . $priority . "
    
    Description:
    " . $data->problemDescription . "
    
    Please respond immediately if this is an emergency case.
    ";
    
    $headers = "From: noreply@womensupportngo.org";
    
    // Uncomment to send actual emails
    // mail($to, $subject, $message, $headers);
}
?>
