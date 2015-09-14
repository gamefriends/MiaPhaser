/**
 * Created by qixiaowei on 2015/9/11.
 */
var MIA = MIA || {};
MIA.Scene2 = function (game) {

};
MIA.Scene2.prototype = {
    create: function () {
        var scene = MIA.createScene(1, this.game);
        var soundBtn = scene.getChildByName("soundBtn");
        soundBtn.inputEnabled = true;
        soundBtn.onClick(function () {
            soundBtn.getChildAt(1).visible = !soundBtn.getChildAt(1).visible;
        }, this);
        var photo1 = scene.getChildByName("photo1");
        var photo2 = scene.getChildByName("photo2");
        photo1.inputEnabled = true;
        photo1.onClick(function () {
            MIA.gameConfig.picID = 1;
            this.state.start("Scene3");
        }, this);
        photo2.inputEnabled = true;
        photo2.onClick(function () {
            MIA.gameConfig.picID = 2;
            this.state.start("Scene3");
        }, this);
    }
};