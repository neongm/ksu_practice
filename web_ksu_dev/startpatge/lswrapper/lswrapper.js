
class lswrapper
{
    #panels = [];
    #elements = [];
    #_lslow;

    constructor()
    {   
        this.#_lslow = new lswrapper_lowlvl();
    }   

    create_arr(array_name, objects)
    {
        this.#_lslow.create_array_of_objects(array_name, objects);
    }

    remove(_array_name, _names)
    {
        if (Array.isArray(_names)) var names_arr = _names;
        else names_arr = [_names]   
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

    test()
    {
        let pan = {
            name: "name1",
            color: "color2",
            elements: "elements1",
        };
        let pan2 = {
            name: "name3",
            color: "color4",
            elements: "elements2",
        };
        let pan3 = {
            name: "name5",
            color: "color6",
            elements: "elements3",
        };

        let input_arr = [pan, pan2, pan3];
        let test_arr_name = "test";
        this.#_lslow.create_array_of_objects(test_arr_name, input_arr);
        let output_arr = this.#_lslow.get_array_of_objects(test_arr_name);

        console.log(`input arr:`);
        console.log(input_arr);
        console.log(`output arr:`);
        console.log(output_arr);

        
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