# MiaPhaser

#Flash To Phaser


* I create jsfl tools to easy create UI and Scene in Adobe Flash.
* The project: [MiaPhaser](https://github.com/gamefriends/MiaPhaser)

# Create project like this:


##First:
- Create fla in Flash, and design the UI and Scene in timeline.
project example:

```javascript
project
 /flash
     /game.fla
 /js
     /phaser.js
 /jsfl
     /ExportToJS.jsfl
 /res
     /a.png
     /b.png
 /src
     /mia/PhaserExtend.js
     /Game.js
     /res.js
```

##Second:
* run the ExportToJS.jsfl
* it will be export the stage resource to PNG in /res

### Edit game config

```javasciprt
//the defalut stage size as same as Fla publish size
//set the boot scene and firstScene
MIA.gameConfig = {
    stageWidth:MIA.stageDes.stageWidth,
    stageHeight:MIA.stageDes.stageHeight,
    bootScene:"Boot",
    firstScene:"Scene1"
};
```


```javascript
//set the scene
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
```

##Last
* edit game logic
* edit index.html
* run the game


#If you have any suggest, please [@miagame_com](https://twitter.com/miagame_com) , I will do it better.

* User: Jackie Qi / miagame.com
* Date: 2015/9/9
* Time: 11:40
* email: miagame.com@gmail.com
* website: http://miagame.com
* twitter: https://twitter.com/miagame_com
