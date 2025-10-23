<?php 
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "registro_respostas";

$conexao = mysqli_connect($servername, $username, $password,$database);

if (!$conexao) {
    die("Erro na conexão: " . mysqli_connect_error());
}
?>