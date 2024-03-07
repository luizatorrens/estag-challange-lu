<?php 
include '../index.php';


function createOrder($total, $tax) {
    $createQuery = myPDO->prepare("insert into orders (total, tax) values ('{$total}', {$tax})");
    $createQuery->execute();

    return "criado com sucesso!";
};

function deleteOrder(Int $id) {
    $createQuery = myPDO->prepare("delete from orders where code={$id}");
    $createQuery->execute();

    return "order id={$id} deletado com sucesso";
};

function readOrder(){
    $readAllOrders = myPDO->query("SELECT * FROM orders");
    $data = $readAllOrders->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
?>
