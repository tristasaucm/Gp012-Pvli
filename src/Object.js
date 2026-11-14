/**
 * Clase que representa un objeto recogible del juego
 * @extends Phaser.GameObjects.Sprite
 */

export default class Object extends Phaser.GameObjects.Sprite
{
    /**
     * @param {Scene} scene - Escena en la que aparecerá el objeto
     * @param {Player} player - Jugador
     * @param {string} imgKey - Nombre de la imagen visual del objeto
     * @param {number} x - Posición en el eje x del objeto
     * @param {number} y - Posición en el eje y del objeto
     */

    constructor(scene, player, imgKey, x, y)
    {
        super(scene, x, y, imgKey);

        this.player = player;

        this.scene.add.existing(this);
        this.setDisplaySize(50, 50);
        this.scene.physics.add.existing(this);

        this.scene.physics.add.overlap(this, this.player, () =>
        {
            this.player.addObject(this);
            this.destroy();
        });

        this.infoPanel = this.scene.add.rectangle(0, 0, 128, 64, 0xffffff, 0.4);
        this.objectNameText = this.scene.add.text(0, 0, imgKey, {
        fontSize: '20px',
        color: '#000000',
        fontStyle: 'bold'
        }).setOrigin(0.5);

        this.container = this.scene.add.container(this.x, this.y - 50, [this.infoPanel, this.objectNameText]);
        this.container.setVisible(false);

        this.setInteractive();
        this.on('pointerover', () => {
            this.container.setVisible(true);
        })
        this.on('pointerout', () => {
            this.container.setVisible(false);
        })
    }

}