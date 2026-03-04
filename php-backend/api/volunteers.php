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
        createVolunteer($db);
        break;
    case 'GET':
        if(isset($_GET['id'])) {
            getVolunteer($db, $_GET['id']);
        } elseif(isset($_GET['stats'])) {
            getVolunteerStats($db);
        } else {
            getAllVolunteers($db);
        }
        break;
    case 'PUT':
        updateVolunteer($db);
        break;
    case 'DELETE':
        deleteVolunteer($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function createVolunteer($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->name) && !empty($data->email) && !empty($data->phone)) {
        
        $query = "INSERT INTO volunteers SET 
                  name=:name, 
                  email=:email, 
                  phone=:phone, 
                  city=:city, 
                  state=:state, 
                  age=:age, 
                  gender=:gender, 
                  education=:education, 
                  profession=:profession, 
                  skills=:skills, 
                  availability=:availability, 
                  experience=:experience, 
                  motivation=:motivation, 
                  emergency_contact_name=:emergency_contact_name, 
                  emergency_contact_phone=:emergency_contact_phone";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":phone", $data->phone);
        $stmt->bindParam(":city", $data->city);
        $stmt->bindParam(":state", $data->state);
        $stmt->bindParam(":age", $data->age ?? null);
        $stmt->bindParam(":gender", $data->gender ?? null);
        $stmt->bindParam(":education", $data->education ?? null);
        $stmt->bindParam(":profession", $data->profession ?? null);
        $stmt->bindParam(":skills", $data->skills ?? null);
        $stmt->bindParam(":availability", $data->availability ?? null);
        $stmt->bindParam(":experience", $data->experience ?? null);
        $stmt->bindParam(":motivation", $data->motivation ?? null);
        $stmt->bindParam(":emergency_contact_name", $data->emergency_contact_name ?? null);
        $stmt->bindParam(":emergency_contact_phone", $data->emergency_contact_phone ?? null);
        
        if($stmt->execute()) {
            $volunteer_id = $db->lastInsertId();
            
            // Send welcome email
            sendWelcomeEmail($data);
            
            http_response_code(201);
            echo json_encode(array(
                "message" => "Volunteer registration successful.",
                "id" => $volunteer_id
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to register volunteer."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to register volunteer. Data is incomplete."));
    }
}

function getAllVolunteers($db) {
    $query = "SELECT * FROM volunteers ORDER BY created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $volunteers = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $volunteers[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($volunteers);
}

function getVolunteer($db, $id) {
    $query = "SELECT * FROM volunteers WHERE id = ? LIMIT 0,1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $id);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($row) {
        http_response_code(200);
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Volunteer not found."));
    }
}

function getVolunteerStats($db) {
    $query = "SELECT 
                COUNT(*) as total_volunteers,
                COUNT(CASE WHEN status = 'ACTIVE' THEN 1 END) as active_volunteers,
                COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending_volunteers,
                COUNT(CASE WHEN gender = 'FEMALE' THEN 1 END) as female_volunteers,
                COUNT(CASE WHEN gender = 'MALE' THEN 1 END) as male_volunteers
              FROM volunteers";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $stats = $stmt->fetch(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode($stats);
}

function updateVolunteer($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE volunteers SET status=:status WHERE id=:id";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":status", $data->status);
    $stmt->bindParam(":id", $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Volunteer updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update volunteer."));
    }
}

function deleteVolunteer($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "DELETE FROM volunteers WHERE id = ?";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Volunteer deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete volunteer."));
    }
}

function sendWelcomeEmail($data) {
    $to = $data->email;
    $subject = "Welcome to Women Support NGO - Volunteer Registration Received";
    $message = "
    Dear " . $data->name . ",
    
    Thank you for registering as a volunteer with Women Support NGO.
    
    Your application is being reviewed and we will contact you soon with next steps.
    
    Together, we can make a difference in the lives of women across India.
    
    Best regards,
    Women Support NGO Team
    ";
    
    $headers = "From: volunteers@womensupportngo.org";
    
    // Uncomment to send actual emails
    // mail($to, $subject, $message, $headers);
}
?>
