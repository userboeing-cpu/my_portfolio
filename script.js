// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Плавное изменение темы
    document.documentElement.style.transition = 'all 0.5s ease';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 500);
    
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
});

// Плавное появление секций при скролле
function animateSections() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < windowHeight - sectionVisible) {
            section.classList.add('visible');
        }
    });
}

// Запускаем при загрузке и скролле
window.addEventListener('load', animateSections);
window.addEventListener('scroll', animateSections);

// Плавная навигация
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Плавное изменение хедера при скролле
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Плавное появление/исчезновение фона
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.backdropFilter = 'blur(5px)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    }
    
    // Плавное скрытие/показ хедера
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    header.style.transition = 'all 0.3s ease';
    lastScrollTop = scrollTop;
});

// Проверка и добавление target="_blank" для внешних ссылок
document.addEventListener('DOMContentLoaded', function() {
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Если ссылка внешняя (начинается с http) и не ведет на тот же домен
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Предотвращаем переход по ссылкам "В разработке"
    document.querySelectorAll('.coming-soon').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

// Инициализация анимаций при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем анимацию секций
    setTimeout(animateSections, 100);
    
    console.log('🚀 Портфолио загружено! Добро пожаловать!');
});