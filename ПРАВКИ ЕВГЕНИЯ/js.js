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
            const desktopCarousel = document.getElementById('desktopCarousel');
            const tabletCarousel = document.getElementById('tabletCarousel');
            const mobileCarousel = document.getElementById('mobileCarousel');
            const indicatorsContainer = document.getElementById('customIndicators');
            
            let activeCarousel;
            let bsCarousel;
            let currentMode = getScreenMode();

            // Определяем режим экрана
            function getScreenMode() {
                const width = window.innerWidth;
                if (width <= 835) return 'mobile';
                if (width <= 1200) return 'tablet';
                return 'desktop';
            }

            // Определяем активную карусель и создаем индикаторы
            function initCarousel() {
                const mode = getScreenMode();
                
                if (mode === 'mobile') {
                    activeCarousel = mobileCarousel;
                    createIndicators(6); // 6 слайдов для мобильной версии
                } else if (mode === 'tablet') {
                    activeCarousel = tabletCarousel;
                    createIndicators(3); // 3 слайда для планшетной версии
                } else {
                    activeCarousel = desktopCarousel;
                    createIndicators(2); // 2 слайда для десктопной версии
                }

                // Инициализируем Bootstrap карусель
                if (bsCarousel) {
                    bsCarousel.dispose();
                }
                bsCarousel = new bootstrap.Carousel(activeCarousel, {
                    wrap: true,
                    pause: 'hover',
                    interval: 5000
                });

                // Привязываем события
                bindCarouselEvents();
                currentMode = mode;
            }

            // Создание кастомных индикаторов
            function createIndicators(count) {
                indicatorsContainer.innerHTML = '';
                
                for (let i = 0; i < count; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'custom-indicator';
                    if (i === 0) indicator.classList.add('active');
                    
                    indicator.addEventListener('click', () => {
                        bsCarousel.to(i);
                    });
                    
                    indicatorsContainer.appendChild(indicator);
                }
            }

            // Привязка событий к карусели
            function bindCarouselEvents() {
                // Удаляем старые обработчики
                activeCarousel.removeEventListener('slide.bs.carousel', handleSlideEvent);
                activeCarousel.removeEventListener('slid.bs.carousel', handleSlidEvent);

                // Добавляем новые обработчики
                activeCarousel.addEventListener('slide.bs.carousel', handleSlideEvent);
                activeCarousel.addEventListener('slid.bs.carousel', handleSlidEvent);
            }

            // Обработчик начала перехода
            function handleSlideEvent(event) {
                // Можно добавить логику для начала перехода
            }

            // Обработчик завершения перехода
            function handleSlidEvent(event) {
                updateActiveIndicator(event.to);
            }

            // Обновление активного индикатора
            function updateActiveIndicator(slideIndex) {
                const indicators = indicatorsContainer.querySelectorAll('.custom-indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === slideIndex);
                });
            }

            // Обработчик изменения размера окна
            window.addEventListener('resize', function() {
                const newMode = getScreenMode();
                if (newMode !== currentMode) {
                    // Переинициализируем карусель при смене режима
                    setTimeout(() => {
                        initCarousel();
                    }, 100);
                }
            });

            // Инициализация
            initCarousel();
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
    const mapContainer = document.getElementById('map');
    
    const myMap = new ymaps.Map(mapContainer, {
        center: [53.534063, 49.317967],
        zoom: 15,
        controls: ['zoomControl']
    }, {
        suppressMapOpenBlock: true
    });
    
    const myPlacemark = new ymaps.Placemark([53.534063, 49.317967], {
        balloonContent: '<div style="padding: 15px;"><strong>ZeWeb</strong><br>ул. Дзержинского, 25Ас1<br>Тольятти, Самарская область</div>',
        hintContent: 'ZeWeb - IT-услуги'
    }, {
        preset: 'islands#darkBlueDotIcon',
        iconColor: '#1B1D1E'
    });
    
    myMap.geoObjects.add(myPlacemark);
    
    // По умолчанию отключаем все поведения
    myMap.behaviors.disable(['scrollZoom', 'drag']);
    
    let isInteracting = false;
    
    // Включаем взаимодействие при нажатии мыши
    mapContainer.addEventListener('pointerdown', function (e) {
        if (e.button === 0) {
            isInteracting = true;
            // Включаем сразу оба поведения
            myMap.behaviors.enable(['drag', 'scrollZoom']);
        }
    });
    
    // Выключаем взаимодействие при отпускании мыши
    document.addEventListener('pointerup', function (e) {
        if (e.button === 0 && isInteracting) {
            isInteracting = false;
            // Добавляем небольшую задержку для отключения, чтобы завершить обработку событий
            setTimeout(() => {
                myMap.behaviors.disable(['drag', 'scrollZoom']);
            }, 50);
        }
    });
    
    // Выключаем если указатель покинул карту
    mapContainer.addEventListener('pointerleave', function () {
        if (isInteracting) {
            isInteracting = false;
            setTimeout(() => {
                myMap.behaviors.disable(['drag', 'scrollZoom']);
            }, 50);
        }
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

