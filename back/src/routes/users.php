<?php 
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE');
header ('Access-Control-Allow-Headers: *');
include "../services/usersServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = filter_var($_POST["username"]);
    $pass = filter_var($_POST["pass"]);

    $result = createUser($username, $pass);
    echo $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    $data = readUsers();
    echo json_encode($data);
}

?>