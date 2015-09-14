/**
 * Created by qixiaowei on 2015/9/11.
 */
var MIA = MIA || {};
MIA.Scene3 = function (game) {

};
MIA.Scene3.prototype = {
    colorSelect: null,
    colorsArray: [16706497, 16763904, 16685312, 11755012, 16777215, 7470794, 380259, 1211416, 11579568, 3263738, 2829311, 3342489, 16698571, 16672459, 13303960, 10224128],
    colorDict: {},
    scene: null,
    ok_btn: null,
    currentPic: null,
    create: function () {
        var scene1 = MIA.createScene(2, this.game);
        var soundBtn = scene1.getChildByName("soundBtn");
        soundBtn.inputEnabled = true;
        soundBtn.onClick(function () {
            soundBtn.getChildAt(1).visible = !soundBtn.getChildAt(1).visible;
        }, this);
        this.scene = scene1.getChildByName("scene3");

        this.ok_btn = this.scene.getChildByName("ok_btn");
        var photo1 = this.scene.getChildByName("photo1");
        var photo2 = this.scene.getChildByName("photo2");
        console.log(MIA.gameConfig.picID);
        if (MIA.gameConfig.picID == 1) {
            this.currentPic = photo1;
            photo2.visible = false;
            this.scene.removeChild(photo2);
            console.log(MIA.gameConfig.picID);
        } else {
            this.currentPic = photo2;
            photo1.visible = false;
            this.scene.removeChild(photo1);
            console.log(MIA.gameConfig.picID);
        }

        var colorsPanel = this.scene.getChildByName("colorsPanel");
        this.colorSelect = colorsPanel.children[colorsPanel.children.length - 1];
        var index = 0;
        colorsPanel.forEach(function (img) {
            if (img != this.colorSelect) {
                index++;
                img.name = "C" + index;
                img.inputEnabled = true;
                img.input.pixelPerfectClick = true;
                img.events.onInputDown.add(this.onSelectColor, this);
                var color = this.colorsArray[index - 1];
                this.colorDict[img.name] = color;
            }
        }, this);
        var s = colorsPanel.children[0];
        this.currentColor = this.colorDict[s.name];
        this.colorSelect.x = s.x - 1;
        this.colorSelect.y = s.y - 1;

        this.currentPic.forEach(function (sprite) {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectClick = true;
            sprite.events.onInputDown.add(this.onFillColor, this);
        }, this);
    },
    onFillColor: function (sprite, pointer) {
        sprite.tint = this.currentColor;
        this.ok_btn.visible = true;
        //if (this.soundEnabled) {
        //    this.effect1.play();
        //}
    },
    onSelectColor: function (sprite) {
        this.currentColor = this.colorDict[sprite.name];
        this.colorSelect.x = sprite.x - 1;
        this.colorSelect.y = sprite.y - 1;
        //if (this.soundEnabled) {
        //    this.effect1.play();
        //}
    },
    showPhoto: function () {
        //if (this.soundEnabled) {
        //    this.effect2.play();
        //}
        //this.scene3.ok_btn.visible = false;
        //this.scene3.show_bg.visible = true;
        //this.scene3.currentPhoto.setInputEnabled(false);
        //if (this.photoName == "photo1") {
        //    this.scene3.currentPhoto.x = this.photo1InitPos.x + 70;
        //    this.scene3.currentPhoto.y = this.photo1InitPos.y + 50;
        //} else {
        //    if (this.photoName == "photo2") {
        //        this.scene3.currentPhoto.x = this.photo2InitPos.x + 70;
        //        this.scene3.currentPhoto.y = this.photo2InitPos.y + 40;
        //    }
        //}
    }
}