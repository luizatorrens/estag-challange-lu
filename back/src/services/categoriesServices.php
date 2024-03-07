<?php 
include '../index.php';

function createCategory(String $name, Float $tax) {
    $createQuery = myPDO->prepare("insert into categories (name, tax) values ('{$name}', {$tax})");
    $createQuery->execute();

    return "criado com sucesso!";
};

function deleteCategory(Int $id) {
    $createQuery = myPDO->prepare("delete from categories where code={$id}");
    $createQuery->execute();

    return "categoria id={$id} deletada com sucesso";
};

function readCategories(){
    $readAllCategories = myPDO->query("SELECT * FROM categories");
    $data = $readAllCategories->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
?>