import Menu from './MenuScene.js';
import Village from './VillageScene.js';
import Credits from './CreditsScene.js';
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    parent: "juego",
    type: Phaser.AUTO,
    width:  800,
    height: 600,
    pixelArt: true,
	scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    // poner aqui las escenas necesarias la primera es la primera que se carga
    scene: [Menu ,Village,Credits], // El juego contiene una escena de la clase Village, que extiende de Phaser.Scene
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 0 }, 
            debug: true 
        } 
    }
};

new Phaser.Game(config);