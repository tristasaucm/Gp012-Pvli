import Character from './Character.js';
/**
 * Clase que representa un enemigo goblin
 * @extends Character
 */

export default class Alegria extends Character
{   
    /**
	 * Constructor de Alegría
     * @param {nombre} skills // Habilidades del personaje
	 */
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed)
    {
        super(scene, imgKey, baseHealth, baseAttack, baseSpeed);
        this.skills = [
            { nombre: "Ataque básico", damage = this.Attack}
            { nombre: "Habilidad", damage = this.Attack}
            { nombre: "Definitiva", damage = this.Attack}
        ]
        BasicAttack()
        {
            return damage = this.Attack;
        }
        Skill()
        {
            return damage = this.Attack;
        }
        Ultimate()
        {
            return damage = this.Attack;
        }
    }

}