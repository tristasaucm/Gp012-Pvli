import AnsiedadBattle from '../CharactersOnBattle/Enemies/Basic/AnsiedadBattle.js';
import TraumaBattle from '../CharactersOnBattle/Enemies/Basic/TraumaBattle.js';
import Alegria from '../CharactersOnBattle/Emotions/Alegria.js';
import Hud from '../Hud.js'
/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Game extends Phaser.Scene{

    /**
     * @param {Character[]} charactersQueue - Lista completa de los personajes (emociones y enemigos) del combate, ordenada para determinar a quién le toca
     * @param {Character[]} emotionsQueue - Lista completa de las emociones que van a estar en combate
     * @param {Character[]} enemiesQueue - Lista completa de los enemigos que van a estar en combate
     * @param {Bool} waitingSkill - Se esta esperando que el jugador eliga una habilidad
     * @param {Bool} waitingTarget - Se esta esperando que el jugador eliga un target
     * @param {Character} selectedEnemy - Enemigo seleccionado
     */

constructor(){
    super({key: 'game'});
    this.emotionsQueue = [];
    this.enemiesQueue = [];
    this.charactersQueue = [];
    this.waitingSkill = false;
    this.waitingTarget = false;
}
init({posmazX = 100,posmazY = 300,data}){
    //Posicion actual de la mazmorra
    this.posmazX = posmazX;
    this.posmazY = posmazY;
    //console.log(this.posmazX);
    //console.log(this.posmazY);
    // Lista de los personajes
    // this.emotionsQueue = data.emotionsQueue;
    this.emotionsQueue = [];
    this.enemiesQueue = [];
    this.charactersQueue = [];
    this.waitingSkill = false;
    this.waitingTarget = false;

    this.rndPerc = new Phaser.Math.RandomDataGenerator();  // Generador de números aleatorios de Phaser
}
preload(){
   
}
create(){

    
    // Fondo del juego
    this.add.image(0,0,'fondojuego').setOrigin(0,0).setDisplaySize(this.scale.width, this.scale.height);
    
    /* == HUD Y FONDOS == */
    this.hud = new Hud(this, 'botonCambio', 'fondoBotonCombate', 'fondoBarra', 'barraAlegria', 'barraLocura', 'barraAnsiedad', 'indicadorTurno', 'indicadorTurnoRival');
    
    /* == PERSONAJES EN COMBATE Y TURNOS == */ //(temporal)
    let enemyIndex = 0;
    // Creamos los enemigos de la escena
    this.enemiesQueue.push(new AnsiedadBattle(this, 'ansiedad', 100, 20, 80, enemyIndex))
    enemyIndex++;
    this.enemiesQueue.push(new TraumaBattle(this, 'trauma', 100, 20, 120, enemyIndex))
    enemyIndex++;

    this.enemiesQueue[0].play('ansiedad_idle');
    this.enemiesQueue[1].play('trauma_idle');

    let characterIndex = 0;
    // Creamos personaje para la escena
    this.emotionsQueue.push(new Alegria(this, 'alegria', 400, 20, 100, characterIndex))
    characterIndex++;
    this.emotionsQueue[0].play('alegria_idle');

    // Mete todos los enemigos y personajes y ordena segun el action value
    this.charactersQueue = [...this.emotionsQueue, ...this.enemiesQueue];
    this.charactersQueue.sort((a, b) => a.getCurrentaV() - b.getCurrentaV());

    this.hud.createHealthBars(this.charactersQueue);

    // Posicionamos las emociones
    this.emotionsQueue[0].setPosition(250, 350);
    this.emotionsQueue[0].setScale(4);

    // Posicionamos los enemigos
    this.enemiesQueue[0].setPosition(550, 270);
    this.enemiesQueue[0].setScale(4);
    this.enemiesQueue[1].setPosition(600, 380);
    this.enemiesQueue[1].setScale(4);

    // Tened en cuenta que con el let la variable solo se puede usar en el 'create', si queremos usarla en más sitios tendremos que poner 'this'
    // (NOTA: cambiado a 'this' para usarlo en 'nextCharactersTurn')

    /* == BOTÓN MENU == */
    this.pointer = this.input.activePointer;
    let botonBackMenu = this.add.text(650, 30 ,"MAZMORRA", 
    {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#2266aa",
        padding: { x: 20, y: 10 }
    });
    botonBackMenu.setScale(0.8);
    botonBackMenu.setOrigin(0.5,0.5);//Cambiamos su origen
    botonBackMenu.setInteractive({ useHandCursor: true }); // hacemos que sea un botón
    botonBackMenu.setScrollFactor(0,0);//Ponemos que pertenezca al HUD
    botonBackMenu.on("pointerover",()=>
    {
        botonBackMenu.setScale(1);
        botonBackMenu.setStyle({ backgroundColor: "#4488dd" });
    });
    botonBackMenu.on("pointerout",()=>{
        botonBackMenu.setScale(0.8);
        botonBackMenu.setStyle({ backgroundColor: "#2266aa" });
    });
    botonBackMenu.on("pointerdown",()=>{
        this.scene.start("Dungeon",{posX: this.posmazX,posY: this.posmazY});
    });

    this.actualTurn();  // Primer turno del combate, le toca actuar al personaje en la posición [0] de 'charactersQueue'
}
actualTurn()
{
    console.log (this.charactersQueue);
    if (this.charactersQueue[0].isEnemy())  // Vemos si el personaje más rapido es un enemigo (si no, será siempre una emoción)
    {
        console.log ("[TURNO ENEMIGO]");

        this.hud.disableSkillButtons();
        this.charactersQueue[0].once('animationcomplete', () =>
        {
            // Volver a idle según el enemigo
            this.charactersQueue[0].play(this.charactersQueue[0].idleAnim);
            this.charactersQueue[0].doSomethingAI(this.emotionsQueue);
            // Avanzar el turno después
            this.time.delayedCall(0, () => 
            {
                this.nextCharactersTurn();
            });
        });
        this.charactersQueue[0].play(this.charactersQueue[0].attackAnim);
    }
    else
    {
        console.log ("[TURNO JUGADOR]");
        
        this.waitingSkill = true;
        this.waitingTarget = false;

        this.showButtonSkills();
        this.hud.enableSkillButtons();
    }

}
// Serie de funciones para calcular el siguiente turno
nextCharactersTurn()
{
    this.updateaVs();  // Modificamos los aVs de todos los personajes para que la cola avance "virtualmente" (aún no se cambia ninguna posición)
    this.resortCharactersQueue();  // Ahora sí, se reordena la lista para colocar al que acaba de actuar dónde le toca, y determinar quién actua ahora
    if (this.charactersQueue[0].isEnemy()) this.hud.setTurnoRival();
    else this.hud.setTurnoJugador();
    this.hud.updateHealthBars(this.charactersQueue);
    this.actualTurn();  // Técnicamente es recursivo, pero aquí debería de haber una comprobación previa de si se ha terminado el combate (futura tarea supongo)
}
// Actualiza el action value de todos los personajes
updateaVs()
{
    let sus = this.charactersQueue[0].getCurrentaV();  // aV actual del personaje que acaba de actuar

    this.charactersQueue.forEach((character) =>  // forEach: por cada 'character' en 'charactersQueue'...
    {
        character.setaV(-sus); // Se le resta el 'sus' de antes al aV de cada personaje
    });

    this.charactersQueue[0].setaV(this.charactersQueue[0].getBaseAV());  // Se reinicia el aV del personaje que acaba de actuar, devolviendo su valor al suyo base
}

// Orden de prioridades: aV actual, velocidad actual, enemigo > emoción, y menor nº de acciones en este combate. Si todo esto coincide, se lanza una moneda
resortCharactersQueue()
{
    let i = 0;
    let found = false;

    let first = this.charactersQueue[0];
    
    while ((i + 1) < this.charactersQueue.length && !found)  // La condición está a (i + 1) para que no compare al elemento [0] consigo mismo
    {
        let act = this.charactersQueue[i + 1];

        if (first.getCurrentaV() < act.getCurrentaV()) found = true;  // Compara aVs...
        
        else if (first.getCurrentaV() == act.getCurrentaV())
        {
            if (first.getCurrentSpeed() > act.getCurrentSpeed()) found = true;  // Compara velocidades...
            else if (first.getCurrentSpeed() == act.getCurrentSpeed())
            {
                if (first.isEnemy())  // Mira si 'first' es 'Enemy' y después compara
                {
                    if (act.isEnemy())
                    {
                        if (first.getactionsThisBattle() < act.getactionsThisBattle()) found = true;
                        else if (first.getactionsThisBattle() == act.getactionsThisBattle())
                        {
                            let coinflip = this.rndPerc.frac();
                            if (coinflip < 0.5) found = true; 
                        }
                    }

                    else found = true;
                }

                else if (!act.isEnemy())  // Si 'first' no es 'Enemy' tiene que ser 'Alegria' (próximamente 'Emotion' o algo así)...
                {
                    if (first.getactionsThisBattle() < act.getactionsThisBattle()) found = true;  // Compara nº de acciones en este combate...
                    else if (first.getactionsThisBattle() == act.getactionsThisBattle())
                    {
                        let coinflip = this.rndPerc.frac();  // Si TODO coincide, "tira una moneda"
                        if (coinflip < 0.5) found = true;  // Si sale menos de 0,5 (se podría poner al revés), 'first' gana la prioridad
                    }
                }
            }
        }

        if (!found) i++;  // Nunca se comprueba si 'act' tiene más aV que 'first', pero es análogo a que 'found' sea 'false' en este punto del código
    }

    Phaser.Utils.Array.MoveTo(this.charactersQueue, first, i);  // Método de Phaser que "inserta" un elemento de un array en una posición (i) de ese mismo array
}
showButtonSkills()
{
    /* == BOTÓN BÁSICO == */
    this.hud.changeBasicButtonFunction(() => {
        this.waitingSkill = false;
        this.waitingTarget = true;
        this.chooseTarget();
    });
    /* == BOTÓN HABILIDAD == */
    this.hud.changeHabilityButtonFunction(() => {
        this.waitingSkill = false;
        this.waitingTarget = true;
        this.chooseTarget();
    });
    /* == BOTÓN DEFINITIVA == */
    this.hud.changeDefinitiveButtonFunction(() => {
        this.waitingSkill = false;
        this.waitingTarget = true;
        this.chooseTarget();
    });
}

chooseTarget()
{
    this.enemiesQueue.forEach(enemy => {

        enemy.removeAllListeners("pointerdown");
        enemy.setInteractive();

        enemy.once("pointerdown", () => 
        {
            this.selectedEnemy = enemy;
            this.waitingTarget = false;

            this.enemiesQueue.forEach(e => {
                e.disableInteractive();
                e.removeAllListeners("pointerdown");
            });

            this.hud.disableSkillButtons();

            const enemy1 = this.selectedEnemy;

            enemy1.once('animationcomplete', () =>
            {
                // Volver a idle según el enemigo
                enemy1.play(enemy1.idleAnim);
                // Avanzar el turno después
                this.time.delayedCall(0, () => 
                {
                    this.nextCharactersTurn();
                });
            });
            this.charactersQueue[0].doSomethingPlayer(enemy1);
            enemy1.play(enemy1.hurtAnim);
            /*
            if (!this.selectedEnemy.isAlive())
            {
                this.selectedEnemy.dieAnim();
            }*/
            
        });
    });
}
}