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
        this.Turno = this.scene.add.image(400,0,indicadorTurno).setOrigin(1,0).setScale(1).setScrollFactor(0, 0);
        this.TurnoRival = this.scene.add.image(400,0,indicadorTurnoRival).setOrigin(0,0).setScale(0.7).setScrollFactor(0, 0);

        let BotonBasico = this.scene.add.image(290,600,fondoBotonCombate).setOrigin(1,1).setScale(1.5).setScrollFactor(0, 0);
        BotonBasico.setInteractive({useHandCursor:true});
        BotonBasico.on("pointerover", ()=>{BotonBasico.setScale(1.7);});
        BotonBasico.on("pointerout", ()=>{BotonBasico.setScale(1.5);});
        
        let BotonHabilidad = this.scene.add.image(400,600,fondoBotonCombate).setOrigin(0.5,1).setScale(1.5).setScrollFactor(0, 0);
        BotonHabilidad.setInteractive({useHandCursor:true});
        BotonHabilidad.on("pointerover", ()=>{BotonHabilidad.setScale(1.7);});
        BotonHabilidad.on("pointerout", ()=>{BotonHabilidad.setScale(1.5);});
        
        let BotonDefinitiva = this.scene.add.image(510,600,fondoBotonCombate).setOrigin(0,1).setScale(1.5).setScrollFactor(0, 0);
        BotonDefinitiva.setInteractive({useHandCursor:true});
        BotonDefinitiva.on("pointerover", ()=>{BotonDefinitiva.setScale(1.7);});
        BotonDefinitiva.on("pointerout", ()=>{BotonDefinitiva.setScale(1.5);});
        
        // Boton de cambio de personaje
        let botonChange = this.scene.add.image(30, 30, 'botonCambio').setScale(0.7).setScrollFactor(0, 0);
        botonChange.setInteractive({useHandCursor:true});
        botonChange.on("pointerover",()=>{botonChange.setScale(0.9);});
        botonChange.on("pointerout",()=>{botonChange.setScale(0.7);});
        botonChange.on("pointerdown",()=>
        {
            // Cambio de Emocion
        });
        
        // Barras con los fondos
        let BarraAlegria = new Barra(this.scene, 10, 60,fondoBarra,barraAlegria,0,0.75);
        let BarraAnsiedad = new Barra(this.scene, 550, 60,fondoBarra,barraAnsiedad,0,0.75);
        let BarraLocura = new Barra(this.scene, 750,270,fondoBarra,barraLocura,270,1);
    
    }
    //En el preupdate se actualiza el motor de fisicas solo no hay que llamarlo en la escena
    preUpdate()
    {
        

    }
}