const template = new Template();
window.onload = () => {
    const app = new App({ id: 'app', template: template.AppTemplate })
    app.componentList.forEach((comp, index) => { if (index !== 1) comp.hide() })
    // app.componentList[1].renderScene()
}