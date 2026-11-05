/**
 * Clase que representa un enemigo
 * @extends Phaser.GameObjects.Sprite
 */
export default class Player extends Phaser.GameObjects.Sprite {
/**
	 * Constructor de Player
	 * @param {Scene} scene Escena en la que aparecerá el player
	 * @param {number} x - coordenada X
	 * @param {number} y - coordenada Y
	 * @param {number} speed - velocidad de movimiento
	 * @param {string} imgKey - nombre de la imagen que representa al player
	 * @param {string} imgPunt - nombre de la imagen que representa al punto al que viaja
	 * @param {number} pointx - punto al que se dirije el player en x
	 * @param {number} pointy - punto al que se dirije el player en y
	 * @param {number} margenError - margen de error de la llegada al punto del jugador
     * 
	 */
	constructor(scene, x, y, speed, imgKey,dt,pointer,imgPunt)
    {
		super(scene, x, y, imgKey);
        
		this.scene.add.existing(this);//Añadimos el player a la escena
        this.setDisplaySize(100,100);//Establecemos el tamaño de la imagen
        this.scene.physics.add.existing(this);//Añadimos las fisicas
        this.speed = speed; //Guardamos la velocidad
        this.body.key = imgKey; //Ponemos la imagen de como se ve el player
        this.body.setVelocity(0, 0); //Se estavlece la velocidad Inicial
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');//Se guarda el input para luego usarlo
        //Guardamos el punto iniciales del player
        this.pointx = this.x;
        this.pointy = this.y;
        //Añadimos la imagen del cursor y la hacemos invisible
        this.cursor =  this.scene.add.image(this.pointx,this.pointy,imgPunt);
        this.cursor.setVisible(false);
        //Establecemos el margen de error
        this.margenError = 2;
        //Detecion del click del raton
        this.scene.input.on("pointerdown",(event)=>{

            //debug.log("Velocity");
            if(event.leftButtonDown()){
                this.pointx = pointer.worldX;
                this.pointy =  pointer.worldY;
                this.cursor.x = this.pointx;
                this.cursor.y = this.pointy;
                this.cursor.setVisible(true);
            }  
               // debug.log("Velocity");
              

        });

        // Animaciones
        this.play('alegria_idle');
    }
    Create()
    {

    }
    //En el preupdate se actualiza el motor de fisicas solo no hay que llamarlo en la escena
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        //Actualiza el punto hacia el que se dirige y establece la velocidad
        let xdir = this.pointx -this.body.center.x;
        let ydir = this.pointy -this.body.center.y;
        let mag = Math.sqrt(ydir*ydir +xdir*xdir);
        this.body.setVelocity((xdir/mag) * this.speed ,(ydir/mag)*this.speed);
        
        //Comprobacion que hemos llegado al punto exacto
        if (mag <= this.margenError ) 
        {
            // Si está en el rango cercano, detenemos por completo el cuerpo
            this.body.setVelocity(0, 0);
            xdir = 0;
            ydir = 0;

            // Animacion de idle
            if (this.anims.currentAnim?.key !== 'alegria_idle') 
            {
                this.play('alegria_idle');
            }

            //para saber la posicion para los muros
            //console.log(this.x);
            //console.log(this.y);
            //Desactivamos el punto hacia el que viajamos para que no se vea
            this.cursor.setVisible(false);
            
        }
        else
        {
            // Animacion de caminar
            if (this.anims.currentAnim?.key !== 'alegria_walk') 
            {
                this.play('alegria_walk');
            }

        }
        //Rotacion del sprite del personaje
        if(xdir>0){
            this.flipX = false;
        }else if (xdir<0){
             this.flipX = true;
        }

    }
}