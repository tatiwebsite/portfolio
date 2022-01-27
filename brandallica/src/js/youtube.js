window.addEventListener('DOMContentLoaded', function(){

//Cookies

    const ticker = document.querySelector('.footer__animate'),
          outlineBrand = document.querySelector('.target-audience__svg'),
          outlineWhy = document.getElementById('outlineWhy'),
          outlineWhat = document.getElementById('outlineWhat'),
          outlineAbout = document.querySelector('.about-us'),
          outlinePromo = document.querySelector('.promo'),
          youtubeShadow = document.querySelector('.Layer1'),
          svgBlock = document.querySelector('.our-team__image');     
          

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
            ticker.classList.add('footer__animate_youtube');
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

if (outlineWhy) {
    function animateOutlineTeam() {
        outlineWhy.classList.add('our-clients__svg_animate');
    }
    
    function animateOutlineTeamByScroll () {
        const topOutlineTeam = outlineAbout.offsetHeight;
        if(window.pageYOffset + 840 >= topOutlineTeam) {
            animateOutlineTeam();
            window.removeEventListener('scroll', animateOutlineTeamByScroll); 
        }
    }
    window.addEventListener('scroll', animateOutlineTeamByScroll);
    
}

if (outlineWhat) {
    function animateOutlineTeam() {
        outlineWhat.classList.add('our-clients__svg_animate');
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

