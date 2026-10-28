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
    this.load.image('fondo','assets/background/fondo.jpg');
    this.load.image('personaje','assets/caracters/orc.png');
    this.load.image('punto','assets/objects/punto.png');
   
}
create(){
    this.pointer = this.input.activePointer;
    this.add.image(0,0,'fondo').setOrigin(0,0);
    //Tener en cuenta que con el let la variable solo se puede usar en el create si queremos usarla en mas sitios usar el this.player
    let player = new Player(this, 300,300,200,'personaje',0,this.pointer,'punto');
    this.cameras.main.startFollow(player); // hace que la camara siga al objeto indicado
    //botón de vuelta al menu
    let botonBackMenu = this.add.text(720, 40 ,"MENU", 
    {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#2266aa",
        padding: { x: 20, y: 10 }
    });
    botonBackMenu.setOrigin(0.5,0.5);//Cambiamos su origen
    botonBackMenu.setInteractive({ useHandCursor: true }); // hacemos que sea un botón
    botonBackMenu.setScrollFactor(0,0);//Ponemos que pertenezca al HUD
    botonBackMenu.on("pointerover",()=>
    {
        botonBackMenu.setScale(1.2);
        botonBackMenu.setStyle({ backgroundColor: "#4488dd" });
    });
    botonBackMenu.on("pointerout",()=>{
        botonBackMenu.setScale(1);
        botonBackMenu.setStyle({ backgroundColor: "#2266aa" });
    });
    botonBackMenu.on("pointerdown",()=>{
        this.scene.start("menu");
    });

}
preUpdate(){
    
}
}