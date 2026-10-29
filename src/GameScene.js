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
    this.load.image('fondoBarra','assets/hud/Barras/FondoBarras.png');
    this.load.image('barraAlegria','assets/hud/Barras/BarraAlegria.png');
    this.load.image('barraLocura','assets/hud/Barras/BarraLocura.png');
}
create(){
    this.pointer = this.input.activePointer;
    this.add.image(0,0,'fondo').setOrigin(0,0);
    //Tener en cuenta que con el let la variable solo se puede usar en el create si queremos usarla en mas sitios usar el this.player
    let player = new Player(this, 300,300,200,'personaje',0,this.pointer,'punto');
    this.cameras.main.startFollow(player); // hace que la camara siga al objeto indicado
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

    // Barras con los fondos
    this.fondoBarraAlegria = this.add.image(10, 10, 'fondoBarra').setOrigin(0, 0);
    this.interiorBarraAlegria = this.add.image(10, 10, 'barraAlegria').setOrigin(0, 0);
    this.fondoBarraLocura = this.add.image(750, 265, 'fondoBarra').setOrigin(0, 0).setAngle(270);
    this.interiorBarraLocura = this.add.image(750, 265, 'barraLocura').setOrigin(0, 0).setAngle(270);

    // Para que se queden fijos en la camara
    this.fondoBarraAlegria.setScrollFactor(0, 0);
    this.interiorBarraAlegria.setScrollFactor(0, 0);
    this.fondoBarraLocura.setScrollFactor(0, 0);
    this.interiorBarraLocura.setScrollFactor(0, 0);

    // Porcentaje inicial
    this.porcentajeAlegria = 1;
    this.porcentajeLocura = 1;

    // Capturar las flechas del teclado para bajar y subir los porcentajes de las barras
    this.teclas = this.input.keyboard.createCursorKeys();

    // Para que se llame al preupdate
    this.events.on('preupdate', this.preUpdate, this);
}
preUpdate(){
    if (Phaser.Input.Keyboard.JustDown(this.teclas.left)) {
        this.porcentajeAlegria -= 0.1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.teclas.right)) {
        this.porcentajeAlegria += 0.1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.teclas.up)) {
        this.porcentajeLocura += 0.1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.teclas.down)) {
        this.porcentajeLocura -= 0.1;
    }
    // Ajuste de los porcentajes entre 0 y 1
    this.porcentajeAlegria = Phaser.Math.Clamp(this.porcentajeAlegria, 0, 1);
    this.porcentajeLocura = Phaser.Math.Clamp(this.porcentajeLocura, 0, 1);

    // Actualizacion de las imagenes
    this.interiorBarraAlegria.setCrop(0,0,this.interiorBarraAlegria.width * this.porcentajeAlegria,this.interiorBarraAlegria.height);
    this.interiorBarraLocura.setCrop(0,0,this.interiorBarraLocura.width * this.porcentajeLocura,this.interiorBarraLocura.height);
}
}