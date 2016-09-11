

class Pippo {
    age: number;
    name: string = "Max";

}

class Topolino {
    pluto: Pippo;

    constructor(pluto: Pippo) {
         this.pluto = pluto;
    }

}

let pippo = new Pippo();
let topolino = new Topolino(pippo);

console.log(topolino.pluto.name);


