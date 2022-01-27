//Создаю главнуюс страницу
import CreatePage from "./pages";

class MainPage extends CreatePage{
    constructor(){
        super('main-page', "Главная страница");
    }
    //Метод по показу карточек. Передаю аргументами обертку и карточки предсозданные const pages
    showCards(wrapper, card){
        card = card;
        //Фильтрую входящие страницы, чтобы не показывать страницу Логин и нынешнюю страницу
        card = card.filter(item => item.id !== 'login-page' && item.id !== 'main-page');

        card.forEach((item) => {
            //Передаю по очереди элементы массива (они же объекты для каждой карточки)
            new CreateCategoriesCards(item, wrapper).render();
        });
        this.container.append(wrapper);
    }
}

//Класс по созданию карточек для главной страницы. Передается контейнер и объект с данными одной страны

class CreateCategoriesCards{
    constructor(item, container){
        this.item = item;
        this.container = container;
    }

    render(item){
        const newCard = document.createElement('div');
        newCard.classList.add('check-card');
        newCard.innerHTML = `
            <div class="card-image">
                <img src="${this.item.image}" alt="points">
            </div>
            <div class="card-info">
                <h2 class="card-title">${this.item.title}</h2>
                <a class="card-button" href="#${this.item.id}">Перейти</a>
            </div>
        `;
        this.container.append(newCard);
    }
}

export default MainPage;
