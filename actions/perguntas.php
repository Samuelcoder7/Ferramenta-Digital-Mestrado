<?php 

$q1 = $_POST['q1'];
$q2 = $_POST['q2'];
$q3 = $_POST['q3'];
$q4 = $_POST['q4'];
$q5 = $_POST['q5'];
$q6 = $_POST['q6'];

$categoria1_valor = ($q1 + $q2) / 2;
$categoria2_valor = ($q3 + $q4) / 2;
$categoria3_valor = ($q5 + $q6) / 2;

function categoria($valor) {
    if ($valor <= 1) {
        return "Péssimo";
    }
    if ($valor <= 2) {
        return "Ruim";
    }
    if ($valor <= 3) {
        return "Regular";
    }
    if ($valor <= 4) {
        return "Boa";
    }
    if ($valor <= 5) {
        return "Ótima";
    }
    
}

$categoria1 = categoria($categoria1_valor);
$categoria2 = categoria($categoria2_valor);
$categoria3 = categoria($categoria3_valor);

include_once('../config/conexao.php');

$stmt = $conexao->prepare("insert into avaliacao (categoria1, categoria2, categoria3) values (?, ?, ?)");
$stmt->bind_param("sss", $categoria1, $categoria2, $categoria3);
if (!$stmt->execute()) {
    echo'<script> alert("Erro"); </script>';
} 
?>