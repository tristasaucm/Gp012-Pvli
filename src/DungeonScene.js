//Imports
import Player from './Player.js';
import Ansiedad from './Ansiedad.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Selection extends Phaser.Scene {
	constructor() {
		//id de la escena unico
		super({ key: 'Dungeon' }); //seteamos el nobmre de la escena para el SceneManager
       
	}
    init({posX=300,posY=500}){
        this.posX = posX;
        this.posY = posY;
        console.log(this.posX);
        console.log(this.posY);

    }
    preload()
    {
        this.load.image('fondomazmorra','assets/background/Fondos-2/Salas/Arena de piedra en una caverna orgánica.png');
        this.load.image('personaje','assets/Characters/Alegria/Alegria.png');
        this.load.image('punto','assets/objects/punto.png');
        this.load.spritesheet('ansiedad', 'assets/Enemies/Ansiedad/slime-Sheet.png', { frameWidth: 32, frameHeight: 25 });
    }
    create(){
        this.pointer = this.input.activePointer;
        this.add.image(0,0,'fondomazmorra').setOrigin(0,0);
        //Tener en cuenta que con el let la variable solo se puede usar en el create si queremos usarla en mas sitios usar el this.player
        let player = new Player(this, this.posX,this.posY,200,'personaje',0,this.pointer,'punto');
        this.cameras.main.startFollow(player); // hace que la camara siga al objeto indicado
        //Muros
        const muro = this.add.zone(600, 300, 200, 50);
        this.physics.add.existing(muro,true);
        this.physics.add.collider(player, muro);
        const CambioSala = this.add.zone(1400, 500, 200, 50);
        this.physics.add.existing(CambioSala,true);
        this.physics.add.overlap(player, CambioSala,()=>{
            this.scene.start("game",{posmazX: player.x,posmazY: player.y});
        });
        let botonBackMenu = this.add.text(650, 30 ,"MENU", 
    {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#2266aa",
        padding: { x: 20, y: 10 }
    });
    botonBackMenu.setScale(0.8);
    botonBackMenu.setOrigin(0.5,0.5);//Cambiamos su origen
    botonBackMenu.setInteractive({ useHandCursor: true }); // hacemos que sea un botón
    botonBackMenu.setScrollFactor(0,0);//Ponemos que pertenezca al HUD
    botonBackMenu.on("pointerover",()=>
    {
        botonBackMenu.setScale(1);
        botonBackMenu.setStyle({ backgroundColor: "#4488dd" });
    });
    botonBackMenu.on("pointerout",()=>{
        botonBackMenu.setScale(0.8);
        botonBackMenu.setStyle({ backgroundColor: "#2266aa" });
    });
    botonBackMenu.on("pointerdown",()=>{
        this.scene.start("menu");
    });
    }

}