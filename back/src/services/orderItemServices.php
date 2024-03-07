<?php 
require_once '../index.php';

function createOrderItem( $order,  $product,  $amount ,  $price,  $tax ) {
    $createQuery = myPDO->prepare("insert into order_item (order_code, product_code, amount, price, tax) values ('{$order}', {$product}, {$amount}, {$price}, {$tax})");
    $createQuery->execute();
    updateStok($product, $amount);

    return "criado com sucesso!";
};

function deleteOrderItem(Int $code) {
    $createQuery = myPDO->prepare("delete from order_item where code={$code}");
    $createQuery->execute();

    return "OrderItem code={$code} deletada com sucesso";
};

function readOrderItem(){
    $readAllOrderItem = myPDO->query("SELECT * FROM order_item");
    $data = $readAllOrderItem->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function updateStok(Int $product_code, Int $amount){
        $read = itensStorage($product_code);
        $newAmount = $read['amount'] - $amount;
        $order_item = myPDO->query("UPDATE products set amount = $newAmount where code = {$product_code}");
        $order_item = $order_item->execute();
        return "foi";
    }
 
 
function itensStorage(Int $product_code){
        $itensProducts = myPDO->query("SELECT * FROM products where code = {$product_code}");
        $itemProduct = $itensProducts->fetch();
        return $itemProduct ;
}

?>
