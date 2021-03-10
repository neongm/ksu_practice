class Panel
{
    #name = '';
    #color = '';
    #elements = [];
    #_lswrapper;

    constructor(props){
        this.#_lswrapper = new lswrapper();

        this.#name = props.name;

        if(props.color != '') this.#color = props.color;
        else this.#color = '#999999';

        this.#elements = this.#_lswrapper.get;
    } 

    set name(_name){
        if (_name === '') throw Error('Name can not be empty');
        this.name = _name;
    }
    
    get name(){ return this.#name; }
    get color(){ return this.#color; }
    get elements(){ return this.#elements; }

    addElement(_element){
        if( _element instanceof Element) this.#elements.push(_element);
    }
    changeColor(color){
        this.#color = color;
    }
    changeName(name){
        this.#name = name;
    }

    draw(parent_id){

        let container = document.getElementById(parent_id);
        // main panel div
        let div = document.createElement("div");
        div.className = "card black r5 p5";
        div.id = this.#name;
    
        // colored line
        let line = document.createElement("div");
        line.setAttribute("style", `background-color: ${this.#color};`);
        div.appendChild(line);
    
        // draw contained elements
        this.draw_elements(this.#name);
        container.appendChild(div);
    }

    draw_elements(panel_id){
        let container = document.getElementById(panel_id);
        
        // if there is any elements
        if (this.#elements != []){
            for(let elem in this.#elements)
            {   
                // creating DOM for element
                let link_cont = document.createElement("a");
                let div_ch =  document.createElement("div");
                link_cont.appendChild(div_ch)

                // for links
                if(elem.type == "link")
                {
                    div_ch.className = "link r5"; 
                    div_ch.innerHTML = elem.text;
                    link_cont.setAttribute("href", elem.link);
                }   
                // for descriprions/reminders TODO
                else if (elem.type == "desc")
                {
                    div_ch.className = "desc r5"; 
                }

                // add result to container for each element
                container.appendChild(link_cont);
            } 
        }
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