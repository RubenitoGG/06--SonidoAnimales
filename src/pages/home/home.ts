import { ANIMALES } from './../../data/data.animales';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  reproducir(a:Animal){
    console.log(a);
    let audio = new Audio;
    audio.src = a.audio;
    audio.load();
    audio.play();

    setTimeout( 
      ()=>a.reproduciendo,
       a.duracion*1000)
  }

}
