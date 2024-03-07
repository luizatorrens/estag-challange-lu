<?php 
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header ('Access-Control-Allow-Headers: *');
header("Content-Type: application/json");
include "../services/ordersServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo 'Criar order <br/>';

    $total = $_POST["total"];
    $tax = $_POST["tax"];

    $result = createOrder($total, $tax);
    echo $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    $data = readOrder();
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['id'];
    $data = deleteOrder($toBeDeleted);
    echo "apagado com sucesso, {$data}";
};
?>