import Phaser from 'phaser'

export default class BallGame extends Phaser.Scene
{
    private square?: Phaser.Physics.Arcade.StaticGroup;
    private leftRect?: Phaser.Physics.Arcade.StaticGroup;
    private rightRect?: Phaser.Physics.Arcade.StaticGroup;
    private rewOpos?: Phaser.Physics.Arcade.StaticGroup;
    private reqtOpos?: Phaser.Physics.Arcade.StaticGroup;
    private squareInfo;
    private ballPlayer?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    private levelText?: Phaser.GameObjects.Text;

    private newScene = false;
    private endWidth: any;

	constructor()
	{
		super({
            key: 'BallGame'
        })
	}

	preload()
    {
        this.load.image('reqtOpos', 'assets/reqtOpos.png');
        this.load.image('rewOpos', 'assets/rewOpos.png');
        this.load.image('square', 'assets/square.png');
        this.load.image('leftRect', 'assets/reqt.png');
        this.load.image('rightRect', 'assets/rew.png');
        this.load.spritesheet('ball', 'assets/ball.png',{frameWidth:50, frameHeight: 32});
    }

    create()
    {
        this.square = this.physics.add.staticGroup();
        this.leftRect = this.physics.add.staticGroup();
        this.rightRect = this.physics.add.staticGroup();
        this.rewOpos = this.physics.add.staticGroup();
        this.reqtOpos = this.physics.add.staticGroup();

        this.createSquare();
        this.createInvent();
        this.ballPlayer = this.physics.add.sprite(200,250, 'ball');
        this.ballPlayer.setBounce(0.2);
        this.ballPlayer.setCollideWorldBounds(true);
        this.levelText = this.add.text(16, 16, 'level: 1', { fontSize: '32px', fill: '#000' });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.ballPlayer, this.square);
    }

    private createSquare (){
        this.squareInfo = {
            width: 40,
            height: 41,
            count: {
                row: 1,
                col: 11
            },
            offset:{
                top: 300,
                left: 200
            }
        }

        for(let c = 0; c < this.squareInfo.count.col; c++){
            for( let r = 0; r<this.squareInfo.count.row; r++){
                let squareX = (c* this.squareInfo.width + this.squareInfo.offset.left);
                let squareY = (r* this.squareInfo.height + this.squareInfo.offset.top);
                this.square?.create(squareX, squareY, 'square');
                }
        }
    }

    private createInvent(){
        // this.square?.create(50, 550, 'square');
        // this.leftRect?.create(100, 550, 'leftRect');
        // this.rightRect?.create(150, 550,'rightRect');
        // this.reqtOpos?.create(200,550,'reqtOpos');
        // this.rewOpos?.create(250,550,'rewOpos');
    }

    update (){
        if(this.cursors?.left?.isDown){
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
             this.scene.start("BallGameScene2");
         }
         if(this.ballPlayer?.y >= 300){
             this.ballPlayer?.y = 250;
             this.ballPlayer?.x = 200;
         }
    }
}
