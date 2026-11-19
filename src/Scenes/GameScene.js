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
    this.hud = new Hud(this);
    
    /* == PERSONAJES EN COMBATE Y TURNOS == */ //(temporal)
    let enemyIndex = 0;
    // Creamos los enemigos de la escena
    this.enemiesQueue.push(new AnsiedadBattle(this, 'ansiedad', 100, 20, 80, enemyIndex))
    enemyIndex++;
    this.enemiesQueue.push(new TraumaBattle(this, 'trauma', 100, 15, 90, enemyIndex))
    enemyIndex++;

    this.enemiesQueue[0].play('ansiedad_idle');
    this.enemiesQueue[1].play('trauma_idle');

    let characterIndex = 0;
    // Creamos personaje para la escena
    this.emotionsQueue.push(new Alegria(this, 'alegria', 400, 30, 100, characterIndex))
    characterIndex++;
    this.emotionsQueue[0].play('alegria_idle');

    // Mete todos los enemigos y personajes y ordena segun el action value
    this.charactersQueue = [...this.emotionsQueue, ...this.enemiesQueue];
    this.charactersQueue.sort((a, b) => a.getCurrentAV() - b.getCurrentAV());

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
            this.nextCharactersTurn();
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
    this.cleanDeadCharacters(); // Eliminamos los personajes que esten muertos
    this.updateaVs();  // Modificamos los aVs de todos los personajes para que la cola avance "virtualmente" (aún no se cambia ninguna posición)
    this.resortCharactersQueue();  // Ahora sí, se reordena la lista para colocar al que acaba de actuar dónde le toca, y determinar quién actua ahora
    if (this.charactersQueue[0].isEnemy()) this.hud.setTurnoRival();
    else this.hud.setTurnoJugador();
    this.hud.updateHealthBars(this.charactersQueue);
    
    if (!this.enemiesQueue.length == 0 && !this.emotionsQueue.length == 0) this.actualTurn();
    else{
        if(this.enemiesQueue.length == 0) this.addVictoryPanel();
        else this.addLosePanel();
    }
}
cleanDeadCharacters() {
    // Funcion auxiliar para procesar cualquier array de personajes
    const processQueue = (queue) => {
        return queue.filter(character => {
            if (!character.isAlive()) {
                this.hud.updateHealthBars(this.charactersQueue);
                // Destruye el sprite / objeto visual en Phaser para que desaparezca
                if (character.active) {
                    character.play(character.dieAnim);
                    character.once('animationcomplete', () =>
                    {
                        character.destroy();
                    });
                }
                return false; // Lo elimina del array
            }
            return true; // Lo mantiene en el array si sigue vivo
        });
    };

    // Aplicamos la limpieza a todas las colas
    this.enemiesQueue = processQueue(this.enemiesQueue);
    this.emotionsQueue = processQueue(this.emotionsQueue);
    this.charactersQueue = processQueue(this.charactersQueue);
}
// Actualiza el action value de todos los personajes
updateaVs()
{
    let sus = this.charactersQueue[0].getCurrentAV();  // aV actual del personaje que acaba de actuar
    
    this.charactersQueue.forEach((character) =>  // forEach: por cada 'character' en 'charactersQueue'...
    {
        character.setAV(-sus); // Se le resta el 'sus' de antes al aV de cada personaje
    });

    this.charactersQueue[0].setAV(this.charactersQueue[0].getBaseAV());  // Se reinicia el aV del personaje que acaba de actuar, devolviendo su valor al suyo base
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

        if (first.getCurrentAV() < act.getCurrentAV()) found = true;  // Compara aVs...
        
        else if (first.getCurrentAV() == act.getCurrentAV())
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
        this.charactersQueue[0].BasicAttack(this);
    });
    /* == BOTÓN HABILIDAD == */
    this.hud.changeHabilityButtonFunction(() => {
        this.waitingSkill = false;
        this.waitingTarget = true;
        this.charactersQueue[0].Skill(this);
    });
    /* == BOTÓN DEFINITIVA == */
    this.hud.changeDefinitiveButtonFunction(() => {
        this.waitingSkill = false;
        this.waitingTarget = true;
        this.charactersQueue[0].Ultimate(this);
    });
}
/*
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
                enemy1.play(enemy1.idleAnim);
                this.nextCharactersTurn();
            });
            this.charactersQueue[0].doSomethingPlayer(enemy1);
            enemy1.play(enemy1.hurtAnim);

            return enemy1;
            
            if (!this.selectedEnemy.isAlive())
            {
                this.selectedEnemy.dieAnim();
            }
            
        });
    });
} 
*/

chooseEnemy(callback)
{
    this.enemiesQueue.forEach(enemy => {

        enemy.removeAllListeners("pointerdown");
        enemy.setInteractive({useHandCursor:true});

        enemy.once("pointerdown", () => {
            this.enemiesQueue.forEach(e => {
                e.disableInteractive({useHandCursor:false});
                e.removeAllListeners("pointerdown");
            });

            callback(enemy);
        });
    });
}
chooseAlly(callback)
{
    this.emotionsQueue.forEach(emotion => {

        emotion.removeAllListeners("pointerdown");
        emotion.setInteractive({useHandCursor:true});

        emotion.once("pointerdown", () => {
            this.emotionsQueue.forEach(e => {
                e.disableInteractive({useHandCursor:false});
                e.removeAllListeners("pointerdown");
            });

            callback(emotion);
        });
    });
}

addVictoryPanel(){
    this.hud.disableSkillButtons();
    this.add.image(400,300,'fondomenu').setOrigin(0.5,0.5).setScale(0.1).setScrollFactor(0, 0);
    this.add.text(400, 250 ,"Victoria", 
    {
        fontSize: "64px",
        color: "#005f15",
        fontStyle: 'bold'
    }).setOrigin(0.5,0.5);
    let botonReturnMenu = this.add.text(500, 350 ,"MENU", 
    {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#2266aa",
        padding: { x: 20, y: 10 },
        fontStyle: 'bold'
    });
    botonReturnMenu.setScale(0.8).setOrigin(0.5,0.5).setScrollFactor(0,0);
    botonReturnMenu.setInteractive({ useHandCursor: true })
    botonReturnMenu.on("pointerover",()=>{ 
        botonReturnMenu.setScale(1).setStyle({ backgroundColor: "#4488dd" });
    });
    botonReturnMenu.on("pointerout",()=>{ 
        botonReturnMenu.setScale(0.8).setStyle({ backgroundColor: "#2266aa" });
    });
    botonReturnMenu.on("pointerdown",()=>{
        this.scene.start("menu");
    });

    let botonReturnDungeon = this.add.text(325, 350 ,"Avanzar", 
    {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#2266aa",
        padding: { x: 20, y: 10 },
        fontStyle: 'bold'
    });
    botonReturnDungeon.setScale(0.8).setOrigin(0.5,0.5).setScrollFactor(0,0);
    botonReturnDungeon.setInteractive({ useHandCursor: true })
    botonReturnDungeon.on("pointerover",()=>{ 
        botonReturnDungeon.setScale(1).setStyle({ backgroundColor: "#4488dd" });
    });
    botonReturnDungeon.on("pointerout",()=>{ 
        botonReturnDungeon.setScale(0.8).setStyle({ backgroundColor: "#2266aa" });
    });
    botonReturnDungeon.on("pointerdown",()=>{
          this.scene.start("Dungeon",{posX: this.posmazX,posY: this.posmazY});
    });
}
addLosePanel(){
    this.hud.disableSkillButtons();
    this.add.image(400,300,'fondomenu').setOrigin(0.5,0.5).setScale(0.1).setScrollFactor(0, 0);
    this.add.text(400, 250 ,"Derrota", 
    {
        fontSize: "64px",
        color: "#5f0000",
        fontStyle: 'bold'
    }).setOrigin(0.5,0.5);
    let botonReturnMenu = this.add.text(500, 350 ,"MENU", 
    {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#2266aa",
        padding: { x: 20, y: 10 },
        fontStyle: 'bold'
    });
    botonReturnMenu.setScale(0.8).setOrigin(0.5,0.5).setScrollFactor(0,0);
    botonReturnMenu.setInteractive({ useHandCursor: true })
    botonReturnMenu.on("pointerover",()=>{ 
        botonReturnMenu.setScale(1).setStyle({ backgroundColor: "#4488dd" });
    });
    botonReturnMenu.on("pointerout",()=>{ 
        botonReturnMenu.setScale(0.8).setStyle({ backgroundColor: "#2266aa" });
    });
    botonReturnMenu.on("pointerdown",()=>{
        this.scene.start("menu");
    });

    let botonReturnDungeon = this.add.text(325, 350 ,"Avanzar", 
    {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#2266aa",
        padding: { x: 20, y: 10 },
        fontStyle: 'bold'
    });
    botonReturnDungeon.setScale(0.8).setOrigin(0.5,0.5).setScrollFactor(0,0);
    botonReturnDungeon.setInteractive({ useHandCursor: true })
    botonReturnDungeon.on("pointerover",()=>{ 
        botonReturnDungeon.setScale(1).setStyle({ backgroundColor: "#4488dd" });
    });
    botonReturnDungeon.on("pointerout",()=>{ 
        botonReturnDungeon.setScale(0.8).setStyle({ backgroundColor: "#2266aa" });
    });
    botonReturnDungeon.on("pointerdown",()=>{
          this.scene.start("Dungeon",{posX: this.posmazX,posY: this.posmazY});
    });
}
}