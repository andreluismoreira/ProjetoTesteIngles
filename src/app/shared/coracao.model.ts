export class Coracao{

    constructor(
        public cheio: boolean,
        public urlcoracaoCheio: string = '/assets/coracao_cheio.png',
        public urlcoracaoVazio: string = '/assets/coracao_vazio.png'
    ){}
    
        public exibeCoracao(): string{
            if(this.cheio){
                return this.urlcoracaoCheio
            }
            else{
                return this.urlcoracaoVazio
            }
        }


}