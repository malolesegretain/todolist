var arrTodo = [];

document.addEventListener("load", function() {
    arrTodo = localStorage.getItem("myArray");
    console.log("getItem should be ok")
})

document.addEventListener("DOMContentLoaded", function () {

    var input = document.getElementById("input");
    var add = document.getElementById("add");
    var list = document.getElementById("list");
    var editing = false;
    var checkBox = 0;
    var li, pointer, pointed,edit;
    var editNumber = 0;

function toLocal() {
    localStorage.setItem("myArray", arrTodo);
}

    // Assign border and shadow to list only if arrTodo is not empty
    function border() {
        if (arrTodo.length == 0) {
            list.style.border = "none";
        } else {
            // input.style.boxShadow = "0.5vw 0.5vh 1.25vw rgb(97, 98, 99)";
            list.style.boxShadow = "0.5vw 0.5vw 1.25vw rgb(97, 98, 99)";
            list.style.border = "solid rgb(182, 183, 181) 1px";
        }
    }

    // put tasks into arrTodo and put them in a input format as well
    function submit() {
        arrTodo.unshift(input.value);
        var list = document.getElementById("list");
        list.innerHTML = "";
        li = "";
        for (var i = 0; i < arrTodo.length; i++) {
            li = document.createElement("li");
            li.className = "inputed";
            li.id = "input" + i;
            li.value = i;
            li.innerHTML = arrTodo[i];
            list.appendChild(li);
        };
        input.style.color = "rgb(182, 183, 181)";
        input.value = "";
        input.placeholder = "What needs to be done ?";
        border();
        toLocal();
    }

    // put tasks into arrTodo and put them in a input format as well
    function reSubmit() {
        var list = document.getElementById("list");
        list.innerHTML = "";
        li = "";
        for (var i = 0; i < arrTodo.length; i++) {
            li = document.createElement("li");
            li.className = "inputed";
            li.id = "input" + i;
            li.value = i;
            li.innerHTML = arrTodo[i];
            list.appendChild(li);
        };
        input.style.color = "rgb(182, 183, 181)";
        input.value = "";
        input.placeholder = "What needs to be done ?";
        border();
        toLocal();
    }

    // Changes placeholder & text format + color based on where is clicked in the doc
    document.addEventListener("click", function (event) {
        var isClickedInside = input.contains(event.target);
        console.log(editing);
        if (isClickedInside) {
            input.style.color = "black";
            input.placeholder = "";
        }
        if (!isClickedInside) {
            input.placeholder = "What needs to be done ?";
            input.style.color = "rgb(182, 183, 181)";
        }
        console.log(editing);
    })


    // Enables keyboard validation and gets font back to black when nothing has been clicked since last add
    document.body.addEventListener("keypress", function (e) {
        if (e.keyCode == 13 && input.value != "") {
            submit()
        }
        if (checkBox = 1 && e.keyCode != 13) {
            input.style.color = "black";
        }
    })

    // Enables submission via add button and tells whether input bar is active or not
    add.addEventListener("click", function (e) {
        if (e.target == add && input.value != "") {
            submit();
            checkBox = 1;
        } else {
            checkBox = 0;
        }
    })

    // Trigger actions if mouse is in ul zone
    // Catch ".value" of pointed area
    document.body.addEventListener("mouseover", function (e) {
        if (e.target.className == "inputed" || e.target.className == "logos") {
            pointer = e.target.value;
            function onchange(pointer) {
                if (Number.isInteger(pointer)) {
                    pointed = pointer;
                }
            }
                onchange(pointer);
            console.log("#1 pointer = " + pointer);
            console.log("#1 pointed = " + pointed);
            if (Number.isInteger(pointer)) {
                // Create new span based on the li that is being moused-over and assign edit + delete signs to it
                function subCat() {
                    var subCatSpan = document.createElement("subCatSpan");
                    subCatSpan.id = "logoBox";
                    var del = document.createElement("img");
                    del.src = "recycle-bin.png";
                    del.value = pointed;
                    del.className = "logos";
                    del.id = "delete";
                    // assign logos to <span>
                    subCatSpan.appendChild(del);
                    // If editing is true --> apply changes in arrTodo
                        if (editing == true) {
                            console.log("input" + editNumber);
                            arrTodo[editNumber] = document.getElementById("input" + editNumber).textContent;
                        }
                    // Use map to remove delete icon from li once mouseover stops
                    arrTodo.map(function (elem, index) {
                        document.getElementById("input" + index).innerHTML = arrTodo[index];
                    })
                    // assign span to the correct li based on mouseover
                    
                        document.getElementById("input" + pointer).innerHTML = arrTodo[pointer] + subCatSpan.innerHTML;
                }
                subCat();
            }
        } else {
            // Use map to remove span from li once mouseover stops
            if (editing == true) {
                arrTodo[editNumber] = document.getElementById("input" + editNumber).textContent; 
            }
            arrTodo.map(function (elem, index) {
                document.getElementById("input" + index).innerHTML = arrTodo[index];
            })
            console.log("#2 pointer = " + pointer);
            console.log("#2 pointed = " + pointed);
        }
    })

    //deletes row from todo list and arrTodo
    document.body.addEventListener("click",function(e) {
        var clicked = e.target.id;
        if (clicked == "delete") {
            console.log(arrTodo);
            console.log(arrTodo[0]);
            var elem = document.getElementById("input" + pointed);
            elem.parentNode.removeChild(elem);
            arrTodo.splice(pointed,1);
            reSubmit();
        }
    })

    //Edit current row. 
    //CDC -> possibilité de changer texte apres avoir cliqué

    // Rendre contenu li editable 
    document.body.addEventListener("dblclick", function(e) {
        // Rendre tt les li non editable avant d'en rendre un editable
        var clicked = e.target.className;
        var elem = document.getElementById("input" + pointed);
        arrTodo.map(function(elem, index) {
            document.getElementById("input" + index).contentEditable = false;
        })
        console.log("read db click");
        if (clicked == "inputed") {
            elem.contentEditable = true; 
            editNumber = pointed;
            editing = true;
        }
    })
  
    // remove text editing if it's "on" and "click" is outside todoList
    document.body.addEventListener("click", function(e) {
        var clicked = e.target.className;
        if(editing == true && clicked !== "inputed") {
            editing = false;
            arrTodo.map(function(elem, index) {
                arrTodo[index] = document.getElementById("input" + index).textContent;
                document.getElementById("input" + index).contentEditable = false;
            })
        }
    })

});