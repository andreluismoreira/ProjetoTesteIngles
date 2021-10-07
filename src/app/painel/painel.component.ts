import { HtmlAstPath } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {frase} from '../shared/frase.model';
import { FRASES } from './frases-mock'; 

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit {

  public frases: frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase!: frase
  public progresso: number = 0
  public tentativas: number = 3

  constructor() { 
   this.atualizaRodada()
  }

  ngOnInit(): void {}

  public atualizaResposta(resposta: Event): void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
  }

  public verificarResposta(): void{
    if(this.resposta == ""){
      alert("Digite algo!")
    }
    if (this.tratarString(this.rodadaFrase.frasePtBR) == this.tratarString(this.resposta)){
      // Swal.fire(
      //   'Good job!',
      //   'A Tradução esta correta',
      //   'success'
      // )
      Swal.fire({
        icon: 'success',
        title: 'Bom trabalho !',
        text: 'A Tradução esta correta',
        showConfirmButton: false,
        timer: 1500
      })
      this.rodada ++;
      this.progresso = this.progresso + 20
      this.atualizaRodada()
    }
    else{
      this.tentativas --
      this.resposta = ''

      if(this.tentativas === -1){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Você perdeu todas as tentativas'
        })
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
