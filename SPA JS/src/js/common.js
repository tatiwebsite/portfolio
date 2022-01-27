export const pages = [
    {
        id: "main-page",
        title: "Главная"
    },
    {
        id: "login-page",
        title: "Войди/Зарегистрируйся"
    },
    {
        id: "studies-page",
        title: "Давай научу",
        image: "./public/check-card-1.png"
    },
    {
        id: "test-capital-page",
        title: "Тест на столицы",
        image: "./public/check-card-2.png"
    },
    {
        id: "test-flag-page",
        title: "Тест на флаги",
        image: "./public/check-card-3.png"
    }
];


export const shuffleArray = (capitals) => {
    return capitals.sort(() => Math.random() - 0.5);
};

export const getRandomNumber = () => {
    let num = Math.floor(Math.random() * 10);
    return num;
};

export const countriesFlags = [
    {
        short: "gn",
        nameRus: "Гвинея"
    },
    {
        short: "de",
        nameRus: "Германия"
    },
    {
        short: "lt",
        nameRus: "Литва"
    },
    {
        short: "bj",
        nameRus: "Бенин"
    },
    {
        short: "bo",
        nameRus: "Боливия"
    },
    {
        short: "au",
        nameRus: "Австралия"
    },
    {
        short: "cn",
        nameRus: "Китай"
    },
    {
        short: "gr",
        nameRus: "Греция"
    },
    {
        short: "br",
        nameRus: "Бразилия"
    },
    {
        short: "be",
        nameRus: "Бельгия"
    },
    {
        short: "cg",
        nameRus: "Конго"
    },
    {
        short: "cu",
        nameRus: "Куба"
    },
    {
        short: "ee",
        nameRus: "Эстония"
    },
    {
        short: "hu",
        nameRus: "Венгрия"
    },
    {
        short: "ke",
        nameRus: "Кения"
    },
    {
        short: "jm",
        nameRus: "Ямайка"
    },
    {
        short: "nl",
        nameRus: "Нидерланды"
    },
    {
        short: "pt",
        nameRus: "Португалия"
    },
    {
        short: "se",
        nameRus: "Швеция"
    },
    {
        short: "uy",
        nameRus: "Уругвай"
    },
    {
        short: "it",
        nameRus: "Италия"
    }
];

// <h1>Drag and Drop</h1>
//   <h2>Вариант практического применения</h2>

//   <div class="example">
//     <h3>Выберите услуги:</h3>
//     <div class="services-list" id="services-list">
//       <a href="#" draggable="true" class="services-list__item" id="service_1">Замена матрицы</a>
//       <a href="#" draggable="true" class="services-list__item" id="service_2">Замена экрана</a>
//       <a href="#" draggable="true" class="services-list__item" id="service_3">Замена батареи</a>
//       <a href="#" draggable="true" class="services-list__item" id="service_4">Замена клавиатуры</a>
//       <a href="#" draggable="true" class="services-list__item" id="service_5">Замена радиатора</a>
//       <a href="#" draggable="true" class="services-list__item" id="service_6">Чистка ноутбука</a>
//       <a href="#" draggable="true" class="services-list__item" id="service_7">Переустановка программ</a>
//       <a href="#" draggable="true" class="services-list__item" id="service_8">Утилизация</a>
//     </div>
//     <div class="services-list" id="services-choice"></div>

//     <div class="button">
//       <button class="final">Заказать</button>
//     </div>
//   </div>

//   <script>
//     {/* const services = {};
//     const btnFinal = document.querySelector(".final");
//     const servicesDiv = document.getElementById("services-list");
//     const choiceDiv = document.getElementById("services-choice");
//     const servicesList = document.getElementsByClassName("services-list__item");

//     /*console.log("servicesDiv:", servicesDiv);
//     console.log("choiceDiv:", choiceDiv);*/

//     btnFinal.disabled = true;

//     choiceDiv.addEventListener("dragover", function(event) {
//       event.preventDefault();
//       this.classList.add("parent-over");
//     });

//     choiceDiv.addEventListener("dragleave", function(event) {
//       this.classList.remove("parent-over");
//     });

//     choiceDiv.addEventListener("drop", function(event) {
//       event.preventDefault();
//       dropElement.call(this);
//     });

//     servicesDiv.addEventListener("dragover", function(event) {
//       event.preventDefault();
//       this.classList.add("parent-over");
//     });

//     servicesDiv.addEventListener("dragleave", function(event) {
//       this.classList.remove("parent-over");
//     });

//     servicesDiv.addEventListener("drop", function(event) {
//       event.preventDefault();
//       dropElement.call(this);
//     });

//     for (let i = 0; i < servicesList.length; i++) {
//       servicesList[i].addEventListener("dragstart", function(event) {
//         this.classList.add("dragging");
//         event.dataTransfer.setData("text", event.target.id);
//         event.dataTransfer.setData("content", event.target.textContent);
//       });

//       servicesList[i].addEventListener("dragend", function(event) {
//         this.classList.remove("dragging");
//       });
//     }

//     function dropElement() {
//       let data = event.dataTransfer.getData("text");
//       let content = event.dataTransfer.getData("content");

//       // console.log("this on drop event:", this);

//       if (this === choiceDiv && !(data in services)){
//         services[data] = content;
//       }

//       if (this === servicesDiv){
//         delete services[data];
//       }

//       this.append(document.getElementById(data));

//       btnFinal.disabled = (Object.keys(services).length > 0) ? false : true;

//       choiceDiv.classList.remove("parent-over");
//       servicesDiv.classList.remove("parent-over");

//       /*console.log(services);*/
//     }

//     btnFinal.addEventListener("click", function(event) {
//       event.preventDefault();

//       console.log("services:", services);

//       const serviceslist = Object.values(services).join(" \n");

//       console.log(serviceslist);

//       if (confirm("Вы точно хотите заказать следующие услуги?\n" + serviceslist)) {
//         console.log(Object.keys(services));
//       }
//     });
//   </script> */}