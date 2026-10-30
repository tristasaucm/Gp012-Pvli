import Player from './Player.js';
import Ansiedad from './Ansiedad.js';
import Barra from './Barra.js';
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
    this.load.image('fondojuego','assets/Background/Fondos-2/Combate/ARENA.png');
    this.load.image('personaje','assets/Characters/Alegria/Alegria.png');
    this.load.image('punto','assets/objects/punto.png');
    this.load.spritesheet('ansiedad', 'assets/Enemies/Ansiedad/slime-Sheet.png',
                         { frameWidth: 32, frameHeight: 25 });
    this.load.image('fondoBarra','assets/hud/Barras/FondoBarras.png');
    this.load.image('barraAlegria','assets/hud/Barras/BarraAlegria.png');
    this.load.image('barraLocura','assets/hud/Barras/BarraLocura.png');
}
create(){
    this.pointer = this.input.activePointer;
    this.add.image(0,0,'fondojuego').setOrigin(0,0);
    //Tener en cuenta que con el let la variable solo se puede usar en el create si queremos usarla en mas sitios usar el this.player
    let player = new Player(this, 300,500,200,'personaje',0,this.pointer,'punto');

    // Barras con los fondos
    let BarraAlegria = new Barra(this, 10,10,'fondoBarra','barraAlegria',0,0.75);
    let BarraLocura = new Barra(this, 750,270,'fondoBarra','barraLocura',270,1);

    this.cameras.main.startFollow(player); // hace que la camara siga al objeto indicado

    this.anims.create({
        	key: 'ansiedad_idle',
        	frames: this.anims.generateFrameNumbers('ansiedad', { start: 0, end: 2 }),
        	frameRate: 1.75,
        	repeat: -1,
			yoyo: true
    	});

    let ansiedad = new Ansiedad(this, 750, 525);
    
    //botón de vuelta al menu
    let botonBackMenu = this.add.text(650, 40 ,"MENU", 
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