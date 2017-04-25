
define("views/Print/PrintView", ["application/runtime", "actions/Factory", "wunderbits/WBView", "collections/comparators", "wunderbits/helpers/date", "wunderbits/mixins/UnicodeEmojiViewMixin", "vendor/moment", "views/Print/PrintListItem", "views/Print/PrintTaskItem", "style!_print"], function(e, t, i, n, o, a, r, s, l, c) {
    var d = e.$
      , u = e._
      , m = e.smartLists
      , p = i.prototype
      , g = i.extend({
        styles: [c],
        id: "print",
        initialize: function() {
            var e = this;
            p.initialize.apply(e, arguments),
            e.listLookup = t.listLookup(),
            e.taskLookup = t.taskLookup();
        },
        render: function() {
            var t = this;
            p.render.apply(t, arguments),
            t.destroySubviews(),
            t.$el.empty();
            var i = e.currentRoute();
            t.isFullscreenNote = /\/note\/fullscreen/.test(i),
            t.isDetailRoute = /tasks\//.test(i);
            var n = "selectedTasks" === e.printType || !e.printType && (t.isDetailRoute || t.isFullscreenNote)
              , o = [];
            return n && (o = t._getSelectedTaskIds()),
            0 === i.indexOf("search") ? t.printSearch(o) : u.indexOf(m, e.listId) > -1 ? t.printSmartList(e.listId, o) : t.printNormalList(e.listId, o),
            t.$el.toggleClass("fullscreen-note", t.isFullscreenNote),
            t.$el.toggleClass("task-details", !t.isFullscreenNote && t.isDetailRoute && 1 === o.length),
            t.renderEmoji(t.$el, !0),
            t;
        },
        printNormalList: function(e, t) {
            var i = this
              , n = i.addSubview(new s({
                listId: e,
                taskIds: t
            }), e);
            i.el.appendChild(n.render().el);
        },
        printSearch: function(e) {
            var t = this
              , i = {};
            i.isSmartList = !0,
            i.listId = "search",
            i.taskIds = e;
            var n = t.taskLookup.getCurrentSearchTaskCollection();
            if (n) {
                var o = n.models;
                e && e.length && (o = t.filterModelsByIds(o, e));
                var a = u.groupBy(o, function(e) {
                    return e.attributes.list_id;
                })
                  , r = u.keys(a);
                r = r.filter(function(e) {
                    return !!t.listLookup.getListModel(e);
                }),
                r.sort(function(e, i) {
                    var n = t.listLookup.getListModel(e)
                      , o = t.listLookup.getListModel(i)
                      , a = n.attributes.position
                      , r = o.attributes.position;
                    return a > r ? 1 : r > a ? -1 : 0;
                });
                var l = document.createDocumentFragment();
                t._setSmartListTitle("search"),
                u.each(r, function(e) {
                    var n, o = a[e], r = t.listLookup.getListModel(e), c = {};
                    n = r.attributes.title,
                    c.smartListTitle = n,
                    c.smartListModels = o,
                    u.extend(c, i);
                    var d = t.addSubview(new s(c), e);
                    l.appendChild(d.render().el);
                }),
                t.el.appendChild(l);
            }
        },
        printSmartList: function(t, i) {
            var n, a = this, l = {}, c = "week" === t, d = "today" === t, m = d || c;
            l.isSmartList = !0,
            l.listId = t,
            l.taskIds = i,
            m && e.settings.isScopedFiltersEnabled() && (n = "user");
            var p = a.taskLookup.getSmartListTaskCollection(t, n);
            if (p.sort(),
            p.models.reverse(),
            p) {
                var g = p.models;
                i && i.length && (g = a.filterModelsByIds(g, i));
                var f = u.groupBy(g, function(e) {
                    var t;
                    if (c) {
                        var i = e.attributes.due_date
                          , n = r().sod().format("YYYY-MM-DD");
                        t = r(i, "YYYY-MM-DD").valueOf() < r().sod().valueOf() ? n : i;
                    } else
                        t = e.attributes.list_id;
                    return t;
                })
                  , b = u.keys(f);
                b.sort(function(e, t) {
                    var i, n;
                    if (c)
                        i = r(e, "YYYY-MM-DD").valueOf(),
                        n = r(t, "YYYY-MM-DD").valueOf();
                    else {
                        if ("inbox" === e || "inbox" === t)
                            return "inbox" === e ? -1 : 1;
                        var o = a.listLookup.getListModel(e)
                          , s = a.listLookup.getListModel(t);
                        i = o.attributes.position,
                        n = s.attributes.position;
                    }
                    return i > n ? 1 : n > i ? -1 : 0;
                }),
                "all" === t && (f = a.sortGroupedTasks(f));
                var h = document.createDocumentFragment();
                a._setSmartListTitle(t),
                u.each(b, function(t) {
                    var i, n = f[t], d = a.listLookup.getListModel(t), m = {};
                    if (c) {
                        var p = n[n.length - 1].attributes.due_date;
                        i = o.isHumanizeable(p) ? e.language.getText(o.humanizeDueDate(p, "YYYY-MM-DD", !0)) : r(p, "YYYY-MM-DD").format("dddd"),
                        i += ", " + r(p, "YYYY-MM-DD").format("MMM. DD");
                    } else
                        i = d.attributes.title;
                    m.smartListTitle = i,
                    m.smartListModels = n,
                    u.extend(m, l);
                    var g = a.addSubview(new s(m), t);
                    h.appendChild(g.render().el);
                }),
                a.el.appendChild(h);
            }
        },
        sortGroupedTasks: function(e) {
            return Object.keys(e).forEach(function(t) {
                var i = e[t];
                e[t] = i.sort(n.position).reverse();
            }),
            e;
        },
        _setSmartListTitle: function(t) {
            var i = this
              , n = "today" === t
              , o = {
                assigned: "smart_list_assigned_to_me",
                starred: "smart_list_starred",
                today: "smart_list_today",
                week: "smart_list_week",
                all: "smart_list_all",
                completed: "smart_list_completed",
                search: "placeholder_search"
            }
              , a = "search" === t ? " " + e.currentSearchTerm : ""
              , r = e.language.getText(o[t]);
            if (i.$el.prepend('<h1 class="smartlist ' + t + '">' + r + a + "</h1>"),
            n) {
                var s = new Date().getDate();
                i.$("h1").prepend("<span>" + s + "</span>");
            }
        },
        _getSelectedTaskIds: function() {
            var e = []
              , t = d(".task-list")
              , i = t.find(".selected, .active");
            return u.each(i, function(t) {
                e.push(d(t).attr("rel"));
            }),
            e;
        },
        filterModelsByIds: function(e, t) {
            return u.filter(e, function(e) {
                return u.indexOf(t, e.attributes.id) > -1;
            });
        }
    });
    return a.applyToClass(g),
    g;
}),
define("/templates/packaged/webview.js", {
    name: "packaged/webview",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="container"> <a class="icon close-webview"></a> </div>';
        },
        useData: !0
    }
}),
define("/styles/packaged/_webview.js", {
    name: "packaged/_webview",
    data: ".webview{position:fixed;top:0;bottom:0;right:0;left:0;padding:100px;background:rgba(0,0,0,0.5);z-index:9999;}.webview .container{border:8px solid rgba(255,255,255,0.6);-webkit-border-radius:10px;border-radius:10px;position:relative;}.webview .container a.icon.close-webview{position:absolute;top:8px;right:8px}.webview webview{border:1px solid rgba(0,0,0,0.2);background-color:#fff;height:100%;width:100%;display:block}"
}),
define("views/Packaged/WebView", ["application/runtime", "wunderbits/helpers/url", "wunderbits/WBView", "template!packaged/webview", "style!packaged/_webview"], function(e, t, i, n, o) {
    var a = e.$
      , r = i.prototype;
    return i.extend({
        className: "webview hidden",
        styles: [o],
        template: n,
        events: {
            "click .close-webview": "_cleanUp"
        },
        initialize: function() {
            var t = this;
            r.initialize.apply(t, arguments),
            t.bindTo(e, "webview:open", t.openUrl);
        },
        openUrl: function(e) {
            var t = this;
            t._cleanUp(),
            t.webView = a('<webview src="' + e + '" partition="persist:wunderlist"></webview>'),
            t.webView[0].addEventListener("loadstop", t._loadStop);
            var i = t.$(".container");
            i.append(t.webView),
            t.$el.removeClass("hidden");
        },
        _loadStop: function() {
            var i = this
              , n = i.webView.attr("src")
              , o = t.parseUrl(n);
            if (o.host.match(/^[a-z]+.wunderlist.com$/) && o.params && o.params.u) {
                i._cleanUp();
                var a = decodeURIComponent(o.params.u);
                e.trigger("webview:close", a, o.params);
            }
        },
        _cleanUp: function() {
            var e = this;
            e.$el.addClass("hidden");
            var t = e.webView;
            t && t.length && (t[0].stop(),
            t[0].removeEventListener("loadstop", e._loadStop),
            t.remove(),
            e.webView = null);
        }
    });
}),
define("views/Main/Controllers/ScrollContainerController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e.global
      , n = t.prototype;
    return t.extend({
        "implements": {
            scroll: "_handleScroll",
            "viewport:resize": "_handleResize"
        },
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e._setHeight(),
            e._setScrollTop(),
            e._triggerViewportUpdate();
        },
        _setScrollTop: function() {
            var e = this;
            e.scrollTop = e.view.el.scrollTop;
        },
        _setHeight: function() {
            var e = this;
            e.height = i.innerHeight;
        },
        _handleScroll: function() {
            var e = this;
            e._setScrollTop(),
            e._triggerViewportUpdate();
        },
        _handleResize: function() {
            var e = this;
            e._setHeight(),
            e._triggerViewportUpdate();
        },
        _triggerViewportUpdate: function() {
            var e = this;
            e.view.trigger("viewport:update", e.height, e.scrollTop);
        }
    });
}),
define("views/Main/ScrollContainer", ["application/runtime", "wunderbits/WBViewPresenter", "./Controllers/ScrollContainerController"], function(e, t, i) {
    var n = t.prototype
      , o = e.global;
    return Math.easeInOutQuad = function(e, t, i, n) {
        return e /= n / 2,
        1 > e ? i / 2 * e * e + t : (e--,
        -i / 2 * (e * (e - 2) - 1) + t);
    }
    ,
    t.extend({
        className: "tasks-scroll",
        emits: {
            scroll: "scroll"
        },
        observes: {
            runtime: {
                "scrollTo:element": "scrollToView"
            }
        },
        "implements": [i],
        initialize: function() {
            var t = this;
            n.initialize.apply(t, arguments);
            var i = t.trigger.bind(t, "viewport:resize");
            t.bindTo(e, "window:resize", i);
        },
        scrollTo: function(e, t) {
            var i = this
              , n = i.el.scrollTop
              , a = e - n
              , r = 0
              , s = function() {
                r += 10;
                var e = Math.easeInOutQuad(r, n, a, t);
                i.el.scrollTop = e,
                t > r && o.setTimeout(s, 10);
            };
            s();
        },
        scrollToView: function(e, t) {
            var i = this
              , n = "up" === t ? Math.abs(o.innerHeight - (e.el.offsetTop + 50)) : e.el.offsetTop;
            50 > n && (n = 0),
            n > e.el.offsetTop && (n = e.el.offsetTop - 150),
            i.scrollTo(n, 100);
        }
    });
}),
define("views/Popovers/Controllers/OnboardingPopoverController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "close:tooltip": "closeTooltip"
        },
        closeTooltip: function(t) {
            e.trigger("tooltip:close", this.view.tooltipName, this.view, !!t);
        }
    });
}),
define("/templates/onboarding/tooltip.js", {
    name: "onboarding/tooltip",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return r((o = t.localized || e && e.localized || a,
            o.call(e, e && e.text, {
                name: "localized",
                hash: {},
                data: n
            }))) + ' <a class="close wundercon close-circle"></a>';
        },
        useData: !0
    }
}),
define("/styles/popover/onboarding.js", {
    name: "popover/onboarding",
    data: "#wunderlist-base .tooltip{color:#fafafa;padding:12px;background-image:-webkit-linear-gradient(top, #38a9fb, #2c91f9);background-image:-moz-linear-gradient(top, #38a9fb, #2c91f9);background-image:-o-linear-gradient(top, #38a9fb, #2c91f9);background-image:-ms-linear-gradient(top, #38a9fb, #2c91f9);background-image:linear-gradient(to bottom, #38a9fb, #2c91f9);border:1px solid rgba(0,0,0,0.18);-webkit-box-shadow:0 -3px 8px 0 rgba(0,0,0,0.23);box-shadow:0 -3px 8px 0 rgba(0,0,0,0.23);position:absolute;width:220px;font-weight:bold;font-size:14px;-webkit-border-radius:2px;border-radius:2px;z-index:500;}#wunderlist-base .tooltip.AddItem{left:50% !important;margin-left:-173px !important}#wunderlist-base .tooltip.AddPeople{margin-right:57px !important}#wunderlist-base .tooltip text{display:inline-block;text-align:left;width:190px;vertical-align:top}#wunderlist-base .tooltip a{font-size:25px;display:inline-block;opacity:.5;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";filter:alpha(opacity=50);vertical-align:top;}#wunderlist-base .tooltip a:hover{opacity:1;-ms-filter:none;filter:none}#wunderlist-base .tooltip .arrow{border-width:10px;left:50%;margin-left:-14px;height:0;width:0;position:absolute;border-style:solid;}#wunderlist-base .tooltip .arrow:after{content:'';border-width:10px;left:50%;margin-left:-10px;height:0;width:0;position:absolute;border-style:solid}#wunderlist-base .tooltip.top .arrow{bottom:-21px;border-color:#2477cc transparent transparent transparent !important;}#wunderlist-base .tooltip.top .arrow:after{border-color:#2c91f9 transparent transparent transparent !important;bottom:-9px;z-index:1}#wunderlist-base .tooltip.bottom .arrow{top:-20px;border-color:transparent transparent #2477cc transparent !important;}#wunderlist-base .tooltip.bottom .arrow:after{border-color:transparent transparent #38a9fb transparent !important;top:-8px;z-index:1}@media all and (max-width:1000px){#wunderlist-base .tooltip.CreateList{margin-left:-30px}}@media all and (max-width:810px){#wunderlist-base .tooltip.CreateList{margin-left:-30px}}"
}),
define("views/Popovers/OnboardingPopoverView", ["application/runtime", "actions/Factory", "views/Popovers/Controllers/OnboardingPopoverController", "views/Popovers/PopoverView", "template!onboarding/tooltip", "style!popover/onboarding", "style!_popover"], function(e, t, i, n, o, a, r) {
    var s = n.prototype;
    return n.extend({
        className: "content",
        id: "onboarding-tooltip",
        template: o,
        styles: [r, a],
        config: {
            bindToTarget: !1,
            preventDefaultClose: !0
        },
        "implements": [i],
        emits: {
            "click .close": "close:tooltip"
        },
        observes: {
            runtime: {
                hideTooltip: "emitClose",
                route: "checkValidRoute"
            }
        },
        renderData: {
            text: void 0
        },
        strings: {
            CreateList: "label_onboarding_tooltip_firstlist_desktop",
            AddItem: "label_onboarding_tooltip_firsttask",
            AddPeople: "label_onboarding_tooltip_share"
        },
        formatData: function(e) {
            var t = this;
            return e = s.formatData.call(t, e),
            e.text = t.strings[t.tooltipName],
            e;
        },
        initialize: function(e) {
            var i = this;
            s.initialize.apply(i, arguments),
            i.tooltipName = e.tooltipName,
            i.listLookup = t.listLookup();
        },
        open: function() {
            var e = this;
            s.open.apply(e, arguments),
            e.checkValidRoute(),
            e.popover.el.classList.add("tooltip", e.tooltipName),
            e.popover.unbindFrom(e.popover.outsideClick);
        },
        emitClose: function() {
            this.trigger("close:tooltip");
        },
        checkValidRoute: function() {
            var t = this
              , i = t.listLookup.getListModel(e.getIdFromRoute())
              , n = i && i.isInbox();
            "AddPeople" === t.tooltipName && t.$el.parent()[n ? "hide" : "show"]();
        }
    });
}),
define("views/Main/Controllers/ClipboardContextMenuController", ["wunderbits/ContextMenuController"], function(e, t) {
    var i = e.prototype;
    return e.extend({
        type: "clipboard",
        "implements": {
            "contextmenu:button_cut": "cutToClipboard",
            "contextmenu:button_copy": "copyToClipboard",
            "contextmenu:button_paste": "pasteFromClipboard"
        },
        items: {
            button_cut: t,
            button_copy: t,
            button_paste: t
        },
        initialize: function() {
            var e = this;
            return e.Clipboard ? void i.initialize.apply(e, arguments) : !1;
        },
        getContextMenuKeys: function() {
            return ["button_cut", "button_copy", "button_paste"];
        },
        cutToClipboard: function() {
            document.execCommand("cut");
        },
        copyToClipboard: function() {
            document.execCommand("copy");
        },
        pasteFromClipboard: function() {
            document.execCommand("paste");
        }
    });
}),
define("views/Main/Controllers/SystemTrayController", ["application/runtime", "wunderbits/ContextMenuController"], function(e, t, i) {
    function n() {
        process.exit(0);
    }
    var o = t.prototype;
    return t.extend({
        type: "systemtray",
        "implements": {
            "contextmenu:notifications_desktop_enable_systray_context_menu": "enableNotifications",
            "contextmenu:notifications_desktop_disable_systray_context_menu": "disableNotifications",
            "contextmenu:systray_show_wunderlist": "showApp",
            "contextmenu:systray_quit": "quitApp"
        },
        items: {
            notifications_desktop_enable_systray_context_menu: i,
            notifications_desktop_disable_systray_context_menu: i,
            systray_show_wunderlist: i,
            systray_quit: i
        },
        initialize: function() {
            var t = this;
            return t.Tray ? (o.initialize.apply(t, arguments),
            t.createTray(),
            t.updateContextMenu(),
            t.bindTo(e, "systray:cleanup", "cleanupTray"),
            void t.bindTo(e.settings, "change:notifications_desktop_enabled", "updateContextMenu")) : !1;
        },
        createTray: function() {
            var t = this;
            t.tray = e.tray = new t.Tray({
                icon: "icons/16.png",
                alticon: "icons/16.png",
                iconsAreTemplates: !1,
                tooltip: "Wunderlist"
            }),
            t.tray.setMenu(t.menu),
            t.tray.onClick(function() {
                t.showApp();
            });
        },
        cleanupTray: function() {
            var t = this;
            t.clearContextMenu(),
            t.tray.remove(),
            t.tray = e.tray = i;
        },
        getContextMenuKeys: function() {
            var t = e.settings.attributes
              , i = "true" === t.notifications_desktop_enabled
              , n = i ? "disable" : "enable";
            return ["notifications_desktop_" + n + "_systray_context_menu", "systray_show_wunderlist", "systray_quit"];
        },
        showApp: function() {
            e.trigger("window:show");
        },
        quitApp: function() {
            e.trigger("window:hide"),
            e.once("sync:ended", n),
            e.trigger("sync:start"),
            setTimeout(n, 2e3);
        },
        enableNotifications: function() {
            e.settings.save("notifications_desktop_enabled", "true");
        },
        disableNotifications: function() {
            e.settings.save("notifications_desktop_enabled", "false");
        }
    });
}),
define("views/Main/Controllers/TaskBrowserContextMenuController", ["application/runtime", "wunderbits/ContextMenuController"], function(e, t, i) {
    var n = e.$
      , o = t.prototype;
    return t.extend({
        type: "taskBrowser",
        "implements": {
            "contextmenu:contextual_paste_task": "pasteTasks",
            "contextmenu:contextual_paste_task_plural_$": "pasteTasks"
        },
        items: {
            contextual_paste_task: i,
            contextual_paste_task_plural_$: i
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(this, arguments) !== !1 && e.ready.done(function() {
                e.bindTo(e.actions.duplication.state, "change:copiedTasksCount", "onCopiedTasksChange");
            });
        },
        isValidTarget: function(e) {
            var t = n(e)
              , i = t.hasClass(".addTask")
              , o = t.parents(".addTask").length > 0;
            return !i && !o;
        },
        onContextMenu: function(e) {
            var t = this;
            t.isValidTarget(e.target) && t.getContextMenuKeys().length && o.onContextMenu.apply(t, arguments);
        },
        onCopiedTasksChange: function() {
            var t = this
              , i = "contextual_paste_task_plural_$"
              , n = t.actions.duplication.state.attributes.copiedTasksCount
              , o = t.items[i];
            o && o.setLabel(e.language.getText(i, n));
        },
        getContextMenuKeys: function() {
            var e = this
              , t = [];
            if (e._isSmartList())
                return t;
            var i = e.actions.duplication.copiedTasksCount();
            return i && 1 === i ? t.push("contextual_paste_task") : i && t.push("contextual_paste_task_plural_$"),
            t;
        },
        pasteTasks: function() {
            var t = this;
            if (!t._isSmartList()) {
                var i = e.listId;
                t.actions.duplication.pasteTasksToList(i),
                e.trigger("analytics:paste:tasks", "contextMenu"),
                e.trigger("trackingService", "client.paste.tasks", "contextMenu");
            }
        },
        _isSmartList: function() {
            var t = e.listId
              , i = e.smartLists
              , n = !(!t || -1 === i.indexOf(t));
            return n;
        }
    });
}),
define("views/Main/Controllers/PreventMiddleClickController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e.env;
    return t.extend({
        "implements": {
            "click:preventMiddleClick": "preventMouseWheelClick"
        },
        preventMouseWheelClick: function(e) {
            2 === e.which && i.isNodeWebkit() && e.preventDefault();
        }
    });
}),
define("helpers/sendViaEmail", ["application/runtime", "actions/factory", "collections/ListCollection", "collections/TaskCollection", "collections/NoteCollection", "collections/SubtaskCollection", "wunderbits/helpers/date", "vendor/moment", "project!core"], function(e, t, i, n, o, a, r, s, l) {
    var c = e._
      , d = e.global
      , u = new n("/tasks/all")
      , m = new i("/lists/all")
      , p = c.clone(e.smartLists)
      , g = {
        assigned: "smart_list_assigned_to_me",
        starred: "smart_list_starred",
        today: "smart_list_today",
        week: "smart_list_week",
        all: "smart_list_all",
        completed: "smart_list_completed",
        search: "placeholder_search"
    }
      , f = t.openUrl()
      , b = l.WBSingleton.extend({
        emailList: function(t, i) {
            t = t || e.listId,
            0 === e.currentRoute().indexOf("search") ? b.emailSearch(i) : c.indexOf(p, t) > -1 ? b.emailSmartList(t, i) : b.emailNormalList(t, i);
        },
        emailNormalList: function(e, t) {
            var i = ""
              , n = m.get(e);
            if (n) {
                var o = n.attributes.title
                  , a = "Wunderlist - " + o;
                i = encodeURIComponent(o) + "%0d%0a%0d%0a",
                i += b.buildList(e, t),
                b.sendMailContent(a, i);
            }
        },
        emailSearch: function(t) {
            var i = ""
              , o = e.language.getText(g.search)
              , a = "Wunderlist - " + o + " " + e.currentSearchTerm;
            i += o + " " + e.currentSearchTerm + "%0d%0a%0d%0a";
            var r = new n("/search");
            if (r) {
                var s = r.models;
                t && (s = b.filterModelsByIds(s, t));
                var l = c.groupBy(s, function(e) {
                    return e.attributes.list_id;
                })
                  , d = c.keys(l);
                d.sort(function(e, t) {
                    var i = m.get(e)
                      , n = m.get(t)
                      , o = i.attributes.position
                      , a = n.attributes.position;
                    return o > a ? 1 : a > o ? -1 : 0;
                }),
                c.each(d, function(e) {
                    var t = l[e]
                      , n = m.get(e)
                      , o = n.attributes.title;
                    i += o + "%0d%0a%0d%0a",
                    c.each(t, function(e) {
                        i += b.buildTask(e.attributes.id);
                    }),
                    i += "%0d%0a%0d%0a";
                }),
                b.sendMailContent(a, i);
            }
        },
        emailSmartList: function(t, i) {
            var o = "week" === t
              , a = ""
              , l = t
              , d = e.language.getText(g[l])
              , u = "Wunderlist - " + d;
            a += d + "%0d%0a%0d%0a";
            var p = new n("/tasks/filter/" + t);
            if (p) {
                var f = p.models;
                i && (f = b.filterModelsByIds(f, i));
                var h = c.groupBy(f, function(e) {
                    var t;
                    if (o) {
                        var i = e.attributes.due_date
                          , n = s().sod().format("YYYY-MM-DD");
                        t = s(i, "YYYY-MM-DD").valueOf() < s().sod().valueOf() ? n : i;
                    } else
                        t = e.attributes.list_id;
                    return t;
                })
                  , v = c.keys(h);
                v.sort(function(e, t) {
                    var i, n;
                    if (o)
                        i = s(e, "YYYY-MM-DD").valueOf(),
                        n = s(t, "YYYY-MM-DD").valueOf();
                    else {
                        var a = m.get(e)
                          , r = m.get(t);
                        i = a.attributes.position,
                        n = r.attributes.position;
                    }
                    return i > n ? 1 : n > i ? -1 : 0;
                }),
                c.each(v, function(t) {
                    var i, n = h[t], l = m.get(t);
                    if (o) {
                        var d = n[n.length - 1].attributes.due_date;
                        i = r.isHumanizeable(d) ? e.language.getText(r.humanizeDueDate(d, "YYYY-MM-DD", !0)) : s(d, "YYYY-MM-DD").format("dddd"),
                        i += ", " + s(d, "YYYY-MM-DD").format("MMM. DD");
                    } else
                        i = l.attributes.title;
                    a += encodeURIComponent(i) + "%0d%0a%0d%0a",
                    c.each(n, function(e) {
                        a += b.buildTask(e.attributes.id);
                    }),
                    a += "%0d%0a%0d%0a";
                }),
                b.sendMailContent(u, a);
            }
        },
        buildTask: function(e) {
            var t = ""
              , i = u.get(e);
            if (i) {
                var n = i.attributes.title
                  , r = i.attributes.due_date;
                r = r ? " " + b.getDueDateString(r) : "";
                var s = i.attributes.starred ? " *" : ""
                  , l = i.isCompleted() ? "☑" : "☐";
                if (t += encodeURIComponent(l + " " + n + r + s) + "%0d%0a",
                i.hasSubtasks()) {
                    var d = new a("/tasks/" + i.id + "/subtasks");
                    c.each(d.models, function(e) {
                        var i = e.attributes.completed ? "☒" : "☐";
                        t += encodeURIComponent("   " + i + " " + e.attributes.title) + "%0d%0a";
                    });
                }
                if (i.hasNote()) {
                    var m, p, g = new o("/tasks/" + i.id + "/notes");
                    c.each(g.models, function(e) {
                        p = e.attributes.content,
                        m = p.split(/\r\n|\r|\n/g),
                        c.each(m, function(e) {
                            t += encodeURIComponent("   " + e) + "%0d%0a";
                        });
                    });
                }
            }
            return t;
        },
        buildList: function(e, t) {
            var i = ""
              , o = new n("/lists/" + e + "/tasks")
              , a = o.models;
            return t && (a = b.filterModelsByIds(a, t)),
            c.each(a, function(e) {
                i += b.buildTask(e.attributes.id);
            }),
            i;
        },
        sendMailContent: function(t, i) {
            e.publish("email:emailing");
            var n = "%0d%0a" + encodeURIComponent(e.language.getText("share_list_email_signature").replace(/\\n/g, "NNEEWWLLIINNEE")).replace(/NNEEWWLLIINNEE/g, "%0d%0a")
              , o = "mailto:?subject=" + encodeURIComponent(t) + "&body=";
            o += i + n,
            f.openUrl(o).fail(function(t) {
                e.error.notify("Unable to open mailto URL", t.toString(), {
                    length: o.length
                });
            }),
            d.setTimeout(function() {
                e.unpublish("email:emailing");
            }, 500);
        },
        getDueDateString: function(t) {
            return s(t, "YYYY-MM-DD").format(e.settings.attributes.date_format);
        },
        filterModelsByIds: function(e, t) {
            return c.filter(e, function(e) {
                return c.indexOf(t, e.attributes.id) > -1;
            });
        }
    });
    return b;
}),
define("/templates/application/layout.js", {
    name: "application/layout",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div id="lists" role="navigation"></div> <div id="tasks" role="main"></div> ';
        },
        useData: !0
    }
}),
define("views/Main/MainInterfaceView", ["application/runtime", "application/FocusManager", "views/Main/ModalManagerView", "views/Sidebar/SidebarView", "views/Tasks/TasksBrowserView", "views/Toolbar/ListToolbarView", "views/Tasks/AddTaskView", "views/Tasks/404", "views/TaskDetail/TaskDetailView", "views/Sounds/SoundPlayer", "views/Print/PrintView", "views/Packaged/WebView", "views/Main/ScrollContainer", "views/Popovers/OnboardingPopoverView", "./Controllers/ClipboardContextMenuController", "./Controllers/SystemTrayController", "./Controllers/TaskBrowserContextMenuController", "./Controllers/PreventMiddleClickController", "wunderbits/WBViewPresenter", "wunderbits/WBBlurHelper", "project!core", "wunderbits/helpers/selection", "helpers/sendViaEmail", "wunderbits/helpers/strings", "helpers/notifications", "helpers/domtools", "template!application/layout"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S) {
    var L = w.WBStateModel
      , D = e.global
      , j = e._
      , M = e.$
      , z = v.prototype
      , I = _
      , A = C;
    return v.extend({
        template: S,
        className: "main-interface",
        "implements": [g, f, b, h],
        emits: {
            "contextmenu input, textarea, .comment-text": "contextmenu:clipboard",
            "contextmenu .tasks-scroll": "contextmenu:taskBrowser",
            click: "click:preventMiddleClick"
        },
        events: function() {
            var t = {
                "click .tasks-scroll": "_onClickEmptyArea",
                scroll: "_preventOffscreenScroll",
                mousemove: "throttledCheckMousePositionForActionBar"
            };
            return e.settings.isTouchEnabled() && j.extend(t, {
                "swipeleft #tasks": "_onSwipeLeftTasks",
                "swiperight #tasks": "_onSwipeRightTasks",
                "swiperight #detail .body": "_onSwipeDetail"
            }),
            t;
        },
        initialize: function() {
            var p = this;
            z.initialize.apply(p, arguments),
            p.focusManager = new t(),
            p.bindTo(e, "lists:ready", function(e) {
                p.lists = e;
            }),
            p._debouncedDelegateEvents = p.debounce(p.delegateEvents, 100),
            p.throttledCheckMousePositionForActionBar = j.throttle(p.checkMousePositionForActionBar, 100),
            p.bindTo(e, "search:start", p.onSearchStart),
            p.bindTo(e, "search:cancel", p.onSearchCancel),
            p.bindTo(e, "collection:search:ready", p.onSearchResults),
            p.bindTo(e, "route:search", p.onSearchResults),
            p.bindTo(e, "interface:setListOrFilter", p.setCurrentListOrFilter),
            p.bindTo(e, "detail:toggle", p.toggleDetailView),
            p.bindTo(e, "browser:toolbar:clicked", p.scrollBrowser),
            p.bindTo(e, "browser:show404", p.showTBV404),
            p.bindTo(e, "browser:hide404", p.hideTBV404),
            p.bindTo(e, "window:resize", p._debouncedDelegateEvents),
            p.bindTo(e, "print:start", p._print),
            p.bindTo(e, "blur:run", I.run),
            p.bindTo(e, "showTooltip", p.showOnboardingTooltip),
            p.bindTo(e, "email:list", x.emailList),
            p.bindTo(e, "share:save:failed", function(e) {
                p._showCatastrophicFailure("share", e);
            }),
            p.scrollView = p.addSubview(new m()),
            p.sidebarView = p.addSubview(new n()),
            p.listToolbarView = p.addSubview(new a()),
            p.addTaskView = p.addSubview(new r()),
            p.browserView = p.addSubview(new o()),
            p.taskDetailView = p.addSubview(new l()),
            p.TBV404View = p.addSubview(new s()),
            p.printView = p.addSubview(new d()),
            p.soundPlayerView = p.addSubview(new c()),
            p.modalManagerView = p.addSubview(new i()),
            e.env.isPackagedApp() && (p.webView = p.addSubview(new u())),
            p.bindTo(p.scrollView, "viewport:update", p.emitViewportUpdate);
        },
        setFocusToAddTask: function() {
            var e = this;
            return e.addTaskView.setFocus.apply(e.addTaskView, arguments);
        },
        render: function() {
            var t = this
              , i = t.$el
              , n = M("body");
            z.render.apply(t, arguments);
            var o = document.createDocumentFragment()
              , a = document.createDocumentFragment();
            return i.find("#lists").append(t.sidebarView.render().el),
            e.trigger("timeline:end", "refresh_start"),
            a.appendChild(t.listToolbarView.render().el),
            a.appendChild(t.scrollView.el),
            i.find("#tasks").append(a),
            o.appendChild(t.addTaskView.el),
            o.appendChild(t.browserView.el),
            o.appendChild(t.TBV404View.el),
            t.scrollView.el.appendChild(o),
            i.append(t.taskDetailView.el),
            i.prepend(t.modalManagerView.render().el),
            i.append(t.soundPlayerView.render().el),
            e.trigger("interface:ready"),
            e.trigger("timeline:start", "main_interface_rendered"),
            A.start(),
            n.removeClass("login"),
            t._bindScrollEvents(),
            e.env.isPackagedApp() && (i.append(t.webView.render().el),
            n.addClass("packaged")),
            !e.env.isChromeApp() && t.injectBingMapsAPI(),
            t;
        },
        injectBingMapsAPI: function() {
            var e = this;
            if (!this.bingMapsAPIInjected) {
                var t = "https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1"
                  , i = document.getElementsByTagName("head").item(0)
                  , n = document.createElement("script");
                n.setAttribute("type", "text/javascript"),
                n.setAttribute("src", t),
                i.appendChild(n),
                e.bingMapsAPIInjected = !0;
            }
        },
        onDestroy: function() {
            var e = this;
            e.focusManager.destroy();
        },
        emitViewportUpdate: function(e, t) {
            var i = this;
            i.browserView.trigger("viewport:update", e, t);
        },
        _bindScrollEvents: function() {
            var t = this
              , i = new L()
              , n = {
                tasks: t.$(".tasks-scroll"),
                lists: t.$(".lists-scroll")
            };
            Object.keys(n).forEach(function(e) {
                var t = n[e];
                i.set(e, t.scrollTop()),
                t.scroll(function() {
                    i.set(e, t.scrollTop());
                });
            }),
            t.bindTo(i, "change", function(t) {
                t = t[0],
                e.trigger("interface:scroll", t);
            });
        },
        setCurrentList: function(t, i, n) {
            var o = this;
            if ("search" === t && (t = e.lastListID),
            !t && !i)
                throw new Error("Cannot set current list without ID or list model");
            t || (t = i.id),
            i || (i = o.lists.get(t)),
            o.sidebarView.trigger("select", t);
            var a = o.browserView.renderListWithID(t, n);
            return o.addTaskView.render({
                listID: t,
                listModel: i
            }),
            o.lastBrowserContext = o.lastContext = "list",
            a;
        },
        setCurrentListOrFilter: function(t, i) {
            var n = this;
            t && -1 !== e.smartLists.indexOf(t) ? (n.sidebarView.trigger("select", t),
            n.addTaskView.render({
                listID: i,
                filter: t
            }),
            n.browserView.renderFilterOfType(t)) : n.setCurrentList(t),
            n.toggleDetailView(!1);
        },
        waitToShowList: function() {
            var e = this;
            e.sidebarView.trigger("deselect");
        },
        scrollBrowser: function(e) {
            var t = this;
            t.$(".tasks-scroll").animate({
                scrollTop: e || 0
            });
        },
        toggleDetailView: function(t) {
            var i = this;
            if (t !== i.isDetailViewVisible) {
                var n = t ? "Show" : "Dismiss";
                e.trigger("trackingService", "UI." + n, "DetailView"),
                i.hasToggledDetailViewOnce && ["#detail", "#tasks"].forEach(function(e) {
                    e = i.el.querySelector(e),
                    e.classList.add("animated");
                }),
                i.$el.toggleClass("detail-visible", t),
                e.trigger("detail:toggled", t),
                i.isDetailViewVisible = t,
                i.hasToggledDetailViewOnce = !0,
                "task" === i.lastContext && delete i.lastContext;
            }
        },
        _onClickEmptyArea: function(t) {
            var i = this
              , n = M(t.target);
            if (n.hasClass("tasks-scroll") || n.hasClass("heading") || n.hasClass("grouped-tasks"))
                if (I.run(),
                e.currentRoute().indexOf("tasks") >= 0)
                    e.trigger("detail:close", {
                        fromAction: "clickEmptyArea"
                    }).trigger("analytics:ItemBrowser:clickEmptyArea", "closeDetail");
                else if ("sidebar" === e.focus) {
                    var o = i.browserView.currentGrouping
                      , a = o && o.openGroup && o.openGroup.collection
                      , r = o && o.smartListMainCollection;
                    (a && a.models.length || r && r.models.length) && e.trigger("sidebar:navigate", "right");
                }
        },
        onSearchStart: function() {
            var e = this
              , t = function() {
                e.lastContext = e.lastBrowserContext = "search",
                e.browserView.lastRenderedFilterType = null,
                e.browserView.lastRenderedListID = null;
            };
            e._searchCallback = D.setTimeout(t, 1e3),
            t();
        },
        onSearchCancel: function() {
            var t = this;
            "search" === t.lastContext && (t.lastBrowserContext = "searchCancel",
            e.trigger("focus:set", "sidebar"),
            t._searchCallback && D.clearTimeout(t._searchCallback));
        },
        onSearchResults: function(t, i) {
            var n = this;
            if (i = i || {},
            n.addTaskView.listID = null,
            e.lastFilter = null,
            n.sidebarView.toggleLists(!1),
            (!i.term || i.term !== e.state.attributes.lastSearchTerm) && "string" == typeof t) {
                var o = i.term || e.state.attributes.lastSearchTerm
                  , a = !!o || "week" === e.lastFilter || "completed" === e.lastFilter;
                n.listToolbarView.updateSearchTerm(o),
                n.browserView.renderSearch(t),
                n.addTaskView.$el.toggleClass("hidden", a),
                e.state.set("lastSearchTerm", i.term);
            }
        },
        showList: function(t, i) {
            var n, o = this;
            if (!o.sidebarView.listsView.blockListChangeFromDragEnd) {
                if (i || (i = {}),
                i && i[404] ? i && i[404] && o.browserView.$el.addClass("hidden") : (o.browserView.$el.removeClass("hidden"),
                o.hideTBV404()),
                "list" !== o.lastContext || t.id !== o.lastListID) {
                    n = "search" === o.lastContext && "search" === o.lastBrowserContext,
                    o.setCurrentList(null, t);
                    var a = e.currentRoute().indexOf("/share") >= 0;
                    !a && o.toggleDetailView(!1),
                    o.taskDetailView.state.set("wasOpenBeforeRender", !1);
                }
                o.addTaskView.$el.toggleClass("hidden", t.isSavedSearch()),
                o.lastFilter = null,
                o.lastListID = t.id,
                e.trigger("title:set", o.getListTitle(t), {
                    isNameOrId: !0
                }),
                o.listToolbarView.updateListID(t.id);
            }
        },
        getListTitle: function(t) {
            var i = t.attributes.title;
            return "inbox" === t.id && (i = e.language.getText("smart_list_inbox")),
            i;
        },
        showFilter: function(t) {
            var i = this;
            ("filter" !== i.lastContext || i.lastFilter !== t) && (i.browserView.$el.removeClass("hidden"),
            i.sidebarView.trigger("select", t),
            i.addTaskView.render({
                listID: "inbox",
                filter: t
            }),
            i.browserView.renderFilterOfType(t)),
            e.trigger("search:cancel"),
            i.resetView();
            var n = y.contains(["completed", "week", "assigned"], t);
            i.addTaskView.$el.toggleClass("hidden", n),
            i.lastBrowserContext = i.lastContext = "filter",
            i.lastFilter = t,
            i.lastListID = null,
            e.trigger("title:set", t, {
                isNameOrId: !0
            }),
            i.listToolbarView.updateListID(t);
        },
        resetView: function(t) {
            var i = this
              , n = t ? i.getListTitle(t) : i.lastFilter;
            n && e.trigger("title:set", n, {
                isNameOrId: !0
            }),
            i.toggleDetailView(!1);
        },
        showTask: function(t, i) {
            var n = this;
            i = i || {};
            var o = "task" === n.lastContext && t.id === n.lastTaskID
              , a = t.attributes.list_id
              , r = !e.lastFilter && a !== e.lastListID
              , s = !e.lastListID && "filter" === n.lastBrowserContext && e.lastFilter;
            if (n.hideTBV404(),
            n.browserView.$el.removeClass("hidden"),
            !o) {
                var l = t.isCompleted()
                  , c = "true" === e.settings.attributes.show_completed_items;
                l && !c && e.settings.save("show_completed_items", "true"),
                i.onClose = function(o) {
                    n.defer(function() {
                        if (t) {
                            var a = i.returnRoute;
                            (!a || o && "clickEmptyArea" === o.fromAction && "filter" !== n.lastBrowserContext && "search" !== n.lastBrowserContext) && (a = "lists/" + t.attributes.list_id),
                            a = "filter" === n.lastBrowserContext ? "lists/" + i.lastFilter : a,
                            e.trigger("route:" + a);
                        }
                    });
                }
                ;
                var d = !e.lastFilter && !e.lastListID
                  , u = e.state.attributes.inSearchState;
                if (u || s || !(d || e.clickedLinkOut || r))
                    if (s || u) {
                        var m = n.browserView.getCollection(e.lastFilter)
                          , p = m.get(t.id);
                        p || (n.setListForTaskRoute(t, r),
                        u && e.trigger("search:end", !0)),
                        p && e.trigger("browser:select", t.id);
                    } else
                        e.trigger("browser:select", t.id);
                else
                    n.setListForTaskRoute(t, r);
                var g = n.lists.get(a)
                  , f = g && g.isShared();
                i.isShared = f,
                n.taskDetailView.renderWithModel(t, i),
                n.taskDetailView.state.set("wasOpenBeforeRender", !0),
                n.toggleDetailView(!0),
                n.lastContext = "task",
                n.lastTaskID = t.id,
                n.listToolbarView.updateListID(a);
            }
            i.editAttribute && j.delay(function() {
                e.trigger("browser:select", t.id),
                n.taskDetailView.trigger("start:edit", i.editAttribute, i.options);
            }, 500),
            i.focusAttribute ? (e.trigger("browser:select", t.id),
            n.taskDetailView.trigger("focus:attribute", i.focusAttribute, i.options)) : I.run(),
            e.trigger("title:set", t.attributes.title);
            var b = !0;
            "filter" !== n.lastBrowserContext || n.linkInActivityCenterClicked && !o ? "search" === n.lastBrowserContext && e.state.attributes.lastSearchTerm && (b = !1) : b = !y.contains(["completed", "week", "assigned"], n.lastFilter),
            n.addTaskView.$el.toggleClass("hidden", !b);
        },
        setListForTaskRoute: function(t, i) {
            var n = this;
            e.clickedLinkOut = !1,
            n.setCurrentList(t.attributes.list_id, null, t).done(function() {
                i && n.browserView.scrollToElementInViewport();
            }),
            e.lastFilter = null,
            e.lastListID = t.attributes.list_id;
        },
        showTBV404: function(t, i) {
            var n = this
              , o = j.clone(e.smartLists);
            o.push("search");
            var a = ["starred", "today", "all"];
            j.indexOf(a, t) < 0 && n.addTaskView.$el.addClass("hidden"),
            n.browserView.$el.addClass("hidden"),
            j.indexOf(o, t) < 0 && n.sidebarView.trigger("deselect"),
            n.TBV404View.render(t).$el.removeClass("hidden"),
            n.toggleDetailView(!1),
            t && "task" !== t && "list" !== t || e.trigger("title:set", e.language.getText("error_title_not_found")),
            "search" === t && n.listToolbarView.updateSearchTerm(i);
        },
        hideTBV404: function() {
            var e = this;
            e.TBV404View.$el.addClass("hidden"),
            e.browserView.$el.removeClass("hidden");
        },
        editFolder: function(e, t) {
            var i = this;
            i.sidebarView.listsView.editFolder(e, t);
        },
        _preventOffscreenScroll: function(e) {
            var t = this;
            return e.preventDefault(),
            t.$el.scrollLeft(0),
            !1;
        },
        _showCatastrophicFailure: function(t) {
            var i = {};
            "share" === t && (i = {
                customText: e.language.getLabel("error_share_not_created").toString(),
                confirmText: e.language.getLabel("button_dismiss").toString(),
                hideCancel: !0
            },
            e.trigger("modal:confirm", i));
        },
        checkMousePositionForActionBar: function(t) {
            "settings" !== e.focus && t.pageY > 360 && e.trigger("taskActions:collapse");
        },
        _print: function() {
            var e = this;
            e.el.appendChild(e.printView.render().el);
        },
        onRemove: function() {
            var e = this;
            e.sidebarView = null,
            e.browserView = null;
        },
        showOnboardingTooltip: function(e) {
            var t = this;
            e = e[0];
            var i = {
                CreateList: t.$(".sidebarActions"),
                AddItem: t.$(".addTask-input"),
                AddPeople: t.$(".tab.share")
            }
              , n = {
                target: i[e],
                tooltipName: e,
                position: /AddItem|AddPeople/.test(e) ? "bottom" : "top",
                arrowOffset: 0
            }
              , o = new p(n);
            o.render(),
            o.open({});
        }
    });
}),
define("/styles/font_lato_default.js", {
    name: "font_lato_default",
    data: "@font-face{font-family:'Lato';font-style:normal;font-weight:400;src:local('Lato Regular'),local('Lato-Regular'),url(\"fonts/Lato_normal_400_default.woff\") format('woff')}@font-face{font-family:'Lato';font-style:normal;font-weight:700;src:local('Lato Bold'),local('Lato-Bold'),url(\"fonts/Lato_normal_700_default.woff\") format('woff')}"
}),
define("/styles/font_lato_windows.js", {
    name: "font_lato_windows",
    data: "@font-face{font-family:'Lato';font-style:normal;font-weight:400;src:local('Lato Regular'),local('Lato-Regular'),url(\"fonts/Lato_normal_400_windows.woff\") format('woff')}@font-face{font-family:'Lato';font-style:normal;font-weight:700;src:local('Lato Bold'),local('Lato-Bold'),url(\"fonts/Lato_normal_700_windows.woff\") format('woff')}"
}),
define("application/AppView", ["application/runtime", "wunderbits/WBView", "style!font_lato_default", "style!font_lato_windows"], function(e, t, i, n) {
    var o = e._
      , a = t.prototype;
    return t.extend({
        views: {},
        initialize: function() {
            var t = this
              , o = e.env.isWindows() ? n : i;
            t.styles.push(o),
            a.initialize.apply(t, arguments);
        },
        switchToView: function(e, t, i, n) {
            var a = this;
            if (a.isRendered || a.render(),
            e !== a.activeViewName) {
                var r = a.getSubview("main");
                r && r.destroy();
                var s = a.views[e];
                a.activeView = a.addSubview(new s(t), "main"),
                a.activeViewName = e,
                a.$el.append(a.activeView.render(i).$el),
                a.activeView.delegateEvents();
            }
            return o.isFunction(n) && n(a.activeView),
            a.activeView;
        }
    });
}),
define("helpers/WindowTitleHelper", ["application/runtime", "actions/Factory", "helpers/ListTitleHelper", "wunderbits/BaseSingleton"], function(e, t, i, n) {
    var o = e._
      , a = o.clone(e.smartLists);
    return a.push("inbox"),
    n.extend({
        init: function() {
            var i = this;
            i._tasks = t.taskLookup().allTasks,
            i._unreadActivities = t.activityCenterLookup().allUnreadActivitiesCounts,
            i.bindTo(e, "title:set", i.setTitle),
            i.bindTo(i._unreadActivities, "add remove reset change:activities change:conversations", i._updateTitle),
            i.bindTo(i._tasks, "change:title", i._updateTitle),
            i.bindTo(e.language, "change:data", i._updateTitle);
        },
        _setTitleFromPrefsSection: function(e) {
            var t = this;
            t.setTitle(e, {
                isPrefsTabKey: !0
            });
        },
        _setTitleFromNameOrId: function(e) {
            var t = this;
            t.setTitle(e, {
                isNameOrId: !0
            });
        },
        _updateTitle: function() {
            var t = this
              , n = "Wunderlist"
              , o = 0;
            if (t._unreadActivities.models.length) {
                var a = t._unreadActivities.at(0).attributes;
                o = a.activities + a.conversations;
            }
            var r, s = t._lastTitleFragment, l = t._lastOptions || {};
            l.isNameOrId ? s = i.getById(s) : l.isPrefsTabKey && (r = "settings_heading_" + s,
            s = e.language.getText(r)),
            s && (n = s + " - " + n),
            o && (n = "(" + o + ") " + n),
            document.title = n,
            e.trigger("update:title", s);
        },
        setTitle: function(e, t) {
            var i = this;
            i._lastTitleFragment = e,
            i._lastOptions = t || {},
            i._updateTitle();
        }
    });
}),
define("/styles/application/_layout.js", {
    name: "application/_layout",
    data: '#wunderlist-base li.background-01{background-image:url("images/backgrounds/thumbs/01.jpg")}#wunderlist-base li.background-02{background-image:url("images/backgrounds/thumbs/02.jpg")}#wunderlist-base li.background-04{background-image:url("images/backgrounds/thumbs/04.jpg")}#wunderlist-base li.background-05{background-image:url("images/backgrounds/thumbs/05.jpg")}#wunderlist-base li.background-06{background-image:url("images/backgrounds/thumbs/06.jpg")}#wunderlist-base li.background-07{background-image:url("images/backgrounds/thumbs/07.jpg")}#wunderlist-base li.background-08{background-image:url("images/backgrounds/thumbs/08.jpg")}#wunderlist-base li.background-09{background-image:url("images/backgrounds/thumbs/09.jpg")}#wunderlist-base li.background-10{background-image:url("images/backgrounds/thumbs/10.jpg")}#wunderlist-base li.background-11{background-image:url("images/backgrounds/thumbs/11.jpg")}#wunderlist-base li.background-12{background-image:url("images/backgrounds/thumbs/12.jpg")}#wunderlist-base li.background-13{background-image:url("images/backgrounds/thumbs/13.jpg")}#wunderlist-base li.background-14{background-image:url("images/backgrounds/thumbs/14.jpg")}#wunderlist-base li.background-15{background-image:url("images/backgrounds/thumbs/15.jpg")}#wunderlist-base li.background-16{background-image:url("images/backgrounds/thumbs/16.jpg")}#wunderlist-base li.background-17{background-image:url("images/backgrounds/thumbs/17.jpg")}#wunderlist-base li.background-18{background-image:url("images/backgrounds/thumbs/18.jpg")}#wunderlist-base li.background-19{background-image:url("images/backgrounds/thumbs/19.jpg")}#wunderlist-base li.background-20{background-image:url("images/backgrounds/thumbs/20.jpg")}#wunderlist-base li.background-21{background-image:url("images/backgrounds/thumbs/21.jpg")}#wunderlist-base li.background-22{background-image:url("images/backgrounds/thumbs/22.jpg")}#wunderlist-base li.background-23{background-image:url("images/backgrounds/thumbs/23.jpg")}#wunderlist-base li.background-24{background-image:url("images/backgrounds/thumbs/24.jpg")}#wunderlist-base li.background-25{background-image:url("images/backgrounds/thumbs/25.jpg")}#wunderlist-base li.background-26{background-image:url("images/backgrounds/thumbs/26.jpg")}#wunderlist-base li.background-27{background-image:url("images/backgrounds/thumbs/27.jpg")}#wunderlist-base li.background-28{background-image:url("images/backgrounds/thumbs/28.jpg")}#wunderlist-base li.background-29{background-image:url("images/backgrounds/thumbs/29.jpg")}#wunderlist-base li.background-30{background-image:url("images/backgrounds/thumbs/30.jpg")}@media all and (min-width:1025px){#wunderlist-base.background-01:before{background-image:url("images/backgrounds/2048/01.jpg") !important}#wunderlist-base.background-02:before{background-image:url("images/backgrounds/2048/02.jpg") !important}#wunderlist-base.background-04:before{background-image:url("images/backgrounds/2048/04.jpg") !important}#wunderlist-base.background-05:before{background-image:url("images/backgrounds/2048/05.jpg") !important}#wunderlist-base.background-06:before{background-image:url("images/backgrounds/2048/06.jpg") !important}#wunderlist-base.background-07:before{background-image:url("images/backgrounds/2048/07.jpg") !important}#wunderlist-base.background-08:before{background-image:url("images/backgrounds/2048/08.jpg") !important}#wunderlist-base.background-09:before{background-image:url("images/backgrounds/2048/09.jpg") !important}#wunderlist-base.background-10:before{background-image:url("images/backgrounds/2048/10.jpg") !important}#wunderlist-base.background-11:before{background-image:url("images/backgrounds/2048/11.jpg") !important}#wunderlist-base.background-12:before{background-image:url("images/backgrounds/2048/12.jpg") !important}#wunderlist-base.background-13:before{background-image:url("images/backgrounds/2048/13.jpg") !important}#wunderlist-base.background-14:before{background-image:url("images/backgrounds/2048/14.jpg") !important}#wunderlist-base.background-15:before{background-image:url("images/backgrounds/2048/15.jpg") !important}#wunderlist-base.background-16:before{background-image:url("images/backgrounds/2048/16.jpg") !important}#wunderlist-base.background-17:before{background-image:url("images/backgrounds/2048/17.jpg") !important}#wunderlist-base.background-18:before{background-image:url("images/backgrounds/2048/18.jpg") !important}#wunderlist-base.background-19:before{background-image:url("images/backgrounds/2048/19.jpg") !important}#wunderlist-base.background-20:before{background-image:url("images/backgrounds/2048/20.jpg") !important}#wunderlist-base.background-21:before{background-image:url("images/backgrounds/2048/21.jpg") !important}#wunderlist-base.background-22:before{background-image:url("images/backgrounds/2048/22.jpg") !important}#wunderlist-base.background-23:before{background-image:url("images/backgrounds/2048/23.jpg") !important}#wunderlist-base.background-24:before{background-image:url("images/backgrounds/2048/24.jpg") !important}#wunderlist-base.background-25:before{background-image:url("images/backgrounds/2048/25.jpg") !important}#wunderlist-base.background-26:before{background-image:url("images/backgrounds/2048/26.jpg") !important}#wunderlist-base.background-27:before{background-image:url("images/backgrounds/2048/27.jpg") !important}#wunderlist-base.background-28:before{background-image:url("images/backgrounds/2048/28.jpg") !important}#wunderlist-base.background-29:before{background-image:url("images/backgrounds/2048/29.jpg") !important}#wunderlist-base.background-30:before{background-image:url("images/backgrounds/2048/30.jpg") !important}}@media all and (max-width:1024px){#wunderlist-base.background-01:before{background-image:url("images/backgrounds/1024/01.jpg") !important}#wunderlist-base.background-02:before{background-image:url("images/backgrounds/1024/02.jpg") !important}#wunderlist-base.background-04:before{background-image:url("images/backgrounds/1024/04.jpg") !important}#wunderlist-base.background-05:before{background-image:url("images/backgrounds/1024/05.jpg") !important}#wunderlist-base.background-06:before{background-image:url("images/backgrounds/1024/06.jpg") !important}#wunderlist-base.background-07:before{background-image:url("images/backgrounds/1024/07.jpg") !important}#wunderlist-base.background-08:before{background-image:url("images/backgrounds/1024/08.jpg") !important}#wunderlist-base.background-09:before{background-image:url("images/backgrounds/1024/09.jpg") !important}#wunderlist-base.background-10:before{background-image:url("images/backgrounds/1024/10.jpg") !important}#wunderlist-base.background-11:before{background-image:url("images/backgrounds/1024/11.jpg") !important}#wunderlist-base.background-12:before{background-image:url("images/backgrounds/1024/12.jpg") !important}#wunderlist-base.background-13:before{background-image:url("images/backgrounds/1024/13.jpg") !important}#wunderlist-base.background-14:before{background-image:url("images/backgrounds/1024/14.jpg") !important}#wunderlist-base.background-15:before{background-image:url("images/backgrounds/1024/15.jpg") !important}#wunderlist-base.background-16:before{background-image:url("images/backgrounds/1024/16.jpg") !important}#wunderlist-base.background-17:before{background-image:url("images/backgrounds/1024/17.jpg") !important}#wunderlist-base.background-18:before{background-image:url("images/backgrounds/1024/18.jpg") !important}#wunderlist-base.background-19:before{background-image:url("images/backgrounds/1024/19.jpg") !important}#wunderlist-base.background-20:before{background-image:url("images/backgrounds/1024/20.jpg") !important}#wunderlist-base.background-21:before{background-image:url("images/backgrounds/1024/21.jpg") !important}#wunderlist-base.background-22:before{background-image:url("images/backgrounds/1024/22.jpg") !important}#wunderlist-base.background-23:before{background-image:url("images/backgrounds/1024/23.jpg") !important}#wunderlist-base.background-24:before{background-image:url("images/backgrounds/1024/24.jpg") !important}#wunderlist-base.background-25:before{background-image:url("images/backgrounds/1024/25.jpg") !important}#wunderlist-base.background-26:before{background-image:url("images/backgrounds/1024/26.jpg") !important}#wunderlist-base.background-27:before{background-image:url("images/backgrounds/1024/27.jpg") !important}#wunderlist-base.background-28:before{background-image:url("images/backgrounds/1024/28.jpg") !important}#wunderlist-base.background-29:before{background-image:url("images/backgrounds/1024/29.jpg") !important}#wunderlist-base.background-30:before{background-image:url("images/backgrounds/1024/30.jpg") !important}}#wunderlist-base.background-03:before,#wunderlist-base li.background-03{background-image:url("images/backgrounds/sources/03.jpg");-webkit-background-size:128px 128px;-moz-background-size:128px 128px;background-size:128px 128px;background-repeat:repeat}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){#wunderlist-base.background-03:before,#wunderlist-base li.background-03{background-image:url("images/backgrounds/2x/03.jpg")}}html,input,textarea,button,select{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}*{padding:0;margin:0;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-moz-user-select:-moz-none;-ms-touch-action:none;text-rendering:optimizeLegibility}del{text-decoration:line-through}html body{font-family:"Lato","Geneva CY","Lucida Grande","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(ja_JP) body{font-family:"Lato","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Microsoft Yahei","微软雅黑","STXihei","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_CN) body{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_TW) body{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}#wunderlist-base{color:#262626;font-size:14px;-webkit-touch-callout:none !important;font-weight:500;}#wunderlist-base.nodewebkit.platform-windows a:not(.linkout){cursor:default !important}#wunderlist-base.wlapp-parent{overflow:hidden}#wunderlist-base.scroll,#wunderlist-base.sandbox{overflow:auto;-ms-scroll-snap-points-x:snapInterval(0,187px);-ms-scroll-snap-type:mandatory;-ms-scroll-chaining:none}#wunderlist-base.sandbox{padding:0 20px}#wunderlist-base:before{content:\'\';-webkit-background-size:cover;-moz-background-size:cover;background-size:cover;background-repeat:no-repeat;background-position:center top;position:fixed;top:0;bottom:0;left:0;right:0;z-index:-100}#wunderlist-base:after{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}#wunderlist-base input,#wunderlist-base textarea{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}#wunderlist-base ul{list-style:none}#wunderlist-base a{cursor:pointer}#wunderlist-base :focus{outline:none}#wunderlist-base .right{float:right}#wunderlist-base .left{float:left}#wunderlist-base .text-right{text-align:right}#wunderlist-base .text-left{text-align:left}#wunderlist-base .center{text-align:center}#wunderlist-base .hidden{display:none !important}#wunderlist-base .disabled{pointer-events:none}#wunderlist-base .invisible{visibility:hidden}#wunderlist-base .transparent{opacity:0 !important;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)" !important;filter:alpha(opacity=0) !important;pointer-events:none}#wunderlist-base .hide-overflow{overflow:hidden}#wunderlist-base .mtop{margin-top:6px}#wunderlist-base .mleft{margin-left:6px}#wunderlist-base h1.blue{color:#328ad6}#wunderlist-base .cols{font-size:0;margin-left:-7px;margin-right:-7px;}#wunderlist-base .cols > div{vertical-align:middle;font-size:13px;display:inline-block;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0 7px}#wunderlist-base .cols.top > div{vertical-align:top}#wunderlist-base .cols-center > div{margin:0 auto 10px auto;}#wunderlist-base .cols-center > div:last-child{margin-bottom:0}#wunderlist-base .col-03{width:3%}#wunderlist-base .col-05{width:5%}#wunderlist-base .col-06{width:6%}#wunderlist-base .col-07{width:7%}#wunderlist-base .col-10{width:10%}#wunderlist-base .col-15{width:15%}#wunderlist-base .col-16{width:16%}#wunderlist-base .col-17{width:17%}#wunderlist-base .col-20{width:20%}#wunderlist-base .col-21{width:21%}#wunderlist-base .col-23{width:23%}#wunderlist-base .col-25{width:25%}#wunderlist-base .col-27{width:27%}#wunderlist-base .col-28{width:28%}#wunderlist-base .col-29{width:29%}#wunderlist-base .col-30{width:30%}#wunderlist-base .col-31{width:31%}#wunderlist-base .col-32{width:32%}#wunderlist-base .col-33{width:33%}#wunderlist-base .col-34{width:34%}#wunderlist-base .col-35{width:35%}#wunderlist-base .col-40{width:40%}#wunderlist-base .col-41{width:41%}#wunderlist-base .col-44{width:44%}#wunderlist-base .col-49{width:49%}#wunderlist-base .col-50{width:50%}#wunderlist-base .col-51{width:51%}#wunderlist-base .col-57{width:57%}#wunderlist-base .col-60{width:60%}#wunderlist-base .col-61{width:61%}#wunderlist-base .col-65{width:65%}#wunderlist-base .col-67{width:67%}#wunderlist-base .col-68{width:68%}#wunderlist-base .col-70{width:70%}#wunderlist-base .col-75{width:75%}#wunderlist-base .col-80{width:80%}#wunderlist-base .col-82{width:82%}#wunderlist-base .col-85{width:85%}#wunderlist-base .col-90{width:90%}#wunderlist-base .col-94{width:94%}#wunderlist-base .col-95{width:95%}#wunderlist-base .col-96{width:96%}#wunderlist-base .col-100{width:100%}#wunderlist-base .col-160{width:160px}#wunderlist-base .main-interface{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;height:100vh;will-change:width;}#wunderlist-base .main-interface #detail{width:0}#wunderlist-base .main-interface.detail-visible #detail{width:367px}#wunderlist-base .main-interface #print{display:none}#wunderlist-base .main-interface #lists,#wunderlist-base .main-interface #tasks,#wunderlist-base .main-interface #detail{overflow:hidden}#wunderlist-base #desktop-notifications{color:#262626;}#wunderlist-base #desktop-notifications div.desktop-notification-text{background:#fff;margin:10px;padding:10px;-webkit-border-radius:10px;border-radius:10px}#wunderlist-base #loading{font-size:18px;color:rgba(255,255,255,0.85);text-shadow:0 1px 0 rgba(0,0,0,0.4);position:absolute;top:33%;bottom:0;left:0;right:0;text-align:center}#wunderlist-base #initial-loader{position:absolute;top:0;bottom:0;left:0;right:0;z-index:999999}#wunderlist-base .select select::-ms-expand{display:none}#wunderlist-base *::-webkit-scrollbar{width:6px !important}#wunderlist-base *::-webkit-scrollbar-button:start:decrement,#wunderlist-base *::-webkit-scrollbar-button:end:increment{height:0;background-color:transparent}#wunderlist-base *::-webkit-scrollbar-corner{background-color:transparent}#wunderlist-base *::-webkit-scrollbar-thumb:vertical{-webkit-border-radius:6px;border-radius:6px;background-color:rgba(0,0,0,0.2)}#wunderlist-base .tasks-scroll::-webkit-scrollbar-button:start:decrement,#wunderlist-base .tasks-scroll::-webkit-scrollbar-button:end:increment{height:13px;display:block;background-color:transparent}.background-01#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(155,83,53,0.75)}.background-02#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(83,127,112,0.75)}.background-03#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(95,111,145,0.75)}.background-04#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(71,143,138,0.75)}.background-05#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(168,109,67,0.75)}.background-06#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(102,137,100,0.75)}.background-07#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(102,152,68,0.75)}.background-08#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(4,131,183,0.75)}.background-09#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(42,108,136,0.75)}.background-10#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(104,55,87,0.75)}.background-11#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(51,78,131,0.75)}.background-12#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(58,113,115,0.75)}.background-13#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(94,140,156,0.75)}.background-14#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(47,102,118,0.75)}.background-15#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(113,175,140,0.75)}.background-16#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(188,74,58,0.75)}.background-17#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(89,89,89,0.75)}.background-18#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(87,87,87,0.75)}.background-19#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(184,109,130,0.75)}.background-20#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(96,55,57,0.75)}.background-21#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(166,85,65,0.75)}.background-22#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(58,127,147,0.75)}.background-23#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(110,81,65,0.75)}.background-24#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(189,174,136,0.75)}.background-25#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(14,145,197,0.75)}.background-26#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(118,90,152,0.75)}.background-27#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(193,91,61,0.75)}.background-28#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(165,126,136,0.75)}.background-29#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(191,117,85,0.75)}.background-30#wunderlist-base .tasks-scroll::-webkit-scrollbar-thumb:vertical{background-color:rgba(5,95,235,0.75)}.emoji{height:16px;display:inline-block;vertical-align:middle;margin-top:-3px;width:16px;background-position:center;-webkit-background-size:cover;-moz-background-size:cover;background-size:cover;text-indent:-9999px}.emoticon._1f4af{background-image:url("images/twemoji/72x72/1f4af.png")}.emoticon._1f522{background-image:url("images/twemoji/72x72/1f522.png")}.emoticon._1f1e6{background-image:url("images/twemoji/72x72/1f1e6.png")}.emoticon._1f1e7{background-image:url("images/twemoji/72x72/1f1e7.png")}.emoticon._1f1e8{background-image:url("images/twemoji/72x72/1f1e8.png")}.emoticon._1f1e9{background-image:url("images/twemoji/72x72/1f1e9.png")}.emoticon._1f1ea{background-image:url("images/twemoji/72x72/1f1ea.png")}.emoticon._1f1eb{background-image:url("images/twemoji/72x72/1f1eb.png")}.emoticon._1f1ec{background-image:url("images/twemoji/72x72/1f1ec.png")}.emoticon._1f1ed{background-image:url("images/twemoji/72x72/1f1ed.png")}.emoticon._1f1ee{background-image:url("images/twemoji/72x72/1f1ee.png")}.emoticon._1f1ef{background-image:url("images/twemoji/72x72/1f1ef.png")}.emoticon._1f1f0{background-image:url("images/twemoji/72x72/1f1f0.png")}.emoticon._1f1f1{background-image:url("images/twemoji/72x72/1f1f1.png")}.emoticon._1f1f2{background-image:url("images/twemoji/72x72/1f1f2.png")}.emoticon._1f1f3{background-image:url("images/twemoji/72x72/1f1f3.png")}.emoticon._1f1f4{background-image:url("images/twemoji/72x72/1f1f4.png")}.emoticon._1f1f5{background-image:url("images/twemoji/72x72/1f1f5.png")}.emoticon._1f1f6{background-image:url("images/twemoji/72x72/1f1f6.png")}.emoticon._1f1f7{background-image:url("images/twemoji/72x72/1f1f7.png")}.emoticon._1f1f8{background-image:url("images/twemoji/72x72/1f1f8.png")}.emoticon._1f1f9{background-image:url("images/twemoji/72x72/1f1f9.png")}.emoticon._1f1fa{background-image:url("images/twemoji/72x72/1f1fa.png")}.emoticon._1f1fb{background-image:url("images/twemoji/72x72/1f1fb.png")}.emoticon._1f1fc{background-image:url("images/twemoji/72x72/1f1fc.png")}.emoticon._1f1fd{background-image:url("images/twemoji/72x72/1f1fd.png")}.emoticon._1f1fe{background-image:url("images/twemoji/72x72/1f1fe.png")}.emoticon._1f1ff{background-image:url("images/twemoji/72x72/1f1ff.png")}.emoticon._1f320{background-image:url("images/twemoji/72x72/1f320.png")}.emoticon._1f508{background-image:url("images/twemoji/72x72/1f508.png")}.emoticon._1f68b{background-image:url("images/twemoji/72x72/1f68b.png")}.emoticon._23-20e3{background-image:url("images/twemoji/72x72/23-20e3.png")}.emoticon._30-20e3{background-image:url("images/twemoji/72x72/30-20e3.png")}.emoticon._31-20e3{background-image:url("images/twemoji/72x72/31-20e3.png")}.emoticon._32-20e3{background-image:url("images/twemoji/72x72/32-20e3.png")}.emoticon._33-20e3{background-image:url("images/twemoji/72x72/33-20e3.png")}.emoticon._34-20e3{background-image:url("images/twemoji/72x72/34-20e3.png")}.emoticon._35-20e3{background-image:url("images/twemoji/72x72/35-20e3.png")}.emoticon._36-20e3{background-image:url("images/twemoji/72x72/36-20e3.png")}.emoticon._37-20e3{background-image:url("images/twemoji/72x72/37-20e3.png")}.emoticon._38-20e3{background-image:url("images/twemoji/72x72/38-20e3.png")}.emoticon._39-20e3{background-image:url("images/twemoji/72x72/39-20e3.png")}.emoticon._1f3b1{background-image:url("images/twemoji/72x72/1f3b1.png")}.emoticon._1f170{background-image:url("images/twemoji/72x72/1f170.png")}.emoticon._a9{background-image:url("images/twemoji/72x72/a9.png")}.emoticon._1f18e{background-image:url("images/twemoji/72x72/1f18e.png")}.emoticon._1f524{background-image:url("images/twemoji/72x72/1f524.png")}.emoticon._1f521{background-image:url("images/twemoji/72x72/1f521.png")}.emoticon._1f251{background-image:url("images/twemoji/72x72/1f251.png")}.emoticon._ae{background-image:url("images/twemoji/72x72/ae.png")}.emoticon._1f6a1{background-image:url("images/twemoji/72x72/1f6a1.png")}.emoticon._2708{background-image:url("images/twemoji/72x72/2708.png")}.emoticon._23f0{background-image:url("images/twemoji/72x72/23f0.png")}.emoticon._1f47d{background-image:url("images/twemoji/72x72/1f47d.png")}.emoticon._1f691{background-image:url("images/twemoji/72x72/1f691.png")}.emoticon._2693{background-image:url("images/twemoji/72x72/2693.png")}.emoticon._1f47c{background-image:url("images/twemoji/72x72/1f47c.png")}.emoticon._1f4a2{background-image:url("images/twemoji/72x72/1f4a2.png")}.emoticon._1f620{background-image:url("images/twemoji/72x72/1f620.png")}.emoticon._1f627{background-image:url("images/twemoji/72x72/1f627.png")}.emoticon._1f41c{background-image:url("images/twemoji/72x72/1f41c.png")}.emoticon._1f34e{background-image:url("images/twemoji/72x72/1f34e.png")}.emoticon._2652{background-image:url("images/twemoji/72x72/2652.png")}.emoticon._2648{background-image:url("images/twemoji/72x72/2648.png")}.emoticon._25c0{background-image:url("images/twemoji/72x72/25c0.png")}.emoticon._23ec{background-image:url("images/twemoji/72x72/23ec.png")}.emoticon._23eb{background-image:url("images/twemoji/72x72/23eb.png")}.emoticon._1f53d{background-image:url("images/twemoji/72x72/1f53d.png")}.emoticon._2b07{background-image:url("images/twemoji/72x72/2b07.png")}.emoticon._25b6{background-image:url("images/twemoji/72x72/25b6.png")}.emoticon._2935{background-image:url("images/twemoji/72x72/2935.png")}.emoticon._2934{background-image:url("images/twemoji/72x72/2934.png")}.emoticon._2b05{background-image:url("images/twemoji/72x72/2b05.png")}.emoticon._2199{background-image:url("images/twemoji/72x72/2199.png")}.emoticon._2198{background-image:url("images/twemoji/72x72/2198.png")}.emoticon._21aa{background-image:url("images/twemoji/72x72/21aa.png")}.emoticon._27a1{background-image:url("images/twemoji/72x72/27a1.png")}.emoticon._2195{background-image:url("images/twemoji/72x72/2195.png")}.emoticon._1f53c{background-image:url("images/twemoji/72x72/1f53c.png")}.emoticon._2b06{background-image:url("images/twemoji/72x72/2b06.png")}.emoticon._2196{background-image:url("images/twemoji/72x72/2196.png")}.emoticon._2197{background-image:url("images/twemoji/72x72/2197.png")}.emoticon._1f503{background-image:url("images/twemoji/72x72/1f503.png")}.emoticon._1f504{background-image:url("images/twemoji/72x72/1f504.png")}.emoticon._1f3a8{background-image:url("images/twemoji/72x72/1f3a8.png")}.emoticon._1f69b{background-image:url("images/twemoji/72x72/1f69b.png")}.emoticon._1f632{background-image:url("images/twemoji/72x72/1f632.png")}.emoticon._1f45f{background-image:url("images/twemoji/72x72/1f45f.png")}.emoticon._1f3e7{background-image:url("images/twemoji/72x72/1f3e7.png")}.emoticon._1f171{background-image:url("images/twemoji/72x72/1f171.png")}.emoticon._1f37c{background-image:url("images/twemoji/72x72/1f37c.png")}.emoticon._1f424{background-image:url("images/twemoji/72x72/1f424.png")}.emoticon._1f6bc{background-image:url("images/twemoji/72x72/1f6bc.png")}.emoticon._1f476{background-image:url("images/twemoji/72x72/1f476.png")}.emoticon._1f519{background-image:url("images/twemoji/72x72/1f519.png")}.emoticon._1f6c4{background-image:url("images/twemoji/72x72/1f6c4.png")}.emoticon._1f388{background-image:url("images/twemoji/72x72/1f388.png")}.emoticon._2611{background-image:url("images/twemoji/72x72/2611.png")}.emoticon._1f38d{background-image:url("images/twemoji/72x72/1f38d.png")}.emoticon._1f34c{background-image:url("images/twemoji/72x72/1f34c.png")}.emoticon._203c{background-image:url("images/twemoji/72x72/203c.png")}.emoticon._1f3e6{background-image:url("images/twemoji/72x72/1f3e6.png")}.emoticon._1f4ca{background-image:url("images/twemoji/72x72/1f4ca.png")}.emoticon._1f488{background-image:url("images/twemoji/72x72/1f488.png")}.emoticon._26be{background-image:url("images/twemoji/72x72/26be.png")}.emoticon._1f3c0{background-image:url("images/twemoji/72x72/1f3c0.png")}.emoticon._1f6c0{background-image:url("images/twemoji/72x72/1f6c0.png")}.emoticon._1f6c1{background-image:url("images/twemoji/72x72/1f6c1.png")}.emoticon._1f50b{background-image:url("images/twemoji/72x72/1f50b.png")}.emoticon._1f43b{background-image:url("images/twemoji/72x72/1f43b.png")}.emoticon._1f37a{background-image:url("images/twemoji/72x72/1f37a.png")}.emoticon._1f37b{background-image:url("images/twemoji/72x72/1f37b.png")}.emoticon._1f41e{background-image:url("images/twemoji/72x72/1f41e.png")}.emoticon._1f530{background-image:url("images/twemoji/72x72/1f530.png")}.emoticon._1f514{background-image:url("images/twemoji/72x72/1f514.png")}.emoticon._1f371{background-image:url("images/twemoji/72x72/1f371.png")}.emoticon._1f6b4{background-image:url("images/twemoji/72x72/1f6b4.png")}.emoticon._1f6b2{background-image:url("images/twemoji/72x72/1f6b2.png")}.emoticon._1f459{background-image:url("images/twemoji/72x72/1f459.png")}.emoticon._1f426{background-image:url("images/twemoji/72x72/1f426.png")}.emoticon._1f382{background-image:url("images/twemoji/72x72/1f382.png")}.emoticon._26ab{background-image:url("images/twemoji/72x72/26ab.png")}.emoticon._1f0cf{background-image:url("images/twemoji/72x72/1f0cf.png")}.emoticon._2b1b{background-image:url("images/twemoji/72x72/2b1b.png")}.emoticon._25fe{background-image:url("images/twemoji/72x72/25fe.png")}.emoticon._25fc{background-image:url("images/twemoji/72x72/25fc.png")}.emoticon._2712{background-image:url("images/twemoji/72x72/2712.png")}.emoticon._25aa{background-image:url("images/twemoji/72x72/25aa.png")}.emoticon._1f532{background-image:url("images/twemoji/72x72/1f532.png")}.emoticon._1f33c{background-image:url("images/twemoji/72x72/1f33c.png")}.emoticon._1f421{background-image:url("images/twemoji/72x72/1f421.png")}.emoticon._1f4d8{background-image:url("images/twemoji/72x72/1f4d8.png")}.emoticon._1f699{background-image:url("images/twemoji/72x72/1f699.png")}.emoticon._1f499{background-image:url("images/twemoji/72x72/1f499.png")}.emoticon._1f60a{background-image:url("images/twemoji/72x72/1f60a.png")}.emoticon._1f417{background-image:url("images/twemoji/72x72/1f417.png")}.emoticon._1f4a3{background-image:url("images/twemoji/72x72/1f4a3.png")}.emoticon._1f4d1{background-image:url("images/twemoji/72x72/1f4d1.png")}.emoticon._1f516{background-image:url("images/twemoji/72x72/1f516.png")}.emoticon._1f4da{background-image:url("images/twemoji/72x72/1f4da.png")}.emoticon._1f462{background-image:url("images/twemoji/72x72/1f462.png")}.emoticon._1f490{background-image:url("images/twemoji/72x72/1f490.png")}.emoticon._1f647{background-image:url("images/twemoji/72x72/1f647.png")}.emoticon._1f3b3{background-image:url("images/twemoji/72x72/1f3b3.png")}.emoticon._1f466{background-image:url("images/twemoji/72x72/1f466.png")}.emoticon._1f35e{background-image:url("images/twemoji/72x72/1f35e.png")}.emoticon._1f470{background-image:url("images/twemoji/72x72/1f470.png")}.emoticon._1f309{background-image:url("images/twemoji/72x72/1f309.png")}.emoticon._1f4bc{background-image:url("images/twemoji/72x72/1f4bc.png")}.emoticon._1f494{background-image:url("images/twemoji/72x72/1f494.png")}.emoticon._1f41b{background-image:url("images/twemoji/72x72/1f41b.png")}.emoticon._1f4a1{background-image:url("images/twemoji/72x72/1f4a1.png")}.emoticon._1f685{background-image:url("images/twemoji/72x72/1f685.png")}.emoticon._1f684{background-image:url("images/twemoji/72x72/1f684.png")}.emoticon._1f68c{background-image:url("images/twemoji/72x72/1f68c.png")}.emoticon._1f68f{background-image:url("images/twemoji/72x72/1f68f.png")}.emoticon._1f464{background-image:url("images/twemoji/72x72/1f464.png")}.emoticon._1f465{background-image:url("images/twemoji/72x72/1f465.png")}.emoticon._1f335{background-image:url("images/twemoji/72x72/1f335.png")}.emoticon._1f370{background-image:url("images/twemoji/72x72/1f370.png")}.emoticon._1f4c6{background-image:url("images/twemoji/72x72/1f4c6.png")}.emoticon._1f4f2{background-image:url("images/twemoji/72x72/1f4f2.png")}.emoticon._1f42b{background-image:url("images/twemoji/72x72/1f42b.png")}.emoticon._1f4f7{background-image:url("images/twemoji/72x72/1f4f7.png")}.emoticon._264b{background-image:url("images/twemoji/72x72/264b.png")}.emoticon._1f36c{background-image:url("images/twemoji/72x72/1f36c.png")}.emoticon._1f520{background-image:url("images/twemoji/72x72/1f520.png")}.emoticon._2651{background-image:url("images/twemoji/72x72/2651.png")}.emoticon._1f4c7{background-image:url("images/twemoji/72x72/1f4c7.png")}.emoticon._1f3a0{background-image:url("images/twemoji/72x72/1f3a0.png")}.emoticon._1f431{background-image:url("images/twemoji/72x72/1f431.png")}.emoticon._1f408{background-image:url("images/twemoji/72x72/1f408.png")}.emoticon._1f4bf{background-image:url("images/twemoji/72x72/1f4bf.png")}.emoticon._1f4c9{background-image:url("images/twemoji/72x72/1f4c9.png")}.emoticon._1f4c8{background-image:url("images/twemoji/72x72/1f4c8.png")}.emoticon._1f4b9{background-image:url("images/twemoji/72x72/1f4b9.png")}.emoticon._1f3c1{background-image:url("images/twemoji/72x72/1f3c1.png")}.emoticon._1f352{background-image:url("images/twemoji/72x72/1f352.png")}.emoticon._1f338{background-image:url("images/twemoji/72x72/1f338.png")}.emoticon._1f330{background-image:url("images/twemoji/72x72/1f330.png")}.emoticon._1f414{background-image:url("images/twemoji/72x72/1f414.png")}.emoticon._1f6b8{background-image:url("images/twemoji/72x72/1f6b8.png")}.emoticon._1f36b{background-image:url("images/twemoji/72x72/1f36b.png")}.emoticon._1f384{background-image:url("images/twemoji/72x72/1f384.png")}.emoticon._26ea{background-image:url("images/twemoji/72x72/26ea.png")}.emoticon._1f3a6{background-image:url("images/twemoji/72x72/1f3a6.png")}.emoticon._1f3aa{background-image:url("images/twemoji/72x72/1f3aa.png")}.emoticon._1f307{background-image:url("images/twemoji/72x72/1f307.png")}.emoticon._1f306{background-image:url("images/twemoji/72x72/1f306.png")}.emoticon._1f191{background-image:url("images/twemoji/72x72/1f191.png")}.emoticon._1f44f{background-image:url("images/twemoji/72x72/1f44f.png")}.emoticon._1f3ac{background-image:url("images/twemoji/72x72/1f3ac.png")}.emoticon._1f4cb{background-image:url("images/twemoji/72x72/1f4cb.png")}.emoticon._1f550{background-image:url("images/twemoji/72x72/1f550.png")}.emoticon._1f559{background-image:url("images/twemoji/72x72/1f559.png")}.emoticon._1f565{background-image:url("images/twemoji/72x72/1f565.png")}.emoticon._1f55a{background-image:url("images/twemoji/72x72/1f55a.png")}.emoticon._1f566{background-image:url("images/twemoji/72x72/1f566.png")}.emoticon._1f55b{background-image:url("images/twemoji/72x72/1f55b.png")}.emoticon._1f567{background-image:url("images/twemoji/72x72/1f567.png")}.emoticon._1f55c{background-image:url("images/twemoji/72x72/1f55c.png")}.emoticon._1f551{background-image:url("images/twemoji/72x72/1f551.png")}.emoticon._1f55d{background-image:url("images/twemoji/72x72/1f55d.png")}.emoticon._1f552{background-image:url("images/twemoji/72x72/1f552.png")}.emoticon._1f55e{background-image:url("images/twemoji/72x72/1f55e.png")}.emoticon._1f553{background-image:url("images/twemoji/72x72/1f553.png")}.emoticon._1f55f{background-image:url("images/twemoji/72x72/1f55f.png")}.emoticon._1f554{background-image:url("images/twemoji/72x72/1f554.png")}.emoticon._1f560{background-image:url("images/twemoji/72x72/1f560.png")}.emoticon._1f555{background-image:url("images/twemoji/72x72/1f555.png")}.emoticon._1f561{background-image:url("images/twemoji/72x72/1f561.png")}.emoticon._1f556{background-image:url("images/twemoji/72x72/1f556.png")}.emoticon._1f562{background-image:url("images/twemoji/72x72/1f562.png")}.emoticon._1f557{background-image:url("images/twemoji/72x72/1f557.png")}.emoticon._1f563{background-image:url("images/twemoji/72x72/1f563.png")}.emoticon._1f558{background-image:url("images/twemoji/72x72/1f558.png")}.emoticon._1f564{background-image:url("images/twemoji/72x72/1f564.png")}.emoticon._1f4d5{background-image:url("images/twemoji/72x72/1f4d5.png")}.emoticon._1f510{background-image:url("images/twemoji/72x72/1f510.png")}.emoticon._1f302{background-image:url("images/twemoji/72x72/1f302.png")}.emoticon._2601{background-image:url("images/twemoji/72x72/2601.png")}.emoticon._2663{background-image:url("images/twemoji/72x72/2663.png")}.emoticon._1f1e8-1f1f3{background-image:url("images/twemoji/72x72/1f1e8-1f1f3.png")}.emoticon._1f378{background-image:url("images/twemoji/72x72/1f378.png")}.emoticon._2615{background-image:url("images/twemoji/72x72/2615.png")}.emoticon._1f630{background-image:url("images/twemoji/72x72/1f630.png")}.emoticon._1f4a5{background-image:url("images/twemoji/72x72/1f4a5.png")}.emoticon._1f4bb{background-image:url("images/twemoji/72x72/1f4bb.png")}.emoticon._1f38a{background-image:url("images/twemoji/72x72/1f38a.png")}.emoticon._1f616{background-image:url("images/twemoji/72x72/1f616.png")}.emoticon._1f615{background-image:url("images/twemoji/72x72/1f615.png")}.emoticon._3297{background-image:url("images/twemoji/72x72/3297.png")}.emoticon._1f477{background-image:url("images/twemoji/72x72/1f477.png")}.emoticon._1f6a7{background-image:url("images/twemoji/72x72/1f6a7.png")}.emoticon._1f3ea{background-image:url("images/twemoji/72x72/1f3ea.png")}.emoticon._1f36a{background-image:url("images/twemoji/72x72/1f36a.png")}.emoticon._1f192{background-image:url("images/twemoji/72x72/1f192.png")}.emoticon._1f46e{background-image:url("images/twemoji/72x72/1f46e.png")}.emoticon._1f33d{background-image:url("images/twemoji/72x72/1f33d.png")}.emoticon._1f491{background-image:url("images/twemoji/72x72/1f491.png")}.emoticon._1f46b{background-image:url("images/twemoji/72x72/1f46b.png")}.emoticon._1f48f{background-image:url("images/twemoji/72x72/1f48f.png")}.emoticon._1f42e{background-image:url("images/twemoji/72x72/1f42e.png")}.emoticon._1f404{background-image:url("images/twemoji/72x72/1f404.png")}.emoticon._1f4b3{background-image:url("images/twemoji/72x72/1f4b3.png")}.emoticon._1f319{background-image:url("images/twemoji/72x72/1f319.png")}.emoticon._1f40a{background-image:url("images/twemoji/72x72/1f40a.png")}.emoticon._1f38c{background-image:url("images/twemoji/72x72/1f38c.png")}.emoticon._1f451{background-image:url("images/twemoji/72x72/1f451.png")}.emoticon._1f622{background-image:url("images/twemoji/72x72/1f622.png")}.emoticon._1f63f{background-image:url("images/twemoji/72x72/1f63f.png")}.emoticon._1f52e{background-image:url("images/twemoji/72x72/1f52e.png")}.emoticon._1f498{background-image:url("images/twemoji/72x72/1f498.png")}.emoticon._27b0{background-image:url("images/twemoji/72x72/27b0.png")}.emoticon._1f4b1{background-image:url("images/twemoji/72x72/1f4b1.png")}.emoticon._1f35b{background-image:url("images/twemoji/72x72/1f35b.png")}.emoticon._1f36e{background-image:url("images/twemoji/72x72/1f36e.png")}.emoticon._1f6c3{background-image:url("images/twemoji/72x72/1f6c3.png")}.emoticon._1f300{background-image:url("images/twemoji/72x72/1f300.png")}.emoticon._1f483{background-image:url("images/twemoji/72x72/1f483.png")}.emoticon._1f46f{background-image:url("images/twemoji/72x72/1f46f.png")}.emoticon._1f361{background-image:url("images/twemoji/72x72/1f361.png")}.emoticon._1f3af{background-image:url("images/twemoji/72x72/1f3af.png")}.emoticon._1f4a8{background-image:url("images/twemoji/72x72/1f4a8.png")}.emoticon._1f4c5{background-image:url("images/twemoji/72x72/1f4c5.png")}.emoticon._1f1e9-1f1ea{background-image:url("images/twemoji/72x72/1f1e9-1f1ea.png")}.emoticon._1f333{background-image:url("images/twemoji/72x72/1f333.png")}.emoticon._1f3ec{background-image:url("images/twemoji/72x72/1f3ec.png")}.emoticon._1f4a0{background-image:url("images/twemoji/72x72/1f4a0.png")}.emoticon._2666{background-image:url("images/twemoji/72x72/2666.png")}.emoticon._1f625{background-image:url("images/twemoji/72x72/1f625.png")}.emoticon._1f61e{background-image:url("images/twemoji/72x72/1f61e.png")}.emoticon._1f635{background-image:url("images/twemoji/72x72/1f635.png")}.emoticon._1f4ab{background-image:url("images/twemoji/72x72/1f4ab.png")}.emoticon._1f6af{background-image:url("images/twemoji/72x72/1f6af.png")}.emoticon._1f436{background-image:url("images/twemoji/72x72/1f436.png")}.emoticon._1f415{background-image:url("images/twemoji/72x72/1f415.png")}.emoticon._1f4b5{background-image:url("images/twemoji/72x72/1f4b5.png")}.emoticon._1f38e{background-image:url("images/twemoji/72x72/1f38e.png")}.emoticon._1f6aa{background-image:url("images/twemoji/72x72/1f6aa.png")}.emoticon._1f369{background-image:url("images/twemoji/72x72/1f369.png")}.emoticon._1f432{background-image:url("images/twemoji/72x72/1f432.png")}.emoticon._1f409{background-image:url("images/twemoji/72x72/1f409.png")}.emoticon._1f457{background-image:url("images/twemoji/72x72/1f457.png")}.emoticon._1f42a{background-image:url("images/twemoji/72x72/1f42a.png")}.emoticon._1f4a7{background-image:url("images/twemoji/72x72/1f4a7.png")}.emoticon._1f4c0{background-image:url("images/twemoji/72x72/1f4c0.png")}.emoticon._1f4e7{background-image:url("images/twemoji/72x72/1f4e7.png")}.emoticon._e50a{background-image:url("images/twemoji/72x72/e50a.png")}.emoticon._1f33e{background-image:url("images/twemoji/72x72/1f33e.png")}.emoticon._1f442{background-image:url("images/twemoji/72x72/1f442.png")}.emoticon._1f30d{background-image:url("images/twemoji/72x72/1f30d.png")}.emoticon._1f30e{background-image:url("images/twemoji/72x72/1f30e.png")}.emoticon._1f30f{background-image:url("images/twemoji/72x72/1f30f.png")}.emoticon._1f373{background-image:url("images/twemoji/72x72/1f373.png")}.emoticon._1f346{background-image:url("images/twemoji/72x72/1f346.png")}.emoticon._2734{background-image:url("images/twemoji/72x72/2734.png")}.emoticon._2733{background-image:url("images/twemoji/72x72/2733.png")}.emoticon._1f50c{background-image:url("images/twemoji/72x72/1f50c.png")}.emoticon._1f418{background-image:url("images/twemoji/72x72/1f418.png")}.emoticon._1f51a{background-image:url("images/twemoji/72x72/1f51a.png")}.emoticon._1f4e9{background-image:url("images/twemoji/72x72/1f4e9.png")}.emoticon._2709{background-image:url("images/twemoji/72x72/2709.png")}.emoticon._1f1ea-1f1f8{background-image:url("images/twemoji/72x72/1f1ea-1f1f8.png")}.emoticon._1f4b6{background-image:url("images/twemoji/72x72/1f4b6.png")}.emoticon._1f3f0{background-image:url("images/twemoji/72x72/1f3f0.png")}.emoticon._1f3e4{background-image:url("images/twemoji/72x72/1f3e4.png")}.emoticon._1f332{background-image:url("images/twemoji/72x72/1f332.png")}.emoticon._1f611{background-image:url("images/twemoji/72x72/1f611.png")}.emoticon._1f453{background-image:url("images/twemoji/72x72/1f453.png")}.emoticon._1f440{background-image:url("images/twemoji/72x72/1f440.png")}.emoticon._1f3ed{background-image:url("images/twemoji/72x72/1f3ed.png")}.emoticon._1f342{background-image:url("images/twemoji/72x72/1f342.png")}.emoticon._1f46a{background-image:url("images/twemoji/72x72/1f46a.png")}.emoticon._23e9{background-image:url("images/twemoji/72x72/23e9.png")}.emoticon._1f4e0{background-image:url("images/twemoji/72x72/1f4e0.png")}.emoticon._1f628{background-image:url("images/twemoji/72x72/1f628.png")}.emoticon._1f3a1{background-image:url("images/twemoji/72x72/1f3a1.png")}.emoticon._1f4c1{background-image:url("images/twemoji/72x72/1f4c1.png")}.emoticon._1f692{background-image:url("images/twemoji/72x72/1f692.png")}.emoticon._1f525{background-image:url("images/twemoji/72x72/1f525.png")}.emoticon._1f386{background-image:url("images/twemoji/72x72/1f386.png")}.emoticon._1f31b{background-image:url("images/twemoji/72x72/1f31b.png")}.emoticon._1f313{background-image:url("images/twemoji/72x72/1f313.png")}.emoticon._1f365{background-image:url("images/twemoji/72x72/1f365.png")}.emoticon._1f41f{background-image:url("images/twemoji/72x72/1f41f.png")}.emoticon._1f3a3{background-image:url("images/twemoji/72x72/1f3a3.png")}.emoticon._270a{background-image:url("images/twemoji/72x72/270a.png")}.emoticon._1f38f{background-image:url("images/twemoji/72x72/1f38f.png")}.emoticon._1f526{background-image:url("images/twemoji/72x72/1f526.png")}.emoticon._1f42c{background-image:url("images/twemoji/72x72/1f42c.png")}.emoticon._1f4be{background-image:url("images/twemoji/72x72/1f4be.png")}.emoticon._1f3b4{background-image:url("images/twemoji/72x72/1f3b4.png")}.emoticon._1f633{background-image:url("images/twemoji/72x72/1f633.png")}.emoticon._1f301{background-image:url("images/twemoji/72x72/1f301.png")}.emoticon._1f3c8{background-image:url("images/twemoji/72x72/1f3c8.png")}.emoticon._1f463{background-image:url("images/twemoji/72x72/1f463.png")}.emoticon._1f374{background-image:url("images/twemoji/72x72/1f374.png")}.emoticon._26f2{background-image:url("images/twemoji/72x72/26f2.png")}.emoticon._1f340{background-image:url("images/twemoji/72x72/1f340.png")}.emoticon._1f1eb-1f1f7{background-image:url("images/twemoji/72x72/1f1eb-1f1f7.png")}.emoticon._1f193{background-image:url("images/twemoji/72x72/1f193.png")}.emoticon._1f364{background-image:url("images/twemoji/72x72/1f364.png")}.emoticon._1f35f{background-image:url("images/twemoji/72x72/1f35f.png")}.emoticon._1f438{background-image:url("images/twemoji/72x72/1f438.png")}.emoticon._1f626{background-image:url("images/twemoji/72x72/1f626.png")}.emoticon._26fd{background-image:url("images/twemoji/72x72/26fd.png")}.emoticon._1f31d{background-image:url("images/twemoji/72x72/1f31d.png")}.emoticon._1f315{background-image:url("images/twemoji/72x72/1f315.png")}.emoticon._1f3b2{background-image:url("images/twemoji/72x72/1f3b2.png")}.emoticon._1f48e{background-image:url("images/twemoji/72x72/1f48e.png")}.emoticon._264a{background-image:url("images/twemoji/72x72/264a.png")}.emoticon._1f47b{background-image:url("images/twemoji/72x72/1f47b.png")}.emoticon._1f49d{background-image:url("images/twemoji/72x72/1f49d.png")}.emoticon._1f381{background-image:url("images/twemoji/72x72/1f381.png")}.emoticon._1f467{background-image:url("images/twemoji/72x72/1f467.png")}.emoticon._1f310{background-image:url("images/twemoji/72x72/1f310.png")}.emoticon._1f410{background-image:url("images/twemoji/72x72/1f410.png")}.emoticon._26f3{background-image:url("images/twemoji/72x72/26f3.png")}.emoticon._1f347{background-image:url("images/twemoji/72x72/1f347.png")}.emoticon._1f34f{background-image:url("images/twemoji/72x72/1f34f.png")}.emoticon._1f4d7{background-image:url("images/twemoji/72x72/1f4d7.png")}.emoticon._1f49a{background-image:url("images/twemoji/72x72/1f49a.png")}.emoticon._2755{background-image:url("images/twemoji/72x72/2755.png")}.emoticon._2754{background-image:url("images/twemoji/72x72/2754.png")}.emoticon._1f62c{background-image:url("images/twemoji/72x72/1f62c.png")}.emoticon._1f601{background-image:url("images/twemoji/72x72/1f601.png")}.emoticon._1f600{background-image:url("images/twemoji/72x72/1f600.png")}.emoticon._1f482{background-image:url("images/twemoji/72x72/1f482.png")}.emoticon._1f3b8{background-image:url("images/twemoji/72x72/1f3b8.png")}.emoticon._1f52b{background-image:url("images/twemoji/72x72/1f52b.png")}.emoticon._1f487{background-image:url("images/twemoji/72x72/1f487.png")}.emoticon._1f354{background-image:url("images/twemoji/72x72/1f354.png")}.emoticon._1f528{background-image:url("images/twemoji/72x72/1f528.png")}.emoticon._1f439{background-image:url("images/twemoji/72x72/1f439.png")}.emoticon._1f45c{background-image:url("images/twemoji/72x72/1f45c.png")}.emoticon._1f425{background-image:url("images/twemoji/72x72/1f425.png")}.emoticon._1f423{background-image:url("images/twemoji/72x72/1f423.png")}.emoticon._1f3a7{background-image:url("images/twemoji/72x72/1f3a7.png")}.emoticon._1f649{background-image:url("images/twemoji/72x72/1f649.png")}.emoticon._1f49f{background-image:url("images/twemoji/72x72/1f49f.png")}.emoticon._1f63b{background-image:url("images/twemoji/72x72/1f63b.png")}.emoticon._1f60d{background-image:url("images/twemoji/72x72/1f60d.png")}.emoticon._2764{background-image:url("images/twemoji/72x72/2764.png")}.emoticon._1f493{background-image:url("images/twemoji/72x72/1f493.png")}.emoticon._1f497{background-image:url("images/twemoji/72x72/1f497.png")}.emoticon._2665{background-image:url("images/twemoji/72x72/2665.png")}.emoticon._2714{background-image:url("images/twemoji/72x72/2714.png")}.emoticon._2797{background-image:url("images/twemoji/72x72/2797.png")}.emoticon._1f4b2{background-image:url("images/twemoji/72x72/1f4b2.png")}.emoticon._2757{background-image:url("images/twemoji/72x72/2757.png")}.emoticon._2796{background-image:url("images/twemoji/72x72/2796.png")}.emoticon._2716{background-image:url("images/twemoji/72x72/2716.png")}.emoticon._2795{background-image:url("images/twemoji/72x72/2795.png")}.emoticon._1f681{background-image:url("images/twemoji/72x72/1f681.png")}.emoticon._1f33f{background-image:url("images/twemoji/72x72/1f33f.png")}.emoticon._1f33a{background-image:url("images/twemoji/72x72/1f33a.png")}.emoticon._1f506{background-image:url("images/twemoji/72x72/1f506.png")}.emoticon._1f460{background-image:url("images/twemoji/72x72/1f460.png")}.emoticon._1f52a{background-image:url("images/twemoji/72x72/1f52a.png")}.emoticon._1f36f{background-image:url("images/twemoji/72x72/1f36f.png")}.emoticon._1f41d{background-image:url("images/twemoji/72x72/1f41d.png")}.emoticon._1f3c7{background-image:url("images/twemoji/72x72/1f3c7.png")}.emoticon._1f434{background-image:url("images/twemoji/72x72/1f434.png")}.emoticon._1f3e5{background-image:url("images/twemoji/72x72/1f3e5.png")}.emoticon._1f3e8{background-image:url("images/twemoji/72x72/1f3e8.png")}.emoticon._2668{background-image:url("images/twemoji/72x72/2668.png")}.emoticon._23f3{background-image:url("images/twemoji/72x72/23f3.png")}.emoticon._231b{background-image:url("images/twemoji/72x72/231b.png")}.emoticon._1f3e1{background-image:url("images/twemoji/72x72/1f3e1.png")}.emoticon._1f3e0{background-image:url("images/twemoji/72x72/1f3e0.png")}.emoticon._1f62f{background-image:url("images/twemoji/72x72/1f62f.png")}.emoticon._1f368{background-image:url("images/twemoji/72x72/1f368.png")}.emoticon._1f366{background-image:url("images/twemoji/72x72/1f366.png")}.emoticon._1f194{background-image:url("images/twemoji/72x72/1f194.png")}.emoticon._1f250{background-image:url("images/twemoji/72x72/1f250.png")}.emoticon._1f47f{background-image:url("images/twemoji/72x72/1f47f.png")}.emoticon._1f4e5{background-image:url("images/twemoji/72x72/1f4e5.png")}.emoticon._1f4e8{background-image:url("images/twemoji/72x72/1f4e8.png")}.emoticon._1f481{background-image:url("images/twemoji/72x72/1f481.png")}.emoticon._2139{background-image:url("images/twemoji/72x72/2139.png")}.emoticon._1f607{background-image:url("images/twemoji/72x72/1f607.png")}.emoticon._2049{background-image:url("images/twemoji/72x72/2049.png")}.emoticon._1f4f1{background-image:url("images/twemoji/72x72/1f4f1.png")}.emoticon._1f1ee-1f1f9{background-image:url("images/twemoji/72x72/1f1ee-1f1f9.png")}.emoticon._1f383{background-image:url("images/twemoji/72x72/1f383.png")}.emoticon._1f5fe{background-image:url("images/twemoji/72x72/1f5fe.png")}.emoticon._1f3ef{background-image:url("images/twemoji/72x72/1f3ef.png")}.emoticon._1f47a{background-image:url("images/twemoji/72x72/1f47a.png")}.emoticon._1f479{background-image:url("images/twemoji/72x72/1f479.png")}.emoticon._1f456{background-image:url("images/twemoji/72x72/1f456.png")}.emoticon._1f639{background-image:url("images/twemoji/72x72/1f639.png")}.emoticon._1f602{background-image:url("images/twemoji/72x72/1f602.png")}.emoticon._1f1ef-1f1f5{background-image:url("images/twemoji/72x72/1f1ef-1f1f5.png")}.emoticon._1f511{background-image:url("images/twemoji/72x72/1f511.png")}.emoticon._1f51f{background-image:url("images/twemoji/72x72/1f51f.png")}.emoticon._1f458{background-image:url("images/twemoji/72x72/1f458.png")}.emoticon._1f48b{background-image:url("images/twemoji/72x72/1f48b.png")}.emoticon._1f63d{background-image:url("images/twemoji/72x72/1f63d.png")}.emoticon._1f61a{background-image:url("images/twemoji/72x72/1f61a.png")}.emoticon._1f618{background-image:url("images/twemoji/72x72/1f618.png")}.emoticon._1f619{background-image:url("images/twemoji/72x72/1f619.png")}.emoticon._1f617{background-image:url("images/twemoji/72x72/1f617.png")}.emoticon._1f428{background-image:url("images/twemoji/72x72/1f428.png")}.emoticon._1f201{background-image:url("images/twemoji/72x72/1f201.png")}.emoticon._1f1f0-1f1f7{background-image:url("images/twemoji/72x72/1f1f0-1f1f7.png")}.emoticon._1f3ee{background-image:url("images/twemoji/72x72/1f3ee.png")}.emoticon._1f535{background-image:url("images/twemoji/72x72/1f535.png")}.emoticon._1f537{background-image:url("images/twemoji/72x72/1f537.png")}.emoticon._1f536{background-image:url("images/twemoji/72x72/1f536.png")}.emoticon._1f31c{background-image:url("images/twemoji/72x72/1f31c.png")}.emoticon._1f317{background-image:url("images/twemoji/72x72/1f317.png")}.emoticon._1f343{background-image:url("images/twemoji/72x72/1f343.png")}.emoticon._1f4d2{background-image:url("images/twemoji/72x72/1f4d2.png")}.emoticon._1f6c5{background-image:url("images/twemoji/72x72/1f6c5.png")}.emoticon._2194{background-image:url("images/twemoji/72x72/2194.png")}.emoticon._21a9{background-image:url("images/twemoji/72x72/21a9.png")}.emoticon._1f34b{background-image:url("images/twemoji/72x72/1f34b.png")}.emoticon._264c{background-image:url("images/twemoji/72x72/264c.png")}.emoticon._1f406{background-image:url("images/twemoji/72x72/1f406.png")}.emoticon._264e{background-image:url("images/twemoji/72x72/264e.png")}.emoticon._1f688{background-image:url("images/twemoji/72x72/1f688.png")}.emoticon._1f517{background-image:url("images/twemoji/72x72/1f517.png")}.emoticon._1f444{background-image:url("images/twemoji/72x72/1f444.png")}.emoticon._1f484{background-image:url("images/twemoji/72x72/1f484.png")}.emoticon._1f50f{background-image:url("images/twemoji/72x72/1f50f.png")}.emoticon._1f512{background-image:url("images/twemoji/72x72/1f512.png")}.emoticon._1f36d{background-image:url("images/twemoji/72x72/1f36d.png")}.emoticon._27bf{background-image:url("images/twemoji/72x72/27bf.png")}.emoticon._1f4e2{background-image:url("images/twemoji/72x72/1f4e2.png")}.emoticon._1f3e9{background-image:url("images/twemoji/72x72/1f3e9.png")}.emoticon._1f48c{background-image:url("images/twemoji/72x72/1f48c.png")}.emoticon._1f505{background-image:url("images/twemoji/72x72/1f505.png")}.emoticon._24c2{background-image:url("images/twemoji/72x72/24c2.png")}.emoticon._1f50e{background-image:url("images/twemoji/72x72/1f50e.png")}.emoticon._1f50d{background-image:url("images/twemoji/72x72/1f50d.png")}.emoticon._1f004{background-image:url("images/twemoji/72x72/1f004.png")}.emoticon._1f4ea{background-image:url("images/twemoji/72x72/1f4ea.png")}.emoticon._1f4ec{background-image:url("images/twemoji/72x72/1f4ec.png")}.emoticon._1f4ed{background-image:url("images/twemoji/72x72/1f4ed.png")}.emoticon._1f4eb{background-image:url("images/twemoji/72x72/1f4eb.png")}.emoticon._1f472{background-image:url("images/twemoji/72x72/1f472.png")}.emoticon._1f473{background-image:url("images/twemoji/72x72/1f473.png")}.emoticon._1f468{background-image:url("images/twemoji/72x72/1f468.png")}.emoticon._1f341{background-image:url("images/twemoji/72x72/1f341.png")}.emoticon._1f637{background-image:url("images/twemoji/72x72/1f637.png")}.emoticon._1f486{background-image:url("images/twemoji/72x72/1f486.png")}.emoticon._1f356{background-image:url("images/twemoji/72x72/1f356.png")}.emoticon._1f4e3{background-image:url("images/twemoji/72x72/1f4e3.png")}.emoticon._1f348{background-image:url("images/twemoji/72x72/1f348.png")}.emoticon._1f6b9{background-image:url("images/twemoji/72x72/1f6b9.png")}.emoticon._1f687{background-image:url("images/twemoji/72x72/1f687.png")}.emoticon._1f3a4{background-image:url("images/twemoji/72x72/1f3a4.png")}.emoticon._1f52c{background-image:url("images/twemoji/72x72/1f52c.png")}.emoticon._1f30c{background-image:url("images/twemoji/72x72/1f30c.png")}.emoticon._1f690{background-image:url("images/twemoji/72x72/1f690.png")}.emoticon._1f4bd{background-image:url("images/twemoji/72x72/1f4bd.png")}.emoticon._1f4f4{background-image:url("images/twemoji/72x72/1f4f4.png")}.emoticon._1f4b8{background-image:url("images/twemoji/72x72/1f4b8.png")}.emoticon._1f4b0{background-image:url("images/twemoji/72x72/1f4b0.png")}.emoticon._1f435{background-image:url("images/twemoji/72x72/1f435.png")}.emoticon._1f412{background-image:url("images/twemoji/72x72/1f412.png")}.emoticon._1f69d{background-image:url("images/twemoji/72x72/1f69d.png")}.emoticon._1f393{background-image:url("images/twemoji/72x72/1f393.png")}.emoticon._1f5fb{background-image:url("images/twemoji/72x72/1f5fb.png")}.emoticon._1f6b5{background-image:url("images/twemoji/72x72/1f6b5.png")}.emoticon._1f6a0{background-image:url("images/twemoji/72x72/1f6a0.png")}.emoticon._1f69e{background-image:url("images/twemoji/72x72/1f69e.png")}.emoticon._1f42d{background-image:url("images/twemoji/72x72/1f42d.png")}.emoticon._1f401{background-image:url("images/twemoji/72x72/1f401.png")}.emoticon._1f3a5{background-image:url("images/twemoji/72x72/1f3a5.png")}.emoticon._1f5ff{background-image:url("images/twemoji/72x72/1f5ff.png")}.emoticon._1f4aa{background-image:url("images/twemoji/72x72/1f4aa.png")}.emoticon._1f344{background-image:url("images/twemoji/72x72/1f344.png")}.emoticon._1f3b9{background-image:url("images/twemoji/72x72/1f3b9.png")}.emoticon._1f3b5{background-image:url("images/twemoji/72x72/1f3b5.png")}.emoticon._1f3bc{background-image:url("images/twemoji/72x72/1f3bc.png")}.emoticon._1f507{background-image:url("images/twemoji/72x72/1f507.png")}.emoticon._1f485{background-image:url("images/twemoji/72x72/1f485.png")}.emoticon._1f4db{background-image:url("images/twemoji/72x72/1f4db.png")}.emoticon._1f454{background-image:url("images/twemoji/72x72/1f454.png")}.emoticon._274e{background-image:url("images/twemoji/72x72/274e.png")}.emoticon._1f610{background-image:url("images/twemoji/72x72/1f610.png")}.emoticon._1f31a{background-image:url("images/twemoji/72x72/1f31a.png")}.emoticon._1f311{background-image:url("images/twemoji/72x72/1f311.png")}.emoticon._1f195{background-image:url("images/twemoji/72x72/1f195.png")}.emoticon._1f4f0{background-image:url("images/twemoji/72x72/1f4f0.png")}.emoticon._1f196{background-image:url("images/twemoji/72x72/1f196.png")}.emoticon._1f515{background-image:url("images/twemoji/72x72/1f515.png")}.emoticon._1f6b3{background-image:url("images/twemoji/72x72/1f6b3.png")}.emoticon._1f6ab{background-image:url("images/twemoji/72x72/1f6ab.png")}.emoticon._26d4{background-image:url("images/twemoji/72x72/26d4.png")}.emoticon._1f645{background-image:url("images/twemoji/72x72/1f645.png")}.emoticon._1f4f5{background-image:url("images/twemoji/72x72/1f4f5.png")}.emoticon._1f636{background-image:url("images/twemoji/72x72/1f636.png")}.emoticon._1f6b7{background-image:url("images/twemoji/72x72/1f6b7.png")}.emoticon._1f6ad{background-image:url("images/twemoji/72x72/1f6ad.png")}.emoticon._1f6b1{background-image:url("images/twemoji/72x72/1f6b1.png")}.emoticon._1f443{background-image:url("images/twemoji/72x72/1f443.png")}.emoticon._1f4d4{background-image:url("images/twemoji/72x72/1f4d4.png")}.emoticon._1f4d3{background-image:url("images/twemoji/72x72/1f4d3.png")}.emoticon._1f3b6{background-image:url("images/twemoji/72x72/1f3b6.png")}.emoticon._1f529{background-image:url("images/twemoji/72x72/1f529.png")}.emoticon._2b55{background-image:url("images/twemoji/72x72/2b55.png")}.emoticon._1f17e{background-image:url("images/twemoji/72x72/1f17e.png")}.emoticon._1f30a{background-image:url("images/twemoji/72x72/1f30a.png")}.emoticon._1f419{background-image:url("images/twemoji/72x72/1f419.png")}.emoticon._1f362{background-image:url("images/twemoji/72x72/1f362.png")}.emoticon._1f3e2{background-image:url("images/twemoji/72x72/1f3e2.png")}.emoticon._1f44c{background-image:url("images/twemoji/72x72/1f44c.png")}.emoticon._1f646{background-image:url("images/twemoji/72x72/1f646.png")}.emoticon._1f197{background-image:url("images/twemoji/72x72/1f197.png")}.emoticon._1f474{background-image:url("images/twemoji/72x72/1f474.png")}.emoticon._1f475{background-image:url("images/twemoji/72x72/1f475.png")}.emoticon._1f51b{background-image:url("images/twemoji/72x72/1f51b.png")}.emoticon._1f698{background-image:url("images/twemoji/72x72/1f698.png")}.emoticon._1f68d{background-image:url("images/twemoji/72x72/1f68d.png")}.emoticon._1f694{background-image:url("images/twemoji/72x72/1f694.png")}.emoticon._1f696{background-image:url("images/twemoji/72x72/1f696.png")}.emoticon._1f4d6{background-image:url("images/twemoji/72x72/1f4d6.png")}.emoticon._1f4c2{background-image:url("images/twemoji/72x72/1f4c2.png")}.emoticon._1f450{background-image:url("images/twemoji/72x72/1f450.png")}.emoticon._1f62e{background-image:url("images/twemoji/72x72/1f62e.png")}.emoticon._26ce{background-image:url("images/twemoji/72x72/26ce.png")}.emoticon._1f4d9{background-image:url("images/twemoji/72x72/1f4d9.png")}.emoticon._1f4e4{background-image:url("images/twemoji/72x72/1f4e4.png")}.emoticon._1f402{background-image:url("images/twemoji/72x72/1f402.png")}.emoticon._1f4e6{background-image:url("images/twemoji/72x72/1f4e6.png")}.emoticon._1f4c4{background-image:url("images/twemoji/72x72/1f4c4.png")}.emoticon._1f4c3{background-image:url("images/twemoji/72x72/1f4c3.png")}.emoticon._1f4df{background-image:url("images/twemoji/72x72/1f4df.png")}.emoticon._1f334{background-image:url("images/twemoji/72x72/1f334.png")}.emoticon._1f43c{background-image:url("images/twemoji/72x72/1f43c.png")}.emoticon._1f4ce{background-image:url("images/twemoji/72x72/1f4ce.png")}.emoticon._1f17f{background-image:url("images/twemoji/72x72/1f17f.png")}.emoticon._303d{background-image:url("images/twemoji/72x72/303d.png")}.emoticon._26c5{background-image:url("images/twemoji/72x72/26c5.png")}.emoticon._1f6c2{background-image:url("images/twemoji/72x72/1f6c2.png")}.emoticon._1f43e{background-image:url("images/twemoji/72x72/1f43e.png")}.emoticon._1f351{background-image:url("images/twemoji/72x72/1f351.png")}.emoticon._1f350{background-image:url("images/twemoji/72x72/1f350.png")}.emoticon._1f4dd{background-image:url("images/twemoji/72x72/1f4dd.png")}.emoticon._270f{background-image:url("images/twemoji/72x72/270f.png")}.emoticon._1f427{background-image:url("images/twemoji/72x72/1f427.png")}.emoticon._1f614{background-image:url("images/twemoji/72x72/1f614.png")}.emoticon._1f3ad{background-image:url("images/twemoji/72x72/1f3ad.png")}.emoticon._1f623{background-image:url("images/twemoji/72x72/1f623.png")}.emoticon._1f64d{background-image:url("images/twemoji/72x72/1f64d.png")}.emoticon._1f471{background-image:url("images/twemoji/72x72/1f471.png")}.emoticon._1f64e{background-image:url("images/twemoji/72x72/1f64e.png")}.emoticon._1f43d{background-image:url("images/twemoji/72x72/1f43d.png")}.emoticon._1f437{background-image:url("images/twemoji/72x72/1f437.png")}.emoticon._1f416{background-image:url("images/twemoji/72x72/1f416.png")}.emoticon._1f48a{background-image:url("images/twemoji/72x72/1f48a.png")}.emoticon._1f34d{background-image:url("images/twemoji/72x72/1f34d.png")}.emoticon._2653{background-image:url("images/twemoji/72x72/2653.png")}.emoticon._1f355{background-image:url("images/twemoji/72x72/1f355.png")}.emoticon._1f447{background-image:url("images/twemoji/72x72/1f447.png")}.emoticon._1f448{background-image:url("images/twemoji/72x72/1f448.png")}.emoticon._1f449{background-image:url("images/twemoji/72x72/1f449.png")}.emoticon._1f446{background-image:url("images/twemoji/72x72/1f446.png")}.emoticon._261d{background-image:url("images/twemoji/72x72/261d.png")}.emoticon._1f693{background-image:url("images/twemoji/72x72/1f693.png")}.emoticon._1f429{background-image:url("images/twemoji/72x72/1f429.png")}.emoticon._1f4a9{background-image:url("images/twemoji/72x72/1f4a9.png")}.emoticon._1f3e3{background-image:url("images/twemoji/72x72/1f3e3.png")}.emoticon._1f4ef{background-image:url("images/twemoji/72x72/1f4ef.png")}.emoticon._1f4ee{background-image:url("images/twemoji/72x72/1f4ee.png")}.emoticon._1f6b0{background-image:url("images/twemoji/72x72/1f6b0.png")}.emoticon._1f45d{background-image:url("images/twemoji/72x72/1f45d.png")}.emoticon._1f357{background-image:url("images/twemoji/72x72/1f357.png")}.emoticon._1f4b7{background-image:url("images/twemoji/72x72/1f4b7.png")}.emoticon._1f63e{background-image:url("images/twemoji/72x72/1f63e.png")}.emoticon._1f64f{background-image:url("images/twemoji/72x72/1f64f.png")}.emoticon._1f478{background-image:url("images/twemoji/72x72/1f478.png")}.emoticon._1f44a{background-image:url("images/twemoji/72x72/1f44a.png")}.emoticon._1f49c{background-image:url("images/twemoji/72x72/1f49c.png")}.emoticon._1f45b{background-image:url("images/twemoji/72x72/1f45b.png")}.emoticon._1f4cc{background-image:url("images/twemoji/72x72/1f4cc.png")}.emoticon._1f6ae{background-image:url("images/twemoji/72x72/1f6ae.png")}.emoticon._2753{background-image:url("images/twemoji/72x72/2753.png")}.emoticon._1f430{background-image:url("images/twemoji/72x72/1f430.png")}.emoticon._1f407{background-image:url("images/twemoji/72x72/1f407.png")}.emoticon._1f40e{background-image:url("images/twemoji/72x72/1f40e.png")}.emoticon._1f518{background-image:url("images/twemoji/72x72/1f518.png")}.emoticon._1f4fb{background-image:url("images/twemoji/72x72/1f4fb.png")}.emoticon._1f621{background-image:url("images/twemoji/72x72/1f621.png")}.emoticon._1f308{background-image:url("images/twemoji/72x72/1f308.png")}.emoticon._270b{background-image:url("images/twemoji/72x72/270b.png")}.emoticon._1f64c{background-image:url("images/twemoji/72x72/1f64c.png")}.emoticon._1f64b{background-image:url("images/twemoji/72x72/1f64b.png")}.emoticon._1f40f{background-image:url("images/twemoji/72x72/1f40f.png")}.emoticon._1f35c{background-image:url("images/twemoji/72x72/1f35c.png")}.emoticon._1f400{background-image:url("images/twemoji/72x72/1f400.png")}.emoticon._267b{background-image:url("images/twemoji/72x72/267b.png")}.emoticon._1f697{background-image:url("images/twemoji/72x72/1f697.png")}.emoticon._1f534{background-image:url("images/twemoji/72x72/1f534.png")}.emoticon._263a{background-image:url("images/twemoji/72x72/263a.png")}.emoticon._1f60c{background-image:url("images/twemoji/72x72/1f60c.png")}.emoticon._1f502{background-image:url("images/twemoji/72x72/1f502.png")}.emoticon._1f501{background-image:url("images/twemoji/72x72/1f501.png")}.emoticon._1f6bb{background-image:url("images/twemoji/72x72/1f6bb.png")}.emoticon._1f49e{background-image:url("images/twemoji/72x72/1f49e.png")}.emoticon._23ea{background-image:url("images/twemoji/72x72/23ea.png")}.emoticon._1f380{background-image:url("images/twemoji/72x72/1f380.png")}.emoticon._1f359{background-image:url("images/twemoji/72x72/1f359.png")}.emoticon._1f358{background-image:url("images/twemoji/72x72/1f358.png")}.emoticon._1f391{background-image:url("images/twemoji/72x72/1f391.png")}.emoticon._1f35a{background-image:url("images/twemoji/72x72/1f35a.png")}.emoticon._1f48d{background-image:url("images/twemoji/72x72/1f48d.png")}.emoticon._1f680{background-image:url("images/twemoji/72x72/1f680.png")}.emoticon._1f3a2{background-image:url("images/twemoji/72x72/1f3a2.png")}.emoticon._1f413{background-image:url("images/twemoji/72x72/1f413.png")}.emoticon._1f339{background-image:url("images/twemoji/72x72/1f339.png")}.emoticon._1f6a8{background-image:url("images/twemoji/72x72/1f6a8.png")}.emoticon._1f4cd{background-image:url("images/twemoji/72x72/1f4cd.png")}.emoticon._1f6a3{background-image:url("images/twemoji/72x72/1f6a3.png")}.emoticon._1f1f7-1f1fa{background-image:url("images/twemoji/72x72/1f1f7-1f1fa.png")}.emoticon._1f3c9{background-image:url("images/twemoji/72x72/1f3c9.png")}.emoticon._1f3bd{background-image:url("images/twemoji/72x72/1f3bd.png")}.emoticon._1f3c3{background-image:url("images/twemoji/72x72/1f3c3.png")}.emoticon._1f202{background-image:url("images/twemoji/72x72/1f202.png")}.emoticon._2650{background-image:url("images/twemoji/72x72/2650.png")}.emoticon._26f5{background-image:url("images/twemoji/72x72/26f5.png")}.emoticon._1f376{background-image:url("images/twemoji/72x72/1f376.png")}.emoticon._1f461{background-image:url("images/twemoji/72x72/1f461.png")}.emoticon._1f385{background-image:url("images/twemoji/72x72/1f385.png")}.emoticon._1f4e1{background-image:url("images/twemoji/72x72/1f4e1.png")}.emoticon._1f606{background-image:url("images/twemoji/72x72/1f606.png")}.emoticon._1f3b7{background-image:url("images/twemoji/72x72/1f3b7.png")}.emoticon._1f392{background-image:url("images/twemoji/72x72/1f392.png")}.emoticon._1f3eb{background-image:url("images/twemoji/72x72/1f3eb.png")}.emoticon._2702{background-image:url("images/twemoji/72x72/2702.png")}.emoticon._264f{background-image:url("images/twemoji/72x72/264f.png")}.emoticon._1f640{background-image:url("images/twemoji/72x72/1f640.png")}.emoticon._1f631{background-image:url("images/twemoji/72x72/1f631.png")}.emoticon._1f4dc{background-image:url("images/twemoji/72x72/1f4dc.png")}.emoticon._1f4ba{background-image:url("images/twemoji/72x72/1f4ba.png")}.emoticon._3299{background-image:url("images/twemoji/72x72/3299.png")}.emoticon._1f648{background-image:url("images/twemoji/72x72/1f648.png")}.emoticon._1f331{background-image:url("images/twemoji/72x72/1f331.png")}.emoticon._1f367{background-image:url("images/twemoji/72x72/1f367.png")}.emoticon._1f411{background-image:url("images/twemoji/72x72/1f411.png")}.emoticon._1f41a{background-image:url("images/twemoji/72x72/1f41a.png")}.emoticon._1f6a2{background-image:url("images/twemoji/72x72/1f6a2.png")}.emoticon._1f45e{background-image:url("images/twemoji/72x72/1f45e.png")}.emoticon._1f6bf{background-image:url("images/twemoji/72x72/1f6bf.png")}.emoticon._1f4f6{background-image:url("images/twemoji/72x72/1f4f6.png")}.emoticon._1f52f{background-image:url("images/twemoji/72x72/1f52f.png")}.emoticon._1f3bf{background-image:url("images/twemoji/72x72/1f3bf.png")}.emoticon._1f480{background-image:url("images/twemoji/72x72/1f480.png")}.emoticon._1f634{background-image:url("images/twemoji/72x72/1f634.png")}.emoticon._1f62a{background-image:url("images/twemoji/72x72/1f62a.png")}.emoticon._1f3b0{background-image:url("images/twemoji/72x72/1f3b0.png")}.emoticon._1f539{background-image:url("images/twemoji/72x72/1f539.png")}.emoticon._1f538{background-image:url("images/twemoji/72x72/1f538.png")}.emoticon._1f53b{background-image:url("images/twemoji/72x72/1f53b.png")}.emoticon._1f53a{background-image:url("images/twemoji/72x72/1f53a.png")}.emoticon._1f638{background-image:url("images/twemoji/72x72/1f638.png")}.emoticon._1f604{background-image:url("images/twemoji/72x72/1f604.png")}.emoticon._1f63a{background-image:url("images/twemoji/72x72/1f63a.png")}.emoticon._1f603{background-image:url("images/twemoji/72x72/1f603.png")}.emoticon._1f608{background-image:url("images/twemoji/72x72/1f608.png")}.emoticon._1f63c{background-image:url("images/twemoji/72x72/1f63c.png")}.emoticon._1f60f{background-image:url("images/twemoji/72x72/1f60f.png")}.emoticon._1f6ac{background-image:url("images/twemoji/72x72/1f6ac.png")}.emoticon._1f40c{background-image:url("images/twemoji/72x72/1f40c.png")}.emoticon._1f40d{background-image:url("images/twemoji/72x72/1f40d.png")}.emoticon._1f3c2{background-image:url("images/twemoji/72x72/1f3c2.png")}.emoticon._2744{background-image:url("images/twemoji/72x72/2744.png")}.emoticon._26c4{background-image:url("images/twemoji/72x72/26c4.png")}.emoticon._1f62d{background-image:url("images/twemoji/72x72/1f62d.png")}.emoticon._26bd{background-image:url("images/twemoji/72x72/26bd.png")}.emoticon._1f51c{background-image:url("images/twemoji/72x72/1f51c.png")}.emoticon._1f198{background-image:url("images/twemoji/72x72/1f198.png")}.emoticon._1f509{background-image:url("images/twemoji/72x72/1f509.png")}.emoticon._1f47e{background-image:url("images/twemoji/72x72/1f47e.png")}.emoticon._2660{background-image:url("images/twemoji/72x72/2660.png")}.emoticon._1f35d{background-image:url("images/twemoji/72x72/1f35d.png")}.emoticon._2747{background-image:url("images/twemoji/72x72/2747.png")}.emoticon._1f387{background-image:url("images/twemoji/72x72/1f387.png")}.emoticon._2728{background-image:url("images/twemoji/72x72/2728.png")}.emoticon._1f496{background-image:url("images/twemoji/72x72/1f496.png")}.emoticon._1f64a{background-image:url("images/twemoji/72x72/1f64a.png")}.emoticon._1f50a{background-image:url("images/twemoji/72x72/1f50a.png")}.emoticon._1f4ac{background-image:url("images/twemoji/72x72/1f4ac.png")}.emoticon._1f6a4{background-image:url("images/twemoji/72x72/1f6a4.png")}.emoticon._2b50{background-image:url("images/twemoji/72x72/2b50.png")}.emoticon._1f31f{background-image:url("images/twemoji/72x72/1f31f.png")}.emoticon._1f303{background-image:url("images/twemoji/72x72/1f303.png")}.emoticon._1f689{background-image:url("images/twemoji/72x72/1f689.png")}.emoticon._1f5fd{background-image:url("images/twemoji/72x72/1f5fd.png")}.emoticon._1f682{background-image:url("images/twemoji/72x72/1f682.png")}.emoticon._1f372{background-image:url("images/twemoji/72x72/1f372.png")}.emoticon._1f4cf{background-image:url("images/twemoji/72x72/1f4cf.png")}.emoticon._1f353{background-image:url("images/twemoji/72x72/1f353.png")}.emoticon._1f61d{background-image:url("images/twemoji/72x72/1f61d.png")}.emoticon._1f61c{background-image:url("images/twemoji/72x72/1f61c.png")}.emoticon._1f61b{background-image:url("images/twemoji/72x72/1f61b.png")}.emoticon._1f31e{background-image:url("images/twemoji/72x72/1f31e.png")}.emoticon._1f33b{background-image:url("images/twemoji/72x72/1f33b.png")}.emoticon._1f60e{background-image:url("images/twemoji/72x72/1f60e.png")}.emoticon._2600{background-image:url("images/twemoji/72x72/2600.png")}.emoticon._1f304{background-image:url("images/twemoji/72x72/1f304.png")}.emoticon._1f305{background-image:url("images/twemoji/72x72/1f305.png")}.emoticon._1f3c4{background-image:url("images/twemoji/72x72/1f3c4.png")}.emoticon._1f363{background-image:url("images/twemoji/72x72/1f363.png")}.emoticon._1f69f{background-image:url("images/twemoji/72x72/1f69f.png")}.emoticon._1f4a6{background-image:url("images/twemoji/72x72/1f4a6.png")}.emoticon._1f605{background-image:url("images/twemoji/72x72/1f605.png")}.emoticon._1f613{background-image:url("images/twemoji/72x72/1f613.png")}.emoticon._1f360{background-image:url("images/twemoji/72x72/1f360.png")}.emoticon._1f3ca{background-image:url("images/twemoji/72x72/1f3ca.png")}.emoticon._1f523{background-image:url("images/twemoji/72x72/1f523.png")}.emoticon._1f489{background-image:url("images/twemoji/72x72/1f489.png")}.emoticon._1f389{background-image:url("images/twemoji/72x72/1f389.png")}.emoticon._1f38b{background-image:url("images/twemoji/72x72/1f38b.png")}.emoticon._1f34a{background-image:url("images/twemoji/72x72/1f34a.png")}.emoticon._2649{background-image:url("images/twemoji/72x72/2649.png")}.emoticon._1f695{background-image:url("images/twemoji/72x72/1f695.png")}.emoticon._1f375{background-image:url("images/twemoji/72x72/1f375.png")}.emoticon._1f4de{background-image:url("images/twemoji/72x72/1f4de.png")}.emoticon._260e{background-image:url("images/twemoji/72x72/260e.png")}.emoticon._1f52d{background-image:url("images/twemoji/72x72/1f52d.png")}.emoticon._1f3be{background-image:url("images/twemoji/72x72/1f3be.png")}.emoticon._26fa{background-image:url("images/twemoji/72x72/26fa.png")}.emoticon._1f4ad{background-image:url("images/twemoji/72x72/1f4ad.png")}.emoticon._1f44e{background-image:url("images/twemoji/72x72/1f44e.png")}.emoticon._1f44d{background-image:url("images/twemoji/72x72/1f44d.png")}.emoticon._1f3ab{background-image:url("images/twemoji/72x72/1f3ab.png")}.emoticon._1f42f{background-image:url("images/twemoji/72x72/1f42f.png")}.emoticon._1f405{background-image:url("images/twemoji/72x72/1f405.png")}.emoticon._1f62b{background-image:url("images/twemoji/72x72/1f62b.png")}.emoticon._2122{background-image:url("images/twemoji/72x72/2122.png")}.emoticon._1f6bd{background-image:url("images/twemoji/72x72/1f6bd.png")}.emoticon._1f5fc{background-image:url("images/twemoji/72x72/1f5fc.png")}.emoticon._1f345{background-image:url("images/twemoji/72x72/1f345.png")}.emoticon._1f445{background-image:url("images/twemoji/72x72/1f445.png")}.emoticon._1f51d{background-image:url("images/twemoji/72x72/1f51d.png")}.emoticon._1f3a9{background-image:url("images/twemoji/72x72/1f3a9.png")}.emoticon._1f69c{background-image:url("images/twemoji/72x72/1f69c.png")}.emoticon._1f6a5{background-image:url("images/twemoji/72x72/1f6a5.png")}.emoticon._1f683{background-image:url("images/twemoji/72x72/1f683.png")}.emoticon._1f686{background-image:url("images/twemoji/72x72/1f686.png")}.emoticon._1f68a{background-image:url("images/twemoji/72x72/1f68a.png")}.emoticon._1f6a9{background-image:url("images/twemoji/72x72/1f6a9.png")}.emoticon._1f4d0{background-image:url("images/twemoji/72x72/1f4d0.png")}.emoticon._1f531{background-image:url("images/twemoji/72x72/1f531.png")}.emoticon._1f624{background-image:url("images/twemoji/72x72/1f624.png")}.emoticon._1f68e{background-image:url("images/twemoji/72x72/1f68e.png")}.emoticon._1f3c6{background-image:url("images/twemoji/72x72/1f3c6.png")}.emoticon._1f379{background-image:url("images/twemoji/72x72/1f379.png")}.emoticon._1f420{background-image:url("images/twemoji/72x72/1f420.png")}.emoticon._1f69a{background-image:url("images/twemoji/72x72/1f69a.png")}.emoticon._1f3ba{background-image:url("images/twemoji/72x72/1f3ba.png")}.emoticon._1f455{background-image:url("images/twemoji/72x72/1f455.png")}.emoticon._1f337{background-image:url("images/twemoji/72x72/1f337.png")}.emoticon._1f422{background-image:url("images/twemoji/72x72/1f422.png")}.emoticon._1f4fa{background-image:url("images/twemoji/72x72/1f4fa.png")}.emoticon._1f500{background-image:url("images/twemoji/72x72/1f500.png")}.emoticon._1f495{background-image:url("images/twemoji/72x72/1f495.png")}.emoticon._1f46c{background-image:url("images/twemoji/72x72/1f46c.png")}.emoticon._1f46d{background-image:url("images/twemoji/72x72/1f46d.png")}.emoticon._1f239{background-image:url("images/twemoji/72x72/1f239.png")}.emoticon._1f234{background-image:url("images/twemoji/72x72/1f234.png")}.emoticon._1f23a{background-image:url("images/twemoji/72x72/1f23a.png")}.emoticon._1f22f{background-image:url("images/twemoji/72x72/1f22f.png")}.emoticon._1f237{background-image:url("images/twemoji/72x72/1f237.png")}.emoticon._1f236{background-image:url("images/twemoji/72x72/1f236.png")}.emoticon._1f235{background-image:url("images/twemoji/72x72/1f235.png")}.emoticon._1f21a{background-image:url("images/twemoji/72x72/1f21a.png")}.emoticon._1f238{background-image:url("images/twemoji/72x72/1f238.png")}.emoticon._1f232{background-image:url("images/twemoji/72x72/1f232.png")}.emoticon._1f233{background-image:url("images/twemoji/72x72/1f233.png")}.emoticon._1f1ec-1f1e7{background-image:url("images/twemoji/72x72/1f1ec-1f1e7.png")}.emoticon._2614{background-image:url("images/twemoji/72x72/2614.png")}.emoticon._1f612{background-image:url("images/twemoji/72x72/1f612.png")}.emoticon._1f51e{background-image:url("images/twemoji/72x72/1f51e.png")}.emoticon._1f513{background-image:url("images/twemoji/72x72/1f513.png")}.emoticon._1f199{background-image:url("images/twemoji/72x72/1f199.png")}.emoticon._1f1fa-1f1f8{background-image:url("images/twemoji/72x72/1f1fa-1f1f8.png")}.emoticon._270c{background-image:url("images/twemoji/72x72/270c.png")}.emoticon._1f6a6{background-image:url("images/twemoji/72x72/1f6a6.png")}.emoticon._1f4fc{background-image:url("images/twemoji/72x72/1f4fc.png")}.emoticon._1f4f3{background-image:url("images/twemoji/72x72/1f4f3.png")}.emoticon._1f4f9{background-image:url("images/twemoji/72x72/1f4f9.png")}.emoticon._1f3ae{background-image:url("images/twemoji/72x72/1f3ae.png")}.emoticon._1f3bb{background-image:url("images/twemoji/72x72/1f3bb.png")}.emoticon._264d{background-image:url("images/twemoji/72x72/264d.png")}.emoticon._1f30b{background-image:url("images/twemoji/72x72/1f30b.png")}.emoticon._1f19a{background-image:url("images/twemoji/72x72/1f19a.png")}.emoticon._1f6b6{background-image:url("images/twemoji/72x72/1f6b6.png")}.emoticon._1f318{background-image:url("images/twemoji/72x72/1f318.png")}.emoticon._1f316{background-image:url("images/twemoji/72x72/1f316.png")}.emoticon._26a0{background-image:url("images/twemoji/72x72/26a0.png")}.emoticon._231a{background-image:url("images/twemoji/72x72/231a.png")}.emoticon._1f403{background-image:url("images/twemoji/72x72/1f403.png")}.emoticon._1f349{background-image:url("images/twemoji/72x72/1f349.png")}.emoticon._1f44b{background-image:url("images/twemoji/72x72/1f44b.png")}.emoticon._3030{background-image:url("images/twemoji/72x72/3030.png")}.emoticon._1f312{background-image:url("images/twemoji/72x72/1f312.png")}.emoticon._1f314{background-image:url("images/twemoji/72x72/1f314.png")}.emoticon._1f6be{background-image:url("images/twemoji/72x72/1f6be.png")}.emoticon._1f629{background-image:url("images/twemoji/72x72/1f629.png")}.emoticon._1f492{background-image:url("images/twemoji/72x72/1f492.png")}.emoticon._1f433{background-image:url("images/twemoji/72x72/1f433.png")}.emoticon._1f40b{background-image:url("images/twemoji/72x72/1f40b.png")}.emoticon._267f{background-image:url("images/twemoji/72x72/267f.png")}.emoticon._2705{background-image:url("images/twemoji/72x72/2705.png")}.emoticon._26aa{background-image:url("images/twemoji/72x72/26aa.png")}.emoticon._1f4ae{background-image:url("images/twemoji/72x72/1f4ae.png")}.emoticon._2b1c{background-image:url("images/twemoji/72x72/2b1c.png")}.emoticon._25fd{background-image:url("images/twemoji/72x72/25fd.png")}.emoticon._25fb{background-image:url("images/twemoji/72x72/25fb.png")}.emoticon._25ab{background-image:url("images/twemoji/72x72/25ab.png")}.emoticon._1f533{background-image:url("images/twemoji/72x72/1f533.png")}.emoticon._1f390{background-image:url("images/twemoji/72x72/1f390.png")}.emoticon._1f377{background-image:url("images/twemoji/72x72/1f377.png")}.emoticon._1f609{background-image:url("images/twemoji/72x72/1f609.png")}.emoticon._1f43a{background-image:url("images/twemoji/72x72/1f43a.png")}.emoticon._1f469{background-image:url("images/twemoji/72x72/1f469.png")}.emoticon._1f45a{background-image:url("images/twemoji/72x72/1f45a.png")}.emoticon._1f452{background-image:url("images/twemoji/72x72/1f452.png")}.emoticon._1f6ba{background-image:url("images/twemoji/72x72/1f6ba.png")}.emoticon._1f61f{background-image:url("images/twemoji/72x72/1f61f.png")}.emoticon._1f527{background-image:url("images/twemoji/72x72/1f527.png")}.emoticon._274c{background-image:url("images/twemoji/72x72/274c.png")}.emoticon._1f49b{background-image:url("images/twemoji/72x72/1f49b.png")}.emoticon._1f4b4{background-image:url("images/twemoji/72x72/1f4b4.png")}.emoticon._1f60b{background-image:url("images/twemoji/72x72/1f60b.png")}.emoticon._26a1{background-image:url("images/twemoji/72x72/26a1.png")}.emoticon._1f4a4{background-image:url("images/twemoji/72x72/1f4a4.png")}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){#tasks,#lists,#detail{-webkit-transition:none;-moz-transition:none;-o-transition:none;-ms-transition:none;transition:none}}@media all and (max-width:1000px){#wunderlist-base #detail{position:absolute;z-index:1}html[dir=ltr] #wunderlist-base #detail{right:0}html[dir=rtl] #wunderlist-base #detail{left:0}html[dir=rtl].chrome.packaged .main-interface{min-width:0}}@media all and (max-width:550px){#wunderlist-base .main-interface #tasks{position:absolute;top:0;bottom:0}#wunderlist-base .main-interface #detail{position:absolute;left:0;right:0;width:100% !important;z-index:100}#wunderlist-base .main-interface.detail-visible #detail{-webkit-transform:translateX(0) !important;-moz-transform:translateX(0) !important;-o-transform:translateX(0) !important;-ms-transform:translateX(0) !important;transform:translateX(0) !important}html[dir=ltr] #wunderlist-base .main-interface #detail{-webkit-transform:translateX(100%);-moz-transform:translateX(100%);-o-transform:translateX(100%);-ms-transform:translateX(100%);transform:translateX(100%)}html[dir=ltr] #wunderlist-base .main-interface #tasks{right:0;left:42px}html[dir=rtl] #wunderlist-base .main-interface #detail{-webkit-transform:translateX(-100%);-moz-transform:translateX(-100%);-o-transform:translateX(-100%);-ms-transform:translateX(-100%);transform:translateX(-100%)}html[dir=rtl] #wunderlist-base .main-interface #tasks{left:0;right:42px}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@-moz-keyframes rotate{0%{-moz-transform:rotate(0)}100%{-moz-transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}'
}),
define("/styles/application/_avatars.js", {
    name: "application/_avatars",
    data: '.avatar{display:block;position:relative;width:25px;height:25px;}.avatar img{-webkit-border-radius:50%;border-radius:50%;overflow:hidden;z-index:1}.avatar:hover{cursor:default}.avatar.fake-user{border:none}.avatar.fake-user,.avatar.no-avatar,.avatar.unassigned{-webkit-border-radius:50%;border-radius:50%;overflow:hidden;background:#bdbcbb;}.avatar.fake-user:after,.avatar.no-avatar:after,.avatar.unassigned:after{position:absolute;left:0;top:0;width:100%;height:100%;content:\'k\';font-family:\'Wundercon-Pictograms\';color:#fafafa;text-align:center;font-size:20px;line-height:26px}.avatar.pro-user:after{background-image:url("images/sprites/app.png");background-position:-197px -111px;width:16px;height:16px;position:absolute;z-index:100;content:"";top:-5px;right:-5px;left:auto}.avatar img{height:25px;width:25px;position:relative;}.avatar img[src=""]{visibility:hidden}.avatar.tiny{width:15px;height:15px;}.avatar.tiny img{width:15px !important;height:15px !important}.avatar.tiny:before{width:16px !important;height:16px !important}.avatar.tiny:after{font-size:16px;line-height:18px}.avatar.small{width:22px;height:22px;}.avatar.small:before{width:20px !important;height:20px !important}.avatar.small:after{font-size:20px;line-height:22px}.avatar.small img{width:22px !important;height:22px !important}.avatar.almostmedium{width:28px;height:28px;}.avatar.almostmedium:before{width:26px !important;height:26px !important}.avatar.almostmedium:after{font-size:22px;line-height:30px}.avatar.almostmedium img{width:28px !important;height:28px !important}.avatar.medium{width:32px;height:32px;}.avatar.medium:before{width:30px !important;height:30px !important}.avatar.medium:after{font-size:26px;line-height:34px}.avatar.medium img{height:32px !important;width:32px !important}.avatar.medium.wunderlist-avatar{background:url("images/icon.png") top left !important;-webkit-background-size:32px !important;-moz-background-size:32px !important;background-size:32px !important}.avatar.almostlarge{width:60px;height:60px;}.avatar.almostlarge:before{display:none}.avatar.almostlarge img{width:60px;height:60px;margin:0 auto}.avatar.large{width:120px;height:120px;}.avatar.large:after{font-size:100px;line-height:124px}.avatar.large img{width:120px;height:120px;margin:0 auto}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){.avatar.pro-user:after{background-image:url("images/sprites/app-retina.png") !important;-webkit-background-size:357px;-moz-background-size:357px;background-size:357px}}'
}),
define("/styles/_forms.js", {
    name: "_forms",
    data: '#wunderlist-base [type=text],#wunderlist-base [type=email],#wunderlist-base [type=password],#wunderlist-base .input-fake{width:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:6px;font-family:$wlFonts;font-weight:500;font-size:15px;color:#262626;border:none;background:#fff;-webkit-transition:all 0.15s ease-in-out;-moz-transition:all 0.15s ease-in-out;-o-transition:all 0.15s ease-in-out;-ms-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;-webkit-box-shadow:inset 0 0 0 1px #d6d6d6;box-shadow:inset 0 0 0 1px #d6d6d6;-webkit-border-radius:3px;border-radius:3px;}#wunderlist-base [type=text]:focus,#wunderlist-base [type=email]:focus,#wunderlist-base [type=password]:focus,#wunderlist-base .input-fake:focus,#wunderlist-base [type=text].focus,#wunderlist-base [type=email].focus,#wunderlist-base [type=password].focus,#wunderlist-base .input-fake.focus{-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8)}#wunderlist-base [type=text].chromeless,#wunderlist-base [type=email].chromeless,#wunderlist-base [type=password].chromeless,#wunderlist-base .input-fake.chromeless{border:none !important;background:none !important;-webkit-box-shadow:none !important;box-shadow:none !important;-webkit-border-radius:0 !important;border-radius:0 !important;padding:0;line-height:20px}#wunderlist-base [type=text].shortcut,#wunderlist-base [type=email].shortcut,#wunderlist-base [type=password].shortcut,#wunderlist-base .input-fake.shortcut{text-align:center;}#wunderlist-base [type=text].shortcut:focus,#wunderlist-base [type=email].shortcut:focus,#wunderlist-base [type=password].shortcut:focus,#wunderlist-base .input-fake.shortcut:focus{background:#fff;-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8)}#wunderlist-base [type=text].big,#wunderlist-base [type=email].big,#wunderlist-base [type=password].big,#wunderlist-base .input-fake.big{padding:9px 10px 10px}#wunderlist-base [type=text].medium,#wunderlist-base [type=email].medium,#wunderlist-base [type=password].medium,#wunderlist-base .input-fake.medium{width:83px}#wunderlist-base [type=text].small,#wunderlist-base [type=email].small,#wunderlist-base [type=password].small,#wunderlist-base .input-fake.small{width:30px}#wunderlist-base [type=text].smaller,#wunderlist-base [type=email].smaller,#wunderlist-base [type=password].smaller,#wunderlist-base .input-fake.smaller{width:20px}#wunderlist-base [type=text].hasIcon,#wunderlist-base [type=email].hasIcon,#wunderlist-base [type=password].hasIcon,#wunderlist-base .input-fake.hasIcon{padding-left:28px;}#wunderlist-base [type=text].hasIcon + svg,#wunderlist-base [type=email].hasIcon + svg,#wunderlist-base [type=password].hasIcon + svg,#wunderlist-base .input-fake.hasIcon + svg{position:absolute;top:7px;left:10px;fill:#737272}#wunderlist-base [type=text][disabled],#wunderlist-base [type=email][disabled],#wunderlist-base [type=password][disabled],#wunderlist-base .input-fake[disabled]{border-color:#ccc;color:#737272}#wunderlist-base [type=text]:-moz-placeholder,#wunderlist-base [type=email]:-moz-placeholder,#wunderlist-base [type=password]:-moz-placeholder,#wunderlist-base .input-fake:-moz-placeholder{color:#737272}#wunderlist-base textarea{resize:none;color:#262626;font-weight:500}#wunderlist-base .select{position:relative;display:inline-block;vertical-align:top;max-width:100%;-webkit-box-shadow:inset 0 0 0 1px #d6d6d6;box-shadow:inset 0 0 0 1px #d6d6d6;background:#fff;font-weight:500;-webkit-border-radius:3px;border-radius:3px;}#wunderlist-base .select:before{background:url("images/sprites/app.png");background-position:-342px -81px;width:9px;height:5px;position:absolute;pointer-events:none;right:8px;top:14px;content:\'\'}#wunderlist-base .select select{width:100%;-webkit-appearance:none;-moz-appearance:none;-moz-appearance:radio-container;border:none;background:none;-webkit-border-radius:3px;border-radius:3px;color:#262626;font-size:13px;line-height:17px;padding:8px 26px 8px 8px;text-indent:.01px;-o-text-overflow:\'\';text-overflow:\'\';}#wunderlist-base .select select:focus{-webkit-box-shadow:inset 0 0 0 1px #328ad6;box-shadow:inset 0 0 0 1px #328ad6;margin-bottom:0}#wunderlist-base select.big{width:187px}#wunderlist-base select.small{width:130px}#wunderlist-base select.smaller{width:70px}#wunderlist-base select.tiny{width:50px}#wunderlist-base select.tiny-flexible{min-width:50px;max-width:70px}#wunderlist-base [type=radio],#wunderlist-base [type=checkbox]{margin-right:5px}@media (-webkit-min-device-pixel-ratio:0){#wunderlist-base [type=checkbox],#wunderlist-base [type=radio]{-webkit-appearance:none;-moz-appearance:none;background:#fff;-webkit-box-shadow:inset 0 0 0 1px #d6d6d6;box-shadow:inset 0 0 0 1px #d6d6d6;height:16px;width:16px;position:relative;vertical-align:bottom;-webkit-border-radius:3px;border-radius:3px;}#wunderlist-base [type=checkbox]:focus,#wunderlist-base [type=radio]:focus{-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8)}#wunderlist-base [type=checkbox]:checked:after,#wunderlist-base [type=radio]:checked:after{content:\'\';background:url("images/sprites/app.png");background-position:-342px -66px;width:15px;height:15px;font-size:20px;color:#737272;position:absolute;top:-2px;left:2px}#wunderlist-base [type=radio]{-webkit-border-radius:11px;border-radius:11px;}#wunderlist-base [type=radio]:checked:after{background-position:-341px -56px;width:4px;height:4px;top:6px;left:6px}}html[dir=rtl] #wunderlist-base [type=radio],html[dir=rtl] #wunderlist-base [type=checkbox]{margin-right:0;margin-left:5px}html #wunderlist-base [type=text],html #wunderlist-base [type=email],html #wunderlist-base [type=password],html #wunderlist-base .input-fake{font-family:"Lato","Geneva CY","Lucida Grande","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(ja_JP) #wunderlist-base [type=text],html:lang(ja_JP) #wunderlist-base [type=email],html:lang(ja_JP) #wunderlist-base [type=password],html:lang(ja_JP) #wunderlist-base .input-fake{font-family:"Lato","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Microsoft Yahei","微软雅黑","STXihei","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_CN) #wunderlist-base [type=text],html:lang(zh_CN) #wunderlist-base [type=email],html:lang(zh_CN) #wunderlist-base [type=password],html:lang(zh_CN) #wunderlist-base .input-fake{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_TW) #wunderlist-base [type=text],html:lang(zh_TW) #wunderlist-base [type=email],html:lang(zh_TW) #wunderlist-base [type=password],html:lang(zh_TW) #wunderlist-base .input-fake{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}'
}),
define("/styles/_sprite.js", {
    name: "_sprite",
    data: '.icon{background-image:url("images/sprites/app.png");cursor:pointer;vertical-align:middle;display:inline-block;}.icon.menu-down{background-position:-263px -111px;width:10px;height:10px}.icon.menu-up{background-position:-253px -111px;width:10px;height:10px}.icon.input-assign-delete{background-position:-213px -111px;width:16px;height:16px}.icon.input-assign-frame{background-position:-289px -34px;width:26px;height:26px;}.icon.input-assign-frame.selected{background-position:-315px -34px;width:26px;height:26px}.icon.big-star{background-position:0 0;width:93px;height:93px}.icon.invite{background-position:-241px -111px;width:12px;height:12px}.icon.remove{background-position:-241px -111px;width:12px;height:12px;-webkit-transform:rotate(45deg);-webkit-filter:grayscale(100%)}.icon.invited{background-position:-229px -111px;width:12px;height:12px}.icon.stripe{background-position:0 -227px;width:322px;height:4px}.icon.love-wunderlist{background-position:0 -193px;width:200px;height:34px}.icon.danke{background-position:-197px 0;width:160px;height:34px}.icon.dismiss{background-position:-237px -91px;width:20px;height:20px}.icon.facebook-small{background-position:-242px -66px;width:18px;height:20px}.icon.twitter-small{background-position:-303px -91px;width:18px;height:20px}.icon.alert{background-position:-277px -91px;width:26px;height:20px}.icon.popover-accepted{background-position:-260px -66px;width:20px;height:20px}.icon.assigned{background-position:-260px -66px;width:20px;height:20px}.icon.settings-general{background-position:-157px 0;width:40px;height:40px}.icon.settings-account{background-position:0 -153px;width:40px;height:40px}.icon.settings-shortcuts{background-position:-80px -153px;width:40px;height:40px}.icon.settings-sidebar{background-position:-157px -40px;width:40px;height:40px}.icon.settings-notifications{background-position:-60px -93px;width:40px;height:40px}.icon.settings-about{background-position:-40px -153px;width:40px;height:40px}.icon.settings-group{background-position:-100px -93px;width:40px;height:40px}.icon.wunderlist-icon{background-position:-93px 0;width:64px;height:64px}.icon.facebook-btn{background-position:-320px -66px;width:22px;height:20px}.icon.facebook-icon{background-position:-300px -66px;width:20px;height:20px}.icon.facebook{background-position:-341px -34px;width:14px;height:22px}.icon.twitter-btn{background-position:-280px -66px;width:20px;height:20px}.icon.google-btn{background-position:-222px -66px;width:20px;height:20px}.icon.weibo-btn{background-position:-197px -91px;width:20px;height:20px}.icon.sixw-btn{background-position:-257px -91px;width:20px;height:20px}.icon.support-btn{background-position:-217px -91px;width:20px;height:20px}.icon.pro{background-position:-157px -80px;width:40px;height:40px}.icon.pro-small{background-position:-197px -111px;width:16px;height:16px}.icon.pro-big{background-position:0 -93px;width:60px;height:60px}.icon.add-pro-teammate{background-position:-261px -34px;width:28px;height:28px}.icon.pro-teammate{background-position:-260px -66px;width:20px;height:20px}.icon.added-pro-teammate{background-position:-260px -66px;width:20px;height:20px}.icon.checkmark-blue{background-position:-260px -66px;width:20px;height:20px}.icon.action-flash-cards{background-position:-229px -34px;width:32px;height:32px;}.icon.action-flash-cards:not(.disabled):hover{background-position:-197px -34px;width:32px;height:32px}.small-preview .icon-file.image-thumb{background-position:-162px 0;width:54px;height:54px}.icon-file{background-image:url("images/sprites/files.png");}.icon-file.cancel-action,.icon-file.delete-action{background-position:-88px -181px;width:14px;height:14px;}.icon-file.cancel-action:hover,.icon-file.delete-action:hover{background-position:-32px -181px;width:14px;height:14px}.icon-file.cancel-action:active,.icon-file.delete-action:active{background-position:-46px -181px;width:14px;height:14px}.icon-file.alert{background-position:-130px -181px;width:17px;height:14px}.icon-file.document-thumb{background-position:0 -54px;width:54px;height:54px}.icon-file.image-thumb{background-position:-162px 0;width:54px;height:54px}.icon-file.package-thumb{background-position:-54px 0;width:54px;height:54px}.icon-file.movie-thumb{background-position:-54px -108px;width:54px;height:54px}.icon-file.pdf-thumb{background-position:0 0;width:54px;height:54px}.icon-file.audio-thumb{background-position:0 -108px;width:54px;height:54px}.icon-file.text-thumb{background-position:-54px -54px;width:54px;height:54px}.icon-file.table-thumb{background-position:-108px 0;width:54px;height:54px}.icon-file.presentaion-thumb{background-position:-108px -54px;width:54px;height:54px}.icon-file.files-dropbox-small{background-position:-201px -162px;width:15px;height:14px}.icon-file.record-audio{background-position:-129px -162px;width:18px;height:18px}.icon-file.play-audio{background-position:-75px -162px;width:18px;height:18px}.icon-file.clear-audio{background-position:0 -162px;width:19px;height:19px}.icon-file.upload-audio{background-position:-19px -162px;width:19px;height:19px}a:hover .record-audio{background-position:-147px -162px}a:hover .play-audio{background-position:0 -181px}a:hover .upload-audio{background-position:-38px -162px}a:hover .clear-audio{background-position:-181px -137px}a.recording .record-audio{background-position:-183px -162px;width:18px;height:18px}a.recording:hover .record-audio{background-position:-57px -162px}a.playing .play-audio{background-position:-93px -162px;width:18px;height:18px}a.playing:hover .play-audio{background-position:-165px -162px}a.disabled .upload-audio{background-position:-162px -137px;width:19px;height:19px}a.disabled .play-audio{background-position:-111px -162px;width:18px;height:18px}.audio-recorder-container a:active{background-image:url("images/sprites/files.png");background-position:-162px -54px}.audio-recorder-container a.disabled:active{background:none}.hasPreview .icon-file.delete-action{z-index:9999;background-position:-74px -181px;width:14px;height:14px;}.hasPreview .icon-file.delete-action:hover{background-position:-60px -181px;width:14px;height:14px}.hasPreview .icon-file.delete-action:active{background-position:-102px -181px;width:14px;height:14px}#fullscreen-note a.close span.close{background-image:url("images/sprites/app.png")}.webview .container a.icon.close-webview{background-position:-321px -91px;width:18px;height:18px;opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);}.webview .container a.icon.close-webview:hover{opacity:1;-ms-filter:none;filter:none}.webview .container a.icon.close-webview:active{background-position:-339px -91px;width:18px;height:18px}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){.icon{background-image:url("images/sprites/app-retina.png") !important;-webkit-background-size:357px;-moz-background-size:357px;background-size:357px}.icon-file{background-image:url("images/sprites/files-retina.png");-webkit-background-size:216px;-moz-background-size:216px;background-size:216px}#fullscreen-note a.close span.close{background-image:url("images/sprites/app-retina.png") !important;-webkit-background-size:357px;-moz-background-size:357px;background-size:357px}}'
}),
define("/styles/_buttons.js", {
    name: "_buttons",
    data: '#wunderlist-base .button,#wunderlist-base button{position:relative;cursor:pointer;color:#737272;font-weight:bold;font-size:13px;line-height:13px;padding:8px 12px;background:#fafafa;-webkit-box-shadow:inset 0 0 0 1px #d6d6d6;box-shadow:inset 0 0 0 1px #d6d6d6;border:none;margin-right:7px;-webkit-border-radius:3px;border-radius:3px;}#wunderlist-base .button.disabled,#wunderlist-base button.disabled{opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);}#wunderlist-base .button.disabled:hover,#wunderlist-base button.disabled:hover{cursor:default}#wunderlist-base .button.disabled:active,#wunderlist-base button.disabled:active{opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50)}#wunderlist-base .button:hover,#wunderlist-base button:hover,#wunderlist-base .button background-color:#e0e0e0,#wunderlist-base button background-color:#e0e0e0{text-decoration:none !important}#wunderlist-base .button:focus,#wunderlist-base button:focus{-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8)}#wunderlist-base .button:active,#wunderlist-base button:active{background-color:#f0f0f0;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0),inset 0 0 0 1px rgba(0,0,0,0.15);box-shadow:0 1px 1px rgba(0,0,0,0),inset 0 0 0 1px rgba(0,0,0,0.15)}#wunderlist-base .button.mini,#wunderlist-base button.mini{padding:3px 10px}#wunderlist-base .button.small,#wunderlist-base button.small{padding:3px 9px;font-weight:500}#wunderlist-base .button.rounded,#wunderlist-base button.rounded{padding:2px 12px;-webkit-border-radius:10px;border-radius:10px}#wunderlist-base .button.circle,#wunderlist-base button.circle{-webkit-border-radius:20px;border-radius:20px;padding:7px;margin:0}#wunderlist-base .button.wide,#wunderlist-base button.wide{padding-left:15px;padding-right:15px}#wunderlist-base .button.wider,#wunderlist-base button.wider{padding-left:20px;padding-right:20px}#wunderlist-base .button.big,#wunderlist-base button.big{display:block;float:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;text-align:center;font-size:16px;width:100%;padding:12px 20px}#wunderlist-base .button.bigger,#wunderlist-base button.bigger{padding:9px 14px;font-size:14px;}#wunderlist-base .button.bigger.login,#wunderlist-base button.bigger.login{margin-top:-3px;padding:11px}#wunderlist-base .button.full,#wunderlist-base button.full{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;float:none;text-align:center;width:100%;display:inline-block;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;margin:0}#wunderlist-base .button.bluetext,#wunderlist-base button.bluetext{font-size:11px;color:#2b88d9 !important}#wunderlist-base .button.greentext,#wunderlist-base button.greentext{color:#67ae2b;-webkit-box-shadow:none;box-shadow:none}#wunderlist-base .button.selected,#wunderlist-base button.selected,#wunderlist-base .button.blue,#wunderlist-base button.blue{-webkit-box-shadow:inset 0 0 0 1px #328ad6;box-shadow:inset 0 0 0 1px #328ad6;background-color:#328ad6;color:#fff;}#wunderlist-base .button.selected:hover,#wunderlist-base button.selected:hover,#wunderlist-base .button.blue:hover,#wunderlist-base button.blue:hover,#wunderlist-base .button.selected:focus,#wunderlist-base button.selected:focus,#wunderlist-base .button.blue:focus,#wunderlist-base button.blue:focus{background-color:#5ba1de}#wunderlist-base .button.selected:active,#wunderlist-base button.selected:active,#wunderlist-base .button.blue:active,#wunderlist-base button.blue:active,#wunderlist-base .button.selected.active,#wunderlist-base button.selected.active,#wunderlist-base .button.blue.active,#wunderlist-base button.blue.active{background-color:#328ad6}#wunderlist-base .button.green,#wunderlist-base button.green{-webkit-box-shadow:inset 0 0 0 1px #67ae2b;box-shadow:inset 0 0 0 1px #67ae2b;color:#fff;font-weight:bold;background-color:#67ae2b;}#wunderlist-base .button.green strong,#wunderlist-base button.green strong,#wunderlist-base .button.green b,#wunderlist-base button.green b{font-weight:bold;color:#fff}#wunderlist-base .button.green:hover,#wunderlist-base button.green:hover,#wunderlist-base .button.green:focus,#wunderlist-base button.green:focus{background-color:#84d143}#wunderlist-base .button.green:active,#wunderlist-base button.green:active{background-color:#67ae2b;}#wunderlist-base .button.green:active span.light,#wunderlist-base button.green:active span.light{display:inline;color:#c0daa7}#wunderlist-base .button.red,#wunderlist-base button.red{-webkit-box-shadow:inset 0 0 0 1px #d74e48;box-shadow:inset 0 0 0 1px #d74e48;background-color:#d74e48;color:#fff;}#wunderlist-base .button.red:hover,#wunderlist-base button.red:hover,#wunderlist-base .button.red:focus,#wunderlist-base button.red:focus,#wunderlist-base .button.red:active,#wunderlist-base button.red:active{background-color:#e07672}#wunderlist-base .button.outlined,#wunderlist-base button.outlined{background:none;color:#328ad6;-webkit-box-shadow:0 0 0 1px #328ad6;box-shadow:0 0 0 1px #328ad6}#wunderlist-base .button.external,#wunderlist-base button.external{float:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:inline-block;padding-left:40px;text-align:center;color:#fff;font-weight:bold;font-size:14px;width:100%;height:40px;}#wunderlist-base .button.external .icon,#wunderlist-base button.external .icon,#wunderlist-base .button.external .icon-login,#wunderlist-base button.external .icon-login{position:absolute;top:7px;left:50%;margin-left:-12px;}#wunderlist-base .button.external .icon.facebook-btn,#wunderlist-base button.external .icon.facebook-btn,#wunderlist-base .button.external .icon-login.facebook-btn,#wunderlist-base button.external .icon-login.facebook-btn{left:3px}#wunderlist-base .button.external .icon.big,#wunderlist-base button.external .icon.big,#wunderlist-base .button.external .icon-login.big,#wunderlist-base button.external .icon-login.big{top:7px;left:7px;margin:0}#wunderlist-base .button.facebook,#wunderlist-base button.facebook{color:#46649a}#wunderlist-base .button.google,#wunderlist-base button.google{color:#d94b42}#wunderlist-base .button.twitter,#wunderlist-base button.twitter{color:#00aeed}#wunderlist-base .button.withArrow,#wunderlist-base button.withArrow{float:none;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin-left:7px;display:inline-block;}#wunderlist-base .button.withArrow:after,#wunderlist-base button.withArrow:after,#wunderlist-base .button.withArrow:before,#wunderlist-base button.withArrow:before{position:absolute;border-width:4px;border-style:solid;border-color:transparent;left:-7px;width:0;height:0;z-index:100;content:"";top:10px}#wunderlist-base .button.withArrow:after,#wunderlist-base button.withArrow:after{border-right-color:#f6f6f6}#wunderlist-base .button.withArrow:before,#wunderlist-base button.withArrow:before{border-right-color:#333}#wunderlist-base .button.left,#wunderlist-base button.left{float:left;width:auto}#wunderlist-base .button.right,#wunderlist-base button.right{float:right;margin-right:0;margin-left:10px}#wunderlist-base .button.nofloat,#wunderlist-base button.nofloat{display:inline-block;float:none;vertical-align:top;margin:0}#wunderlist-base .button.choose,#wunderlist-base button.choose{width:136px}#wunderlist-base .button.accepted,#wunderlist-base button.accepted{height:16px;padding:2px 0 !important;font-weight:500;margin-left:-5px;color:#0d7fe7;}#wunderlist-base .button.accepted span.icon,#wunderlist-base button.accepted span.icon{display:inline-block;margin-top:-2px}#wunderlist-base .button span,#wunderlist-base button span,#wunderlist-base .state span{display:none;}#wunderlist-base .button span.icon,#wunderlist-base button span.icon,#wunderlist-base .state span.icon,#wunderlist-base .button span.wundercon,#wunderlist-base button span.wundercon,#wunderlist-base .state span.wundercon{display:block}#wunderlist-base .button span.wundercon,#wunderlist-base button span.wundercon,#wunderlist-base .state span.wundercon{margin:-4px 0}#wunderlist-base .button.loading,#wunderlist-base button.loading,#wunderlist-base .state.loading{color:transparent !important;}#wunderlist-base .button.loading text,#wunderlist-base button.loading text,#wunderlist-base .state.loading text,#wunderlist-base .button.loading b,#wunderlist-base button.loading b,#wunderlist-base .state.loading b{color:transparent !important}#wunderlist-base .button.loading text,#wunderlist-base button.loading text,#wunderlist-base .state.loading text{white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}#wunderlist-base .button.loading span,#wunderlist-base button.loading span,#wunderlist-base .state.loading span{-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-o-animation:rotate .8s linear infinite;-ms-animation:rotate .8s linear infinite;animation:rotate .8s linear infinite;display:block;position:absolute;left:50%;top:50%;margin-left:-10px;margin-top:-10px;width:19px;height:19px;background:url("images/loading.png");}#wunderlist-base .button.loading span.dark,#wunderlist-base button.loading span.dark,#wunderlist-base .state.loading span.dark{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);background:url("images/loading_black.png")}#wunderlist-base .buttonbar{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;}#wunderlist-base .buttonbar .button,#wunderlist-base .buttonbar button{margin:0;float:left;}#wunderlist-base .buttonbar .button:first-child,#wunderlist-base .buttonbar button:first-child{-webkit-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}#wunderlist-base .buttonbar .button:last-child,#wunderlist-base .buttonbar button:last-child{-webkit-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}#wunderlist-base .buttonbar .button.selected + *,#wunderlist-base .buttonbar button.selected + *{border-left:none}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){#wunderlist-base .facebook-button{background-image:url("images/login/wunderlist-login@2x.png");-webkit-background-size:964px 480px;-moz-background-size:964px 480px;background-size:964px 480px}#wunderlist-base button.loading span,#wunderlist-base .button.loading span{background-image:url("images/loading@2x.png");-webkit-background-size:19px;-moz-background-size:19px;background-size:19px;}#wunderlist-base button.loading span.dark,#wunderlist-base .button.loading span.dark{background:url("images/loading_black@2x.png")}}html[dir=rtl] #wunderlist-base .button,html[dir=rtl] #wunderlist-base button{margin-left:7px;margin-right:initial;}html[dir=rtl] #wunderlist-base .button.withArrow,html[dir=rtl] #wunderlist-base button.withArrow{margin-left:intial;margin-right:7px;}html[dir=rtl] #wunderlist-base .button.withArrow:after,html[dir=rtl] #wunderlist-base button.withArrow:after,html[dir=rtl] #wunderlist-base .button.withArrow:before,html[dir=rtl] #wunderlist-base button.withArrow:before{left:initial;right:-7px;border-right-color:transparent}html[dir=rtl] #wunderlist-base .button.withArrow:after,html[dir=rtl] #wunderlist-base button.withArrow:after{border-left-color:#f6f6f6}html[dir=rtl] #wunderlist-base .button.withArrow:before,html[dir=rtl] #wunderlist-base button.withArrow:before{border-left-color:#333}html .button,html button{font-family:"Lato","Geneva CY","Lucida Grande","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(ja_JP) .button,html:lang(ja_JP) button{font-family:"Lato","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Microsoft Yahei","微软雅黑","STXihei","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_CN) .button,html:lang(zh_CN) button{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_TW) .button,html:lang(zh_TW) button{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}'
}),
define("/styles/_tags.js", {
    name: "_tags",
    data: ".badge{display:inline-block;-webkit-border-radius:10px;border-radius:10px;padding:2px 7px;font-size:8px;line-height:8px;border:1px solid transparent;margin:0 0 0 4px;text-transform:uppercase;}.badge.blue{border-color:#328ad6;color:#1f7bcc}.badge.yellow{border-color:#f1b740;color:#d8a032}.badge.green{border-color:#6ea346;color:#2c7a00}.badge.red{border-color:#d74e48;color:#d74e48}.badge.white,.badge.filled{padding:5px 6px;-webkit-border-radius:4px;border-radius:4px;font-size:10px}.badge.white{border:1px solid #fff}.badge.filled{background:#328ad6;color:#fff}.tag{display:inline-block}"
}),
define("/styles/_dialogs.js", {
    name: "_dialogs",
    data: '.dialog-wrapper{position:absolute;width:100%;height:100%;z-index:1099;overflow:hidden;padding-top:80px;padding-bottom:80px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:rgba(0,0,0,0.4);}.dialog-wrapper.opaque{background:#000}.dialog{background:#fafafa;-webkit-box-shadow:0 1px 25px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.08);box-shadow:0 1px 25px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.08);-webkit-border-radius:3px;border-radius:3px;width:392px;margin:0 auto;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;max-height:100%;position:relative;}.dialog .content{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow:hidden}.dialog .content-inner{padding:0 14px;overflow:auto}.dialog .tabs{-webkit-flex-shrink:0;flex-shrink:0;overflow:auto}.dialog .tab{overflow:auto}.dialog a.close{position:absolute;right:6px;top:6px;fill:rgba(0,0,0,0.3);}.dialog a.close svg{height:24px;width:24px}.dialog .content-header{padding:23px 14px;background:#fff;-webkit-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0;border-bottom:1px solid #ebebeb;-webkit-flex-shrink:0;flex-shrink:0;}.dialog .content-header h2{font-size:20px}.dialog .tabs{background:#fff;border-right:1px solid #ebebeb;border-left:1px solid #ebebeb;-webkit-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0;position:relative;}.dialog .tabs li a{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;font-weight:bold;font-size:12px;text-shadow:0 1px 0 #fff;border-width:0 1px;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;padding:0 10px;}.dialog .tabs li a:hover{background-color:rgba(0,0,0,0.04)}.dialog .tabs li.active a{background-color:rgba(0,0,0,0.08)}.dialog .tabs li .icon{display:inline-block;-webkit-flex-shrink:0;flex-shrink:0;-webkit-transform:scale(.6);-moz-transform:scale(.6);-o-transform:scale(.6);-ms-transform:scale(.6);transform:scale(.6);margin:0 -10px}.dialog .tabs li .tab-label{padding:0 10px;white-space:nowrap;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.dialog .separator{zoom:1;margin:14px 0;position:relative;}.dialog .separator:before,.dialog .separator:after{content:"";display:table}.dialog .separator:after{clear:both}.dialog .separator:before{position:absolute;bottom:0;width:100%;content:\'\';height:1px;border-bottom:1px solid #e0e0df}.dialog .separator.big{padding-bottom:22px;margin-bottom:20px}.dialog .separator.bigger{padding-bottom:25px;margin-bottom:25px}.dialog .separator .separator-label{position:absolute;top:-34px;width:100%;text-align:center;color:#737272;text-shadow:0 1px 0 rgba(255,255,255,0.8);}.dialog .separator .separator-label span{background:#f7f7f7;padding:0 10px}.dialog .separator:last-child,.dialog .separator.noline{background:none;}.dialog .separator:last-child:before,.dialog .separator.noline:before{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}.dialog .separator .cols{margin-bottom:14px}.dialog .separator .cols .cols:last-child{margin-bottom:0}.dialog .separator .cols:only-child{margin-bottom:14px !important}.dialog .separator h3{font-size:13px;line-height:20px;font-weight:600;margin-bottom:5px;}.dialog .separator h3 small{font-weight:normal}.dialog .separator p{font-size:13px;line-height:18px;font-weight:400;}.dialog .separator p a{color:#328ad6;font-weight:bold}.dialog .separator p.small{font-size:11px}.dialog .separator p.small-touch{font-size:10px;display:inline-block}.dialog .separator p.strong{font-weight:bold}.dialog .social-links{text-align:center;font-size:0;}.dialog .social-links li{display:inline;margin-left:5px;}.dialog .social-links li .icon{margin-top:-1px}.dialog .notice{padding:24px;}.dialog .notice .wunderlist-icon,.dialog .notice .confirm-text{display:inline-block;vertical-align:top}.dialog .notice .confirm-text{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:275px;padding-left:20px}.dialog .notice .content-inner{padding:24px}.dialog .notice h3{word-wrap:break-word;line-height:22px;font-size:15px;line-height:18px;margin-bottom:5px}.dialog .notice p{font-size:11px;line-height:16px}.dialog .content-footer{padding:12px;border-top:1px solid #e0e0df;-webkit-flex-shrink:0;flex-shrink:0;}.dialog .content-footer .cols{margin-left:-6px !important;margin-right:-6px !important;}.dialog .content-footer .cols > div{padding:0 6px !important}.dialog .content-footer .button,.dialog .content-footer button{vertical-align:middle}.dialog .error-message{display:none;color:#c72d20;text-shadow:0 1px 0 #fff;font-size:12px !important}.firefox .choose input{left:auto !important}'
}),
define("/styles/wundercon.js", {
    name: "wundercon",
    data: ".wundercon{font-size:20px;font-family:\"Wundercon-Pictograms\";height:20px;width:20px;line-height:16px;display:inline-block;font-weight:normal;text-align:center;}.wundercon:before{content:'F'}.wundercon.plainDelete:before{content:'4'}.wundercon.save.small{font-size:13px}.wundercon.save:before{content:'H'}.wundercon.close-circle:before{content:'5'}.wundercon.close-circle:active:before{content:'6'}.wundercon.info:before{content:'u'}.wundercon.attachment{font-size:13px;}.wundercon.attachment:before{content:'Q'}.wundercon.fullscreen:before{content:'h'}.wundercon.clippy:before{content:'S'}.wundercon.medium{font-size:18px}.wundercon.small{font-size:16px}.wundercon.publish-success{height:64px;width:64px;position:relative;}.wundercon.publish-success:before{position:absolute;left:0;content:'√';font-size:70px;line-height:50px;margin-left:-3px;color:#b3b3b3}.wundercon.publish-success:after{content:'†';width:25px;height:25px;position:absolute;background:#3b9dde;-webkit-border-radius:100%;border-radius:100%;top:0;left:0;color:#fafafa;font-size:24px;line-height:19px;padding-left:1px}.wundercon.files:before{content:'o'}.wundercon.dated,.wundercon.today{position:relative;}.wundercon.dated:before,.wundercon.today:before{content:'E'}.wundercon.star:before{content:'C'}.wundercon.starred:before{content:'D'}.wundercon.plus-small:before{content:','}.wundercon.offline:before{content:'.'}.wundercon.speech:before{font-size:20px;font-family:\"Wundercon-Pictograms\";height:20px;width:20px;line-height:16px;display:inline-block;font-weight:normal;text-align:center;content:'O'}html[dir=rtl] .wundercon,html[dir=rtl] svg.rtl-flip{-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);-o-transform:rotateY(180deg);-ms-transform:rotateY(180deg);transform:rotateY(180deg);}html[dir=rtl] .wundercon.today,html[dir=rtl] svg.rtl-flip.today{-webkit-transform:none;-moz-transform:none;-o-transform:none;-ms-transform:none;transform:none}"
}),
define("applications/main/AppView", ["application/runtime", "views/Login/InterfaceView", "views/Main/MainInterfaceView", "application/AppView", "wunderbits/data/keycodes", "helpers/WindowTitleHelper", "helpers/URLResolver", "actions/Factory", "style!application/_layout", "style!application/_avatars", "style!_forms", "style!_sprite", "style!_buttons", "style!_tags", "style!_dialogs", "style!_animation", "style!wundercon"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b) {
    var h = e._
      , v = e.$
      , _ = e.global
      , w = _.Image
      , k = n.prototype
      , x = e.env.isPackagedApp()
      , y = ["app:", "chrome:", "chrome-extension:"];
    return n.extend({
        views: {
            Login: t,
            MainInterface: i
        },
        styles: [c, l, d, u, m, p, g, f, b],
        el: "body",
        events: {
            "keydown a, button": "translateKeydown",
            "click a[data-path]": "handlePathLinks",
            'click a.linkout,a[target="_blank"]': "handleExternalLinks"
        },
        initialize: function() {
            var t = this;
            t.sidebarActions = s.sidebar(),
            k.initialize.apply(t, arguments),
            t.bindTo(e.settings, "change:background", t.onChangeBackground),
            a.init(),
            t.bindTo(e, "preload:sprites", t.preloadSprites);
        },
        handlePathLinks: function(t) {
            var i = t.currentTarget
              , n = e.currentRoute()
              , o = i && i.dataset && i.dataset.path;
            o !== n && (t.preventDefault(),
            e.trigger("route:" + o));
        },
        handleExternalLinks: function(t) {
            var i = t.currentTarget
              , n = -1 !== y.indexOf(i.protocol)
              , o = i.classList.contains("hash");
            if (x && n && !o && (i.protocol = "https:",
            i.host = "www.wunderlist.com",
            n = !1),
            e.env.isNodeWebkit() && !n)
                t.preventDefault(),
                _.require("nw.gui").Shell.openExternal(i.href);
            else {
                var a = i.host === location.host
                  , r = i.pathname === location.pathname
                  , s = a && r && i.hash.length > 0;
                if (s) {
                    var l = i.hash.substr(2);
                    e.env.isFirefox() && (l = l.replace("#", "%23"));
                    var c = e.currentRoute();
                    l && l !== c && (t.preventDefault(),
                    e.trigger("route:" + l));
                }
            }
        },
        onChangeBackground: function() {
            var t = this
              , i = e.settings.attributes;
            i.background && t.setBackground(i.background);
        },
        setFocusToAddTask: function() {
            var e = this;
            "MainInterface" === e.activeViewName && e.activeView.setFocusToAddTask();
        },
        preloadSprites: function() {
            var t = e.env.getCurrentWidth()
              , i = ["numbers.png", "textures/divider.png", "textures/unread.png"];
            if (e.env.isRetina()) {
                var n = ["sprites/app-retina.png"];
                i = i.concat(n);
            } else {
                var o = ["sprites/app.png"];
                i = i.concat(o);
            }
            t = t > 1024 ? "2048" : t > 768 ? "1024" : t > 640 ? "768" : "640",
            i.push("backgrounds/" + t + "/06.jpg");
            var a = [];
            h.each(i, function(e, t) {
                a[t] = new w(),
                a[t].src = r.resolve("images/" + e);
            });
        },
        setBackground: function(t) {
            var i = this;
            if (e.user.attributes.access_token) {
                var n = i.$el[0].className.split(/\s/g);
                t = t.substr(-2),
                n = h.filter(n, function(e) {
                    return !/^background\-\w+$/.test(e);
                }),
                n.push("background-" + t),
                i.$el[0].className = n.join(" ");
            }
        },
        hideModals: function() {
            e.trigger("modal:close settings:close");
        },
        openSignup: function() {
            var e = this;
            e.switchToView("Login", null, null, function(e) {
                e.toggleLoginForm(null, "signup");
            });
        },
        openFacebookSignup: function(e) {
            var t = this
              , i = {
                forceOption: "A"
            };
            t.switchToView("Login", i, null, function(t) {
                t._checkFacebookStatus && t._checkFacebookStatus(e);
            });
        },
        openLogin: function() {
            var e = this;
            e.switchToView("Login");
        },
        openLists: function() {
            var e = this;
            e.switchToView("MainInterface", null, null, function(t) {
                e.goToPage("lists"),
                t.waitToShowList();
            });
        },
        openMainInterface: function() {
            var e = this;
            e.switchToView("MainInterface", null, null, function(e) {
                e.waitToShowList();
            });
        },
        openFilter: function(t, i) {
            var n = this;
            n.switchToView("MainInterface", null, null, function(o) {
                n.goToPage("tasks"),
                t !== e.lastFilter || e.state.attributes.inSearchState ? o.showFilter(t, i) : o.resetView(),
                e.lastFilter = t,
                e.lastListID = null;
            });
        },
        openList: function(t, i) {
            var n = this;
            n.switchToView("MainInterface", null, null, function(o) {
                n.goToPage("tasks"),
                n.sidebarActions.expandFolderForList(t.id),
                t.id !== e.lastListID || e.state.attributes.inSearchState ? o.showList(t, i) : o.resetView(t),
                e.state.attributes.inSearchState || (e.lastFilter = null,
                e.lastListID = t.id);
            });
        },
        editFolder: function(e, t) {
            var i = this;
            i.switchToView("MainInterface", null, null, function(i) {
                i.editFolder(e.id, t);
            });
        },
        fetchTaskCounts: function(t) {
            var i = parseInt(t, 10);
            e.trigger("sync:start", !1, "tasksCounts", i);
        },
        openTask: function(t, i) {
            var n = this;
            n.switchToView("MainInterface", null, null, function(o) {
                n.sidebarActions.expandFolderForList(t.attributes.list_id),
                n.goToPage("detail"),
                i.lastFilter = e.lastFilter ? e.lastFilter : e.lastListID,
                o.showTask(t, i);
            });
        },
        openTBV404: function(e) {
            var t = this;
            t.switchToView("MainInterface", null, null, function(i) {
                t.goToPage("lists"),
                i.showTBV404(e);
            });
        },
        showLoading: function() {
            var t = this;
            t.switchToView("MainInterface", null, null, function(i) {
                var n = v('<div id="loading" class="loading"><span/></div>').append(e.language.getLabel("label_loading").toString());
                t.el.appendChild(n[0]),
                t.renderLabels(),
                i.$el.addClass("hidden");
            });
        },
        hideLoading: function() {
            var e = this;
            e.switchToView("MainInterface", null, null, function(t) {
                e.$("#loading").remove(),
                t.$el.removeClass("hidden");
            });
        },
        goToPage: function(t) {
            var i = this;
            i.hideModals(),
            e.trigger("popover:close");
            var n = "#" + t
              , o = v(n);
            i.isInitialPageView = !i.hasOpenedInitialPage,
            i.hasOpenedInitialPage = !0,
            i.trigger("page", t, o);
        },
        translateKeydown: function(e) {
            e.which === o.enter && (v(e.target).click(),
            "button" === e.target.nodeName.toLowerCase() && e.preventDefault(),
            e.stopPropagation());
        }
    });
}),
define("wunderbits/WBApplication", ["wunderbits/BaseEventEmitter", "project!core"], function(e, t) {
    return e.extend({
        mixins: [t.mixins.WBDestroyableMixin]
    });
}),
!function(e) {
    if ("object" == typeof exports)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define("vendor/MagiConsole/MagiConsole", e);
    else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self),
        t.MagiConsole = e();
    }
}(function() {
    return function e(t, i, n) {
        function o(r, s) {
            if (!i[r]) {
                if (!t[r]) {
                    var l = "function" == typeof require && require;
                    if (!s && l)
                        return l(r, !0);
                    if (a)
                        return a(r, !0);
                    throw new Error("Cannot find module '" + r + "'");
                }
                var c = i[r] = {
                    exports: {}
                };
                t[r][0].call(c.exports, function(e) {
                    var i = t[r][1][e];
                    return o(i ? i : e);
                }, c, c.exports, e, t, i, n);
            }
            return i[r].exports;
        }
        for (var a = "function" == typeof require && require, r = 0; r < n.length; r++)
            o(n[r]);
        return o;
    }({
        1: [function(e, t) {
            function i() {}
            var n = t.exports = {};
            n.nextTick = function() {
                var e = "undefined" != typeof window && window.setImmediate
                  , t = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (e)
                    return function(e) {
                        return window.setImmediate(e);
                    }
                    ;
                if (t) {
                    var i = [];
                    return window.addEventListener("message", function(e) {
                        var t = e.source;
                        if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(),
                        i.length > 0)) {
                            var n = i.shift();
                            n();
                        }
                    }, !0),
                    function(e) {
                        i.push(e),
                        window.postMessage("process-tick", "*");
                    }
                    ;
                }
                return function(e) {
                    setTimeout(e, 0);
                }
                ;
            }(),
            n.title = "browser",
            n.browser = !0,
            n.env = {},
            n.argv = [],
            n.on = i,
            n.once = i,
            n.off = i,
            n.emit = i,
            n.binding = function() {
                throw new Error("process.binding is not supported");
            }
            ,
            n.cwd = function() {
                return "/";
            }
            ,
            n.chdir = function() {
                throw new Error("process.chdir is not supported");
            }
            ;
        }
        , {}],
        2: [function(e, t) {
            function i(e, t) {
                var n = this;
                e = e || {};
                var a = e.mixins || [];
                delete e.mixins;
                for (var r, s = o(n, e, t); a.length; )
                    r = a.shift(),
                    "function" == typeof r.applyToClass && r.applyToClass(s);
                return s.extend = n.extend || i,
                s;
            }
            function n(e) {
                var t = this;
                t.uid = t.uid || s(),
                t.options = e || t.options,
                t.augmentProperties(),
                t.initialize.apply(t, arguments),
                t.initMixins.apply(t, arguments);
            }
            var o = e("./lib/inherits")
              , a = e("./lib/extend")
              , r = e("./lib/clone")
              , s = e("./lib/createUID")
              , l = e("./lib/fromSuper")
              , c = {
                initialize: function() {
                    var e = this;
                    return e;
                },
                initMixins: function() {
                    for (var e, t = this, i = l.concat(t, "initializers"); i.length; )
                        e = i.shift(),
                        "function" == typeof e && e.apply(t, arguments);
                },
                augmentProperties: function() {
                    function e(e, i) {
                        var n = typeof i;
                        t[e] = "function" === n ? i.call(t) : "object" === n ? r(i, !0) : i;
                    }
                    var t = this
                      , i = l.merge(t, "properties");
                    for (var n in i)
                        e(n, i[n]);
                }
            };
            a(n.prototype, c),
            n.extend = i,
            t.exports = n;
        }
        , {
            "./lib/clone": 4,
            "./lib/createUID": 5,
            "./lib/extend": 6,
            "./lib/fromSuper": 7,
            "./lib/inherits": 9
        }],
        3: [function(e, t) {
            function i(e, t) {
                if (!e)
                    throw new Error(t || "");
            }
            function n(e) {
                i[e] = function(t, n) {
                    i(typeof t === e, n);
                }
                ;
            }
            var o = Array.isArray;
            i.empty = function(e, t) {
                var n = o(e) ? e : Object.keys(e);
                i(0 === n.length, t);
            }
            ,
            i.array = function(e, t) {
                i(o(e), t);
            }
            ,
            i["class"] = function(e, t) {
                var n = e.prototype;
                i(n && n.constructor === e, t);
            }
            ;
            for (var a = ["undefined", "boolean", "number", "string", "function", "object"]; a.length; )
                n(a.shift());
            t.exports = i;
        }
        , {}],
        4: [function(e, t) {
            function i(e, t) {
                if (e = e.slice(),
                t) {
                    for (var i, n = []; e.length; )
                        i = e.shift(),
                        i = i instanceof Object ? a(i, t) : i,
                        n.push(i);
                    e = n;
                }
                return e;
            }
            function n(e) {
                return new Date(e.getTime());
            }
            function o(e, t) {
                var i = {};
                for (var o in e)
                    if (e.hasOwnProperty(o)) {
                        var r = e[o];
                        i[o] = r instanceof Date ? n(r) : "object" == typeof r && null !== r && t ? a(r, t) : r;
                    }
                return i;
            }
            function a(e, t) {
                return r(e) ? i(e, t) : o(e, t);
            }
            var r = Array.isArray;
            t.exports = a;
        }
        , {}],
        5: [function(e, t) {
            function i(e) {
                var t = 16 * Math.random() | 0
                  , i = "n" === e ? t : 3 & t | 8;
                return i.toString(16);
            }
            function n(e) {
                var t = "nnnnnnnn-nnnn-6nnn-pnnn-nnnnnnnnnnnn".replace(/[np]/g, i);
                return String(e ? e : "") + t;
            }
            t.exports = n;
        }
        , {}],
        6: [function(e, t) {
            function i() {
                var e = n(arguments);
                a(e.length > 0, "extend expect one or more objects");
                for (var t = e.shift(); e.length; )
                    o(t, e.shift());
                return t;
            }
            var n = e("./toArray")
              , o = e("./merge")
              , a = e("./assert");
            t.exports = i;
        }
        , {
            "./assert": 3,
            "./merge": 10,
            "./toArray": 11
        }],
        7: [function(e, t) {
            function i(e, t) {
                var n = e.constructor
                  , r = n.prototype
                  , s = {};
                e.hasOwnProperty(t) ? s = e[t] : r.hasOwnProperty(t) && (s = r[t]);
                var l = n && n.__super__;
                return l && (s = o(i(l, t), s)),
                a({}, s);
            }
            function n(e, t) {
                var i = e.constructor
                  , o = i.prototype
                  , a = [];
                e.hasOwnProperty(t) ? a = e[t] : o.hasOwnProperty(t) && (a = o[t]);
                var r = i && i.__super__;
                return r && (a = [].concat(n(r, t), a)),
                [].concat(a);
            }
            var o = e("./merge")
              , a = e("./extend");
            t.exports = {
                merge: i,
                concat: n
            };
        }
        , {
            "./extend": 6,
            "./merge": 10
        }],
        8: [function(e, t) {
            function i(e) {
                var t = [];
                for (var i in e)
                    "function" == typeof e[i] && t.push(i);
                return t;
            }
            t.exports = i;
        }
        , {}],
        9: [function(e, t) {
            function i(e, t, i) {
                var o;
                return o = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                    return e.apply(this, arguments);
                }
                ,
                n(o, e),
                o.prototype = Object.create(e.prototype),
                n(o.prototype, t),
                o.prototype.constructor = o,
                n(o, i),
                o.__super__ = e.prototype,
                o;
            }
            var n = e("./extend");
            t.exports = i;
        }
        , {
            "./extend": 6
        }],
        10: [function(e, t) {
            function i(e, t) {
                for (var i = n(arguments, 1); i.length; ) {
                    t = i.shift();
                    for (var o in t)
                        t.hasOwnProperty(o) && (e[o] = t[o]);
                }
                return e;
            }
            var n = e("./toArray");
            t.exports = i;
        }
        , {
            "./toArray": 11
        }],
        11: [function(e, t) {
            function i(e, t) {
                return n.call(e, t || 0);
            }
            var n = Array.prototype.slice;
            t.exports = i;
        }
        , {}],
        12: [function(e, t) {
            (function(i, n) {
                var o = i.browser;
                if (o && n.MagiConsole)
                    t.exports = n.MagiConsole;
                else {
                    var a = n.console
                      , r = e("wunderbits.core/public/WBClass")
                      , s = e("wunderbits.core/public/lib/assert")
                      , l = e("wunderbits.core/public/lib/functions")
                      , c = e("wunderbits.core/public/lib/toArray")
                      , d = {
                        error: 3,
                        warn: 4,
                        log: 5,
                        info: 6,
                        debug: 7
                    }
                      , u = Object.keys(d)
                      , m = {
                        blue: "[34m",
                        cyan: "[36m",
                        green: "[32m",
                        grey: "[90m",
                        magenta: "[35m",
                        red: "[31m",
                        white: "[37m",
                        yellow: "[33m"
                    }
                      , p = "[39m"
                      , g = {
                        debug: "cyan",
                        error: "red",
                        info: "grey",
                        log: "white",
                        warn: "yellow"
                    };
                    u.forEach(function(e) {
                        "function" != typeof a[e] && (a[e] = a.log);
                    });
                    var f = {
                        constructor: function(e) {
                            var t = this;
                            s.string(e, "namespace must be a string");
                            var i = b.namespaces;
                            return i[e]instanceof b ? i[e] : (t.namespace = e,
                            i[e] = t,
                            void r.call(t));
                        },
                        shouldRunLevel: function(e) {
                            var t = d[b.level]
                              , i = d[e];
                            return void 0 === t || void 0 === i ? !0 : b.levelOnly ? i === t : t >= i;
                        },
                        shouldRun: function(e) {
                            var t = this
                              , i = b.pattern
                              , n = b.level
                              , o = i && i.test(t.namespace);
                            return o = o && (n ? t.shouldRunLevel(e) : !0),
                            !(!o || !a);
                        },
                        colorizeString: function(e, t) {
                            return m[t] + e + p;
                        },
                        colorizeNamespace: function(e, t) {
                            var i = g[t];
                            return i && (e = this.colorizeString(e, i)),
                            e;
                        },
                        injectNamespace: function(e, t) {
                            var i = this;
                            if (u.indexOf(e) >= 0) {
                                t = c(t);
                                var n = "[" + i.namespace.toUpperCase() + "]";
                                !o && (n = i.colorizeNamespace(n, e)),
                                "string" == typeof t[0] ? t[0] = n + " " + t[0] : t.unshift(n);
                            }
                            return t;
                        }
                    };
                    l(a).forEach(function(e) {
                        f[e] = function() {
                            var t = this
                              , i = arguments;
                            t.shouldRun(e) && (i = t.injectNamespace(e, i),
                            a[e].apply(a, i));
                        }
                        ;
                    });
                    var b = r.extend(f);
                    if (b.release = function() {
                        b.namespaces = {};
                    }
                    ,
                    b.reset = b.off = function() {
                        b.pattern = void 0,
                        b.level = void 0,
                        b.levelOnly = !1;
                    }
                    ,
                    b.setPattern = function(e) {
                        s.string(e, "regexPatternString must be a string"),
                        e = "*" === e ? ".?" : e,
                        b.pattern = new RegExp(e);
                    }
                    ,
                    b.setLevel = function(e, t) {
                        s.string(e, "logLevel must be a string"),
                        e = "*" === e ? void 0 : e,
                        b.level = e,
                        b.levelOnly = !!t;
                    }
                    ,
                    !o) {
                        var h = i.env
                          , v = h.MLOG
                          , _ = h.MLEVEL;
                        v && b.setPattern(v),
                        _ && b.setLevel(_, "true" === h.MLEVELONLY);
                    }
                    b.release(),
                    b.reset(),
                    t.exports = n.MagiConsole = b;
                }
            }
            ).call(this, e("/Users/test/Documents/6wunderkinder/MagiConsole/node_modules/gulp-cjs/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }
        , {
            "/Users/test/Documents/6wunderkinder/MagiConsole/node_modules/gulp-cjs/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 1,
            "wunderbits.core/public/WBClass": 2,
            "wunderbits.core/public/lib/assert": 3,
            "wunderbits.core/public/lib/functions": 8,
            "wunderbits.core/public/lib/toArray": 11
        }]
    }, {}, [12])(12);
}),
define("helpers/errorTracker", ["application/runtime", "project!core", "wunderbits/helpers/strings", "vendor/bugsnag"], function(e, t, i) {
    var n = new RegExp(["handleMouseoverEvent", "KW__injectedScriptMin", "sendURLToGuardwareProxy", "SkypeClick2Call", "symcBFPerformOnDOMChangedHandler", "symcBFGetSafeSearchValuesHandler"].join("|"),"g")
      , o = e._
      , a = e.global.Bugsnag.noConflict()
      , r = e.global.location;
    return t.WBSingleton.extend({
        init: function() {
            var t = this;
            e.error = t,
            a.apiKey = e.config.bugsnagKey,
            a.appVersion = e.config.release || "local",
            a.releaseStage = e.config.name || "development",
            a.metaData = {
                isChromeApp: e.env.isChromeApp(),
                isNodeWebkit: e.env.isNodeWebkit()
            };
            var i = e.global.gitHash;
            if (i) {
                var n = i.match(/\[(.+)\]/)
                  , o = n && n[1];
                o && (a.metaData.gitHash = o);
            }
            e.on("user:set", function() {
                e.user.on("change", t.saveUser),
                t.saveUser();
            }),
            e.on("focus:changed", function(e) {
                a.metaData.focus = e;
            }),
            a.beforeNotify = t.beforeNotify;
        },
        beforeNotify: function(t, o) {
            if (n.test(t.stacktrace))
                return !1;
            if (t.context = i.sanitizeHash(r.hash),
            "undefined" == typeof document && (o.worker = !0),
            o.syncCount = e.state.attributes.syncCount,
            o.heapSizeMB = e.getHeapSizeMB(),
            e.started) {
                var a = Math.round((Date.now() - e.started) / 1e3 / 60);
                o.minutesRunning = a;
            }
        },
        saveUser: function() {
            a.user = {
                id: e.user.id,
                pro: e.user.attributes.pro,
                language: e.user.attributes.language
            };
        },
        exception: function(e, t, i) {
            i = o.merge({}, a.metaData, i),
            a.notifyException(e, t, i);
        },
        notify: function(e, t, i) {
            i = o.merge({}, a.metaData, i),
            a.notify(e, t, i);
        }
    });
}),
define("application/Application", ["application/runtime", "helpers/TrackingService", "wunderbits/WBApplication", "backend/IOWunderapi", "vendor/MagiConsole/MagiConsole", "helpers/errorTracker"], function(e, t, i, n, o, a) {
    var r = e.config
      , s = e.$;
    a.init();
    var l = i.prototype;
    return i.extend({
        initialize: function(i, a) {
            var c = this;
            l.initialize.apply(c, arguments),
            c.options = a;
            var d = e.$("body");
            d.attr("role", "application"),
            r.logPattern && o.setPattern(r.logPattern),
            r.logLevel && o.setLevel(r.logLevel),
            (e.env.isPackagedApp() || !e.isFrame() && !e.isEmbedded()) && d.attr("id", "wunderlist-base"),
            e.env.isChromeOS && e.env.isArmProcessor() && d.addClass("chrome-os");
            var u = s('<div id="initial-loader" class="state loading"><span class="dark"></span></div>');
            d.append(u),
            e.once("interface:ready", function() {
                u.remove();
            }),
            e.application = i,
            e.io = new n(),
            t.init();
        }
    });
}),
define("applications/main/Application", ["application/runtime", "./Router", "backend/DatabaseManager", "backend/languageManager", "collections/CollectionManager", "models/RootModel", "models/UserModel", "models/UserSettingsModel", "models/LanguageModel", "backend/sync", "backend/timer", "helpers/GoogleAnalytics", "helpers/Positions", "helpers/PrintHelper", "helpers/socialPrompts", "helpers/onboarding/BaseOnboardingFlow", "helpers/onboarding/ExistingUserOnboardingFlow", "helpers/unload", "helpers/RateDialogManager", "helpers/UpdateHelper", "./AppView", "application/Application"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k) {
    var x = e.config
      , y = k.prototype;
    return k.extend({
        initialize: function() {
            var e = this;
            y.initialize.apply(e, arguments),
            e.updateHelper = new _(),
            u.init(),
            i.init().then(e.startApp, e);
        },
        startApp: function() {
            var i = this;
            e.trigger("timeline:start", "main_app_started"),
            e.trigger("timeline:start", "refresh_start"),
            e.trigger("timeline:start", "lists_loaded"),
            i.sync = new c(),
            i.runtime = e,
            e.trigger("set:user", new r(i.options.userData)),
            e.trigger("set:root", new a()),
            e.trigger("set:settings", new s()),
            e.trigger("set:language", new l()),
            d.init(),
            n.init(),
            i.collectionManager = new o(),
            p.init(),
            h.init(),
            i.appView = new w(),
            i.router = new t({
                outlet: i.appView
            }),
            i.bindTo(e, "timer:start", d.start, d),
            i.bindTo(e, "timer:stop", d.stop, d),
            i.bindOnceTo(e, "onboarding:newUser", function() {
                i.onboardingHelper = new f();
            }),
            i.bindOnceTo(e, "onboarding:existingUser", function() {
                i.onboardingHelper = new b();
            }),
            i.bindTo(e, "app:checkPackageForUpdate", i.updateHelper.checkPackageForUpdate.bind(i.updateHelper)),
            e.ready.done(i.onRuntimeReady, i);
        },
        onRuntimeReady: function() {
            var t = this;
            t.socialPrompts = new g(),
            e.env.isChrome() && (t.rateDialogManager = new v()),
            t.router.start();
            var i = "www";
            e.isInstalledOnChrome() && (i = "chrome"),
            e.trigger("analytics:Application:start", i),
            e.env.isPackagedApp() ? e.env.isNodeWebkit() && t.updateHelper.checkPackageForUpdate() : x.name && t.updateHelper.checkForUpdates();
        }
    });
});
