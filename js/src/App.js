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
        this.componentList = [
            new Target({ id: 'Target', parent: this.id, template: template.Target }),
            new Graph3D({ id: 'Graph3D', parent: this.id, template: template.Graph3D }),
            new Component({ id: 'component3', parent: this.id }),
            new Component({ id: 'component4', parent: this.id })
        ];
    }
    showMenuItem(name) {
        this.componentList.forEach(comp => comp.hide());
        this.componentList.find(comp => comp.id === name).show();
    }
}