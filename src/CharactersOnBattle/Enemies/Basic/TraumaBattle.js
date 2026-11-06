import Character from '../../Character.js';
/**
 * Clase que representa un enemigo goblin
 * @extends Character
 */

export default class TraumaBattle extends Character
{   
    /**
	 * Constructor de Alegría
     * @param {nombre} skills // Habilidades del personaje
	 */
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed, index)
    {
        super(scene, imgKey, baseHealth, baseAttack, baseSpeed, index);
        this.idleAnim = 'trauma_idle';
        this.hurtAnim = 'trauma_hurt';
        this.attackAnim = 'trauma_attack';
        this.dieAnim = 'trauma_die';
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
        emotionsQueue[0].takeDamage(this.BasicAttack());
	}
    getHurtAnim()
    {
        this.play('trauma_hurt');
    }
    dieAnim()
    {
        this.play('trauma_die');
        this.on('animationcomplete-trauma_die', () => 
        {
            
        });
    }
}