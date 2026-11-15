import Character from '../Character.js';
/**
 * Clase que representa un personaje Tristeza
 * @extends Character
 */

export default class Tristeza extends Character
{   
    /**
	 * Constructor de Tristeza
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
    }
    BasicAttack(scene)
    {
        scene.chooseEnemy(enemy => {
            if (enemy.findNegativeState('Depresion'))
            {
                scene.enemiesQueue.forEach(enemy1 => {
                    enemy1.takeDamage(this.Attack);
                })
            }   
            else
            {
                enemy.takeDamage(this.Attack);
            }
        });

    }
    Skill(scene)
    {
        scene.chooseEnemy(enemy => {
            this.depresion = new State('Depresion', 'Attack', 20, 3);
            enemy.addNegativeState(this.depresion);
        });
    }
    Ultimate(scene)
    {
        scene.enemiesQueue.forEach(enemy => {
            if (enemy.findNegativeState('Depresion'))
            {
                enemy.takeDamage(this.Attack * 2);
            }
            else
            {
                enemy.addNegativeState(this.depresion);
            }
        })
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