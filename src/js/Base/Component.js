import EventEmitter from 'events'

export default class Component extends EventEmitter {

    constructor({
        id,
        element
    }) {
        super()

        this.name = this.constructor.name;
        this.id = id;
        this.element = element
        this.data = this.data();
        this.props = this.initProps();
        this.componentStore = [];
        this.render()
        this.initModelListeners();
        this.initBinds();
        this.mounted();

    }

    static getComponentStore() {
        return this.componentStore;
    }

    static pushToComponentStore(component) {
        return this.componentStore.push(component);
    }

    initData() {
        return {
            text: 'Hello world'
        }
    }

    initProps() {

        let dataSet = this.element.dataset;

        let props = [];

        for (const x in dataSet) {
            if (dataSet.hasOwnProperty(x)) {
                const prop = dataSet[x];

                if (x.indexOf('tim') === 0) {

                    let formattedKey = x.replace('tim', '');

                    props[formattedKey[0].toLowerCase() + formattedKey.substr(1)] = prop;

                }

            }
        }

        return props;
    }

    initModelListeners() {

        let elementsWithModel = this.element.querySelectorAll(`[data-model]`);

        elementsWithModel.forEach(element => {

            element.addEventListener('keyup', (event) => {


                let modelName = element.dataset.model;
                console.log(modelName, event)

                $store.update(modelName, event.target.value);

            })
        });

    }

    initBinds() {

        let boundElements = this.element.querySelectorAll(`[data-bind]`);

        boundElements.forEach(element => {

            let model = element.dataset.bind;

            $store.updateBinds(model);

        });

    }

    render() {
        this.element.innerHTML = this.template();
    }

    //Function fired immediately after rendering.
    mounted() {


    }

    template() {
        return ``;
    }

    destroy() {
        this.el.parentNode.removeChild(this.el)
    }
}
