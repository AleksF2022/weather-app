// Элементы на странице
const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

// Слушаем отправку формы
form.onsubmit = (e) => {
  // Отменяем отправку формы
  e.preventDefault();
  //  Берем значение из инпута, обрезаем пробелы
  let city = input.value.trim();
  // Адрес запроса
  const apiKey = "e1925445427c432483395911230805";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  //  Выполняем запрос
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Проверка на ошибку
      if (data.error) {
        // Если есть ошибка
        //  Удаляем предыдущую карточку
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        // Отображаем карточку с ошибкой
        const html = `<div class="card">${data.error.message}</div>`;

        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      } else {
        //  Ошибки нет- выводим карточку
        //  Отображаем полученные данные в карточке
        //  Удаляем предыдущую карточку
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();
        // Разметка для карточки
        const html = `<div class="card">
        <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
        <div class="card-weather">
        <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
        <img class="card-img" src="images/example.png" alt="Weather">
        </div>
        <div class="card-description">${data.current.condition.text}</div>
        </div>`;
        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      }
    });
};
