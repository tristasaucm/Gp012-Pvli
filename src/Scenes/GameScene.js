import AnsiedadBattle from '../CharactersOnBattle/Enemies/Basic/AnsiedadBattle.js';
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

    this.rndPerc = new Phaser.Math.RandomDataGenerator();  // Generador de números aleatorios de Phaser
}
preload(){
   
}
create(){

    /* == HUD Y FONDOS == */
    
    let hud = new Hud(this, 'botonCambio', 'fondoBotonCombate', 'fondoBarra', 'barraAlegria', 'barraLocura', 'barraAnsiedad', 'indicadorTurno', 'indicadorTurnoRival');
    
    // Fondo del juego
    this.add.image(0,0,'fondojuego').setOrigin(0,0).setDisplaySize(this.scale.width, this.scale.height);

    /* == PERSONAJES EN COMBATE Y TURNOS == */ //(temporal)

    // Creamos los enemigos de la escena
    this.enemiesQueue.push(new AnsiedadBattle(this, 'ansiedad', 100, 10, 80))
    this.enemiesQueue.push(new AnsiedadBattle(this, 'ansiedad', 100, 10, 120))

    // Creamos personaje para la escena
    this.emotionsQueue.push(new Alegria(this, 'alegria', 100, 10, 100))

    // Mete todos los enemigos y personajes y ordena segun el action value
    this.charactersQueue = [...this.emotionsQueue, ...this.enemiesQueue];
    this.charactersQueue.sort((a, b) => a.getCurrentaV() - b.getCurrentaV());

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

        this.charactersQueue[0].doSomethingAI(this.emotionsQueue);  // La IA de combate actúa
        console.log("Player health: " + this.emotionsQueue[0].getCurrentHealth());
        console.log("Enemy 1 health: " + this.enemiesQueue[0].getCurrentHealth());
        console.log("Enemy 2 health: " + this.enemiesQueue[1].getCurrentHealth());
        this.nextCharactersTurn();
    }
    else
    {
        console.log ("[TURNO JUGADOR]");
        
        this.waitingSkill = true;
        this.waitingTarget = false;

        this.showButtonSkills();
    }

}
// Serie de funciones para calcular el siguiente turno
nextCharactersTurn()
{
    this.updateaVs();  // Modificamos los aVs de todos los personajes para que la cola avance "virtualmente" (aún no se cambia ninguna posición)
    this.resortCharactersQueue();  // Ahora sí, se reordena la lista para colocar al que acaba de actuar dónde le toca, y determinar quién actua ahora
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
    let BotonBasico = this.add.image(290,600,'fondoBotonCombate').setOrigin(1,1).setScale(1.5).setScrollFactor(0, 0);
        BotonBasico.setInteractive({useHandCursor:true});
        BotonBasico.on("pointerover", ()=>{BotonBasico.setScale(1.7);});
        BotonBasico.on("pointerout", ()=>{BotonBasico.setScale(1.5);});
        BotonBasico.on("pointerdown", ()=>
        {
            this.waitingSkill = false;
            this.waitingTarget = true;
            this.chooseTarget();
        });
    let TextoBasico = this.add.text(270, 560, "Ataque Básico", {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
        }).setOrigin(1, 1);
        
    /* == BOTÓN HABILIDAD == */
    let BotonHabilidad = this.add.image(400,600,'fondoBotonCombate').setOrigin(0.5,1).setScale(1.5).setScrollFactor(0, 0);
        BotonHabilidad.setInteractive({useHandCursor:true});
        BotonHabilidad.on("pointerover", ()=>{BotonHabilidad.setScale(1.7);});
        BotonHabilidad.on("pointerout", ()=>{BotonHabilidad.setScale(1.5);});
        BotonHabilidad.on("pointerdown", ()=>
        {
            this.waitingSkill = false;
            this.waitingTarget = true;
            this.chooseTarget();
        });
    let TextoHabilidad = this.add.text(450, 560, "Habilidad", {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
        }).setOrigin(1, 1);

    /* == BOTÓN DEFINITIVA == */
    let BotonDefinitiva = this.add.image(510,600,'fondoBotonCombate').setOrigin(0,1).setScale(1.5).setScrollFactor(0, 0);
        BotonDefinitiva.setInteractive({useHandCursor:true});
        BotonDefinitiva.on("pointerover", ()=>{BotonDefinitiva.setScale(1.7);});
        BotonDefinitiva.on("pointerout", ()=>{BotonDefinitiva.setScale(1.5);});
        BotonDefinitiva.on("pointerdown", ()=>
        {
            this.waitingSkill = false;
            this.waitingTarget = true;
            this.chooseTarget();
        });
    let TextoDefinitiva = this.add.text(670, 560, "Definitiva", {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
        }).setOrigin(1, 1);
}

chooseTarget()
{
    this.enemiesQueue.forEach(enemy => {

        enemy.setInteractive();

        enemy.once("pointerdown", () => {
    
            this.selectedEnemy = enemy;
            this.waitingTarget = false;

            this.enemiesQueue.forEach(e => {
                e.disableInteractive();
            });

            this.charactersQueue[0].doSomethingPlayer(this.selectedEnemy);
            console.log("Player health: " + this.emotionsQueue[0].getCurrentHealth());
            console.log("Enemy 1 health: " + this.enemiesQueue[0].getCurrentHealth());
            console.log("Enemy 2 health: " + this.enemiesQueue[1].getCurrentHealth());
            this.nextCharactersTurn();
        });
    });
}

}