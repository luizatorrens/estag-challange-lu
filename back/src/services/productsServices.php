<?php 
require_once '../index.php';

function createProduct(String $name, Float $price, Int $category , Int $amount) {
    $createQuery = myPDO->prepare("insert into products (name, price, category_code, amount) values ('{$name}', {$price}, {$category}, {$amount})");
    $createQuery->execute();

    return "criado com sucesso!";
};

function deleteProduct(Int $code) {
    $createQuery = myPDO->prepare("delete from products where code={$code}");
    $createQuery->execute();

    return "product code={$code} deletada com sucesso";
};

function readAllProducts(){
    $readAllProducts = myPDO->query("SELECT 
        products.code,
        products.name,
        products.price,
        products.amount,
        categories.tax,
        categories.name as category_name,
        trunc((categories.tax / 100 * products.price), 2) as tax_value,
        trunc((categories.tax / 100 * products.price + products.price), 2) as products_with_tax
            from
                products
            JOIN
                categories 
            ON
            products.category_code = categories.code");
    $data = $readAllProducts->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

?>