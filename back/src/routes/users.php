<?php 
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE');
header ('Access-Control-Allow-Headers: *');
include "../services/usersServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(!empty($_POST['register'])) {
    $username = filter_var($_POST["username"]);
    $pass = $_POST["pass"];
    $pass = password_hash($pass, PASSWORD_DEFAULT);

    $result = createUser($username, $pass);
    return $result;   
    } else {            
            $username = filter_var($_POST["username"]);
            $pass = ($_POST["pass"]);
    
            $result = Login($username, $pass);
            echo json_encode($result);
            return $result;
        }
    }


if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    $data = readUsers();
    echo json_encode($data);
}

?>