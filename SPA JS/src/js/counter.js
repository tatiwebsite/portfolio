function counter(clickCount){
    return function(){
        clickCount ++;
        return clickCount;
    };
}
export default counter;