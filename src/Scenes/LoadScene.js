export default class load extends Phaser.Scene {
    constructor() {
		
		super({ key: 'load' }); 
       
	}
    preload(){
        //Alto y ancho del phaser
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        //Texto de cargando
        var loadText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Cargando...',
            style: {
                fontFamily: "Comic Sans MS",
                font: '32px',
                fill: '#aa2bcd'
            }
        });
        loadText.setOrigin(0.5);
        //Alto y ancho de la pantalla
        
        //Carga de imagenes
        //---Imagenes de Menus---

        this.load.image('fondomenu', 'assets/background/fondo.jpg');
        this.load.image('logo', 'assets/logos/Logo.png');
        //---Backgrounds---

        this.load.image('fondomazmorra','assets/background/Fondos-2/Salas/Sala1.png');
        this.load.image('fondojuego','assets/background/Fondos-2/Combate/ARENA.png');
       
        //---Personajes---

        this.load.image('personaje','assets/Characters/Alegria/Alegria.png');
        //---HUD del combate---

        this.load.image('fondoBarra','assets/hud/Barras/FondoBarras.png');
        this.load.image('barraAlegria','assets/hud/Barras/BarraAlegria.png');
        this.load.image('barraAnsiedad','assets/hud/Barras/BarraAnsiedad.png');
        this.load.image('barraLocura','assets/hud/Barras/BarraLocura.png');
        this.load.image('botonCambio','assets/hud/BotonCambio.png');
        this.load.image('indicadorTurno','assets/hud/IndicadorTurno.png');
        this.load.image('indicadorTurnoRival','assets/hud/IndicadorTurnoRival.png');
        this.load.image('fondoBotonCombate','assets/hud/FondoBotonCombate.png');
        this.load.image('punto','assets/objects/punto.png');
        //----Carga de spriteshets----

        this.load.spritesheet('ansiedad', 'assets/Enemies/Ansiedad/slime-Sheet.png', { frameWidth: 32, frameHeight: 25 });
        //Mira cuando la carga a terminado y se carga el menu
         this.load.on('complete', () => {
            loadText.destroy();
            this.scene.start('menu');
         });
        
    }
    create()
    { //Aqui se crean las animaciones
        this.anims.create({
        	key: 'ansiedad_idle',
        	frames: this.anims.generateFrameNumbers('ansiedad', { start: 0, end: 2 }),
        	frameRate: 1.75,
        	repeat: -1,
			yoyo: true
    	});
    }
   
}