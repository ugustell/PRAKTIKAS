<?php
// Подключение к базе
$host = 'localhost';
$dbname = 'zeweb';
$username = 'ugustell';
$password = '111111';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}

// Обработка изменения статуса
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'], $_POST['status'])) {
    $id = (int)$_POST['id'];
    $status = $_POST['status'];
    $allowed_status = ['Новая', 'В работе', 'Обработана'];
    if (in_array($status, $allowed_status)) {
        $stmt = $pdo->prepare("UPDATE applications SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $status, ':id' => $id]);
        header("Location: admin.php");
        exit;
    }
}

// Получаем параметры фильтра и сортировки из GET
$filter_status = $_GET['status'] ?? '';
$sort_by = $_GET['sort'] ?? 'created_at';
$sort_order = $_GET['order'] ?? 'desc';

// Допустимые значения для сортировки
$allowed_sort = ['created_at', 'name'];
$allowed_order = ['asc', 'desc'];

if (!in_array($sort_by, $allowed_sort)) {
    $sort_by = 'created_at';
}
if (!in_array($sort_order, $allowed_order)) {
    $sort_order = 'desc';
}

// Формируем SQL с фильтром и сортировкой
$sql = "SELECT * FROM applications";
$params = [];

if ($filter_status && in_array($filter_status, ['Новая', 'В работе', 'Обработана'])) {
    $sql .= " WHERE status = :status";
    $params[':status'] = $filter_status;
}

$sql .= " ORDER BY $sort_by $sort_order";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Админ-панель заявок</title>
<style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
    form { margin: 0; }
    select { padding: 4px; }
    .filter-sort {
        margin-bottom: 15px;
    }
</style>
</head>
<body>

<h1>Список заявок</h1>

<div class="filter-sort">
    <form method="get" action="admin.php">
        <label>
            Фильтр по статусу:
            <select name="status">
                <option value="" <?= $filter_status === '' ? 'selected' : '' ?>>Все</option>
                <option value="Новая" <?= $filter_status === 'Новая' ? 'selected' : '' ?>>Новая</option>
                <option value="В работе" <?= $filter_status === 'В работе' ? 'selected' : '' ?>>В работе</option>
                <option value="Обработана" <?= $filter_status === 'Обработана' ? 'selected' : '' ?>>Обработана</option>
            </select>
        </label>

        <label>
            Сортировать по:
            <select name="sort">
                <option value="created_at" <?= $sort_by === 'created_at' ? 'selected' : '' ?>>Дате</option>
                <option value="name" <?= $sort_by === 'name' ? 'selected' : '' ?>>Имени</option>
            </select>
        </label>

        <label>
            Порядок:
            <select name="order">
                <option value="asc" <?= $sort_order === 'asc' ? 'selected' : '' ?>>По возрастанию</option>
                <option value="desc" <?= $sort_order === 'desc' ? 'selected' : '' ?>>По убыванию</option>
            </select>
        </label>

        <button type="submit">Применить</button>
    </form>
</div>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Услуга</th>
            <th>Бюджет</th>
            <th>Комментарий</th>
            <th>Статус</th>
            <th>Дата поступления</th>
            <th>Действия</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($requests as $req): ?>
            <tr>
                <td><?= htmlspecialchars($req['id']) ?></td>
                <td><?= htmlspecialchars($req['name']) ?></td>
                <td><?= htmlspecialchars($req['phone']) ?></td>
                <td><?= htmlspecialchars($req['service']) ?></td>
                <td><?= htmlspecialchars($req['budget']) ?></td>
                <td><?= nl2br(htmlspecialchars($req['message'])) ?></td>
                <td>
                    <form method="post" action="admin.php">
                        <input type="hidden" name="id" value="<?= $req['id'] ?>">
                        <select name="status" onchange="this.form.submit()">
                            <option value="Новая" <?= $req['status'] === 'Новая' ? 'selected' : '' ?>>Новая</option>
                            <option value="В работе" <?= $req['status'] === 'В работе' ? 'selected' : '' ?>>В работе</option>
                            <option value="Обработана" <?= $req['status'] === 'Обработана' ? 'selected' : '' ?>>Обработана</option>
                        </select>
                    </form>
                </td>
                <td><?= $req['created_at'] ?></td>
                <td><a href="admin_view.php?id=<?= $req['id'] ?>">Подробнее</a></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

</body>
</html>

