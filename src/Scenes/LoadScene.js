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

        this.load.image('fondomazmorra','assets/Background/Fondos-2/Salas/Sala1.png');
        this.load.image('fondojuego','assets/Background/Fondos-2/Combate/ARENA.png');
       
        //---Personajes---

        this.load.image('personaje','assets/Characters/Alegria/Alegria.png');
        this.load.image('alegria','assets/Characters/Alegria/Alegria.png');
        this.load.image('ansiedad','assets/Enemies/Ansiedad/Idle/slime-idle-0.png')
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

        this.load.spritesheet('ansiedadIdle', 'assets/Enemies/Ansiedad/Idle/IdleSheet.png', { frameWidth: 32, frameHeight: 25 });
        this.load.spritesheet('ansiedadAttack', 'assets/Enemies/Ansiedad/Attack/AttackSheet.png', { frameWidth: 32, frameHeight: 25 });
        this.load.spritesheet('ansiedadDie', 'assets/Enemies/Ansiedad/Die/DieSheet.png', { frameWidth: 32, frameHeight: 25 });
        this.load.spritesheet('ansiedadHurt', 'assets/Enemies/Ansiedad/Hurt/HurtSheet.png', { frameWidth: 32, frameHeight: 25 });

        this.load.spritesheet('alegriaIdle', 'assets/Characters/Alegria/Idle/IdleSheet.png', { frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('alegriaWalk', 'assets/Characters/Alegria/Walk/WalkSheet.png', { frameWidth: 48, frameHeight: 48});
        //Mira cuando la carga a terminado y se carga el menu
         this.load.on('complete', () => {
            loadText.destroy();
            this.scene.start('menu');
         });
        
    }
    create()
    { //Aqui se crean las animaciones
        /* == ANSIEDAD == */
        this.anims.create({
        	key: 'ansiedad_idle',
        	frames: this.anims.generateFrameNumbers('ansiedadIdle', { start: 0, end: 3 }),
        	frameRate: 4,
        	repeat: -1,
    	});
        this.anims.create({
        	key: 'ansiedad_attack',
        	frames: this.anims.generateFrameNumbers('ansiedadAttack', { start: 0, end: 4 }),
        	frameRate: 4,
        	repeat: 0,
    	});
        this.anims.create({
        	key: 'ansiedad_die',
        	frames: this.anims.generateFrameNumbers('ansiedadDie', { start: 0, end: 3 }),
        	frameRate: 4,
        	repeat: 0,
    	});
        this.anims.create({
        	key: 'ansiedad_hurt',
        	frames: this.anims.generateFrameNumbers('ansiedadHurt', { start: 0, end: 3 }),
        	frameRate: 4,
        	repeat: 0,
    	});

        /* == ALEGRIA == */
        this.anims.create({
        	key: 'alegria_idle',
        	frames: this.anims.generateFrameNumbers('alegriaIdle', { start: 0, end: 4 }),
        	frameRate: 5,
        	repeat: -1,
    	});
        this.anims.create({
        	key: 'alegria_walk',
        	frames: this.anims.generateFrameNumbers('alegriaWalk', { start: 0, end: 5 }),
        	frameRate: 10,
        	repeat: -1,
    	});
    }
   
}