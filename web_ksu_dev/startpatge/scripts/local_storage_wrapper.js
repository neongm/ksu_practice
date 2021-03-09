
// get_all_keys return all keys
// add_values adds single key/value pair
// add_arr adds key/array pair
// get_arr - returns arr for given key
// get_value - return value for given key


class lswrapper
{
    #keys = [];

    constructor()
    {
        this.#keys = this.get_all_keys();
    }       
    #update_keys() { this.#keys = this.get_all_keys(); }

    get_all_keys()
    {
        let temp_keys = [];
        for(let i=0; i<localStorage.length; i++) {
            temp_keys.push(localStorage.key(i));
          }
        return temp_keys;
    }

    add_value(key, value)
    {
        localStorage.setItem(key, value);
        this.#update_keys();
    }

    add_arr(key, _object)
    {
        localStorage.setItem(key, JSON.stringify(_object));
        this.#update_keys();
    }

    get_arr(key)
    {
        return JSON.parse(localStorage.getItem(key));
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
}




class xmpl
{
    name = 'john';
    link = 'johnov';
    type = 'chelokek';
}

