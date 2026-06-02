class FormsValidation {
    constructor() {
        this.bindEvents();
}

    bindEvents() {
        document.addEventListener('blur', (event) => {
            console.log(event)
        }, {capture: true});
    }
}

new FormsValidation();