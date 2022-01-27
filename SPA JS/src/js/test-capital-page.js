import CreatePage from "./pages";
import getResource from "./get-db";
import counter from "./counter";
import { shuffleArray } from "./common";

class TestCapitalPage extends CreatePage{
    constructor(){
        super('test-capital-page', "");
    }  
    showTests(){
        const wrapper = document.createElement('div');
        wrapper.classList.add('test-wrapper');
        new CreateQuestion(wrapper).getData();
        this.container.append(wrapper);
    }
}

class CreateQuestion {
    constructor(container){
        this.container = container;
    }

    //Получение данных с сервера и  передача в метод по шафлу массива
    getData(){
        getResource('https://it-academy-project-fe695-default-rtdb.firebaseio.com/coutries.json')
        .then(json => this.createArray(json));
    }
    //Получаю массив всех значений и шафлю его. Для того, чтобы порядок карточек всегда был разный 
    createArray(json){
        let dataBase = Object.values(json);
        let dataArray = shuffleArray(dataBase);
        this.createEntry(dataArray);
    }

    createEntry(dataArray){
        //Создаем приветственную страницу по клику на кнопку. Дальше страницы будут по массиву идти в методе
        const playName = document.createElement('h2');
        let userJSON = localStorage.getItem('user');
        let user = JSON.parse(userJSON);

        console.log(user);
        playName.classList.add('entry-title');
        playName.textContent = `Привет, ${user.loginName}!!! Нажимай "Старт" и покажи свои знания!`;
        const btnEntry = document.createElement('button');
        btnEntry.classList.add('entry-button');
        btnEntry.textContent = 'Старт';
        //По клику на Старт рендерится первая страница
        btnEntry.addEventListener('click', () => {
            this.render(dataArray);
        });
        this.container.append(playName);
        this.container.append(btnEntry);
    }

    //Метод по рендеру карточек на основании полученного объекта
    render(dataArray){
        this.container.innerHTML = '';
        //Создаю необходимые обертки
        const innerTest = document.createElement('div');
        innerTest.classList.add('test-inner');
        const innerResults = document.createElement('div');
        innerResults.classList.add('test-results');
        //отображаем первую страницу. Остальные страницы рендерятся по кнопке След вопрос.
        //Передаю сам массив данных, первый элемент для первой страницы, обертку
        this.renderNextTest(dataArray, dataArray[0], innerTest, innerResults);
        this.createNextTest(dataArray, innerTest, innerResults);
    }

    //Метод создает кнопку След вопрос. И по счетчику отображает след карточки.
    //Когда массив закончится - кнопка поменяет текст на "Результаты"
    createNextTest(dataArray, innerTest, innerResults){
        console.log(this.container);
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('button-next');
        nextBtn.textContent = 'Следующий вопрос';
        const testPoints = document.createElement('div');
        testPoints.classList.add('test-points');
        let clickBtn = counter(0);
        nextBtn.disabled = true;

        nextBtn.addEventListener('click', () => {
            let item = dataArray[clickBtn()];
                if(item){
                    nextBtn.disabled = true;
                    this.renderNextTest(dataArray, item, innerTest, innerResults);
                } else {
                    this.showResults(innerTest, testPoints, nextBtn);
                }   
        });
        innerResults.append(testPoints);
        innerResults.append(nextBtn);
        this.container.append(innerResults);
        this.container.append(innerTest);
    }

    //Метод создания след карточки с вопросом
    renderNextTest(dataArray, item, innerTest, innerResults){
        innerTest.innerHTML = ' ';
        const answersInner = document.createElement('div');
        answersInner.classList.add('test-answers');
        const testHeader = document.createElement('div');
        testHeader.classList.add('test-header');

        //Создаю массив столиц, в который запушу отдельно столицы
        let capitals = [];
        dataArray.forEach((onecapital) => {
            capitals.push(onecapital.capital);
        });
        //Шафлю массив столиц, чтобы при пуше элемента в итоговый массив для кнопок были разные столицы
        let sortCapitals = shuffleArray(capitals);
        //Создаю массив столиц, который и пойдет в кнопки. 1 правильный + 3 неправильных
        let resultCapitals = [];
        resultCapitals.push(item.capital);
        let numderOfAnswers = 4;
        
        sortCapitals.forEach((capital) => {
            if(resultCapitals.length < numderOfAnswers) {
                if(capital !== item.capital) {
                    resultCapitals.push(capital);
                }
            } else return resultCapitals;
        });
        
        //Шафлю итоговый массив, чтобы порядок кнопок был разный
        let arrayForBtns = shuffleArray(resultCapitals);

        const html = arrayForBtns.map((elem) => {
            if(elem === item.capital){
                return `<button class="button-answer" data-answer="yes">${elem}</button>`
            } else {
                return `<button class="button-answer" data-answer="no">${elem}</button>`
            }
        });

        const testButtons = document.createElement('div');
        testButtons.classList.add('test-buttons');
        testButtons.innerHTML = `${html.join('')}`;

        testHeader.innerHTML = `
            <h2 class="test-question">Отметьте правильно столицу следующего государства/страны: <dr><span>${item.title}</span></h2>
            <div class="test-photo"><img src="./public/${item.shortname}.jpg" alt="capital"></div> 
            `;
        answersInner.innerHTML = `
            <div class="test-variants">Варианты ответов:</div> 
            <div class="test-buttons">${html.join('')}</div>  
        `;
        
        innerTest.append(testHeader);
        innerTest.append(answersInner);
        this.container.append(innerTest);
        this.findEvents(answersInner, innerResults);
    }

    findEvents(wrapper, innerResults){       
        wrapper.addEventListener('click', (event) => {
            const buttonsAnswers = wrapper.querySelectorAll('.button-answer');
            const testPoints = innerResults.querySelector('.test-points');
            const buttonNext = innerResults.querySelector('.button-next');
            if(event.target && event.target.classList.contains('button-answer')){
                let dataAttribute = event.target.getAttribute('data-answer');
                if(dataAttribute === 'yes'){
                    buttonNext.disabled = false;
                    event.target.textContent = 'Правильно!';
                    testPoints.innerHTML += `<span class="point_yes"></span>`;
                    buttonsAnswers.forEach((button) => {
                        button.disabled = 'true';
                    });
                    const trueSound = new Audio('./public/true-answer.mp3');
                    trueSound.play(); 
                } else {
                    buttonNext.disabled = false;
                    event.target.textContent = 'ОЙ! Ошибочка!';
                    testPoints.innerHTML += `<span class="point_no"></span>`;
                    buttonsAnswers.forEach((button) => {
                        button.disabled = 'true';
                    });
                    window.navigator.vibrate(1000);
                    const wrongSound = new Audio('./public/wrong-answer.mp3');
                    wrongSound.play(); 
                }
            }
        }, {once: true});
    }

    showResults(innerTest, testPoints, nextBtn){
        nextBtn.textContent = 'Смотреть результат';
        nextBtn.addEventListener('click', () => {
            innerTest.innerHTML = '';
            nextBtn.disabled = true;
            const btnStatistic = document.createElement('button');
            btnStatistic.classList.add('test-btn-statistic');
            btnStatistic.textContent = 'Рейтинг';
            const trueAnswers = document.createElement('div');
            trueAnswers.classList.add('total-results');
            const allPoints = testPoints.querySelectorAll('span');
            let truePointsArr = [];
            allPoints.forEach((point) => {
                if(point.classList.contains('point_yes')){
                    truePointsArr.push(point);
                }
            });
            let truePoints = truePointsArr.length;
            if(truePoints <= 4){
                trueAnswers.innerHTML = `
                    <div class="total-inner">
                        <span class="true-answers">Такс, верных ответов у тебя <br> ${truePoints} из ${allPoints.length}</span>
                        <div class="total-answer" >Ты что? Совсем не проходил обучение? Кликай "Пройти обучение" и возвращайся</div>
                        <a class="total-link" href="#studies-page">Пройти обучение</a> 
                    </div>     
                `;
            } else if (truePoints > 4 && truePoints <= 7){
                trueAnswers.innerHTML = `
                    <div class="total-inner">
                        <span class="true-answers">Такс, верных ответов у тебя <br> ${truePoints} из ${allPoints.length}</span>
                        <div class="total-answer">Неплохо! Видно, что ты не новичок. Кликай "Пройти обучение" и возвращайся за ${allPoints.length} из ${allPoints.length}</div>
                        <a class='total-link' href="#studies-page">Пройти обучение</a> 
                    </div>
                `;
            } else if(truePoints > 7){
                trueAnswers.innerHTML = `
                    <div class="total-inner">
                        <span class="true-answers">Такс, верных ответов у тебя <br> ${truePoints} из ${allPoints.length}</span>
                        <div class="total-answer">Вот это поворот!!! Поздравляю!</div>
                        <a class='total-link' href="#main-page">Главная страница</a> 
                    </div>
                `;
            }
            innerTest.append(trueAnswers);
            innerTest.append(btnStatistic);
            this.showStatistic(innerTest, btnStatistic, truePoints);
        });
    }

    showStatistic(innerTest, btnStatistic, truePoints){
        btnStatistic.addEventListener('click', () => {
            let user = localStorage.getItem('user');
            let userData = JSON.parse(user);
            setInFirebase(innerTest, userData, truePoints);
        });
    }
}

function setInFirebase(innerTest, userData, countCapital){
    const user = {
        email: userData.email,
        loginName: userData.loginName,
        count: countCapital
    };
    return fetch(`https://it-academy-project-fe695-default-rtdb.firebaseio.com/users/${user.loginName}.json`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(getData(innerTest)); 
}

function getData(innerTest){
    getResource(`https://it-academy-project-fe695-default-rtdb.firebaseio.com/users.json`)
    .then(json => renderData(innerTest, json));
}

function renderData(innerTest, json){
    
    let resultsArray = Object.values(json);
    let statisticBlock = document.createElement('div');
    statisticBlock.classList.add('statistic-block');
    resultsArray.forEach(({count, loginName}) => {
        statisticBlock.innerHTML += `
            <div class="user-statistic">Пользователь ${loginName} набрал ${count} баллов</div>
        `;
    });
    innerTest.append(statisticBlock);
    console.log(statisticBlock);
}

export default TestCapitalPage;