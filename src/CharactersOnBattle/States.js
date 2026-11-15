/**
 * Clase que crea los estados positivos y negativos para cada personaje
 */
export default class State{

    constructor(id, stat, amount, turns)
    {
        this.id = id;
        this.stat = stat;
        this.amount = amount;
        this.turns = turns;
        this.applied = false;
    }

    getID()
    {
        return this.id;
    }
    getStat()
    {
        return this.stat;
    }
    getAmount()
    {
        return this.amount;
    }
    getTurns()
    {
        return this.turns;
    }
    isApplied()
    {
        return this.applied;
    }
    setApplied(boolean)
    {
        this.applied = boolean;
    }
}