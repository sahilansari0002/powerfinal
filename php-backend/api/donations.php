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
        createDonation($db);
        break;
    case 'GET':
        if(isset($_GET['id'])) {
            getDonation($db, $_GET['id']);
        } elseif(isset($_GET['stats'])) {
            getDonationStats($db);
        } else {
            getAllDonations($db);
        }
        break;
    case 'PUT':
        updateDonation($db);
        break;
    case 'DELETE':
        deleteDonation($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function createDonation($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->donor_name) && !empty($data->amount)) {
        
        $query = "INSERT INTO donations SET 
                  donor_name=:donor_name, 
                  email=:email, 
                  phone=:phone, 
                  amount=:amount, 
                  currency=:currency, 
                  donation_type=:donation_type, 
                  purpose=:purpose, 
                  payment_method=:payment_method, 
                  transaction_id=:transaction_id, 
                  status=:status";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":donor_name", $data->donor_name);
        $stmt->bindParam(":email", $data->email ?? null);
        $stmt->bindParam(":phone", $data->phone ?? null);
        $stmt->bindParam(":amount", $data->amount);
        $stmt->bindParam(":currency", $data->currency ?? 'INR');
        $stmt->bindParam(":donation_type", $data->donation_type ?? 'ONE_TIME');
        $stmt->bindParam(":purpose", $data->purpose ?? null);
        $stmt->bindParam(":payment_method", $data->payment_method ?? null);
        $stmt->bindParam(":transaction_id", $data->transaction_id ?? null);
        $stmt->bindParam(":status", $data->status ?? 'PENDING');
        
        if($stmt->execute()) {
            $donation_id = $db->lastInsertId();
            
            // Send thank you email
            sendThankYouEmail($data);
            
            http_response_code(201);
            echo json_encode(array(
                "message" => "Donation recorded successfully.",
                "id" => $donation_id
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to record donation."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to record donation. Data is incomplete."));
    }
}

function getAllDonations($db) {
    $query = "SELECT * FROM donations ORDER BY created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $donations = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $donations[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($donations);
}

function getDonation($db, $id) {
    $query = "SELECT * FROM donations WHERE id = ? LIMIT 0,1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $id);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($row) {
        http_response_code(200);
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Donation not found."));
    }
}

function getDonationStats($db) {
    $query = "SELECT 
                COUNT(*) as total_donations,
                SUM(CASE WHEN status = 'COMPLETED' THEN amount ELSE 0 END) as total_amount,
                AVG(CASE WHEN status = 'COMPLETED' THEN amount ELSE NULL END) as average_donation,
                COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_donations,
                COUNT(CASE WHEN donation_type = 'MONTHLY' THEN 1 END) as monthly_donors
              FROM donations";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $stats = $stmt->fetch(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode($stats);
}

function updateDonation($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE donations SET 
              status=:status, 
              transaction_id=:transaction_id 
              WHERE id=:id";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":status", $data->status);
    $stmt->bindParam(":transaction_id", $data->transaction_id);
    $stmt->bindParam(":id", $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Donation updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update donation."));
    }
}

function deleteDonation($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "DELETE FROM donations WHERE id = ?";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Donation deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete donation."));
    }
}

function sendThankYouEmail($data) {
    if(!empty($data->email)) {
        $to = $data->email;
        $subject = "Thank you for your generous donation - Women Support NGO";
        $message = "
        Dear " . $data->donor_name . ",
        
        Thank you for your generous donation of ₹" . $data->amount . " to Women Support NGO.
        
        Your contribution will help us continue our mission of supporting and empowering women across India.
        
        We will send you a donation receipt shortly.
        
        With gratitude,
        Women Support NGO Team
        ";
        
        $headers = "From: donations@womensupportngo.org";
        
        // Uncomment to send actual emails
        // mail($to, $subject, $message, $headers);
    }
}
?>
