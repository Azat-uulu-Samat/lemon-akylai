particlesJS.load("particles-js", "particlesjs-config.json", function () {
  console.log("particlesjs-config.js config loaded");
});
// Определяем, мобилка ли
const isMobile = window.innerWidth < 768;

// Выбираем нужный конфиг
const configFile = isMobile
  ? "particlesjs-xs-config.json"
  : "particlesjs-config.json";

// Загружаем
particlesJS.load("particles-js", configFile, function () {
  console.log("Particles config loaded:", configFile);
});

// -----------------------------------------АНИМАЦИЯ ПЕЧАТИ----------------------------------------

const typed = new Typed("#typed-text", {
  strings: [
    "Удалённая работа с гибким графиком",
    "Поддержка и обучение на старте",
    "Без вложений — только твоя мотивация",
    "Подходит для студентов, мам, новичков",
    "Работаем честно, платим стабильно",
    "Присоединяйся — начни зарабатывать уже сегодня!",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true,
});

// ------------------------------------------------------МОБИЛЬНОЕ МЕНЮ---------------------------------------------------
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const menuLinks = mobileMenu.querySelectorAll("a"); // все ссылки в меню

// открытие/закрытие меню по кнопке
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// закрытие меню по клику на ссылку
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// ---------------------------------------------------------ЯКОРЬ------------------------------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Плавный скролл
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Удаляем 'active' со всех ссылок
      document
        .querySelectorAll('a[href^="#"]')
        .forEach((l) => l.classList.remove("active"));

      // Добавляем 'active' к текущей
      this.classList.add("active");
    }
  });
});

// -----------------------------------------------------------------SWIPER-SLIDER-------------------------------------------------------------
new Swiper(".swiper", {
  speed: 600,
  slidesPerView: 3, // Показывать по 3 слайда
  spaceBetween: 40, // Расстояние между слайдами (в пикселях)
  loop: true, // Цикличный слайдер
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    // Адаптивность
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

// -------------------------------------ВОПРОСЫ И ОТВЕТЫ---------------------------------------------------
document.querySelectorAll(".faq__item").forEach((item) => {
  item.addEventListener("click", () => {
    const content = item.querySelector(".faq__item-content");
    const isActive = item.classList.contains("active");

    // Закрываем все
    document.querySelectorAll(".faq__item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".faq__item-content").style.maxHeight = null;
    });

    // Если неактивный — открываем
    if (!isActive) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// ------------------------------------------------МОДАЛЬНОЕ ОКНО---------------------------------------------
document.getElementById("openModalBtn").addEventListener("click", () => {
  document.getElementById("modal").classList.add("active");
  document.querySelector("body").classList.add("noScroll");
});

document.getElementById("modalCloseBtn").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("active");
  document.querySelector("body").classList.remove("noScroll");
});

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById("modal").classList.remove("active");
    document.querySelector("body").classList.remove("noScroll");
  }
});
// ------------------------------------------------ФОРМА ОБРАТНОЙ СВЯЗИ---------------------------------------------
// public/js/script.js
const forms = document.querySelectorAll(".modal-form, .form-block-full__form");

forms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input[name], textarea[name]");
    const formData = {};
    let valid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error");
        valid = false;
      } else {
        input.classList.remove("error");
        formData[input.name] = input.value.trim();
      }
    });

    if (valid) {
      console.log("Отправка данных:", formData); // для проверки

      fetch("/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.ok) console.error("Ошибка при отправке заявки");
        });

      const successMessage = document.getElementById("form-success");
      successMessage.classList.add("show");
      setTimeout(() => successMessage.classList.remove("show"), 3000);

      form.reset();
    }
  });

  const allInputs = form.querySelectorAll("input, textarea");
  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) input.classList.remove("error");
    });
  });
});
console.log("Данные формы:", formData);
