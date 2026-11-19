import Barra from './Barra.js';
/**
 * Clase que representa el hud
 * @extends Phaser.GameObjects.Sprite
 */
export default class Hud extends Phaser.GameObjects.Sprite {
    constructor(scene)
    {
        super(scene);
        this.scene.add.existing(this);

        // Indicadores Turno
        this.Turno = this.scene.add.image(400,0,'indicadorTurno').setOrigin(1,0).setScale(0.7).setScrollFactor(0, 0);
        this.TurnoRival = this.scene.add.image(400,0,'indicadorTurnoRival').setOrigin(0,0).setScale(0.7).setScrollFactor(0, 0);

        // Botones de accion del jugador
        this.BotonBasico = this.scene.add.image(290,600,'fondoBotonCombate').setOrigin(1,1).setScale(1.5).setScrollFactor(0, 0);
        this.BotonBasico.setInteractive({useHandCursor:true});
        this.BotonBasico.on("pointerover", ()=>{this.BotonBasico.setScale(1.7); this.TextoBasico.setScale(1.2);});
        this.BotonBasico.on("pointerout", ()=>{this.BotonBasico.setScale(1.5); this.TextoBasico.setScale(1);});
        this.TextoBasico = this.scene.add.text(275, 560, "Ataque Básico", {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
        }).setOrigin(1, 1);
        
        this.BotonHabilidad = this.scene.add.image(400,600,'fondoBotonCombate').setOrigin(0.5,1).setScale(1.5).setScrollFactor(0, 0);
        this.BotonHabilidad.setInteractive({useHandCursor:true});
        this.BotonHabilidad.on("pointerover", ()=>{this.BotonHabilidad.setScale(1.7); this.TextoHabilidad.setScale(1.2);});
        this.BotonHabilidad.on("pointerout", ()=>{this.BotonHabilidad.setScale(1.5); this.TextoHabilidad.setScale(1);});       
        this.TextoHabilidad = this.scene.add.text(400, 560, "Habilidad", {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
        }).setOrigin(0.5, 1);

        this.BotonDefinitiva = this.scene.add.image(510,600,'fondoBotonCombate').setOrigin(0,1).setScale(1.5).setScrollFactor(0, 0);
        this.BotonDefinitiva.setInteractive({useHandCursor:true});
        this.BotonDefinitiva.on("pointerover", ()=>{this.BotonDefinitiva.setScale(1.7); this.TextoDefinitiva.setScale(1.2);});
        this.BotonDefinitiva.on("pointerout", ()=>{this.BotonDefinitiva.setScale(1.5); this.TextoDefinitiva.setScale(1);});
        this.TextoDefinitiva = this.scene.add.text(540, 560, "Definitiva", {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
        }).setOrigin(0, 1);

        // Boton de cambio de personajes
        this.botonCambio = this.scene.add.image(30,30,'botonCambio').setOrigin(0.5,0.5).setScale(0.6).setScrollFactor(0, 0);
        this.botonCambio.setInteractive({useHandCursor:true});
        this.botonCambio.on("pointerover", ()=>{this.botonCambio.setScale(0.8);});
        this.botonCambio.on("pointerout", ()=>{this.botonCambio.setScale(0.6);});

        this.fondosBarras = ['fondoBarra', 'fondoBarraAnsiedad', 'fondoBarraTrauma'];
        this.rellenosBarras = ['barraAlegria', 'barraAnsiedad', 'barraTrauma'];

        // Almacenarán las referencias a las barras visuales
        this.emotionBars = [];
        this.enemyBars = [];
        this.BarraLocura = new Barra(this.scene, 750,270,'fondoBarraLocura','barraLocura',270,2,0,-18);
    
    }
    createHealthBars(charactersQueue) {
        this.emotionBars = [];
        this.enemyBars = [];

        charactersQueue.forEach(character => {
            if (character.isEnemy()) {
                // Es enemigo -> Creamos barra en el lado de la ansiedad
                let posY = 60 + (this.enemyBars.length * 40);
                let bar = new Barra(this.scene, 550, posY, this.fondosBarras[character.getCodedType()], this.rellenosBarras[character.getCodedType()], 0, 1.4, 43, 0);
                this.enemyBars.push(bar);
            } else {
                // Es emoción -> Creamos barra en el lado de la alegría
                let posY = 60 + (this.emotionBars.length * 40);
                let bar = new Barra(this.scene, 10, posY, this.fondosBarras[character.getCodedType()], this.rellenosBarras[character.getCodedType()], 0, 0.75, 0, 0);
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
        this.BotonBasico.once("pointerdown", callback);
    }
    changeDefinitiveButtonFunction(callback) 
    {
        this.BotonDefinitiva.once("pointerdown", callback);
    }
    changeHabilityButtonFunction(callback) 
    {
        this.BotonHabilidad.once("pointerdown", callback);
    }
    enableSkillButtons()
    {
        this.BotonBasico.setVisible(true);
        this.BotonHabilidad.setVisible(true);
        this.BotonDefinitiva.setVisible(true);
        this.TextoDefinitiva.setVisible(true)
        this.TextoBasico.setVisible(true)
        this.TextoHabilidad.setVisible(true)
    }
    disableSkillButtons()
    {
        this.BotonBasico.setVisible(false);
        this.BotonHabilidad.setVisible(false);
        this.BotonDefinitiva.setVisible(false);
        this.TextoDefinitiva.setVisible(false)
        this.TextoBasico.setVisible(false)
        this.TextoHabilidad.setVisible(false)
    }
}