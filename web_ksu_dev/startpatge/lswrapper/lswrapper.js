
class lswrapper
{
    #panels = [];
    #elements = [];
    #_lslow;

    constructor()
    {   
        _lslow = new lswrapper_lowlvl();
    }   

    

}


class lswrapper_lowlvl
{
    set_array_of_objects(array_name, _objects)  // ДОБАВИТЬ ПРОВЕРКИ
    {
        let obj_names = [];
        for (let obj in _objects)
        {
            localStorage.setItem(_obj.name, JSON.stringify(obj));
            obj_names.push(_obj.name);
        }
        localStorage.setItem(array_name, JSON.stringify(obj_names));
    }

    get_array_of_object(array_name)
    {
        let objects = [];
        let obj_names = localStorage.getItem(array_name);
        for (let object_name in obj_names)
        {
            objects.push(JSON.parse(localStorage.getItem(object_name)));
        }
        return objects
    }
}