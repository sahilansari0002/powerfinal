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
        createImpactMetric($db);
        break;
    case 'GET':
        if(isset($_GET['id'])) {
            getImpactMetric($db, $_GET['id']);
        } elseif(isset($_GET['dashboard'])) {
            getDashboardStats($db);
        } else {
            getAllImpactMetrics($db);
        }
        break;
    case 'PUT':
        updateImpactMetric($db);
        break;
    case 'DELETE':
        deleteImpactMetric($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function createImpactMetric($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->metric_name) && !empty($data->metric_value) && !empty($data->metric_type)) {
        
        $query = "INSERT INTO impact_metrics SET 
                  metric_name=:metric_name, 
                  metric_value=:metric_value, 
                  metric_type=:metric_type, 
                  period_start=:period_start, 
                  period_end=:period_end, 
                  description=:description";
        
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":metric_name", $data->metric_name);
        $stmt->bindParam(":metric_value", $data->metric_value);
        $stmt->bindParam(":metric_type", $data->metric_type);
        $stmt->bindParam(":period_start", $data->period_start ?? null);
        $stmt->bindParam(":period_end", $data->period_end ?? null);
        $stmt->bindParam(":description", $data->description ?? null);
        
        if($stmt->execute()) {
            $metric_id = $db->lastInsertId();
            
            http_response_code(201);
            echo json_encode(array(
                "message" => "Impact metric created successfully.",
                "id" => $metric_id
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create impact metric."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create impact metric. Data is incomplete."));
    }
}

function getAllImpactMetrics($db) {
    $query = "SELECT * FROM impact_metrics ORDER BY created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $metrics = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $metrics[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($metrics);
}

function getDashboardStats($db) {
    // Get comprehensive dashboard statistics
    $stats = array();
    
    // Impact metrics
    $query = "SELECT metric_type, SUM(metric_value) as total_value FROM impact_metrics GROUP BY metric_type";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $stats['impact'][$row['metric_type']] = $row['total_value'];
    }
    
    // Help requests stats
    $query = "SELECT 
                COUNT(*) as total_requests,
                COUNT(CASE WHEN priority = 'EMERGENCY' THEN 1 END) as emergency_requests,
                COUNT(CASE WHEN status = 'NEW' THEN 1 END) as new_requests,
                COUNT(CASE WHEN status = 'RESOLVED' THEN 1 END) as resolved_requests
              FROM help_requests";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $stats['help_requests'] = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Donations stats
    $query = "SELECT 
                COUNT(*) as total_donations,
                SUM(CASE WHEN status = 'COMPLETED' THEN amount ELSE 0 END) as total_amount,
                COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_donations
              FROM donations";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $stats['donations'] = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Volunteers stats
    $query = "SELECT 
                COUNT(*) as total_volunteers,
                COUNT(CASE WHEN status = 'ACTIVE' THEN 1 END) as active_volunteers,
                COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending_volunteers
              FROM volunteers";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $stats['volunteers'] = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Activities stats
    $query = "SELECT 
                COUNT(*) as total_activities,
                SUM(participants_count) as total_participants,
                COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_activities
              FROM activities";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $stats['activities'] = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Recent activities
    $query = "SELECT title, date, participants_count, category FROM activities WHERE status = 'COMPLETED' ORDER BY date DESC LIMIT 5";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $stats['recent_activities'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode($stats);
}

function getImpactMetric($db, $id) {
    $query = "SELECT * FROM impact_metrics WHERE id = ? LIMIT 0,1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $id);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($row) {
        http_response_code(200);
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Impact metric not found."));
    }
}

function updateImpactMetric($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE impact_metrics SET 
              metric_value=:metric_value, 
              description=:description 
              WHERE id=:id";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":metric_value", $data->metric_value);
    $stmt->bindParam(":description", $data->description);
    $stmt->bindParam(":id", $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Impact metric updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update impact metric."));
    }
}

function deleteImpactMetric($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "DELETE FROM impact_metrics WHERE id = ?";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Impact metric deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete impact metric."));
    }
}
?>
