<?php

$servername = "localhost";
$username = "root";
$password = "Test1234";
$dbname = "MarketDB";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
} //- коннектимся к бд с нашими данными сервера, юзера, пароля и бд

echo 'Connected successfully';

$q = $_REQUEST["q"]; // - получаем запрос, который отправили с локалхоста парсека
echo "<script>console.log('". $q ."' );</script>";
if ($q !== "") { // - если не пустой то выполняем запрос
	if ($conn->query($q) === TRUE) {
    		echo "New record created successfully";
	} else {
    		echo "Error: " . $q . "<br>" . $conn->error;
	}
}

$conn->close();
?>
