
// get_all_keys return all keys
// add_values adds single key/value pair
// add_arr adds key/array pair
// get_arr - returns arr for given key
// get_value - return value for given key


const PANELS_ARRAY = "PANELS"

class lswrapper
{
    #keys = [];

    constructor()
    {   
        this.#keys = this.get_all_keys();
        // will add PANELS to storage if necessary
        if (!contains(this.#keys, PANELS_ARRAY))
        {
            this.set_arr(PANELS_ARRAY, []);
            this.#update_keys();
        }
    }   
    
    #update_keys() { this.#keys = this.get_all_keys(); }

    get_all_keys()
    {
        let temp_keys = [];
        for(let i=0; i<localStorage.length; i++) 
        {
            temp_keys.push(localStorage.key(i));
        }
        return temp_keys;
    }

    set_value(key, value)
    {
        localStorage.setItem(key, value);
        this.#update_keys();
    }

    set_arr(key, _object)
    {
        localStorage.setItem(key, JSON.stringify(_object));
        this.#update_keys();
    }

    get_arr(key)
    {
        let arr = JSON.parse(localStorage.getItem(key));
        if(arr)
        {
            console.log(`get_arr:`);
            for (let i=0; i< arr.length; i++) console.log( arr[i]);
            return arr;
        }
    }

    drop_ls()
    {
        for(var i=0; i<this.#keys.length; i++) 
        {
            console.log(`removing ${this.#keys[i]}`);
            localStorage.removeItem(this.#keys[i]);
        }
        this.#update_keys();

        if(this.#keys.length == 0) console.log('localStorage is empty');
        else console.log('console storage is not empty');
    }

    get_value(key)
    {
        return localStorage.getItem(key);
    }


    // additional features for panel-management
    get_panel(panel_name) {
        let all_panels = this.get_arr(PANELS_ARRAY);
        // searching through panels
        if (contains(all_panels, panel_name))
            {
                return this.get_arr(panel_name);
            }
    }

    get_panels_names()
    {
        return this.get_arr(PANELS_ARRAY);
    }

    set_panel(_panel)
    {
        // ls still not contain new panel, so we can check for it's existance and 
        // type in the same time
        if (this.get_panel(_panel.name) == undefined || _panel instanceof Panel)
        {
            let panels = this.get_arr(PANELS_ARRAY);
            panels.push(_panel.name);
            this.set_arr(PANELS_ARRAY, panels); // update the names list
            this.set_arr(_panel.name, _panel); // set the panel itself
        }
        this.#update_keys(); // remember to update the keys after any changes
    }

    panel_add_element(_panel_name, _element)
    {
        let target_panel = this.get_panel();
        // if panel exists and _element is an true Element - add it to the panel
        if (target_panel instanceof Panel || _element instanceof Element)
        {
            target_panel.addElement(_element);
        }
    }
}


function contains(arr, elem) 
{
    return arr.indexOf(elem) != -1;
}


