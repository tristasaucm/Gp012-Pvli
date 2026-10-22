/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
	constructor() {
		//id de la escena unico
		super({ key: 'menu' }); //seteamos el nobmre de la escena para el SceneManager
	}
	
	/**
	* Carga de los recursos que vamos a necesitar en la escena
	*/
	preload(){
		this.load.image('fondo', 'assets/fondo.jpg');
		this.load.image('logo', 'assets/Logo.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		//Imagen de fondo
		this.add.image(0, 0, 'fondo').setOrigin(0, 0);

		//Logo del juego
		const logoImagen = this.add.image(450, 150, 'logo').setOrigin(0, 0);
		logoImagen.setDisplaySize (300,300);

		//Titulo

        this.add.text(100, 100, "MENTAL", {
			fontFamily: "Comic Sans MS",
			fontSize: "48px",
		});
		this.add.text(50, 175, "BREAKDOWN", {
			fontFamily: "Comic Sans MS",
			fontSize: "48px",
			backgroundColor: "#ff5478",
		});

		/* === BOTONES === */
    
	    const botonJugar = this.add.text(200, 300, "JUGAR", {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#2266aa",
            padding: { x: 20, y: 10 }
        });

        botonJugar.setOrigin(0.5);
        botonJugar.setInteractive({ useHandCursor: true });

        // Al pasar el ratón por encima
        botonJugar.on("pointerover", () => {
            botonJugar.setStyle({ backgroundColor: "#4488dd" });
        });

        // Al retirar el ratón
        botonJugar.on("pointerout", () => {
            botonJugar.setStyle({ backgroundColor: "#2266aa" });
        });

        // Al pulsar el botón
        botonJugar.on("pointerdown", () => {
            this.scene.start("village");
        });

		const botonCreditos = this.add.text(200, 400, "CREDITOS", {
		    fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#2266aa",
            padding: { x: 20, y: 10 }
		})

		botonCreditos.setOrigin(0.5);
        botonCreditos.setInteractive({ useHandCursor: true });

        // Al pasar el ratón por encima
        botonCreditos.on("pointerover", () => {
            botonCreditos.setStyle({ backgroundColor: "#4488dd" });
        });

        // Al retirar el ratón
        botonCreditos.on("pointerout", () => {
            botonCreditos.setStyle({ backgroundColor: "#2266aa" });
        });

        // Al pulsar el botón
        botonCreditos.on("pointerdown", () => {
            this.scene.start("credits");
        });
	}

}