<?php 
include '../index.php';

function createUser(String $username, String $pass) {
    $createQuery = myPDO->prepare("insert into users (username, pass) values ('{$username}', {$pass})");
    $createQuery->execute();

    return "criado com sucesso!";
};

function readUsers(){
    $readAllUsers = myPDO->query("SELECT * FROM users");
    $data = $readAllUsers->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
?>