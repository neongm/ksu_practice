
var _lswrapper = new lswrapper();

function show_keys()
{
    console.log(_lswrapper.get_all_keys());
} 

function show_key_value_pairs()
{
    temp_arr = _lswrapper.get_all_keys();
    for (i=0; i<temp_arr.length; i++ )
        console.log(`${temp_arr[i]} : ${_lswrapper.get_value(temp_arr[i])}`);
}

function array_to_lswrapper(_key)
{
    var arr = []
    for(i=0; i<10; i++)
    {
        let el = new xmpl();
        arr.push(el);
    }
    _lswrapper.add_arr(_key, arr);

    console.log(_lswrapper.get_arr(_key));
}