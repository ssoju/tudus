
define("views/Sidebar/Controllers/SidebarKeysController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            keydown: "handleKeys"
        },
        handleKeys: function(e) {
            var i = this;
            e.which === t.tab ? i.handleTab(e) : e.which === t.enter ? i.handleEnter(e) : e.which === t.esc && i.handleEsc(e);
        },
        handleEsc: function(t) {
            var i = this
              , o = n(t.target);
            o.parents(".lists-scroll").length && (o.hasClass("pendingInvite") || o.parents(".pendingInvite").length) && (e.trigger("sidebar:reselect"),
            i.stopItCold(t));
        },
        handleTab: function(e) {
            var t, i = this, o = n(e.target);
            o.parents(".lists-scroll").length && (t = o.hasClass("pendingInvite") || o.parents(".pendingInvite").length ? i.handleInviteTab(e) : i.handleNormalTab(e)),
            t && i.stopItCold(e);
        },
        handleInviteTab: function(t) {
            var i = n(t.target);
            return t.shiftKey && i.hasClass("reject") ? (i.closest(".pendingInvite").focus(),
            !0) : !t.shiftKey && i.hasClass("accept") ? (e.trigger("sidebar:reselect"),
            !0) : void 0;
        },
        handleNormalTab: function(e) {
            var t = this.view;
            return e.shiftKey ? (t.focusConversations(),
            !0) : (t.navigateLists("right"),
            !0);
        },
        handleEnter: function(e) {
            var t, i = this, o = n(e.target);
            if (o.hasClass("addlist") && (o.click(),
            t = !0),
            !t) {
                var a = o.find(".list-options");
                a.length && (a.click(),
                t = !0);
            }
            t && i.stopItCold(e);
        }
    });
}),
define("wunderbits/contextMenu/nodewebkit/gui", ["application/runtime"], function(e) {
    return "undefined" != typeof process ? e.global.nwDispatcher.requireNwGui() : {};
}),
define("wunderbits/contextMenu/Menu", ["project!core"], function(e) {
    var t = e.WBClass
      , i = t.prototype
      , n = t.extend({
        initialize: function() {
            var e = this;
            i.initialize.apply(e, arguments),
            e._menu = e._createMenuInstance.apply(e, arguments);
        },
        append: function(e) {
            throw console.debug(e),
            new Error("#append not implemented");
        },
        remove: function(e) {
            throw console.debug(e),
            new Error("#remove not implemented");
        },
        clear: function() {
            throw new Error("#clear not implemented");
        },
        popup: function(e, t) {
            throw console.debug(e, t),
            new Error("#popup not implemented");
        },
        _createMenuInstance: function() {
            throw new Error("#_createMenuInstance not implemented");
        },
        _getItems: function() {
            throw new Error("#_getItems not implemented");
        }
    });
    return Object.defineProperty(n.prototype, "items", {
        get: function() {
            return this._getItems();
        }
    }),
    n;
}),
define("wunderbits/contextMenu/nodewebkit/Menu", ["./gui", "../Menu"], function(e, t) {
    var i = e.Menu
      , n = t.extend({
        append: function(e) {
            this._menu.append(e._menuItem);
        },
        remove: function(e) {
            this._menu.remove(e._menuItem);
        },
        clear: function() {
            for (var e = this._menu; e.items.length; )
                e.remove(e.items[0]);
        },
        popup: function(e, t) {
            this._menu.popup(e, t);
        },
        _createMenuInstance: function(e) {
            return new i(e);
        },
        _getItems: function() {
            return this._menu.items;
        }
    });
    return n;
}),
define("wunderbits/contextMenu/MenuItem", ["project!core"], function(e) {
    var t = e.WBClass
      , i = t.prototype
      , n = t.extend({
        initialize: function() {
            var e = this;
            i.initialize.apply(e, arguments),
            e._menuItem = e._createMenuItemInstance.apply(e, arguments);
        },
        setKey: function(e) {
            throw console.debug(e),
            new Error("#setKey not implemented");
        },
        setLabel: function(e) {
            throw console.debug(e),
            new Error("#setLabel not implemented");
        },
        setSubmenu: function(e) {
            throw console.debug(e),
            new Error("#setSubmenu");
        },
        onClick: function(e) {
            throw console.debug(e),
            new Error("#onClick not implemented");
        },
        _createMenuItemInstance: function() {
            throw new Error("#_createMenuItemInstance not implemented");
        },
        _getMenuItem: function() {
            throw new Error("#_getItem not implemented");
        }
    });
    return n;
}),
define("wunderbits/contextMenu/nodewebkit/MenuItem", ["./gui", "../MenuItem"], function(e, t) {
    var i = e.MenuItem
      , n = t.extend({
        setKey: function(e) {
            this._menuItem.key = e;
        },
        setLabel: function(e) {
            this._menuItem.label = e;
        },
        setSubmenu: function(e) {
            this._menuItem.submenu = e._menu;
        },
        onClick: function(e) {
            this._menuItem.click = e;
        },
        _createMenuItemInstance: function(e) {
            return new i(e);
        },
        _getMenuItem: function() {
            return this._menuItem;
        }
    });
    return n;
}),
define("wunderbits/contextMenu/Clipboard", ["project!core"], function(e) {
    var t = e.WBClass
      , i = t.extend({
        set: function(e) {
            this._getClipboard().set(e);
        },
        _getClipboard: function() {
            throw new Error("#_getClipboard not implemented");
        }
    });
    return i;
}),
define("wunderbits/contextMenu/nodewebkit/Clipboard", ["./gui", "../Clipboard"], function(e, t) {
    var i = e.Clipboard
      , n = t.extend({
        _getClipboard: function() {
            i.get();
        }
    });
    return n;
}),
define("wunderbits/contextMenu/Tray", ["project!core"], function(e) {
    var t = e.WBClass
      , i = t.prototype
      , n = t.extend({
        initialize: function() {
            var e = this;
            i.initialize.apply(e, arguments),
            e._tray = e._createTrayInstance.apply(e, arguments);
        },
        setMenu: function() {
            throw new Error("setMenu not implemented");
        },
        onClick: function(e) {
            throw console.debug(e),
            new Error("#onClick not implemented");
        },
        remove: function() {
            throw new Error("#remove not implemented");
        },
        _createTrayInstance: function() {
            throw new Error("#_createMenuItemInstance not implemented");
        },
        _getTray: function() {
            throw new Error("#_getTray not implemented");
        }
    });
    return n;
}),
define("wunderbits/contextMenu/nodewebkit/Tray", ["./gui", "../Tray"], function(e, t) {
    var i = e.Tray
      , n = t.extend({
        setMenu: function(e) {
            this._getTray().menu = e._menu;
        },
        onClick: function(e) {
            this._getTray().on("click", e);
        },
        remove: function() {
            this._getTray().remove();
        },
        _createTrayInstance: function(e) {
            return new i(e);
        },
        _getTray: function() {
            return this._tray;
        }
    });
    return n;
}),
define("/styles/contextMenu.js", {
    name: "styles/contextMenu",
    data: ".context-menu{position:absolute;z-index:10000;background:#fff;list-style:none;padding:6px 0;-webkit-box-shadow:0 1px 5px rgba(0,0,0,0.3);box-shadow:0 1px 5px rgba(0,0,0,0.3);-webkit-border-radius:3px;border-radius:3px;min-width:200px}.context-menu-item{padding:4px;cursor:pointer;position:relative;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}.background-01 .context-menu-item:hover{background:rgba(115,62,39,0.1)}.background-02 .context-menu-item:hover{background:rgba(83,127,112,0.1)}.background-03 .context-menu-item:hover{background:rgba(83,97,127,0.1)}.background-04 .context-menu-item:hover{background:rgba(71,143,138,0.1)}.background-05 .context-menu-item:hover{background:rgba(168,109,67,0.1)}.background-06 .context-menu-item:hover{background:rgba(102,137,100,0.1)}.background-07 .context-menu-item:hover{background:rgba(102,152,68,0.1)}.background-08 .context-menu-item:hover{background:rgba(4,131,183,0.1)}.background-09 .context-menu-item:hover{background:rgba(42,108,136,0.1)}.background-10 .context-menu-item:hover{background:rgba(104,55,87,0.1)}.background-11 .context-menu-item:hover{background:rgba(51,78,131,0.1)}.background-12 .context-menu-item:hover{background:rgba(58,113,115,0.1)}.background-13 .context-menu-item:hover{background:rgba(94,140,156,0.1)}.background-14 .context-menu-item:hover{background:rgba(47,102,118,0.1)}.background-15 .context-menu-item:hover{background:rgba(113,175,140,0.1)}.background-16 .context-menu-item:hover{background:rgba(188,74,58,0.1)}.background-17 .context-menu-item:hover{background:rgba(89,89,89,0.1)}.background-18 .context-menu-item:hover{background:rgba(87,87,87,0.1)}.background-19 .context-menu-item:hover{background:rgba(184,109,130,0.1)}.background-20 .context-menu-item:hover{background:rgba(96,55,57,0.1)}.background-21 .context-menu-item:hover{background:rgba(166,85,65,0.1)}.background-22 .context-menu-item:hover{background:rgba(58,127,147,0.1)}.background-23 .context-menu-item:hover{background:rgba(87,64,51,0.1)}.background-24 .context-menu-item:hover{background:rgba(189,174,136,0.1)}.background-25 .context-menu-item:hover{background:rgba(14,145,197,0.1)}.background-26 .context-menu-item:hover{background:rgba(118,90,152,0.1)}.background-27 .context-menu-item:hover{background:rgba(193,91,61,0.1)}.background-28 .context-menu-item:hover{background:rgba(165,126,136,0.1)}.background-29 .context-menu-item:hover{background:rgba(191,117,85,0.1)}.background-30 .context-menu-item:hover{background:rgba(5,95,235,0.1)}.context-menu-item svg{fill:#737272;}.context-menu-item svg.move{stroke:#737272}.context-menu-item .context-menu-icon{margin:0 4px;height:20px;width:20px;}.context-menu-item .context-menu-icon .date{color:#737272;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:8px;padding-top:5px;font-weight:bold;text-align:center;position:absolute;top:6px;left:10px;right:10px;width:16px;height:16px}.context-menu-item .label{padding:0 4px;height:20px;line-height:20px;color:#262626;display:block;max-width:220px;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;-ms-box-flex:1;box-flex:1;-webkit-flex-grow:1;flex-grow:1}.context-menu-item .chevron{height:20px;width:20px;display:none;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.context-menu-item.separator{margin:8px 0;height:0;padding:0;border-bottom:1px solid;}.background-01 .context-menu-item.separator{border-color:rgba(115,62,39,0.2)}.background-02 .context-menu-item.separator{border-color:rgba(83,127,112,0.2)}.background-03 .context-menu-item.separator{border-color:rgba(83,97,127,0.2)}.background-04 .context-menu-item.separator{border-color:rgba(71,143,138,0.2)}.background-05 .context-menu-item.separator{border-color:rgba(168,109,67,0.2)}.background-06 .context-menu-item.separator{border-color:rgba(102,137,100,0.2)}.background-07 .context-menu-item.separator{border-color:rgba(102,152,68,0.2)}.background-08 .context-menu-item.separator{border-color:rgba(4,131,183,0.2)}.background-09 .context-menu-item.separator{border-color:rgba(42,108,136,0.2)}.background-10 .context-menu-item.separator{border-color:rgba(104,55,87,0.2)}.background-11 .context-menu-item.separator{border-color:rgba(51,78,131,0.2)}.background-12 .context-menu-item.separator{border-color:rgba(58,113,115,0.2)}.background-13 .context-menu-item.separator{border-color:rgba(94,140,156,0.2)}.background-14 .context-menu-item.separator{border-color:rgba(47,102,118,0.2)}.background-15 .context-menu-item.separator{border-color:rgba(113,175,140,0.2)}.background-16 .context-menu-item.separator{border-color:rgba(188,74,58,0.2)}.background-17 .context-menu-item.separator{border-color:rgba(89,89,89,0.2)}.background-18 .context-menu-item.separator{border-color:rgba(87,87,87,0.2)}.background-19 .context-menu-item.separator{border-color:rgba(184,109,130,0.2)}.background-20 .context-menu-item.separator{border-color:rgba(96,55,57,0.2)}.background-21 .context-menu-item.separator{border-color:rgba(166,85,65,0.2)}.background-22 .context-menu-item.separator{border-color:rgba(58,127,147,0.2)}.background-23 .context-menu-item.separator{border-color:rgba(87,64,51,0.2)}.background-24 .context-menu-item.separator{border-color:rgba(189,174,136,0.2)}.background-25 .context-menu-item.separator{border-color:rgba(14,145,197,0.2)}.background-26 .context-menu-item.separator{border-color:rgba(118,90,152,0.2)}.background-27 .context-menu-item.separator{border-color:rgba(193,91,61,0.2)}.background-28 .context-menu-item.separator{border-color:rgba(165,126,136,0.2)}.background-29 .context-menu-item.separator{border-color:rgba(191,117,85,0.2)}.background-30 .context-menu-item.separator{border-color:rgba(5,95,235,0.2)}.context-menu-item .context-menu{display:none;position:absolute;left:100%;top:0;}.context-menu-item .context-menu.listsSubmenu,.context-menu-item .context-menu.assignSubmenu{max-height:400px;overflow:auto}.context-menu-item .context-menu .context-menu-icon{display:none}.context-menu-item:hover .context-menu{display:block}.isRight .context-menu{left:-100%;right:100%}.isBottomSubmenu .context-menu{bottom:0;top:auto}.context-menu-item.hasSubmenu > .chevron{display:initial}html[dir=rtl] .context-menu-item .chevron{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}html[dir=rtl] .context-menu-item .context-menu{left:-100%;right:100%}html[dir=rtl] .isLeft .context-menu{left:100%;right:-100%}@media all and (max-width:550px){.context-menu-item .chevron{-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-o-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg)}.context-menu-item .context-menu{top:27px;left:27px}}"
}),
define("wunderbits/contextMenu/html/views/Menu", ["application/runtime", "wunderbits/WBViewPresenter", "style!contextMenu"], function(e, t, i) {
    var n = e.$
      , o = t.prototype;
    return t.extend({
        tagName: "ul",
        className: "context-menu hidden",
        events: {
            contextmenu: "onInteraction",
            mousedown: "onInteraction"
        },
        observes: {
            runtime: {
                "popover:close": "hide",
                "contextMenu:openned": "onContextMenuOpenned"
            }
        },
        initialize: function(e) {
            var t = this;
            o.initialize.apply(t, arguments),
            t.type = e.type,
            t.name = e.name,
            t.id = e.id,
            t.items = [],
            t.render(),
            t._bindOutsideClick(),
            t._bindToResize();
        },
        _bindOutsideClick: function() {
            var e = this
              , t = n(document);
            e.bindTo(t, "click", "hide"),
            e.bindTo(t, "mousedown", "hide");
        },
        _bindToResize: function() {
            this.bindTo(e, "window:resize", "hide");
        },
        styles: [i],
        render: function() {
            var e = this;
            return o.render.apply(e, arguments),
            e.rendered || (n("body")[0].appendChild(e.el),
            e.rendered = !0),
            e.$el.addClass(e.name),
            e;
        },
        append: function(e) {
            var t = this
              , i = e._menuItem
              , n = i._submenu;
            n && i.el.setAttribute("data-items", n.items.length),
            t.el.appendChild(i.el),
            t.items.push(e);
        },
        remove: function(e) {
            var t = this;
            e._menuItem.detach();
            var i = t.items.indexOf(e);
            t.items.splice(i, 1);
        },
        getLayout: function(e, t, i) {
            var n = document.body
              , o = 84
              , a = 28
              , r = 200
              , s = o + a * i
              , l = n.clientHeight
              , c = n.clientWidth
              , d = t + s
              , u = e + r
              , m = d - l
              , p = u - c
              , g = !1
              , f = !1
              , b = !1
              , h = !1;
            return t > l / 2 && (h = !0),
            m > 0 && (t -= m,
            g = !0),
            p > 0 && (e -= r,
            f = !0),
            r > e && (b = !0),
            {
                x: e,
                y: t,
                isBottom: g,
                isRight: f,
                isLeft: b,
                isBottomSubmenu: h
            };
        },
        popup: function(t, i) {
            var n = this
              , o = n.$el.find("> .menuItem").length;
            if (o) {
                var a = n.getLayout(t, i, o);
                n.$el.css({
                    left: a.x,
                    top: a.y
                }).toggleClass("isBottom", a.isBottom).toggleClass("isRight", a.isRight).toggleClass("isLeft", a.isLeft).toggleClass("isBottomSubmenu", a.isBottomSubmenu),
                e.trigger("contextMenu:openned", n.id),
                n.show();
            }
        },
        onContextMenuOpenned: function(e) {
            var t = this;
            void 0 !== e && e !== t.id && t.hide();
        },
        show: function() {
            var e = this;
            e.el.classList.remove("hidden"),
            e.showSubmenus();
        },
        showSubmenus: function() {
            var e = this;
            e.items.forEach(function(e) {
                var t = e._menuItem;
                t._submenu && t._submenu.show();
            });
        },
        hide: function() {
            this.el.classList.add("hidden");
        },
        onInteraction: function(e) {
            e.stopPropagation(),
            e.preventDefault();
        }
    });
}),
define("wunderbits/contextMenu/html/Menu", ["./views/Menu", "../Menu"], function(e, t) {
    var i = t.extend({
        append: function(e) {
            this._menu.append(e);
        },
        remove: function(e) {
            this._menu.remove(e);
        },
        clear: function() {
            for (var e = this, t = e._menu; t.items.length; )
                e.remove(t.items[0]);
        },
        popup: function(e, t) {
            this._menu.popup(e, t);
        },
        _createMenuInstance: function(t) {
            return new e(t);
        },
        _getItems: function() {
            return this._menu.items;
        }
    });
    return i;
}),
define("actions/factory", ["project!core", "application/runtime", "collections/ListCollection", "collections/FolderCollection", "actions/services/ListLookup", "actions/services/FeatureLookup", "actions/services/FileLookup", "actions/services/FolderLookup", "actions/services/MembershipLookup", "actions/services/TaskLookup", "actions/services/CommentLookup", "actions/services/SubTaskLookup", "actions/services/ReminderLookup", "actions/services/NoteLookup", "actions/services/UserLookup", "actions/services/Date", "actions/services/DesktopNotificationLookup", "actions/services/ActivityCenterLookup", "actions/services/ProductLookup", "actions/services/ServiceLookup", "actions/services/SmartcardsLookup", "actions/services/SubscriptionLookup", "actions/services/InvoiceLookup", "actions/Duplication", "actions/Print", "actions/OpenUrl", "actions/DeleteTask", "actions/MoveTask", "actions/StarTask", "actions/CompleteTask", "actions/CompleteSubTask", "actions/DeleteSubTask", "actions/ReparentTask", "actions/AutomaticReminder", "actions/TaskAssignee", "actions/TaskDue", "actions/TaskReminder", "actions/TaskTitle", "actions/AssignTask", "actions/RepositionTask", "actions/RepositionSubTask", "actions/CreateList", "actions/DeleteList", "actions/DeleteComment", "actions/DeleteFile", "actions/DeleteReminder", "actions/CreateComment", "actions/CreateFile", "actions/CreateTask", "actions/CreateSubtask", "actions/CreateReminder", "actions/CreateNote", "actions/CreateService", "actions/MuteList", "actions/Sidebar", "actions/UpdateComment", "actions/UpdateList", "actions/UpdateProducts", "actions/UpdateSubtaskTitle", "actions/DestructiveSorting", "actions/ChangePassword"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S, L, D, j, M, z, I, A, P, B, F, E, O, R, $, W, N, V, U, H, Y, q, K, G, Z, X, J, Q, ee, te, ie, ne, oe, ae, re) {
    function se(e) {
        var t;
        return function() {
            return void 0 === t && (t = e.call(this)),
            t;
        }
        ;
    }
    var le = e.WBSingleton.extend({
        dateService: se(function() {
            return new f();
        }),
        taskLookup: se(function() {
            return new c();
        }),
        commentLookup: se(function() {
            return new d();
        }),
        subTaskLookup: se(function() {
            return new u();
        }),
        listLookup: se(function() {
            return new o();
        }),
        featureLookup: se(function() {
            return new a();
        }),
        fileLookup: se(function() {
            return new r();
        }),
        folderLookup: se(function() {
            return new s();
        }),
        membershipLookup: se(function() {
            return new l();
        }),
        reminderLookup: se(function() {
            return new m();
        }),
        noteLookup: se(function() {
            return new p();
        }),
        userLookup: se(function() {
            return new g();
        }),
        desktopNotificationLookup: se(function() {
            return new b();
        }),
        activityCenterLookup: se(function() {
            return new h();
        }),
        productLookup: se(function() {
            return new v();
        }),
        serviceLookup: se(function() {
            return new _();
        }),
        smartcardsLookup: se(function() {
            return new w();
        }),
        subscriptionLookup: function() {
            return new k();
        },
        invoicesLookup: se(function() {
            return new x();
        }),
        _currentUserId: se(function() {
            var e = t.user;
            return e && e.id;
        }),
        automaticReminder: se(function() {
            var e = this;
            return new A(e.reminderLookup(),e.taskLookup(),e.dateService(),e.featureLookup());
        }),
        duplication: se(function() {
            var e = this;
            return new y(e.createList(),e.createTask(),e.createSubtask(),e.createReminder(),e.createNote(),e.repositionTask(),e.listLookup(),e.taskLookup(),e.reminderLookup(),e.subTaskLookup(),e.noteLookup(),e.sidebar());
        }),
        taskAssignee: se(function() {
            return new P(this.taskLookup());
        }),
        taskDue: se(function() {
            var e = this;
            return new B(e.taskLookup(),e.dateService(),e.automaticReminder());
        }),
        taskReminder: se(function() {
            var e = this;
            return new F(e.reminderLookup(),e.createReminder());
        }),
        taskTitle: se(function() {
            return new E(this.taskLookup());
        }),
        print: se(function() {
            return new C(t);
        }),
        openUrl: se(function() {
            return new T(t);
        }),
        deleteTask: se(function() {
            var e = this;
            return new S(e.taskLookup());
        }),
        moveTask: se(function() {
            var e = this;
            return new L(e.taskLookup());
        }),
        starTask: se(function() {
            var e = this;
            return new D(e.listLookup(),e.taskLookup());
        }),
        completeTask: se(function() {
            var e = this;
            return new j(e.listLookup(),e.taskLookup(),e.dateService(),e.subTaskLookup());
        }),
        completeSubTask: se(function() {
            var e = this;
            return new M(e.listLookup(),e.subTaskLookup(),e.dateService());
        }),
        updateSubtaskTitle: se(function() {
            return new oe(this.subTaskLookup());
        }),
        deleteSubTask: se(function() {
            var e = this;
            return new z(e.subTaskLookup());
        }),
        reparentTask: se(function() {
            var e = this;
            return new I(e.listLookup(),e.taskLookup());
        }),
        assignTask: se(function() {
            var e = this;
            return new O(e.listLookup(),e.taskLookup(),e._currentUserId());
        }),
        repositionTask: se(function() {
            var e = this;
            return new R(e.listLookup(),e.taskLookup());
        }),
        repositionSubTask: se(function() {
            var e = this;
            return new $(e.taskLookup(),e.subTaskLookup());
        }),
        createList: se(function() {
            var e = this;
            return new W(e.listLookup(),e.reparentTask());
        }),
        deleteList: se(function() {
            var e = this;
            return new N(e.listLookup());
        }),
        deleteComment: se(function() {
            var e = this;
            return new V(e.commentLookup(),t.settings);
        }),
        deleteFile: se(function() {
            return new U(this.fileLookup());
        }),
        deleteReminder: se(function() {
            return new H(this.reminderLookup());
        }),
        createComment: se(function() {
            var e = this;
            return new Y(e.commentLookup(),e.taskLookup());
        }),
        createFile: se(function() {
            return new q(this.fileLookup());
        }),
        createTask: se(function() {
            return new K(this.taskLookup());
        }),
        createSubtask: se(function() {
            return new G(this.subTaskLookup());
        }),
        createReminder: se(function() {
            return new Z(this.reminderLookup());
        }),
        createNote: se(function() {
            return new X(this.noteLookup());
        }),
        createService: se(function() {
            return new X(this.serviceLookup());
        }),
        muteList: se(function() {
            var e = this;
            return new Q(e.membershipLookup(),e._currentUserId());
        }),
        updateComment: se(function() {
            return new te(this.commentLookup());
        }),
        updateList: se(function() {
            return new ie(this.listLookup());
        }),
        updateProducts: se(function() {
            return new ne(new this.productLookup());
        }),
        sidebar: se(function() {
            var e = new i("/lists/sortable")
              , t = new n("/folders/all")
              , o = this.listLookup();
            return new ee(e,t,o);
        }),
        destructiveSorting: se(function() {
            var e = this
              , t = e.userLookup()
              , i = e.listLookup()
              , n = e.taskLookup();
            return new ae(t,i,n);
        }),
        changePassword: se(function() {
            return new re(t.user);
        })
    });
    return le;
}),
define("/templates/symbols/plus-small.js", {
    name: "symbols/plus-small",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="plus-small" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M10,10l0,6.5c-0.003,0.053 -0.008,0.103 -0.024,0.155c-0.038,0.116 -0.12,0.217 -0.226,0.278c-0.047,0.027 -0.094,0.042 -0.146,0.056c-0.052,0.008 -0.051,0.008 -0.104,0.011c-0.053,-0.003 -0.103,-0.008 -0.155,-0.024c-0.15,-0.05 -0.271,-0.171 -0.321,-0.321c-0.016,-0.052 -0.021,-0.102 -0.024,-0.155l0,-6.5l-6.5,0c-0.046,-0.002 -0.058,-0.001 -0.104,-0.011c-0.103,-0.022 -0.197,-0.076 -0.268,-0.154c-0.169,-0.188 -0.169,-0.482 0,-0.67c0.035,-0.038 0.077,-0.072 0.122,-0.098c0.078,-0.045 0.161,-0.062 0.25,-0.067l6.5,0l0,-6.5c0.005,-0.089 0.022,-0.172 0.067,-0.25c0.126,-0.219 0.406,-0.31 0.636,-0.207c0.048,0.022 0.093,0.05 0.132,0.085c0.078,0.071 0.132,0.165 0.154,0.268c0.01,0.046 0.009,0.058 0.011,0.104l0,6.5l6.5,0c0.046,0.002 0.058,0.001 0.104,0.011c0.103,0.022 0.197,0.076 0.268,0.154c0.169,0.188 0.169,0.482 0,0.67c-0.035,0.038 -0.077,0.072 -0.122,0.098c-0.078,0.045 -0.161,0.062 -0.25,0.067l-6.5,0Z"/> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/edit-list.js", {
    name: "symbols/edit-list",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"> <title>Edit List</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Edit-List" sketch:type="MSArtboardGroup" fill="#000000"> <path d="M12.02,17 C11.6,17 11.22,16.7 11.14,16.28 L10.92,15.14 L10.34,14.9 L9.38,15.54 C9.04,15.76 8.54,15.72 8.24,15.42 L7.58,14.76 C7.28,14.46 7.22,13.98 7.46,13.62 L8.1,12.66 L7.86,12.08 L6.72,11.86 C6.3,11.78 6,11.4 6,10.98 L6,10.02 C6,9.6 6.3,9.22 6.72,9.14 L7.86,8.92 L8.04,8.48 C8.08,8.4 8.06,8.28 8.02,8.2 L7.46,7.38 C7.22,7.02 7.28,6.54 7.58,6.24 L8.24,5.58 C8.54,5.28 9.04,5.24 9.38,5.46 L10.34,6.1 L10.92,5.86 L11.14,4.72 C11.22,4.3 11.6,4 12.02,4 L12.98,4 C13.4,4 13.78,4.3 13.86,4.72 L14.08,5.86 L14.66,6.1 L15.62,5.46 C15.98,5.24 16.46,5.28 16.76,5.58 L17.42,6.24 C17.72,6.54 17.78,7.02 17.54,7.38 L16.9,8.34 L17.14,8.92 L18.28,9.14 C18.7,9.22 19,9.6 19,10.02 L19,10.98 C19,11.4 18.7,11.78 18.28,11.86 L17.14,12.08 L16.9,12.66 L17.54,13.62 C17.78,13.98 17.72,14.46 17.42,14.76 L16.76,15.42 C16.58,15.6 16.36,15.68 16.12,15.68 C15.94,15.68 15.76,15.64 15.62,15.54 L14.66,14.9 L14.08,15.14 L13.86,16.28 C13.78,16.7 13.4,17 12.98,17 L12.02,17 Z M1.5,6 C1.22,6 1,5.78 1,5.5 C1,5.22 1.22,5 1.5,5 L6,5 C6.28,5 6.5,5.22 6.5,5.5 C6.5,5.78 6.28,6 6,6 L1.5,6 Z M12.12,16 L12.88,16 L13.12,14.88 C13.18,14.56 13.4,14.3 13.72,14.2 C13.9,14.14 14.08,14.06 14.26,13.98 C14.54,13.84 14.9,13.86 15.16,14.04 L16.1,14.66 L16.66,14.1 L16.04,13.16 C15.86,12.9 15.84,12.54 15.98,12.26 C16.06,12.08 16.14,11.9 16.2,11.72 C16.3,11.4 16.56,11.18 16.88,11.12 L18,10.9 L18,10.1 L16.88,9.88 C16.56,9.82 16.3,9.6 16.2,9.28 C16.14,9.1 16.06,8.92 15.98,8.74 C15.84,8.46 15.86,8.1 16.04,7.84 L16.66,6.9 L16.1,6.34 L15.16,6.96 C14.9,7.14 14.54,7.16 14.26,7.02 C14.08,6.94 13.9,6.86 13.72,6.8 C13.4,6.7 13.18,6.44 13.12,6.12 L12.88,5 L12.12,5 L11.88,6.12 C11.82,6.44 11.6,6.7 11.28,6.8 C11.1,6.86 10.92,6.94 10.74,7.02 C10.46,7.16 10.1,7.14 9.84,6.96 L8.9,6.34 L8.34,6.9 L8.84,7.64 C9.1,8.02 9.14,8.48 8.94,8.9 L8.8,9.28 C8.7,9.6 8.44,9.82 8.12,9.88 L7,10.1 L7,10.9 L8.12,11.12 C8.44,11.18 8.7,11.4 8.8,11.72 C8.86,11.9 8.94,12.08 9.02,12.26 C9.16,12.54 9.14,12.9 8.96,13.16 L8.34,14.1 L8.9,14.66 L9.84,14.04 C10.1,13.86 10.46,13.84 10.74,13.98 C10.92,14.06 11.1,14.14 11.28,14.2 C11.6,14.3 11.82,14.56 11.88,14.88 L12.12,16 Z M12.52,12.98 C11.14,12.98 10.02,11.86 10.02,10.48 C10.02,9.1 11.14,7.98 12.52,7.98 C13.9,7.98 15.02,9.1 15.02,10.48 C15.02,11.86 13.9,12.98 12.52,12.98 L12.52,12.98 Z M12.52,8.98 C11.7,8.98 11.02,9.66 11.02,10.48 C11.02,11.3 11.7,11.98 12.52,11.98 C13.34,11.98 14.02,11.3 14.02,10.48 C14.02,9.66 13.34,8.98 12.52,8.98 L12.52,8.98 Z M1.5,11 C1.22,11 1,10.78 1,10.5 C1,10.22 1.22,10 1.5,10 L4.5,10 C4.78,10 5,10.22 5,10.5 C5,10.78 4.78,11 4.5,11 L1.5,11 Z M1.5,16 C1.22,16 1,15.78 1,15.5 C1,15.22 1.22,15 1.5,15 L6,15 C6.28,15 6.5,15.22 6.5,15.5 C6.5,15.78 6.28,16 6,16 L1.5,16 Z" id="ø" sketch:type="MSShapeGroup"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/folders-no-fill.js", {
    name: "symbols/folders-no-fill",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="folders rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" > <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="folders"> <g id="Path-2-+-c-2" transform="translate(2.000000, 2.000000)"> <path d="M0.5,12 C0.22,12 -1.34760666e-14,11.78 -1.34760666e-14,11.5 L-1.42108547e-14,2.5 C-1.42108547e-14,1.68 0.68,1 1.5,1 L14.5,1 C15.32,1 16,1.68 16,2.5 L16,11.5 C16,11.78 15.78,12 15.5,12 L0.5,12 Z M1,11 L15,11 L15,2.5 C15,2.22 14.78,2 14.5,2 L1.5,2 C1.22,2 1,2.22 1,2.5 L1,11 Z M9.5,16 C8.68,16 8,15.32 8,14.5 L8,13.5 C8,13.22 8.22,13 8.5,13 C8.78,13 9,13.22 9,13.5 L9,14.5 C9,14.78 9.22,15 9.5,15 L14.5,15 C14.78,15 15,14.78 15,14.5 L15,13.5 C15,13.22 15.22,13 15.5,13 C15.78,13 16,13.22 16,13.5 L16,14.5 C16,15.32 15.32,16 14.5,16 L9.5,16 Z" id="c-2" transform="translate(8.000000, 8.500000) rotate(-180.000000) translate(-8.000000, -8.500000) "></path> </g> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/leave-list.js", {
    name: "symbols/leave-list",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="Leave-List" sketch:type="MSArtboardGroup"> <path d="M9,12 C11.28,12 13,8.84 13,6 C13,3.8 11.2,2 9,2 C6.8,2 5,3.8 5,6 C5,8.5 6.52,12 9,12 L9,12 Z M9,3 C10.66,3 12,4.34 12,6 C12,8.26 10.62,11 9,11 C7.34,11 6,8.26 6,6 C6,4.34 7.34,3 9,3 L9,3 Z M19,9.5 C19,9.42 18.98,9.34 18.94,9.26 C18.92,9.22 18.9,9.18 18.86,9.14 L16.86,7.14 C16.66,6.96 16.34,6.96 16.14,7.14 C15.96,7.34 15.96,7.66 16.14,7.86 L17.3,9 L14.5,9 C14.22,9 14,9.22 14,9.5 C14,9.78 14.22,10 14.5,10 L17.3,10 L16.14,11.14 C15.96,11.34 15.96,11.66 16.14,11.86 C16.24,11.96 16.38,12 16.5,12 C16.62,12 16.76,11.96 16.86,11.86 L18.86,9.86 C18.9,9.82 18.92,9.78 18.94,9.74 C18.98,9.66 19,9.58 19,9.5 L19,9.5 Z M15.76,14.88 C15.56,14 14.9,13.28 14.02,13.04 L11.72,12.36 C11.58,12.32 11.46,12.26 11.36,12.14 C11.16,11.96 10.84,11.96 10.66,12.16 C10.46,12.34 10.46,12.66 10.66,12.86 C10.88,13.08 11.14,13.24 11.44,13.32 L13.74,14 C14.26,14.14 14.66,14.58 14.78,15.1 L14.94,15.8 C14.4,16.16 12.7,17 9,17 C5.3,17 3.6,16.14 3.06,15.8 L3.22,15.04 C3.34,14.5 3.76,14.06 4.3,13.92 L6.54,13.32 C6.84,13.24 7.12,13.08 7.36,12.86 C7.54,12.66 7.54,12.34 7.36,12.14 C7.16,11.96 6.84,11.96 6.64,12.14 C6.54,12.24 6.42,12.32 6.28,12.36 L4.04,12.96 C3.14,13.2 2.46,13.92 2.24,14.82 L2.02,15.9 C1.98,16.06 2.02,16.24 2.14,16.36 C2.22,16.42 3.86,18 9,18 C14.14,18 15.78,16.42 15.86,16.36 C15.98,16.24 16.02,16.06 15.98,15.9 L15.76,14.88 Z" id="-" sketch:type="MSShapeGroup"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/move.js", {
    name: "symbols/move",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="move" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Page-1" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Move" sketch:type="MSArtboardGroup" stroke-linecap="round"> <path d="M3,14.5 L16,14.5" id="Line" sketch:type="MSShapeGroup"></path> <path d="M3,17.5 L16,17.5" id="Line" sketch:type="MSShapeGroup"></path> <path d="M9.5,2.5 L9.5,11.5" id="Line" sketch:type="MSShapeGroup"></path> <path d="M4.5,6.5 L9.5,11.5" id="Line" sketch:type="MSShapeGroup"></path> <path d="M14.5,6.5 L9.5,11.5" id="Line" sketch:type="MSShapeGroup"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/remove-from-folder.js", {
    name: "symbols/remove-from-folder",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g id="Layer1"> <g id="Layer 1"> <g id="Layer 11"> <path d="M2.5,5c0.276,0 0.5,-0.224 0.5,-0.5l0,-1c0,-0.275 0.225,-0.5 0.5,-0.5l6,0c0.275,0 0.5,0.225 0.5,0.5l0,1c0,0.276 0.224,0.5 0.5,0.5c0.276,0 0.5,-0.224 0.5,-0.5l0,-1c0,-0.827 -0.673,-1.5 -1.5,-1.5l-6,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,1c0,0.276 0.224,0.5 0.5,0.5" style="fill-rule:nonzero;"/> <path d="M17.5,6l-15,0c-0.276,0 -0.5,0.224 -0.5,0.5l0,9c0,0.276 0.224,0.5 0.5,0.5c0.276,0 0.5,-0.224 0.5,-0.5l0,-8.5l14,0l0,8.5c0,0.276 0.224,0.5 0.5,0.5c0.276,0 0.5,-0.224 0.5,-0.5l0,-9c0,-0.276 -0.224,-0.5 -0.5,-0.5" style="fill-rule:nonzero;"/> <path d="M13.147,14.147l-2.147,2.146l0,-4.293c0,-0.277 -0.223,-0.5 -0.5,-0.5c-0.277,0 -0.5,0.223 -0.5,0.5l0,4.293l-2.147,-2.146c-0.195,-0.195 -0.511,-0.195 -0.707,0c-0.194,0.195 -0.194,0.512 0,0.707l3,2.999c0.046,0.047 0.101,0.084 0.163,0.109c0.061,0.024 0.125,0.038 0.191,0.038c0.065,0 0.129,-0.014 0.19,-0.038c0.062,-0.026 0.117,-0.063 0.164,-0.11l2.999,-2.999c0.195,-0.194 0.195,-0.511 0,-0.707c-0.195,-0.194 -0.512,-0.194 -0.707,0.001" style="fill-rule:nonzero;"/> </g> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/star.js", {
    name: "symbols/star",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="star" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="star"> <path d="M4.74,18 C4.64,18 4.54,17.96 4.46,17.9 C4.28,17.76 4.2,17.54 4.28,17.34 L6.16,11.5 L1.2,7.9 C1.04,7.78 0.96,7.56 1.02,7.34 C1.1,7.14 1.28,7 1.5,7 L7.64,7 L9.52,1.16 C9.66,0.76 10.34,0.76 10.48,1.16 L12.38,7 L18.5,7 C18.72,7 18.9,7.14 18.98,7.34 C19.04,7.56 18.96,7.78 18.8,7.9 L13.84,11.5 L15.72,17.34 C15.8,17.54 15.72,17.76 15.54,17.9 C15.38,18.02 15.14,18.02 14.96,17.9 L10,14.3 L5.04,17.9 C4.96,17.96 4.84,18 4.74,18 L4.74,18 Z M10,13.18 C10.1,13.18 10.2,13.2 10.3,13.28 L14.3,16.18 L12.78,11.46 C12.7,11.26 12.78,11.04 12.96,10.92 L16.96,8 L12,8 C11.8,8 11.6,7.86 11.54,7.66 L10,2.94 L8.46,7.66 C8.4,7.86 8.22,8 8,8 L3.04,8 L7.04,10.92 C7.22,11.04 7.3,11.26 7.22,11.46 L5.7,16.18 L9.7,13.28 C9.8,13.2 9.9,13.18 10,13.18 L10,13.18 Z"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/ungroup-folder.js", {
    name: "symbols/ungroup-folder",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g id="Layer1"> <g id="Layer 1"> <path d="M17,15.5c0,0.827 -0.673,1.5 -1.5,1.5l-11,0c-0.827,0 -1.5,-0.673 -1.5,-1.5l0,-8.5l14,0l0,8.5ZM17.5,6l-15,0c-0.276,0 -0.5,0.224 -0.5,0.5l0,9c0,1.379 1.121,2.5 2.5,2.5l11,0c1.379,0 2.5,-1.121 2.5,-2.5l0,-9c0,-0.276 -0.224,-0.5 -0.5,-0.5" style="fill-rule:nonzero;"/> <path d="M2.5,5c0.276,0 0.5,-0.224 0.5,-0.5l0,-1c0,-0.275 0.225,-0.5 0.5,-0.5l6,0c0.275,0 0.5,0.225 0.5,0.5l0,1c0,0.276 0.224,0.5 0.5,0.5c0.276,0 0.5,-0.224 0.5,-0.5l0,-1c0,-0.827 -0.673,-1.5 -1.5,-1.5l-6,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,1c0,0.276 0.224,0.5 0.5,0.5" style="fill-rule:nonzero;"/> <path d="M7.147,14.854c0.097,0.098 0.225,0.146 0.353,0.146c0.127,-0.001 0.255,-0.049 0.353,-0.147l2.147,-2.146l2.146,2.146c0.098,0.098 0.226,0.146 0.354,0.146c0.128,0 0.255,-0.048 0.354,-0.146c0.195,-0.195 0.195,-0.512 0,-0.707l-2.146,-2.146l2.146,-2.146c0.195,-0.195 0.195,-0.512 0,-0.707c-0.195,-0.195 -0.512,-0.195 -0.707,0l-2.146,2.146l-2.147,-2.146c-0.195,-0.195 -0.512,-0.195 -0.707,0c-0.195,0.195 -0.195,0.512 0,0.707l2.146,2.146l-2.146,2.146c-0.195,0.195 -0.195,0.512 0,0.707" style="fill-rule:nonzero;"/> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("wunderbits/contextMenu/html/views/icons", ["partial!symbols/plus-small", "partial!symbols/edit-list", "partial!symbols/folders-no-fill", "partial!symbols/leave-list", "partial!symbols/move", "partial!symbols/remove-from-folder", "partial!symbols/star", "partial!symbols/ungroup-folder"], function() {
    return {
        contextual_paste_task: "paste",
        contextual_paste_task_plural_$: "paste",
        button_ungroup: "ungroup-folder",
        button_rename_folder: "options",
        button_email_list: "email",
        button_invite_people: "share",
        button_print_list: "print",
        button_remove_from_folder_singular: "remove-from-folder",
        button_rename_list: "options",
        folder_menu_create: "folders-no-fill",
        label_delete_list: "trash",
        label_leave_list: "leave-list",
        options_do_not_disturb: "do-not-disturb",
        label_move_to: "move",
        contextual_copy_list: "copy",
        actionbar_duplicate_list: "duplicate",
        contextual_paste_list: "paste",
        contextual_mark_as_notcompleted: "completed",
        contextual_mark_as_completed: "completed",
        contextual_mark_as_starred: "star",
        contextual_mark_as_unstarred: "star",
        "label_due_$/$label_relative_date_today": "today",
        "label_due_$/$label_relative_date_tomorrow": "today",
        button_remove_due_date: "today",
        contextual_assign_item_to_list: "share",
        contextual_assign_item_to_list_plural: "share",
        contextual_new_list_from: "plus-small",
        contextual_new_list_from_$_plural: "plus-small",
        contextual_move_item_to_list: "move",
        contextual_move_item_to_list_plural: "move",
        actionbar_email_selected_item: "email",
        actionbar_email_$_selected_items_plural: "email",
        actionbar_print_selected_item: "print",
        actionbar_print_$_selected_items_plural: "print",
        contextual_copy_task: "copy",
        contextual_copy_selected_task_plural_$: "copy",
        label_delete_task: "trash",
        menubar_delete_task_plural: "trash",
        label_open_file: "fullscreen",
        label_delete_file: "trash"
    };
}),
define("/templates/contextmenu/menuItem.js", {
    name: "contextmenu/menuItem",
    data: {
        "1": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.symbol || e && e.symbol || a,
            o.call(e, e && e.icon, {
                name: "symbol",
                hash: {},
                data: n
            }))) + " ";
        },
        "3": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="date"> ' + r((o = t.date || e && e.date,
            typeof o === a ? o.call(e, {
                name: "date",
                hash: {},
                data: n
            }) : o)) + " </span> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<span class="context-menu-icon"> ';
            return o = t["if"].call(e, e && e.icon, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t["if"].call(e, e && e.date, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' </span> <span class="label"> </span> <span class="chevron"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "folder-arrow", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </span>";
        },
        useData: !0
    }
}),
define("wunderbits/contextMenu/html/views/MenuItem", ["actions/factory", "wunderbits/WBViewPresenter", "wunderbits/mixins/UnicodeEmojiViewMixin", "./icons", "template!contextmenu/menuItem", "project!core"], function(e, t, i, n, o, a) {
    var r = a.WBStateModel
      , s = t.prototype
      , l = e.dateService()
      , c = t.extend({
        tagName: "li",
        className: "context-menu-item",
        template: o,
        events: {
            click: "onClick"
        },
        observes: {
            runtime: {
                "day:ended": "_updateKeyData"
            },
            model: {
                "change:label": "renderLabel",
                "change:key": ["render", "_updateKeyData"],
                "change:hasSubmenu": "render",
                "change:date": "render"
            }
        },
        renderData: {
            icon: void 0,
            date: void 0
        },
        formatData: function(e) {
            var t = this
              , i = t.model.attributes;
            return e.icon = n[i.key],
            e.date = i.date,
            e;
        },
        initialize: function(e) {
            var t = this;
            t.initializeModel(e),
            s.initialize.apply(t, arguments),
            t.render();
        },
        initializeModel: function(e) {
            this.model = new r({
                label: e.label,
                type: e.type || "menuItem",
                key: e.key,
                date: void 0,
                hasSubmenu: !1
            });
        },
        render: function() {
            var e = this
              , t = e.model.attributes;
            return s.render.call(e, e.formatData(e.renderData)),
            e.renderLabel(),
            e.$el.addClass(t.type),
            e.$el.toggleClass("hasSubmenu", t.hasSubmenu),
            e.renderEmoji(e.$el),
            e;
        },
        renderLabel: function() {
            var e = this
              , t = e.model.attributes;
            if ("separator" !== t.type) {
                var i = t.label || "LABEL MISSING"
                  , n = this.el.querySelector(".label");
                n.textContent = i,
                e.el.setAttribute("title", i);
            }
        },
        setKey: function(e) {
            this.model.set("key", e);
        },
        setLabel: function(e) {
            this.model.set({
                label: e
            });
        },
        setSubmenu: function(e) {
            var t = this;
            t._submenu && t._submenu.destroy(),
            t._submenu = e,
            e.$el.removeClass("hidden"),
            t.el.appendChild(e.el),
            t.model.set("hasSubmenu", !0);
        },
        setClickHandler: function(e) {
            this._clickHandler = e;
        },
        onClick: function() {
            var e = this
              , t = e._clickHandler;
            t && t.apply(t, arguments);
        },
        _updateKeyData: function() {
            var e, t = this, i = t.model.attributes.key;
            "label_due_$/$label_relative_date_today" === i ? e = l.today() : "label_due_$/$label_relative_date_tomorrow" === i && (e = l.tomorrow()),
            t.model.set("date", e && e.getDate());
        }
    });
    return i.applyToClass(c),
    c;
}),
define("wunderbits/contextMenu/html/MenuItem", ["./views/MenuItem", "../MenuItem"], function(e, t) {
    var i = t.extend({
        setKey: function(e) {
            this._menuItem.setKey(e);
        },
        setLabel: function(e) {
            this._menuItem.setLabel(e);
        },
        setSubmenu: function(e) {
            this._menuItem.setSubmenu(e._menu);
        },
        onClick: function(e) {
            this._menuItem.setClickHandler(e);
        },
        _createMenuItemInstance: function(t) {
            return new e(t);
        },
        _getMenuItem: function() {
            return this._menuItem;
        }
    });
    return i;
}),
define("wunderbits/contextMenu/factory", ["./nodewebkit/Menu", "./nodewebkit/MenuItem", "./nodewebkit/Clipboard", "./nodewebkit/Tray", "./html/Menu", "./html/MenuItem", "project!core"], function(e, t, i, n, o, a, r) {
    var s = r.WBClass.extend({
        nwClasses: {
            Menu: e,
            MenuItem: t,
            Clipboard: i,
            Tray: n
        },
        htmlClasses: {
            Menu: o,
            MenuItem: a
        },
        getClasses: function() {
            var e = this;
            return "undefined" != typeof process ? e.nwClasses : e.htmlClasses;
        }
    });
    return new s();
}),
define("wunderbits/ContextMenuController", ["application/runtime", "./contextMenu/factory", "wunderbits/WBViewController", "project!core", "actions/Factory"], function(e, t, i, n, o, a) {
    var r = t.getClasses()
      , s = r.Menu
      , l = r.MenuItem
      , c = n.WBDeferred
      , d = i.prototype;
    return i.extend({
        Clipboard: r.Clipboard,
        Tray: r.Tray,
        "implements": {},
        initializeActions: function() {
            this.actions = {
                complete: o.completeTask(),
                star: o.starTask(),
                createList: o.createList(),
                listLookup: o.listLookup(),
                fileLookup: o.fileLookup(),
                folderLookup: o.folderLookup(),
                deleteFile: o.deleteFile(),
                deleteList: o.deleteList(),
                deleteTask: o.deleteTask(),
                moveTask: o.moveTask(),
                assignTask: o.assignTask(),
                membershipLookup: o.membershipLookup(),
                print: o.print(),
                openUrl: o.openUrl(),
                due: o.taskDue(),
                sidebar: o.sidebar(),
                duplication: o.duplication()
            };
        },
        initialize: function() {
            var t = this;
            return t.ready = new c(),
            s && l ? (e.ready.done(function() {
                t.initializeActions(),
                t.ready.resolve();
            }),
            t["implements"]["contextmenu:" + t.type] = "onContextMenu",
            d.initialize.apply(t, arguments),
            t.createContextMenu(),
            t.updateLabels(),
            void t.bindTo(e, "language:change", "updateLabels")) : !1;
        },
        createContextMenu: function() {
            var e = this
              , t = e.items;
            e.menu = e.createMenu(e.uid),
            Object.keys(t).forEach(function(i) {
                var n = e.createMenuItem(i);
                t[i] !== a ? n.setSubmenu(e.createMenu()) : e.setItemClickHandler(n, i),
                t[i] = n;
            });
        },
        setItemClickHandler: function(e, t) {
            var i = this;
            e.onClick(function() {
                i.view.trigger("contextmenu:" + t),
                i.trackContextMenuItemClick(t);
            });
        },
        updateLabels: function() {
            var t = this
              , i = e.language
              , n = t.items;
            Object.keys(n).forEach(function(e) {
                var t = e.split("/")
                  , o = i.getText.apply(i, t);
                n[e].setLabel(o.replace(/&quot;/g, '"'));
            });
        },
        createMenu: function(e, t, i) {
            var n = {
                type: t || "contextmenu"
            };
            e && (n.id = e),
            i && (n.name = i);
            var o = new s(n);
            return o;
        },
        createMenuItem: function(e, t) {
            var i = new l({
                label: t
            });
            return i.setKey(e),
            i;
        },
        createSeparator: function() {
            return new l({
                type: "separator"
            });
        },
        createDisabledMenuItem: function(e) {
            var t = new l({
                label: e,
                enabled: !1
            });
            return t;
        },
        updateContextMenu: function() {
            var e = this
              , t = e.menu
              , i = e.items;
            e.clearContextMenu(),
            e.getContextMenuKeys().forEach(function(n) {
                "---" === n ? t.append(e.createSeparator()) : i[n] ? t.append(i[n]) : console.warn("invalid menuitem", n);
            });
        },
        clearContextMenu: function(e) {
            e = e || this.menu,
            e.clear();
        },
        htmlContextMenusEnabled: function() {
            return "true" === e.settings.attributes.enable_html_context_menus;
        },
        contextMenusEnabled: function() {
            return e.env.isPackagedApp() || this.htmlContextMenusEnabled();
        },
        validTarget: function(e) {
            var t = e.classList;
            return !t || !t.contains("linkout");
        },
        onContextMenu: function(e) {
            var t = this;
            t.contextMenusEnabled() && t.validTarget(e.target) && (t.target = e.currentTarget,
            t.updateContextMenu(),
            t.menu.popup(e.clientX, e.clientY),
            t.trackContextMenuOpen(),
            e.stopPropagation(),
            e.preventDefault());
        },
        getContextMenuKeys: function() {
            return ["not_implemented"];
        },
        trackContextMenuOpen: function() {
            var t = this;
            e.trigger("trackingService", "Client.ContextMenu.Open", t.type),
            e.trigger("analytics:contextMenu:open", t.type);
        },
        trackContextMenuItemClick: function(t) {
            var i = this
              , n = i.type + ":" + t;
            e.trigger("trackingService", "Client.ContextMenu.Click", n),
            e.trigger("analytics:contextMenu:click", n);
        }
    });
}),
define("views/Sidebar/Controllers/ListContextMenuController", ["application/runtime", "wunderbits/ContextMenuController"], function(e, t, i) {
    var n = t.prototype;
    return t.extend({
        type: "lists",
        "implements": {
            "contextmenu:button_email_list": "emailList",
            "contextmenu:button_invite_people": "editListMembers",
            "contextmenu:button_print_list": "printList",
            "contextmenu:button_remove_from_folder_singular": "removeListFromFolder",
            "contextmenu:button_rename_list": "renameList",
            "contextmenu:label_delete_list": "leaveOrDeleteList",
            "contextmenu:label_leave_list": "leaveOrDeleteList",
            "contextmenu:folder_menu_create": "createFolder",
            "contextmenu:move_list_to_folder": "moveToFolder",
            "contextmenu:contextual_copy_list": "copyList",
            "contextmenu:actionbar_duplicate_list": "duplicateList",
            "contextmenu:contextual_paste_list": "pasteLists"
        },
        items: {
            button_email_list: i,
            button_invite_people: i,
            button_print_list: i,
            button_remove_from_folder_singular: i,
            button_rename_list: i,
            folder_menu_create: i,
            label_delete_list: i,
            label_leave_list: i,
            options_do_not_disturb: i,
            label_move_to: {},
            contextual_copy_list: i,
            actionbar_duplicate_list: i,
            contextual_paste_list: i
        },
        initialize: function() {
            var t = this;
            if (n.initialize.apply(this, arguments) !== !1) {
                var i = 1e3;
                t.buildFolderMenuItems = t.debounce(t.buildFolderMenuItems, i),
                t.bindOnceTo(e, "folders:ready", "setupFolderBindings");
            }
        },
        setupFolderBindings: function() {
            var e = this;
            e.folders = e.actions.folderLookup.allFolders,
            e.folderItems = {},
            e.foldersSubmenu = e.createMenu(),
            e.items.label_move_to.setSubmenu(e.foldersSubmenu),
            e.buildFolderMenuItems(),
            e.bindTo(e.folders, "add change", "buildFolderMenuItems"),
            e.bindTo(e.folders, "remove", "removeFolderMenuItem");
        },
        buildFolderMenuItems: function() {
            var e = this
              , t = e.folders
              , i = e.folderItems;
            t.each(function(t) {
                var n = t.id
                  , o = t.attributes.title;
                if (!i[n]) {
                    var a = e.createMenuItem(n, o);
                    a.onClick(function() {
                        e.view.trigger("contextmenu:move_list_to_folder", n);
                    }),
                    e.foldersSubmenu.append(a),
                    i[n] = a;
                }
                i[n].setLabel(o);
            });
        },
        removeFolderMenuItem: function(e) {
            var t = this
              , i = t.folderItems
              , n = i && i[e.id]
              , o = n && t.foldersSubmenu.items.indexOf(n) > -1;
            n && (o && t.foldersSubmenu.remove(n),
            delete i[e.id]);
        },
        getContextMenuKeys: function() {
            var e = this
              , t = e.target
              , i = t.getAttribute("rel")
              , n = e.folders;
            if ("filter" === t.dataset.type || "inbox" === i)
                return ["button_email_list", "button_print_list"];
            var o = e.actions.listLookup.getListModel(i)
              , a = o && o.isShared()
              , r = o && o.isOwner()
              , s = !(!o || !e.actions.listLookup.getFolderModel(o.id))
              , l = [];
            return o && (l.push("folder_menu_create"),
            s && l.push("button_remove_from_folder_singular"),
            n && n.length && l.push("label_move_to"),
            l.push("---"),
            l.push("button_rename_list"),
            l.push("button_invite_people"),
            l.push("---"),
            l.push("button_email_list"),
            l.push("button_print_list"),
            l.push("---"),
            l.push("contextual_copy_list"),
            l.push("actionbar_duplicate_list"),
            e.actions.duplication.hasCopiedLists() && l.push("contextual_paste_list"),
            l.push(!a || r ? "label_delete_list" : "label_leave_list")),
            l;
        },
        renameList: function() {
            var t = this
              , i = t.target.getAttribute("rel");
            e.trigger("route:lists/" + i + "/edit");
        },
        editListMembers: function() {
            var t = this
              , i = t.target.getAttribute("rel");
            e.trigger("route:lists/" + i + "/edit/members");
        },
        emailList: function() {
            var t = this
              , i = t.target.getAttribute("rel");
            e.trigger("email:list", i);
        },
        printList: function() {
            var t = this
              , i = e.listId;
            e.listId = t.target.getAttribute("rel"),
            t.actions.print.printList(),
            setTimeout(function() {
                e.listId = i;
            }, 400);
        },
        leaveOrDeleteList: function() {
            var t = this
              , i = t.target.getAttribute("rel")
              , n = t.actions.listLookup.getListModel(i);
            n && e.trigger("sidebar:deleteAndSelectNext", n);
        },
        copyList: function() {
            var t = this
              , i = t.target.getAttribute("rel");
            t.actions.duplication.copyLists([i]),
            e.trigger("analytics:copy:lists", "contextMenu"),
            e.trigger("trackingService", "client.copy.lists", "contextMenu");
        },
        pasteLists: function() {
            var t = this
              , i = t.target.getAttribute("rel");
            t.actions.duplication.pasteLists([i]),
            e.trigger("analytics:paste:lists", "contextMenu"),
            e.trigger("trackingService", "client.paste.lists", "contextMenu");
        },
        duplicateList: function() {
            var t = this
              , i = t.target.getAttribute("rel");
            t.actions.duplication.duplicateList(i),
            e.trigger("analytics:duplicate:lists", "contextMenu"),
            e.trigger("trackingService", "client.duplicate.lists", "contextMenu");
        },
        createFolder: function() {
            var t = this
              , i = t.target.getAttribute("rel")
              , n = e.language.getText("folder_title_placeholder")
              , o = t.actions.sidebar.createFolder(n, i);
            e.trigger("route:folders/" + o + "/edit");
        },
        removeListFromFolder: function() {
            var e = this
              , t = e.target.getAttribute("rel");
            e.actions.sidebar.removeListFromFolder(t);
        },
        moveToFolder: function(e) {
            var t = this
              , i = t.target.getAttribute("rel")
              , n = t.actions.sidebar.getFolderActions(e);
            n.appendList(i);
        }
    });
}),
define("views/Sidebar/Controllers/FolderContextMenuController", ["application/runtime", "wunderbits/ContextMenuController"], function(e, t, i) {
    return t.extend({
        type: "folders",
        "implements": {
            "contextmenu:button_ungroup": "ungroup",
            "contextmenu:button_rename_folder": "edit"
        },
        items: {
            button_ungroup: i,
            button_rename_folder: i
        },
        getContextMenuKeys: function() {
            return ["button_rename_folder", "button_ungroup"];
        },
        ungroup: function() {
            var e = this
              , t = e.target.parentNode.getAttribute("rel")
              , i = e.actions.folderLookup.getFolderModel(t);
            i && i.destroy();
        },
        edit: function() {
            var t = this
              , i = t.target.parentNode.getAttribute("rel");
            i && e.trigger("route:folders/" + i + "/edit");
        }
    });
}),
define("views/Popovers/Controllers/UserPopoverViewController", ["application/runtime", "wunderbits/data/keycodes", "controllers/Tracking/TrackableEventsController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            "click:checkForUpdates": "checkForUpdates",
            "click:link": "clickLink",
            logout: "clickLogout",
            sync: "syncNow",
            keydown: "handleKeys"
        },
        handleKeys: function(e) {
            var i = this.view
              , o = e.target === i.el;
            o || e.which !== t.enter ? e.which === t.tab && (i.navigate(e.shiftKey ? "up" : "down"),
            e.preventDefault(),
            e.stopPropagation()) : (n(e.target).find("a").click(),
            e.stopPropagation());
        },
        clickLink: function(t) {
            var i = this
              , o = i.view
              , a = n(t.target);
            if ("A" !== t.target.tagName && (a = a.closest("a")),
            !a.hasClass("update-status")) {
                i.defer(o.close, o);
                var r = a.attr("data-analytics-action");
                r && (e.trigger("analytics:UserMenu:" + r),
                "clickBecomePro" === r && e.trigger("analytics:ProAccounts:startProFunnel", "userMenu"));
                var s = a.attr("data-track-path");
                s && i.trackTap(s);
            }
        },
        clickLogout: function() {
            this.view.renderLoggingOut(),
            e.trigger("popover:close"),
            e.trigger("user:logout"),
            e.trigger("analytics:UserMenu:clickLogout");
        },
        checkForUpdates: function(t) {
            var i = !0;
            e.state.set("updateState", "updating"),
            e.trigger("app:checkPackageForUpdate", i),
            this.view.$(".check-for-updates").addClass("checking"),
            t.stopPropagation(),
            t.preventDefault();
        },
        syncNow: function() {
            e.trigger("popover:close"),
            e.trigger("sync:start"),
            e.trigger("analytics:UserMenu:clickSync");
        }
    });
}),
define("/templates/userPopover.js", {
    name: "userPopover",
    data: {
        "1": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <li class="check-for-updates" role="menuitem" tabindex="0"> <a data-analytics-action="checkForUpdate" class="update-status"> ' + r((o = t.updateText || e && e.updateText,
            typeof o === a ? o.call(e, {
                name: "updateText",
                hash: {},
                data: n
            }) : o)) + ' </a> <div class="state loading spinner"><span></span></div> </li> ';
        },
        "3": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <li role="menuitem" tabindex="0"> <a data-path="preferences/account/pro" data-analytics-action="clickBecomePro"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "settings_label_become_a_pro", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ";
        },
        "5": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return ' <li class="manage-team" role="menuitem" tabindex="0"> <a href="' + r((o = t.domain || e && e.domain,
            typeof o === a ? o.call(e, {
                name: "domain",
                hash: {},
                data: n
            }) : o)) + '/business/admin" target="_blank" data-analytics-action="clickManageTeam"> ' + r((o = t.localized || e && e.localized || s,
            o.call(e, "group_billing_manage_team_header", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ";
        },
        "7": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return ' <li role="menuitem" tabindex="0"> <a href="' + r((o = t.extensionLink || e && e.extensionLink,
            typeof o === a ? o.call(e, {
                name: "extensionLink",
                hash: {},
                data: n
            }) : o)) + '" data-analytics-action="clickExtensionInstall" target="_blank"> ' + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_install_browser_extension", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ";
        },
        "9": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <li role="menuitem" tabindex="0"> <a data-path="rate" data-analytics-action="clickRateApp"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "rate_label", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ";
        },
        "11": function() {
            return ' <li class="separator" role="menuitem" tabindex="0"> <a data-path="labs" data-analytics-action="clickLabs">Labs</a> </li> ';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = '<div class="content"> <ul class="list-menu"> <li class="last-sync disabled" aria-visible="false"> <span class="icon offline"></span> <span class="label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "userbar_last_synced_$", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </li> <li class="separator" role="menuitem" tabindex="0"> <a class="sync-now"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_sync_full", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ";
            return o = t["if"].call(e, e && e.isNodeWebkit, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t.unless.call(e, e && e.isPro, {
                name: "unless",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' <li role="menuitem" tabindex="0"> <a data-path="preferences/account" data-analytics-action="clickAccountSettings"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "userbar_account_settings", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ",
            o = t["if"].call(e, e && e.isTeamAdmin, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' <li role="menuitem" tabindex="0"> <a data-path="backgrounds" data-analytics-action="clickChangeBackground"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "userbar_change_background", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li class="separator" role="menuitem" tabindex="0"> <a href="' + s((a = t.domain || e && e.domain,
            typeof a === l ? a.call(e, {
                name: "domain",
                hash: {},
                data: n
            }) : a)) + '/restore" data-analytics-action="clickGotoRestore" target="_blank"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_trash_link", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li role="menuitem" tabindex="0"> <a href="https://github.com/wunderlist/changelog/blob/master/webapp/changelog.md#whats-new-in-wunderlist" target="_blank"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_show_whats_new", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ",
            o = t["if"].call(e, e && e.extensionLink, {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.showRateItem, {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' <li role="menuitem" tabindex="0"> <a data-path="tell-your-friends" data-analytics-action="clickTellFriends"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_tell_friends", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li class="separator" role="menuitem" tabindex="0"> <a href="/home" data-analytics-action="clickWebsite" target="_blank"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "settings_website_wunderlist", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> ",
            o = t["if"].call(e, e && e.isLabsEnabled, {
                name: "if",
                hash: {},
                fn: this.program(11, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' <li class="email disabled" aria-visible="false">' + s((a = t.email || e && e.email,
            typeof a === l ? a.call(e, {
                name: "email",
                hash: {},
                data: n
            }) : a)) + '</li> <li role="menuitem" tabindex="0"><a class="logout">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_log_out", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a></li> </ul> </div> ";
        },
        useData: !0
    }
}),
define("/styles/popover/userPopover.js", {
    name: "popover/userPopover",
    data: "#user-popover{left:5px !important;}#user-popover .arrow{display:none}#user-popover > .inner{width:200px;border:1px solid #f9f9f9;}#user-popover > .inner p{text-align:center;margin:9px 0 2px 0;font-size:13px}#user-popover .check-for-updates{position:relative;}#user-popover .check-for-updates .spinner{top:18px;right:18px;position:absolute}#user-popover .check-for-updates.checking .spinner{display:block}#user-popover .check-for-updates .spinner{display:none}html[dir=rtl] #user-popover{right:5px !important;left:auto !important}"
}),
define("views/Popovers/UserPopoverView", ["application/runtime", "vendor/moment", "wunderbits/data/keycodes", "views/Popovers/Controllers/UserPopoverViewController", "views/Popovers/PopoverView", "project!core", "template!userPopover", "style!popover/userPopover"], function(e, t, i, n, o, a, r, s, l) {
    function c() {
        return d = d || e.language,
        d.getLabel.apply(d, arguments).toString();
    }
    var d, u = a.WBStateModel, m = e.$, p = e.config, g = o.prototype;
    return o.extend({
        template: r,
        styles: [s],
        className: "inner",
        attributes: {
            role: "menu",
            tabindex: "0"
        },
        config: {
            bindToTarget: !1,
            margin: 4,
            offset: 100,
            id: "user-popover"
        },
        "implements": [n],
        emits: {
            "click a": "click:link",
            "click .logout": "logout",
            "click .sync-now": "sync",
            keydown: "keydown",
            "keydown li": "keydown",
            "click .check-for-updates": "click:checkForUpdates"
        },
        updateStrings: {
            "default": l,
            updating: l,
            updated: l
        },
        setUpdateStrings: function() {
            return {
                "default": e.language.getText("check_for_updates"),
                updating: e.language.getText("checking_for_updates"),
                updated: e.language.getText("app_up_to_date")
            };
        },
        renderData: {
            email: l,
            isPro: l,
            isChrome: l,
            isIE: l,
            extensionLink: l,
            isPackagedApp: l,
            isNodeWebkit: l,
            isLabsEnabled: l,
            syncStatus: l,
            pendingCount: l,
            isTeamAdmin: l,
            domain: l,
            updateText: l
        },
        formatData: function() {
            var t = this
              , i = "";
            return e.env.isChromeApp() && (i = "https://" + (p.domain_name || "www.wunderlist.com")),
            t.state.set({
                email: e.user.attributes.email,
                isPro: e.user.isPro(),
                isChrome: e.env.isChrome(),
                isIE: e.env.isIE(),
                extensionLink: e.env.relevantExtensionLink(),
                isPackagedApp: e.env.isPackagedApp(),
                isNodeWebkit: e.env.isNodeWebkit(),
                isLabsEnabled: e.isLabsEnabled(),
                isTeamAdmin: e.user.isProTeamAdmin(),
                domain: i,
                showRateItem: e.env.isChrome() && e.user.showSocialButtons(),
                updateText: t.updateStrings[e.state.attributes.updateState || "default"]
            }),
            t.state.attributes;
        },
        initialize: function() {
            var t = this;
            g.initialize.apply(t, arguments),
            t.state = new u(t.renderData);
            var i = t.ready = t.deferred();
            t.bindTo(e.user, "change:email", "_onChangeUserEmail"),
            t.bindTo(e, "user:ready", i.resolve, i),
            t.bindTo(e, "userMenu:navigate", "navigate"),
            t.bindTo(e, "userMenu:select", "select"),
            t.bindTo(t.state, "change:syncStatus", "renderSyncStatus"),
            t.bindTo(t.state, "change:pendingCount", "renderSyncStatus"),
            t.bindTo(e, "sync", "updateSyncStatus"),
            t.bindTo(e.state, "change:online", "renderSyncStatus"),
            t.bindTo(e.state, "change:updateState", "setUpdateText"),
            "updated" === e.state.attributes.updateState && e.state.set("updateState", "default"),
            e.user.id && i.resolve();
        },
        render: function() {
            var t = this;
            return t.ready.done(function() {
                t.updateStrings = t.setUpdateStrings(),
                t.formatData(),
                g.render.call(t, t.state.attributes);
            }),
            t.bindTo(e, "user:loggingOut", function() {
                if (t.$el) {
                    var e = c("label_logging_out");
                    t.$(".logout").html(e),
                    t.renderLocalized();
                }
            }),
            t.updateSyncStatus(),
            t.$el.attr("aria-label", e.language.getText("aria_user_menu_hint")),
            t.renderLocalized(),
            t.setUpdateText(),
            t;
        },
        navigate: function(e) {
            var t, i = this, n = i.$(".list-menu li").not(".disabled"), o = n.filter(".active"), a = n.size(), r = n.index(o);
            if (o.size()) {
                if (("up" === e || "down" === e) && n.removeClass("active"),
                "up" === e ? t = r > 0 ? r - 1 : a - 1 : "down" === e && (t = a - 1 > r ? r + 1 : 0),
                t !== l) {
                    var s = m(n.get(t));
                    s.addClass("active").focus();
                }
            } else
                m(n.get(0)).addClass("active").focus();
        },
        select: function() {
            var t = this
              , i = t.$(".active a")
              , n = i.attr("href")
              , o = n && n.replace("#/", "");
            o ? e.trigger("route:" + o) : i.hasClass("logout") && i.click();
        },
        _onChangeUserEmail: function() {
            var t = this
              , i = e.user.attributes.email;
            t.$("a.email").text(i);
        },
        renderLoggingOut: function() {
            this.$(".logout").html(c("label_logging_out"));
        },
        setUpdateText: function() {
            var t = this
              , i = e.state.attributes.updateState || "default"
              , n = t.updateStrings[i];
            t.$(".update-status").html(n),
            t.$(".check-for-updates").toggleClass("checking", "updating" === i);
        },
        updateSyncStatus: function(t) {
            var i = this;
            i.state.set({
                syncStatus: t,
                pendingCount: e.pendingChanges()
            });
        },
        renderSyncStatus: function() {
            var i, n = this, o = n.state.attributes, a = o.syncStatus, r = o.pendingCount, s = e.isOnline();
            i = "logout" === a ? c("label_logging_out") : s ? e.isSyncing ? c("stillFetching" === a ? "label_still_fetching_tasks" : "userbar_sync_in_progress") : r ? 1 === r ? c("userbar_$_unsynced_item", r) : c("userbar_$_unsynced_item_plural", r) : c("userbar_last_synced_$", t(e.state.attributes.lastSync).fromNow()) : r ? 1 === r ? c("userbar_$_unsynced_item", r) : c("userbar_$_unsynced_item_plural", r) : c("userbar_no_internet_connection"),
            n.$(".last-sync").toggleClass("offline", !s).find(".label").html(i),
            n.renderLabels();
        },
        open: function() {
            var t = this;
            g.open.apply(t, arguments),
            t.returnFocus = e.focus,
            t.defer(function() {
                e.trigger("focus:set", "userMenu");
            }),
            t.$el.focus();
        },
        close: function() {
            var t = this;
            g.close.apply(t, arguments),
            t.defer(function() {
                "userMenu" === e.focus && e.trigger("focus:set", t.returnFocus);
            });
        }
    });
}),
define("views/Toolbar/Controllers/ToolbarController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "click:search": "clickSearch",
            "click:resetSearch": "clickSearchReset",
            "set:focus": "setFocus",
            "click:user": "clickUser"
        },
        openUserMenu: function() {
            "me" !== e.currentRoute() && e.trigger("route:me");
        },
        clickSearch: function() {
            var t = this;
            e.trigger("route:search"),
            t.defer(function() {
                e.trigger("search:focus");
            });
        },
        clickSearchReset: function(t) {
            var i = this
              , n = i.view;
            if (n.toggleSearchUI(!1),
            n.searchView.$("input").val(""),
            t) {
                e.trigger("search:return");
                var o = t.which ? "escapeCancel" : "clickCancel";
                e.trigger("analytics:Search:" + o);
            }
        },
        setFocus: function() {
            e.trigger("focus:sidebar");
        },
        clickUser: function() {
            var t = "me" === e.currentRoute() ? "close" : "open";
            e.trigger("analytics:Toolbar:clickUserAvatar", t);
        }
    });
}),
define("views/Toolbar/Controllers/ToolbarKeysController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            "keydown:button": "handleKeys"
        },
        handleKeys: function(e) {
            var i, o = this;
            e.which === t.enter || e.which === t.spacebar ? (n(e.target).click(),
            i = !0) : e.which === t.tab && (o.handleTab(e),
            i = !0),
            i && (e.stopPropagation(),
            e.preventDefault());
        },
        getCachedElement: function(e) {
            var t = this;
            t.cache || (t.cache = {});
            var i = t.cache;
            return i[e] || (i[e] = t.view.$(e)),
            i[e];
        },
        handleTab: function(e) {
            var t = this;
            e.shiftKey ? t.handShiftTab(e) : t.handlePlainTab(e);
        },
        handShiftTab: function(t) {
            var i = this
              , n = i.getCachedElement("a.activities-count")
              , o = i.getCachedElement("a.conversations-count")
              , a = i.getCachedElement("#user")
              , r = t.target === n[0]
              , s = t.target === o[0]
              , l = t.target === a[0];
            s ? n.focus() : r ? a.focus() : l && e.trigger("route:search");
        },
        handlePlainTab: function(t) {
            var i = this
              , n = i.getCachedElement("a.activities-count")
              , o = i.getCachedElement("a.conversations-count")
              , a = i.getCachedElement("#user")
              , r = t.target === n[0]
              , s = t.target === o[0]
              , l = t.target === a[0];
            s ? e.trigger("focus:set", "sidebar") : r ? o.focus() : l && n.focus();
        }
    });
}),
define("views/Streams/Controllers/StreamPopoverController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        "implements": {
            "fetch:data": "fetchData"
        },
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e.activityCenterLookup = t.activityCenterLookup();
        },
        fetchData: function(t) {
            var i = this;
            i.renderOldData(t),
            e.sdk.initialized.done(function() {
                e.sdk.getOutlet()[t].all(i.getParams()).done(function(e) {
                    !i.destroyed && e && i.updateOrAddStreamData(t, e);
                }).fail(function() {
                    !i.destroyed && i.view.trigger("show:error");
                });
            });
        },
        getParams: function() {
            var e = new Date()
              , t = e.getTimezoneOffset() / 60;
            return {
                style: "desktop",
                tz_offset: -t
            };
        },
        renderOldData: function(e) {
            var t = this
              , i = t.activityCenterLookup.getStreamModel(e);
            i && i.attributes.html && t.view.trigger("set:html", i.attributes.html);
        },
        updateOrAddStreamData: function(e, t) {
            var i = this
              , n = {
                fromSync: !0
            }
              , o = i.activityCenterLookup.getStreamCollection(e)
              , a = i.activityCenterLookup.getStreamModel(e)
              , r = !1;
            a ? (t.html !== a.attributes.html && (r = !0),
            a.save(t, n)) : (o.add(t, n),
            r = !0),
            r && i.view.trigger("set:html", t.html);
        }
    });
}),
define("/templates/symbols/bell.js", {
    name: "symbols/bell",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="bell" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="bell"> <path d="M15.2,10.14 C14.74,9.6 14.46,8.92 14.4,8.2 L14.28,6.94 C14.14,5.08 12.76,3.54 11,3.12 L11,3 C11,2.44 10.56,2 10,2 C9.44,2 9,2.44 9,3 L9,3.12 C7.24,3.54 5.86,5.08 5.72,6.94 L5.6,8.2 C5.54,8.92 5.28,9.6 4.8,10.16 L4.04,11.06 C3.38,11.88 3,12.9 3,13.94 L3,14.5 C3,14.78 3.22,15 3.5,15 L16.5,15 C16.78,15 17,14.78 17,14.5 L17,13.94 C17,12.9 16.62,11.88 15.96,11.06 L15.2,10.14 Z M16,14 L4,14 L4,13.94 C4,13.14 4.28,12.34 4.82,11.7 L5.58,10.8 C6.18,10.08 6.52,9.2 6.6,8.28 L6.7,7.02 C6.84,5.34 8.3,4 10,4 C11.7,4 13.16,5.34 13.3,7.02 L13.4,8.28 C13.48,9.2 13.84,10.08 14.42,10.8 L15.18,11.7 C15.72,12.34 16,13.14 16,13.94 L16,14 Z M12.3,16.1 C12.08,15.94 11.76,15.98 11.58,16.2 C10.82,17.22 9.18,17.22 8.4,16.2 C8.24,15.98 7.92,15.94 7.7,16.1 C7.48,16.26 7.44,16.58 7.62,16.8 C8.18,17.56 9.06,18 10,18 C10.94,18 11.82,17.56 12.38,16.8 C12.56,16.58 12.52,16.26 12.3,16.1 L12.3,16.1 Z" id="m"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/streams/emptyStream.js", {
    name: "streams/emptyStream",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = '<div class="stream-header"> <h3>';
            return a = t.header || e && e.header,
            o = typeof a === r ? a.call(e, {
                name: "header",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (s += o),
            s + '</h1> </div> <div class="stream-body"> <div class="state loading"> <span class="dark"></span> </div> </div>';
        },
        useData: !0
    }
}),
define("/templates/streams/errorTemplate.js", {
    name: "streams/errorTemplate",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return '<div class="coachmark center"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "bell", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " <h2>Currently Offline</h2> <p>We weren't able to show your " + r((o = t.name || e && e.name,
            typeof o === s ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + " at this time. Please try again later.</p> </div> ";
        },
        useData: !0
    }
}),
define("/styles/streams/popover.js", {
    name: "streams/popover",
    data: "@font-face {\n  font-family: EventIcons;\n  font-weight: 300;\n  font-style: normal;\n  src: url('https://d1l1r288vf46ed.cloudfront.net/v0.3.15/wundercon-light-webfont.woff2')format('woff2'),\n       url('https://d1l1r288vf46ed.cloudfront.net/v0.3.15/wundercon-light-webfont.woff')format('woff'),\n       url('https://d1l1r288vf46ed.cloudfront.net/v0.3.15/wundercon-light-webfont.ttf')format('truetype');\n}\n#wunderlist-base .stream-popover{min-height:100px;overflow:hidden;width:300px;position:relative;}#wunderlist-base .stream-popover .message:focus{-webkit-box-shadow:0 0 0 1px #328ad6;box-shadow:0 0 0 1px #328ad6;-webkit-border-radius:3px;border-radius:3px}#wunderlist-base .stream-popover .stream-header{text-align:center;border-bottom:1px solid rgba(0,0,0,0.06);}#wunderlist-base .stream-popover .stream-header h3{margin:10px 0 9px 0}#wunderlist-base .stream-popover .stream-body{max-height:370px;overflow-y:auto;position:relative;}#wunderlist-base .stream-popover .stream-body .loading{min-height:200px}#wunderlist-base .stream-popover .stream-body .activity-center.empty{padding:15px 0;position:relative}"
}),
define("views/Streams/StreamPopoverView", ["application/runtime", "actions/Factory", "views/Popovers/PopoverView", "./Controllers/StreamPopoverController", "project!core", "wunderbits/helpers/strings", "wunderbits/helpers/SafeParse", "wunderbits/mixins/UnicodeEmojiViewMixin", "helpers/BlobHelper", "partial!symbols/bell", "template!streams/emptyStream", "template!streams/errorTemplate", "style!streams/popover"], function(e, t, i, n, o, a, r, s, l, c, d, u, m) {
    var p = o.lib.assert
      , g = o.WBDeferred
      , f = i.prototype
      , b = i.extend({
        styles: [m],
        template: d,
        templates: {
            error: u
        },
        className: "stream-popover",
        "implements": [n],
        emits: {
            "click a": "check:click"
        },
        observes: {
            events: {
                "set:html": "setHTML",
                "show:error": "showError"
            }
        },
        attributes: {
            tabindex: 0,
            role: "document"
        },
        renderData: {
            header: ""
        },
        formatData: function(t) {
            var i = this
              , n = t || {}
              , o = {
                conversations: "smart_list_conversations",
                activities: "label_activity_center"
            };
            return f.formatData(n),
            n.header = e.language.getLabel(o[i.name]).toString(),
            n;
        },
        initialize: function() {
            var i = this;
            f.initialize.apply(i, arguments),
            i.activityCenterLookup = t.activityCenterLookup();
            var n = new g();
            i.hasRendered = n.promise(),
            i.bindOnceTo(i, "rendered", n.resolve, n),
            ["conversations", "activities", "unreadActivitiesCounts"].forEach(function(t) {
                var n = i.deferred();
                i[t + "Ready"] = n.promise(),
                i.bindOnceTo(e, t + ":ready", n.resolve.bind(n));
            });
        },
        setHTML: function(e) {
            var t = this
              , i = r.html(e);
            t.convertLinks(i);
            var n = i.querySelectorAll("style")
              , o = i.querySelector("ul")
              , a = i.querySelector("div.empty")
              , s = i.querySelectorAll("img")
              , l = []
              , c = [];
            l.forEach.call(n, function(e) {
                var i = e.sheet && e.sheet.cssRules;
                i && l.forEach.call(i, function(e) {
                    c.push("." + t.el.className + " " + e.cssText);
                });
            }),
            l.forEach.call(s, t.setImage),
            t.styles = [m, {
                name: "stream",
                data: c.join("\n")
            }],
            t.hasRendered.done(function() {
                t.requestAnimationFrame(function() {
                    t.applyStyles(),
                    t.$(".stream-body").empty().append(o || a),
                    t.updatePosition(),
                    t.renderEmoji(),
                    t.$el.find("li .message").first().attr("tabindex", "-1").focus();
                });
            });
        },
        setImage: function(e) {
            var t = e.src;
            t ? (e.removeAttribute("src"),
            l.loadImage(t, e)) : e.parentNode.removeChild(e);
        },
        convertLinks: function(e) {
            var t = e.querySelectorAll("a")
              , i = location.protocol + "//" + location.host + location.pathname + "#/";
            [].forEach.call(t, function(e) {
                0 === e.href.indexOf("wunderlist://") ? e.href = e.href.replace("wunderlist://", i) : e.target = "_blank";
            });
        },
        showError: function() {
            var e = this;
            e.$(".stream-body").html(e.templates.error({
                name: e.name
            })),
            e.updatePosition();
        },
        open: function(t) {
            var i = this;
            i.returnFocus = e.focus,
            i.name = t.name,
            p.string(i.name, "Invalid stream popover namespace"),
            e.trigger("focus:set", i.name),
            i.trackEvent("Show"),
            i[i.name + "Ready"].done(i.whenStreamReady, i),
            f.open.call(i, t);
        },
        whenStreamReady: function() {
            var e = this;
            e.trigger("fetch:data", e.name),
            e.unreadActivitiesCountsReady.done(function() {
                var t = e.activityCenterLookup.getUnreadCountsModel();
                if (t) {
                    var i = {};
                    i[e.name] = 0,
                    t && t.save(i, {
                        fromSync: !0
                    });
                }
                var n = e.activityCenterLookup.allUnreadActivitiesCounts;
                e.bindTo(n, "change:" + e.name, function(t) {
                    t.attributes[e.name] > 0 && e.trigger("fetch:data", e.name);
                });
            });
        },
        onClose: function() {
            var t = this;
            e.focus === t.name && e.trigger("focus:set", t.returnFocus),
            t.trackEvent("Dismiss"),
            t.defer("destroy");
        },
        trackEvent: function(t) {
            var i = this
              , n = a.capitalizeFirstLetter(i.name);
            e.trigger("trackingService", "UI." + t, "ActivityCenter/" + n + "/Dialog");
        }
    });
    return s.applyToClass(b),
    b;
}),
define("/templates/streams/count.js", {
    name: "streams/count",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return r((o = t.symbol || e && e.symbol || a,
            o.call(e, e && e.icon, {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="count hidden">' + r((o = t.count || e && e.count,
            typeof o === s ? o.call(e, {
                name: "count",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        useData: !0
    }
}),
define("views/Streams/StreamCountView", ["application/runtime", "actions/Factory", "wunderbits/WBViewPresenter", "project!core", "./StreamPopoverView", "template!streams/count"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = n.lib.assert
      , l = {
        activities: "label_activity_center",
        conversations: "smart_list_conversations"
    }
      , c = i.prototype;
    return i.extend({
        tagName: "a",
        template: a,
        attributes: {
            role: "button",
            tabindex: 0,
            "aria-haspopup": !0
        },
        renderData: {
            icon: null,
            count: 0
        },
        popover: o,
        name: null,
        initialize: function() {
            var i = this;
            c.initialize.apply(i, arguments),
            s.string(i.name, "Invalid stream name"),
            i.collection = t.activityCenterLookup().allUnreadActivitiesCounts,
            i.bindTo(i.collection, "add remove change", "update"),
            i.bindTo(e, i.name + ":open", "openStream"),
            i.bindTo(e, "window:resize", "closeStream");
        },
        postRender: function() {
            var t = this
              , i = t.collection.models[0]
              , n = i ? i.attributes[t.name] : 0
              , o = e.language.getText(l[t.name]);
            t.$el.attr("aria-label", o + " " + n),
            t.$el.attr("data-path", t.name),
            i && t.update(i);
        },
        update: function(t) {
            var i = this
              , n = t.attributes[i.name]
              , o = i.$(".count");
            o.text(n),
            o.toggleClass("hidden", 1 > n);
            var a = e.language.getText(l[i.name]);
            i.$el.attr("aria-label", a + " " + n);
        },
        closeStream: function() {
            var e = this
              , t = e.getSubview("popover");
            t && !t.destroyed && t.close();
        },
        openStream: function(e) {
            var t = this;
            e = e || {},
            e.offset = 0,
            e.arrowOffset = 0;
            var i = 200
              , n = r("#lists").width()
              , a = i >= n;
            e.offset = a ? "right" : 0,
            e.arrowOffset = a ? 5 : 0;
            var s = t.addSubview(new o({
                target: t.$el,
                offset: e.offset,
                arrowOffset: e.arrowOffset,
                onClose: t.onPopoverClose.bind(t)
            }), "popover");
            e.name = t.name,
            s.open(e),
            t.$el.attr("aria-expanded", !0);
        },
        onPopoverClose: function() {
            this.$el.attr("aria-expanded", !1);
        }
    });
}),
define("views/Streams/ActivitiesCountView", ["application/runtime", "./StreamCountView"], function(e, t) {
    return t.extend({
        name: "activities",
        renderData: {
            icon: "bell"
        },
        className: "activities-count",
        attributes: {
            "data-key-title": "label_activity_center"
        }
    });
}),
define("views/Streams/ConversationsCountView", ["application/runtime", "./StreamCountView"], function(e, t) {
    return t.extend({
        name: "conversations",
        renderData: {
            icon: "conversations"
        },
        className: "conversations-count",
        attributes: {
            "data-key-title": "smart_list_conversations"
        }
    });
}),
define("/templates/symbols/offline.js", {
    name: "symbols/offline",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="offline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M7.472,9.999l2.028,0c0.147,0 0.287,0.064 0.382,0.177c0.095,0.112 0.136,0.26 0.111,0.405l-0.587,3.525l3.192,-5.107l-2.098,0c-0.15,0 -0.291,-0.067 -0.386,-0.183c-0.095,-0.116 -0.133,-0.268 -0.104,-0.415l0.543,-2.716l-3.081,4.314ZM8.5,16.999c-0.059,0 -0.119,-0.011 -0.177,-0.032c-0.223,-0.085 -0.355,-0.315 -0.316,-0.55l0.903,-5.418l-2.41,0c-0.187,0 -0.359,-0.104 -0.444,-0.271c-0.086,-0.167 -0.071,-0.367 0.038,-0.52l4.999,-7c0.138,-0.192 0.394,-0.26 0.607,-0.168c0.215,0.094 0.336,0.326 0.291,0.557l-0.88,4.402l2.389,0c0.182,0 0.35,0.099 0.438,0.258c0.088,0.159 0.083,0.353 -0.014,0.507l-5,8c-0.093,0.15 -0.255,0.235 -0.424,0.235"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/conversations.js", {
    name: "symbols/conversations",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="conversations rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="conversations"> <path d="M3.46,18 C3.28,17.98 3.1,17.86 3.04,17.68 C2.96,17.5 3,17.3 3.12,17.16 C4.1,16.08 4.3,14.12 3.54,13.12 C3.18,12.64 2.72,12 2.42,11.26 C2.14,10.52 2,9.76 2,9 C2,5.14 5.58,2 10,2 C14.42,2 18,5.14 18,9 C18,12.82 14.46,15.96 10.08,16 L10,16 C8.7,16 7.42,15.72 6.28,15.2 C6.02,15.08 5.92,14.78 6.04,14.54 C6.14,14.28 6.44,14.18 6.7,14.28 C7.68,14.74 8.8,14.98 9.92,15 L10,15 C13.86,15 17,12.3 17,9 C17,5.68 13.86,3 10,3 C6.14,3 3,5.68 3,9 C3,9.64 3.12,10.28 3.36,10.88 C3.6,11.52 4,12.08 4.34,12.52 C5.2,13.64 5.22,15.52 4.48,16.96 C5.2,16.84 5.92,16.56 6.52,16.1 C6.74,15.94 7.06,15.98 7.22,16.2 C7.38,16.42 7.34,16.74 7.12,16.9 C6.16,17.62 5,18 3.82,18 L3.46,18 Z" id="I"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/arrow.js", {
    name: "symbols/arrow",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M10.502,13c-0.132,0 -0.26,-0.053 -0.354,-0.146l-4.002,-4c-0.195,-0.195 -0.195,-0.512 0,-0.708c0.195,-0.195 0.512,-0.195 0.707,0l3.649,3.647l3.644,-3.647c0.195,-0.195 0.512,-0.195 0.707,0c0.195,0.195 0.195,0.512 0,0.708l-3.997,4c-0.094,0.093 -0.221,0.146 -0.354,0.146"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/sync.js", {
    name: "symbols/sync",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="sync" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <g> <path d="M10,16c-0.281,-0.002 -0.56,-0.019 -0.839,-0.058c-0.562,-0.079 -1.113,-0.238 -1.631,-0.472c-1.098,-0.497 -2.035,-1.328 -2.661,-2.359c-0.317,-0.521 -0.553,-1.091 -0.698,-1.684c-0.157,-0.641 -0.206,-1.307 -0.147,-1.964c0.052,-0.594 0.194,-1.179 0.42,-1.731c0.264,-0.648 0.644,-1.248 1.115,-1.766c0.501,-0.553 1.106,-1.01 1.774,-1.342c0.688,-0.342 1.44,-0.548 2.206,-0.606c0.579,-0.044 1.161,-0.003 1.727,0.125c0.311,0.07 0.613,0.168 0.91,0.281l0.042,0.018c0.111,0.061 0.198,0.147 0.245,0.266c0.087,0.221 0.002,0.481 -0.199,0.607c-0.053,0.033 -0.111,0.055 -0.171,0.067c-0.078,0.015 -0.153,0.008 -0.229,-0.009c-0.089,-0.03 -0.176,-0.065 -0.265,-0.096c-0.219,-0.074 -0.441,-0.136 -0.668,-0.183c-0.431,-0.09 -0.877,-0.113 -1.316,-0.079c-0.496,0.037 -0.986,0.149 -1.448,0.332c-0.861,0.339 -1.62,0.921 -2.174,1.662c-0.339,0.453 -0.6,0.963 -0.768,1.504c-0.169,0.542 -0.243,1.113 -0.221,1.681c0.023,0.601 0.154,1.197 0.389,1.752c0.258,0.611 0.64,1.168 1.114,1.632c0.475,0.463 1.042,0.832 1.66,1.075c0.562,0.222 1.164,0.339 1.768,0.347c0.566,0.007 1.133,-0.081 1.669,-0.263c0.649,-0.219 1.251,-0.575 1.758,-1.036c0.565,-0.514 1.011,-1.157 1.291,-1.868c0.183,-0.462 0.295,-0.952 0.332,-1.448c0.037,-0.479 0.003,-0.961 -0.103,-1.431c-0.06,-0.264 -0.144,-0.521 -0.24,-0.774l-0.015,-0.044c-0.028,-0.123 -0.022,-0.245 0.036,-0.359c0.027,-0.055 0.065,-0.105 0.111,-0.146c0.177,-0.159 0.45,-0.171 0.638,-0.026c0.063,0.048 0.108,0.108 0.146,0.177c0.035,0.081 0.033,0.081 0.065,0.164c0.092,0.258 0.174,0.52 0.234,0.788c0.111,0.491 0.158,0.995 0.139,1.498c-0.023,0.6 -0.136,1.195 -0.335,1.762c-0.257,0.73 -0.658,1.408 -1.172,1.987c-0.559,0.63 -1.251,1.141 -2.019,1.489c-0.659,0.298 -1.365,0.468 -2.085,0.518c-0.128,0.007 -0.256,0.011 -0.385,0.012Z"/> </g> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/userToolbar.js", {
    name: "userToolbar",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return '<a class="user" data-path="me" role="button" tabindex="0" aria-label="' + r((o = t.userAriaLabel || e && e.userAriaLabel,
            typeof o === a ? o.call(e, {
                name: "userAriaLabel",
                hash: {},
                data: n
            }) : o)) + '" aria-expanded="false" aria-haspopup="true"> <span class="user-avatar"></span> <span class="user-name"></span> <span class="user-arrow">' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "arrow", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> <div id="sync"> <span class="offline-wrapper hidden">' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "offline", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> <span class="syncing-wrapper hidden">' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "sync", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> </div> </a> <div class="stream-counts"></div> ';
        },
        useData: !0
    }
}),
define("/styles/userbar.js", {
    name: "userbar",
    data: '#user-toolbar{height:45px;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;padding-top:2px;padding-bottom:4px;}#user-toolbar svg{fill:#737272}#user-toolbar a:focus svg{fill:#328ad6}#user-toolbar .user{height:45px;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden}#user-toolbar .user-avatar{padding-left:5px;padding-right:5px;-webkit-flex-shrink:0;flex-shrink:0}#user-toolbar .user-name{padding-left:5px;padding-right:5px;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;font-size:15px;line-height:32px;color:#262626}#user-toolbar .user-arrow{height:20px;width:20px}#user-toolbar #sync{min-width:20px;margin-top:4px;}#user-toolbar #sync .syncing-wrapper{-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-o-animation:rotate .8s linear infinite;-ms-animation:rotate .8s linear infinite;animation:rotate .8s linear infinite;display:inline-block;width:20px;height:20px}#user-toolbar #sync .offline-wrapper.api-error svg{fill:#d74e48}#user-toolbar #sync .syncing-wrapper,#user-toolbar #sync .offline-wrapper{fill:#737272}#user-toolbar .stream-counts{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;margin-top:3px;-webkit-flex-shrink:0;flex-shrink:0}#user-toolbar .conversations-count,#user-toolbar .activities-count{position:relative;padding-left:10px;padding-right:10px;}#user-toolbar .conversations-count .count,#user-toolbar .activities-count .count{position:absolute;top:-8px;right:6px;background:#d74e48;color:#fff;font-size:10px;line-height:10px;-webkit-border-radius:20px;border-radius:20px;padding:2px 2px 3px 2px;text-align:center;min-width:11px}#user-toolbar .button,#user-toolbar button{height:14px;}#user-toolbar .button .icon,#user-toolbar button .icon{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60)}#user-toolbar .button.active .icon,#user-toolbar button.active .icon,#user-toolbar .button:active .icon,#user-toolbar button:active .icon{opacity:1;-ms-filter:none;filter:none}'
}),
define("views/Toolbar/UserToolbarView", ["application/runtime", "vendor/moment", "views/AvatarView", "views/Popovers/UserPopoverView", "views/Toolbar/Controllers/ToolbarController", "views/Toolbar/Controllers/ToolbarKeysController", "views/Streams/ActivitiesCountView", "views/Streams/ConversationsCountView", "project!core", "wunderbits/WBViewPresenter", "wunderbits/WBPopoverView", "wunderbits/mixins/UnicodeEmojiViewMixin", "partial!symbols/offline", "partial!symbols/bell", "partial!symbols/conversations", "partial!symbols/arrow", "partial!symbols/sync", "template!userToolbar", "style!userbar"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v) {
    var _ = l.WBDeferred
      , w = c.prototype
      , k = c.extend({
        template: h,
        id: "user-toolbar",
        styles: [v],
        "implements": [o, a],
        emits: {
            click: "set:focus",
            "click .user": "click:user",
            "keydown a": "keydown:button"
        },
        initialize: function() {
            var t = this;
            w.initialize.apply(t, arguments),
            t.initialRender = new _(),
            t.bindTo(e, "toolbar:userMenu", t.toggleUserPopover),
            t.bindTo(e.state, "change:online", t.updateSyncStatus),
            t.bindTo(e, "sync", t.updateSyncStatus),
            t.bindTo(e.user, "change:name", t.updateName);
        },
        render: function() {
            var t = this
              , n = e.user.toJSON();
            n.userAriaLabel = n.name + " " + e.language.getText("aria_user_menu_button"),
            w.render.call(t, n),
            t.$offline = t.$("#sync .offline-wrapper"),
            t.$syncing = t.$("#sync .syncing-wrapper"),
            t.initialRender.resolve(),
            t.userPopover = null,
            t.avatarView = t.avatarView || t.addSubview(new i({
                showPro: !0
            }), "avatarView"),
            t.$(".user-avatar").html(t.avatarView.render({
                id: e.user.id,
                isOwnAvatar: !0,
                size: 32
            }).$el);
            var o = t.addSubview(new r(), "activitiesCount");
            t.$(".stream-counts").append(o.render().el);
            var a = t.addSubview(new s(), "conversationsCount");
            return t.$(".stream-counts").append(a.render().el),
            t.updateName(),
            t.updateSyncStatus(),
            t;
        },
        updateName: function() {
            var t = this
              , i = t.$(".user-name");
            i.text(e.user.attributes.name),
            t.renderEmoji(i);
        },
        updateSyncStatus: function() {
            var t = this
              , i = e.state.attributes;
            t.defer(function() {
                i.online ? e.isSyncing ? t.renderSyncing() : i.syncSuccessful ? t.renderOnlineNotSycing() : t.renderSyncOffline(!0) : t.renderSyncOffline();
            });
        },
        renderSyncOffline: function(e) {
            var t = this;
            t.$syncing.addClass("hidden"),
            t.$offline.removeClass("hidden").toggleClass("api-error", !!e);
        },
        renderSyncing: function() {
            var e = this;
            e.$syncing.removeClass("hidden"),
            e.$offline.addClass("hidden").removeClass("api-error");
        },
        renderOnlineNotSycing: function() {
            var e = this;
            e.$syncing.addClass("hidden"),
            e.$offline.addClass("hidden").removeClass("api-error");
        },
        toggleUserPopover: function(e, t) {
            var i = this;
            i.prepareUserPopover(),
            i.userPopover.toggle(e, t);
            var n = e && "open" === e[0];
            i.renderUserMenuButtonARIAState(n);
        },
        prepareUserPopover: function() {
            var e = this;
            if (!e.userPopover) {
                var t = e.$(".user-avatar");
                e.userPopover = e.addSubview(new n({
                    target: t
                })),
                e.userPopover.onClose = e.onUserPopoverClose.bind(e);
            }
        },
        onUserPopoverClose: function() {
            var e = this;
            e.defer(function() {
                e.destroyed || e.userPopover && e.userPopover.destroyed || !e.userPopover || (e.userPopover.destroy(),
                e.userPopover = null,
                e.renderUserMenuButtonARIAState(!1));
            });
        },
        renderUserMenuButtonARIAState: function(e) {
            this.$(".user").attr("aria-expanded", !!e);
        },
        focusConversations: function() {
            this.$(".conversations-count").focus();
        }
    });
    return u.applyToClass(k),
    k;
}),
define("views/Toolbar/Controllers/SearchToolbarViewController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        "implements": {
            "click:search": "routeToSearch",
            "click:stopSearch": "routeBack",
            "keyup:search": "debouncedOnChangeSearchTerm",
            "keydown:search": "debouncedOnChangeSearchTermDown",
            "focus:input": "inputFocus"
        },
        initialize: function() {
            var e = this;
            e.debouncedOnChangeSearchTerm = e.debounce(e.searchKeyUp, 250),
            e.debouncedOnChangeSearchTermDown = e.debounce(e.searchKeyDown, 250, !0),
            n.initialize.apply(e, arguments);
        },
        searchClicked: function(t) {
            t.preventDefault(),
            t.stopPropagation(),
            e.trigger("route:search"),
            e.trigger("analytics:Search:clickStart");
        },
        searchKeyUp: function(i) {
            var n = this
              , o = n.view
              , a = o.$("input")
              , r = a.val();
            return i.which === t.esc && "browser" === e.focus ? (e.trigger("search:return"),
            void i.stopPropagation()) : void (r !== o.lastSearchTerm && (r ? (e.trigger("route:search/" + encodeURIComponent(r)),
            e.trigger("searchterm:" + r),
            e.trigger("analytics:Search:queryLength", r.length)) : e.trigger("browser:show404", "search"),
            "" === r && (o.currentSuggestion = null)));
        },
        routeToSearch: function() {
            var t = this
              , i = t.view
              , n = i.$("input")
              , o = "search"
              , a = n.val();
            a && a !== i.lastSearchTerm && (o = o + "/" + encodeURIComponent(a)),
            e.trigger("route:" + o),
            i.$(".search-input").focus();
        },
        routeBack: function() {
            e.trigger("search:return");
        },
        inputFocus: function() {
            "browser" === e.focus && e.trigger("focus:set", "sidebar");
        },
        searchKeyDown: function(i) {
            i.which === t.esc && (e.trigger("search:return"),
            i.stopPropagation()),
            i.which === t.tab && (e.state.attributes.inSearchState ? (e.trigger("tasks:selectFirst"),
            e.trigger("focus:set", "browser")) : e.trigger("search:return"),
            i.stopPropagation()),
            i.which === t.backspace;
        }
    });
}),
define("/templates/symbols/search.js", {
    name: "symbols/search",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="search rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g> <path d="M8.5025,15 C4.9225,15 2.0025,12.08 2.0025,8.5 C2.0025,4.92 4.9225,2 8.5025,2 C12.0825,2 15.0025,4.92 15.0025,8.5 C15.0025,12.08 12.0825,15 8.5025,15 L8.5025,15 Z M8.5025,3 C5.4625,3 3.0025,5.46 3.0025,8.5 C3.0025,11.54 5.4625,14 8.5025,14 C11.5425,14 14.0025,11.54 14.0025,8.5 C14.0025,5.46 11.5425,3 8.5025,3 L8.5025,3 Z M17.5025,18 C17.3825,18 17.2425,17.96 17.1425,17.86 L13.6425,14.36 C13.4625,14.16 13.4625,13.84 13.6425,13.64 C13.8425,13.46 14.1625,13.46 14.3625,13.64 L17.8625,17.14 C18.0425,17.34 18.0425,17.66 17.8625,17.86 C17.7625,17.96 17.6225,18 17.5025,18 L17.5025,18 Z" id="z"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/dismiss.js", {
    name: "symbols/dismiss",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.991,10.832c-1.716,1.671 -3.445,3.329 -5.137,5.022c-0.058,0.052 -0.12,0.095 -0.195,0.12c-0.039,0.013 -0.05,0.014 -0.09,0.021c-0.046,0.004 -0.046,0.004 -0.092,0.004c-0.078,-0.007 -0.151,-0.024 -0.22,-0.062c-0.193,-0.108 -0.294,-0.336 -0.244,-0.551c0.018,-0.078 0.055,-0.143 0.102,-0.205c1.627,-1.785 3.329,-3.499 5.053,-5.19c-1.671,-1.716 -3.329,-3.445 -5.022,-5.137c-0.052,-0.058 -0.095,-0.12 -0.12,-0.195c-0.081,-0.242 0.039,-0.513 0.272,-0.616c0.056,-0.025 0.117,-0.04 0.179,-0.042c0.128,-0.006 0.242,0.038 0.342,0.114c1.785,1.627 3.499,3.329 5.19,5.053c1.716,-1.671 3.445,-3.329 5.137,-5.022c0.058,-0.052 0.12,-0.095 0.195,-0.12c0.059,-0.02 0.121,-0.028 0.182,-0.025c0.255,0.011 0.465,0.221 0.476,0.476c0.006,0.128 -0.038,0.242 -0.114,0.342c-1.627,1.785 -3.329,3.499 -5.053,5.19c1.671,1.716 3.329,3.445 5.022,5.137c0.052,0.058 0.095,0.12 0.12,0.195c0.07,0.21 -0.009,0.447 -0.191,0.571c-0.066,0.045 -0.137,0.069 -0.214,0.083c-0.046,0.004 -0.046,0.004 -0.092,0.004c-0.078,-0.007 -0.151,-0.024 -0.22,-0.062c-0.036,-0.02 -0.044,-0.028 -0.076,-0.052c-1.785,-1.627 -3.499,-3.329 -5.19,-5.053Z"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/list-toggle.js", {
    name: "symbols/list-toggle",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="list-toggle" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M0.5,3.5l19,0" style="fill:none;stroke-width:1px;stroke:white;"/> <path d="M0.5,9.53l19,0" style="fill:none;stroke-width:1px;stroke:white;"/> <path d="M0.5,15.5l19,0" style="fill:none;stroke-width:1px;stroke:white;"/> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/searchToolbar.js", {
    name: "searchToolbar",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<a class="toggle-icon" role="button" tabindex="0" data-key-title="toggle_sidebar">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "list-toggle", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</a> <div class="search-input-wrapper"> <input class="chromeless search-input" type="text" data-key-aria-label="placeholder_search"/> </div> <span class="search-icon-wrapper"> <a class="search-icon" role="button" tabindex="0" data-key-aria-label="aria_search" data-key-title="aria_search">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "search", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</a> <a class="search-stop-icon hidden" role="button" tabindex="0" data-key-aria-label="aria_exit_search" data-key-title="aria_exit_search">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "dismiss", {
                name: "symbol",
                hash: {},
                data: n
            }))) + "</a> </span> ";
        },
        useData: !0
    }
}),
define("/styles/searchbar.js", {
    name: "searchbar",
    data: "#search-toolbar{height:45px;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;}.background-01 #search-toolbar{background:#603421}.background-02 #search-toolbar{background:#497062}.background-03 #search-toolbar{background:#495570}.background-04 #search-toolbar{background:#3f7e7a}.background-05 #search-toolbar{background:#96613c}.background-06 #search-toolbar{background:#5b7a59}.background-07 #search-toolbar{background:#5a863c}.background-08 #search-toolbar{background:#03719e}.background-09 #search-toolbar{background:#245d75}.background-10 #search-toolbar{background:#572e49}.background-11 #search-toolbar{background:#2c4371}.background-12 #search-toolbar{background:#316062}.background-13 #search-toolbar{background:#547e8c}.background-14 #search-toolbar{background:#285664}.background-15 #search-toolbar{background:#61a67f}.background-16 #search-toolbar{background:#a94234}.background-17 #search-toolbar{background:#4c4c4c}.background-18 #search-toolbar{background:#4a4a4a}.background-19 #search-toolbar{background:#b05c73}.background-20 #search-toolbar{background:#502e2f}.background-21 #search-toolbar{background:#944c3a}.background-22 #search-toolbar{background:#336f81}.background-23 #search-toolbar{background:#47342a}.background-24 #search-toolbar{background:#b4a378}.background-25 #search-toolbar{background:#0c7fad}.background-26 #search-toolbar{background:#6a5188}.background-27 #search-toolbar{background:#ae5237}.background-28 #search-toolbar{background:#9b6f7a}.background-29 #search-toolbar{background:#b66745}.background-30 #search-toolbar{background:#0455d2}#search-toolbar .search-input-wrapper{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}#search-toolbar .search-input[type=text]{font-size:18px;color:#fff;height:45px;-webkit-app-region:no-drag}#search-toolbar .search-icon-wrapper,#search-toolbar .list-toggle{width:20px;height:20px;fill:#fff;padding:13px 11px 12px 11px;-webkit-flex-shrink:0;flex-shrink:0}"
}),
define("views/Toolbar/SearchToolbarView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Toolbar/Controllers/SearchToolbarViewController", "partial!symbols/search", "partial!symbols/dismiss", "partial!symbols/delete", "partial!symbols/list-toggle", "template!searchToolbar", "style!searchbar"], function(e, t, i, n, o, a, r, s, l) {
    return t.extend({
        id: "search-toolbar",
        template: s,
        styles: [l],
        "implements": [i],
        observes: {
            runtime: {
                "search:start": "onSearchStart",
                "search:cancel": "onSearchCancel",
                "search:return": "goToReturnURL",
                "search:focus": "focusSearchField"
            }
        },
        emits: {
            "click .search-icon": "click:search",
            "click .search-stop-icon": "click:stopSearch",
            "click .list-toggle": "toggle:lists",
            "click input": "click:search",
            "keydown input": "keydown:search",
            "keyup input": "keyup:search",
            "focus input": "focus:input"
        },
        toggleSearchIcons: function(e) {
            var t = this;
            t.$(".search-icon").toggleClass("hidden", e),
            t.$(".search-stop-icon").toggleClass("hidden", !e);
        },
        hideSearch: function() {
            var e = this;
            e.$("input").val(""),
            e.toggleSearchIcons(!1);
        },
        focusSearchField: function() {
            this.$("input").focus();
        },
        goToReturnURL: function() {
            var t = this;
            t.searchStarted && (t.onSearchCancel(),
            e.trigger("route:" + (t.returnURL || "lists/inbox")),
            e.trigger("browser:hide404")),
            t.hideSearch(),
            t.searchStarted = !1;
        },
        onSearchStart: function(t, i) {
            var n = this
              , o = n.$("input")
              , a = o.is(":focus")
              , r = o.val();
            n.returnURL = i,
            n.searchStarted = !0,
            n.toggleSearchIcons(!0),
            t && r !== t && !a ? (o.val(t),
            n.$("input").focus()) : t || a || n.$("input").focus(),
            t && (e.trigger("sidebar:deselect"),
            e.trigger("search:keywords", t));
        },
        onSearchCancel: function() {
            this.hideSearch();
        }
    });
}),
define("views/Sidebar/controllers/SidebarActionsController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    return i.extend({
        "implements": {
            "click:addList": "_addList",
            "drop:tasks": "_addListWithTasks"
        },
        _addList: function() {
            e.trigger("onboarding:addListClicked"),
            e.trigger("route:lists/new"),
            e.trigger("analytics:Sidebar:clickAddList");
        },
        _addListWithTasks: function(t) {
            e.trigger("route:lists/new/" + t.join(","));
        }
    });
}),
define("/templates/sidebarActions.js", {
    name: "sidebarActions",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<a class="sidebarActions-addList"> <span class="sidebarActions-icon">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "plus-small", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> <span class="sidebarActions-label">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "placeholder_create_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> </a> ";
        },
        useData: !0
    }
}),
define("/styles/sidebarActions.js", {
    name: "sidebarActions",
    data: ".sidebarActions{border-top:1px solid rgba(0,0,0,0.1);background:#f7f7f7}.sidebarActions-addList{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;height:42px;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;font-size:15px;color:#328ad6;fill:#328ad6;}.sidebarActions-addList.dragOver{background:rgba(50,138,214,0.05)}.sidebarActions-icon{height:20px;padding-left:10px;padding-right:10px}.sidebarActions-label{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}"
}),
define("views/Sidebar/SidebarActionsView", ["wunderbits/WBViewPresenter", "./controllers/SidebarActionsController", "helpers/dnd/index", "partial!symbols/plus-small", "template!sidebarActions", "style!sidebarActions"], function(e, t, i, n, o, a) {
    var r = e.prototype
      , s = "application/x-wunderlist-task";
    return e.extend({
        className: "sidebarActions",
        styles: [a],
        template: o,
        "implements": [t],
        observes: {
            runtime: {
                "lists:new": ">click:addList"
            }
        },
        emits: {
            "click .sidebarActions-addList": "click:addList"
        },
        _setupDropZone: function() {
            var e = this;
            if (!e.addButtonDropZone) {
                var t = e.el.querySelector(".sidebarActions-addList");
                e.addButtonDropZone = i.createDropZone(t, {
                    dropEffect: "move",
                    mimeTypes: [s],
                    hoverClass: "dragOver"
                }),
                e.bindTo(e.addButtonDropZone, "drop", e._onTasksDropped),
                e.addButtonDropZone.enable();
            }
        },
        render: function() {
            var e = this
              , t = r.render.apply(e, arguments);
            return e._setupDropZone(),
            t;
        },
        _onTasksDropped: function(e) {
            var t = this
              , i = JSON.parse(e);
            t.trigger("drop:tasks", i);
        },
        onDestroy: function() {
            var e = this;
            r.onDestroy.call(e),
            e.addButtonDropZone.destroy();
        }
    });
}),
define("/templates/tagCloudItem.js", {
    name: "tagCloudItem",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return '<a class="percent-' + r((o = t.percent || e && e.percent,
            typeof o === a ? o.call(e, {
                name: "percent",
                hash: {},
                data: n
            }) : o)) + '" data-path="search/' + r((o = t.tagUri || e && e.tagUri,
            typeof o === a ? o.call(e, {
                name: "tagUri",
                hash: {},
                data: n
            }) : o)) + '">' + r((o = t.tag || e && e.tag,
            typeof o === a ? o.call(e, {
                name: "tag",
                hash: {},
                data: n
            }) : o)) + "</a>";
        },
        useData: !0
    }
}),
define("/styles/tagCloud.js", {
    name: "tagCloud",
    data: ".tagCloud{position:relative;z-index:600;display:block;margin:10px 20px 0 20px;text-align:center;break-word:break-word;word-wrap:break-word;}.tagCloud a{font-weight:normal;font-size:12px;margin-right:6px;display:inline-block;color:#aaa;}.tagCloud a.percent-10{color:#aaa;font-weight:100}.tagCloud a.percent-20{color:#909090;font-weight:200}.tagCloud a.percent-30{color:#777;font-weight:300}.tagCloud a.percent-40{color:#6a6a6a;font-weight:400}.tagCloud a.percent-50{color:#5d5d5d;font-weight:500}.tagCloud a.percent-60{color:#515151;font-weight:600}.tagCloud a.percent-70{color:#5d5d5d;font-weight:700}.tagCloud a.percent-80{color:#444;font-weight:800}.tagCloud a.percent-90{color:#111;font-weight:900}.tagCloud a.percent-100{color:#000;font-weight:900}.tagCloud a:hover{color:#000}"
}),
define("views/Sidebar/TagCloud", ["application/runtime", "actions/Factory", "wunderbits/WBView", "template!tagCloudItem", "style!tagCloud"], function(e, t, i, n, o) {
    var a = e._
      , r = e.$
      , s = i.prototype;
    return i.extend({
        className: "tagCloud",
        styles: [o],
        templates: {
            tagItem: n
        },
        initialize: function() {
            var i = this;
            s.initialize.apply(i, arguments),
            i.tasks = t.taskLookup().allTasks,
            i.debouncedRender = i.debounce(i.render, 2e3),
            i.bindTo(i.tasks, "change:title add remove", i.debouncedRender),
            i.bindTo(e, "tags:tagCloud", i.renderTags);
        },
        render: function() {
            var e = this;
            return s.render.apply(e, arguments),
            e.getTagCloud(),
            e;
        },
        getTagCloud: function() {
            e.on("db:allTasksLoaded", function() {
                e.trigger("tags:getTagCloud");
            });
        },
        renderTags: function(t) {
            var i, n, o, s = this;
            t = t && a.sortBy(t, "tag");
            var l = a.max(a.map(t, function(e) {
                return e.ids.length;
            }));
            e.on("tasks:ready", function() {
                s.$el.empty();
                var e = document.createDocumentFragment();
                for (var c in t)
                    if (o = t[c].ids.length) {
                        var d = 10 * Math.round(o / l * 10);
                        i = {
                            tag: a.escape(t[c].tag.replace(/^#/, "")),
                            tagUri: encodeURIComponent(t[c].tag),
                            percent: d
                        },
                        n = r(s.templates.tagItem(i))[0],
                        e.appendChild(n);
                    }
                s.el.appendChild(e);
            }),
            s.delegateEvents();
        }
    });
}),
define("/templates/symbols/more-vertical.js", {
    name: "symbols/more-vertical",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="more-vertical" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M8,15.5c0,-0.828 0.672,-1.5 1.5,-1.5c0.828,0 1.5,0.672 1.5,1.5c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5Z"/> <path d="M8,9.5c0,-0.828 0.672,-1.5 1.5,-1.5c0.828,0 1.5,0.672 1.5,1.5c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5Z"/> <path d="M8,3.5c0,-0.828 0.672,-1.5 1.5,-1.5c0.828,0 1.5,0.672 1.5,1.5c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5Z"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/sidebarMoreButton.js", {
    name: "sidebarMoreButton",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return r((o = t.symbol || e && e.symbol || a,
            o.call(e, "more-vertical", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " ";
        },
        useData: !0
    }
}),
define("views/Sidebar/MoreButton", ["wunderbits/WBViewPresenter", "partial!symbols/more-vertical", "template!sidebarMoreButton"], function(e, t, i) {
    return e.extend({
        emits: {
            click: "toggle:lists"
        },
        tagName: "a",
        className: "moreButton",
        template: i
    });
}),
define("/templates/foldersGuide.js", {
    name: "foldersGuide",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="guide"> <div class="instructions"> <div> <span class="badge filled">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "folder_whatsnew_button_new", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> <h3>" + r((o = t.localized || e && e.localized || a,
            o.call(e, "folder_whatsnew_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h3> <div class="animation"></div> <p class="description">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "folder_whatsnew_popup_description", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <a class="closeButton">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_close", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </div> <a class="openButton"> <span class="badge white">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "folder_whatsnew_button_new", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> <span class="label">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "folder_whatsnew_title", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> </a> ";
        },
        useData: !0
    }
}),
define("/styles/foldersGuide.js", {
    name: "foldersGuide",
    data: '.foldersGuide .openButton{display:none;background:#328ad6;color:#fff;font-weight:bold;height:34px;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}.foldersGuide .openButton .badge{margin:0 10px}.foldersGuide .guide{background-color:#f7f7f7;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;visibility:hidden;-webkit-transition:opacity 0.2s;-moz-transition:opacity 0.2s;-o-transition:opacity 0.2s;-ms-transition:opacity 0.2s;transition:opacity 0.2s;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);background:#fff;color:#000;position:absolute;bottom:0;top:45px;left:0;right:0;z-index:100;}.foldersGuide .guide .instructions{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-inline-box;display:-moz-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-box;display:inline-flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-moz-box-pack:center;-o-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center;padding:0 10px;}.foldersGuide .guide .instructions h3{margin:10px 0 10px 0;font-size:20px}.foldersGuide .guide .instructions .animation{margin:10px 0;background:url("images/folders-guide.gif") no-repeat center;-webkit-background-size:contain;-moz-background-size:contain;background-size:contain;height:140px}.foldersGuide .guide .instructions .description{margin:0 20px;font-size:13px;line-height:150%}.foldersGuide .guide .closeButton{background-color:#f7f7f7;text-align:center;color:#2b88d9;border-top:1px solid #d6d6d6;padding:10px}.foldersGuide.showGuide .guide{visibility:visible;opacity:1;-ms-filter:none;filter:none}.foldersGuide.showButton .openButton{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex}'
}),
define("views/Sidebar/FoldersGuide", ["application/runtime", "wunderbits/WBViewPresenter", "template!foldersGuide", "style!foldersGuide"], function(e, t, i, n) {
    var o = t.extend({
        className: "foldersGuide showButton",
        template: i,
        styles: [n],
        events: {
            "click .openButton": "_openGuide",
            "click .closeButton": "_closeGuide"
        },
        _openGuide: function() {
            var e = this;
            e.el.classList.remove("showButton"),
            e.el.classList.add("showGuide");
        },
        _closeGuide: function() {
            var t = this;
            e.settings.save({
                webapp_sidebar_folder_guide_did_show: !0
            }),
            t.el.classList.remove("showGuide"),
            t.el.classList.remove("showButton"),
            t.destroy();
        }
    });
    return o.needsToShow = function() {
        return !e.settings.attributes.webapp_sidebar_folder_guide_did_show;
    }
    ,
    o;
}),
define("helpers/SidebarItemVisibilityHelper", ["application/runtime", "project!core"], function(e, t) {
    function i(e, t) {
        var i = e.offset().top
          , n = e.height()
          , o = t.height()
          , a = t.scrollTop()
          , r = t.offset().top
          , s = i
          , l = i + n
          , c = r
          , d = r + o;
        return c > s ? a + (s - c) - n / 2 : l > d ? a + (l - d) + n / 2 : void 0;
    }
    return t.WBSingleton.extend({
        scrollToItem: function(e, t, n) {
            if (void 0 !== e.offset()) {
                var o = n && n.animate
                  , a = i(e, t);
                void 0 !== a && (o ? t.stop().animate({
                    scrollTop: a
                }, 100) : t.scrollTop(a));
            }
        }
    });
}),
define("/templates/sidebar.js", {
    name: "sidebar",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="lists-scroll"> </div>';
        },
        useData: !0
    }
}),
define("views/Sidebar/SidebarView", ["application/runtime", "actions/Factory", "views/Sidebar/PendingInvitesCollectionView", "views/Sidebar/InboxItemView", "views/Sidebar/SidebarDropZoneView", "views/Sidebar/ListsCollectionView", "views/Sidebar/SmartListsCollectionView", "./Controllers/SidebarController", "./Controllers/SidebarKeysController", "./Controllers/ListContextMenuController", "./Controllers/FolderContextMenuController", "views/Toolbar/UserToolbarView", "views/Toolbar/SearchToolbarView", "views/Sidebar/SidebarActionsView", "views/Sidebar/TagCloud", "views/Sidebar/MoreButton", "views/Sidebar/FoldersGuide", "wunderbits/data/keycodes", "helpers/SidebarItemVisibilityHelper", "wunderbits/helpers/strings", "wunderbits/WBViewPresenter", "wunderbits/WBPopoverView", "wunderbits/WBBlurHelper", "project!core", "template!sidebar", "style!_lists"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S) {
    var L = e.$
      , D = e.global
      , j = y.WBStateModel
      , M = w.prototype
      , z = x
      , I = v;
    return w.extend({
        template: C,
        styles: [T],
        className: "lists-inner",
        attributes: {
            tabindex: 0
        },
        "implements": [s, l, c, d],
        emits: {
            "contextmenu li.sidebarItem": "contextmenu:lists",
            "contextmenu li.sidebarFolder .folder-container": "contextmenu:folders",
            "click li a": "click:list",
            "MSPointerDown li a": "click:list",
            "click li.active .list-options": "click:edit",
            "dblclick li": "doubleClick:list",
            keydown: "keydown"
        },
        observes: {
            runtime: {
                "lists:delete": ">delete:selected",
                "lists:copy": ">copy:selected",
                "lists:paste": ">paste:lists",
                "sidebar:focus:active": "focusActive",
                "sidebar:select": "onSelectList",
                "sidebar:reselect": "onReselectList",
                "sidebar:deselect": "onUnselectAll",
                "sidebar:deleteAndSelectNext": "deleteAndSelectNext",
                "sidebar:selected:add:task": "routeToAddTask",
                "sidebar:navigate": "navigateLists",
                "focus:changed": "saveGlobalFocus",
                "list:sorting:start": "filtersVisuallyDisabled",
                "list:sorting:end": "filtersVisuallyRestored",
                "window:throttleResize": "onWindowResize"
            },
            searchToolbarView: {
                "toggle:lists": "toggleLists"
            },
            moreButtonView: {
                "toggle:lists": "toggleLists"
            },
            stateModel: {
                "change:bodyWidth": "onChangeBodyWidth",
                "change:autoCollapse": "onChangeAutoCollapse"
            }
        },
        initialize: function(n) {
            var s = this;
            s.inboxReady = s.deferred(),
            s.settingsReady = s.deferred(),
            s.sidebarActions = t.sidebar(),
            s.lists = t.listLookup().allLists,
            s.memberships = t.membershipLookup().allMemberships,
            s.debouncedRouteToList = s.debounce(s.routeToList, 250),
            s.pendingInvitesView = s.addSubview(new i()),
            s.listsView = s.addSubview(new a({
                sidebarActions: s.sidebarActions
            })),
            s.filterView = s.addSubview(new r(n)),
            s.userToolbarView = s.addSubview(new u({
                user: n && n.user
            })),
            s.searchToolbarView = s.addSubview(new m()),
            e.isLabsEnabled("tag_cloud") && (s.tagCloudView = s.addSubview(new g())),
            s.sidebarActionsView = s.addSubview(new p()),
            s.dropZoneView = s.addSubview(new o()),
            s.moreButtonView = s.addSubview(new f()),
            s.stateModel = new j({
                bodyWidth: L("body").width()
            }),
            M.initialize.apply(this, arguments),
            s.bindTo(s, "select", s.onSelectList),
            s.bindTo(s, "deselect", s.onUnselectAll),
            s.bindOnceTo(e, "hasSyncedOnce", s.settingsReady.resolve, s.settingsReady);
        },
        render: function() {
            var e = this
              , t = document.createDocumentFragment();
            t.appendChild(e.searchToolbarView.render().el),
            t.appendChild(e.userToolbarView.render().el),
            e.$el.empty().append(t),
            e.$el.append(e.template());
            var i = document.createDocumentFragment();
            i.appendChild(e.pendingInvitesView.render().el),
            i.appendChild(e.filterView.render().el),
            i.appendChild(e.listsView.render().el),
            i.appendChild(e.moreButtonView.render().el),
            i.appendChild(e.dropZoneView.render().el);
            var n = e.$(".lists-scroll");
            return n.append(i),
            e.tagCloudView && n.append(e.tagCloudView.render().el),
            e.renderInbox(),
            e.delegateEvents(),
            e.renderLocalized(),
            e.el.appendChild(e.sidebarActionsView.render().el),
            e.renderFoldersGuide(),
            e.defer(function() {
                e.shouldCollapseOnListSelect() && e.toggleLists();
            }),
            e;
        },
        renderFoldersGuide: function() {
            var e = this;
            e.settingsReady.done(function() {
                if (b.needsToShow()) {
                    var t = e.$(".lists-scroll");
                    e.foldersGuide = e.addSubview(new b()),
                    t.after(e.foldersGuide.render().el);
                }
            });
        },
        renderInbox: function() {
            var t = this;
            t.bindOnceTo(e, "lists:ready", function(e) {
                var i = e.get("inbox")
                  , o = new n({
                    model: i
                });
                t.addSubview(o, "inbox"),
                t.filterView.$el.prepend(o.render().el),
                o.ready.done(t.inboxReady.resolve, t.inboxReady);
            });
        },
        toggleLists: function(e) {
            L("#lists").toggleClass("collapsed", e);
        },
        routeToList: function(t) {
            var i = this;
            "sidebar" === e.focus && (e.supressSidebarClose(!0),
            i.trigger("route:list", t),
            i.routed = !0);
        },
        routeToAddTask: function() {
            var t = this
              , i = t.getSelectedID();
            i && "completed" !== i && "week" !== i && e.trigger("route:lists/" + i + "/tasks/new");
        },
        getSelectedID: function() {
            var e = this;
            return e.$("li.active").attr("rel");
        },
        _shouldCollapse: function() {
            return this.stateModel.attributes.bodyWidth < 1e3;
        },
        shouldCollapseOnListSelect: function() {
            return this.stateModel.attributes.bodyWidth < 550;
        },
        onWindowResize: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                e.stateModel.save({
                    bodyWidth: L("body").width()
                });
            });
        },
        onChangeBodyWidth: function() {
            var e = this;
            e.stateModel.save({
                autoCollapse: e._shouldCollapse()
            });
        },
        _shouldAutoCollapse: function() {
            return this.stateModel.attributes.autoCollapse;
        },
        onChangeAutoCollapse: function() {
            L("#lists").toggleClass("collapsed", this._shouldAutoCollapse());
        },
        onReselectList: function(t) {
            var i = this
              , n = e.getIdFromRoute()
              , o = e.isOnListRoute() && n ? n : i.$("li").first().attr("rel");
            o && i.onSelectList(o, {
                trigger: t !== S ? t : !0
            });
        },
        filtersVisuallyDisabled: function() {
            var e = this
              , t = e.$(".filters-collection");
            z.run(),
            t.find("li").addClass("touch-edit-disabled");
        },
        filtersVisuallyRestored: function() {
            var e = this
              , t = e.$(".filters-collection");
            t.find("li").removeClass("touch-edit-disabled");
        },
        getDeleteAndSelectNextAction: function(t, i, n) {
            var o = this
              , a = ".user-disabled, .animate-up, .destroyed, .hidden, .sidebarFolder, .sidebarFolder.collapsed li, [data-type=filter]";
            return function() {
                o.deleteTimeout && D.clearTimeout(o.deleteTimeout);
                var r = o.$("li.sidebarItem").not(a)
                  , s = o.$('[rel="' + t.id + '"]').addClass("destroyed")
                  , l = r.index(s)
                  , c = r.get(l - 1);
                o.$("li").removeClass("active selected");
                var d = L(c).addClass("active selected").focus().attr("rel")
                  , u = i.animate === !1 ? 1 : 500;
                if (o.deleteTimeout = D.setTimeout(function() {
                    o.onSelectList(d, {
                        trigger: !0
                    });
                }, u),
                t.isShared() && t.isMember()) {
                    var m = o.memberships.get(t.attributes.membershipID);
                    m && m.destroy();
                } else
                    t.destroy(i);
                if (n && i.confirm !== !1) {
                    var p = t.isShared() && !t.isOwner() ? "confirmLeaveList" : "confirmDeleteList";
                    e.trigger("analytics:Sidebar:" + p);
                } else
                    e.trigger("analytics:Sidebar:deleteListWithoutConfirmation");
            }
            ;
        },
        deleteAndSelectNext: function(t, i) {
            var n = this
              , o = "true" === e.settings.attributes.confirm_delete_entity;
            i || (i = {});
            var a = n.getDeleteAndSelectNextAction(t, i, o)
              , r = t.isShared() && !t.isOwner()
              , s = r ? "sharing_leave_action" : "label_are_you_sure_permanently_delete_$_list"
              , l = r ? "sharing_leave_button" : "label_delete_list"
              , c = {
                confirm: a,
                cancel: function() {
                    e.trigger("actions:set", t),
                    e.trigger("analytics:Sidebar:cancelDeleteList");
                },
                customTitle: e.language.getLabel(s, t.escape("title")).toString(),
                customText: e.language.getLabel("label_cant_undo").toString(),
                confirmText: e.language.getLabel(l).toString()
            };
            o && i.confirm !== !1 ? e.trigger("modal:confirm", c) : a();
        },
        onUnselectAll: function() {
            var t = this;
            t.$("li.active").removeClass("active"),
            e.trigger("sidebar:selected", null);
        },
        setSelectionByID: function(t) {
            var i = this;
            i.when(i.listsView.ready, i.inboxReady).done(function() {
                i.$("li.active").removeClass("active selected");
                var n = i.$('li[rel="' + t + '"]');
                n.addClass("active").focus(),
                e.trigger("actions:set", i.lists.get(t)),
                e.trigger("sidebar:selected", t),
                i.scrollToItemWithID(t),
                i.filterView.ensureVisibility(t);
            });
        },
        scrollToItemWithID: function(e) {
            var t = this
              , i = t.$('[rel="' + e + '"]');
            I.scrollToItem(i, t.$(".lists-scroll"), {
                animate: t.hasExecutedScrollCheck
            }),
            t.hasExecutedScrollCheck = !0;
        },
        navigateLists: function(t) {
            var i = this
              , n = ".user-disabled, .animate-up, .destroyed, .hidden, .sidebarFolder.collapsed li"
              , o = i.$(".filters-collection").find("li").not(n)
              , a = i.$(".lists-collection").find("li").not(n)
              , r = i.$(".pending-invites-collection").find("li").not(n);
            a = r.add(o).add(a);
            var s, l = 0, c = 0;
            if (e.trigger("actions:set", null),
            a.each(function(e, t) {
                return t === a.filter(".active")[0] ? void (l = c) : void (c += 1);
            }),
            "up" === t ? (s = L(l > 0 ? a.get(l - 1) : a.get(a.size() - 1)),
            i.routed && (i.routed = !1)) : "down" === t ? (s = L(l < a.length - 1 ? a.get(l + 1) : a.get(0)),
            i.routed && (i.routed = !1)) : "right" === t && i.routed && e.trigger("tasks:selectFirst"),
            s && ("up" === t || "down" === t)) {
                var d = s.attr("rel");
                a.removeClass("active selected"),
                s.addClass("active selected").focus(),
                i.debouncedRouteToList(d),
                i.scrollToItemWithID(d);
            }
        },
        saveGlobalFocus: function(e) {
            var t = this;
            "sidebar" === e && t.$(".active").focus();
        },
        onSelectList: function(t, i) {
            var n = this;
            n.listsView.blockListChangeFromDragEnd && e.env.isTouchDevice() || (n.setSelectionByID(t),
            n.routed = !0,
            i && i.trigger && e.trigger("route:lists/" + t));
        },
        focusActive: function() {
            var e = this;
            e.$(".active").focus();
        },
        focusConversations: function() {
            this.userToolbarView.focusConversations();
        }
    });
}),
define("views/Tasks/Controllers/TaskHeaderViewController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e._;
    return t.extend({
        "implements": {
            "toggle:completedTasks": "_toggleCompletedTasks",
            clickedTitle: "onClickedTitle"
        },
        onClickedTitle: function() {},
        _toggleCompletedTasks: function(t) {
            var n = this;
            t && t.preventDefault();
            var o = n.view.model.attributes.isCollapsed;
            n.view.model.set("isCollapsed", !o),
            o && n.view.model.loadCompletedTasksIfNeeded(),
            i.delay(i.bind(e.trigger, e, "focus:set", "browser"), 100);
        }
    });
}),
define("controllers/Tasks/DeleteCompletedTasksController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController", "project!core"], function(e, t, i, n) {
    var o = n.lib.clone
      , a = e._
      , r = i.prototype;
    return i.extend({
        initialize: function() {
            var e = this;
            r.initialize.apply(e, arguments),
            e.taskLookup = t.taskLookup();
        },
        "implements": {
            "delete:completed": "deleteCompleted"
        },
        getConfirmationLabels: function(t) {
            var i = e.language.getLabel
              , n = {
                text: i("label_cant_undo").toString()
            };
            return 1 === t.length ? (n.title = i("label_are_you_sure_permanently_delete_$_task", a.escape(t[0].attributes.title)).toString(),
            n.confirm = i("label_delete_task").toString()) : (n.title = i("label_are_you_sure_permanently_delete_task_plural").toString(),
            n.confirm = i("label_delete_task_plural").toString()),
            n;
        },
        deleteCompleted: function() {
            var t = this
              , i = t.deferred()
              , n = t.view.model.attributes.listID
              , a = t.taskLookup.getTaskCollection(n)
              , r = o(a.doneTasks.models);
            if (r.length) {
                var s = function() {
                    r.forEach(function(e) {
                        e.destroy();
                    }),
                    i.resolve();
                }
                  , l = "true" === e.settings.get("confirm_delete_entity");
                if (l) {
                    var c = t.getConfirmationLabels(r);
                    e.trigger("modal:confirm", {
                        customTitle: c.title,
                        customText: c.text,
                        confirmText: c.confirm,
                        confirm: s,
                        cancel: i.reject.bind(i)
                    });
                } else
                    s();
            } else
                i.reject();
            return i.promise();
        }
    });
}),
define("/templates/tasksHeader.js", {
    name: "tasksHeader",
    data: {
        "1": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <a class="delete-completed"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "trash", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        "3": function() {
            return " no-hover";
        },
        "5": function(e, t, i, n) {
            var o, a, r = "function", s = 'data-path="';
            return a = t.listHref || e && e.listHref,
            o = typeof a === r ? a.call(e, {
                name: "listHref",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (s += o),
            s += '" href="/#/',
            a = t.listHref || e && e.listHref,
            o = typeof a === r ? a.call(e, {
                name: "listHref",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (s += o),
            s + '" ';
        },
        "7": function() {
            return '<span class="spinner"></span>';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = "";
            return o = t["if"].call(e, e && e.canDeleteCompleted, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '  <a class="groupHeader ' + s((a = t.listClassName || e && e.listClassName,
            typeof a === r ? a.call(e, {
                name: "listClassName",
                hash: {},
                data: n
            }) : a)),
            o = t.unless.call(e, e && e.listHref, {
                name: "unless",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" ',
            o = t["if"].call(e, e && e.listHref, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' aria-label="' + s((a = t.listLabel || e && e.listLabel,
            typeof a === r ? a.call(e, {
                name: "listLabel",
                hash: {},
                data: n
            }) : a)) + '">',
            a = t.listTitle || e && e.listTitle,
            o = typeof a === r ? a.call(e, {
                name: "listTitle",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (l += o),
            l += "&#x200b;</a> ",
            o = t["if"].call(e, e && e.loadingCompleted, {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l;
        },
        useData: !0
    }
}),
define("views/Tasks/TaskListHeaderView", ["wunderbits/WBViewPresenter", "project!core", "wunderbits/mixins/UnicodeEmojiViewMixin", "./Controllers/TaskHeaderViewController", "controllers/Tasks/DeleteCompletedTasksController", "partial!symbols/trash", "template!tasksHeader"], function(e, t, i, n, o, a, r, s) {
    var l = t.lib.extend
      , c = e.prototype
      , d = e.extend({
        template: r,
        observes: {
            model: {
                "change:title": "render",
                "change:isCollapsed": "render",
                "change:showHeader": "render",
                "change:loadingCompleted": "render"
            },
            chunking: {
                destroy: "destroy"
            }
        },
        emits: {
            "click .delete-completed": "delete:completed",
            "click .completed-items-heading": "toggle:completedTasks",
            "click a": "clickedTitle"
        },
        tagName: "h2",
        className: "heading normal",
        "implements": [n, o],
        initialize: function(e) {
            var t = this;
            t.chunking = e.chunking,
            c.initialize.apply(t, arguments);
        },
        formatData: function(e) {
            var t = this
              , i = t.model.attributes;
            return l({}, e, {
                canCollapse: i.canCollapse,
                loadingCompleted: i.loadingCompleted,
                isCollapsed: i.isCollapsed,
                canDeleteCompleted: i.canDeleteCompleted,
                listClassName: i.canCollapse ? "completed-items-heading" : null,
                listLabel: i.label,
                listTitle: i.title,
                listHref: t.model.attributes.groupID.indexOf("todayPlus") >= 0 ? null : "lists/" + t.model.attributes.listID
            });
        },
        attributes: {
            tabindex: 0,
            "aria-role": "list",
            role: "heading",
            "aria-label": s
        },
        render: function() {
            var e = this
              , t = e.model.get("showHeader");
            if (t) {
                e.el.classList.remove("hidden"),
                c.render.apply(e, arguments);
                var i = e.$(".groupHeader");
                e.renderEmoji(i);
            } else
                e.el.classList.add("hidden");
            e.$el.attr("aria-label", e.model.attributes.label);
        },
        setActive: function(e) {
            var t = this;
            e ? (t.el.classList.add("active"),
            t.el.focus()) : t.el.classList.remove("active");
        },
        handleNavigation: function() {
            var e = this.el.querySelector("a");
            e && e.click();
        }
    });
    return i.applyToClass(d),
    d;
}),
define("views/Tasks/Controllers/TaskListViewClickController", ["application/runtime", "wunderbits/helpers/date", "wunderbits/WBViewController", "helpers/animation", "actions/Factory", "project!core"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = a.lib.extend
      , l = i.prototype;
    return i.extend({
        "implements": {
            "click:checkbox": "_toggleDone",
            "click:star": "_toggleStarred",
            "click:hash": "_handleHashLink",
            "dblclick:title": "_editTitle",
            "dblclick:duedate": "_editDueDate",
            "dblclick:assign": "_editAssignee",
            "dblclick:recurring": "_editRepeat",
            "dblclick:comments": "openComments",
            "click:task": "onClickItem",
            "dblclick:task": "onClickItem"
        },
        ignoreTargets: [".taskItem-titleWrapper-title", ".taskItem-duedate", ".task-recurrence", ".taskItem-assign"],
        initialize: function() {
            var e = this;
            e.starTask = o.starTask(),
            e.completeTask = o.completeTask(),
            l.initialize.apply(e, arguments);
        },
        _getModelForID: function(e) {
            return this.view.collection.get(e);
        },
        _toggleDone: function(t, i) {
            t && t.stopPropagation(),
            t && t.preventDefault();
            var o = this;
            if (!o.view.isAnimating()) {
                var a = t ? r(t.target).closest(".taskItem") : i ? r(i) : null
                  , s = a.attr("rel")
                  , l = n.animateOptions("completion")
                  , c = o.completeTask.toggleCompleted([s], l)[0]
                  , d = !!t;
                if (d) {
                    var u = "analytics:Tasks:" + (c ? "markDone" : "unmarkDone");
                    e.trigger(u, "taskItem");
                }
                l && l.animations.run();
            }
        },
        _toggleStarred: function(t) {
            var i = this;
            if (t && t.stopPropagation(),
            t && t.preventDefault(),
            !i.view.isAnimating()) {
                var o = r(t.target).closest(".taskItem")
                  , a = o.attr("rel")
                  , l = "true" === e.settings.attributes.behavior_star_tasks_to_top
                  , c = {
                    moveToTop: l
                }
                  , d = l && n.animateOptions("starred");
                d && (c = s(c, d)),
                i.starTask.toggleStarred([a], c),
                d && d.animations.run();
            }
        },
        _handleHashLink: function(t) {
            var i, n = this;
            if (t.shiftKey) {
                var o = n.view.$(t.target).text()
                  , a = e.currentSearchTerm || ""
                  , r = a.indexOf(o) >= 0;
                r || "search" !== n.currentFilter ? e.listId && (i = o + " list=" + e.listId) : i = a + " " + o,
                i && (e.trigger("route:search/" + encodeURIComponent(i)),
                t.stopPropagation(),
                t.preventDefault());
            }
        },
        _editTitle: function(t) {
            var i = this;
            if (t.stopPropagation(),
            r(t.target).hasClass("taskItem-duedate"))
                return void i._editDueDate(t);
            if (r(t.target).hasClass("task-recurring"))
                return void i._editRepeat(t);
            var n = r(t.target).closest(".taskItem")
              , o = n.attr("rel")
              , a = i._getModelForID(o);
            a && e.trigger("route:" + a.route("/title/edit"));
        },
        _editDueDate: function(t) {
            var i = this;
            t.stopPropagation();
            var n = r(t.target).closest(".taskItem")
              , o = n.attr("rel")
              , a = i._getModelForID(o);
            a && i.when(i.view.detailPromise).then(function() {
                e.trigger("route:" + a.route("/duedate/edit"));
            });
        },
        _editAssignee: function(t) {
            var i = this;
            t.stopPropagation();
            var n = r(t.target).closest(".taskItem")
              , o = n.attr("rel")
              , a = i._getModelForID(o);
            a && i.when(i.view.detailPromise).then(function() {
                e.trigger("route:" + a.route("/assignee/edit"));
            });
        },
        _editRepeat: function(t) {
            var i = this;
            t.stopPropagation();
            var n = r(t.target).closest(".taskItem")
              , o = n.attr("rel")
              , a = i._getModelForID(o);
            a && i.when(i.view.detailPromise).then(function() {
                e.trigger("route:" + a.route("/duedate/edit")),
                setTimeout(function() {
                    r("#edit-repeat-frequency").focus();
                }, 500);
            });
        },
        openComments: function(t) {
            var i = this;
            t.stopPropagation();
            var n = r(t.target).closest(".taskItem")
              , o = n.attr("rel")
              , a = i._getModelForID(o);
            a && i.when(i.view.detailPromise).then(function() {
                e.trigger("route:" + a.route("/comments/edit"));
            });
        },
        onClickItem: function(t) {
            var i = this
              , n = r(t.target);
            if (n.hasClass("linkout"))
                return void (e.clickedLinkOut = !0);
            if (e.clickedLinkOut = !1,
            t.preventDefault(),
            !i.view.isAnimating()) {
                var o = n.closest(".taskItem")
                  , a = o.attr("rel")
                  , s = i._getModelForID(a);
                if (s) {
                    var l = i.view.collection
                      , c = t.altKey || t.metaKey;
                    c ? l && i.view.taskSelection.toggleSelection(s, l) : t.shiftKey ? l && i.view.taskSelection.updateRange(s, l) : "dblclick" === t.type ? (s.isSelected() && e.trigger("route:" + s.route()),
                    i.view.taskSelection.deselectAllAndSelectActive()) : (i.view.taskSelection.clearSelection(),
                    l && i.view.taskSelection.addToSelection(s, l)),
                    e.trigger("focus:set", "browser");
                }
            }
        }
    });
}),
define("views/Tasks/Controllers/TaskListViewDragController", ["wunderbits/WBViewController", "actions/Factory", "vendor/moment"], function(e, t, i) {
    var n = e.prototype;
    return e.extend({
        "implements": {
            tasksDropped: "_handleTaskDrop",
            drag: "_handleAdjustSelectionOnDrag",
            tasksDroppedToComplete: "_completeTasks",
            tasksDroppedToMoveToList: "_moveTasksToList"
        },
        initialize: function() {
            var e = this;
            e.reparentTask = t.reparentTask(),
            e.repositionTask = t.repositionTask(),
            e.completeTask = t.completeTask(),
            e.taskLookup = t.taskLookup(),
            e.taskDue = t.taskDue(),
            e.assignLimit = t.assignTask().limit,
            n.initialize.apply(e, arguments);
        },
        _getListId: function() {
            return this.view.model.attributes.listID;
        },
        _handleTaskDrop: function(e, t, i) {
            var n = this
              , o = n._getListId();
            n.assignLimit.isUserAllowedToAssign(o, e) ? n.repositionTask.moveTasksBetweenIds(o, e, t, i, {
                fromDND: !0
            }) : n.assignTask.limit.reached();
        },
        _handleAdjustSelectionOnDrag: function(e) {
            var t = this
              , i = t.taskLookup.getTaskModel(e)
              , n = t.view.taskSelection;
            i && !i.isSelected() && (n.clearSelection(),
            n.addToSelection(i, t.view.collection));
        },
        _moveTasksToList: function(e) {
            var t = this
              , n = /todayPlus/
              , o = t.model.attributes.groupID;
            if (n.test(o)) {
                var a = parseInt(o.replace(n, ""), 10)
                  , r = i().sod().add("days", a)
                  , s = !0;
                t.taskDue.setTasksDueAt(e, r, null, null, s),
                t.reparentTask.moveTasksToList(t._getListId(), e);
            }
        },
        _completeTasks: function(e) {
            var t = this;
            t.completeTask.completeTasks(e);
        }
    });
}),
define("views/Tasks/Controllers/TaskListViewItemController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "change:taskAttributes": "updateARIA",
            "change:title": "updateTitle",
            "change:starred": "updateStarred",
            "change:completed": "updateCompleted",
            "change:subtaskCompletion": "updateSubtaskProgress",
            "change:attachmentIcon": "updateAttachmentIcon",
            "change:hasUnreadComments": "updateUnreadCommentsBubble",
            "change:hasComments": "updateCommentsBubble",
            "change:assignee_id": "updateAssigned",
            "change:dateData": "updateDate",
            "change:list_id": "updateDateLabel",
            "change:showSubtaskProgress": "updateSubtaskProgressForAllTasks"
        },
        getSubview: function(e) {
            return this.view.getSubview(e);
        },
        callOnTaskView: function(e, t, i) {
            var n = this
              , o = n.getSubview(e.id);
            o && o[t].apply(o, i || []);
        },
        updateARIA: function(e) {
            this.callOnTaskView(e, "renderAriaLabel");
        },
        updateTitle: function(e) {
            this.callOnTaskView(e, "renderTitle");
        },
        updateStarred: function(e, t) {
            this.callOnTaskView(e, "renderStarredIcon", [t]);
        },
        updateCompleted: function(t, i) {
            var n = this;
            e.state.attributes.inSearchState && n.callOnTaskView(t, "renderCompleted", [i]);
        },
        updateSubtaskProgress: function(e) {
            this.callOnTaskView(e, "renderSubtaskProgress");
        },
        updateAttachmentIcon: function(e) {
            this.callOnTaskView(e, "renderAttachmentIcon");
        },
        updateUnreadCommentsBubble: function(e) {
            this.callOnTaskView(e, "renderUnreadCommentsBubble");
        },
        updateCommentsBubble: function(e) {
            this.callOnTaskView(e, "renderCommentsBubble");
        },
        updateAssigned: function(e) {
            this.callOnTaskView(e, "renderAssignee");
        },
        updateDate: function(e) {
            this.callOnTaskView(e, "updateDueDateAndRepeat");
        },
        updateDateLabel: function(t) {
            "week" === e.listId && this.callOnTaskView(t, "renderDateLabel");
        },
        updateSubtaskProgressForAllTasks: function() {
            var e = this
              , t = e.view
              , i = t.collection;
            i && i.length && i.models.forEach(function(t) {
                e.updateSubtaskProgress(t);
            });
        }
    });
}),
define("views/Tasks/Controllers/TaskItemViewModelController", ["wunderbits/WBViewController"], function(e) {
    return e.extend({
        "implements": {
            "change:selected": "updateSelected"
        },
        updateSelected: function() {
            var e = this;
            e.view.renderSelected(e.model.isSelected());
        }
    });
}),
define("wunderbits/helpers/links", ["./tokenizer"], function(e) {
    var t = /^((ht|f)tps?)?:\/\//;
    return e.extend({
        validateTLD: !0,
        invalidLeadingChars: /[#@\.\/\\]/,
        validationRegExp: /^((ht|f)tps?:\/\/)?([\w\-\.]+\.(\w{2,6}))(:\d+)?/,
        extractionRegExp: /(?:(?:ht|f)tps?:\/\/)?(?:[\w\-\.]+\.(?:[a-z]{2,6}))(?::\d+|\S+)?(?:\/[\S]*|\b)/g,
        createNode: function(e) {
            var i = document.createElement("a");
            i.className = "linkout",
            i.target = "_blank";
            var n = e;
            return t.test(n) || (n = "http://" + n),
            i.href = n,
            i.textContent = e,
            i;
        },
        extractLinks: function(e) {
            return this.extractTokens(e);
        }
    });
}),
define("wunderbits/mixins/LinkingViewMixin", ["../helpers/links", "./DomTreeMixin"], function(e, t) {
    return t.extend({
        renderLinks: function(t) {
            return this.renderTokens(t, e);
        }
    });
}),
define("wunderbits/mixins/EmailLinkingViewMixin", ["../helpers/email", "./DomTreeMixin"], function(e, t) {
    return t.extend({
        renderEmails: function(t) {
            return this.renderTokens(t, e);
        }
    });
}),
define("wunderbits/helpers/tag", ["./tokenizer"], function(e) {
    return e.extend({
        invalidLeadingChars: /[\w\/\?=&]/,
        validationRegExp: /^#[^\s$]+/,
        extractionRegExp: /#[^\s$]+/g,
        validateTLD: !1,
        createNode: function(e) {
            var t = this
              , i = document.createElement("a");
            return i.className = "hash linkout",
            i.className += " " + t.getHashClass(e),
            i.href = "#/search/" + encodeURIComponent(e),
            i.textContent = e,
            i.title = e,
            i;
        },
        getHashClass: function(e) {
            var t = e.replace(/^#/, "hash-");
            return t;
        }
    });
}),
define("wunderbits/mixins/TaggingViewMixin", ["../helpers/tag", "./DomTreeMixin"], function(e, t) {
    return t.extend({
        renderTags: function(t) {
            return this.renderTokens(t, e);
        }
    });
}),
define("/templates/taskItem.js", {
    name: "taskItem",
    data: {
        "1": function() {
            return " checked";
        },
        "3": function(e, t, i, n) {
            var o, a = ' <div class="taskItem-titleMeta-info">';
            return o = t["if"].call(e, e && e.completedDate, {
                name: "if",
                hash: {},
                fn: this.program(4, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            o = t["if"].call(e, e && e.completedBy, {
                name: "if",
                hash: {},
                fn: this.program(6, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + "</div>";
        },
        "4": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return r((o = t.completedDate || e && e.completedDate,
            typeof o === a ? o.call(e, {
                name: "completedDate",
                hash: {},
                data: n
            }) : o)) + " ";
        },
        "6": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return r((o = t.localized || e && e.localized || a,
            o.call(e, "label_by_$", e && e.completedBy, {
                name: "localized",
                hash: {},
                data: n
            })));
        },
        "8": function() {
            return "hidden";
        },
        "10": function() {
            return "has-unread-comments";
        },
        "12": function() {
            return "overdue";
        },
        "14": function(e, t, i, n) {
            var o, a, r = "function";
            return a = t.due_date || e && e.due_date,
            o = typeof a === r ? a.call(e, {
                name: "due_date",
                hash: {},
                data: n
            }) : a,
            o || 0 === o ? o : "";
        },
        "16": function() {
            return "task-recurring";
        },
        "18": function() {
            return ' <div class="avatar no-avatar small"/> ';
        },
        "20": function() {
            return "transparent";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = '<div class="taskItem-body"> <a class="taskItem-checkboxWrapper checkBox';
            return o = t["if"].call(e, e && e.done, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" tabindex="-1" aria-hidden="true"> <span data-key-title="contextual_mark_as_completed">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "task-check", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> <span data-key-title="contextual_mark_as_notcompleted">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "task-checked", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> </a> <div class="taskItem-titleWrapper" tabindex="-1" aria-hidden="true"> <span class="taskItem-titleWrapper-title">' + s((a = t.title || e && e.title,
            typeof a === l ? a.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : a)) + "</span> ",
            o = t["if"].call(e, e && e.done, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' </div> <span class="conversations-wrapper ',
            o = t.unless.call(e, e && e.hasComments, {
                name: "unless",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.hasUnreadComments, {
                name: "if",
                hash: {},
                fn: this.program(10, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" data-key-title="voiceover_task_comments_icon"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "conversations-small", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> <span class="attachment-wrapper ',
            o = t.unless.call(e, e && e.hasAttachment, {
                name: "unless",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" data-key-title="voiceover_task_attachments_icon"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "attachment", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> <span class="taskItem-duedate ',
            o = t["if"].call(e, e && e.overdue, {
                name: "if",
                hash: {},
                fn: this.program(12, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t.unless.call(e, e && e.hasDueDate, {
                name: "unless",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" tabindex="-1" aria-hidden="true"> ',
            o = t["if"].call(e, e && e.due_date, {
                name: "if",
                hash: {},
                fn: this.program(14, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' </span> <span class="recurrence-wrapper ',
            o = t["if"].call(e, e && e.recurrence_type, {
                name: "if",
                hash: {},
                fn: this.program(16, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" tabindex="-1" aria-hidden="true" data-key-title="recurring_icon_title"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "recurrence", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> <a class="taskItem-assign ',
            o = t.unless.call(e, e && e.isAssigned, {
                name: "unless",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" tabindex="-1" aria-hidden="true"> ',
            o = t["if"].call(e, e && e.isAssigned, {
                name: "if",
                hash: {},
                fn: this.program(18, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' </a> <a class="taskItem-star" tabindex="-1" aria-hidden="true"> <span class="star-wrapper ',
            o = t["if"].call(e, e && e.starred, {
                name: "if",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" data-key-title="contextual_mark_as_starred"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "task-star", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> <span class="starred-wrapper ',
            o = t.unless.call(e, e && e.starred, {
                name: "unless",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += '" data-key-title="contextual_mark_as_unstarred"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "task-starred", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> </a> <div class="taskItem-progress ',
            o = t.unless.call(e, e && e.hasSubtasks, {
                name: "unless",
                hash: {},
                fn: this.program(20, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + '"> <span class="taskItem-progress-bar"></span> </div> </div> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/attachment.js", {
    name: "symbols/attachment",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="attachment" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="attachment"> <path d="M13.4075,5.2925 C13.0275,4.9125 12.3675,4.9125 11.9875,5.2925 L10.3075,6.9925 L8.7475,6.9925 C7.8075,6.9925 6.9475,7.3525 6.2675,8.0125 L5.1475,9.1325 C5.0675,9.2325 5.0075,9.3525 5.0075,9.4925 C5.0075,9.6125 5.0675,9.7525 5.1475,9.8325 L7.3075,11.9925 L5.1475,14.1325 C4.9675,14.3325 4.9675,14.6525 5.1475,14.8525 C5.2475,14.9525 5.3875,14.9925 5.5075,14.9925 C5.6475,14.9925 5.7675,14.9525 5.8675,14.8525 L8.0075,12.6925 L10.1675,14.8525 C10.2475,14.9525 10.3875,14.9925 10.5075,14.9925 C10.6475,14.9925 10.7675,14.9525 10.8675,14.8525 L11.9875,13.7325 C12.6475,13.0725 13.0075,12.1925 13.0075,11.2525 L13.0075,9.6925 L14.7075,8.0125 C15.0875,7.6125 15.0875,6.9725 14.7075,6.5925 L13.4075,5.2925 Z M13.9875,7.2925 L12.1675,9.1325 C12.0675,9.2325 12.0075,9.3525 12.0075,9.4925 L12.0075,11.2525 C12.0075,11.9125 11.7475,12.5525 11.2875,13.0125 L10.5075,13.7925 L6.2075,9.4925 L6.9875,8.7125 C7.4475,8.2525 8.0875,7.9925 8.7475,7.9925 L10.5075,7.9925 C10.6475,7.9925 10.7675,7.9325 10.8675,7.8325 L12.7075,6.0125 L13.9875,7.2925 Z" id="Q"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/conversations-small.js", {
    name: "symbols/conversations-small",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="conversations-small rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g class="outlined"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.26 5.08,14.06 5.26,13.96 C5.78,13.68 6.02,13.3 6,12.8 C6,12.48 5.84,12.16 5.64,11.76 C5.36,11.18 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.86 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z M10,6 C7.8,6 6,7.56 6,9.5 C6,10.24 6.28,10.78 6.54,11.32 C6.78,11.8 7,12.26 7,12.78 C7,13.22 6.9,13.62 6.7,13.96 C7.64,13.78 8.12,13.06 8.14,13.02 C8.26,12.84 8.5,12.76 8.7,12.82 C9.14,12.94 9.56,13 10,13 C12.2,13 14,11.42 14,9.5 C14,7.56 12.2,6 10,6 L10,6 Z"></path> </g> <g class="filled"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.28 5.08,14.08 5.26,13.98 C5.78,13.68 6.02,13.32 6,12.8 C6,12.5 5.84,12.16 5.64,11.78 C5.36,11.2 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.88 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z" opacity="0"></path> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/recurrence.js", {
    name: "symbols/recurrence",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="recurrence" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="recurrence"> <path d="M17.5193115,10 C17.2393115,10 16.9993115,10.2 16.9793115,10.46 C16.7393115,14.12 13.6793115,17 10.0193115,17 C6.15931146,17 3.01931146,13.86 3.01931146,10 C3.01931146,6.14 6.15931146,3 10.0193115,3 C13.3393115,3 15.2593115,5.48 16.3993115,6.98 C16.4193115,6.98 16.4193115,7 16.4193115,7 L12.9793115,7 C12.7193115,7 12.4793115,7.22 12.4793115,7.5 C12.4793115,7.78 12.7193115,8 12.9793115,8 C17.8393115,8 17.5593115,8.02 17.6793115,7.96 C17.8593115,7.88 17.9793115,7.7 17.9793115,7.5 L17.9793115,2.5 C17.9793115,2.22 17.7593115,2 17.4793115,2 C17.2193115,2 16.9793115,2.22 16.9793115,2.5 L16.9793115,6.08 C15.7793115,4.52 13.6193115,2 10.0193115,2 C5.59931146,2 2.01931146,5.58 2.01931146,10 C2.01931146,14.42 5.59931146,18 10.0193115,18 C14.1993115,18 17.6993115,14.72 17.9793115,10.54 C17.9993115,10.26 17.7993115,10.02 17.5193115,10 L17.5193115,10 Z M9.47931146,5 C9.21931146,5 8.97931146,5.22 8.97931146,5.5 L8.97931146,10.5 C8.97931146,10.78 9.21931146,11 9.47931146,11 L13.4793115,11 C13.7593115,11 13.9793115,10.78 13.9793115,10.5 C13.9793115,10.22 13.7593115,10 13.4793115,10 L9.97931146,10 L9.97931146,5.5 C9.97931146,5.22 9.75931146,5 9.47931146,5 L9.47931146,5 Z" id="f"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/task-star.js", {
    name: "symbols/task-star",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z"></path> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/task-starred.js", {
    name: "symbols/task-starred",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="22px" height="44px" viewBox="0 0 22 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M0,0l0,40.5c0,0.28 0.22,0.42 0.48,0.32l10.04,-3.64c0.28,-0.1 0.7,-0.1 0.96,0l10.04,3.64c0.28,0.1 0.48,-0.04 0.48,-0.32l0,-40.5l-22,0ZM14.46,24.08l1.68,5.26c0.08,0.18 0,0.38 -0.16,0.5c-0.14,0.1 -0.36,0.1 -0.52,0l-4.46,-3.24l-4.46,3.24c-0.08,0.06 -0.18,0.1 -0.28,0.1c-0.08,0 -0.18,-0.04 -0.24,-0.1c-0.16,-0.12 -0.24,-0.32 -0.16,-0.5l1.68,-5.26l-4.46,-3.24c-0.14,-0.12 -0.22,-0.32 -0.16,-0.52c0.08,-0.18 0.24,-0.32 0.44,-0.32l5.52,0l1.68,-5.24c0.14,-0.36 0.74,-0.36 0.88,0l1.7,5.24l5.5,0c0.2,0 0.36,0.14 0.44,0.32c0.06,0.2 -0.02,0.4 -0.16,0.52l-4.46,3.24Z"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/task-check.js", {
    name: "symbols/task-check",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="task-check" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-2.871,0 -8.129,0 -11,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,2.871 0,8.129 0,11c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c2.871,0 8.129,0 11,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-2.871 0,-8.129 0,-11Z" style="fill:none;stroke-width:1px"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/task-checked.js", {
    name: "symbols/task-checked",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="task-checked" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.5,14c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.231 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c2.964,-4.9 5.989,-8.792 9.749,-12.553c0.196,-0.195 0.512,-0.195 0.708,0c0.195,0.196 0.195,0.512 0,0.708c-3.838,3.837 -6.899,7.817 -9.924,12.902c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004"/> <path d="M15.5,18l-11,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-11c0,-1.379 1.121,-2.5 2.5,-2.5l10,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,11c0,0.827 0.673,1.5 1.5,1.5l11,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-9.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,9.5c0,1.379 -1.121,2.5 -2.5,2.5"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/styles/taskItem.js", {
    name: "taskItem",
    data: '.taskItem{height:47px;list-style:none;}.taskItem.active .taskItem-body,.taskItem.selected .taskItem-body{background:#e1f2fe}.taskItem.blur{filter:blur(50px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}.taskItem.collapsed{height:0;opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);overflow:hidden}.taskItem.first-task-position{padding-top:46px !important}.taskItem.first-task-position-next{padding-bottom:46px !important}.taskItem.animate-up{height:0;opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);overflow:hidden !important}.taskItem.animate-down{height:47px !important;opacity:1;-ms-filter:none;filter:none}.taskItem.animate-empty-task{margin-top:40px}.taskItem.animate-empty-task-close{margin-top:0}.taskItem.fall-out{z-index:5 !important;margin-top:65px;opacity:0 !important;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)" !important;filter:alpha(opacity=0) !important;background:#f00 !important}.taskItem.return-up{margin-top:-55px;opacity:0 !important;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)" !important;filter:alpha(opacity=0) !important}.taskItem.fall-in{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}.taskItem.scale-up{-webkit-transform:scale(1.1);-moz-transform:scale(1.1);-o-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.taskItem.dragging{z-index:9999 !important;width:300px;overflow:visible}.taskItem.done{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);list-style:none;}.taskItem.done .taskItem-titleMeta-info{font-size:10px;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.taskItem.done .taskItem-titleWrapper-title{text-decoration:line-through}.taskItem-body{background:#fff;list-style:none;height:46px;-webkit-border-radius:3px;border-radius:3px;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;padding-left:4px;padding-right:4px;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;position:relative;}.taskItem-body .taskItem-checkboxWrapper{padding-left:8px;padding-right:8px;height:20px}.taskItem-body .starred-wrapper{width:22px;padding-left:4px;padding-right:4px;fill:#d74e48}.taskItem-body .star-wrapper{padding-left:6px;padding-right:6px;fill:rgba(0,0,0,0.3)}.taskItem-body .recurrence-wrapper{fill:#328ad6;height:14px;padding-left:2px;padding-right:2px;}.taskItem-body .recurrence-wrapper svg{width:14px;height:14px}.taskItem-body .recurrence-wrapper.overdue{fill:#b3312d;}.taskItem-body .recurrence-wrapper.overdue:hover{cursor:default}.taskItem-body .recurrence-wrapper.overdue{color:#b3312d}.taskItem-body .conversations-wrapper{fill:rgba(0,0,0,0.3);height:20px;}.taskItem-body .conversations-wrapper.has-unread-comments svg g:first-child{display:none}.taskItem-body .conversations-wrapper.has-unread-comments svg g:last-child path{opacity:1;-ms-filter:none;filter:none;fill:#328ad6}.taskItem-body .attachment-wrapper{fill:rgba(0,0,0,0.3);width:18px;height:20px}.taskItem-titleWrapper{white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;font-size:15px;font-weight:500;color:#262626;cursor:default;position:relative;top:-1px;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}.taskItem-titleWrapper a{color:#328ad6;}.taskItem-titleWrapper a.hash-blocked,.taskItem-titleWrapper a.hash-bug,.taskItem-titleWrapper a.hash-critical,.taskItem-titleWrapper a.hash-more-information,.taskItem-titleWrapper a.hash-regression{color:#d74e48}.taskItem-titleWrapper a.hash-merged{color:#f88017}.taskItem-titleWrapper a.hash-in-qa{color:#67ae2b}.taskItem-titleWrapper a.hash-in-progress,.taskItem-titleWrapper a.hash-in-review{color:#e29600}.taskItem-titleWrapper a.hash-blocked,.taskItem-titleWrapper a.hash-critical,.taskItem-titleWrapper a.hash-more-information{font-weight:bold}.taskItem-progress{position:absolute;top:0;left:0;right:0;height:100%;opacity:1;-ms-filter:none;filter:none;-webkit-transition:opacity 225ms ease;-moz-transition:opacity 225ms ease;-o-transition:opacity 225ms ease;-ms-transition:opacity 225ms ease;transition:opacity 225ms ease;pointer-events:none}.taskItem-progress-bar{z-index:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;top:0;height:100%;width:0%;-webkit-transition:width 225ms ease;-moz-transition:width 225ms ease;-o-transition:width 225ms ease;-ms-transition:width 225ms ease;transition:width 225ms ease;border-right-width:1px;border-right-style:solid;}.background-01 .taskItem-progress-bar{background:rgba(115,62,39,0.1)}.background-02 .taskItem-progress-bar{background:rgba(83,127,112,0.1)}.background-03 .taskItem-progress-bar{background:rgba(83,97,127,0.1)}.background-04 .taskItem-progress-bar{background:rgba(71,143,138,0.1)}.background-05 .taskItem-progress-bar{background:rgba(168,109,67,0.1)}.background-06 .taskItem-progress-bar{background:rgba(102,137,100,0.1)}.background-07 .taskItem-progress-bar{background:rgba(102,152,68,0.1)}.background-08 .taskItem-progress-bar{background:rgba(4,131,183,0.1)}.background-09 .taskItem-progress-bar{background:rgba(42,108,136,0.1)}.background-10 .taskItem-progress-bar{background:rgba(104,55,87,0.1)}.background-11 .taskItem-progress-bar{background:rgba(51,78,131,0.1)}.background-12 .taskItem-progress-bar{background:rgba(58,113,115,0.1)}.background-13 .taskItem-progress-bar{background:rgba(94,140,156,0.1)}.background-14 .taskItem-progress-bar{background:rgba(47,102,118,0.1)}.background-15 .taskItem-progress-bar{background:rgba(113,175,140,0.1)}.background-16 .taskItem-progress-bar{background:rgba(188,74,58,0.1)}.background-17 .taskItem-progress-bar{background:rgba(89,89,89,0.1)}.background-18 .taskItem-progress-bar{background:rgba(87,87,87,0.1)}.background-19 .taskItem-progress-bar{background:rgba(184,109,130,0.1)}.background-20 .taskItem-progress-bar{background:rgba(96,55,57,0.1)}.background-21 .taskItem-progress-bar{background:rgba(166,85,65,0.1)}.background-22 .taskItem-progress-bar{background:rgba(58,127,147,0.1)}.background-23 .taskItem-progress-bar{background:rgba(87,64,51,0.1)}.background-24 .taskItem-progress-bar{background:rgba(189,174,136,0.1)}.background-25 .taskItem-progress-bar{background:rgba(14,145,197,0.1)}.background-26 .taskItem-progress-bar{background:rgba(118,90,152,0.1)}.background-27 .taskItem-progress-bar{background:rgba(193,91,61,0.1)}.background-28 .taskItem-progress-bar{background:rgba(165,126,136,0.1)}.background-29 .taskItem-progress-bar{background:rgba(191,117,85,0.1)}.background-30 .taskItem-progress-bar{background:rgba(5,95,235,0.1)}.background-01 .taskItem-progress-bar{border-color:rgba(115,62,39,0.2)}.background-02 .taskItem-progress-bar{border-color:rgba(83,127,112,0.2)}.background-03 .taskItem-progress-bar{border-color:rgba(83,97,127,0.2)}.background-04 .taskItem-progress-bar{border-color:rgba(71,143,138,0.2)}.background-05 .taskItem-progress-bar{border-color:rgba(168,109,67,0.2)}.background-06 .taskItem-progress-bar{border-color:rgba(102,137,100,0.2)}.background-07 .taskItem-progress-bar{border-color:rgba(102,152,68,0.2)}.background-08 .taskItem-progress-bar{border-color:rgba(4,131,183,0.2)}.background-09 .taskItem-progress-bar{border-color:rgba(42,108,136,0.2)}.background-10 .taskItem-progress-bar{border-color:rgba(104,55,87,0.2)}.background-11 .taskItem-progress-bar{border-color:rgba(51,78,131,0.2)}.background-12 .taskItem-progress-bar{border-color:rgba(58,113,115,0.2)}.background-13 .taskItem-progress-bar{border-color:rgba(94,140,156,0.2)}.background-14 .taskItem-progress-bar{border-color:rgba(47,102,118,0.2)}.background-15 .taskItem-progress-bar{border-color:rgba(113,175,140,0.2)}.background-16 .taskItem-progress-bar{border-color:rgba(188,74,58,0.2)}.background-17 .taskItem-progress-bar{border-color:rgba(89,89,89,0.2)}.background-18 .taskItem-progress-bar{border-color:rgba(87,87,87,0.2)}.background-19 .taskItem-progress-bar{border-color:rgba(184,109,130,0.2)}.background-20 .taskItem-progress-bar{border-color:rgba(96,55,57,0.2)}.background-21 .taskItem-progress-bar{border-color:rgba(166,85,65,0.2)}.background-22 .taskItem-progress-bar{border-color:rgba(58,127,147,0.2)}.background-23 .taskItem-progress-bar{border-color:rgba(87,64,51,0.2)}.background-24 .taskItem-progress-bar{border-color:rgba(189,174,136,0.2)}.background-25 .taskItem-progress-bar{border-color:rgba(14,145,197,0.2)}.background-26 .taskItem-progress-bar{border-color:rgba(118,90,152,0.2)}.background-27 .taskItem-progress-bar{border-color:rgba(193,91,61,0.2)}.background-28 .taskItem-progress-bar{border-color:rgba(165,126,136,0.2)}.background-29 .taskItem-progress-bar{border-color:rgba(191,117,85,0.2)}.background-30 .taskItem-progress-bar{border-color:rgba(5,95,235,0.2)}.taskItem-progress-bar.completed{border-right:none}.taskItem-duedate{font-size:12px;color:#328ad6;max-width:200px;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;}.taskItem-duedate.overdue{color:#b3312d}.attachment-wrapper,.conversations-wrapper{padding-left:2px;padding-right:2px}.taskItem-duedate,.taskItem-assign{padding-left:4px;padding-right:4px}.clone-title{color:#262626;}.clone-title a{color:#328ad6}@media all and (max-width:550px){.taskItem a.hash{width:1ch;display:-webkit-inline-box;display:-moz-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-box;display:inline-flex;overflow:hidden}}'
}),
define("/styles/checkBox.js", {
    name: "checkBox",
    data: ".checkBox .detail-check,.checkBox .task-check{stroke:rgba(0,0,0,0.35)}.checkBox .detail-checked,.checkBox .task-checked{fill:rgba(0,0,0,0.35);display:none}.checkBox.checked .detail-check,.checkBox.checked .task-check{display:none}.checkBox.checked .detail-checked,.checkBox.checked .task-checked{display:block}"
}),
define("/styles/_animation.js", {
    name: "_animation",
    data: 'body.animate #lists li.animate{-webkit-transition:none !important;-moz-transition:none !important;-o-transition:none !important;-ms-transition:none !important;transition:none !important}body.animate #lists li.animate-up,body.animate #lists li.animate-down{-webkit-transition:300ms height !important;-moz-transition:300ms height !important;-o-transition:300ms height !important;-ms-transition:300ms height !important;transition:300ms height !important}body.animate #lists .filters-collection li.touch-edit-disabled{-webkit-transition:200ms opacity linear !important;-moz-transition:200ms opacity linear !important;-o-transition:200ms opacity linear !important;-ms-transition:200ms opacity linear !important;transition:200ms opacity linear !important}body.animate #tasks .addTask .addTask-meta{-webkit-transition:opacity 200ms linear;-moz-transition:opacity 200ms linear;-o-transition:opacity 200ms linear;-ms-transition:opacity 200ms linear;transition:opacity 200ms linear;}body.animate #tasks .addTask .addTask-meta .addTask-meta-date.nlp{-webkit-animation:dateWiggle 200ms linear;-moz-animation:dateWiggle 200ms linear;-o-animation:dateWiggle 200ms linear;-ms-animation:dateWiggle 200ms linear;animation:dateWiggle 200ms linear}body.animate #tasks .addTask .nlp-feedback .highlight{-webkit-animation:nlpHighlight 150ms ease-in;-moz-animation:nlpHighlight 150ms ease-in;-o-animation:nlpHighlight 150ms ease-in;-ms-animation:nlpHighlight 150ms ease-in;animation:nlpHighlight 150ms ease-in}body.animate #tasks .taskItem.blur{-webkit-transition:295ms all linear;-moz-transition:295ms all linear;-o-transition:295ms all linear;-ms-transition:295ms all linear;transition:295ms all linear}body.animate #tasks .taskItem.animate-down,body.animate #tasks .taskItem.animate-up{-webkit-transition:400ms all !important;-moz-transition:400ms all !important;-o-transition:400ms all !important;-ms-transition:400ms all !important;transition:400ms all !important}body.animate #tasks .taskItem.animate-empty-task{-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;-ms-transition:all 300ms;transition:all 300ms}body.animate #tasks .taskItem.animate-empty-task-close{-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;-ms-transition:all 300ms;transition:all 300ms}body.animate #tasks .taskItem.fall-out{-webkit-transition:all 400ms cubic-bezier(0.57, -0.22, 0.375, 1.055);-moz-transition:all 400ms cubic-bezier(0.57, -0.22, 0.375, 1.055);-o-transition:all 400ms cubic-bezier(0.57, -0.22, 0.375, 1.055);-ms-transition:all 400ms cubic-bezier(0.57, -0.22, 0.375, 1.055);transition:all 400ms cubic-bezier(0.57, -0.22, 0.375, 1.055)}body.animate #tasks .taskItem.return-up{-webkit-transition:all 300ms cubic-bezier(0.35, -0.6, 0.535, 1.045);-moz-transition:all 300ms cubic-bezier(0.35, -0.6, 0.535, 1.045);-o-transition:all 300ms cubic-bezier(0.35, -0.6, 0.535, 1.045);-ms-transition:all 300ms cubic-bezier(0.35, -0.6, 0.535, 1.045);transition:all 300ms cubic-bezier(0.35, -0.6, 0.535, 1.045)}body.animate #tasks .taskItem.fall-in{-webkit-transition:opacity 200ms ease-out;-moz-transition:opacity 200ms ease-out;-o-transition:opacity 200ms ease-out;-ms-transition:opacity 200ms ease-out;transition:opacity 200ms ease-out}body.animate #tasks .taskItem.pop-in-start{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}body.animate #tasks .taskItem.pop-in{opacity:1;-ms-filter:none;filter:none;-webkit-transition:opacity 100ms ease-in-out;-moz-transition:opacity 100ms ease-in-out;-o-transition:opacity 100ms ease-in-out;-ms-transition:opacity 100ms ease-in-out;transition:opacity 100ms ease-in-out}body.animate #tasks .taskItem .taskItem-duedate.nlp{-webkit-animation:datePop 350ms ease-in-out;-moz-animation:datePop 350ms ease-in-out;-o-animation:datePop 350ms ease-in-out;-ms-animation:datePop 350ms ease-in-out;animation:datePop 350ms ease-in-out}body.animate.explorer #tasks .taskItem.pop-in{opacity:1 !important;-ms-filter:none;filter:none}body.animate .taskItem.dragging .badge{-webkit-transition:right 200ms ease-out;-moz-transition:right 200ms ease-out;-o-transition:right 200ms ease-out;-ms-transition:right 200ms ease-out;transition:right 200ms ease-out}body.animate .taskItem.dragging .taskItem-body{-webkit-transition:left 200ms ease-out;-moz-transition:left 200ms ease-out;-o-transition:left 200ms ease-out;-ms-transition:left 200ms ease-out;transition:left 200ms ease-out}body.animate #detail .body{-webkit-transition:margin 150ms !important;-moz-transition:margin 150ms !important;-o-transition:margin 150ms !important;-ms-transition:margin 150ms !important;transition:margin 150ms !important}body.animate #detail .files li.uploading{-webkit-animation:fileBounceIn 400ms ease;-moz-animation:fileBounceIn 400ms ease;-o-animation:fileBounceIn 400ms ease;-ms-animation:fileBounceIn 400ms ease;animation:fileBounceIn 400ms ease}body.animate #detail .files li.deleting,body.animate #detail .files li.image.deleting{-webkit-transition:none !important;-moz-transition:none !important;-o-transition:none !important;-ms-transition:none !important;transition:none !important;-webkit-animation:fileBounceOut 400ms ease;-moz-animation:fileBounceOut 400ms ease;-o-animation:fileBounceOut 400ms ease;-ms-animation:fileBounceOut 400ms ease;animation:fileBounceOut 400ms ease;height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}body.animate #detail .files li.normal-preview.deleting{-webkit-animation:fileImageBounceOut 400ms ease;-moz-animation:fileImageBounceOut 400ms ease;-o-animation:fileImageBounceOut 400ms ease;-ms-animation:fileImageBounceOut 400ms ease;animation:fileImageBounceOut 400ms ease}body.animate #detail .file li .bar{-webkit-transition:width 200ms ease;-moz-transition:width 200ms ease;-o-transition:width 200ms ease;-ms-transition:width 200ms ease;transition:width 200ms ease}body.animate .dialog-wrapper .dialog{will-change:transform;-webkit-animation:dialogSlideIn 250ms cubic-bezier(.175,.885,.32,1.275);-moz-animation:dialogSlideIn 250ms cubic-bezier(.175,.885,.32,1.275);-o-animation:dialogSlideIn 250ms cubic-bezier(.175,.885,.32,1.275);-ms-animation:dialogSlideIn 250ms cubic-bezier(.175,.885,.32,1.275);animation:dialogSlideIn 250ms cubic-bezier(.175,.885,.32,1.275);}body.animate .dialog-wrapper .dialog .show-delete-wrapper{-webkit-transition:all 200ms ease !important;-moz-transition:all 200ms ease !important;-o-transition:all 200ms ease !important;-ms-transition:all 200ms ease !important;transition:all 200ms ease !important;}body.animate .dialog-wrapper .dialog .show-delete-wrapper.invisible{-webkit-transition:all 400ms ease !important;-moz-transition:all 400ms ease !important;-o-transition:all 400ms ease !important;-ms-transition:all 400ms ease !important;transition:all 400ms ease !important}body.animate .dialog-wrapper .dialog.addList{-webkit-animation:dialogSlideIn 250ms ease;-moz-animation:dialogSlideIn 250ms ease;-o-animation:dialogSlideIn 250ms ease;-ms-animation:dialogSlideIn 250ms ease;animation:dialogSlideIn 250ms ease}body.animate .dialog-wrapper .dialog .slide{-webkit-transition:all 200ms linear;-moz-transition:all 200ms linear;-o-transition:all 200ms linear;-ms-transition:all 200ms linear;transition:all 200ms linear}body.animate .dialog-wrapper .dialog .add-pro-teammate{-webkit-transition:opacity 200ms linear;-moz-transition:opacity 200ms linear;-o-transition:opacity 200ms linear;-ms-transition:opacity 200ms linear;transition:opacity 200ms linear}body.animate .dialog-wrapper .dialog .height-adjust{-webkit-transition:height 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275);-moz-transition:height 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275);-o-transition:height 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275);-ms-transition:height 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275);transition:height 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}body.animate .dialog-wrapper .dialog .amount{-webkit-transition:margin 100ms linear;-moz-transition:margin 100ms linear;-o-transition:margin 100ms linear;-ms-transition:margin 100ms linear;transition:margin 100ms linear}body.animate .dialog-wrapper .dialog .remove-member{-webkit-animation:fileBounceOut 400ms ease;-moz-animation:fileBounceOut 400ms ease;-o-animation:fileBounceOut 400ms ease;-ms-animation:fileBounceOut 400ms ease;animation:fileBounceOut 400ms ease}body.animate .datepicker ol.months{-webkit-transition:all 150ms linear;-moz-transition:all 150ms linear;-o-transition:all 150ms linear;-ms-transition:all 150ms linear;transition:all 150ms linear}body.animate .drag-clone.drag-clone-reset{-webkit-transition:height 200ms, width 200ms, color 200ms, background 200ms, padding 200ms, box-shadow 200ms, text-shadow 200ms, border-top 200ms;-moz-transition:height 200ms, width 200ms, color 200ms, background 200ms, padding 200ms, box-shadow 200ms, text-shadow 200ms, border-top 200ms;-o-transition:height 200ms, width 200ms, color 200ms, background 200ms, padding 200ms, box-shadow 200ms, text-shadow 200ms, border-top 200ms;-ms-transition:height 200ms, width 200ms, color 200ms, background 200ms, padding 200ms, box-shadow 200ms, text-shadow 200ms, border-top 200ms;transition:height 200ms, width 200ms, color 200ms, background 200ms, padding 200ms, box-shadow 200ms, text-shadow 200ms, border-top 200ms}body.animate.nodewebkit.platform-windows .dialog-wrapper,body.animate.nodewebkit.platform-windows .dialog,body.animate.nodewebkit.platform-windows .popover{-webkit-animation:none !important;-moz-animation:none !important;-o-animation:none !important;-ms-animation:none !important;animation:none !important;-webkit-transition:none !important;-moz-transition:none !important;-o-transition:none !important;-ms-transition:none !important;transition:none !important}#wunderlist-base .main-interface{overflow:hidden;}#wunderlist-base .main-interface #detail.animated{-webkit-transition:100ms width ease;-moz-transition:100ms width ease;-o-transition:100ms width ease;-ms-transition:100ms width ease;transition:100ms width ease}@media all and (max-width:550px){#wunderlist-base .main-interface{overflow:hidden;}#wunderlist-base .main-interface #detail.animated{-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform}}@-moz-keyframes fileBounceIn{0%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}60%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);-moz-transform:scale(.95);-o-transform:scale(.95);-ms-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-webkit-keyframes fileBounceIn{0%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}60%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);-moz-transform:scale(.95);-o-transform:scale(.95);-ms-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-o-keyframes fileBounceIn{0%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}60%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);-moz-transform:scale(.95);-o-transform:scale(.95);-ms-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-ms-keyframes fileBounceIn{0%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}60%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);-moz-transform:scale(.95);-o-transform:scale(.95);-ms-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@keyframes fileBounceIn{0%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}60%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);-moz-transform:scale(.95);-o-transform:scale(.95);-ms-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-moz-keyframes fileBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:60px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:60px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-webkit-keyframes fileBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:60px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:60px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-o-keyframes fileBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:60px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:60px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-ms-keyframes fileBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:60px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:60px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@keyframes fileBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:60px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:60px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-moz-keyframes fileImageBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:152px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:152px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-webkit-keyframes fileImageBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:152px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:152px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-o-keyframes fileImageBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:152px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:152px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-ms-keyframes fileImageBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:152px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:152px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@keyframes fileImageBounceOut{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1);height:152px}20%{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0);height:152px}100%{height:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}}@-moz-keyframes dialogSlideIn{0%{-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-o-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes dialogSlideIn{0%{-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-o-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}}@-o-keyframes dialogSlideIn{0%{-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-o-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}}@-ms-keyframes dialogSlideIn{0%{-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-o-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}}@keyframes dialogSlideIn{0%{-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-o-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}}@-moz-keyframes dateWiggle{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}33%{-webkit-transform:rotate(25deg);-moz-transform:rotate(25deg);-o-transform:rotate(25deg);-ms-transform:rotate(25deg);transform:rotate(25deg)}66%{-webkit-transform:rotate(-25deg);-moz-transform:rotate(-25deg);-o-transform:rotate(-25deg);-ms-transform:rotate(-25deg);transform:rotate(-25deg)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@-webkit-keyframes dateWiggle{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}33%{-webkit-transform:rotate(25deg);-moz-transform:rotate(25deg);-o-transform:rotate(25deg);-ms-transform:rotate(25deg);transform:rotate(25deg)}66%{-webkit-transform:rotate(-25deg);-moz-transform:rotate(-25deg);-o-transform:rotate(-25deg);-ms-transform:rotate(-25deg);transform:rotate(-25deg)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@-o-keyframes dateWiggle{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}33%{-webkit-transform:rotate(25deg);-moz-transform:rotate(25deg);-o-transform:rotate(25deg);-ms-transform:rotate(25deg);transform:rotate(25deg)}66%{-webkit-transform:rotate(-25deg);-moz-transform:rotate(-25deg);-o-transform:rotate(-25deg);-ms-transform:rotate(-25deg);transform:rotate(-25deg)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@-ms-keyframes dateWiggle{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}33%{-webkit-transform:rotate(25deg);-moz-transform:rotate(25deg);-o-transform:rotate(25deg);-ms-transform:rotate(25deg);transform:rotate(25deg)}66%{-webkit-transform:rotate(-25deg);-moz-transform:rotate(-25deg);-o-transform:rotate(-25deg);-ms-transform:rotate(-25deg);transform:rotate(-25deg)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@keyframes dateWiggle{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}33%{-webkit-transform:rotate(25deg);-moz-transform:rotate(25deg);-o-transform:rotate(25deg);-ms-transform:rotate(25deg);transform:rotate(25deg)}66%{-webkit-transform:rotate(-25deg);-moz-transform:rotate(-25deg);-o-transform:rotate(-25deg);-ms-transform:rotate(-25deg);transform:rotate(-25deg)}100%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}}@-moz-keyframes datePop{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}33%{-webkit-transform:scale(1.25);-moz-transform:scale(1.25);-o-transform:scale(1.25);-ms-transform:scale(1.25);transform:scale(1.25)}66%{-webkit-transform:scale(.8);-moz-transform:scale(.8);-o-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-webkit-keyframes datePop{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}33%{-webkit-transform:scale(1.25);-moz-transform:scale(1.25);-o-transform:scale(1.25);-ms-transform:scale(1.25);transform:scale(1.25)}66%{-webkit-transform:scale(.8);-moz-transform:scale(.8);-o-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-o-keyframes datePop{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}33%{-webkit-transform:scale(1.25);-moz-transform:scale(1.25);-o-transform:scale(1.25);-ms-transform:scale(1.25);transform:scale(1.25)}66%{-webkit-transform:scale(.8);-moz-transform:scale(.8);-o-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-ms-keyframes datePop{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}33%{-webkit-transform:scale(1.25);-moz-transform:scale(1.25);-o-transform:scale(1.25);-ms-transform:scale(1.25);transform:scale(1.25)}66%{-webkit-transform:scale(.8);-moz-transform:scale(.8);-o-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@keyframes datePop{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}33%{-webkit-transform:scale(1.25);-moz-transform:scale(1.25);-o-transform:scale(1.25);-ms-transform:scale(1.25);transform:scale(1.25)}66%{-webkit-transform:scale(.8);-moz-transform:scale(.8);-o-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}100%{-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}@-moz-keyframes nlpHighlight{0%{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}100%{opacity:1;-ms-filter:none;filter:none}}@-webkit-keyframes nlpHighlight{0%{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}100%{opacity:1;-ms-filter:none;filter:none}}@-o-keyframes nlpHighlight{0%{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}100%{opacity:1;-ms-filter:none;filter:none}}@-ms-keyframes nlpHighlight{0%{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}100%{opacity:1;-ms-filter:none;filter:none}}@keyframes nlpHighlight{0%{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}100%{opacity:1;-ms-filter:none;filter:none}}'
}),
define("views/Tasks/TaskItemView", ["application/runtime", "actions/Factory", "vendor/moment", "wunderbits/helpers/date", "wunderbits/BaseView", "wunderbits/WBViewPresenter", "views/AvatarView", "views/Tasks/Controllers/TaskItemViewModelController", "wunderbits/mixins/LinkingViewMixin", "wunderbits/mixins/EmailLinkingViewMixin", "wunderbits/mixins/TaggingViewMixin", "wunderbits/mixins/UnicodeEmojiViewMixin", "helpers/domtools", "template!taskItem", "partial!symbols/attachment", "partial!symbols/conversations-small", "partial!symbols/recurrence", "partial!symbols/task-star", "partial!symbols/task-starred", "partial!symbols/task-check", "partial!symbols/task-checked", "style!taskItem", "style!checkBox", "style!_animation"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C) {
    var T = o.prototype
      , S = a.prototype
      , L = a.extend({
        template: p,
        "implements": [s],
        renderData: {
            completedBy: C,
            completedDate: C,
            done: C,
            hasAttachment: C,
            hasComments: C,
            hasDueDate: C,
            hasSubtasks: C,
            hasUnreadComments: C,
            isAssigned: C,
            recurrence_type: C,
            starred: C,
            subtaskProgressEnabled: C,
            title: C
        },
        formatData: function(e) {
            var t = this
              , i = t.model
              , n = i.attributes;
            if (e.title = n.title,
            e.recurrence_type = "none" === n.recurrence_type ? !1 : n.recurrence_type,
            e.hasAttachment = i.hasAttachment(),
            e.hasComments = i.hasComments(),
            e.hasUnreadComments = i.hasUnreadComments(),
            e.done = n.completed,
            e.starred = n.starred,
            e.hasSubtasks = i.hasSubtasks(),
            e.hasDueDate = i.hasDueDate(),
            e.isAssigned = i.isAssigned(),
            n.completed_at) {
                e.completedDate = t.model.getHumanFormattedDates().completed_on;
                var o = n.completed_by_id
                  , a = t.userLookup.getUserModel(o);
                e.completedBy = a && a.attributes.name;
            }
            return e;
        },
        tagName: "li",
        attributes: {
            tabindex: 0
        },
        className: "taskItem",
        styles: [k, x, y],
        events: {
            "click .taskItem-duedate, .recurrence-wrapper": "_ignoreDetailCall"
        },
        initialize: function() {
            var i = this;
            i.listLookup = t.listLookup(),
            i.userLookup = t.userLookup(),
            T.initialize.apply(i, arguments),
            i.createObserveBindings(),
            i.bindTo(e.settings, "change:date_format", function() {
                i.updateDueDateAndRepeat();
            }),
            ["selected"].forEach(function(e) {
                e = "change:" + e,
                i.bindTo(i.model["transient"], e, function() {
                    i.trigger(e);
                });
            });
        },
        render: function() {
            var e, t = this;
            return t.model && !t.destroyed ? (S.render.call(t, t.formatData(t.renderData)),
            e = t.el,
            t.$title = t.$(".taskItem-titleWrapper-title"),
            m.setAttribute(e, "rel", t.model.id),
            m.setAttribute(e, "aria-label", t.model.getARIAString()),
            t.renderTitle(),
            t.model.attributes.completed && e.classList.add("done"),
            t.renderAssignee(),
            t.renderSubtaskProgress(),
            t.renderSelected(),
            t.updateDueDateAndRepeat(),
            t) : void 0;
        },
        renderAriaLabel: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                m.setAttribute(e.el, "aria-label", e.model.getARIAString());
            });
        },
        renderDateLabel: function() {
            var t = this;
            t.requestAnimationFrame(function() {
                var o = t.model.attributes.due_date;
                if (o) {
                    var a, r = i(n.convertServerDateToLocalDate(o)).sod(), s = t.$(".taskItem-duedate"), l = i().sod(), c = "week" === e.listId, d = r.diff(l, "days") < 0;
                    s.toggleClass("overdue", d),
                    t.model.attributes.recurrence_type && t.$(".recurrence-wrapper").toggleClass("overdue", d),
                    a = c ? t.getWeekViewLabel() : n.humanizeDueDate(r, e.settings.attributes.date_format),
                    s.html(a),
                    c && t.renderEmoji(s),
                    t.renderLabels(s[0]);
                }
            });
        },
        getWeekViewLabel: function() {
            var t, i = this, n = i.listLookup.getListModel(i.model.attributes.list_id), o = n && "inbox" === n.attributes.type, a = n && "inbox" === n.attributes.id, r = o || a;
            return t = r ? e.language.getLabel("smart_list_inbox").toString() : n && n.escape("title");
        },
        animateUp: function() {
            var e = this;
            return m.transition(e.el, "animate-up", !0);
        },
        animatePop: function() {
            var e = this;
            return e.el.classList.add("pop-in-start"),
            m.transition(e.el, "pop-in", !0).then(function() {
                e.el.classList.remove("pop-in-start"),
                e.el.classList.remove("pop-in");
            });
        },
        animateDown: function() {
            var e = this;
            return e.el.style.height = "0px",
            m.transition(e.el, "animate-down", !0).then(function() {
                e.el.style.height = null,
                e.el.classList.remove("animate-down");
            });
        },
        animateAppearCompletion: function() {
            var e = this;
            return e.el.style.opacity = "0",
            e.animateDown().then(function() {
                return e.el.style.opacity = "",
                e.animatePop();
            });
        },
        animateDisappearCompletion: function() {
            return this.animateUp();
        },
        animateDueDate: function() {
            this.$(".taskItem-duedate").addClass("nlp");
        },
        updateDueDateAndRepeat: function() {
            var e = this;
            e.renderReccurrence(),
            e.renderDueDateVisibility();
        },
        renderStarredIcon: function(e) {
            var t = this;
            t.requestAnimationFrame(function() {
                var i = t.$el;
                i.find(".star-wrapper").toggleClass("hidden", e),
                i.find(".starred-wrapper").toggleClass("hidden", !e);
            });
        },
        renderCompleted: function(e) {
            var t = this;
            t.requestAnimationFrame(function() {
                var i = t.$el;
                i.toggleClass("done", e),
                i.find(".taskItem-checkboxWrapper").toggleClass("checked", e);
            });
        },
        renderAttachmentIcon: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.model.hasAttachment();
                e.$(".attachment-wrapper").toggleClass("hidden", !t);
            });
        },
        renderCommentsBubble: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.model.hasComments();
                e.$(".conversations-wrapper").toggleClass("hidden", !t);
            });
        },
        renderUnreadCommentsBubble: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.model.hasUnreadComments();
                e.$(".conversations-wrapper").toggleClass("has-unread-comments", t);
            });
        },
        renderAssignee: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.$(".taskItem-assign")
                  , i = e.model.attributes.assignee_id;
                t.toggleClass("hidden", !i),
                i && (e.avatarView = e.avatarView || e.addSubview(new r({
                    listId: e.model.attributes.list_id,
                    size: "almostmedium"
                }), "avatarView"),
                t.html(e.avatarView.render({
                    id: i
                }).$el));
            });
        },
        renderReccurrence: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.model.attributes
                  , i = t.recurrence_type
                  , n = t.recurrenceCount
                  , o = !i || "none" === i || 0 === n;
                e.$(".recurrence-wrapper").toggleClass("hidden", o);
            });
        },
        renderDueDateVisibility: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.model.attributes.due_date
                  , i = e.$(".taskItem-duedate");
                t ? (i.removeClass("hidden"),
                e.renderDateLabel()) : i.empty().addClass("hidden");
            });
        },
        renderTitle: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.model.attributes.title;
                e.$title.text(t),
                e.renderLinks(e.$title),
                e.renderEmails(e.$title),
                e.renderTags(e.$title),
                e.renderEmoji(e.$title);
            });
        },
        renderSelected: function() {
            var t = this;
            t.requestAnimationFrame(function() {
                t.model.isSelected() ? (t.el.classList.add("selected"),
                "browser" === e.focus && t.el.focus()) : t.el.classList.remove("selected");
            });
        },
        renderSubtaskProgress: function() {
            var t = this;
            t.requestAnimationFrame(function() {
                var i = e.settings.isSettingSet("show_subtask_progress")
                  , n = i && t.model.hasSubtasks()
                  , o = t.$(".taskItem-progress")
                  , a = o.find(".taskItem-progress-bar");
                if (n) {
                    var r = t.model.attributes.subtaskCompletion || 0;
                    a.css({
                        width: r + "%"
                    }),
                    0 === r && (n = !1),
                    a.toggleClass("completed", 100 === r);
                }
                o.toggleClass("transparent", !n);
            });
        }
    });
    return [l, c, d, u].forEach(function(e) {
        e.applyToClass(L);
    }),
    L;
}),
define("models/ListChunkingFilter", ["project!core"], function(e) {
    var t = e.WBEventEmitter
      , i = t.prototype
      , n = t.extend({
        initialize: function(e, t) {
            var n = this;
            n.chunkingGroup = e,
            n.collection = t,
            n.lastIndex = -1,
            i.initialize.apply(n, arguments),
            n.bindTo(n.collection, "add", n._onCollectionAdd, n),
            n.bindTo(n.collection, "remove", n._onCollectionRemove, n),
            n.bindTo(n.collection, "move", n._onCollectionMove, n),
            n.bindTo(n.chunkingGroup, "shrink", n._updateTail.bind(n, {}), n),
            n.bindTo(n.chunkingGroup, "grow", n._updateTail.bind(n, {}), n);
        },
        loadInitialItems: function() {
            var e = this;
            e._updateTail();
        },
        _updateTail: function(e) {
            var t = this;
            t._tryToGrowTail(e),
            t._tryToShrinkTail(e);
        },
        _tryToGrowTail: function(e) {
            var t = this
              , i = t.chunkingGroup
              , n = t.collection.models;
            for (e = e || {}; i.shouldRenderItem(t.lastIndex + 1); )
                ++t.lastIndex,
                t.triggerEvent("add", [n[t.lastIndex], t.lastIndex, e]);
        },
        _tryToShrinkTail: function(e) {
            var t, i = this, n = i.chunkingGroup, o = i.collection.models;
            for (e = e || {}; !n.shouldRenderItem(i.lastIndex) && i.lastIndex > 0; )
                t = o[i.lastIndex],
                t && i.triggerEvent("remove", [t, i.lastIndex, e]),
                --i.lastIndex;
        },
        _onCollectionAdd: function(e, t, i) {
            var n = this
              , o = i.index;
            n.collectionOptions = i,
            n.chunkingGroup.setCollectionLength(t.length, !0),
            n.chunkingGroup.shouldRenderItem(o) && (n.triggerEvent("add", [e, o, i]),
            ++n.lastIndex,
            n._updateTail(i));
        },
        _onCollectionRemove: function(e, t, i) {
            var n = this
              , o = i.index
              , a = n.chunkingGroup.shouldRenderItem(o);
            n.chunkingGroup.setCollectionLength(t.length, !0),
            a && (n.triggerEvent("remove", [e, o, i]),
            --n.lastIndex,
            n._updateTail(i));
        },
        _onCollectionMove: function(e, t, i) {
            var n = this
              , o = i.index
              , a = i.fromIndex
              , r = n.chunkingGroup.shouldRenderItem(a)
              , s = n.chunkingGroup.shouldRenderItem(o)
              , l = n.collection.models;
            r && (n.triggerEvent("remove", [l[o], a, i]),
            --n.lastIndex),
            s && (n.triggerEvent("add", [l[o], o, i]),
            ++n.lastIndex),
            n._updateTail();
        }
    });
    return n;
}),
define("views/Tasks/TaskListView", ["application/runtime", "helpers/domtools", "./Controllers/TaskListViewClickController", "./Controllers/TaskListViewDragController", "./Controllers/TaskListViewItemController", "wunderbits/WBViewPresenter", "helpers/dnd/index", "views/Tasks/TaskItemView", "models/ListChunkingFilter", "wunderbits/global"], function(e, t, i, n, o, a, r, s, l, c) {
    var d = "application/x-wunderlist-task"
      , u = a.prototype
      , m = a.extend({
        observes: {
            collection: {
                change: ">change:taskAttributes",
                "change:title": ">change:title",
                "change:starred": ">change:starred",
                "change:completed": ">change:completed",
                "change:subtaskCompletion": ">change:subtaskCompletion",
                "change:hasSubtasks change:hasNote change:hasFiles": ">change:attachmentIcon",
                "change:hasUnreadComments": ">change:hasUnreadComments",
                "change:hasComments": ">change:hasComments",
                "change:assignee_id": ">change:assignee_id",
                "change:due_date change:recurrence_type change:recurrence_count": ">change:dateData",
                "change:list_id": ">change:list_id"
            },
            settings: {
                "change:show_subtask_progress": ">change:showSubtaskProgress"
            },
            chunkingFilter: {
                add: "addTaskFromEvent",
                remove: "removeTaskFromEvent"
            },
            chunking: {
                destroy: "destroy"
            },
            model: {
                "change:isCollapsed": "_updateIsCollapsed"
            }
        },
        "implements": [i, n, o],
        emits: {
            "click .taskItem-checkboxWrapper": "click:checkbox",
            "click .taskItem-star": "click:star",
            "click a.hash": "click:hash",
            "dblclick .taskItem-titleWrapper-title": "dblclick:title",
            "dblclick .taskItem-duedate": "dblclick:duedate",
            "dblclick .taskItem-assign": "dblclick:assign",
            "dblclick .task-recurring": "dblclick:recurring",
            "dblclick .conversations-wrapper": "dblclick:comments",
            "click .taskItem": "click:task",
            "dblclick .taskItem": "click:task"
        },
        tagName: "ol",
        className: "tasks",
        initialize: function(t) {
            var i = this;
            i.settings = e.settings,
            i._isAnimating = !1,
            i.chunking = t.chunkingGroup,
            i.chunkingFilter = new l(t.chunkingGroup,t.collection),
            i._debouncedFlushRenderQueue = i.debounce(i._flushRenderQueue.bind(i), 50),
            u.initialize.apply(i, arguments),
            i._renderQueue = [],
            i.detailPromise = i.deferred(),
            i.bindTo(e, "detail:rendered", function() {
                i.detailPromise.resolve();
            }),
            i.taskSelection = t.taskSelection,
            i._getSelectedNodes = t.getSelectedNodes;
            var n = i.model.attributes;
            n.allowDrag && i.enableDrag(),
            n.allowDropInto && i.enableDropInto(),
            (n.allowDropToComplete || n.allowDropToMoveToList) && i.enableDropZone();
        },
        render: function() {
            var e = this;
            e._updateIsCollapsed(!0),
            e.chunkingFilter.loadInitialItems(),
            e._flushRenderQueue();
        },
        createTaskView: function(e) {
            var t = this
              , i = new s({
                model: e
            });
            return t.addSubview(i, e.id),
            i.render(),
            t.dragHelper && t.dragHelper.prepareItem(i.el),
            i;
        },
        show: function(e) {
            var t = this;
            e !== t.shown && (e ? t.el.classList.remove("hidden") : t.el.classList.add("hidden"),
            t.shown = e);
        },
        _updateIsCollapsed: function(e) {
            var t, i = this;
            t = i.model.attributes.canCollapse && e === !0 ? e : i.model.attributes.isCollapsed,
            i.show(!t);
        },
        addTaskFromEvent: function() {
            var e = this;
            e._renderQueue.push({
                isAddEvent: !0,
                args: arguments
            }),
            e._flushRenderQueue();
        },
        removeTaskFromEvent: function() {
            var e = this;
            e._renderQueue.push({
                isAddEvent: !1,
                args: arguments
            }),
            e._flushRenderQueue();
        },
        _flushRenderQueue: function() {
            for (var e, t, i, n, o = this, a = document.createDocumentFragment(); o._renderQueue.length; )
                e = o._renderQueue.shift(),
                t = e.args[0],
                i = e.args[1],
                n = e.args[2],
                e.isAddEvent ? o._addTaskFromEvent(t, i, n, a) : o._removeTaskFromEvent(t, i, n);
            o.el.appendChild(a);
        },
        _addTaskFromEvent: function(e, t, i, n) {
            var o, a = this;
            i.animate && a.shown ? (o = a._animatedInsertFactory(e, t, i),
            a._setupInsertAnimation(e, o, i)) : (o = a._insertFactory(e, t, n))();
        },
        _animatedInsertFactory: function(e, t) {
            function i() {
                var i = n.createTaskView(e)
                  , o = n.$("li").not(".animate-up, .animate-down")[t];
                return o ? n.el.insertBefore(i.el, o) : n.el.appendChild(i.el),
                i;
            }
            var n = this;
            return i;
        },
        _insertFactory: function(e, t, i) {
            function n() {
                var n = o.createTaskView(e)
                  , a = o.$("li").not(".animate-up, .animate-down")[t];
                return a ? o.el.insertBefore(n.el, a) : i.appendChild(n.el),
                n;
            }
            var o = this;
            return n;
        },
        _setupInsertAnimation: function(e, t, i) {
            var n, o = this;
            n = "completion" === i.animate ? e.id + "insert" : e.id,
            i.animations.branch(n),
            i.animations.append(t, n),
            i.animations.append(function(e) {
                return "completion" === i.animate ? e.animateAppearCompletion() : "added" === i.animate ? e.animatePop() : e.animateDown();
            }, n),
            i.nlp && i.animations.append(function() {
                var t = o.getSubview(e.id);
                return t && t.animateDueDate();
            }, n),
            o._adjustAnimatingFlag(i.animations);
        },
        _adjustAnimatingFlag: function(e) {
            function i() {
                t.setImmediate(function() {
                    n._isAnimating = !1,
                    n.trigger("animationsState:changed", n._isAnimating);
                });
            }
            var n = this;
            n._isAnimating = !0,
            n.trigger("animationsState:changed", n._isAnimating),
            e.done().then(i, i);
        },
        isAnimating: function() {
            var e = this;
            return e._isAnimating;
        },
        _destroyTaskView: function(e) {
            var t = this;
            e.destroyed || t.destroySubview(e);
        },
        _removeTaskFromEvent: function(e, t, i) {
            if (e) {
                var n = this
                  , o = n.getSubview(e.id);
                o && (i.animate && n.shown ? n._setupRemoveAnimation(e, o, i) : n._destroyTaskView(o));
            }
        },
        _setupRemoveAnimation: function(e, t, i) {
            var n, o = this;
            n = "completion" === i.animate ? e.id + "remove" : e.id,
            i.animations.branch(n),
            i.animations.append(function() {
                return t.animateUp();
            }, n),
            i.animations.append(o._destroyTaskView.bind(o), n),
            i.animations.append(o._destroyTaskView.bind(o, t), n),
            o._adjustAnimatingFlag(i.animations);
        },
        enableDrag: function() {
            var e = this;
            e.dragHelper = r.createDragList(e.el, {
                mimeType: d,
                itemToData: e._itemToData.bind(e),
                getDragImage: e._createDragImageElement.bind(e),
                disposeDragImage: e._disposeDragImage.bind(e),
                effectAllowed: ["move"]
            }),
            e.bindTo(e.dragHelper, "drag", e._onDragAdjustSelection),
            e.dragHelper.enable();
        },
        enableDropInto: function() {
            var e = this;
            e.dropHelper = r.createDropBetweenList(e.el, {
                dropTargetTopClass: "dragAreaTop",
                dropTargetTopHeight: 2,
                dropTargetBottomClass: "dragAreaBottom",
                dropTargetBottomHeight: 0,
                mimeTypes: [d]
            }),
            e.bindTo(e.dropHelper, "droppedBetween", e._onDroppedBetween),
            e.dropHelper.enable();
        },
        enableDropZone: function() {
            var e = this;
            e.dropHelper = r.createDropZone(e.el, {
                dropEffect: "move",
                hoverClass: "lists-in-filter-hover",
                mimeTypes: [d]
            }),
            e.bindTo(e.dropHelper, "drop", e._onDropZoneDropped.bind(e)),
            e.dropHelper.enable();
        },
        _onDroppedBetween: function(e, t, i) {
            var n = this
              , o = JSON.parse(e)
              , a = t && t.getAttribute("rel")
              , r = i && i.getAttribute("rel");
            n.triggerEvent("tasksDropped", [o, a, r]);
        },
        _onDropZoneDropped: function(e, t) {
            var i = this;
            if (t === d) {
                var n = JSON.parse(e);
                i.model.attributes.allowDropToComplete ? i.trigger("tasksDroppedToComplete", n) : i.model.attributes.allowDropToMoveToList && i.trigger("tasksDroppedToMoveToList", n);
            }
        },
        onDestroy: function() {
            var e = this;
            e.dragHelper && (e.dragHelper.destroy(),
            e.dragHelper = null),
            e.dropHelper && (e.dropHelper.destroy(),
            e.dropHelper = null);
        },
        _onDragAdjustSelection: function(e) {
            var t = this
              , i = e && e.getAttribute("rel");
            i && t.trigger("drag", i);
        },
        _itemToData: function(e) {
            var t = this
              , i = e.getAttribute("rel")
              , n = t.taskSelection.getSelectedIDs().filter(function(e) {
                return e !== i;
            }).concat(i);
            return JSON.stringify(n);
        },
        _disposeDragImage: function(e) {
            try {
                c.document.body.removeChild(e);
            } catch (t) {}
        },
        _createDragImageElement: function(e, t) {
            var i = JSON.parse(t)
              , n = c.getComputedStyle(e)
              , o = e.cloneNode(!0);
            if (o.classList.add("task-drag-clone"),
            o.style.height = n.height,
            i.length > 1) {
                var a = document.createElement("span");
                a.className = "badge",
                a.appendChild(document.createTextNode("" + i.length)),
                o.insertBefore(a, o.children[0]);
            }
            var r = c.document.body;
            return r.insertBefore(o, r.firstChild),
            o;
        },
        hasSelectableItems: function() {
            return !this.model.attributes.isCollapsed && 0 !== this.collection.length;
        }
    });
    return m;
}),
define("helpers/Animator", ["vendor/jquery", "vendor/lodash", "project!core"], function(e, t, i) {
    return i.WBSingleton.extend({
        isAnimatingOrClone: function(t) {
            var i = e(t)
              , n = ".animate-up, .animate-down, .pop-in, .pop-in-start, .clone, .clone-title, .animated";
            return i.is(n);
        }
    });
}),
define("views/Tasks/Controllers/TaskBrowserViewKeyboardController", ["application/runtime", "actions/Factory", "helpers/Animator", "wunderbits/helpers/date", "wunderbits/WBViewController", "helpers/animation", "project!core"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = r.lib.extend
      , c = o.prototype;
    return o.extend({
        "implements": {
            "toggle:done": "toggleDoneFromShortcut",
            "toggle:starred": "toggleStarredFromShortcut",
            "edit:title": "openEditTitleFromShortcut",
            "delete:task": "deleteTaskFromShortcut",
            "select:all": "selectAllTasks",
            "select:first": "selectFirst",
            "tasks:copy": "copyTasks",
            "tasks:paste": "pasteTasks"
        },
        initialize: function() {
            var e = this;
            e.starTask = t.starTask(),
            e.completeTask = t.completeTask(),
            e.duplication = t.duplication(),
            e.taskLookup = t.taskLookup(),
            c.initialize.apply(e, arguments);
        },
        _getSelectedItems: function() {
            var e = this.view.taskSelection
              , t = e && e.getSelectedItems();
            return t || [];
        },
        _getSelectedItemIds: function() {
            return this._getSelectedItems().map(function(e) {
                return e.id;
            });
        },
        openEditTitleFromShortcut: function() {
            var t = this
              , i = t.view.taskSelection
              , n = i.activeModel;
            if (n && e.trigger("route:" + n.route("/title/edit")),
            !n && i.activeHeaderCollection) {
                var o = i.activeHeaderCollection.groupId
                  , a = t.view.getHeaderView(o);
                a && a.handleNavigation();
            }
        },
        toggleDoneFromShortcut: function(t, i) {
            var n = this;
            if (!("addTask" === e.focus || "addTaskDatePicker" === e.focus || e.currentRoute().indexOf("Subtasks/") >= 0 || n.view.isAnimating())) {
                var o = a.animateOptions("completion")
                  , r = i || n._getSelectedItemIds();
                n._updateCompletedOnTasks(t, r, o),
                o && o.animations.run();
            }
        },
        _updateCompletedOnTasks: function(e, t, i) {
            var n = this;
            e === !0 ? n.completeTask.completeTasks(t.filter(function(e) {
                return !n.taskLookup.getTaskModel(e).attributes.completed;
            }), i) : e === !1 ? n.completeTask.uncompleteTasks(t.filter(function(e) {
                return n.taskLookup.getTaskModel(e).attributes.completed;
            }), i) : n.completeTask.toggleCompleted(t, i);
        },
        toggleStarredFromShortcut: function(t, i) {
            var n = this;
            if ("addTask" !== e.focus && "addTaskDatePicker" !== e.focus && !n.view.isAnimating()) {
                var o = "true" === e.settings.attributes.behavior_star_tasks_to_top
                  , r = {
                    moveToTop: o
                }
                  , s = o && a.animateOptions("starred");
                s && (r = l(r, s));
                var c = i || n._getSelectedItemIds();
                n._updateStarredOnTasks(t, c, r),
                s && s.animations.run();
            }
        },
        _updateStarredOnTasks: function(e, t, i) {
            var n = this;
            e === !0 ? n.starTask.starTasks(t.filter(function(e) {
                return !n.taskLookup.getTaskModel(e).attributes.starred;
            }), i) : e === !1 ? n.starTask.unstarTasks(t.filter(function(e) {
                return n.taskLookup.getTaskModel(e).attributes.starred;
            }), i) : n.starTask.toggleStarred(t, i);
        },
        _groupItemsByListID: function(e) {
            var t = this
              , i = s.groupBy(e, function(e) {
                return e.attributes.list_id;
            });
            return Object.keys(i).map(function(e) {
                return {
                    taskCollection: t.taskLookup.getTaskCollection(e),
                    selectedItems: i[e]
                };
            });
        },
        selectFirst: function() {
            for (var t, i = this, n = i.view.taskSelection, o = n.collections, a = o.length, r = 0; a > r; r++)
                if (o[r].length) {
                    t = o[r];
                    break;
                }
            var s = t && t.models[0];
            s ? (n.addToSelection(s, t),
            n.deselectAllAndSelectActive(),
            i.view.forceFocus(e.focus)) : e.lastListID && e.trigger("route:lists/" + e.lastListID + "/tasks/new");
        },
        deleteTaskFromShortcut: function(t) {
            var i = this;
            if (!i.view.isAnimating()) {
                var n = i._getSelectedItems();
                if (0 !== n.length) {
                    var o = "true" === e.settings.attributes.confirm_delete_entity;
                    o = t && t.ignorePrompt ? !1 : o,
                    o ? e.trigger("modal:confirm", i.setupConfirmationOptions(n)) : i.deleteSelectedTasks(n);
                }
            }
        },
        setupConfirmationOptions: function(t) {
            var i = this
              , n = {
                confirm: i.deleteSelectedTasks.bind(i, t),
                cancel: function() {
                    e.trigger("restore:actionBarState", !0);
                }
            };
            return t.length > 1 ? (n.customTitle = e.language.getLabel("label_are_you_sure_permanently_delete_task_plural").toString(),
            n.confirmText = e.language.getLabel("label_delete_task_plural").toString()) : (n.customTitle = e.language.getLabel("label_are_you_sure_permanently_delete_$_task", t[0].escape("title")).toString(),
            n.confirmText = e.language.getLabel("label_delete_task").toString()),
            n.customText = e.language.getLabel("label_cant_undo").toString(),
            n;
        },
        deleteSelectedTasks: function(t) {
            var i = this;
            if (!i.view.isAnimating()) {
                for (var n = a.animateOptions("completion"), o = 0, r = t.length; r > o; o++)
                    t[o].destroy(n);
                e.trigger("focus:set", "browser"),
                i.view.emitSelectFirst(),
                n && n.animations.run();
            }
        },
        selectAllTasks: function() {
            var e = this.view;
            e.isAnimating() || e.taskSelection.selectAll();
        },
        copyTasks: function() {
            var t = this
              , i = t._getSelectedItemIds();
            i.length && (t.duplication.copyTasks(i),
            e.trigger("analytics:copy:tasks", "keyboard"),
            e.trigger("trackingService", "client.copy.tasks", "keyboard"));
        },
        pasteTasks: function() {
            var t = this;
            if (!t.duplication.hasCopiedLists()) {
                var i = t._getSelectedItemIds();
                i.length ? t.duplication.pasteTasks(i[i.length - 1]) : t.duplication.pasteTasksToList(e.listId),
                e.trigger("analytics:paste:tasks", "keyboard"),
                e.trigger("trackingService", "client.paste.tasks", "keyboard");
            }
        }
    });
}),
define("views/Tasks/Controllers/TaskBrowserSelectionController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        "implements": {
            "change:active": "debouncedRoute",
            "change:activeHeader": "activeHeaderChanged",
            "change:inactiveHeader": "inactiveHeaderChanged",
            "select:task": "selectTask"
        },
        initialize: function() {
            var e = this;
            e.debouncedRoute = e.debounce(e._routeToContext, 150),
            i.initialize.apply(e, arguments);
        },
        selectTask: function(e) {
            var t = this
              , i = t.view;
            i.ready.done(function() {
                var t = i.allTasks.get(e);
                t && !t.isSelected() && i.taskSelection.toggleSelection(t),
                i.taskSelection.deselectAllAndSelectActive();
            });
        },
        _routeToContext: function(t) {
            var i = this
              , n = e.isOnTaskRoute();
            if (n && i.view.currentContext && i.view.taskSelection.selectedCount > 1)
                e.trigger("route:lists/" + i.view.currentContext),
                e.trigger("focus:set", "browser");
            else if (n) {
                var o = e.currentRoute()
                  , a = i.view.allTasks.get(t);
                if (a) {
                    var r = a.route()
                      , s = o.indexOf(r) >= 0;
                    !s && e.trigger("route:" + r);
                }
            }
        },
        activeHeaderChanged: function(e) {
            var t = this
              , i = t.view.getHeaderView(e);
            i && i.setActive(!0);
        },
        inactiveHeaderChanged: function(e) {
            var t = this
              , i = t.view.getHeaderView(e);
            i && i.setActive(!1);
        }
    });
}),
define("views/Tasks/Controllers/TaskContextMenuController", ["application/runtime", "wunderbits/ContextMenuController"], function(e, t, i) {
    var n = ["button_copy_task_uri_plural_$", "contextual_new_list_from_$_plural", "actionbar_email_$_selected_items_plural", "actionbar_print_$_selected_items_plural", "contextual_copy_selected_task_plural_$"]
      , o = e._
      , a = t.prototype;
    return t.extend({
        type: "tasks",
        "implements": {
            "contextmenu:contextual_mark_as_notcompleted": "markAsNotCompleted",
            "contextmenu:contextual_mark_as_completed": "markAsCompleted",
            "contextmenu:contextual_mark_as_starred": "markAsStarred",
            "contextmenu:contextual_mark_as_unstarred": "markAsUnstarred",
            "contextmenu:label_due_$/$label_relative_date_today": "setDueToday",
            "contextmenu:label_due_$/$label_relative_date_tomorrow": "setDueTomorrow",
            "contextmenu:button_remove_due_date": "removeDueDate",
            "contextmenu:button_copy_task_uri": "copyUri",
            "contextmenu:button_copy_task_uri_plural_$": "copyUri",
            "contextmenu:contextual_new_list_from": "createNewList",
            "contextmenu:contextual_new_list_from_$_plural": "createNewList",
            "contextmenu:actionbar_email_selected_item": "emailTasks",
            "contextmenu:actionbar_email_$_selected_items_plural": "emailTasks",
            "contextmenu:actionbar_print_selected_item": "printTasks",
            "contextmenu:actionbar_print_$_selected_items_plural": "printTasks",
            "contextmenu:contextual_copy_task": "copyTasks",
            "contextmenu:contextual_copy_selected_task_plural_$": "copyTasks",
            "contextmenu:contextual_paste_task": "pasteTasks",
            "contextmenu:contextual_paste_task_plural_$": "pasteTasks",
            "contextmenu:label_delete_task": "deleteTasks",
            "contextmenu:menubar_delete_task_plural": "deleteTasks",
            "contextmenu:move_tasks_to": "moveToList",
            "contextmenu:assign_tasks_to": "assignTaskTo",
            "contextmenu:label_unassigned": "assignTaskTo"
        },
        items: {
            contextual_mark_as_multiple: {},
            contextual_mark_as_notcompleted: i,
            contextual_mark_as_completed: i,
            contextual_mark_as_starred: i,
            contextual_mark_as_unstarred: i,
            "label_due_$/$label_relative_date_today": i,
            "label_due_$/$label_relative_date_tomorrow": i,
            button_remove_due_date: i,
            contextual_assign_item_to_list: {},
            contextual_assign_item_to_list_plural: {},
            button_copy_task_uri: i,
            button_copy_task_uri_plural_$: i,
            contextual_new_list_from: i,
            contextual_new_list_from_$_plural: i,
            contextual_move_item_to_list: {},
            contextual_move_item_to_list_plural: {},
            actionbar_email_selected_item: i,
            actionbar_email_$_selected_items_plural: i,
            actionbar_print_selected_item: i,
            actionbar_print_$_selected_items_plural: i,
            contextual_copy_task: i,
            contextual_copy_selected_task_plural_$: i,
            contextual_paste_task: i,
            contextual_paste_task_plural_$: i,
            label_delete_task: i,
            menubar_delete_task_plural: i
        },
        initialize: function() {
            var t = this;
            if (a.initialize.apply(this, arguments) !== !1) {
                var i = 1e3;
                t.buildListMenuItems = t.debounce(t.buildListMenuItems, i),
                t.buildAssignMenuItems = t.debounce(t.buildAssignMenuItems, i),
                t.bindTo(e, "browser:selectionChanged", "onSelectionChange"),
                t.bindOnceTo(e, "lists:ready", "setupListsBindings"),
                t.bindOnceTo(e, "users:ready", "setupAssignBindings"),
                t.ready.done(function() {
                    t.bindTo(t.actions.duplication.state, "change:copiedTasksCount", "onCopiedTasksChange");
                });
            }
        },
        onCopiedTasksChange: function() {
            var t = this
              , i = "contextual_paste_task_plural_$"
              , n = t.actions.duplication.state.attributes.copiedTasksCount
              , o = t.items[i];
            o && o.setLabel(e.language.getText(i, n));
        },
        onSelectionChange: function(t) {
            if (0 !== t) {
                var i = this
                  , o = e.language
                  , a = i.items;
                n.forEach(function(e) {
                    var i = a[e];
                    i && i.setLabel(o.getText(e, t).replace(/&quot;/g, '"'));
                });
            }
        },
        setupListsBindings: function() {
            var e = this;
            e.lists = e.actions.listLookup.acceptedLists,
            e.listItems = {},
            e.listItemsPlural = {},
            e.listsSubmenu = e.createMenu(i, i, "listsSubmenu"),
            e.listsSubmenuPlural = e.createMenu(i, i, "listsSubmenu"),
            e.items.contextual_move_item_to_list.setSubmenu(e.listsSubmenu),
            e.items.contextual_move_item_to_list_plural.setSubmenu(e.listsSubmenuPlural),
            e.buildListMenuItems(),
            e.bindTo(e.lists, "add change", "buildListMenuItems"),
            e.bindTo(e.lists, "remove", "removeListMenuItem");
        },
        buildListMenuItems: function() {
            var t = this
              , i = t.lists;
            [{
                listItems: t.listItems,
                listMenu: t.listsSubmenu
            }, {
                listItems: t.listItemsPlural,
                listMenu: t.listsSubmenuPlural
            }].forEach(function(n) {
                var o = n.listItems
                  , a = n.listMenu;
                i.each(function(i) {
                    var n = i.id
                      , r = i.attributes.title;
                    if ("inbox" === n && (r = e.language.getText("smart_list_inbox")),
                    !o[n]) {
                        var s = t.createMenuItem(n, r);
                        s.onClick(function() {
                            t.view.trigger("contextmenu:move_tasks_to", n);
                        }),
                        a.append(s),
                        o[n] = s;
                    }
                    o[n].setLabel(r);
                });
            });
        },
        removeListMenuItem: function(e) {
            var t = this;
            [{
                listItems: t.listItems,
                listMenu: t.listsSubmenu
            }, {
                listItems: t.listItemsPlural,
                listMenu: t.listsSubmenuPlural
            }].forEach(function(t) {
                var i = t.listItems
                  , n = t.listMenu
                  , o = i && i[e.id]
                  , a = o && n.items.indexOf(o) > -1;
                o && (a && n.remove(o),
                delete i[e.id]);
            });
        },
        setupAssignBindings: function(e) {
            var t = this;
            t.users = e,
            t.assignItems = {},
            t.assignItemsPlural = {},
            t.assignSubmenu = t.createMenu(i, i, "assignSubmenu"),
            t.assignSubmenuPlural = t.createMenu(i, i, "assignSubmenuPlural"),
            t.items.contextual_assign_item_to_list.setSubmenu(t.assignSubmenu),
            t.items.contextual_assign_item_to_list_plural.setSubmenu(t.assignSubmenuPlural),
            t.buildAssignMenuItems(),
            t.bindTo(e, "add change", "buildAssignMenuItems"),
            t.bindTo(e, "remove", "removeAssignMenuItem");
        },
        _getAssignMenuData: function() {
            var e = this;
            return [{
                assignItems: e.assignItems,
                assignMenu: e.assignSubmenu
            }, {
                assignItems: e.assignItemsPlural,
                assignMenu: e.assignSubmenuPlural
            }];
        },
        _addUnassignMenuItem: function(t, i) {
            var n = this
              , o = "label_unassigned"
              , a = i[o];
            a || (a = n.createMenuItem(o),
            a.setLabel(e.language.getText(o)),
            a.onClick(function() {
                n.view.trigger("contextmenu:" + o);
            }),
            i[o] = a),
            t.append(a);
        },
        buildAssignMenuItems: function() {
            var e = this
              , t = e.users;
            e._getAssignMenuData().forEach(function(i) {
                var n = i.assignItems
                  , o = i.assignMenu;
                e._addUnassignMenuItem(o, n),
                t.each(function(t) {
                    var i = t.id
                      , a = t.attributes.name;
                    if (!n[i]) {
                        var r = e.createMenuItem(i, a);
                        r.onClick(function() {
                            e.view.trigger("contextmenu:assign_tasks_to", i);
                        }),
                        n[i] = r,
                        o.append(r);
                    }
                    n[i].setLabel(a);
                });
            });
        },
        removeAssignMenuItem: function(e) {
            this._getAssignMenuData().forEach(function(t) {
                var i = t.assignItems
                  , n = t.assignMenu
                  , o = i && i[e.id]
                  , a = o && n.items.indexOf(o) > -1;
                o && (a && n.remove(o),
                delete i[e.id]);
            });
        },
        getContextMenuKeys: function() {
            var e, t, i = this, n = i.view.taskSelection, o = n.getSelectedIDs(), a = i.target.getAttribute("rel");
            if (1 == o.length && o[0] === a || -1 === o.indexOf(a)) {
                var r = n.allTasks.get(a)
                  , s = r && r.attributes.list_id;
                e = s && i.view.lists.get(s),
                i.selectedIDs = [a],
                t = i.getSingleTaskMenuKeys(r, e);
            } else {
                var l = n.getSelectionState()
                  , c = l.listIds;
                e = 1 === c.length && i.view.lists.get(c[0]),
                i.selectedIDs = o,
                t = i.getMultipleTaskMenuKeys(o, l, e);
            }
            return e && e.isShared() && i.updateAssignMenuItems(e),
            t;
        },
        updateAssignMenuItems: function(e) {
            var t = this;
            if (t.clearContextMenu(t.assignSubmenu),
            t.actions.assignTask.limit.isUserAllowedToAssign(e.id))
                t._getAssignMenuData().forEach(function(i) {
                    var n = i.assignItems
                      , o = i.assignMenu;
                    t.clearContextMenu(o),
                    t._addUnassignMenuItem(o, n);
                    var a = t.actions.membershipLookup.getMembershipCollection(e.id);
                    a && a.each(function(e) {
                        if (e.isAccepted()) {
                            var t = e.attributes.user_id
                              , i = n[t];
                            i && o.append(i);
                        }
                    });
                });
            else {
                var i = t.createDisabledMenuItem("Free Assign Limit reached!");
                t.assignSubmenu.append(i);
            }
        },
        copyLinkEnabled: function() {
            return e.env.isNodeWebkit();
        },
        getSingleTaskMenuKeys: function(e, t) {
            var i = this
              , n = [];
            if (e) {
                var o = e && e.isStarred()
                  , a = e && e.isCompleted()
                  , r = t && t.isShared()
                  , s = "contextual_mark_as_";
                n.push(s + (a ? "notcompleted" : "completed")),
                a || n.push(s + (o ? "unstarred" : "starred")),
                n.push("---"),
                a || (r && (n.push("contextual_assign_item_to_list"),
                n.push("---")),
                n.push("label_due_$/$label_relative_date_today"),
                n.push("label_due_$/$label_relative_date_tomorrow"),
                n.push("button_remove_due_date"),
                i.copyLinkEnabled() && (n.push("---"),
                n.push("button_copy_task_uri")),
                n.push("---"),
                n.push("contextual_new_list_from"),
                n.push("contextual_move_item_to_list")),
                n.push("actionbar_email_selected_item"),
                n.push("actionbar_print_selected_item"),
                n.push("---"),
                n.push("contextual_copy_task"),
                i.addPasteKeys(n),
                n.push("label_delete_task");
            }
            return n;
        },
        getMultipleTaskMenuKeys: function(e, t, i) {
            var n = this
              , o = t.all
              , a = t.completed
              , r = t.starred
              , s = a.length === o.length
              , l = [];
            return s || l.push("contextual_mark_as_completed"),
            a.length > 0 && l.push("contextual_mark_as_notcompleted"),
            s || (r.length < o.length && l.push("contextual_mark_as_starred"),
            r.length > 0 && l.push("contextual_mark_as_unstarred")),
            l.push("---"),
            s || (i && i.isShared() && (l.push("contextual_assign_item_to_list_plural"),
            l.push("---")),
            l.push("label_due_$/$label_relative_date_today"),
            l.push("label_due_$/$label_relative_date_tomorrow"),
            l.push("button_remove_due_date"),
            n.copyLinkEnabled() && (l.push("---"),
            l.push("button_copy_task_uri_plural_$")),
            l.push("---"),
            l.push("contextual_new_list_from_$_plural"),
            l.push("contextual_move_item_to_list_plural")),
            l.push("actionbar_email_$_selected_items_plural"),
            l.push("actionbar_print_$_selected_items_plural"),
            l.push("---"),
            l.push("contextual_copy_selected_task_plural_$"),
            n.addPasteKeys(l),
            l.push("menubar_delete_task_plural"),
            l;
        },
        addPasteKeys: function(e) {
            var t = this
              , i = t.actions.duplication.copiedTasksCount();
            return i && 1 === i ? e.push("contextual_paste_task") : i && e.push("contextual_paste_task_plural_$"),
            e;
        },
        markAsNotCompleted: function() {
            var t = this;
            e.trigger("tasks:markDone", !1, t.selectedIDs);
        },
        markAsCompleted: function() {
            var t = this;
            e.trigger("tasks:markDone", !0, t.selectedIDs);
        },
        markAsStarred: function() {
            var t = this;
            e.trigger("tasks:toggleStarred", !0, t.selectedIDs);
        },
        markAsUnstarred: function() {
            var t = this;
            e.trigger("tasks:toggleStarred", !1, t.selectedIDs);
        },
        setDueToday: function() {
            var e = this;
            e.actions.due.setTasksDueToday(e.selectedIDs);
        },
        setDueTomorrow: function() {
            var e = this;
            e.actions.due.setTasksDueTomorrow(e.selectedIDs);
        },
        removeDueDate: function() {
            var e = this;
            e.actions.due.removeDueDate(e.selectedIDs);
        },
        copyUri: function() {
            var e = this;
            e.clipboard.set(e.selectedIDs.map(function(e) {
                return "https://www.wunderlist.com/#/tasks/" + e;
            }).join("\n"));
        },
        createNewList: function() {
            var t = this
              , n = t.selectedIDs
              , o = t.actions.createList
              , a = e.language.getText("placeholder_new_list");
            o.createListWith(a, !1, i, n).then(function(t) {
                e.trigger("route:" + t.route());
            });
        },
        emailTasks: function() {
            var t = this
              , i = t.selectedIDs;
            e.trigger("email:list", e.listId, i);
        },
        printTasks: function() {
            var e = this;
            e.actions.print.printSelected();
        },
        copyTasks: function() {
            var t = this;
            if (t.selectedIDs && t.selectedIDs.length) {
                var i = t.selectedIDs.slice();
                t.actions.duplication.copyTasks(i),
                e.trigger("analytics:copy:tasks", "contextMenu"),
                e.trigger("trackingService", "client.copy.tasks", "contextMenu");
            }
        },
        pasteTasks: function() {
            var t = this;
            if (t.selectedIDs && t.selectedIDs.length) {
                var i = t.selectedIDs[t.selectedIDs.length - 1];
                t.actions.duplication.pasteTasks(i),
                e.trigger("analytics:paste:tasks", "contextMenu"),
                e.trigger("trackingService", "client.paste.tasks", "contextMenu");
            }
        },
        deleteTasks: function() {
            var t = this
              , i = "true" === e.settings.attributes.confirm_delete_entity
              , n = function() {
                t.actions.deleteTask.deleteTasks(t.selectedIDs);
            };
            if (i) {
                var a = e.language.getLabel
                  , r = {
                    text: a("label_cant_undo").toString()
                }
                  , s = !0;
                if (1 === t.selectedIDs.length) {
                    var l = t.view.taskSelection
                      , c = l.allTasks.get(t.selectedIDs[0]);
                    if (c) {
                        var d = o.escape(c.attributes.title);
                        r.title = a("label_are_you_sure_permanently_delete_$_task", d).toString(),
                        r.confirm = a("label_delete_task").toString();
                    } else
                        s = !1;
                } else
                    r.title = a("label_are_you_sure_permanently_delete_task_plural").toString(),
                    r.confirm = a("label_delete_task_plural").toString();
                s && e.trigger("modal:confirm", {
                    customTitle: r.title,
                    customText: r.text,
                    confirmText: r.confirm,
                    confirm: n
                });
            } else
                n();
        },
        moveToList: function(e) {
            var t = this
              , i = t.selectedIDs;
            t.actions.moveTask.moveTasks(i, e);
        },
        assignTaskTo: function(e) {
            var t = this
              , i = t.selectedIDs;
            t.actions.assignTask.assignTasksToUserId(i, e);
        }
    });
}),
define("models/grouping/BaseGrouping", ["project!core"], function(e) {
    var t = e.BaseEventEmitter.extend({
        disallowSelectionToOtherGroup: function() {
            return !1;
        },
        getItemCount: function() {
            var e = this;
            return e.getGroupCollection().length;
        }
    });
    return t;
}),
define("models/grouping/MultiListGrouping", ["./BaseGrouping"], function(e) {
    var t = e.extend({
        initialize: function() {
            var e = this;
            e.boundObjects = [],
            e.highestBoundIndex = -1;
        },
        destroyFromIndex: function(e) {
            var t, i, n, o = this;
            for (t = o.highestBoundIndex; t >= e; --t)
                if (n = o.boundObjects[t])
                    for (i = 0; i < n.length; ++i)
                        o._destroyObject(n[i]);
            o.boundObjects = o.boundObjects.slice(0, e);
        },
        _destroyObject: function(e) {
            e.unbindAll();
        },
        addBoundObjectAtIndex: function(e, t) {
            var i = this
              , n = i.boundObjects[t];
            Array.isArray(n) || (i.boundObjects[t] = n = []),
            n.push(e),
            i.highestBoundIndex = Math.max(i.highestBoundIndex, t);
        },
        onDestroy: function() {
            var e = this;
            e.destroyFromIndex(0);
        }
    });
    return t;
}),
define("models/TasksGroupModel", ["application/runtime", "wunderbits/WBModel"], function(e, t, i) {
    var n = t.prototype;
    return t.extend({
        defaults: {
            canCollapse: !1,
            isCollapsed: !1,
            hasHeader: !0,
            showHeader: !0,
            canDeleteCompleted: !1,
            canEditPosition: !1,
            selectable: !0,
            chunking: !0,
            filter: i,
            itemsPerRender: 10,
            groupID: i,
            listID: i,
            title: i,
            scrollThreshold: i,
            hasItems: !1,
            allowDrag: !1,
            allowDropInto: !1,
            allowDropToComplete: !1,
            allowDropToMoveToList: !1
        },
        initialize: function(e, t) {
            var i = this
              , o = t.collection;
            n.initialize.apply(i, arguments),
            o && i.bindTo(o, "add remove", "_updateHasItems"),
            i.bindTo(i, "change:hasHeader change:hasItems", "_updateShowHeader"),
            i.attributes.canCollapse && i._updateIsCollapsed(null, "false"),
            i.onlineID = t.onlineID,
            i._updateHasItems(null, o || [], {}),
            i._updateShowHeader(null, null, {});
        },
        _updateIsCollapsed: function(e, t) {
            var i = this
              , n = "true" !== t;
            i.set("isCollapsed", n);
        },
        _updateHasItems: function(e, t) {
            var i = this
              , n = 0 !== t.length;
            i.set({
                hasItems: n
            });
        },
        _updateShowHeader: function() {
            var e = this
              , t = e.get("hasHeader") && e.get("hasItems");
            e.set({
                showHeader: t
            });
        },
        forceItemCount: function(e) {
            var t = this;
            t._updateHasItems(null, {
                length: e
            }, {});
        },
        loadCompletedTasksIfNeeded: function() {
            var e = this;
            e.attributes.collectionCanIncludeCompletedItems && e.onlineID && e._triggerLoadCompletedTasks();
        },
        _triggerLoadCompletedTasks: function() {
            var t = this;
            t.set("loadingCompleted", !0),
            e.trigger("sync:start", !1, "completed", "tasks", parseInt(t.onlineID, 10)),
            t.bindOnceTo(e, "sync:ended", function() {
                t.set("loadingCompleted", !1);
            });
        }
    });
}),
define("models/grouping/WeekDayGrouping", ["application/runtime", "./MultiListGrouping", "collections/comparators", "collections/FilteredTaskCollection", "collections/TaskCollection", "models/TasksGroupModel", "vendor/moment"], function(e, t, i, n, o, a, r, s) {
    var l = [{
        id: "Today",
        collection: "todayPlus0"
    }, {
        id: "Tomorrow",
        collection: "todayPlus1"
    }, {
        id: 2,
        collection: "todayPlus2"
    }, {
        id: 3,
        collection: "todayPlus3"
    }, {
        id: 4,
        collection: "todayPlus4"
    }, {
        id: 5,
        collection: "todayPlus5"
    }, {
        id: 6,
        collection: "todayPlus6"
    }]
      , c = t.prototype
      , d = t.extend({
        filter: "week",
        initialize: function() {
            var e = this;
            c.initialize.apply(e, arguments),
            e.rewind(0);
        },
        rewind: function(e) {
            var t = this;
            t.dayIndex = e - 1;
        },
        hasNext: function() {
            var e = this;
            return e.dayIndex < l.length - 1;
        },
        moveNext: function() {
            var e = this;
            ++e.dayIndex;
        },
        getGroupCollection: function() {
            var t = this
              , a = l[t.dayIndex].collection
              , c = parseInt(a.replace("todayPlus", ""), 10)
              , d = "/tasks/filter/" + a;
            e.settings.isScopedFiltersEnabled() && (d += "/user");
            var u = new o(d)
              , m = new n(u.models,{
                sourceCollection: u,
                sorter: "todayPlus0" === a ? i.dueDateTodayGroup : i.taskListPosition,
                sortProperties: ["due_date", "list_id"],
                filterProperties: ["due_date", "list_id"],
                filter: function(t) {
                    if (e.settings.isScopedFiltersEnabled() && !t.belongsToMe())
                        return !1;
                    var i = t.attributes.due_date;
                    if (i === s || null === i)
                        return !1;
                    var n = r(i).diff(r().sod(), "days");
                    return 0 === c ? 0 >= n : n === c;
                }
            });
            return m.bindAddingEvents(),
            m.bindRemovingEvents(),
            t.addBoundObjectAtIndex(m, t.dayIndex),
            m;
        },
        getGroupModel: function() {
            var e = this
              , t = new a({
                title: e._getTitle(),
                groupID: e._getGroupId(),
                allowDropToMoveToList: !0,
                allowDrag: !0
            },{
                collection: e.getGroupCollection()
            });
            return e.addBoundObjectAtIndex(t, e.dayIndex),
            t;
        },
        _getTitle: function() {
            var t, i = this, n = e.language, o = l[i.dayIndex], a = isNaN(parseInt(o.id, 10)), s = a && r().add("days", i.dayIndex).format("MMM. DD");
            return t = a ? n.getLabel("label_relative_date_" + o.id.toLowerCase() + "_with_date", s).toString() : r().add("days", i.dayIndex).format("dddd, MMM. DD");
        },
        _getGroupId: function() {
            var e = this
              , t = l[e.dayIndex].collection;
            return t;
        }
    });
    return d;
}),
define("models/grouping/FilterListGrouping", ["application/runtime", "./MultiListGrouping", "collections/TaskCollection", "collections/FilteredTaskCollection", "collections/comparators", "models/TasksGroupModel", "vendor/moment"], function(e, t, i, n, o, a, r, s) {
    var l = {
        starred: o.starred,
        today: o.dueDate,
        completed: o.completedAt,
        assigned: o.assignee_id,
        conversations: o.position,
        all: o.completed
    }
      , c = {
        starred: ["position"],
        today: ["due_date"],
        completed: ["completed_at"],
        assigned: ["position"],
        conversations: ["position"],
        all: ["position"]
    }
      , d = {
        starred: ["starred", "completed"],
        today: ["due_date", "completed"],
        completed: ["completed"],
        assigned: ["assignee_id", "completed"],
        conversations: ["completed"],
        all: ["completed"]
    }
      , u = {
        starred: !0,
        assigned: !0,
        conversations: !0,
        all: !0
    }
      , m = t.prototype
      , p = t.extend({
        initialize: function(e, t) {
            var n = this;
            m.initialize.apply(n, arguments),
            n.filter = t,
            n.allLists = e,
            n.smartListMainCollection = new i("/tasks/filter/" + t),
            n.sorter = l[n.filter],
            n.sorter || (n.sorter = o.completed),
            n.rewind(0);
        },
        rewind: function(e) {
            e === s && (e = 0);
            var t = this;
            t.listIndex = e - 1,
            t.currentCollection = null;
        },
        hasNext: function() {
            var e = this;
            return e.listIndex + 1 < e.allLists.length;
        },
        moveNext: function() {
            var e = this;
            e.listIndex = e.listIndex + 1,
            e.currentCollection = e._createGroupCollection();
        },
        _createGroupCollection: function() {
            var e = this
              , t = e.allLists.models[e.listIndex]
              , o = new i("/lists/" + t.id + "/tasks")
              , a = new n(o.models,{
                sourceCollection: o,
                filter: e._filterTask.bind(e),
                filterProperties: d[e.filter],
                sorter: e.sorter,
                sortProperties: c[e.filter]
            });
            return a.bindAddingEvents(),
            a.bindRemovingEvents(),
            e.addBoundObjectAtIndex(a, e.listIndex),
            a;
        },
        getGroupCollection: function() {
            return this.currentCollection;
        },
        getGroupModel: function() {
            var e = this
              , t = e.allLists.models[e.listIndex]
              , i = !!u[e.filter]
              , n = new a({
                title: t.escape("title"),
                groupID: t.id,
                listID: t.id,
                canDeleteCompleted: "completed" === e.filter,
                allowDropToMoveToList: !0,
                allowDrag: !0,
                allowDropInto: i,
                canEditPosition: i
            },{
                collection: e.currentCollection
            });
            return e.addBoundObjectAtIndex(n, e.listIndex),
            n;
        },
        _filterTask: function(t) {
            var i = this
              , n = i.filter
              , o = r().sod()
              , a = e.user;
            if (("week" === n || "today" === n) && e.settings.isScopedFiltersEnabled() && !t.belongsToMe())
                return !1;
            if ("completed" !== n && t.attributes.completed)
                return !1;
            if ("starred" === n && !t.attributes.starred)
                return !1;
            if ("assigned" === n) {
                if (!t.attributes.assignee_id || !a.isIDEqual(t.attributes.assignee_id))
                    return !1;
            } else if ("today" === n) {
                if (!t.attributes.due_date)
                    return !1;
                var s = r(t.attributes.due_date, "YYYY-MM-DD").sod();
                if (s && s.diff(o, "days") > 0)
                    return !1;
            } else if ("completed" === n && !t.attributes.completed)
                return !1;
            return !0;
        }
    });
    return p;
}),
define("models/grouping/SearchListGrouping", ["application/runtime", "./MultiListGrouping", "collections/TaskCollection", "collections/FilteredTaskCollection", "models/TasksGroupModel", "vendor/moment", "collections/comparators"], function(e, t, i, n, o, a, r, s) {
    var l = t.prototype
      , c = t.extend({
        initialize: function(e, t) {
            var n = this;
            l.initialize.apply(n, arguments),
            n.searchCollection = new i(e),
            n.allLists = t,
            n.rewind(0);
        },
        rewind: function(e) {
            e === s && (e = 0);
            var t = this;
            t.onDestroy(),
            t.listIndex = e - 1,
            t.currentList = null,
            t.currentCollection = null;
        },
        hasNext: function() {
            var e = this;
            return e.listIndex < e.allLists.length - 1;
        },
        moveNext: function() {
            var e = this;
            ++e.listIndex,
            e.currentList = e.allLists.at(e.listIndex),
            e.currentCollection = null;
        },
        getGroupCollection: function() {
            var e = this;
            return e.currentCollection || (e.currentCollection = e._createSearchCollectionForListId(e.currentList.id),
            e.addBoundObjectAtIndex(e.currentCollection, e.listIndex)),
            e.currentCollection;
        },
        _createSearchCollectionForListId: function(e) {
            var t = this
              , i = new n(t.searchCollection.models,{
                sorter: r.position,
                sortProperties: ["position"],
                filter: function(t) {
                    return t.attributes.list_id === e;
                },
                filterProperties: ["list_id"],
                sourceCollection: t.searchCollection
            });
            return i.bindRemovingEvents(),
            i.bindAddingEvents(),
            i;
        },
        getGroupModel: function() {
            var e = this
              , t = new o({
                title: e.currentList.escape("title"),
                groupID: e.currentList.id,
                listID: e.currentList.id,
                allowDrag: !0
            },{
                collection: e.getGroupCollection()
            });
            return e.addBoundObjectAtIndex(t, e.listIndex),
            t;
        }
    });
    return c;
}),
define("models/grouping/SpecificListGrouping", ["application/runtime", "./BaseGrouping", "models/TasksGroupModel", "collections/TasksCountCollection"], function(e, t, i, n) {
    var o = t.extend({
        initialize: function(e, t) {
            var i = this;
            i.listModel = e,
            i.taskCollection = t,
            i.rewind(0);
        },
        rewind: function(e) {
            var t = this;
            1 >= e && (t.atOpenGroup = !0,
            t.atCompletedGroup = !1,
            t._destroyClosedGroup()),
            0 === e && (t.atOpenGroup = !1,
            t.atCompletedGroup = !1,
            t._destroyOpenGroup());
        },
        hasNext: function() {
            var e = this;
            return !e.atOpenGroup || !e.atCompletedGroup;
        },
        moveNext: function() {
            var e = this;
            e.atOpenGroup ? e.atCompletedGroup || (e.atCompletedGroup = !0) : e.atOpenGroup = !0;
        },
        getGroupCollection: function() {
            var e = this;
            return e.atCompletedGroup ? e.taskCollection.getDoneTasks() : e.atOpenGroup ? e.taskCollection.getOpenTasks() : void 0;
        },
        getGroupModel: function() {
            var e = this
              , t = e._createGroupModel();
            if (e._isCompleted()) {
                var i = new n("/tasksCounts/all");
                e.completedGroup = t,
                t.forceItemCount(e._getCompletedTaskCount()),
                t.bindTo(i, "add remove change", "_updateCompletedTitle", e),
                t.bindTo(e.getGroupCollection(), "add remove", "_updateCompletedTitle", e);
            } else
                e._isOpen() && (e.openGroup = t);
            return t;
        },
        _updateCompletedTitle: function() {
            var e = this;
            e.completedGroup.set({
                title: e._doneCountLabel()
            });
        },
        _createGroupModel: function() {
            var e = this
              , t = e.listModel.attributes.online_id;
            return new i({
                title: e._getTitle(),
                label: e._getLabel(),
                groupID: e._getGroupId(),
                canCollapse: e._isCompleted(),
                hasHeader: e._isCompleted(),
                listID: e.listModel.id,
                canEditPosition: e._isOpen(),
                collectionCanIncludeCompletedItems: e._isCompleted(),
                allowDrag: !0,
                allowDropInto: e._isOpen(),
                allowDropToComplete: e._isCompleted()
            },{
                collection: e.getGroupCollection(),
                onlineID: t
            });
        },
        _getLabel: function() {
            var t = this;
            return t.atCompletedGroup ? e.language.getText("settings_show_completed_tasks_mobile") : t.atOpenGroup ? t.listModel.escape("title") : void 0;
        },
        _getTitle: function() {
            var e = this;
            return e.atCompletedGroup ? e._doneCountLabel() : e.atOpenGroup ? e.listModel.escape("title") : void 0;
        },
        _doneCountLabel: function() {
            var t = e.language;
            return t.getLabel("settings_show_completed_tasks_mobile").toString();
        },
        _getCompletedTaskCount: function() {
            var e = this
              , t = e.taskCollection.getDoneTasks().length
              , i = e.listModel.attributes.completedTasksCount;
            i || (i = 0);
            var n = t > i ? t : i;
            return e.defer(function() {
                e.completedGroup && e.completedGroup.set({
                    showHeader: !0
                });
            }),
            n;
        },
        disallowSelectionToOtherGroup: function() {
            return !0;
        },
        onDestroy: function() {
            var e = this;
            e._destroyOpenGroup(),
            e._destroyClosedGroup();
        },
        _destroyOpenGroup: function() {
            var e = this;
            e.openGroup && (e.openGroup.unbindAll(),
            e.openGroup = null);
        },
        _destroyClosedGroup: function() {
            var e = this;
            e.completedGroup && (e.completedGroup.unbindAll(),
            e.completedGroup = null);
        },
        _getGroupId: function() {
            var e = this;
            return e.listModel.id + (e.atCompletedGroup ? "-completed" : "");
        },
        _isOpen: function() {
            var e = this;
            return !e.atCompletedGroup && e.atOpenGroup;
        },
        _isCompleted: function() {
            var e = this;
            return e.atCompletedGroup;
        }
    });
    return o;
}),
define("models/TaskSelectionGroupingMixin", ["project!core"], function(e) {
    return e.WBMixin.extend({
        _selectRange: function(e, t, i, n) {
            var o, a = this;
            return o = t === n ? a._selectRangeWithinSameCollection(e, i, t) : a._selectRangeAcrossCollections(e, t, i, n),
            a._setActiveModel(i, n),
            o;
        },
        _selectRangeWithinSameCollection: function(e, t, i) {
            for (var n, o = this, a = i.indexOf(e), r = i.indexOf(t), s = Math.max(a, r), l = Math.min(a, r), c = l; s >= c; c++)
                n = i.at(c),
                n && o._setAsSelected(n);
            return r - a;
        },
        _selectRangeAcrossCollections: function(e, t, i, n) {
            for (var o, a, r = this, s = r.collections, l = t.indexOf(e), c = n.indexOf(i), d = s.indexOf(t), u = s.indexOf(n), m = u > d, p = m ? d : u, g = m ? u : d, f = m ? l : c, b = m ? c : l, h = f, v = p; g >= v; v++) {
                if (o = s[v]) {
                    a = v === g ? b : o.length - 1;
                    for (var _, w = h; a >= w; w++)
                        _ = o.at(w),
                        _ && r._setAsSelected(_);
                }
                h = 0;
            }
            return u - d;
        },
        _isCollectionEmpty: function(e) {
            if (!e.length)
                return !0;
            var t = e.groupModel.attributes.isCollapsed;
            return t ? !0 : !1;
        },
        _findNextOrPrevCollection: function(e, t, i) {
            var n, o, a = !1;
            return e.forEach(function() {
                t = "up" === i ? t - 1 : t + 1,
                o = e[t],
                o && !a && (this._isCollectionEmpty(o) ? t = "up" === i ? t-- : t++ : (n = o,
                a = !0));
            }, this),
            n;
        }
    });
}),
define("models/TaskSelectionItemStateMixin", ["application/runtime", "project!core"], function(e, t) {
    var i = e._;
    return t.WBMixin.extend({
        getSelectionState: function() {
            var e = this
              , t = e.getSelectedIDs()
              , i = e.getSelectedItems();
            return {
                all: t,
                starred: e.getSelectedStarred(i),
                completed: e.getSelectedCompleted(i),
                dueDates: e.getSelectedDueDates(i),
                listIds: e.getSelectedTaskLists(i)
            };
        },
        getSelectedStarred: function(e) {
            return i.chain(e).filter(function(e) {
                return e.attributes.starred === !0;
            }).pluck("id").value();
        },
        getSelectedCompleted: function(e) {
            return i.chain(e).filter(function(e) {
                return e.attributes.completed === !0;
            }).pluck("id").value();
        },
        getSelectedDueDates: function(e) {
            return i.chain(e).filter(function(e) {
                return e.attributes.due_date;
            }).pluck("id").value();
        },
        getSelectedTaskLists: function(e) {
            return i.chain(e).pluck("attributes").pluck("list_id").uniq().value();
        }
    });
}),
define("models/TaskSelection", ["application/runtime", "./TaskSelectionGroupingMixin", "./TaskSelectionItemStateMixin", "project!core"], function(e, t, i, n, o) {
    var a = n.WBEventEmitter
      , r = n.WBStateModel
      , s = {
        fromSync: !0
    }
      , l = a.prototype
      , c = e._;
    return a.extend({
        mixins: [t, i],
        initialize: function(e) {
            var t = this;
            t.rangeStart = null,
            t.rangeEnd = null,
            t.activeModel = null,
            t.activeCollection = null,
            t.currentDir = null,
            t.selectedCount = 0,
            t.collections = [],
            t.allTasks = e && e.allTasks || [],
            t.disallowSelectionToOtherGroup = e && !!e.disallowSelectionToOtherGroup,
            t.state = new r({
                selectedIDs: []
            }),
            l.initialize.apply(t, arguments);
        },
        addCollectionAndClearSelection: function(e, t) {
            var i = this;
            e.models.forEach(function(e) {
                e["transient"].set({
                    selected: !1,
                    active: !1
                }, s);
            }),
            e.groupId = t.attributes.groupID,
            e.groupModel = t;
            var n = i.collections;
            n.push(e);
        },
        updateRange: function(e, t) {
            var i, n = this;
            if (!n._isSelectionBleedingDisallowed(t)) {
                var o = {
                    model: e,
                    collection: t
                };
                n.rangeStart ? (n.rangeEnd = o,
                n._deselectAll(),
                i = n._selectRange(n.rangeStart.model, n.rangeStart.collection, n.rangeEnd.model, n.rangeEnd.collection),
                n.currentDir = i > 0 ? "down" : "up") : n.rangeStart = o;
            }
        },
        _isSelectionBleedingDisallowed: function(e) {
            var t = this;
            return t.disallowSelectionToOtherGroup && !!t.activeCollection && e !== t.activeCollection;
        },
        toggleSelection: function(e, t) {
            var i, n = this, o = !e.isSelected();
            t && n._isSelectionBleedingDisallowed(t) || (n._setAsSelected(e, o),
            o ? (n._setActiveModel(e, t),
            n._startRange(e, t)) : (i = n._findFirstSelectedModel(),
            i && n._setActiveModel(i.model, i.collection)));
        },
        addToSelection: function(e, t) {
            var i = this;
            i._setAsSelected(e),
            i._setActiveModel(e, t),
            i._startRange(e, t);
        },
        scaleSelection: function(e) {
            var t, i = this, n = 1 === i.selectedCount, o = n || i.currentDir === e;
            n && (i.currentDir = e),
            t = i["up" === e ? "_getPreviousModel" : "_getNextModel"](i.activeModel, i.activeCollection),
            t && !i._isSelectionBleedingDisallowed(t.collection) && (o ? i._setAsSelected(t.model, !0) : i._setAsSelected(i.activeModel, !1),
            i._setActiveModel(t.model, t.collection),
            n && (i.rangeStart = {
                model: i.activeModel,
                collection: i.activeCollection
            }));
        },
        _moveToNextModelAfterHeader: function(e) {
            var t = this;
            if (t.clearSelection(),
            "down" !== e || t.activeHeaderCollection.groupModel.attributes.isCollapsed) {
                var i = t.collections.indexOf(t.activeHeaderCollection)
                  , n = t._findNextOrPrevCollection(t.collections, i, "up");
                if (n) {
                    var o = n.models[n.length - 1];
                    t.addToSelection(o, n);
                }
            } else {
                var a = t.activeHeaderCollection.at(0);
                a && t.addToSelection(a, t.activeHeaderCollection);
            }
        },
        _setHeaderActive: function(e) {
            var t, i = this;
            if ("up" === e)
                t = i.activeCollection;
            else {
                var n = i.collections.indexOf(i.activeCollection);
                t = i._findNextOrPrevCollection(i.collections, n, "down"),
                t || (t = i.collections[n + 1]);
            }
            var o = t && t.groupModel
              , a = o && o.attributes.showHeader;
            a && (i.clearSelection(),
            i.activeHeaderCollection = t,
            i.trigger("activeHeader:set", t.groupId));
        },
        clearAndMoveSelection: function(e) {
            var t, i = this;
            if (i.activeHeaderCollection)
                return void i._moveToNextModelAfterHeader(e);
            if (i.activeCollection)
                if (t = "up" === e ? i._getPreviousModel(i.activeModel, i.activeCollection) : i._getNextModel(i.activeModel, i.activeCollection),
                t && t.model)
                    i.activeCollection && t.collection !== i.activeCollection ? i._setHeaderActive(e) : (i.clearSelection(),
                    i.addToSelection(t.model, t.collection));
                else if ("up" !== e || i.activeHeaderCollection || i._setHeaderActive(e),
                "down" === e && !i.activeHeaderCollection) {
                    var n = i.collections.indexOf(i.activeCollection)
                      , o = i.collections[n + 1];
                    o && i._setHeaderActive(e);
                }
        },
        clearSelection: function() {
            var e = this;
            e.rangeStart = null,
            e.rangeEnd = null,
            e.activeModel = null,
            e.activeCollection = null,
            e.currentDir = null,
            e._deselectAll();
        },
        selectAll: function() {
            var e = this;
            e.activeCollection && e.activeCollection.each(function(t) {
                e.addToSelection(t, e.activeCollection);
            });
        },
        deselectAllAndSelectActive: function() {
            var e = this;
            if (e.activeModel) {
                var t = e.activeModel
                  , i = e.activeCollection;
                e._deselectAll(),
                e._setActiveModel(t, i),
                e._setAsSelected(t, !0);
            }
        },
        getSelectedItems: function() {
            var e = this
              , t = e.state.attributes.selectedIDs.map(function(t) {
                return e.allTasks.get(t);
            });
            return t = t.filter(function(e) {
                return !!e;
            });
        },
        _setActiveModel: function(e, t) {
            var i = this
              , n = i.activeModel;
            n && n["transient"].set("active", !1, s),
            i.activeHeaderCollection && (i.trigger("activeHeader:unset", i.activeHeaderCollection.groupId),
            i.activeHeaderCollection = null),
            i.activeModel = e,
            i.activeCollection = t,
            e && (e["transient"].set("active", !0, s),
            i.activeModel = e,
            i.activeCollection = t,
            i.trigger("active:set", e.getId()));
        },
        _startRange: function(e, t) {
            var i = this;
            i.rangeStart || i.updateRange(e, t);
        },
        _findFirstSelectedModel: function() {
            var e = this
              , t = e.state.attributes.selectedIDs
              , i = t.length && e.allTasks.get(t[0])
              , n = i && i.collections;
            return {
                model: i,
                collection: n
            };
        },
        _setAsSelected: function(e, t) {
            var i = this
              , n = e && e.isSelected()
              , a = e && e.id;
            t === o && (t = !0);
            var r = i.getSelectedIDs();
            t && a ? r.push(a) : a && (r = c.without(r, a)),
            i.state.set("selectedIDs", r),
            t !== n && e && (e["transient"].set("selected", t, s),
            i._setSelectedCount(i.selectedCount + (t ? 1 : -1)));
        },
        _getNextModel: function(e, t) {
            var i, n = this;
            if (!t)
                return null;
            if (i = e ? t.indexOf(e) : -1,
            i === t.length - 1) {
                var o = n.collections
                  , a = o.indexOf(t);
                if (t = n._findNextOrPrevCollection(o, a, "down"),
                !t)
                    return null;
                i = 0;
            } else
                i++;
            return {
                model: t.at(i),
                collection: t
            };
        },
        _getPreviousModel: function(e, t) {
            var i, n = this;
            if (i = e ? t ? t.indexOf(e) : o : t ? t.length : o,
            0 === i) {
                var a = n.collections
                  , r = a.indexOf(t);
                if (t = n._findNextOrPrevCollection(a, r, "up"),
                !t)
                    return null;
                i = t.length - 1;
            } else {
                if (i === o)
                    return null;
                i--;
            }
            return {
                model: t.at(i),
                collection: t
            };
        },
        _deselectAll: function() {
            var e, t = this, i = t.collections;
            t.state.set("selectedIDs", []);
            for (var n = 0, o = i.length; o > n; n++) {
                e = i[n];
                for (var a = 0, r = e.models.length; r > a; a++)
                    e.models[a]["transient"].set({
                        selected: !1,
                        active: !1
                    }, s);
            }
            t._setSelectedCount(0);
        },
        _setSelectedCount: function(t) {
            var i, n = this;
            n.selectedCount = t,
            0 === n.selectedCount ? (n.activeModel = null,
            n.activeCollection = null) : i = n.getSelectedItems(),
            e.trigger("browser:selectionChanged", t || 0, i);
        },
        getSelectedIDs: function() {
            var e = this;
            return e.state.attributes.selectedIDs;
        }
    });
}),
define("models/grouping/GroupChunker", ["project!core"], function(e) {
    var t = e.WBEventEmitter
      , i = t.prototype
      , n = t.extend({
        initialize: function(e, t, n, o) {
            var a = this;
            a.groupIndex = n,
            a.chunking = e,
            a.length = t,
            a.hasHeader = !!o,
            a.renderedAmount = 0,
            i.initialize.apply(a, arguments);
        },
        shouldRenderItem: function(e) {
            var t = this;
            return e >= 0 && e < t.renderedAmount;
        },
        setCollectionLength: function(e, t) {
            var i = this;
            i.length = e,
            i.chunking._lengthChangedFrom(i.groupIndex, t);
        },
        _renderedHeight: function() {
            var e = this;
            return e._calculateHeightForAmount(e.renderedAmount);
        },
        _calculateHeightForAmount: function(e) {
            var t = this
              , i = t.chunking
              , n = e * i.itemSize;
            return t.hasHeader && t.length > 0 && (n += i.groupHeaderSize),
            n;
        },
        _getAmountForHeight: function(e) {
            var t = this
              , i = t.chunking;
            t.hasHeader && t.length > 0 && (e -= i.groupHeaderSize);
            var n = Math.ceil(e / i.itemSize);
            return n = Math.max(n, 0),
            Math.min(n, t.length);
        },
        _setRenderedAmount: function(e, t) {
            var i, n = this, o = e - n.renderedAmount;
            if (e > n.renderedAmount)
                i = "grow";
            else {
                if (!(e < n.renderedAmount))
                    return;
                i = "shrink";
            }
            n.renderedAmount = e,
            t || (n.chunking._startChunking(o),
            n.triggerEvent(i, [n.renderedAmount]));
        },
        _remove: function() {
            var e = this;
            e.triggerEvent("destroy");
        }
    });
    return n;
}),
define("models/GroupedListChunking", ["./grouping/GroupChunker", "project!core"], function(e, t, i) {
    var n = t.WBEventEmitter
      , o = n.prototype
      , a = n.extend({
        initialize: function(e) {
            var t = this;
            t.groups = [],
            t.itemSize = e.itemSize,
            t.viewportHeight = e.viewportHeight,
            t.groupHeaderSize = e.groupHeaderSize || 0,
            t.viewportOffset = e.viewportOffset || 0,
            t.excessHeight = e.excessHeight || 0,
            t.excessThreshold = e.excessThreshold || 0,
            t.fixedContentSize = e.fixedContentSize || 0,
            t.isChunking = !1,
            t._chunkStart = e.chunkStart,
            t._chunkEnd = e.chunkEnd,
            o.initialize.apply(t, arguments);
        },
        addGroup: function(t, i, n, o) {
            var a = this
              , r = new e(a,i,t,n);
            return a.groups[t] = r,
            a._lengthChangedFrom(t, !1, o),
            r;
        },
        appendGroup: function(e, t, i) {
            var n = this
              , o = n.groups.length;
            return n.addGroup(o, e, t, i);
        },
        updateViewport: function(e, t) {
            var i = this
              , n = Math.abs(e - i.viewportOffset);
            if (t === i.viewportHeight && n > 0) {
                var o = i._getTotalViewportHeight(e, t, 0)
                  , a = i._getGroupsHeight();
                if (n <= i.excessThreshold && a > o)
                    return;
            }
            i.viewportOffset = e,
            i.viewportHeight = t,
            i._lengthChangedFrom(0);
        },
        updateViewportHeight: function(e) {
            var t = this;
            t.viewportHeight = e,
            t._lengthChangedFrom(0);
        },
        getTotalHeight: function() {
            var e = this;
            return e.groups.reduce(function(e, t) {
                return e + t._renderedHeight();
            }, 0);
        },
        isViewportFull: function() {
            var e = this
              , t = e._getTotalViewportHeight()
              , i = e._getGroupsHeight();
            return i >= t;
        },
        _lengthChangedFrom: function(e, t, i) {
            for (var n, o = this, a = o.groups.slice(0, e), r = o._getGroupsHeight(a), s = o._getTotalViewportHeight() - r, l = e; s > 0 && l < o.groups.length; ) {
                n = o.groups[l];
                var c = n._getAmountForHeight(s);
                n._setRenderedAmount(c, t),
                s -= n._renderedHeight(),
                ++l;
            }
            0 >= s && l < o.groups.length && o._removeGroupsAtTheBack(o.groups.length - l),
            !i && s > 0 && o.triggerEvent("endReached", [s]),
            o._endChunking();
        },
        _removeGroupsAtTheBack: function(e) {
            var t = this
              , i = t.groups.length - e
              , n = t.groups.slice(i);
            n.forEach(function(e) {
                e._remove();
            }),
            this.groups = this.groups.slice(0, i),
            this.triggerEvent("shrink", [i]);
        },
        _getGroupsHeight: function(e) {
            var t = this;
            return e === i && (e = t.groups),
            e.reduce(function(e, t) {
                return t._renderedHeight() + e;
            }, 0);
        },
        _getTotalViewportHeight: function(e, t, n) {
            var o = this;
            return t === i && (t = o.viewportHeight),
            e === i && (e = o.viewportOffset),
            n === i && (n = o.excessHeight),
            e + t + n - o.fixedContentSize;
        },
        _startChunking: function() {
            var e = this;
            !e.isChunking && e._chunkStart && (e.isChunking = !0,
            e._chunkStart());
        },
        _endChunking: function() {
            var e = this;
            e.isChunking && e._chunkEnd && (e.isChunking = !1,
            e._chunkEnd());
        }
    });
    return a;
}),
define("mixins/TaskBrowserView/SubviewMixin", ["application/runtime", "wunderbits/mixins/WBSubviewsMixin"], function(e, t) {
    var i = e._;
    return t.extend({
        subviewDestroyQueue: [],
        destroySubviews: function() {
            var e, t = this, n = i.clone(t._subviews) || [];
            for (t.subviewDestroyQueue = t.subviewDestroyQueue.concat(n),
            t._subviews = [],
            t._namedSubviews = []; n.length; )
                e = n.shift(),
                e.$el.detach();
            t.debouncedEmptyDestroyQueue || (t.debouncedEmptyDestroyQueue = i.debounce(t.emptyDestroyQueue, 1e3)),
            i.delay(function() {
                t.debouncedEmptyDestroyQueue();
            }, 1e3);
        },
        emptyDestroyQueue: function() {
            for (var e, t = this, i = t.subviewDestroyQueue; i.length; )
                e = i.shift(),
                e && !e.destroyed && e.destroy();
        }
    });
}),
define("/styles/_tasks.js", {
    name: "_tasks",
    data: '#wunderlist-base #tasks{position:relative;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}#wunderlist-base #tasks .tasks-scroll{overflow-y:auto;overflow-x:hidden;margin-right:7px;margin-left:7px;padding-left:7px;padding-right:7px;-webkit-overflow-scrolling:touch;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}#wunderlist-base #tasks .tasks-scroll .task-list{padding-bottom:72px}#wunderlist-base #tasks .grouped-tasks{position:relative;}#wunderlist-base #tasks .grouped-tasks.positionForDrop{padding-top:60px;margin-top:-60px;padding-bottom:60px}#wunderlist-base #tasks .heading{margin-top:20px !important;margin-bottom:10px;word-wrap:break-word;word-break:break-word;font-size:11px;color:#fff;position:relative;}#wunderlist-base #tasks .heading.active a{background:rgba(50,138,214,0.75) !important}#wunderlist-base #tasks .heading a{color:#fff;padding:3px 10px;text-transform:uppercase;letter-spacing:1px;font-weight:400;display:inline-block;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;line-height:16px;-webkit-border-radius:3px;border-radius:3px;}.background-01#wunderlist-base #tasks .heading a{background:rgba(115,62,39,0.75)}.background-02#wunderlist-base #tasks .heading a{background:rgba(83,127,112,0.75)}.background-03#wunderlist-base #tasks .heading a{background:rgba(83,97,127,0.75)}.background-04#wunderlist-base #tasks .heading a{background:rgba(71,143,138,0.75)}.background-05#wunderlist-base #tasks .heading a{background:rgba(168,109,67,0.75)}.background-06#wunderlist-base #tasks .heading a{background:rgba(102,137,100,0.75)}.background-07#wunderlist-base #tasks .heading a{background:rgba(102,152,68,0.75)}.background-08#wunderlist-base #tasks .heading a{background:rgba(4,131,183,0.75)}.background-09#wunderlist-base #tasks .heading a{background:rgba(42,108,136,0.75)}.background-10#wunderlist-base #tasks .heading a{background:rgba(104,55,87,0.75)}.background-11#wunderlist-base #tasks .heading a{background:rgba(51,78,131,0.75)}.background-12#wunderlist-base #tasks .heading a{background:rgba(58,113,115,0.75)}.background-13#wunderlist-base #tasks .heading a{background:rgba(94,140,156,0.75)}.background-14#wunderlist-base #tasks .heading a{background:rgba(47,102,118,0.75)}.background-15#wunderlist-base #tasks .heading a{background:rgba(113,175,140,0.75)}.background-16#wunderlist-base #tasks .heading a{background:rgba(188,74,58,0.75)}.background-17#wunderlist-base #tasks .heading a{background:rgba(89,89,89,0.75)}.background-18#wunderlist-base #tasks .heading a{background:rgba(87,87,87,0.75)}.background-19#wunderlist-base #tasks .heading a{background:rgba(184,109,130,0.75)}.background-20#wunderlist-base #tasks .heading a{background:rgba(96,55,57,0.75)}.background-21#wunderlist-base #tasks .heading a{background:rgba(166,85,65,0.75)}.background-22#wunderlist-base #tasks .heading a{background:rgba(58,127,147,0.75)}.background-23#wunderlist-base #tasks .heading a{background:rgba(87,64,51,0.75)}.background-24#wunderlist-base #tasks .heading a{background:rgba(189,174,136,0.75)}.background-25#wunderlist-base #tasks .heading a{background:rgba(14,145,197,0.75)}.background-26#wunderlist-base #tasks .heading a{background:rgba(118,90,152,0.75)}.background-27#wunderlist-base #tasks .heading a{background:rgba(193,91,61,0.75)}.background-28#wunderlist-base #tasks .heading a{background:rgba(165,126,136,0.75)}.background-29#wunderlist-base #tasks .heading a{background:rgba(191,117,85,0.75)}.background-30#wunderlist-base #tasks .heading a{background:rgba(5,95,235,0.75)}#wunderlist-base #tasks .heading a.no-hover:hover{cursor:default !important}#wunderlist-base #tasks .heading.no-results{font-size:22px;font-weight:bold;text-transform:none}#wunderlist-base #tasks .heading .spinner{-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-o-animation:rotate .8s linear infinite;-ms-animation:rotate .8s linear infinite;animation:rotate .8s linear infinite;display:block;position:absolute;left:50%;top:10px;margin-left:-10px;margin-top:-10px;width:19px;height:19px;opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);background:url("images/loading_black@2x.png");-webkit-background-size:19px;-moz-background-size:19px;background-size:19px}#wunderlist-base #tasks .heading .delete-completed{padding:3px 3px 0 3px;height:22px;cursor:pointer;position:absolute;right:0;top:0;}#wunderlist-base #tasks .heading .delete-completed svg{fill:#fff;-webkit-filter:drop-shadow(0 1px 0 rgba(0,0,0,0.3));width:16px;height:16px}#wunderlist-base #tasks .heading .delete-completed + a{margin-right:32px}'
}),
define("views/Tasks/TasksBrowserView", ["application/runtime", "actions/Factory", "project!core", "vendor/moment", "wunderbits/WBViewPresenter", "views/Tasks/TaskListHeaderView", "views/Tasks/TaskListView", "./Controllers/TaskBrowserViewKeyboardController", "./Controllers/TaskBrowserSelectionController", "./Controllers/TaskContextMenuController", "models/grouping/WeekDayGrouping", "models/grouping/FilterListGrouping", "models/grouping/SearchListGrouping", "models/grouping/SpecificListGrouping", "models/TaskSelection", "models/GroupedListChunking", "helpers/Animator", "wunderbits/helpers/date", "mixins/TaskBrowserView/SubviewMixin", "style!_tasks", "style!taskItem"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w) {
    var k = e.global
      , x = o.prototype
      , y = e._
      , C = o.extend({
        className: "task-list",
        styles: [_, w],
        taskSelection: null,
        "implements": [s, l, c],
        emits: {
            "contextmenu li.taskItem": "contextmenu:tasks"
        },
        observes: {
            runtime: {
                "task:deleted": "selectNextTask",
                "browser:navigate": "handleKeyboardSelection",
                "browser:unselect": "emitResetSelectedTasks",
                "browser:select": ">select:task",
                "browser:selectFirst": "browserSelectFirst",
                "tasks:markDone": ">toggle:done",
                "tasks:toggleStarred": ">toggle:starred",
                "tasks:editTitle": ">edit:title",
                "tasks:delete": ">delete:task",
                "tasks:toggleSelected": "toggleTDV",
                "tasks:selectFirst": "emitSelectFirst",
                "tasks:selectAll": "emitSelectAllTasks",
                "tasks:copy": ">tasks:copy",
                "tasks:cut": ">tasks:cut",
                "tasks:paste": ">tasks:paste"
            },
            "*children": {
                "animationsState:changed": "_setAnimationStateChanged"
            }
        },
        initialize: function(i) {
            var n = this;
            n.taskLookup = t.taskLookup(),
            i = i || {},
            n._debouncedUpdateChunkingViewport = n.debounce(function(e, t) {
                n.chunking.updateViewport(e, t);
            }, 20),
            x.initialize.apply(n, arguments),
            n.getSubview = function(e) {
                var t = n._subviews.filter(function(t) {
                    return t._name === e;
                });
                return t.length ? t[0] : void 0;
            }
            ;
            var o = n.deferred()
              , a = n.deferred();
            n.allTasksAreInList = n.deferred(),
            n.ready = n.deferred(),
            n.currentList = null,
            n.currentLists = {},
            n.currentFilter = null,
            n.currentListId = null,
            n._isAnimating = !1,
            n._focus = null,
            n.selectType = null,
            n.chunking = null,
            n.bindTo(e, "lists:ready", function() {
                n.lists = t.listLookup().acceptedLists,
                o.resolve();
            }),
            n.bindTo(e, "tasks:ready", function(e) {
                n.allTasks = e,
                a.resolve();
            }),
            n.bindTo(e, "subtasks:ready", function(e) {
                n.allSubTasks = e;
            }),
            n.when(o, a).done(function() {
                n.ready.resolve(),
                n.bindTo(e, "focus:changed", "_onFocusChange"),
                n.bindTo(e, "browser:taskId", "_getCurrentId"),
                n.delegateEvents(),
                n._getCurrentId();
            }, n),
            n.bindTo(e, "focus:changed", n.forceFocus),
            n.bindTo(n, "viewport:update", y.throttle(n._updateChunkingToViewport.bind(n), 50)),
            n.bindOnceTo(e, "sync:ended", function() {
                "week" === n.currentFilter ? n.renderFilterOfType(n.currentFilter) : n._adjustChunkingAfterHeightChange();
            }),
            n.bindTo(e, "browser:render", "updateCurrentViewClass"),
            n.bindTo(e.settings, "change:today_smart_list_visible_tasks", function() {
                ("week" === n.currentFilter || "today" === n.currentFilter) && n.renderFilterOfType(n.currentFilter);
            });
        },
        updateCurrentViewClass: function(e) {
            var t = this;
            t.el && (t.$el.attr("class", t.className),
            t.$el.addClass(e));
        },
        getCollection: function(t) {
            var i, n = this;
            return "week" === n.currentFilter || e.smartLists.indexOf(t) >= 0 ? i = n.taskLookup.getSmartListTaskCollection(t) : e.state.attributes.inSearchState ? i = n.taskLookup.getCurrentSearchTaskCollection() : !e.settings.isScopedFiltersEnabled() || "week" !== t && "today" !== t || (i = n.taskLookup.getSmartListTaskCollection(t, "user")),
            i;
        },
        browserSelectFirst: function(e) {
            var t = this;
            t.emitSelectFirst(e),
            t.forceFocus("browser");
        },
        _updateChunkingToViewport: function(e, t) {
            var i = this;
            i.chunking && i._debouncedUpdateChunkingViewport(t, e);
        },
        _adjustChunkingAfterHeightChange: function() {
            var e = this;
            e.chunking && e.chunking.updateViewportHeight(k.innerHeight);
        },
        _createHeaderViewFromGroupModel: function(e, t) {
            var i, n = this, o = e.attributes.groupID;
            return e.attributes.hasHeader ? (i = new a({
                model: e,
                chunking: t
            }),
            i.render(),
            n.addSubview(i, o + "header"),
            i) : void 0;
        },
        getHeaderView: function(e) {
            return this.getSubview(e + "header");
        },
        _createListViewFromGroupModel: function(e, t, i) {
            var n = this
              , o = e.attributes.groupID
              , a = new r({
                collection: t,
                model: e,
                taskSelection: n.taskSelection,
                getSelectedNodes: n.getSelectedNodes.bind(n),
                chunkingGroup: i
            });
            return a.render(),
            n.addSubview(a, o),
            a;
        },
        _renderGroupsToFrag: function() {
            for (var e, t, i, n, o, a = this, r = document.createDocumentFragment(), s = a.chunking, l = a.taskSelection, c = a.currentGrouping; !s.isViewportFull() && c.hasNext(); )
                c.moveNext(),
                t = c.getGroupCollection(),
                i = c.getGroupModel(),
                l.addCollectionAndClearSelection(t, i),
                e = s.appendGroup(t.length, i.get("hasHeader"), !0),
                o = a._createHeaderViewFromGroupModel(i, e),
                o && r.appendChild(o.el),
                n = a._createListViewFromGroupModel(i, t, e),
                r.appendChild(n.el);
            return r;
        },
        _renderMoreGroups: function() {
            var e = this
              , t = e._renderGroupsToFrag();
            e.el.appendChild(t);
        },
        _rewindGrouping: function(e) {
            var t = this;
            t.currentGrouping && t.currentGrouping.rewind(e);
        },
        _getTotalHeight: function(e) {
            for (var t, i = 0; e.hasNext(); )
                e.moveNext(),
                t = e.getItemCount(),
                i += 39 * t + 52;
            return i;
        },
        _renderGrouping: function(e) {
            var t = this;
            t.currentGrouping && t.currentGrouping.destroy(),
            t.currentChunkedView = null,
            t._isAnimating = !1,
            t.destroySubviews(),
            t.currentGrouping = e,
            t.taskSelection = new g({
                disallowSelectionToOtherGroup: e.disallowSelectionToOtherGroup(),
                allTasks: t.allTasks
            }),
            t.taskSelection.clearSelection(),
            t.bindTo(t.taskSelection, "active:set", t.emitActiveSet),
            t.bindTo(t.taskSelection, "activeHeader:set", t.emitActiveHeaderSet),
            t.bindTo(t.taskSelection, "activeHeader:unset", t.emitActiveHeaderUnset),
            t.chunking && (t.chunking.unbindAll(),
            t.unbindFromTarget(t.chunking)),
            t.chunking = new f({
                viewportHeight: k.innerHeight,
                viewportOffset: 0,
                excessHeight: 800,
                excessThreshold: 400,
                itemSize: 38,
                groupHeaderSize: 52,
                fixedContentSize: t.el.getBoundingClientRect().top
            }),
            t.bindTo(t.chunking, "endReached", t._renderMoreGroups),
            t.bindTo(t.chunking, "shrink", t._rewindGrouping),
            t.currentContext = e.filter ? e.filter : e.listModel && e.listModel.id;
            var i = t._renderGroupsToFrag();
            t.el.innerHTML = "",
            t.el.appendChild(i);
        },
        renderFilterOfType: function(t) {
            var i, n = this;
            n.currentFilter = t,
            n.ready.done(function() {
                i = "week" === t ? new d() : new u(n.lists,t),
                e.trigger("browser:render", t);
                var o = n.getCollection(t);
                n.check404State(o, t),
                n.filter404Bind && n.unbindFrom(n.filter404Bind),
                n.filter404Bind = n.bindTo(o, "add remove", function(e, i) {
                    n.check404State(i, t);
                }),
                n._renderGrouping(i);
            });
        },
        check404State: function(t, i) {
            e.trigger("browser:" + (t.length ? "hide404" : "show404"), i);
        },
        renderSearch: function(t) {
            var i = this;
            if (t) {
                var n = new m(t,i.lists);
                return e.trigger("browser:render", "search"),
                i._renderGrouping(n);
            }
        },
        renderSingleListToFilter: function(e) {
            var t = this
              , i = t.taskLookup.getTaskCollection(e.id)
              , n = new p(e,i);
            return t._renderGrouping(n);
        },
        renderListWithID: function(t, i) {
            var n = this
              , o = n.deferred();
            return n.currentFilter = null,
            n.filter404Bind && n.unbindFrom(n.filter404Bind),
            "search" === t && (t = e.lastListID),
            n.ready.done(function() {
                var a = n.lists.get(t);
                a && (e.trigger("browser:render", t),
                n.renderSingleListToFilter(a),
                i && n._setInitialActiveSelection(i, t)),
                o.resolve();
            }),
            o.promise();
        },
        _setInitialActiveSelection: function(e, t) {
            var i = this
              , n = i.taskLookup.getTaskCollection(t);
            n = e.isCompleted() ? n.getDoneTasks() : n.getOpenTasks(),
            i.taskSelection.toggleSelection(e, n);
        },
        _onFocusChange: function(e) {
            var t = this;
            t.destroyed || (t._focus = e,
            "addTask" === e && (t._currentTaskId = null));
        },
        _getCurrentId: function(e) {
            var t = this;
            e ? t._currentTaskId = e : e = t._currentTaskId;
        },
        forceFocus: function(e) {
            var t = this;
            "browser" === e && t.$(".selected").focus();
        },
        getSelectedNodes: function() {
            var e = this;
            if (!e.taskSelection)
                return [];
            var t = e.taskSelection.getSelectedIDs();
            return t.map(function(t) {
                return e._mapIDtoNode(t);
            });
        },
        _mapIDtoNode: function(e) {
            var t = this;
            return t.el.querySelector("[rel='" + e + "']");
        },
        isItemInViewport: function(e) {
            var t = e.getBoundingClientRect();
            return t.top >= 0 && t.bottom <= k.innerHeight;
        },
        scrollToElementInViewport: function(t) {
            var i = this
              , n = i.taskSelection
              , o = n && n.activeModel;
            if (t = t || "down",
            o) {
                var a = o.attributes.list_id
                  , r = i.getSubview(a)
                  , s = r && r.getSubview(o.id);
                if (s)
                    i.isItemInViewport(s.el) || e.trigger("scrollTo:element", s, t);
                else if (r) {
                    var l = r.collection.models[r.currentOffset - 10];
                    l && e.trigger("scrollTo:element", r.getSubview(l.id), t);
                }
            }
        },
        changeIdentfier: function() {
            this.trigger("changed:identifier");
        },
        handleKeyboardSelection: function(t, i) {
            var n = this
              , o = e.isOnTaskRoute();
            if (!n.taskSelection || "up" !== t && "down" !== t || (i ? n.taskSelection.scaleSelection(t) : n.taskSelection.clearAndMoveSelection(t),
            n.scrollToElementInViewport(t)),
            "left" === t && (o ? n.toggleTDV() : (e.trigger("focus:set", "sidebar"),
            n.taskSelection.clearSelection())),
            "right" === t)
                if (n.taskSelection.activeModel)
                    e.trigger("route:" + n.taskSelection.activeModel.route("/title/focus")),
                    n.taskSelection.deselectAllAndSelectActive();
                else if (n.taskSelection.activeHeaderCollection) {
                    var a = n.taskSelection.activeHeaderCollection.groupId
                      , r = n.getHeaderView(a);
                    r && r.handleNavigation();
                }
        },
        emitResetSelectedTasks: function() {
            var e = this;
            e.taskSelection && e.taskSelection.clearSelection();
        },
        toggleTDV: function() {
            var t = this;
            e.isOnTaskRoute() ? e.state.attributes.inSearchState ? e.trigger("detail:close", function() {
                e.trigger("route:search/" + encodeURIComponent(e.currentSearchTerm)),
                e.trigger("focus:set", "browser"),
                t.taskSelection.deselectAllAndSelectActive();
            }) : (e.trigger("route:lists/" + t.currentContext),
            e.trigger("focus:set", "browser")) : t.taskSelection.activeModel && e.trigger("route:" + t.taskSelection.activeModel.route());
        },
        emitActiveSet: function(e) {
            var t = this;
            t.trigger("change:active", e);
        },
        emitActiveHeaderSet: function(e) {
            var t = this;
            t.trigger("change:activeHeader", e);
        },
        emitActiveHeaderUnset: function(e) {
            var t = this;
            t.trigger("change:inactiveHeader", e);
        },
        emitSelectAllTasks: function() {
            this.trigger("select:all");
        },
        _hasSelectableItems: function() {
            var e = this
              , t = e._subviews
              , i = t && t.some(function(e) {
                return "function" == typeof e.hasSelectableItems && e.hasSelectableItems();
            });
            return !!i;
        },
        emitSelectFirst: function() {
            var t = this;
            t.destroyed || (t._hasSelectableItems() ? (t.trigger("select:first"),
            e.trigger("focus:set", "browser")) : e.trigger("focus:addTaskInput"));
        },
        _setAnimationStateChanged: function(e) {
            var t = this;
            t._isAnimating = !!e;
        },
        isAnimating: function() {
            var e = this;
            return e._isAnimating;
        }
    });
    return [v].forEach(function(e) {
        e.applyToClass(C);
    }),
    C;
}),
define("helpers/ListTitleHelper", ["application/runtime", "actions/Factory", "project!core"], function(e, t, i) {
    var n, o = e._, a = t.listLookup(), r = o.clone(e.smartLists);
    return r.push("inbox"),
    i.WBSingleton.extend({
        getById: function(t) {
            if (o.indexOf(r, t.toLowerCase()) >= 0) {
                t = t.toLowerCase(),
                "assigned" === t && (t = "assigned_to_me");
                var i = "smart_list_" + t;
                n = e.language.getText(i);
            } else {
                var s = a.getListModel(t);
                n = s ? s.attributes.title : t;
            }
            return n;
        }
    });
}),
define("views/Toolbar/Controllers/ListToolbarViewController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({});
}),
define("views/Toolbar/Controllers/ActionBarViewController", ["application/runtime", "wunderbits/WBViewController", "actions/Factory"], function(e, t, i) {
    var n = e.$
      , o = t.prototype;
    return t.extend({
        "implements": {
            "toggle:menu": "toggleMenu",
            "delete:task": "onDelete",
            "share:list": "onShareList",
            "duplicate:list": "onDuplicateList",
            "copy:tasks": "onCopyTasks",
            "paste:tasks": "onPasteTasks",
            "flashcards:run": "runFlashCards"
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(e, arguments),
            e.listLookup = i.listLookup(),
            e.duplication = i.duplication();
        },
        toggleMenu: function(e) {
            this.view.toggleMenu(e);
        },
        onDelete: function(t) {
            n(t.target).hasClass("disabled") || (e.trigger("tasks:delete"),
            e.trigger("analytics:TaskActionBar:DeleteSelectedTasks"));
        },
        onShareList: function() {
            var t = this
              , i = t.listLookup.getListModel(e.listId);
            if (i) {
                var n = i.route("/edit/members")
                  , o = e.currentRoute() === n;
                if (!this.view.isSharingEnabled() || o)
                    return;
                e.trigger("onboarding:shareListClicked"),
                e.trigger("route:" + n),
                e.trigger("analytics:TaskActionBar:clickShareList");
            }
        },
        onDuplicateList: function() {
            var t = this
              , i = t.listLookup.getListModel(e.listId);
            i && (t.duplication.duplicateList(i.id).done(function(t) {
                t && e.trigger("route:" + t.route());
            }),
            e.trigger("analytics:list:duplicate", "actionBar"),
            e.trigger("trackingService", "UI.tap", "actionBar.duplicateList")),
            t.view.collapseMenu();
        },
        onCopyTasks: function() {
            var t = this
              , i = t.view
              , n = i.getSelectedTasks();
            n && n.length && (t.duplication.copyTasks(n),
            e.trigger("analytics:copy:tasks", "actionBar"),
            e.trigger("trackingService", "client.copy.tasks", "actionBar")),
            t.view.collapseMenu();
        },
        onPasteTasks: function() {
            var t = this
              , i = t.view
              , n = t.listLookup.getListModel(e.listId)
              , o = n && e.smartLists.indexOf(n.id) > -1
              , a = i.getSelectedTasks();
            if (a && a.length) {
                var r = a[a.length - 1];
                t.duplication.pasteTasks(r),
                e.trigger("analytics:paste:tasks", "actionBar"),
                e.trigger("trackingService", "client.paste.tasks", "actionBar");
            } else
                n && !o && (t.duplication.pasteTasksToList(n.id),
                e.trigger("analytics:paste:tasks", "actionBar"),
                e.trigger("trackingService", "client.paste.tasks", "actionBar"));
            t.view.collapseMenu();
        },
        runFlashCards: function() {
            e.isLabsEnabled("flash_cards") && e.trigger("route:labs/flash-cards/" + e.listId);
        }
    });
}),
define("views/Toolbar/Controllers/ActionBarEmailController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "email:list": "emailList",
            "email:tasks": "emailSelectedTasks"
        },
        emailList: function() {
            var t = this
              , i = t.view;
            e.trigger("email:list", e.listId),
            i.collapseMenu(),
            e.trigger("analytics:TaskActionBar:EmailList");
        },
        emailSelectedTasks: function() {
            var t = this
              , i = t.view
              , n = i.getSelectedTasks();
            n.length && (e.trigger("email:list", e.listId, n),
            e.trigger("analytics:TaskActionBar:EmailSelectedTasks")),
            i.collapseMenu();
        }
    });
}),
define("views/Toolbar/Controllers/ActionBarPrintController", ["actions/Factory", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "print:list": "printList",
            "print:tasks": "printSelected"
        },
        printList: function() {
            this.view.collapseMenu(),
            e.print().printList();
        },
        printSelected: function(t) {
            this.view.isParentLIDisabled(t) || e.print().printSelected();
        }
    });
}),
define("views/Toolbar/Controllers/ActionBarKeysController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i, n) {
    var o = e.$
      , a = n.prototype;
    return n.extend({
        "implements": {
            keydown: "handleKeys"
        },
        initialize: function() {
            var e = this;
            a.initialize.apply(e, arguments),
            e.taskLookup = t.taskLookup();
        },
        handleKeys: function(e) {
            var t = this
              , n = t.view
              , a = e.which
              , r = o(e.target);
            a === i.tab ? t.handleTab(e, r) : a === i.enter ? t.handleEnter(e, r) : a === i.esc && (n.focusMenuItemToggle(r),
            t.stopItCold(e));
        },
        handleEnter: function(e, t) {
            var i = this
              , n = t.closest("div");
            n.hasClass("actionBar-top") ? i.handleMenuItemEnter(e, t) : n.hasClass("actionBar-bottom") && i.handleMenuBarEnter(e, t);
        },
        handleMenuItemEnter: function(e, t) {
            var i = this
              , n = i.view
              , o = t.hasClass("disabled");
            !o && t.find("a").click(),
            n.focusMenuItemToggle(t),
            i.stopItCold(e);
        },
        handleMenuBarEnter: function(e, t) {
            var i = this;
            t.click(),
            i.stopItCold(e);
        },
        handleTab: function(t, i) {
            var n = this;
            if (i.hasClass("first-menu-item") || i.hasClass("last-menu-item"))
                n.handleMenuItemTab(t, i);
            else if (t.shiftKey && i.hasClass("first-tab"))
                e.trigger("focus:set", "browser"),
                o(o(".task-list").find("li.selected").get(0)).focus(),
                n.stopItCold(t);
            else if (!t.shiftKey && i.hasClass("last-tab")) {
                var a = o(".task-list").find("li.selected").attr("rel");
                if (a) {
                    var r = n.taskLookup.getTaskModel(a);
                    e.trigger("route:" + r.route("/title/focus"));
                } else
                    e.trigger("route:" + e.currentRoute());
                n.stopItCold(t);
            }
        },
        handleMenuItemTab: function(e, t) {
            var i = this
              , n = i.view;
            e.shiftKey && t.hasClass("first-menu-item") ? (n.focusLastMenuItem(t),
            i.stopItCold(e)) : !e.shiftKey && t.hasClass("last-menu-item") && (n.focusFirstMenuItem(t),
            i.stopItCold(e));
        },
        stopItCold: function(e) {
            e.preventDefault(),
            e.stopPropagation();
        }
    });
}),
define("views/Toolbar/Controllers/ActionBarMuteController", ["wunderbits/WBViewController", "actions/Factory"], function(e, t, i) {
    var n = e.prototype;
    return e.extend({
        "implements": {
            "toggle:muted": "toggleMuted"
        },
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e.muteList = t.muteList();
        },
        toggleMuted: function() {
            var e = this
              , t = e.view.ownMembership
              , n = t && !t.attributes.muted;
            t && n !== i && e.muteList.setListMuted(t.attributes.list_id, n);
        }
    });
}),
define("views/Toolbar/Controllers/ActionBarPublishController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController"], function(e, t, i) {
    var n = e._
      , o = i.prototype;
    return i.extend({
        "implements": {
            "open:publicList": "openPublicList",
            "unpublish:list": "unpublishList",
            "publish:confirm": "firePublishConfirmDialog"
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(this, arguments),
            e.updateList = t.updateList(),
            e.openUrl = t.openUrl();
        },
        openPublicList: function() {
            var e = this
              , t = e.view.model
              , i = t.getFullPublicURL();
            e.openUrl.openUrl(i, !0);
        },
        unpublishList: function() {
            var e = this
              , t = e.view.model;
            t && e.updateList.unpublishList(t.id),
            e.view.collapseMenu();
        },
        publishList: function() {
            var e = this
              , t = e.view.model;
            t && e.updateList.publishList(t.id);
        },
        firePublishConfirmDialog: function() {
            var t = this
              , i = e.language.getLabel
              , o = t.view.model;
            if (o) {
                var a = o.attributes.title
                  , r = i("publish_list_confirmation_$", n.escape(a)).toString()
                  , s = i("button_publish").toString();
                e.trigger("modal:confirm", {
                    customTitle: r,
                    customText: e.language.getText("publish_list_confirmation_copy"),
                    confirmText: s,
                    confirm: t.publishList.bind(t),
                    customIconClass: "wundercon publish-success",
                    cancel: function() {}
                });
            }
        }
    });
}),
define("views/Toolbar/Controllers/ActionBarSortController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        "implements": {
            "sort:alpha": "debouncedSortAlpha",
            "sort:date": "debouncedSortDate",
            "sort:assignee": "debouncedSortAssignee",
            "sort:creation": "debouncedSortCreation",
            "sort:priority": "debouncedSortPriority"
        },
        initialize: function() {
            var e = this;
            e.destructiveSorting = t.destructiveSorting(),
            e.debouncedSortAlpha = e.debounce(e.sortAlpha, 250),
            e.debouncedSortDate = e.debounce(e.sortDate, 250),
            e.debouncedSortAssignee = e.debounce(e.sortAssignee, 250),
            e.debouncedSortCreation = e.debounce(e.sortCreation, 250),
            e.debouncedSortPriority = e.debounce(e.sortPriority, 250),
            n.initialize.apply(e, arguments);
        },
        sortAlpha: function() {
            this._sortByType("alpha");
        },
        sortDate: function() {
            var e = this
              , t = e.view
              , i = t.isDateSortingEnabled();
            i && e._sortByType("dueDate");
        },
        sortAssignee: function() {
            var e = this
              , t = e.view
              , i = t.isAssigneeSortingEnabled();
            i && e._sortByType("assignee");
        },
        sortCreation: function() {
            this._sortByType("creation");
        },
        sortPriority: function() {
            this._sortByType("priority");
        },
        _sortByType: function(t) {
            var i = this
              , n = i.view;
            i.destructiveSorting.resortList(n.listID, t),
            e.trigger("analytics:TaskActionBar:Sort", t),
            n.collapseMenu();
        }
    });
}),
define("/templates/symbols/copy.js", {
    name: "symbols/copy",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="copy" sketch:type="MSArtboardGroup"> <path d="M12.7921708,6.5 L8.647,10.646 C8.451,10.842 8.451,11.158 8.647,11.353 C8.744,11.451 8.872,11.5 9,11.5 C9.128,11.5 9.256,11.451 9.354,11.353 L13.5,7.207 L13.5,10 C13.5,10.276 13.724,10.5 14,10.5 C14.276,10.5 14.5,10.276 14.5,10 L14.5,6.01573317 C14.5041978,5.88263558 14.4555311,5.7480518 14.354,5.646 C14.2519482,5.54446887 14.1173644,5.4958022 13.9841257,5.5 L10,5.5 C9.724,5.5 9.5,5.724 9.5,6 C9.5,6.276 9.724,6.5 10,6.5 L12.7921708,6.5 L12.7921708,6.5 Z M2.5,5.5 C2.224,5.5 2,5.276 2,5 L2,4.5 C2,3.121 3.121,2 4.5,2 L5,2 C5.276,2 5.5,2.224 5.5,2.5 C5.5,2.776 5.276,3 5,3 L4.5,3 C3.673,3 3,3.673 3,4.5 L3,5 C3,5.276 2.776,5.5 2.5,5.5 Z M5,18 L4.5,18 C3.121,18 2,16.879 2,15.5 L2,15 C2,14.724 2.224,14.5 2.5,14.5 C2.776,14.5 3,14.724 3,15 L3,15.5 C3,16.327 3.673,17 4.5,17 L5,17 C5.276,17 5.5,17.224 5.5,17.5 C5.5,17.776 5.276,18 5,18 Z M15.5,18 L15,18 C14.724,18 14.5,17.776 14.5,17.5 C14.5,17.224 14.724,17 15,17 L15.5,17 C16.327,17 17,16.327 17,15.5 L17,15 C17,14.724 17.224,14.5 17.5,14.5 C17.776,14.5 18,14.724 18,15 L18,15.5 C18,16.879 16.879,18 15.5,18 Z M17.5,5.5 C17.224,5.5 17,5.276 17,5 L17,4.5 C17,3.673 16.327,3 15.5,3 L15,3 C14.724,3 14.5,2.776 14.5,2.5 C14.5,2.224 14.724,2 15,2 L15.5,2 C16.879,2 18,3.121 18,4.5 L18,5 C18,5.276 17.776,5.5 17.5,5.5 Z M2.5,12.5 C2.224,12.5 2,12.276 2,12 L2,8 C2,7.724 2.224,7.5 2.5,7.5 C2.776,7.5 3,7.724 3,8 L3,12 C3,12.276 2.776,12.5 2.5,12.5 Z M17.5,12.5 C17.224,12.5 17,12.276 17,12 L17,8 C17,7.724 17.224,7.5 17.5,7.5 C17.776,7.5 18,7.724 18,8 L18,12 C18,12.276 17.776,12.5 17.5,12.5 Z M12,3 L8,3 C7.724,3 7.5,2.776 7.5,2.5 C7.5,2.224 7.724,2 8,2 L12,2 C12.276,2 12.5,2.224 12.5,2.5 C12.5,2.776 12.276,3 12,3 Z M12,18 L8,18 C7.724,18 7.5,17.776 7.5,17.5 C7.5,17.224 7.724,17 8,17 L12,17 C12.276,17 12.5,17.224 12.5,17.5 C12.5,17.776 12.276,18 12,18 Z" id="Copy" sketch:type="MSShapeGroup"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/paste.js", {
    name: "symbols/paste",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="paste" sketch:type="MSArtboardGroup"> <path d="M15.5,2 L4.5,2 C3.121,2 2,3.121 2,4.5 L2,15.5 C2,16.879 3.121,18 4.5,18 L15.5,18 C16.879,18 18,16.879 18,15.5 L18,4.5 C18,3.121 16.879,2 15.5,2 L15.5,2 Z M17,15.5 C17,16.327 16.327,17 15.5,17 L4.5,17 C3.673,17 3,16.327 3,15.5 L3,4.5 C3,3.673 3.673,3 4.5,3 L15.5,3 C16.327,3 17,3.673 17,4.5 L17,15.5 L17,15.5 Z M11.353,8.646 C11.158,8.451 10.842,8.451 10.646,8.646 L6.5,12.793 L6.5,10 C6.5,9.724 6.276,9.5 6,9.5 C5.724,9.5 5.5,9.724 5.5,10 L5.5,14 C5.5,14.065 5.513,14.13 5.538,14.191 C5.589,14.313 5.687,14.411 5.809,14.462 C5.87,14.487 5.935,14.5 6,14.5 L10,14.5 C10.276,14.5 10.5,14.276 10.5,14 C10.5,13.724 10.276,13.5 10,13.5 L7.207,13.5 L11.353,9.353 C11.549,9.158 11.549,8.842 11.353,8.646" id="Paste" sketch:type="MSShapeGroup"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/publish.js", {
    name: "symbols/publish",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="publish" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="publish"> <path d="M10,2 C5.58,2 2,5.58 2,10 C2,14.42 5.58,18 10,18 C14.42,18 18,14.42 18,10 C18,5.58 14.42,2 10,2 L10,2 Z M10,17 C9.26,17 8.54,16.88 7.88,16.66 C8.12,15.28 7.6,13.82 6.48,12.94 L6.18,12.68 L6.16,12.68 L5.52,12.16 C5.2,11.9 5.02,11.54 5,11.14 C4.98,10.74 5.12,10.36 5.42,10.1 L5.66,9.86 L6.06,9.46 C6.9,8.66 7.12,7.4 6.58,6.34 L5.68,4.5 C6.86,3.56 8.36,3 10,3 C11.12,3 12.18,3.26 13.12,3.74 C12.7,4.3 12.06,4.7 11.36,4.82 L10.36,4.96 C9.6,5.1 9.02,5.76 9.02,6.54 C9,7.04 9.26,7.5 9.68,7.76 C10.1,8.02 10.64,8.04 11.08,7.82 L12.54,7.08 C12.7,7 12.9,7.02 13.04,7.14 L13.48,7.5 C13.88,7.84 14.38,8 14.88,8 C15.18,8 15.48,7.94 15.78,7.82 L16.54,7.48 C16.84,8.26 17,9.12 17,10 C17,13.86 13.86,17 10,17 L10,17 Z M15.38,6.9 C14.96,7.08 14.48,7.02 14.12,6.72 L13.66,6.36 C13.22,6 12.6,5.94 12.08,6.2 L10.62,6.94 C10.5,7 10.34,7 10.22,6.92 C10.08,6.84 10.02,6.7 10.02,6.56 C10.02,6.26 10.24,6 10.52,5.96 L11.52,5.8 C12.52,5.64 13.4,5.06 13.98,4.24 C14.86,4.86 15.58,5.64 16.1,6.58 L15.38,6.9 Z M3,10 C3,8.14 3.72,6.46 4.9,5.2 L5.7,6.8 C6.02,7.46 5.9,8.24 5.36,8.74 L4.96,9.14 L4.72,9.38 C4.22,9.84 3.96,10.52 4,11.2 C4.04,11.88 4.36,12.5 4.88,12.94 L5.54,13.46 L5.56,13.46 L5.86,13.72 C6.64,14.34 7.02,15.32 6.92,16.28 C4.6,15.14 3,12.76 3,10 L3,10 Z M11.48,9 C11.1,9 10.38,9.08 9.78,9.68 C9.26,10.2 9,10.98 9,12 C9.02,14.44 11.14,15.86 11.22,15.92 C11.3,15.98 11.4,16 11.5,16 C11.8,16 12.02,15.78 12.02,15.5 C12.02,15.44 12,15.38 11.98,15.32 C11.96,14.96 11.96,13.92 12.44,13.24 C12.56,13.08 12.74,12.92 12.94,12.76 C13.4,12.38 13.96,11.92 13.96,10.98 C13.96,10.3 13.44,9 11.48,9 L11.48,9 Z M12.3,12 C12.06,12.2 11.82,12.4 11.62,12.66 C11.24,13.2 11.08,13.84 11.02,14.4 C10.54,13.86 10,13.04 10,12 C10,11.26 10.16,10.72 10.5,10.38 C10.82,10.04 11.26,10 11.48,10 C12.92,10 12.96,10.88 12.96,10.98 C12.96,11.42 12.72,11.64 12.3,12 L12.3,12 Z" id="√"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/published.js", {
    name: "symbols/published",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="publish-active" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="publish-active"> <path d="M14.46,14 C14.2,13.98 13.98,13.74 14,13.46 L14,13.18 L14,13 C14,9.14 10.86,6 7,6 L6.5,6 C6.22,6 6,5.78 6,5.5 C6,5.22 6.22,5 6.5,5 L7,5 C11.4,5 15,8.58 15,13 L15,13.16 L15,13.54 C14.98,13.8 14.76,14 14.5,14 L14.46,14 Z M11.5,14 C11.22,14 11,13.78 11,13.5 L11,13 C11,10.8 9.2,9 7,9 L6.5,9 C6.22,9 6,8.78 6,8.5 C6,8.22 6.22,8 6.5,8 L7,8 C9.76,8 12,10.24 12,13 L12,13.5 C12,13.78 11.78,14 11.5,14 L11.5,14 Z M7,15 C5.9,15 5,14.1 5,13 C5,11.9 5.9,11 7,11 C8.1,11 9,11.9 9,13 C9,14.1 8.1,15 7,15 L7,15 Z M7,12 C6.44,12 6,12.44 6,13 C6,13.56 6.44,14 7,14 C7.54,14 8,13.56 8,13 C8,12.44 7.54,12 7,12 L7,12 Z" id="†"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/sort-az.js", {
    name: "symbols/sort-az",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="sort-az"width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="sort-az"> <path d="M14.2,2.3 C14.12,2.12 13.94,2 13.76,2 L13.26,2 C13.06,2 12.88,2.12 12.8,2.3 L10.04,8.3 C9.94,8.54 10.04,8.84 10.3,8.96 C10.54,9.08 10.84,8.96 10.96,8.7 L11.74,7 L15.26,7 L16.04,8.7 C16.14,8.9 16.32,9 16.5,9 C16.58,9 16.64,8.98 16.7,8.96 C16.96,8.84 17.06,8.54 16.96,8.3 L14.2,2.3 Z M5.64,3.02 C5.56,3 5.48,3 5.4,3 C5.3,3.02 5.22,3.08 5.14,3.16 L3.14,5.14 C2.96,5.34 2.96,5.66 3.14,5.86 C3.34,6.04 3.66,6.04 3.86,5.86 L5,4.7 L5,8.5 C5,8.78 5.22,9 5.5,9 C5.78,9 6,8.78 6,8.5 L6,4.7 L7.14,5.86 C7.24,5.96 7.38,6 7.5,6 C7.62,6 7.76,5.96 7.86,5.86 C8.04,5.66 8.04,5.34 7.86,5.14 C5.68,2.98 5.8,3.08 5.64,3.02 L5.64,3.02 Z M14.8,6 L12.2,6 L13.5,3.16 L14.8,6 Z M6,15.3 L6,11.5 C6,11.22 5.78,11 5.5,11 C5.22,11 5,11.22 5,11.5 L5,15.3 L3.86,14.14 C3.66,13.96 3.34,13.96 3.14,14.14 C2.96,14.34 2.96,14.66 3.14,14.86 C5.28,17 5.2,16.96 5.4,17 C5.56,17.02 5.74,16.98 5.86,16.84 L7.86,14.86 C8.04,14.66 8.04,14.34 7.86,14.14 C7.66,13.96 7.34,13.96 7.14,14.14 L6,15.3 Z M15.94,11.26 C15.86,11.1 15.68,11 15.5,11 L11.5,11 C11.22,11 11,11.22 11,11.5 C11,11.78 11.22,12 11.5,12 L14.56,12 L11.08,17.22 C10.98,17.38 10.98,17.58 11.06,17.74 C11.14,17.9 11.32,18 11.5,18 L15.5,18 C15.78,18 16,17.78 16,17.5 C16,17.22 15.78,17 15.5,17 L12.44,17 L15.92,11.78 C16.02,11.62 16.02,11.42 15.94,11.26 L15.94,11.26 Z" id="sort"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/open-public-list.js", {
    name: "symbols/open-public-list",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="open-public-list" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="open-public-list"> <path d="M10.8575,2.1375 C10.6575,1.9575 10.3375,1.9575 10.1375,2.1375 C9.9575,2.3375 9.9575,2.6575 10.1375,2.8575 L15.2975,7.9975 L11.4975,7.9975 C6.8175,7.9975 2.9975,11.8175 2.9975,16.4975 L2.9975,17.4975 C2.9975,17.7775 3.2175,17.9975 3.4975,17.9975 C3.7775,17.9975 3.9975,17.7775 3.9975,17.4975 L3.9975,16.4975 C3.9975,12.3575 7.3575,8.9975 11.4975,8.9975 L15.2975,8.9975 L10.1375,14.1375 C9.9575,14.3375 9.9575,14.6575 10.1375,14.8575 C10.2375,14.9575 10.3775,14.9975 10.4975,14.9975 C10.6175,14.9975 10.7575,14.9575 10.8575,14.8575 L16.8375,8.8575 C17.0575,8.6575 17.0575,8.3375 16.8375,8.1375 L10.8575,2.1375 Z" id="∆"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/unpublish-list.js", {
    name: "symbols/unpublish-list",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="unpublish" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="unpublish-list"> <path d="M6.14,4.16 C7.3,3.4 8.62,3 10,3 C11.12,3 12.18,3.26 13.12,3.74 C12.7,4.3 12.06,4.7 11.36,4.82 L10.36,4.96 C9.6,5.1 9.02,5.76 9.02,6.54 C9,7.04 9.26,7.5 9.68,7.76 C10.12,8.02 10.64,8.04 11.08,7.82 L12.54,7.08 C12.7,7 12.9,7.02 13.04,7.14 L13.48,7.5 C13.88,7.84 14.38,8 14.88,8 C15.18,8 15.48,7.94 15.78,7.82 L16.54,7.48 C16.84,8.26 17,9.12 17,10 C17,11.38 16.6,12.7 15.84,13.86 C15.68,14.08 15.74,14.4 15.98,14.56 C16.06,14.6 16.16,14.64 16.26,14.64 C16.42,14.64 16.58,14.56 16.68,14.42 C17.54,13.1 18,11.58 18,10 C18,5.58 14.42,2 10,2 C8.42,2 6.9,2.46 5.58,3.32 C5.36,3.48 5.3,3.8 5.44,4.02 C5.6,4.26 5.92,4.32 6.14,4.16 L6.14,4.16 Z M3.86,3.14 C3.66,2.96 3.34,2.96 3.14,3.14 C2.96,3.34 2.96,3.66 3.14,3.86 L16.14,16.86 C16.24,16.96 16.38,17 16.5,17 C16.62,17 16.76,16.96 16.86,16.86 C17.04,16.66 17.04,16.34 16.86,16.14 L3.86,3.14 Z M15.38,6.9 C14.96,7.08 14.48,7.02 14.12,6.72 L13.66,6.36 C13.22,6 12.6,5.94 12.08,6.2 L10.62,6.94 C10.5,7 10.34,7 10.22,6.92 C10.08,6.84 10.02,6.7 10.02,6.56 C10.02,6.26 10.24,6 10.52,5.96 L11.52,5.8 C12.52,5.64 13.4,5.06 13.98,4.24 C14.86,4.86 15.58,5.64 16.1,6.58 L15.38,6.9 Z M13.86,15.84 C12.7,16.6 11.38,17 10,17 C9.26,17 8.54,16.88 7.88,16.66 C8.12,15.28 7.6,13.82 6.48,12.94 L6.18,12.68 L6.16,12.68 L5.52,12.16 C5.2,11.9 5.02,11.54 5,11.14 C4.98,10.74 5.12,10.36 5.42,10.1 L5.66,9.86 L6.06,9.46 C6.32,9.22 6.52,8.9 6.66,8.5 C6.76,8.24 6.64,7.96 6.38,7.86 C6.12,7.76 5.84,7.88 5.74,8.14 C5.64,8.4 5.52,8.6 5.36,8.74 L4.96,9.14 L4.72,9.38 C4.22,9.84 3.96,10.52 4,11.2 C4.04,11.88 4.36,12.5 4.88,12.94 L5.54,13.46 L5.56,13.46 L5.86,13.72 C6.64,14.34 7.02,15.32 6.92,16.28 C4.6,15.14 3,12.76 3,10 C3,8.62 3.4,7.28 4.16,6.14 C4.32,5.92 4.26,5.6 4.02,5.44 C3.78,5.3 3.48,5.36 3.32,5.6 C2.46,6.9 2,8.42 2,10 C2,14.42 5.58,18 10,18 C11.58,18 13.1,17.54 14.42,16.68 C14.64,16.52 14.7,16.2 14.56,15.98 C14.4,15.74 14.08,15.68 13.86,15.84 L13.86,15.84 Z M13.42,11.8 C13.66,11.8 13.86,11.66 13.92,11.42 C13.96,11.26 13.96,11.12 13.96,10.98 C13.96,10.34 13.48,9.08 11.66,9.02 C11.38,8.98 11.14,9.22 11.14,9.5 C11.12,9.76 11.34,10 11.62,10.02 C12.92,10.06 12.96,10.9 12.96,10.98 C12.96,11.04 12.96,11.12 12.94,11.2 C12.88,11.46 13.04,11.74 13.32,11.8 L13.42,11.8 Z M10.02,11.68 C10.04,11.4 9.84,11.22 9.56,11.2 C9.3,11.18 9.04,11.44 9.02,11.7 C9,11.8 9,11.9 9,12 C9.02,14.44 11.14,15.86 11.22,15.92 C11.3,15.98 11.4,16 11.5,16 C11.58,16 11.68,15.98 11.76,15.92 C11.92,15.82 12.02,15.64 12,15.44 C12,15.44 11.92,14.66 12.14,13.92 C12.2,13.64 12.06,13.36 11.78,13.3 C11.52,13.22 11.24,13.36 11.16,13.64 C11.1,13.9 11.04,14.16 11.02,14.4 C10.54,13.86 10,13.04 10,12 C10,11.92 10,11.88 10.02,11.82 L10.02,11.68 Z" id="ƒ"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/sort-date.js", {
    name: "symbols/sort-date",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="sort-date" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="sort-date"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z M9,13.12 C9.12,13.12 9.2,13.16 9.26,13.22 C9.3,13.28 9.34,13.34 9.34,13.44 L9.34,14 L5.86,14 L5.86,13.68 C5.86,13.62 5.88,13.56 5.9,13.5 C5.94,13.42 5.98,13.36 6.04,13.3 L7.52,11.82 C7.64,11.68 7.76,11.56 7.86,11.46 C7.94,11.34 8.02,11.22 8.1,11.12 C8.16,11 8.2,10.88 8.24,10.78 C8.28,10.66 8.28,10.54 8.28,10.4 C8.28,10.18 8.22,10.02 8.12,9.9 C8,9.78 7.84,9.72 7.62,9.72 C7.54,9.72 7.46,9.74 7.38,9.76 C7.3,9.8 7.22,9.82 7.16,9.88 C7.1,9.92 7.06,9.98 7,10.04 C6.96,10.1 6.94,10.16 6.92,10.24 C6.88,10.36 6.82,10.44 6.74,10.46 C6.68,10.5 6.58,10.52 6.44,10.5 L5.94,10.4 C5.98,10.16 6.04,9.94 6.16,9.76 C6.26,9.58 6.38,9.42 6.54,9.3 C6.68,9.18 6.86,9.1 7.06,9.04 C7.24,8.96 7.46,8.94 7.68,8.94 C7.92,8.94 8.14,8.98 8.32,9.04 C8.52,9.12 8.68,9.22 8.82,9.34 C8.96,9.46 9.08,9.62 9.14,9.8 C9.22,9.96 9.26,10.16 9.26,10.38 C9.26,10.56 9.24,10.74 9.18,10.88 C9.14,11.04 9.06,11.2 8.96,11.34 C8.88,11.48 8.78,11.62 8.66,11.74 L8.28,12.16 L7.2,13.24 C7.32,13.2 7.44,13.18 7.56,13.16 C7.68,13.14 7.78,13.12 7.88,13.12 L9,13.12 Z M10.48,9 L13.96,9 L13.96,9.4 C13.96,9.52 13.96,9.62 13.92,9.7 L13.86,9.88 L12.02,13.68 C11.98,13.78 11.92,13.84 11.84,13.9 C11.76,13.96 11.66,14 11.52,14 L10.84,14 L12.7,10.28 L12.84,10.04 C12.9,9.98 12.94,9.9 13,9.84 L10.7,9.84 C10.64,9.84 10.6,9.82 10.54,9.78 C10.5,9.74 10.48,9.68 10.48,9.62 L10.48,9 Z" id="c"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/sort-creation.js", {
    name: "symbols/sort-creation",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="sort-creation" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="sort-creation"> <path d="M9.5,17 C5.36,17 2,13.64 2,9.5 C2,5.36 5.36,2 9.5,2 C13.64,2 17,5.36 17,9.5 C17,9.78 16.78,10 16.5,10 C16.22,10 16,9.78 16,9.5 C16,5.92 13.08,3 9.5,3 C5.92,3 3,5.92 3,9.5 C3,13.08 5.92,16 9.5,16 C9.78,16 10,16.22 10,16.5 C10,16.78 9.78,17 9.5,17 L9.5,17 Z M6.5,11 C6.22,11 6,10.78 6,10.5 C6,10.22 6.22,10 6.5,10 L10,10 L10,5.5 C10,5.22 10.22,5 10.5,5 C10.78,5 11,5.22 11,5.5 L11,10.5 C11,10.78 10.78,11 10.5,11 L6.5,11 Z M12.5,18 C11.68,18 11,17.32 11,16.5 L11,12.5 C11,11.68 11.68,11 12.5,11 L16.5,11 C17.32,11 18,11.68 18,12.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L12.5,18 Z M12.5,12 C12.22,12 12,12.22 12,12.5 L12,16.5 C12,16.78 12.22,17 12.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,12.5 C17,12.22 16.78,12 16.5,12 L12.5,12 Z M14.5,16 C14.22,16 14,15.78 14,15.5 L14,14.3 L13.72,14.44 C13.48,14.58 13.18,14.48 13.06,14.22 C12.92,13.98 13.02,13.68 13.28,13.56 L14.28,13.06 C14.44,12.98 14.62,12.98 14.76,13.08 C14.92,13.16 15,13.32 15,13.5 L15,15.5 C15,15.78 14.78,16 14.5,16 L14.5,16 Z" id="≠"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/email.js", {
    name: "symbols/email",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="email" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="email"> <path d="M4.5,17 C3.12,17 2,15.88 2,14.5 L2,5.5 C2,4.12 3.12,3 4.5,3 L15.5,3 C16.88,3 18,4.12 18,5.5 L18,14.5 C18,15.88 16.88,17 15.5,17 L4.5,17 Z M4.5,4 C3.68,4 3,4.68 3,5.5 L3,14.5 C3,15.32 3.68,16 4.5,16 L15.5,16 C16.32,16 17,15.32 17,14.5 L17,5.5 C17,4.68 16.32,4 15.5,4 L4.5,4 Z M10,11.5 C9.88,11.5 9.74,11.46 9.64,11.36 L4.14,5.86 C3.96,5.66 3.96,5.34 4.14,5.14 C4.34,4.96 4.66,4.96 4.86,5.14 L10,10.3 L15.14,5.14 C15.34,4.96 15.66,4.96 15.86,5.14 C16.04,5.34 16.04,5.66 15.86,5.86 L10.36,11.36 C10.26,11.46 10.12,11.5 10,11.5 L10,11.5 Z" id="X"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/print.js", {
    name: "symbols/print",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="print" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g > <path d="M4.5,6 C3.12,6 2,7.12 2,8.5 L2,14.5 C2,14.78 2.22,15 2.5,15 L5,15 L5,17.5 C5,17.78 5.22,18 5.5,18 L14.5,18 C14.78,18 15,17.78 15,17.5 L15,15 L17.5,15 C17.78,15 18,14.78 18,14.5 L18,8.5 C18,7.12 16.88,6 15.5,6 L4.5,6 Z M17,14 L15,14 L15,12 L15.5,12 C15.78,12 16,11.78 16,11.5 C16,11.22 15.78,11 15.5,11 L4.5,11 C4.22,11 4,11.22 4,11.5 C4,11.78 4.22,12 4.5,12 L5,12 L5,14 L3,14 L3,8.5 C3,7.68 3.68,7 4.5,7 L15.5,7 C16.32,7 17,7.68 17,8.5 L17,14 Z M14,12 L14,17 L6,17 L6,12 L14,12 Z" id="Z"></path> <path d="M5.5,5 C5.78,5 6,4.78 6,4.5 L6,3 L14,3 L14,4.5 C14,4.78 14.22,5 14.5,5 C14.78,5 15,4.78 15,4.5 L15,2.5 C15,2.22 14.78,2 14.5,2 L5.5,2 C5.22,2 5,2.22 5,2.5 L5,4.5 C5,4.78 5.22,5 5.5,5 L5.5,5 Z" id="Path"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/do-not-disturb.js", {
    name: "symbols/do-not-disturb",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="do-no-disturb" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="do-no-disturb"> <path d="M15.474,10.7635 C16.694,9.9435 17.494,8.5635 17.494,7.0035 C17.494,4.5235 15.474,2.5035 12.994,2.5035 C11.434,2.5035 10.054,3.3035 9.234,4.5235 L7.354,2.6435 C7.234,2.5035 7.034,2.4635 6.854,2.5235 C6.674,2.5835 6.534,2.7235 6.514,2.9235 L5.514,9.4235 C5.494,9.5835 5.534,9.7435 5.654,9.8435 L10.154,14.3435 C10.254,14.4435 10.374,14.4835 10.494,14.4835 L10.574,14.4835 L17.074,13.4835 C17.274,13.4635 17.414,13.3235 17.474,13.1435 C17.534,12.9635 17.494,12.7635 17.354,12.6435 L15.474,10.7635 Z M12.994,3.5035 C14.914,3.5035 16.494,5.0835 16.494,7.0035 C16.494,8.3835 15.694,9.5835 14.514,10.1635 C14.474,10.1635 14.414,10.1835 14.374,10.2235 C13.954,10.4035 13.474,10.5035 12.994,10.5035 C11.054,10.5035 9.494,8.9435 9.494,7.0035 C9.494,6.5235 9.594,6.0435 9.774,5.6235 C9.814,5.5835 9.834,5.5235 9.834,5.4835 C10.414,4.3035 11.614,3.5035 12.994,3.5035 L12.994,3.5035 Z M15.954,12.6435 L10.674,13.4635 L6.534,9.3235 L7.354,4.0435 L8.774,5.4635 C8.594,5.9435 8.494,6.4635 8.494,7.0035 C8.494,9.4835 10.514,11.5035 12.994,11.5035 C13.534,11.5035 14.054,11.4035 14.534,11.2235 L15.954,12.6435 Z M11.134,8.8635 C11.234,8.9635 11.374,9.0035 11.494,9.0035 C11.614,9.0035 11.754,8.9635 11.854,8.8635 L12.994,7.7035 L14.134,8.8635 C14.234,8.9635 14.374,9.0035 14.494,9.0035 C14.614,9.0035 14.754,8.9635 14.854,8.8635 C15.034,8.6635 15.034,8.3435 14.854,8.1435 L13.694,7.0035 L14.854,5.8635 C15.034,5.6635 15.034,5.3435 14.854,5.1435 C14.654,4.9635 14.334,4.9635 14.134,5.1435 L12.994,6.3035 L11.854,5.1435 C11.654,4.9635 11.334,4.9635 11.134,5.1435 C10.954,5.3435 10.954,5.6635 11.134,5.8635 L12.294,7.0035 L11.134,8.1435 C10.954,8.3435 10.954,8.6635 11.134,8.8635 L11.134,8.8635 Z M6.994,16.3035 C6.714,16.5635 6.294,16.5635 6.014,16.3035 L3.694,13.9835 C3.434,13.7035 3.434,13.2835 3.694,13.0035 L5.354,11.3435 C5.554,11.1435 5.554,10.8435 5.354,10.6435 C5.154,10.4435 4.854,10.4435 4.654,10.6435 L2.994,12.3035 C2.334,12.9635 2.334,14.0235 2.994,14.6835 L5.314,17.0035 C5.654,17.3435 6.074,17.5035 6.514,17.5035 C6.934,17.5035 7.374,17.3435 7.694,17.0035 L9.354,15.3435 C9.554,15.1435 9.554,14.8435 9.354,14.6435 C9.154,14.4435 8.854,14.4435 8.654,14.6435 L6.994,16.3035 Z" id="®"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/actionBar.js", {
    name: "actionBar",
    data: {
        "1": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <!-- Publishing --> <ul class="actionBar-top-publish"> <li tabindex="0" class="first-menu-item" data-key-aria-label="button_open_public_list"> <a class="actionBar-top-open-public-list"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "open-public-list", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_open_public_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" class="last-menu-item" data-key-aria-label="button_unpublish_list"> <a class="actionBar-top-unpublish-list"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "unpublish-list", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_unpublish_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> </li> </ul> ";
        },
        "3": function() {
            return " disabled ";
        },
        "5": function() {
            return "do-not-disturb-label";
        },
        "7": function() {
            return "un-mute";
        },
        "9": function() {
            return "active";
        },
        "11": function(e, t, i, n) {
            var o, a = " <!-- publish --> ";
            return o = t.unless.call(e, e && e.isPublic, {
                name: "unless",
                hash: {},
                fn: this.program(12, n),
                inverse: this.program(14, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "12": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <li tabindex="0" class="" data-key-aria-label="button_publish"> <a class="publish" role="button" tabindex="0" data-key-aria-label="button_publish"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "publish", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="tab-text">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_publish", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> </a> </li> ";
        },
        "14": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <li tabindex="0" class="" data-key-aria-label="button_unpublish_list"> <a class="tab published" data-menu="publish" role="button" tabindex="0" data-key-aria-label="button_published"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "published", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="tab-text">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_unpublish_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> </a> </li> ";
        },
        "16": function() {
            return "last-tab";
        },
        "18": function() {
            return ' <a class="icon action-flash-cards last-tab" role="button" tabindex="0" aria-label="flash cards"></a> ';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="actionBar-top"> ';
            return o = t["if"].call(e, !1, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' <!-- Sorting --> <ul class="actionBar-top-sort"> <li tabindex="0" class="first-menu-item" data-key-aria-label="actionbar_sort_alphabetically"> <a class="actionBar-top-sort-az"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "sort-az", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_sort_alphabetically", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" data-key-aria-label="actionbar_sort_due_date"> <a class="actionBar-top-sort-date"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "sort-date", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_sort_due_date", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" data-key-aria-label="actionbar_sort_creation_date"> <a class="actionBar-top-sort-creation"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "sort-creation", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_sort_created_at", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" data-key-aria-label="actionbar_sort_assignee"> <a class="actionBar-top-sort-assign"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "assigned", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_sort_assignee", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" class="last-menu-item" data-key-aria-label="actionbar_sort_priority"> <a class="actionBar-top-sort-priority"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "starred", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_sort_priority", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> </ul> <!-- More --> <ul class="actionBar-top-more"> <!-- duplication --> <li tabindex="0" class="first-menu-item" data-key-aria-label="actionbar_duplicate_list"> <a class="actionBar-top-duplicate-list"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "duplicate", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_duplicate_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" data-key-aria-label="contextual_copy_selected_task"> <a class="actionBar-top-copy-item"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "copy", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "contextual_copy_selected_task", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li tabindex="0" data-key-aria-label="contextual_paste_task"> <a class="actionBar-top-paste-item"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "paste", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "contextual_paste_task", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <li tabindex="0" data-key-aria-label="button_email_list"> <a class="actionBar-top-email-all"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "email", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_email_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" data-key-aria-label="actionbar_email_selected_item"> <a class="actionBar-top-email-selected"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "email", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="email-items-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_email_selected_item", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <!-- print --> <li tabindex="0" class="" data-key-aria-label="button_print_list"> <a class="actionBar-top-print-all"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "print", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_print_list", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> </li> <li tabindex="0" class="" data-key-aria-label="actionbar_print_selected_item"> <a class="actionBar-top-print-selected"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "print", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="print-items-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "actionbar_print_selected_item", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> <!-- do not disturb --> <li tabindex="0" class="',
            o = t.unless.call(e, e && e.isShared, {
                name: "unless",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" data-key-aria-label="options_do_not_disturb"> <a class="actionBar-top-do-not-disturb"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "do-not-disturb", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="',
            o = t["if"].call(e, e && e.isMuted, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.program(7, n),
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "options_do_not_disturb", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> <span class="status-label right on ',
            o = t["if"].call(e, e && e.isMuted, {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_on", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> <span class="status-label right off ',
            o = t["if"].call(e, e && e.isNotMuted, {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "label_off", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> </a> </li> ",
            o = t["if"].call(e, !1, {
                name: "if",
                hash: {},
                fn: this.program(11, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' <!-- delete selected item --> <li tabindex="0" class="last-menu-item" data-key-aria-label="button_delete"> <a class="actionBar-top-trash"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "trash", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="delete-items-label">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "menubar_delete_task", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> </li> </ul> </div> <div class="actionBar-bottom"> <a class="tab share first-tab" data-menu="share" role="button" tabindex="0" data-key-aria-label="button_label_publiclist_share"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "share", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="tab-text">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_label_publiclist_share", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> <a class="tab sort-az" data-menu="sort" role="button" tabindex="0" data-key-aria-label="aria_sort_list"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "sort-az", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="tab-text">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_sort", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </a> <a class="tab ',
            o = t.unless.call(e, e && e.labsFlashCardsEnabled, {
                name: "unless",
                hash: {},
                fn: this.program(16, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" data-menu="more" role="button" tabindex="0" data-key-aria-label="button_more"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "folder-option", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="tab-text">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_more", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</span> </a> ",
            o = t["if"].call(e, e && e.labsFlashCardsEnabled, {
                name: "if",
                hash: {},
                fn: this.program(18, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " </div> ";
        },
        useData: !0
    }
}),
define("/styles/actionBar.js", {
    name: "actionBar",
    data: '.actionBar{opacity:1;-ms-filter:none;filter:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0 !important;-webkit-transition:opacity 200ms ease-in;-moz-transition:opacity 200ms ease-in;-o-transition:opacity 200ms ease-in;-ms-transition:opacity 200ms ease-in;transition:opacity 200ms ease-in;position:relative;}.actionBar.expanded .actionBar-top ul.active{z-index:1;}.actionBar.expanded .actionBar-top ul.active li{opacity:1;-ms-filter:none;filter:none}.actionBar.expanded .actionBar-bottom a{opacity:.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";filter:alpha(opacity=60);}.actionBar.expanded .actionBar-bottom a.active{opacity:1;-ms-filter:none;filter:none}.actionBar-top{position:absolute;top:45px;width:250px;-webkit-transition:height 120ms linear;-moz-transition:height 120ms linear;-o-transition:height 120ms linear;-ms-transition:height 120ms linear;transition:height 120ms linear;z-index:2;overflow:hidden;}.background-01 .actionBar-top{background:#733e27}.background-02 .actionBar-top{background:#537f70}.background-03 .actionBar-top{background:#53617f}.background-04 .actionBar-top{background:#478f8a}.background-05 .actionBar-top{background:#a86d43}.background-06 .actionBar-top{background:#668964}.background-07 .actionBar-top{background:#669844}.background-08 .actionBar-top{background:#0483b7}.background-09 .actionBar-top{background:#2a6c88}.background-10 .actionBar-top{background:#683757}.background-11 .actionBar-top{background:#334e83}.background-12 .actionBar-top{background:#3a7173}.background-13 .actionBar-top{background:#5e8c9c}.background-14 .actionBar-top{background:#2f6676}.background-15 .actionBar-top{background:#71af8c}.background-16 .actionBar-top{background:#bc4a3a}.background-17 .actionBar-top{background:#595959}.background-18 .actionBar-top{background:#575757}.background-19 .actionBar-top{background:#b86d82}.background-20 .actionBar-top{background:#603739}.background-21 .actionBar-top{background:#a65541}.background-22 .actionBar-top{background:#3a7f93}.background-23 .actionBar-top{background:#574033}.background-24 .actionBar-top{background:#bdae88}.background-25 .actionBar-top{background:#0e91c5}.background-26 .actionBar-top{background:#765a98}.background-27 .actionBar-top{background:#c15b3d}.background-28 .actionBar-top{background:#a57e88}.background-29 .actionBar-top{background:#bf7555}.background-30 .actionBar-top{background:#055feb}.actionBar-top ul{position:absolute;z-index:0;top:0;left:0;right:0;overflow:hidden;}.actionBar-top ul.active li.disabled{opacity:.4 !important;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)" !important;filter:alpha(opacity=40) !important;}.actionBar-top ul.active li.disabled a{cursor:default}.actionBar-top li{position:relative;padding:1px 2px 2px 2px;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);-webkit-transition:opacity 200ms linear;-moz-transition:opacity 200ms linear;-o-transition:opacity 200ms linear;-ms-transition:opacity 200ms linear;transition:opacity 200ms linear;}.actionBar-top li:focus a{background:rgba(255,255,255,0.1);color:#fff;}.actionBar-top li:focus a svg{fill:#fff}.actionBar-top li a{display:block;padding:7px;padding-left:34px;color:#fff;}.actionBar-top li a.disabled{cursor:default;opacity:.4 !important;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)" !important;filter:alpha(opacity=40) !important}.actionBar-top li a svg{fill:#fff;position:absolute;top:7px}.actionBar-top li a .status-label{font-size:85%;text-transform:uppercase;padding:1px;display:none;color:#b2b2b2;}.actionBar-top li a .status-label.active{display:block}.actionBar-top li:focus .status-label{color:#fff !important}.actionBar-bottom{text-align:center;font-size:0;padding-top:0;height:45px;}.actionBar-bottom a{display:inline-block;min-width:40px;padding:6px;}.actionBar-bottom a:focus{background:rgba(255,255,255,0.1)}.actionBar-bottom a.disabled{opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);cursor:default}.actionBar-bottom a svg{fill:#fff;}.actionBar-bottom a svg.disabled span{color:#b2b2b2 !important}.actionBar-bottom a .tab-text{font-size:10px;color:#fff;display:block;text-align:center}html[dir=ltr] .actionBar-top{right:0;}html[dir=ltr] .actionBar-top li a svg{left:8px}html[dir=rtl] .actionBar-top{left:0;}html[dir=rtl] .actionBar-top li a{padding-right:34px;padding-left:7px;}html[dir=rtl] .actionBar-top li a svg{right:8px}'
}),
define("views/Toolbar/ActionBarView", ["application/runtime", "actions/Factory", "wunderbits/WBViewPresenter", "./Controllers/ActionBarViewController", "./Controllers/ActionBarEmailController", "./Controllers/ActionBarPrintController", "./Controllers/ActionBarKeysController", "./Controllers/ActionBarMuteController", "./Controllers/ActionBarPublishController", "./Controllers/ActionBarSortController", "partial!symbols/duplicate", "partial!symbols/copy", "partial!symbols/paste", "partial!symbols/share", "partial!symbols/publish", "partial!symbols/published", "partial!symbols/sort-az", "partial!symbols/folder-option", "partial!symbols/open-public-list", "partial!symbols/unpublish-list", "partial!symbols/sort-az", "partial!symbols/sort-date", "partial!symbols/sort-creation", "partial!symbols/assigned", "partial!symbols/starred", "partial!symbols/email", "partial!symbols/print", "partial!symbols/do-not-disturb", "partial!symbols/trash", "template!actionBar", "style!actionBar"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S, L, D, j, M, z) {
    var I = e.$
      , A = e._
      , P = i.prototype
      , B = "aria-disabled"
      , F = 0;
    return i.extend({
        template: j,
        className: "actionBar",
        styles: [M],
        "implements": [n, o, a, r, s, l, c],
        emits: {
            "click .actionBar-bottom .tab": "toggle:menu",
            "click .actionBar-top-email-all": "email:list",
            "click .actionBar-top-email-selected": "email:tasks",
            "click .actionBar-top-print-all": "print:list",
            "click .actionBar-top-print-selected": "print:tasks",
            "click .actionBar-top-duplicate-list": "duplicate:list",
            "click .actionBar-top-copy-item": "copy:tasks",
            "click .actionBar-top-paste-item": "paste:tasks",
            "click .actionBar-top-sort-az": "sort:alpha",
            "click .actionBar-top-sort-date": "sort:date",
            "click .actionBar-top-sort-assign": "sort:assignee",
            "click .actionBar-top-sort-creation": "sort:creation",
            "click .actionBar-top-sort-priority": "sort:priority",
            "click .actionBar-top-open-public-list": "open:publicList",
            "click .actionBar-top-unpublish-list": "unpublish:list",
            "click .actionBar-top-do-not-disturb": "toggle:muted",
            "click .actionBar-bottom a.share": "share:list",
            "click .actionBar-top-trash": "delete:task",
            "click .actionBar-bottom a.cards": "flashcards:run",
            "click .publish": "publish:confirm",
            keydown: "keydown"
        },
        observes: {
            runtime: {
                "taskActions:collapse": "collapseMenu",
                "taskActions:focus": "focusStart",
                "browser:render": "onRenderTaskBrowser",
                "tasks:delete": "updateLabelsThatDependOnTaskSelectionCounts",
                "restore:actionBarState": "updateLabelsThatDependOnTaskSelectionCounts",
                "browser:selectionChanged": ["updateLabelsThatDependOnTaskSelectionCounts", "updateTrashDisabled", "updatePasteAction"]
            },
            model: {
                "change:public": "updatePublicToggle"
            },
            duplicationState: {
                "change:copiedTasksCount": "updatePasteAction"
            }
        },
        renderData: {
            isMuted: z,
            isNotMuted: z,
            isChromeApp: z,
            labsFlashCardsEnabled: z,
            isPublic: z,
            isOwnList: z,
            isShared: z
        },
        formatData: function() {
            var t = this
              , i = P.formatData.apply(t, arguments)
              , n = t.memberships && t.memberships.findWhere({
                user_id: "" + e.user.id
            })
              , o = n && n.attributes || {};
            return i.isMuted = !!o.muted,
            i.isNotMuted = !o.muted,
            i.isChromeApp = e.env.isChromeApp(),
            i.labsFlashCardsEnabled = e.isLabsEnabled("flash_cards"),
            i.isPublic = t.model && t.model.attributes["public"],
            t.isOwnList = o.owner_id === e.user.id,
            i.isShared = t.model && t.model.isShared(),
            i;
        },
        initialize: function() {
            var e = this;
            e.duplication = t.duplication(),
            e.duplicationState = e.duplication.state,
            e.listLookup = t.listLookup(),
            e.membershipLookup = t.membershipLookup(),
            e.debouncedUpdateDisabled = e.debounce(e.updateDisabled, 250),
            e.updateLabelsThatDependOnTaskSelectionCounts = e.debounce(e.updateLabelsThatDependOnTaskSelectionCounts, 250),
            e.updateTrashDisabled = e.debounce(e.updateTrashDisabled, 250),
            P.initialize.apply(e, arguments);
        },
        render: function() {
            var t = this;
            return P.render.apply(t, arguments),
            t.defer(function() {
                e.trigger("tasks:updateSelectionCount"),
                t.updateLabelsThatDependOnTaskSelectionCounts();
            }),
            t.delegateEvents(),
            t;
        },
        setCurrentListID: function(t) {
            var i = this
              , n = i.listLookup.getListModel(t);
            i.model = n,
            i.listID = n && n.id,
            i.listID ? (i.memberships = i.membershipLookup.getMembershipCollection(i.listID),
            i.ownMembership = i.memberships.findWhere({
                user_id: "" + e.user.id
            })) : i.memberships = z,
            i.model && i.setupModelBinds(),
            i.updateMuteToggle(),
            i.updatePublicToggle(),
            i.updateDisabled(i.listID),
            i.updateSortDisabled(),
            i.updatePasteAction();
        },
        setupModelBinds: function() {
            var e = this;
            e.bindTo(e.model, "change:public", function(t) {
                e.updatePublicToggle(),
                e.updateDisabled(t.id);
            }),
            e.bindTo(e.model, "change:isShared", e.updateMuteToggle),
            e.ownMembership && e.bindTo(e.ownMembership, "change:muted", "updateMuteToggle");
        },
        updateMuteToggle: function() {
            var e = this
              , t = e.ownMembership
              , i = t && t.attributes || {}
              , n = e.$(".actionBar-top-do-not-disturb");
            n.find(".wundercon").toggleClass("un-mute do-not-disturb-label", !i.muted),
            n.find(".status-label.on").toggleClass("active", i.muted),
            n.find(".status-label.off").toggleClass("active", !i.muted);
            var o = e.model && e.model.isShared();
            n.closest("li").toggleClass("disabled", !o);
        },
        updatePublicToggle: function() {
            var e = this;
            e.render();
        },
        onRenderTaskBrowser: function(e) {
            var t = this;
            if (t.listID = e,
            e !== t.lastListId) {
                t.updateDisabled(e),
                t.updateSortDisabled(),
                t.lastListId = e,
                t.tasksCollectionBind && t.unbindFrom(t.tasksCollectionBind),
                t.tasksCollectionSortBind && t.unbindFrom(t.tasksCollectionSortBind);
                var i = t.listLookup.getTaskCollection(e);
                t.tasksCollectionBind = t.bindTo(i, "add remove change", "debouncedUpdateDisabled"),
                t.tasksCollectionSortBind = t.bindTo(i, "add remove change:assignee_id change:due_date", "updateSortDisabled");
            }
        },
        updateLabelsThatDependOnTaskSelectionCounts: function(t) {
            var i = this
              , n = i.$(".print-items-label")
              , o = i.$(".email-items-label")
              , a = i.$(".delete-items-label")
              , r = i.$(".actionBar-top-copy-item")
              , s = r.find(".label");
            t > 1 ? (n.html(e.language.getLabel("actionbar_print_$_selected_items_plural", t).toString()),
            o.html(e.language.getLabel("actionbar_email_$_selected_items_plural", t).toString()),
            a.html(e.language.getLabel("menubar_delete_task_plural").toString()),
            s.html(e.language.getLabel("contextual_copy_selected_task_plural_$", t).toString())) : (n.html(e.language.getLabel("actionbar_print_selected_item").toString()),
            o.html(e.language.getLabel("actionbar_email_selected_item").toString()),
            a.html(e.language.getLabel("menubar_delete_task").toString()),
            s.html(e.language.getLabel("contextual_copy_selected_task").toString())),
            n.parents("li").toggleClass("disabled", !t).attr(B, !t),
            o.parents("li").toggleClass("disabled", !t).attr(B, !t),
            a.parents("li").toggleClass("disabled", !t).attr(B, !t),
            r.toggleClass("hidden", !t).attr(B, !t),
            e.isLabsEnabled("flash_cards") && i.$(".flash-cards-selected").parents("li").toggleClass("disabled", !0).attr(B, !0),
            i.renderLabels();
        },
        updateDisabled: function(t) {
            var i = arguments[2] || {};
            if (!i.fromDestructiveSort) {
                var n = this;
                t = A.isString(t) ? t : n.lastListId;
                var o = A.clone(e.smartLists);
                o.push("inbox", "search");
                var a, r = n.$(".share"), s = n.$(".sort-az");
                if (t) {
                    a = A.indexOf(o, t) >= 0,
                    r.toggleClass("disabled", a).attr(B, a),
                    n.updateDuplicateList(t);
                    var l = n.$(".publish")
                      , c = n.model && n.model.isOwner();
                    l.toggleClass("disabled", !c || a).attr(B, !c || a),
                    n.model && n.model.isPublic() && !c && (l.removeClass("disabled"),
                    n.$(".actionBar-top-unpublish-list").addClass("disabled")),
                    "inbox" === t && (a = !1);
                    var d = n.listLookup.getTaskCollection(t);
                    d = d.where({
                        completed: !1
                    }),
                    d.length < 2 && (a = !0),
                    s.toggleClass("disabled", a).attr(B, a);
                }
            }
        },
        updateDuplicateList: function(t) {
            var i = this
              , n = i.$(".actionBar-top-duplicate-list")
              , o = A.clone(e.smartLists);
            o.push("search");
            var a = o.indexOf(t) > -1;
            n.toggleClass("disabled", a).attr(B, a);
        },
        updatePasteAction: function() {
            var t, i = this, n = i.$(".actionBar-top-paste-item"), o = n.find(".label"), a = e.smartLists.indexOf(i.listID) > -1, r = i.duplication.copiedTasksCount(), s = e.selectedTaskCount || 0;
            t = 1 === r ? e.language.getLabel("contextual_paste_task").toString() : e.language.getLabel("contextual_paste_task_plural_$", r).toString(),
            o.html(t);
            var l = !r || a && !s;
            n.toggleClass("hidden", l).attr(B, l),
            i.renderLabels();
        },
        updateSortDisabled: function() {
            var e = this
              , t = e.listID && e.listLookup.getTaskCollection(e.listID).models
              , i = []
              , n = [];
            t && t.forEach(function(e) {
                var t = e.attributes;
                t.due_date && i.push(e),
                t.assignee_id && n.push(e);
            });
            var o = i.length
              , a = n.length
              , r = e.$(".actionBar-top-sort-date").closest("li")
              , s = e.$(".actionBar-top-sort-assign").closest("li");
            r.toggleClass("disabled", !o).attr(B, !o),
            s.toggleClass("disabled", !a).attr(B, !a);
        },
        updateTrashDisabled: function(e) {
            var t = this;
            t.$(".actionBar-top-trash").toggleClass("disabled", !e).attr(B, !e);
        },
        getSelectedTasks: function() {
            var e = this
              , t = []
              , i = e.$el.closest("#tasks").find(".taskItem.active, .taskItem.selected");
            return A.each(i, function(e) {
                t.push(I(e).attr("rel"));
            }),
            t;
        },
        expandMenu: function(e) {
            var t = this
              , i = t.$("ul." + e)
              , n = t.$(".actionBar-top")
              , o = i.height();
            t.$el.addClass("expanded"),
            n.css({
                height: o + F
            });
        },
        collapseMenu: function() {
            var e = this;
            e.$el.removeClass("expanded"),
            e.$(".actionBar-bottom .active").removeClass("active"),
            e.$(".actionBar-top").css({
                height: F
            });
        },
        toggleMenu: function(t) {
            var i = this
              , n = i.$(".actionBar-top ul")
              , o = i.$(".actionBar-bottom a")
              , a = I(t.target).closest(".tab");
            if (!a.hasClass("disabled")) {
                var r = a.hasClass("active")
                  , s = "actionBar-top-" + a.attr("data-menu")
                  , l = i.$("." + s);
                o.removeClass("active"),
                n.removeClass("active"),
                a.addClass("active"),
                l.addClass("active");
                var c;
                r || !l.length ? (c = !0,
                i.defer(i.collapseMenu)) : i.defer(function() {
                    i.expandMenu(s),
                    l.find("li").first().focus();
                }),
                e.trigger("analytics:TaskActionBar:" + (c ? "Close" : "Open") + "Menu", s);
            }
        },
        isSharingEnabled: function() {
            return !this.$("a.share").hasClass("disabled");
        },
        isDateSortingEnabled: function() {
            return !this.$(".actionBar-top-sort-date").closest("li").hasClass("disabled");
        },
        isAssigneeSortingEnabled: function() {
            return !this.$(".actionBar-top-sort-assign").closest("li").hasClass("disabled");
        },
        isParentLIDisabled: function(e) {
            return I(e.target).parents("li").hasClass("disabled");
        },
        focusStart: function() {
            this.$(".actionBar-bottom a").first().focus(),
            e.trigger("focus:set", "taskActions");
        },
        focusFirstMenuItem: function(e) {
            e.closest("ul").find(".first-menu-item").focus();
        },
        focusLastMenuItem: function(e) {
            e.closest("ul").find(".last-menu-item").focus();
        },
        focusMenuItemToggle: function(e) {
            var t = this
              , i = e.closest("ul");
            if (i.length) {
                var n = /actionBar-top-([^\s]+)/.exec(i[0].className)[1];
                t.collapseMenu(),
                t.$(".actionBar-bottom [data-menu=" + n + "]").focus();
            }
        }
    });
}),
define("/templates/listToolbar.js", {
    name: "listToolbar",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<h1 class="title"> </h1>';
        },
        useData: !0
    }
}),
define("/styles/listbar.js", {
    name: "listbar",
    data: "#list-toolbar{position:relative;height:45px;min-height:45px;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;}.background-01 #list-toolbar{background:#733e27}.background-02 #list-toolbar{background:#537f70}.background-03 #list-toolbar{background:#53617f}.background-04 #list-toolbar{background:#478f8a}.background-05 #list-toolbar{background:#a86d43}.background-06 #list-toolbar{background:#668964}.background-07 #list-toolbar{background:#669844}.background-08 #list-toolbar{background:#0483b7}.background-09 #list-toolbar{background:#2a6c88}.background-10 #list-toolbar{background:#683757}.background-11 #list-toolbar{background:#334e83}.background-12 #list-toolbar{background:#3a7173}.background-13 #list-toolbar{background:#5e8c9c}.background-14 #list-toolbar{background:#2f6676}.background-15 #list-toolbar{background:#71af8c}.background-16 #list-toolbar{background:#bc4a3a}.background-17 #list-toolbar{background:#595959}.background-18 #list-toolbar{background:#575757}.background-19 #list-toolbar{background:#b86d82}.background-20 #list-toolbar{background:#603739}.background-21 #list-toolbar{background:#a65541}.background-22 #list-toolbar{background:#3a7f93}.background-23 #list-toolbar{background:#574033}.background-24 #list-toolbar{background:#bdae88}.background-25 #list-toolbar{background:#0e91c5}.background-26 #list-toolbar{background:#765a98}.background-27 #list-toolbar{background:#c15b3d}.background-28 #list-toolbar{background:#a57e88}.background-29 #list-toolbar{background:#bf7555}.background-30 #list-toolbar{background:#055feb}#list-toolbar h1{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:20px;color:#fff;padding:10px 14px;font-weight:200;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}"
}),
define("views/Toolbar/ListToolbarView", ["application/runtime", "actions/Factory", "wunderbits/WBViewPresenter", "wunderbits/mixins/UnicodeEmojiViewMixin", "project!core", "helpers/ListTitleHelper", "views/Toolbar/Controllers/ListToolbarViewController", "views/Toolbar/ActionBarView", "template!listToolbar", "style!listbar"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = i.prototype
      , m = i.extend({
        id: "list-toolbar",
        template: l,
        styles: [c],
        observes: {
            listState: {
                "change:listID": "_onChangeListID",
                "change:searchTerm": "_updateTitle"
            }
        },
        initialize: function() {
            var i = this;
            return i.listState = new o.WBStateModel({
                listID: d,
                searchTerm: d
            }),
            u.initialize.apply(i, arguments),
            i.actionBarView = i.addSubview(new s()),
            i.listLookup = t.listLookup(),
            i.bindTo(e.language, "change:data", i._updateTitle),
            i;
        },
        render: function() {
            var e = this;
            return u.render.apply(e, arguments),
            e.$el.append(e.actionBarView.render().el),
            e;
        },
        updateListID: function(e) {
            this.listState.save({
                listID: e,
                searchTerm: d
            });
        },
        updateSearchTerm: function(e) {
            this.listState.save({
                searchTerm: e,
                listID: d
            });
        },
        _bindToListID: function(e) {
            var t = this;
            t._listModelBind && t.unbindFrom(t._listModelBind);
            var i = t.listLookup.getListModel(e);
            i && (t._listModelBind = t.bindTo(i, "change:title", "_updateTitle"));
        },
        _onChangeListID: function(e, t) {
            var i = this;
            i._updateTitle(),
            i._bindToListID(t),
            i.actionBarView.setCurrentListID(t);
        },
        _updateTitle: function() {
            var e, t = this, i = t.listState.attributes, n = i.listID, o = i.searchTerm;
            n ? e = a.getById(n) : o && (e = o);
            var r = t.$(".title");
            r.text(e),
            t.renderEmoji(r);
        }
    });
    return n.applyToClass(m),
    m;
}),
define("views/Tasks/Controllers/Mixins/AddTaskNLPDates", ["application/runtime", "vendor/moment", "project!nlp", "project!core"], function(e, t, i, n) {
    var o = i.dates;
    return n.WBMixin.extend({
        datePickersView: function() {
            return this.view.datePickers;
        },
        datePickerModel: function() {
            return this.view.datePickers.datePicker.model;
        },
        addTaskStateModel: function() {
            return this.view.attributeState;
        },
        extractDateData: function(i) {
            var n = this
              , a = "on" === e.settings.attributes.smart_dates
              , r = n.view.filter;
            if ("today" !== r && a) {
                var s = !1
                  , l = n.datePickerModel()
                  , c = n.addTaskStateModel()
                  , d = c.attributes.userSet
                  , u = o.parse(i, {
                    futureOnly: !0,
                    format: e.settings.attributes.date_format,
                    langCode: e.language.attributes.code
                });
                d || (l.set({
                    date: void 0 !== u.date ? u.date : null,
                    interval: null,
                    frequency: null
                }),
                s = !0),
                u.interval && u.frequency && !d ? (u.date || (u.date = t().sod().valueOf(),
                l.set({
                    date: u.date
                })),
                l.set({
                    interval: u.interval,
                    frequency: u.frequency
                })) : d || l.set({
                    interval: null,
                    frequency: null
                });
                var m = u && u.time && u.time.time;
                return m && !d ? (n.datePickersView().updateReminderFromEpoch(u.date),
                s = !0) : d || n.datePickersView().reminderDatePicker.model.set({
                    date: null
                }),
                s ? u : void 0;
            }
        }
    });
}),
define("views/Tasks/Controllers/AddTaskViewController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "models/TaskModel", "vendor/moment", "helpers/animation", "wunderbits/helpers/date", "./Mixins/AddTaskNLPDates", "wunderbits/WBViewController"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = e.$
      , m = e._
      , p = c.prototype;
    return c.extend({
        "implements": {
            "keydown:input": "onKeydown",
            "keyup:input": "onKeyup",
            "blur:input": "onBlur",
            "focus:input": "onFocus"
        },
        mixins: [l],
        initialize: function() {
            var e = this;
            p.initialize.apply(e, arguments),
            e.textParser = e.view.textParser,
            e.taskLookup = t.taskLookup(),
            e.assignTask = t.assignTask(),
            e.allTasks = e.taskLookup.allTasks,
            e.createReminderService = t.createReminder();
        },
        onKeydown: function(e) {
            var t = this
              , n = t.view.$(".addTask-input")
              , o = e.which;
            t.isKeyNotAllowedAllowed(o, e) || (o === i.enter ? t.onEnterKey(e, n) : o === i.esc ? t.onEscKey(e, n) : o === i.tab && t.onTabKey(e));
        },
        onEnterKey: function(t, i) {
            var a = this
              , s = "on" === e.settings.attributes.smart_dates_remove_from_todo
              , l = t.originalEvent && t.originalEvent.altKey
              , c = n.emojiTokensToUnicode(u.trim(i.val()));
            if ("" === c)
                return !1;
            var m = a.extractDateData(c);
            m && a.view.attributeState.save({
                nlpApplied: !0,
                nlpData: m
            });
            var p = a.view.attributeState.attributes;
            p.nlpApplied && s && (c = a._removeNLPPieces(c, p.nlpData));
            var g = p.interval ? p.interval.replace("s", "") : d
              , f = {
                title: c,
                list_id: a.view.listID,
                starred: p.starred,
                due_date: p.due_date,
                assignee_id: p.assignee,
                recurrence_count: p.frequency,
                recurrence_type: g
            }
              , b = new o(f)
              , h = a.taskLookup.getTaskCollection(a.view.listID)
              , v = r.animateOptions("added");
            if (m && m.date && v) {
                v.nlp = !0,
                e.trigger("analytics:NLPDueDate:addTaskInput", "fastTyping"),
                e.trigger("trackingService", "Client.due_date.autocreate", "addTaskInputFastTyping");
                var _ = m.type || "undefined";
                e.trigger("analytics:NLPDueDate:type", _),
                e.trigger("trackingService", "Client.due_date.nlp_type", _);
            }
            h.addTaskToList(b, null, l, v);
            var w = a.allTasks.add(b, v);
            v && v.animations.run(),
            p.reminderDate && p.reminderTime && a.createReminder(w, p.reminderDate, p.reminderTime),
            a.view.resetInput(),
            a.view.resetView();
        },
        onTabKey: function(e) {
            var t = this;
            t.onBlur(),
            t._goToFirstTask(),
            t.stopEventFully(e);
        },
        onEscKey: function(t, i) {
            var n = this;
            i.val() ? (i.val(""),
            e.trigger("analytics:AddTask:clearWithEscape")) : e.trigger("analytics:AddTask:blurWithEscape"),
            n.onBlur(),
            n._goToFirstTask(),
            n.stopEventFully(t);
        },
        isKeyNotAllowedAllowed: function(t, n) {
            return 17 === t ? !0 : e.env.isChromeApp() && n.ctrlKey && 78 === n.which ? (n.preventDefault(),
            !0) : t === i.dash ? (n.stopPropagation(),
            !0) : "assignPopover" === e.focus || "tagPopover" === e.focus || "emojiPopover" === e.focus ? !0 : void 0;
        },
        onKeyup: function(e) {
            var t = this
              , n = [i.shift, i.left, i.right, i.up, i.down, i.esc, i.enter];
            if (-1 === m.indexOf(n, e.which)) {
                var o = u(e.target).val()
                  , a = t.view.listModel && t.view.listModel.isShared();
                t.assignTask.limit.isUserAllowedToAssign(t.view.listID) && t.textParser.checkInputForKeyCharacters(o, t.view.assignPopover, a);
            }
        },
        onBlur: function() {
            var e = this
              , t = e.view;
            e.searchingTags = !1,
            e.autoCompleteBind && e.unbindFrom(e.autoCompleteBind),
            t.blurState.attributes.shouldBlur && (t.$el.removeClass("focus"),
            t.$(".addTask-meta").addClass("invisible transparent"),
            t.focusState.save({
                hasFocus: !1
            }),
            e._redirectIfStillActive());
        },
        onFocus: function() {
            var t = this
              , i = t.view
              , n = t._returnRoute("/tasks/new");
            e.currentRoute() !== n && e.trigger("route:" + n),
            e.trigger("focus:set", "addTask"),
            i.$el.addClass("focus"),
            i.$(".addTask-meta").removeClass("invisible transparent"),
            i.focusState.save({
                hasFocus: !0
            }),
            t.view.blurState.set("shouldBlur", !0),
            e.trigger("onboarding:addItemFocus");
        },
        createReminder: function(e, t, i) {
            this.createReminderService.createReminderFromDateAndTime(t, i, e.id);
        },
        _returnRoute: function(t) {
            var i, n = this;
            if (t = t || "",
            n.view.filter)
                i = "lists/" + n.view.filter + t;
            else if (e.isOnSearchRoute())
                i = "lists/" + e.listId + t;
            else {
                var o = n.view.lists.get(n.view.listID);
                i = o && o.route(t);
            }
            return i;
        },
        _redirectIfStillActive: function() {
            var t = this;
            t.defer(function() {
                var i = e.currentRoute()
                  , n = i.indexOf("/tasks/new") >= 0;
                if (n) {
                    var o = t._returnRoute();
                    e.trigger("route:" + o);
                }
            });
        },
        _goToFirstTask: function() {
            var t = this
              , i = t._returnRoute();
            t.view.blurState.set("shouldBlur", !1),
            e.trigger("browser:selectFirst"),
            i && e.trigger("route:" + i, {
                trigger: !1
            });
        },
        _flattenNLPPieces: function(e) {
            var t = [e];
            return ["time"].forEach(function(i) {
                var n = e[i];
                n && n.index !== d && t.push(n);
            }),
            t.sort(function(e, t) {
                return e.index < t.index ? -1 : e.index > t.index ? 1 : 0;
            });
        },
        _removeNLPPieces: function(e, t) {
            var i = this
              , n = i._flattenNLPPieces(t)
              , o = ""
              , a = 0;
            return n.forEach(function(t) {
                var i = t.index
                  , n = i + t.length;
                if (i >= a) {
                    var r = e.slice(a, i);
                    r.length && (o += r),
                    a = n;
                }
            }),
            o += e.slice(a, e.length),
            o.length ? o : e;
        }
    });
}),
define("views/Tasks/Controllers/AddTaskViewNLPController", ["application/runtime", "wunderbits/data/keycodes", "./Mixins/AddTaskNLPDates", "wunderbits/WBViewController"], function(e, t, i, n) {
    var o = e.$
      , a = e._
      , r = n.prototype;
    return n.extend({
        "implements": {
            "keyup:input": "onKeyUp",
            "keydown:input": "onKeyDown"
        },
        mixins: [i],
        initialize: function() {
            var e = this;
            e.onKeyUp = e.debounce(e.onKeyUp, 500),
            r.initialize.apply(e, arguments);
        },
        _removeNLPHighlights: function() {
            this.view.removeNLPHighlights();
        },
        onKeyDown: function() {
            this._removeNLPHighlights();
        },
        onKeyUp: function(i) {
            var n = this
              , r = [t.shift, t.left, t.right, t.up, t.down, t.esc, t.enter];
            if (-1 === a.indexOf(r, i.which)) {
                var s = o(i.target).val();
                if (s) {
                    var l = n.extractDateData(s);
                    if (l && l.date) {
                        n.view.attributeState.save({
                            nlpApplied: !0,
                            nlpData: l
                        }),
                        n.view.renderNLPFeedback(l),
                        e.trigger("analytics:NLPDueDate:addTaskInput", "normal"),
                        e.trigger("trackingService", "Client.due_date.autocreate", "addTaskInputNormal");
                        var c = l.type || "undefined";
                        e.trigger("analytics:NLPDueDate:type", c),
                        e.trigger("trackingService", "Client.due_date.nlp_type", c);
                    } else
                        n._removeNLPHighlights();
                } else
                    n._removeNLPHighlights();
            }
        }
    });
}),
define("views/Tasks/Controllers/AddTaskAttributesViewController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        "implements": {
            "click:starIcon": "toggleStar",
            "click:dateIcon": "openDatePicker",
            "click:assignIcon": "openAssigneePicker",
            "click:deleteAssignee": "removeAssignee",
            "click:deleteDate": "removeDate",
            "mousedown:starIcon": "onInteractionStart",
            "mousedown:dateIcon": "onInteractionStart",
            "mousedown:assignIcon": "onInteractionStart"
        },
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e.assignTask = t.assignTask();
        },
        isRTL: function() {
            return "rtl" === e.$("html").attr("dir");
        },
        openDatePicker: function(t) {
            var i = this;
            i.closePopovers(),
            t && i.stopEventFully(t);
            var n = i.view.datePicker;
            if ("today" === i.view.filter)
                return void i.view.addTaskEl.find("input").focus();
            if (n.popoverOpened)
                return void e.trigger("analytics:AddTask:toggleDatepicker", "close");
            e.trigger("analytics:AddTask:toggleDatepicker", "open"),
            e.trigger("focus:set", "addTaskDatePicker");
            var o = i.isRTL() ? 80 : -80;
            n.options.offset = o,
            n.options.margin = 18,
            n.trigger("popover:open");
        },
        openAssigneePicker: function(t) {
            var i = this;
            if (i.closePopovers(),
            t && i.stopEventFully(t),
            !i.assignTask.limit.isUserAllowedToAssign(i.view.listID))
                return void i.assignTask.limit.reached();
            e.trigger("focus:set", "assignPopover");
            var n = {
                listId: i.view.listID,
                assignedTo: i.view.attributeState.attributes.assignee,
                offset: i.isRTL() ? 60 : -60,
                margin: 15,
                hideNoAssign: !1,
                arrowOffset: 3,
                startedFromKeys: !1,
                reconfig: !0,
                target: i.view.$(".addTask-meta-assign")
            };
            i.view.assignPopover && i.view.assignPopover.toggle("open", n),
            i.view.blurState.set("shouldBlur", !1);
        },
        toggleStar: function(t) {
            var i = this
              , n = i.view.$(".addTask-meta-star")
              , o = n.hasClass("starred");
            t && i.stopEventFully(t),
            e.trigger("addTaskDatePicker:close"),
            e.trigger("analytics:AddTask:toggleFavorite", !o),
            n.toggleClass("starred", !o),
            i.view.attributeState.set("starred", !o),
            i.view.addTaskEl.find("input").focus();
        },
        closePopovers: function() {
            var e = this;
            if (!e.destroyed && !e.view.destroyed) {
                e.view.datePicker.trigger("popover:close");
                var t = e.view.assignPopover;
                t && t.toggle("close", {});
            }
        },
        removeDate: function(e) {
            var t = this;
            e && t.stopEventFully(e),
            t.view.cancelDates({
                userSet: !0
            });
        },
        removeAssignee: function(e) {
            var t = this;
            e && t.stopEventFully(e),
            t.view.$(".addTask-meta-assign").removeClass("assigned"),
            t.view.attributeState.set("assignee", null),
            t.closePopovers();
        },
        onInteractionStart: function() {
            var e = this;
            e.view.blurState.set("shouldBlur", !1),
            clearTimeout(e._blurTimer),
            e._blurTimer = e.delay(function() {
                e.view.blurState.set("shouldBlur", !0);
            }, e.view.blurState.attributes.overrideBlurDelay);
        }
    });
}),
define("/templates/addTaskAttributes.js", {
    name: "addTaskAttributes",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<a class="addTask-meta-star right" data-key-title="settings_general_starr_item"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "starred", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </a> <a class="addTask-meta-assign right" data-key-title="label_assign_to"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "assigned", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="icon input-assign-frame"></span> <span class="icon input-assign-delete"></span> </a> <a class="addTask-meta-date right" data-key-title="placeholder_set_due_date"> <span class="addTask-meta-date-label"></span> <span class="icon input-assign-delete"></span> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "today", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </a> <div class="addTask-meta-nlp right"> </div> ';
        },
        useData: !0
    }
}),
define("views/Tasks/AddTaskAttributesView", ["application/runtime", "./Controllers/AddTaskAttributesViewController", "views/AvatarView", "vendor/moment", "wunderbits/WBViewPresenter", "template!addTaskAttributes"], function(e, t, i, n, o, a) {
    var r = o.prototype
      , s = Function.prototype;
    return o.extend({
        template: a,
        className: "addTask-meta",
        "implements": [t],
        emits: {
            "mousedown .addTask-meta-star": "mousedown:starIcon",
            "mousedown .addTask-meta-date": "mousedown:dateIcon",
            "mousedown .addTask-meta-assign": "mousedown:assignIcon",
            "click .addTask-meta-star": "click:starIcon",
            "click .addTask-meta-date": "click:dateIcon",
            "click .addTask-meta-assign": "click:assignIcon",
            "click .addTask-meta-assign .input-assign-delete": "click:deleteAssignee",
            "click .addTask-meta-date .input-assign-delete": "click:deleteDate"
        },
        observes: {
            runtime: {
                "autoComplete:assign": "setAssignee",
                "addTaskDatePicker:cancel": "cancelDates",
                "addTaskDatePicker:close": "closeDatePicker"
            }
        },
        initialize: function(e) {
            var t = this;
            r.initialize.apply(t, arguments),
            t.blurState = e.blurState,
            t.attributeState = e.attributeState,
            t.popovers = e.popovers,
            t.datePickers = e.datePickers;
        },
        render: function(e) {
            var t = this;
            return r.render.call(t),
            t.addTaskEl = e.addTaskEl,
            t.listID = e.listID,
            t.renderDatePicker(),
            t.renderAssignPicker(),
            t.filter = e.filter,
            t;
        },
        renderDatePicker: function() {
            var e = this;
            e.datePicker = e.addSubview(e.popovers.setupPopover("WBPopoverView", e.$(".addTask-meta-date"), s, s, {
                content: e.datePickers,
                className: "popover datePicker"
            }), "datePickersPopover");
        },
        renderAssignPicker: function() {
            var e = this;
            e.assignPopover = e.addSubview(e.popovers.setupPopover("AssignToUserPopoverView", e.$(".addTask-meta-assign"), s, s, {
                listId: e.listID,
                assignedTo: e.attributeState.attributes.assignee,
                offset: -60,
                margin: 15,
                hideNoAssign: !1,
                arrowOffset: 3
            }), "assignPopover"),
            e.bindTo(e.assignPopover, "clear:assigned", function() {
                e.trigger("click:deleteAssignee");
            });
        },
        cancelDates: function(e) {
            var t = this;
            t.datePickers.clearDates(e),
            t.closeDatePicker();
        },
        closeDatePicker: function() {
            var e = this;
            e.datePicker.trigger("popover:close");
        },
        setAssignee: function(t) {
            var n = this
              , o = e.currentRoute()
              , a = o.indexOf("/tasks/new") >= 0;
            if (a) {
                var r = n.$(".addTask-meta-assign");
                r.addClass("assigned"),
                n.avatarView = n.avatarView || n.addSubview(new i({
                    size: "small"
                }), "avatarView"),
                r.append(n.avatarView.render({
                    id: t
                }).$el),
                n.attributeState.set("assignee", t),
                n.assignPopover && n.assignPopover.toggle("close", {}),
                e.trigger("focus:set", "addTask");
            }
        }
    });
}),
define("wunderbits/WBDatePickerModel", ["./lib/dependencies", "vendor/moment", "./WBModel"], function(e, t, i) {
    var n = e.$
      , o = e._
      , a = []
      , r = {
        d: "Day",
        w: "Week",
        m: "Month",
        y: "Year"
    };
    return i.extend({
        defaults: {
            date: null,
            interval: null,
            frequency: null
        },
        initialize: function(e) {
            var t = this;
            t._options = e || {},
            t._settingsModel = t._options.settingsModel,
            t._createSmartPatterns(),
            t.on("error", t._onError);
        },
        validate: function(e) {
            var t = this
              , i = ["days", "weeks", "months", "years"];
            return e.date || t.attributes.date || !e.interval && !e.frequency ? (e.date || t.attributes.date) && (!t.attributes.interval || !t.attributes.frequency) && e.interval && !e.frequency || !e.interval && e.frequency ? "not possible to set repeat data without both attribute pairs present on the model or in the save attrs " + t._attrsToString(e) : e.interval && !o.include(i, e.interval) ? e.interval + " is not a valid value for interval " + t._attrsToString(e) : !e.frequency || o.isNumber(e.frequency) && !o.isNaN(e.frequency) ? o.isNaN(e.date) ? e.date + " is not a valid value for date " + t._attrsToString(e) : void 0 : e.frequency + " is not a valid value for frequency " + t._attrsToString(e) : "not possible to set repeat data without a date";
        },
        _attrsToString: function(e) {
            return "{date: " + e.date + ", interval: " + e.interval + ", frequency: " + e.frequency + "}";
        },
        _onError: function(e, t) {
            throw new Error(t);
        },
        parse: function(e, i) {
            var n = this
              , o = t(e, i).toDate().getTime();
            return o = Math.floor(o),
            0 === e.length ? n.set({
                date: null
            }) : void (o && n.set("date", o, {
                userSet: !0
            }));
        },
        parseSmartDate: function(e, i, a, r) {
            var s, l = this;
            if (e = n.trim(e),
            0 === e.length)
                return l.set({
                    date: null
                });
            if ((a || (e = l.processRepeatPatterns(e),
            "" !== e)) && (s = l.processDateKeywords(e),
            (!o.isNumber(s) || o.isNaN(s)) && (s = l.processUserFormattedDate(e)),
            s && s > t().startOf("year").valueOf() && !o.isNaN(s))) {
                if (i && t(s) < t().sod())
                    return;
                l.set({
                    date: s
                }, {
                    fromInput: r
                });
            }
        },
        processUserFormattedDate: function(e) {
            var i = this
              , a = i._settingsModel.attributes.date_format
              , r = a.match(/\W/)
              , s = e.split(r);
            return e = n.trim(e),
            3 === s.length && e.length >= 8 && (o.each(s, function(e, t) {
                s[t] = i._pad(e, 2);
            }),
            e = s.join(r),
            e.length === a.length) ? t(e, a).valueOf() : void 0;
        },
        getRepetitions: function(e) {
            var t = this
              , i = []
              , n = t.attributes.frequency
              , o = t.attributes.interval
              , a = t.attributes.date;
            if (!a || !t.repeats())
                return i;
            for (; e-- >= 0; )
                a = a.clone(),
                a["add" + n + "s"].apply(a, [o]),
                i.push(a);
            return i;
        },
        processDateKeywords: function(e) {
            var i, n, a, r, s = t().sod(), l = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], c = !1;
            if (e = e.toLowerCase(),
            r = e.split(" "),
            "next" === r[0] && o.include(l, r[1]) && (e = r[1],
            c = !0),
            o.include(l, e))
                i = o.indexOf(l, e) + 1,
                n = o.indexOf(l, t().sod().format("dddd").toLowerCase()) + 1,
                a = i - n,
                0 >= a && (a += 7),
                c && 7 - n >= a && (a += 7),
                s = t().sod().add("days", a);
            else
                switch (e) {
                case "today":
                    break;

                case "tomorrow":
                    s = s.add("days", 1);
                    break;

                case "yesterday":
                    s = s.subtract("days", 1);
                    break;

                case "next week":
                    s = s.add("weeks", 1);
                    break;

                case "next month":
                    s = s.add("months", 1);
                    break;

                case "next year":
                    s = s.add("years", 1);
                    break;

                default:
                    return void 0;
                }
            return s.valueOf();
        },
        processRepeatPatterns: function(e) {
            for (var i, n, s = this, l = 0; l < a.length; l++)
                e = e.replace(a[l][0], a[l][1]);
            return e = e.replace(/\/(\d*)(d|w|m|y)\w*/, function(e, a, l) {
                return i = s.attributes.date || t().sod().valueOf(),
                0 !== parseInt(a, 10) && "" !== a && !o.isNaN(a) && r[l] ? (n = r[l].toLowerCase() + "s",
                s.set({
                    date: i,
                    interval: n,
                    frequency: parseInt(a, 10)
                }),
                "") : void 0;
            });
        },
        repeats: function() {
            var e = this
              , t = e.attributes.interval;
            return t && "None" != t;
        },
        _createSmartPatterns: function() {
            var e, t, i, n, o = {
                "every (\\d+) $": "$1",
                "every $": 1,
                $ly: 1,
                bi$ly: 2,
                "every other $": 2
            }, s = {
                daily: "/d",
                annually: "/y",
                biweekly: "/2w",
                "every (\\w+)day": "/w $1day",
                "every other (\\w+)day": "/2w $1day"
            };
            for (e in r)
                for (t in o)
                    i = t.replace("$", r[e]).toLowerCase(),
                    s[i] = "/" + o[t] + e;
            for (i in s)
                n = s[i],
                i = new RegExp(i,"i"),
                a.push([i, n]);
        },
        _pad: function(e, t) {
            for (e = String(e); e.length < t; )
                e = "0" + e;
            return e;
        }
    });
}),
define("/templates/WBDatePicker.js", {
    name: "WBDatePicker",
    data: {
        "1": function() {
            return ' <div id="edit-repeat-wrapper" class="hidden"> <label for="edit-repeat" value="Repeat"/> <span class="select"> <select id="edit-repeat" class="big"> <option value="never" data-key-text="label_repeat_never"selected></option> <option value="daily" data-key-text="label_repeat_every_day"></option> <option value="weekly" data-key-text="label_repeat_every_week"></option> <option value="monthly" data-key-text="label_repeat_every_month"></option> <option value="yearly" data-key-text="label_repeat_every_year"></option> </select> </span> </div> ';
        },
        "3": function(e, t, i, n) {
            var o, a = " ";
            return o = this.invokePartial(i["detailview/timePicker"], "detailview/timePicker", e, void 0, t, i, n),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "5": function(e, t, i, n) {
            var o, a, r = "function", s = ' <a class="no-date button full"> ';
            return a = t.noDateButtonString || e && e.noDateButtonString,
            o = typeof a === r ? a.call(e, {
                name: "noDateButtonString",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (s += o),
            s + " </a> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<form> <ol class="months"></ol> <div class="datepicker-actions"> ';
            return o = t["if"].call(e, e && e.showRepeats, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t["if"].call(e, e && e.showTime, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' <a class="cancel button">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> ",
            o = t["if"].call(e, e && e.showNoDateButton, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " </div> </form> ";
        },
        usePartial: !0,
        useData: !0
    }
}),
define("/templates/WBDatePickerMonth.js", {
    name: "WBDatePickerMonth",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return '<li data-month="' + r((o = t.liRel || e && e.liRel,
            typeof o === a ? o.call(e, {
                name: "liRel",
                hash: {},
                data: n
            }) : o)) + '"> <h3> <span class="icon menu-down showNextMonth"></span> <span class="icon menu-up showPrevMonth"></span> ' + r((o = t.date || e && e.date,
            typeof o === a ? o.call(e, {
                name: "date",
                hash: {},
                data: n
            }) : o)) + ' </h3> <table> <thead class="head"> <tr> <th>' + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_day_0", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</th> <th>" + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_day_1", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</th> <th>" + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_day_2", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</th> <th>" + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_day_3", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</th> <th>" + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_day_4", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</th> <th>" + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_day_5", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</th> <th>" + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_day_6", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</th> </tr> </thead> <tbody> </tbody> </table> </li>";
        },
        useData: !0
    }
}),
define("/templates/detailview/timePicker.js", {
    name: "detailview/timePicker",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="input-fake center" id="edit-reminder-time-container"> <label for="edit-reminder-time" value="Time"/> <span class="time-wrapper" dir="ltr"> <input id="edit-reminder-time-hour" class="chromeless smaller" type="text" value="12" data-key-aria-label="label_time_hour"/>: <input id="edit-reminder-time-minute" class="chromeless smaller" type="text" value="00" data-key-aria-label="label_time_minute"/> </span> <select id="edit-reminder-time-ampm" class="chromeless tiny-flexible" data-key-aria-label="aria_period_label"> <option value="am" data-key-text="label_time_am" selected></option> <option value="pm" data-key-text="label_time_pm"></option> </select> </div> ';
        },
        useData: !0
    }
}),
define("/styles/_datepicker.js", {
    name: "_datepicker",
    data: ".date-pickers{width:211px}.time-wrapper{vertical-align:middle;padding:0 4px}.datepicker{width:187px;padding:12px;}.datepicker form{width:100%}.datepicker h3{text-shadow:0 1px 0 #fff;font-size:12px;height:22px;text-align:center;color:#262626;}.datepicker h3.current{bottom:0;top:500px}.datepicker h3 span{position:absolute;left:5px;top:3px;cursor:pointer;}.datepicker h3 span.showNextMonth{left:auto;right:11px}.datepicker table{width:100%;}.datepicker table th,.datepicker table td{width:14%}.datepicker ol.months{position:relative;height:153px;width:189px;overflow-y:scroll;overflow-x:hidden;}.datepicker ol.months.big{height:172px}.datepicker ol.months li{position:relative}.datepicker ol.months span.day,.datepicker ol.months a.day{text-align:center;font-size:12px;display:block;padding:2px 0;cursor:pointer;font-weight:500;-webkit-border-radius:3px;border-radius:3px}.datepicker ol.months a{color:#737272;}.datepicker ol.months a:hover{background:#eaeaea}.datepicker ol.months a.today{color:#328ad6}.datepicker ol.months .head{margin-bottom:0;}.datepicker ol.months .head th{text-align:center;color:#a3a3a3;text-transform:uppercase;font-size:9px;height:auto;padding:4px 0}.datepicker ol.months a.highlighted{background-image:-webkit-linear-gradient(top, #dff1ff, #cde5fa);background-image:-moz-linear-gradient(top, #dff1ff, #cde5fa);background-image:-o-linear-gradient(top, #dff1ff, #cde5fa);background-image:-ms-linear-gradient(top, #dff1ff, #cde5fa);background-image:linear-gradient(to bottom, #dff1ff, #cde5fa)}.datepicker ol.months a.selected{opacity:1;-ms-filter:none;filter:none;position:relative;background-image:-webkit-linear-gradient(top, #38a9fb, #2c91f9);background-image:-moz-linear-gradient(top, #38a9fb, #2c91f9);background-image:-o-linear-gradient(top, #38a9fb, #2c91f9);background-image:-ms-linear-gradient(top, #38a9fb, #2c91f9);background-image:linear-gradient(to bottom, #38a9fb, #2c91f9);color:#fff;-webkit-border-radius:3px;border-radius:3px;font-weight:bold}.datepicker .datepicker-actions{padding-top:12px;}.datepicker .datepicker-actions .select{margin-bottom:8px}.datepicker .datepicker-actions a{color:#737272;cursor:pointer;padding:4px 10px}.datepicker .datepicker-actions.no-actions{border-top:none;padding:0;height:auto}"
}),
define("wunderbits/WBDatePickerView", ["application/runtime", "vendor/moment", "./WBDatePickerModel", "./WBView", "./WBBlurHelper", "project!core", "template!WBDatePicker", "template!WBDatePickerMonth", "partial!detailview/timePicker", "style!_datepicker"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = e.$
      , m = e._
      , p = e.global
      , g = a.WBDeferred
      , f = n.prototype
      , b = 3
      , h = o;
    return u.fn.selectOptions = function(e) {
        return this.each(function() {
            if ("select" === this.nodeName.toLowerCase())
                for (var t = this.options.length, i = 0; t > i; i++)
                    this.options[i].selected = this.options[i].value == e;
        }),
        this.change(),
        this;
    }
    ,
    t.fn.moveToFirstDayOfMonth = function() {
        return t([this.year(), this.month(), 1]);
    }
    ,
    t.fn.moveToLastDayOfMonth = function() {
        return t([this.year(), this.month(), this.daysInMonth()]);
    }
    ,
    n.extend({
        className: "datepicker",
        styles: [c],
        templates: {
            base: r,
            month: s
        },
        events: {
            "mousedown .showNextMonth": "_cancel",
            "mousedown .showPrevMonth": "_cancel",
            "click .no-date": "noDate",
            "click .cancel": "_cancelDate",
            "click .showNextMonth": "showNextMonth",
            "click .showPrevMonth": "showPrevMonth",
            "click a.day": "selectDay"
        },
        initialize: function(e) {
            var t = this;
            f.initialize.apply(t, arguments),
            t.options = e || {},
            t.model || (t.model = new i(e)),
            t.setStartDay(e.startDay),
            t.monthsRenderedDeferred = new g(),
            t.debouncedRenderPrev = m.debounce(t.renderPrev, 250),
            t.debouncedRenderNext = m.debounce(t.renderNext, 250);
        },
        setStartDay: function(e) {
            var t = this;
            if (m.isNumber(e))
                t.startDay = e;
            else {
                var i = t.convertStartDayStringToNumber(e);
                t.startDay = m.isNumber(i) ? i : 1;
            }
        },
        convertStartDayStringToNumber: function(e) {
            var t = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
              , i = m.indexOf(t, e);
            return i = i >= 0 ? i : d;
        },
        renderMonth: function(e, t) {
            var i, n, o = this, a = {
                date: e.format("MMMM YYYY"),
                liRel: e.format("YYYY-MM")
            }, r = o.templates.month(a), s = t && t.prepend ? "prepend" : "append", l = e.format("YYYY-MM-");
            if (r = u(r.replace(/\{\{([a-z]+)\}\}/gi, function(e, t) {
                return a[t] || "";
            })),
            0 !== o.startDay) {
                var c = r.find("thead")
                  , d = c.find("tr th");
                6 === o.startDay ? c.find("tr").prepend(d.last()) : 1 === o.startDay && c.find("tr").append(d.first());
            }
            var m, p = 0, g = function() {
                p = 6 === p ? 0 : p + 1;
            }, f = e.moveToFirstDayOfMonth().day(), b = o.startDay, h = r.find("tbody");
            if (f !== b) {
                var v;
                for (0 === b ? v = f + 0 : 1 === b ? v = 0 === f ? 6 : f - 1 : 6 === b && (v = f + 1),
                i = 1,
                n = v; n >= i; i++)
                    0 === p && h.append("<tr/>"),
                    m = h.find("tr").last(),
                    m.append('<td><span class="day">&nbsp;</span></td>'),
                    g();
            }
            for (i = 1,
            n = e.moveToLastDayOfMonth().date(); n >= i; i++)
                0 === p && h.append("<tr/>"),
                m = h.find("tr").last(),
                m.append('<td><a data-date="' + l + i + '" class="day">' + i + "</a></td>"),
                g();
            o.$(".months")[s](r);
        },
        render: function() {
            var e, i = this;
            if (!i.isRendered)
                for (f.render.apply(i, arguments),
                i.$el.html(i.templates.base(i.model.toJSON())),
                e = t().subtract("months", 3); e < t().add("months", 3); e.add("months", 1))
                    i.renderMonth(e);
            return i.options.hideNoDate && i.$el.find(".no-date").addClass("hidden"),
            i.options.hideCancel && i.$el.find(".cancel").addClass("hidden"),
            i.options.hideCancel && i.options.hideNoDate && i.$el.find(".datepicker-actions").addClass("no-actions"),
            i.getDayEl(t().toDate()).addClass("today"),
            i.onChangeDate(),
            i.bindTo(i.model, "change:date", i.onChangeDate),
            i.bindTo(i.model, "change:interval", i._onChangeRepeats),
            i.bindTo(i.model, "change:frequency", i._onChangeRepeats),
            i.scrollBind && i.unbindFrom(i.scrollBind),
            i.scrollBind = i.bindTo(i.$("ol.months"), "scroll", function(e) {
                i.onScrolled(e);
            }),
            i.renderLocalized(),
            i.delegateEvents(),
            i;
        },
        setDate: function(e) {
            var t = this;
            return 0 === e && (e = null),
            t.model.set({
                date: e
            }, {
                silent: !0
            }),
            t;
        },
        onChangeDate: function() {
            var e = this
              , i = e.model.attributes.date
              , n = e.getDayEl(t(i));
            e.$(".selected").removeClass("selected"),
            i && 0 !== n.length ? (i = t(i).toDate(),
            e.getDayEl(i).addClass("selected"),
            e._onChangeRepeats(),
            e.monthsRenderedDeferred.done(function() {
                e.scrollToMonth(i);
            })) : i ? e.renderDate(t(i)) : i || (e._onChangeRepeats(),
            e.monthsRenderedDeferred.done(function() {
                e.scrollToMonth(t().sod().toDate());
            }));
        },
        selectDay: function(e) {
            var i = this
              , n = u(e.target).data("date");
            i.options.futureOnly && t(n, "YYYY-MM-D") < t().sod() || i.model.parse(n, "YYYY-MM-D");
        },
        _onChangeRepeats: function() {
            var e, i = this, n = "YYYY-MM-D", o = i.model.attributes.date, a = i.model.attributes.interval, r = i.model.attributes.frequency, s = i.$el.find("ol.months li:last a:last").data("date");
            if (i.$("a.highlighted").removeClass("highlighted"),
            a && m.isNumber(r) && o)
                for (e = t(o); e < t(s, n); e.add(a, r))
                    i.$('a[data-date="' + e.format(n) + '"]').addClass("highlighted");
            else
                a || m.isNumber(r) || (i.$("#edit-repeat option").attr("selected", !1),
                i.$("#edit-repeat option").first().attr("selected", !0));
        },
        noDate: function() {
            var e = this;
            e.model.set({
                date: null,
                interval: null,
                frequency: null
            }, {
                userSet: !0
            }),
            h.run();
        },
        showNextMonth: function(e) {
            var i = this
              , n = u(e.target).closest("li")
              , o = t(n.data("month") + "-01")
              , a = t(o.add("months", 1));
            if (0 === i.getMonthEl(a).length) {
                i.renderMonth(a);
                for (var r = 1; b >= r; r++)
                    i.renderMonth(o.add("months", 1));
            }
            i._cleanupNodes(a, "before"),
            i._onChangeRepeats(),
            i.scrollToMonth(a.valueOf(), 150);
        },
        showPrevMonth: function(e) {
            var i = this
              , n = u(e.target).closest("li")
              , o = t(n.data("month") + "-01")
              , a = t(o.subtract("months", 1));
            if (0 === i.getMonthEl(a).length) {
                i.renderMonth(a, {
                    prepend: !0
                });
                for (var r = 1; b >= r; r++)
                    i.renderMonth(o.subtract("months", 1), {
                        prepend: !0
                    });
            }
            i._cleanupNodes(a, "after"),
            i._onChangeRepeats(),
            i.scrollToMonth(a.toDate(), 150);
        },
        getDayEl: function(e) {
            var i = this;
            return e ? i.$('a[data-date="' + t(e).format("YYYY-MM-D") + '"]') : u();
        },
        getMonthEl: function(e) {
            var i = this;
            return e ? i.$('li[data-month="' + t(e).format("YYYY-MM") + '"]') : u();
        },
        renderDate: function(e) {
            if (e) {
                var i = this
                  , n = t(i.$el.find("ol.months").find("li:last").data("month")).sod()
                  , o = t(i.$el.find("ol.months").find("li:first").data("month")).sod()
                  , a = t(e.valueOf());
                o > e ? i.renderPastDate(e, o, n) : e > n && i.renderFutureDate(e, n),
                i._onChangeRepeats(),
                i.getDayEl(a.toDate()).addClass("selected"),
                i.monthsRenderedDeferred.done(function() {
                    i.scrollToMonth(a.sod().toDate());
                });
            }
        },
        renderFutureDate: function(e, i) {
            var n, o, a, r = this, s = t(e.valueOf());
            e = e.add("months", b),
            o = e.diff(i, "months"),
            a = o >= 12,
            a ? (r._purgeMonths(),
            n = t(e.valueOf()),
            n.subtract("months", 2 * b)) : n = i.add("months", 1);
            for (var l = n; e >= l; l.add("months", 1))
                r.renderMonth(l);
            !a && r._cleanupNodes(s, "before");
        },
        renderPastDate: function(e, i, n) {
            var o, a, r, s = this, l = t(e.valueOf());
            e = e.subtract("months", b),
            a = i.diff(e, "months"),
            r = a >= 12,
            r ? (s._purgeMonths(),
            o = t(e.valueOf()),
            o.add("months", 2 * b)) : o = n.subtract("months", 1);
            for (var c = o; c >= e; c.subtract("months", 1))
                s.renderMonth(c, {
                    prepend: !0
                });
            s._cleanupNodes(l, "after");
        },
        renderPrev: function() {
            var e = this
              , i = e.$("ol.months")
              , n = i.scrollTop()
              , o = i.find("li:first")
              , a = t(o.data("month"))
              , r = t(a)
              , s = 0;
            if (!e._rendering) {
                e._rendering = !0;
                for (var l = 1; b >= l; l++)
                    e.renderMonth(a.subtract("months", 1), {
                        prepend: !0
                    });
                e._cleanupNodes(r, "after"),
                e._onChangeRepeats(),
                e.lastScrollToMonth = r.toDate(),
                e.renderLabels(),
                o.prevAll().each(function() {
                    s += u(this).outerHeight();
                }),
                i.scrollTop(n + s),
                e._rendering = !1;
            }
        },
        renderNext: function() {
            var e = this
              , i = t(e.$("ol.months").find("li:last").data("month"))
              , n = t(i);
            if (!e._rendering) {
                e._rendering = !0;
                for (var o = 1; b >= o; o++)
                    e.renderMonth(i.add("months", 1));
                e._cleanupNodes(n, "before"),
                e._onChangeRepeats(),
                e.renderLabels(),
                e._rendering = !1;
            }
        },
        scrollToMonth: function(e, i) {
            var n, o, a = this, r = a.$("ol.months");
            return a.internalScrollTimer && p.clearTimeout(a.internalScrollTimer),
            a.internalScroll = !0,
            e = "number" == typeof e && e > 0 ? t(e).toDate() : e instanceof Date ? e : t().toDate(),
            n = a.getMonthEl(e),
            n && 0 !== n.length ? (o = n[0].offsetTop,
            a.lastScrollToMonth = e,
            void (i ? r.stop().animate({
                scrollTop: o
            }, i, function() {
                a._updateHeights(n),
                a.internalScrollTimer = p.setTimeout(function() {
                    a.internalScroll = !1;
                }, 1e3);
            }) : (r.scrollTop(o),
            a._updateHeights(n),
            a.internalScrollTimer = p.setTimeout(function() {
                a.internalScroll = !1;
            }, 1e3)))) : void (a.internalScroll = !1);
        },
        _updateHeights: function(t) {
            var i = this
              , n = i.$("ol.months")
              , o = u(t).height();
            n.css("height", o),
            e.env.isIE() && n.css({
                height: o - 5 + "px"
            });
        },
        onScrolled: function() {
            var e = this
              , t = e.$el.find("ol.months")
              , i = t.scrollTop()
              , n = t[0].scrollHeight
              , o = t.find("li:first").height();
            i < e._lastScrollTop && o >= i ? e.debouncedRenderPrev() : i > e._lastScrollTop && i >= n - b * o && e.debouncedRenderNext(),
            e._lastScrollTop = t.scrollTop();
        },
        _cancel: function(e) {
            e.preventDefault();
        },
        _cancelDate: function() {},
        onDestroy: function() {
            var e = this;
            u(document).off("." + e.cid);
        },
        _purgeMonths: function() {
            for (var e = this, t = e.$("ol.months li"), i = 0, n = t.size(); n > i; i++)
                u(t[i]).remove();
        },
        _cleanupNodes: function(e, i) {
            var n, o = this, a = o.$("ol.months"), r = a.scrollTop(), s = 24, l = o.$("ol.months li"), c = l.size(), d = o.$('ol.months li[data-month="' + t(e).format("YYYY-MM") + '"]'), p = m.indexOf(l, d[0]);
            if (i = "before" === i ? i : "after",
            "after" === i && c > s)
                for (n = c; n > p + s; )
                    u(l[n]).remove(),
                    l[n] = null,
                    n--;
            else if (c > s) {
                n = 0;
                for (var g = 0; p - s > n; )
                    g += u(l[n]).outerHeight(),
                    u(l[n]).remove(),
                    l[n] = null,
                    n++;
                a.scrollTop(r - g);
            }
        }
    });
}),
define("/templates/addTaskDatePickers.js", {
    name: "addTaskDatePickers",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="buttonbar full toggle-date-type"> <a class="button selected due-date-tab">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_due_date", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> <a class="button reminder-tab">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_reminder", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </div> <div class="scroll-wrapper"> <div class="due-date-picker"></div> <div class="reminder-date-picker"></div> </div> ';
        },
        useData: !0
    }
}),
define("/styles/popover/addTaskDatePopover.js", {
    name: "popover/addTaskDatePopover",
    data: "#wunderlist-base .reminder-date-picker{-webkit-transform:translateX(100%);-moz-transform:translateX(100%);-o-transform:translateX(100%);-ms-transform:translateX(100%);transform:translateX(100%);margin-left:-100%;float:left;}#wunderlist-base .reminder-date-picker .input-fake{margin-bottom:8px}#wunderlist-base .reminder-date-picker.selected{-webkit-transform:translateX(0);-moz-transform:translateX(0);-o-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}#wunderlist-base .due-date-picker{-webkit-transform:translateX(-100%);-moz-transform:translateX(-100%);-o-transform:translateX(-100%);-ms-transform:translateX(-100%);transform:translateX(-100%);float:left;}#wunderlist-base .due-date-picker.selected{-webkit-transform:translateX(0);-moz-transform:translateX(0);-o-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}"
}),
define("views/Tasks/AddTaskDatePickersView", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "actions/Factory", "wunderbits/WBView", "wunderbits/WBDatePickerView", "wunderbits/data/keycodes", "template!addTaskDatePickers", "style!_popover", "style!popover/addTaskDatePopover"], function(e, t, i, n, o, a, r, s, l, c, d, u, m) {
    var p = r.prototype;
    return r.extend({
        template: c,
        styles: [d, u],
        className: "date-pickers",
        events: {
            "click .due-date-tab": "_setDueDatePicker",
            "click .reminder-tab": "_setReminderPicker",
            "change #edit-repeat": "_handleRepeat",
            "change #edit-repeat-interval": "_handleRepeat",
            "keyup #edit-repeat-frequency": "_handleRepeat",
            "change #edit-reminder-time-ampm": "_updateReminder",
            "focus #edit-reminder-time-container input": "_updateReminder",
            "blur #edit-reminder-time-container input": "_updateReminder",
            "keydown #edit-reminder-time-hour": "_onEditHourKeyDown",
            "keydown #edit-reminder-time-minute": "_onEditMinuteKeyDown"
        },
        initialize: function() {
            var t = this;
            p.initialize.apply(t, arguments),
            t.automaticReminder = a.automaticReminder(),
            t.datePicker = t.addSubview(new s({
                futureOnly: !1,
                hideCancel: !0,
                showRepeats: !0,
                showTime: !1,
                startDay: e.settings.attributes.start_of_week,
                showNoDateButton: !0,
                noDateButtonString: e.language.getLabel("button_remove_due_date").toString()
            })),
            t.reminderDatePicker = t.addSubview(new s({
                futureOnly: !1,
                showRepeats: !1,
                hideCancel: !0,
                showTime: !0,
                startDay: e.settings.attributes.start_of_week,
                showNoDateButton: !0,
                noDateButtonString: e.language.getLabel("button_remove_reminder").toString()
            })),
            t.bindTo(t.datePicker.model, "change:date", t._handleRepeat),
            t.bindTo(t.datePicker.model, "change:date", t._autoReminder),
            t.bindTo(t.reminderDatePicker.model, "change:date", t._updateReminder),
            t.bindTo(e.settings, "change:start_of_week", function() {
                t.datePicker.isRendered = !1,
                t.datePicker.setStartDay(e.settings.attributes.start_of_week),
                t.datePicker.render(),
                t.reminderDatePicker.isRendered = !1,
                t.reminderDatePicker.setStartDay(e.settings.attributes.start_of_week),
                t.reminderDatePicker.render();
            });
        },
        render: function() {
            var t = this
              , i = "12 hour" === e.settings.attributes.time_format;
            p.render.apply(t, arguments);
            var n = t.datePicker.render().$el;
            t.$(".due-date-picker").prepend(n);
            var o = t.reminderDatePicker.render().$el;
            t.$(".reminder-date-picker").prepend(o),
            t.$("#edit-repeat-wrapper").removeClass("hidden");
            var a = t.$("#edit-reminder-time-ampm");
            return i ? a.removeClass("hidden") : a.addClass("hidden"),
            t.delegateEvents(),
            t.delay(function() {
                t.datePicker.scrollToMonth(),
                t.reminderDatePicker.scrollToMonth();
            }, 100),
            t._setDueDatePicker(),
            t;
        },
        clearDates: function(e) {
            var t = {
                date: null,
                interval: null,
                frequency: null
            };
            this.datePicker.model.set(t, e),
            this.reminderDatePicker.model.set(t, e);
        },
        _setDueDatePicker: function() {
            var e = this;
            e.$el.find(".reminder-tab, .reminder-date-picker").removeClass("selected"),
            e.$el.find(".due-date-tab, .due-date-picker").addClass("selected");
        },
        _setReminderPicker: function() {
            var e = this;
            e.$el.find(".reminder-tab, .reminder-date-picker").addClass("selected"),
            e.$el.find(".due-date-tab, .due-date-picker").removeClass("selected");
        },
        _handleRepeat: function(e, i, n) {
            var o = this
              , a = null
              , r = null
              , s = o.datePicker.model.attributes.date
              , l = o.datePicker.model.changedAttributes() || {}
              , c = null === l.date && null === l.interval && null === l.frequency;
            if (a = o.$el.find("#edit-repeat").val(),
            r = 1,
            c || s || "never" === a || null === a || a === m || (s = t().sod().valueOf(),
            o.datePicker.model.set({
                date: s
            }, n)),
            null !== r && (r = Number(r)),
            null !== s && null !== a && null !== r && 0 !== r && "never" !== a) {
                var d = {
                    daily: "days",
                    weekly: "weeks",
                    monthly: "months",
                    yearly: "years"
                };
                o.datePicker.model.set({
                    date: t(s).format("YYYY-MM-DD"),
                    interval: d[a],
                    frequency: r
                }, n);
            }
            "never" === a && (a = null,
            r = null,
            s && t(s).format("YYYY-MM-DD"),
            o.datePicker.model.set({
                interval: a,
                frequency: r
            }, n));
        },
        _updateReminder: function(n, a, r) {
            var s = this
              , l = s.reminderDatePicker.model.attributes.date
              , c = Number(s.$el.find("#edit-reminder-time-hour").val())
              , d = Number(s.$el.find("#edit-reminder-time-minute").val())
              , u = s.$el.find("#edit-reminder-time-ampm").val()
              , m = "12 hour" === e.settings.attributes.time_format
              , p = null;
            l && (null !== c && null !== d && (c = m ? i.convertHourTo24HourTime(c, u) : c,
            p = o.pad(c, 2) + ":" + o.pad(d, 2)),
            s.reminderDatePicker.model.set({
                reminder_date: t(l).format("YYYY-MM-DD"),
                reminder_time: p
            }, r));
        },
        _autoReminder: function(i, n, o) {
            var a = this
              , r = a.datePicker.model.attributes.date
              , s = r && t(r).valueOf()
              , l = s && a.automaticReminder.getForTimestamp(s);
            l && (e.trigger("trackingService", "Client.reminder.autocreate"),
            a.updateReminderFromTimeStamp(l, o));
        },
        updateReminderFromEpoch: function(e, i) {
            var n = this
              , o = t(e).format("YYYY-MM-DD")
              , a = t(e).format("HH:mm")
              , r = t(e).sod().valueOf();
            n.updateReminderModel(r, o, a, i);
        },
        updateReminderFromTimeStamp: function(e, n) {
            var o = this
              , a = i.convertServerTimeToLocalTime(e)
              , r = t(a).format("YYYY-MM-DD")
              , s = t(a).format("HH:mm")
              , l = t(e).sod().valueOf();
            o.updateReminderModel(l, r, s, n);
        },
        updateReminderModel: function(e, t, i, n) {
            var o = this;
            o.reminderDatePicker.model.set({
                date: e
            }, n),
            o.reminderDatePicker.model.set({
                reminder_date: t,
                reminder_time: i
            }, n);
        },
        _onEditHourKeyDown: function(t) {
            var i = this
              , n = i.$el.find("#edit-reminder-time-hour")
              , a = Number(n.val())
              , r = "12 hour" === e.settings.attributes.time_format;
            if (t.which === l.up)
                a = (r ? 12 : 23) > a ? a + 1 : r ? 1 : 0,
                n.val(o.pad(a, 2));
            else if (t.which === l.down)
                a = a > (r ? 1 : 0) ? a - 1 : r ? 12 : 23,
                n.val(o.pad(a, 2));
            else {
                if (t.which === l.enter || t.which === l.esc || t.which === l.left || t.which === l.right || t.which === l.backspace || t.which === l.del || t.which === l.tab)
                    return;
                if (!(48 <= t.which && t.which <= 57 || 96 <= t.which && t.which <= 105))
                    return !1;
            }
        },
        _onEditMinuteKeyDown: function(e) {
            var t = this
              , i = t.$el.find("#edit-reminder-time-minute")
              , n = Number(i.val());
            if (e.which === l.up)
                n = 59 > n ? n + 1 : 0,
                i.val(o.pad(n, 2));
            else if (e.which === l.down)
                n = n > 0 ? n - 1 : 59,
                i.val(o.pad(n, 2));
            else {
                if (e.which === l.enter || e.which === l.esc || e.which === l.left || e.which === l.right || e.which === l.backspace || e.which === l.del)
                    return;
                if (!(48 <= e.which && e.which <= 57 || 96 <= e.which && e.which <= 105))
                    return !1;
            }
        }
    });
}),
define("/templates/assignableUser.js", {
    name: "assignableUser",
    data: {
        "1": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " (" + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_assign_me", {
                name: "localized",
                hash: {},
                data: n
            }))) + ")";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = '<span class="icon assigned right"></span> <div class="picture left"></div> <div class="name" >' + s((a = t.name || e && e.name,
            typeof a === r ? a.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : a));
            return o = t["if"].call(e, e && e.isMe, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + "</div> ";
        },
        useData: !0
    }
}),
define("views/Assigning/AssignToUserView", ["application/runtime", "wunderbits/WBViewPresenter", "wunderbits/mixins/UnicodeEmojiViewMixin", "views/AvatarView", "template!assignableUser"], function(e, t, i, n, o, a) {
    var r = t.prototype
      , s = t.extend({
        template: o,
        tagName: "li",
        renderData: {
            name: a,
            isMe: !1
        },
        formatData: function(t) {
            var i = this;
            t = r.formatData.call(i, t);
            var n = i.assignable.attributes;
            return t.name = n.name ? n.name : n.email ? n.email : a,
            e.user.isIDEqual(n.id) && (t.isMe = !0,
            t.name = e.user.attributes.name),
            t;
        },
        initialize: function(e) {
            var t = this;
            e && (t.assignable = e.assignable),
            r.initialize.apply(t, arguments),
            t.bindTo(t.assignable, "change", t.render);
        },
        render: function(e) {
            var t = this
              , i = t.assignable.attributes;
            return t.$el.attr("rel", i.id),
            t.$el[e && e.assignedTo === i.id ? "addClass" : "removeClass"]("assigned"),
            r.render.call(t, t.formatData(t.renderData)),
            t.renderAvatar(i.id),
            t.renderEmoji(t.$(".name")),
            t;
        },
        renderAvatar: function(e) {
            var t = this;
            t.avatarView = t.avatarView || t.addSubview(new n(), "avatarView"),
            t.$(".picture").html(t.avatarView.render({
                id: e
            }).$el);
        }
    });
    return i.applyToClass(s),
    s;
}),
define("views/Assigning/Controllers/AssignToUserPopoverViewController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e.$;
    return t.extend({
        "implements": {
            assign: "assignToUser",
            "click:none": "clearAssign",
            navigate: "onNavigate"
        },
        onNavigate: function(e) {
            this.view.navigate(e);
        },
        assignToUser: function(t) {
            var n = this
              , o = n.view;
            t.stopPropagation(),
            i(t.target).closest("li").addClass("selected");
            var a, r = o.$(".selected"), s = r.attr("rel");
            "keydown" !== t.type && (s = i(t.target).closest("li").attr("rel"),
            a = !0),
            !s && r.hasClass("no-assign") ? n.clearAssign() : s && (e.trigger("autoComplete:assign", s, a, o.config.startedFromKeys, o.taskId),
            e.trigger("assigneeAdded"));
        },
        clearAssign: function() {
            this.view.trigger("clear:assigned");
        }
    });
}),
define("mixins/TaskBrowserView/ViewportMixin", ["application/runtime", "project!core"], function(e, t) {
    return t.WBMixin.extend({
        scrollTo: function(e, t, i) {
            i = i || 0,
            e.stop().animate({
                scrollTop: t
            }, 0);
        },
        handleVisibility: function(e, t, i) {
            var n = this
              , o = e[0]
              , a = t[0]
              , r = o.clientHeight
              , s = o.offsetTop
              , l = s + r
              , c = a.clientHeight
              , d = a.scrollHeight
              , u = t.scrollTop()
              , m = c + u
              , p = 0 === s
              , g = l === d;
            p ? n.scrollTo(t, 0) : g ? n.scrollTo(t, d) : "down" === i && l > m ? n.scrollTo(t, l - c) : "up" === i && u > s && n.scrollTo(t, s);
        }
    });
}),
define("/templates/assignToUserPopover.js", {
    name: "assignToUserPopover",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="assign-to-user"> <div class="header">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_assign_to", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <ul class="shared-users"> <li class="no-assign"> <div class="avatar unassigned left"></div> <div class="name no-assign" >' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_none", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</div> </li> </ul> </div>";
        },
        useData: !0
    }
}),
define("/styles/popover/assigningPopover.js", {
    name: "popover/assigningPopover",
    data: '#wunderlist-base .assign-to-user{width:212px}#wunderlist-base .get-pro,#wunderlist-base .assign-to-user,#wunderlist-base .tags,#wunderlist-base .emojis{padding:4px;}#wunderlist-base .get-pro .header,#wunderlist-base .assign-to-user .header,#wunderlist-base .tags .header,#wunderlist-base .emojis .header{padding:5px 0 16px 0 !important;height:14px !important;}#wunderlist-base .get-pro .header:after,#wunderlist-base .assign-to-user .header:after,#wunderlist-base .tags .header:after,#wunderlist-base .emojis .header:after{content:\'\';height:1px;width:100%;background-color:#dedede;position:absolute;left:0;top:35px}#wunderlist-base .get-pro p,#wunderlist-base .assign-to-user p,#wunderlist-base .tags p,#wunderlist-base .emojis p{font-size:13px;padding:12px;font-size:13px}#wunderlist-base .get-pro .shared-users,#wunderlist-base .assign-to-user .shared-users,#wunderlist-base .tags .shared-users,#wunderlist-base .emojis .shared-users,#wunderlist-base .get-pro .all-tags,#wunderlist-base .assign-to-user .all-tags,#wunderlist-base .tags .all-tags,#wunderlist-base .emojis .all-tags,#wunderlist-base .get-pro .all-emojis,#wunderlist-base .assign-to-user .all-emojis,#wunderlist-base .tags .all-emojis,#wunderlist-base .emojis .all-emojis{position:relative;max-height:297px;overflow:auto;-webkit-overflow-scrolling:touch;}#wunderlist-base .get-pro .shared-users li,#wunderlist-base .assign-to-user .shared-users li,#wunderlist-base .tags .shared-users li,#wunderlist-base .emojis .shared-users li,#wunderlist-base .get-pro .all-tags li,#wunderlist-base .assign-to-user .all-tags li,#wunderlist-base .tags .all-tags li,#wunderlist-base .emojis .all-tags li,#wunderlist-base .get-pro .all-emojis li,#wunderlist-base .assign-to-user .all-emojis li,#wunderlist-base .tags .all-emojis li,#wunderlist-base .emojis .all-emojis li{height:33px;position:relative;}#wunderlist-base .get-pro .shared-users li:hover,#wunderlist-base .assign-to-user .shared-users li:hover,#wunderlist-base .tags .shared-users li:hover,#wunderlist-base .emojis .shared-users li:hover,#wunderlist-base .get-pro .all-tags li:hover,#wunderlist-base .assign-to-user .all-tags li:hover,#wunderlist-base .tags .all-tags li:hover,#wunderlist-base .emojis .all-tags li:hover,#wunderlist-base .get-pro .all-emojis li:hover,#wunderlist-base .assign-to-user .all-emojis li:hover,#wunderlist-base .tags .all-emojis li:hover,#wunderlist-base .emojis .all-emojis li:hover{cursor:pointer}#wunderlist-base .get-pro .shared-users li .name,#wunderlist-base .assign-to-user .shared-users li .name,#wunderlist-base .tags .shared-users li .name,#wunderlist-base .emojis .shared-users li .name,#wunderlist-base .get-pro .all-tags li .name,#wunderlist-base .assign-to-user .all-tags li .name,#wunderlist-base .tags .all-tags li .name,#wunderlist-base .emojis .all-tags li .name,#wunderlist-base .get-pro .all-emojis li .name,#wunderlist-base .assign-to-user .all-emojis li .name,#wunderlist-base .tags .all-emojis li .name,#wunderlist-base .emojis .all-emojis li .name{position:absolute;left:38px;top:8px;right:18px;font-size:13px;font-weight:bold;color:#262626;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}#wunderlist-base .get-pro .shared-users li .avatar,#wunderlist-base .assign-to-user .shared-users li .avatar,#wunderlist-base .tags .shared-users li .avatar,#wunderlist-base .emojis .shared-users li .avatar,#wunderlist-base .get-pro .all-tags li .avatar,#wunderlist-base .assign-to-user .all-tags li .avatar,#wunderlist-base .tags .all-tags li .avatar,#wunderlist-base .emojis .all-tags li .avatar,#wunderlist-base .get-pro .all-emojis li .avatar,#wunderlist-base .assign-to-user .all-emojis li .avatar,#wunderlist-base .tags .all-emojis li .avatar,#wunderlist-base .emojis .all-emojis li .avatar,#wunderlist-base .get-pro .shared-users li .unassigned,#wunderlist-base .assign-to-user .shared-users li .unassigned,#wunderlist-base .tags .shared-users li .unassigned,#wunderlist-base .emojis .shared-users li .unassigned,#wunderlist-base .get-pro .all-tags li .unassigned,#wunderlist-base .assign-to-user .all-tags li .unassigned,#wunderlist-base .tags .all-tags li .unassigned,#wunderlist-base .emojis .all-tags li .unassigned,#wunderlist-base .get-pro .all-emojis li .unassigned,#wunderlist-base .assign-to-user .all-emojis li .unassigned,#wunderlist-base .tags .all-emojis li .unassigned,#wunderlist-base .emojis .all-emojis li .unassigned{margin-top:4px;margin-left:4px}#wunderlist-base .get-pro .shared-users li span.assigned,#wunderlist-base .assign-to-user .shared-users li span.assigned,#wunderlist-base .tags .shared-users li span.assigned,#wunderlist-base .emojis .shared-users li span.assigned,#wunderlist-base .get-pro .all-tags li span.assigned,#wunderlist-base .assign-to-user .all-tags li span.assigned,#wunderlist-base .tags .all-tags li span.assigned,#wunderlist-base .emojis .all-tags li span.assigned,#wunderlist-base .get-pro .all-emojis li span.assigned,#wunderlist-base .assign-to-user .all-emojis li span.assigned,#wunderlist-base .tags .all-emojis li span.assigned,#wunderlist-base .emojis .all-emojis li span.assigned{display:none}#wunderlist-base .get-pro .shared-users li.assigned span.assigned,#wunderlist-base .assign-to-user .shared-users li.assigned span.assigned,#wunderlist-base .tags .shared-users li.assigned span.assigned,#wunderlist-base .emojis .shared-users li.assigned span.assigned,#wunderlist-base .get-pro .all-tags li.assigned span.assigned,#wunderlist-base .assign-to-user .all-tags li.assigned span.assigned,#wunderlist-base .tags .all-tags li.assigned span.assigned,#wunderlist-base .emojis .all-tags li.assigned span.assigned,#wunderlist-base .get-pro .all-emojis li.assigned span.assigned,#wunderlist-base .assign-to-user .all-emojis li.assigned span.assigned,#wunderlist-base .tags .all-emojis li.assigned span.assigned,#wunderlist-base .emojis .all-emojis li.assigned span.assigned{display:block;margin-top:7px;margin-right:3px}#wunderlist-base .get-pro .shared-users li.selected,#wunderlist-base .assign-to-user .shared-users li.selected,#wunderlist-base .tags .shared-users li.selected,#wunderlist-base .emojis .shared-users li.selected,#wunderlist-base .get-pro .all-tags li.selected,#wunderlist-base .assign-to-user .all-tags li.selected,#wunderlist-base .tags .all-tags li.selected,#wunderlist-base .emojis .all-tags li.selected,#wunderlist-base .get-pro .all-emojis li.selected,#wunderlist-base .assign-to-user .all-emojis li.selected,#wunderlist-base .tags .all-emojis li.selected,#wunderlist-base .emojis .all-emojis li.selected{font-weight:bold;background:#328ad6;-webkit-border-radius:3px;border-radius:3px;}#wunderlist-base .get-pro .shared-users li.selected .unassigned:before,#wunderlist-base .assign-to-user .shared-users li.selected .unassigned:before,#wunderlist-base .tags .shared-users li.selected .unassigned:before,#wunderlist-base .emojis .shared-users li.selected .unassigned:before,#wunderlist-base .get-pro .all-tags li.selected .unassigned:before,#wunderlist-base .assign-to-user .all-tags li.selected .unassigned:before,#wunderlist-base .tags .all-tags li.selected .unassigned:before,#wunderlist-base .emojis .all-tags li.selected .unassigned:before,#wunderlist-base .get-pro .all-emojis li.selected .unassigned:before,#wunderlist-base .assign-to-user .all-emojis li.selected .unassigned:before,#wunderlist-base .tags .all-emojis li.selected .unassigned:before,#wunderlist-base .emojis .all-emojis li.selected .unassigned:before,#wunderlist-base .get-pro .shared-users li.selected .unassigned:after,#wunderlist-base .assign-to-user .shared-users li.selected .unassigned:after,#wunderlist-base .tags .shared-users li.selected .unassigned:after,#wunderlist-base .emojis .shared-users li.selected .unassigned:after,#wunderlist-base .get-pro .all-tags li.selected .unassigned:after,#wunderlist-base .assign-to-user .all-tags li.selected .unassigned:after,#wunderlist-base .tags .all-tags li.selected .unassigned:after,#wunderlist-base .emojis .all-tags li.selected .unassigned:after,#wunderlist-base .get-pro .all-emojis li.selected .unassigned:after,#wunderlist-base .assign-to-user .all-emojis li.selected .unassigned:after,#wunderlist-base .tags .all-emojis li.selected .unassigned:after,#wunderlist-base .emojis .all-emojis li.selected .unassigned:after{border:none}#wunderlist-base .get-pro .shared-users li.selected .name,#wunderlist-base .assign-to-user .shared-users li.selected .name,#wunderlist-base .tags .shared-users li.selected .name,#wunderlist-base .emojis .shared-users li.selected .name,#wunderlist-base .get-pro .all-tags li.selected .name,#wunderlist-base .assign-to-user .all-tags li.selected .name,#wunderlist-base .tags .all-tags li.selected .name,#wunderlist-base .emojis .all-tags li.selected .name,#wunderlist-base .get-pro .all-emojis li.selected .name,#wunderlist-base .assign-to-user .all-emojis li.selected .name,#wunderlist-base .tags .all-emojis li.selected .name,#wunderlist-base .emojis .all-emojis li.selected .name{color:#fff}#wunderlist-base .get-pro .all-emojis li .name,#wunderlist-base .assign-to-user .all-emojis li .name,#wunderlist-base .tags .all-emojis li .name,#wunderlist-base .emojis .all-emojis li .name{left:30px}#wunderlist-base .get-pro .all-emojis .emoji,#wunderlist-base .assign-to-user .all-emojis .emoji,#wunderlist-base .tags .all-emojis .emoji,#wunderlist-base .emojis .all-emojis .emoji{position:absolute;left:7px;top:12px}#wunderlist-base .get-pro .all-tags li .name,#wunderlist-base .assign-to-user .all-tags li .name,#wunderlist-base .tags .all-tags li .name,#wunderlist-base .emojis .all-tags li .name{left:6px}html[dir="rtl"] #wunderlist-base .assign-to-user li .avatar,html[dir="rtl"] #wunderlist-base .assign-to-user li .unassigned{margin-right:4px;margin-left:initial}html[dir="rtl"] #wunderlist-base .assign-to-user li .name{position:absolute;right:38px;left:18px}'
}),
define("views/Assigning/AssignToUserPopoverView", ["application/runtime", "actions/Factory", "views/Popovers/PopoverView", "views/Assigning/AssignToUserView", "views/Assigning/Controllers/AssignToUserPopoverViewController", "mixins/TaskBrowserView/ViewportMixin", "template!assignToUserPopover", "style!popover/assigningPopover"], function(e, t, i, n, o, a, r, s) {
    var l = e.$
      , c = e._
      , d = i.prototype;
    return i.extend({
        template: r,
        styles: [s],
        config: {
            bindToTarget: !1,
            margin: -4,
            className: "popover assignPicker"
        },
        "implements": [o],
        observes: {
            runtime: {
                "assignPopover:navigate": ">navigate",
                "assign:select": ">assign"
            }
        },
        emits: {
            "mousedown li, img, div": "assign",
            "click .no-assign": "click:none"
        },
        initialize: function(e) {
            var i = this;
            a.applyTo(i),
            e && (i.listId = e.listId,
            i.taskId = e.taskId,
            i.assignedTo = e.assignedTo,
            c.extend(i.config, e)),
            i.userLookup = t.userLookup(),
            d.initialize.apply(i, arguments),
            i.setupCollection();
        },
        renderListMembers: function() {
            for (var e, t, i = this, o = i.$(".shared-users")[0], a = [], r = document.createDocumentFragment(), s = i.assignables.models, l = 0, c = s.length; c > l; l++)
                if (e = s[l],
                t = e.attributes,
                a.indexOf(t.id) < 0) {
                    var d = i.addSubview(new n({
                        listId: i.listId,
                        assignable: e
                    }));
                    r.appendChild(d.render({
                        assignedTo: i.assignedTo
                    }).el),
                    a.push(e.attributes.id);
                }
            o.appendChild(r);
        },
        setupCollection: function() {
            var e = this;
            e.assignables = e.userLookup.getAssignableCollectionForList(e.listId);
        },
        render: function() {
            var e = this;
            return d.render.apply(e, arguments),
            e.$(".no-assign")[e.config.hideNoAssign === !0 ? "addClass" : "removeClass"]("hidden"),
            e.renderListMembers(),
            e.delegateEvents(),
            e;
        },
        searchRecipients: function(t) {
            var i, n = this, o = [];
            n.assignables || n.setupCollection(),
            n.assignableIndex = n.assignables.createSearchIndex();
            for (var a in n.assignableIndex) {
                "*" === t && o.push(a),
                i = e.user.isIDEqual(a) ? e.language.getText("label_assign_me") : "",
                -1 !== i.toLowerCase().indexOf(t.toLowerCase()) && (t = e.user.attributes.name);
                var r = n.assignableIndex[a];
                r && -1 !== r.toLowerCase().indexOf(c.escape(t.toLowerCase())) && o.push(a);
            }
            return o;
        },
        renderSearchResults: function(e) {
            var t = this;
            if (!t.destroyed) {
                var i, n = t.$("li").not(".no-assign");
                n.removeClass("selected"),
                t.$(".no-assign").removeClass("selected"),
                c.each(n, function(t) {
                    i = !c.include(e, l(t).attr("rel")),
                    l(t).toggleClass("hidden", i);
                });
                var o = t.$(".shared-users li").not(".hidden, .no-assign");
                o.length > 0 && o.first().addClass("selected");
            }
        },
        getSelected: function() {
            return this.$(".selected").attr("rel");
        },
        selectNone: function() {
            var e = this;
            e.$("li").not(".no-assign").removeClass("selected").removeClass("hidden"),
            e.$(".no-assign").addClass("selected");
        },
        navigate: function(t) {
            var i, n, o, a = this, r = a.$(".shared-users li").not(".hidden"), s = a.$(".selected"), l = r.length, c = r.index(s);
            s.length ? ("up" === t ? i = c > 0 ? c - 1 : l - 1 : "down" === t && (i = l - 1 > c ? c + 1 : 0),
            void 0 !== i && (n = r.eq(i))) : n = r.eq(0),
            n && n.length && (r.removeClass("selected"),
            n.addClass("selected"),
            a.handleVisibility(a.$(".selected"), a.$(".shared-users"), t),
            o = n.find(".name").text(),
            o && e.trigger("assigneeSelected", o, a.taskId));
        }
    });
}),
define("views/Tags/Controllers/TagPopoverViewController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            "create:tag": "createTag",
            navigate: "onNavigate",
            close: "onClose"
        },
        createTag: function(e) {
            var t = this;
            t.stopEventFully(e);
            var i = t.view.$(".selected")
              , o = i.text() || n(e.target).closest("li").text();
            o && this.view.trigger("tagAutoComplete:create", o);
        },
        onClose: function() {
            this.view.close();
        },
        onNavigate: function(e) {
            this.view.navigate(e);
        }
    });
}),
define("/templates/tags/tagPopover.js", {
    name: "tags/tagPopover",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="tags"> <div class="header">Tags</div> <ul class="all-tags"> </ul> </div>';
        },
        useData: !0
    }
}),
define("/styles/_autoComplete.js", {
    name: "_autoComplete",
    data: ".positionHelper{position:absolute;visibility:hidden;width:auto;white-space:nowrap;font-size:16px;text-shadow:0 1px 2px rgba(0,0,0,0.8);margin-left:25px;}.positionHelper .positionHelper-target{position:absolute;right:0}.end-positionHelper-target{position:absolute;visibility:hidden;width:5px;right:120px;height:20px}"
}),
define("views/Tags/TagPopoverView", ["application/runtime", "views/Popovers/PopoverView", "mixins/TaskBrowserView/ViewportMixin", "views/Tags/Controllers/TagPopoverViewController", "template!tags/tagPopover", "style!popover/assigningPopover", "style!_autoComplete"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = t.prototype;
    return t.extend({
        template: o,
        styles: [a, r],
        config: {
            bindToTarget: !1,
            margin: -4
        },
        "implements": [n],
        observes: {
            runtime: {
                "tag:select": ">create:tag",
                "tagPopover:navigate": ">navigate",
                "tagPopover:cancel": ">close"
            }
        },
        emits: {
            "mousedown li": "create:tag"
        },
        initialize: function(e) {
            var t = this;
            e && s.extend(t.config, e),
            i.applyTo(t),
            l.initialize.apply(t, arguments);
        },
        render: function() {
            var e = this;
            return l.render.apply(e, arguments),
            e;
        },
        renderTagSearchResults: function(e) {
            var t = this
              , i = t.$(".all-tags");
            i.empty();
            var n = !1;
            1 === e.length && (n = !0),
            s.each(e, function(e) {
                i.append('<li><span class="name">' + e + "</span></li>"),
                n && t.$("li").addClass("selected");
            });
        },
        navigate: function(e) {
            var t, i = this, n = i.$(".all-tags>li").not(".hidden"), o = n.filter(".selected"), a = n.size(), r = n.index(o);
            o.length ? ("up" === e ? t = r > 0 ? r - 1 : a - 1 : "down" === e && (t = a - 1 > r ? r + 1 : 0),
            void 0 !== t && (n.removeClass("selected"),
            n.eq(t).addClass("selected"),
            i.handleVisibility(i.$(".selected"), i.$(".all-tags"), e))) : n.eq(0).addClass("selected");
        }
    });
}),
define("views/Emoji/Controllers/EmojiPopoverViewController", ["application/runtime", "wunderbits/helpers/strings", "wunderbits/mixins/EmojiData", "wunderbits/WBViewController", "wunderbits/helpers/strings"], function(e, t, i, n, o) {
    var a = e.$;
    return n.extend({
        "implements": {
            "get:suggestions": "getSuggestions",
            "create:emoji": "createEmoji",
            navigate: "onNavigate",
            close: "onClose"
        },
        getSuggestions: function(e, n) {
            var o = this
              , a = []
              , r = new RegExp(t.escapeForRegex("" + e))
              , s = i.nameIndex;
            for (var l in s)
                r.test(l) && a.push({
                    name: l,
                    unicode: o.getUnicodeStringForEmoji(l)
                });
            var c = new RegExp("^" + t.escapeForRegex(e));
            a = a.sort(function(e, t) {
                var i, n = e.name, o = t.name, a = c.test(n), r = c.test(o);
                return i = a && !r ? -1 : !a && r ? 1 : o > n ? -1 : n > o ? 1 : 0;
            }),
            o.view.requestAnimationFrame(function() {
                o.view.renderEmojiSearchResults(a);
            }),
            n(a);
        },
        getUnicodeStringForEmoji: function(e) {
            var t, n = i.nameIndex, a = n[e], r = /-/.test(a);
            return t = r ? a.split("-").map(function(e) {
                return o.fromCodePoint("0x" + e);
            }).join("") : o.fromCodePoint("0x" + a);
        },
        createEmoji: function(e) {
            var t, i = this;
            if (e && e.currentTarget) {
                var n = a(e.currentTarget);
                if (n.is("li")) {
                    var o = n.find(".name");
                    t = o && o.text();
                }
            }
            if (i.stopEventFully(e),
            !t) {
                var r = i.view.$(".selected").find(".name");
                t = r.html();
            }
            t && this.view.trigger("emojiAutoComplete:create", t);
        },
        onClose: function() {
            this.view.close();
        },
        onNavigate: function(e) {
            this.view.navigate(e);
        }
    });
}),
define("/templates/emoji/emojiPopover.js", {
    name: "emoji/emojiPopover",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="emojis"> <div class="header">emoji</div> <ul class="all-emojis"> </ul> </div> ';
        },
        useData: !0
    }
}),
define("views/Emoji/EmojiPopoverView", ["application/runtime", "views/Popovers/PopoverView", "mixins/TaskBrowserView/ViewportMixin", "wunderbits/mixins/UnicodeEmojiViewMixin", "views/Emoji/Controllers/EmojiPopoverViewController", "template!emoji/emojiPopover", "style!popover/assigningPopover", "style!_autoComplete"], function(e, t, i, n, o, a, r, s) {
    var l = e._
      , c = e.$
      , d = t.prototype
      , u = t.extend({
        template: a,
        styles: [r, s],
        config: {
            bindToTarget: !1,
            margin: -4
        },
        "implements": [o],
        observes: {
            runtime: {
                "emoji:select": ">create:emoji",
                "emojiPopover:navigate": ">navigate",
                "emojiPopover:cancel": ">close"
            }
        },
        emits: {
            "mousedown li": "create:emoji"
        },
        initialize: function(e) {
            var t = this;
            e && l.extend(t.config, e),
            i.applyTo(t),
            d.initialize.apply(t, arguments);
        },
        render: function() {
            var e = this;
            return d.render.apply(e, arguments),
            e;
        },
        renderEmojiSearchResults: function(e) {
            var t = this
              , i = t.$(".all-emojis");
            i.empty();
            var n = !1;
            1 === e.length && (n = !0),
            l.each(e, function(e) {
                i.append("<li>" + e.unicode + ' <span class="name">:' + e.name + ":</span></li>"),
                n && t.$("li").addClass("selected");
            }),
            l.each(t.$("li"), function(e) {
                t.renderEmoji(c(e));
            });
        },
        navigate: function(e) {
            var t, i = this, n = i.$(".all-emojis li").not(".hidden"), o = i.$(".selected"), a = n.length, r = n.index(o);
            o.length ? ("up" === e ? t = r > 0 ? r - 1 : a - 1 : "down" === e && (t = a - 1 > r ? r + 1 : 0),
            void 0 !== t && (n.removeClass("selected"),
            n.eq(t).addClass("selected"),
            i.handleVisibility(i.$(".selected"), i.$(".all-emojis"), e))) : n.eq(0).addClass("selected");
        }
    });
    return n.applyToClass(u),
    u;
}),
define("views/Tasks/AddTaskPopovers", ["application/runtime", "wunderbits/WBPopoverView", "views/Assigning/AssignToUserPopoverView", "views/Tags/TagPopoverView", "views/Emoji/EmojiPopoverView", "vendor/moment", "project!core"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = r.WBEventEmitter
      , c = l.prototype
      , d = {
        interval: null,
        date: null,
        frequency: null
    };
    return l.extend({
        popovers: {
            WBPopoverView: t,
            AssignToUserPopoverView: i,
            TagPopoverView: n,
            EmojiPopoverView: o
        },
        initialize: function(e) {
            var t = this;
            t.datePickers = e.datePickers,
            c.initialize.apply(t, arguments);
        },
        resetDatePickerModels: function() {
            var e = this;
            e.datePickers.datePicker.model.set(d),
            e.datePickers.reminderDatePicker.model.set(d);
        },
        setupPopover: function(e, t, i, n, o) {
            var a = this
              , r = a.popovers[e]
              , l = {
                context: a,
                target: t,
                ignoredElements: [],
                bindToTarget: !1,
                animation: !0,
                position: "bottom",
                onInputBlur: i,
                onClose: n
            };
            return l = s.extend(l, o),
            new r(l);
        }
    });
}),
define("views/Tasks/AddTaskViewTextParser", ["application/runtime", "project!core"], function(e, t) {
    var i = e._;
    return t.WBEventEmitter.extend({
        checkInputForKeyCharacters: function(e, t, n) {
            var o = this;
            (!o.assignPopover || o.assignPopover && o.assignPopover.destroyed) && (o.assignPopover = t),
            o.lastCharacter = e.charAt(e.length - 1),
            o.words = e.split(" "),
            o.firstWords = i.initial(o.words),
            o.lastWord = o.words[o.words.length - 1],
            o.firstLetterOfLastWord = o.lastWord[0];
            var a, r = o.parseTextForHash(e), s = o.parseTextForColon(e);
            n && !r && (a = o.parseTextForAtSign(e)),
            !r && !a && !s && o.trigger("close:tagPopover");
        },
        parseTextForHash: function(e) {
            var t = this;
            return "#" === t.lastWord ? (t.findTags(e),
            t.trigger("open:tagPopover"),
            !0) : "#" === t.firstLetterOfLastWord ? (t.findTags(e),
            !0) : !1;
        },
        parseTextForAtSign: function(e) {
            var t = this
              , i = e.lastIndexOf("@");
            return t.characterBeforeAt = -1 !== i ? e.slice(i - 1, i) : "",
            t.possibleName = -1 !== i ? e.slice(i + 1, e.length) : t.lastWord,
            "@" === t.lastWord ? (t.possibleName = "*",
            t.findAssignable(),
            t.trigger("open:assignPopover"),
            !0) : t.findAssignable() || "@" === t.firstLetterOfLastWord ? (t.trigger("open:assignPopover"),
            !0) : (t.trigger("close:assignPopover"),
            !1);
        },
        parseTextForColon: function() {
            function e() {
                return t.trigger("close:emojiPopover"),
                !1;
            }
            var t = this;
            if (":" === t.lastWord[0]) {
                if (t.lastWord.length > 1)
                    return t.trigger("open:emojiPopover"),
                    t.trigger("suggest:emoji", t.lastWord),
                    !0;
                e();
            } else
                e();
        },
        findTags: function() {
            for (var t = this, i = [], n = 0, o = t.firstWords.length; o > n; n++)
                "#" === t.firstWords[n][0] && i.push(t.firstWords[n]);
            e.trigger("tags:getSuggestions", t.lastWord, i);
        },
        findAssignable: function() {
            var e = this
              , t = e.assignPopover && e.assignPopover.searchRecipients(e.possibleName);
            return e.assignPopover && e.assignPopover.renderSearchResults(t),
            t.length > 0 && "" !== e.possibleName && e.possibleName.length >= 3;
        }
    });
}),
define("wunderbits/views/SpeechRecognitionController", ["../global", "../WBViewController", "../WBEnvironmentModel"], function(e, t, i) {
    var n, o = t.prototype;
    return t.extend({
        "implements": {
            "toggle:speech": "toggleRecognition"
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(e, arguments),
            n = i.speechRecognition;
        },
        toggleRecognition: function() {
            var e = this
              , t = e.view;
            if (t.started)
                return e.stopSpeechRecognition(),
                !1;
            if (i.isChromeApp()) {
                var n = window.chrome;
                n.permissions.request({
                    permissions: ["audioCapture"]
                }, function(t) {
                    t ? e.requestAudioPermission() : e.onFail(arguments);
                });
            } else
                e.requestAudioPermission();
        },
        requestAudioPermission: function() {
            var e = this;
            i.getUserMedia({
                audio: !0,
                video: !1
            }, e.onSuccess.bind(e), e.onFail.bind(e));
        },
        onSuccess: function() {
            var e, t = this, i = t.view;
            t.speechRecognizer = e = new n(),
            e.continuous = !0,
            e.onresult = t.onSpeechResult.bind(t),
            e.lang = i.lang,
            e.start(),
            i.toggleUI(!0),
            i.started = !0;
        },
        onFail: function() {
            var e = this
              , t = e.view;
            t.toggleUI(!1),
            t.started = !1;
        },
        onSpeechResult: function(e) {
            for (var t = this, i = t.view, n = i.target, o = e.resultIndex; o < e.results.length; o++)
                e.results[o].isFinal ? (n.value += e.results[o][0].transcript,
                t.stopSpeechRecognition()) : n.value += e.results[o][0].transcript;
        },
        stopSpeechRecognition: function() {
            var e = this
              , t = e.view;
            t.started = !1,
            e.speechRecognizer.stop(),
            t.toggleUI(!1);
        }
    });
}),
define("/templates/speech.js", {
    name: "speech",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return r((o = t.symbol || e && e.symbol || a,
            o.call(e, "speech", {
                name: "symbol",
                hash: {},
                data: n
            })));
        },
        useData: !0
    }
}),
define("/templates/symbols/speech.js", {
    name: "symbols/speech",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="speech" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="speech"> <path d="M10,13 C11.92,13 13.5,11.42 13.5,9.5 L13.5,5.5 C13.5,3.58 11.92,2 10,2 C8.08,2 6.5,3.58 6.5,5.5 L6.5,9.5 C6.5,11.42 8.08,13 10,13 L10,13 Z M7.5,5.5 C7.5,4.12 8.62,3 10,3 C11.38,3 12.5,4.12 12.5,5.5 L12.5,9.5 C12.5,10.88 11.38,12 10,12 C8.62,12 7.5,10.88 7.5,9.5 L7.5,5.5 Z M15.5,8.5 C15.5,8.22 15.28,8 15,8 C14.72,8 14.5,8.22 14.5,8.5 L14.5,9.5 C14.5,11.98 12.48,14 10,14 C7.52,14 5.5,11.98 5.5,9.5 L5.5,8.5 C5.5,8.22 5.28,8 5,8 C4.72,8 4.5,8.22 4.5,8.5 L4.5,9.5 C4.5,12.36 6.7,14.72 9.5,14.98 L9.5,17 L6,17 C5.72,17 5.5,17.22 5.5,17.5 C5.5,17.78 5.72,18 6,18 L14,18 C14.28,18 14.5,17.78 14.5,17.5 C14.5,17.22 14.28,17 14,17 L10.5,17 L10.5,14.98 C13.3,14.72 15.5,12.36 15.5,9.5 L15.5,8.5 Z" id="O"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("wunderbits/views/WBSpeechRecognitionView", ["../WBViewPresenter", "./SpeechRecognitionController", "template!speech", "partial!symbols/speech"], function(e, t, i) {
    var n = e.prototype;
    return e.extend({
        tagName: "a",
        template: i,
        "implements": [t],
        className: "speech-wrapper",
        emits: {
            click: "toggle:speech"
        },
        initialize: function(e) {
            var t = this;
            n.initialize.apply(t, arguments),
            t.target = e && e.target || t.el,
            t.lang = e && e.lang || "en_US";
        },
        toggleUI: function(e) {
            var t = this;
            t.el.classList[e ? "add" : "remove"]("stop"),
            t.el.classList[e ? "remove" : "add"]("start");
        }
    });
}),
define("/templates/addTask.js", {
    name: "addTask",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<a class="plus-wrapper">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "plus-small", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</a> <input type="text" class="addTask-input chromeless" maxlength="255"/> <div class="nlp-feedback"></div> <div class="positionHelper"> <div class="positionHelper-text"></div> <div class="positionHelper-target"></div> </div> <div class="end-positionHelper-target"></div> ';
        },
        useData: !0
    }
}),
define("/styles/addTask.js", {
    name: "addTask",
    data: '#wunderlist-base .addTask{overflow:hidden;position:relative;margin:14px 0;padding:0 12px;-webkit-border-radius:3px;border-radius:3px;}.background-01#wunderlist-base .addTask{background:rgba(115,62,39,0.75)}.background-02#wunderlist-base .addTask{background:rgba(83,127,112,0.75)}.background-03#wunderlist-base .addTask{background:rgba(83,97,127,0.75)}.background-04#wunderlist-base .addTask{background:rgba(71,143,138,0.75)}.background-05#wunderlist-base .addTask{background:rgba(168,109,67,0.75)}.background-06#wunderlist-base .addTask{background:rgba(102,137,100,0.75)}.background-07#wunderlist-base .addTask{background:rgba(102,152,68,0.75)}.background-08#wunderlist-base .addTask{background:rgba(4,131,183,0.75)}.background-09#wunderlist-base .addTask{background:rgba(42,108,136,0.75)}.background-10#wunderlist-base .addTask{background:rgba(104,55,87,0.75)}.background-11#wunderlist-base .addTask{background:rgba(51,78,131,0.75)}.background-12#wunderlist-base .addTask{background:rgba(58,113,115,0.75)}.background-13#wunderlist-base .addTask{background:rgba(94,140,156,0.75)}.background-14#wunderlist-base .addTask{background:rgba(47,102,118,0.75)}.background-15#wunderlist-base .addTask{background:rgba(113,175,140,0.75)}.background-16#wunderlist-base .addTask{background:rgba(188,74,58,0.75)}.background-17#wunderlist-base .addTask{background:rgba(89,89,89,0.75)}.background-18#wunderlist-base .addTask{background:rgba(87,87,87,0.75)}.background-19#wunderlist-base .addTask{background:rgba(184,109,130,0.75)}.background-20#wunderlist-base .addTask{background:rgba(96,55,57,0.75)}.background-21#wunderlist-base .addTask{background:rgba(166,85,65,0.75)}.background-22#wunderlist-base .addTask{background:rgba(58,127,147,0.75)}.background-23#wunderlist-base .addTask{background:rgba(87,64,51,0.75)}.background-24#wunderlist-base .addTask{background:rgba(189,174,136,0.75)}.background-25#wunderlist-base .addTask{background:rgba(14,145,197,0.75)}.background-26#wunderlist-base .addTask{background:rgba(118,90,152,0.75)}.background-27#wunderlist-base .addTask{background:rgba(193,91,61,0.75)}.background-28#wunderlist-base .addTask{background:rgba(165,126,136,0.75)}.background-29#wunderlist-base .addTask{background:rgba(191,117,85,0.75)}.background-30#wunderlist-base .addTask{background:rgba(5,95,235,0.75)}#wunderlist-base .addTask .wundercon{color:rgba(255,255,255,0.8)}#wunderlist-base .addTask .addTask-input,#wunderlist-base .addTask .nlp-feedback{font-size:16px;padding:13px 60px 14px 0;}#wunderlist-base .addTask .addTask-input.is-assignable,#wunderlist-base .addTask .nlp-feedback.is-assignable{padding-right:100px}#wunderlist-base .addTask .addTask-input{color:#fff;}#wunderlist-base .addTask .addTask-input::-webkit-input-placeholder{color:rgba(255,255,255,0.6)}#wunderlist-base .addTask .addTask-input:-moz-placeholder{color:rgba(255,255,255,0.6)}#wunderlist-base .addTask .addTask-input:-ms-input-placeholder{color:rgba(255,255,255,0.6)}#wunderlist-base .addTask .nlp-feedback{position:absolute;top:0;color:rgba(255,255,255,0);pointer-events:none;white-space:pre;}#wunderlist-base .addTask .nlp-feedback .highlight{border-bottom:1px solid #fff}#wunderlist-base .addTask .addTask-meta{position:absolute;top:12px;right:0;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);}#wunderlist-base .addTask .addTask-meta .addTask-meta-nlp{overflow:hidden;white-space:nowrap;color:#fff;font-weight:bold;text-shadow:0 1px 2px rgba(0,0,0,0.8);padding-top:1px}#wunderlist-base .addTask .addTask-meta .addTask-meta-star,#wunderlist-base .addTask .addTask-meta .addTask-meta-assign,#wunderlist-base .addTask .addTask-meta .addTask-meta-date{opacity:.7;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";filter:alpha(opacity=70);color:#fff;}#wunderlist-base .addTask .addTask-meta .addTask-meta-star svg,#wunderlist-base .addTask .addTask-meta .addTask-meta-assign svg,#wunderlist-base .addTask .addTask-meta .addTask-meta-date svg{fill:#fff}#wunderlist-base .addTask .addTask-meta .addTask-meta-star.starred,#wunderlist-base .addTask .addTask-meta .addTask-meta-assign.assigned,#wunderlist-base .addTask .addTask-meta .addTask-meta-date.dated{opacity:1;-ms-filter:none;filter:none}#wunderlist-base .addTask .addTask-meta a{cursor:default}#wunderlist-base .addTask .addTask-meta-star{margin-right:9px;}#wunderlist-base .addTask .addTask-meta-star.starred svg path:last-child{opacity:1;-ms-filter:none;filter:none}#wunderlist-base .addTask .addTask-meta-date{margin-right:15px;position:relative;}#wunderlist-base .addTask .addTask-meta-date .addTask-meta-date-label{position:absolute;top:7px;left:0;height:10px;width:20px;color:#fff;font-size:8px;font-weight:bold;text-align:center}#wunderlist-base .addTask .addTask-meta-date .input-assign-delete{position:absolute;display:none;top:-8px;right:-8px;z-index:102}#wunderlist-base .addTask .addTask-meta-date.dated:hover .input-assign-delete{display:block}#wunderlist-base .addTask .addTask-meta-assign{position:relative;margin-right:15px;}#wunderlist-base .addTask .addTask-meta-assign .avatar,#wunderlist-base .addTask .addTask-meta-assign .input-assign-frame,#wunderlist-base .addTask .addTask-meta-assign .input-assign-delete{position:absolute;display:none}#wunderlist-base .addTask .addTask-meta-assign .input-assign-frame{top:-3px;left:-2px;z-index:101}#wunderlist-base .addTask .addTask-meta-assign .input-assign-delete{top:-8px;right:-8px;z-index:102}#wunderlist-base .addTask .addTask-meta-assign .avatar{top:0;left:0}#wunderlist-base .addTask .addTask-meta-assign.assigned .wundercon.assigned{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}#wunderlist-base .addTask .addTask-meta-assign.assigned .avatar,#wunderlist-base .addTask .addTask-meta-assign.assigned svg{display:block}#wunderlist-base .addTask .addTask-meta-assign.assigned .input-assign-delete{display:none}#wunderlist-base .addTask .addTask-meta-assign.assigned:hover .input-assign-delete{display:block}#wunderlist-base .addTask .speech-wrapper,#wunderlist-base .addTask .plus-wrapper{display:block;width:20px;height:20px;position:absolute;top:13px;opacity:.7;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";filter:alpha(opacity=70);}#wunderlist-base .addTask .speech-wrapper svg,#wunderlist-base .addTask .plus-wrapper svg{fill:#fff}#wunderlist-base .addTask .speech-wrapper:hover,#wunderlist-base .addTask .plus-wrapper:hover{opacity:.8;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";filter:alpha(opacity=80)}#wunderlist-base .addTask .speech-wrapper.stop,#wunderlist-base .addTask .plus-wrapper.stop{opacity:1;-ms-filter:none;filter:none}#wunderlist-base .addTask .plus-wrapper{top:14px}#wunderlist-base .addTask .addTask-input,#wunderlist-base .addTask .nlp-feedback{padding-left:28px;-webkit-transition:none;-moz-transition:none;-o-transition:none;-ms-transition:none;transition:none}#wunderlist-base .focus .addTask-meta{opacity:1;-ms-filter:none;filter:none;}#wunderlist-base .focus .addTask-meta a{cursor:pointer}#wunderlist-base .speech-wrapper{display:none;}#wunderlist-base .speech-wrapper.stop{opacity:1;-ms-filter:none;filter:none}html[dir=ltr] #wunderlist-base .addTask .speech-wrapper,html[dir=ltr] #wunderlist-base .addTask .plus-wrapper{left:10px}html[dir=rtl] #wunderlist-base #tasks .addTask .speech-wrapper,html[dir=rtl] #wunderlist-base #tasks .addTask .plus-wrapper{right:10px}html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-input{padding-right:28px;padding-left:60px}html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-meta{left:0;right:initial}html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-meta-star,html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-meta-date,html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-meta-assign{margin-right:initial}html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-meta-star{margin-left:9px}html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-meta-date{margin-left:15px}html[dir=rtl] #wunderlist-base #tasks .addTask .addTask-meta-assign{margin-left:15px}#wunderlist-base.msie .addTask .addTask-input{text-shadow:none}'
}),
define("views/Tasks/AddTaskView", ["application/runtime", "helpers/domtools", "./Controllers/AddTaskViewController", "./Controllers/AddTaskViewNLPController", "./AddTaskAttributesView", "./AddTaskDatePickersView", "./AddTaskPopovers", "views/Emoji/EmojiPopoverView", "./AddTaskViewTextParser", "vendor/moment", "wunderbits/WBViewPresenter", "wunderbits/views/WBSpeechRecognitionView", "wunderbits/helpers/date", "project!core", "template!addTask", "style!addTask", "style!_autoComplete", "partial!symbols/plus-small"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v) {
    var _ = e._
      , w = e.$
      , k = p.WBStateModel
      , x = d.prototype
      , y = Function.prototype
      , C = {
        starred: "add_starred_to_inbox",
        today: "add_due_today_to_inbox",
        all: "add_to_inbox"
    };
    return d.extend({
        template: g,
        className: "addTask hidden",
        "implements": [i, n],
        styles: [f, b],
        emits: {
            "keydown input": "keydown:input",
            "keyup input": "keyup:input",
            "blur input": "blur:input",
            "focus input": "focus:input"
        },
        events: {
            "mousedown .speech-wrapper": "onMouseDownSpeechWrapper",
            "click .plus-wrapper": "setFocus"
        },
        observes: {
            "runtime.languages": {
                "change:data": "setPlaceholder"
            },
            runtime: {
                "lists:ready": "onListsReady",
                "tags:suggestions": "tagSuggestions",
                "autoComplete:assign": "cleanupAutoComplete",
                "focus:addTaskInput": "setFocus"
            },
            textParser: {
                "open:assignPopover": "openAssignPopover",
                "open:tagPopover": "openTagPopover",
                "open:emojiPopover": "openEmojiPopover",
                "suggest:emoji": "emojiSuggestion",
                "close:assignPopover": "closeAssignPopover",
                "close:tagPopover": "closeTagPopover",
                "close:emojiPopover": "closeEmojiPopover"
            },
            attributeState: {
                "change:userSet": "onChangeUserSet"
            },
            focusState: {
                "change:hasFocus": "onChangeFocus"
            }
        },
        initialize: function() {
            var t = this;
            t.listsReady = t.deferred(),
            t.focusState = new k({
                hasFocus: !1,
                isSpeechEnabled: e.env.isSpeechEnabled() && !e.env.isNodeWebkit()
            }),
            t.blurState = new k({
                shouldBlur: !0,
                overrideBlurDelay: 200
            }),
            t.attributeState = new k({
                starred: !1,
                due_date: null,
                assignee: null
            }),
            t.datePickers = t.addSubview(new a(), "datePickers"),
            t.popovers = new r({
                datePickers: t.datePickers
            }),
            t.attributesView = t.addSubview(new o({
                blurState: t.blurState,
                attributeState: t.attributeState,
                popovers: t.popovers,
                datePickers: t.datePickers
            })),
            t.textParser = new l(),
            x.initialize.apply(t, arguments),
            t.bindTo(t.datePickers.datePicker.model, "change", "onSetChanges"),
            t.bindTo(t.datePickers.reminderDatePicker.model, "change", "onSetChanges");
        },
        render: function(e) {
            var t = this
              , i = !1;
            return (t.listID === e.listID && !e.filter && !t.filter || t.listID === e.listID && e.filter && e.filter === t.filter) && (i = !0),
            t.listID = e.listID,
            t.listModel = e.listModel,
            x.render.call(t),
            t.filter = e.filter || (e.listModel ? null : t.filter),
            i ? t : (t.$el.prepend(t.attributesView.render({
                addTaskEl: t.$el,
                listID: t.listID,
                filter: t.filter
            }).el),
            t.focusState.attributes.isSpeechEnabled && t.setupSpeechInput(),
            t.resetView(),
            t.setPlaceholder(),
            t.renderTagPopover(),
            t.renderEmojiPopover(),
            t.renderAssignPopover(),
            t.updateIsAssignable(),
            t.setupFilters(),
            t);
        },
        resetInput: function() {
            var e = this;
            e.$(".addTask-input").val("");
        },
        setupSpeechInput: function() {
            var t = this;
            t.speechRecognition || (t.speechRecognition = t.addSubview(new u({
                target: t.$("input")[0],
                lang: e.settings.attributes.language
            })));
            var i = t.speechRecognition;
            t.el.appendChild(i.render().el),
            i.$el.addClass("hidden");
        },
        onListsReady: function(e) {
            var t = this;
            t.lists = e,
            t.listsReady.resolve();
        },
        setPlaceholder: function() {
            var t, i = this, n = i.$(".addTask-input"), o = C[i.filter];
            o ? (o = "placeholder_" + o,
            n.attr("data-key-placeholder", o),
            n.attr("data-key-aria-label", o),
            n.attr("data-placeholder", ""),
            n.attr("data-aria-label", ""),
            i.renderPlaceHolders(),
            i.renderAriaAttributes()) : i.listsReady.done(function() {
                var o = i.lists.get(i.listID);
                i.placeholderBind && i.unbindFrom(i.placeholderBind),
                i.placeholderBind = o && i.bindTo(o, "change:title", i.setPlaceholder),
                t = o && "inbox" === o.id ? e.language.getText("smart_list_inbox") : o && o.attributes.title,
                n.attr("data-key-placeholder", "placeholder_add_task_mobile"),
                n.attr("data-key-aria-label", "placeholder_add_task_to_$"),
                n.attr("data-placeholder", t),
                n.attr("data-aria-label", t),
                i.renderPlaceHolders(),
                i.renderAriaAttributes();
            });
        },
        setFocus: function() {
            var e = this
              , t = e.$(".addTask-input");
            t.is(":focus") || t.focus();
        },
        resetView: function() {
            var e = this;
            e.$(".addTask-meta-assign").removeClass("assigned"),
            e.$(".addTask-meta-date").removeClass("dated"),
            e.$(".addTask-meta-date-label").empty(),
            e.$(".addTask-meta-star").removeClass("starred"),
            e.attributeState.set({
                frequency: null,
                interval: null,
                due_date: "today" === e.filter ? e.attributeState.attributes.due_date : null,
                reminderDate: null,
                reminderTime: null,
                starred: "starred" === e.filter ? !0 : !1,
                assignee: null,
                userSet: !1,
                nlpApplied: !1,
                nlpData: v,
                nlpDate: v,
                nlpDateIndex: v,
                nlpTime: v,
                nlpTimeIndex: v,
                nlpHightlightsRendered: !1
            }),
            e.popovers.resetDatePickerModels();
        },
        renderNLPFeedback: function(e) {
            var i = this
              , n = i.attributeState.attributes
              , o = n.nlpDate !== e.text
              , a = n.nlpDateIndex !== e.index
              , r = n.nlpTime !== e.time.text
              , s = n.nlpTimeIndex !== e.time.index
              , l = n.nlpHightlightsRendered;
            i.attributeState.set({
                nlpDate: e.text,
                nlpDateIndex: e.index,
                nlpTime: e.time.text,
                nlpTimeIndex: e.time.index
            }),
            (o || r || a || s || !l) && i.renderNLPHighlights(e),
            o && i.requestAnimationFrame(function() {
                function n() {
                    i.requestAnimationFrame(function() {
                        o.addClass("hidden").text("").removeAttr("style"),
                        s.addClass("nlp"),
                        i.delay(function() {
                            s.removeClass("nlp");
                        }, 200);
                    });
                }
                i.setPositionHelper();
                var o = i.$(".addTask-meta-nlp")
                  , a = i.$(".addTask-input")
                  , r = i.$(".positionHelper-text")
                  , s = i.$(".addTask-meta-date")
                  , l = a.width()
                  , c = r.width();
                o.text(e.text).removeClass("hidden").css({
                    width: l - c,
                    transition: "width 350ms cubic-bezier(.54,0,.88,.47), opacity 350ms linear"
                });
                var d = o[0];
                d && t.once(d, "transitionend", n),
                i.defer(function() {
                    o.css({
                        width: 0,
                        opacity: .5
                    });
                });
            });
        },
        _extractNLPHighlights: function(e) {
            var t = [e];
            return ["time"].forEach(function(i) {
                var n = e[i];
                n && n.index !== v && t.push(n);
            }),
            t.sort(function(e, t) {
                return e.index < t.index ? -1 : e.index > t.index ? 1 : 0;
            });
        },
        removeNLPHighlights: function() {
            var e = this;
            e.$(".nlp-feedback").empty(),
            e.attributeState.set({
                nlpHightlightsRendered: !1
            });
        },
        renderNLPHighlights: function(e) {
            var t = this;
            t.removeNLPHighlights();
            var i = t.$(".nlp-feedback")
              , n = t.$(".addTask-input").val()
              , o = t._extractNLPHighlights(e)
              , a = document.createDocumentFragment()
              , r = 0;
            o.forEach(function(e) {
                var t = e.index
                  , i = t + e.length;
                if (t >= r) {
                    var o = n.slice(r, t)
                      , s = n.slice(t, i);
                    if (o.length) {
                        var l = document.createElement("span");
                        l.appendChild(document.createTextNode(o)),
                        a.appendChild(l);
                    }
                    if (s.length) {
                        var c = document.createElement("span");
                        c.appendChild(document.createTextNode(s)),
                        c.classList.add("highlight"),
                        a.appendChild(c);
                    }
                    r = i;
                }
            }),
            i[0].appendChild(a),
            t.attributeState.set({
                nlpHightlightsRendered: !0
            });
        },
        renderEmojiPopover: function() {
            var e = this;
            e.emojiPopover = e.addSubview(e.popovers.setupPopover("EmojiPopoverView", e.$(".positionHelper-target"), y, y, {
                position: "bottom",
                offset: 70,
                margin: -4
            }), "emojiPopover"),
            e.bindTo(e.emojiPopover, "emojiAutoComplete:create", "selectTag");
        },
        openEmojiPopover: function() {
            var t = this;
            if (e.trigger("focus:set", "emojiPopover"),
            !t.emojiPopover.popover || t.emojiPopover.popover.popoverOpened !== !0) {
                t.setPositionHelper();
                var i = {
                    reconfig: !0,
                    context: t,
                    offset: t.getOffsetForPopover(),
                    target: t.getTargetForPopover()
                };
                t.emojiPopover && t.emojiPopover.toggle("open", i);
            }
        },
        renderTagPopover: function() {
            var t = this;
            t.tagPopover = t.addSubview(t.popovers.setupPopover("TagPopoverView", t.$(".positionHelper-target"), y, function() {
                e.trigger("focus:set", "addTask");
            }, {
                context: t,
                position: "bottom",
                offset: 70,
                margin: -4
            }), "tagPopover"),
            t.tagPopoverBind = t.bindTo(t.tagPopover, "tagAutoComplete:create", "selectTag");
        },
        openTagPopover: function() {
            var t = this;
            e.trigger("focus:set", "tagPopover"),
            t.setPositionHelper();
            var i = {
                reconfig: !0,
                context: t,
                offset: t.getOffsetForPopover(),
                target: t.getTargetForPopover()
            };
            t.tagPopover && t.tagPopover.toggle("open", i);
        },
        renderAssignPopover: function() {
            var t = this;
            t.assignPopover = t.addSubview(t.popovers.setupPopover("AssignToUserPopoverView", t.$(".positionHelper-target"), y, function() {
                e.trigger("focus:set", "addTask");
            }, {
                listId: t.listID,
                assignedTo: t.attributeState.attributes.assignee,
                offset: 70,
                margin: -4,
                hideNoAssign: !0,
                reconfig: !0
            }), "assignPopover"),
            t.bindTo(t.assignPopover, "clear:assigned", function() {
                t.trigger("click:deleteAssignee");
            });
        },
        openAssignPopover: function() {
            var t = this;
            if (e.trigger("focus:set", "assignPopover"),
            !t.assignPopover.popover || t.assignPopover.popover.popoverOpened !== !0) {
                t.setPositionHelper();
                var i = {
                    assignedTo: t.attributeState.attributes.assignee,
                    offset: t.getOffsetForPopover(),
                    margin: -4,
                    listId: t.listID,
                    hideNoAssign: !0,
                    reconfig: !0,
                    startedFromKeys: !0,
                    target: t.getTargetForPopover()
                };
                t.assignPopover && t.assignPopover.toggle("open", i);
            }
        },
        getWidthsForPopover: function() {
            var e = this
              , t = e.$(".addTask-input").width() - 125
              , i = e.$(".positionHelper-text").width();
            return {
                input: t,
                positionHelper: i
            };
        },
        getTargetForPopover: function() {
            var e = this
              , t = e.getWidthsForPopover();
            return e.$(t.positionHelper < t.input ? ".positionHelper-target" : ".end-positionHelper-target");
        },
        getOffsetForPopover: function() {
            var e = this
              , t = e.getWidthsForPopover();
            return t.positionHelper < t.input ? 70 : 20;
        },
        closePopovers: function() {
            var e = this;
            e.closeAssignPopover(),
            e.closeEmojiPopover(),
            e.closeTagPopover(),
            e.$("input").focus();
        },
        closeTagPopover: function() {
            var e = this;
            e.tagPopover && e.tagPopover.toggle("close", {});
        },
        closeEmojiPopover: function() {
            var e = this;
            e.emojiPopover && e.emojiPopover.toggle("close", {});
        },
        closeAssignPopover: function() {
            var e = this;
            e.assignPopover && e.assignPopover.toggle("close", {});
        },
        cleanupAutoComplete: function(t, i) {
            var n = this;
            if (!i && -1 !== e.currentRoute().indexOf("/new")) {
                var o = n.$(".addTask-input").val().split(" ")
                  , a = _.last(o).toLowerCase()
                  , r = _.initial(o);
                0 === a.indexOf("@") && (a = a.substr(1));
                var s = n.assignPopover.assignables.get(t)
                  , l = s.attributes.name.toLowerCase()
                  , c = e.language.getText("label_assign_me").toLowerCase();
                a === c && e.user.isIDEqual(s.id) && (l = e.language.getText("label_assign_me").toLowerCase()),
                l.indexOf(a) < 0 && (r = o);
                var d = w.map(r, function(e) {
                    return e.replace(/\s/g, "-");
                }).join(" ");
                n.$(".addTask-input").val(d + (d.length ? " " : "")),
                n.closePopovers();
            }
        },
        onChangeUserSet: function() {
            var t = this
              , i = t.attributeState.attributes
              , n = i.userSet
              , o = i.nlpApplied
              , a = i.nlpData;
            if (n && o) {
                var r = a && a.type;
                e.trigger("analytics:NLPDueDate:removed", r);
                var s = "Client.due_date.autocreate.removed";
                s = r ? s + "." + r : s,
                e.trigger("trackingService", s, "addTaskInput");
            }
            n && (t.attributeState.save({
                nlpApplied: !1,
                nlpData: v
            }),
            t.removeNLPHighlights());
        },
        onSetChanges: function(e, t) {
            var i = this;
            i.attributeState.set({
                frequency: null,
                interval: null,
                due_date: null,
                reminderDate: null,
                reminderTime: null
            });
            var n = i.datePickers.datePicker.model.attributes.date
              , o = i.datePickers.datePicker.model.attributes.frequency
              , a = i.datePickers.datePicker.model.attributes.interval
              , r = n ? !0 : !1
              , s = i.datePickers.reminderDatePicker.model.attributes.date
              , l = i.datePickers.reminderDatePicker.model.attributes.reminder_time;
            i.attributeState.set({
                frequency: o ? o : null,
                interval: a ? a : null,
                due_date: n ? c(n).format("YYYY-MM-DD") : null,
                reminderDate: s ? m.convertLocalDateToServerDate(c(s).format("YYYY-MM-DD")) : null,
                reminderTime: l ? l : null
            }),
            t && t.userSet && i.attributeState.set({
                userSet: !0
            });
            var d = i.$(".addTask-meta-date")
              , u = d.find(".addTask-meta-date-label");
            d.toggleClass("dated", r),
            n ? u.text(c(n).format("D")) : u.empty(),
            n || s || i.$(".dated").removeClass("dated");
        },
        setPositionHelper: function() {
            var e = this
              , t = e.$(".addTask-input").val()
              , i = e.$(".positionHelper-text");
            i.html("");
            var n = t.split(" ")
              , o = n.slice(0, n.length - 1);
            i.html(o + "+");
        },
        selectTag: function(e) {
            var t = this
              , i = t.$(".addTask-input")
              , n = i.val()
              , o = n.split(" ")
              , a = _.initial(o).join(" ")
              , r = "";
            r = a ? a + " " + e + " " : e + " ",
            i.val(r),
            t.closePopovers();
        },
        tagSuggestions: function(e) {
            var t = this;
            e.length && t.tagPopover.renderTagSearchResults(e);
        },
        emojiSuggestion: function(e) {
            var t, i = this;
            i.emojiPopover.trigger("get:suggestions", e.replace(":", ""), function(e) {
                t = e;
            }),
            t && t.length || (i.searchingEmoji = !1,
            i.emojiPopover && i.closePopovers());
        },
        updateIsAssignable: function() {
            var t = this
              , i = t.listModel
              , n = i && i.toJSON()
              , o = _.has(n, "membershipID") && i.isShared();
            t.$(".addTask-input").toggleClass("is-assignable", o),
            t.$(".addTask-meta-assign").toggleClass("hidden", !o),
            i && !o ? (t.assignableBind && t.unbindFrom(t.assignableBind),
            t.assignableBind = t.bindTo(i, "change:isShared", "updateIsAssignable")) : (t.bindTo(e, "assignPopover:cancel", t.debounce(t.closePopovers), 250, !0),
            t.assignableBind && t.unbindFrom(t.assignableBind));
        },
        setupFilters: function() {
            var t = this;
            t.filter && (t.dueDate = null),
            "starred" === t.filter && (t.$(".wundercon.star").addClass("starred").addClass("hidden"),
            t.$el.undelegate(".addTask-meta-star", "click"),
            t.attributeState.set("starred", !0)),
            "today" === t.filter ? (t.$(".addTask-meta-date").addClass("today hidden").html(c().format("D")),
            t.attributeState.set("due_date", c().format("YYYY-MM-DD")),
            t.dateBind = t.bindTo(e, "day:ended", function() {
                t.attributeState.set("due_date", c().format("YYYY-MM-DD"));
            })) : t.dateBind && t.unbindFrom(t.dateBind);
        },
        onChangeFocus: function() {
            var e = this
              , t = e.focusState.attributes
              , i = t.hasFocus
              , n = t.isSpeechEnabled
              , o = i && n;
            e.$(".speech-wrapper").toggleClass("hidden", !o),
            e.$(".plus-wrapper").toggleClass("hidden", o);
        },
        onMouseDownSpeechWrapper: function() {
            var e = this;
            e.blurState.save({
                shouldBlur: !1
            }),
            e.defer(function() {
                e.blurState.save({
                    shouldBlur: !0
                }),
                e.setFocus();
            });
        }
    });
}),
define("/templates/symbols/info.js", {
    name: "symbols/info",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="info" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="info"> <path d="M10,17.5 C5.86,17.5 2.5,14.14 2.5,10 C2.5,5.86 5.86,2.5 10,2.5 C14.14,2.5 17.5,5.86 17.5,10 C17.5,14.14 14.14,17.5 10,17.5 L10,17.5 Z M10,3.5 C6.42,3.5 3.5,6.42 3.5,10 C3.5,13.58 6.42,16.5 10,16.5 C13.58,16.5 16.5,13.58 16.5,10 C16.5,6.42 13.58,3.5 10,3.5 L10,3.5 Z M10,7.58 C9.84,7.58 9.7,7.52 9.6,7.42 C9.48,7.3 9.42,7.14 9.42,7 C9.42,6.84 9.48,6.7 9.6,6.58 C9.8,6.36 10.2,6.36 10.4,6.58 C10.52,6.7 10.58,6.84 10.58,7 C10.58,7.14 10.52,7.3 10.4,7.4 C10.3,7.52 10.16,7.58 10,7.58 L10,7.58 Z M10,13.5 C9.72,13.5 9.5,13.28 9.5,13 L9.5,9 C9.5,8.72 9.72,8.5 10,8.5 C10.28,8.5 10.5,8.72 10.5,9 L10.5,13 C10.5,13.28 10.28,13.5 10,13.5 L10,13.5 Z" id="u"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/TBV404.js", {
    name: "TBV404",
    data: {
        "1": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="tasks-404-label">' + r((o = t.label || e && e.label,
            typeof o === a ? o.call(e, {
                name: "label",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = "";
            return o = t["if"].call(e, e && e.label, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " " + s((a = t.symbol || e && e.symbol || r,
            a.call(e, e && e.icon, {
                name: "symbol",
                hash: {},
                data: n
            }))) + " <h2>",
            a = t.message || e && e.message,
            o = typeof a === l ? a.call(e, {
                name: "message",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (c += o),
            c + "</h2>";
        },
        useData: !0
    }
}),
define("/styles/fourohfour.js", {
    name: "fourohfour",
    data: ".tasks-404{padding:25px;position:absolute;left:0;right:0;text-align:center;top:50%;margin-top:-110px !important;}.tasks-404 .tasks-404-label{position:absolute;color:#fff;font-size:34px;text-align:center;width:100px;height:100px;top:64px;text-shadow:0 1px 0 rgba(0,0,0,0.2)}.tasks-404 svg{height:100px;width:100px;fill:#fff;-webkit-filter:drop-shadow(0 1px 0 rgba(0,0,0,0.2))}.tasks-404 h2{font-size:18px;color:rgba(255,255,255,0.85);text-shadow:0 1px 0 rgba(0,0,0,0.2)}.background-05 #tasks .tasks-404,.background-06 #tasks .tasks-404{-webkit-border-radius:10px;border-radius:10px;margin:0 25%;background:rgba(0,0,0,0.25)}"
}),
define("views/Tasks/404", ["application/runtime", "wunderbits/WBView", "partial!symbols/info", "template!TBV404", "style!fourohfour"], function(e, t, i, n, o) {
    var a = e._
      , r = t.prototype;
    return t.extend({
        template: n,
        className: "tasks-404",
        styles: [o],
        render: function(t) {
            var i = this
              , n = a.clone(e.smartLists);
            n.push("search");
            var o = {
                search: "coachmark_no_search_results",
                week: "coachmark_week_list_empty",
                today: "coachmark_today_list_empty",
                all: "coachmark_all_list_empty",
                starred: "coachmark_starred_list_empty",
                completed: "coachmark_completed_list_empty",
                assigned: "coachmark_assigned_to_me_list_empty"
            }
              , s = {};
            if (t = "done" === t ? "completed" : t,
            a.indexOf(n, t) >= 0)
                s.message = e.language.getLabel(o[t]).toString();
            else if ("list" === t || "task" === t) {
                var l = "error_" + t + "_not_found";
                s.message = e.language.getLabel(l).toString();
            } else
                s.message = e.language.getLabel("error_page_not_found").toString();
            if (-1 !== a.indexOf(n, t)) {
                if (s.icon = t,
                "today" === t) {
                    var c = new Date();
                    s.label = c.getDate();
                }
            } else
                s.icon = "info";
            return r.render.call(i, s),
            i;
        }
    });
}),
define("views/TaskDetail/Controllers/SectionViewController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            focused: "handleFocus",
            mousedown: "handleMouseDown"
        },
        handleFocus: function() {
            var t = this
              , i = t.view;
            if (this.lastMouseDown) {
                var n = new Date().valueOf()
                  , o = n - this.lastMouseDown;
                2 > o && t.defer(function() {
                    var t = i.editRoute();
                    e.trigger("route:" + t);
                });
            }
        },
        handleMouseDown: function() {
            this.lastMouseDown = new Date().valueOf();
        }
    });
}),
define("views/TaskDetail/SectionView", ["application/runtime", "wunderbits/WBViewPresenter", "./Controllers/SectionViewController"], function(e, t, i) {
    var n = e._;
    return t.extend({
        sectionName: null,
        attributes: {
            tabindex: 0
        },
        "implements": [i],
        emits: {
            focus: "focused",
            mousedown: "mousedown"
        },
        sectionRoute: function() {
            return this.model.route("/" + this.sectionName);
        },
        editRoute: function() {
            return this.sectionRoute() + "/edit";
        },
        focusRoute: function() {
            return this.sectionRoute() + "/focus";
        },
        trySetFocusRoute: function() {
            var t = this;
            n.delay(function() {
                e.currentRoute() === t.editRoute() && e.trigger("route:" + t.focusRoute());
            }, 250);
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailAssigningController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/helpers/date", "helpers/Animator", "wunderbits/WBViewController"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = e._
      , l = a.prototype;
    return a.extend({
        "implements": {
            "toggle:edit": "toggleEditMode",
            "delete:assignee": "deleteAssignee",
            "save:assignee": "saveAssignee",
            "input:autocomplete": "debouncedHandleAutocomplete",
            keydown: "handleKeys",
            focus: "focusSelf",
            "assignee:selected": "onAssigneeSelected"
        },
        initialize: function() {
            var e = this;
            e.debouncedHandleAutocomplete = e.debounce(e.handleAutocomplete, 100),
            e.taskAssignee = t.taskAssignee(),
            e.assignTask = t.assignTask(),
            l.initialize.apply(e, arguments);
        },
        handleKeys: function(t) {
            var n = this
              , o = n.view
              , a = t.target === o.el;
            t.which === i.enter && a ? (n.toggleEditMode(),
            n.stopEventFully(t)) : t.which !== i.esc || a ? t.which !== i.tab || a || (n.handleTab(t),
            n.stopEventFully(t)) : (n.onHideEditMode(),
            e.trigger("route:" + o.model.route("/assignee/focus")),
            n.stopEventFully(t));
        },
        handleTab: function(e) {
            this.stopEventFully(e);
        },
        focusSelf: function() {
            this.view.focusSelf();
        },
        toggleEditMode: function(t) {
            var i = this
              , n = i.view.model.attributes.list_id;
            return i.view.preventInputBlur || i.view.isEditing ? void 0 : i.assignTask.limit.isUserAllowedToAssign(n) ? void i.view.ready.done(function() {
                var n = i.view.$el.hasClass("editing");
                n || (i.view.showEditMode(),
                i.view.triggerFocusChange()),
                t && (t.stopPropagation(),
                e.trigger("analytics:Detail:clickAssign"),
                i.view.preventInputBlur = !0);
            }) : void i.assignTask.limit.reached();
        },
        deleteAssignee: function(e) {
            var t = this
              , i = t.view
              , n = i.model.id;
            t.taskAssignee.removeTaskAssignee(n),
            i.cancelChanges(),
            i.resetInput(),
            e && t.stopEventFully(e);
        },
        saveAssignee: function() {
            var e = this
              , t = e.view.assignPopover.getSelected();
            t ? e.view.assignToUser(t) : e.view.hideEditMode();
        },
        onHideEditMode: function() {
            this.view.hideEditMode();
        },
        handleAutocomplete: function(e) {
            var t, n, o = this, a = o.view, l = [i.shift, i.left, i.right, i.up, i.down, i.esc, i.enter];
            a.assignPopover && -1 === s.indexOf(l, e.which) && (n = r(e.target).val(),
            n = n.replace(/^\@/, ""),
            n ? (t = a.assignPopover.searchRecipients(n),
            a.assignPopover.renderSearchResults(t)) : o.selectNone());
        },
        onAssigneeSelected: function(e, t) {
            var i = this
              , n = i.view
              , o = n.model;
            o && o.id === t && n.updateInput(e);
        },
        selectNone: function() {
            var e = this.view;
            e.resetInput(),
            e.assignPopover.selectNone();
        }
    });
}),
define("/templates/detailview/detailAssign.js", {
    name: "detailview/detailAssign",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="section-icon"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "assigned", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="detail-assigned hidden"></span> </div> <div class="section-content"> <div class="section-title">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_assign_to", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="section-edit hidden"> <input type="text" class="assign chromeless" data-key-placeholder="label_assign_to"/> </div> </div> <a class="section-delete" data-key-aria-label="button_delete" data-key-title="button_delete" tabindex="0"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        useData: !0
    }
}),
