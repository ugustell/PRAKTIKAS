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
     let mobileMenuToggle, mobileNavOverlay, mobileNav;

    // Получение элементов (один раз и переиспользуется)
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

    // Плавная прокрутка и активные ссылки

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
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

    // Навигация для мобилки
    const elements = getMobileElements();

    if (elements.toggle) {
        elements.toggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    if (elements.overlay) {
        elements.overlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    }

    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Автоматически закрывать мобильное меню на десктопе
    window.addEventListener('resize', function() {
        if (window.innerWidth > 950) {
            closeMobileMenu();
        }
    });

    // Активная секция при прокрутке
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
    document.querySelector('.mobile-menu-close')?.addEventListener('click', function() {
    closeMobileMenu();
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
//Отзывы
   document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('reviewsCarousel');
            const indicators = document.querySelectorAll('.custom-indicator');
            let isTransitioning = false;
            
            const bsCarousel = new bootstrap.Carousel(carousel, {
                wrap: true,
                pause: 'hover'
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
                }, 200);
            });
          const modalOverlay = document.getElementById('reviewsModal');
    const openBtn = document.querySelector('.btn-review');

    // Навешиваем обработчик на кнопку "Оставить отзыв"
    if (openBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openReviewsModal();
        });
    }
    // Закрытие при клике на overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeReviewsModal();
            }
        });
    }

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeReviewsModal();
        }
    });

    document.getElementById('closeModalBtn').addEventListener('click', closeReviewsModal);

    document.querySelector('gis-option').addEventListener('click', goTo2GIS);

    document.querySelector('yandex-option').addEventListener('click', goToYandex);
    
    document.querySelector('avito-option').addEventListener('click', goToAvito);
   
    });

function openReviewsModal() {
    const modal = document.getElementById('reviewsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

// Закрытие модального окна
function closeReviewsModal() {
    const modal = document.getElementById('reviewsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}
// Переходы на площадки
function goToAvito() {
    const avitoUrl = 'https://www.avito.ru/user/review?fid=789c9232bf32c7cafcb959e5abcf5f5f25383200020000ffff42610826&page_from=public_profile_summary&trigger=none';
    window.open(avitoUrl, '_blank');
    closeReviewsModal();
}

function goTo2GIS() {
    const gisUrl = 'https://2gis.ru/togliatti/firm/70000001080798882/49.317294%2C53.533791/tab/reviews/addreview?m=49.31799%2C53.533833%2F18.06';
    window.open(gisUrl, '_blank');
    closeReviewsModal();
}

function goToYandex() {
    const yandexUrl = 'https://yandex.ru/maps/240/togliatti/?add-review=true&ll=49.317420%2C53.533735&mode=poi&poi%5Bpoint%5D=49.317287%2C53.533848&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D176547023749&tab=reviews&z=18.73';
    window.open(yandexUrl, '_blank');
    closeReviewsModal();
}



// Карта
// Инициализация Яндекс.Карты
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [53.534063, 49.317967],
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

