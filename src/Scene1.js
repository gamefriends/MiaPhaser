/**
 * Created by qixiaowei on 2015/9/11.
 */
var MIA = MIA || {};
MIA.Scene1 = function (game) {

};
MIA.Scene1.prototype = {
    create: function () {
        var scene1 = MIA.createScene(0, this.game);
        var soundBtn = scene1.getChildByName("soundBtn");
        soundBtn.inputEnabled = true;
        soundBtn.onClick(function () {
            soundBtn.getChildAt(1).visible = !soundBtn.getChildAt(1).visible;
        }, this);
        var scene = scene1.getChildByName("scene1");
        var btn_play = scene.getChildByName("btn_play");
        btn_play.inputEnabled = true;
        btn_play.onClick(function () {
            this.state.start("Scene2");
        }, this);
    }
};