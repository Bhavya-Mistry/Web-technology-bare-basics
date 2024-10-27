<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Email details
    $to = "your-email@example.com";  // Replace with your email address
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    // Instead of sending an email, log the data for debugging
file_put_contents('contact_form_log.txt', $body, FILE_APPEND);
echo "<h2>Thank you, $name. Your message has been recorded!</h2>";

} else {
    echo "<h2>Invalid request</h2>";
}
?>
