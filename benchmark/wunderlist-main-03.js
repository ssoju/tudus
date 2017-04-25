
define("views/Social/controllers/TellModalController", ["application/runtime", "wunderbits/data/keycodes", "vendor/moment", "wunderbits/WBModalViewController"], function(e, t, i, n) {
    var o = e.$;
    return n.extend({
        "implements": {
            "click:link": "clickLink",
            "keydown:links": "handleKeys"
        },
        clickLink: function() {
            var e = this
              , t = e.view;
            t.showThanks();
        },
        handleKeys: function(e) {
            var i = this;
            e.which === t.tab ? i.handleTabKey(e) : e.which === t.enter && e.stopPropagation();
        },
        handleTabKey: function(e) {
            var t = o(e.target)
              , i = this;
            !e.shiftKey && t.closest("li").hasClass("share-twitter") ? (i.view.focusGoogle(),
            i.stopEventFully(e)) : e.shiftKey && t.closest("li").hasClass("share-google") && (i.view.focusTwitter(),
            i.stopEventFully(e));
        }
    });
}),
define("/templates/modals/tellModal.js", {
    name: "modals/tellModal",
    data: {
        "1": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return ' <li class="link share-weibo"> <span class="icon weibo-btn arrow-btn"></span> <a href="http://service.weibo.com/share/share.php?url=' + r((o = t.url || e && e.url,
            typeof o === a ? o.call(e, {
                name: "url",
                hash: {},
                data: n
            }) : o)) + "&amp;title=" + r((o = t.shareText || e && e.shareText,
            typeof o === a ? o.call(e, {
                name: "shareText",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow">' + r((o = t.localized || e && e.localized || s,
            o.call(e, "social_sharing_button_facebook", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </li> ";
        },
        "3": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return ' <li class="link share-google"> <span class="icon google-btn arrow-btn"></span> <a href="https://plus.google.com/share?url=' + r((o = t.url || e && e.url,
            typeof o === a ? o.call(e, {
                name: "url",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow">+1</a> </li> <li class="link share-facebook"> <span class="icon facebook-btn arrow-btn"></span> <a href="http://www.facebook.com/dialog/feed?app_id=208559595824260&amp;link=' + r((o = t.url || e && e.url,
            typeof o === a ? o.call(e, {
                name: "url",
                hash: {},
                data: n
            }) : o)) + "&amp;redirect_uri=" + r((o = t.url || e && e.url,
            typeof o === a ? o.call(e, {
                name: "url",
                hash: {},
                data: n
            }) : o)) + "&amp;name=" + r((o = t.shareText || e && e.shareText,
            typeof o === a ? o.call(e, {
                name: "shareText",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow" data-key-aria-label="iyf_dialog_share_on_facebook">' + r((o = t.localized || e && e.localized || s,
            o.call(e, "social_sharing_button_facebook", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </li> <li class="link share-twitter"> <span class="icon twitter-btn arrow-btn"></span> <a href="http://twitter.com/share?text=' + r((o = t.tweetText || e && e.tweetText,
            typeof o === a ? o.call(e, {
                name: "tweetText",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow">' + r((o = t.localized || e && e.localized || s,
            o.call(e, "social_sharing_button_twitter", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </li> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="content-inner" tabindex="0"> <a class="close"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </a> <div class="separator noline"> <div class="cols"> <div class="text-headline"> <h1 class="blue prompt">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "social_sharing_dialog_headline", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h1> <h1 class="blue thanks hidden">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "social_sharing_dialog_danke", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h1> </div> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "social_sharing_heading", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> </div> <div class="content-footer"> <ul class="social-links"> ';
            return o = t["if"].call(e, e && e.isChina, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.program(3, n),
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " </ul> </div> ";
        },
        useData: !0
    }
}),
define("/styles/modals/tellModal.js", {
    name: "modals/tellModal",
    data: "#tellModal .content-inner{text-align:center}#tellModal p{font-size:15px}#tellModal h1{margin:7px auto 14px auto}#tellModal .close{position:absolute;right:10px;top:10px;z-index:100}"
}),
define("views/Social/TellModalView", ["application/runtime", "wunderbits/WBModalView", "./controllers/TellModalController", "template!modals/tellModal", "style!modals/tellModal"], function(e, t, i, n, o) {
    var a = e._
      , r = t.prototype;
    return t.extend({
        template: n,
        styles: [o],
        "implements": [i],
        emits: {
            "click .link a": "click:link",
            "keydown .link a": "keydown:links"
        },
        formatData: function(t) {
            var i = this;
            return t = r.formatData.call(i, t),
            t.id = "tellModal",
            t.url = "https://www.wunderlist.com",
            t.isChina = "CN" === e.user.attributes.country,
            t.shareText = encodeURIComponent(e.language.getText("general_sharing_placeholder")),
            t.tweetText = encodeURIComponent(e.language.getText("twitter_sharing_placeholder").replace("http://wunderli.st", "https://www.wunderlist.com")),
            t;
        },
        render: function() {
            var e = this;
            r.render.call(e, e.formatData(e.renderData));
            var t = e.$(".content");
            return t.html(e.template(e.formatData(e.renderData))),
            e.defer(function() {
                e.delegateEvents(),
                e.$(".content-inner").focus();
            }),
            e.renderLocalized(),
            e;
        },
        showThanks: function() {
            var e = this;
            a.delay(function() {
                e.$(".prompt").addClass("hidden"),
                e.$(".thanks").removeClass("hidden");
            }, 1e3);
        },
        focusTwitter: function() {
            this.$(".share-twitter a").focus();
        },
        focusGoogle: function() {
            this.$(".share-google a").focus();
        }
    });
}),
define("views/Debug/controllers/DebugModalController", ["application/runtime", "wunderbits/WBModalViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "click:purge": "purgeTrackers",
            "toggle:updating": "toggleUpdating",
            "click:export": "exportTrackers"
        },
        purgeTrackers: function() {
            var t = this
              , i = t.view
              , n = "You should only purge the tracker models if you absolutely know what you are doing.  Any unsynced local changes will be lost FOREVER. Are you sure that you want to purge all sync trackers?";
            window.confirm(n) && (e.trigger("trackers:clear"),
            i.renderTrackerData());
        },
        toggleUpdating: function() {
            var e = this
              , t = e.view;
            t.update = !t.update,
            t.$(".toggle-updating").text(t.update ? "Pause Updating" : "Resume Updating");
        },
        exportTrackers: function() {
            var t = this;
            e.global.trackers = t.view.trackerModels;
        }
    });
}),
define("/templates/debug/debug.js", {
    name: "debug/debug",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="content-inner"> <div class="heading"> <p> Queued for Syncing items are reflected as "# unsynced items" in the user menu. <br/> Currently Syncing items are items that have been sent out as part of an API<br/> request and awaiting API response. </p> <p> <a class="toggle-updating">Pause Updating</a> <a class="export-trackers">Expose Trackers on window</a> <a class="purge-trackers">Clear all Trackers</a> </p> </div> <h2>Queued for Syncing</h2> <div class="queued"> <ul class="trackers"></ul> </div> <h2>Currently Syncing</h2> <div class="syncing"> <ul class="trackers"></ul> </div> </div>';
        },
        useData: !0
    }
}),
define("/styles/debug/_debug.js", {
    name: "debug/_debug",
    data: '#debug.dialog,#debug button,#debug .button{font-family:Terminus,Consolas,Profont,"Andale Mono",Monaco,Inconsolata,Inconsolata-g,Unifont,Lime,"ClearlyU PUA",Clean,"DejaVu Sans Mono","Lucida Console","Bitstream Vera Sans Mono",Freemono,"Liberation Mono",Dina,Anka,Droid Sans Mono,Anonymous Pro,Proggy fonts,Envy Code R,Gamow,Courier,"Courier New",Terminal,monospace}#debug.dialog{width:800px;background:#000;-webkit-box-shadow:none;box-shadow:none;color:#737272;}#debug.dialog .content-inner{-webkit-border-radius:0;border-radius:0;min-height:100px;background:#000;}#debug.dialog .content-inner *{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;font-size:16px}#debug.dialog .content-inner a{color:#87ceeb;}#debug.dialog .content-inner a:hover{color:#fff}#debug.dialog .content-inner a.purge-trackers{color:#dc143c;}#debug.dialog .content-inner a.purge-trackers:hover{color:#f00}#debug.dialog .content-inner h2{padding-bottom:14px;color:#0c0;line-height:14px}#debug.dialog .content-inner p{margin:5px 0}#debug.dialog .content-inner .heading{border-bottom:1px solid #333;margin:14px 0;padding-bottom:14px;}#debug.dialog .content-inner .heading *{font-size:13px}#debug.dialog .content-inner ul.trackers{margin-left:2em;list-style:square;text-transform:uppercase;font-weight:bold;color:#87ceeb}#debug.dialog .content-inner ul.items{margin-left:2em;list-style:decimal;text-transform:none;font-weight:normal;color:#737272;}#debug.dialog .content-inner ul.items .failure{color:#f00}#debug.dialog .content-inner ul li{margin-top:1em;}#debug.dialog .content-inner ul li table tr td:nth-child(1){text-align:right}#debug.dialog .content-inner ul li table tr td:nth-child(2){font-weight:bold}'
}),
define("views/Debug/DebugModalView", ["application/runtime", "wunderbits/WBModalView", "./controllers/DebugModalController", "template!debug/debug", "style!debug/_debug"], function(e, t, i, n, o) {
    var a = e.$
      , r = e._
      , s = t.prototype;
    return t.extend({
        template: n,
        styles: [o],
        "implements": [i],
        emits: {
            "click .purge-trackers": "click:purge",
            "click .toggle-updating": "toggle:updating",
            "click .export-trackers": "click:export"
        },
        initialize: function() {
            var e = this;
            e.throttledRenderTrackerData = r.throttle(e.renderTrackerData, 250),
            s.initialize.apply(e, arguments),
            e.update = !0;
        },
        render: function(t) {
            var i = this;
            i.trackerModels = e.trackers;
            var n = {
                id: "debug",
                close: e.language.getText("button_done")
            };
            return i.onClose = i.onClose || t && t.onClose,
            s.render.call(i, n),
            i.$(".content").append(i.template()),
            i.$el.addClass("debug"),
            i.$(".blue.button").removeClass("blue"),
            i.$(".toggle-updating").text(i.update ? "Pause Updating" : "Resume Updating"),
            i.renderTrackerData(),
            i.renderLocalized(),
            i.bindToCollections(),
            i;
        },
        bindToCollections: function() {
            var e = this;
            r.each(e.trackerModels, function(t) {
                e.bindTo(t, "change", e.throttledRenderTrackerData);
            });
        },
        renderTrackerData: function() {
            var e = this;
            e.update && (e.$(".syncing .trackers, .queued .trackers").empty(),
            r.each(e.trackerModels, function(t, i) {
                if (!/meta|failures|localIDs/.test(i)) {
                    var n = /settings/.test(i)
                      , o = t.attributes;
                    if (!(r.size(o) < 2)) {
                        var s = e.$(/Syncing/.test(i) ? ".syncing .trackers" : ".queued .trackers")
                          , l = a("<li>" + i + '<ul class="items"/></li>')
                          , c = l.find("ul.items");
                        s.append(l),
                        r.each(o, function(e, t) {
                            var o = t;
                            if ("id" !== t && e) {
                                var a = "<li>" + t + "<table>";
                                n && (o = i),
                                n ? a += "<tr><td>" + t + ":</td><td>" + r.escape(String(e)) + "</td></tr>" : r.each(e, function(e, t) {
                                    a += "<tr><td>" + t + ":</td><td>" + r.escape(String(e)) + "</td></tr>";
                                }),
                                a += "</table></li>",
                                c.append(a);
                            }
                        });
                    }
                }
            }));
        }
    });
}),
define("views/Modals/Controllers/ConfirmationModalController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBModalViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            "click:cancel": "onCancel",
            "click:confirm": "onConfirm",
            "keydown:buttons": "handleKeys"
        },
        onCancel: function() {
            var e = this
              , t = e.view;
            t.onCancel && t.onCancel(),
            e.closeView();
        },
        onConfirm: function() {
            var e = this
              , t = e.view;
            t.onConfirm && t.onConfirm(),
            e.closeView();
        },
        handleKeys: function(e) {
            var i = this;
            e.which === t.tab ? i.handleTabKey(e) : e.which === t.enter && e.stopPropagation();
        },
        handleTabKey: function(e) {
            var t = n(e.target)
              , i = this;
            t.hasClass("confirm") ? i.view.focusCancel() : i.view.focusConfirm(),
            e.preventDefault(),
            e.stopPropagation();
        }
    });
}),
define("wunderbits/helpers/emoji", ["../lib/dependencies", "./strings", "./xss", "project!core", "../mixins/EmojiData", "wunderbits/global"], function(e, t, i, n, o, a, r) {
    var s = e.$
      , l = a.requestAnimationFrame;
    return n.WBSingleton.extend({
        emojify: function(e, t) {
            function n() {
                s(e).replaceWith(s("<div/>").html(r).html());
            }
            var o = this
              , a = i.clean(e.nodeValue)
              , r = o.getEmojifiedString(a);
            a !== r && (t ? n() : l(n));
        },
        getEmojifiedString: function(e) {
            var i, n, a, s, l = this;
            if (e && e.length)
                for (var c = 0, d = e.length; d > c; c++)
                    i = l.extractUnicodeHexAt(e, c),
                    n = d > c + 2 ? l.extractUnicodeHexAt(e, c + 2) : r,
                    a = o.unicodeIndex[i],
                    s = o.unicodeIndex[i + "-" + n],
                    a && !s ? (i = '<span title="' + a + '" class="emoji emoticon _' + i + '">&#x' + i + "</span>",
                    e = t.replaceAt(e, c, i, 1),
                    a = r,
                    e = l.getEmojifiedString(e)) : s && (i = '<span title="' + s + '" class="emoji emoticon _' + i + "-" + n + '">&#x' + i + "&#x" + n + "</span>",
                    e = t.replaceAt(e, c, i, 3),
                    s = r,
                    e = l.getEmojifiedString(e));
            return e;
        },
        extractUnicodeHexAt: function(e, i) {
            return t.unicodeAt(e, i).toString(16);
        }
    });
}),
define("wunderbits/mixins/DomTreeMixin", ["../global", "project!core"], function(e, t, i) {
    function n(e, t, i) {
        var n = t.call(i, e);
        n && o(e, n);
    }
    function o(e, t) {
        var i = e.parentNode;
        if (i) {
            var n, o = e;
            for (t = [].slice.call(t); t.length; )
                n = t.pop(),
                i.insertBefore(n, o),
                o = n;
            i.removeChild(e);
        }
    }
    function a(e, t, i, o) {
        for (var a, r = [].slice.call(e.childNodes); r.length; )
            a = r.shift(),
            3 === a.nodeType ? n(a, t, i) : o && a.childNodes.length && r.push.apply(r, a.childNodes);
    }
    return t.WBMixin.extend({
        renderTokens: function(e, t) {
            var i = this;
            return e = e || i.$el,
            e.length && i.walkTextNodes(e[0], t.tokenize, t),
            i;
        },
        walkTextNodes: function(e, t, n, o) {
            n || (n = this),
            o === i && (o = !0),
            a(e, t, n, o);
        }
    });
}),
define("wunderbits/mixins/UnicodeEmojiViewMixin", ["../helpers/emoji", "./DomTreeMixin"], function(e, t) {
    return t.extend({
        renderEmoji: function(t, i) {
            var n = this;
            return t = t || n.$el,
            t.length && n.walkTextNodes(t[0], function(t) {
                e.emojify(t, i);
            }, e),
            n;
        }
    });
}),
define("/templates/modals/confirmationModal.js", {
    name: "modals/confirmationModal",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="content-inner notice" tabindex="0"> <span class="icon wunderlist-icon" aria-hidden="true"></span> <div class="confirm-text"> <div class="default-text"> <h3>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_are_you_sure_permanently_delete_item", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h3> <p>" + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_cant_undo", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> <div class="custom-text hidden"> <h3/> <p/> </div> </div> </div> <div class="content-footer"> <div class="cols"> <div class="col-20"></div> <div class="col-40"> <button class="full cancel" tabindex="0">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> </div> <div class="col-40"> <button class="blue full confirm" tabindex="0">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_confirm", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</button> </div> </div> </div>";
        },
        useData: !0
    }
}),
define("views/Modals/ConfirmationModalView", ["application/runtime", "wunderbits/WBModalView", "wunderbits/WBBlurHelper", "views/Modals/Controllers/ConfirmationModalController", "wunderbits/mixins/UnicodeEmojiViewMixin", "template!modals/confirmationModal"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = t.prototype
      , c = t.extend({
        template: a,
        "implements": [n],
        observes: {
            runtime: {
                "confirmation:cancel": ">click:cancel",
                "confirmation:confirm": ">click:confirm"
            }
        },
        emits: {
            "click button.cancel": "click:cancel",
            "click button.confirm": "click:confirm",
            "keydown button.cancel": "keydown:buttons",
            "keydown button.confirm": "keydown:buttons"
        },
        renderData: {
            id: "confirmation",
            customTitle: r,
            text: r,
            confirm: r,
            cancel: r,
            customIconClass: r
        },
        formatData: function() {
            var e = this
              , t = e.options
              , i = l.formatData.apply(e, arguments);
            return i.customTitle = t.customTitle,
            i.text = t.customText,
            i.confirm = t.confirmText,
            i.cancel = t.cancelText,
            i.customIconClass = t.customIconClass,
            i;
        },
        initialize: function(e) {
            var t = this;
            l.initialize.apply(t, arguments),
            t.onConfirm = e && e.confirm,
            t.onCancel = e && e.cancel;
        },
        shouldRender: function() {
            var t = this
              , i = ["settings", "coachmark"];
            return t.keepTryingTimeout && window.clearTimeout(t.keepTryingTimeout),
            -1 !== s.indexOf(i, e.focus) ? (t.options.keepTrying && (t.keepTryingTimeout = t.delay("render", 2500)),
            !1) : !0;
        },
        renderBase: function(e) {
            var t = this;
            l.render.call(t, e);
        },
        render: function() {
            var t = this
              , n = t.formatData(t.renderData);
            if (!t.shouldRender())
                return !t.el && !t.destroyed && t.renderBase(n),
                t;
            if (t.renderBase(n),
            t.$el.find(".content").append(t.template()),
            n.text || n.customTitle) {
                var o = t.$el.find(".custom-text");
                t.$el.find(".default-text").addClass("hidden"),
                o.find("h3").html(n.customTitle),
                o.find("p").html(n.text),
                o.removeClass("hidden");
            } else
                t.$el.find(".default-text").removeClass("hidden");
            return n.customIconClass && t.$(".icon").removeClass("wunderlist-icon icon").addClass(n.customIconClass),
            n.confirm && t.$("button.confirm").html(n.confirm),
            n.cancel && t.$("button.cancel").html(n.cancel),
            t.options.hideCancel && t.$("button.cancel").remove(),
            e.trigger("focus:set", "confirmation"),
            t.defer(function() {
                t.$(".content-inner").focus();
            }),
            t.renderLocalized(),
            t.renderEmoji(t.$(".custom-text .token_0")),
            i.run(),
            t;
        },
        focusConfirm: function() {
            this.$(".confirm").focus();
        },
        focusCancel: function() {
            this.$(".cancel").focus();
        }
    });
    return o.applyToClass(c),
    c;
}),
define("views/Modals/controllers/ListOptionsModalController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "vendor/moment", "wunderbits/WBModalViewController", "actions/Factory"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = o.prototype;
    return o.extend({
        "implements": {
            "keydown:title": "handleTitleKeys",
            "keydown:save": "onSaveKeydown",
            "keydown:cancel": "onCancelKeydown",
            "click:submit": "saveChanges",
            "click:trash": "onTrash",
            "click:duplicate": "duplicateList",
            "click:close": "onClose",
            "click:tab": "showTab",
            "modal:update": "updateTab"
        },
        initialize: function() {
            var e = this;
            s.initialize.apply(e, arguments),
            e.createList = a.createList(),
            e.muteList = a.muteList(),
            e.duplication = a.duplication();
        },
        onTrash: function() {
            var e = this
              , t = e.view
              , i = t.model.attributes.role;
            "owner" === i ? e.deleteList() : e.leaveList();
        },
        duplicateList: function() {
            var t = this
              , i = t.view.model;
            i && (t.duplication.duplicateList(i.id).done(function(t) {
                t && e.trigger("route:" + t.route());
            }),
            e.trigger("analytics:list:duplicate", "listOptions"),
            e.trigger("trackingService", "UI.tap", "listOptions.duplicateList"));
        },
        leaveList: function() {
            var t, i = this, n = i.view, o = n.model;
            if (o && (t = n.memberships.findWhere({
                user_id: "" + e.user.id
            }))) {
                var a = "true" === e.settings.attributes.confirm_delete_entity
                  , s = function() {
                    t.destroy();
                }
                  , l = {
                    confirm: s,
                    cancel: r.noop,
                    customTitle: e.language.getLabel("sharing_leave_action").toString(),
                    customText: e.language.getLabel("label_cant_undo").toString(),
                    confirmText: e.language.getLabel("sharing_leave_button").toString()
                };
                e.trigger("leaving:list"),
                a ? e.trigger("modal:confirm", l) : s();
            }
        },
        deleteList: function() {
            var t = this
              , i = t.view.model;
            i && (e.trigger("leaving:list"),
            e.trigger("focus:set", "listOptions"),
            e.trigger("sidebar:deleteAndSelectNext", i));
        },
        handleTitleKeys: function(i) {
            var n = this;
            i.which === t.enter ? n.saveChanges(i) : i.which === t.esc && n.defer(function() {
                e.trigger("modal:close");
            });
        },
        onSaveKeydown: function(e) {
            var i = this;
            e.which !== t.tab || e.shiftKey || (i.view.focusTitleInput(),
            i.stopEventFully(e));
        },
        onCancelKeydown: function(e) {
            var i = this;
            i.view.hasTitleInput() || e.which !== t.tab || e.shiftKey || (i.view.focusTitleInput(),
            i.stopEventFully(e));
        },
        saveChanges: function(t) {
            var n, o = this, a = o.view, r = a.$(".listOptions-title"), s = i.emojiTokensToUnicode(r.val().trim());
            !o.isSavingChanges && s && (o.isSavingChanges = !0,
            a.options.model ? (n = a.options.model.id,
            o.createList.modifyListWith(n, s, o._getNewMembersIDs(), a.memberships),
            o.defer(o.closeView)) : (e.trigger("onboarding:addedList"),
            o.addList(t, s)),
            e.trigger("title:set", s),
            e.trigger("onboarding:shareListClose"));
        },
        onClose: function() {
            e.trigger("onboarding:shareListCancel"),
            this.destroyed || this.view.addedMembers.reset();
        },
        destroy: function() {
            var e = this
              , t = e.view;
            t.memberships && t.memberships.restoreRemoved(),
            s.destroy.apply(e, arguments);
        },
        _getNewMembersIDs: function() {
            var e = this;
            return e.view.addedMembers.map(function(e) {
                return e.attributes.id;
            });
        },
        addList: function(t, i) {
            var n = this
              , o = n.view
              , a = o.options.taskIds
              , r = !!o.saveOptions["public"]
              , s = !!o.saveOptions.muted;
            n.createList.createListWith(i, r, n._getNewMembersIDs(), a).then(function(t) {
                s && n.muteList.setListMuted(t.id, !0),
                o.memberships && o.memberships.destroyRemoved(),
                e.trigger("route:" + t.route()),
                n.defer(n.closeView);
            });
        },
        showTab: function(t) {
            var i, n = this;
            if ("string" == typeof t)
                i = t;
            else {
                var o = r(t.target);
                "A" !== t.target.tagName && (o = o.closest("a")),
                i = o.attr("rel");
            }
            var a = "lists/";
            a = n.view.model ? n.view.model.route("/edit") : "lists/new",
            e.trigger("route:" + a + "/" + i, {
                trigger: !1
            }),
            n.view.showTab(i, !0);
        },
        updateTab: function(e) {
            var t = this
              , i = t.view;
            i.showTab(e.tab, !!e.tab);
        }
    });
}),
define("views/ListView", ["application/runtime", "wunderbits/WBViewPresenter"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        tagName: "ul",
        itemView: null,
        emits: {
            "click li": "click:item"
        },
        observes: {
            events: {
                "*parents:filter": "filterCollection"
            }
        },
        initialize: function() {
            var e = this;
            if (i.initialize.apply(e, arguments),
            e.collection = e.getCollection(),
            !e.collection)
                throw new Error("Cannot create collection view without a collection");
            if (!e.itemView)
                throw new Error("Cannot create ListView without item view class");
            e.bindTo(e.collection, "remove", e.removeItem);
        },
        getCollection: function() {
            return !1;
        },
        filterCollection: function() {},
        getModels: function() {
            return this.collection.models.slice();
        },
        render: function() {
            for (var e, t, i = this, n = document.createDocumentFragment(), o = i.getModels(), a = 0, r = o.length; r > a; a++)
                e = o[a],
                t = i.addSubview(new i.itemView(i.getItemOptions(e)), e.id),
                n.appendChild(t.render().el);
            return i.el.appendChild(n),
            i.filterCollection(i.startQuery || ""),
            i;
        },
        getItemOptions: function(e) {
            return {
                model: e
            };
        },
        removeItem: function(e) {
            var t = this
              , i = t.getSubview(e.id);
            i && i.destroy();
        }
    });
}),
define("views/AvatarView", ["application/runtime", "actions/Factory", "project!database", "helpers/BlobHelper", "helpers/URLResolver", "wunderbits/WBView"], function(e, t, i, n, o, a, r) {
    var s = e.config
      , l = e._
      , c = new i.WBLocalStorage()
      , d = a.prototype;
    return a.extend({
        className: "avatar",
        renderData: {
            id: r
        },
        initialize: function(e) {
            var i = this;
            i.options = e || {},
            d.initialize.apply(i, arguments);
            var n = t.userLookup()
              , o = i.options.listId || "all";
            i.assignables = "all" === o ? n.allUsers : n.getAssignableCollectionForList(o),
            i.bindTo(i.assignables, "add", function(e) {
                i.destroyed || e.attributes.id !== i.options.id || i.render();
            });
        },
        formatData: function(e) {
            var t = this;
            return e = d.formatData.call(t, e),
            e.id = t.options.id,
            e;
        },
        render: function(t) {
            var i = this;
            i.options = l.extend(i.options, t) || t || {},
            i.options.id = t && t.id || i.options && i.options.id,
            i.options.isOwnAvatar = t && t.isOwnAvatar;
            var n = i.formatData(i.renderData);
            return i.renderSize(),
            i.options.system ? (i.$el.addClass("wunderlist-avatar"),
            i) : (i.$el.html('<img src=""/>'),
            i.options.isOwnAvatar || e.user.isIDEqual(n.id) ? i.renderOwnAvatar() : i.renderAvatar(n),
            i);
        },
        renderSize: function() {
            var t = this
              , i = t.options.size;
            if (i) {
                if ("string" == typeof i)
                    t.$el.addClass(i),
                    "medium" === t.options.size ? 32 : i;
                else {
                    var n = 32 === i ? "medium" : "";
                    t.$el.addClass(n);
                }
                e.env.isRetina() && "number" == typeof i && (t.options.size = 2 * i);
            }
        },
        renderAvatar: function(e) {
            var t = this
              , i = t.assignables.findWhere({
                id: e.id
            });
            t.updateAvatar(i),
            t.options && t.options.url ? t.setImage(t.options.url) : t.$el.addClass("no-avatar"),
            t.updateTitle(i);
        },
        renderOwnAvatar: function() {
            var t = this;
            t.options.showPro && (t.updateOwnProBadge(),
            t.bindTo(e.user, "change:pro", t.updateOwnProBadge)),
            t.updateOwnAvatar(),
            t.updateTitle(e.user),
            t.bindUserAvatarChanges();
        },
        bindUserAvatarChanges: function() {
            var t = this;
            t.bindTo(e.user, "change:avatar", t.updateOwnAvatar),
            t.bindTo(e.user, "change:id", t.updateOwnAvatar);
        },
        updateTitle: function(e) {
            var t = this;
            e && t.$el.attr("title", e.attributes.name);
        },
        updateAvatar: function(e) {
            var t, i = this;
            if (e) {
                var n = e.attributes;
                t = n.avatar ? n.avatar : s.api.host + "/v1/avatar?user_id=" + n.online_id + "&fallback=false",
                t && i.setImage(t);
            }
            i.$el.toggleClass("blank", !!t);
        },
        updateOwnAvatar: function() {
            var t = this;
            c.getItem("localAvatar").always(function(i) {
                var n = i ? i : e.user.getAvatarURL(null, t.options.size);
                t.setImage(n);
            });
        },
        updateOwnProBadge: function() {
            var t = this
              , i = e.user.isPro();
            t.$el.toggleClass("pro-user", i);
        },
        setImage: function(e) {
            var t = this
              , i = t.$("img")
              , o = t.$el
              , a = !1
              , r = l.once(function(e) {
                !a && t.replaceBrokenAvatar(e);
            });
            o.addClass("no-avatar"),
            e && n.loadImage(e, i, function() {
                a = !0,
                i.removeClass("hidden"),
                o.removeClass("no-avatar");
            }, r);
        },
        replaceBrokenAvatar: function() {
            var e = this;
            e.destroyed || e.$("img").addClass("hidden");
        }
    });
}),
define("/templates/listOptions/person.js", {
    name: "listOptions/person",
    data: {
        "1": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <div class="content-people-name-badge"> <span class="badge ' + r((o = t.tagColor || e && e.tagColor,
            typeof o === a ? o.call(e, {
                name: "tagColor",
                hash: {},
                data: n
            }) : o)) + '">' + r((o = t.tag || e && e.tag,
            typeof o === a ? o.call(e, {
                name: "tag",
                hash: {},
                data: n
            }) : o)) + "</span> </div> ";
        },
        "3": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="content-people-email">' + r((o = t.email || e && e.email,
            typeof o === a ? o.call(e, {
                name: "email",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "5": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return ' <div class="content-people-button"> <a class="button delete" tabindex="0" role="button" data-key-aria-label="voiceover_sharing_remove_button_$_label" data-aria-label="' + r((o = t.name || e && e.name,
            typeof o === a ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + '">' + r((o = t.localized || e && e.localized || s,
            o.call(e, "button_remove", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </div> ";
        },
        "7": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <div class="content-people-button"> <a class="button leave-list" tabindex="0" role="button">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_leave", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </div> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = '<span class="content-people-image"></span> <div class="content-people-meta"> <div class="content-people-name"> <span class="content-people-name-label">' + s((a = t.name || e && e.name,
            typeof a === r ? a.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : a)) + "</span> ";
            return o = t["if"].call(e, e && e.tag, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " </div> ",
            o = t["if"].call(e, e && e.email, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " </div> ",
            o = t["if"].call(e, e && e.canDelete, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t["if"].call(e, e && e.canLeave, {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " ";
        },
        useData: !0
    }
}),
define("views/ListOptions/PersonView", ["application/runtime", "wunderbits/WBViewPresenter", "wunderbits/mixins/UnicodeEmojiViewMixin", "views/AvatarView", "template!listOptions/person"], function(e, t, i, n, o, a) {
    var r = t.prototype
      , s = t.extend({
        tagName: "li",
        template: o,
        renderData: {
            email: a,
            icon: a,
            id: a,
            isCircle: a,
            buttonClass: a,
            name: a
        },
        formatData: function(e) {
            var t = this;
            e = r.formatData.call(t, e);
            var i = t.model && t.model.attributes || t.data || {};
            return e.id = i.id,
            e.name = i.name,
            e.email = i.email,
            e;
        },
        render: function() {
            var e = this;
            return r.render.apply(e, arguments),
            e.data.icon && e.$el.attr("rel", e.data.id),
            e.renderAvatar(e.data.id),
            e.renderEmoji(e.$(".content-people-name-label")),
            e;
        },
        renderAvatar: function(e) {
            var t = this;
            t.avatarView = t.avatarView || t.addSubview(new n({
                size: 32
            }), "avatarView"),
            t.$(".content-people-image")[0].appendChild(t.avatarView.render({
                id: e
            }).el);
        }
    });
    return i.applyToClass(s),
    s;
}),
define("views/ListOptions/controllers/MemberViewController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e.$;
    return t.extend({
        "implements": {
            "click:delete": "deleteMember",
            "click:leave": "leaveList"
        },
        deleteMember: function() {
            var e = this
              , t = e.view
              , i = t.options.addedMembers
              , n = i.get(t.model.id);
            n ? n && i.remove(n) : t.model.set({
                removed: !0
            }, {
                silent: !0
            }),
            e.view && e.view.destroy();
        },
        leaveList: function() {
            var t = this
              , n = t.view
              , o = "true" === e.settings.attributes.confirm_delete_entity
              , a = n.model
              , r = function() {
                a.destroy();
            }
              , s = {
                confirm: r,
                cancel: i.noop,
                customTitle: e.language.getLabel("sharing_leave_action").toString(),
                customText: e.language.getLabel("label_cant_undo").toString(),
                confirmText: e.language.getLabel("sharing_leave_button").toString()
            };
            e.trigger("leaving:list"),
            o ? e.trigger("modal:confirm", s) : r();
        }
    });
}),
define("views/ListOptions/MemberView", ["application/runtime", "actions/Factory", "./PersonView", "./controllers/MemberViewController"], function(e, t, i, n, o) {
    var a = i.prototype;
    return i.extend({
        "implements": [n],
        emits: {
            "click .delete": "click:delete",
            "click .leave-list": "click:leave"
        },
        renderData: {
            canLeave: o,
            email: o,
            icon: o,
            id: o,
            isCircle: o,
            name: o,
            tag: o,
            tagColor: o
        },
        formatData: function(t) {
            var i = this;
            t = a.formatData.call(i, t);
            var n = i.model.attributes
              , o = i.user && i.user.attributes
              , r = "accepted" === n.state;
            return t.id = n.user_id || i.model.id,
            t.name = o && o.name,
            t.tag = !r && e.language.getText("sharing_list_pending_member"),
            t.tagColor = r ? "blue" : "yellow",
            t.canLeave = r && e.user.isIDEqual(t.id),
            t.email = n.email || o && o.email,
            t = i.formatTemporary(t, o, n),
            t.canDelete = i.options.canDelete || "user" === n.type,
            t;
        },
        initialize: function() {
            var e = this;
            a.initialize.apply(e, arguments),
            e.userLookup = t.userLookup();
            var i = e.model.attributes && e.model.attributes.user_id || e.model.id;
            e.user = e.userLookup.getUserModel(i),
            e.model && e.bindTo(e.model, "change", e.render),
            e.user && e.bindTo(e.user, "change", e.render);
        },
        formatTemporary: function(t, i, n) {
            return !t.name && t.id.indexOf("@") > 0 ? t.name = t.id : !t.name && t.email && (t.name = t.email,
            t.email = null),
            n.query && (t.tag = e.language.getText("sharing_list_not_saved_member"),
            t.tagColor = "red"),
            t;
        }
    });
}),
define("views/ListOptions/OwnerView", ["application/runtime", "actions/Factory", "./PersonView"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        formatData: function(t) {
            var i = this;
            return t = n.formatData.call(i, t),
            t.tag = e.language.getText("sharing_list_owner"),
            t.tagColor = "blue",
            t.icon = null,
            t.isCircle = !1,
            t;
        },
        initialize: function() {
            var i = this;
            n.initialize.apply(i, arguments),
            i.userLookup = t.userLookup();
            var o = i.ownerID = i.options.id;
            i.model = e.user.isIDEqual(o) ? e.user : i.userLookup.getUserModel(o),
            i.model && i.bindTo(i.model, "change", i.render),
            i.toggleVisibility = i.debounce(i.toggleVisibility, 1);
        },
        toggleVisibility: function(e) {
            var t = this
              , i = !1;
            if (e) {
                e = e.toLowerCase();
                var n = t.model && t.model.attributes
                  , o = n ? n.name && n.name.toLowerCase() : t.ownerID
                  , a = n && n.email && n.email.toLowerCase();
                o && o.indexOf(e) < 0 && a && a.indexOf(e) < 0 && (i = !0);
            }
            t.$el.toggleClass("hidden", i);
        }
    });
}),
define("views/ListOptions/MembersListView", ["application/runtime", "actions/Factory", "../ListView", "./MemberView", "./OwnerView"], function(e, t, i, n, o) {
    var a = i.prototype
      , r = e._;
    return i.extend({
        tagName: "ul",
        className: "content-people",
        itemView: n,
        initialize: function() {
            var e = this;
            e.userLookup = t.userLookup(),
            e.membershipLookup = t.membershipLookup(),
            a.initialize.apply(e, arguments);
        },
        getCollection: function() {
            var e, t = this;
            return e = t.model ? t.membershipLookup.getMembershipCollection(t.model.id) : t.membershipLookup.getTemporaryMembershipCollection();
        },
        getModels: function() {
            var e = this;
            return r.unique(r.compact([].concat(e.collection.models, e.options.addedMembers.models)));
        },
        filterCollection: function(t) {
            var i = this;
            t = (t || "").toLowerCase();
            var n = i.getModels()
              , o = r.find(n, function(e) {
                return e.attributes.owner;
            });
            return i.model && o ? void r.each(n, function(e) {
                if (e.attributes.owner)
                    return void i.renderOwner(e);
                var n = i.userLookup.getUserModel(e.id)
                  , o = !0
                  , a = e.id;
                if (t && n) {
                    var r = n.attributes
                      , s = r.name && r.name.toLowerCase().indexOf(t) >= 0
                      , l = r.email && r.email.toLowerCase().indexOf(t) >= 0;
                    o = s || l;
                } else
                    a && a.indexOf("@") > 0 && (o = !t || a.indexOf(t) >= 0);
                e.attributes.removed && (o = !1);
                var c = i.getSubview(a);
                c && c.$el.toggleClass("hidden", !o);
            }) : i.renderOwner(e.user);
        },
        getItemOptions: function(t) {
            var i = this
              , n = i.model && i.model.attributes;
            return {
                model: t,
                canDelete: !n || "owner" === n.role || e.user.isIDEqual(n.owner_id),
                addedMembers: i.options.addedMembers,
                collection: i.getCollection()
            };
        },
        renderOwner: function(t) {
            var i = this
              , n = i.getSubview(t.id);
            n && n.$el.addClass("hidden");
            var a = t.attributes.user_id || t.attributes.id
              , r = e.user.isIDEqual(a) ? e.user : i.userLookup.getUserModel(a)
              , s = r && r.attributes
              , l = s ? s.id : a
              , c = i.getSubview("owner");
            c || (c = i.addSubview(new o({
                id: l
            }), "owner")),
            i.$(c).length || i.$el.prepend(c.render().$el.addClass("disabled")),
            c.toggleVisibility(s ? s.name : a);
        }
    });
}),
define("views/ListOptions/controllers/ListSelectionController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/helpers/email", "wunderbits/WBViewController"], function(e, t, i, n) {
    var o = e._
      , a = e.$;
    return n.extend({
        "implements": {
            "handle:keydown": "handleKeyDown",
            "select:id": "setSelection",
            "save:fromElement": "saveFromElement",
            "move:up": "moveUp",
            "move:down": "moveDown"
        },
        handleKeyDown: function(e) {
            var i = this;
            e.which === t.esc ? i.view.reset(e) : e.which !== t.enter || i.view.blockEnter ? e.which === t.down ? i.moveDown(e) : e.which === t.up && i.moveUp(e) : i.handleEnter(e);
        },
        handleEnter: function(e) {
            var t = this
              , i = t.view.stateModel.attributes
              , n = i.selected || i["default"];
            t.trySaveSelected(e, n);
        },
        saveFromElement: function(e) {
            var t = this
              , i = a(e.target).closest("li")
              , n = i.attr("rel");
            t.trySaveSelected(e, n);
        },
        isValidInvite: function(t) {
            var i = this
              , n = i.view.options.currentMembers
              , o = i.view.options.addedMembers;
            t = t && t.toLowerCase();
            var a = n && n.find(function(e) {
                return e.attributes.user_id === t;
            })
              , r = n && n.find(function(e) {
                var i = e.attributes;
                return i.user_id === t && i.removed === !0;
            })
              , s = o && o.find(function(e) {
                return e.attributes.id.toLowerCase() === t;
            })
              , l = i.view.collection.find(function(e) {
                var i = e.attributes.email;
                return i && i.toLowerCase() === t;
            });
            return r ? !0 : e.user.isIDEqual(t) || e.user.attributes.email.toLowerCase() === t || s || a || l ? !1 : !0;
        },
        trySaveSelected: function(e, t) {
            var n = this
              , o = n.view.stateModel.attributes.query
              , a = !0;
            "fake" === t && i.isValidEmail(o) && (t = o),
            o && n.stopItCold(e),
            a = n.isValidInvite(t),
            t && "fake" !== t && a && n.view.trigger("save:selected", t);
        },
        moveUp: function(e) {
            var t = this
              , i = t.view
              , n = i.stateModel
              , o = n.attributes
              , a = o.possibles || []
              , r = o.selected || o["default"]
              , s = a[a.length - 1];
            if (!r && a.length)
                n.set("selected", s);
            else if (r && a.length) {
                var l = a.indexOf(r)
                  , c = l >= 0
                  , d = c && a[l - 1];
                n.set("selected", d || s);
            }
            t.stopItCold(e);
        },
        moveDown: function(e) {
            var t = this
              , i = t.view
              , n = i.stateModel
              , o = n.attributes
              , a = o.possibles || []
              , r = o.selected || o["default"]
              , s = a[0];
            if (!r && a.length)
                n.set("selected", s);
            else if (r && a.length) {
                var l = a.indexOf(r)
                  , c = l >= 0
                  , d = c && a[l + 1];
                n.set("selected", d || s);
            }
            t.stopItCold(e);
        },
        savePossibles: function(e) {
            var t = this
              , i = t.view
              , n = o.pluck(e, "id");
            i.stateModel.set("possibles", n);
        },
        ensureSelection: function() {
            var e = this
              , t = e.view
              , i = t.stateModel
              , n = i.attributes.possibles || []
              , o = i.attributes.selected
              , a = o && n.indexOf(o) >= 0;
            !a && n.length ? i.set("default", n[0]) : n.length || (i.set("default", "fake"),
            i.unset("selected"));
        }
    });
}),
define("views/ListOptions/controllers/InviteAutocompleteController", ["application/runtime", "./ListSelectionController", "helpers/collectionSorting"], function(e, t, i) {
    var n = e.$
      , o = e._
      , a = t.prototype;
    return t.extend({
        "implements": {
            "set:query": "updateQuery",
            "save:selected": "addUser",
            focus: "handleFocus",
            blur: "handleBlur",
            "prevent:blur": "preventBlur"
        },
        initialize: function() {
            var e = this;
            e.updateQuery = e.debounce(e.updateQuery, 10),
            a.initialize.apply(e, arguments),
            e.bindTo(e.view.stateModel, "change:query", "updateSuggestions");
        },
        preventBlur: function() {
            var e = this;
            e.preventingBlur = !0,
            e.unpreventBlur && clearTimeout(e.unpreventBlur),
            e.unpreventBlur = e.delay(function() {
                e.preventingBlur = !1;
            }, 250);
        },
        handleBlur: function() {
            var e = this;
            e.defer(function() {
                e.preventingBlur || e.view.hide();
            });
        },
        handleFocus: function() {
            var e = this;
            e.defer(function() {
                e.view.stateModel.attributes.query && (e.updateSuggestions(),
                e.view.selectTargetValue());
            });
        },
        addUser: function(e) {
            var t = this;
            t.preventBlur = !0;
            var i = t.view.options.addedMembers
              , n = t.view.options.currentMembers
              , o = n && n.findWhere({
                user_id: e
            });
            e || console.error("Cannot add user to list, invalid ID"),
            o ? o.set({
                removed: !1
            }, {
                fromSync: !0
            }) : i.add({
                id: e,
                query: t.view.stateModel.attributes.query
            }),
            t.view.stateModel.attributes.query = "",
            t.view.stateModel.attributes.selected = "",
            t.updateDefault(),
            t.view.reset();
        },
        updateQuery: function(e) {
            var t = this
              , i = t.view;
            i.stateModel && i.stateModel.set("query", n(e.target).val());
        },
        updateDefault: function() {
            var e = this
              , t = e.view
              , i = o.find(t.collection.models, function(t) {
                return !e.view.options.addedMembers.get(t);
            });
            t.stateModel.set("default", i && i.id);
        },
        getSuggestions: function(e) {
            var t = this;
            if (e = e && e.toLowerCase(),
            !e)
                return [];
            var n = o.first(i.sortAndRemove(t.view.collection.models, function(i) {
                if (!t.isValidInvite(i.id))
                    return -1;
                var n = i.attributes.email
                  , o = n ? n.toLowerCase().indexOf(e) : -1
                  , a = i.attributes.name
                  , r = a ? a.toLowerCase().indexOf(e) : -1;
                return r >= o ? r : o;
            }), 5);
            return n;
        },
        hasSuggestionsChanged: function(e) {
            var t = this
              , i = o.map(e, function(e) {
                return e.attributes.id;
            }).join("")
              , n = i === t.lastSuggestedsHash;
            return t.lastSuggestedsHash = i,
            !n || !i;
        },
        updateSuggestions: function() {
            var e = this
              , t = e.view
              , i = t.stateModel.attributes.query
              , n = e.getSuggestions(i);
            e.hasSuggestionsChanged(n) && (e.savePossibles(n),
            t.renderSuggestions(n, i)),
            n.length || e.isValidInvite(i) || t.renderSuggestions([], "not-valid"),
            e.ensureSelection();
        }
    });
}),
define("/templates/listOptions/autocompletePerson.js", {
    name: "listOptions/autocompletePerson",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return '<div class="content-people-image"></div> <div class="content-people-meta"> <div class="content-people-name"> <span class="content-people-name-label">' + r((o = t.name || e && e.name,
            typeof o === a ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + '</span> </div> <span class="content-people-email">' + r((o = t.email || e && e.email,
            typeof o === a ? o.call(e, {
                name: "email",
                hash: {},
                data: n
            }) : o)) + "</span> </div> ";
        },
        useData: !0
    }
}),
define("views/ListOptions/SuggestedPersonView", ["application/runtime", "wunderbits/WBViewPresenter", "wunderbits/mixins/UnicodeEmojiViewMixin", "views/AvatarView", "wunderbits/helpers/email", "template!listOptions/autocompletePerson"], function(e, t, i, n, o, a, r) {
    var s = t.prototype
      , l = t.extend({
        tagName: "li",
        template: a,
        renderData: {
            email: r,
            icon: r,
            id: r,
            isCircle: r,
            buttonClass: r,
            name: r
        },
        formatData: function(t) {
            var i = this;
            t = s.formatData.call(i, t);
            var n = i.model && i.model.attributes || {};
            if (n.name)
                t.name = n.name,
                t.email = t.name === n.email ? "" : n.email;
            else if (n.email)
                t.name = n.email;
            else if ("fake" === i.options.id) {
                var a = i.options.email;
                o.isValidEmail(a) && a !== e.user.attributes.email ? t.name = a : (t.name = e.language.getText("login_email_not_valid"),
                t.invalid = !0);
            }
            return i.data = t,
            t;
        },
        render: function() {
            var e = this;
            s.render.apply(e, arguments);
            var t = e.model && e.model.id || e.options.id;
            return e.renderAvatar(t),
            e.$el.attr("rel", t),
            e.renderEmoji(e.$el),
            e;
        },
        renderAvatar: function(e) {
            var t = this
              , i = t.$(".content-people-image");
            t.avatarView = t.avatarView || t.addSubview(new n({
                size: "medium"
            }), "avatarView"),
            t.avatarView.$el.toggleClass("fake-user", "fake" === e),
            i.html(t.avatarView.render({
                id: e
            }).el);
        }
    });
    return i.applyToClass(l),
    l;
}),
define("views/ListOptions/InviteAutocompleteView", ["application/runtime", "./controllers/InviteAutocompleteController", "wunderbits/WBViewPresenter", "project!core", "./SuggestedPersonView"], function(e, t, i, n, o) {
    var a = n.lib.assert
      , r = n.WBStateModel
      , s = i.prototype
      , l = e._;
    return i.extend({
        tagName: "ul",
        className: "content-people inviteAutocomplete hidden",
        "implements": [t],
        emits: {
            "click li": "save:fromElement",
            "mousedown li": "prevent:blur"
        },
        targetEvents: {
            keydown: "handle:keydown",
            keyup: "set:query",
            focus: "focus",
            blur: "blur"
        },
        initialize: function() {
            var e = this;
            e.stateModel = new r(),
            s.initialize.apply(e, arguments),
            e.bindTo(e.stateModel, "change:selected change:default", "updateSelection"),
            e.target = e.options.target,
            a.object(e.target, "Cannot initialize InviteAutocompleteView without a target"),
            e.bindTargetEvents();
        },
        bindTargetEvents: function() {
            var e = this;
            l.each(e.targetEvents, function(t, i) {
                e.bindTo(e.target, i, function(i) {
                    e.trigger(t, i);
                });
            });
        },
        render: function() {
            var e = this;
            return e.isRendered ? e : (e.isRendered = !0,
            e);
        },
        reset: function(e) {
            var t = this;
            t.hide();
            var i = t.target.val();
            t.target.val(""),
            i && (l.defer(function() {
                t.destroyed || t.target.focus();
            }),
            e && e.stopPropagation()),
            t.blockEnter = !0;
        },
        selectTargetValue: function() {
            var e = this;
            l.defer(function() {
                e.target.select();
            });
        },
        updateSelection: function() {
            var e = this
              , t = e.stateModel.attributes
              , i = t.selected || t["default"];
            e.$("li").removeClass("active"),
            i && e.$('li[rel="' + i + '"]').addClass("active");
        },
        showFakePerson: function(e) {
            var t = this
              , i = new o({
                email: e,
                id: "fake"
            });
            t.render().$el.html(i.render().el).removeClass("hidden");
        },
        renderSuggestions: function(e, t) {
            var i = this;
            if (t && e.length) {
                var n = document.createDocumentFragment();
                l.each(e, function(e) {
                    var t = new o({
                        model: e
                    });
                    n.appendChild(t.render().el);
                }),
                i.render().$el.html(n).removeClass("hidden");
            } else
                t ? i.showFakePerson(t) : i.$el.addClass("hidden");
            i.updateSelection(),
            i.blockEnter = !1;
        }
    });
}),
define("views/ListOptions/controllers/OptionsController", ["application/runtime", "wunderbits/WBViewController", "actions/Factory"], function(e, t, i) {
    var n = e.$
      , o = t.prototype;
    return t.extend({
        "implements": {
            "click:mute": "toggleMuted",
            "click:public": "togglePublic",
            "click:copyPublicURL": "copyPublicURL"
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(e, arguments),
            e.muteList = i.muteList(),
            e.updateList = i.updateList();
        },
        toggleMuted: function(e) {
            var t = this
              , i = t.view
              , o = n(e.currentTarget)
              , a = o.is(":checked")
              , r = i.ownMembership;
            r ? t.muteList.setListMuted(r.attributes.list_id, a) : (i.saveOptions.muted = a,
            i.trigger("update:saveOptions"));
        },
        togglePublic: function(e) {
            var t = this
              , i = t.view
              , o = n(e.currentTarget)
              , a = o.is(":checked")
              , r = i.model;
            if (r) {
                var s = a ? "publishList" : "unpublishList";
                t.updateList[s](r.id);
            } else
                i.saveOptions["public"] = a,
                i.trigger("update:saveOptions");
        },
        copyPublicURL: function(e) {
            var t = n(e.currentTarget);
            t.select();
        }
    });
}),
define("partial", ["vendor/handlebars.runtime", "loaders/lib/normalize"], function(e, t, i) {
    return e.registerHelper("symbol", function(t) {
        var i = "symbols/" + t
          , n = e.partials[i];
        return n ? new e.SafeString(n()) : "MISSING ICON: " + t;
    }),
    {
        load: function(t, n, o) {
            n([t], function(a) {
                if (n.isBrowser) {
                    var r = t.replace(/^\/templates\//, "").replace(/.js$/, "");
                    e.registerPartial(r, a.data.main);
                }
                o(i);
            });
        },
        normalize: t("templates")
    };
}),
define("/templates/symbols/duplicate.js", {
    name: "symbols/duplicate",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="duplicate" sketch:type="MSArtboardGroup"> <path d="M15.5,2 L7.5,2 C6.121,2 5,3.121 5,4.5 L5,6 L4.5,6 C3.121,6 2,7.121 2,8.5 C2,8.776 2.224,9 2.5,9 C2.776,9 3,8.776 3,8.5 C3,7.673 3.673,7 4.5,7 L5,7 L5,12.5 C5,13.879 6.121,15 7.5,15 L13,15 L13,15.5 C13,16.327 12.327,17 11.5,17 C11.224,17 11,17.224 11,17.5 C11,17.776 11.224,18 11.5,18 C12.879,18 14,16.879 14,15.5 L14,15 L15.5,15 C16.879,15 18,13.879 18,12.5 L18,4.5 C18,3.121 16.879,2 15.5,2 L15.5,2 Z M17,12.5 C17,13.327 16.327,14 15.5,14 L7.5,14 C6.673,14 6,13.327 6,12.5 L6,4.5 C6,3.673 6.673,3 7.5,3 L15.5,3 C16.327,3 17,3.673 17,4.5 L17,12.5 Z M2.5,14 C2.776,14 3,13.776 3,13.5 L3,11.5 C3,11.224 2.776,11 2.5,11 C2.224,11 2,11.224 2,11.5 L2,13.5 C2,13.776 2.224,14 2.5,14 Z M8.5,17 L6.5,17 C6.224,17 6,17.224 6,17.5 C6,17.776 6.224,18 6.5,18 L8.5,18 C8.776,18 9,17.776 9,17.5 C9,17.224 8.776,17 8.5,17 Z M4.5,17 C3.673,17 3,16.327 3,15.5 C3,15.224 2.776,15 2.5,15 C2.224,15 2,15.224 2,15.5 C2,16.879 3.121,18 4.5,18 C4.776,18 5,17.776 5,17.5 C5,17.224 4.776,17 4.5,17 Z M14.691,5.038 C14.63,5.013 14.565,5 14.5,5 L10.5,5 C10.224,5 10,5.224 10,5.5 C10,5.776 10.224,6 10.5,6 L13.293,6 L10.146,9.146 C9.951,9.342 9.951,9.658 10.146,9.853 C10.244,9.951 10.372,10 10.5,10 C10.628,10 10.756,9.951 10.853,9.853 L14,6.707 L14,9.5 C14,9.776 14.224,10 14.5,10 C14.776,10 15,9.776 15,9.5 L15,5.5 C15,5.435 14.987,5.37 14.962,5.309 C14.911,5.187 14.813,5.089 14.691,5.038" id="Fill-1" sketch:type="MSShapeGroup"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/listOptions/options.js", {
    name: "listOptions/options",
    data: {
        "1": function() {
            return "disabled";
        },
        "3": function() {
            return 'checked="checked"';
        },
        "5": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.isOwner, {
                name: "if",
                hash: {},
                fn: this.program(6, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "6": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = ' <li> <label> <input class="public-list" type="checkbox" ';
            return o = t["if"].call(e, e && e.isPublic, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += "> " + s((a = t.localized || e && e.localized || r,
            a.call(e, "options_public_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </label> <div class="public-info ',
            o = t.unless.call(e, e && e.hasPublicPreview, {
                name: "unless",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '"> <input class="big public-list-copy" name="public-list-copy" type="text" value="' + s((a = t.publicURL || e && e.publicURL,
            typeof a === l ? a.call(e, {
                name: "publicURL",
                hash: {},
                data: n
            }) : a)) + '"/> <ul class="social-links"> ',
            o = t["if"].call(e, e && e.isChina, {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.program(11, n),
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + " </ul> </div> </li> ";
        },
        "7": function() {
            return "hidden";
        },
        "9": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return ' <li class="link share-weibo"> <span class="icon weibo-btn arrow-btn"></span> <a href="http://service.weibo.com/share/share.php?url=' + r((o = t.publicURL || e && e.publicURL,
            typeof o === a ? o.call(e, {
                name: "publicURL",
                hash: {},
                data: n
            }) : o)) + "&amp;title=" + r((o = t.listTitle || e && e.listTitle,
            typeof o === a ? o.call(e, {
                name: "listTitle",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow">' + r((o = t.localized || e && e.localized || s,
            o.call(e, "social_sharing_button_facebook", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </li> ";
        },
        "11": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return ' <li class="link share-google"> <span class="icon google-btn arrow-btn"></span> <a href="https://plus.google.com/share?url=' + r((o = t.publicURL || e && e.publicURL,
            typeof o === a ? o.call(e, {
                name: "publicURL",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow">+1</a> </li> <li class="link share-facebook"> <span class="icon facebook-btn arrow-btn"></span> <a href="http://www.facebook.com/dialog/feed?app_id=208559595824260&amp;link=' + r((o = t.publicURL || e && e.publicURL,
            typeof o === a ? o.call(e, {
                name: "publicURL",
                hash: {},
                data: n
            }) : o)) + "&amp;redirect_uri=" + r((o = t.publicURL || e && e.publicURL,
            typeof o === a ? o.call(e, {
                name: "publicURL",
                hash: {},
                data: n
            }) : o)) + "&amp;name=" + r((o = t.listTitle || e && e.listTitle,
            typeof o === a ? o.call(e, {
                name: "listTitle",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow" data-key-aria-label="iyf_dialog_share_on_facebook">' + r((o = t.localized || e && e.localized || s,
            o.call(e, "social_sharing_button_facebook", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </li> <li class="link share-twitter"> <span class="icon twitter-btn arrow-btn"></span> <a href="http://twitter.com/share?text=' + r((o = t.listTitle || e && e.listTitle,
            typeof o === a ? o.call(e, {
                name: "listTitle",
                hash: {},
                data: n
            }) : o)) + " " + r((o = t.publicURL || e && e.publicURL,
            typeof o === a ? o.call(e, {
                name: "publicURL",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" class="button withArrow">' + r((o = t.localized || e && e.localized || s,
            o.call(e, "social_sharing_button_twitter", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </li> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<li> <label class="mute-list-label ';
            return o = t.unless.call(e, e && e.isShared, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '"> <input class="mute-list" ',
            o = t.unless.call(e, e && e.isShared, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' type="checkbox" ',
            o = t["if"].call(e, e && e.isMuted, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += "> " + s((a = t.localized || e && e.localized || r,
            a.call(e, "options_do_not_disturb", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </label> </li> ",
            o = t["if"].call(e, !1, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " ";
        },
        useData: !0
    }
}),
define("views/ListOptions/OptionsView", ["application/runtime", "actions/Factory", "wunderbits/WBViewPresenter", "./controllers/OptionsController", "project!core", "partial!symbols/duplicate", "template!listOptions/options"], function(e, t, i, n, o, a, r, s) {
    var l = o.lib.when
      , c = i.prototype;
    return i.extend({
        tagName: "ul",
        className: "content-options",
        template: r,
        "implements": [n],
        renderData: {
            isShared: !1,
            isOwner: !1,
            isMuted: !1,
            isPublic: !1,
            hasPublicPreview: !1,
            listID: s,
            listTitle: s,
            publicURL: s
        },
        emits: {
            "click .mute-list": "click:mute",
            "click .public-list": "click:public",
            "click .public-list-copy": "click:copyPublicURL"
        },
        observes: {
            model: {
                "change:shared": "updatedIsShared"
            }
        },
        formatData: function(t) {
            var i = this;
            t = c.formatData.call(i, t);
            var n = i.model
              , o = n && n.attributes || {}
              , a = i.memberships && i.memberships.findWhere({
                user_id: "" + e.user.id
            })
              , r = a && a.attributes || {};
            return t.isChina = "CN" === e.user.attributes.country,
            t.isShared = n && n.isShared(),
            t.isOwner = !!r.owner || "owner" === o.role || !n,
            t.isMuted = !!r.muted,
            t.isPublic = !!o["public"],
            t.hasPublicPreview = !!(t.isPublic && n && o.online_id),
            t.listID = o.online_id ? o.online_id : s,
            t.listTitle = o.title,
            t.publicURL = n && n.getFullPublicURL(),
            t;
        },
        initialize: function() {
            var i = this;
            c.initialize.apply(i, arguments),
            i.membershipLookup = t.membershipLookup(),
            i.saveOptions = {},
            i.model && (i.memberships = i.membershipLookup.getMembershipCollection(i.model.id),
            i.ownMembership = i.memberships.findWhere({
                user_id: "" + e.user.id
            }),
            i.setupModelBinds(),
            i.getUrls());
        },
        updatedIsShared: function(e) {
            var t = this;
            t.$(".mute-list")[e.isShared() ? "removeAttr" : "attr"]("disabled"),
            t.$(".mute-list-label").toggleClass("disabled", e.isShared());
        },
        setupModelBinds: function() {
            var e = this;
            e.bindTo(e.model, "change:public", function() {
                e.getUrls(),
                e.updatePublicToggle(),
                e.updatePublicPreview();
            }),
            e.ownMembership && e.bindTo(e.ownMembership, "change:muted", "updateMuteToggle");
        },
        getUrls: function() {
            var e = this;
            e.longURL = e.model.getFullPublicURL(),
            e.shortURL || l(e.model.getShortenedURL()).always(function(t) {
                e.shortURL = t && t[0],
                e.updatePublicPreview();
            });
        },
        updateMuteToggle: function() {
            var e = this
              , t = e.ownMembership
              , i = t && t.attributes || {}
              , n = e.$(".mute-list");
            n.prop("checked", !!i.muted);
        },
        updatePublicToggle: function() {
            var e = this
              , t = e.model
              , i = t && t.attributes || {}
              , n = e.$(".public-list");
            n.prop("checked", !!i["public"]);
        },
        updatePublicPreview: function() {
            var e = this;
            if (!e.destroyed) {
                var t = e.model
                  , i = t && t.attributes || {}
                  , n = !(!i["public"] || !i.online_id)
                  , o = e.shortURL ? e.shortURL : e.longURL;
                e.$(".public-info").toggleClass("hidden", !n),
                o && e.$(".public-list-copy").prop("value", o);
            }
        }
    });
}),
define("/templates/symbols/trash.js", {
    name: "symbols/trash",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="trash" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="trash"> <path d="M12,3.5 C12,2.4 11.1,1.5 10,1.5 C8.9,1.5 8,2.4 8,3.5 L5.5,3.5 C4.68,3.5 4,4.18 4,5 L4,7 C4,7.28 4.22,7.5 4.5,7.5 L15.5,7.5 C15.78,7.5 16,7.28 16,7 L16,5 C16,4.18 15.32,3.5 14.5,3.5 L12,3.5 Z M10,2.5 C10.56,2.5 11,2.94 11,3.5 L9,3.5 C9,2.94 9.44,2.5 10,2.5 L10,2.5 Z M15,6.5 L5,6.5 L5,5 C5,4.72 5.22,4.5 5.5,4.5 L14.5,4.5 C14.78,4.5 15,4.72 15,5 L15,6.5 Z M14.5,8.5 C14.22,8.5 14,8.72 14,9 L14,16 C14,16.28 13.78,16.5 13.5,16.5 L6.5,16.5 C6.22,16.5 6,16.28 6,16 L6,9 C6,8.72 5.78,8.5 5.5,8.5 C5.22,8.5 5,8.72 5,9 L5,16 C5,16.82 5.68,17.5 6.5,17.5 L13.5,17.5 C14.32,17.5 15,16.82 15,16 L15,9 C15,8.72 14.78,8.5 14.5,8.5 L14.5,8.5 Z M9,9 C9,8.72 8.78,8.5 8.5,8.5 C8.22,8.5 8,8.72 8,9 L8,15 C8,15.28 8.22,15.5 8.5,15.5 C8.78,15.5 9,15.28 9,15 L9,9 Z M12,9 C12,8.72 11.78,8.5 11.5,8.5 C11.22,8.5 11,8.72 11,9 L11,15 C11,15.28 11.22,15.5 11.5,15.5 C11.78,15.5 12,15.28 12,15 L12,9 Z" id="j"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/share.js", {
    name: "symbols/share",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="share rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="share"> <path d="M11.5025,12 C13.7825,12 15.5025,8.84 15.5025,6 C15.5025,3.8 13.7025,2 11.5025,2 C9.3025,2 7.5025,3.8 7.5025,6 C7.5025,8.5 9.0225,12 11.5025,12 L11.5025,12 Z M11.5025,3 C13.1625,3 14.5025,4.34 14.5025,6 C14.5025,8.26 13.1225,11 11.5025,11 C9.8425,11 8.5025,8.26 8.5025,6 C8.5025,4.34 9.8425,3 11.5025,3 L11.5025,3 Z M4.5025,10 L6.0025,10 C6.2825,10 6.5025,9.78 6.5025,9.5 C6.5025,9.22 6.2825,9 6.0025,9 L4.5025,9 L4.5025,7.5 C4.5025,7.22 4.2825,7 4.0025,7 C3.7225,7 3.5025,7.22 3.5025,7.5 L3.5025,9 L2.0025,9 C1.7225,9 1.5025,9.22 1.5025,9.5 C1.5025,9.78 1.7225,10 2.0025,10 L3.5025,10 L3.5025,11.5 C3.5025,11.78 3.7225,12 4.0025,12 C4.2825,12 4.5025,11.78 4.5025,11.5 L4.5025,10 Z M18.2625,14.88 C18.0625,14 17.4025,13.28 16.5225,13.04 L14.2225,12.36 C14.0825,12.32 13.9625,12.26 13.8625,12.14 C13.6625,11.96 13.3425,11.96 13.1625,12.16 C12.9625,12.34 12.9625,12.66 13.1625,12.86 C13.3825,13.08 13.6425,13.24 13.9425,13.32 L16.2425,14 C16.7625,14.14 17.1625,14.58 17.2825,15.1 L17.4425,15.8 C16.9025,16.16 15.2025,17 11.5025,17 C7.7825,17 6.1025,16.14 5.5625,15.8 L5.7225,15.04 C5.8425,14.5 6.2625,14.06 6.8025,13.92 L9.0425,13.32 C9.3425,13.24 9.6225,13.08 9.8625,12.86 C10.0425,12.66 10.0425,12.34 9.8625,12.14 C9.6625,11.96 9.3425,11.96 9.1425,12.14 C9.0425,12.24 8.9225,12.32 8.7825,12.36 L6.5425,12.96 C5.6425,13.2 4.9625,13.92 4.7425,14.82 L4.5225,15.9 C4.4825,16.06 4.5225,16.24 4.6425,16.36 C4.7225,16.42 6.3625,18 11.5025,18 C16.6425,18 18.2825,16.42 18.3625,16.36 C18.4825,16.24 18.5225,16.06 18.4825,15.9 L18.2625,14.88 Z" id="W"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/modals/listOptionsModal.js", {
    name: "modals/listOptionsModal",
    data: {
        "1": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.editing, {
                name: "if",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "2": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <a tabindex="0" role="button" class="delete-list" data-key-aria-label="label_delete_list" data-key-title="label_delete_list"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "trash", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        "4": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <a tabindex="0" role="button" class="duplicate-list" data-key-aria-label="actionbar_duplicate_list" data-key-title="actionbar_duplicate_list"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "duplicate", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = '<div class="content-header" tabindex="0"> <h3 class="center">' + s((a = t.localized || e && e.localized || r,
            a.call(e, e && e.headerKey, {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h3> <div class="separator noline"> <input class="big listOptions-title" type="text" data-key-placeholder="placeholder_list_name" data-key-aria-label="placeholder_list_name" maxlength="255" value="' + s((a = t.listTitle || e && e.listTitle,
            typeof a === l ? a.call(e, {
                name: "listTitle",
                hash: {},
                data: n
            }) : a)) + '"/> </div> <div class="separator noline"> <ul class="content-tabs"> <li> <a tabindex="0" role="button" rel="members">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "sharing_list_members", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </li> <li> <a tabindex="0" role="button" rel="options">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "sharing_list_options", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </li> </ul> </div> <div class="separator noline tab members"> <div class="input-fake big"> <input class="chromeless listOptions-search hasIcon" type="text" data-key-placeholder="placeholder_sharing_search" data-key-aria-label="placeholder_sharing_search"/> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "share", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </div> </div> </div> <div class="tab members"> <div class="content-inner"/> </div> <div class="tab options"> <div class="content-inner"/> </div> <div class="content-footer"> <div class="cols"> <div class="col-40"> ';
            return o = t["if"].call(e, e && e.isOwner, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.editing, {
                name: "if",
                hash: {},
                fn: this.program(4, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' </div> <div class="col-30"><button class="cancel full close">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button></div> <div class="col-30"><button class="submit full blue">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_done", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</button></div> </div> </div> ";
        },
        useData: !0
    }
}),
define("/styles/modals/listOptions.js", {
    name: "modals/listOptions",
    data: '#wunderlist-base .listOptions .content-header{padding:14px 14px 0}#wunderlist-base .listOptions .content-inner{-webkit-border-radius:0;border-radius:0}#wunderlist-base .listOptions .tab{max-height:300px}#wunderlist-base .listOptions .tab.options .content-inner li{padding:15px 0;}#wunderlist-base .listOptions .tab.options .content-inner li label{font-size:12px;font-weight:bold;}#wunderlist-base .listOptions .tab.options .content-inner li label.disabled{opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50)}#wunderlist-base .listOptions .tab.options .content-inner li .public-info,#wunderlist-base .listOptions .tab.options .content-inner li .social-links{margin:10px 0}#wunderlist-base .listOptions .content-people{padding-top:6px;padding-bottom:6px;}#wunderlist-base .listOptions .content-people li{position:relative;padding:6px 0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;height:44px;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}#wunderlist-base .listOptions .content-people li:last-child{border:none}#wunderlist-base .listOptions .content-people li .content-people-meta{padding-left:10px;padding-right:10px;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}#wunderlist-base .listOptions .content-people li .content-people-name,#wunderlist-base .listOptions .content-people li .content-people-email{line-height:16px;cursor:default}#wunderlist-base .listOptions .content-people li .content-people-name{font-weight:bold;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}#wunderlist-base .listOptions .content-people li .content-people-name-label{white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}#wunderlist-base .listOptions .content-people li .content-people-email{font-size:12px;color:#737272;}#wunderlist-base .listOptions .content-people li .content-people-email:empty{display:none}#wunderlist-base .listOptions .content-people li .content-people-name-badge{white-space:nowrap;margin:0 5px;-webkit-flex-shrink:0;flex-shrink:0}#wunderlist-base .listOptions .content-people li .button,#wunderlist-base .listOptions .content-people li .badge{margin:0}#wunderlist-base .listOptions .content-people.inviteAutocomplete{position:absolute;right:10px;left:10px;top:172px;background-color:#fff;list-style:none;-webkit-box-shadow:0 2px 3px rgba(0,0,0,0.15);box-shadow:0 2px 3px rgba(0,0,0,0.15);-webkit-border-radius:4px;border-radius:4px;max-height:285px;overflow:auto;z-index:1000;margin:4px;border:1px solid #bcbcbc;padding:0;}#wunderlist-base .listOptions .content-people.inviteAutocomplete li{height:auto;padding-left:8px;padding-right:8px;}#wunderlist-base .listOptions .content-people.inviteAutocomplete li.active .content-people-name,#wunderlist-base .listOptions .content-people.inviteAutocomplete li.active .content-people-email{color:#fff}#wunderlist-base .listOptions .content-people.inviteAutocomplete li.active:before{content:\'\';position:absolute;top:2px;right:2px;bottom:2px;left:2px;background:#328ad6;z-index:-1;-webkit-border-radius:2px;border-radius:2px}#wunderlist-base .listOptions .invite li:hover{cursor:pointer}#wunderlist-base .listOptions .content-tabs{border-bottom:1px solid #d6d6d6;padding-bottom:4px;}#wunderlist-base .listOptions .content-tabs li{display:inline-block;margin-right:8px;}#wunderlist-base .listOptions .content-tabs li a{font-weight:bold;text-transform:uppercase;color:#737272;font-size:10px;position:relative;}#wunderlist-base .listOptions .content-tabs li a:hover{color:#737272}#wunderlist-base .listOptions .content-tabs li a.active{color:#262626;}#wunderlist-base .listOptions .content-tabs li a.active:after{content:\'\';position:absolute;height:0;border-bottom:1px solid #328ad6;left:0;right:0;bottom:-6px}#wunderlist-base .listOptions .content-tabs li a:focus{color:#328ad6}#wunderlist-base .listOptions .content-footer .delete-list,#wunderlist-base .listOptions .content-footer .duplicate-list{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);}#wunderlist-base .listOptions .content-footer .delete-list:hover,#wunderlist-base .listOptions .content-footer .duplicate-list:hover{opacity:.8;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";filter:alpha(opacity=80)}#wunderlist-base .listOptions .content-footer .delete-list:active,#wunderlist-base .listOptions .content-footer .duplicate-list:active{opacity:1;-ms-filter:none;filter:none}#wunderlist-base .listOptions .content-footer .delete-list:focus,#wunderlist-base .listOptions .content-footer .duplicate-list:focus{fill:#328ad6}#wunderlist-base .listOptions .content-footer .delete-list{margin-right:8px}'
}),
define("views/Modals/ListOptionsModalView", ["application/runtime", "actions/Factory", "wunderbits/WBModalView", "./controllers/ListOptionsModalController", "../ListOptions/MembersListView", "../ListOptions/InviteAutocompleteView", "../ListOptions/OptionsView", "project!core", "partial!symbols/trash", "partial!symbols/share", "template!modals/listOptionsModal", "style!modals/listOptions"], function(e, t, i, n, o, a, r, s, l, c, d, u, m) {
    var p = s.WBDeferred
      , g = i.prototype;
    return i.extend({
        template: d,
        styles: [u],
        "implements": [n],
        renderData: {
            url: null,
            editing: !1,
            listTitle: m,
            headerKey: m,
            isOwner: m
        },
        formatData: function(e) {
            var t = this;
            e = g.formatData.call(t, e);
            var i = t.model;
            return i && (e.editing = !0),
            i && (e.listTitle = i.attributes.title),
            e.headerKey = e.editing ? "button_edit_list" : "label_new_list",
            e.isOwner = !i || i && t.model.isOwner(),
            e;
        },
        emits: {
            "keyup .listOptions-title": "change:title",
            "keydown .listOptions-title": "keydown:title",
            "keydown .submit": "keydown:save",
            "keydown .close": "keydown:cancel",
            "click .submit": "click:submit",
            "click .delete-list": "click:trash",
            "click .duplicate-list": "click:duplicate",
            "click .content-tabs a": "click:tab"
        },
        observes: {
            events: {
                "change:title": "updateButtons"
            },
            runtime: {
                "leaving:list": ">click:close",
                "modal:trySubmit": ">click:submit"
            }
        },
        initialize: function(i) {
            var n = this;
            g.initialize.apply(n, arguments),
            n.membershipLookup = t.membershipLookup(),
            n.userLookup = t.userLookup(),
            n.taskIds = i.taskIds,
            n.ready = new p(),
            n.bindOnceTo(e, "db:allMembershipsLoaded", n.ready.resolve, n.ready),
            n.model && (n.memberships = n.membershipLookup.getMembershipCollection(n.model.id)),
            n.addedMembers = n.options.addedMembers = n.membershipLookup.temporaryMemberships,
            n.bindTo(n.addedMembers, "add remove", "updateButtons"),
            n.hasRendered = n.deferred(),
            n.saveOptions = {};
        },
        onDestroy: function() {
            var e = this;
            e.addedMembers.reset(),
            g.onDestroy.call(e);
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            return g.render.call(e, t),
            e.ready.done(function() {
                e.deferredRender(t),
                e.hasRendered.resolve();
            }),
            e;
        },
        deferredRender: function(e) {
            var t = this;
            if (!t.destroyed) {
                var i = t.$(".content");
                i.html(t.template(e));
                var n = !t.model || t.model && t.model.isOwner();
                t.delay(function() {
                    if (!t.destroyed) {
                        t.delegateEvents();
                        var e = t.$(".listOptions-title");
                        t.options.tab && (e = t.$(".listOptions-search")),
                        n && e.select();
                    }
                }, 50);
                var s = t.addSubview(new a({
                    target: t.$(".listOptions-search"),
                    collection: t.userLookup.allUsers,
                    addedMembers: t.addedMembers,
                    currentMembers: t.memberships
                }), "invite");
                t.$(".listOptions").append(s.el);
                var l = t.membersView = t.addSubview(new o(t.options), "members")
                  , c = t.optionsView = t.addSubview(new r(t.options), "options");
                t.$(".tab.members .content-inner")[0].appendChild(l.render().el),
                t.$(".tab.options .content-inner")[0].appendChild(c.render().el),
                t.bindTo(t.addedMembers, "add remove", l.render, l),
                t.memberships && t.bindTo(t.memberships, "change:removed", l.render, l),
                t.bindTo(c, "update:saveOptions", "updateSaveOptions"),
                t.updateButtons(),
                t.renderLocalized();
            }
        },
        updateSaveOptions: function() {
            var e = this;
            e.saveOptions = {
                "public": e.optionsView.saveOptions["public"],
                muted: e.optionsView.saveOptions.muted
            };
        },
        updateButtons: function() {
            var t = this
              , i = t.hasMembersChanged()
              , n = t.hasTitleChanged()
              , o = i || n || !t.model
              , a = t.hasTitleInput();
            t.$("button.cancel").toggleClass("hidden", !o);
            var r = o ? "button_save" : "button_done"
              , s = t.$("button.submit");
            s.text(e.language.getText(r)),
            s.toggleClass("disabled", !a),
            s.attr("aria-disabled", !a),
            s.attr("tabindex", a ? 0 : -1);
        },
        hasTitleInput: function() {
            return !!this.$(".listOptions-title").val().trim();
        },
        hasTitleChanged: function() {
            var e = this
              , t = e.$(".listOptions-title").val().trim();
            return e.model ? t !== e.model.attributes.title : !!t;
        },
        hasMembersChanged: function() {
            var e = this
              , t = e.addedMembers.models.length
              , i = e.memberships && e.memberships.getPendingRemovals()
              , n = i && i.length || 0;
            return !(!t && !n);
        },
        showTab: function(e, t) {
            var i = this;
            e = e || "members",
            i.hasRendered.done(function() {
                var n = i.$(".listOptions-invite");
                i.$(".tab").addClass("hidden"),
                i.$(".tab." + e).removeClass("hidden"),
                i.tab = e,
                i.cachedFilterValues || (i.cachedFilterValues = {});
                var o = i.$(".content-tabs li a.active").attr("rel");
                o && (i.cachedFilterValues[o] = n.val()),
                i.$(".content-tabs li a").removeClass("active"),
                i.$('.content-tabs [rel="' + e + '"]').addClass("active"),
                n.val(i.cachedFilterValues[e] || ""),
                i.trigger("filter", i.cachedFilterValues[e] || "");
                var a = i.$(".content-inner");
                a.scrollTop(0),
                a.toggleClass("members", "members" === e),
                t && i.defer(function() {
                    n.select();
                });
            });
        },
        focusTitleInput: function() {
            this.$(".listOptions-title").focus();
        }
    });
}),
define("views/Modals/controllers/ChooseBackgroundModalController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBModalViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            "click:background": "changeBackground"
        },
        changeBackground: function(e) {
            var t = this
              , i = n(e.target).closest("li")
              , o = i[0].className
              , a = o.split("-").pop();
            t.view.choose(a),
            t.saveBackground(o);
        },
        saveBackground: function(t) {
            var i = n.trim(t.replace("background-", "wlbackground").replace("selected", ""))
              , o = e.settings.attributes.background;
            o !== i && (e.settings.save("background", i),
            e.trigger("analytics:backgroundModal:changeBackground", i));
        }
    });
}),
define("/templates/symbols/completed.js", {
    name: "symbols/completed",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="completed" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="completed"> <path d="M7.48412073,16.9975 C7.36412073,16.9975 7.24412073,16.9375 7.14412073,16.8575 C5.66412073,15.3575 4.00412073,14.0375 2.24412073,12.9175 C2.00412073,12.7775 1.92412073,12.4575 2.08412073,12.2375 C2.22412073,11.9975 2.54412073,11.9375 2.76412073,12.0775 C4.42412073,13.1175 5.98412073,14.3375 7.38412073,15.6975 C10.3441207,10.8175 13.3841207,6.9175 17.1441207,3.1375 C17.3441207,2.9575 17.6641207,2.9575 17.8641207,3.1375 C18.0441207,3.3375 18.0441207,3.6575 17.8641207,3.8575 C14.0041207,7.6975 10.9441207,11.6775 7.92412073,16.7575 C7.84412073,16.8775 7.70412073,16.9775 7.56412073,16.9975 L7.48412073,16.9975 Z" id="H"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/modals/backgroundModal.js", {
    name: "modals/backgroundModal",
    data: {
        "1": function() {
            return "not-pro";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="content-header"> <h2 class="center">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "userbar_change_background", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h2> </div> <div class="content-inner"> <div class="background-list"> <ul> <li class="background-06">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-02">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-17">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-01">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-03">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-04">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-05">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-20">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-07">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-08">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-25">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-26">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-09">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-10">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-11">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-12">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-13">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-14">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-15">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-16">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-21 ';
            return o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-23 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-27 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-22 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-24 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-18 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-29 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-28 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-19 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="background-30 ',
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</li> <li class="break"></li> </ul> </div> </div> <div class="content-footer"> <div class="cols"> <div class="col-30"></div> <div class="col-40"><button class="blue full close">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_done", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button></div> <div class="col-30"></div> </div> </div>';
        },
        useData: !0
    }
}),
define("/styles/modals/backgroundModal.js", {
    name: "modals/backgroundModal",
    data: '#backgroundModal{width:406px;}#backgroundModal .background-list{margin:7px 14px;font-size:0;text-align:justify;}#backgroundModal .background-list li{width:64px;height:64px;display:inline-block;-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,0.1);box-shadow:inset 0 0 0 1px rgba(0,0,0,0.1);-webkit-border-radius:4px;border-radius:4px;margin:7px 0;-webkit-background-size:120px;-moz-background-size:120px;background-size:120px;position:relative;cursor:pointer;}#backgroundModal .background-list li:before{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);position:absolute;-webkit-border-radius:4px;border-radius:4px;content:\'\';width:100%;height:100%;background:rgba(0,0,0,0.2)}#backgroundModal .background-list li .completed{content:\'\';-webkit-transition:300ms cubic-bezier(0.11, 1.16, 0.49, 1.25) 50ms;-moz-transition:300ms cubic-bezier(0.11, 1.16, 0.49, 1.25) 50ms;-o-transition:300ms cubic-bezier(0.11, 1.16, 0.49, 1.25) 50ms;-ms-transition:300ms cubic-bezier(0.11, 1.16, 0.49, 1.25) 50ms;transition:300ms cubic-bezier(0.11, 1.16, 0.49, 1.25) 50ms;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);fill:#fff;position:absolute;top:50%;left:50%;width:38px;height:38px;margin-left:-19px;margin-top:-19px;-webkit-transform:scale(.4);-moz-transform:scale(.4);-o-transform:scale(.4);-ms-transform:scale(.4);transform:scale(.4)}#backgroundModal .background-list li.not-pro{opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);pointer-events:none}#backgroundModal .background-list li.selected{cursor:default;}#backgroundModal .background-list li.selected .completed,#backgroundModal .background-list li.selected:before{opacity:1;-ms-filter:none;filter:none;-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}#backgroundModal .background-list li.break{width:100%;height:0;margin-bottom:0}'
}),
define("views/Modals/ChooseBackgroundModalView", ["application/runtime", "wunderbits/WBModalView", "./controllers/ChooseBackgroundModalController", "partial!symbols/completed", "template!modals/backgroundModal", "style!modals/backgroundModal"], function(e, t, i, n, o, a, r) {
    var s = t.prototype;
    return t.extend({
        template: o,
        styles: [a],
        "implements": [i],
        emits: {
            "click li:not(.selected)": "click:background"
        },
        renderData: {
            id: r,
            background: r,
            isPro: r
        },
        formatData: function(t) {
            var i = this;
            return t = s.formatData.call(i, t),
            t.id = "backgroundModal",
            t.background = parseInt(e.settings.attributes.background.substr(-2), 10),
            t.isPro = e.user.isPro(),
            t;
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            s.render.call(e, t);
            var i = e.$(".content");
            return i.html(e.template(t)),
            e.choose(t.background),
            e.renderLocalized(),
            e;
        },
        choose: function(e) {
            var t = this;
            t.$("li").removeClass("selected"),
            t.$(".background-" + e).addClass("selected");
        }
    });
}),
define("views/Modals/controllers/ChooseListsModalController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBModalViewController", "actions/Factory"], function(e, t, i, n) {
    var o = e.$
      , a = i.prototype;
    return i.extend({
        "implements": {
            "click:start": "start",
            "click:list": "onClickList"
        },
        initialize: function() {
            var e = this;
            a.initialize.apply(e, arguments),
            e.createList = n.createList();
        },
        onClickList: function(e) {
            var t = o(e.currentTarget);
            t.toggleClass("selected"),
            t.find(".list-toggle").toggleClass("blue"),
            this.updateStartButtonState();
        },
        updateStartButtonState: function() {
            var e = this.view.$el
              , t = e.find(".first-list li.selected");
            e.find("button.start").toggleClass("disabled", !t.length);
        },
        start: function() {
            var t = this
              , i = t.view
              , n = !1
              , a = i.$(".first-list li.selected");
            a.each(function(i, a) {
                var r = o(a)
                  , s = r.find(".list-title").text();
                s && t.createList.createList(s).done(function(t) {
                    n || (n = t,
                    e.trigger("route:lists/" + n.id),
                    e.trigger("onboarding:chooseListClosed"));
                });
            });
        }
    });
}),
define("/templates/modals/chooseListModal.js", {
    name: "modals/chooseListModal",
    data: {
        "1": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = " <li> " + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "list", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="list-title">';
            return o = typeof e === l ? e.apply(e) : e,
            (o || 0 === o) && (c += o),
            c + '</span> <button class="list-toggle circle"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "completed", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </button> </li> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="content-header"> <h3 class="center">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_onboarding_choose_your_first_lists", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h3> <p class="center">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_onboarding_choose_your_first_lists_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> <div class="content-inner"> <div class="first-list"> <ul> ';
            return o = t.each.call(e, e && e.listKeys, {
                name: "each",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' </ul> </div> </div> <div class="content-footer"> <div class="center"> <button class="blue half start disabled">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_get_started", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</button> </div> </div> ";
        },
        useData: !0
    }
}),
define("/styles/modals/chooseListModal.js", {
    name: "modals/chooseListModal",
    data: "#chooseListModal,#chooseBusinessListModal{width:380px;background:#fafafa;}#chooseListModal .content-inner,#chooseBusinessListModal .content-inner{padding:7px 14px 14px 14px;border-top:1px solid transparent}#chooseListModal .content-header h3,#chooseBusinessListModal .content-header h3{margin-bottom:5px}#chooseListModal .content-header p,#chooseBusinessListModal .content-header p{font-size:13px;color:#737272;padding:0 30px}#chooseListModal li,#chooseBusinessListModal li{position:relative;border-bottom:1px solid #d6d6d6;border-left:1px solid #d6d6d6;border-right:1px solid #d6d6d6;font-size:14px;height:42px;}#chooseListModal li:first-child,#chooseBusinessListModal li:first-child{border-top:1px solid #d6d6d6;-webkit-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0}#chooseListModal li:last-child,#chooseBusinessListModal li:last-child{-webkit-border-radius:0 0 5px 5px;border-radius:0 0 5px 5px}#chooseListModal li.selected .list-toggle svg.completed,#chooseBusinessListModal li.selected .list-toggle svg.completed{visibility:visible}#chooseListModal .list-title,#chooseBusinessListModal .list-title,#chooseListModal .list-toggle,#chooseBusinessListModal .list-toggle,#chooseListModal svg.list,#chooseBusinessListModal svg.list{position:absolute}#chooseListModal .list-title,#chooseBusinessListModal .list-title{left:42px;top:12px;font-weight:bold}#chooseListModal svg.list,#chooseBusinessListModal svg.list{left:13px;top:10px;fill:#737272}#chooseListModal .list-toggle,#chooseBusinessListModal .list-toggle{top:8px;right:14px;height:26px;width:26px}#chooseListModal svg.completed,#chooseBusinessListModal svg.completed{margin-top:-4px;margin-left:-4px;visibility:hidden;fill:#fff}#chooseListModal .content-footer button,#chooseBusinessListModal .content-footer button{margin:0}"
}),
define("views/Modals/ChooseListsModalView", ["application/runtime", "wunderbits/WBModalView", "./controllers/ChooseListsModalController", "template!modals/chooseListModal", "style!modals/chooseListModal"], function(e, t, i, n, o, a) {
    var r = t.prototype;
    return t.extend({
        template: n,
        styles: [o],
        "implements": [i],
        emits: {
            "click .start": "click:start",
            "click .first-list li": "click:list"
        },
        renderData: {
            id: a
        },
        formatData: function(t) {
            var i = this;
            return t = r.formatData.call(i, t),
            t.id = "chooseListModal",
            t.listKeys = ["groceries", "movies", "travel", "work", "family", "private"],
            t.listKeys.forEach(function(i, n) {
                t.listKeys[n] = e.language.getLabel("label_onboarding_" + i + "_list").toString();
            }),
            t;
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            r.render.call(e, t);
            var i = e.$(".content");
            return i.html(e.template(t)),
            e.renderLocalized(),
            e;
        }
    });
}),
define("views/Modals/controllers/ChooseBusinessListsModalController", ["application/runtime", "wunderbits/data/keycodes", "project!core", "./ChooseListsModalController", "actions/Factory", "vendor/moment"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = e._
      , l = n.prototype
      , c = i.WBDeferred
      , d = i.lib.when
      , u = {
        "Team Tasks": "team",
        "At Work": "work",
        "At Home": "home",
        "Getting Started": "tutorial"
    };
    return n.extend({
        "implements": {
            "click:start": "start",
            "click:list": "onClickList"
        },
        initialize: function() {
            var e = this;
            l.initialize.apply(e, arguments),
            e.createList = o.createList(),
            e.createTask = o.createTask();
        },
        createData: {
            team: [{
                title: "Share this list with colleagues and start working together!",
                position: 0,
                note: "Having a Team List is an ideal starting point for your team's tasks. \n Please share this list with your team members to foster teamwork and experience the power of sharing and assigning tasks."
            }],
            tutorial: [{
                title: "This is a task. Double-click to open the detail-view.",
                due_date: a().add("days", 3).format("YYYY-MM-DD"),
                note: "This is a note. The notes section is handy for briefings, instructions, or the context of a task. Use the comments field below to start a focused conversation about what needs to be done.",
                position: 50,
                subtasks: [{
                    title: "This is a subtask. Subtasks let you divide tasks into small, more actionable steps."
                }, {
                    title: "And another actionable step here"
                }]
            }, {
                title: "This task has a due date. Add due dates and reminders to keep your projects on schedule.",
                position: 100,
                due_date: a().add("months", 2).format("YYYY-MM-DD"),
                note: "Due dates set a deadline for each task while reminders pop up specifically for your account on all your devices. \n You can add due dates to your calendar using the calendar integration link towards the bottom of the account settings."
            }, {
                title: "This task has been starred for priority. You can star a task by clicking the star at the right.",
                position: 200,
                starred: !0,
                note: "Once your tasks have been starred, you can sort by priority by clicking the sort button at the bottom of the app."
            }, {
                title: "Add a file to this task at the bottom of the detail-view.",
                position: 300,
                note: "You can add files by drag-and-dropping them into the dropzone. \n With our new Dropbox integration, attaching files and keeping them updated is a breeze!"
            }, {
                title: "Create and share new lists for your projects or teams by clicking the big + button on the bottom left.",
                position: 600,
                note: "Choose descriptive list names and be sure to invite everyone that needs to be kept in the loop."
            }, {
                title: 'View our 90 second "Getting Started" video: http://youtu.be/nQ_-V6owiyk',
                position: 1
            }]
        },
        onClickList: function(e) {
            var t = r(e.currentTarget);
            t.toggleClass("selected"),
            t.find(".list-toggle").toggleClass("blue"),
            this.updateStartButtonState();
        },
        updateStartButtonState: function() {
            var e = this.view.$el
              , t = e.find(".first-list li.selected");
            e.find("button.start").toggleClass("disabled", !t.length);
        },
        start: function() {
            var t = this
              , i = t.view
              , n = !1
              , o = new c()
              , a = i.$(".first-list li.selected");
            a.each(function(e, i) {
                var s = r(i)
                  , l = s.find(".list-title").text();
                l && t.createList.createList(l).done(function(i) {
                    n || (n = i);
                    var r = u[l];
                    r && t.createTasksForList(i.id, r),
                    e === a.length - 1 && o.resolve();
                });
            }),
            d(o).done(function() {
                s.delay(function() {
                    e.trigger("route:lists/" + n.id),
                    e.trigger("onboarding:chooseListClosed");
                }, 250);
            });
        },
        createTasksForList: function(e, t) {
            var i = this
              , n = i.createData[t];
            n && (n = n.reverse(),
            s.each(n, function(t) {
                t.interval && t.frequency && (t.repeat = {
                    interval: t.interval,
                    frequency: t.frequency
                }),
                i.createTask.createTask(t.title, e, t.starred, t.due_date, t.repeat, t.note, t.subtasks, t.position);
            }));
        }
    });
}),
define("views/Modals/ChooseBusinessListsModalView", ["application/runtime", "./ChooseListsModalView", "./controllers/ChooseBusinessListsModalController", "template!modals/chooseListModal", "style!modals/chooseListModal"], function(e, t, i, n, o) {
    var a = t.prototype;
    return t.extend({
        styles: [o],
        "implements": [i],
        formatData: function(e) {
            var t = this;
            return e = a.formatData.call(t, e),
            e.id = "chooseBusinessListModal",
            e.listKeys = ["Team Tasks", "At Work", "At Home", "Getting Started"],
            e;
        }
    });
}),
define("/templates/modals/goProModal.js", {
    name: "modals/goProModal",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<a class="close">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + "</a> " + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "probadge", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <div class="content-inner"> <h2 class="center">' + r((o = t.localized || e && e.localized || a,
            o.call(e, e && e.title, {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h2> <div class="col-100"> <a class="button big greentext" href="https://www.wunderlist.com/pro" target="blank"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "pro_limit_button_label", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </div> <p class="center"> <a class="subline" href="/#/preferences/account/pro">' + r((o = t.localized || e && e.localized || a,
            o.call(e, e && e.text, {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </p> </div> ";
        },
        useData: !0
    }
}),
define("/styles/modals/goProModal.js", {
    name: "modals/goProModal",
    data: "#goProModal{width:300px;background:#67ae2b;-webkit-border-radius:6px;border-radius:6px;}#goProModal .content{overflow:visible}#goProModal .probadge{margin:-40px auto 0 auto}#goProModal .content-inner{padding:16px}#goProModal h2{color:#fff;padding:10px 0 30px 0}#goProModal p{margin-top:10px}#goProModal .subline{color:rgba(255,255,255,0.5);font-weight:bold}"
}),
define("/templates/symbols/probadge.js", {
    name: "symbols/probadge",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="probadge" width="80px" height="80px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"> <defs> <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-1"> <feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset> <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.107235054 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"></feColorMatrix> <feMerge> <feMergeNode in="shadowMatrixOuter1"></feMergeNode> <feMergeNode in="SourceGraphic"></feMergeNode> </feMerge> </filter> <circle id="path-2" cx="32" cy="32" r="32"></circle> <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-3"> <stop stop-color="#FFFFFF" offset="0%"></stop> <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"></stop> </linearGradient> <circle id="path-4" cx="32" cy="32" r="26.0266667"></circle> <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5"> <stop stop-color="#FFFFFF" stop-opacity="0.5" offset="0%"></stop> <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"></stop> </linearGradient> <path d="M64,32 C64,14.326888 49.673112,0 32,0 C14.326888,0 0,14.326888 0,32 C0,49.673112 14.326888,64 32,64 C49.673112,64 64,49.673112 64,32 Z M6.18666667,32 C6.18666667,17.7436897 17.7436897,6.18666667 32,6.18666667 C46.2563103,6.18666667 57.8133333,17.7436897 57.8133333,32 C57.8133333,46.2563103 46.2563103,57.8133333 32,57.8133333 C17.7436897,57.8133333 6.18666667,46.2563103 6.18666667,32 Z" id="path-6"></path> <path id="path-7" d="M12.2666667,26.7733333 L24.4321354,35.4627083 L19.7811979,49.5116146 L31.9466667,40.7286458 L44.1121354,49.6269271 L39.4611979,35.4242708 L51.6266667,26.7733333 L36.5976042,26.7733333 L31.9466667,12.5155208 L27.2957292,26.7733333 L12.2666667,26.7733333 Z"></path> </defs> <g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Pro-Limit---Desktop" sketch:type="MSArtboardGroup" transform="translate(-622.000000, -266.000000)"> <g id="Popover" sketch:type="MSLayerGroup" transform="translate(523.000000, 270.000000)"> <g id="pro-badge" transform="translate(107.000000, 0.000000)"> <g id="shadow" filter="url(#filter-1)"> <use fill="white" sketch:type="MSShapeGroup" xlink:href="#path-2"></use> <use fill="none" xlink:href="#path-2"></use> </g> <g id="badge"> <use fill="#794B0D" sketch:type="MSShapeGroup" xlink:href="#path-4"></use> <use fill-opacity="0.049999997" fill="url(#linearGradient-3)" xlink:href="#path-4"></use> </g> <g id="border"> <use fill="#FFC735" sketch:type="MSShapeGroup" xlink:href="#path-6"></use> <use fill-opacity="0.5" fill="url(#linearGradient-5)" xlink:href="#path-6"></use> </g> <g id="Star"> <use fill="#FFC735" sketch:type="MSShapeGroup" xlink:href="#path-7"></use> <use fill-opacity="0.5" fill="url(#linearGradient-5)" xlink:href="#path-7"></use> </g> <path d="M19.9041824,49.4228248 L18.4203834,51.4508044 C12.2517294,47.1647351 8.21333333,40.0273099 8.21333333,31.9466667 C8.21333333,18.8391086 18.8391086,8.21333333 31.9466667,8.21333333 C37.4046972,8.21333333 42.4324072,10.0557547 46.4417931,13.1525941 L36.5466806,26.6767209 L31.9466667,12.5155208 L27.2957292,26.8334896 L12.2666667,26.8334896 L24.4321354,35.4627083 L19.7811979,49.5116146 L19.9041824,49.4228248 Z M50.8023433,7.19282018 C45.5954207,3.27924696 39.1218882,0.96 32.1066667,0.96 C14.9048377,0.96 0.96,14.9048377 0.96,32.1066667 C0.96,42.5638644 6.11341187,51.8174184 14.0191243,57.4662172 L16.6408784,53.8829396 C9.79974162,49.0440429 5.33333333,41.0702809 5.33333333,32.0533333 C5.33333333,17.2962848 17.2962848,5.33333333 32.0533333,5.33333333 C38.1175296,5.33333333 43.7098922,7.35349364 48.1941586,10.7575518 L50.8023433,7.19282018 Z" id="Star-Glare" opacity="0.210820896" fill-opacity="0.3" fill="#FFFFFF" sketch:type="MSShapeGroup"></path> <path d="M20.5206101,47.2781011 L24.4321354,35.4627083 L12.2666667,26.8334896 L27.2957292,26.8334896 L31.9466667,12.5155208 L36.3673379,26.124612 C31.1407665,33.0798198 25.5652074,40.5159879 20.5206101,47.2781011 Z" id="Path" opacity="0.24" fill-opacity="0.3" fill="#FFFFFF" sketch:type="MSShapeGroup"></path> </g> </g> </g> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/delete.js", {
    name: "symbols/delete",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("views/Modals/GoProModalView", ["application/runtime", "wunderbits/WBModalView", "template!modals/goProModal", "style!modals/goProModal", "partial!symbols/probadge", "partial!symbols/delete"], function(e, t, i, n, o, a, r) {
    var s = t.prototype;
    return t.extend({
        template: i,
        styles: [n],
        renderData: {
            id: r
        },
        formatData: function(t) {
            var i = this
              , n = ["assigning", "files", "subtasks"]
              , o = e.currentRoute().replace("goPro/", "")
              , a = -1 !== n.indexOf(o);
            return o = a ? o : "assigning",
            t.title = "pro_limit_" + o + "_title",
            t.text = "pro_limit_" + o + "_update_text",
            t = s.formatData.call(i, t),
            t.id = "goProModal",
            t;
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            s.render.call(e, t);
            var i = e.$(".content");
            return i.html(e.template(t)),
            e.renderLocalized(),
            e;
        }
    });
}),
define("/templates/reminderItem.js", {
    name: "reminderItem",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="reminderItem-content"> <span class="reminderItem-icon"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "bell", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> <div class="reminderItem-text"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_reminder_message_$", e && e.title, {
                name: "localized",
                hash: {},
                data: n
            }))) + '. </div> </div> <a class="delete"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a>";
        },
        useData: !0
    }
}),
define("views/Reminders/ReminderItemView", ["application/runtime", "wunderbits/helpers/date", "wunderbits/WBView", "vendor/moment", "partial!symbols/delete", "template!reminderItem"], function(e, t, i, n, o, a) {
    var r = i.prototype;
    return i.extend({
        tagName: "li",
        className: "reminderItem dialog",
        template: a,
        events: {
            "click .delete": "_onDismissReminder",
            click: "_onClick"
        },
        initialize: function(e) {
            var t = this;
            e = e || {},
            t.taskModel = e.taskModel,
            r.initialize.apply(t, arguments);
        },
        renderData: {
            title: null
        },
        formatData: function(e) {
            var t = this
              , i = t.taskModel;
            return e.title = i.escape("title"),
            e;
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            return r.render.call(e, t),
            e;
        },
        _onDismissReminder: function(e) {
            var t = this;
            t.model && t.model.set({
                reminded: !0
            }),
            !t.destroyed && t.destroy(),
            e.stopPropagation();
        },
        _onClick: function(t) {
            var i = this;
            e.trigger("reminder:clicked"),
            i.taskModel && e.trigger("route:" + i.taskModel.route()),
            i._onDismissReminder(t);
        }
    });
}),
define("/styles/modals/reminderModal.js", {
    name: "modals/reminderModal",
    data: '.dialog-wrapper.reminders{background:none;overflow:visible;padding-top:20px;padding-bottom:20px;pointer-events:none}.dialog.reminderItem{-webkit-border-radius:3px;border-radius:3px;pointer-events:auto;width:300px;margin:auto;top:auto;padding:12px;margin-top:10px;zoom:1;}.dialog.reminderItem:before,.dialog.reminderItem:after{content:"";display:table}.dialog.reminderItem:after{clear:both}.dialog.reminderItem .reminderItem-text{line-height:25px;font-size:15px;padding-left:50px;padding-right:20px;word-break:break-word;font-weight:bold;}.dialog.reminderItem .reminderItem-text token{font-weight:normal}.dialog.reminderItem .reminderItem-icon{width:32px;height:32px;margin-top:5px;margin-left:5px;float:left;background:#328ad6;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding-top:5px;text-align:center;fill:#fff}.dialog.reminderItem .delete{cursor:pointer;position:absolute;top:2px;right:2px}html[dir=rtl] .reminderItem .icon-wrapper{float:right}html[dir=rtl] .reminderItem .reminderItem-text{padding-right:50px;padding-left:0}html[dir=rtl] .reminderItem .delete{right:auto;left:5px}'
}),
define("views/Reminders/RemindersView", ["vendor/moment", "application/runtime", "actions/Factory", "wunderbits/helpers/date", "helpers/notifications", "views/Reminders/ReminderItemView", "wunderbits/WBView", "style!modals/reminderModal"], function(e, t, i, n, o, a, r, s) {
    var l = n
      , c = o
      , d = r.prototype;
    return r.extend({
        tagName: "ul",
        className: "reminders dialog-wrapper",
        styles: [s],
        events: {},
        initialize: function() {
            var e = this;
            e.taskLookup = i.taskLookup(),
            e.reminderLookup = i.reminderLookup(),
            e.desktopNotificationLookup = i.desktopNotificationLookup(),
            d.initialize.apply(e, arguments),
            e.bindTo(t, "reminders:check", e._onCheckReminders);
        },
        render: function() {
            var e = this
              , t = {};
            return d.render.call(e, t),
            e;
        },
        _onCheckReminders: function() {
            var t = this
              , i = e().format("YYYY-MM-DDTHH:mm")
              , n = t.reminderLookup.allReminders;
            n.models.forEach(function(n) {
                var o = n.attributes.date
                  , a = o && e(l.convertServerTimeToLocalTime(o)).format("YYYY-MM-DDTHH:mm")
                  , r = !!n.attributes.reminded
                  , s = !!t.getSubview(n.id)
                  , c = a === i;
                a && !r && !s && c && (n.save({
                    reminded: !0
                }),
                t._handleDueReminder(n));
            });
        },
        _handleDueReminder: function(e) {
            var i = this
              , n = i.taskLookup.getTaskModel(e.attributes.task_id);
            if (n && !n.isCompleted()) {
                var o = {
                    model: e,
                    taskModel: n
                }
                  , r = i.addSubview(new a(o), e.id);
                r && i.$el.prepend(r.render().el);
                var s = n.attributes.online_id
                  , l = i.desktopNotificationLookup.getReminderNotificationForTask(s);
                s && l || i._displayDesktopNotification(o, r),
                "true" === t.settings.attributes.sound_notification_enabled && t.trigger("sounds:play", "bell");
            }
        },
        _displayDesktopNotification: function(e, i) {
            var n = this
              , o = function(i) {
                this.close();
                var o = n.getSubview(e.model.id);
                o && o.destroy(),
                "click" === i.type && (t.trigger("reminder:clicked"),
                t.trigger("route:" + e.taskModel.route()));
            }
              , a = "true" === t.settings.attributes.notifications_desktop_enabled;
            a && c.create({
                type: "text",
                title: "wunderlist reminder",
                text: i.$el.find(".reminderItem-text").text(),
                timeout: !1,
                onClick: o,
                onClose: o
            });
        }
    });
}),
define("views/Settings/Controllers/SettingsSubviewController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBModalViewController"], function(e, t, i) {
    return i.extend({
        "implements": {
            "tabStart:keydown": "handleTabStartKeys",
            "tabEnd:keydown": "handleTabEndKeys"
        },
        handleTabStartKeys: function(e) {
            var i = this.view;
            e.which === t.tab && e.shiftKey && (i.trigger("focus:tab"),
            e.preventDefault(),
            e.stopPropagation());
        },
        handleTabEndKeys: function(e) {
            var i = this.view;
            e.which !== t.tab || e.shiftKey || (i.$(".tabStart").focus(),
            e.preventDefault(),
            e.stopPropagation());
        }
    });
}),
define("views/Settings/SettingsSubview", ["views/Settings/Controllers/SettingsSubviewController", "wunderbits/WBViewPresenter"], function(e, t) {
    return t.extend({
        "implements": [e],
        emits: {
            "keydown .tabStart": "tabStart:keydown",
            "keydown .tabEnd": "tabEnd:keydown",
            "keydown .tabBackOnly": "tabBackOnly:keydown",
            "keydown .tabForwardOnly": "tabForwardOnly:keydown"
        }
    });
}),
define("views/Settings/Controllers/SettingsGeneralViewController", ["application/runtime", "wunderbits/WBModalViewController"], function(e, t) {
    var i = e.$;
    return t.extend({
        "implements": {
            "change:selectable": "onChangeSelectable",
            "change:toggleable": "onChangeToggleable",
            "change:radio": "onChangeRadio"
        },
        selectableEventsMap: {
            "edit-date-format": "date_format",
            "edit-language": "language",
            "edit-new-task-location": "new_task_location",
            "edit-start-of-week": "start_of_week"
        },
        toggleableEventsMap: {
            "edit-ask-before-delete": "confirm_delete_entity",
            "edit-print-completed-items": "print_completed_items",
            "edit-sound-checkoff-enabled": "sound_checkoff_enabled",
            "edit-sound-notification-enabled": "sound_notification_enabled",
            "edit-star-tasks-behavior": "behavior_star_tasks_to_top",
            "edit-automatic-reminders": "automatic_reminders",
            "edit-show-subtask-progress": "show_subtask_progress",
            "enable-html-context-menus": "enable_html_context_menus",
            "edit-smart-dates": "smart_dates",
            "edit-smart-dates-remove-from-todo": "smart_dates_remove_from_todo"
        },
        radioEventsMap: {
            "edit-time-format": "time_format"
        },
        onChangeSelectable: function(t) {
            var n = i(t.currentTarget)
              , o = {};
            o[this.selectableEventsMap[n.attr("id")]] = n.val(),
            e.settings.save(o);
        },
        onChangeToggleable: function(t) {
            var n = i(t.currentTarget)
              , o = this.toggleableEventsMap[n.attr("id")]
              , a = {};
            a[o] = n.is(":checked").toString(),
            ("automatic_reminders" === o || "smart_dates" === o || "smart_dates_remove_from_todo" == o) && (a[o] = "true" === a[o] ? "on" : "off"),
            e.settings.save(a);
        },
        onChangeRadio: function(t) {
            var n = i(t.currentTarget)
              , o = {};
            o[this.radioEventsMap[n.attr("name")]] = n.val(),
            e.settings.save(o);
        }
    });
}),
define("/templates/settings/settingsGeneral.js", {
    name: "settings/settingsGeneral",
    data: {
        "1": function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = ' <option value="' + s((a = t.code || e && e.code,
            typeof a === r ? a.call(e, {
                name: "code",
                hash: {},
                data: n
            }) : a)) + '">';
            return a = t.name || e && e.name,
            o = typeof a === r ? a.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (l += o),
            l + "</option> ";
        },
        "3": function() {
            return " selected";
        },
        "5": function() {
            return " checked";
        },
        "7": function() {
            return "checked";
        },
        "9": function() {
            return "selected";
        },
        "11": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = ' <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_label_enable_html_context_menus", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="enable-html-context-menus" type="checkbox" ';
            return o = t["if"].call(e, e && e["is enable_html_context_menus true"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' data-key-aria-label="settings_general_show_subtask_progress"/> </div> </div> ';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = ' <div class="separator"> <!-- Language --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_language", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <span class="select"> <select id="edit-language" data-key-aria-label="settings_general_language" class="tabStart">  ';
            return o = t.each.call(e, e && e.languages, {
                name: "each",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' </select> </span> </div> </div> <!-- Date Format --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_date_format", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <span class="select"> <select id="edit-date-format" data-key-aria-label="settings_general_date_format"> <option value="DD.MM.YYYY" ',
            o = t["if"].call(e, e && e["is date_format DD.MM.YYYY"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '>DD.MM.YYYY</option> <option value="MM/DD/YYYY" ',
            o = t["if"].call(e, e && e["is date_format MM/DD/YYYY"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '>MM/DD/YYYY</option> <option value="DD/MM/YYYY" ',
            o = t["if"].call(e, e && e["is date_format DD/MM/YYYY"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '>DD/MM/YYYY</option> <option value="YYYY/MM/DD" ',
            o = t["if"].call(e, e && e["is date_format YYYY/MM/DD"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '>YYYY/MM/DD</option> <option value="YYYY-MM-DD" ',
            o = t["if"].call(e, e && e["is date_format YYYY-MM-DD"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '>YYYY-MM-DD</option> </select> </span> </div> </div> <!-- Time Format --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_time_format", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <div aria-role="radiogroup" data-key-aria-label="settings_general_time_format" tabindex="0"> <input name="edit-time-format" type="radio" value="12 hour" ',
            o = t["if"].call(e, e && e["is time_format 12 hour"], {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_12_hour"></input>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_12_hour", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' <input name="edit-time-format" class="mleft" type="radio" value="24 hour" ',
            o = t["if"].call(e, e && e["is time_format 24 hour"], {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_24_hour"></input>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_24_hour", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> </div> </div> <!-- Start of Week --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_start_of_week", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <div class="select"> <span class="select"> <select id="edit-start-of-week" data-key-aria-label="settings_general_start_of_week"> <option value="sat" ',
            o = t["if"].call(e, e && e["is start_of_week sat"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-text="settings_general_start_of_week_saturday"></option> <option value="sun" ',
            o = t["if"].call(e, e && e["is start_of_week sun"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-text="settings_general_start_of_week_sunday"></option> <option value="mon" ',
            o = t["if"].call(e, e && e["is start_of_week mon"], {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-text="settings_general_start_of_week_monday"></option> </select> </span> </div> </div> </div> </div> <!-- Sounds --> <div class="separator"> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_sound_task_completion", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-sound-checkoff-enabled" type="checkbox" ',
            o = t["if"].call(e, e && e["is sound_checkoff_enabled true"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_sound_task_completion"/> </div> </div> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_sound_new_notifications", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-sound-notification-enabled" type="checkbox" ',
            o = t["if"].call(e, e && e["is sound_notification_enabled true"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_sound_new_notifications"/> </div> </div> </div> <!-- Create New Tasks --> <div class="separator"> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_create_new_tasks", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <span class="select"> <select id="edit-new-task-location" data-key-aria-label="settings_general_create_new_tasks"> <option value="top" ',
            o = t["if"].call(e, e && e["is new_task_location top"], {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-text="settings_general_tasks_top"></option> <option value="bottom" ',
            o = t["if"].call(e, e && e["is new_task_location bottom"], {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-text="settings_general_tasks_bottom"></option> </select> </span> </div> </div> <!-- Ask to confirm before deleting --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_confirm_deletion", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-ask-before-delete" type="checkbox" ',
            o = t["if"].call(e, e && e["is confirm_delete_entity true"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_confirm_deletion"/> </div> </div> <!-- Starring tasks behavior --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_starred_tasks_to_top", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-star-tasks-behavior" type="checkbox" ',
            o = t["if"].call(e, e && e["is behavior_star_tasks_to_top true"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_starred_tasks_to_top"/> </div> </div> </div> <div class="separator"> <!-- Smart Due Dates --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_smart_dates", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-smart-dates" type="checkbox" ',
            o = t["if"].call(e, e && e["is smart_dates on"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_smart_dates"/> </div> </div> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_smart_dates_remove_from_todo", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-smart-dates-remove-from-todo" type="checkbox" ',
            o = t["if"].call(e, e && e["is smart_dates_remove_from_todo on"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_smart_dates_remove_from_todo"/> </div> </div> <!-- Auto Reminder --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_automatic_reminders", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-automatic-reminders" type="checkbox" ',
            o = t["if"].call(e, e && e["is automatic_reminders on"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_automatic_reminders"/> </div> </div> </div> <!-- Print completed tasks --> <div class="separator"> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_print_done_tasks", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-print-completed-items" type="checkbox" ',
            o = t["if"].call(e, e && e["is print_completed_items true"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_print_done_tasks"/> </div> </div> </div> <div class="separator"> <!-- Show subtask progress --> <div class="cols"> <div class="col-60 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_general_show_subtask_progress", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input id="edit-show-subtask-progress" type="checkbox" ',
            o = t["if"].call(e, e && e["is show_subtask_progress true"], {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' data-key-aria-label="settings_general_show_subtask_progress"/> </div> </div> <!-- context menus --> ',
            o = t.unless.call(e, e && e.isPackagedApp, {
                name: "unless",
                hash: {},
                fn: this.program(11, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " </div> ";
        },
        useData: !0
    }
}),
define("views/Settings/SettingsGeneralView", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "languages/available", "actions/Factory", "views/Settings/SettingsSubview", "views/Settings/Controllers/SettingsGeneralViewController", "template!settings/settingsGeneral"], function(e, t, i, n, o, a, r, s) {
    var l = e._
      , c = a.prototype;
    return a.extend({
        template: s,
        className: "settings-content-inner",
        "implements": [r],
        emits: {
            "change #edit-date-format": "change:selectable",
            "change #edit-start-of-week": "change:selectable",
            "change #edit-language": "change:selectable",
            "change #edit-new-task-location": "change:selectable",
            "change #edit-ask-before-delete": "change:toggleable",
            "change #edit-print-completed-items": "change:toggleable",
            "change #edit-sound-checkoff-enabled": "change:toggleable",
            "change #edit-sound-notification-enabled": "change:toggleable",
            "change #edit-star-tasks-behavior": "change:toggleable",
            "change #edit-sync-settings": "change:toggleable",
            "change #edit-automatic-reminders": "change:toggleable",
            "change #edit-show-subtask-progress": "change:toggleable",
            "change #enable-html-context-menus": "change:toggleable",
            'change input[name="edit-time-format"]': "change:radio",
            "change #edit-smart-dates": "change:toggleable",
            "change #edit-smart-dates-remove-from-todo": "change:toggleable"
        },
        initialize: function() {
            var t = this;
            c.initialize.apply(t, arguments),
            t.selectables = ["date_format", "language", "new_task_location"],
            t.radios = ["time_format"],
            l.each(t.selectables, function(i) {
                t.bindTo(e.settings, "change:" + i, function() {
                    t.updateSelectable(i);
                });
            }),
            l.each(t.radios, function(i) {
                t.bindTo(e.settings, "change:" + i, function() {
                    t.updateRadio(i);
                });
            }),
            t.automaticReminderService = o.automaticReminder();
        },
        render: function() {
            var t = this
              , i = e.settings.toJSON();
            l.each(i, function(e, t) {
                i["is " + t + " " + e] = !0;
            }),
            i.languages = [],
            l.each(n.data, function(e, t) {
                e.code = t,
                i.languages.push(e);
            }),
            i.isPackagedApp = e.env.isPackagedApp(),
            c.render.call(t, i);
            var o = e.language.attributes.code;
            return t.$el.find('option[value="' + o + '"]').first().prop("selected", !0),
            t;
        },
        updateSelectable: function(t) {
            var i = this
              , n = e.settings.get(t)
              , o = i.$el.find("#edit-" + t.replace(/_/g, "-")).find('option[value="' + n + '"]').first();
            o.prop("selected", !0);
        },
        updateRadio: function(t) {
            var i = this
              , n = e.settings.get(t)
              , o = i.$el.find('[name="edit-' + t.replace(/_/g, "-") + '"]').filter('[value="' + n + '"]').first();
            o.prop("checked", !0);
        }
    });
}),
define("mixins/TermsOfUseMixin", ["application/runtime", "vendor/moment", "project!core"], function(e, t, i) {
    var n = e.$
      , o = e._;
    return i.WBMixin.extend({
        renderTermsLinks: function() {
            var e = this;
            if (!e.destroyed) {
                var t = "http://www.6wunderkinder.com/"
                  , i = e.$(".accept-terms");
                i.each(function() {
                    var e = n(this)
                      , i = e.find(".token_0")
                      , o = e.find(".token_1");
                    if ("A" !== i.parent().prop("tagName")) {
                        var a = n('<a href="' + t + 'terms-of-use" target="_blank"></a>').append(i.clone());
                        i.replaceWith(a);
                        var r = n('<a href="' + t + 'privacy-policy" target="_blank"></a>').append(o.clone());
                        o.replaceWith(r);
                    }
                });
            }
        },
        cancelTerms: function(t, i) {
            var n = this;
            e.trigger("route" + t),
            o.delay(function() {
                n.$(".pro-section-terms-of-use, .buy-options, .teams").toggleClass("hidden"),
                i && (n.selectedProduct = null);
            }, 200);
        },
        acceptTerms: function(i) {
            var n = this
              , o = n.$(".accept-terms")
              , a = n.$(".button, button")
              , r = {
                terms_accepted_at: t().format("YYYY-MM-DD")
            };
            o.addClass("loading"),
            a.addClass("disabled").attr("disabled", "disabled"),
            e.settings.save(r, {
                success: function() {
                    o.removeClass("loading"),
                    a.removeClass("disabled").removeAttr("disabled"),
                    i && i.callback && "function" == typeof i.callback && i.callback();
                }
            });
        }
    });
}),
define("/templates/pro/subscription.js", {
    name: "pro/subscription",
    data: {
        "1": function() {
            return ' <div class="col-100"> <button class="big green buy" disabled tabindex="0"></button> </div> ';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="page-buy"> <!-- Go premium --> <div class="separator"> <div class="cols top"> <div class="col-32"> <div class="avatar-frame"> <div class="avatar large"> <span class="icon pro"></span> <img /> </div> </div> </div> <div class="col-68 pro-section-style"> <!-- Products --> <div class="buy-options tabStart" tabindex="0"> <h3 class="upgrade-header"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_header_$", "$benefit_name", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </h3> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_header_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> <div class="cols"> ';
            return o = t.each.call(e, e && e.products, {
                name: "each",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' </div> <a data-path="preferences/teams" class="button big green buy" role="button" data-key-aria-label="group_billing_packages_title" tabindex="0">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "group_billing_packages_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </div> <!-- TOU --> <div class="pro-section-terms-of-use hidden"> <h3>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_terms_of_use", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h3> <p class="accept-terms">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_label_accept_terms", "$settings_terms_of_use", "$settings_privacy_policy", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> <div class="cols"> <div class="col-50"> <a class="button big cancel-terms-of-use">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </div> <div class="col-50"> <a class="button big green accept-terms-of-use"><b>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "notifications_event_accept", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</b><span/></a> </div> </div> </div> </div> </div> </div> <!-- Premium benefits --> <div class="separator pro-benefits"> <div class="cols"> <div class="col-32"> <div class="benefit attachments"></div> </div> <div class="col-68" tabindex="0"> <h4>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_files_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h4> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_files_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <div class="cols"> <div class="col-32"> <div class="benefit assigning"></div> </div> <div class="col-68" tabindex="0"> <h4>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_assign_tasks_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h4> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_assign_tasks_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <div class="cols"> <div class="col-32"> <div class="benefit backgrounds"></div> </div> <div class="col-68" tabindex="0"> <h4>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_additional_backgrounds_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h4> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_additional_backgrounds_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <div class="cols"> <div class="col-32"> <div class="benefit subtasks"></div> </div> <div class="col-68" tabindex="0"> <h4>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_unlimited_subtasks_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h4> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "benefit_unlimited_subtasks_decription", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> </div> <div class="separator center"> <a class="button nofloat cancel-benefits tabEnd" data-path="preferences/account" role="button" data-key-aria-label="social_sharing_button_later" tabindex="0">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "social_sharing_button_later", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </div> </div> ";
        },
        useData: !0
    }
}),
define("views/Pro/SubscriptionView", ["application/runtime", "actions/Factory", "vendor/moment", "mixins/TermsOfUseMixin", "helpers/BlobHelper", "wunderbits/WBView", "template!pro/subscription"], function(e, t, i, n, o, a, r, s) {
    var l = e.$
      , c = a.prototype;
    return a.extend({
        template: r,
        className: "pro-subscription",
        events: {
            "click .buy": "_buy",
            "click .cancel-terms-of-use": "clickCancelTerms",
            "click .accept-terms-of-use": "clickAcceptTerms"
        },
        initialize: function() {
            var i = this;
            n.applyTo(i),
            c.initialize.apply(i, arguments),
            i.productLookup = t.productLookup(),
            i.updateProducts = t.updateProducts(),
            i.openUrl = t.openUrl(),
            i._online = e.env.isOnline(),
            i._isPro = e.user.attributes.pro,
            i._isPro || i.bindConnectionEvents();
        },
        bindConnectionEvents: function() {
            var t = this;
            t._onlineHandler = t.bindTo(e.env, "online", function() {
                t.delay("_fetchProducts", 500);
            }),
            t._offlineHandler = t.bindTo(e.env, "offline", function() {
                t._online = !1,
                t._renderButtons();
            }),
            t.bindTo(e.user, "change:pro", function() {
                e.user.attributes.pro && (t.unbindFrom(t._onlineHandler),
                t.unbindFrom(t._offlineHandler));
            });
        },
        render: function() {
            var t = this
              , i = e.user.toJSON();
            return i.avatar = i.avatar || e.user.getAvatarURL(),
            c.render.call(t, {
                user: i,
                products: [0]
            }),
            t._renderButtons(),
            t._isPro || t._fetchProducts(),
            t.defer(t.renderTermsLinks),
            i.avatar && o.loadImage(i.avatar, t.$("img")),
            t;
        },
        _renderButtons: function() {
            var t = this
              , i = t.productLookup.allProducts;
            if (!t.destroyed) {
                var n = t.$("button.buy").removeClass("loading disabled").removeAttr("disabled");
                if (t._online && 0 !== i.length) {
                    var o = [7];
                    o.forEach(function(e, i) {
                        var o = t.productLookup.getProductModel(e)
                          , a = o && o.attributes;
                        if (a) {
                            var r = n.eq(i)
                              , s = a.title || a.name
                              , c = l("<strong>" + a.price.formatted + "</strong>");
                            s = s.replace("{price}", c[0].outerHTML),
                            r.html(s).attr("rel", a.pid);
                        }
                    });
                } else
                    n.html(e.language.getLabel("benefit_payment_service_unavailable").toString()),
                    n.addClass("disabled").attr("disabled", "disabled"),
                    t.renderLabels();
            }
        },
        _fetchProducts: function() {
            var t = this
              , i = e.sdk;
            if (!t._isPro && i && !i.destroyed) {
                t.$("button.buy").addClass("loading").append("<span/>");
                var n = e.settings.attributes.account_locale || "en";
                i.initialized.done(function() {
                    i.http.products.all(s, n).done(function(e) {
                        t.destroyed || (t.updateProducts.updateProducts(e),
                        t._online = !0,
                        t._renderButtons());
                    }).fail(function() {
                        t.destroyed || (t._online = !1,
                        t._renderButtons());
                    });
                });
            }
        },
        renderTermsLinks: function() {
            var e = this
              , t = "http://www.wunderlist.com/"
              , i = e.$(".accept-terms");
            i.each(function() {
                var e = l(this)
                  , i = e.find(".token_0")
                  , n = e.find(".token_1");
                if ("A" !== i.parent().prop("tagName")) {
                    var o = l('<a href="' + t + 'terms-of-use" target="_blank"></a>').append(i.clone());
                    i.replaceWith(o);
                    var a = l('<a href="' + t + 'privacy-policy" target="_blank"></a>').append(n.clone());
                    n.replaceWith(a);
                }
            });
        },
        showBenefits: function() {
            var e = this;
            e.$el.closest(".settings-content-inner-wrapper").find(".settings, .pro-status").addClass("hidden"),
            e.$el.removeClass("hidden");
        },
        hideBenefits: function() {
            var e = this;
            e.$el.closest(".settings-content-inner-wrapper").find(".settings, .pro-status").removeClass("hidden"),
            e.$el.addClass("hidden");
        },
        _buy: function(t) {
            var i = this
              , n = t && l(t.target).closest("button")[0]
              , o = t ? n && n.getAttribute("rel") : i.selectedProduct;
            return e.settings.attributes.terms_accepted_at ? void (o ? (e.trigger("analytics:ProAccounts:clickedOnBuy", o),
            e.sdk.http.payments.generateURL(o, "web").done(function(t) {
                if (t.uuid) {
                    e.trigger("analytics:ProAccounts:sentToAdyen", o);
                    var n = e.config.api.host + "/v1/payments/adyen/" + t.uuid;
                    i.delay(i.openUrl.openUrl, 500, i.openUrl, n);
                }
            }).fail(function() {
                var t = arguments[1];
                e.trigger("analytics:ProAccounts:paymentAPIAJAXFailure", t);
            })) : e.trigger("analytics:ProAccounts:noProductDefinedForBuyButton")) : (i.selectedProduct = o,
            void i.$(".pro-section-terms-of-use, .buy-options, .teams").toggleClass("hidden"));
        },
        clickCancelTerms: function() {
            var e = "preferences/account";
            this.cancelTerms(e, !0);
        },
        clickAcceptTerms: function() {
            var e = this;
            e.acceptTerms({
                callback: e._buy.bind(e)
            });
        }
    });
}),
define("/templates/pro/status.js", {
    name: "pro/status",
    data: {
        "1": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <h3 class="yay-pro">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_header_pro_account_$", "$settings_account_header_pro", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h3> <p>" + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_header_pro_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</p> ";
        },
        "3": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " <h3>" + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_header_account_$", "$settings_account_header_free", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h3> <p>" + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_pro_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> <a class="button big left green go-pro" data-path="preferences/account/pro" data-key-aria-label="settings_upgrade_to_pro_label" data-aria-label="$benefit_name" tabindex="0"> <strong>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_upgrade_to_pro_label", "$benefit_name", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</strong> </a> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o;
            return o = t["if"].call(e, (o = e && e.user,
            null == o || o === !1 ? o : o.isPro), {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.program(3, n),
                data: n
            }),
            o || 0 === o ? o : "";
        },
        useData: !0
    }
}),
define("views/Pro/StatusView", ["application/runtime", "wunderbits/WBView", "template!pro/status"], function(e, t, i) {
    return t.extend({
        template: i,
        className: "pro-status pro-section-style tabStart",
        attributes: {
            tabindex: 0
        }
    });
}),
define("views/Settings/Controllers/SettingsICSViewController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e.$;
    return t.extend({
        "implements": {
            "click:ics-link": "onClickInput"
        },
        onClickInput: function(e) {
            var t = i(e.currentTarget);
            t.select();
        }
    });
}),
define("/templates/settings/ICS.js", {
    name: "settings/ICS",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="separator"> <div class="ics"> <div class="cols"> <div class="col-32 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "ical_feed_label", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-68"> <input type="text" class="ics-link" data-key-value="ical_feed_fetching"/> </div> </div> <div class="cols"> <div class="col-32"></div> <div class="col-68"> <p><small>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "ical_feed_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</small></p> <p><small> <a href ="https://support.wunderlist.com/customer/portal/articles/1710196-how-to-show-wunderlist-tasks-in-google-calendar-ical-or-outlook" target="_blank">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "ical_feed_read_more_link", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </small></p> </div> </div> </div> </div>";
        },
        useData: !0
    }
}),
define("views/Settings/SettingsICSView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Settings/Controllers/SettingsICSViewController", "template!settings/ICS"], function(e, t, i, n) {
    var o = t.prototype;
    return t.extend({
        template: n,
        "implements": [i],
        className: "ICS",
        emits: {
            "click .ics-link": "click:ics-link"
        },
        initialize: function() {
            var t = this;
            t.sdk = e.sdk,
            o.initialize.apply(t, arguments);
        },
        render: function() {
            var e = this;
            return o.render.apply(e, arguments),
            e.getFeedUrl(),
            e;
        },
        getFeedUrl: function() {
            var e = this;
            e.sdk.getOutlet().ical_feed.getURL().done(e.updateFeedURL, e).fail(e.renderError, e);
        },
        updateFeedURL: function(e) {
            var t = this;
            if (!t.destroyed) {
                var i = e.url
                  , n = t.$(".ics-link");
                n.val(i);
            }
        },
        renderError: function() {
            var t = this;
            if (!t.destroyed) {
                var i = e.language.getText("ical_feed_fetch_error")
                  , n = t.$(".ics-link");
                n.val(i);
            }
        }
    });
}),
define("/templates/settings/invoiceDownloader.js", {
    name: "settings/invoiceDownloader",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="cols separator cols-no-indent"> <div class="col-32 text-right"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_invoices", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> <div class="col-40"> <span class="select"> <select class="invoices"> </select> </span> </div> <div class="col-28"> <a class="button full download-invoice"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_download", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </div> </div>";
        },
        useData: !0
    }
}),
define("views/Settings/InvoiceDownloaderView", ["application/runtime", "actions/Factory", "vendor/moment", "wunderbits/WBView", "template!settings/invoiceDownloader"], function(e, t, i, n, o) {
    var a = e.$
      , r = n.prototype;
    return n.extend({
        template: o,
        className: "invoice-downloader separator hidden",
        events: {
            "change select.invoices": "updateDownloadLink"
        },
        initialize: function() {
            var e = this;
            e.invoicesLookup = t.invoicesLookup(),
            r.initialize.apply(e, arguments);
        },
        render: function() {
            var e = this;
            return e.invoicesLookup.fetchInvoices().done(e.deferredRender, e),
            e;
        },
        deferredRender: function(e) {
            var t = this;
            !t.destroyed && e.length && (r.render.apply(t, arguments),
            t.$el.removeClass("hidden"),
            e.each(t.appendInvoiceOption.bind(t)),
            t.$(".invoices option").last().attr("selected", !0),
            t.updateDownloadLink());
        },
        appendInvoiceOption: function(e) {
            var t = this
              , i = t.getUserFormattedDate(e.attributes.starts)
              , n = t.getUserFormattedDate(e.attributes.expires_at)
              , o = a('<option value="' + e.attributes.id + '">' + i + " - " + n + "</option>");
            t.$("select.invoices").append(o);
        },
        updateDownloadLink: function(e) {
            var t = this
              , i = e ? a(e.currentTarget).val() : t.$(".invoices option:selected")[0].value
              , n = parseInt(i, 10)
              , o = t.invoicesLookup.getInvoiceModel(n)
              , r = t.$(".button.download-invoice");
            o && r.attr("href", o.attributes.link),
            o && r.attr("download", t.generateFileName(o));
        },
        generateFileName: function(e) {
            var t = this
              , i = t.getUserFormattedDate(e.attributes.starts).replace(/\D+/g, "_")
              , n = t.getUserFormattedDate(e.attributes.expires_at).replace(/\D+/g, "_");
            return "wunderlist_invoice_" + i + "-" + n;
        },
        getUserFormattedDate: function(t) {
            var n = e.settings.attributes.date_format;
            return i(t, "MM-DD-YYYY").format(n);
        }
    });
}),
define("views/Settings/RestoreDataViewController", ["application/runtime", "wunderbits/helpers/SafeParse", "wunderbits/WBViewController"], function(e, t, i) {
    var n = e.global;
    return i.extend({
        "implements": {
            "click:restore": "_onClickRestore",
            "change:input": "_onFileSelected"
        },
        _onClickRestore: function(e) {
            var t = this;
            e && e.preventDefault(),
            e && e.stopPropagation(),
            t.view.input && t.view.input.click();
        },
        _onFileSelected: function(e) {
            var t = this;
            e.target.files && e.target.files.length && t.uploadBackupFile(e.target.files[0]);
        },
        uploadBackupFile: function(i) {
            var o = this
              , a = n.FileReader
              , r = new a()
              , s = e.sdk;
            r.onload = function() {
                var e = t.json(this.result);
                e ? (o.view.startSpinner(),
                o.view.updateText(),
                s.http["import"].create(e).done(o.onSuccess, o).fail(o.onError, o).always(function() {
                    o.view.resetFileInput();
                })) : o.onError();
            }
            ,
            r.readAsText(i);
        },
        onSuccess: function() {
            var t = this;
            e.trigger("analytics:Importer:addedBackupData"),
            t.view.stopSpinner(),
            t.view.trigger("processing:complete");
        },
        onError: function() {
            var t = this;
            e.trigger("analytics:Importer:backupDataFailed"),
            t.view.stopSpinner(),
            t.view.showError();
        }
    });
}),
define("/templates/settings/restoreData.js", {
    name: "settings/restoreData",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<a class="button full restore-data" role="button" data-key-aria-label="settings_account_restore_backup" tabindex="0"><span class="dark"/> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_restore_backup", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> <input type="file" class="hidden" accept="application/json" >';
        },
        useData: !0
    }
}),
define("views/Settings/RestoreDataView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Settings/RestoreDataViewController", "template!settings/restoreData"], function(e, t, i, n) {
    var o = t.prototype;
    return t.extend({
        template: n,
        "implements": [i],
        className: "restoreData",
        emits: {
            "click .restore-data": "click:restore",
            "change input": "change:input"
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(e, arguments);
        },
        render: function() {
            var e = this;
            return o.render.apply(e, arguments),
            e.input = e.$("input"),
            e;
        },
        resetFileInput: function() {
            var e = this;
            e.render();
        },
        startSpinner: function() {
            var e = this;
            e.$(".restore-data").addClass("disabled loading");
        },
        stopSpinner: function() {
            var e = this;
            e.$(".restore-data").removeClass("disabled loading");
        },
        showError: function() {
            var e = this;
            e.trigger("processing:error");
        },
        updateText: function() {
            var e = this;
            e.trigger("processing:backupData");
        }
    });
}),
define("views/Settings/Controllers/SettingsAccountViewController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/WBValidationHelper", "wunderbits/WBModalViewController"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = o.prototype
      , l = {
        "cancel-password": {
            confirm: "#save-password",
            refocus: ".old-password"
        },
        "cancel-email": {
            confirm: "#save-email",
            refocus: "#edit-email"
        },
        "cancel-delete-account": {
            confirm: "#delete-account",
            refocus: ".delete-password"
        },
        "save-email": {
            refocus: "#edit-email"
        },
        "save-password": {
            refocus: ".old-password"
        },
        "delete-account": {
            refocus: ".delete-password"
        }
    };
    return o.extend({
        "implements": {
            "click:showDelete": "onShowDeleteAccount",
            "click:cancelDeleteAccount": "onCancelDeleteAccount",
            "click:changeEmail": "onChangeEmail",
            "click:cancelEmail": "onCancelChangeEmail",
            "click:saveEmail": "onSaveEmail",
            "click:changePassword": "onChangePassword",
            "click:cancelPassword": "onCancelPassword",
            "click:savePassword": "onSavePassword",
            "click:deleteAccount": "onDeleteAccount",
            "click:goPro": "closeAllEdits",
            "toggle:confirmation": "onToggleConfirmation",
            "click:confirmCancel": "cancelProAutoRenew",
            "blur:editFullName": "onSaveFullName",
            keydown: "onKeydown",
            "keydown:cancelEdit": "onCancelEditKeydown",
            "keydown:confirmEdit": "onConfirmEditKeydown",
            "keyup:confirmPassword": "checkForValidEmailOnPasswordConfirm",
            "keyup:delete": "onValidateDeleteAccount",
            "keyup:password": "onCheckPasswordMatch",
            "force:window:resize": "triggerWindowResize",
            "check:email": "checkForValidEmail"
        },
        initialize: function() {
            var e = this;
            s.initialize.apply(e, arguments),
            e.changePassword = t.changePassword();
        },
        onKeydown: function(e) {
            var t = this
              , n = r(e.currentTarget)
              , o = n.attr("id")
              , s = {
                "edit-full-name": "FullName",
                "edit-email": "Email",
                "edit-email-pw-confirm": "Email",
                "confirm-password": "Password"
            };
            e.which === i.enter ? t["onSave" + s[o]]() : e.which === i.esc && t.view.resetEditInputs(e),
            "edit-email" === o && t.checkForValidEmail(a, n.val());
        },
        onCancelEditKeydown: function(e) {
            var t = this
              , n = t.getCancelSaveData(e);
            n && e.which === i.tab && !e.shiftKey && t.view.$(n.confirm).attr("disabled") && t.refocusAndStop(n.refocus, e);
        },
        onConfirmEditKeydown: function(e) {
            var t = this
              , n = t.getCancelSaveData(e);
            e.which !== i.tab || e.shiftKey || t.refocusAndStop(n.refocus, e);
        },
        getCancelSaveData: function(e) {
            var t, i = r(e.target), n = i.attr("id");
            return t = l[n];
        },
        refocusAndStop: function(e, t) {
            var i = this;
            i.view.$(e).focus(),
            i.stopEventCold(t);
        },
        onShowDeleteAccount: function() {
            this.view.showDeleteAccount();
        },
        onCancelDeleteAccount: function() {
            this.view.hideDeleteAccount();
        },
        triggerWindowResize: function() {
            r(window).trigger("resize");
        },
        onChangeEmail: function() {
            this.view.showChangeEmail();
        },
        onCancelChangeEmail: function() {
            this.view.hideChangeEmail();
        },
        onCheckPasswordMatch: function() {
            var e = this.view
              , t = e.$(".new-password").val()
              , i = e.$(".confirm-password").val()
              , n = t === i && "" !== t && "" !== i;
            e.toggleSavePasswordButton(n);
        },
        onToggleConfirmation: function() {
            this.view.toggleConfirmation();
        },
        checkForValidEmailOnPasswordConfirm: function() {
            var e = this
              , t = e.view.$("#edit-email").val();
            e.checkForValidEmail(a, t);
        },
        checkForValidEmail: function(e, t) {
            var i = this;
            t = t ? t : e && e.target ? r(e.target).val() : null,
            i.view.updateEmailInputs(n.isValidEmail(t));
        },
        onSaveEmail: function() {
            var t = this.view
              , i = t.$("#edit-email").val()
              , n = t.$(".password-confirm input").val();
            e.user.changeEmail(i, n, {
                success: t.hideChangeEmail.bind(t),
                error: t.renderEmailError.bind(t)
            });
        },
        onSaveFullName: function() {
            var t = this.view
              , i = t.$el.find("#edit-full-name")
              , n = i.val()
              , o = e.user.attributes.name;
            n !== o && n.length ? e.user.changeName({
                name: n
            }) : i.val(o);
        },
        onChangePassword: function() {
            this.view.showChangePassword();
        },
        onCancelPassword: function() {
            this.view.hideChangePassword();
        },
        cancelProAutoRenew: function() {
            var t = this
              , i = t.view
              , n = i.$(".confirm-cancel");
            n.addClass("loading");
            var o = function() {
                t.bindOnceTo(e, "sync:ended", function() {
                    n.removeClass("loading"),
                    i.deferredRender();
                });
            }
              , a = function() {
                n.removeClass("loading"),
                i.$(".manage-account-error").removeClass("hidden");
            };
            e.user.cancelProAutoRenew(o, a);
        },
        onSavePassword: function() {
            var e = this
              , t = e.view;
            if (!t.$("#save-password").hasClass("disabled")) {
                var i = t.getChangePasswordValues();
                e.changePassword.changePassword(i.current, i["new"], i.confirm).done(function() {
                    t.destroyed || (t.hideChangePasswordError(),
                    t.hideChangePassword());
                }).fail(function(e) {
                    t.destroyed || t.showChangePasswordError(e);
                });
            }
        },
        onDeleteAccount: function() {
            var t = this.view
              , i = t.$(".delete-password").val();
            t.$("#delete-account").addClass("loading"),
            e.user.deleteUser(i, {
                error: t.renderDeleteAccountError.bind(t)
            });
        },
        onValidateDeleteAccount: function() {
            var t = this.view
              , i = t.$(".delete-password").val()
              , n = t.$(".delete-confirm").val()
              , o = e.language.getText("settings_account_delete_confirmation_text")
              , a = "" !== i && n.toLowerCase() === o.toLowerCase();
            t.toggleDeleteButton(a);
        },
        closeAllEdits: function() {
            this.view.closeAllEdits();
        },
        stopEventCold: function(e) {
            e.preventDefault(),
            e.stopPropagation();
        }
    });
}),
define("views/Settings/Controllers/SettingsAccountViewOAuthController", ["application/runtime", "actions/Factory", "helpers/Auth/facebook", "helpers/Auth/google", "wunderbits/WBModalViewController"], function(e, t, i, n, o) {
    var a = e.config
      , r = e.global
      , s = a.auth && a.auth.host || "//" + r.location.host
      , l = o.prototype;
    return o.extend({
        "implements": {
            "click:facebook:disconnect": "onDisconnectFacebook",
            "click:facebook:connect": "onConnectFacebook",
            "click:google:connect": "onConnectGoogle",
            "click:google:disconnect": "onDisconnectGoogle"
        },
        initialize: function() {
            var e = this;
            l.initialize.apply(e, arguments),
            e.createService = t.createService();
        },
        onConnectFacebook: function() {
            var t = this
              , n = t.view
              , o = !0;
            e.trigger("analytics:Preferences:connectFacebook"),
            n.toggleConnectButtonStatus("facebook", "connecting"),
            e.env.isChromeApp() ? i.getFacebookOAuthToken("connect/facebook/", o).done(t.saveService, t).done(function() {
                e.trigger("sync:start");
            }).fail(function() {
                n.toggleConnectButtonStatus("facebook");
            }) : r.location = s + "/connect/facebook";
        },
        onDisconnectFacebook: function() {
            var t = this.view;
            t.toggleConnectButtonStatus("facebook"),
            t.facebookService && t.facebookService.destroy(),
            t.updateServiceButtons(),
            e.trigger("analytics:Preferences:disconnectFacebook");
        },
        onConnectGoogle: function() {
            var t = this
              , i = t.view
              , o = !0;
            e.trigger("analytics:Preferences:connectGoogle"),
            i.toggleConnectButtonStatus("google", "connecting"),
            e.env.isChromeApp() ? n.connectWithGoogle("googleOAuthConnect", o).done(t.saveService, t).done(function() {
                e.trigger("sync:start");
            }).fail(function() {
                i.toggleConnectButtonStatus("google");
            }) : r.location = s + "/connect/google";
        },
        onDisconnectGoogle: function() {
            var t = this.view;
            t.toggleConnectButtonStatus("google"),
            t.googleService && t.googleService.destroy(),
            t.updateServiceButtons(),
            e.trigger("analytics:Preferences:disconnectGoogle");
        },
        saveService: function(e) {
            this.createService.createLocalService(e);
        }
    });
}),
define("backend/export", ["application/runtime", "wunderbits/helpers/strings", "project!core"], function(e, t, i) {
    var n = e.global;
    return i.WBSingleton.extend({
        fetchAllTheData: function() {
            return e.sdk.http["export"].all();
        },
        forceDownload: function(t) {
            var i = this;
            if (i.supportsBlob()) {
                var n = i.getBlobLink(t)
                  , o = document.createEvent("Event");
                o.initEvent("click", !0, !0),
                e.trigger("analytics:Exporter:createdBackup"),
                n.dispatchEvent(o);
            }
        },
        getBlobLink: function(e) {
            var i = this;
            if (i.supportsBlob()) {
                var o = JSON.stringify(e)
                  , a = new n.Blob([o],{
                    type: "application/json"
                })
                  , r = (window.URL || window.webkitURL).createObjectURL(a)
                  , s = window.document.createElement("a");
                s.href = r;
                var l = t.dateString();
                return s.download = "wunderlist-" + l + ".json",
                s;
            }
        },
        supportsBlob: function() {
            return (window.URL || !window.webkitURL) && window.Blob;
        }
    });
}),
define("views/Settings/Controllers/SettingsAccountViewExportController", ["application/runtime", "backend/export", "wunderbits/WBModalViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            "click:export": "export"
        },
        "export": function() {
            var i = this
              , n = i.view;
            if (!i.exporting && !e.env.isIE()) {
                i.exporting = !0,
                i.exportLinkClickBind && i.unbindFrom(i.exportLinkClickBind),
                i.exportLinkContextmenuBind && i.unbindFrom(i.exportLinkContextmenuBind);
                var o = n.$(".export")
                  , a = n.$(".export-start")
                  , r = n.$(".export-download")
                  , s = a.text();
                i.view.trigger("backup:error:hide"),
                a.addClass("disabled").text(e.language.getText("settings_account_fetching_data")),
                r.remove(),
                t.fetchAllTheData().fail(function() {
                    i.exporting = !1,
                    a.removeClass("disabled").text(s),
                    i.view.trigger("backup:error:show");
                }).done(function(t) {
                    e.trigger("analytics:Backup:ExportGenerated");
                    var n;
                    a.addClass("hidden"),
                    n = e.env.isChrome() || e.env.isFirefox() ? i._renderClickLink(t) : i._renderRightClickLink(t),
                    o.append(n),
                    n.addClass("button full blue export-download").removeClass("hidden"),
                    a.removeClass("disabled").text(e.language.getText("settings_account_create_backup")),
                    i.exporting = !1;
                });
            }
        },
        _renderClickLink: function(i) {
            var o = this
              , a = o.view.$(".export-start")
              , r = n(t.getBlobLink(i)).text(e.language.getText("settings_account_click_to_download_backup"));
            return o.exportLinkClickBind = o.bindTo(r, "click", function() {
                r.addClass("hidden"),
                a.removeClass("hidden"),
                e.trigger("analytics:Backup:ExportDownloaded", "click");
            }),
            r;
        },
        _renderRightClickLink: function(t) {
            var i = this
              , o = i.view.$(".export-start")
              , a = JSON.stringify(t)
              , r = "data:application/json," + encodeURIComponent(a)
              , s = n("<a/>").attr("href", r).text(e.language.getText("settings_account_right_click_and_save_as"));
            return i.exportLinkClickBind = i.bindTo(s, "click", function(e) {
                return e.preventDefault(),
                !1;
            }),
            i.exportLinkContextmenuBind = i.bindTo(s, "contextmenu", function() {
                i.delay(function() {
                    s.addClass("hidden"),
                    o.removeClass("hidden");
                }, 1e3),
                e.trigger("analytics:Backup:ExportDownloaded", "rightClick");
            }),
            s;
        }
    });
}),
define("/templates/settings/settingsAccount.js", {
    name: "settings/settingsAccount",
    data: {
        "1": function() {
            return ' <span class="icon pro"></span> ';
        },
        "3": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function";
            return ' <div class="cols"> <div class="col-32 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_email", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input type="text" id="edit-email" data-key-aria-label="label_email" data-key-placeholder="label_email" value="' + s((o = e && e.user,
            o = null == o || o === !1 ? o : o.email,
            typeof o === l ? o.apply(e) : o)) + '" initial-value="' + s((a = t.email || e && e.email,
            typeof a === l ? a.call(e, {
                name: "email",
                hash: {},
                data: n
            }) : a)) + '" disabled tabindex="0"/> </div> <div class="col-28"> <button id="change-email" class="full" data-key-aria-label="settings_account_change_email" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_change_email", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> </div> <!-- Password for email confirm --> <div class="cols password-confirm"> <div class="col-32 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-40"> <input type="password" id="edit-email-pw-confirm" data-key-aria-label="label_password" disabled tabindex="0"/> </div> <div class="col-28"></div> </div> <!-- Change Email --> <div class="cols change-email-buttons"> <div class="col-32 text-right"></div> <div class="col-40"> <div class="cols email-error error-message"> <div class="col-100">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "api_error_incorrect_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> </div> <div class="cols"> <div class="col-50"> <button class="full" id="cancel-email" data-key-aria-label="button_cancel" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> <div class="col-50"> <button class="full blue disabled" id="save-email" disabled data-key-aria-label="button_save" tabindex="0" > ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_save", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> </div> </div> <div class="col-28"></div> </div> ';
        },
        "5": function(e, t, i, n) {
            var o, a = " ";
            return o = t.unless.call(e, e && e.isNodeWebkit, {
                name: "unless",
                hash: {},
                fn: this.program(6, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "6": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <div class="separator account-backup-settings" data-key-aria-label="settings_account_backup_description" tabindex="0"> <div class="cols"> <div class="col-32 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_account_backup", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-35 export"> <a class="button full export-start" role="button" data-key-aria-label="settings_account_create_backup" tabindex="0"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_create_backup", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </div> <div class="col-33 import"> </div> </div> <div class="cols back-up-error hidden"> <div class="col-32"></div> <div class="col-68">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "api_error_service_down", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> </div> <div class="cols backup-feedback hidden"> <div class="col-32"></div> <div class="col-68">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_data_is_being_processed", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> </div> <div class="cols backup-complete hidden"> <div class="col-32"></div> <div class="col-68">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_import_complete", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> </div> <div class="cols"> <div class="col-32 text-right"></div> <div class="col-68"> <small> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_account_backup_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </small> </div> </div> </div> ";
        },
        "8": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = ' <div class="separator pro-account-settings"> <div class="cols pro-account-status"> ';
            return o = t["if"].call(e, e && e.adyenSubscription, {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' </div> <div class="cancelation-options closed"> <div class="cols"> <div class="col-32"></div> <div class="col-68"> <h3>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "setting_heading_cancel_subscription", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h3> <p class="small">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "setting_description_cancel_subscription", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> <p class="manage-account-error error-message hidden"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_manage_subscription_error", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </p> </div> </div> <div class="cols small"> <div class="col-32"></div> <div class="col-40"> <div class="cols"> <div class="col-50"> <button class="return-cancel full" data-key-aria-label="button_no" tabindex="0">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_no", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> </div> <div class="col-50"> <button class="confirm-cancel full red" data-key-aria-label="button_yes" tabindex="0">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_yes", {
                name: "localized",
                hash: {},
                data: n
            }))) + '<span/></button> </div> </div> </div> <div class="col-28"></div> </div> </div> ',
            o = t["if"].call(e, e && e.isGroupProduct, {
                name: "if",
                hash: {},
                fn: this.program(22, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t.unless.call(e, e && e.isGroupProduct, {
                name: "unless",
                hash: {},
                fn: this.program(37, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " </div> ";
        },
        "9": function(e, t, i, n) {
            var o, a = " ";
            return o = t.unless.call(e, e && e.isCanceled, {
                name: "unless",
                hash: {},
                fn: this.program(10, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += " ",
            o = t["if"].call(e, e && e.isGroupProduct, {
                name: "if",
                hash: {},
                fn: this.program(14, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "10": function(e, t, i, n) {
            var o, a = " ";
            return o = t.unless.call(e, e && e.isGroupProduct, {
                name: "unless",
                hash: {},
                fn: this.program(11, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "11": function(e, t, i, n) {
            var o, a = " ";
            return o = t.unless.call(e, e && e.isTelekomPromo, {
                name: "unless",
                hash: {},
                fn: this.program(12, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "12": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <div class="col-32 text-right pro-label"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_pro_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> <div class="col-40"> <button id="cancel-pro" class="full" data-key-aria-label="setting_label_cancel_subscription" tabindex="0"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "setting_label_cancel_subscription", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> <div class="col-28"></div> ';
        },
        "14": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = ' <div class="col-32 text-right pro-label"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_label_pro_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </div> ";
            return o = t["if"].call(e, e && e.isAdmin, {
                name: "if",
                hash: {},
                fn: this.program(15, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t.unless.call(e, e && e.isAdmin, {
                name: "unless",
                hash: {},
                fn: this.program(17, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " ";
        },
        "15": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <div class="col-40"> <small> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_purchased_from_$", "6Wunderkinder", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </small> </div> <div class="col-28"></div> ';
        },
        "17": function(e, t, i, n) {
            var o, a = ' <div class="col-68"> <small> ';
            return o = t["if"].call(e, e && e.isTelekomPromo, {
                name: "if",
                hash: {},
                fn: this.program(18, n),
                inverse: this.program(20, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " </small> </div> ";
        },
        "18": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_purchased_from_$", "Telekom", {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "20": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_purchased_from_$_by_$", "6Wunderkinder", e && e.adminName, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "22": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.isAdmin, {
                name: "if",
                hash: {},
                fn: this.program(23, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += " ",
            o = t["if"].call(e, e && e.isMember, {
                name: "if",
                hash: {},
                fn: this.program(32, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "23": function(e, t, i, n) {
            var o, a = ' <div class="cols"> <div class="col-32 text-right"/> <div class="col-68"> ';
            return o = t["if"].call(e, e && e.billOn, {
                name: "if",
                hash: {},
                fn: this.program(24, n),
                inverse: this.program(27, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " </div> </div> ";
        },
        "24": function(e, t, i, n) {
            var o, a = " ";
            return o = t.unless.call(e, e && e.isTelekomPromo, {
                name: "unless",
                hash: {},
                fn: this.program(25, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "25": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return ' <p class="pro-account-billing"> <small> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "setting_label_next_billing_date", {
                name: "localized",
                hash: {},
                data: n
            }))) + " " + r((o = t.billOn || e && e.billOn,
            typeof o === s ? o.call(e, {
                name: "billOn",
                hash: {},
                data: n
            }) : o)) + " (" + r((o = t.subscriptionType || e && e.subscriptionType,
            typeof o === s ? o.call(e, {
                name: "subscriptionType",
                hash: {},
                data: n
            }) : o)) + ") </small> </p> ";
        },
        "27": function(e, t, i, n) {
            var o, a = ' <p class="pro-account-expire"> <small> ';
            return o = t["if"].call(e, e && e.expiresRelative, {
                name: "if",
                hash: {},
                fn: this.program(28, n),
                inverse: this.program(30, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " </small> </p> ";
        },
        "28": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_payment_info_expires_$_relative", e && e.expiresRelative, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "30": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_payment_info_expires_$_absolute", e && e.expiresIn, {
                name: "localized",
                hash: {},
                data: n
            }))) + " " + r((o = t.expiresOn || e && e.expiresOn,
            typeof o === s ? o.call(e, {
                name: "expiresOn",
                hash: {},
                data: n
            }) : o)) + " ";
        },
        "32": function(e, t, i, n) {
            var o, a = ' <div class="cols"> <div class="col-32 text-right"/> <div class="col-68"> ';
            return o = t["if"].call(e, e && e.billOn, {
                name: "if",
                hash: {},
                fn: this.program(33, n),
                inverse: this.program(35, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " </div> </div> ";
        },
        "33": function() {
            return " ";
        },
        "35": function() {
            return ' <p class="pro-account-expire"> <small/> </p> ';
        },
        "37": function(e, t, i, n) {
            var o, a = ' <div class="cols ';
            return o = t.unless.call(e, e && e.adyen_subscription, {
                name: "unless",
                hash: {},
                fn: this.program(38, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '"> <div class="col-32 text-right"> ',
            o = t.unless.call(e, e && e.adyenSubscription, {
                name: "unless",
                hash: {},
                fn: this.program(40, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += " ",
            o = t["if"].call(e, e && e.isCanceled, {
                name: "if",
                hash: {},
                fn: this.program(40, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += ' </div> <div class="col-68"> <p class="pro-account-platform"> <small> ',
            o = t["if"].call(e, e && e.isTelekomPromo, {
                name: "if",
                hash: {},
                fn: this.program(18, n),
                inverse: this.program(42, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += " </small> </p> ",
            o = t["if"].call(e, e && e.billOn, {
                name: "if",
                hash: {},
                fn: this.program(25, n),
                inverse: this.program(27, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += " ",
            o = t["if"].call(e, e && e.isManageEnabled, {
                name: "if",
                hash: {},
                fn: this.program(44, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " </div> </div> ";
        },
        "38": function() {
            return "top";
        },
        "40": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_pro_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "42": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_purchased_from_$", e && e.store, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "44": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function";
            return ' <p class="pro-account-manage" data-key-aria-label="settings_manage_subscription_button" tabindex="0"> <small> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_manage_subscription_button", {
                name: "localized",
                hash: {},
                data: n
            }))) + ': <a class="manage" href="' + s((o = e && e.user,
            o = null == o || o === !1 ? o : o.product,
            o = null == o || o === !1 ? o : o.manage_link,
            typeof o === l ? o.apply(e) : o)) + '" target="_blank" data-key-aria-label="store" tabindex="0">' + s((a = t.store || e && e.store,
            typeof a === l ? a.call(e, {
                name: "store",
                hash: {},
                data: n
            }) : a)) + "</a> </small> </p> ";
        },
        "46": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = ' <!-- Google --> <div class="separator google-connect-settings"> <div class="cols google"> <div class="col-32 text-right">Google</div> <div class="col-40"> <button class="full connect ';
            return o = t["if"].call(e, e && e.connectedToGoogle, {
                name: "if",
                hash: {},
                fn: this.program(47, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" role="button" data-key-aria-label="button_connect" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_connect", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> <button class="full disconnect ',
            o = t.unless.call(e, e && e.connectedToGoogle, {
                name: "unless",
                hash: {},
                fn: this.program(47, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" role="button" data-key-aria-label="button_disconnect" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_disconnect", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> <div class="col-28"></div> </div> </div> <!-- Facebook --> <div class="separator facebook-connect-settings"> <div class="facebook"> <div class="cols"> <div class="col-32 text-right">Facebook</div> <div class="col-40"> <button class="full connect ',
            o = t["if"].call(e, e && e.connectedToFacebook, {
                name: "if",
                hash: {},
                fn: this.program(47, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" role="button" data-key-aria-label="button_connect_facebook" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_connect", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> <button class="full disconnect ',
            o = t.unless.call(e, e && e.connectedToFacebook, {
                name: "unless",
                hash: {},
                fn: this.program(47, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '" role="button" data-key-aria-label="button_disconnect" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_disconnect", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> <div class="col-28"></div> </div> <div class="cols"> <div class="col-32"></div> <div class="col-68"> <span class="icon facebook-icon"></span> <p><small>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_connect_facebook_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</small></p> </div> </div> </div> </div> ";
        },
        "47": function() {
            return "hidden";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = '<div class="settings"> <!-- Picture --> <div class="separator"> <div class="cols"> <div class="col-32"> <div class="avatar-frame"> <div class="avatar large hover choose"> ';
            return o = t["if"].call(e, (o = e && e.user,
            null == o || o === !1 ? o : o.isPro), {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' <span class="icon options"></span> <img /> <div class="drop-message"><span>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_drop_image", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span></div> <div class="message error hidden"><span>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "file_uploaded_failed", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span></div> <div class="state loading spinner"><span class="dark"/></div> </div> <div class="avatar-upload"> <div class="drop-zone"></div> </div> </div> </div> <div class="col-68"> <div class="pro-status-wrapper"></div> </div> </div> </div> <div class="separator basic-account-settings"> <!-- Full Name --> <div class="cols"> <div class="col-32 text-right">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_name", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-68"> <input type="text" id="edit-full-name" data-key-aria-label="label_name" data-key-placeholder="label_name" value="' + s((o = e && e.user,
            o = null == o || o === !1 ? o : o.name,
            typeof o === l ? o.apply(e) : o)) + '" initial-value="' + s((a = t.name || e && e.name,
            typeof a === l ? a.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : a)) + '" tabindex="0"/> </div> </div> <!-- Email --> ',
            o = t["if"].call(e, (o = e && e.user,
            null == o || o === !1 ? o : o.email), {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' <!-- Additional Emails --> <div class="cols"> <div class="col-32 text-right"></div> <div class="col-68"> <p class="settings-account-manage-emails"> <a href="/account/emails" target="_blank">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_manage_emails", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </p> </div> </div> <!-- Change Password --> <div class="cols show-password-buttons"> <div class="col-32 text-right"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> <div class="col-40"> <input type="password" class="old-password" data-key-placeholder="settings_account_current_password" data-key-aria-label="settings_account_current_password" tabindex="0"/> <button id="change-password" class="full" data-key-aria-label="settings_account_change_password" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_change_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> <div class="col-28"></div> </div> <div class="cols change-password-buttons"> <div class="col-32"/> <div class="col-40"> <div class="cols"> <div class="col-100"> <input type="password" class="new-password" data-key-placeholder="settings_account_new_password" data-key-aria-label="settings_account_new_password" tabindex="0"/> </div> </div> <div class="cols"> <div class="col-100"> <input id="confirm-password" type="password" class="confirm-password" data-key-placeholder="settings_account_repeat_new_password" data-key-aria-label="settings_account_repeat_new_password" tabindex="0"/> </div> </div> <div class="cols change-password-error error-message"> <div class="col-100"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_change_password_error", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> </div> <div class="cols"> <div class="col-50"> <button class="full" id="cancel-password" data-key-aria-label="button_cancel" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> <div class="col-50"> <button class="full blue" id="save-password" data-key-aria-label="button_save" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_save", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> </div> </div> <div class="col-28"></div> </div> </div> ',
            o = t.unless.call(e, e && e.isIE, {
                name: "unless",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " <!-- Pro Account Status --> ",
            o = t["if"].call(e, (o = e && e.user,
            null == o || o === !1 ? o : o.isPro), {
                name: "if",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.showSocialConnectButtons, {
                name: "if",
                hash: {},
                fn: this.program(46, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' <!-- ICS --> <div class="separator ics-container"></div> <!-- Delete Account --> <div class="separator noline delete-form" tabindex="0"> <div class="cols delete-account-heading"> <div class="col-32"></div> <div class="col-68"> <h3>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_delete_account_confirm", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h3> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_delete_account_confirm_text", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <div class="cols delete-account-password"> <div class="col-32 text-right"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_current_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> <div class="col-68"> <input type="password" class="delete-password" data-key-aria-label="settings_account_current_password" tabindex="0"/> </div> </div> <div class="cols delete-account-confirm"> <div class="col-32 text-right"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_delete_confirmation", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> <div class="col-68"> <input type="text" class="delete-confirm" data-key-aria-label="settings_account_delete_confirmation" tabindex="0"/> </div> </div> <div class="cols delete-password-error error-message"> <div class="col-100 text-right"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "api_error_incorrect_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> </div> <div class="cols text-right"> <div class="col-32"></div> <div class="col-34"> <button class="full" id="cancel-delete-account" data-key-aria-label="button_cancel" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> <div class="col-34"> <button class="full red disabled" id="delete-account" disabled data-key-aria-label="button_delete" tabindex="0"><span/> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_delete", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </button> </div> </div> </div> <div class="separator show-delete-wrapper"> <div class="cols"> <div class="col-32"></div> <div class="col-40"> <button class="red show-delete tabEnd" data-key-aria-label="settings_account_delete_account" tabindex="0"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_account_delete_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </button> </div> </div> </div> </div> ";
        },
        useData: !0
    }
}),
define("/styles/settings/settingsAccount.js", {
    name: "settings/settingsAccount",
    data: '.dialog .avatar-frame{width:120px;height:120px;margin:15px 10px 15px auto;}.dialog .avatar-frame.small{height:60px;width:60px}.dialog .avatar-frame .avatar .options{position:absolute;bottom:4px;right:4px;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);z-index:100;background:#f00}.dialog .avatar-frame .avatar input{left:auto !important;right:0 !important}.dialog .avatar-frame .avatar:before{content:\'\';position:absolute;background:transparent;width:120px;height:120px;-webkit-border-radius:50%;border-radius:50%;z-index:2;cursor:pointer}.dialog .avatar-frame .avatar.hover:hover:before{background:rgba(0,0,0,0.2)}.dialog .avatar-frame .avatar.hover:hover .options{position:absolute;bottom:4px;right:4px;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);z-index:100}.dialog .avatar-frame .avatar.hover:hover:before{position:absolute;background:transparent;width:120px;height:120px}.dialog .avatar-frame .avatar.hover:hover.hover:hover:before{background:rgba(0,0,0,0.3)}.dialog .avatar-frame .avatar.hover:hover.hover:hover .options{opacity:1;-ms-filter:none;filter:none}.dialog .avatar-frame .avatar .spinner{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);height:0;-webkit-transition:trasform 250ms ease;-moz-transition:trasform 250ms ease;-o-transition:trasform 250ms ease;-ms-transition:trasform 250ms ease;transition:trasform 250ms ease;position:absolute;z-index:99999;top:41px;left:50%;}.dialog .avatar-frame .avatar .spinner span{top:0;margin-top:10px}.dialog .avatar-frame .avatar .spinner.spinning{opacity:1;-ms-filter:none;filter:none;height:32px}.dialog .avatar-frame .icon.pro{position:absolute;z-index:100;top:-5px;right:-5px}.dialog .choose input{z-index:999}.dialog .page-buy{position:relative}.dialog .facebook p{margin-left:20px}.dialog .facebook .facebook-icon{float:left;margin-left:-4px}.dialog .delete .show-delete-wrapper{color:#959494;text-shadow:1px 1px 1px #f6f6f6;height:16px;}.dialog .delete .show-delete-wrapper:hover{cursor:pointer}.dialog .delete .show-delete-wrapper.invisible{visibility:visible;height:0;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}.dialog .cancelation-options{display:none;overflow:hidden}.dialog .change-password-buttons,.dialog .change-email-buttons,.dialog .delete-form,.dialog .old-password,.dialog .password-confirm{display:none}.dialog .back-up-error{color:#d74e48}html[dir=rtl] .dialog .avatar-frame{margin-right:auto;margin-left:10px;}html[dir=rtl] .dialog .avatar-frame .icon.pro{left:-19px;right:initial}'
}),
define("/styles/_fileupload.js", {
    name: "_fileupload",
    data: '.drop-message{width:120px;height:120px;position:absolute;top:1px;left:0;background:rgba(0,0,0,0.5);display:none;}.drop-message span{text-align:center;display:block;margin-top:50px;color:#fff;opacity:1;-ms-filter:none;filter:none}.message{display:block}.choose.drop .drop-message{display:block}.choose.loading .spinner{-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-o-animation:rotate .8s linear infinite;-ms-animation:rotate .8s linear infinite;animation:rotate .8s linear infinite;display:block;position:absolute !important;left:50%;top:50%;margin-left:-10px;margin-top:-10px;width:19px !important;height:19px !important;background:url("images/loading.png");opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50)}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){#wunderlist-base .avatar-upload.loading span{background:url("images/loading@2x.png");-webkit-background-size:19px;-moz-background-size:19px;background-size:19px}}'
}),
define("views/Settings/SettingsAccountView", ["application/runtime", "actions/Factory", "vendor/moment", "helpers/BlobHelper", "helpers/PlatformHeaders", "views/Pro/SubscriptionView", "views/Pro/StatusView", "views/Settings/SettingsICSView", "views/Settings/InvoiceDownloaderView", "views/Settings/RestoreDataView", "views/Settings/SettingsSubview", "wunderbits/views/WBFileSelectorView", "views/Settings/Controllers/SettingsAccountViewController", "views/Settings/Controllers/SettingsAccountViewOAuthController", "views/Settings/Controllers/SettingsAccountViewExportController", "wunderbits/WBFileUploader", "template!settings/settingsAccount", "style!settings/settingsAccount", "style!_fileupload"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _) {
    var w = e.$
      , k = e._
      , x = e.config
      , y = d.prototype
      , C = {
        echo: "6Wunderkinder",
        mac_app_store: "Mac App Store",
        google_play: "Google Play",
        ios_app_store: "iOS App Store",
        adyen: "6Wunderkinder",
        invite_your_friends: "6Wunderkinder",
        "6wunderkinder": "6Wunderkinder"
    };
    return d.extend({
        template: b,
        styles: [h, v],
        className: "settings-content-inner",
        "implements": [m, p, g],
        emits: {
            "click .facebook .disconnect": "click:facebook:disconnect",
            "click .facebook .connect": "click:facebook:connect",
            "click .google .connect": "click:google:connect",
            "click .google .disconnect": "click:google:disconnect",
            "click .show-delete": "click:showDelete",
            "click #change-email": "click:changeEmail",
            "click #cancel-email": "click:cancelEmail",
            "click #save-email": "click:saveEmail",
            "click #change-password": "click:changePassword",
            "click #cancel-password": "click:cancelPassword",
            "click #save-password": "click:savePassword",
            "click #cancel-delete-account": "click:cancelDeleteAccount",
            "click #delete-account": "click:deleteAccount",
            "click .go-pro": "click:goPro",
            "click #cancel-pro": "toggle:confirmation",
            "click .return-cancel": "toggle:confirmation",
            "click .confirm-cancel": "click:confirmCancel",
            "blur #edit-full-name": "blur:editFullName",
            "keydown #edit-full-name": "keydown",
            "keydown #edit-email": "keydown",
            "keydown #edit-email-pw-confirm": "keydown",
            "keydown #confirm-password": "keydown",
            "keydown #cancel-password, #cancel-email, #cancel-delete-account": "keydown:cancelEdit",
            "keydown #save-password, #save-email, #delete-account": "keydown:confirmEdit",
            "keyup .password-confirm input": "keyup:confirmPassword",
            "keyup .delete-password, .delete-confirm": "keyup:delete",
            "keyup .new-password": "keyup:password",
            "keyup .confirm-password": "keyup:password",
            "click .export-start": "click:export"
        },
        observes: {
            events: {
                "backup:error:show": "showBackupError",
                "backup:error:hide": "hideBackupError"
            }
        },
        renderData: {
            adminName: _,
            adyenSubscription: _,
            billOn: _,
            connectedToFacebook: _,
            expiresIn: _,
            expiresOn: _,
            expiresRelative: _,
            isAdmin: _,
            isCanceled: _,
            isNodeWebkit: e.env.isNodeWebkit(),
            isChromeApp: e.env.isChromeApp(),
            isGroupProduct: _,
            isIE: e.env.isIE(),
            isManageEnabled: _,
            isMember: _,
            isTelekomPromo: _,
            recurring: _,
            showSocialButtons: _,
            store: _,
            subscriptionType: _,
            user: _
        },
        formatData: function(t) {
            var n = this;
            t = y.formatData.call(n, t);
            var o = e.user
              , a = o.attributes
              , r = a.individualSubscription
              , s = a.teamSubscription
              , l = n.subscriptionLookup.getSubscriptionModel(r)
              , c = n.subscriptionLookup.getSubscriptionModel(s)
              , d = !!a.productID && n.productLookup.getProductModel(a.productID)
              , u = o.isPro();
            if (t.user = o.toJSON(),
            t.user.isPro = u,
            t.showSocialConnectButtons = o.showSocialButtons() && !e.env.isNodeWebkit(),
            t.connectedToFacebook = !!n.facebookService,
            u && (l || c)) {
                var m = l || c;
                m = m.attributes;
                var p = e.settings.attributes.date_format;
                t.expiresIn = i(m.expires_at).diff(i(), "days"),
                t.expiresOn = i(m.expires_at).format(p),
                t.billOn = m.recurring && !m.canceled ? i(m.expires_at).format(p) : !1,
                t.expiresRelative = 0 === t.expiresIn ? e.language.getText("label_relative_date_today_mid_sentence") : 1 === t.expiresIn ? e.language.getText("label_relative_date_tomorrow") : !1,
                t.subscriptionType = m.value,
                t.adyenSubscription = d && "adyen" === d.attributes.provider,
                t.isGroupProduct = m.team,
                t.isAdmin = e.user.isProTeamAdmin(),
                t.adminName = m.team && m.admin.name,
                t.isMember = m.team && e.user.isProTeamMember(),
                t.isCanceled = !!m.canceled_at,
                t.recurring = m.recurring,
                d && (t.isManageEnabled = "google_play" === d.attributes.platform || "ios_app_store" === d.attributes.platform),
                t.store = d && C[d.attributes.platform || d.provider] || "6Wunderkinder",
                t.isTelekomPromo = "telekom_6month_promotion" === a.productID;
            }
            return t;
        },
        initialize: function() {
            var i = this;
            y.initialize.apply(i, arguments),
            i.sdk = e.sdk,
            i.productLookup = t.productLookup(),
            i.updateProducts = t.updateProducts(),
            i.subscriptionLookup = t.subscriptionLookup(),
            i.services = t.serviceLookup().allServices,
            i.proStatusView = i.addSubview(new r()),
            i.subscriptionView = i.addSubview(new a()),
            i.invoiceDownloader = i.addSubview(new l()),
            i.importer = i.addSubview(new c()),
            i.icsView = i.addSubview(new s()),
            i.initFileUploader(),
            i.bindTo(e, "services:ready", i.updateServices),
            i.bindTo(i.services, "add remove", i.updateServices),
            i.bindTo(e.user, "change:avatar", i.updateAvatar),
            i.bindTo(e.user, "change:email", i.updateEmail),
            i.bindTo(e.user, "change:name", i.updateName),
            i.bindTo(e.user, "change:pro", i.deferredRender),
            i.bindTo(e.settings, "change:date_format", i.deferredRender),
            i.bindTo(e, "subscriptions:ready", i.deferredRender),
            i.bindTo(e, "close:edits", i.closeAllEdits),
            i.getProducts(),
            i.manageEmailsLink = i.$(".settings-account-manage-emails");
        },
        render: function() {
            var t = this;
            return e.settings.hasFetched.done(t.getProducts, t),
            t;
        },
        deferredRender: function() {
            var t = this;
            if (!t.destroyed) {
                var i = t.formatData(t.renderData);
                t = y.render.call(t, i),
                t.facebookButtons = {
                    connect: t.$(".facebook .connect"),
                    disconnect: t.$(".facebook .disconnect")
                },
                t.googleButtons = {
                    connect: t.$(".google .connect"),
                    disconnect: t.$(".google .disconnect")
                };
                var n = t.proStatusView.render(i).$el;
                t.$(".pro-status-wrapper").html(n);
                var o = t.subscriptionView.render().$el
                  , a = e.currentRoute().indexOf("/pro") >= 0;
                a ? t.$(".settings").addClass("hidden") : o.addClass("hidden"),
                t.renderICSView(),
                t.setupImportButton(),
                t.el.appendChild(o[0]),
                t.updateAvatar(),
                t.updateServices(),
                t.setupAvatarUpload(),
                t.setupInvoicesDownload();
            }
        },
        initFileUploader: function() {
            var t = this
              , i = k.extend({
                "X-Access-Token": e.user.attributes.access_token,
                "X-Client-ID": x.clientID,
                "X-Requested-With": "XMLHttpRequest",
                "X-File-Name": ""
            }, o.headers);
            t.fileUploader = new f({
                acceptedFileTypes: ["image/gif", "image/jpeg", "image/png"],
                uploadAction: "POST",
                uploadURL: x.api.host + "/v1/avatar",
                customHeaders: i,
                fileName: "newAvatar",
                onProgress: function() {
                    !t.destroyed && t.$(".spinner").addClass("spinning"),
                    e.trigger("analytics:Preferences:avatarUploadStarted");
                },
                onUploadComplete: function(i) {
                    t.destroyed || (t.dropTarget.addClass("loading"),
                    t.$(".spinner").removeClass("spinning")),
                    e.user.save({
                        avatar: i.url
                    }, {
                        success: function() {
                            if (e.trigger("analytics:Preferences:avatarUploadFinished"),
                            !t.destroyed) {
                                var i = t.dropTarget.find("img").removeClass("hidden")
                                  , n = t.bindTo(i, "load", function() {
                                    t.dropTarget.removeClass("loading"),
                                    t.unbindFrom(n);
                                });
                                t.delay(function() {
                                    t.dropTarget.removeClass("loading");
                                }, 3e3),
                                t.bindOnceTo(e, "sync:ended", t.updateAvatar),
                                e.trigger("sync:start");
                            }
                        }
                    });
                },
                onError: function() {
                    if (!t.destroyed) {
                        t.dropTarget.removeClass("loading");
                        var e = t.$(".message.error");
                        e.removeClass("hidden"),
                        t.delay(function() {
                            e.addClass("hidden");
                        }, 5e3);
                    }
                }
            });
        },
        getProducts: function() {
            var t = this
              , i = e.settings.attributes.account_locale || "en";
            t.sdk.http.products.all(_, i).done(function(e) {
                t.destroyed || (t.updateProducts.updateProducts(e),
                t.deferredRender());
            }).fail(function() {
                t.deferredRender();
            });
        },
        updateServices: function() {
            var e = this;
            e.facebookService = e.services.find(function(e) {
                return "facebook" === e.attributes.provider_type;
            }),
            e.googleService = e.services.find(function(e) {
                return "google" === e.attributes.provider_type;
            }),
            (e.facebookService || e.googleService) && e.updateServiceButtons();
        },
        renderICSView: function() {
            var e = this
              , t = e.$(".ics-container");
            t.append(e.icsView.render().el);
        },
        setupImportButton: function() {
            var e = this
              , t = e.$(".backup-feedback")
              , i = e.$(".backup-complete");
            e.$(".account-backup-settings .import").prepend(e.importer.render().el),
            e.bindTo(e.importer, "processing:backupData", function() {
                i.addClass("hidden"),
                t.removeClass("hidden");
            }),
            e.bindTo(e.importer, "processing:complete", function() {
                t.addClass("hidden"),
                i.removeClass("hidden");
            }),
            e.bindTo(e.importer, "processing:error", function() {
                i.addClass("hidden"),
                t.addClass("hidden"),
                e.$(".back-up-error").removeClass("hidden");
            });
        },
        showBackupError: function() {
            var e = this;
            e.$(".back-up-error").removeClass("hidden");
        },
        hideBackupError: function() {
            var e = this;
            e.$(".back-up-error").addClass("hidden");
        },
        uploadAvatar: function(t) {
            var i = this;
            "preferences/account" === e.currentRoute() && i.fileUploader.upload(t[0]);
        },
        updateAvatar: function() {
            function t() {
                a.destroyed || a.lastUpdatedAvatarTimestamp === s || (a.$(".options").removeClass("hidden").hide().fadeIn(100),
                a.$(".progress-bar-wrapper").fadeOut(100),
                a.lastUpdatedAvatarTimestamp = s,
                r.off("load"),
                a.subscriptionView.$("img").attr("src", r.attr("src")),
                r.toggleClass("opaque", null === e.user.attributes.avatar),
                r.removeClass("hidden"));
            }
            function o() {
                a.destroyed || (a.$(".avatar").addClass("no-avatar"),
                r.addClass("hidden"));
            }
            var a = this
              , r = a.$(".avatar.choose img")
              , s = i().unix()
              , l = e.user.getAvatarURL();
            l && r.length ? n.loadImage(l, r, t, o) : r.addClass("hidden");
        },
        updateEmail: function() {
            var t = this;
            t.$("#edit-email").val(e.user.attributes.email);
        },
        updateName: function() {
            var t = this;
            t.$("#edit-full-name").val(e.user.attributes.name);
        },
        setupAvatarUpload: function() {
            var e = this;
            e.dropTarget = e.$(".choose");
            var t = new u({
                dropTarget: e.dropTarget,
                urlBlocker: "tasks/"
            });
            e.fileSelectorView = e.addSubview(t, "selectorView"),
            e.fileSelectorView.setElement(e.dropTarget),
            e.bindTo(e.fileSelectorView, "selected:files", e.uploadAvatar);
        },
        setupInvoicesDownload: function() {
            var e = this;
            e.destroyed || e.invoiceDownloader && e.$(".google-connect-settings").before(e.invoiceDownloader.render().el);
        },
        resetEditInputs: function(t) {
            var i = w(t.currentTarget)
              , n = i.attr("id")
              , o = {
                "edit-full-name": "name",
                "edit-email": "email"
            };
            i.val(e.settings.get(o[n]));
        },
        showChangeEmail: function() {
            var e = this
              , t = e.$("#edit-email")
              , i = e.$("#change-email");
            t.prop("disabled", !1).focus(),
            i.addClass("hidden"),
            e.manageEmailsLink.addClass("hidden"),
            e.$(".password-confirm, .change-email-buttons").slideDown(200),
            e.$("#edit-full-name, #change-password, .delete-account, .facebook a, #cancel-pro").prop("disabled", !0).addClass("disabled"),
            e.trigger("check:email", _, e.$("#edit-email").val());
        },
        hideChangeEmail: function() {
            var t = this;
            if (!t.destroyed) {
                var i = t.$("#edit-email");
                i.prop("disabled", !0),
                i.val(e.user.attributes.email),
                t.$("#edit-email-pw-confirm").val("").attr("aria-label", e.language.getText("label_password")),
                t.$(".password-confirm, .password-error, .change-email-buttons").slideUp(200, function() {
                    t.destroyed || (t.manageEmailsLink.removeClass("hidden"),
                    t.$("#change-email").removeClass("hidden").focus());
                }),
                t.enableAllInputs();
            }
        },
        updateEmailInputs: function(e) {
            var t = this;
            if (e) {
                t.$("#edit-email-pw-confirm").prop("disabled", !1);
                var i = "" === t.$(".password-confirm input").val();
                t.$("#save-email").prop("disabled", i).toggleClass("disabled", i);
            } else
                t.$("#edit-email-pw-confirm, #save-email").prop("disabled", !0);
        },
        enableAllInputs: function() {
            var e = this;
            e.$(".settings .disabled").removeClass("disabled").prop("disabled", !1);
        },
        renderEmailError: function(t) {
            var i, n = this, o = t && t.error, a = o && o.translation_key, r = n.$(".email-error"), s = n.$("#edit-email-pw-confirm"), l = a ? a : "api_error_unknown";
            i = "api_error_validation_error" === l && o.email && "has already been taken" === o.email[0] ? e.language.getLabel("api_error_account_already_exists").toString() : e.language.getLabel(l).toString(),
            r.html(i),
            s.attr("aria-label", e.language.getText(l)),
            n.renderLabels(),
            r.slideDown(200, function() {
                s.focus();
            });
        },
        showChangePassword: function() {
            var e = this
              , t = e.$(".change-password-buttons")
              , i = e.$("#change-password")
              , n = e.$(".old-password");
            i.hide(),
            t.slideDown(200, function() {
                n.focus();
            }),
            n.show(),
            e.toggleSavePasswordButton(!1),
            e.$("#edit-full-name, #change-email, .delete-account, .facebook a, #cancel-pro").prop("disabled", !0).addClass("disabled");
        },
        toggleSavePasswordButton: function(e) {
            var t = this;
            t.$("#save-password").toggleClass("disabled", !e).prop("disabled", !e);
        },
        getChangePasswordValues: function() {
            var e = this;
            return {
                current: e.$(".old-password").val(),
                "new": e.$(".new-password").val(),
                confirm: e.$(".confirm-password").val()
            };
        },
        hideChangePassword: function() {
            var t = this
              , i = t.$(".change-password-buttons")
              , n = t.$("#change-password");
            n.show(),
            i.slideUp(200),
            t.$(".old-password").val("").hide().attr("aria-label", e.language.getText("settings_account_current_password")),
            t.$(".error-message").css("display", "none"),
            i.find("input").each(function(e, t) {
                w(t).val(""),
                n.focus();
            }),
            t.enableAllInputs();
        },
        showChangePasswordError: function(t) {
            var i = this
              , n = i.$(".change-password-error")
              , o = i.$(".old-password")
              , a = e.language.getText(t);
            n.text(a),
            o.attr("aria-label", a),
            n.slideDown(200, function() {
                o.focus();
            });
        },
        hideChangePasswordError: function() {
            this.$(".error-message").slideUp(200);
        },
        showDeleteAccount: function() {
            var e = this
              , t = e.$(".delete-form")
              , i = e.$(".show-delete-wrapper");
            i.addClass("hidden"),
            t.slideDown(400, function() {
                e.trigger("force:window:resize"),
                e.$(".delete-form").focus();
            }),
            e.$("#edit-full-name, #change-email, #change-password, #delete-account, .facebook a, #cancel-pro").prop("disabled", !0).addClass("disabled");
        },
        hideDeleteAccount: function() {
            var t = this
              , i = t.$(".delete-form")
              , n = t.$(".show-delete-wrapper");
            t.$(".delete-password").attr("aria-label", e.language.getText("settings_account_current_password")),
            n.removeClass("hidden"),
            i.slideUp(200, function() {
                t.destroyed || (t.trigger("force:window:resize"),
                t.$(".show-delete").focus());
            }),
            i.find("input").val(""),
            t.$(".delete-password-error").slideUp(200),
            t.enableAllInputs();
        },
        renderDeleteAccountError: function() {
            var t = this
              , i = t.$(".delete-password-error")
              , n = t.$("#delete-account")
              , o = t.$(".delete-password")
              , a = "api_error_incorrect_password";
            i.find("div").html(e.language.getLabel(a).toString()),
            t.renderLabels(),
            o.attr("aria-label", e.language.getText(a)),
            i.slideDown(200, function() {
                o.focus();
            }),
            n.removeClass("loading");
        },
        toggleDeleteButton: function(e) {
            var t = this
              , i = t.$("#delete-account");
            i.prop("disabled", !e).toggleClass("disabled", !e);
        },
        updateServiceButtons: function() {
            var e = this
              , t = !!e.facebookService
              , i = !!e.googleService;
            e.facebookButtons && (e.facebookButtons.connect.toggleClass("hidden", t),
            e.facebookButtons.disconnect.toggleClass("hidden", !t)),
            e.googleButtons && (e.googleButtons.connect.toggleClass("hidden", i),
            e.googleButtons.disconnect.toggleClass("hidden", !i));
        },
        toggleConnectButtonStatus: function(t, i) {
            var n, o = this, a = "connecting" === i ? "label_connecting" : "button_connect";
            "facebook" === t ? n = o.facebookButtons.connect : "google" === t && (n = o.googleButtons.connect),
            n && n.text(e.language.getText(a));
        },
        toggleConfirmation: function() {
            var e = this
              , t = e.$(".cancelation-options")
              , i = t.hasClass("closed");
            e.$(".confirm-cancel").removeClass("loading"),
            e.$("#edit-full-name, #change-password, .delete-account, .facebook a, #change-email").prop("disabled", i).toggleClass("disabled", i),
            e.$("#cancel-pro").prop("disabled", i).toggleClass("disabled", i),
            t[i ? "slideDown" : "slideUp"](200),
            t.toggleClass("closed", !i);
        },
        closeAllEdits: function() {
            var e = this;
            e.destroyed || (e.hideChangeEmail(),
            e.hideDeleteAccount(),
            e.hideChangePassword());
        }
    });
}),
define("views/Settings/Controllers/SettingsSelectController", ["application/runtime", "wunderbits/WBModalViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "change:select": "updateSettingFromSelect"
        },
        updateSettingFromSelect: function() {
            e.settings.save(this.view.settingsKey, this.view.getSelectValue());
        }
    });
}),
define("/templates/settings/settingsSelectItem.js", {
    name: "settings/settingsSelectItem",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return '<div class="separator filter-setting"> <div class="cols"> <div class="col-50"> <span class="label"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, e && e.label, {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </span> </div> <div class="col-50 text-right"> <span class="select"> <select class="small" id="edit-smartlist-visibility-' + r((o = t.name || e && e.name,
            typeof o === s ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="' + r((o = t.label || e && e.label,
            typeof o === s ? o.call(e, {
                name: "label",
                hash: {},
                data: n
            }) : o)) + '"> <option value="all" data-key-text="settings_today_smart_list_show_all_tasks"></option> <option value="current_user" data-key-text="settings_today_smart_list_show_current_user_tasks"></option> </select> </span> </div> </div> </div>';
        },
        useData: !0
    }
}),
define("views/Settings/SettingsTodayWeekSelectView", ["application/runtime", "./Controllers/SettingsSelectController", "wunderbits/WBViewPresenter", "template!settings/settingsSelectItem"], function(e, t, i, n) {
    var o = i.prototype;
    return i.extend({
        template: n,
        settingsKey: "today_smart_list_visible_tasks",
        renderData: {
            label: "settings_today_smart_list_visible_tasks"
        },
        "implements": [t],
        emits: {
            "change select": "change:select"
        },
        initialize: function() {
            o.initialize.apply(this, arguments),
            this.bindTo(e.settings, "change:" + this.settingsKey, "renderSelectedValue");
        },
        postRender: function() {
            this.renderSelectedValue();
        },
        renderSelectedValue: function() {
            var t = this
              , i = e.settings.attributes[t.settingsKey];
            t.$("option").each(function() {
                var e = t.$(this)
                  , n = e.val();
                e.attr("selected", n === i);
            });
        },
        getSelectValue: function() {
            return this.$("select").val();
        }
    });
}),
define("/templates/settings/settingsFiltersItem.js", {
    name: "settings/settingsFiltersItem",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return '<div class="separator filter-setting"> <div class="cols"> <div class="col-50"> <label for="show-smartlist-visibility-' + r((o = t.name || e && e.name,
            typeof o === a ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + '"> ' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, e && e.icon, {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="label">' + r((o = t.localized || e && e.localized || s,
            o.call(e, e && e.label, {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </label> </div> <div class="col-50 text-right"> <span class="select"> <select class="small" id="edit-smartlist-visibility-' + r((o = t.name || e && e.name,
            typeof o === a ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="' + r((o = t.label || e && e.label,
            typeof o === a ? o.call(e, {
                name: "label",
                hash: {},
                data: n
            }) : o)) + '"> <option value="auto" data-key-text="settings_sidebar_smart_lists_auto"></option> <option value="visible" data-key-text="settings_sidebar_smart_lists_visible"></option> <option value="hidden" data-key-text="settings_sidebar_smart_lists_hidden"></option> </select> </span> </div> </div> </div>';
        },
        useData: !0
    }
}),
define("views/Settings/SettingsFiltersView", ["application/runtime", "./SettingsSubview", "./SettingsTodayWeekSelectView", "template!settings/settingsFiltersItem"], function(e, t, i, n) {
    var o = e.$
      , a = e._
      , r = t.prototype
      , s = a.clone(e.smartLists)
      , l = a.clone(e.smartLists)
      , c = s.indexOf("completed");
    s[c] = "done";
    var d = s.indexOf("assigned");
    return s[d] = "assigned_to_me",
    t.extend({
        template: n,
        className: "settings-content-inner",
        initialize: function() {
            var t = this;
            r.initialize.apply(t, arguments),
            t.selectables = [],
            a.each(s, function(e) {
                t.selectables.push("smartlist_visibility_" + e);
            }),
            a.each(t.selectables, function(i) {
                t.bindTo(e.settings, "change:" + i, function() {
                    t.updateSelectable(i);
                });
            });
        },
        render: function() {
            var t = this;
            t.$el.empty();
            var n = document.createDocumentFragment();
            a.each(s, function(i, a) {
                var r = i;
                r = "done" === i ? "completed" : r;
                var s = "smart_list_" + r
                  , c = o(t.template({
                    name: i,
                    label: s,
                    icon: l[a]
                }))
                  , d = "smartlist_visibility_" + i
                  , u = e.settings.get(d)
                  , m = c.find("select")
                  , p = m.find('option[value="' + u + '"]');
                p.length && p.prop("selected", !0),
                "hidden" === u && c.addClass("disabled"),
                t.bindTo(m, "change", function() {
                    var t = m.val();
                    c.toggleClass("disabled", "hidden" === t),
                    e.settings.save(d, t),
                    e.trigger("analytics:Preferences:change-" + d, t);
                }),
                n.appendChild(c[0]);
            });
            var r = new i();
            n.appendChild(r.render().el),
            t.el.appendChild(n),
            t.renderLocalized(),
            t.$("select:last").addClass("tabEnd");
            var c = new Date();
            return t.$el.find(".wundercon.today").attr("data-label", c.getDate()),
            t;
        },
        updateSelectable: function(t) {
            var i = this
              , n = e.settings.get(t)
              , o = i.$el.find("#edit-" + t.replace(/_/g, "-"));
            "hidden" === n ? o.parent().addClass("disabled") : o.parent().removeClass("disabled");
            var a = o.find('option[value="' + n + '"]');
            a.prop("selected", !0);
        }
    });
}),
define("views/Settings/Controllers/SettingsShortcutsViewController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBModalViewController"], function(e, t, i, n) {
    var o = e.$
      , a = e._;
    return i.extend({
        "implements": {
            "focus:input": "onFocusInput",
            keydown: "onKeydown",
            "change:select": "onSelectChange",
            blur: "onBlur",
            "click:showMore": "onToggleAdvancedShortcuts",
            "click:reset": "resetShortcuts"
        },
        onSelectChange: function(e) {
            this.saveChanges(o(e.currentTarget));
        },
        onFocusInput: function(e) {
            var t = this;
            t.defer(function() {
                o(e.target).select();
            });
        },
        onBlur: function(t) {
            var i = this
              , n = o(t.currentTarget)
              , a = o.trim(n.val())
              , r = n.attr("id")
              , s = r.replace(/-/g, "_");
            a !== e.settings.get(s) ? i.saveChanges(n) : n.val(e.settings.get(s));
        },
        onKeydown: function(i) {
            var n = this
              , r = [9]
              , s = o(i.currentTarget)
              , l = s.attr("id")
              , c = l.replace(/-/g, "_")
              , d = !1;
            i.which === t.esc ? (s.val(e.settings.get(c)),
            s.blur()) : a.include(r, i.which) || (i.preventDefault(),
            i.stopPropagation(),
            d = n.getShortcutKeys(i, c),
            d !== !1 && s.val(d));
        },
        onToggleAdvancedShortcuts: function() {
            var t, i = this, n = i.view, o = n.$(".advanced-shortcuts"), a = o.hasClass("hidden");
            t = a ? e.language.getLabel("settings_shortcuts_hide").toString() : e.language.getLabel("settings_shortcuts_show_more").toString(),
            n.$(".show-advanced-shortcuts").html(t),
            n.renderLocalized(),
            o.toggleClass("hidden", !a),
            n.$("#shortcut-goto-preferences").focus(),
            e.trigger("analytics:Preferences:toggleShowAdvancedShortcuts", a ? "show" : "hide"),
            n.trigger("change:content");
        },
        resetShortcuts: function() {
            e.settings.resetShortcuts();
        },
        saveChanges: function(t) {
            var i = o.trim(t.val())
              , n = t.attr("id")
              , a = n.replace(/-/g, "_");
            i !== e.settings.get(a) && e.settings.save(a, i);
        },
        getShortcutKeys: function(e, i) {
            var o = [16, 17, 18, 91, 93, 27]
              , r = ["altKey", "ctrlKey", "metaKey", "shiftKey"]
              , s = e.which
              , l = t[s] !== n ? t[s] : String.fromCharCode(s);
            l = l.toUpperCase();
            var c = {
                returns: /^((ALT|SHIFT|META|CTRL)\s\+\s)*RETURN$/,
                deletes: /^((ALT|SHIFT|META|CTRL)\s\+\s)*BACKSPACE|DEL$/,
                keyCombos: /^((ALT|SHIFT|META|CTRL)\s\+\s)+.$/,
                singleKeys: /^.$/
            }
              , d = {
                shortcut_delete: [c.deletes],
                shortcut_add_new_task: [c.keyCombos],
                shortcut_add_new_list: [c.keyCombos],
                shortcut_goto_filter_all: [c.keyCombos],
                shortcut_goto_filter_completed: [c.keyCombos],
                shortcut_goto_filter_starred: [c.keyCombos],
                shortcut_goto_filter_today: [c.keyCombos],
                shortcut_goto_filter_week: [c.keyCombos],
                shortcut_goto_inbox: [c.keyCombos],
                shortcut_goto_search: [c.keyCombos],
                shortcut_goto_preferences: [c.keyCombos],
                shortcut_mark_task_done: [c.keyCombos],
                shortcut_mark_task_starred: [c.keyCombos],
                shortcut_select_all_tasks: [c.keyCombos],
                shortcut_send_via_email: [c.keyCombos],
                shortcut_sync: [c.singleKeys],
                shortcut_copy_tasks: [c.keyCombos],
                shortcut_cut_tasks: [c.keyCombos],
                shortcut_paste_tasks: [c.keyCombos]
            }
              , u = !1
              , m = !1;
            return a.include(o, e.which) ? u : (a.each(r, function(t) {
                e[t] === !0 && (t = t.replace("Key", "").toUpperCase(),
                u ? u += " + " + t : u = t);
            }),
            u ? u += " + " + l : u = l,
            d[i] && (a.each(d[i], function(e) {
                null !== u.match(e) && (m = !0);
            }),
            m === !1 && (u = !1)),
            u);
        }
    });
}),
define("/templates/settings/settingsShortcuts.js", {
    name: "settings/settingsShortcuts",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return '<!-- Tasks --> <div class="separator"> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_new_task", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut tabStart" id="shortcut-add-new-task" type="text" value="' + r((o = t.shortcut_add_new_task || e && e.shortcut_add_new_task,
            typeof o === s ? o.call(e, {
                name: "shortcut_add_new_task",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_new_task"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_new_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-add-new-list" type="text" value="' + r((o = t.shortcut_add_new_list || e && e.shortcut_add_new_list,
            typeof o === s ? o.call(e, {
                name: "shortcut_add_new_list",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_new_list"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_mark_done", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-mark-task-done" type="text" value="' + r((o = t.shortcut_mark_task_done || e && e.shortcut_mark_task_done,
            typeof o === s ? o.call(e, {
                name: "shortcut_mark_task_done",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_mark_done"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_mark_starred", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-mark-task-starred" type="text" value="' + r((o = t.shortcut_mark_task_starred || e && e.shortcut_mark_task_starred,
            typeof o === s ? o.call(e, {
                name: "shortcut_mark_task_starred",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_mark_starred"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_select_all_tasks", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-select-all-tasks" type="text" value="' + r((o = t.shortcut_select_all_tasks || e && e.shortcut_select_all_tasks,
            typeof o === s ? o.call(e, {
                name: "shortcut_select_all_tasks",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_select_all_tasks"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_delete_item", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-delete" type="text" value="' + r((o = t.shortcut_delete || e && e.shortcut_delete,
            typeof o === s ? o.call(e, {
                name: "shortcut_delete",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_delete_item"/> </div> </div> </div> <!-- copy and paste --> <div class="separator"> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "contextual_copy_selected_task", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-copy-tasks" type="text" value="' + r((o = t.shortcut_copy_tasks || e && e.shortcut_copy_tasks,
            typeof o === s ? o.call(e, {
                name: "shortcut_copy_tasks",
                hash: {},
                data: n
            }) : o)) + '"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "contextual_paste_task", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-paste-tasks" type="text" value="' + r((o = t.shortcut_paste_tasks || e && e.shortcut_paste_tasks,
            typeof o === s ? o.call(e, {
                name: "shortcut_paste_tasks",
                hash: {},
                data: n
            }) : o)) + '"/> </div> </div> </div> <div class="separator"> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_search", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-search" type="text" value="' + r((o = t.shortcut_goto_search || e && e.shortcut_goto_search,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_search",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_search"/> </div> </div> </div> <!-- Advanced --> <div class="separator advanced-shortcuts hidden"> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_preferences", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-preferences" type="text" value="' + r((o = t.shortcut_goto_preferences || e && e.shortcut_goto_preferences,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_preferences",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_preferences"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_email_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-send-via-email" type="text" value="' + r((o = t.shortcut_send_via_email || e && e.shortcut_send_via_email,
            typeof o === s ? o.call(e, {
                name: "shortcut_send_via_email",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="button_email_list"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_show_notifications", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-show-notifications" type="text" value="' + r((o = t.shortcut_show_notifications || e && e.shortcut_show_notifications,
            typeof o === s ? o.call(e, {
                name: "shortcut_show_notifications",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_show_notifications"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_inbox", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-inbox" type="text" value="' + r((o = t.shortcut_goto_inbox || e && e.shortcut_goto_inbox,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_inbox",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_inbox"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_assigned_smart_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-filter-assigned" type="text" value="' + r((o = t.shortcut_goto_filter_assigned || e && e.shortcut_goto_filter_assigned,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_filter_assigned",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_assigned_smart_list"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_starred_smart_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-filter-starred" type="text" value="' + r((o = t.shortcut_goto_filter_starred || e && e.shortcut_goto_filter_starred,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_filter_starred",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_starred_smart_list"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_today_smart_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-filter-today" type="text" value="' + r((o = t.shortcut_goto_filter_today || e && e.shortcut_goto_filter_today,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_filter_today",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_today_smart_list"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_week_smart_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-filter-week" type="text" value="' + r((o = t.shortcut_goto_filter_week || e && e.shortcut_goto_filter_week,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_filter_week",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_week_smart_list"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_all_smart_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-filter-all" type="text" value="' + r((o = t.shortcut_goto_filter_all || e && e.shortcut_goto_filter_all,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_filter_all",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_all_smart_list"/> </div> </div> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_open_done_smart_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-goto-filter-done" type="text" value="' + r((o = t.shortcut_goto_filter_completed || e && e.shortcut_goto_filter_completed,
            typeof o === s ? o.call(e, {
                name: "shortcut_goto_filter_completed",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="settings_shortcuts_open_done_smart_list"/> </div> </div> </div> <div class="separator"> <div class="cols"> <div class="col-50 text-right">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_sync", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="col-50"> <input class="shortcut" id="shortcut-sync" type="text" value="' + r((o = t.shortcut_sync || e && e.shortcut_sync,
            typeof o === s ? o.call(e, {
                name: "shortcut_sync",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="label_sync"/> </div> </div> </div> <div class="separator text-right noline"> <div class="cols"> <button class="reset-shortcuts" tabindex="0">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_reset", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> <button class="show-advanced-shortcuts tabEnd" tabindex="0">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_shortcuts_show_more", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</button> </div> </div>";
        },
        useData: !0
    }
}),
define("views/Settings/SettingsShortcutsView", ["application/runtime", "wunderbits/data/keycodes", "views/Settings/Controllers/SettingsShortcutsViewController", "views/Settings/SettingsSubview", "template!settings/settingsShortcuts"], function(e, t, i, n, o) {
    var a = e._
      , r = n.prototype
      , s = ["shortcut_delete", "shortcut_add_new_task", "shortcut_add_new_list", "shortcut_goto_filter_all", "shortcut_goto_filter_assigned", "shortcut_goto_filter_completed", "shortcut_goto_filter_starred", "shortcut_goto_filter_today", "shortcut_goto_filter_week", "shortcut_goto_inbox", "shortcut_goto_search", "shortcut_goto_preferences", "shortcut_mark_task_done", "shortcut_mark_task_starred", "shortcut_select_all_tasks", "shortcut_send_via_email", "shortcut_sync", "shortcut_copy_tasks", "shortcut_paste_tasks"];
    return n.extend({
        template: o,
        className: "settings-content-inner",
        "implements": [i],
        emits: {
            "focus input": "focus:input",
            "keydown input.shortcut": "keydown",
            "change select.shortcut": "change:select",
            "blur .shortcut": "blur",
            "click .show-advanced-shortcuts": "click:showMore",
            "click .reset-shortcuts": "click:reset"
        },
        initialize: function() {
            var t = this;
            r.initialize.apply(t, arguments),
            a.each(s, function(i) {
                t.bindTo(e.settings, "change:" + i, function() {
                    t.updateShortcut(i);
                });
            });
        },
        render: function() {
            var t, i = this;
            return t = e.settings.toJSON(),
            a.each(t, function(e, i) {
                "INVALID" === e ? t[i] = "" : e && (t["is " + i + " " + e] = !0);
            }),
            i = r.render.call(i, t);
        },
        updateShortcut: function(t) {
            var i = this
              , n = e.settings.get(t);
            "INVALID" === n && (n = ""),
            i.$("#" + t.replace(/_/g, "-")).val(n);
        }
    });
}),
define("views/Settings/Controllers/SettingsNotificationsViewController", ["application/runtime", "wunderbits/WBModalViewController"], function(e, t) {
    var i = e.$;
    return t.extend({
        "implements": {
            "change:toggle": "onChangeToggleable"
        },
        onChangeToggleable: function(t) {
            var n = i(t.currentTarget)
              , o = {}
              , a = {
                "edit-notifications-email-enabled": "notifications_email_enabled",
                "edit-notifications-push-enabled": "notifications_push_enabled",
                "edit-notifications-desktop-enabled": "notifications_desktop_enabled"
            };
            o[a[n.attr("id")]] = n.is(":checked") ? "true" : "false",
            e.trigger("analytics:Preferences:toggleNotification-" + a[n.attr("id")], n.is(":checked")),
            e.settings.save(o);
        }
    });
}),
define("/templates/settings/settingsNotifications.js", {
    name: "settings/settingsNotifications",
    data: {
        "1": function() {
            return "checked";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<!-- Notifications --> <div class="tabStart" tabindex="0" role="heading"> <div class="separator"> <p class="strong">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_notifications_notify_me_of_important_events_mobile", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</p> <p>" + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_notifications_notify_me_on_text", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <div class="separator"> <div class="cols"> <div class="col-50"> <label> <input id="edit-notifications-email-enabled" type="checkbox" ';
            return o = t["if"].call(e, e && e["is notifications_email_enabled true"], {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += "/> " + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_notifications_email_enabled", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </label> </div> <div class="col-50"> <label> <input id="edit-notifications-push-enabled" type="checkbox" ',
            o = t["if"].call(e, e && e["is notifications_push_enabled true"], {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += "/> " + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_notifications_push_enabled", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </label> </div> </div> </div> <div class="separator"> <div class="cols"> <div class="col-50"> <label> <input id="edit-notifications-desktop-enabled" class="tabEnd" type="checkbox" ',
            o = t["if"].call(e, e && e["is notifications_desktop_enabled true"], {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + "/> " + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_notifications_desktop_enabled", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </label> </div> <div class="col-50"></div> </div> </div>';
        },
        useData: !0
    }
}),
define("views/Settings/SettingsNotificationsView", ["application/runtime", "views/Settings/Controllers/SettingsNotificationsViewController", "views/Settings/SettingsSubview", "template!settings/settingsNotifications"], function(e, t, i, n) {
    var o = e._
      , a = i.prototype;
    return i.extend({
        template: n,
        className: "settings-content-inner",
        "implements": [t],
        emits: {
            "change input": "change:toggle"
        },
        initialize: function() {
            var t = this;
            a.initialize.apply(t, arguments),
            t.selectables = ["notifications_email_enabled", "notifications_push_enabled", "notifications_desktop_enabled"],
            o.each(t.selectables, function(i) {
                t.bindTo(e.settings, "change:" + i, function() {
                    t.updateToggleable(i);
                });
            });
        },
        render: function() {
            var t, i = this;
            return t = e.settings.toJSON(),
            o.each(t, function(e, i) {
                e && (t["is " + i + " " + e] = !0);
            }),
            i = a.render.call(i, t);
        },
        updateToggleable: function(t) {
            var i = this
              , n = e.settings.get(t)
              , o = i.$el.find("#edit-" + t.replace(/_/g, "-"));
            o.prop("checked", "true" === n);
        }
    });
}),
define("views/Settings/Controllers/SettingsAboutViewController", ["application/runtime", "wunderbits/WBModalViewController"], function(e, t) {
    var i = e.$;
    return t.extend({
        "implements": {
            "click:privacyPolicy": "onClickTogglePrivacyPolicy",
            "click:link": "onClickLink"
        },
        onClickTogglePrivacyPolicy: function() {
            this.view.showTogglePrivacyPolicy();
        },
        onClickLink: function(t) {
            var n = i(t.target)
              , o = n.attr("href");
            o && e.trigger("analytics:Preferences:clickAboutLink", o);
        }
    });
}),
define("/templates/privacyPolicy.js", {
    name: "privacyPolicy",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<h2>Imprint</h2> <p> 6 Wunderkinder GmbH<br> Karl-Liebknecht-Straße 32<br> 10178 Berlin </p> <h3>Contact</h3> <p>Mail: hello@6wunderkinder.com</p> <h3>Handelsregister</h3> <p> AG Charlottenburg HRB 128663 B<br> UstID DE815214657 </p> <h3>Geschäftsführer</h3> <p>Christian Reber</p> <h2>Privacy Policy</h2> <p>We, 6Wunderkinder GmbH (hereinafter "6Wunderkinder"), regard the protection and the confidentiality of your data as very important. We collect and use your personal data in accordance with the relevant provisions of German data protection legislation. In this Privacy Policy, we would like to tell you which personal data we collect and what we use it for.</p> <p>Below, 6Wunderkinder tells you about the type and extent of and the purposes for which personal data are collected and used. You can call up this information on our website anytime.</p> <h3>Controller</h3> <p>The controller within the meaning of German data protection laws is:</p> <p>6 Wunderkinder GmbH<br>Karl-Liebknecht-Straße 32<br>10178 Berlin<br></p> <p>If you have any questions or concerns about data protection, you are welcome to also contact us by email at this address: <a href="mailto:support@wunderlist.com" data-track="Mailto:Support Contact:Privacy Policy">support@wunderlist.com</a></p> <h3>Subject of Data Protection</h3> <p>The subject of data protection is personal data. According to Section 3, Subsection 1 of the German Federal Data Protection Act ("Bundesdatenschutzgesetz"), these are individual details on personal or objective circumstances of a certain person or certain persons. These include details such as your name, your postal address, your email address, your telephone number or, where appropriate, even use-data.</p> <h3>Collection and Use of Data</h3> <h4>Automated Data Collection</h4> <p>When you access 6Wunderkinder websites, your internet browser automatically transmits data for technical reasons. The following data are stored separately from other data that you may have sent us:</p> <ul> <li>your date and time of access,</li> <li>your browser-type and version,</li> <li>the operating system you use,</li> <li>the URL of the website you have previously visited,</li> <li>the quantity of data transmitted.</li> </ul> <p>For technical reasons these data are stored and are not assigned to any identifiable person at any time.</p> <h4>Data Entered by Users</h4> <p>You can use the Wunderlist product both with and without registering. However, you can only access Wunderlist using certain terminals such as an iPhone, iPod, iPad, Windows, Mac or Android and without additional functions. In order to make use of all its advantages, you have to register. To do this, you must enter your email address and select a password. We require these data in order to guarantee that you are able to make full use of our entire offer. We need these and possibly other data not least in order to respond to your wishes, questions and criticism.</p> <p>In future, we plan to introduce an option which will allow you to design your account personally. For example, you will be able to add a photo, choose a username and set up a connection to your Facebook user account. You will not be obliged to design your account personally; this will be entirely voluntary.</p> <p>The central function of Wunderlist product is task management. You will be able to use this product both online and offline.</p> <p>Where Wunderlist is used solely offline, the data you enter will be stored de-centrally on your storage medium. In such a case, we will not be able to access these data.</p> <p>If you use Wunderlist in combination with a registered account, all data and tasks entered will be integrated into a database. The purpose of this database is to allow you to use Wunderlist at various different levels and call up your tasks anywhere and at any time. Data are transmitted to the respective terminal using SSL encryption so that your data are transmitted securely.</p> <p>We use personal data in order to enable secure, effective and user-related use of Wunderlist services, including for:</p> <ul> <li>calling up the task-list via the internet;</li> <li>anonymously analysing task management statistics for press releases by 6Wunderkinder and studies;</li> <li>recommending Wunderlist by using the "Invite" function for friends and acquaintances (email address).</li> </ul> <h4>Transfer of Data</h4> <p>We will not transfer your data to third parties as a matter of course without letting you know in advance or asking for your prior permission. We may only transfer your data to third parties without informing you separately beforehand in the following exceptional cases as explained below:</p> <ul> <li>If required for investigating the illegal use of Wunderlist or for legal proceedings, personal data will be transferred to the criminal investigation authorities and, if appropriate, to injured third parties. We will only do this if there are concrete indications of illegal and/or abusive behaviour. We can only transfer on your personal data if this is used to enforce General Terms and Conditions of Business or other agreements. We are also legally obliged to give certain public authorities information. These are criminal investigation authorities, public authorities which prosecute administrative offences entailing fines and the German finance authorities.</li> <li>Occasionally we depend on contractually affiliated external companies and external service providers to supply services such as the supply of advertising measures (only if you have given your explicit prior consent), processing payments (PayPal, credit card etc.), storing your data and customer service. In such cases, information is transferred to these companies or individuals in order to enable them to process this information further. We carefully select these external service providers and review them regularly to ensure that your privacy is preserved. The service providers may only use the data for the purposes stipulated by us. We also contractually require the service providers to treat your data solely in accordance with this Privacy Policy and the German data protection laws.</li> <li>In order to further develop our business, we may alter the corporate structure of 6Wunderkinder GmbH by changing its legal form. We may also form, sell or buy subsidiaries, divisions or parts of the company. In such transactions, customer information together with the part of the company to be transferred will be passed on. Every time personal data are transferred to third parties to the extent prescribed, 6Wunderkinder will ensure that this is done in accordance with this Privacy Policy and the relevant data protection laws.</li> </ul> <h4>Newsletter</h4> <p>6Wunderkinder provides a newsletter service free of charge. We use the newsletter to inform you about new products and send you general information about 6Wunderkinder. We need your email address in order to send you the newsletter. You can enter your email address on 6Wunderkinder\'s start page, which is available at <a href="https://www.wunderlist.com/home">www.wunderlist.com/home</a>. We will store and use your email address solely to send you the newsletter.</p> <p>Of course you can unsubscribe the newsletter at any time. Every newsletter contains the information on how you can unsubscribe the newsletter with effect for the future.</p> <h4>Cookies</h4> <p>6Wunderkinder stores so-called "cookies" in order to be able to offer you a comprehensive range of functions and to make it easier to use our websites. "Cookies" are small files which are stored on your computer with the help of the internet browser. If you do not want to use "cookies", you can prevent "cookies" from being stored on your computer using the corresponding settings on your internet browser. Please note that this may restrict the functional capability and the range of functions of our offer.</p> <h3>Analysis of Wunderlist</h3> <h4>Statistical Data</h4> <p>When Wunderlist is used, we collect statistical data which can be traced to you. We use it to improve Wunderlist.</p> <h4>Google Analytics</h4> <p>6Wunderkinder uses Google Analytics, a web analysis service of Google Inc. ("Google"). Google Analytics uses so-called "cookies", text files which are stored on your computer and which enable you to analyse your use of Wunderlist. The information generated by the cookie on your use of Wunderlist (including your abbreviated IP address) is transmitted to a Google server in the USA and are stored there. Google will use this information to assess your use of Wunderlist, to compile reports on the activities for us and to provide more services connected with use of Wunderlist and the internet. It is also possible that Google may transmit this information to third parties if this is prescribed by law or if third parties process this information on behalf of Google.</p> <p><strong>You can deactivate Google Analytics by means of a browser add-on if you do not want Wunderlist analysis. You can download this here: <a href="http://tools.google.com/dlpage/gaoptout?hl=de"> http://tools.google.com/dlpage/gaoptout?hl=de.</a></strong></p> <h4>Deleting Your Data</h4> <p>If your data are no longer required for the aforementioned purposes, we will delete them. Completed tasks will remain stored and will be marked "Completed" in the database. If you delete your account, we will also delete all data completely from your account (lists, tasks and shared lists). Data you have entered in lists belonging to third parties will remain in existence as these are part of third party accounts. If data has to be retained for statutory reasons, these will be blocked and will then no longer be available for any further use.</p> <h4>Right to Information and Correction</h4> <p>You naturally have the right to receive information about the data held and stored by 6Wunderkinder about you. Equally, you have the right to have incorrect data corrected or blocked. To have this done, please contact: <a href="mailto:support@wunderlist.com" data-track="Mailto:Support Contact:Privacy Policy">support@wunderlist.com</a> or by post to the address given above.</p> <h4>Amendments to this Privacy Policy</h4> <p>We reserve the right to amend this Privacy Policy. You can call up the current version of the Privacy Policy at any time at: <a href="https://www.wunderlist.com/privacy-policy/">www.wunderlist.com/privacy-policy/</a>.</p>';
        },
        useData: !0
    }
}),
define("/styles/_privacyPolicy.js", {
    name: "_privacyPolicy",
    data: ".dialog .content .separator .privacy-policy{background:#fff;padding:30px;overflow:auto;max-height:150px;-webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.1);box-shadow:inset 0 0 5px rgba(0,0,0,0.1);border:1px solid #ccc;}.dialog .content .separator .privacy-policy p,.dialog .content .separator .privacy-policy h4,.dialog .content .separator .privacy-policy li{font-size:12px;margin-bottom:10px}.dialog .content .separator .privacy-policy h4{margin-bottom:0}.dialog .content .separator .privacy-policy h3{font-size:14px}.dialog .content .separator .privacy-policy h2{font-size:18px;margin-bottom:10px}.dialog .content .separator .privacy-policy a{color:#328ad6}.dialog .content .separator .privacy-policy ul{padding:0 20px;list-style:disc;font-weight:400;line-height:18px}"
}),
define("views/Settings/SettingsPrivacyPolicyView", ["application/runtime", "wunderbits/WBView", "template!privacyPolicy", "style!_privacyPolicy"], function(e, t, i, n) {
    var o = t.prototype;
    return t.extend({
        template: i,
        styles: [n],
        attributes: {
            tabindex: 0
        },
        className: "privacy-policy",
        render: function() {
            var e = this;
            return o.render.apply(e, arguments),
            e;
        }
    });
}),
define("/templates/settings/settingsAbout.js", {
    name: "settings/settingsAbout",
    data: {
        "1": function() {
            return ' <ul class="social-links"> <li><span class="icon google-btn arrow-btn"></span><a href="https://plus.google.com/105356136092009396367" target="_blank" class="button withArrow">+1</a></li> <li><span class="icon facebook-btn arrow-btn"></span><a href="http://www.facebook.com/wunderlist" target="_blank" class="button withArrow">Like</a></li> <li><span class="icon twitter-btn arrow-btn"></span><a href="https://twitter.com/wunderlist" target="_blank" class="button withArrow">Follow</a></li> </ul> ';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = t.helperMissing, c = '<div class="separator big center tabStart" tabindex="0"> <a href="/home" target="_blank"><span class="icon wunderlist-icon"></span></a> <h2> <a class="black" href="/home" target="_blank">Wunderlist</a> </h2> <h3 class="version">' + s((a = t.release || e && e.release,
            typeof a === r ? a.call(e, {
                name: "release",
                hash: {},
                data: n
            }) : a)) + '</h3> <p><a href="https://github.com/wunderlist/changelog/blob/master/webapp/changelog.md#whats-new-in-wunderlist" target="_blank">' + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_show_whats_new", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a></p> <p>Copyright © 2015 6 Wunderkinder GmbH</p> <p>" + s((a = t.localized || e && e.localized || l,
            a.call(e, "label_rights_reserved", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> <p> <a class="toggle-privacy-policy" target="_blank" tabindex="0" role="link">' + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_privacy_policy", {
                name: "localized",
                hash: {},
                data: n
            }))) + " / " + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_imprint", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> - <a href="http://www.wunderlist.com/terms-of-use" target="_blank" tabindex="0">' + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_terms_of_use", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </p> </div> <div class="separator privacy-wrapper hidden"></div> <div class="separator big"> ';
            return o = t["if"].call(e, e && e.showSocialButtons, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' <ul class="social-links"> <li><span class="icon sixw-btn arrow-btn"></span><a href="https://www.wunderlist.com/home" target="_blank" class="button withArrow">' + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_visit_website", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a></li> <li><span class="icon support-btn arrow-btn"></span><a href="http://support.wunderlist.com/" target="_blank" class="button withArrow">' + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_get_help", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a></li> </ul> </div> <div class="separator center"> <h2 tabindex="0">' + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_third_party_libraries", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h2> <div tabindex="0" class="separator noline"> <h3>RequireJS</h3> <p> Copyright © 2010-2015 The Dojo Foundation<br> License: <a href="https://github.com/jrburke/requirejs/blob/master/LICENSE" target="_blank">BSD, MIT</a> </p> </div> <div tabindex="0" class="separator noline"> <h3>jQuery</h3> <p> Copyright © 2015 jQuery Foundation and other contributors<br> License: <a href="http://jquery.org/license" target="_blank">jquery.org/license</a> </p> </div> <div tabindex="0" class="separator noline"> <h3>Backbone.js</h3> <p> Copyright © 2010-2015 Jeremy Ashkenas, DocumentCloud<br> License: <a href="https://github.com/documentcloud/backbone/blob/master/LICENSE" target="_blank">github.com/documentcloud/backbone</a> </p> </div> <div tabindex="0" class="separator noline"> <h3>Lo-Dash</h3> <p> Copyright © 2012-2015 John-David Dalton<br> License: <a href="https://github.com/bestiejs/lodash/blob/master/LICENSE.txt" target="_blank">MIT</a> </p> </div> <div tabindex="0" class="separator noline"> <h3>Stylus</h3> <p> Copyright © 2010–2015 LearnBoost<br> License: <a href="https://github.com/LearnBoost/stylus/blob/master/LICENSE" target="_blank">MIT</a> </p> </div> <div tabindex="0" class="separator noline"> <h3>handlebars.js</h3> <p> Copyright © 2011-2015 by Yehuda Katz<br> License: <a href="https://github.com/wycats/handlebars.js/blob/master/LICENSE" target="_blank">github.com/wycats/handlebars.js</a> </p> </div> <div tabindex="0" class="separator noline"> <h3>Moment.js</h3> <p> Copyright © 2011-2012 Tim Wood<br> License: <a href="https://github.com/timrwood/moment/blob/master/LICENSE" target="_blank">github.com/timrwood/moment</a> </p> </div> <div tabindex="0" class="separator noline"> <h3>Mousetrap</h3> <p>Copyright © 2012 Craig Campbell<br/>License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache License 2.0</a></p> </div> <div tabindex="0" class="separator noline"> <h3>Mailcheck</h3> <p>Copyright © 2012 Received Inc<br/>License: <a href="https://github.com/mailcheck/mailcheck/blob/master/LICENSE" target="_blank">MIT</a></p> </div> <div tabindex="0" class="separator noline"> <h3>setImmediate</h3> <p>Copyright © 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola<br/>License: <a href="https://github.com/YuzuJS/setImmediate/blob/master/LICENSE.txt" target="_blank">MIT</a></p> </div> <div tabindex="0" class="separator noline"> <h3>visibly</h3> <p>Copyright © 2011 Addy Osmani <br/>License: <a href="https://github.com/addyosmani/visibly.js/blob/master/visibly.js" target="_blank">MIT</a></p> </div> <div tabindex="0" class="separator noline"> <h3>ES6 Unicode Shims 0.1</h3> <p>ES6 Unicode Shims 0.1 © 2012 Steven Levithan <br/>License: <a href="https://gist.github.com/slevithan/2290602#file-es6-unicode-shims-js-L4" target="_blank">MIT</a></p> </div> <div tabindex="0" class="separator noline"> <h3>Async.js</h3> <p>Copyright © 2010-2014 Caolan McMahon <br/>License: <a href="https://github.com/caolan/async/blob/master/LICENSE" target="_blank">MIT</a></p> </div> <div tabindex="0" class="separator noline"> <h3>MagiConsole</h3> <p>Copyright © 2015 Raymond May Jr. <br/>License: <a href="https://github.com/octatone/MagiConsole/blob/master/LICENSE" target="_blank">MIT</a></p> </div> <div tabindex="0" class="separator noline"> <h3>twemoji</h3> <p>Copyright © 2014 Twitter, Inc and other contributors<br/>Code License: <a href="https://github.com/twitter/twemoji/blob/gh-pages/LICENSE" target="_blank">MIT</a> - Graphics License: <a href="https://github.com/twitter/twemoji/blob/gh-pages/LICENSE-GRAPHICS" target="_blank">CC-BY 4.0</a></p> </div> <div tabindex="0" class="separator noline"> <h3>Stack Overflow</h3> <p> <a href="http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022" target="_blank"> Get a range\'s start and end offset\'s relative to its parent container </a> - <a href="http://stackoverflow.com/users/96100/tim-down" target="_blank"> Tim Down </a> </p> <p> <a href="http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/21963136#21963136" target="_blank"> Create GUID / UUID in JavaScript? </a> - <a href="http://stackoverflow.com/users/1026023/jeff-ward" target="_blank"> Jeff Ward </a> </p> <p> <a href="http://stackoverflow.com/questions/3545018/selected-text-event-trigger-in-javascript/3545105#3545105" target="_blank"> Selected text event trigger in Javascript </a> - <a href="http://stackoverflow.com/users/70393/karim79" target="_blank"> karim79 </a> </p> </div> <div tabindex="0" class="separator noline"> <h3>' + s((a = t.localized || e && e.localized || l,
            a.call(e, "settings_background_credits", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h3> <p> <a href="http://artcore-illustrations.de/" target="_blank">Artcore</a> - <a href="http://www.dvq.co.nz/" target="_blank">Matthew Skiles</a> - <a href="http://500px.com/constantin_gololobov" target="_blank">Constantin Gololobov</a> - <a href="http://www.flickr.com/photos/tycn" target="_blank">Brandon Harris</a> - <a href="http://www.justinkiner.com/" target="_blank">Justin Kiner</a> - <a href="http://bo0xvn.deviantart.com/" target="_blank">Vu Minh Hai</a> - <a href="http://www.jinnavanringen.com" target="_blank">Jinna Van Ringen</a> - <a href="http://fiftyfootshadows.net/" target="_blank">John Carey</a> - <a href="http://500px.com/Actionjesus" target="_blank">Frederik Falck Hole</a> - <a href="http://duncandavidson.com" target="_blank">Duncan Davidson</a> - <a href="http://500px.com/pat138241" target="_blank">Patrick Foto</a> - Candy Ho </p> </div> <div class="tabEnd" tabindex="0" data-key-aria-label="aria_user_menu_hint"/> </div> ';
        },
        useData: !0
    }
}),
define("/styles/settings/settingsAbout.js", {
    name: "settings/settingsAbout",
    data: "#wunderlist-base .settings-about a.black{color:#1c1c1c}#wunderlist-base .social-links{margin-top:10px;}#wunderlist-base .social-links .icon{margin-top:-10px}"
}),
define("views/Settings/SettingsAboutView", ["application/runtime", "views/Settings/Controllers/SettingsAboutViewController", "views/Settings/SettingsSubview", "views/Settings/SettingsPrivacyPolicyView", "template!settings/settingsAbout", "style!settings/settingsAbout"], function(e, t, i, n, o, a) {
    var r = e.config
      , s = i.prototype;
    return i.extend({
        template: o,
        styles: [a],
        className: "settings-content-inner settings-about",
        "implements": [t],
        emits: {
            "click .toggle-privacy-policy": "click:privacyPolicy",
            "click a": "click:link"
        },
        initialize: function() {
            var e = this;
            s.initialize.apply(e, arguments),
            e.privacyView = e.addSubview(new n());
        },
        render: function() {
            var t = this
              , i = {
                release: r.release,
                showSocialButtons: e.user.showSocialButtons()
            };
            return s.render.call(t, i),
            t.privacyEl = t.$(".privacy-wrapper"),
            t.privacyEl.html(t.privacyView.render().el),
            t;
        },
        showTogglePrivacyPolicy: function() {
            var e = this;
            e.privacyEl.toggleClass("hidden"),
            e.privacyEl.hasClass("hidden") || e.defer(function() {
                e.privacyView.$el.focus();
            });
        }
    });
}),
define("/templates/settings/settingsGroupBilling.js", {
    name: "settings/settingsGroupBilling",
    data: {
        "1": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "group_billing_manage_team", {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "3": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_label_buy_wunderlist_for_business", {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = '<div class="group-billing"> <div class="hero-img"></div> <div class="separator noline center teams-heading"> <h2 class="strong">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "group_billing_packages_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h2> <p class="team-plan">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "group_billing_packages_text", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> <div class="separator noline"> <div class="cols"> <div class="col-20"></div> <div class="col-60"> <a href="' + s((a = t.domain || e && e.domain,
            typeof a === l ? a.call(e, {
                name: "domain",
                hash: {},
                data: n
            }) : a)) + '/business/admin" target="_blank" class="button big green go-to-business"> ';
            return o = t["if"].call(e, e && e.isAdmin, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.program(3, n),
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' </a> </div> <div class="col-20"></div> </div> </div> </div> ';
        },
        useData: !0
    }
}),
define("/styles/_groupBillingStyle.js", {
    name: "_groupBillingStyle",
    data: '#wunderlist-base .beta-disabled{pointer-events:none;opacity:.3;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";filter:alpha(opacity=30);-webkit-filter:blur(2px)}#wunderlist-base .beta-message{top:40%;position:absolute;text-align:center;}#wunderlist-base .beta-message h2{font-size:34px}#wunderlist-base .beta-message p{font-size:18px;line-height:28px}#wunderlist-base .beta-message a{color:#2b88d9}#wunderlist-base .service-unavailable .line:after{height:50% !important}#wunderlist-base .service-unavailable .line:before{height:50% !important}#wunderlist-base .group-billing{overflow:hidden;}#wunderlist-base .group-billing h2{font-size:21px;color:#423e3e;margin:14px 0 10px 0;text-shadow:0 1px 0 #fff}#wunderlist-base .group-billing h3{width:90%;margin:0 auto}#wunderlist-base .group-billing .cancelation-options.closed{display:none}#wunderlist-base .group-billing .show-delete-wrapper{margin:14px 0}#wunderlist-base .group-billing .hero-img{margin:0 auto;background-image:url("images/team-pro-hero.png");background-repeat:no-repeat;width:100%;height:170px;-webkit-background-size:cover;-moz-background-size:cover;background-size:cover;background-position:center center}#wunderlist-base .group-billing .offline{text-align:center !important;font-weight:bold}#wunderlist-base .group-billing .manage-team{padding-bottom:0 !important;}#wunderlist-base .group-billing .manage-team h3{font-size:16px !important;text-shadow:0 1px 0 #fff;margin-bottom:0 !important}#wunderlist-base .group-billing .manage-team .counter{color:#bdbcbb;font-weight:bold;font-size:12px;text-shadow:0 1px 0 #fff;}#wunderlist-base .group-billing .manage-team .counter.maxed{color:#c82525}#wunderlist-base .group-billing p{line-height:24px;color:#423e3e;width:90%;font-size:14px;margin:0 auto;text-shadow:0 1px 0 #fff;}#wunderlist-base .group-billing p.team-plan{font-size:14px !important;line-height:21px !important}#wunderlist-base .group-billing p.cancel-error{color:#f00 !important}#wunderlist-base .group-billing p.cancel-notice .token_0{font-weight:bold}#wunderlist-base .group-billing p a{color:#328ad6}#wunderlist-base .group-billing input{padding:8px;-webkit-border-radius:4px;border-radius:4px;width:95%;margin:0 auto;display:block}#wunderlist-base .group-billing button,#wunderlist-base .group-billing .button{color:#fff;margin-bottom:3px;}#wunderlist-base .group-billing button.manage-link,#wunderlist-base .group-billing .button.manage-link{color:#666 !important;margin:-14px 0 0 0;position:absolute;width:79px;height:29px;display:none}#wunderlist-base .group-billing button.view,#wunderlist-base .group-billing .button.view{color:#666 !important;font-size:13px;line-height:13px;padding-top:4px;margin:0 0 1px 8px;-webkit-border-radius:3px;border-radius:3px}#wunderlist-base .group-billing button.buy-plan,#wunderlist-base .group-billing .button.buy-plan{margin:-14px 0 0 -42px;right:192px;position:absolute;width:120px;line-height:0;height:25px;height:29px;font-size:12px;-webkit-border-radius:3px;border-radius:3px}#wunderlist-base .group-billing button.upgrade,#wunderlist-base .group-billing .button.upgrade{font-size:13px;line-height:13px;padding-top:7px;margin:0 0 1px 8px;-webkit-border-radius:3px;border-radius:3px}#wunderlist-base .group-billing button.cancel-terms-of-use,#wunderlist-base .group-billing .button.cancel-terms-of-use,#wunderlist-base .group-billing button.return-cancel,#wunderlist-base .group-billing .button.return-cancel,#wunderlist-base .group-billing button.return-change,#wunderlist-base .group-billing .button.return-change{color:#423e3e}#wunderlist-base .group-billing .button-wrapper,#wunderlist-base .group-billing .manage{padding-right:0 !important}#wunderlist-base .group-billing .alert-image{text-align:right}#wunderlist-base .group-billing .plan-change .change-btn-group{margin:10px 0}#wunderlist-base .group-billing .plan-change p{font-size:14px !important;line-height:21px !important;font-weight:normal}#wunderlist-base .group-billing .member-count-response{text-align:center;color:#d62822;}#wunderlist-base .group-billing .member-count-response a{color:#d62822;font-weight:bold}#wunderlist-base .group-billing .buy-options .center{text-align:center;font-size:13px;font-weight:normal;margin-bottom:10px;line-height:17px !important;}#wunderlist-base .group-billing .buy-options .center.error{color:#c82525}#wunderlist-base .group-billing .manage{margin-top:8px !important;text-decoration:none !important;}#wunderlist-base .group-billing .manage .contacts.slots-free li .invitable{opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);}#wunderlist-base .group-billing .manage .contacts.slots-free li .invitable .state{display:none}#wunderlist-base .group-billing .manage .group:first-child{background:none}#wunderlist-base .group-billing .manage li .name{color:#262626}#wunderlist-base .group-billing .manage li .description{color:$linkblue}#wunderlist-base .group-billing .manage li .state{float:right;position:relative;}#wunderlist-base .group-billing .manage li .state.add-pro-teammate{opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);}#wunderlist-base .group-billing .manage li .state.add-pro-teammate:hover{opacity:1;-ms-filter:none;filter:none}#wunderlist-base .group-billing .manage li .state.save{color:#2b88d9;}#wunderlist-base .group-billing .manage li .state.save:hover:before{content:\'5\'}#wunderlist-base .group-billing .manage li .pro-small{position:absolute;right:-8px;top:-5px;z-index:9999}#wunderlist-base .group-billing .manage li::after{content:\'\';width:90%;height:1px;margin-top:-10px;position:absolute;background-image:-webkit-linear-gradient(left, #fff 0%, #dedede 50%, #fff 100%);background-image:-moz-linear-gradient(left, #fff 0%, #dedede 50%, #fff 100%);background-image:-o-linear-gradient(left, #fff 0%, #dedede 50%, #fff 100%);background-image:-ms-linear-gradient(left, #fff 0%, #dedede 50%, #fff 100%);background-image:linear-gradient(to right, #fff 0%, #dedede 50%, #fff 100%);background-repeat:no-repeat}#wunderlist-base .group-billing .manage li:last-child:after{height:0}#wunderlist-base .group-billing .groups{width:430px;margin:15px auto 15px auto;background:#fff;border:1px solid #cdcdcd;-webkit-border-radius:4px;border-radius:4px;color:#7d7b7c;position:relative;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.1);box-shadow:0 1px 1px rgba(0,0,0,0.1);font-size:14px;font-weight:normal;}#wunderlist-base .group-billing .groups.products .state{margin:0 11px 0 10px}#wunderlist-base .group-billing .groups.line:after{content:\'\';position:absolute;width:1px;height:87.5%;border-left:1px solid #cdcdcd;right:25%;top:0}#wunderlist-base .group-billing .groups.line-save:before{content:\'\';position:absolute;width:1px;height:87.5%;border-left:1px solid #cdcdcd;right:42%;top:0;z-index:99999}#wunderlist-base .group-billing .groups.summary{margin-bottom:10px;padding-top:3px;padding-bottom:3px;}#wunderlist-base .group-billing .groups.summary .group:first-child{-webkit-border-radius:4px !important;border-radius:4px !important;background:none !important}#wunderlist-base .group-billing .groups.summary:after{right:50%;height:100%}#wunderlist-base .group-billing .groups .group{padding-top:15px;padding-bottom:15px;text-align:left;margin-bottom:0 !important;border-top:1px solid #cdcdcd;position:relative;overflow:hidden;}#wunderlist-base .group-billing .groups .group.group-item.has-savings:hover{cursor:pointer;background:#f8fbfe;border-top:1px solid #dae8f7;border-bottom:1px solid #dae8f7;}#wunderlist-base .group-billing .groups .group.group-item.has-savings:hover:last-child{border-bottom:none !important;border-bottom-left-radius:4px;border-bottom-right-radius:4px}#wunderlist-base .group-billing .groups .group.group-item.has-savings:hover + .group{border-top:none !important;}#wunderlist-base .group-billing .groups .group.group-item.has-savings:hover + .group.selected{border-top:1px solid #b4d3e6 !important;margin-top:-1px}#wunderlist-base .group-billing .groups .group div.name span,#wunderlist-base .group-billing .groups .group div.name .token_0{font-weight:bold;min-width:25px;display:inline-block;text-align:center}#wunderlist-base .group-billing .groups .group div.price{text-align:center;color:#2b88d9;font-weight:bold;font-size:17px;line-height:15px;padding-right:0 !important}#wunderlist-base .group-billing .groups .group div.save{text-align:center;color:#fff;font-size:17px;font-weight:bold;position:relative;z-index:99;}#wunderlist-base .group-billing .groups .group div.save.amount{color:#94b978;font-weight:bold;font-size:16px;line-height:0}#wunderlist-base .group-billing .groups .group div.save .highlight{position:absolute;margin-left:-27px;margin-top:-5px;z-index:-50}#wunderlist-base .group-billing .groups .group div.accounts-summary{font-weight:normal;font-size:15px;line-height:15px;}#wunderlist-base .group-billing .groups .group div.accounts-summary .token_0{font-weight:bold}#wunderlist-base .group-billing .groups .group div.large-team{font-size:14px;color:#666;text-align:center;display:inline-block;font-weight:bold;}#wunderlist-base .group-billing .groups .group div.large-team a{display:inline-block;color:#2b88d9}#wunderlist-base .group-billing .groups .group .savings{position:absolute;font-size:10px;right:-70px;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);z-index:9999;display:block;margin-top:-4px}#wunderlist-base .group-billing .groups .group.headings{cursor:default;}#wunderlist-base .group-billing .groups .group.headings .team-heading{line-height:1;font-size:15px}#wunderlist-base .group-billing .groups .group.headings .price{line-height:17px;color:#737272;}#wunderlist-base .group-billing .groups .group.headings .price span{display:block;font-size:11px;font-weight:normal;color:#a3a3a2}#wunderlist-base .group-billing .groups .group:first-child{border-top-left-radius:4px;border-top-right-radius:4px;font-weight:bold;border-top:none !important;background:#fbfbfb !important;padding-top:6px;padding-bottom:5px;}#wunderlist-base .group-billing .groups .group:first-child.input-container{background:none !important;position:relative;}#wunderlist-base .group-billing .groups .group:first-child.input-container input{margin-top:5px;padding-right:30px}#wunderlist-base .group-billing .groups .group:first-child.input-container .clear{position:absolute;right:18px;top:18px}#wunderlist-base .group-billing .groups .group.search-container{border-top:none;padding-top:4px;padding-bottom:0;}#wunderlist-base .group-billing .groups .group.search-container .info-container{margin:-3px 0 20px 4px;vertical-align:top;}#wunderlist-base .group-billing .groups .group.search-container .info-container .name{font-weight:bold;font-size:13px;margin-top:2px}#wunderlist-base .group-billing .groups .group.search-container .info-container .description{margin-top:3px;font-size:11px;}#wunderlist-base .group-billing .groups .group.search-container .info-container .description.empty-name{font-size:13px;margin-top:10px;font-weight:bold}#wunderlist-base .group-billing .groups .group.search-container .info-container .description a{display:block;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}#wunderlist-base .group-billing .groups .group.search-container .error-already-pro{color:#d62822;padding:20px}#wunderlist-base .group-billing .groups .group.selected{border-top:1px solid #b4d3e6 !important;background:#e2f1fb !important;border-bottom:1px solid #b4d3e6 !important;}#wunderlist-base .group-billing .groups .group.selected:last-child{border-bottom:none !important;border-bottom-left-radius:4px;border-bottom-right-radius:4px}#wunderlist-base .group-billing .groups .group.selected + .group{border-top:none !important}#wunderlist-base .group-billing .groups .group.current .manage-link{display:block !important}#wunderlist-base .group-billing .groups .group.current .buy-plan{display:none !important}#wunderlist-base .group-billing .groups .group .owned{height:21px;margin-top:-7px;background-position:-260px -66px;cursor:default}#wunderlist-base .group-billing .groups .group .coachmark-text{font-size:12px;color:#bdbcbb;text-align:center;width:300px;line-height:17px;margin:0 auto;padding-bottom:20px}@media only screen and (-webkit-min-device-pixel-ratio:1.5),only screen and (min--moz-device-pixel-ratio:1.5){#wunderlist-base .group-billing .hero-img{background-image:url("images/team-pro-hero@2x.png")}}'
}),
define("views/Settings/GroupBillingOutlet", ["application/runtime", "wunderbits/WBViewPresenter", "template!settings/settingsGroupBilling", "style!_groupBillingStyle"], function(e, t, i, n, o) {
    var a = e.config
      , r = t.prototype;
    return t.extend({
        template: i,
        className: "settings-content-inner",
        styles: [n],
        observes: {
            runtime: {
                "language:change": "render"
            }
        },
        renderData: {
            isAdmin: o,
            domain: ""
        },
        formatData: function(t) {
            var i = this;
            return t = r.formatData.call(i, t),
            t.isAdmin = e.user.isProTeamAdmin(),
            e.env.isChromeApp() && (t.domain = "https://" + (a.domain_name || "www.wunderlist.com")),
            t;
        }
    });
}),
define("views/Settings/Controllers/SettingsViewController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBModalViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        trackableElementName: "Settings",
        "implements": {
            "click:tab": "onSelectSubview",
            "keydown:tab": "handleKeys"
        },
        onSelectSubview: function(t) {
            var i = this
              , o = i.view
              , a = n(t.target).closest("a").attr("rel");
            "teams" === a && e.user.isProTeamAdmin() && (a = "team-manage"),
            e.trigger("analytics:Preferences:clickTab", a),
            e.trigger("route:preferences/" + a),
            o.accountView && !o.accountView.destroyed && o.accountView.closeAllEdits();
        },
        handleKeys: function(e) {
            var i = this;
            e.which === t.tab && i.handleTabKey(e);
        },
        handleTabKey: function(e) {
            var t = this.view;
            e.shiftKey || t.getSubview(t.currentSection).$(".tabStart").focus(),
            e.preventDefault(),
            e.stopPropagation();
        }
    });
}),
define("/templates/settings/settings.js", {
    name: "settings/settings",
    data: {
        "1": function() {
            return " hidden ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="tabs"> <ul role="tabpanel"> <li role="tab" tabindex="0" tabindex="0" data-key-aria-label="settings_heading_general"> <a rel="general"> <span class="icon settings-general"></span> <span class="tab-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_heading_general", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li role="tab" tabindex="0"data-key-aria-label="settings_heading_account"> <a rel="account"> <span class="icon settings-account"></span> <span class="tab-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_heading_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li class="teams ';
            return o = t["if"].call(e, e && e.isMember, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '" role="tab" tabindex="0" data-key-aria-label="settings_heading_team" data-key-aria-label=""> <a rel="team-manage"> <span class="icon settings-group"></span> <span class="tab-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_heading_team", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li role="tab" tabindex="0" data-key-aria-label="" data-key-aria-label="settings_heading_shortcuts"> <a rel="shortcuts"> <span class="icon settings-shortcuts"></span> <span class="tab-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_heading_shortcuts", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li role="tab" tabindex="0" data-key-aria-label="" data-key-aria-label="settings_heading_sidebar"> <a rel="sidebar"> <span class="icon settings-sidebar"></span> <span class="tab-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_heading_sidebar", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li role="tab" tabindex="0" data-key-aria-label="" data-key-aria-label="settings_heading_notification"> <a rel="notifications"> <span class="icon settings-notifications"></span> <span class="tab-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_heading_notification", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li role="tab" tabindex="0" data-key-aria-label="settings_heading_about"> <a rel="about"> <span class="icon settings-about"></span> <span class="tab-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_heading_about", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> </a> </li> </ul> </div> ";
        },
        useData: !0
    }
}),
define("/styles/modals/settingsModal.js", {
    name: "modals/settingsModal",
    data: '#settings{width:700px;overflow:auto;}#settings .settings-content-inner-wrapper{padding:0 14px;overflow:auto;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}#settings .content{-webkit-box-orient:horizontal;-moz-box-orient:horizontal;-o-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}#settings .manage{color:#328ad6;text-decoration:underline}#settings .pro-section-style h3{font-size:24px;font-weight:600;margin-bottom:10px;color:#544f4f;}#settings .pro-section-style h3.upgrade-header,#settings .pro-section-style h3.yay-pro{font-weight:normal;}#settings .pro-section-style h3.upgrade-header .token_0,#settings .pro-section-style h3.yay-pro .token_0{font-weight:bold}#settings .pro-section-style .teams{margin-top:10px}#settings .pro-section-style p{color:#737272;text-shadow:0 1px 0 #fff;margin-bottom:11px;line-height:17px}#settings .pro-section-style b{display:block}#settings .pro-section-style .accept-terms a{font-weight:bold;color:#737272}#settings .pro-benefits div.benefit{background:url("images/sprites/benefits.png");}#settings .pro-benefits div.benefit.assigning{background-position:0 0;width:134px;height:102px}#settings .pro-benefits div.benefit.subtasks{background-position:-134px -102px;width:134px;height:102px}#settings .pro-benefits div.benefit.backgrounds{background-position:-134px 0;width:134px;height:102px}#settings .pro-benefits div.benefit.attachments{background-position:0 -102px;width:134px;height:102px;margin-left:1px}#settings .pro-benefits h4{font-size:16px;margin-bottom:6px;}#settings .pro-benefits h4 span.light{font-weight:200;font-size:14px}#settings .pro-benefits p{width:270px;font-size:13px;line-height:17px;color:#737272}#settings .filter-setting .label,#settings .filter-setting svg{vertical-align:middle}#settings .filter-setting svg{margin-right:10px}#settings .filter-setting.disabled .label,#settings .filter-setting.disabled svg{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60)}#settings .filter-setting.disabled select{pointer-events:auto}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){#settings .pro-benefits div.benefit{background-image:url("images/sprites/benefits-retina.png");-webkit-background-size:268px;-moz-background-size:268px;background-size:268px}}html[dir=rtl] #settings .filter-setting .wundercon{margin-right:0;margin-left:10px}'
}),
define("views/Settings/SettingsView", ["application/runtime", "helpers/Auth/facebook", "wunderbits/WBModalView", "wunderbits/WBBlurHelper", "views/Settings/SettingsGeneralView", "views/Settings/SettingsAccountView", "views/Settings/SettingsFiltersView", "views/Settings/SettingsShortcutsView", "views/Settings/SettingsNotificationsView", "views/Settings/SettingsAboutView", "views/Settings/GroupBillingOutlet", "views/Settings/Controllers/SettingsViewController", "template!settings/settings", "style!modals/settingsModal"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g) {
    var f = e._
      , b = e.$
      , h = i.prototype
      , v = n
      , _ = [{
        name: "general",
        "const": o
    }, {
        name: "account",
        "const": a
    }, {
        name: "shortcuts",
        "const": s
    }, {
        name: "sidebar",
        "const": r
    }, {
        name: "notifications",
        "const": l
    }, {
        name: "about",
        "const": c
    }, {
        name: "team-manage",
        "const": d
    }];
    return i.extend({
        template: m,
        styles: [p],
        "implements": [u],
        emits: {
            "click .tabs li a": "click:tab",
            "keydown .tabs li": "keydown:tab"
        },
        observes: {
            runtime: {
                "subscriptions:ready": "updateTeamsTab"
            }
        },
        renderData: {
            isMember: g
        },
        initialize: function(t) {
            var i = this;
            i.subViewMap = _.slice(0),
            e.user.isProTeamAdmin() ? i.subViewMap.splice(2, 0, {
                name: "team-manage",
                "const": d
            }) : i.subViewMap.splice(2, 0, {
                name: "teams",
                "const": d
            }),
            e.user.isProTeamMember() && !e.user.isProTeamAdmin() && i.subViewMap.splice(7, 1),
            i._isRendered = !1,
            t || (t = {}),
            h.initialize.apply(i, arguments),
            i.bindTo(e, "settings:navigate", i.navigate),
            i.bindTo(e, "settings:close", i.onSettingsClose),
            i.bindTo(e.user, "change:pro", function() {
                i.updateTeamsTab(),
                i.render();
            }),
            i.bindTo(e, "settings:section", i.renderWithSection);
        },
        formatData: function(t) {
            var i = e.user;
            return t.isMember = i.isProTeamMember(),
            t;
        },
        render: function() {
            var t = this
              , i = {
                id: "settings",
                close: e.language.getText("button_done")
            };
            if (!t._isRendered) {
                h.render.call(t, i);
                var n = b(t.template(t.formatData(t.renderData)))[0]
                  , o = t.$(".content");
                o[0].appendChild(n);
                var a = b(document.createElement("div"));
                return a.addClass("settings-content-inner-wrapper"),
                o[0].appendChild(a[0]),
                t._isRendered = !0,
                t.renderLocalized(),
                t.updateTeamsTab(),
                t;
            }
        },
        renderWithSection: function(t, i) {
            var n = this;
            n.currentSection = t,
            v.run(),
            n.render(),
            n.onClose = n.onClose || i && i.onClose,
            n.returnFocus = e.focus;
            var o;
            f.each(n.subViewMap, function(e) {
                e.name !== t && (o = n[e.name + "View"],
                o && !o.destroyed && o.destroy());
            });
            var a = "account-pro" === t ? "account" : t;
            "teams" === a && e.user.isProTeamAdmin() && (a = t = "team-manage");
            var r = f.where(n.subViewMap, {
                name: a
            })[0];
            if (!r)
                return e.trigger("route:preferences/account");
            var s = n[r.name + "View"];
            (!s || s.destroyed) && (s = n[r.name + "View"] = n.addSubview(new r["const"](g,i), r.name),
            s.render(),
            n.$(".settings-content-inner-wrapper")[0].appendChild(s.el),
            n.bindToSubview(s)),
            "account-pro" === t ? (t = "account",
            n.accountView && (n.accountView.subscriptionView.render(),
            n.accountView.subscriptionView.showBenefits(),
            n.defer(function() {
                n.accountView.subscriptionView.$(".tabStart").focus();
            }))) : n.accountView && n.accountView.subscriptionView && n.accountView.subscriptionView.hideBenefits(),
            n.showRenderedSection(t);
        },
        bindToSubview: function(e) {
            var t = this;
            t.bindTo(e, "focus:tab", t.refocusTab);
        },
        refocusTab: function() {
            var e = this;
            e.$(".tabs li.active").focus();
        },
        showRenderedSection: function(t) {
            var i = this;
            i[t + "View"] && i[t + "View"].$el.removeClass("hidden"),
            i.$(".active").removeClass("active"),
            i.$("a[rel=" + t + "]").parent().addClass("active").focus(),
            i.$(".settings-content-inner-wrapper").scrollTop(0),
            i.$(".settings-content-inner").addClass(t),
            ("teams" === t || "notifications" === t) && (t = t.substring(0, t.length - 1)),
            e.trigger("title:set", t, {
                isPrefsTabKey: !0
            });
        },
        onSettingsClose: function() {
            var e = this;
            e.isVisible() && e.trigger("click:close");
        },
        onRemove: function() {
            var e = this;
            f.each(e.subViewMap, function(t) {
                e[t.name + "View"] = null;
            });
        },
        updateTeamsTab: function() {
            var t = this
              , i = !0;
            e.user.isProTeamMember() && !e.user.isProTeamAdmin() && (i = !1,
            t.currentSection && t.currentSection.indexOf("team") >= 0 && t.renderWithSection("account")),
            t.$("li.teams").toggleClass("hidden", !i);
        },
        navigate: function(t) {
            var i, n, o = this, a = f.pluck(o.subViewMap, "name"), r = "team-manage" === o.currentSection ? "teams" : o.currentSection, s = f.indexOf(a, r);
            "down" === t ? i = s + 1 <= a.length - 2 ? s + 1 : 0 : "up" === t && (i = s - 1 >= 0 ? s - 1 : a.length - 2),
            ("down" === t || "up" === t) && (n = "teams" === a[i] && e.user.isProTeamAdmin() ? "team-manage" : a[i],
            v.run(),
            e.trigger("route:preferences/" + n),
            o.accountView && !o.accountView.destroyed && o.accountView.closeAllEdits());
        }
    });
}),
define("views/Main/ModalManagerView", ["application/runtime", "wunderbits/WBViewPresenter", "labs/FlashCards/FlashCardsModalView", "labs/LabsView", "views/Social/RateModalView", "views/Social/TellModalView", "views/Debug/DebugModalView", "views/Modals/ConfirmationModalView", "views/Modals/ListOptionsModalView", "views/Modals/ChooseBackgroundModalView", "views/Modals/ChooseListsModalView", "views/Modals/ChooseBusinessListsModalView", "views/Modals/GoProModalView", "views/Reminders/RemindersView", "views/Settings/SettingsView"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g) {
    var f = t.prototype;
    return t.extend({
        id: "modals",
        modalClasses: {
            flashCards: i,
            labs: n,
            rate: o,
            tell: a,
            debug: r,
            confirm: s,
            preferences: g,
            listOptions: l,
            backgrounds: c,
            goPro: m,
            chooseLists: d,
            chooseBusinessLists: u
        },
        observes: {
            runtime: {
                "modal:show": "showModal",
                "modal:close": "closeModal",
                "modal:confirm": "showConfirmation"
            }
        },
        render: function() {
            var e = this;
            f.render.apply(e, arguments);
            var t = e.addSubview(new p(), "reminders");
            return e.$el.append(t.render().el),
            e;
        },
        showConfirmation: function(e) {
            var t = this;
            t.showModal("confirm", e);
        },
        closeModal: function() {
            var e = this
              , t = e.getSubview("modal");
            t && t.trigger("close");
        },
        showModal: function(e, t) {
            var i = this
              , n = i.modalClasses[e];
            t.name = e;
            var o = i.getSubview("modal");
            o || (o = i.addSubview(new n(t), "modal"),
            o.name = e,
            i.el.appendChild(o.render().el)),
            o.trigger("modal:update", t);
        }
    });
}),
define("/templates/symbols/accept.js", {
    name: "symbols/accept",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="accept" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="accept-invite" fill="#000000"> <path d="M7.48,17 C7.36,17 7.24,16.94 7.14,16.86 C5.66,15.36 4,14.04 2.24,12.92 C2,12.78 1.92,12.46 2.08,12.24 C2.22,12 2.54,11.94 2.76,12.08 C4.42,13.12 5.98,14.34 7.38,15.7 C10.34,10.82 13.38,6.92 17.14,3.14 C17.34,2.96 17.66,2.96 17.86,3.14 C18.04,3.34 18.04,3.66 17.86,3.86 C14,7.7 10.94,11.68 7.92,16.76 C7.84,16.88 7.7,16.98 7.56,17 L7.48,17 Z" id="H"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/pendingInviteItem.js", {
    name: "pendingInviteItem",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return '<div class="avatar-container"> </div> <div class="invite-text"> <div class="title">' + r((o = t.title || e && e.title,
            typeof o === a ? o.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : o)) + '</div> <div class="from">from ' + r((o = t.inviter || e && e.inviter,
            typeof o === a ? o.call(e, {
                name: "inviter",
                hash: {},
                data: n
            }) : o)) + '</div> </div> <div class="buttonbar invite-buttons"> <button class="reject" tabindex="0" data-key-aria-label="button_delete">' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</button> <button class="accept" tabindex="0" data-key-aria-label="button_confirm">' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "accept", {
                name: "symbol",
                hash: {},
                data: n
            }))) + "</button> </div>";
        },
        useData: !0
    }
}),
define("/styles/pendingInviteItem.js", {
    name: "pendingInviteItem",
    data: ".sidebarItem.pendingInvite{height:48px;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;}.sidebarItem.pendingInvite.selected{background:#328ad6;}.sidebarItem.pendingInvite.selected .title,.sidebarItem.pendingInvite.selected .from{color:#fafafa}.sidebarItem.pendingInvite.selected button svg{fill:#1c1c1c}.sidebarItem.pendingInvite svg{position:static}.sidebarItem.pendingInvite .avatar-container,.sidebarItem.pendingInvite .invite-buttons{padding:10px;}.sidebarItem.pendingInvite .avatar-container button,.sidebarItem.pendingInvite .invite-buttons button{width:50%;padding:1px 10px;}.sidebarItem.pendingInvite .avatar-container button svg,.sidebarItem.pendingInvite .invite-buttons button svg{margin:-5px 0}.sidebarItem.pendingInvite .invite-text{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1 auto;-ms-flex:1 auto;flex:1 auto;padding:10px 0}.sidebarItem.pendingInvite .title,.sidebarItem.pendingInvite .from{color:#737272;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;max-width:114px;line-height:16px}.sidebarItem.pendingInvite .title{font-weight:700}.sidebarItem.pendingInvite .from{font-size:12px}@media all and (max-width:1000px){.sidebarItem.pendingInvite .title,.sidebarItem.pendingInvite .from{max-width:50px}}"
}),
define("views/Sidebar/PendingInviteItemView", ["actions/Factory", "views/AvatarView", "wunderbits/mixins/UnicodeEmojiViewMixin", "wunderbits/WBViewPresenter", "partial!symbols/accept", "partial!symbols/delete", "template!pendingInviteItem", "style!pendingInviteItem"], function(e, t, i, n, o, a, r, s, l) {
    var c = n.prototype
      , d = n.extend({
        className: "sidebarItem pendingInvite",
        tagName: "li",
        attributes: {
            tabindex: 0
        },
        template: r,
        styles: [s],
        renderData: {
            inviter: l,
            title: l
        },
        observes: {
            users: {
                add: "onUserAdd"
            }
        },
        formatData: function(e) {
            var t = this;
            e = c.formatData.call(t, e);
            var i = t.users.get(t.membership.attributes.sender_id);
            return e.inviter = i ? i.attributes.name : "Someone",
            e.title = t.list.attributes.title,
            t.data = e,
            e;
        },
        initialize: function(t) {
            var i = this;
            i.users = e.userLookup().allUsers,
            i.membership = t.membership,
            i.list = t.list,
            c.initialize.apply(i, arguments);
        },
        render: function() {
            var e = this;
            c.render.call(e, e.formatData(e.renderData));
            var i = e.membership.attributes
              , n = new t({
                size: "almostmedium"
            });
            return n.render({
                id: i.sender_id
            }),
            e.addSubview(n, "avatarView"),
            e.$(".avatar-container")[0].appendChild(n.el),
            e.$el.attr("rel", i.id),
            e.$el.attr("title", e.data.title + " from " + e.data.inviter),
            e.renderEmoji(e.$el),
            e.hasRenderedOnce = !0,
            e;
        },
        onUserAdd: function() {
            var e = this;
            if (!e.destroyed && e.hasRenderedOnce) {
                var t = e.users.get(e.membership.attributes.sender_id);
                t && e.render();
            }
        }
    });
    return i.applyToClass(d),
    d;
}),
define("views/Sidebar/Controllers/PendingInviteController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController"], function(e, t, i) {
    var n = e.$
      , o = i.prototype;
    return i.extend({
        "implements": {
            "click:accept": "acceptMembership",
            "click:reject": "rejectMembership"
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(e, arguments),
            e.listLookup = t.listLookup(),
            e.lists = e.listLookup.allLists,
            e.sortableLists = e.listLookup.sortableLists,
            e.memberships = t.membershipLookup().allMemberships;
        },
        acceptMembership: function(t) {
            var i = this
              , n = i.getMembershipFromClick(t);
            if (n) {
                n.save({
                    state: "accepted"
                });
                var o = i.lists.get(n.attributes.list_id);
                o && o.save("position", i.sortableLists.getFirstPosition()),
                o && e.trigger("route:" + o.route());
            }
        },
        rejectMembership: function(e) {
            var t = this
              , i = t.getMembershipFromClick(e);
            t.view.selectNextInvite(i),
            i.destroy();
        },
        getMembershipFromClick: function(e) {
            var t = this
              , i = n(e.target).closest(".pendingInvite").attr("rel")
              , o = i && t.memberships.get(i);
            return o;
        }
    });
}),
define("views/Sidebar/PendingInvitesCollectionView", ["application/runtime", "actions/Factory", "views/Sidebar/PendingInviteItemView", "views/Sidebar/Controllers/PendingInviteController", "wunderbits/WBViewPresenter"], function(e, t, i, n, o) {
    var a = o.prototype;
    return o.extend({
        tagName: "ul",
        className: "pending-invites-collection",
        "implements": [n],
        emits: {
            "click .reject": "click:reject",
            "click .accept": "click:accept"
        },
        observes: {
            pendingMemberhips: {
                "change:isReady": "handlePendingMembershipReady",
                remove: "handleMembershipRemove"
            },
            pendingLists: {
                add: "handleListAdd"
            }
        },
        initialize: function() {
            var e = this;
            e.membershipLookup = t.membershipLookup(),
            e.pendingMemberhips = e.membershipLookup.getPendingMemberships(),
            e.pendingLists = t.listLookup().pendingLists,
            a.initialize.apply(e, arguments);
        },
        render: function() {
            var e = this;
            a.render.apply(e, arguments);
            var t = e.renderInvitesToFragment();
            return e.el.appendChild(t),
            e;
        },
        renderInvitesToFragment: function() {
            var e = this
              , t = document.createDocumentFragment();
            return e.pendingMemberhips.models.forEach(function(i) {
                var n = e.getSingleInviteView(i);
                n && t.appendChild(n.el);
            }),
            t;
        },
        getSingleInviteView: function(e) {
            var t, n = this;
            n.destroySubview(e.id);
            var o = n.pendingLists.get(e.attributes.list_id);
            return e.isReady() && o && (t = new i({
                membership: e,
                list: o
            }),
            n.addSubview(t, e.id),
            t.render()),
            t;
        },
        appendSingleInvite: function(e) {
            var t = this
              , i = t.getSingleInviteView(e);
            i && t.$el.prepend(i.el);
        },
        handlePendingMembershipReady: function(e) {
            e.isReady() && this.appendSingleInvite(e);
        },
        selectNextInvite: function(t) {
            var i = this
              , n = i.$("li")
              , o = i.$('[rel="' + t.id + '"]').addClass("destroyed")
              , a = n.index(o)
              , r = n.get(a - 1);
            r ? r.classList.add("active", "selected") : e.trigger("route:lists/inbox");
        },
        handleListAdd: function(e) {
            var t = this
              , i = t.membershipLookup.getOwnMembershipModelForList(e.id);
            i && i.isReady() && t.appendSingleInvite(i);
        },
        handleMembershipRemove: function(e) {
            this.destroySubview(e.id);
        }
    });
}),
define("wunderbits/helpers/selection", ["../lib/dependencies", "project!core"], function(e, t) {
    var i = e.$;
    return t.WBSingleton.extend({
        setSelectionRange: function(e, t, i) {
            var n;
            if (e.setSelectionRange) {
                e.focus();
                try {
                    e.setSelectionRange(t, i);
                } catch (o) {
                    console.error("unable to set selection range", o);
                }
            } else
                e.createTextRange && (n = e.createTextRange(),
                n.collapse(!0),
                n.moveEnd("character", i),
                n.moveStart("character", t),
                n.select());
        },
        setCaretToPos: function(e, t) {
            var i = this;
            i.setSelectionRange(e, t, t);
        },
        setCaretByClick: function(e, t, i) {
            var n = this
              , o = n.getCaretFromMousePos(e, t, i);
            n.setCaretToPos(e, o);
        },
        getCaretFromMousePos: function(e, t, n) {
            var o = i(e)
              , a = i(t)
              , r = a.height()
              , s = a.offset().top
              , l = s + r / 2
              , c = n.pageY
              , d = 0;
            if (c > l) {
                var u = o.val();
                d = u ? u.length : 0;
            }
            return d;
        },
        getCaretPos: function(e) {
            var t, i, n;
            return e.setSelectionRange ? t = e.selectionStart : document.selection && document.selection.createRange && (i = document.selection.createRange(),
            n = i.getBookmark(),
            t = n.charCodeAt(2) - 2),
            t;
        },
        getSelectedText: function() {
            var e = "";
            if (window.getSelection) {
                if (e = window.getSelection().toString(),
                !e && document.activeElement && document.activeElement.value && "string" == typeof document.activeElement.value) {
                    var t = document.activeElement;
                    e = t.value.substring(t.selectionStart, t.selectionEnd);
                }
            } else
                document.getSelection ? e = document.getSelection().toString() : document.selection && (e = document.selection.createRange().text);
            return e;
        }
    });
}),
define("/templates/sidebarItem.js", {
    name: "sidebarItem",
    data: {
        "1": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="label" aria-hidden="true">' + r((o = t.iconLabel || e && e.iconLabel,
            typeof o === a ? o.call(e, {
                name: "iconLabel",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "3": function() {
            return ' <span class="overdue-count" aria-hidden="true"></span> <span class="count" aria-hidden="true"></span> ';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = t.helperMissing, c = '<a href="' + s((a = t.url || e && e.url,
            typeof a === r ? a.call(e, {
                name: "url",
                hash: {},
                data: n
            }) : a)) + '" aria-hidden="true"> <span class="list-icon">' + s((a = t.symbol || e && e.symbol || l,
            a.call(e, e && e.icon, {
                name: "symbol",
                hash: {},
                data: n
            }))) + "</span> ";
            return o = t["if"].call(e, e && e.todaySmartList, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' <span class="title">',
            a = t.title || e && e.title,
            o = typeof a === r ? a.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (c += o),
            c += "</span> ",
            o = t.unless.call(e, e && e.completedSmartList, {
                name: "unless",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' <span class="list-options" data-key-aria-label="sharing_list_options" data-key-title="sharing_list_options">' + s((a = t.symbol || e && e.symbol || l,
            a.call(e, "options", {
                name: "symbol",
                hash: {},
                data: n
            }))) + "</span> </a> ";
        },
        useData: !0
    }
}),
define("/templates/symbols/all.js", {
    name: "symbols/all",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="all" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <g transform="translate(1.000000, 5.000000)"> <path d="M10.04,7.78 C9.88,7.56 10.16,7.1 10.16,7.1 L9.44,5.24 C9.44,5.24 6.92,10 4.5,10 C2.02,10 0,7.76 0,5 C0,2.24 2.02,0 4.5,0 C6.22,0 7.3,1.26 7.96,2.22 C8.12,2.44 7.84,2.92 7.84,2.92 L8.56,4.76 C8.56,4.76 11.08,0 13.5,0 C15.98,0 18,2.24 18,5 C18,7.76 15.98,10 13.5,10 C11.78,10 10.7,8.74 10.04,7.78 Z" fill-opacity="0.06"></path> <path d="M13.5,10 C11.78,10 10.7,8.74 10.04,7.78 C9.88,7.56 9.94,7.24 10.16,7.1 C10.38,6.94 10.7,6.98 10.86,7.22 C11.72,8.44 12.54,9 13.5,9 C15.42,9 17,7.2 17,5 C17,2.8 15.42,1 13.5,1 C11.68,1 10.6,3.06 9.44,5.24 C8.2,7.58 6.92,10 4.5,10 C2.02,10 0,7.76 0,5 C0,2.24 2.02,0 4.5,0 C6.22,0 7.3,1.26 7.96,2.22 C8.12,2.44 8.06,2.76 7.84,2.92 C7.62,3.06 7.3,3.02 7.14,2.78 C6.28,1.56 5.46,1 4.5,1 C2.58,1 1,2.8 1,5 C1,7.2 2.58,9 4.5,9 C6.32,9 7.4,6.94 8.56,4.76 C9.8,2.42 11.08,0 13.5,0 C15.98,0 18,2.24 18,5 C18,7.76 15.98,10 13.5,10 L13.5,10 Z"></path> </g> </g> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/inbox.js", {
    name: "symbols/inbox",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="inbox" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <path d="M10,15 C8.8,15 7.78,14.14 7.56,13 L2.5,13 C2.22,13 2,12.78 2,12.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,12.5 C18,12.78 17.78,13 17.5,13 L12.44,13 C12.22,14.14 11.2,15 10,15 L10,15 Z M3,12 L8,12 C8.28,12 8.5,12.22 8.5,12.5 C8.5,13.32 9.18,14 10,14 C10.82,14 11.5,13.32 11.5,12.5 C11.5,12.22 11.72,12 12,12 L17,12 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,12 Z M5.5,6 C5.22,6 5,5.78 5,5.5 C5,5.22 5.22,5 5.5,5 L14.5,5 C14.78,5 15,5.22 15,5.5 C15,5.78 14.78,6 14.5,6 L5.5,6 Z M5.5,8 C5.22,8 5,7.78 5,7.5 C5,7.22 5.22,7 5.5,7 L14.5,7 C14.78,7 15,7.22 15,7.5 C15,7.78 14.78,8 14.5,8 L5.5,8 Z M5.5,10 C5.22,10 5,9.78 5,9.5 C5,9.22 5.22,9 5.5,9 L14.5,9 C14.78,9 15,9.22 15,9.5 C15,9.78 14.78,10 14.5,10 L5.5,10 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,14.5 C2,14.22 2.22,14 2.5,14 C2.78,14 3,14.22 3,14.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,14.5 C17,14.22 17.22,14 17.5,14 C17.78,14 18,14.22 18,14.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z" id="A"></path> </g> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/starred.js", {
    name: "symbols/starred",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="starred" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="starred"> <g id="Rectangle-3-+-A" transform="translate(1.000000, 0.000000)"> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z" id="C"></path> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z" id="D" opacity="0.06"> </path> </g> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/today.js", {
    name: "symbols/today",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="today" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="today"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z" id="E"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/week.js", {
    name: "symbols/week",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="week" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="week"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z M5.5,15 C5.22,15 5,14.78 5,14.5 L5,9.5 C5,9.22 5.22,9 5.5,9 C5.78,9 6,9.22 6,9.5 L6,14.5 C6,14.78 5.78,15 5.5,15 L5.5,15 Z M8.5,15 C8.22,15 8,14.78 8,14.5 L8,9.5 C8,9.22 8.22,9 8.5,9 C8.78,9 9,9.22 9,9.5 L9,14.5 C9,14.78 8.78,15 8.5,15 L8.5,15 Z M11.5,15 C11.22,15 11,14.78 11,14.5 L11,9.5 C11,9.22 11.22,9 11.5,9 C11.78,9 12,9.22 12,9.5 L12,14.5 C12,14.78 11.78,15 11.5,15 L11.5,15 Z M14.5,15 C14.22,15 14,14.78 14,14.5 L14,9.5 C14,9.22 14.22,9 14.5,9 C14.78,9 15,9.22 15,9.5 L15,14.5 C15,14.78 14.78,15 14.5,15 L14.5,15 Z" id="F"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/assigned.js", {
    name: "symbols/assigned",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="assigned" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <g id="Rectangle-3-+-A" transform="translate(1.000000, 2.000000)"> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z" fill-opacity="0.06"></path> <path d="M10,10 C12.28,10 14,6.84 14,4 C14,1.8 12.2,0 10,0 C7.8,0 6,1.8 6,4 C6,6.5 7.52,10 10,10 L10,10 Z M10,1 C11.66,1 13,2.34 13,4 C13,6.26 11.62,9 10,9 C8.34,9 7,6.26 7,4 C7,2.34 8.34,1 10,1 L10,1 Z M4.94,7.74 C4.98,7.66 5,7.58 5,7.5 C5,7.42 4.98,7.34 4.94,7.26 C4.92,7.22 4.9,7.18 4.86,7.14 L2.86,5.14 C2.66,4.96 2.34,4.96 2.14,5.14 C1.96,5.34 1.96,5.66 2.14,5.86 L3.3,7 L0.5,7 C0.22,7 0,7.22 0,7.5 C0,7.78 0.22,8 0.5,8 L3.3,8 L2.14,9.14 C1.96,9.34 1.96,9.66 2.14,9.86 C2.24,9.96 2.38,10 2.5,10 C2.62,10 2.76,9.96 2.86,9.86 L4.86,7.86 C4.9,7.82 4.92,7.78 4.94,7.74 L4.94,7.74 Z M16.76,12.88 C16.56,12 15.9,11.28 15.02,11.04 L12.72,10.36 C12.58,10.32 12.46,10.26 12.36,10.14 C12.16,9.96 11.84,9.96 11.66,10.16 C11.46,10.34 11.46,10.66 11.66,10.86 C11.88,11.08 12.14,11.24 12.44,11.32 L14.74,12 C15.26,12.14 15.66,12.58 15.78,13.1 L15.94,13.8 C15.4,14.16 13.7,15 10,15 C6.3,15 4.6,14.14 4.06,13.8 L4.22,13.04 C4.34,12.5 4.76,12.06 5.3,11.92 L7.54,11.32 C7.84,11.24 8.12,11.08 8.36,10.86 C8.54,10.66 8.54,10.34 8.36,10.14 C8.16,9.96 7.84,9.96 7.64,10.14 C7.54,10.24 7.42,10.32 7.28,10.36 L5.04,10.96 C4.14,11.2 3.46,11.92 3.24,12.82 L3.02,13.9 C2.98,14.06 3.02,14.24 3.14,14.36 C3.22,14.42 4.86,16 10,16 C15.14,16 16.78,14.42 16.86,14.36 C16.98,14.24 17.02,14.06 16.98,13.9 L16.76,12.88 Z"> </path> </g> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/list.js", {
    name: "symbols/list",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="list rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="list"> <path d="M3,7 C2.44,7 2,6.56 2,6 L2,5 C2,4.44 2.44,4 3,4 L4,4 C4.56,4 5,4.44 5,5 L5,6 C5,6.56 4.56,7 4,7 L3,7 Z M4,5 L3,5 L3,6 L4,6 L4,5 Z M7.5,6 C7.22,6 7,5.78 7,5.5 C7,5.22 7.22,5 7.5,5 L17.5,5 C17.78,5 18,5.22 18,5.5 C18,5.78 17.78,6 17.5,6 L7.5,6 Z M3,12 C2.44,12 2,11.56 2,11 L2,10 C2,9.44 2.44,9 3,9 L4,9 C4.56,9 5,9.44 5,10 L5,11 C5,11.56 4.56,12 4,12 L3,12 Z M4,10 L3,10 L3,11 L4,11 L4,10 Z M7.5,11 C7.22,11 7,10.78 7,10.5 C7,10.22 7.22,10 7.5,10 L17.5,10 C17.78,10 18,10.22 18,10.5 C18,10.78 17.78,11 17.5,11 L7.5,11 Z M3,17 C2.44,17 2,16.56 2,16 L2,15 C2,14.44 2.44,14 3,14 L4,14 C4.56,14 5,14.44 5,15 L5,16 C5,16.56 4.56,17 4,17 L3,17 Z M4,15 L3,15 L3,16 L4,16 L4,15 Z M7.5,16 C7.22,16 7,15.78 7,15.5 C7,15.22 7.22,15 7.5,15 L17.5,15 C17.78,15 18,15.22 18,15.5 C18,15.78 17.78,16 17.5,16 L7.5,16 Z" id="K"> </path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/shared.js", {
    name: "symbols/shared",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="shared" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="shared-list"> <path d="M7.5,11 C5.34,11 4,7.8 4,5.5 C4,3.54 5.54,2 7.5,2 C9.46,2 11,3.54 11,5.5 C11,7.8 9.66,11 7.5,11 L7.5,11 Z M7.5,3 C6.1,3 5,4.1 5,5.5 C5,7.52 6.16,10 7.5,10 C8.84,10 10,7.52 10,5.5 C10,4.1 8.9,3 7.5,3 L7.5,3 Z M14.26,10.5 C12.56,10.5 11.5,8.58 11.5,6.8 C11.5,5.26 12.74,4 14.26,4 C15.78,4 17,5.26 17,6.8 C17,8.58 15.96,10.5 14.26,10.5 L14.26,10.5 Z M14.26,5 C13.3,5 12.5,5.8 12.5,6.8 C12.5,8.08 13.22,9.5 14.26,9.5 C15.28,9.5 16,8.08 16,6.8 C16,5.8 15.22,5 14.26,5 L14.26,5 Z M15.52,15 C15.24,15 15.02,14.8 15,14.52 C14.98,14.24 15.2,14.02 15.48,14 C16.72,13.94 17.54,13.66 17.94,13.48 L17.8,12.9 C17.74,12.56 17.5,12.3 17.2,12.16 L16.36,11.84 C16.08,11.72 15.82,11.54 15.62,11.3 C15.44,11.1 15.46,10.78 15.68,10.6 C15.88,10.42 16.2,10.46 16.38,10.66 C16.48,10.78 16.6,10.86 16.74,10.92 L17.56,11.24 C18.18,11.48 18.64,12.02 18.78,12.68 L18.98,13.64 C19.04,13.84 18.94,14.04 18.78,14.16 C18.74,14.2 17.66,14.9 15.52,15 L15.52,15 Z M7.5,17 C2.86,17 1.38,16.1 1.22,16 C1.06,15.9 0.98,15.7 1,15.5 L1.3,13.74 C1.46,12.74 2.2,11.94 3.18,11.7 L4.84,11.32 C4.96,11.28 5.06,11.22 5.14,11.14 C5.34,10.96 5.66,10.96 5.86,11.14 C6.06,11.34 6.04,11.66 5.86,11.86 C5.64,12.06 5.36,12.22 5.06,12.28 L3.42,12.68 C2.82,12.82 2.38,13.3 2.28,13.9 L2.06,15.3 C2.64,15.54 4.24,16 7.5,16 C10.76,16 12.36,15.54 12.94,15.3 L12.72,13.9 C12.62,13.3 12.18,12.82 11.58,12.68 L9.94,12.28 C9.64,12.22 9.36,12.06 9.14,11.86 C8.96,11.66 8.94,11.34 9.14,11.14 C9.34,10.96 9.66,10.96 9.86,11.14 C9.94,11.22 10.04,11.28 10.16,11.32 L11.82,11.7 C12.8,11.94 13.54,12.74 13.7,13.74 L14,15.5 C14.02,15.7 13.94,15.9 13.78,16 C13.62,16.1 12.14,17 7.5,17 L7.5,17 Z" id="L"> </path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/options.js", {
    name: "symbols/options",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="options rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="options"> <path d="M17.1330617,2.8594383 C15.9930617,1.7194383 14.0130617,1.7194383 12.8930617,2.8594383 L5.5130617,10.2394383 C5.3330617,10.4394383 5.3330617,10.7594383 5.5130617,10.9594383 C5.7130617,11.1394383 6.0330617,11.1394383 6.2330617,10.9594383 L13.5930617,3.5594383 C14.3530617,2.7994383 15.6730617,2.7994383 16.4130617,3.5594383 C17.1730617,4.3194383 17.1930617,5.5594383 16.4130617,6.3394383 L9.0330617,13.7594383 C8.7130617,14.0794383 8.9330617,14.6194383 9.3730617,14.6194383 C9.5130617,14.6194383 9.6330617,14.5594383 9.7330617,14.4594383 L17.1330617,7.0394383 C18.2930617,5.8794383 18.2930617,4.0194383 17.1330617,2.8594383 L17.1330617,2.8594383 Z M8.4930617,15.3594383 C8.0330617,13.4594383 6.5130617,11.9394383 4.6130617,11.4794383 C4.3530617,11.4194383 4.0930617,11.5794383 4.0130617,11.8194383 L2.0330617,17.3194383 C1.8730617,17.7194383 2.2730617,18.1194383 2.6730617,17.9594383 C8.6730617,15.7794383 8.2530617,15.9594383 8.3730617,15.8194383 C8.4930617,15.6994383 8.5330617,15.5194383 8.4930617,15.3594383 L8.4930617,15.3594383 Z M3.3330617,16.6594383 L4.8130617,12.5794383 C6.0130617,12.9994383 6.9730617,13.9794383 7.3930617,15.1794383 L3.3330617,16.6594383 Z" id="N"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/styles/sidebarItem.js", {
    name: "sidebarItem",
    data: '.sidebarItem{overflow:hidden;height:38px;z-index:15;position:relative;}.sidebarItem.unreadComments.list .title,.sidebarItem.unreadComments.list .wundercon{color:#328ad6}.sidebarItem.animate-up{height:0 !important;overflow:hidden}.sidebarItem.collapsed{height:0;overflow:hidden}.sidebarItem.animate-down{height:38px;overflow:hidden}.sidebarItem.active-drag{background:#fafafa;}.sidebarItem.active-drag .list-options{display:none !important}.sidebarItem.overdue .overdue-count{display:block}.sidebarItem a{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;height:38px;color:#1c1c1c;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;padding-right:8px;padding-left:8px;}.sidebarItem a .count{color:#bdbcbb;font-size:12px;padding-left:4px;padding-right:4px}.sidebarItem a .overdue-count{font-size:12px;display:none;color:#d74e48;font-weight:bold;background:rgba(215,78,72,0.1);padding:2px 6px;margin-left:4px;margin-right:4px;-webkit-border-radius:12px;border-radius:12px}.sidebarItem a .title{font-size:15px;font-weight:400;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;color:#262626;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding-left:6px;padding-right:6px}.sidebarItem a .list-options{cursor:pointer;display:none;opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);z-index:25;height:20px;width:20px;padding-left:4px;padding-right:4px}.sidebarItem a .label{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:8px;padding-top:5px;font-weight:bold;text-align:center;position:absolute;top:11px;left:13px;right:13px;width:16px;height:16px;color:#5fa004}.sidebarItem .list-icon{height:20px;width:20px;padding-left:3px;padding-right:3px;text-align:center;}.sidebarItem .list-icon .emoji{margin-top:2px}.sidebarItem .list-icon svg.inbox{fill:#2b8dec}.sidebarItem .list-icon svg.week{fill:#e29600}.sidebarItem .list-icon svg.today{fill:#5fa004}.sidebarItem .list-icon svg.completed{fill:#737273}.sidebarItem .list-icon svg.starred{fill:#db4c3f}.sidebarItem .list-icon svg.assigned{fill:#a33684}.sidebarItem .list-icon svg.all{fill:#9b5c1c}.sidebarItem .list-icon svg.list,.sidebarItem .list-icon svg.shared{fill:#b9b9b9}.sidebarItem.active.unreadComments .title,.sidebarItem.active.unreadComments .wundercon{color:#262626}.sidebarItem.active.overdue a{font-weight:bold}.sidebarItem.active a{background:#e0eefa;color:#262626;text-shadow:0 1px 1px rgba(0,0,0,0);}.sidebarItem.active a .count{color:rgba(38,38,38,0.75)}.sidebarItem.active a .overdue-count{color:#f7f7f7;background:rgba(215,78,72,0.8)}.sidebarItem.active.list .list-options{display:block;}.sidebarItem.active.list .list-options:hover{opacity:1;-ms-filter:none;filter:none}.sidebarItem.active.list.list-search .list-options{display:none}.sidebarItem.active.list.list-search .count{display:block}.sidebarItem.hasListEmoji .list-icon svg{display:none}html .sidebarItem a .label{font-family:"Lato","Geneva CY","Lucida Grande","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(ja_JP) .sidebarItem a .label{font-family:"Lato","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Microsoft Yahei","微软雅黑","STXihei","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_CN) .sidebarItem a .label{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_TW) .sidebarItem a .label{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}'
}),
define("views/Sidebar/ItemView", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/helpers/selection", "wunderbits/WBViewPresenter", "wunderbits/mixins/UnicodeEmojiViewMixin", "project!core", "actions/Factory", "template!sidebarItem", "partial!symbols/all", "partial!symbols/inbox", "partial!symbols/starred", "partial!symbols/today", "partial!symbols/week", "partial!symbols/completed", "partial!symbols/assigned", "partial!symbols/list", "partial!symbols/shared", "partial!symbols/options", "style!sidebarItem"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v) {
    var _ = a.WBStateModel
      , w = n.prototype
      , k = n.extend({
        renderData: {
            id: void 0,
            url: void 0,
            icon: void 0,
            title: void 0
        },
        observes: {
            stateModel: {
                "change:count": ["renderTasksCount", "renderAriaLabel"],
                "change:overdueCount": ["renderAriaLabel", "renderOverdueCount"]
            }
        },
        template: s,
        styles: [v],
        tagName: "li",
        className: "sidebarItem",
        attributes: {
            role: "menuitem",
            tabindex: 0
        },
        renderCountsDebounceTime: 250,
        getCollection: null,
        getOverdueCollection: null,
        getPublicUrl: null,
        getIconClass: null,
        initialize: function() {
            var e = this;
            e.ready = e.deferred(),
            e.stateModel = new _({}),
            e._featureLookup = r.featureLookup(),
            e.collection = e.getCollection(),
            e.overdueCollection = e.getOverdueCollection(),
            e.updateCount(),
            e.updateOverdueCount();
            var t = {
                leading: !0,
                trailing: !0
            };
            e.renderAriaLabel = e.throttle(e.renderAriaLabel, 250, t),
            e.renderTasksCount = e.throttle(e.renderTasksCount, 250, t),
            e.renderOverdueCount = e.throttle(e.renderOverdueCount, 250, t),
            w.initialize.apply(e, arguments),
            e.bindCountCollections(),
            e.bindUnreadState();
        },
        bindCountCollections: function() {
            var e = this;
            e.unbindFromTarget(e.collection),
            e.unbindFromTarget(e.overdueCollection),
            e.bindTo(e.collection, "add remove", "updateCount"),
            e.bindTo(e.overdueCollection, "add remove", "updateOverdueCount");
        },
        bindUnreadState: function() {
            var e = this;
            e.bindTo(e.model, "change:hasUnreadComments", "renderUnreadState");
        },
        formatData: function(e) {
            var t = this;
            return e = w.formatData.call(t, e),
            e.id = t.model.id,
            e.icon = t.getIconClass(),
            e.url = t.getPublicUrl(),
            e.title = t.model.escape("title"),
            e.titleText = e.title,
            e;
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            return w.render.call(e, t),
            e.$el.attr("rel", t.id),
            e.$el.attr("data-position", e.model.attributes.position),
            e.renderTasksCount(),
            e.renderOverdueCount(),
            e.renderUnreadState(),
            e.renderAriaLabel(),
            e.ready.resolve(),
            e;
        },
        renderTasksCount: function() {
            var e = this
              , t = e.$(".count")
              , i = e.stateModel.attributes.count;
            t.text(i || "");
        },
        renderOverdueCount: function() {
            var e = this
              , t = e.stateModel.attributes.overdueCount;
            e.$el.toggleClass("overdue", !!t),
            e.$(".overdue-count").text(t || "");
        },
        updateCount: function() {
            var e = this
              , t = e.collection.length;
            t !== e.stateModel.attributes.count && e.stateModel.save({
                count: t
            });
        },
        updateOverdueCount: function() {
            var e = this
              , t = e.overdueCollection.length;
            t !== e.stateModel.attributes.overdueCount && e.stateModel.save({
                overdueCount: t
            });
        },
        renderUnreadState: function() {
            var e = this;
            e.$el.toggleClass("unreadComments", !!e.model.attributes.hasUnreadComments);
        },
        renderAriaLabel: function() {
            var t = this
              , i = t.model.escape("title")
              , n = e.language.getText("aria_list_$_with_$_items", i, t.collection.length)
              , o = t.stateModel.attributes.overdueCount;
            o && (n += ", " + e.language.getText("voiceover_sidebar_list_$_items_overdue", o)),
            t.$el.attr("aria-label", n);
        },
        remove: function(e) {
            function t() {
                !i.destroyed && w.remove.apply(i, arguments);
            }
            var i = this;
            e || (e = {}),
            e.animate === !1 ? t() : i.$el.slideUp(200, t);
        }
    });
    return o.applyToClass(k),
    k;
}),
define("views/Sidebar/InboxItemView", ["application/runtime", "actions/Factory", "views/Sidebar/ItemView"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        initialize: function() {
            var e = this;
            e.taskLookup = t.taskLookup(),
            n.initialize.apply(e, arguments);
        },
        _inbox: function() {
            return this.taskLookup.getTaskCollection("inbox");
        },
        getCollection: function() {
            return this._inbox().getOpenTasks();
        },
        getOverdueCollection: function() {
            return this._inbox().overdueTasks;
        },
        bindUnreadState: function() {
            var e = this;
            e.bindTo(e.model, "change:hasUnreadComments", "renderUnreadState");
        },
        getPublicUrl: function() {
            return "#/lists/inbox";
        },
        getIconClass: function() {
            return "inbox";
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            return n.render.call(e, t),
            e.renderTitle(),
            e.$el.attr("rel", "inbox"),
            e;
        },
        renderTitle: function() {
            var t = this
              , i = t.$(".title")
              , n = t.$(".list-icon");
            n.attr("title", e.language.getText("smart_list_inbox")),
            i.html(e.language.getLabel("smart_list_inbox").toString()),
            t.renderLocalized();
        }
    });
}),
define("views/Sidebar/ListItemView", ["application/runtime", "actions/Factory", "views/Sidebar/ItemView", "wunderbits/helpers/selection", "wunderbits/data/keycodes"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        observes: {
            model: {
                "change:isShared": "render",
                "change:role": "renderRole",
                "change:title": "renderTitle",
                "change:online_id": "render"
            }
        },
        initialize: function() {
            var e = this;
            e.taskLookup = t.taskLookup(),
            n.initialize.apply(e, arguments);
        },
        _list: function() {
            var e = this;
            return e.taskLookup.getTaskCollection(e.model.id);
        },
        getCollection: function() {
            return this._list().getOpenTasks();
        },
        getOverdueCollection: function() {
            return this._list().overdueTasks;
        },
        bindUnreadState: function() {
            var e = this;
            e.bindTo(e.model, "change:hasUnreadComments", "renderUnreadState");
        },
        getPublicUrl: function() {
            return "#/lists/" + (this.model.attributes.online_id || this.model.id);
        },
        getIconClass: function() {
            var e = this
              , t = "list";
            return e.model.isShared() && (t = "shared"),
            t;
        },
        formatData: function(e) {
            var t = this;
            return e = n.formatData.call(t, e);
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            return n.render.call(e, t),
            e.renderSharedState(),
            e.renderRole(),
            e.renderTasksCount(),
            e.renderOverdueCount(),
            e.renderTitle(),
            e.$el.addClass("list draggable"),
            e.$(".options").removeClass("hidden"),
            e;
        },
        renderTitle: function() {
            var e = this
              , t = e.model
              , i = e.$(".title");
            i.text(t.attributes.title),
            e.renderEmoji(i),
            e.requestAnimationFrame(function() {
                e.renderEmojiListIcon();
            });
        },
        renderEmojiListIcon: function() {
            var e = this
              , t = e.$(".title")
              , i = t.contents().first()
              , n = i.hasClass("emoji");
            e.$el.find(".list-icon .emoji").remove(),
            n ? (i.remove(),
            e.$(".list-icon").append(i),
            e.$el.addClass("hasListEmoji")) : e.$el.removeClass("hasListEmoji");
        },
        renderRole: function() {
            var e = this
              , t = e.model.attributes.role;
            e.$el.removeClass("owner member").addClass(t);
        },
        renderSharedState: function() {
            var e = this
              , t = e.model.isShared();
            e.$el.toggleClass("shared", t);
        }
    });
}),
define("helpers/dnd/BaseDragAndDropHandler", ["project!core"], function(e) {
    var t = e.BaseEventEmitter.extend({
        setDOMEvents: function(e) {
            var t = this;
            t.domListeners = e;
        },
        enable: function() {
            var e = this;
            Object.keys(e.domListeners).forEach(function(t) {
                var i = e.domListeners[t];
                e.el.addEventListener(t, i, !1);
            });
        },
        disable: function() {
            var e = this;
            Object.keys(e.domListeners).forEach(function(t) {
                var i = e.domListeners[t];
                e.el.removeEventListener(t, i, !1);
            });
        },
        onDestroy: function() {
            var e = this;
            e.disable();
        }
    });
    return t;
}),
define("helpers/dnd/workaroundstate", [], function() {
    var e = null
      , t = "none";
    return {
        clearWorkaround: function() {
            e = null,
            t = "none";
        },
        hasWorkaroundSet: function() {
            return !!e;
        },
        setWorkaroundMimeType: function(t) {
            e = t;
        },
        getWorkaroundMimeType: function() {
            return e;
        },
        setWorkaroundDropEffect: function(e) {
            t = e;
        },
        getWorkaroundDropEffect: function() {
            return t;
        }
    };
}),
define("helpers/dnd/eventUtil", ["./workaroundstate", "../domtools"], function(e, t) {
    function i(e, t) {
        var i, n = e.dataTransfer, o = "";
        try {
            o = n.effectAllowed.toLowerCase();
        } catch (a) {
            console.warn(a);
        }
        if ("all" === o)
            return t[0];
        for (i = 0; i < t.length; ++i)
            if (-1 !== o.indexOf(t[i]))
                return t[i];
        return null;
    }
    function n(t, i) {
        e.hasWorkaroundSet() ? e.setWorkaroundDropEffect(i) : t.dataTransfer.dropEffect = i;
    }
    function o(e, t) {
        var i, n, o = t.length;
        for (i = 0; o > i; ++i)
            for (n = 0; n < e.length; ++n)
                if (t[i] === e[n])
                    return t[i];
    }
    function a(e) {
        e.preventDefault();
    }
    function r(e) {
        e.preventDefault();
    }
    function s(t) {
        return e.hasWorkaroundSet() ? [e.getWorkaroundMimeType()] : Array.prototype.slice.call(t.dataTransfer.types);
    }
    function l(t, i) {
        return e.hasWorkaroundSet() ? i === e.getWorkaroundMimeType() ? t.dataTransfer.getData("Text") : "" : t.dataTransfer.getData(i);
    }
    function c(e, i) {
        return t.getDirectChildOf(e, i);
    }
    return {
        findMatchingDropEffect: i,
        findMatchingMimetype: o,
        setDropEffect: n,
        allowDrop: a,
        acceptDrop: r,
        getDragMimetypes: s,
        getDragData: l,
        getItemFromTarget: c
    };
}),
define("helpers/dnd/DragList", ["./BaseDragAndDropHandler", "./workaroundstate", "../domtools", "./eventUtil"], function(e, t, i, n) {
    var o = e.extend({
        initialize: function(e, t) {
            var i = this;
            if (i.el = e,
            i.getDragImage = t.getDragImage ? t.getDragImage : !1,
            "function" != typeof t.itemToData)
                throw new Error("missing itemToData option");
            if (i.itemToData = t.itemToData,
            i.disposeDragImage = t.disposeDragImage,
            "string" != typeof t.mimeType && "function" != typeof t.mimeType)
                throw new Error("missing mimeType option");
            i.effectAllowed = i._effectAllowed(t.effectAllowed || ["move"]),
            i.options = t,
            i.currentDragImage = null,
            i.setDOMEvents({
                dragstart: i._onDragStart.bind(i),
                dragover: i._stopPropagation.bind(i),
                drop: i._stopPropagation.bind(i)
            });
        },
        prepareItem: function(e) {
            e.setAttribute("draggable", "true");
        },
        _effectAllowed: function(e) {
            var t = -1 !== e.indexOf("copy")
              , i = -1 !== e.indexOf("link")
              , n = -1 !== e.indexOf("move");
            return t && n && !i ? "copyMove" : !t && n && i ? "linkMove" : t && !n && i ? "copyLink" : !t || n || i ? t || n || !i ? t || !n || i ? t && n && i ? "all" : "none" : "move" : "link" : "copy";
        },
        _onDragStart: function(e) {
            var a = this
              , r = n.getItemFromTarget(a.el, e.target);
            if (r) {
                var s, l = e.dataTransfer;
                a.trigger("drag", r),
                s = a.itemToData(r),
                l.setDragImage && a.getDragImage && (a.currentDragImage = a.getDragImage(r, s),
                l.setDragImage(a.currentDragImage, 0, 0)),
                l.effectAllowed = a.effectAllowed;
                var c;
                "string" == typeof a.options.mimeType ? c = a.options.mimeType : "function" == typeof a.options.mimeType && (c = a.options.mimeType(r));
                try {
                    l.setData(c, s);
                } catch (d) {
                    t.setWorkaroundMimeType(c),
                    l.setData("Text", s);
                }
                o.setSourceNode(e.target),
                i.once(e.target, "dragend", a._onDragEnd.bind(a)),
                e.stopPropagation();
            }
        },
        _onDragEnd: function() {
            var e = this;
            o.setSourceNode(null),
            t.clearWorkaround(),
            e.disposeDragImage && e.disposeDragImage(e.currentDragImage),
            e.currentDragImage = null;
        },
        _stopPropagation: function(e) {
            e.stopPropagation();
        }
    });
    return o.setSourceNode = function(e) {
        var t = this;
        t.sourceNode = e;
    }
    ,
    o.getSourceNode = function() {
        var e = this;
        return e.sourceNode;
    }
    ,
    o;
}),
define("helpers/dnd/DropZone", ["./BaseDragAndDropHandler", "./eventUtil"], function(e, t) {
    var i = "no-pointer-events-for-children"
      , n = e.prototype;
    return e.extend({
        initialize: function(e, t) {
            var i = this;
            n.initialize.call(i),
            i.el = e,
            i.noPointerEventsStyleElement = null,
            i.dropEffects = [t.dropEffect],
            i.hoverClass = t.hoverClass,
            i.mimeTypes = t.mimeTypes,
            i.setDOMEvents({
                dragenter: i._onDragEnter.bind(i),
                dragover: i._onDragOver.bind(i),
                dragleave: i._onDragLeave.bind(i),
                drop: i._onDrop.bind(i)
            });
        },
        _onDragEnter: function(e) {
            var i = this;
            i._disablePointerEventsForChildren(),
            i._isDropAllowed(e) && (t.allowDrop(e),
            i._setDropEffectIfNeeded(e));
        },
        _onDragLeave: function() {
            var e = this;
            e._enablePointerEventsForChildren(),
            e.hoverClass && e.el.classList.remove(e.hoverClass),
            e.trigger("dragleave");
        },
        _onDragOver: function(e) {
            var i = this;
            i._isDropAllowed(e) && (t.allowDrop(e),
            i.hoverClass && i.el.classList.add(i.hoverClass),
            i.trigger("dragenter", e.clientY),
            i._setDropEffectIfNeeded(e));
        },
        _onDrop: function(e) {
            var i, n, o = this;
            o._enablePointerEventsForChildren(),
            o.hoverClass && o.el.classList.remove(o.hoverClass),
            o.trigger("dragleave"),
            o._isDropAllowed(e) && (t.acceptDrop(e),
            n = o._findMatchingMimetype(e),
            i = t.getDragData(e, n),
            o.trigger("drop", i, n));
        },
        _findMatchingMimetype: function(e) {
            var i = this
              , n = t.getDragMimetypes(e);
            return t.findMatchingMimetype(n, i.mimeTypes);
        },
        _isDropAllowed: function(e) {
            var i = this
              , n = i._findMatchingMimetype(e)
              , o = t.findMatchingDropEffect(e, i.dropEffects);
            return n && o;
        },
        _disablePointerEventsForChildren: function() {
            var e = this;
            if (!e.noPointerEventsClassName) {
                var t = "." + i + " * {pointer-events: none;}"
                  , n = document.createElement("style");
                e.el.classList.add(i),
                n.appendChild(document.createTextNode(t)),
                document.head.appendChild(n),
                e.noPointerEventsStyleElement = n;
            }
        },
        _enablePointerEventsForChildren: function() {
            var e = this;
            e.noPointerEventsStyleElement && (e.el.classList.remove(i),
            document.head.removeChild(e.noPointerEventsStyleElement),
            e.noPointerEventsStyleElement = null);
        },
        _setDropEffectIfNeeded: function(e) {
            var i = this;
            i.dropEffect && t.setDropEffect(e, i.dropEffect);
        }
    });
}),
define("helpers/dnd/ItemDragEvent", ["project!core", "./workaroundstate", "./eventUtil"], function(e, t, i) {
    var n = e.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i._nativeEvent = e,
            i._item = t;
        },
        findMatchingDropEffect: function(e) {
            return i.findMatchingDropEffect(this._nativeEvent, e);
        },
        findMatchingMimetype: function(e) {
            return i.findMatchingMimetype(this.mimeTypes, e);
        },
        isDropAllowedFor: function(e, t) {
            var i, n, o = this;
            return (i = o.findMatchingMimetype(e)) ? (n = o.findMatchingDropEffect(t),
            n ? !0 : !1) : !1;
        },
        setDropEffect: function(e) {
            i.setDropEffect(this._nativeEvent, e);
        },
        allowDrop: function() {
            return i.allowDrop(this._nativeEvent);
        },
        allowDropWithEffect: function(e) {
            var t = this
              , i = t.findMatchingDropEffect(e);
            return i ? (t.setDropEffect(i),
            t.allowDrop(),
            !0) : !1;
        }
    });
    return Object.defineProperty(n.prototype, "mimeTypes", {
        get: function() {
            return i.getDragMimetypes(this._nativeEvent);
        }
    }),
    Object.defineProperty(n.prototype, "position", {
        get: function() {
            var e = this;
            return {
                x: e._nativeEvent.clientX,
                y: e._nativeEvent.clientY
            };
        }
    }),
    Object.defineProperty(n.prototype, "item", {
        get: function() {
            return this._item;
        }
    }),
    n;
}),
define("helpers/dnd/ItemDropEvent", ["./ItemDragEvent", "./workaroundstate", "./eventUtil"], function(e, t, i) {
    var n = e.extend({
        getDragData: function(e) {
            return i.getDragData(this._nativeEvent, e);
        },
        acceptDrop: function() {
            return i.acceptDrop(this._nativeEvent);
        }
    });
    return n;
}),
define("helpers/dnd/ItemDragger", ["./BaseDragAndDropHandler", "./ItemDragEvent", "./ItemDropEvent", "./eventUtil"], function(e, t, i, n) {
    var o = e.prototype
      , a = e.extend({
        initialize: function(e) {
            var t = this;
            o.initialize.call(t),
            t.el = e,
            t.currentItem = null,
            t.hasDragEndHandler = !1,
            t.setDOMEvents({
                dragenter: t._onDragEnter.bind(t),
                dragleave: t._onDragLeave.bind(t),
                dragover: t._onDragOver.bind(t),
                drop: t._onDrop.bind(t)
            });
        },
        _onDragEnter: function(e) {
            var i, o = this, a = n.getItemFromTarget(o.el, e.target);
            a !== o.currentItem && a && (i = new t(e,a),
            o.currentItem && o._leaveCurrentItem(e),
            o.currentItem = a,
            o.trigger("itementer", i));
        },
        _onDragEnd: function(e) {
            var t = this;
            t.currentItem && t._leaveCurrentItem(e),
            t.hasDragEndHandler = !1;
        },
        _onDragLeave: function(e) {
            var t, i, o, a = this, r = n.getItemFromTarget(a.el, e.target);
            a.currentItem && (r ? (i = a.currentItem.getBoundingClientRect(),
            o = {
                x: e.clientX,
                y: e.clientY
            },
            t = !1,
            (o.y < i.top || o.y > i.top + i.height) && (t = !0),
            (o.x < i.left || o.x > i.left + i.width) && (t = !0),
            t && a._leaveCurrentItem(e)) : a._leaveCurrentItem(e));
        },
        _onDragOver: function(e) {
            var i, n = this;
            n.currentItem && (i = new t(e,n.currentItem),
            n.trigger("itemover", i));
        },
        _onDrop: function(e) {
            var t, o = this, a = n.getItemFromTarget(o.el, e.target);
            a && (t = new i(e,a),
            o.trigger("itemdrop", t),
            o.currentItem && o._leaveCurrentItem(e));
        },
        _leaveCurrentItem: function(e) {
            var i = this
              , n = new t(e,i.currentItem);
            i.currentItem = null,
            i.trigger("itemleave", n);
        }
    });
    return a;
}),
define("helpers/dnd/ItemDropZoneList", ["application/runtime", "project!core"], function(e, t) {
    function i(e, t, i) {
        return Math.min(Math.max(e, i), t);
    }
    var n = e._
      , o = t.BaseEventEmitter.extend({
        initialize: function(e, t) {
            var i = this;
            i.dropZones = t,
            i.itemDragger = e,
            i.currentDropZone = null,
            i.bindTo(i.itemDragger, "itementer", i.onItemOverAndEnter),
            i.bindTo(i.itemDragger, "itemover", i.onItemOverAndEnter),
            i.bindTo(i.itemDragger, "itemleave", i.onItemLeave),
            i.bindTo(i.itemDragger, "itemdrop", i.onItemDrop);
        },
        onItemDrop: function(e) {
            var t = this;
            t.currentDropZone && (t.currentDropZone.onDrop(e),
            t.currentDropZone.onLeave(e),
            t.currentDropZone = null);
        },
        onItemLeave: function(e) {
            var t = this;
            t.currentDropZone && (t.currentDropZone.onLeave(e),
            t.currentDropZone = null);
        },
        onItemOverAndEnter: function(e) {
            var t = this
              , i = t._getDropZone(e.position, e.item)
              , n = t.currentDropZone !== i;
            t.currentDropZone && n && (t.currentDropZone.onLeave(e),
            t.currentDropZone = null),
            i && (n ? (t.currentDropZone = i,
            t.currentDropZone.onEnter(e)) : t.currentDropZone.onOver(e));
        },
        _getDropZone: function(e, t) {
            var o = this
              , a = t.getBoundingClientRect()
              , r = {
                width: a.width,
                height: a.height
            }
              , s = {
                x: e.x - a.left,
                y: e.y - a.top
            };
            o.currentDropZone && o.currentDropZone.normalizePosition(r, s),
            s.x = i(0, r.width, s.x),
            s.y = i(0, r.height, s.y);
            var l = n.find(o.dropZones, function(e) {
                return e.matches(t, r, s);
            });
            return l;
        },
        onDestroy: function() {
            var e = this;
            e.itemDragger.destroy();
        },
        enable: function() {
            var e = this;
            e.itemDragger.enable();
        },
        disable: function() {
            var e = this;
            e.itemDragger.disable();
        }
    });
    return o;
}),
define("helpers/dnd/ItemDropZone", ["project!core"], function(e) {
    var t = e.BaseEventEmitter.extend({
        initialize: function(e) {
            var t = this;
            t.top = e.top || 0,
            t.left = e.left || 0,
            t.bottom = e.bottom || 0,
            t.right = e.right || 0,
            t.className = e.className,
            t.ratioArea = e.ratioArea,
            t.topArea = e.topArea,
            t.bottomArea = e.bottomArea,
            t.acceptedMimetypes = e.acceptedMimetypes,
            t._appliesToItemCallback = e.appliesToItem,
            t.dropEffects = ["move"];
        },
        isDropAllowed: function(e) {
            var t = this;
            return e.isDropAllowedFor(t.acceptedMimetypes, t.dropEffects);
        },
        isDragEventsAllowed: function(e) {
            var t = this;
            return e.isDropAllowedFor(t.acceptedMimetypes, t.dropEffects);
        },
        normalizePosition: function(e, t) {
            var i = this;
            t.y -= i.top,
            t.x -= i.left,
            e.height -= i.bottom,
            e.width -= i.right;
        },
        appliesToItem: function(e) {
            var t = this;
            return t._appliesToItemCallback ? t._appliesToItemCallback(e) : !0;
        },
        matches: function(e, t, i) {
            var n = this;
            return n.appliesToItem(e) ? n.topArea ? n._matchesTopArea(i) : n.bottomArea ? n._matchesBottomArea(i, t) : n.ratioArea ? n._matchesRatioArea(i, t) : !1 : !1;
        },
        _matchesRatioArea: function(e, t) {
            var i = this
              , n = e.y / t.height;
            return "number" == typeof i.ratioArea[0] && n <= i.ratioArea[0] ? !1 : "number" == typeof i.ratioArea[1] && n > i.ratioArea[1] ? !1 : !0;
        },
        _matchesTopArea: function(e) {
            var t = this
              , i = t.topArea[0]
              , n = t.topArea[1]
              , o = e.y <= i + n
              , a = e.y >= i;
            return o && a;
        },
        _matchesBottomArea: function(e, t) {
            var i = this
              , n = i.bottomArea[0]
              , o = i.bottomArea[1]
              , a = e.y <= t.height - n
              , r = e.y >= t.height - n - o;
            return a && r;
        },
        applyVisualFeedback: function(e) {
            var t = this;
            e.classList.add(t.className);
        },
        clearVisualFeedback: function(e) {
            var t = this;
            e.classList.remove(t.className);
        },
        onEnter: function(e) {
            var t = this;
            t.isDragEventsAllowed(e) && (e.allowDropWithEffect(t.dropEffects),
            t.applyVisualFeedback(e.item),
            t.trigger("itementer", e, e.findMatchingMimetype(t.acceptedMimetypes)));
        },
        onLeave: function(e) {
            var t = this;
            t.isDragEventsAllowed(e) && (t.trigger("itemleave", e, e.findMatchingMimetype(t.acceptedMimetypes)),
            t.clearVisualFeedback(e.item));
        },
        onOver: function(e) {
            var t = this;
            t.isDragEventsAllowed(e) && e.allowDropWithEffect(t.dropEffects);
        },
        onDrop: function(e) {
            var t = this;
            t.isDropAllowed(e) && (e.acceptDrop(),
            t.trigger("drop", e, e.findMatchingMimetype(t.acceptedMimetypes)));
        }
    });
    return t;
}),
define("helpers/dnd/SortableDropList", ["./ItemDropZoneList", "./ItemDropZone", "../domtools"], function(e, t, i) {
    var n = e.prototype
      , o = e.extend({
        initialize: function(e, i) {
            var o = this
              , a = new t({
                acceptedMimetypes: i.mimeTypes,
                className: i.dropTargetTopClass,
                top: i.dropTargetTopHeight,
                ratioArea: [null, .5]
            })
              , r = new t({
                acceptedMimetypes: i.mimeTypes,
                className: i.dropTargetBottomClass,
                bottom: i.dropTargetBottomHeight,
                ratioArea: [.5, null]
            });
            n.initialize.call(o, e, [a, r]),
            o.bindTo(a, "drop", "_onTopZoneDropped"),
            o.bindTo(r, "drop", "_onBottomZoneDropped");
        },
        _onTopZoneDropped: function(e, t) {
            var n = this
              , o = e.item
              , a = i.previousElement(o);
            n.trigger("droppedBetween", e.getDragData(t), a, o, t);
        },
        _onBottomZoneDropped: function(e, t) {
            var n = this
              , o = e.item
              , a = i.nextElement(o);
            n.trigger("droppedBetween", e.getDragData(t), o, a, t);
        }
    });
    return o;
}),
define("helpers/dnd/DropList", ["project!core"], function(e) {
    var t = e.BaseEventEmitter
      , i = t.prototype;
    return t.extend({
        initialize: function(e, t) {
            var n = this;
            if (i.initialize.call(n, {}),
            n.itemDragger = e,
            !t.className)
                throw new Error("missing className option");
            n.bindTo(n.itemDragger, "itementer", n.onItemEnter),
            n.bindTo(n.itemDragger, "itemleave", n.onItemLeave),
            n.bindTo(n.itemDragger, "itemover", n.onItemOver),
            n.bindTo(n.itemDragger, "itemdrop", n.onItemDrop),
            n._appliesToItemCallback = t.appliesToItem,
            n.className = t.className,
            n.acceptedMimetypes = t.acceptedMimetypes,
            n.dropEffects = ["move", "copy"];
        },
        _isDropAllowed: function(e) {
            var t = this;
            if (t._appliesToItemCallback && !t._appliesToItemCallback(e.item))
                return !1;
            var i = e.isDropAllowedFor(t.acceptedMimetypes, t.dropEffects);
            return i;
        },
        onItemEnter: function(e) {
            var t = this;
            t._isDropAllowed(e) && (e.allowDropWithEffect(t.dropEffects),
            e.item.classList.add(t.className));
        },
        onItemOver: function(e) {
            var t = this;
            t._isDropAllowed(e) && e.allowDropWithEffect(t.dropEffects);
        },
        onItemLeave: function(e) {
            var t = this;
            t._isDropAllowed(e) && e.item.classList.remove(t.className);
        },
        onItemDrop: function(e) {
            var t, i, n = this;
            n._isDropAllowed(e) && (e.acceptDrop(),
            t = e.findMatchingMimetype(n.acceptedMimetypes),
            i = e.getDragData(t),
            n.trigger("drop", e.item, i));
        },
        onDestroy: function() {
            var e = this;
            e.itemDragger.destroy(),
            i.onDestroy.call(e);
        },
        enable: function() {
            var e = this;
            e.itemDragger.enable();
        },
        disable: function() {
            var e = this;
            e.itemDragger.disable();
        }
    });
}),
define("helpers/dnd/index", ["./DragList", "./DropZone", "./ItemDragger", "./SortableDropList", "./DropList"], function(e, t, i, n, o) {
    return {
        createDragList: function(t, i) {
            return new e(t,i);
        },
        createDropZone: function(e, i) {
            return new t(e,i);
        },
        createDropList: function(e, t) {
            var n = new i(e);
            return new o(n,t);
        },
        createDropBetweenList: function(e, t) {
            var o = new i(e)
              , a = new n(o,t);
            return a;
        }
    };
}),
define("views/Sidebar/SidebarDropZoneView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Sidebar/ListItemView", "models/ListModel", "helpers/dnd/index"], function(e, t, i, n, o) {
    var a = "application/x-wunderlist-task"
      , r = t.prototype;
    return t.extend({
        className: "new-list-dropzone",
        tagName: "ul",
        initialize: function() {
            var e = this;
            r.initialize.apply(this, arguments),
            e._setupTaskDropZone();
        },
        _setupTaskDropZone: function() {
            var e = this;
            e.dropZone || (e.dropZone = o.createDropZone(e.el, {
                mimeTypes: [a],
                dropEffect: "move"
            }),
            e.bindTo(e.dropZone, "dragenter", e._dragEnter),
            e.bindTo(e.dropZone, "dragleave", e._dragLeave),
            e.bindTo(e.dropZone, "drop", e._drop),
            e.dropZone.enable());
        },
        _attachItemView: function() {
            var t = this
              , o = e.language
              , a = o.getText("placeholder_new_list").toString()
              , r = new n({
                title: a
            });
            t.listItemView = t.addSubview(new i({
                model: r
            })),
            t.listItemView.render(),
            t.listItemView.el.classList.add("active"),
            t.el.appendChild(t.listItemView.el);
        },
        _detachItemView: function() {
            var e = this;
            e.destroySubview(e.listItemView),
            e.listItemView = null;
        },
        _dragEnter: function() {
            var e = this;
            e.listItemView || e._attachItemView();
        },
        _drop: function(t) {
            var i = JSON.parse(t);
            e.trigger("route:lists/new/" + i.join(","));
        },
        _dragLeave: function() {
            var e = this;
            e.listItemView && e._detachItemView();
        },
        onDestroy: function() {
            var e = this;
            r.onDestroy.call(e),
            e.dropZone.destroy();
        }
    });
}),
define("views/OrderedListView", ["application/runtime", "wunderbits/WBViewPresenter", "helpers/domtools"], function(e, t, i) {
    var n = t.prototype;
    return t.extend({
        tagName: "ul",
        collection: void 0,
        observes: {
            collection: {
                add: "_onModelAdd",
                remove: "_onModelRemove",
                move: "_onModelMove"
            }
        },
        initialize: function(e) {
            var t = this;
            if (t._hasRendered = !1,
            !e || !e.collection)
                throw new Error("This view requires options.collection to be initialized.");
            t.collection = e.collection,
            n.initialize.apply(t, arguments);
        },
        render: function(e) {
            var t = this;
            if (e && e.collection && (t.collection = e.collection,
            t.createObserveBindings(t)),
            !t._hasRendered || e.reRender) {
                var i = document.createDocumentFragment();
                t.collection.models.forEach(function(e) {
                    var n = t.getViewInstanceForModel(e).render();
                    i.appendChild(n.el);
                }),
                t.el.appendChild(i),
                t._hasRendered = !0;
            }
            return this;
        },
        getViewInstanceForModel: function() {
            throw new Error("#getViewInstance not implemented.");
        },
        _onModelMove: function(e, t, i) {
            this._onModelRemove(e, t, i),
            this._onModelAdd(e, t, i);
        },
        _onModelAdd: function(t, n, o) {
            var a = this;
            if (a._hasRendered) {
                var r, s, l = a.getViewInstanceForModel(t), c = l.render().el, d = o.index;
                if (d < n.length - 1) {
                    r = n.at(d + 1).id,
                    s = i.byRel(r, a.el);
                    try {
                        a.el.insertBefore(c, s);
                    } catch (u) {
                        console.error("unable to instert node"),
                        e.error.notify("OrderedListView", "unable to insert node", {
                            index: d,
                            length: n.length,
                            afterId: r,
                            afterNode: !!s,
                            destroyed: a.destroyed
                        });
                    }
                } else
                    a.el.appendChild(c);
            }
        },
        _onModelRemove: function(e) {
            var t = this;
            if (t._hasRendered) {
                var i = t.getSubview(e.attributes.type + e.id);
                i && i.destroy();
            }
        }
    });
}),
define("views/Sidebar/DraggableListView", ["application/runtime", "views/OrderedListView", "helpers/domtools", "helpers/dnd/index"], function(e, t, i, n) {
    var o = t.prototype;
    return t.extend({
        initialize: function() {
            var e = this;
            e.dragHelper = null,
            o.initialize.apply(e, arguments);
        },
        _setupDragHelper: function(e) {
            var t = this;
            t.dragHelper = n.createDragList(t.el, {
                mimeType: e,
                itemToData: t._itemToData.bind(t),
                getDragImage: t._createDragImageElement.bind(t),
                disposeDragImage: t._disposeDragImage.bind(t),
                effectAllowed: ["move"]
            }),
            t.dragHelper.enable();
        },
        _itemToData: function(e) {
            var t = e.getAttribute("rel");
            return t;
        },
        _disposeDragImage: function(e) {
            try {
                window.document.body.removeChild(e);
            } catch (t) {}
        },
        _createDragImageElement: function(e) {
            var t = window.getComputedStyle(e)
              , i = e.cloneNode(!0);
            return i.classList.add("list-drag-clone"),
            i.style.height = t.height,
            window.document.body.appendChild(i),
            i;
        }
    });
}),
define("views/Sidebar/Controllers/FolderItemController", ["wunderbits/data/keycodes", "wunderbits/WBViewController", "wunderbits/helpers/strings"], function(e, t, i) {
    var n = t.prototype;
    return t.extend({
        "implements": {
            "click:expand": "_toggleFolderExpanded",
            "keydown:titleInput": "_onTitleInputKeys",
            "keydown:folder": "_onFolderKeydown",
            "keydown:folderOptions": "_onFolderOptionsKeydown",
            "blur:titleInput": "_onTitleInputBlur",
            focus: "_onMainElFocus"
        },
        initialize: function(e) {
            var t = this;
            t.folderActions = e.folderActions,
            n.initialize.apply(t, arguments);
        },
        _onMainElFocus: function() {
            this._focusFolderHeader();
        },
        _toggleFolderExpanded: function(e) {
            var t = this;
            if (e) {
                if ("INPUT" === e.target.tagName)
                    return;
                t.stopItCold(e);
            }
            t._updateFolderExpandedState(!t.view.model.isExpanded()),
            t._focusFolderHeader();
        },
        _expandFolder: function() {
            var e = this;
            e._updateFolderExpandedState(!0),
            e._focusFolderHeader();
        },
        _collapseFolder: function() {
            var e = this;
            e._updateFolderExpandedState(!1),
            e._focusFolderHeader();
        },
        _updateFolderExpandedState: function(e) {
            var t = this
              , i = t.view.model;
            i.save("expanded", e);
        },
        _focusFolderHeader: function() {
            this.view.$(".folder-header").focus();
        },
        _onFolderKeydown: function(t) {
            var i = this;
            t.which === e.enter || t.which === e.spacebar ? (i._toggleFolderExpanded(),
            i.stopItCold(t)) : t.which === e.right ? (i._expandFolder(),
            i.stopItCold(t)) : t.which === e.left ? (i._collapseFolder(),
            i.stopItCold(t)) : t.which === e.tab && (i._focusOptionButtonOrSelf(),
            i.stopItCold(t));
        },
        _onFolderOptionsKeydown: function(t) {
            var i = this;
            t.which === e.enter && (i.view._toggleMenu(t),
            i.stopItCold(t));
        },
        _focusOptionButtonOrSelf: function() {
            var e = this
              , t = e.view.$(".folder-option-button");
            t.is(":focus") ? e.view.$el.focus() : t.focus();
        },
        _onTitleInputKeys: function(t) {
            var i = this
              , n = i.view
              , o = t.which === e.enter
              , a = t.which === e.esc
              , r = t.which === e.right
              , s = t.which === e.left
              , l = t.which === e.spacebar
              , c = t.which === e.tab;
            if (o || a || c) {
                var d = n.getTitleInputValue();
                o && i._updateTitle(d),
                n.exitEditMode(),
                n.$el.focus(),
                i.stopItCold(t);
            } else
                (r || s || l) && t.stopPropagation();
        },
        _onTitleInputBlur: function() {
            var e = this
              , t = e.view
              , i = t.getTitleInputValue();
            e._updateTitle(i),
            t.exitEditMode();
        },
        _updateTitle: function(e) {
            var t = this;
            e && e.length && (e = i.emojiTokensToUnicode(i.trim(e, 255)),
            t.folderActions.rename(e));
        }
    });
}),
define("views/Sidebar/DropOnListMixin", ["project!core", "helpers/dnd/ItemDragger", "helpers/dnd/DropList"], function(e, t, i) {
    var n = "application/x-wunderlist-task";
    return e.WBMixin.extend({
        enableDropOnList: function(e) {
            var o = this;
            o.dropOnListHelper = new i(new t(o.el),{
                acceptedMimetypes: [n],
                className: "list-hover",
                appliesToItem: e
            }),
            o.bindTo(o.dropOnListHelper, "drop", o._onTasksDroppedOnList),
            o.dropOnListHelper.enable();
        },
        _onTasksDroppedOnList: function(e, t) {
            var i = this
              , n = e.getAttribute("rel")
              , o = JSON.parse(t);
            i.trigger("tasksDropped", n, o);
        }
    });
}),
define("views/Sidebar/Controllers/ListCollectionDragController", ["wunderbits/WBViewController", "actions/Factory"], function(e, t) {
    var i = e.prototype;
    return e.extend({
        "implements": {
            tasksDropped: "_handleMoveTasksToList"
        },
        initialize: function() {
            var e = this;
            e.reparentTask = t.reparentTask(),
            e.assignLimit = t.assignTask().limit,
            i.initialize.apply(e, arguments);
        },
        _handleMoveTasksToList: function(e, t) {
            var i = this;
            i.assignLimit.isUserAllowedToAssign(e, t) ? i.reparentTask.moveTasksToList(e, t) : i.assignLimit.reached();
        }
    });
}),
define("views/Sidebar/FolderCollectionView", ["views/Sidebar/DraggableListView", "views/Sidebar/ListItemView", "helpers/dnd/index", "views/Sidebar/DropOnListMixin", "views/Sidebar/Controllers/ListCollectionDragController"], function(e, t, i, n, o) {
    var a = e.prototype
      , r = "application/x-wunderlist-list"
      , s = e.extend({
        observes: {
            collection: {
                add: "_updateHeight",
                remove: "_updateHeight"
            }
        },
        "implements": [o],
        initialize: function(e) {
            var t = this;
            t.folderActions = e.folderActions,
            a.initialize.call(t, {
                collection: t.folderActions.getListCollection(),
                model: e.model
            }),
            t.dropHelper = i.createDropBetweenList(t.el, {
                dropTargetTopClass: "dragAreaTop",
                dropTargetTopHeight: 2,
                dropTargetBottomClass: "dragAreaBottom",
                dropTargetBottomHeight: 0,
                mimeTypes: [r]
            }),
            t.bindTo(t.dropHelper, "droppedBetween", t._onDropLists),
            t.dropHelper.enable(),
            t.enableDropOnList(),
            t._setupDragHelper(r);
        },
        render: function() {
            var e = this
              , t = a.render.call(e);
            return e._updateHeight(),
            e.$el.attr("id", "folder-collection-" + e.model.attributes.id),
            t;
        },
        getViewInstanceForModel: function(e) {
            var i = this
              , n = new t({
                model: e
            });
            return i.addSubview(n, e.attributes.type + e.id),
            i.dragHelper.prepareItem(n.el),
            n;
        },
        _onDropLists: function(e, t, i) {
            var n = this
              , o = t && t.getAttribute("rel")
              , a = i && i.getAttribute("rel");
            n.folderActions.moveList(e, o, a);
        },
        _updateHeight: function() {
            var e = this;
            e.el && (e.el.style.height = 38 * e.collection.length + "px");
        }
    });
    return n.applyToClass(s),
    s;
}),
define("/styles/_popover.js", {
    name: "_popover",
    data: "#wunderlist-base.safari .popover{-webkit-filter:none;-webkit-box-shadow:0 1px 4px rgba(0,0,0,0.3);box-shadow:0 1px 4px rgba(0,0,0,0.3)}#wunderlist-base .popover{display:none;position:absolute;background:#fff;min-height:15px;min-width:200px;max-width:304px;z-index:1500;color:#262626;-webkit-filter:drop-shadow(0 1px 4px rgba(0,0,0,0.2));-webkit-box-shadow:0 1px 4px rgba(0,0,0,0.2);box-shadow:0 1px 4px rgba(0,0,0,0.2);-webkit-border-radius:3px;border-radius:3px;}#wunderlist-base .popover .scroll-wrapper{position:relative;overflow:hidden;width:211px}#wunderlist-base .popover .buttonbar{zoom:1;}#wunderlist-base .popover .buttonbar:before,#wunderlist-base .popover .buttonbar:after{content:\"\";display:table}#wunderlist-base .popover .buttonbar:after{clear:both}#wunderlist-base .popover .buttonbar.full{padding:0;margin-bottom:12px;}#wunderlist-base .popover .buttonbar.full a{text-align:center;width:50%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}#wunderlist-base .popover .buttonbar.toggle-date-type{padding:12px 12px 0 12px}#wunderlist-base .popover .arrow{position:absolute;border-width:12px;border-style:solid;width:0;height:0;z-index:100;pointer-events:none}#wunderlist-base .popover.top .arrow{left:50%;margin-left:-12px;bottom:-23px;border-color:#fff transparent transparent transparent}#wunderlist-base .popover.right .arrow{top:50%;margin-top:-12px;left:-23px;border-color:transparent #fff transparent transparent}#wunderlist-base .popover.bottom .arrow{left:50%;margin-left:-12px;top:-23px;border-color:transparent transparent #fff transparent}#wunderlist-base .popover.left .arrow{top:50%;margin-top:-12px;right:-23px;border-color:transparent transparent transparent #fff}#wunderlist-base .popover .inner{padding:12px;font-size:13px;}#wunderlist-base .popover .inner .buttonbar{margin:12px 0 0 0}#wunderlist-base .popover .content p{zoom:1;font-size:11px;}#wunderlist-base .popover .content p:before,#wunderlist-base .popover .content p:after{content:\"\";display:table}#wunderlist-base .popover .content p:after{clear:both}#wunderlist-base .popover .content p.center{padding:10px}#wunderlist-base .popover .content p a{color:#2e93e3;font-weight:bold;}#wunderlist-base .popover .content p a:hover{text-decoration:underline}#wunderlist-base .popover .content.scroll{overflow:scroll}#wunderlist-base .popover div.header{text-align:center;font-weight:bold;height:19px;padding-top:2px;color:#262626;font-size:14px;}#wunderlist-base .popover div.header .button{margin:0;position:absolute;right:12px;top:12px;}#wunderlist-base .popover div.header .button.left{left:12px;right:auto}#wunderlist-base .popover .top{margin:-12px -12px 0 -12px;padding:12px;border-bottom:1px solid #bebebe;-webkit-box-shadow:0 2px 2px rgba(0,0,0,0.1);box-shadow:0 2px 2px rgba(0,0,0,0.1);-webkit-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0;}#wunderlist-base .popover .top input{padding:8px;-webkit-border-radius:4px;border-radius:4px}#wunderlist-base .popover .list-menu{margin:-12px;}#wunderlist-base .popover .list-menu li{margin-bottom:-5px;}#wunderlist-base .popover .list-menu li.disabled{text-shadow:0 1px 0 #fff;display:block;padding:12px;background:transparent !important;text-shadow:none !important;color:#aaa;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;}#wunderlist-base .popover .list-menu li.disabled.last-sync{white-space:normal;overflow:visible;}#wunderlist-base .popover .list-menu li.disabled.last-sync .icon.offline{display:none;margin-top:-2px}#wunderlist-base .popover .list-menu li.disabled.last-sync.offline .icon.offline{display:inline-block}#wunderlist-base .popover .list-menu li.active a{color:#fff;background:#3595e1;text-shadow:0 1px 0 rgba(0,0,0,0.5);}#wunderlist-base .popover .list-menu li.active a .popover{text-shadow:none;display:block}#wunderlist-base .popover .list-menu li a{text-shadow:0 1px 0 #fff;display:block;padding:10px 12px;color:#262626;}#wunderlist-base .popover .list-menu li a:last-child{margin:0}#wunderlist-base .popover .list-menu li a.open-backgrounds:before{content:'\\25b6';float:right}#wunderlist-base .popover .list-menu li a:hover{color:#fff;background:#328ad6;text-shadow:none !important;}#wunderlist-base .popover .list-menu li a:hover.open-backgrounds:after{margin-top:-10px;content:'';width:0;height:30px;position:absolute;right:-27px;border-bottom:51px solid transparent;border-right:106px solid transparent;border-bottom-left-radius:100%;-webkit-transform:rotate(-30deg);-moz-transform:rotate(-30deg);-o-transform:rotate(-30deg);-ms-transform:rotate(-30deg);transform:rotate(-30deg)}#wunderlist-base .popover .list-menu li a:hover .popover{text-shadow:none;display:block}#wunderlist-base .popover .list-menu li a.disabled{background:transparent !important;text-shadow:none !important;color:#aaa}#wunderlist-base .popover .list-menu li.separator{padding-bottom:1px;margin-bottom:1px;border-bottom:1px solid rgba(0,0,0,0.05)}#wunderlist-base .popover .coachmark{padding:50px 30px;color:#737272;}#wunderlist-base .popover .coachmark svg{width:60px;height:60px;fill:#737272}#wunderlist-base .popover .coachmark h2{margin-bottom:10px}html[dir=rtl] #wunderlist-base .popover.datePicker .buttonbar .button{margin-left:0 !important}html[dir=rtl] #wunderlist-base .popover.backgrounds{right:initial;left:-227px}html[dir=rtl] #wunderlist-base .popover .list-menu li a.open-backgrounds:before{content:'\\25c0';float:left}html[dir=rtl] #wunderlist-base .popover .list-people li .name,html[dir=rtl] #wunderlist-base .popover .list-people li .description{padding-left:initial;padding-right:43px}html[dir=rtl] #wunderlist-base .popover .list-people li .button.leave-list,html[dir=rtl] #wunderlist-base .popover .list-people li .button.invite-person,html[dir=rtl] #wunderlist-base .popover .list-people li .button.delete-person,html[dir=rtl] #wunderlist-base .popover .list-people li .button.invite-person-success{float:left;margin-left:5px}"
}),
define("wunderbits/WBPopoverView", ["./WBRuntime", "./WBView", "style!_popover"], function(e, t, i) {
    var n = e._
      , o = e.$
      , a = e.Backbone
      , r = e.global
      , s = t.prototype;
    return t.extend({
        className: "popover",
        styles: [i],
        initialize: function(t) {
            var i = this;
            if (s.initialize.apply(i, arguments),
            !(i.options.content instanceof a.View))
                throw new Error("Cannot init class without a Backbone view as content");
            if (!(i.options.target instanceof o))
                throw new Error("Cannot init class without a Jquery object as target");
            i.name = t.name,
            i.content = i.options.content,
            i.$target = i.options.target,
            i.ignoredElements = i.options.ignoredElements,
            i._bindPopoverEvents(),
            i._bindTargetEvents(),
            i.popoverOpened = !1,
            i.forceTop = t.forceTop,
            t.id && (i.id = "error-handle"),
            i.debouncedClose = n.debounce(function(e) {
                i.popoverOpened && i.trigger("popover:close", e);
            }, 500, !0),
            i.bindTo(e, "interface:scroll", i.debouncedClose);
        },
        renderToDOM: function() {
            var e = this
              , t = e.options.renderTarget || document.body
              , i = o("<div>").addClass("arrow")
              , n = document.createDocumentFragment();
            return n.appendChild(i[0]),
            n.appendChild(e.options.prerenderedContent === !0 ? e.content.el : e.content.render().el),
            e.el.appendChild(n),
            o(t).append(e.el),
            e.options.hover && e._bindHoverEventsOnPopover(),
            e;
        },
        onDestroy: function() {
            var e = this;
            o(document).unbind("click." + e.cid),
            e.$(".arrow").remove(),
            e.options = null,
            e.content = null,
            e.$target = null;
        },
        toggleVisible: function() {
            var e = this;
            e.trigger(e.popoverOpened ? "popover:close" : "popover:open");
        },
        isEventOnIgnoredElement: function(e) {
            var t = this
              , i = !1;
            return e ? (n.each(t.ignoredElements, function(t) {
                o(e.target)[0] === t[0] && (i = !0);
            }),
            i) : !1;
        },
        _bindTargetEvents: function() {
            var e = this;
            if (e.options.bindToTarget !== !1) {
                if (e.options.hover)
                    return void e._bindHoverEventsOnTarget();
                e._bindClickEventsOnTarget();
            }
        },
        _bindOutsideClick: function() {
            var e = this;
            e.outsideClick = e.bindTo(o(document), "click." + e.cid, function(t) {
                if (!e.destroyed && !e.isEventOnIgnoredElement(t) && t.target !== e.el && !o(t.target).parents(".popover").size()) {
                    var i = e.options;
                    "function" == typeof i.onBlur && i.onBlur.call(i.context),
                    e.trigger("popover:close");
                }
            });
        },
        _bindClickEventsOnTarget: function() {
            var e = this;
            e.bindTo(e.$target, "click", function(t) {
                e.isEventOnIgnoredElement(t) || (e.toggleVisible(),
                t.stopPropagation());
            });
        },
        _bindHoverEventsOnTarget: function() {
            var e, t, i = this;
            t = i.options.delay || 500,
            i.bindTo(i.$target, "mouseenter", function() {
                e = r.setTimeout(function() {
                    i.trigger("popover:open");
                }, t),
                r.clearTimeout(i.timeClose);
            }),
            i.bindTo(i.$target, "mouseleave", function() {
                i.timeClose = r.setTimeout(function() {
                    i.trigger("popover:close");
                }, t),
                r.clearTimeout(e);
            });
        },
        _bindPopoverEvents: function() {
            var e = this;
            e.on("popover:open", e._openPopover, e),
            e.on("popover:close", e._closePopover, e);
        },
        _getTargetInfo: function() {
            var e = this
              , t = e.roundValues(e.$target.offset());
            return n.extend(t, {
                width: e.$target.outerWidth(),
                height: e.$target.outerHeight()
            });
        },
        _setPopoverLocation: function() {
            var e, t, i = this;
            switch (i.margin = i.options.margin || 20,
            i.targetInfo = i._getTargetInfo(),
            i.popoverSize = {
                width: i.$el.width(),
                height: i.$el.height()
            },
            t = i.options.position || i._getDefaultPosition(),
            i.offset = i._getOffset(),
            i.quadrant = i._getQuadrant(),
            t) {
            case "top":
                e = i._getTopPosition();
                break;

            case "right":
                e = i._getRightPosition();
                break;

            case "left":
                e = i._getLeftPosition();
                break;

            case "bottom":
                e = i._getBottomPosition();
                break;

            default:
                e = i.getDefaultLocation();
            }
            e = i.roundValues(e),
            i.$el.css(e).addClass(t),
            i._setArrowLocation(t, i.options.arrowPosition, i.options.arrowOffset);
        },
        roundValues: function(e) {
            return Object.keys(e).forEach(function(t) {
                e[t] = Math.round(e[t]);
            }),
            e;
        },
        _getTopPosition: function() {
            var e = this
              , t = {};
            return "top" === e.quadrant.vertical || e.forceTop ? t.top = e.targetInfo.top - e.popoverSize.height - e.margin : t.bottom = o(document).height() - e.targetInfo.top + e.margin,
            "left" === e.quadrant.horizontal ? t.left = e.targetInfo.left + e.targetInfo.width / 2 - e.popoverSize.width / 2 + e.offset : t.right = o(".main-interface").width() - e.targetInfo.left - e.targetInfo.width / 2 - e.popoverSize.width / 2 - e.offset,
            t;
        },
        _getRightPosition: function() {
            var e = this
              , t = {};
            return "top" === e.quadrant.vertical ? (t.top = e.targetInfo.top + e.targetInfo.height / 2 - e.popoverSize.height / 2,
            t.top < 0 && (e.offset = t.top - 10,
            t.top -= e.offset)) : (t.bottom = o(document).height() - e.targetInfo.top - e.popoverSize.height / 2 - e.targetInfo.height / 2,
            t.bottom < 0 && (e.offset = -1 * (t.bottom - 10),
            t.bottom += e.offset)),
            "left" === e.quadrant.horizontal ? t.left = e.targetInfo.left + e.targetInfo.width + e.margin : t.right = o(".main-interface").width() - e.targetInfo.left - e.targetInfo.width - e.popoverSize.width - e.margin,
            t;
        },
        _getBottomPosition: function() {
            var e = this
              , t = {};
            return "top" === e.quadrant.vertical ? t.top = e.targetInfo.top + e.targetInfo.height + e.margin : t.bottom = o(document).height() - e.targetInfo.top - e.targetInfo.height - e.popoverSize.height - e.margin,
            "left" === e.quadrant.horizontal ? t.left = e.targetInfo.left + e.targetInfo.width / 2 - e.popoverSize.width / 2 + e.offset : t.right = o(".main-interface").width() - e.targetInfo.left - e.targetInfo.width / 2 - e.popoverSize.width / 2 - e.offset,
            t;
        },
        _getLeftPosition: function() {
            var e = this
              , t = {};
            return "top" === e.quadrant.vertical ? (t.top = e.targetInfo.top + e.targetInfo.height / 2 - e.popoverSize.height / 2,
            t.top < 0 && (e.offset = t.top - 10,
            t.top -= e.offset)) : (t.bottom = o(document).height() - e.targetInfo.top - e.popoverSize.height / 2 - e.targetInfo.height / 2,
            t.bottom < 0 && (e.offset = -1 * (t.bottom - 10),
            t.bottom += e.offset)),
            "left" === e.quadrant.horizontal ? t.left = e.targetInfo.left - e.popoverSize.width - e.margin : t.right = o(".main-interface").width() - e.targetInfo.left + e.margin,
            t;
        },
        _getQuadrant: function() {
            var e = this;
            return {
                vertical: e.targetInfo.top > .5 * o(document).height() ? "bottom" : "top",
                horizontal: e.targetInfo.left > .5 * o(document).width() ? "right" : "left"
            };
        },
        _getDefaultPosition: function() {
            var e = this;
            return e.targetInfo.top > .5 * o(document).height() ? "top" : "bottom";
        },
        _setArrowLocation: function(e, t, i) {
            var n, o = this, a = 12, r = o.$el.find(".arrow");
            "top" === e || "bottom" === e ? (n = "left" === t ? r.outerWidth() + o.offset : "right" === t ? o.popoverSize.width - r.outerWidth() + o.offset : "center" === t ? o.popoverSize.width / 2 + o.offset : o.popoverSize.width / 2,
            r.css("left", n + i + "px"),
            r.css("margin-left", -o.offset - a)) : (n = o.popoverSize.height / 2,
            r.css("top", n + i + "px"),
            r.css("margin-top", +o.offset - a));
        },
        _getOffset: function() {
            var e = this
              , t = e.options.offset;
            if (t = "undefined" == typeof t ? 0 : n.isFunction(t) ? t() : t,
            "string" == typeof t)
                switch (t) {
                case "top":
                    t = e.popoverSize.height / 2 - e.targetInfo.height / 2;
                    break;

                case "right":
                    t = e.popoverSize.width / 2 - e.targetInfo.width / 2;
                    break;

                case "bottom":
                    t = -(e.popoverSize.height / 2 - e.targetInfo.height / 2);
                    break;

                case "left":
                    t = -(e.popoverSize.width / 2 - e.targetInfo.width / 2);
                }
            return t;
        },
        _openPopover: function() {
            var e = this
              , t = e.options
              , i = t.context;
            t.closeOthers && o(document.body).click(),
            "function" == typeof t.preventOpen && t.preventOpen.call(i) || (e.popoverOpened = !0,
            e.renderToDOM(),
            e._bindOutsideClick(e.ignoredElements),
            e._setPopoverLocation(),
            e._show(),
            t.onShow && t.onShow.call(i));
        },
        _closePopover: function(e) {
            var t = this;
            ("detail-date" !== t.name && "detail-assign" !== t.name || "lists" !== e) && t.popoverOpened && (e || (e = {}),
            t.options || (t.options = {}),
            t.outsideClick && t.unbindFrom(t.outsideClick),
            t.options.onClose && t.options.onClose.call(t.options.context),
            t.$el && t.$el.hide(),
            t._cleanUpAndRemovePopover());
        },
        _cleanUpAndRemovePopover: function() {
            var e = this;
            e.destroyed || (e.$el.removeClass("top right bottom left"),
            e.$el.css({
                top: "",
                bottom: "",
                right: "",
                left: ""
            }),
            e.$el.remove()),
            e.popoverOpened = !1;
        },
        _show: function() {
            this.$el.show();
        },
        _bindHoverEventsOnPopover: function() {
            var e = this;
            e.$el.on({
                mouseenter: n.bind(function() {
                    r.clearTimeout(e.timeClose);
                }, e),
                mouseleave: n.bind(function() {
                    e.trigger("popover:close");
                }, e)
            });
        }
    });
}),
define("views/Popovers/PopoverView", ["application/runtime", "wunderbits/WBViewPresenter", "wunderbits/WBPopoverView"], function(e, t, i) {
    var n = e._
      , o = e.global
      , a = t.prototype;
    return t.extend({
        initialize: function() {
            var t = this;
            a.initialize.apply(t, arguments),
            t.bindTo(e, "popover:close", t.close);
        },
        open: function(e) {
            var t = this;
            e.reconfig && n.extend(t.config, e);
            var i = t.getPopover(e);
            t.returnRoute = e && e.returnRoute,
            i.trigger("popover:open"),
            t.trigger("opened");
        },
        close: function(e) {
            var t = this;
            if (!t.config || !t.config.preventDefaultClose) {
                t.doNotRoute = e && e.doNotRoute;
                var i = t.getPopover(n.extend(e || {}, {
                    autoCreate: !1
                }));
                i && i.trigger("popover:close", e),
                t.trigger("closed");
            }
        },
        toggle: function(e, t) {
            var i = this;
            e = n.isArray(e) ? e[0] : e,
            e || (e = i.isOpen ? "close" : "open"),
            i[e](t);
        },
        updatePosition: function() {
            var e = this
              , t = e.getPopover({
                autoCreate: !1
            });
            t && t._setPopoverLocation();
        },
        getPopover: function(e) {
            var t = this
              , n = t.getPopoverConfig();
            return (!t.popover && e.autoCreate !== !1 || e.reconfig) && (n.prerenderedContent && n.content.render(),
            t.popover = t.addSubview(new i(n))),
            t.popover;
        },
        getPopoverConfig: function() {
            var e = this;
            if (!e.destroyed)
                return n.extend({
                    context: e,
                    content: e,
                    target: e.options.target,
                    offset: e.options.offset,
                    margin: e.options.margin,
                    renderTarget: e.options.renderTarget,
                    arrowOffset: e.options.arrowOffset,
                    position: e.options.position,
                    onShow: e.onPopoverShow.bind(e),
                    onClose: e.onPopoverClose.bind(e)
                }, e.config || {});
        },
        onPopoverShow: function() {
            var e = this;
            e.isOpen || (e.isOpen = !0,
            e.defer(function() {
                e.openURL = o.location.href,
                n.isFunction(e.onShow) && e.onShow(),
                e.options && n.isFunction(e.options.onShow) && e.options.onShow();
            }));
        },
        onPopoverClose: function() {
            var t = this;
            t.isOpen && (t.isOpen = !1,
            t.delay(function() {
                if (!t.destroyed) {
                    var i = o.location.href
                      , a = i === t.openURL
                      , r = t.returnRoute || "lists/inbox";
                    a && e.trigger("route:" + r, {
                        trigger: !1
                    });
                    var s = t.options;
                    n.isFunction(t.onClose) && t.onClose(),
                    n.isFunction(s.onClose) && s.onClose.call(t);
                }
            }, 50));
        }
    });
}),
define("views/Popovers/Controllers/FolderMenuController", ["application/runtime", "wunderbits/WBViewController", "wunderbits/data/keycodes"], function(e, t, i) {
    var n = e.$;
    return t.extend({
        "implements": {
            keydown: "_onKeydown"
        },
        _onKeydown: function(e) {
            var t = this;
            e.which === i.esc ? t.view.close() : e.which === i.tab || e.which === i.up || e.which === i.down ? t.view.cycleFocus() : e.which === i.enter && n(e.target).click(),
            t.stopItCold(e);
        }
    });
}),
define("/templates/folderMenu.js", {
    name: "folderMenu",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = '<ul class="folder-menu" aria-role="menu"> <li class="rename-folder" data-key-aria-label="button_rename_folder" rel="rename" tabindex="0" aria-role="menuitem">';
            return a = t.renameLabel || e && e.renameLabel,
            o = typeof a === r ? a.call(e, {
                name: "renameLabel",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (s += o),
            s += '</li> <li class="remove-folder" data-key-aria-label="button_ungroup" rel="remove" tabindex="0" aria-role="menuitem">',
            a = t.removeLabel || e && e.removeLabel,
            o = typeof a === r ? a.call(e, {
                name: "removeLabel",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (s += o),
            s + "</li> </ul> ";
        },
        useData: !0
    }
}),
define("/styles/popover/folderMenu.js", {
    name: "popover/folderMenu",
    data: "#wunderlist-base #folder-menu{min-width:initial;overflow:hidden;}#wunderlist-base #folder-menu.bottom{margin-top:-20px}#wunderlist-base #folder-menu.top{margin-bottom:-20px}#wunderlist-base #folder-menu .arrow{display:none}#wunderlist-base #folder-menu ul.folder-menu{list-style:none;padding:0;position:relative;font-size:13px;}#wunderlist-base #folder-menu ul.folder-menu li{padding:4px 10px;}#wunderlist-base #folder-menu ul.folder-menu li:first-child{border-bottom:1px solid #d6d6d6}#wunderlist-base #folder-menu ul.folder-menu li:hover,#wunderlist-base #folder-menu ul.folder-menu li:focus{cursor:pointer}#wunderlist-base #folder-menu ul.folder-menu li:focus{background:rgba(50,138,214,0.1)}#wunderlist-base #folder-menu ul.folder-menu li:hover{background:#328ad6;color:#f7f7f7}"
}),
define("views/Popovers/FolderMenu", ["application/runtime", "views/Popovers/PopoverView", "views/Popovers/Controllers/FolderMenuController", "template!folderMenu", "style!popover/folderMenu"], function(e, t, i, n, o, a) {
    return t.extend({
        template: n,
        styles: [o],
        config: {
            bindToTarget: !1,
            margin: 0,
            offset: 0,
            id: "folder-menu"
        },
        "implements": [i],
        emits: {
            "click li": "click",
            "keydown li": "keydown",
            "keydown folder-menu": "keydown"
        },
        renderData: {
            email: a,
            isPro: a,
            isChrome: a,
            isIE: a,
            extensionLink: a,
            isPackagedApp: a,
            isLabsEnabled: a,
            syncStatus: a,
            pendingCount: a,
            isTeamAdmin: a,
            domain: a
        },
        formatData: function() {
            return {
                removeLabel: e.language.getLabel("button_ungroup").toString(),
                renameLabel: e.language.getLabel("button_rename_folder").toString()
            };
        },
        onShow: function() {
            this.$(".rename-folder").focus();
        },
        onClose: function() {
            var e = this;
            e.destroy();
        },
        cycleFocus: function() {
            var e = this
              , t = e.$(".folder-menu li")
              , i = t.index(":focus");
            i < t.length - 1 ? t.get(i + 1).focus() : t.get(0).focus();
        }
    });
}),
define("/templates/sidebarFolder.js", {
    name: "sidebarFolder",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return '<div class="folder-container"> <div class="folder-header" tabindex="0" role="button" aria-owns="folder-collection-' + r((o = t.id || e && e.id,
            typeof o === a ? o.call(e, {
                name: "id",
                hash: {},
                data: n
            }) : o)) + '"> <span class="folder-icon">' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "folders", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> <span class="title" aria-hidden="true">' + r((o = t.title || e && e.title,
            typeof o === a ? o.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : o)) + '</span> <input type="text" class="title hidden" value="" maxlength="255" aria-hidden="true"/> <a class="folder-option-button" data-key-aria-label="voiceover_folder_options_button" data-key-title="voiceover_folder_options_button" aria-role="button" tabindex="0"> ' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "folder-option", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> " + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "folder-arrow", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </div> </div> ";
        },
        useData: !0
    }
}),
define("/templates/symbols/folders.js", {
    name: "symbols/folders",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="folders rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" > <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="folders"> <g id="Path-2-+-c-2" transform="translate(2.000000, 2.000000)"> <path d="M0.5,16 C0.22,16 -1.34760666e-14,15.82 -1.34760666e-14,15.5909091 L-1.42108547e-14,8.22727273 C-1.42108547e-14,7.55636364 0.68,7 1.5,7 L14.5,7 C15.32,7 16,7.55636364 16,8.22727273 L16,15.5909091 C16,15.82 15.78,16 15.5,16 L0.5,16 Z" id="Path-2" fill-opacity="0.06" transform="translate(8.000000, 11.500000) rotate(-180.000000) translate(-8.000000, -11.500000) "></path> <path d="M0.5,12 C0.22,12 -1.34760666e-14,11.78 -1.34760666e-14,11.5 L-1.42108547e-14,2.5 C-1.42108547e-14,1.68 0.68,1 1.5,1 L14.5,1 C15.32,1 16,1.68 16,2.5 L16,11.5 C16,11.78 15.78,12 15.5,12 L0.5,12 Z M1,11 L15,11 L15,2.5 C15,2.22 14.78,2 14.5,2 L1.5,2 C1.22,2 1,2.22 1,2.5 L1,11 Z M9.5,16 C8.68,16 8,15.32 8,14.5 L8,13.5 C8,13.22 8.22,13 8.5,13 C8.78,13 9,13.22 9,13.5 L9,14.5 C9,14.78 9.22,15 9.5,15 L14.5,15 C14.78,15 15,14.78 15,14.5 L15,13.5 C15,13.22 15.22,13 15.5,13 C15.78,13 16,13.22 16,13.5 L16,14.5 C16,15.32 15.32,16 14.5,16 L9.5,16 Z" id="c-2" transform="translate(8.000000, 8.500000) rotate(-180.000000) translate(-8.000000, -8.500000) "></path> </g> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/folder-option.js", {
    name: "symbols/folder-option",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="folder-option" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g id="Layer 1"> <path d="M3.5,11c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5Z"/> <path d="M9.5,11c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5Z"/> <path d="M15.5,11c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5Z"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/folder-arrow.js", {
    name: "symbols/folder-arrow",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="folder-arrow" width="15px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="folder-arrow"> <path d="M13.61,16.8575 C13.79,16.6575 13.79,16.3375 13.61,16.1375 L7.45,9.9975 L13.61,3.8575 C13.79,3.6575 13.79,3.3375 13.61,3.1375 C13.41,2.9575 13.09,2.9575 12.89,3.1375 L6.39,9.6375 C6.21,9.8375 6.21,10.1575 6.39,10.3575 L12.89,16.8575 C12.99,16.9575 13.13,16.9975 13.25,16.9975 C13.37,16.9975 13.51,16.9575 13.61,16.8575 Z" id="w"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/styles/sidebarFolder.js", {
    name: "sidebarFolder",
    data: ".sidebarFolder{position:relative;overflow:hidden;-webkit-transition:background 150ms ease-in-out;-moz-transition:background 150ms ease-in-out;-o-transition:background 150ms ease-in-out;-ms-transition:background 150ms ease-in-out;transition:background 150ms ease-in-out;}.sidebarFolder:hover{cursor:pointer}.sidebarFolder ul{padding:0;-webkit-transition:height 150ms ease-in-out;-moz-transition:height 150ms ease-in-out;-o-transition:height 150ms ease-in-out;-ms-transition:height 150ms ease-in-out;transition:height 150ms ease-in-out}.sidebarFolder .folder-header{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;padding-left:8px;padding-right:8px;position:relative;height:38px;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}.sidebarFolder .folder-header .title{font-size:15px !important}.sidebarFolder .folder-header input.title{width:172px !important;height:20px;padding:0 6px !important}.sidebarFolder .folder-header span.title{top:0;white-space:pre;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:inline-block;padding-left:6px;padding-right:6px;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.sidebarFolder .folder-header span.folder-icon{padding-left:3px;padding-right:3px}.sidebarFolder .folder-header svg{fill:#737272;height:20px;width:20px;}.sidebarFolder .folder-header svg.folders{fill:#2b8dec}.sidebarFolder .folder-header .folder-arrow{-webkit-transition:-webkit-transform 150ms ease-in-out;-moz-transition:-moz-transform 150ms ease-in-out;-o-transition:-o-transform 150ms ease-in-out;-ms-transition:-ms-transform 150ms ease-in-out;transition:transform 150ms ease-in-out;-webkit-backface-visibility:hidden}.sidebarFolder .folder-header .folder-option{display:none}.sidebarFolder .folder-header .folder-option-button{display:block;height:20px;width:20px;padding-left:5px;padding-right:5px;z-index:1;}.sidebarFolder .folder-header .folder-option-button:focus svg{fill:#328ad6}.sidebarFolder.collapsed ul{height:0 !important;}.sidebarFolder.collapsed ul li{display:none}.sidebarFolder.expanded{padding-bottom:7px;background:#f2f2f2;}.sidebarFolder.expanded .folder-header .folder-option{display:block}.sidebarFolder.active{background:rgba(50,138,214,0.1);}.sidebarFolder.active .folder-option{display:block}.sidebarFolder .sidebarItem .list-icon,.sidebarFolder .sidebarItem span.title{text-indent:16px}#wunderlist-base.nodewebkit .sidebarFolder .folder-option{display:none}html[dir=ltr] .sidebarFolder.expanded .folder-header .folder-arrow{-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-o-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg)}html[dir=rtl] .sidebarFolder .folder-header .folder-arrow{-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);-o-transform:rotate(-180deg);-ms-transform:rotate(-180deg);transform:rotate(-180deg)}html[dir=rtl] .sidebarFolder.expanded .folder-header .folder-arrow{-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-o-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg)}"
}),
define("views/Sidebar/FolderItemView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Sidebar/Controllers/FolderItemController", "views/Sidebar/FolderCollectionView", "views/Popovers/FolderMenu", "wunderbits/mixins/UnicodeEmojiViewMixin", "helpers/domtools", "template!sidebarFolder", "partial!symbols/folders", "partial!symbols/folder-option", "partial!symbols/folder-arrow", "style!sidebarFolder"], function(e, t, i, n, o, a, r, s, l, c, d, u) {
    var m = t.prototype
      , p = t.extend({
        "implements": [i],
        observes: {
            model: {
                "change:title": "_renderTitle",
                "change:expanded": "_renderExpanded"
            }
        },
        emits: {
            "click .folder-header .folder-arrow": "click:expand",
            "click .folder-header": "click:expand",
            "keydown .folder-header": "keydown:folder",
            "keydown .folder-header .folder-option-button": "keydown:folderOptions",
            "keydown .folder-header input.title": "keydown:titleInput",
            "blur .folder-header input.title": "blur:titleInput",
            focus: "focus"
        },
        events: {
            "click .folder-option": "_toggleMenu"
        },
        styles: [u],
        template: s,
        tagName: "li",
        className: "sidebarFolder collapsed",
        attributes: {
            tabindex: 0
        },
        initialize: function(e) {
            var t = this;
            t.folderActions = e.folderActions,
            t._hasRendered = !1,
            m.initialize.apply(t, arguments);
        },
        formatData: function() {
            var e = this
              , t = e.model.attributes;
            return {
                isEditingTitle: e._isEditingTitle,
                titleText: t.title,
                title: t.title,
                id: t.id
            };
        },
        render: function() {
            var e = this;
            return e._hasRendered ? e : (e._hasRendered = !0,
            m.render.call(e),
            e.listsView = new n({
                folderActions: e.folderActions,
                model: e.model
            }),
            e.addSubview(e.listsView),
            e.listsView.render(),
            e.el.querySelector(".folder-container").appendChild(e.listsView.el),
            e.el.setAttribute("rel", e.model.id),
            e._renderTitle(),
            e._renderExpanded(),
            e);
        },
        _renderExpanded: function() {
            var e = this
              , t = e.model.isExpanded();
            t || e.menu && e.menu.close(),
            e.$el.toggleClass("expanded", t),
            e.$el.toggleClass("collapsed", !t),
            e.$(".folder-header").attr("aria-expanded", t);
        },
        expand: function() {
            var e = this;
            e.model.save("expanded", !0);
        },
        collapse: function() {
            var e = this;
            e.model.save("expanded", !1);
        },
        _updateTitleIfDone: function() {
            var e = this
              , t = e.$(".folder-header");
            t.find("input.title").addClass("hidden"),
            t.find("span.title").removeClass("hidden"),
            t.find(".folder-option").removeClass("hidden"),
            e._renderTitle();
        },
        enterEditMode: function(e) {
            var t = this;
            t.editReturnRoute = e && e.returnRoute;
            var i = t.$(".folder-header")
              , n = i.find("input.title");
            n.removeClass("hidden"),
            n.select(),
            i.find("span.title").addClass("hidden"),
            i.find(".folder-option").addClass("hidden");
        },
        exitEditMode: function() {
            var t = this
              , i = t.$(".folder-header");
            i.find("input.title").addClass("hidden"),
            i.find("span.title").removeClass("hidden"),
            i.find(".folder-option").removeClass("hidden"),
            t._renderTitle(),
            t.editReturnRoute && e.trigger("route:" + t.editReturnRoute);
        },
        getTitleInputValue: function() {
            return this.el.querySelector("input.title").value;
        },
        _dissolveFolder: function() {
            this.folderActions.dissolve();
        },
        _renderTitle: function() {
            var e = this
              , t = e.model.attributes.title;
            r.setText(e.el.querySelector("span.title"), t),
            e.el.querySelector(".folder-header").setAttribute("aria-label", t),
            e.el.querySelector("input.title").value = t,
            e.renderEmoji(e.$(".folder-header span.title")),
            e.$(".folder-header").attr("aria-label", t);
        },
        _toggleMenu: function(e) {
            var t = this;
            t.menu ? (t.menu.close(),
            t.menu = void 0) : t._showMenu(),
            e.stopPropagation();
        },
        _showMenu: function() {
            var e = this;
            e.menu = new o({
                target: e.$(".folder-option"),
                name: "menu",
                onClose: function() {
                    e.menu = void 0,
                    e.$el.focus();
                }
            }),
            e.bindTo(e.menu, "click", "_onMenuClick"),
            e.addSubview(e.menu, "menu"),
            e.menu.open({});
        },
        _onMenuClick: function(t) {
            var i = this
              , n = t.currentTarget.getAttribute("rel");
            i.destroySubview("menu"),
            "rename" === n ? e.trigger("route:folders/" + i.model.id + "/edit") : "remove" === n && i._dissolveFolder();
        }
    });
    return a.applyToClass(p),
    p;
}),
define("helpers/dnd/SidebarDropList", ["./ItemDropZoneList", "./ItemDropZone", "../domtools"], function(e, t, i) {
    var n = t.extend({
        isDropAllowed: function() {
            return !1;
        }
    })
      , o = "application/x-wunderlist-task"
      , a = "application/x-wunderlist-list"
      , r = "application/x-wunderlist-folder"
      , s = 34
      , l = e.prototype
      , c = e.extend({
        initialize: function(e) {
            var i = this
              , c = e.itemDragger;
            i.getMimetypeForItem = e.getMimetypeForItem;
            var d = [Math.ceil(.3 * s), Math.ceil(.4 * s)]
              , u = [0, Math.floor(.3 * s)];
            i.topDropZone = new t({
                className: "dragAreaTop",
                top: 2,
                topArea: u,
                acceptedMimetypes: [a, r]
            }),
            i.listHeaderDropZone = new t({
                className: "dragAreaFolder",
                topArea: d,
                acceptedMimetypes: [a],
                appliesToItem: function(e) {
                    return i.getMimetypeForItem(e) === a;
                }
            }),
            i.folderHeaderDropZone = new n({
                topArea: d,
                acceptedMimetypes: [a, o],
                appliesToItem: function(e) {
                    return i.getMimetypeForItem(e) === r;
                }
            }),
            i.bottomDropZone = new t({
                className: "dragAreaBottom",
                bottomArea: u,
                acceptedMimetypes: [a, r]
            }),
            l.initialize.call(i, c, [i.topDropZone, i.bottomDropZone, i.listHeaderDropZone, i.folderHeaderDropZone]),
            i.bindTo(i.topDropZone, "drop", "_onTopZoneDropped"),
            i.bindTo(i.bottomDropZone, "drop", "_onBottomZoneDropped"),
            i.bindTo(i.listHeaderDropZone, "drop", "_onCreateFolder"),
            i.bindTo(i.folderHeaderDropZone, "itementer", "_onEnterFolderHeader"),
            i.bindTo(i.folderHeaderDropZone, "itemleave", "_onLeaveFolderHeader");
        },
        _onTopZoneDropped: function(e, t) {
            var n = this
              , o = e.item
              , a = i.previousElement(o);
            n.trigger("droppedBetween", e.getDragData(t), a, o, t);
        },
        _onBottomZoneDropped: function(e, t) {
            var n = this
              , o = e.item
              , a = i.nextElement(o);
            n.trigger("droppedBetween", e.getDragData(t), o, a, t);
        },
        _onCreateFolder: function(e, t) {
            var i = this;
            i.trigger("createFolder", e.getDragData(t), t, e.item);
        },
        _onEnterFolderHeader: function(e) {
            var t = this;
            t.trigger("enterFolderHeader", e.item);
        },
        _onLeaveFolderHeader: function(e) {
            var t = this;
            t.trigger("leaveFolderItem", e.item);
        }
    });
    return c;
}),
define("/styles/_sort.js", {
    name: "_sort",
    data: '.tasks .dragAreaTop{border-top:1px solid #3c77d4;margin-top:-1px;margin-left:-10px;padding-left:10px;margin-right:-15px;padding-right:15px}.tasks .dragAreaBottom{border-bottom:1px solid #3c77d4;height:46px;margin-left:-10px;padding-left:10px;margin-right:-15px;padding-right:15px}.task-list.week .tasks.lists-in-filter-hover{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60)}.subtasks .dragAreaTop:after,.subtasks .dragAreaBottom:after{content:\'\';position:absolute;left:-7px;right:-7px}.subtasks .dragAreaTop:after{top:-1px;border-top:2px solid #328ad6}.subtasks .dragAreaBottom:not(.subtask-add):after{bottom:-1px;border-bottom:2px solid #328ad6}.lists-collection .dragAreaFolder{background-color:#d8ecff;}.lists-collection .dragAreaFolder:before{content:\'\';-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;border:2px solid #328ad6;width:100%;height:inherit}.lists-collection .dragAreaTop,.lists-collection .dragAreaBottom{overflow:visible !important;position:relative}.lists-collection .dragAreaTop > a:after,.lists-collection .dragAreaBottom > a:after{content:"";position:absolute;left:30px;right:10px;height:0;border-bottom:2px solid #2e5fc9}.lists-collection .dragAreaTop > a:after{top:-1px}.lists-collection .dragAreaBottom > a:after{bottom:-1px}.lists-collection .dragAreaTop .folder-container:after,.lists-collection .dragAreaBottom .folder-container:after{content:"";position:absolute;left:30px;right:10px;height:0;border-bottom:2px solid #2e5fc9}.lists-collection .dragAreaTop .folder-container:after{top:-2px}.lists-collection .dragAreaBottom .folder-container:after{bottom:-2px}.lists-collection .dragAreaBottom:after,.lists-collection .dragAreaTop:after{content:"";position:absolute;left:30px;-webkit-border-radius:4px;border-radius:4px;width:4px;height:4px;border:2px solid #2e5fc9;background-color:#fff}.lists-collection .sidebarFolder .dragAreaBottom:after,.lists-collection .sidebarFolder .dragAreaTop:after{left:46px}.lists-collection .sidebarFolder .dragAreaTop > a:after,.lists-collection .sidebarFolder .dragAreaBottom > a:after{left:46px}.lists-collection .dragAreaBottom:after{bottom:-4px}.lists-collection .dragAreaBottom.sidebarFolder:after{bottom:-5px}.lists-collection .dragAreaTop:after{top:-4px}.lists-collection .dragAreaTop.sidebarFolder:after{top:-5px}.lists-collection.lists-in-filter-hover{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60)}.subtask-drag-clone{background-color:#fafafa;list-style:none;-webkit-user-select:none;width:300px;border:1px solid #328ad6 !important;overflow:hidden;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}.subtask-drag-clone .section-icon{height:32px;width:32px;}.subtask-drag-clone .section-icon svg{margin:6px}.subtask-drag-clone .section-delete{display:none}.subtask-drag-clone .section-content{margin:0 6px;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.list-drag-clone{background-color:#fafafa;list-style:none;-webkit-user-select:none;width:270px;padding:0;z-index:-1 !important}.task-drag-clone{width:300px;position:absolute;top:100%;}.task-drag-clone .badge{position:absolute;z-index:9999;right:0;top:0;padding:10px 7px;text-align:center;font-size:12px;color:#fff;-webkit-border-radius:15px;border-radius:15px;background:#d74e48;line-height:0}.new-list-dropzone{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.list-hover{-webkit-box-shadow:inset 0 0 0 2px #2b88d9;box-shadow:inset 0 0 0 2px #2b88d9}.no-animate{-webkit-transition:none !important;-moz-transition:none !important;-o-transition:none !important;-ms-transition:none !important;transition:none !important}'
}),
define("views/Sidebar/ListsCollectionView", ["application/runtime", "actions/Factory", "views/Sidebar/DraggableListView", "views/Sidebar/ListItemView", "views/Sidebar/FolderItemView", "views/Sidebar/Controllers/ListCollectionDragController", "views/Sidebar/DropOnListMixin", "helpers/dnd/index", "helpers/dnd/SidebarDropList", "helpers/dnd/ItemDragger", "project!core", "style!_sort"], function(e, t, i, n, o, a, r, s, l, c, d, u) {
    var m = e._
      , p = d.WBDeferred
      , g = "application/x-wunderlist-list"
      , f = "application/x-wunderlist-folder"
      , b = i.prototype
      , h = i.extend({
        className: "lists-collection",
        styles: [u],
        "implements": [a],
        initialize: function(i) {
            var n = this;
            n.taskLookup = t.taskLookup(),
            n.sidebarActions = i.sidebarActions,
            n.ready = new p(),
            n.hasRendered = new p(),
            n._debouncedDelegateEvents = n.debounce(n.delegateEvents, 100),
            n._expandOnDragEnterTimer = null,
            n.triggerUserListRendered = m.once(function() {
                e.trigger("timeline:start", "user_lists_rendered");
            }),
            b.initialize.call(n, {
                collection: n.sidebarActions.getRootCollection()
            }),
            n.setupBinds(),
            n.enableDropOnList(function(e) {
                return n._getMimetypeForListItem(e) === g;
            }),
            n._enableDragToReorderList();
        },
        _getMimetypeForListItem: function(e) {
            return e.classList.contains("sidebarFolder") ? f : e.classList.contains("list") ? g : "";
        },
        _getItemHandle: function(e) {
            if (e) {
                var t = this._getMimetypeForListItem(e)
                  , i = e.getAttribute("rel");
                return this.sidebarActions.createIdHandle(i, t);
            }
        },
        _enableDragToReorderList: function() {
            var e = this;
            e._setupDragHelper(e._getMimetypeForListItem.bind(e)),
            e.dropHelper = new l({
                itemDragger: new c(e.el),
                getMimetypeForItem: e._getMimetypeForListItem.bind(e)
            }),
            e.bindTo(e.dropHelper, "createFolder", e._onCreateFolder),
            e.bindTo(e.dropHelper, "enterFolderHeader", e._startExpandFolderWhenDragging),
            e.bindTo(e.dropHelper, "leaveFolderItem", e._cancelExpandFolderWhenDragging),
            e.bindTo(e.dropHelper, "droppedBetween", e._onDropInbetween),
            e.dropHelper.enable();
        },
        setupBinds: function() {
            var t = this;
            t.tasks = t.taskLookup.allTasks,
            t.bindTo(t.tasks, "add remove reset", function() {
                e.trigger("savedSeach:updateCount");
            });
            var i = new p();
            t.bindTo(e, "lists:ready", function() {
                i.resolve();
            }),
            t.when(i).done(function() {
                t.lists = t.collection,
                t.bindTo(e, "window:resize", t._debouncedDelegateEvents),
                t.ready.resolve();
            }, t),
            t.bindTo(e, "query:apply", t.applyQuery);
        },
        render: function() {
            var t = this;
            return t.ready.done(function() {
                b.render.apply(t, arguments),
                e.trigger("lists:rendered"),
                t.hasRendered.resolve();
            }),
            t;
        },
        applyQuery: function(t, i) {
            var n = this
              , o = n.lists.get(t)
              , a = n.tasks.get(i)
              , r = o.getCleanTitle()
              , s = r.split(" ")
              , l = a.attributes.title;
            m.each(s, function(e) {
                var t = 0 === e.indexOf("#")
                  , i = l.indexOf(e) >= 0;
                t && !i && (l += " " + e);
            }),
            a.save({
                title: l
            }, {
                success: function() {
                    e.trigger("savedSeach:updateCount");
                }
            });
        },
        getViewInstanceForModel: function(e) {
            var t, i = this, a = e.attributes.type;
            return i.triggerUserListRendered(),
            t = "list" === a ? new n({
                model: e
            }) : new o({
                model: e,
                folderActions: i.sidebarActions.getFolderActions(e.id)
            }),
            i.addSubview(t, a + e.id),
            i.dragHelper.prepareItem(t.el),
            t;
        },
        _onDropInbetween: function(e, t, i, n) {
            var o = this
              , a = o._getItemHandle(t)
              , r = o._getItemHandle(i);
            n === g ? o.sidebarActions.moveListInRoot(e, a, r) : n === f && o.sidebarActions.repositionFolder(e, a, r);
        },
        onDestroy: function() {
            var e = this;
            e.dragHelper.destroy(),
            e.dropHelper.destroy(),
            e.dropOnListHelper.destroy(),
            b.onDestroy.call(e);
        },
        editFolder: function(e, t) {
            var i = this
              , n = i.getSubview("folder" + e);
            n && n.enterEditMode(t);
        },
        _onCreateFolder: function(t, i, n) {
            var o = this;
            if (i === g) {
                var a = n.getAttribute("rel")
                  , r = e.language.getText("folder_title_placeholder")
                  , s = o.sidebarActions.createFolder(r, t, a);
                e.trigger("route:folders/" + s + "/edit");
            }
        },
        _startExpandFolderWhenDragging: function(e) {
            var t = this;
            t._expandOnDragEnterTimer || (t._expandOnDragEnterTimer = setTimeout(function() {
                var i = e.getAttribute("rel")
                  , n = t.getSubview("folder" + i);
                n && n.expand(),
                t._expandOnDragEnterTimer = null;
            }, 500));
        },
        _cancelExpandFolderWhenDragging: function() {
            var e = this;
            e._expandOnDragEnterTimer && (clearTimeout(e._expandOnDragEnterTimer),
            e._expandOnDragEnterTimer = null);
        }
    });
    return r.applyToClass(h),
    h;
}),
define("models/FilterModel", ["wunderbits/WBModel"], function(e) {
    return e.extend({
        defaults: {
            type: "Filter",
            isFilter: !0
        }
    });
}),
define("views/Sidebar/SmartListItemView", ["application/runtime", "actions/Factory", "views/Sidebar/ItemView"], function(e, t, i, n) {
    var o = i.prototype;
    return i.extend({
        renderData: {
            iconLabel: n,
            titleText: n,
            completedSmartList: n,
            todaySmartList: n
        },
        initialize: function() {
            var e = this;
            e.checkVisibility = e.debounce(e.checkVisibility, 250, {
                leading: !0,
                trailing: !0
            }),
            e.taskLookup = t.taskLookup(),
            o.initialize.apply(e, arguments),
            e.bindVisibilityEvents(),
            e.bindScopedCollectionEvents();
        },
        bindVisibilityEvents: function() {
            var t = this
              , i = t.model.attributes.name;
            i = "completed" === i ? "done" : i,
            i = "assigned" === i ? "assigned_to_me" : i,
            t.visibilitySettingKey = "smartlist_visibility_" + i;
            var n = "change:" + t.visibilitySettingKey;
            t.bindTo(t.collection, "add remove", "checkVisibility"),
            t.bindTo(e.settings, n, "checkVisibility"),
            t.bindTo(e, "routed", "checkVisibility");
        },
        isTodayOrWeek: function() {
            var e = this
              , t = e.model.attributes.name;
            return "today" === t || "week" === t;
        },
        bindScopedCollectionEvents: function() {
            var t = this;
            t.isTodayOrWeek() && t.bindTo(e.settings, "change:today_smart_list_visible_tasks", function() {
                t.collection = t.getCollection(),
                t.overdueCollection = t.getOverdueCollection(),
                t.bindCountCollections(),
                t.updateCount(),
                t.updateOverdueCount(),
                t.render();
            });
        },
        getCollection: function() {
            var t, i = this;
            return i.isTodayOrWeek() && e.settings.isScopedFiltersEnabled() && (t = "user"),
            i.taskLookup.getSmartListTaskCollection(i.model.attributes.name, t);
        },
        getOverdueCollection: function() {
            return this.getCollection().overdueTasks;
        },
        getPublicUrl: function() {
            return "#/lists/" + this.model.attributes.name;
        },
        getIconClass: function() {
            return this.model.attributes.name;
        },
        formatData: function(e) {
            var t = this;
            if (e = o.formatData.call(t, e),
            e.id = t.model.attributes.name,
            e.title = t.model.attributes.title,
            e.titleText = t.model.attributes.titleText,
            e.completedSmartList = e.id && "completed" === e.id,
            e.todaySmartList = e.id && "today" === e.id,
            e.todaySmartList) {
                var i = new Date();
                e.iconLabel = i.getDate();
            }
            return e;
        },
        render: function() {
            var e = this
              , t = e.formatData(e.renderData);
            return o.render.call(e, t),
            e.$el.attr("rel", t.name).attr("data-type", "filter"),
            e.checkVisibility(),
            e.renderIconTitle(),
            e;
        },
        getLocalizedLabel: function() {
            var t = this
              , i = t.model.attributes.titleText
              , n = e.language.getText("aria_list_$_with_$_items", i, t.collection.length)
              , o = t.stateModel.attributes.overdueCount;
            return o && (n += ", " + e.language.getText("voiceover_sidebar_list_$_items_overdue", o)),
            {
                title: i,
                aria: n
            };
        },
        renderAriaLabel: function() {
            var e = this
              , t = e.getLocalizedLabel().aria;
            e.$el.attr("aria-label", t);
        },
        renderIconTitle: function() {
            var e = this;
            e.$(".list-icon").attr("title", e.getLocalizedLabel().title);
        },
        hide: function() {
            var t = this
              , i = e.currentRoute()
              , n = -1 !== i.indexOf("lists/")
              , o = -1 !== i.indexOf("lists/" + t.model.attributes.name)
              , a = -1 !== i.indexOf("preferences");
            n && o ? (t.$el.addClass("forced-visible animate-down visible").removeClass("animate-up"),
            t.makeAriaVisible()) : (!o || a) && (t.$el.removeClass("forced-visible animate-down visible").addClass("animate-up"),
            t.hideFromAria(),
            e.trigger("smartlist:hidden", t.model.attributes.name));
        },
        show: function() {
            var t = this;
            t.$el.removeClass("animate-up").addClass("animate-down visible").attr("aria-hidden", !1),
            t.makeAriaVisible(),
            e.trigger("smartlist:visible", t.model.attributes.name);
        },
        hideFromAria: function() {
            this.$el.attr("aria-hidden", "true").attr("tabindex", "-1");
        },
        makeAriaVisible: function() {
            this.$el.attr("aria-hidden", "false").attr("tabindex", "0");
        },
        checkVisibility: function() {
            var t = this
              , i = t.collection.count || t.collection.models.length
              , n = e.settings.get(t.visibilitySettingKey);
            "completed" === t.model.attributes.name && (i = t.collection.length);
            var o = "hidden" === n
              , a = "visible" === n;
            t.$el.toggleClass("user-disabled", o),
            t.$el.toggleClass("user-enabled", a),
            o || 0 === i && "auto" === n ? t.hide() : ("visible" === n || i > 0 && "auto" === n) && t.show();
        }
    });
}),
define("helpers/PromiseTree", ["vendor/when", "project!core"], function(e, t) {
    var i = t.WBClass.extend({
        initialize: function() {
            var t = this;
            t.isDone = !1,
            t.doneDeferred = e.defer(),
            t.rootDeferred = e.defer(),
            t.branches = {
                main: t.rootDeferred.promise
            };
        },
        append: function(e, t) {
            var i, n = this;
            t = n._getBranchName(t),
            i = n._getBranch(t),
            n.branches[t] = i.then(e);
        },
        branch: function(e, t) {
            var i, n = this;
            e = n._getBranchName(e),
            t = n._getBranchName(t),
            i = n._getBranch(t),
            n.branches[e] || (n.branches[e] = i);
        },
        run: function() {
            var t = this
              , i = Object.keys(t.branches).map(function(e) {
                return t.branches[e];
            });
            e.all(i).done(function() {
                t.doneDeferred.resolve();
            }, function(e) {
                t.doneDeferred.reject(e);
            }),
            t.rootDeferred.resolve();
        },
        done: function() {
            var e = this;
            return e.doneDeferred.promise;
        },
        _getBranch: function(e) {
            var t = this
              , i = t.branches[e];
            if (!i)
                throw new Error("invalid branch name: " + e);
            return i;
        },
        _getBranchName: function(e) {
            return e || "main";
        }
    });
    return i;
}),
define("helpers/animation", ["./PromiseTree"], function(e) {
    function t() {
        return document.body.classList.contains("animate");
    }
    function i(i) {
        return i || (i = !0),
        t() ? {
            animate: i,
            animations: new e()
        } : void 0;
    }
    return {
        animationEnabled: t,
        animateOptions: i
    };
}),
define("views/Sidebar/Controllers/SmartListsCollectionDragController", ["application/runtime", "wunderbits/WBViewController", "actions/Factory", "helpers/animation", "project!core"], function(e, t, i, n, o) {
    var a = t.prototype
      , r = o.lib.extend
      , s = t.extend({
        "implements": {
            tasksDropped: "_handleTasksDroppedOnSmartList"
        },
        initialize: function() {
            var e = this;
            e.taskDue = i.taskDue(),
            e.completeTask = i.completeTask(),
            e.starTask = i.starTask(),
            e.assignTask = i.assignTask(),
            e.reparentTask = i.reparentTask(),
            a.initialize.apply(e, arguments);
        },
        _handleTasksDroppedOnSmartList: function(t, i) {
            var o = this
              , a = "completed" === t ? "completion" : void 0
              , s = n.animateOptions(a);
            switch (t) {
            case "inbox":
                o._handleMoveTasksToList(t, i);
                break;

            case "starred":
                var l = "true" === e.settings.attributes.behavior_star_tasks_to_top
                  , c = {
                    moveToTop: l
                };
                s = l && s,
                s && (c = r(c, s)),
                o.starTask.starTasks(i, c);
                break;

            case "completed":
                o.completeTask.completeTasks(i, s);
                break;

            case "assigned":
                o.assignTask.limit.isUserAllowedToAssign(e.listId, i, !0) ? o.assignTask.assignTasksToMe(i, s) : o.assignTask.limit.reached();
                break;

            case "today":
                o.taskDue.setTasksDueToday(i, s);
            }
            s && s.animations.run();
        },
        _handleMoveTasksToList: function(e, t) {
            var i = this;
            i.reparentTask.moveTasksToList(e, t);
        }
    });
    return s;
}),
define("views/Sidebar/SmartListsCollectionView", ["application/runtime", "models/FilterModel", "views/Sidebar/SmartListItemView", "views/Sidebar/Controllers/SmartListsCollectionDragController", "views/Sidebar/DropOnListMixin", "wunderbits/WBViewPresenter", "project!core"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = r.WBDeferred
      , c = e.smartLists
      , d = a.prototype
      , u = a.extend({
        tagName: "ul",
        className: "filters-collection",
        "implements": [n],
        initialize: function() {
            var t = this;
            d.initialize.apply(t, arguments),
            t.ready = new l(),
            t.hasRendered = new l(),
            t.bindTo(e, "lists:ready", t.ready.resolve, t.ready),
            t.bindTo(e, "sidebar:forcedVisibleList", t.setForcedVisible),
            t.enableDropOnList(function(e) {
                var t = e.getAttribute("rel")
                  , i = ["inbox", "starred", "completed", "assigned", "today"].indexOf(t);
                return -1 !== i;
            });
        },
        render: function() {
            var e = this;
            return e.ready.done(function() {
                d.render.apply(e, arguments),
                e.hasCalledRenderOnce = !0,
                e.destroySubviews();
                var t = e.renderFiltersToFragment();
                e.$el.empty().append(t),
                e.hasRendered.resolve();
            }),
            e;
        },
        _renderFilter: function(n) {
            var o = this
              , a = "assigned" === n ? "assigned_to_me" : n
              , r = new t({
                title: e.language.getLabel("smart_list_" + a),
                titleText: e.language.getText("smart_list_" + a),
                name: n
            })
              , s = o.addSubview(new i({
                model: r
            }), n);
            return s.render().el;
        },
        renderFiltersToFragment: function() {
            var e = this
              , t = document.createDocumentFragment();
            return e._filterBindings && s.each(e._filterBindings, e.unbind),
            e._filterBindings = [],
            s.each(c, function(i) {
                t.appendChild(e._renderFilter(i));
            }),
            t;
        },
        setForcedVisible: function(e) {
            var t = this
              , i = t.$('[rel="' + e + '"]');
            t.$revertItem = i;
        },
        ensureVisibility: function(e) {
            var t = this;
            if (t.$revertItem && (t.$revertItem.addClass("animate-up").removeClass("forced-visible").removeClass("visible").removeClass("animate-down"),
            delete t.$revertItem),
            c.indexOf(e) >= 0) {
                var i = t.$('[rel="' + e + '"]')
                  , n = i.hasClass("user-disabled");
                n && (i.addClass("forced-visible").addClass("animate-down").removeClass("animate-up").css("opacity", 0).animate({
                    opacity: 1
                }),
                t.$revertItem = i);
            }
        },
        onDestroy: function() {
            var e = this;
            e.dropOnListHelper.destroy(),
            d.onDestroy.call(e);
        }
    });
    return o.applyToClass(u),
    u;
}),
define("views/Sidebar/Controllers/SidebarController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "wunderbits/WBViewController"], function(e, t, i, n, o) {
    var a = e.$
      , r = o.prototype;
    return o.extend({
        "implements": {
            "delete:selected": "deleteSelected",
            "copy:selected": "copySelected",
            "paste:lists": "pasteLists",
            "click:list": "openList",
            "doubleClick:list": "editList",
            "click:edit": "editList",
            "route:list": "routeToList"
        },
        initialize: function() {
            var e = this;
            r.initialize.apply(e, arguments),
            e.listLookup = t.listLookup(),
            e.duplication = t.duplication();
        },
        openList: function(t) {
            var i = this
              , n = i.view
              , o = a(t.target);
            if (i.view.listsView.blockListChangeFromDragEnd && e.env.isTouchDevice() && "MSPointerDown" !== t.type || o.closest("li").hasClass("dropped-list") && e.env.isFirefox())
                return o.closest("li").removeClass("dropped-list"),
                void t.preventDefault();
            t && "MSPointerDown" !== t.type && t && t.preventDefault();
            var r = a(t.target).closest("li").attr("rel")
              , s = n.lists.get(r);
            r = s ? s.id : r;
            var l = function() {
                i.view.setSelectionByID(r),
                e.trigger("focus:set", "sidebar").trigger("browser:unselect"),
                e.trigger("search:cancel"),
                i.defer(function() {
                    i.routeToList(r);
                }),
                i.isOpeningList = !0,
                window.setTimeout(function() {
                    i.isOpeningList = !1;
                }, 1),
                n.shouldCollapseOnListSelect() && n.toggleLists();
            };
            i.view.setSelectionByID(r),
            i.defer(l);
        },
        editList: function(t) {
            var i = this;
            if (t) {
                var n = a(t.target).closest(".list").attr("rel");
                if (t && t.editTarget && t.editTarget.id && (n = t.editTarget.id),
                n) {
                    var o = i.view.lists.get(n);
                    o && "inbox" !== n && i.defer(function() {
                        e.trigger("route:" + o.route("/edit"));
                    });
                }
            }
        },
        _sidebarIsFocussed: function() {
            return "sidebar" === e.focus;
        },
        _getSelectedListModel: function() {
            var e = this
              , t = e.view
              , i = t.$(".active").attr("rel");
            return i && e.listLookup.getListModel(i);
        },
        deleteSelected: function() {
            var e = this
              , t = e.view
              , i = e._getSelectedListModel();
            i && !i.isInbox() && t.deleteAndSelectNext(i);
        },
        copySelected: function() {
            var t = this;
            if (t._sidebarIsFocussed()) {
                var i = t._getSelectedListModel();
                i && t.duplication.copyLists([i.id]),
                e.trigger("analytics:copy:lists", "keyboard"),
                e.trigger("trackingService", "client.copy.lists", "keyboard");
            }
        },
        pasteLists: function() {
            var t = this;
            if (t._sidebarIsFocussed()) {
                var i = t._getSelectedListModel();
                i && !i.isInbox() && (t.duplication.pasteLists(i.id).done(function(t) {
                    var i = t[0];
                    i && e.trigger("route:" + i.route());
                }),
                e.trigger("analytics:paste:lists", "keyboard"),
                e.trigger("trackingService", "client.paste.lists", "keyboard"));
            }
        },
        routeToList: function(t) {
            var i = this
              , n = i.view.lists.get(t);
            if (n && n.isSavedSearch())
                i.defer(function() {
                    e.trigger("route:search/" + encodeURIComponent(n.getCleanTitle()));
                });
            else if (n) {
                var o = n.route()
                  , a = n.route("/edit");
                e.currentRoute() !== a && e.trigger("route:" + o);
            } else
                e.smartLists.indexOf(t) >= 0 && e.trigger("route:lists/" + t);
        }
    });
}),
