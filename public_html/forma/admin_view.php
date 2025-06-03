<?php
// Подключение к базе
$host = 'localhost';  // или 'mysql', если localhost не работает
$dbname = 'ekater05_bd';
$username = 'ekater05_bd';
$password = 'MQ91Lfev%Fq0';


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    die("Некорректный ID заявки");
}

$stmt = $pdo->prepare("SELECT * FROM applications WHERE id = :id");
$stmt->execute([':id' => $id]);
$request = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$request) {
    die("Заявка не найдена");
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Детали заявки #<?= $request['id'] ?></title>
<style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    dt { font-weight: bold; margin-top: 10px; }
    dd { margin-left: 20px; margin-bottom: 10px; }
    a { text-decoration: none; color: #007BFF; }
</style>
</head>
<body>

<h1>Детали заявки #<?= $request['id'] ?></h1>

<dl>
    <dt>ФИО:</dt>
    <dd><?= htmlspecialchars($request['name']) ?></dd>

    <dt>Телефон:</dt>
    <dd><?= htmlspecialchars($request['phone']) ?></dd>

    <dt>Услуга:</dt>
    <dd><?= htmlspecialchars($request['service']) ?></dd>

    <dt>Бюджет:</dt>
    <dd><?= htmlspecialchars($request['budget']) ?></dd>

    <dt>Комментарий:</dt>
    <dd><?= nl2br(htmlspecialchars($request['message'])) ?></dd>

    <dt>Статус:</dt>
    <dd><?= htmlspecialchars($request['status']) ?></dd>

    <dt>Дата поступления:</dt>
    <dd><?= $request['created_at'] ?></dd>
</dl>

<p><a href="admin.php">← Вернуться к списку заявок</a></p>

</body>
</html>

