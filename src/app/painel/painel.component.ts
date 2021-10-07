import { HtmlAstPath } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
      //alert('A tradução esta correta!');
      this.rodada ++;
      this.progresso = this.progresso + 20
      this.atualizaRodada()
    }else{
      //alert('A tradução esta errada')
      this.tentativas --
      this.resposta = ''
      if(this.tentativas === -1){
        alert('Você perdeu todas as tentativas')
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
