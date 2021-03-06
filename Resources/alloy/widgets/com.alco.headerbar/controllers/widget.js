function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.alco.headerbar/" + s : s.substring(0, index) + "/com.alco.headerbar/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    function openInflater() {
        alert("Open the Inflater");
    }
    function setTitle(args) {
        $.headertitle.text = args.text;
        $.headertitle.color = args.color;
    }
    function setBack(action) {
        backAction = action;
    }
    function setBlackAngle() {
        $.backangle.backgroundImage = WPATH("light-back-angle.png");
    }
    function setWhiteAngle() {
        $.backangle.backgroundImage = WPATH("white-back-angle.png");
    }
    function hideAngle() {
        $.backangle.visible = false;
    }
    function showAngle() {
        $.backangle.visible = true;
    }
    function setAppIcon(icon) {
        $.appicon.backgroundImage = icon;
    }
    function setParentContainer(handle) {
        parentWindow = handle;
    }
    function setBackground(args) {
        $.headerbar.backgroundImage = args.image ? args.image : WPATH("lightbg.png");
        $.headerbar.backgroundColor = args.color;
        $.headerbar.backgroundRepeat = true;
    }
    function showBottomLine() {
        $.bottomline.visible = true;
    }
    function hideBottomLine() {
        $.bottomline.visible = false;
    }
    function setTop(top) {
        this.headerbar.top = top;
    }
    function setActionButtons(args) {
        args.visible && args.visible.forEach(function(button) {
            var payload = {
                image: button.icon,
                action: button.action,
                title: button.title
            };
            var tbbutton = buttonFactory.getButton(payload);
            $.actionButtons.add(tbbutton);
        });
        if (args.inflater) {
            var menuoptions = "";
            var payload = {
                image: WPATH("ic_menu_moreoverflow_normal_holo_light.png")
            };
            var inflater = buttonFactory.getButton(payload);
            args.inflater.forEach(function(button) {
                menuoptions += button.title;
            });
            inflater.addEventListener("click", openInflater);
            $.actionButtons.add(inflater);
        }
        args.androidmenu && (parentWindow.activity.onCreateOptionsMenu = function(e) {
            var menu = e.menu;
            args.androidmenu.forEach(function(button) {
                var menuItem = menu.add({
                    title: button.title,
                    icon: "/ic_menu_copy_holo_light.png",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
                });
                menuItem.addEventListener("click", button.action);
            });
        });
    }
    new (require("alloy/widget"))("com.alco.headerbar");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.headerbar = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        backgroundColor: "#cacaca",
        id: "headerbar"
    });
    $.__views.headerbar && $.addTopLevelView($.__views.headerbar);
    $.__views.backbutton = Ti.UI.createView({
        left: "5dp",
        width: "48dp",
        height: "50dp",
        backgroundColor: "transparent",
        id: "backbutton"
    });
    $.__views.headerbar.add($.__views.backbutton);
    $.__views.backangle = Ti.UI.createView({
        left: "0",
        height: "40dp",
        width: "14dp",
        id: "backangle"
    });
    $.__views.backbutton.add($.__views.backangle);
    $.__views.appicon = Ti.UI.createView({
        left: "15dp",
        height: "30dp",
        width: "30dp",
        backgroundColor: "transparent",
        id: "appicon"
    });
    $.__views.backbutton.add($.__views.appicon);
    $.__views.headertitle = Ti.UI.createLabel({
        left: "55dp",
        color: "#000",
        font: {
            fontSize: "16dp",
            fontFamily: "Roboto-Thin"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "I'm the default widget",
        id: "headertitle"
    });
    $.__views.headerbar.add($.__views.headertitle);
    $.__views.actionButtons = Ti.UI.createView({
        right: "0dp",
        width: Ti.UI.SIZE,
        height: "50dp",
        backgroundColor: "transparent",
        visible: true,
        layout: "horizontal",
        id: "actionButtons"
    });
    $.__views.headerbar.add($.__views.actionButtons);
    $.__views.bottomline = Ti.UI.createView({
        height: "2dp",
        width: Ti.UI.FILL,
        backgroundColor: "#0082AB",
        bottom: "0",
        id: "bottomline"
    });
    $.__views.bottomline && $.addTopLevelView($.__views.bottomline);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var backAction = null;
    var parentWindow = null;
    var buttonFactory = require(WPATH("button"));
    $.appicon.backgroundImage = "/appicon.png";
    $.headerbar.addEventListener("click", function(evt) {
        evt.cancelBubble = true;
    });
    $.backbutton.addEventListener("click", function(evt) {
        evt.cancelBubble = true;
    });
    $.backbutton.addEventListener("touchstart", function() {
        this.backgroundColor = "#000";
        this.opacity = .2;
    });
    $.backbutton.addEventListener("touchend", function() {
        this.backgroundColor = "transparent";
        this.opacity = 1;
        backAction ? backAction() : parentWindow.close();
    });
    exports.setTop = setTop;
    exports.setActionButtons = setActionButtons;
    exports.showBottomLine = showBottomLine;
    exports.hideBottomLine = hideBottomLine;
    exports.setBackground = setBackground;
    exports.setParentContainer = setParentContainer;
    exports.setAppIcon = setAppIcon;
    exports.hideAngle = hideAngle;
    exports.showAngle = showAngle;
    exports.setBlackAngle = setBlackAngle;
    exports.setWhiteAngle = setWhiteAngle;
    exports.setTitle = setTitle;
    exports.setBack = setBack;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;