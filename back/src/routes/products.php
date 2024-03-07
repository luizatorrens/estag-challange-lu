<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
include "../services/productsServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo 'Criar produto <br/>';

    $name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $price = filter_var($_POST["price"], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $category = filter_var($_POST["category"], FILTER_SANITIZE_NUMBER_INT); 
    $amount = filter_var($_POST["amount"], FILTER_SANITIZE_NUMBER_INT);

    $result = createProduct($name, $price,  $category, $amount);
    echo $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readAllProducts();
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['code'];
    error_log(print_r($_GET, true));

    $data = deleteProduct($toBeDeleted);
    echo "Produto apagado com sucesso: {$data}";
}
?>
