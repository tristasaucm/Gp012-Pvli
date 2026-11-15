import Hud from '../Hud.js'
import State from './States.js'
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
     * @param {number} positiveQueue - Array de estados positivos/buffs
     * @param {number} negativeQueue - Array de estados negativos/debuffs
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

        /* === ESTADOS === */
        this.positiveQueue = [];
        this.negativeQueue = [];

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
    /* === AUMENTO/DECREMENTO DAÑO === */

    // Gana daño en relación a un porcentaje
    gainDamagePercentage (amount)
    {
        this.Attack += this.baseAttack * amount/100; // De momento solo se aumenta su ataque actual (a lo mejor sea mas conveniente tener una variable de daño)
    }
    // Gana daño en relación a un porcentaje
    loseDamagePercentage (amount)
    {
        this.Attack -= this.baseAttack * amount/100; // De momento solo se aumenta su ataque actual (a lo mejor sea mas conveniente tener una variable de daño)
    }

    /* === ESTADOS NEGATIVOS/POSITIVOS === */
    addNegativeState(state) // Añadir un estado negativo
    {
        let i = 0;
        while (i < this.negativeQueue.length && this.negativeQueue[i].id != state.id)
        {
            i++;
        }
        if (i == this.negativeQueue.length)
        {
            this.negativeQueue.push(state);
        }
    }
    removeNegativeState(state) // Eliminar un estado negativo específico
    {
        let i = 0;
        while (i < this.negativeQueue.length && this.negativeQueue[i].id != state.id)
        {
            i++;
        }
        if (i != this.negativeQueue.length)
        {
            this.negativeQueue.splice(i, 1);
        }
    }
    removeAllNegativeState() // Eliminar todo los estados negativos
    {
        this.negativeQueue.splice(0, this.negativeQueue.length);
    }
    addPositiveState(state) // Añadir un estado positivo
    {
        let i = 0;
        while (i < this.positiveQueue.length && this.positiveQueue[i].id != state.id)
        {
            i++;
        }
        if (i == this.positiveQueue.length)
        {
            this.positiveQueue.push(state);
        }
    }
    removePositiveState() // Eliminar un estado positivo
    {
        let i = 0;
        while (i < this.positiveQueue.length && this.positiveQueue[i].id != state.id)
        {
            i++;
        }
        if (i != this.positiveQueue.length)
        {
            this.positiveQueue.splice(i, 1);
        }
    }
    removeAllPositiveState() // Eliminar todos los estados positivos
    {
        this.positiveQueue.splice(0, this.negativeQueue.length);
    }
    removeAllStates() // Eliminar todos los estados
    {
        this.removeAllNegativeState();
        this.removeAllPositiveState();
    }
    findNegativeState(id)
    {
        const found = false;
        let i = 0;

        while (i < this.negativeQueue.length && !found)
        {
            if (this.negativeQueue[i].id == id) found = true;
            else i++;
        }

        return found;
    }
    findPositiveState(id)
    {
        const found = false;
        let i = 0;

        while (i < this.positiveQueue.length && !found)
        {
            if (this.positiveQueue[i].id == id) found = true;
            else i++;
        }

        return found;
    }
    applyStates()
    {
        this.positiveQueue.array.forEach(positiveState => 
        {
            if(!positiveState.isApplied())
            {
                if (positiveState.stat == "Attack")
                {
                    this.gainDamagePercentage(positiveState.amount);
                    positiveState.setApplied(true);
                }
            }
        });
        this.negativeQueue.array.forEach(negativeState => 
        {
            if(!negativeState.isApplied())
            {
                if (negativeState.stat == "Attack")
                {
                    this.loseDamagePercentage(negativeState.amount);
                    negativeState.setApplied(true);
                }
            }
        });
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
    getCurrentAV()
    {
        return this.actionValue;
    }
    setAV(amount)
    {
        if(amount >= 0) this.actionValue = amount;
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