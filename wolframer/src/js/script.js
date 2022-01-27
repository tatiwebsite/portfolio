'use strict';

const mySwiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true,
  slidesPerView: 1,
  centeredSlides: false,
  slidesPerGroup: 1
});

const swiperPrev = document.getElementById('swiperPrev');
const swiperNext = document.getElementById('swiperNext');

if(swiperPrev && swiperNext){
  swiperPrev.addEventListener('click', () => {
    mySwiper.slidePrev();
    });
    
    swiperNext.addEventListener('click', () => {
    mySwiper.slideNext();
    });
} 

window.addEventListener('DOMContentLoaded', () => {
  //Active menu item
  let locWindow = window.location.pathname.slice(1);
  let linksNav = document.querySelectorAll('.menu__link');
  linksNav.forEach(link => {
    if(link.dataset.path){
      if(locWindow == link.dataset.path){
        link.closest('li').classList.add('active');
      } else {
        link.closest('li').classList.remove('active');
      }
    }
  });

  let slides = document.querySelectorAll('.about-slide'),
    closePopup = document.querySelector('.about-goals__close'),
    openNotice = document.querySelector('.private-col__notice'),
    closeNotice =  document.querySelector('.notification__close'),
    controlVersionBtn = document.querySelector('.control-bar__control'),
    routerItem = document.querySelectorAll('.router__item'),
    routerItemClose = document.querySelector('.router__popup-cancel'),
    searchCompanyBlock = document.querySelector('.functions-row'),
    statusApproval = document.querySelectorAll('.status-approval'),
    filterButton = document.querySelector('.functions-actions__filter'),
    watchGoal = document.querySelectorAll('.risks-item__watch'),
    openDropdown = document.querySelectorAll('.open-btn'),
    checkSelect = document.querySelectorAll('.check-select'),
    tagsSection = document.querySelector('.settings-tags__section'),
    tagsFilterSection = document.querySelectorAll('.settings-tags-filter__section'),
    searchInputs = document.querySelectorAll('.settings-tags-filter__add-tag'),
    promoVideo = document.querySelector('.promo-goals__overlay'),
    openVideo = document.querySelector('.promo-goals__open'),
    closeVideo = document.querySelector('.promo-goals__close-video');
        
  
        //Добавление/удаление тэгов
        if(tagsSection){
          tagsSection.addEventListener('click',(e) => {
            if(e.target && e.target.classList.contains('settings-tags__close')){
              let closeItem = e.target.closest('.settings-tags__item');
              closeItem.classList.add('hide');
            } 
          });
          let input = document.querySelector('.settings-tags__add-tag');
          input.addEventListener('focus', () => {
            let list = document.querySelector('.settings-tags__list');
            list.innerHTML += `<div class="settings-tags__item"><div class="settings-tags__tag"></div> 
            <span class="settings-tags__close">&times;</span></div>`;
          });
          input.addEventListener('input', () => {
            let list = document.querySelector('.settings-tags__list');
            let lastItem = list.lastChild.querySelector('.settings-tags__tag');
            lastItem.textContent = input.value;
          });
          input.addEventListener('blur', () => {
            input.value = '';
          });
        }

        //Открытие всех выпадающих меню (dropdown-menu)
        if(openDropdown){
          openDropdown.forEach(item => {
            item.addEventListener('click', () => {
              if(item.nextElementSibling.classList.contains('dropdown-menu')){
                item.nextElementSibling.classList.toggle('openmenu');
              }
            });
          });
        }

        //Открытие всех выпадающих select (dropdown-select)

        if(checkSelect){
          checkSelect.forEach(item => {
            item.addEventListener('click', () => {
              if(item.nextElementSibling.classList.contains('dropdown-select')){
                item.classList.toggle('openmenu');
                item.nextElementSibling.classList.toggle('openmenu');
              }
            });
          });
        }  
        
        if(slides){
          slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
              if(e.target && e.target.classList.contains('about-slide__more')){
                let moreDetails = e.target;
                let popUp = document.querySelector('.overlay-popup');
                popUp.classList.remove('hide');
                popUp.classList.add('open');
              }
            });
          });
        }
          
        if(closePopup){
          closePopup.addEventListener('click', () => {
            let popUp = document.querySelector('.overlay-popup');
            popUp.classList.remove('open');
            popUp.classList.add('hide');
          });
        }

        if(routerItem && routerItemClose){
          routerItem.forEach(item => {
            if(!item.classList.contains('router__item_disabled')){
              item.addEventListener('click',(e) => {
                if(e.target && e.target.classList.contains('router__plus')){
                  let openPopup = document.querySelector('.router__overlay');
                  openOverlay(openPopup);
                } 
              });
            }
          });
          routerItemClose.addEventListener('click', () => {
            let openPopup = document.querySelector('.router__overlay');
            closeOverlay(openPopup);
          })
        }

        if(searchCompanyBlock){
          searchCompanyBlock.addEventListener('click', (e) => {
            if(e.target && e.target.classList.contains('functions-actions__download')){
              let excelBlock = searchCompanyBlock.querySelector('.download-excel');
              openOverlay(excelBlock);
            } else if (e.target && e.target.classList.contains('checkbox-block__cancel')) {
              let excelBlock = searchCompanyBlock.querySelector('.download-excel');
              closeOverlay(excelBlock);
            }
          })
        }

        //Фильтр открыть
        if(filterButton){
            filterButton.addEventListener('click', () => {
            let filterParent = filterButton.closest('.functions-row'),
                filterBlock = filterParent.nextElementSibling;
            if(filterButton.classList.contains('active')){
              filterButton.classList.remove('active');
            closeOverlay(filterBlock);
            } else {
              filterButton.classList.add('active');
              openOverlay(filterBlock);
            }
          });
        }

         //Открыть видео

        if(openVideo){
          openVideo.addEventListener('click', () => {
            openOverlay(promoVideo);
          });

          closeVideo.addEventListener('click', () => {
            closeOverlay(promoVideo);
          });
        }

        if(openNotice){
          let noticeBlock = document.querySelector('.notification'),
              showAllNotifications = noticeBlock.querySelector('.notification__all');

          openNotice.addEventListener('click', ()=> {
            openModal(noticeBlock);
          });
          closeNotice.addEventListener('click', ()=> {
            closeModal(noticeBlock);
          });

          showAllNotifications.addEventListener('click', () => {
            let allNotifications = noticeBlock.querySelectorAll('.notification-item');
            allNotifications.forEach(item => {
              item.classList.remove('hide');
              item.classList.add('opened');
            });
            showAllNotifications.textContent = 'Свернуть';
          });
        }

        if(controlVersionBtn) {
          controlVersionBtn.addEventListener('click', () => {
            let versionWindow = document.querySelector('.versions-control');
            versionWindow.classList.toggle('opened');
          });
        }

        if(watchGoal){
          watchGoal.forEach(item => {
            item.addEventListener('click', () => {
              if(!item.classList.contains('to-hide')){
                openOverlay(item.nextElementSibling);
                item.classList.add('to-hide');
                item.textContent = 'Скрыть цель';
              } else {
                closeOverlay(item.nextElementSibling);
                item.classList.remove('to-hide');
                item.textContent = 'Посмотреть цель';
              }
              
            })
          });
        }

        //Стилизация статуса На согласовании
        if(statusApproval){
          statusApproval.forEach(item => {
            let statusParent = item.closest('.plan-wrapper');
            statusParent.classList.add('approval')
          });
        }

        function openModal(item){
          item.classList.add('opened');
        }
        function closeModal(item){
          item.classList.remove('opened');
        }

        function closeOverlay(item){
          item.classList.remove('open');
          item.classList.add('hide');
        }

        function openOverlay(item){
          item.classList.remove('hide');
          item.classList.add('open');
        }


    //Поиск тэга
    if(searchInputs){
      tagsFilterSection.forEach(tag => {
        tag.addEventListener('click',(e) => {
          let l = document.querySelector('.settings-tags-filter__list');
          if(e.target && e.target.classList.contains('settings-tags-filter__close')){
            let closeItem = e.target.closest('.settings-tags-filter__item');
            closeItem.classList.add('hide');
          } 
        });
      });
      
      searchInputs.forEach(input => {
        let newItem = document.createElement('div');
        newItem.classList.add('settings-tags-filter__item');

        input.addEventListener('input', function(){
          let val = this.value.trim();
          let activeTab = input.nextElementSibling,
              programms = activeTab.querySelectorAll('.tab-program__title');

      
          if(val != ''){
            if(activeTab.innerText.toLowerCase().search(input.value.toLowerCase()) == -1) {
                activeTab.classList.remove('active');  
            } else {
              activeTab.classList.add('active');
              let promptInputs = document.querySelectorAll('.settings-tags-filter__item-prompt.active');
              if(promptInputs.length != 0){
                promptInputs.forEach(prompt => {
                  prompt.addEventListener('click', () => {
                    let allList = prompt.closest('.settings-tags-filter__list');
                    
                    newItem.innerHTML = `<div class="settings-tags-filter__tag">${prompt.textContent}</div><span class="settings-tags-filter__close">&times;</span>`;
                    allList.prepend(newItem);
                    activeTab.classList.remove('active');
                    input.value = '';
                  });
                });
              }
            }
          }
          else {
            programms.forEach((item) => {
              item.classList.remove('hide');
            });
          }
        }); 
      });

      
      
      
        // tagsSection.addEventListener('click',(e) => {
        //   if(e.target && e.target.classList.contains('settings-tags-filter__close')){
        //     let closeItem = e.target.closest('.settings-tags-filter__item');
        //     closeItem.classList.add('hide');
        //   } 
        // });
        // let input = document.querySelector('.settings-tags__add-tag');
        // input.addEventListener('focus', () => {
        //   let list = document.querySelector('.settings-tags__list');
        //   list.innerHTML += `<div class="settings-tags__item"><div class="settings-tags__tag"></div> 
        //   <span class="settings-tags__close">&times;</span></div>`;
        // });
        // input.addEventListener('input', () => {
        //   let list = document.querySelector('.settings-tags__list');
        //   let lastItem = list.lastChild.querySelector('.settings-tags__tag');
        //   lastItem.textContent = input.value;
        // });
        // input.addEventListener('blur', () => {
        //   input.value = '';
        // });
     
    }


    //Accordeon
    let acc = document.querySelectorAll(".accordeon-item");
      acc.forEach(function (item, i, arr) {
        item.addEventListener("click", function() {
            toggleAcc(item);
            let childButton = item.firstChild;
            childButton.classList.toggle('active');
        });
      });
  
      function toggleAcc(tab) {
        if(tab.closest('div').nextElementSibling){
          let answer = tab.closest('div').nextElementSibling,
              itemParent = tab.closest('ul'),
              itemParentParent = answer.closest('ul'),
              itemDoubleParent = itemParentParent.closest('ul');
              tab.classList.add('active');
              itemParent.classList.add('active');

          if (answer.style.maxHeight && answer.style.maxHeight != "0px"){
            answer.style.maxHeight = 0;
            tab.classList.remove('active');
            itemParent.classList.remove('active');
          } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            let itemParentHeight = itemParent.style.maxHeight;
            let itemParentHeightNum = null;
            if(itemParentHeight){
              itemParentHeightNum = itemParentHeight.match(/\d+/g).join('');
              let answerHeight = answer.style.maxHeight.match(/\d+/g).join('');
              let answerHeightNum = answerHeight.match(/\d+/g).join('');
              itemParent.style.maxHeight = itemParentHeightNum + answerHeightNum + "px";
            }
            tab.classList.add('active');
            itemParent.classList.add('active');
          } 
        }
      }
  });
