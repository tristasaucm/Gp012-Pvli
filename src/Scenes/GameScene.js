import Player from '../Player.js';
import Ansiedad from '../Ansiedad.js';
import Hud from '../Hud.js'
/**
 * Escena principal.
 * @extends Phaser.Scene
 */
export default class Game extends Phaser.Scene{

    /**
     * @param {Character[]} charactersQueue - Lista completa de los personajes (emociones y enemigos) del combate, ordenada para determinar a quién le toca
     */

constructor(charactersQueue){
    super({key: 'game'});

    // Asigna la lista a la que le llega, suponiendo que está ordenada de menor a mayor por "actionValues"; siendo el personaje [0] el que menor valor actual tiene,
    // y por tanto al que le toca actuar ahora (invariante que se mantendrá durante todo el combate)
    this.charactersQueue = charactersQueue;

}
init({posmazX = 100,posmazY = 300}){
    this.posmazX = posmazX;
    this.posmazY = posmazY;
    console.log(this.posmazX);
    console.log(this.posmazY);

    this.rndPerc = new Phaser.Math.RandomDataGenerator();  // Generador de números aleatorios de Phaser
}
preload(){
   
}
create(){

    this.anims.create({
        	key: 'ansiedad_idle',
        	frames: this.anims.generateFrameNumbers('ansiedad', { start: 0, end: 2 }),
        	frameRate: 1.75,
        	repeat: -1,
			yoyo: true
    	});

    this.pointer = this.input.activePointer;
    this.add.image(0,0,'fondojuego').setOrigin(0,0);
    // Tened en cuenta que con el let la variable solo se puede usar en el 'create', si queremos usarla en más sitios tendremos que poner 'this'
    // (NOTA: cambiado a 'this' para usarlo en 'nextCharactersTurn')
    this.player = new Player(this, 500,500,200,'personaje',0,this.pointer,'punto');

    this.cameras.main.startFollow(this.player); // hace que la camara siga al objeto indicado

    //botón de vuelta al menu
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

    let hud = new Hud(this, 'botonCambio', 'fondoBotonCombate', 'fondoBarra', 'barraAlegria', 'barraLocura', 'barraAnsiedad', 'indicadorTurno', 'indicadorTurnoRival');

    //let ansiedad = new Ansiedad(this, 750, 525);
    
    this.nextCharactersTurn();  // Primer turno del combate, le toca actuar al personaje en la posición [0] de 'charactersQueue'
}
preUpdate(){
    
}

nextCharactersTurn()
{
    if (this.charactersQueue[0] instanceof Enemy)  // Vemos si el personaje más rapido es un enemigo (si no, será siempre una emoción)
        {
            if (this.player.input.enabled) this.player.disableInteractive();  // Si el input está activado lo desactivamos
            this.charactersQueue[0].dosomethingAI();  // La IA de combate actúa
        }
    else
    {
        if (!this.player.input.enabled) this.player.setInteractive();
        this.player.dosomethingPlayer();
    }

    this.updateaVs();  // Modificamos los aVs de todos los personajes para que la cola avance "virtualmente" (aún no se cambia ninguna posición)
    this.resortCharactersQueue();  // Ahora sí, se reordena la lista para colocar al que acaba de actuar dónde le toca, y determinar quién actua ahora

    this.nextCharactersTurn();  // Técnicamente es recursivo, pero aquí debería de haber una comprobación previa de si se ha terminado el combate (futura tarea supongo)
}

updateaVs()
{
    let sus = this.charactersQueue[0].getCurrentaV();  // aV actual del personaje que acaba de actuar

    this.charactersQueue.forEach((character) =>  // forEach: por cada 'character' en 'charactersQueue'...
    {
        character.setaV(-sus); // Se le resta el 'sus' de antes al aV de cada personaje
    });

    this.charactersQueue[0].setaV(this.charactersQueue[0].getbaseaV());  // Se reinicia el aV del personaje que acaba de actuar, devolviendo su valor al suyo base
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
                if (first instanceof Enemy)  // Mira si 'first' es 'Enemy' y después compara
                {
                    if (act instanceof Enemy)
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

                else if (act instanceof Alegria)  // Si 'first' no es 'Enemy' tiene que ser 'Alegria' (próximamente 'Emotion' o algo así)...
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

}