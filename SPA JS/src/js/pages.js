//Создаю общий класс для рендера страниц, передавая туда id контейнера и title
class CreatePage{
    constructor(id, text){
        this.container = document.createElement('div');
        this.container.id = id;
        this.text = text;
    }

    render(){
        document.querySelector('main').innerHTML = '';
        const title = document.createElement('h1');
        title.classList.add('section-title');
        const main = document.querySelector('main');
        title.textContent = `${this.text}`;
        this.container.append(title);
        main.append(this.container);
        return this.container;
    }
}

export default CreatePage;











