import Character from '../Character.js';
/**
 * Clase que representa un personaje Miedo
 * @extends Character
 */

export default class Miedo extends Character
{   
    /**
	 * Constructor de Miedo
     * @param {nombre} skills // Habilidades del personaje
	 */

    preload(scene) 
    {
        scene.load.image()
    }
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed, index)
    {
        super(scene, imgKey, baseHealth, baseAttack, baseSpeed, index);
        this.skills = [
            { nombre: "Ataque básico"}, 
            { nombre: "Habilidad"},
            { nombre: "Definitiva"}
        ]
        this.cargaValentia = 0;
    }
    BasicAttack(scene)
    {
        const probGolpe = 0.5 + this.cargaValentia * 0.25;
        if (this.cargaValentia > 0) this.cargaValentia--;
        
        const random = Math.random();
        if (random < probGolpe)
        {
            scene.enemiesQueue.forEach(enemy => {
                enemy.takeDamage(this.Attack);
            })
        }
    }
    Skill(scene)
    {
        if (this.cargaValentia < 2) this.cargaValentia++;
    }
    Ultimate(scene)
    {
        if (this.cargaValentia == 2)
        {
            scene.enemiesQueue.forEach(enemy => {
                enemy.takeDamage(this.Attack);
                enemy.addNegativeState();
            })
        }
        else
        {
            this.cargaValentia = 2; 
            this.BasicAttack(scene);
            this.cargaValentia = 2; 
        }
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