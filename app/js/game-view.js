var turn = "pig";
var tictac = document.getElementById("tictac");

var initGame = () => {
    let section = document.getElementById('game');
    section.classList.add("active");
    createSquare();		
}

var createSquare = () => {
    if(document.getElementsByClassName("sqImg").length == 0){
        let size = game.data.gameSize;    
        for (let i = 0; i < size; i++) {
            let row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < size; j++) {
                let square = document.createElement("div");
                square.classList.add("box");
    
                let image = document.createElement("img");
                image.setAttribute("src", "assets/images/transparent.png");
                image.addEventListener("click", (ev) => { checkSquare(ev); })
                image.classList.add("sqImg")
                square.append(image);
    
                row.append(square);
            }
            tictac.append(row);
        }
    }
}

var checkSquare = (ev) => {
    let url = "assets/images/"+turn+".png";
    let el = ev.currentTarget;
    if(!el.classList.contains("checked")){
        el.setAttribute("src", url);
        el.classList.add("checked");
    
        let val = getPosition(el);
        var arr_selected = [];
        if(turn == "pig"){
            game.methods.addPig(val);
            arr_selected = game.data.pig.checks;
        }
        else{
            game.methods.addWolf(val);
            arr_selected = game.data.wolf.checks;
        }
        
        evaluteWin(val, arr_selected);
    
        turn = turn == "pig" ? "wolf" : "pig";
        url = "assets/images/"+turn+".png";
        document.getElementById("turn-image").setAttribute("src", url);
    }    
}

var getPosition = (el) => {
    let sq = document.getElementsByClassName("sqImg");
    let index = 0; 
    for (index = 0; index < sq.length; index++) {
        if(sq[index] == el)
        break;
    }

    var x = index;
    while(x > 2){
        x -= 3; 
    }
    var y = parseInt(index / game.data.gameSize);

    return val = {"x": x, "y": y};
}

var evaluteWin = (val, array) => {
    let ev = game.methods;   
    var res = false;
    if(ev.evaluateX(val, array)){
        var width = document.getElementsByClassName("box")[0].clientWidth;
        tictac.classList.add("win-x-"+val.y);
        tictac.classList.add("win-x");
        res = true;
    }
    if(ev.evaluateY(val, array)){
        var width = document.getElementsByClassName("box")[0].clientWidth;
        tictac.classList.add("win-y");
        tictac.classList.add("win-y-"+val.x);
        res = true
    }
    if(ev.evaluateDiag1(val, array)){
        tictac.classList.add("win-d1");
        res = true
    }
    if(ev.evaluateDiag2(val, array)){
        tictac.classList.add("win-d2");
        res = true
    }
    if(res){
        tictac.classList.remove("no-win");
        let win = document.getElementById('game-win');
        document.getElementById('imgwinner').setAttribute("src", game.data[turn].image);
        
        Array.from(document.getElementsByClassName('sqImg')).forEach(el => {
            el.classList.add("checked");
        });
        document.getElementById('info').innerText = "Se acabo la partida. ";

        setTimeout(() => { 
            win.classList.add("modal-active");
		}, 1500);
        game.methods.setWinner(turn);
        resetPoints();
    }
}

var clearTicTac = () => {
    let sq = document.getElementsByClassName("sqImg");
    tictac.className = "";
    tictac.classList.add("no-win");

    for (let i = 0; i < sq.length; i++) {
        let image = sq[i];
        image.setAttribute("src", "assets/images/transparent.png");
        image.classList.remove("checked");
    }
    document.getElementById('info').innerText = "Es el turno del ";
    game.methods.clear();
}

Array.from(document.getElementsByClassName('refreshGame')).forEach(el => {
    el.addEventListener('click', (ev) => { 
        clearTicTac(ev);
        closeModal(ev);
    })
});

Array.from(document.getElementsByClassName('resetGame')).forEach(el => {
    el.addEventListener('click', (ev) => { 
        game.methods.reset();
        resetPoints();
    })
});

var resetPoints = () => {
    document.getElementById('pigPoint').innerText = game.data.pig.win;
    document.getElementById('wolfPoint').innerText = game.data.wolf.win;
}