/**
 * Created with WebStorm.
 * User: Jackie Qi / miagame.com
 * Date: 2015/9/9
 * Time: 11:40
 * email: miagame.com@gmail.com
 * website: http://miagame.com
 * twitter: https://twitter.com/miagame_com
 *
 * Export Flash To JSON
 * vertion: 1.0
 *
 * project example:
 * project
 *  -flash
 *      -game.fla
 *  -js
 *      -phaser.js
 *  -jsfl
 *      -ExportToJS.jsfl
 *  -res
 *      -a.png
 *      -b.png
 *  -src
 *      -Game.js
 *      -res.js
 */


//JSON Library
(function () {

    // ----------------------------------------------------------------------------------------------------
    // local variables

    var hasOwn = Object.prototype.hasOwnProperty;
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var meta =
    {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };

    /**
     * Helper function to correctly quote nested strings
     * @ignore
     */
    function quoteString(string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                    var c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
        }
        return '"' + string + '"';
    };

    // ----------------------------------------------------------------------------------------------------
    // class

    JSON =
    {
        /**
         * Encodes an Object as a JSON String
         * Non-integer/string keys are skipped in the object, as are keys that point to a function.
         *
         * @name    JSON.encode
         * @param    {Object}    obj        The json-serializble *thing* to be converted
         * @returns    {String}            A JSON String
         */
        encode: function (obj) {
            if (obj === null) {
                return 'null';
            }

            var type = typeof obj;

            if (type === 'undefined') {
                return undefined;
            }
            if (type === 'number' || type === 'boolean') {
                return '' + obj;
            }
            if (type === 'string') {
                return quoteString(obj);
            }
            if (type === 'object') {
                if (obj.constructor === Date) {
                    var month = obj.getUTCMonth() + 1,
                        day = obj.getUTCDate(),
                        year = obj.getUTCFullYear(),
                        hours = obj.getUTCHours(),
                        minutes = obj.getUTCMinutes(),
                        seconds = obj.getUTCSeconds(),
                        milli = obj.getUTCMilliseconds();

                    if (month < 10) {
                        month = '0' + month;
                    }
                    if (day < 10) {
                        day = '0' + day;
                    }
                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }
                    if (seconds < 10) {
                        seconds = '0' + seconds;
                    }
                    if (milli < 100) {
                        milli = '0' + milli;
                    }
                    if (milli < 10) {
                        milli = '0' + milli;
                    }
                    return '"' + year + '-' + month + '-' + day + 'T' +
                        hours + ':' + minutes + ':' + seconds +
                        '.' + milli + 'Z"';
                }
                if (obj.constructor === Array) {
                    var ret = [];
                    for (var i = 0; i < obj.length; i++) {
                        ret.push(JSON.encode(obj[i]) || 'null');
                    }
                    return '[' + ret.join(',') + ']';
                }
                var name,
                    val,
                    pairs = [];

                for (var k in obj) {
                    // Only include own properties,
                    // Filter out inherited prototypes
                    if (!hasOwn.call(obj, k)) {
                        continue;
                    }

                    // Keys must be numerical or string. Skip others
                    type = typeof k;
                    if (type === 'number') {
                        name = '"' + k + '"';
                    } else if (type === 'string') {
                        name = quoteString(k);
                    } else {
                        continue;
                    }
                    type = typeof obj[k];

                    // Invalid values like these return undefined
                    // from toJSON, however those object members
                    // shouldn't be included in the JSON string at all.
                    if (type === 'function' || type === 'undefined') {
                        continue;
                    }
                    val = JSON.encode(obj[k]);
                    pairs.push(name + ':' + val);
                }
                return '{' + pairs.join(',') + '}';
            }
            ;

        },

        /**
         * Evaluates a given piece of json source.
         * @param    {String}    src
         * @name    JSON.decode
         */
        decode: function (src) {
            if (src != null && src != '' && src != undefined) {
                return eval('(' + src + ')');
            }
            return null;
        },

        toString: function () {
            return '[class JSON]';
        }

    };

})();


//--------Main Logic-------------
/**
 * get instance count
 * @param {string} name
 * @returns {string}
 */
var getInstanceCount = function (name) {
    var count = 0;
    if (namePool[name] == undefined) {
        namePool[name] = 0;
    }
    count = namePool[name];
    namePool[name] = count + 1;
    return count;
};
/**
 * get libraryItem description
 * @param {Instance} ins
 * @returns {*}
 */
var getExportItemDes = function (ins) {
    var count = 0;
    var key = ins.libraryItem.name;
    if (exportPool[key] == undefined) {
        exportPool[key] = {
            count: 0,
            name: key.replace(" ", ""),
            res: key,
            width: ins.width,
            height: ins.height,
            scaleX: ins.scaleX,
            scaleY: ins.scaleY
        };
    }
    var obj = exportPool[key];
    if (ins.width > obj.width) {
        obj.width = ins.width;
    }
    if (ins.height > obj.height) {
        obj.height = ins.height;
    }
    return obj;
};

/**
 * get timeline max frameCount
 * @param {Timeline}timeline
 * @returns {number}
 */
var getTimelineMaxFrameCount = function (timeline) {
    var maxCount = 0;
    for (var a = 0; a < timeline.layerCount; a++) {
        var l = timeline.layers[a];
        if (maxCount < l.frameCount) {
            maxCount = l.frameCount;
        }
    }
    return maxCount;
};
/**
 * get instance description
 * @param {Instance} ins
 * @param {Instance} parent
 * @returns {*}
 */
var getInstanceDes = function (ins, parent) {
    var des = {};
    if (ins instanceof Shape) {
        des.type = TYPE_SHAPE;
        des.group = parent;
        des.child = ins;
        return des;
    }
    if (ins.instanceType == "bitmap") {
        des.type = TYPE_SPRITE;
        des.group = parent;
        des.child = ins;
        return des;
    }
    var children = getChildrenAtFrame(ins, 0, parent);
    if (children.length >= 0) {
        des.type = TYPE_GROUP;
        des.group = parent;
        des.child = ins;
        return des;
    } else {
        var child = children[0];
        return getInstanceDes(child, ins);
    }
};
/**
 * get instance all children items at frame
 * @param {Instance} ins
 * @param {number} frame
 * @returns {Array}
 */
var getInstanceChildrenAtFrame = function (ins, frame, parent, recursion) {
    if (ins.instanceType == "symbol") {
        var timeline = ins.libraryItem.timeline;
        return getTimelineChildrenAtFrame(timeline, frame, ins, recursion, false);
    } else {
        return undefined;
    }
};
/**
 * get timeline all children items at frame
 * @param {Instance} ins
 * @param {number} frame
 * @param {Instance} parent
 * @param {Boolean} recursion
 * @returns {Array}
 */
var getTimelineChildrenAtFrame = function (timeline, frame, parent, recursion, isRoot) {
    var layerCount = timeline.layerCount;
    var returnElements = new Array();
    while (layerCount-- > 0) {
        var l = timeline.layers[layerCount];
        if (l.frameCount > frame || isRoot == false) {
            if (isRoot == false) {
                frame = 0;
            }
            var nodes = l.frames[frame].elements.concat();
            for (var i = 0; i < nodes.length; i++) {
                var ins = nodes[i];
                var obj = {
                    "target": ins,
                    "type": TYPE_GROUP
                };
                var isShape = ins instanceof Shape;
                if (isShape) {
                    getExportItemDes(parent);
                } else {
                    var isBitmap = ins.instanceType == "bitmap";
                    if (isBitmap) {
                        getExportItemDes(ins);
                    }
                }
                if (ins.instanceType == "symbol") {
                    obj.type = TYPE_GROUP;
                } else {
                    obj.type = TYPE_SPRITE;
                }
                if (isShape) {
                    obj.type = TYPE_SHAPE;
                }
                if (ins.instanceType == "symbol" && recursion) {
                    obj["children"] = getInstanceChildrenAtFrame(ins, frame, ins, recursion);
                } else {
                    obj["children"] = undefined;
                }
                returnElements.push(obj);
            }
        }
    }
    return returnElements;
};
var groupToJSON = function (node) {
    var ins = node.target;
    var obj = {};
    obj.target = {};

    obj.target.name = ins.name;
    if (ins.name == "") {
        var libraryName = ins.libraryItem.name;
        var name = libraryName.replace(" ", "");
        name = name.replace("/", "_");
        var first = name.substr(0, 1).toLowerCase();
        name = first + name.substr(1, name.length - 1);
        obj.target.name = name + "_" + getInstanceCount(name);
    }
    obj.isGroup = true;
    obj.target.rotation = ins.rotation;
    obj.target.x = ins.x;
    obj.target.y = ins.y;
    obj.target.scaleX = ins.scaleX;
    obj.target.scaleY = ins.scaleY;
    obj.target.anchorX = ins.getTransformationPoint().x;
    obj.target.anchorY = ins.getTransformationPoint().y;

    obj.children = [];
    for (var i = 0; i < node.children.length; i++) {
        var subNode = node.children[i];
        if (subNode.type == TYPE_SHAPE) {
            var bmp = bitmapToJSON(node);
            return bmp;
        }
        if (subNode.children == undefined) {
            obj.children.push(bitmapToJSON(subNode));
        } else {
            obj.children.push(groupToJSON(subNode));
        }
    }
    return obj;
};
var bitmapToJSON = function (node) {
    var ins = node.target;
    var obj = {};
    obj.target = {};
    obj.isGroup = false;

    obj.target.name = ins.name;
    if (ins.name == "") {
        var libraryName = ins.libraryItem.name;
        var name = libraryName.replace(" ", "");
        name = name.replace("/", "_");
        var first = name.substr(0, 1).toLowerCase();
        name = first + name.substr(1, name.length - 1);
        obj.target.name = name + "_" + getInstanceCount(name);
    }
    obj.res = ins.libraryItem.name.replace(" ", "").replace("/", "_");
    obj.target.rotation = ins.rotation;
    obj.target.x = ins.x;
    obj.target.y = ins.y;
    obj.target.scaleX = ins.scaleX;
    obj.target.scaleY = ins.scaleY;
    obj.target.anchorX = ins.getTransformationPoint().x;
    obj.target.anchorY = ins.getTransformationPoint().y;
    return obj;
};
var parseChildrenToJSON = function (children) {
    var obj = [];
    for (var i = 0; i < children.length; i++) {
        var node = children[i];
        var ins = node["target"];
        if (node["children"] != undefined) {
            obj.push(groupToJSON(node));
        } else {
            obj.push(bitmapToJSON(node));
        }
    }
    return obj;
};
/**
 * parse the flash stage instances to JSON with frame
 * @returns {Array}
 */
var parseStageToJSON = function () {
    var obj = {};
    obj.stageWidth = fl.getDocumentDOM().width;
    obj.stageHeight = fl.getDocumentDOM().height;
    obj.timeline = [];
    var frameCount = getTimelineMaxFrameCount(fl.getDocumentDOM().getTimeline());
    for (var i = 0; i < frameCount; i++) {
        var frameChildren = getTimelineChildrenAtFrame(fl.getDocumentDOM().getTimeline(), i, undefined, true, true);
        var childrenObj = parseChildrenToJSON(frameChildren);
        obj.timeline.push(childrenObj);
    }
    return obj;
};
/**
 * parse the preload config
 * @returns {Array}
 */
var parsePreload = function () {
    var arr = [];
    for (var k in exportPool) {
        var ins = exportPool[k];
        var name = ins.name.replace("/", "_");
        var obj = {
            "k": name,
            "v": resDir + ins.name + ".png"
        };
        arr.push(obj);
    }
    return arr;
};
var getDir = function (itemName) {
    var dir = itemName.substring(0, itemName.lastIndexOf("/"));
    return projDir + resDir + dir;
};
var getPath = function (itemName) {
    return projDir + resDir + itemName;
};
/**
 * Export items to PNG
 */
var exportItemsToPNG = function () {
    var newDoc = fl.createDocument();
    for (var k in exportPool) {
        var ins = exportPool[k];
        var itemIndex = oldLibrary.findItemIndex(ins.res);
        var item = oldLibrary.items[itemIndex];
        var name = item.name;
        name = name.replace(" ", "");
        var dir = getDir(name);
        if (FLfile.exists(dir) == false) {
            FLfile.createFolder(dir);
        }
        var path = getPath(name);
        newDoc.addItem({x: 0, y: 0}, item);
        newDoc.selectAll();
        newDoc.scaleSelection(ins.scaleX, ins.scaleY);
        newDoc.width = Math.ceil(ins.width);
        newDoc.height = Math.ceil(ins.height);
        newDoc.moveSelectionBy({x: -newDoc.selection[0].left, y: -newDoc.selection[0].top});
        newDoc.exportPNG(path + ".png", false, true);
        newDoc.deleteSelection();
    }
    newDoc.close(false);
};
/**
 * Export config to res.js
 */
var exportToJS = function () {
    var jsDes = "var MIA = MIA || {};\n" +
        "//preload items\n" +
        "MIA.preloadDes = " + preloadJSONStr + ";\n" +
        "//display description\n" +
        "MIA.stageDes = " + stageJSONStr + ";\n";
    var jsPath = projDir + srcDir + jsName;
    FLfile.write(jsPath, jsDes);
};

var TYPE_GROUP = "group";
var TYPE_SPRITE = "sprite";
var TYPE_SHAPE = "shape";

var exportPool = {};
var namePool = {};
var resDir = "res/";
var srcDir = "src/";
var jsName = "res.js";


fl.outputPanel.clear();
fl.getDocumentDOM().exitEditMode();
var oldLibrary = fl.getDocumentDOM().library;
var stageJSON = parseStageToJSON();
var stageJSONStr = JSON.encode(stageJSON);
var projDir = fl.scriptURI.substring(0, fl.scriptURI.lastIndexOf("/")) + "/../";
var preloadJSON = parsePreload();
var preloadJSONStr = JSON.encode(preloadJSON);


//-------- run action-----
//export stage items to png: project/res
exportItemsToPNG();
//export preload and description Object: project/src/res.js
exportToJS();