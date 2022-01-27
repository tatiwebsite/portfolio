//Создаю шапку, построением верстки

export function createHeader(container, array){

    array = array.filter(item => item.id !== 'login-page');

    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header-wrapper');

    const links = array.map(((link) => `
        <li><a class='${link.id}' href="#${link.id}">${link.title}</a> </li>
        `)).join(' ');

    headerWrapper.innerHTML = `
        <div class="burger">
            <div class="burger-inner">
                <img src="./public/points.svg" alt="points">
            </div>
        </div>
        <div class="logo">GEOGRAPHY OF THE WORLD</div>
        <div class="navigation">
            <span class="navigation-close">&#10006;</span>
            <ul class="menu">
                ${links}
            </ul>
        </div>
        <div class="login">
            <img src="./public/login.svg" alt="login">
        </div>
    `;
    container.append(headerWrapper);
    
    headerWrapper.querySelector('.burger').addEventListener('click', ()=> {
        headerWrapper.querySelector('.navigation').classList.add('open');
    });

    headerWrapper.querySelector('.navigation-close').addEventListener('click', ()=> {
        headerWrapper.querySelector('.navigation').classList.remove('open');
    });
    
    headerWrapper.querySelector('.login').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.hash = '#login-page';
        onload();
    });

    
}

function onload(){
    window.addEventListener('hashchange', () => {

    });
}
    



// function createHeader(container){
//     const pages = [
//         {"main-page": "Главная"},
//         {"studies-page": "Давай научу"},
//         {"test-capital-page": "Тест на столицы"},
//         {"test-flag-page": "Тест на флаги"}
//     ];
  

//В аргумент передаем контейнер, в который будет append навигацию. Т.е. хэдер 
// export class CreateHeader {
//         constructor(pageId, text){
//             this.pageId = pageId;
//             this.text = text;
//         }
//         render(){
//             const p = document.querySelector('.header');
//             console.log(p);
//             const item = document.createElement('li');
//             const link = document.createElement('a');
//             link.innerText = `${this.text}`;
//             link.setAttribute('href', `#${this.pageId}`);
//             link.setAttribute('class', `${this.pageId}`);

//             // document.querySelector('.header').innerHTML += link;
//         }
//     }
//     new CreateHeader('main-page', 'Главная').render();
//     new CreateHeader('studies-page','Давай научу').render();
//     new CreateHeader('test-capital-page','Тест на столицы').render();
//     new CreateHeader('test-flag-page','Тест на флаги').render();



