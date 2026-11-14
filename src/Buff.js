export default class Buff
{
    /**
     * @param {string} methodName - Nombre LITERAL del método al que se va a llamar
     * @param {boolean} isFlat - Bool que dice si la mejora numérica es de cantidad "plana" o proporcional
     * @param {number} buff - Mejora literal que se va a aplicar
     * @param {number} numberOfCombats - Número de combates que va a durar la mejora
     * @param {Character} character - Personaje que recibe la mejora
     */

    constructor(methodName, isFlat, buff, numberOfCombats, character = null)
    {
        this.methodName = methodName;
        this.isFlat = isFlat;
        this.buff = buff;
        this.numberOfCombats = numberOfCombats;
        this.character = character;
    }

    init()
    {
        this.triggerBuff();
    }

    combatEnded()
    {
        this.numberOfCombats--;
        if (this.numberOfCombats == 0)
        {
            if (this.isFlat) this.buff = -this.buff;
            else this.buff = 1/this.buff;

            this.triggerBuff();
            this.destroy();
        }
    }

    triggerBuff()
    {
        if (this.character == null) { GameManager[this.methodName](this.buff) }
        else { this.character[this.methodName](this.buff) }
    }
}
