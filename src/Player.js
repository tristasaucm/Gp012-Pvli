/**
 * Clase que representa un enemigo
 * @extends Phaser.GameObjects.Sprite
 */
export default class Enemy extends Phaser.GameObjects.Sprite {
/**
	 * Constructor de Enemy
	 * @param {Scene} scene Escena en la que aparecerá el enemigo
	 * @param {number} x - coordenada X
	 * @param {number} y - coordenada Y
	 * @param {number} speed - velocidad de movimiento
	 * @param {string} imgKey - nombre de la imagen que representa al enemigo
	 * @param {number} xdir 
	 * @param {number} ydir 
	 * @param {number} mag 
	 * @param {number} pointx
	 * @param {number} pointy
	 * @param {number} margenError
     * 
	 */
	constructor(scene, x, y, speed, imgKey,dt,pointer)
    {
		super(scene, x, y, imgKey);
        
		this.scene.add.existing(this);//Añadimos el player a la escena
        this.setOrigin(0.5,0.5);
        this.setDisplaySize(100,100);//Establecemos el tamaño de la imagen
        this.scene.physics.add.existing(this);//Añadimos las fisicas
        this.speed = speed; //Guardamos la velocidad
        this.body.key = imgKey; //Ponemos la imagen de como se ve el player
        this.body.setVelocity(0, 0); //Se estavlece la velocidad Inicial
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');//Se guarda el input para luego usarlo
       
        this.pointx = this.x;
        this.pointy = this.y;
        this.margenError = 2;
        this.scene.input.on("pointerdown",(event)=>{

            //debug.log("Velocity");
            if(event.leftButtonDown()){
                this.pointx = pointer.worldX;
                this.pointy =  pointer.worldY;
            }  
               // debug.log("Velocity");
              

        });
        
    }
    Create()
    {

    }
    //En el preupdate se actualiza el motor de fisicas solo no hay que llamarlo en la escena
    preUpdate()
    {
        this.xdir = this.pointx -this.body.x;
        this.ydir = this.pointy -this.body.y;
        this.mag = Math.sqrt(this.ydir*this.ydir +this.xdir*this.xdir);
        this.body.setVelocity((this.xdir/this.mag) * this.speed ,(this.ydir/this.mag)*this.speed);
        
        //comprobacion que hemos llegado al punto exacto
        if (this.mag <= this.margenError ) 
        {
            // Si está en el rango cercano, detenemos por completo el cuerpo
            this.body.setVelocity(0, 0);
            this.xdir = 0;
            this.ydir = 0;
        } 
        //Tener en cuenta que si se mueve en diagonal va mas rapido
        /*
        //Movimiento en X
          if (this.keys.A.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (this.keys.D.isDown) {
            this.body.setVelocityX(this.speed);
        } else {
            this.body.setVelocityX(0);
        }

        // Movimiento en Y
        if (this.keys.W.isDown) {
            this.body.setVelocityY(-this.speed);
        } else if (this.keys.S.isDown) {
            this.body.setVelocityY(this.speed);
        } else {
            this.body.setVelocityY(0);
        }*/
    }


}