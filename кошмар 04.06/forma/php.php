<?php
// Настройки подключения к базе данных
$host = 'localhost';  // или 'mysql', если localhost не работает
$dbname = 'ekater05_bd';
$username = 'ekater05_bd';
$password = 'MQ91Lfev%Fq0';



try {
    // Создаём подключение к базе через PDO с кодировкой utf8mb4
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    // Устанавливаем режим ошибок в исключения
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    // Если подключение не удалось — выводим ошибку и завершаем скрипт
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}

// Проверяем, что данные пришли методом POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем и очищаем данные из формы
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service = trim($_POST['service'] ?? '');
    $budget = trim($_POST['budget'] ?? '');
    $message = trim($_POST['message'] ?? '');


 $errors = [];
    if (empty($name)) {
        $errors[] = "Имя обязательно для заполнения.";
    }
    if (empty($phone)) {
        $errors[] = "Телефон обязателен для заполнения.";
    } else {
        // Проверка телефона по паттерну (пример простой)
        if (!preg_match('/^[\+0-9\s\-()]{7,}$/', $phone)) {
            $errors[] = "Неверный формат телефона.";
        }
    }
    if (empty($service)) {
        $errors[] = "Выберите услугу.";
    }

    if (!empty($errors)) {
        $errorMessage = implode("\\n", $errors);
        echo "<script>alert('{$errorMessage}'); history.back();</script>";
        exit;
    }


    try {
        // Подготавливаем SQL-запрос для вставки данных
        $stmt = $pdo->prepare("INSERT INTO applications (name, phone, service, budget, message, created_at) VALUES (:name, :phone, :service, :budget, :message, NOW())");

        // Выполняем запрос с привязанными значениями
        $stmt->execute([
            ':name' => $name,
            ':phone' => $phone,
            ':service' => $service,
            ':budget' => $budget,
            ':message' => $message
        ]);

        // Успешно — выводим сообщение и перенаправляем обратно на форму
        echo "<script>alert('Спасибо! Ваша заявка отправлена.'); window.location.href = history.back();</script>";
        exit;

    } catch (PDOException $e) {
        // Если ошибка при вставке — выводим сообщение
        echo "<script>alert('Ошибка при отправке заявки: " . $e->getMessage() . "'); history.back();</script>";
        exit;
    }
} else {
    // Если скрипт был вызван не POST-запросом — перенаправляем на форму
    header('Location: index.html');
    exit;


    
}

?>

