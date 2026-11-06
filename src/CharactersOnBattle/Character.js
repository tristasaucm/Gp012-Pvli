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
     * @param {number} startQueueIndex - Indice inicial en el array de personajes (para saber cual es su barra de vida)
	 */
    constructor (scene, imgKey, baseHealth, baseAttack, baseSpeed, index)
    {
        /* === ESCENA === */
        super(scene, 0, 0, imgKey);
        this.scene.add.existing(this);
        this.setDisplaySize(100,100);

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

        /* === Indice de enemigo === */
        this.startQueueIndex = index;
    }

preUpdate(time, delta) 
{
    super.preUpdate(time, delta);
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
        this.flashRed();
        this.showDamage(damage);

        if (this.Health < 0) this.Health = 0;
    }
    // El personaje se pone rojo por un instante al recibir daño
    flashRed() 
    {
        this.setTint(0xff0000);
        this.scene.time.delayedCall(150, () => {this.clearTint();});
    }
    // Enseña el daño recibido
    showDamage(damage) 
    {
        let damageText = this.scene.add.text
        (
            this.x,
            this.y - 50,
            `-${damage}`,
            {
                fontSize: '24px',
                color: '#ff3333',
                stroke: '#000000',
                strokeThickness: 4
            }
        );

        damageText.setOrigin(0.5);

        this.scene.tweens.add
        ({
            targets: damageText,
            y: damageText.y - 60,
            alpha: 0,
            duration: 800,
        });

        onComplete: () => {damageText.destroy();}
    };

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
        return this.Health > 0
    }

    getBaseSpeed()
    {
        return this.baseSpeed;
    }
    getCurrentSpeed()
    {
        return this.Speed;
    }
    getCurrentHealth()
    {
        return this.Health;
    }
    getCurrentHealthPercentage()
    {
        return this.Health/this.baseHealth
    }
    getBaseAV()  //  AV = Action Value
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
    getIndex()
    {
        return this.startQueueIndex;
    }
}