
const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
                        .split(';')
                        .map(cookie => cookie.split('='))
                        .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});
        return cookies[key];
    },
    setItem: function(key, value) {
        document.cookie = `${key}=${value}; expires=Sun, 16 Jul 3567 06:23:41 GMT`;
    }
};


const storageType = cookieStorage;
const consentPropertyType = 'site_consent';

const shouldShowPopup = () => !storageType.getItem(consentPropertyType);
const saveToStorage = () => storageType.setItem(consentPropertyType, true);

const consentOpenType = 'welcome_open';

const shouldShowWelcome = () => !storageType.getItem(consentOpenType);
const saveToStorageWelcome = () => storageType.setItem(consentOpenType, true);

window.addEventListener('DOMContentLoaded', function(){

//Cookies

    const popupCookie = document.querySelector('.cookies'),
          cookieAgree = document.querySelector('.cookies__agree'),
          cookieNot = document.querySelector('.cookies__not'),
          welcome = document.querySelector('.welcome-screen'),
          ticker = document.querySelector('.footer__animate'),
          outlineBrand = document.querySelector('.target-audience__svg'),
          outlineTeam = document.querySelector('.our-clients__svg'),
          outlineAbout = document.querySelector('.about-us'),
          outlinePromo = document.querySelector('.promo'),
          promoAnimate = document.querySelectorAll('.promo__animate'),
          promoAnimateDelay = document.querySelectorAll('.promo__animatedelay'),
          youtubeShadow = document.querySelector('.Layer1'),
          svgBlock = document.querySelector('.our-team__image');     
          

          if(welcome){
            welcome.style.height = window.innerHeight + "px";

            window.addEventListener("orientationchange", e => {
                if (document.body.offsetWidth < 768) welcome.style.height = window.innerHeight + "px";
            }, false);
            
            window.addEventListener("resize", e => {
                    if (document.body.offsetWidth < 768) welcome.style.height = window.innerHeight + "px";
            }, false);
          }
          

          
    
//WelcomeSave
    if (shouldShowWelcome()) {
        welcome.classList.add('welcome-screen_open');
        promoAnimate.forEach((item, i) => {
            promoAnimate[i].style.display = 'none';
        });
        promoAnimateDelay.forEach((item, i) => {
            promoAnimateDelay[i].style.display = 'inline-block';
        });
    }
    if(welcome) {
        if (welcome.classList.contains('welcome-screen_open')) {
            saveToStorageWelcome();
        }
    }
    

   


//CookieSave
    if (shouldShowPopup()) {
        popupCookie.classList.add('cookies_active');
    }

    cookieAgree.addEventListener('click', () => {
        saveToStorage();
        popupCookie.classList.remove('cookies_active');
    });

    cookieNot.addEventListener('click', () => {
        popupCookie.classList.remove('cookies_active');
    });
    


if(ticker){
    window.addEventListener('scroll', tickerAnimate);
    function tickerAnimate(){
        const tickerHeight = ticker.offsetHeight;
        const tickerTop = ticker.getBoundingClientRect().top;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const tickerOffset = tickerTop + scrollTop;
        const tickerAnimStart = 5;

        let tickerAnimPoint = window.innerHeight - tickerHeight / tickerAnimStart;

        if(tickerHeight > window.innerHeight) {
            tickerAnimPoint = window.innerHeight - window.innerHeight / tickerAnimStart;
        }

        if((pageYOffset > tickerOffset - tickerAnimPoint) && pageYOffset < (tickerOffset + tickerHeight)){
            ticker.classList.add('footer__animate_on');
        } 

    }
}

//Animate Outline

if(outlineBrand) {
    function animateOutlineBrand() {
        outlineBrand.classList.add('target-audience__svg_animate');
    }
    
    function animateOutlineBrandByScroll () {
        const topOutlineBrand = outlinePromo.offsetHeight;
    
        if(window.pageYOffset + 180 >= topOutlineBrand) {
            animateOutlineBrand();
            window.removeEventListener('scroll', animateOutlineBrandByScroll); 
        }
    }
    window.addEventListener('scroll', animateOutlineBrandByScroll);
}

if (outlineTeam) {
    function animateOutlineTeam() {
        outlineTeam.classList.add('our-clients__svg_animate');
    }
    
    function animateOutlineTeamByScroll () {
        const topOutlineTeam = outlineAbout.offsetHeight;
        if(window.pageYOffset + 40 >= topOutlineTeam) {
            animateOutlineTeam();
            window.removeEventListener('scroll', animateOutlineTeamByScroll); 
        }
    }
    window.addEventListener('scroll', animateOutlineTeamByScroll);
    
}

//Animate Shadow

if(youtubeShadow){
        window.addEventListener('scroll', animShadow);
        function animShadow(){
            const shadowHeight = svgBlock.offsetHeight;
            const shadowTop = svgBlock.getBoundingClientRect().top;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const shadowOffset = shadowTop + scrollTop;
            const shadowAnimStart = 1;
    
            let shadowAnimPoint = window.innerHeight - shadowHeight / shadowAnimStart;
    
            if(shadowHeight > window.innerHeight) {
                shadowAnimPoint = window.innerHeight - window.innerHeight / shadowAnimStart;
            }
    
            if((pageYOffset > shadowOffset - shadowAnimPoint) && pageYOffset < (shadowOffset + shadowHeight)){
                youtubeShadow.classList.add('Layer1_animate');
            } else {
                youtubeShadow.classList.remove('Layer1_animate');
            }

        }
    }
    


});

