import Character from '../../Character.js';
/**
 * Clase que representa un enemigo goblin
 * @extends Character
 */

export default class AnsiedadBattle extends Character
{   
    /**
	 * Constructor de Alegría
     * @param {nombre} skills // Habilidades del personaje
	 */
    preload(scene) 
    {
        scene.load.image('ansiedad','assets/Enemies/Ansiedad/Idle/slime-idle-0.png')
    }
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed, index)
    {
        super(scene, imgKey, baseHealth, baseAttack, baseSpeed, index);
    }
    BasicAttack()
    {
        return this.Attack;
    }
    preUpdate(time, delta)
    {
        // Preupdate de la clase original
        super.preUpdate(time, delta);
    }
    isEnemy()
    {
        return true;
    }
    doSomethingAI(emotionsQueue)  // Método auxiliar para comprobar que la lógica de aVs funciona
	{
        this.play('ansiedad_attack');
        emotionsQueue[0].takeDamage(this.BasicAttack());
        
        this.once('animationcomplete-ansiedad_attack', () => 
        {
            this.play('ansiedad_idle');
        });
	}
    dieAnim()
    {
        this.play('ansiedad_die');
        this.on('animationcomplete-ansiedad_die', () => 
        {
            
        });
    }
}