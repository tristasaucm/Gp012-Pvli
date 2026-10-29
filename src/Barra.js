/**
 * Clase que representa un enemigo
 * @extends Phaser.GameObjects.Sprite
 */
export default class Barra extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, fondo, relleno, angle, scale)
    {
        super(scene, x, y);
       
        this.scene.add.existing(this);
        // Agregarlos a la escena
        this.fondoBarra = this.scene.add.image(x, y, fondo).setOrigin(0, 0).setAngle(angle).setScale(scale);
        this.rellenoBarra = this.scene.add.image(x, y, relleno).setOrigin(0, 0).setAngle(angle).setScale(scale);
        // Para que se queden fijos en la camara
        this.fondoBarra.setScrollFactor(0, 0);
        this.rellenoBarra.setScrollFactor(0, 0);

        // Porcentaje inicial
        this.porcentajeRelleno = 1;
        
        this.teclas = scene.input.keyboard.createCursorKeys();
    
    }
    create()
    {
        // Capturar las flechas del teclado para bajar y subir los porcentajes de las barras
        this.teclas = this.scene.input.keyboard.createCursorKeys();
    }
    //En el preupdate se actualiza el motor de fisicas solo no hay que llamarlo en la escena
    preUpdate()
    {
        if (this.teclas.left.isDown) {
            this.porcentajeRelleno -= 0.1;
        }
        if (this.teclas.right.isDown) {
            this.porcentajeRelleno += 0.1;
        }
        // Ajuste de los porcentajes entre 0 y 1
        this.porcentajeRelleno = Phaser.Math.Clamp(this.porcentajeRelleno, 0, 1);

        // Actualizacion de las imagenes
        this.rellenoBarra.setCrop(0,0,this.rellenoBarra.width * this.porcentajeRelleno,this.rellenoBarra.height);

    }
}