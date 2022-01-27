import CreatePage from "./pages";

class LoginPage extends CreatePage{
    constructor(){
        super('login-page', "");
    }
    showLoginCard(){
        const loginWrapper = document.createElement('div');
        loginWrapper.classList.add('login-wrapper');
        loginWrapper.innerHTML = `
            <h2 class="login-title">Ну что? Поехали?</h2>
            <form action="" id="login-form" class="login-form">
                <input type="text" id="login-name" class="login-input" placeholder="Твоё имя" required>
                <input type="email" id="email" class="login-input" placeholder="Электронная почта" required>
                <input type="password" id="password" class="login-input" autocomplete="on" placeholder="Пароль" required>
                <div class="login-btns">
                    <button type="submit" id="loginBtn" class="login-enter">Вход</button>
                    <button type="submit" id="regBtn" class="login-register">Регистрация</button>
                </div>
            </form>
        `;
        const form = loginWrapper.querySelector('.login-form');
        this.container.append(loginWrapper);
        this.authForm(form);
    }
    authForm(form){
        const regBtn = form.querySelector('.login-register');
        const loginBtn = form.querySelector('.login-enter');
        loginBtn.addEventListener('click', authInFirebase);
        regBtn.addEventListener('click', regInFirebase);
    }
}

function authInFirebase(event){
    event.preventDefault();
    const user = {
        email: document.querySelector('#email').value,
        loginName: document.querySelector('#login-name').value,
    };
    let password = document.querySelector('#password').value;
    const key = 'AIzaSyDpoezvXv_8t-KhaBxBKOF9PWe2Mur4wCc';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
        method: 'POST',
        body: JSON.stringify({
            email: user.email,
            password: password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => setStorage(data, user));

}

function setStorage(data, user){
    if(data.idToken){
        localStorage.setItem('user', JSON.stringify(user));
        window.location.hash = '#main-page';  
        console.log(localStorage.getItem(`${user.loginName}`));
    }
}

function cleanData(){
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#login-name').value = '';
}

function regInFirebase(event){
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const key = 'AIzaSyDpoezvXv_8t-KhaBxBKOF9PWe2Mur4wCc';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(setInFirebase());
}

function setInFirebase(){
    const user = {
        email: document.querySelector('#email').value,
        loginName: document.querySelector('#login-name').value,
        count: '0'
    };
    return fetch(`https://it-academy-project-fe695-default-rtdb.firebaseio.com/users/${user.loginName}.json`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(cleanData());
}

export default LoginPage;
