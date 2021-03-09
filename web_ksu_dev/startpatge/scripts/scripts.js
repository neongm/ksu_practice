//window.onload = show_shit;


function draw_elements(div, elements){
    for(i = 0; i < elements.length; i++){
        var link_cont = document.createElement("a");
        var div_ch =  document.createElement("div");
        link_cont.appendChild(div_ch)
        if ( elements[i].type == "link" ) { 
            div_ch.className = "link r5"; 
            div_ch.innerHTML = elements[i].text;
            link_cont.setAttribute("href", elements[i].link);
        } 
        else if (elements[i].type == "desc") {
            div_ch.className = "desc r5"; 
        } 
        div.appendChild(link_cont);
    }
    return div;
}


function draw_panel(panel){
    var container = document.getElementById("main_container");
    var div = document.createElement("div");
    div.className = "card black r5 p5";
    div.id = panel.name;
    if( panel.elements != undefined ) div = draw_elements(div, panel.elements);
    container.appendChild(div);
}


var PANELS = [];

function create_panel(name, color){
    elements = []
    PANELS.push(new Panel({name, color, elements}));
}

function update_panels(){
    clear_dom_by_id("main_container");
    for(i = 0; i < PANELS.length; i++) draw_panel(PANELS[i]);
}

function clear_dom_by_id(id){
    var el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}