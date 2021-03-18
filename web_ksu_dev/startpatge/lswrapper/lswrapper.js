
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


    draw_panel(_panel_name)
    {
        if(!exists_in_localStorage(_panel_name)) return
        let panel_from_arr = this.#_lslow.get_object_from_array(_panel_name)
        
        var panel = document.createElement("div");
        panel.className = "card black p5 r5";
        panel.id = panel_from_arr.name;

        // colored line
        var line = document.createElement("div");
        line.setAttribute("style", `background-color: ${panel_from_arr.color};`);
        line.className = "line r5";
        panel.appendChild(line);

        // get the elements list
        var elements = this.#_lslow.get_array_of_objects(panel_from_arr.elements); 

        var el_cont = document.createElement("div");
        if( panel.elements != undefined ) el_cont = this.#draw_elements(el_cont, elements);
        panel.appendChild(el_cont);

        document.getElementById("main_container").appendChild(panel);

        // panel obj should look like this:
        //      {
        //      name: "some unique name",
        //      color: #somecolor,
        //      elements: "name of array with elements of panel"    
        //}

        // element obj should look like this:
        //     {
        //     type: "type of element",
        //     text: "text on element",
        //     desc_link: "description or link depending on type"    
        // }
        
    }

    #draw_elements(div, elements){
    for(i = 0; i < elements.length; i++){
        var link_cont = document.createElement("a");
        var div_ch =  document.createElement("div");
        link_cont.appendChild(div_ch)
        if ( elements[i].type == "link" ) { 
            div_ch.className = "link r5"; 
            div_ch.innerHTML = elements[i].text;
            link_cont.setAttribute("href", elements[i].desc_link);
        } 
        else if (elements[i].type == "desc") {
            div_ch.className = "desc r5"; 
        } 
        div.appendChild(link_cont);
        div_ch.innerHTML = elements[i].text;
    }
    return div;
}

    test()
    {
        let panel = {
            name: "some_panel 1",
            color: "#21ff21",
            elements: "spelements",
        };
        let element = {
            type: "link",
            text: "mylink",
            desc_link: "https://vk.com/im"
        };
        
        

        // добавление панели
        this.#_lslow.push_to_array_of_objects(this.#PANELS, panel);
        // добавление элмента
        this.#_lslow.push_to_array_of_objects(panel.elements, element);


        if(this.#_lslow.exists_in_array(this.#PANELS, panel.name))
        {
            this.draw_panel(panel.name);
        }
        

        
    }
}


class lswrapper_lowlvl
{
    create_array_of_objects(_array_name, _objects)  
    {
        if(_array_name != '' || !this.exists_in_localStorage(_array_name))
        { 
            let obj_names = [];
            for (let i=0; i<_objects.length; i++)
            {
                console.log(`pushing ${_objects[i]} with name = ${_objects[i].name}`);
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
            console.log(`returning objct with name ${object.name}`)
            console.log(object);
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
                console.log(`deleted: ${deleted}`);
                console.log(`remaining: ${obj_names}`);

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
        if (target_keys_array.indexOf(_key) == -1) return false
        return true

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