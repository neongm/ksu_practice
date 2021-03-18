
// переделать этот класс вообще, его можно сделать проще
class lswrapper_lowlvl
{
    create_array_of_objects(_array_name, _objects)  
    {
        if(_array_name != '' || !this.exists_in_localStorage(_array_name))
        { 
            let obj_names = [];
            for (let i=0; i<_objects.length; i++)
            {
                localStorage.setItem(_objects[i].name, JSON.stringify(_objects[i]));
                obj_names.push(_objects[i].name);
            }
            localStorage.setItem(_array_name, JSON.stringify(obj_names));
        }
    }

    get_array_of_objects(_array_name) // Добавить поверки
    {
        let objects = [];
        let obj_names = JSON.parse(localStorage.getItem(_array_name));
        for (let i=0; i<obj_names.length; i++)
        {
            let object = JSON.parse(localStorage.getItem(obj_names[i]));
            objects.push(object);
        }
        return objects
    }

    get_object_from_array(_array_name, _object_name)
    {
        if (this.exists_in_array(_array_name, _object_name))
        {
            return JSON.parse(localStorage.getItem(_object_name));
        }
    }

    push_to_array_of_objects(_array_name, _objects)
    {
        if (this.exists_in_localStorage(_array_name))
        {
            let array_of_names = this.get_array_of_objects(_array_name);
            if (Array.isArray(_objects))
            {
                for(let i=0; i<_objects.length; i++)
                {
                    // push object's name to array of names
                    array_of_names.push(_objects[i].name);
                    // push the object
                    localStorage.setItem(_objects[i].name, JSON.stringify(_objects[i]));
                }
                // save the array back to the storage
                localStorage.setItem(_array_name, JSON.stringify(array_of_names));
            }
            else
            {
                array_of_names.push(_objects.name);
                localStorage.setItem(_objects.name, JSON.stringify(_objects));
                localStorage.setItem(_array_name, JSON.stringify(array_of_names));
            }
        }
    }

    remove_from_array_of_objects(_array_name, _objects_names)
    {
        for(let i=0; i<_objects_names.length; i++) {
            if(this.exists_in_array(_array_name, _objects_names[i]))
            {
                // DELETE FROM NAMES ARRAY
                let obj_names = JSON.parse(localStorage.getItem(_array_name));
                let deleted = obj_names.splice(obj_names.indexOf(_objects_names[i]), 1);
                localStorage.setItem(_array_name, JSON.stringify(obj_names));

                // DELETE FORM LS
                localStorage.removeItem(_objects_names[i]);
            }
        }
    }

    exists_in_localStorage(_key)
    {
        if (this.#get_all_keys().indexOf(_key) == -1) return false
        return true
    }

    exists_in_array(_array_name, _key)
    {
        let target_keys_array = JSON.parse(localStorage.getItem(_array_name));
        if (!Array.isArray(target_keys_array)) return false;
        if (target_keys_array.indexOf(_key) == -1) return false;
        return true;

    }

    #get_all_keys()
    {
        let temp_keys = [];
        for(let i=0; i<localStorage.length; i++) temp_keys.push(localStorage.key(i));
        return temp_keys;
    }

    drop_localStorage()
    {
        for(let key in this.#get_all_keys()) localStorage.removeItem(key);   
    }
}


class lswrapper
{
    #panels = [];
    #elements = [];
    #_lslow;
    #PANELS = "PANELS"

    constructor()
    {   
        this.#_lslow = new lswrapper_lowlvl();

        if(!this.#_lslow.exists_in_localStorage(this.#PANELS))
        {
            this.#_lslow.create_array_of_objects(this.#PANELS, []);
        }
    }

    create_arr(array_name, objects)
    {
        this.#_lslow.create_array_of_objects(array_name, objects);
    }

    remove(_array_name, _names)
    {
        if (Array.isArray(_names)) var names_arr = _names;
        else names_arr = [_names];
        this.#_lslow.remove_from_array_of_objects(_array_name, names_arr);
    }

    push(_array_name, _objects)
    {
        if(!_objects || _objects == [] || _objects == '' || !Array.isArray(_objects)) return
        this.#_lslow.push_to_array_of_objects(_array_name, _objects);
    }

    drop_ls()
    {
        this.#_lslow.drop_localStorage();
    }

    get_objects(_array_name)
    {
        if(_array_name == '' || _array_name == undefined) return
        return this.#_lslow.get_array_of_objects();
    }

    get_object(_array_name, _object_name)
    {
        if (_object_name != '' || _object_name != undefined) return this.#_lslow.get_object_from_array();
    }

    add_panel(_name, _color) // ... добавить проверки
    {
        let panel = {
            name: _name,
            color: _color,
            elements: _name+'_elems',
        }
        this.#_lslow.create_array_of_objects(_name+'_elems', []);
        this.#_lslow.push_to_array_of_objects(this.#PANELS, panel);
    }

    create_element(_type, _text, _desc_link) // ... добавить проверки
    {
        let element = {
            name: _text+`_kindaid`,
            type: _type,
            text: _text,
            desc_link: _desc_link
        }
        return element
    }

    add_element_to_panel(_panel_name, _element) // ... добавить проверки
    {
        let elems = this.#_lslow.get_object_from_array(this.#PANELS, _panel_name).elements;
        this.#_lslow.push_to_array_of_objects(elems, _element);
    }

    draw_all_panels()  // ... добавить проверки
    {
        let arr = this.#_lslow.get_array_of_objects(this.#PANELS);

        for(let i=0; i<arr.length; i++)
        {
            let obj = arr[i];
            let pan = new Panel(obj);
            pan.draw();
        }
    }
}

class Panel 
{
    #_lslow;
    name = '';
    color = '';
    elements = [];
    #elements_arr_name = '';

    update_elements()
    {
        this.elements = this.#_lslow.get_array_of_objects(this.#elements_arr_name);
    }

    constructor(props)
    {
        this.#_lslow = new lswrapper_lowlvl;
        this.name = props.name;
        this.color = props.color;
        this.#elements_arr_name = props.elements;
        this.elements = this.#_lslow.get_array_of_objects(this.#elements_arr_name);
    }

    draw()
    {
        console.log(`drawing: \n${this.name}\n${this.color}\n${this.#elements_arr_name}`);
        this.elements = this.#_lslow.get_array_of_objects(this.#elements_arr_name);

        var panel = document.createElement("div");
        panel.className = "card black p5 r5";
        panel.id = this.name;

        // colored line
        var line = document.createElement("div");
        line.setAttribute("style", `background-color: ${this.color};`);
        line.className = "line r5";
        panel.appendChild(line);

        // add the elements
        var el_cont = document.createElement("div");
        el_cont = this.#draw_elements(el_cont, this.elements);
        panel.appendChild(el_cont);

        document.getElementById("main_container").appendChild(panel);
    }

    #draw_elements(div, elements){
        for(var i = 0; i < elements.length; i++) // ... добаивть проверку
        {
            var div_ch =  document.createElement("div");

            if ( elements[i].type == "link" ) 
            { 
                div_ch.className = "link r5"; 
                var a =  document.createElement("a");
                a.innerHTML = elements[i].text;
                a.setAttribute("href", elements[i].desc_link);
                div_ch.appendChild(a);
            } 
            else if (elements[i].type == "desc") 
            {
                div_ch.className = "desc r5";
                div_ch.innerHTML = elements[i].text;
            } 

            div.appendChild(div_ch);
        }
        return div;
    }   
}


// element obj should look like this:
//     {
//     name:  "some id-like name (unique) "
//     type: "type of element",
//     text: "text on element",
//     desc_link: "description or link depending on type"    
// }
