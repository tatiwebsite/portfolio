export function createFooter(container){

    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('footer-wrapper');

    footerWrapper.innerHTML = `
        <a href="https://www.linkedin.com/in/tatsiana-khatskevich-70a0021a4/" target="blank" class="footer-link">Created by Tatsiana Khatskevich</a>
    `;

    container.prepend(footerWrapper);
}