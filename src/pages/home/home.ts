import { ANIMALES } from './../../data/data.animales';
import { Component } from '@angular/core';
import { Refresher, NavController, reorderArray } from 'ionic-angular';
import { Animal } from '../../interfaces/animal.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales : Animal [] = [];

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

  //a:Animal se pasa por referencia
  audio = new Audio();
  reproducir(a:Animal){
    console.log(a);
    this.pausar_audio(a);

    if(a.reproduciendo){
      a.reproduciendo = false;
      return;
    }
    this.audio.src = a.audio;
    this.audio.load();
    this.audio.play();

    a.reproduciendo = true;
    this.audioTiempo = setTimeout( 
      ()=>{a.reproduciendo=false, this.audio.pause()},
       a.duracion*1000)
  }

  audioTiempo : any;
  private pausar_audio(animalSeleccionado:Animal){
    clearTimeout(this.audioTiempo)
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let a of this.animales){
      if(a.nombre != animalSeleccionado.nombre){
        a.reproduciendo = false;
      }
    }
  }

  borrar_animal(indice:number){
    this.animales.splice(indice,1);
  }

  recargar_animales (refresher:Refresher){
    setTimeout(()=>{
      console.log("inicio del refresh");
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    },2000)
  }

  reordenar_animales(indices:any){
    console.log(indices);
    this.animales = reorderArray(this.animales,indices);
  }
}
