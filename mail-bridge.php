<?php
/**
 * HOSTINGER MAIL BRIDGE - DYNAMIC RECIPIENT SUPPORT
 * Optimized for KGH Gebäudereinigung Hannover notifications.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
        exit;
    }

    // Default business inbox for all form submissions.
    $business_email = "info@kgh-reinigung.de";

    // Use provided recipient or fallback to the company inbox.
    $to = !empty($data['to']) ? $data['to'] : $business_email;
    $subject = !empty($data['subject']) ? $data['subject'] : "System Benachrichtigung - KGH";
    $message = !empty($data['content']) ? $data['content'] : "Kein Inhalt angegeben.";
    
    $headers = "From: web-alert@kgh-reinigung.de\r\n";
    $headers .= "Reply-To: service@kgh-reinigung.de\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode([
            "status" => "success", 
            "message" => "Email dispatched", 
            "recipient" => $to,
            "timestamp" => date("c")
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Mail delivery failed"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>