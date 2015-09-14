/**
 * Created by qixiaowei on 2015/9/11.
 * MiaPhaser Extend
 * version 1.0
 */
Phaser.Group.prototype.getChildByName = function (name) {
    for (var i = 0; i < this.children.length; i++) {
        if (this.children[i].name === name) {
            return this.children[i];
        }
    }
    return null;
};
Phaser.Group.prototype.removeAllClick = Phaser.Group.prototype.removeAllClick || function (callback, context) {
        this.forEach(function (sprite) {
            if (sprite instanceof Phaser.Group) {
                sprite.removeAllClick(callback, context);
            } else {
                sprite.inputEnabled = true;
                sprite.events.onInputDown.removeAll(context);
            }
        });
    };
Phaser.Group.prototype.removeClick = Phaser.Group.prototype.removeClick || function (callback, context) {
        this.forEach(function (sprite) {
            if (sprite instanceof Phaser.Group) {
                sprite.removeClick(callback, context);
            } else {
                sprite.inputEnabled = true;
                sprite.events.onInputDown.remove(callback, context);
            }
        });
    };

Phaser.Group.prototype.onClick = Phaser.Group.prototype.onClick || function (callback, context) {
        this.forEach(function (sprite) {
            if (sprite instanceof Phaser.Group) {
                sprite.onClick(callback, context);
            } else {
                sprite.inputEnabled = true;
                sprite.events.onInputDown.add(callback, context);
            }
        });
    };
/**
 * Phaser.Group inputEnabled
 */
Object.defineProperty(Phaser.Group.prototype, "_inputEnabled", false);
Object.defineProperty(Phaser.Group.prototype, "inputEnabled", {
    get: function () {
        return this._inputEnabled;
    },
    /**
     *
     * @param {Boolean} value
     */
    set: function (value) {
        if (this._inputEnabled === value) {
            return;
        }
        this._inputEnabled = value;
        this.forEach(function (sprite) {
            if (sprite instanceof Phaser.Group) {
                sprite.inputEnabled(value);
            } else {
                sprite.inputEnabled = value;
            }
        });
    }
});

//---------------
var MIA = MIA || {};
MIA.Boot = function (game) {

};
MIA.createScene = function (frame, game) {
    var scene = new Phaser.Group(game);
    var desArr = MIA.stageDes.timeline[frame];
    for (var i = 0; i < desArr.length; i++) {
        var des = desArr[i];
        var node = MIA.createChild(des, scene, game);
    }
    return scene;
};
MIA.createChild = function (des, parent, game) {
    if (des.isGroup) {
        return MIA.createGroup(des, parent, game);
    } else {
        return MIA.createSprite(des, parent, game);
    }
};
MIA.createGroup = function (des, parent, game) {
    var group = new Phaser.Group(game, parent);
    group.name = des.target.name;
    group.x = des.target.x;
    group.y = des.target.y;
    //group.x += des.target.anchorX;
    //group.y += des.target.anchorY;
    group.angle = des.target.rotation;
    group.scale.set(des.target.scaleX, des.target.scaleY);
    for (var i = 0; i < des.children.length; i++) {
        if (des.children[i].target.name.indexOf("470") != -1 || des.children[i].target.name.indexOf("471") != -1) {
            console.log(group.name, group.x, group.y);
        }
        group.addChild(MIA.createChild(des.children[i], group, game));
    }
    return group;
};
MIA.createSprite = function (des, parent, game) {
    var sprite = new Phaser.Sprite(game, des.target.x, des.target.y, des.res);
    sprite.name = des.target.name;
    sprite.angle = des.target.rotation;
    sprite.scale.set(des.target.scaleX, des.target.scaleY);

    return sprite;
};
MIA.Boot.prototype = {
    preload: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.minWidth = 260;
        //this.scale.minHeight = 480;
        //this.scale.maxWidth = 768;
        //this.scale.maxHeight = 1024;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //this.scale.forceOrientation(false, true);
        //this.scale.hasResized.add(this.gameResized, this);
        //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        //this.scale.setScreenSize(true);


        for (var i = 0; i < MIA.preloadDes.length; i++) {
            var obj = MIA.preloadDes[i];
            this.load.image(obj.k, obj.v);
        }
    },
    create: function () {
        this.state.start(MIA.gameConfig.firstScene);
    }
};