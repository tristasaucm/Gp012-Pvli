/**
 * Clase que representa un enemigo
 * @extends Phaser.GameObjects.Sprite
 */
export default class Player extends Phaser.GameObjects.Sprite {
/**
	 * Constructor de Player
	 * @param {Scene} scene Escena en la que aparecerá el player
	 * @param {number} x - coordenada X
	 * @param {number} y - coordenada Y
	 * @param {number} speed - velocidad de movimiento
	 * @param {string} imgKey - nombre de la imagen que representa al player
	 * @param {string} imgPunt - nombre de la imagen que representa al punto al que viaja
	 * @param {number} pointx - punto al que se dirije el player en x
	 * @param {number} pointy - punto al que se dirije el player en y
	 * @param {number} margenError - margen de error de la llegada al punto del jugador
     * 
	 */
	constructor(scene, x, y, speed, imgKey,dt,pointer,imgPunt)
    {
		
    }
    Create()
    {

    }
    //En el preupdate se actualiza el motor de fisicas solo no hay que llamarlo en la escena
    preUpdate()
    {

    }
}