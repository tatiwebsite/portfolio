'use strict';

import "./style.scss";
import { createHeader } from "./js/header";
import { pages } from "./js/common";
import MainPage from "./js/main-page";
import { createFooter } from "./js/footer";
import StudiesPage from "./js/studies-page";
import TestCapitalPage from "./js/test-capital-page";
import TestFlagPage from "./js/test-flag-page";
import LoginPage from "./js/login-page";
import MistakePage from "./js/404-page";


//Проверяю, залогинен ли юзер. результат передаю в переменную.
//Потом от этого будет зависеть, какую страницу первой показывать и потом при изменениях location
const shouldShowLogin = () => !localStorage.getItem('user');

window.addEventListener('DOMContentLoaded', function(){
    const body = document.querySelector('body');
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');
    const header = document.createElement('header');
    header.classList.add('header');
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const mainSection = document.createElement('main');
    const studiesWrapper = document.createElement('div');
    studiesWrapper.classList.add('studies-wrapper');
    const flagsWrapper = document.createElement('div');
    flagsWrapper.classList.add('flags-wrapper');
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main-wrapper');
    body.append(header);
    body.append(mainContainer);
    body.append(footer);
    mainContainer.append(mainSection);

    //Независимо от регистрации пользователя отображаю шапку.    
    //Передавая аргументом сам header и массив с данными для страницы const pages

    createHeader(header, pages);
    createFooter(footer);

     //Вешаю обработчик на window для отслеживания обновления страницы. При изменении - рендерим страницы
     //Какую страницу показывать зависит от того, залогинелся юзер или нет

    window.addEventListener('hashchange', () => {
        if(!shouldShowLogin()){
            let id = window.location.hash;
            showPage(id);
        } else {
            window.location.hash = '#login-page';
            showPage('#login-page');
        }    
    });

    //Вешаю обработчик на window для отслеживания перезагрузки страницы. При изменении - рендерится страница, хэш которой лежит в location
     //Какую страницу показывать зависит от того, залогинелся юзер или нет
    window.addEventListener('load', () => {
        if(!shouldShowLogin()){
            let id = window.location.hash;
            if(id === ''){
                window.location.hash = '#main-page';
            }
            showPage(id);
        } else {
            window.location.hash = '#login-page';
            showPage('#login-page');
        }    
    });
    
    
    const links = header.querySelectorAll('li a');
    links.forEach((link) => {
        link.addEventListener('click', () => {
            if(!shouldShowLogin()){
                let id = link.getAttribute('href');
                showPage(id);
            } else {
                showPage('#login-page');
            }    
        });
    });

    //Функция по отображению страниц. 
    //Делаю slice(1), чтобы убрать # и получить идентификатор, по которому понятно, какую страницу создавать
    //По умолчанию открываю страницу логина 
    function showPage(id){
        if(id.slice(1) === 'studies-page'){
            studiesWrapper.innerHTML = '';
            const ShowStudiesPage = new StudiesPage();
            ShowStudiesPage.render();
            ShowStudiesPage.showCards(studiesWrapper);
        } else if(id.slice(1) === 'test-capital-page'){
            const ShowTestCapitalPage = new TestCapitalPage();
            ShowTestCapitalPage.render();
            ShowTestCapitalPage.showTests();
        } else if(id.slice(1) === 'test-flag-page'){
            const ShowTestFlagPage = new TestFlagPage();
            ShowTestFlagPage.render();
            ShowTestFlagPage.showCards(flagsWrapper);
        } else if(id.slice(1) === 'main-page'){
            mainWrapper.innerHTML = '';
            const ShowMainPage = new MainPage();
            ShowMainPage.render();
            ShowMainPage.showCards(mainWrapper, pages);
        }  else if(id.slice(1) === 'login-page'){
            const ShowLoginPage = new LoginPage();
            ShowLoginPage.render();
            ShowLoginPage.showLoginCard();
        } else {
            const ShowMistakePage = new MistakePage();
            ShowMistakePage.render();
        }
    }
});
