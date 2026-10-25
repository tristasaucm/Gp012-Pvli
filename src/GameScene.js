import Player from './Player.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Game extends Phaser.Scene{

constructor(){
    super({key: 'game'});
}
preload(){
    //Cargamos el fondo y el personaje
    this.load.image('fondo','assets/fondo.jpg');
    this.load.image('personaje','assets/orc.png');
   
}
create(){
    this.add.image(0,0,'fondo').setOrigin(0,0);
    //Tener en cuenta que con el let la variable solo se puede usar en el create si queremos usarla en mas sitios usar el this.player
     let player = new Player(this, 300,300,200,'personaje',0);
     this.cameras.main.startFollow(player); // hace que la camara siga al objeto indicado

}
update(){
    
      
}
}