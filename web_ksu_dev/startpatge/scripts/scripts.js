document.onload = show_stuff();

var _lswrapper;

function show_stuff()
{
    _lswrapper = new lswrapper();
    update_panels();
}

// function draw_elements(div, elements){
//     for(i = 0; i < elements.length; i++){
//         var link_cont = document.createElement("a");
//         var div_ch =  document.createElement("div");
//         link_cont.appendChild(div_ch)
//         if ( elements[i].type == "link" ) { 
//             div_ch.className = "link r5"; 
//             div_ch.innerHTML = elements[i].text;
//             link_cont.setAttribute("href", elements[i].link);
//         } 
//         else if (elements[i].type == "desc") {
//             div_ch.className = "desc r5"; 
//         } 
//         div.appendChild(link_cont);
//     }
//     return div;
// }


// function draw_panel(panel){
//     var container = document.getElementById("main_container");

//     // main panel div
//     var div = document.createElement("div");
//     div.className = "card black r5 p5";
//     div.id = panel.name;

//     // colored line
//     var line = document.createElement("div");
//     line.setAttribute("style", `background-color: ${panel.color};`);
//     div.appendChild(line);

//     // draw contained elements
//     if( panel.elements != undefined ) div = draw_elements(div, panel.elements);
//     container.appendChild(div);
// }

function create_panel(name, color){
    elements = [];
    _lswrapper.set_panel(new Panel({name, color, elements}));
}

function add_element(panel_name, element){
    _lswrapper.panel_add_element(panel_name, element)
}

function update_panels(){
    clear_dom_by_id("main_container");
    for (let _panel in _lswrapper.get_panels_names()) 
    {
        let p = _lswrapper.get_arr(_panel);
        if(p) p.draw("main_container");
    }
}

function clear_dom_by_id(id){
    let el = document.getElementById(id);

    if(el.hasChildNodes())
    {
        while (el.firstChild)  el.removeChild(el.firstChild);
    }

}

