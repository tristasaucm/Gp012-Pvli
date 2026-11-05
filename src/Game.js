import Menu from './Scenes/MenuScene.js';
import Village from './Scenes/VillageScene.js';
import Credits from './Scenes/CreditsScene.js';
import Game from './Scenes/GameScene.js';
import Selection from "./Scenes/SelectionScene.js";
import Dungeon from "./Scenes/DungeonScene.js";
import load from "./Scenes/LoadScene.js";
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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    // poner aqui las escenas necesarias la primera es la primera que se carga
    scene: [load,Menu,Village,Credits,Game,Selection,Dungeon], // El juego contiene una escena de la clase Village, que extiende de Phaser.Scene
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 0 }, 
            debug: true 
        } 
    }
};

new Phaser.Game(config);