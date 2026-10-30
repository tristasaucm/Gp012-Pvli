import Enemy from './Enemy.js';

/**
 * Clase que representa al enemigo Ansiedad
 * @extends Enemy
 */
export default class Ansiedad extends Enemy
{
    /**
	 * Constructor de Ansiedad
	 * @param {Scene} scene Escena en la que aparecerá el enemigo
	 * @param {number} x - coordenada X
	 * @param {number} y - coordenada Y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 0, 'ansiedad'); // llamamos al constructor de Enemy con velocidad 0 e imagen 'ansiedad'
		this.setDisplaySize(45, 45); // asignamos el tamaño con el que queremos que se vea su imagen
		
		this.play('ansiedad_idle');
		
        this.flipX = false;
	}
}