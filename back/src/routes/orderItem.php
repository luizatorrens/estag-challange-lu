<?php 
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header ('Access-Control-Allow-Headers: *');
header("Content-Type: application/json");
include "../services/orderItemServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo 'Criar orderItem <br/>';

    $order = $_POST["order_code"];
    $product = $_POST["product_code"];
    $amount = $_POST["amount"];
    $price = $_POST["price"];
    $tax = $_POST["tax"];

    $result = createOrderItem( $order, $product, $amount, $price, $tax);
    echo $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    $data = readOrderItem();
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['code'];
    $data = deleteOrderItem($toBeDeleted);
    echo "apagado com sucesso, {$data}";
};
?>