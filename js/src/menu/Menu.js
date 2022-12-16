class Menu extends Component {
    addEventListener() {
        document.querySelectorAll('.menu-item')
            .forEach(button => button.addEventListener('click',
                (event) => this.callbacks.showMenuItem(event.target.dataset.item)));
    }
}