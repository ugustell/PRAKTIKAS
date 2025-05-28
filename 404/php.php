<?php
// Инициализация переменных
$name = $phone = $service = $budget = $message = "";
$errorMessage = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Получаем и очищаем данные
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service = trim($_POST['service'] ?? '');
    $budget = trim($_POST['budget'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Валидация
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

    // Формируем письмо
    $to = "ggussytry@gmail.com"; // Замените на ваш email
    $subject = "Новая заявка с сайта";
    $body = "Имя: $name\nТелефон: $phone\nУслуга: $service\nБюджет: $budget\nСообщение:\n$message\n";

    $headers = "From: no-reply@yourdomain.ru\r\n" .
               "Reply-To: no-reply@yourdomain.ru\r\n" .
               "Content-Type: text/plain; charset=utf-8\r\n";

    // Отправка письма
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Спасибо! Ваша заявка отправлена.'); window.location.href = document.referrer;</script>";
    } else {
        echo "<script>alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.'); history.back();</script>";
    }
    exit;
} else {
    // Если открыли php.php напрямую — перенаправляем на форму
    header("Location: index.html"); // замените на страницу с формой
    exit;
}
?>

