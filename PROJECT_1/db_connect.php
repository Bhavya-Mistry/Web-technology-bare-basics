<?php
// Database connection details
$host = 'localhost';       // Host (localhost if running locally)
$dbname = 'project';  // The name of your database
$username = 'root';         // Default XAMPP MySQL username is 'root'
$password = '';             // Default XAMPP MySQL password is empty

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
