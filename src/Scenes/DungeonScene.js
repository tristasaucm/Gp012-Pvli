//Imports
import Player from '../CharactersOnDungeon/Player.js';
import Ansiedad from '../CharactersOnDungeon/Ansiedad.js';
import Object from '../Object.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Selection extends Phaser.Scene {

	constructor() {
		//id de la escena unico
		super({ key: 'Dungeon' }); //seteamos el nobmre de la escena para el SceneManager
        
        this.posX = 0;
        this.posY = 0;
	}
    init({posX=0,posY=0}){
        this.posX = posX;
        this.posY = posY;
        //console.log(this.posX);
        //console.log(this.posY);
       
    }
    preload()
    {
       
       
    }
    create(){
        //--- Constantes---
        const globalScale = 2.5;
        // #region --- Tilemap---
        //creamos el mapa 
        const map = this.make.tilemap({
            key: 'Sala1',
            tileheight: 32,
            tilewidth: 32
        });
        const tileset = map.addTilesetImage('Tilemap', 'Tiled');//Añadimos la imagen al tilemap
        //Creamos las diferentes Capas
        const suelo = map.createLayer('Suelo', tileset, 0, 0);
        const paredes = map.createLayer('Paredes',tileset,0,0);
        //Establecemos las escalas
        paredes.setScale(globalScale);
        suelo.setScale(globalScale);
        //Definimos las collisiones para todos los bloques de la capa
        paredes.setCollisionByExclusion([-1]);
        //TODO:mirar como hacer que pases por detras de cosas
        // #endregion --- Tilemap---
        //Miramos donde esta el player Spawn
        const PlayerSpawn = map.findObject('Objetos', (obj) => obj.name === 'Player');
        //Si no esta en la posicion 0 es decir esta inicializado de antes
        if(this.posY == 0 && this.posX == 0){
            this.posX = PlayerSpawn.x*globalScale ;
            this.posY = PlayerSpawn.y*globalScale;
        }
        //Puntero del raton activo
        this.pointer = this.input.activePointer;
        //Creamos el player
        let player = new Player(this, this.posX,this.posY,200,'personaje',0,this.pointer,'punto');
        //Camara de la escena
        var camera = this.cameras.main;
        camera.startFollow(player); // hacemos que la camara siga al objeto indicado
        camera.setBounds(300,400, 900,900);//Limites de la camara
        this.physics.add.collider(player,paredes); //Fisicas de collisiones con las paredes
        const Salida = map.findObject('Objetos', (obj) => obj.name === 'Salida');
        const CambioSala = this.add.zone(Salida.x * globalScale,Salida.y * globalScale, Salida.width * globalScale, Salida.height * globalScale);
        CambioSala.setOrigin(0);
       this.physics.add.existing(CambioSala,true);
       this.physics.add.overlap(player, CambioSala,()=>{
           this.scene.start("game",{posmazX: player.x,posmazY: player.y});
       });
        /*Muros
        const muro = this.add.zone(600, 300, 200, 50);
        this.physics.add.existing(muro,true);
        this.physics.add.collider(player, muro);
        */
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

        const objeto = new Object(this, player, 'objeto', 800, 600);
        this.physics.add.collider(objeto, suelo);
    }

}
