class Panel
{
    #name = '';
    #color = '';
    #elements = [];

    constructor(props){
        this.#name = props.name;
        this.#color = props.color;
        this.#elements = props.elements;
    } 

    set name(_name){
        if (_name === '') throw Error('Name can not be empty');
        this.name = _name;
    }
    
    get name(){ return this.#name; }
    get color(){ return this.#color; }
    get elements(){ return this.#elements; }

    addElement(element){
        this.#elements.push(element);
    }
    changeColor(color){
        this.#color = color;
    }
    changeName(name){
        this.#name = name;
    }
}


class Element
{
    #type = '';
    #text = '';
    #link = '';
    #desc = '';
    
    constructor(props){
        this.#type = props.type;
        this.#text = props.text;
        if (props.type == 'link'){
            this.#link = props.link;
        }
        else if (props.type == 'reminder'){
            this.#desc = props.desc;
        }
    }

    set text(_text){
        if (_text === ''){ this.#text = _text; }
    }
    set link(_link){
        if (_link === ''){ this.#link = _link; }
    }
    set desc(_desc){
        if (_desc === ''){ this.#desc = _desc; }
    }

    get type(){ return this.#type; }
    get text(){ return this.#text; }
    get link(){ return this.#link; }
    get desc(){ return this.#desc; }
}