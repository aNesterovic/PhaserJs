import Phaser from 'phaser';


import BallGame from './scenes/ballGame'
import BallGameScene2 from "~/scenes/ballGameScene2";
import BallGameScene3 from "~/scenes/BallGameScene3";
import BallGameScene4 from "~/scenes/BallGameScene4";
import BallGameScene6 from "~/scenes/BallGameScene6";
import BallGameScene7 from "~/scenes/BallGameScene7";
import BallGameScene8 from "~/scenes/BallGameScene8";
import BallGameScene9 from "~/scenes/BallGameScene9";
import BallGameScene10 from "~/scenes/BallGameScene10";
import BallGameScene11 from "~/scenes/BallGameScene11";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: false
		}
	},
	backgroundColor: "#fff",
	scene: [BallGame, BallGameScene2, BallGameScene3, BallGameScene4,BallGameScene6, BallGameScene7, BallGameScene8, BallGameScene9, BallGameScene10, BallGameScene11]
}

export default new Phaser.Game(config)
