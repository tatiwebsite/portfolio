import CreatePage from "./pages";
import getResource from "./get-db";

class StudiesPage extends CreatePage{
    constructor(){
        super('studies-page', "Давай учиться вместе!");
    }
    //Создаю метод, который будет рендерить карточки на странице. 
    ////Получаю данные с firebase внутри метода, вызывая функцию универсальную getResourse и передавая туда url моей базы данных.
    //Вызывая new CreateCards, создаются карточки и помещаются в контейнер wrapper, который потом помещается в container
    showCards(wrapper){
        if(wrapper){
            getResource('https://it-academy-project-fe695-default-rtdb.firebaseio.com/coutries.json')
            //получаю массив данных, перебираю его и деструктуризирую объекты внутри. 
            //Передаю их в карточки и вызываю render
            .then(data => {
                data.forEach(({shortname, title, descr, capital, currency}) => {
                    new CreateCards(wrapper,shortname, title, descr, capital, currency).render();
                });
            });
            this.container.append(wrapper);
        } 
    }
}      

class CreateCards {
    constructor(container, shortname, title, descr, capital, currency){
        this.container = container;
        this.shortName = shortname;
        this.currency = currency;
        this.title = title;
        this.descr = descr;
        this.capital = capital;
    }

    //Метод по рендеру карточек на основании полученного объекта и короткого имени страны для отображения флагов
    render(){
        if(document.querySelector('.studies-wrapper')){
            this.container = document.querySelector('.studies-wrapper');
            const card = document.createElement('div');
            card.classList.add('studies-card');
            
            card.innerHTML = `
                <div class="studies-front">
                    <h2 class="studies-subtitle">${this.title}</h2>
                    <div class="studies-photo">
                        <img src="https://www.countryflags.io/${this.shortName}/shiny/64.png">
                    </div>
                    <div class="studies-touch">Наведи на меня</div>

                </div>
                <div class="studies-back">
                    <h3 class="studies-subtitle">Столица - ${this.capital}</h3>
                    <p class="studies-descr">${this.descr}</p>
                    <p class="studies-currency">Государственная валюта - ${this.currency}</p>
                </div>
            `;
            this.container.append(card);
        }
        
    }
}

export default StudiesPage;