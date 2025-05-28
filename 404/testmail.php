<?php
$to = "ggussytry@gmail.com"; // Ваш email
$subject = "Тестовое письмо";
$message = "Это тестовое письмо для проверки работы mail()";
$headers = "From: webmaster@yourdomain.ru\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Письмо отправлено успешно";
} else {
    echo "Ошибка при отправке письма";
}
?>

