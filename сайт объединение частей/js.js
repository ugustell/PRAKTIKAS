// Нафигация
// Плавная прокрутка к разделам
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех ссылок
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
            
            // Получаем целевой раздел
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Плавная прокрутка с учетом высоты хедера
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Определение активного раздела при прокрутке
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
});



// FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Закрываем все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
});
// Отзывы
   document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('reviewsCarousel');
            const indicators = document.querySelectorAll('.custom-indicator');
            let isTransitioning = false;
            
            const bsCarousel = new bootstrap.Carousel(carousel, {
                wrap: true,
                pause: 'hover'
            });

            // Обработка кликов по индикаторам с защитой от множественных кликов
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (isTransitioning) return; // Блокируем клики во время анимации
                    
                    const currentActive = document.querySelector('.custom-indicator.active');
                    const currentIndex = Array.from(indicators).indexOf(currentActive);
                    
                    if (index === currentIndex) return; // Не переключаем на тот же слайд
                    
                    isTransitioning = true;
                    bsCarousel.to(index);
                });
            });

            // Обработка начала перехода
            carousel.addEventListener('slide.bs.carousel', function(event) {
                isTransitioning = true;
            });

            // Обновление активного индикатора при завершении смены слайдов
            carousel.addEventListener('slid.bs.carousel', function(event) {
                indicators.forEach(indicator => indicator.classList.remove('active'));
                indicators[event.to].classList.add('active');
                
                // Разблокируем переходы после завершения анимации
                setTimeout(() => {
                    isTransitioning = false;
                }, 100);
            });
        });

// Карта
// Инициализация Яндекс.Карты
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [53.534063, 49.317967], // Координаты Тольятти
        zoom: 15,
        controls: ['zoomControl']
    }, {
        suppressMapOpenBlock: true
    });

    // Добавляем метку
    var myPlacemark = new ymaps.Placemark([53.534063, 49.317967], {
        balloonContent: '<div style="padding: 15px;"><strong>ZeWeb</strong><br>ул. Дзержинского, 25Ас1<br>Тольятти, Самарская область</div>',
        hintContent: 'ZeWeb - IT-услуги'
    }, {
        preset: 'islands#darkBlueDotIcon',
        iconColor: '#1B1D1E'
    });

    myMap.geoObjects.add(myPlacemark);
    
    // Управление поведением карты
    myMap.behaviors.disable(['scrollZoom', 'drag']);
    
    document.getElementById('map').addEventListener('mouseenter', function() {
        myMap.behaviors.enable(['scrollZoom', 'drag']);
    });
});