import Phaser from 'phaser'

export default class BallGameScene4 extends Phaser.Scene{

    private square?: Phaser.Physics.Arcade.StaticGroup;
    private leftRect?: Phaser.Physics.Arcade.StaticGroup;
    private rightRect?: Phaser.Physics.Arcade.StaticGroup;
    private rewOpos?: Phaser.Physics.Arcade.StaticGroup;
    private reqtOpos?: Phaser.Physics.Arcade.StaticGroup;
    private squareInfo;
    private rewOposCreat?: Phaser.Physics.Arcade.Image;
    private ballPlayer?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    private squareInvent?: Phaser.Physics.Arcade.Image;
    private reqtOposInvent?: Phaser.Physics.Arcade.Image;
    private squareInvent2?: Phaser.Physics.Arcade.Image;
    private levelText?: Phaser.GameObjects.Text;
    private dragObj?: object;

    private newScene = false;
    private endWidth: any;

    constructor() {
        super({
            key: 'BallGameScene4'
        })
    }

    preload(){
        this.load.image('reqtOpos', 'assets/reqtOpos.png');
        this.load.image('rewOpos', 'assets/rewOpos.png');
        this.load.image('square', 'assets/square.png');
        this.load.image('leftRect', 'assets/reqt.png');
        this.load.image('rightRect', 'assets/rew.png');
        this.load.spritesheet('ball', 'assets/ball.png',{frameWidth: 40, frameHeight: 32});
    }

    create(){
        this.square = this.physics.add.staticGroup();
        this.leftRect = this.physics.add.staticGroup();
        this.rightRect = this.physics.add.staticGroup();
        this.rewOpos = this.physics.add.staticGroup();
        this.reqtOpos = this.physics.add.staticGroup();

        this.createSquare();
        this.createInvent();

        this.input.on('pointerdown', this.startDrag, this);
        this.ballPlayer = this.physics.add.sprite(200,250, 'ball');
        this.ballPlayer.setBounce(0.2);
        this.ballPlayer.setCollideWorldBounds(true);
        this.levelText = this.add.text(16, 16, 'level: 4', { fontSize: '32px', fill: '#000' });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.ballPlayer, this.square);
        this.physics.add.collider(this.ballPlayer, this.squareInvent);
        this.physics.add.collider(this.ballPlayer, this.reqtOposInvent);
        this.physics.add.collider(this.ballPlayer, this.squareInvent2);
        this.physics.add.collider(this.ballPlayer, this.rewOposCreat);
    }
    private startDrag(pointer, targets){
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj = targets[0];
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this)
    }
    private doDrag(pointer){
        this.dragObj?.x = pointer.x;
        this.dragObj?.y = pointer.y;
    }
    private stopDrag(){
        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this)
    }
    private createInvent(){
        this.squareInvent = this.physics.add.image(50, 550, 'square');
        this.squareInvent?.setInteractive();
        this.squareInvent?.setImmovable(true);
        this.squareInvent.body.allowGravity = false;

        this.reqtOposInvent = this.physics.add.image(150, 550, 'leftRect');
        this.reqtOposInvent?.setInteractive();
        this.reqtOposInvent?.setImmovable(true);
        this.reqtOposInvent.body.allowGravity = false;

        this.squareInvent2 = this.physics.add.image(100, 550, 'square');
        this.squareInvent2?.setInteractive();
        this.squareInvent2?.setImmovable(true);
        this.squareInvent2.body.allowGravity = false;
        // this.leftRect?.create(100, 550, 'leftRect');
        // this.rightRect?.create(150, 550,'rightRect');
        // this.reqtOpos?.create(200,550,'reqtOpos');
        // this.rewOpos?.create(250,550,'rewOpos');
    }

    private createSquare (){
        this.squareInfo = {
            width: 40,
            height: 41,
            count: {
                row: 2,
                col: 11
            },
            offset:{
                top: 300,
                left: 200
            }
        }

         for(let c = 0; c < this.squareInfo.count.col; c++){
           loop: for( let r = 0; r<this.squareInfo.count.row; r++){
                    if((c === 3 || c === 2) && r === 0){
                        continue loop;
                    }
                    if(c === 4 && r === 0){
                        let squareX = (c* this.squareInfo.width + this.squareInfo.offset.left);
                        let squareY = (r* this.squareInfo.height + this.squareInfo.offset.top);
                        this.rewOposCreat = this.physics.add.image(squareX, squareY, 'rewOpos');
                        this.rewOposCreat.setImmovable(true);
                        this.rewOposCreat.body.allowGravity = false;
                    } else {
                    let squareX = (c* this.squareInfo.width + this.squareInfo.offset.left);
                    let squareY = (r* this.squareInfo.height + this.squareInfo.offset.top);
                    this.square?.create(squareX, squareY, 'square');
                    }
            }
        }
    }

    update () {
        if (this.cursors?.left?.isDown) {
            this.ballPlayer?.setVelocityX(-160);
        } else if (this.cursors?.right?.isDown) {
            this.ballPlayer?.setVelocityX(160);
        } else {
            this.ballPlayer?.setVelocityX(0);
        }
        this.endWidth = this.square?.children.entries.map(f =>{
            const c = f as any;
            return c.x;
        });
        this.endWidth = Math.max(...this.endWidth) + (this.squareInfo.width/2);
        if(this.ballPlayer?.x >= this.endWidth){
            this.physics.pause();
            this.newScene = true;
        }
        if(this.newScene){
            this.scene.start("BallGameScene6");
        }
        if(this.ballPlayer?.y >= 300){
            this.ballPlayer?.y = 250;
            this.ballPlayer?.x = 200;
        }
    }
}