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
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed)
    {
        super(scene, imgKey, baseHealth, baseAttack, baseSpeed);
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
    preUpdate(time, delta)
    {
        // Actualizar la barra de vida de alegria para que este constantemente con la vida actual del personaje
        // this.interfaz.updateAlegriaHealthBar(this.getCurrentHealthPercentage());
        // Preupdate de la clase original
        super.preUpdate(time, delta);
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