/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Credits extends Phaser.Scene{
    constructor(){
        super({key:'credits'});//Nombre de la escena en el scene manager
    }
    /**
	* Carga de los recursos que vamos a necesitar en la escena
	*/
	preload(){
		this.load.image('fondo', 'assets/fondo.jpg');
		this.load.image('logo', 'assets/Logo.png');
         
	}
    create() {
        //Ponemos el fondo
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        //Logo del juego
		const logoImagen = this.add.image(450, 150, 'logo').setOrigin(0, 0);
		logoImagen.setDisplaySize (300,300);

        //Titulo del juego
        this.add.text(100, 100, "MENTAL", {
			fontFamily: "Comic Sans MS",
			fontSize: "48px",
		});
		this.add.text(50, 175, "BREAKDOWN", {
			fontFamily: "Comic Sans MS",
			fontSize: "48px",
			backgroundColor: "#ff5478",
		});
        //Nombre de los integrantes
        this.add.text(100,250,"Integrantes",{
            fontFamily: "Comic Sans MS",
			fontSize: "28px",
         });


        this.add.text(50,300,"CHEN, ZIMIN \nLADRÓN DE GUEVARA JIMÉNEZ, JORGE\nOLTEAN, GABRIEL ADRIAN\nSÁNCHEZ LÓPEZ, TRISTÁN ",{
            fontFamily: "Comic Sans MS",
			fontSize: "20px",
        });

        let botonBackMenu = this.add.text(200, 500 ,"MENU", {
		    fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#2266aa",
            padding: { x: 20, y: 10 }
		});
        botonBackMenu.setOrigin(0.5,0.5);
        botonBackMenu.setInteractive({ useHandCursor: true });

        botonBackMenu.on("pointerover",()=>{
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
}