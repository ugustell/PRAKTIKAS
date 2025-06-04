// Нафигация
// Плавная прокрутка к разделам
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    let mobileMenuToggle, mobileNavOverlay, mobileNav;

    // Получение мобильных элементов
    function getMobileElements() {
        if (!mobileMenuToggle || !mobileNavOverlay || !mobileNav) {
            mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
            mobileNav = document.querySelector('.mobile-nav');
        }
        return {
            toggle: mobileMenuToggle,
            overlay: mobileNavOverlay,
            nav: mobileNav
        };
    }

    function openMobileMenu() {
        const elements = getMobileElements();
        elements.toggle.classList.add('active');
        elements.overlay.classList.add('active');
        elements.nav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        const elements = getMobileElements();
        elements.toggle.classList.remove('active');
        elements.overlay.classList.remove('active');
        elements.nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMobileMenu() {
        const elements = getMobileElements();
        if (elements.nav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Обработка кликов по ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Если это ссылка на другую страницу — не перехватываем
            if (href && !href.startsWith('#')) {
                return;
            }

            e.preventDefault();

            // Установка активного класса
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            const targetSection = document.querySelector(href);
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка мобильной навигации
    const elements = getMobileElements();

    if (elements.toggle) {
        elements.toggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    if (elements.overlay) {
        elements.overlay.addEventListener('click', function (e) {
            e.preventDefault();
            closeMobileMenu();
        });
    }

    document.querySelector('.mobile-menu-close')?.addEventListener('click', function () {
        closeMobileMenu();
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    // Автоматически закрывать мобильное меню на десктопе
    window.addEventListener('resize', function () {
        if (window.innerWidth > 950) {
            closeMobileMenu();
        }
    });

    // Определение активной секции при прокрутке
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
});


// Footer
document.addEventListener('DOMContentLoaded', function() {
    
    // Функция для переключения аккордеона
    function toggleAccordion(button) {
        const content = button.nextElementSibling.nextElementSibling;
        const isActive = button.classList.contains('active');
        
        // Закрываем все открытые аккордеоны
        document.querySelectorAll('.accordion-toggle.active').forEach(activeBtn => {
            if (activeBtn !== button) {
                activeBtn.classList.remove('active');
                activeBtn.nextElementSibling.nextElementSibling.classList.remove('active');
            }
        });
        
        // Переключаем текущий аккордеон
        if (isActive) {
            button.classList.remove('active');
            content.classList.remove('active');
        } else {
            button.classList.add('active');
            content.classList.add('active');
        }
    }

    // Инициализация аккордеона
    function initFooterAccordion() {
        const accordionButtons = document.querySelectorAll('.accordion-toggle');
        
        accordionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                toggleAccordion(this);
            });
        });
    }

    // Запускаем инициализацию
    initFooterAccordion();

    // Закрытие аккордеонов при изменении размера экрана
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Если экран стал больше 768px, закрываем все аккордеоны
            if (window.innerWidth > 768) {
                document.querySelectorAll('.accordion-toggle.active').forEach(btn => {
                    btn.classList.remove('active');
                    btn.nextElementSibling.nextElementSibling.classList.remove('active');
                });
            }
        }, 250);
    });
});

