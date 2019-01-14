const game = {
    data: {
        pig : {
            checks: [],
            win: 0,
            image: "assets/images/pig.png"
        },
        wolf : {
            checks: [],
            win: 0,
            image: "assets/images/wolf.png"
        },
        gameSize : 3
    },
    methods: {
        setWinner : (animal) => {
            switch (animal) {
                case "pig":
                    game.data.pig.win++;
                    break;
                case "wolf":
                    game.data.wolf.win++;
                    break;
                default:
                    break;
            }
        },
        evaluate : (val, array) => {
            var ev = game.methods;
            if(ev.evaluateX(val, array) || ev.evaluateY(val, array) || ev.evaluateDiag(val, array))
                return true;
            return false;
        },
        evaluateX : (val, array) => {
            let y = val.y, count=0;
            for (let x = 0; x < game.data.gameSize; x++) {
                array.forEach((el, index) => {
                    if(el.y == y && el.x == x)
                        count++;
                });
            }
            if(count == 3) return true;
            return false;
        },
        evaluateY : (val, array) => {
            let x = val.x, count=0;
            for (let y = 0; y < game.data.gameSize; y++) {
                array.forEach((el, index) => {
                    if(el.x == x && el.y == y)
                        count++;
                });
            }
            if(count == 3) return true;
            return false;
        },
        evaluateDiag1 : (val, array) => {
            let count=0, size = game.data.gameSize;
            for (let i = 0; i < size; i++) {
                array.forEach((el, index) => {
                    if(el.x == i && el.y == i)
                        count++;
                });
            }
            if(count == 3) return true;
            return false;
        },
        evaluateDiag2 : (val, array) => {
            let count=0, size = game.data.gameSize;            
            for (let i = 0; i < size; i++) {
                array.forEach((el, index) => {
                    if(el.x == i && el.y == i+((size-1)-i*2))
                        count++;
                });
            }
            if(count == 3) return true;
            return false;
        },
        addPig : (val) => {
            game.data.pig.checks.push(val);
        },
        addWolf : (val) => {
            game.data.wolf.checks.push(val);
        },
        clear : () => {
            game.data.wolf.checks = [];
            game.data.pig.checks = [];
        },
        reset : () => {
            game.methods.clear();
            game.data.wolf.win = 0;
            game.data.pig.win = 0;
        }
    }
}
