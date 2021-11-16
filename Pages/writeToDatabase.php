<?php

$servername = "localhost";
$username = "root";
$password = "Test1234";
$dbname = "MarketDB";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  echo "<script>console.log('". mysqli_connect_error() ."' );</script>";
  die("Connection failed: " . mysqli_connect_error());
} //- коннектимся к бд с нашими данными сервера, юзера, пароля и бд

echo 'Connected successfully';

$q = $_POST["q"];
echo "req - ". $q;
if ($q !== "") { // - если не пустой то выполняем запрос
	//if ($conn->query($q) === TRUE) {
	if(mysqli_query($conn,$q)){
    		echo "New record created successfully";
	} else {
    		echo "Error: " . $q . "<br>" . $conn->error;
	}
}

mysqli_close($conn);
?>
