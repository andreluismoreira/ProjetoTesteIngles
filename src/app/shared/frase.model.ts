export class frase {
    // forma tradicional de instanciar atributos e construtor
    // public fraseEng: string
    // public frasePtBr: string

    // constructor(fraseEng: string, frasePtBR: string){
    //     this.fraseEng = fraseEng
    //     this.frasePtBr= frasePtBR
    // }
    // forma refatorada de instanciar atributos e construtor mas limpa e simples
    constructor(public fraseEng: string, public  frasePtBR: string) { }
}