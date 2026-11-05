import Hud from '../Hud.js'
/**
 * Clase que representa un personaje
 * @extends Phaser.GameObjects.Sprite
 */

export default class Character extends Phaser.GameObjects.Sprite
{   
    /**
       === ESCENA ===
     * @param {Scene} scene - Escena en la que aparecerá el player
     * @param {string} imgKey - nombre de la imagen que representa al player
     * === STATS BASE===
     * @param {number} baseHealth - Vida base
     * @param {number} baseAttack - Ataque base
     * @param {number} baseSpeed - Velocidad base
     * @param {number} baseactionValue - Valor de acción base
     * === STATS ===
     * @param {number} Health - Vida actual
     * @param {number} Attack - Ataque actual
     * @param {number} Speed - Velocidad actual
     * @param {number} actionValue - Valor de acción actual
     * === CONDICIONES EXTRA ===
     * @param {number} actionsThisBattle - Nº de veces que ha actuado en el combate actual
     * @param {Hud} interfaz - Interfaz con las barras de vida
	 */
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed, hud)
    {
        /* === ESCENA === */
        this.scene.add.existing(this);
        this.setDisplaySize(100,100);
        this.body.key = imgKey;

        /* === STATS BASE === */
        this.baseHealth = baseHealth;
        this.baseAttack = baseAttack;
        this.baseSpeed = baseSpeed;
        this.baseactionValue = 10000 / this.baseSpeed;

        /* === STATS === */
        this.Health = this.baseHealth;
        this.Attack = this.baseAttack;
        this.Speed = this.baseSpeed;
        this.actionValue = 10000 / this.Speed;

        /* === CONDICIONES EXTRA === */
        this.actionsThisBattle = 0;

        /* === HUD === */
        this.interfaz = this.hud;
    }

    /* === RECIBIR DAÑO === */

    // Pierde vida en relación a un porcentaje
    takeDamagePercentage (damage)
    {
        this.Health -= this.Health * damage/100;
        
        if (this.Health < 0) this.Health = 0;
    }
    // Pierde vida en relación a una cantidad fija
    takeDamage (damage)
    {
        this.Health -= damage;
        
        if (this.Health < 0) this.Health = 0;
    }

    /* === AUMENTO DE VIDA === */

    // Gana vida en relación a un porcentaje
    gainHealthPercentage (amount)
    {
        this.Health += this.baseHealth * amount/100;
    }
    // Gana vida en relación a una cantidad fija
    gainHealthFlat (amount)
    {
        this.Health += amount;
    }

    /* === ESTADO DEL PERSONAJE === */

    // Devuelve si el personaje sigo vivo o no
    isAlive()
    {
        return this.Health < 0
    }

    getBaseSpeed()
    {
        return this.baseSpeed;
    }
    getCurrentSpeed()
    {
        return this.Speed;
    }
    getCurrentHealthPercentage()
    {
        return this.Health/this.baseHealth
    }
    getBaseaV()  //  aV = Action Value
    {
        return this.baseactionValue;
    }
    getCurrentaV()
    {
        return this.actionValue;
    }
    setaV(amount)
    {
        this.actionValue += amount;
    }

    getactionsThisBattle()
    {
        return this.actionsThisBattle;
    }
    actionCompleted()
    {
        this.actionsThisBattle++;
    }

}