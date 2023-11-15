<?php
// Conexão com o banco de dados (substitua pelos seus dados)
$servidor = "127.0.0.1";
$porta = "3306";
$usuario = "root";
$senha = "123456";
$bancoDeDados = "php";

$conexao = new mysqli("$servidor:$porta", $usuario, $senha, $bancoDeDados);

if ($conexao->connect_error) {
    die("Falha na conexão: " . $conexao->connect_error);
}

if ($_GET['tipo'] == 'totalUsuarios') {
    $queryTotalUsuarios = "SELECT COUNT(*) AS NumeroDeUsuarios FROM Usuario";
    $resultadoTotalUsuarios = $conexao->query($queryTotalUsuarios);
    $rowTotalUsuarios = $resultadoTotalUsuarios->fetch_assoc();
    echo $rowTotalUsuarios['NumeroDeUsuarios'];
} elseif ($_GET['tipo'] == 'statusUsuarios') {
    $queryStatusUsuarios = "SELECT SUM(Status) AS Ativos, COUNT(*) - SUM(Status) AS Inativos FROM Usuario";
    $resultadoStatusUsuarios = $conexao->query($queryStatusUsuarios);
    $dadosStatusUsuarios = $resultadoStatusUsuarios->fetch_assoc();
    echo json_encode($dadosStatusUsuarios);
} elseif ($_GET['tipo'] == 'ferramentasUsuarios') {
    $queryFerramentasUsuarios = "SELECT Ferramenta, COUNT(*) AS Quantidade FROM Usuario GROUP BY Ferramenta";
    $resultadoFerramentasUsuarios = $conexao->query($queryFerramentasUsuarios);
    $dadosFerramentasUsuarios = array();

    while ($row = $resultadoFerramentasUsuarios->fetch_assoc()) {
        $dadosFerramentasUsuarios[] = array(
            'ferramenta' => $row['Ferramenta'],
            'quantidade' => (int)$row['Quantidade']
        );
    }

    header('Content-Type: application/json');
    echo json_encode($dadosFerramentasUsuarios);
}

$conexao->close();
?>