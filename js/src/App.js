class App extends Component {
    constructor(props) {
        super(props);
        
        this.menu = new Menu({
            id: 'menu',
            parent: this.id,
            template: template.Menu,
            callbacks: {
                showMenuItem: (name) => this.showMenuItem(name)
            }
        });
        this.component1 = new Target({ id: 'component1', parent: this.id, template: template.Target });
        this.component2 = new Component({id: 'component2', parent: this.id})
        this.component3 = new Component({id: 'component3', parent: this.id})
        this.component4 = new Component({id: 'component4', parent: this.id})

        this.component2.hide();
        this.component3.hide();
        this.component4.hide();
    }
    showMenuItem(name) {
        this.component1.hide();
        this.component2.hide();
        this.component3.hide();
        this.component4.hide();
        this[name].show();
    }
}