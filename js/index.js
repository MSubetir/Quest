let body = document.querySelector('body');
let lista = document.querySelector('ul.lista');
let subTitulo = document.querySelector('footer div.janela div.title2');
let resumo = document.querySelector('footer div.janela textarea.t1');
let pop = document.querySelector('footer div.janela div.pop-up');
resumo.disabled = true;
let confirmation = document.querySelector('main div.yesAndNo');
let creator = document.querySelector('main div.createAndNo');

let types = document.querySelector('main div.types');
let y = document.querySelector('main div.yesAndNo div.yes');
let n = document.querySelector('main div.yesAndNo div.no');
let opcoes = document.querySelector('main div.opcoes');

let numEditado = 1000;
let numBackup = "";
let backup_title = "";
let antiBurlAbstract = 3;

let principal = document.querySelector('header div.principal');
let secundaria = document.querySelector('header div.secundaria');
let terciaria = document.querySelector('header div.terciaria');
let quartaria = document.querySelector('header div.quartaria');
let block = document.querySelector('header div.block');

let ap = document.querySelector('main div.opcoes div.apagar');
let ed = document.querySelector('main div.opcoes div.editar');
let ad = document.querySelector('main div.opcoes div.adicionar');

let curMission;
let contMissoes;

let deleteArray = [];
let repeteco = false;
let deleteState = false;
let removed;

let editState = false;

let secao = 1;
let started = false;

let url = ""
let url_time = ""
let url_timeR = ""

verify();


function change(){
    types.style.setProperty('z-index', 3);
    types.style.setProperty('opacity', 1);
    opcoes.style.setProperty('opacity', 0);
}
function changeBack(){
    types.style.setProperty('z-index', 0);
    types.style.setProperty('opacity', 0);
    opcoes.style.setProperty('opacity', 1);
    creator.style.setProperty('z-index', 0);
    creator.style.setProperty('opacity', 0);
    block.style.setProperty("z-index", "0")
}

function addQuest(numb){
    let cancel = false;
    let x = {};

    
    x.title = prompt("Informe o titulo");
    if(x.title == null)cancel = true;
    if(cancel == false){
        while(x.title.length > 13) {
            x.title = prompt("Apenas 13 caracteres", x.title);
            if(x.title == null){
                cancel = true
                x.title = ""
            };
        }
    }
    
    
    if(cancel == false){
        numb == 0 ? x.abstract = "" : x.abstract = prompt("Informe o número");
    }
    if(x.abstract == null)cancel = true;


    let parse = parseInt(x.abstract)
    let check = parse;
    console.log(parse, check)
    if(cancel == false && parse != check || cancel == false && parse < 0){
        if(numb != 0){
            let parseq;
            let checkq;
            do {
                    x.abstract = prompt("Número natural necessário");
                    parseq = parseInt(x.abstract)
                    checkq = parseq;
    
                    if(x.abstract == null)cancel = true;
            } while (parseq != checkq && cancel == false || cancel == false && parseq < 0);
        }
    }
    

    if(cancel != true){
        localMission(x, numb);
        verify();
        abstract(lista.childElementCount - 1);

        if(numb == 0){
            resumo.disabled = false;
            creator.style.setProperty('z-index', 4);
            creator.style.setProperty('opacity', 1);
            opcoes.style.setProperty('opacity', 0);
            block.style.setProperty("z-index", "2")
            numEditado = 1000;
        }else{
            types.style.setProperty('z-index', 0);
            types.style.setProperty('opacity', 0);
            opcoes.style.setProperty('opacity', 1);
        }
    }
}


function create(){
    let num;
    if(secao == 1)quest = JSON.parse(localStorage.getItem('missions'));
    if(secao == 2)quest = JSON.parse(localStorage.getItem('missions2'));
    if(secao == 3)quest = JSON.parse(localStorage.getItem('missions3'));
    if(secao == 4)quest = JSON.parse(localStorage.getItem('missions4'));

    numEditado == 1000 ? num = quest.length - 1 : num = numEditado;
    quest[num].abstract = resumo.value;
    if(secao == 1)localStorage.setItem('missions', JSON.stringify(quest));
    if(secao == 2)localStorage.setItem('missions2', JSON.stringify(quest));
    if(secao == 3)localStorage.setItem('missions3', JSON.stringify(quest));
    if(secao == 4)localStorage.setItem('missions4', JSON.stringify(quest));
    antiBurlAbstract = 3;
    verify()
    changeBack();
    abstract(num);
    numEditado = 1000;
    numBackup = "";
    editState = false;
    resumo.disabled = true;
}

function noCreate(){
    if(secao == 1)y = JSON.parse(localStorage.getItem('missions'));
    if(secao == 2)y = JSON.parse(localStorage.getItem('missions2'));
    if(secao == 3)y = JSON.parse(localStorage.getItem('missions3'));
    if(secao == 4)y = JSON.parse(localStorage.getItem('missions4'));
    
    if(numEditado != 1000){
        y[numEditado].abstract = numBackup;
        y[numEditado].title = backup_title;
    }else{
        rr = y.splice(lista.childElementCount - 1, 1);
    }

    if(secao == 1)localStorage.setItem('missions', JSON.stringify(y));
    if(secao == 2)localStorage.setItem('missions2', JSON.stringify(y));
    if(secao == 3)localStorage.setItem('missions3', JSON.stringify(y));
    if(secao == 4)localStorage.setItem('missions4', JSON.stringify(y));
    antiBurlAbstract = 3;
    verify()
    changeBack();
    abstract();
    editState = false;
    resumo.disabled = true;
    
}

function localMission(x, numb){
   
    let old;
    if(secao == 1)old = JSON.parse(localStorage.getItem('missions'));
    if(secao == 2)old = JSON.parse(localStorage.getItem('missions2'));
    if(secao == 3)old = JSON.parse(localStorage.getItem('missions3'));
    if(secao == 4)old = JSON.parse(localStorage.getItem('missions4'));

    if(numb != 0){
        let resum = x.abstract;
        let before = new Date;
        if(numb == 1){
            x.abstract = "C - "+before.getDate()+"/"+before.getMonth()+"/"+before.getFullYear()+"/"+resum;
            console.log(x.abstract)
        }else{
            x.abstract = "R - "+before.getDate()+"/"+before.getMonth()+"/"+before.getFullYear()+"/"+resum;
        }   
    }else{
        rr = old.splice(lista.childElementCount, 1);
    }
    
    let mesclar;

    x != null ? mesclar = old.concat(x) : mesclar = old;

    if(secao == 1)localStorage.setItem('missions', JSON.stringify(mesclar));
    if(secao == 2)localStorage.setItem('missions2', JSON.stringify(mesclar));
    if(secao == 3)localStorage.setItem('missions3', JSON.stringify(mesclar));
    if(secao == 4)localStorage.setItem('missions4', JSON.stringify(mesclar));
}




function verify(a){
    
    
    if(localStorage.getItem('missions') == null)localStorage.setItem('missions', JSON.stringify([]));
    if(localStorage.getItem('missions2') == null)localStorage.setItem('missions2', JSON.stringify([]));
    if(localStorage.getItem('missions3') == null)localStorage.setItem('missions3', JSON.stringify([]));
    if(localStorage.getItem('missions4') == null)localStorage.setItem('missions4', JSON.stringify([]));
    a == null ? a = secao : secao = a;

    confirmation.style.setProperty('z-index', 0);
    confirmation.style.setProperty('opacity', 0);
    opcoes.style.setProperty('opacity', 1);

    removeAll();
    deleteState = false;
    editState = false;
    ed.style.setProperty('background', '#222222');



    if(a == 1){
        principal.style.setProperty('background-color', '#474747');
        secundaria.style.setProperty('background-color', '#272727');
        terciaria.style.setProperty('background-color', '#272727');
        quartaria.style.setProperty('background-color', '#272727');

        //let rr;
        let y = JSON.parse(localStorage.getItem('missions'));
        secao = 1;
        console.log(y)
        //rr = y.splice(3, 1);
        localStorage.setItem('missions', JSON.stringify(y));
        url = "doc/primario.png"
        url_time = "doc/time.png"
        url_timeR = "doc/timeR.png"
        body.style.setProperty('--fundo', 'url("../doc/fundo_primario2.png")')
       
        addMission(y)
    }
    if(a == 2){
        principal.style.setProperty('background-color', '#272727');
        secundaria.style.setProperty('background-color', '#474747');
        terciaria.style.setProperty('background-color', '#272727');
        quartaria.style.setProperty('background-color', '#272727');

        let u = JSON.parse(localStorage.getItem('missions2'));
        secao = 2;

        url = "doc/secundario.png"
        url_time = "doc/time2.png"
        url_timeR = "doc/time2R.png"
        body.style.setProperty('--fundo', 'url("../doc/fundo_secundario2.png")')

        addMission(u);
    }
    if(a == 3){
        principal.style.setProperty('background-color', '#272727');
        secundaria.style.setProperty('background-color', '#272727');
        terciaria.style.setProperty('background-color', '#474747');
        quartaria.style.setProperty('background-color', '#272727');

        let i = JSON.parse(localStorage.getItem('missions3'));
        secao = 3;

        url = "doc/terciario.png"
        url_time = "doc/time3.png"
        url_timeR = "doc/time3R.png"
        body.style.setProperty('--fundo', 'url("../doc/fundo_terciario3.png")')

        addMission(i);
    }
    if(a == 4){
        principal.style.setProperty('background-color', '#272727');
        secundaria.style.setProperty('background-color', '#272727');
        terciaria.style.setProperty('background-color', '#272727');
        quartaria.style.setProperty('background-color', '#474747');

        let u = JSON.parse(localStorage.getItem('missions4'));
        secao = 4;

        url = "doc/quartario.png"
        url_time = "doc/time4.png"
        url_timeR = "doc/time4R.png"
        body.style.setProperty('--fundo', 'url("../doc/fundo_quartario.png")')

        addMission(u);
    }

    
    
    abstract();
    touchItens();
}
function addMission(j){
        
    for(let i = 0; i < j.length; i++){
            let listaTitulo = document.createElement('li');
            let pheonix = document.createElement("IMG");
            //console.log(j)

            if(j[i].abstract.substr(0, 4) == "C - "){
                pheonix.src = url_time;
            }else if(j[i].abstract.substr(0, 4) == "R - "){
                pheonix.src = url_timeR;
            }else{
                pheonix.src = url;
            }

            let text = document.createTextNode(j[i].title)

            listaTitulo.appendChild(pheonix);
            listaTitulo.appendChild(text);

            lista.appendChild(listaTitulo);
        }
    }


function abstract(i){
    resumo.style.setProperty("background-color", "rgb(0, 0, 0)")

    if(antiBurlAbstract == 0){
        noCreate();
    }else if(antiBurlAbstract < 3){
        antiBurlAbstract--;
    }
    
    if(i == undefined) i = 0;
    let curMission;
    if(secao == 1)curMission = JSON.parse(localStorage.getItem('missions'));
    if(secao == 2)curMission = JSON.parse(localStorage.getItem('missions2'));
    if(secao == 3)curMission = JSON.parse(localStorage.getItem('missions3'));
    if(secao == 4)curMission = JSON.parse(localStorage.getItem('missions4'));
    if(curMission[0] != undefined){

    console.log(lista)

    if(curMission[i].abstract.substr(1, 3) == " - "){
        let strData;
        let resto;
        

        if(curMission[i].abstract.substr(5, 1) == "/" && curMission[i].abstract.substr(7, 1) == "/"){
            strData = curMission[i].abstract.substr(4, 8);
            resto = curMission[i].abstract.substr(13, curMission[i].abstract.length - 13);
        }else if(curMission[i].abstract.substr(6, 1) == "/" && curMission[i].abstract.substr(9, 1) == "/"){
            strData = curMission[i].abstract.substr(4, 10);
            resto = curMission[i].abstract.substr(15, curMission[i].abstract.length - 15);
        }else if(curMission[i].abstract.substr(6, 1) == "/" && curMission[i].abstract.substr(8, 1) == "/"){
            strData = curMission[i].abstract.substr(4, 9);
            resto = curMission[i].abstract.substr(14, curMission[i].abstract.length - 14);
        }else if(curMission[i].abstract.substr(5, 1) == "/" && curMission[i].abstract.substr(8, 1) == "/"){
            strData = curMission[i].abstract.substr(4, 9);
            resto = curMission[i].abstract.substr(14, curMission[i].abstract.length - 14);
        }
        console.log(strData)
        let partesData = strData.split("/");
        let data = new Date(partesData[2], partesData[1], partesData[0]);
        now = new Date;
        
        let timeDiff = Math.abs(now.getTime() - data.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        diffDays -= 1;
        
        if(curMission[i].abstract.substr(0, 1) == "C"){
            curMission[i].abstract = parseInt(resto) + diffDays;
            if(Number.isInteger(curMission[i].abstract/30)) resumo.style.setProperty("background-color", "rgb(26, 109, 23)");
            curMission[i].title = "+ "+curMission[i].title+" +";
        }else if(curMission[i].abstract.substr(0, 1) == "R"){
            console.log(parseInt(resto),diffDays)
            if(parseInt(resto) - diffDays > 0) {
                curMission[i].abstract = parseInt(resto) - diffDays;
              }else{
                textColor();
                curMission[i].abstract = 0;
              }
            curMission[i].title = "- "+curMission[i].title+" -";


        }

        resumo.style.setProperty("font-size", "20vw"); 
        resumo.style.setProperty("text-align", "center"); 
    }else{
        resumo.style.setProperty("font-size", "4.3vw");
        resumo.style.setProperty("text-align", "start");  
    }
    
    curMission.length != 0 ? subTitulo.innerHTML = curMission[i].title : subTitulo.innerHTML = "";
    curMission.length != 0 ? resumo.value = curMission[i].abstract : resumo.value = "";
    }else{
        subTitulo.innerHTML = "";
        resumo.value = "";
    }
}
function textColor(){
    resumo.style.setProperty("background-color", "rgb(206, 37, 37)")
}


function touchItens(){
    for(let i = 0; i < lista.childElementCount; i++){
        let item = lista.children[i];
    
        item.addEventListener("click", function (ev) {
            abstract(i);
        });
    }
}


function deleteItem(){
    /*n.classList.remove('no')
    y.classList.remove('yes')

    setTimeout(() => {
        n.classList.add('no')
        y.classList.add('yes') 
    }, 1000);
    */


    confirmation.style.setProperty('z-index', 2);
    confirmation.style.setProperty('opacity', 1);
    opcoes.style.setProperty('opacity', 0);

    deleteState = true;
    deleteArray = [];
    

    for(let i = 0; i < lista.childElementCount; i++){
        let item = lista.children[i];
        //console.log("elementos :"+lista.childElementCount, "  i :"+i, "  item: "+item)

        item.addEventListener("click", curDelete);
    
        if(repeteco)item.removeEventListener("click", curDelete);  


        function curDelete() {
            if(deleteState == true){
                item.remove();
                deleteArray.push(i);
            }
        }
        
    }

    repeteco = true;
}


function no(){
    confirmation.style.setProperty('z-index', 0);
    confirmation.style.setProperty('opacity', 0);
    opcoes.style.setProperty('opacity', 1);

    deleteState = false;


    verify();
}
function yes(){
    confirmation.style.setProperty('z-index', 0);
    confirmation.style.setProperty('opacity', 0);
    opcoes.style.setProperty('opacity', 1);

    let old;
    if(secao == 1)old = JSON.parse(localStorage.getItem('missions'));
    if(secao == 2)old = JSON.parse(localStorage.getItem('missions2'));
    if(secao == 3)old = JSON.parse(localStorage.getItem('missions3'));
    if(secao == 4)old = JSON.parse(localStorage.getItem('missions4'));

    let oldSize = old.length;
    let moreDois = 0;


    for(let i = 0; i < oldSize; i++){
        for(let a = 0; a< deleteArray.length; a++){
            if(deleteArray[a] == i){
                removed = old.splice(i-moreDois, 1);
    
                moreDois += 1;
            }
        }
    }
      
    if(secao == 1)localStorage.setItem('missions', JSON.stringify(old));
    if(secao == 2)localStorage.setItem('missions2', JSON.stringify(old));
    if(secao == 3)localStorage.setItem('missions3', JSON.stringify(old));
    if(secao == 4)localStorage.setItem('missions4', JSON.stringify(old));

    deleteState = false;


    verify();
}

function editItem(){
    if(editState == true){
        editState = false;
        ed.style.setProperty('background', '#222222');
        pop.classList.remove('pop-animation')
        pop.style.setProperty('z-index', '0');
        block.style.setProperty("z-index", "0")
    }else{
        editState = true;
        ed.style.setProperty('background', '#474747');
        pop.classList.add('pop-animation');
        pop.style.setProperty('z-index', '20');
        block.style.setProperty("z-index", "2")
    }
    
    
    for(let i = 0; i < lista.childElementCount; i++){
        let item = lista.children[i];

        item.addEventListener("click", editation);


        function editation(){
            if(editState == true){
                pop.classList.remove('pop-animation');
                pop.style.setProperty('z-index', '0');
                resumo.disabled = false;

                if(secao == 1)quest = JSON.parse(localStorage.getItem('missions'));
                if(secao == 2)quest = JSON.parse(localStorage.getItem('missions2'));
                if(secao == 3)quest = JSON.parse(localStorage.getItem('missions3'));
                if(secao == 4)quest = JSON.parse(localStorage.getItem('missions4'));

                let cancel = false;
                let titleNull = false;
                backup_title = quest[i].title;
                let backup_abstract = quest[i].abstract;
                
                console.log(backup_abstract)
                quest[i].title = prompt("Titulo", quest[i].title)


                if(quest[i].title == null){
                    quest[i].title = backup_title;
                    cancel = true;
                    resumo.disabled = true;
                    block.style.setProperty("z-index", "0")
                }else{
                    while(quest[i].title.length >= 14 && titleNull == false){
                        quest[i].title = prompt("Apenas 14 caracteres", quest[i].title);
                        if(quest[i].title == null){
                            quest[i].title = backup_title;
                            cancel = true;
                            titleNull = true;
                            resumo.disabled = true;
                        };
                    }
                }


                if(cancel != true){
                    console.log(quest[i])
                    if(quest[i].abstract.substr(0, 4) == "C - " || quest[i].abstract.substr(0, 4) == "R - "){
                        
                        
                        quest[i].abstract = prompt("Número natural");
                        if(quest[i].abstract == null)cancel = true;

                        let parse = parseInt(quest[i].abstract)
                        let check = parse;
                        console.log(parse, check)
                        if(cancel == false && parse != check || cancel == false && parse < 0){
                            let parseq;
                            let checkq;
                            do {
                                quest[i].abstract = prompt("Número natural necessário");
                                parseq = parseInt(quest[i].abstract)
                                checkq = parseq;
    
                                if(quest[i].abstract == null)cancel = true;
                            } while (parseq != checkq && cancel == false || cancel == false && parseq < 0);  
                        }

                        let novo = new Date;
                        quest[i].abstract = backup_abstract.substr(0, 4) +novo.getDate()+"/"+novo.getMonth()+"/"+novo.getFullYear()+"/"+quest[i].abstract;
                        
                        if(cancel == true){
                            quest[i].abstract=backup_abstract;
                            quest[i].title = backup_title;
                            numEditado = 1000;
                            numBackup = "";
                            block.style.setProperty("z-index", "0")
                        }
                        

                        
                        editState = false;
                        resumo.disabled = true;
                        block.style.setProperty("z-index", "0")
                    }else{
                        numEditado = i;
                        numBackup = backup_abstract
                        antiBurlAbstract--;

                        creator.style.setProperty('z-index', 4);
                        creator.style.setProperty('opacity', 1);
                        opcoes.style.setProperty('opacity', 0);
                        editState = false;
                        block.style.setProperty("z-index", "2")
                    }
                }
                


                if(secao == 1)localStorage.setItem('missions', JSON.stringify(quest));
                if(secao == 2)localStorage.setItem('missions2', JSON.stringify(quest));
                if(secao == 3)localStorage.setItem('missions3', JSON.stringify(quest));
                if(secao == 4)localStorage.setItem('missions4', JSON.stringify(quest));

            

                verify();
                abstract(i);
                
                
                ed.style.setProperty('background', '#222222');
            }
        }
    }
}



function removeAll(){
    let listaSize = lista.childElementCount;


    for(let i = 0; i < listaSize; i++){
        let item = lista.children[0];
                

        item.remove();
    }

    repeteco = false;
}
