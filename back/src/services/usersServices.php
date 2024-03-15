<?php 
include '../index.php';

function createUser(String $username, String $pass) {
    $createQuery = myPDO->prepare("insert into users (username, pass) values ('{$username}', '{$pass}')");
    $createQuery->execute();

    return "criado com sucesso!";
};

function Login(String $username, String $pass) {
    $login = myPDO->query("SELECT * FROM users where username='{$username}'");
    $data = $login->fetch(PDO::FETCH_ASSOC);
    if($data){
        if(password_verify($pass, $data["pass"])){
            return array("code" => $data["code"], "username" => $data["username"]);
        }
    }
    return array('error' => "to aqui");
}

function readUsers(){
    $readAllUsers = myPDO->query("SELECT * FROM users");
    $data = $readAllUsers->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
?>