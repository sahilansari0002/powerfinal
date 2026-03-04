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
        createContactMessage($db);
        break;
    case 'GET':
        if(isset($_GET['id'])) {
            getContactMessage($db, $_GET['id']);
        } else {
            getAllContactMessages($db);
        }
        break;
    case 'PUT':
        updateContactMessage($db);
        break;
    case 'DELETE':
        deleteContactMessage($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function createContactMessage($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->name) && !empty($data->message)) {
        
        $query = "INSERT INTO contact_messages SET 
                  name=:name, 
                  email=:email, 
                  phone=:phone, 
                  subject=:subject, 
                  message=:message, 
                  type=:type";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":email", $data->email ?? null);
        $stmt->bindParam(":phone", $data->phone ?? null);
        $stmt->bindParam(":subject", $data->subject ?? 'General Inquiry');
        $stmt->bindParam(":message", $data->message);
        $stmt->bindParam(":type", $data->type ?? 'GENERAL');
        
        if($stmt->execute()) {
            $message_id = $db->lastInsertId();
            
            http_response_code(201);
            echo json_encode(array(
                "message" => "Contact message created successfully.",
                "id" => $message_id
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create contact message."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create contact message. Data is incomplete."));
    }
}

function getAllContactMessages($db) {
    $query = "SELECT * FROM contact_messages ORDER BY created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $messages = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $messages[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($messages);
}

function getContactMessage($db, $id) {
    $query = "SELECT * FROM contact_messages WHERE id = ? LIMIT 0,1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $id);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($row) {
        http_response_code(200);
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Contact message not found."));
    }
}

function updateContactMessage($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE contact_messages SET status=:status WHERE id=:id";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":status", $data->status);
    $stmt->bindParam(":id", $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Contact message updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update contact message."));
    }
}

function deleteContactMessage($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "DELETE FROM contact_messages WHERE id = ?";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Contact message deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete contact message."));
    }
}
?>
