import CreatePage from "./pages";
import { countriesFlags } from "./common";
import { shuffleArray } from "./common";
import getResource from "./get-db";


class TestFlagPage extends CreatePage{
    constructor(){
        super('test-flag-page', "Тест на флаги");
    }

    showCards(wrapper){
        if(wrapper){
            new CreateCards(wrapper).render();
            this.container.append(wrapper);
        } 
    }
}      

class CreateCards {
    constructor(container){
        this.container = container;
    }
    //Метод по рендеру карточек на основании полученного объекта. Короткое название и название на русском языке
    render(){
        this.container.innerHTML = '';

        //Кнопка для проверки ответа
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('flag-btn');
        checkBtn.textContent = 'Проверить!';

        const helpBtn = document.createElement('button');
        helpBtn.classList.add('flag-help');
        helpBtn.textContent = 'Подсказка!';

        const newBtn = document.createElement('button');
        newBtn.classList.add('flag-btn-new');
        newBtn.textContent = 'Новый уровень!';

        //Шафлю массив с названиями стран и создаю массив из 4 элементов для карточек
        let shuffleFlags = shuffleArray(countriesFlags);
        let shuffleFlagsForRender = shuffleFlags.slice(1, 5);
        
        //Перебираю массив и деструктуризирую объекты внутри. 
        //Передаю их в карточки для рендера каждой
        shuffleFlagsForRender.forEach(({short, nameRus}) => {
            this.renderCards(short, nameRus);
        });
        this.container.append(newBtn);
        this.container.append(checkBtn);
        this.container.append(helpBtn);

        //Вызываю метод по проверке ответов
        this.checkAnswersAndHelp(checkBtn, helpBtn, newBtn);
    }
    renderCards(short, nameRus){
        const flagsInner = document.createElement('div');
        flagsInner.classList.add('flags-inner');
        if(this.container){
            flagsInner.innerHTML += `
                <div class="flag-block" data-short="${short}">
                    <div class="flag-choice" data-short="${short}">
                        <img src="https://www.countryflags.io/${short}/shiny/64.png" alt="">
                    </div>
                    <div class="flag-name" data-short="${short}">${nameRus}</div>
                </div>
                <div class="flag-enter">
                    <input class="flag-input" type="text" placeholder="Чей флаг?">
                </div>
            `; 
        }
        this.container.append(flagsInner);
        return this.container;
    }
    checkAnswersAndHelp(checkBtn, helpBtn, newBtn){
        this.checkBtn = checkBtn;
        this.helpBtn = helpBtn;
        this.newBtn = newBtn;
        let flagBlocks = this.container.querySelectorAll('.flags-inner');
        let input = this.container.querySelector('.flag-input');

        this.checkBtn.addEventListener('click', ()=> {
            flagBlocks.forEach((item) => {
                let inputVal = item.querySelector('.flag-input').value.toLowerCase();
                let trueCountry = item.querySelector('.flag-name');
                let trueCountryName = trueCountry.textContent.toLowerCase();
                trueCountry.classList.add('open');
                if(inputVal !== trueCountryName){
                    item.classList.add('mistake');
                }
            });
        }); 

        this.helpBtn.addEventListener('click', ()=> {
            flagBlocks.forEach((item) => {
                let inputVal = item.querySelector('.flag-name');
                let timerId = setInterval(showHelp, 1000);
                function showHelp(){
                    inputVal.classList.toggle('open');
                }
                setTimeout(() => {
                    clearInterval(timerId);
                }, 4000);
            });
        }); 

        this.newBtn.addEventListener('click', () => {
            this.render();
        });
    }
}

export default TestFlagPage;


