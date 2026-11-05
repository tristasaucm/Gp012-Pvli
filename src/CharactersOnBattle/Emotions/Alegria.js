import Character from '../Character.js';
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

    preload(scene) 
    {
        scene.load.image('alegria','assets/Characters/Alegria/Alegria.png')
    }
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed, index)
    {
        super(scene, imgKey, baseHealth, baseAttack, baseSpeed, index);
        this.skills = [
            { nombre: "Ataque básico"}, 
            { nombre: "Habilidad"},
            { nombre: "Definitiva"}
        ]
    }
    BasicAttack()
    {
        return this.Attack;
    }
    Skill()
    {
        return this.Attack;
    }
    Ultimate()
    {
        return this.Attack;
    }
    isEnemy()
    {
        return false;
    }
    getSkills()
    {
        return this.skills;
    }
    doSomethingPlayer(enemy)  // Método auxiliar para comprobar que la lógica de aVs funciona
	{
		enemy.takeDamage(this.BasicAttack());
	}
}