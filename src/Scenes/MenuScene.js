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
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		//Imagen de fondo
		this.add.image(0, 0, 'fondomenu').setOrigin(0, 0);

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
            botonJugar.setScale(1.2);
        });

        // Al retirar el ratón
        botonJugar.on("pointerout", () => {
            botonJugar.setStyle({ backgroundColor: "#2266aa" });
            botonJugar.setScale(1);
        });

        // Al pulsar el botón
        botonJugar.on("pointerdown", () => {
            this.scene.start("Selection");
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
            botonCreditos.setScale(1.2);
        });

        // Al retirar el ratón
        botonCreditos.on("pointerout", () => {
            botonCreditos.setStyle({ backgroundColor: "#2266aa" });
            botonCreditos.setScale(1);
        });

        // Al pulsar el botón
        botonCreditos.on("pointerdown", () => {
            this.scene.start("credits");
        });
        //Boton para pantalla completa
        const botonPantCompleta = this.add.text(760, 565, "[]", {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#2266aa",
            padding: { x: 5, y: 5 }
        });

        botonPantCompleta.setOrigin(0.5);
        botonPantCompleta.setInteractive({ useHandCursor: true });

        // Al pasar el ratón por encima
        botonPantCompleta.on("pointerover", () => {
            botonPantCompleta.setStyle({ backgroundColor: "#4488dd" });
            botonPantCompleta.setScale(1.2);
        });

        // Al retirar el ratón
        botonPantCompleta.on("pointerout", () => {
            botonPantCompleta.setStyle({ backgroundColor: "#2266aa" });
            botonPantCompleta.setScale(1);
        });

        // Al pulsar el botón
        botonPantCompleta.on("pointerdown", () => {
            this.scale.toggleFullscreen();
        });
	}

}