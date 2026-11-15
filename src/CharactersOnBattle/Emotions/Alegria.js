import Character from '../Character.js';
import State from '../States.js'
/**
 * Clase que representa un personaje Alegria
 * @extends Character
 */

export default class Alegria extends Character
{   
    /**
	 * Constructor de Alegría
     * @param {nombre} skills // Habilidades del personaje
     * 
     * === ESTADOS QUE APLICA EL PERSONAJE ===
     * @param {state} felicidad // Estado positivo que aumenta daño
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

        this.healing = baseHealth * 0.20;
    }
    // Inflige daño a un enemigo. (Baja la barra de “locura”)
    BasicAttack(scene)
    {
        scene.chooseEnemy(enemy => {
            enemy.takeDamage(this.Attack);
            scene.nextCharactersTurn();
        });
    }
    // Cura a un aliado y elimina los estados negativos que tenga. (Sube la barra de “locura”)
    Skill(scene)
    {
        scene.chooseAlly(ally => {
            ally.gainHealthFlat(this.healing);
            ally.removeAllNegativeState();
            scene.nextCharactersTurn();
        });
    }
    // Adelanta la acción de todos los aliados y les aplica “felicidad” aumentando el daño que hacen.  (Sube la barra de “locura”)
    Ultimate(scene)
    {
        this.felicidad = new State('Felicidad', 'Attack', 20, 3);
        scene.emotionsQueue.forEach(emotion => {
            emotion.setAV(0);
            emotion.addPositiveState(this.felicidad);
            scene.nextCharactersTurn();
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