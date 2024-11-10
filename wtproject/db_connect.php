<?php
// Database connection parameters
$host = 'localhost';    // XAMPP usually runs on localhost
$db = 'project';  // Replace with your database name
$user = 'root';         // Default XAMPP MySQL user is 'root'
$pass = '';             // Default password for 'root' is empty

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// If POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['Name']);
    $email = htmlspecialchars($_POST['Email']);
    $message = htmlspecialchars($_POST['Message']);
    
    // Insert data into database
    $sql = "INSERT INTO demo (Name, Email, Message) VALUES ('$name', '$email', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<h2>Thank you, $name. Your message has been recorded!</h2>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "<h2>Invalid request</h2>";
}
?>