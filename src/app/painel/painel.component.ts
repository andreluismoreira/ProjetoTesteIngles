import { HtmlAstPath } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {frase} from '../shared/frase.model';
import { FRASES } from './frases-mock'; 

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit, OnDestroy {

  public frases: frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase!: frase
  public progresso: number = 0
  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
   this.atualizaRodada()
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  public atualizaResposta(resposta: Event): void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
  }

  public verificarResposta(): void{
   
    if (this.tratarString(this.rodadaFrase.frasePtBR) == this.tratarString(this.resposta)){
      Swal.fire({
        icon: 'success',
        title: 'Bom trabalho !',
        text: 'A Tradução esta correta',
        showConfirmButton: false,
        timer: 800
      })
      this.rodada ++;
      this.progresso = this.progresso + 20

      if(this.rodada === 5){
        Swal.fire({
          icon: 'success',
          title: 'Bom trabalho !',
          text: 'Jogo encerrado voce venceu!'
        })
        this.encerrarJogo.emit('vitoria')
      }

      this.atualizaRodada()

    }
    else{
      this.tentativas --
      this.resposta = ''
      Swal.fire({
        icon: 'error',
        title: 'Tente Novamente !',
        text: 'A Tradução esta errada',
        showConfirmButton: false,
        timer: 800
      })

      if(this.tentativas === -1){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Você perdeu todas as tentativas'
        })
         this.encerrarJogo.emit('derrota')
      }
    }
  }

  private tratarString(frase: string): string {
    while (frase.includes('  ')) {
      frase = frase.replace('  ', ' ')
    }
    return frase.trim().toUpperCase()
  }

  public atualizaRodada(): void{
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}
