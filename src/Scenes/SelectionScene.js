import Alegria from '../CharactersOnBattle/Emotions/Alegria.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Selection extends Phaser.Scene {

    /**
     * @param {Character[]} emotionsQueue - Lista completa de las emociones que van a estar en combate
     */
	constructor() {
		//id de la escena unico
		super({ key: 'Selection' }); //seteamos el nobmre de la escena para el SceneManager
        this.emotionsQueue = [];
	}
	preload(){
	}
    create() {

		//Imagen de fondo
		this.add.image(0, 0, 'fondomenu').setOrigin(0, 0);
        const botonJugar = this.add.text(350, 300, "Mazmorra", {
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
            this.scene.start("Dungeon");
        });
        const botonJugar2 = this.add.text(350, 400, "Juego", {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#2266aa",
            padding: { x: 20, y: 10 }
        });

        botonJugar2.setOrigin(0.5);
        botonJugar2.setInteractive({ useHandCursor: true });

        // Al pasar el ratón por encima
        botonJugar2.on("pointerover", () => {
            botonJugar2.setStyle({ backgroundColor: "#4488dd" });
            botonJugar2.setScale(1.2);
        });

        // Al retirar el ratón
        botonJugar2.on("pointerout", () => {
            botonJugar2.setStyle({ backgroundColor: "#2266aa" });
            botonJugar2.setScale(1);
        });

        // Al pulsar el botón
        botonJugar2.on("pointerdown", () => 
        {
            this.scene.start("game")
        });
    }
}