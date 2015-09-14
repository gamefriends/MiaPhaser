/**
 * Created by qixiaowei on 2015/9/9.
 */
var MIA = MIA || {};
MIA.gameConfig = {
    stageWidth:MIA.stageDes.stageWidth,
    stageHeight:MIA.stageDes.stageHeight,
    bootScene:"Boot",
    firstScene:"Scene1"
};
MIA.startGame = function () {
    var game = new Phaser.Game(MIA.gameConfig.stageWidth, MIA.gameConfig.stageHeight, Phaser.AUTO, 'game');
    //----Add Scene
    game.state.add('Boot', MIA.Boot);
    game.state.add('Scene1', MIA.Scene1);
    game.state.add('Scene2', MIA.Scene2);
    game.state.add('Scene3', MIA.Scene3);

    //fixed logic
    MIA.gameConfig.bootScene = "Boot";
    MIA.gameConfig.firstScene = "Scene1";
    game.state.start(MIA.gameConfig.bootScene);
};