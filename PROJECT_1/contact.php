<?php
// Include the database connection file
include 'db_connect.php';  // Ensure 'db_connect.php' is correctly referenced

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['Name']);  // Ensure this matches the form field
    $email = htmlspecialchars($_POST['Email']); // Ensure this matches the form field
    $message = htmlspecialchars($_POST['Message']); // Ensure this matches the form field

    // Insert data into the database
    $sql = "INSERT INTO contact_form (name, email, message) VALUES ('$name', '$email', '$message')";

    
} else {
    echo "<h2>Invalid request</h2>";
}

// Close the database connection
$conn->close();
?>
