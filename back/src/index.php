<?php

$host = "pgsql_desafio";
$db = "applicationphp";
$user = "root";
$pw = "root";

define("myPDO", new PDO("pgsql:host=$host;dbname=$db", $user, $pw));
myPDO->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

