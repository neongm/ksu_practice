
class lswrapper
{
    #panels = [];
    #elements = [];
    #_lslow;

    constructor()
    {   
        this.#_lslow = new lswrapper_lowlvl();
    }   

    set_arr(array_name, objects)
    {
        this.#_lslow(array_name, objects);
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

        this.#_lslow.set_array_of_objects("low_panels", [pan, pan2, pan3]);

        let arr = this.#_lslow.get_array_of_objects("low_panels");
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

                // DELETE FORM LS
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
        if (target_keys_array.indexOf(_ket) == -1) return false
        return true

    }

    #get_all_keys()
    {
        let temp_keys = [];
        for(let i=0; i<localStorage.length; i++) temp_keys.push(localStorage.key(i));
        return temp_keys;
    }
}