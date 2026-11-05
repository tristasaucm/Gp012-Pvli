import Barra from './Barra.js';
/**
 * Clase que representa el hud
 * @extends Phaser.GameObjects.Sprite
 */
export default class Hud extends Phaser.GameObjects.Sprite {
    constructor(scene, botonCambio, fondoBotonCombate, fondoBarra, barraAlegria, barraLocura, barraAnsiedad, indicadorTurno, indicadorTurnoRival)
    {
        super(scene);
        this.scene.add.existing(this);

        // Indicadores Turno
        this.Turno = this.scene.add.image(400,0,indicadorTurno).setOrigin(1,0).setScale(0.7).setScrollFactor(0, 0);
        this.TurnoRival = this.scene.add.image(400,0,indicadorTurnoRival).setOrigin(0,0).setScale(0.7).setScrollFactor(0, 0);

        this.BotonBasico = this.scene.add.image(290,600,fondoBotonCombate).setOrigin(1,1).setScale(1.5).setScrollFactor(0, 0);
        this.BotonBasico.setInteractive({useHandCursor:true});
        this.BotonBasico.on("pointerover", ()=>{this.BotonBasico.setScale(1.7);});
        this.BotonBasico.on("pointerout", ()=>{this.BotonBasico.setScale(1.5);});
        
        this.BotonHabilidad = this.scene.add.image(400,600,fondoBotonCombate).setOrigin(0.5,1).setScale(1.5).setScrollFactor(0, 0);
        this.BotonHabilidad.setInteractive({useHandCursor:true});
        this.BotonHabilidad.on("pointerover", ()=>{this.BotonHabilidad.setScale(1.7);});
        this.BotonHabilidad.on("pointerout", ()=>{this.BotonHabilidad.setScale(1.5);});
        
        this.BotonDefinitiva = this.scene.add.image(510,600,fondoBotonCombate).setOrigin(0,1).setScale(1.5).setScrollFactor(0, 0);
        this.BotonDefinitiva.setInteractive({useHandCursor:true});
        this.BotonDefinitiva.on("pointerover", ()=>{this.BotonDefinitiva.setScale(1.7);});
        this.BotonDefinitiva.on("pointerout", ()=>{this.BotonDefinitiva.setScale(1.5);});
        
        // Guardamos el fondo y los rellenos de las barras
        this.fondoBarra = fondoBarra;
        this.barraAlegria = barraAlegria;
        this.barraAnsiedad = barraAnsiedad;

        // Almacenarán las referencias a las barras visuales
        this.emotionBars = [];
        this.enemyBars = [];
        this.BarraLocura = new Barra(this.scene, 750,270,fondoBarra,barraLocura,270,1);
    
    }
    createHealthBars(charactersQueue) {
        this.emotionBars = [];
        this.enemyBars = [];

        charactersQueue.forEach(character => {
            if (character.isEnemy()) {
                // Es enemigo -> Creamos barra en el lado de la ansiedad
                let posY = 60 + (this.enemyBars.length * 40);
                let bar = new Barra(this.scene, 550, posY, this.fondoBarra, this.barraAnsiedad, 0, 0.75);
                this.enemyBars.push(bar);
            } else {
                // Es emoción -> Creamos barra en el lado de la alegría
                let posY = 60 + (this.emotionBars.length * 40);
                let bar = new Barra(this.scene, 10, posY, this.fondoBarra, this.barraAlegria, 0, 0.75);
                this.emotionBars.push(bar);
            }
        });
    }
    updateHealthBars(charactersQueue) {

        charactersQueue.forEach(character => {
            let percentage = character.getCurrentHealthPercentage();
            let characterIndex = character.getIndex();
            if (character.isEnemy()) 
            {
                this.enemyBars[characterIndex].updateFillPercentage(percentage);
            }
            else 
            {
                this.emotionBars[characterIndex].updateFillPercentage(percentage);
            }
        });
    }
    updateAlegriaHealthBar(newPercentage)
    {
        this.BarraAlegria.updateFillPercentage(newPercentage);
    }
    updateAnsiedadealthBar(newPercentage)
    {
        this.BarraAnsiedad.updateFillPercentage(newPercentage);
    }
    setTurnoRival()
    {
        this.Turno.setScale(0.7);
        this.TurnoRival.setScale(1);
    }
    setTurnoJugador()
    {
        this.Turno.setScale(1);
        this.TurnoRival.setScale(0.7);
    }
    changeBasicButtonFunction(callback) 
    {
        this.BotonBasico.on("pointerdown", callback);
    }
    changeDefinitiveButtonFunction(callback) 
    {
        this.BotonDefinitiva.on("pointerdown", callback);
    }
    changeHabilityButtonFunction(callback) 
    {
        this.BotonHabilidad.on("pointerdown", callback);
    }
}