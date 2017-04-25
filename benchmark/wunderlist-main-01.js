define("wunderbits/helpers/console", ["wunderbits/global"], function(e) {
    for (var t, i = function() {}, n = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], o = n.length, a = e.console = e.console || {}; o--; )
        t = n[o],
        a[t] || (a[t] = i);
    return a;
}),
define("wunderbits/BaseSingleton", ["project!core"], function(e) {
    return e.WBSingleton.extend({
        mixins: [e.mixins.WBEventsMixin, e.mixins.WBBindableMixin, e.mixins.WBDestroyableMixin, e.mixins.WBUtilsMixin]
    });
}),
define("wunderbits/WBEnvironmentModel", ["./lib/dependencies", "./global", "vendor/ua-detector", "wunderbits/BaseSingleton"], function(e, t, i, n, o) {
    var a, r, s = e._, l = e.$, c = l(t), d = t.document, u = t.navigator, m = window.DocumentTouch, p = u.getUserMedia || u.webkitGetUserMedia || u.mozGetUserMedia || u.msGetUserMedia, g = {}, f = n.extend({
        init: function() {
            return f.on("destroy", f._onDestroy),
            f.setupResizeEvents(),
            f._bindConnectionEvents(),
            f._gatherEnvInfo(),
            f._isOnline = !0,
            l("body").addClass(g.browser).addClass("animate").addClass("platform-" + g.OS),
            l.fx.off = !1,
            f;
        },
        setupResizeEvents: function() {
            c.length && (f.bindTo(c, "resize", "_onWindowResize"),
            f.bindTo(c, "onorientationchange", "_onWindowResize")),
            f._onWindowResize();
        },
        _gatherEnvInfo: function() {
            var e = this
              , n = t.chrome;
            s.extend(g, {
                language: u.userLanguage || u.language || "en-US",
                UA: u.userAgent,
                platform: u.platform,
                referer: d.referer || "",
                OS: i.os.toLowerCase(),
                browser: i.browser.toLowerCase(),
                version: i.version,
                retina: window.devicePixelRatio >= 2,
                touch: e.isTouchDevice(),
                chromeApp: !!(n && n.app && n.app.runtime),
                isNodeWebkit: "object" == typeof process,
                firefoxApp: !1
            });
        },
        getOS: function() {
            return g.OS;
        },
        getBrowser: function() {
            return g.browser;
        },
        _onWindowResize: function() {
            var e = this;
            e._setupSwipeDistance(),
            e.isTouchDevice();
        },
        _onDestroy: function() {
            c.length && c.off("resize", f._onDocumentResize, f);
        },
        _setupSwipeDistance: function() {
            var e = this
              , t = {}
              , i = l.event.swipe
              , n = e.getCurrentWidth();
            t.min = 100,
            t.max = n,
            t.delay = 800,
            s.extend(i, t);
        },
        _onOnlineConnection: function() {
            f._isOnline || (f._isOnline = !0,
            f.trigger("online"));
        },
        _onOfflineConnection: function() {
            f._isOnline && (f._isOnline = !1,
            f.trigger("offline"));
        },
        _bindConnectionEvents: function() {
            var e = l(d);
            e.ajaxSuccess(f._onOnlineConnection),
            e.ajaxError(function(e, t) {
                0 === t.status && f._onOfflineConnection();
            }),
            c.length && (f.bindTo(c, "online", "_onOnlineConnection"),
            f.bindTo(c, "offline", "_onOfflineConnection"));
        },
        getCurrentWidth: function() {
            return c.length && c.width();
        },
        isOnline: function() {
            return !!f._isOnline;
        },
        isRetina: function() {
            return g.retina;
        },
        isMobile: function() {
            var e = t.navigator.userAgent
              , i = ["Android", "webOS", "iPhone", "iPad", "iPod", "Blackberry", "Windows Phone"]
              , n = new RegExp(i.join("|"),"i");
            return e.match(n);
        },
        isOpera: function() {
            return "opera" === g.browser;
        },
        isFirefox: function() {
            return "firefox" === g.browser;
        },
        isFirefoxApp: function() {
            return g.firefoxApp;
        },
        isSafari: function() {
            return "safari" === g.browser;
        },
        isChrome: function() {
            return "chrome" === g.browser;
        },
        isNodeWebkit: function() {
            return g.isNodeWebkit;
        },
        isChromeApp: function() {
            return g.chromeApp;
        },
        isPackagedApp: function() {
            return g.firefoxApp || g.chromeApp || g.isNodeWebkit;
        },
        isEdge: function() {
            return g.UA.indexOf("Edge") >= 0;
        },
        isIE: function() {
            return !!f.getIEVersion();
        },
        isIE9: function() {
            var e = f.isIE();
            return e && 9 === f.getIEVersion();
        },
        getIEVersion: function() {
            return r === o && (r = function() {
                for (var e = 3, t = d.createElement("div"), i = t.getElementsByTagName("i"); (t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && i[0]; )
                    ;
                return e > 4 ? e : !1;
            }()),
            r === !1 && (r = "explorer" === g.browser ? 10 : !1),
            r === !1 && "windows" === g.OS && /Trident/.test(g.UA) && (r = g.version),
            r;
        },
        isWindows: function() {
            return "windows" === g.OS;
        },
        isMac: function() {
            return "mac" === g.OS;
        },
        isChromeOS: function() {
            return /cros/i.test(u.userAgent);
        },
        isArmProcessor: function() {
            return /armv/i.test(u.userAgent);
        },
        hasTouchEvents: function() {
            return !!("ontouchstart"in window || m && d instanceof m || u.msMaxTouchPoints);
        },
        isTouchDevice: function() {
            var e = this;
            return a === o && (a = e.hasTouchEvents(),
            g.isTouchDevice = a),
            a;
        },
        getEnvIdentifier: function() {
            var e = this;
            return (e.isChromeOS() ? "chromeos" : g.OS) + "_" + g.browser + "_touch";
        },
        isSpeechEnabled: function() {
            var e = this;
            return e.speechRecognition = t.SpeechRecognition || t.webkitSpeechRecognition || null,
            !!e.speechRecognition;
        },
        isUserMediaSupported: function() {
            return !!p;
        },
        getUserMedia: function() {
            return p.apply(u, arguments);
        },
        isPointerEnabled: function() {
            return f.isPointerDevice = u.msPointerEnabled !== o && u.msMaxTouchPoints > 0 ? !0 : !1,
            f.isPointerDevice;
        },
        getEnvInfo: function() {
            return s.clone(g);
        },
        relevantExtensionLink: function() {
            var e = this;
            return e.isSafari() ? "http://wunderlist2-static.s3.amazonaws.com/extensions/add-to-wunderlist.safariextz" : e.isFirefox() ? "https://addons.mozilla.org/en-us/firefox/addon/add-to-wunderlist/" : e.isChrome() ? "https://chrome.google.com/webstore/detail/add-to-wunderlist/dmnddeddcgdllibmaodanoonljfdmooc?hl=en" : !1;
        }
    });
    return f;
}),
define("wunderbits/WBRuntime", ["./lib/dependencies", "./global", "./helpers/console", "./WBEnvironmentModel", "project!core"], function(e, t, i, n, o, a) {
    var r = o.mixins.WBEventsMixin
      , s = o.mixins.WBBindableMixin
      , l = o.WBSingleton.extend({
        mixins: [r, s],
        init: function() {
            var o = this;
            o.global = t,
            o.console = i,
            o._ = e._,
            o.$ = e.$,
            o.Backbone = e.Backbone,
            o.w_ = e.w_,
            o.env = n.init(),
            o.debouncedTriggerResize = o._.debounce(o.triggerResize, 250),
            o.throttledResize = o._.throttle(o.throttleResize, 250),
            o.bindTo(o.$(t), "resize", function() {
                o.debouncedTriggerResize(),
                o.throttledResize();
            });
        },
        debouncedTriggerResize: a,
        throttledResize: a,
        triggerResize: function() {
            this.trigger("window:resize");
        },
        throttleResize: function() {
            this.trigger("window:throttleResize");
        },
        currentRoute: function() {
            var e = this;
            return (e.global.location.hash || "").replace("#/", "").replace("#", "");
        },
        currentDomain: function() {
            var e = this;
            return e.global.location.hostname || "";
        }
    });
    return l.init(),
    l;
}),
define("wunderbits/mixins/WBTimelineMixin", ["../lib/dependencies", "project!core"], function(e, t) {
    var i = e.Backbone
      , n = e.w_
      , o = t.WBMixin
      , a = t.WBDeferred
      , r = t.lib.createUID;
    return o.extend({
        initialize: function() {
            var e = this;
            e.timelineEnabled = !1,
            e.timelineModelHasFetched = new a(),
            e.timelineModel = new i.Model({
                id: "timeline"
            }),
            e.timelineModel.storeName = "storage",
            e.bindTo(e, "timeline:start", e.logStart),
            e.bindTo(e, "timeline:end", e.logEnd),
            e.bindTo(e, "timeline:api", e.logAPI);
            var t = e.bindTo(e, "sync:started", function(i, n) {
                "login" === n && (e.logTimepoint("login_load_app", "end"),
                e.unbindFrom(t));
            });
            e.bindOnceTo(e, "lists:ready", function() {
                e.logTimepoint("lists_loaded", "end");
            }),
            e.bindOnceTo(e, "before:sync:ended", function() {
                e.logTimepoint("all_api_data_loaded", "start");
            });
            var n = e.bindTo(e, "sync:ended", function(t, i) {
                ("matryoshka" === i || "login" === i) && (e.logTimepoint("initial_sync_processed", "start"),
                e.unbindFrom(n));
            });
            e.bindOnceTo(e, "taskCounts:rendered", function() {
                e.logTimepoint("task_counts_rendered", "start");
            });
        },
        logStart: function(e) {
            var t = this;
            t.logTimepoint(e, "start");
        },
        logEnd: function(e) {
            var t = this;
            t.logTimepoint(e, "end");
        },
        logTimepoint: function(e, t) {
            var i = this;
            if (i.isTimelineEnabled()) {
                var o = i.now();
                i.fetchTimelineData().done(function() {
                    var a = i.timelineModel.get(e) || {}
                      , r = {};
                    if (r[t] = o,
                    "end" === t && a.start)
                        r.duration = o - a.start;
                    else if ("end" === t)
                        return;
                    var s = {};
                    s[e] = n.merge({}, a, r),
                    i.timelineModel.save(s);
                });
            }
        },
        duration: function(e, t) {
            var i = this;
            i.isTimelineEnabled() && i.fetchTimelineData().done(function() {
                var o = i.timelineModel.get(e) || {}
                  , a = {
                    duration: t
                }
                  , r = {};
                r[e] = n.merge({}, o, a),
                i.timelineModel.save(r);
            });
        },
        logAPI: function(e) {
            var t = this
              , i = {};
            t.isTimelineEnabled() && (i["apiBenchmark" + r()] = e,
            t.fetchTimelineData().done(function() {
                t.timelineModel.save(i);
            }));
        },
        now: function() {
            return Date.now();
        },
        fetchTimelineData: function() {
            var e = this;
            return "pending" !== e.timelineModelHasFetched.state() || e.timelineFetchedOnce || (e.timelineFetchedOnce = !0,
            e.timelineModel.fetch({
                success: function() {
                    e.timelineModelHasFetched.resolve();
                },
                error: function() {
                    e.timelineModelHasFetched.resolve();
                }
            })),
            e.timelineModelHasFetched.promise();
        },
        resetTimeline: function() {
            this.timelineModel.clear().save({
                id: "timeline"
            });
        },
        isTimelineEnabled: function() {
            return !!this.timelineEnabled;
        },
        enableTimeline: function() {
            this.timelineEnabled = !0;
        },
        disableTimeline: function() {
            this.timelineEnabled = !1;
        }
    });
}),
define("application/runtime", ["config", "wunderbits/WBRuntime", "vendor/visibly", "wunderbits/mixins/WBTimelineMixin", "project!core"], function(e, t, i, n, o, a) {
    var r, s, l, c, d = t, u = o.WBDeferred, m = o.WBStateModel, p = o.lib.when, g = t.extend({
        mixins: [n],
        init: function() {
            var t = this;
            if (r = t.$,
            s = t._,
            l = t.Backbone,
            t.started = c = Date.now(),
            t.bindTo(t, "db:allDataLoaded", function() {
                var e = Date.now() - t.started;
                g.trigger("analytics:Database:allDataLoaded", "done", e);
            }),
            t.state = new m({
                online: !1,
                syncSuccessful: !0,
                beforeDone: !1,
                syncCount: 0,
                lastAuthRoute: "",
                lastSearchTerm: "",
                textDirection: "ltr"
            }),
            s.each(["on", "off", "trigger", "once", "publish", "unpublish", "unpublishAll"], function(e) {
                t[e] = d[e];
            }),
            t.config = e,
            e.benchmarks && (t.enableTimeline(),
            "benchmarking" === e.name)) {
                var n = t.global;
                n.runtime = t,
                n.console.log("exposing runtime");
            }
            if (e.features) {
                var o;
                for (var a in e.features)
                    e.features.hasOwnProperty(a) && (o = e.features[a] === !1 ? "disabled" : "enabled",
                    g["feature_" + a + "_" + o] = !0);
            }
            t.setupStorageEvents(),
            t.smartLists = ["assigned", "starred", "today", "week", "all", "completed"],
            t.hasSynced = new u(),
            t.hasRouted = new u(),
            t.bindOnceTo(t, "routed", t.hasRouted.resolve, t.hasRouted);
            var p = new u();
            t.ready = p.promise();
            var f = new u();
            t.interfaceReady = f.promise(),
            t._createDataPromises(p),
            t.bindTo(t, "browser:render", function(e) {
                t.listId = e;
            }),
            t.bindTo(t, "sync:ended", function(e, i, n) {
                if ("matryoshka" === i || "login" === i) {
                    var o = Date.now();
                    t.state.set("syncCount", t.state.attributes.syncCount + 1),
                    t.state.set("syncSuccessful", n),
                    t.state.set("lastSync", o),
                    t.user.save({
                        lastSync: o
                    }, {
                        fromSync: !0
                    });
                }
            }),
            t.bindOnceTo(t, "sync:ended", function() {
                t.hasSynced.resolve();
            }),
            t.bindTo(t, "browser:selectionChanged", function(e) {
                t.selectedTaskCount = e;
            }),
            t.bindTo(t, "focus:changed", function(e) {
                t.focus = e;
            }),
            t.bindTo(t, "set:loadContext", function(e) {
                t.loadContext = e;
            }),
            t.bindTo(t, "update:lastAuthRoute", function(e) {
                t.state.set("lastAuthRoute", e);
            }),
            t.bindTo(t, "before:sync:ended", function() {
                t.state.set("beforeDone", !0);
            }),
            t.bindTo(t, "set:printType", function(e) {
                t.printType = e;
            }),
            t.bindTo(t, "interface:ready", function() {
                f.resolve();
            }),
            t.bindTo(t, "search:start", function(e) {
                t.currentSearchTerm = e,
                t.state.set("inSearchState", !!e);
            }),
            t.bindTo(t, "search:end search:cancel", function() {
                t.currentSearchTerm = "",
                t.state.set("lastSearchTerm", ""),
                t.state.set("inSearchState", !1);
            }),
            t._isVisible = !i.hidden(),
            i.onVisible(function() {
                t._isVisible = !0,
                t.trigger("page:visible");
            }),
            i.onHidden(function() {
                t._isVisible = !1,
                t.trigger("page:hidden");
            }),
            t.bindTo(t, "time:nextHour", t.reportHeapSize),
            t.bindOnceTo(t, "sync:ended", t.reportHeapSize);
            var b = r("body")
              , h = b.hasClass("wlapp-parent");
            h ? t.isFrame() && b.removeClass("wlapp-parent").addClass("wlapp-frame") : b.addClass("wlapp-embedded");
            var v = s.bind(t.handleWindowMessage, t);
            window.addEventListener && window.addEventListener("message", v, !1);
        },
        setupStorageEvents: function() {
            var e = this
              , t = e.global;
            if (!e.env.isChromeApp()) {
                var i = t.localStorage;
                i && t.addEventListener && t.addEventListener("storage", function(t) {
                    var i = "storage:" + t.key
                      , n = t.newValue;
                    e.trigger(i, n);
                }, !1);
            }
        },
        handleWindowMessage: function(e) {
            var t = this;
            if ("string" == typeof e.data) {
                var i = e.data.split(":")
                  , n = i.shift();
                "WLApp" === n && i.length && t.trigger(i.join(":"));
            }
        },
        _createDataPromises: function(e) {
            var t = this
              , i = new u()
              , n = new u()
              , o = new u()
              , a = new u();
            t.bindOnceTo(t, "set:root", function(e) {
                t.root = e,
                e.hasFetched.done(i.resolve, i);
            }),
            t.bindOnceTo(t, "set:user", function(e) {
                t.user = e,
                e.hasFetched.done(n.resolve, n),
                t.trigger("user:set");
            }),
            t.bindOnceTo(t, "set:settings", function(e) {
                t.settings = e,
                t.bindOnceTo(t, "settings:ready", o.resolve, o);
            }),
            t.bindOnceTo(t, "set:language", function(e) {
                t.language = e,
                e.ready.done(a.resolve, a);
            }),
            p(n, o, a).done(e.resolve, e);
        },
        supressSidebarClose: function(e) {
            var t = this;
            return e === a ? t._supressSidebarClose : (t._supressSidebarClose = e,
            void t.global.setTimeout(function() {
                t._supressSidebarClose = !1;
            }, 100));
        },
        enableAnimations: function() {
            var e = this;
            e.env._enableAnimations();
        },
        isVisible: function() {
            var e = this;
            return e._isVisible;
        },
        isInstalledOnChrome: function() {
            var e = this
              , t = e.global.chrome;
            return t && t.app && t.app.isInstalled;
        },
        isOnListRoute: function() {
            return /^lists\//.test(this.currentRoute());
        },
        isOnTaskRoute: function() {
            return /^tasks\//.test(this.currentRoute());
        },
        isOnSearchRoute: function() {
            return /^search/.test(this.currentRoute());
        },
        getIdFromRoute: function() {
            return this.currentRoute().split("/")[1];
        },
        getHeapSizeMB: function() {
            var e = this
              , t = e.global
              , i = t.performance
              , n = i && i.memory
              , o = n && n.usedJSHeapSize;
            return o && Math.round(o / 1024 / 1024);
        },
        reportHeapSize: function() {
            var e = this
              , t = e.getHeapSizeMB();
            if (t > 0 && s.isFunction(Date.now)) {
                e.trigger("analytics:Performance:UsedHeapSize", t);
                var i = Math.round((Date.now() - c) / 1e3 / 60);
                e.trigger("analytics:Performance:MinutesRunning", i);
            }
        },
        reload: function(e, t) {
            var i = this;
            if (e = e || "",
            !i.reloading) {
                t === a && (t = !0),
                i.reloading = !0;
                var n = i.global;
                if (i.env.isChromeApp() || i.env.isNodeWebkit())
                    i.trigger("reload", e);
                else {
                    var o = n.location
                      , r = n.history;
                    if (t || "/" === o.pathname) {
                        l.history.stop(),
                        e && "/" !== e[0] && (e = "/" + e);
                        try {
                            r.replaceState && r.replaceState(null, "noParams", o.pathname + o.hash);
                        } catch (s) {
                            console.error("unable to replaceState", s);
                        }
                        o.hash = e,
                        o.reload();
                    } else
                        o.href = "/#" + e;
                }
            }
        },
        isNightly: function() {
            var e = this.config.name;
            return !!(e && e.indexOf("nightly") >= 0);
        },
        isBeta: function() {
            var e = this.config.name;
            return !!(e && e.indexOf("beta") >= 0);
        },
        isDev: function() {
            var e = this.config.name;
            return "dev" === e || !e;
        },
        areProLimitsEnabled: function() {
            var e = this;
            return e.isNightly() || e.isDev();
        },
        isLabsEnabled: function(e) {
            var t = this
              , i = t.user
              , n = t.config.name
              , o = "nightly" === n && i.isPro()
              , a = "production" !== n && /@6wunderkinder.com$/.test(i.attributes.email);
            return o || a ? e ? "true" === t.settings.attributes["labs_" + e + "_enabled"] : !0 : !1;
        },
        isFrame: function() {
            return g.global !== g.global.top;
        },
        isEmbedded: function() {
            return r("body").hasClass("wlapp-embedded");
        },
        isLocalDev: function() {
            return !!g.global.wlLocalDev;
        },
        post: function(e, t) {
            if (e) {
                var i = "wunderlist:";
                0 !== e.indexOf(i) && (e = i + e),
                g.global.top.postMessage(e, t || "*");
            }
        },
        isOnline: function() {
            return this.state.attributes.online;
        }
    });
    return g.init(),
    g;
}),
define("backend/database/Schemas/contacts", {}),
define("backend/database/Schemas/googleContacts", {}),
define("backend/database/Schemas/quotas", {}),
define("backend/database/Schemas/BaseEntity", ["project!database"], function(e) {
    var t = e.WBSchema
      , i = t.FieldTypes;
    return t.extend({
        fields: {
            type: i.Text,
            id: i.Text,
            online_id: i.Text,
            requestID: i.Text,
            revision: i.Integer,
            matryoshkaRevision: i.Integer,
            lastUpdateData: i.Object,
            created_at: i.DateTime
        }
    });
}),
define("backend/database/Schemas/lists", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            owner_id: t.Text,
            online_owner_id: t.Text,
            position: t.Float,
            title: t.Text,
            list_type: t.Text,
            hasUnreadComments: t.Boolean,
            isShared: t.Boolean,
            muted: t.Boolean,
            role: t.Text,
            membershipID: t.Text
        }
    });
}),
define("backend/database/Schemas/folders", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            user_id: t.Text,
            title: t.Text,
            list_ids: t.Array
        }
    });
}),
define("backend/database/Schemas/shares", {}),
define("backend/database/Schemas/tasks", ["./BaseEntity"], function(e) {
    return e.extend({
        fields: {
            booleans: ["starred", "hasFiles", "hasNote", "hasSubtasks", "hasUnreadComments", "hasComments", "allCommentsLoaded"],
            datetimes: ["completed_at", "due_date"],
            floats: ["position"],
            integers: ["unreadCount", "recurrence_count", "subtaskCompletion"],
            texts: ["recurrence_type", "title", "assignee_id", "completed_by_id", "created_by_id", "list_id", "online_assignee_id", "online_completed_by_id", "online_created_by_id", "online_list_id"]
        },
        fullTextIndexFields: ["title", "assignee_id"]
    });
}),
define("backend/database/Schemas/subtasks", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            completed_at: t.DateTime,
            created_by_id: t.Text,
            online_created_by_id: t.Text,
            title: t.Text,
            position: t.Float,
            list_id: t.Text,
            online_list_id: t.Text,
            task_id: t.Text,
            online_task_id: t.Text
        }
    });
}),
define("backend/database/Schemas/notes", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            task_id: t.Text,
            online_task_id: t.Text,
            content: t.Text
        },
        fullTextIndexFields: ["content"]
    });
}),
define("backend/database/Schemas/reminders", {}),
define("backend/database/Schemas/files", {
    fullTextIndexFields: ["file_name"]
}),
define("backend/database/Schemas/taskComments", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            text: t.Text,
            author: t.Object,
            local_created_at: t.DateTime,
            read: t.Boolean,
            task_id: t.Text,
            online_task_id: t.Integer
        }
    });
}),
define("backend/database/Schemas/taskCommentsStates", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            unread_count: t.Integer,
            read_count: t.Integer,
            task_id: t.Text,
            online_list_id: t.Integer,
            last_read_id: t.Text,
            online_last_read_id: t.Integer
        }
    });
}),
define("backend/database/Schemas/tasksCounts", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            completed_count: t.Integer,
            uncompleted_count: t.Integer
        }
    });
}),
define("backend/database/Schemas/BasePositions", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            values: t.Array,
            localValues: t.Array,
            remoteValues: t.Array,
            syncedIDs: t.Array
        }
    });
}),
define("backend/database/Schemas/listPositions", ["./BasePositions"], function(e) {
    return e.extend({
        fields: {}
    });
}),
define("backend/database/Schemas/taskPositions", ["./BasePositions"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            list_id: t.Text,
            online_list_id: t.Text
        }
    });
}),
define("backend/database/Schemas/subtaskPositions", ["./BasePositions"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            task_id: t.Text,
            online_task_id: t.Text
        }
    });
}),
define("backend/database/Schemas/root", {
    keyPath: "_key"
}),
define("backend/database/Schemas/user", {
    critical: !0,
    keyPath: "_key"
}),
define("backend/database/Schemas/settings", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            key: t.Text,
            value: t.Text,
            web: t.Boolean
        }
    });
}),
define("backend/database/Schemas/services", {}),
define("backend/database/Schemas/subscriptions", {}),
define("backend/database/Schemas/features", {}),
define("backend/database/Schemas/users", {}),
define("backend/database/Schemas/assignables", {}),
define("backend/database/Schemas/memberships", {}),
define("backend/database/Schemas/desktopNotifications", {}),
define("backend/database/Schemas/storage", {}),
define("backend/database/Schemas/invoices", {}),
define("backend/database/Schemas/unreadActivitiesCounts", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            conversations: t.Integer,
            activities: t.Integer
        }
    });
}),
define("backend/database/Schemas/activities", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            html: t.String
        }
    });
}),
define("backend/database/Schemas/conversations", ["./BaseEntity"], function(e) {
    var t = e.FieldTypes;
    return e.extend({
        fields: {
            html: t.String
        }
    });
}),
define("backend/database/Schema", ["./Schemas/contacts", "./Schemas/googleContacts", "./Schemas/quotas", "./Schemas/lists", "./Schemas/folders", "./Schemas/shares", "./Schemas/tasks", "./Schemas/subtasks", "./Schemas/notes", "./Schemas/reminders", "./Schemas/files", "./Schemas/taskComments", "./Schemas/taskCommentsStates", "./Schemas/tasksCounts", "./Schemas/listPositions", "./Schemas/taskPositions", "./Schemas/subtaskPositions", "./Schemas/root", "./Schemas/user", "./Schemas/settings", "./Schemas/services", "./Schemas/subscriptions", "./Schemas/features", "./Schemas/users", "./Schemas/assignables", "./Schemas/memberships", "./Schemas/desktopNotifications", "./Schemas/storage", "./Schemas/invoices", "./Schemas/unreadActivitiesCounts", "./Schemas/activities", "./Schemas/conversations"], function() {
    var e = ["contacts", "googleContacts", "quotas", "lists", "folders", "shares", "tasks", "subtasks", "notes", "reminders", "files", "taskComments", "taskCommentsStates", "tasksCounts", "listPositions", "taskPositions", "subtaskPositions", "root", "user", "settings", "services", "subscriptions", "features", "users", "assignables", "memberships", "desktopNotifications", "storage", "invoices", "unreadActivitiesCounts", "activities", "conversations"]
      , t = arguments
      , i = {};
    return e.forEach(function(e, n) {
        i[e] = t[n];
    }),
    {
        database: {
            name: "wunderlist-3",
            version: 24
        },
        stores: i
    };
}),
define("backend/database", ["project!database", "./database/Schema", "wunderbits/global"], function(e, t) {
    var i = e.WBDatabase
      , n = i.prototype
      , o = i.extend({
        initSuccess: function() {
            var e = this
              , t = e.backend;
            e.on("truncate", e.truncate, e),
            e.bindTo(t, "truncated", function() {
                e.trigger("truncated");
            }),
            e.bindTo(t, "upgraded", function() {
                e.publish("upgraded");
            }),
            e.bindTo(t, "analytics", function(t, i) {
                e.trigger("analytics", t, i);
            }),
            n.initSuccess.call(e);
        },
        initFailure: function(e, t) {
            var i = this;
            n.initFailure.call(i),
            setTimeout(function() {
                i.trigger("analytics:db:error", e, t),
                i.backend.nuke().then(function() {
                    location.hash = "#",
                    location.reload();
                });
            }, 50);
        }
    });
    return new o({
        schema: t
    });
}),
define("backend/DatabaseManager", ["wunderbits/global", "project!database", "backend/database", "wunderbits/WBRuntime", "project!core"], function(e, t, i, n, o) {
    function a() {
        return i.init();
    }
    var r = o.lib.createUID
      , s = new t.BackboneDBSync({
        database: i
    })
      , l = r();
    n.sessionID = l,
    s.on("index", function(e, t, n) {
        i.trigger("index", e, t, n);
    }),
    n.env.isChromeApp() || n.once("hasSyncedOnce", function() {
        var e = new t.WBLocalStorage();
        s.on("write", function(t, i) {
            e.setItem("updated:" + t, n.sessionID + ":" + r() + ":" + i);
        }),
        s.on("destroy", function(t, i) {
            e.setItem("destroyed:" + t, n.sessionID + ":" + r() + ":" + i);
        });
    });
    var c = n.Backbone;
    return c.oldSync = c.sync,
    c.sync = i.sync = function(e, t, n) {
        n = n || {};
        var o = arguments;
        i.ready.done(function() {
            !n.fromStorage && s.sync.apply(s, o);
        });
    }
    ,
    n.on("db:truncate", function(e) {
        i.trigger("truncate", e);
    }).on("db:nuke", function() {
        i.backend.nuke();
    }),
    i.on("truncated", function() {
        n.trigger("db:truncated");
    }).on("upgraded", function() {
        n.publish("database:upgraded");
    }).on("analytics", function(e, t) {
        e.unshift("analytics"),
        n.trigger(e.join(":"), t);
    }).on("ready", function() {
        n.trigger("db:ready");
    }).on("error", function(e, t) {
        console.log(e, t);
    }),
    {
        init: a,
        database: i
    };
}),
define("backend/io/lib/FakeXHR", ["project!core"], function(e) {
    var t = function() {};
    return e.WBClass.extend({
        properties: {
            request: null,
            response: null,
            status: null,
            responseText: null
        },
        open: t,
        send: t,
        addEventListener: t,
        setRequestHeader: function(e, t) {
            var i = this
              , n = i.request.headers;
            n[e.toLowerCase()] = t;
        },
        getResponseHeader: function(e) {
            var t = this
              , i = t.response;
            return e && i && i.headers ? i.headers[e.toLowerCase()] : void 0;
        },
        spoof: function(e) {
            var t = this;
            t.request = e.request;
            var i = t.response = e.response || {};
            t.status = i.status;
        }
    });
}),
define("backend/io/lib/XHR", ["./FakeXHR", "require", "wunderbits/global"], function(e, t, i) {
    return i.XMLHttpRequest || t("XMLHttpRequest") || e;
}),
define("backend/io/BaseBackend", ["project!core"], function(e) {
    return e.WBEventEmitter.extend({});
}),
define("backend/io/XHRBackend", ["./lib/XHR", "./BaseBackend"], function(e, t) {
    var i = "application/json; charset=utf-8";
    return t.extend({
        setHeaders: function(e, t, n) {
            function o(t, i) {
                e.setRequestHeader(t, i);
            }
            if (o("Accept", i),
            n && o("Content-Type", i),
            t)
                for (var a in t)
                    o(a, t[a]);
        },
        ajax: function(t, i) {
            var n = this
              , o = new e()
              , a = i.timeout;
            a && (o.timeout = a),
            o.url = t,
            o.context = i.context || "",
            o.open(i.type, t, !0),
            o.addEventListener("error", i.callback, !1),
            n.trackEvents(o),
            o.onreadystatechange = function() {
                4 === o.readyState && (o.removeEventListener("error", i.callback),
                i.callback(o));
            }
            ;
            var r = i.data;
            n.setHeaders(o, i.headers, !!r),
            r ? o.send(r) : o.send();
        },
        trackEvents: function(e) {
            var t, i, n, o = this;
            e.onloadstart = function() {
                t = Date.now();
            }
            ,
            e.onprogress = function() {
                n || (i = Date.now(),
                n = !0);
            }
            ,
            e.onload = function() {
                var n = Date.now()
                  , a = {
                    status: e.status,
                    url: e.url,
                    context: e.context,
                    start: t,
                    end: n,
                    duration: n - t,
                    latency: i - t,
                    download: n - i
                };
                o.trigger("timing", a);
            }
            ;
        }
    });
}),
define("wunderbits/helpers/SafeParse", ["application/runtime", "../lib/dependencies", "../global", "./console", "project!core"], function(e, t, i, n, o) {
    function a(e) {
        var t = e.querySelectorAll("script,object");
        c.call(t, function(e) {
            e.parentNode && e.parentNode.removeChild(e);
        });
        var i = e.querySelectorAll("img");
        c.call(i, function(e) {
            c.call(e.attributes, function(t) {
                var i = t.name;
                0 === i.indexOf("on") && e.removeAttribute(i);
            });
        });
    }
    var r = !0;
    try {
        var s = new i.DOMParser();
        s.parseFromString("", "text/html") && (r = !1);
    } catch (l) {}
    var c = Array.prototype.forEach;
    return o.WBSingleton.extend({
        json: function(t) {
            var i;
            try {
                i = JSON.parse(t);
            } catch (o) {
                e.error.exception(o, "SafeParserJSONError", {
                    original: t
                }),
                n.warn('Unable to parse "' + t + '"');
            }
            return i;
        },
        html: function(t) {
            var o;
            try {
                var s = i.document.implementation || {};
                if (r && s)
                    o = s.createHTMLDocument(""),
                    t.toLowerCase().indexOf("<!doctype") > -1 ? o.documentElement.innerHTML = t : o.body.innerHTML = t;
                else {
                    var l = new i.DOMParser();
                    o = l.parseFromString(t, "text/html");
                }
                var c = o && o.querySelector("parsererror");
                c && (e.error.notify("SafeParserHTMLError", c.toString()),
                n.warn("Failed to parse HTML", c),
                o = !1);
            } catch (d) {
                e.error.exception(d, "SafeParserHTMLError"),
                n.warn("Failed to parse HTML", d),
                o = !1;
            }
            return o && a(o),
            o;
        }
    });
}),
define("backend/io/PostMessageBackend", ["./lib/FakeXHR", "./BaseBackend", "wunderbits/global", "wunderbits/helpers/SafeParse", "project!core"], function(e, t, i, n, o) {
    var a = o.lib.createUID
      , r = document.getElementsByTagName("head")[0]
      , s = ["width: 1px", "height: 1px", "position: absolute", "top: -10px", "left: -10px;"].join(";");
    return t.extend({
        initialize: function(e) {
            var t = this;
            t.host = e.proxyHost,
            t.requests = {};
        },
        ajax: function(e, t) {
            var i = this
              , n = i.frame
              , o = i.requests;
            n || i.injectFrame();
            var r = t.id = a();
            o[r] = t,
            t.url = e;
            var s = JSON.stringify(t)
              , l = n.contentWindow;
            l.postMessage(s, n.origin);
        },
        injectFrame: function() {
            var e = this
              , t = e.host
              , n = e.frame = document.createElement("iframe");
            n.setAttribute("frameborder", "0"),
            n.setAttribute("style", s),
            n.origin = t,
            n.src = t + "/cors.html",
            r.appendChild(n),
            i.attachEvent("onmessage", function() {
                return e.onMessage.apply(e, arguments);
            });
        },
        onMessage: function(t) {
            var i = this
              , o = n.json(t.data)
              , a = o.id
              , r = i.requests[a];
            if (r) {
                delete i.requests[a];
                var s = new e();
                s.spoof({
                    request: r,
                    response: o
                });
                var l = r.callback;
                delete r.callback,
                l(r);
            }
        }
    });
}),
define("backend/io/XHRUploader", ["./lib/XHR", "project!core"], function(e, t) {
    var i = t.WBDeferred
      , n = t.mixins.WBEventsMixin;
    return t.WBSingleton.extend({
        upload: function(t, o, a) {
            var r = new i()
              , s = r.promise();
            n.applyTo(s);
            var l = new e();
            l.open("PUT", t, !0),
            l.onreadystatechange = function() {
                var e = l.readyState;
                4 === e && (l.file = null,
                200 === l.status && s.trigger("change:state", 2),
                r[200 !== l.status ? "reject" : "resolve"](l));
            }
            ,
            l.upload.addEventListener("progress", function(e) {
                !l.file || 0 === l.file.size && 0 !== e.total ? r.reject(l, "error:fileDeleted") : e.lengthComputable && s.trigger("change:progress", e.loaded, e.total);
            }),
            l.addEventListener("error", function() {
                r.reject(l);
            }, !1),
            a = a || {};
            for (var c in a)
                l.setRequestHeader(c, a[c]);
            return s.send = function() {
                s.trigger("change:state", 1);
                try {
                    l.send(o),
                    l.file = o;
                } catch (e) {
                    r.reject(l, "error:fileDeleted");
                }
                return s;
            }
            ,
            s.abort = function() {
                return s.trigger("upload:abort"),
                l.abort(),
                s;
            }
            ,
            s.on("error", function() {
                l.file = null;
            }),
            s.success = s.done,
            s.error = s.fail,
            s;
        }
    });
}),
define("backend/IOBase", ["config", "urls", "wunderbits/global", "./io/XHRBackend", "./io/PostMessageBackend", "./io/XHRUploader", "wunderbits/helpers/SafeParse", "project!core"], function(e, t, i, n, o, a, r, s, l) {
    var c = s.WBDeferred
      , d = s.lib.extend
      , u = s.WBClass.prototype
      , m = i.location
      , p = t.urlMap || {}
      , g = t.baseUrl || ""
      , f = /^(https?:)?\/\//
      , b = /^(https?:)?\/\/\w+\.wunderlist.com\//;
    return s.WBClass.extend({
        initialize: function(e) {
            e = e || {};
            var t = this;
            u.initialize.apply(t, arguments),
            t.transport = e.jsonp || !("XDomainRequest"in i) || "msIndexedDB"in i ? new n() : new o({
                proxyHost: e.proxyHost
            }),
            ["get", "post", "put", "delete"].forEach(function(e) {
                t.defineVerb(e);
            }),
            t.routes = t.compileRoutes(t.routes, t.tokens),
            t.authFreeRoutes = t.compileRoutes(t.authFreeRoutes, t.tokens);
        },
        compileRoutes: function(t, i) {
            function n(e) {
                return e.replace(/\{\{(\w+)\}\}/g, function(e, t) {
                    return i[t];
                });
            }
            if (!t)
                return l;
            var o = {};
            for (var a in t) {
                var r = t[a];
                r = r.map(n);
                var s = new RegExp("^/(" + r.join("|") + ")(\\?|$)")
                  , c = e[a].host;
                o[c] = s;
            }
            return o;
        },
        resolveUrl: function(e) {
            var t, i = this;
            return f.test(e) ? e : (i.routes && (t = i.resolveRoute(e)),
            !t && p[e] && (t = g + p[e]),
            t || (t = i.normalizeUrl(e)),
            t);
        },
        resolveRoute: function(e) {
            var t = this;
            for (var i in t.routes) {
                var n = t.routes[i];
                if (n.test(e))
                    return i + e;
            }
        },
        normalizeUrl: function(e) {
            return m.protocol + "//" + m.host + e;
        },
        extendHeaders: function(e, t) {
            var i = this;
            e = e || {};
            var n = f.test(t)
              , o = !n || b.test(t);
            if (o && i.setPlatformHeaders(e),
            d(e, {
                "Content-Type": "application/json",
                Accept: "application/json"
            }),
            i.authFreeRoutes)
                for (var a in i.authFreeRoutes) {
                    var r = i.authFreeRoutes[a];
                    if (r.test(t))
                        return e;
                }
            return o && !e.Authorization && i.setAuthorization(e),
            e;
        },
        setPlatformHeaders: function() {},
        setAuthorization: function() {},
        defineVerb: function(e) {
            var t = this;
            t[e] = function(i, n, o, a, s) {
                function d(e) {
                    var t = e.status
                      , i = e.statusText
                      , n = e.responseText
                      , o = e.getResponseHeader("content-type")
                      , a = (o || "").split(";")[0];
                    if ("string" == typeof n && "application/json" === a && (n = r.json(n)),
                    t >= 200 && 300 > t || 304 === t)
                        u.resolve(n, i, e);
                    else {
                        var s = {
                            status: t,
                            statusText: i,
                            response: {
                                data: n
                            }
                        };
                        u.reject(s, i, t);
                    }
                }
                if (!i)
                    throw new Error("need a url for ajax calls");
                o = o || {},
                o = t.extendHeaders(o, i);
                var u = new c()
                  , m = u.promise();
                if (i = t.resolveUrl(i),
                "object" == typeof n)
                    if ("get" === e) {
                        var p, g = [];
                        for (p in n)
                            g.push(p + "=" + encodeURIComponent(n[p]));
                        g.length && (i = i + "?" + g.join("&")),
                        n = l;
                    } else
                        n = JSON.stringify(n);
                return t.transport.ajax(i, {
                    type: e.toUpperCase(),
                    data: n,
                    headers: o,
                    timeout: a,
                    context: s,
                    callback: d
                }),
                m.success = m.done,
                m.error = m.fail,
                m;
            }
            ;
        },
        upload: function(e, t, i) {
            var n = this;
            return e = n.resolveUrl(e),
            a.upload(e, t, i);
        }
    });
}),
define("backend/io/data/Wunderapi", {
    tokens: {
        RemoteId: "([a-zA-Z0-9-_]{11}|localId(:[\\w-]+){4})",
        NumericId: "[0-9]+"
    },
    routes: {
        invitations: ["invites"],
        payment: ["adyen/cancel", "adyen/generate_url", "products/adyen", "products/6wunderkinder", "subscriptions/group", "subscription/memberships", "invoices"],
        tracking: ["track"]
    },
    authFreeRoutes: {
        api: ["signup", "login", "forgotpassword", "blacklist", "AH[a-zA-Z0-9-_]{9}"],
        payment: ["products/adyen", "products/6wunderkinder"]
    }
}),
define("helpers/PlatformHeaders", ["application/runtime", "wunderbits/global", "project!core"], function(e, t, i) {
    var n = e.config
      , o = t.navigator
      , a = "Standard"
      , r = "web";
    e.env.isChromeApp() ? r = "chrome" : e.env.isNodeWebkit() && (r = "nodewebkit");
    var s = {
        "X-Client-Platform": r,
        "X-Client-Product": "wunderlist",
        "X-Client-Product-Version": n.release || "dev",
        "X-Client-System": o.userAgent,
        "X-Client-System-Version": a
    };
    if (t.gitHash) {
        var l = /\[(.*)\]/.exec(t.gitHash);
        l = null !== l ? l[1] : !1,
        l && (s["X-Client-Product-Git-Hash"] = l);
    }
    var c = {
        headers: s
    };
    return i.WBSingleton.extend(c);
}),
define("backend/IOWunderapi", ["application/runtime", "backend/IOBase", "backend/io/data/Wunderapi", "helpers/PlatformHeaders", "project!core"], function(e, t, i, n, o) {
    var a = o.lib.extend
      , r = t.prototype
      , s = e.config
      , l = "web";
    return t.extend({
        tokens: i.tokens,
        routes: i.routes,
        authFreeRoutes: i.authFreeRoutes,
        initialize: function() {
            var t = this;
            r.initialize.call(t, {
                proxyHost: s.api.host
            }),
            t.trackXHRTiming();
            var i = e.env;
            i.isChromeApp() ? l = "chrome" : i.isFirefoxApp() && (l = "firefox");
        },
        trackXHRTiming: function() {
            var t = this;
            t.transport.on("timing", function(t) {
                var i = t.url;
                200 === t.status && /api\.wunderlist\./.test(i) && (e.trigger("timeline:api", t),
                i = encodeURIComponent(i),
                e.trigger("analytics:APIBenchmark-Latency:" + i, t.context, t.latency),
                e.trigger("analytics:APIBenchmark-DownloadTime:" + i, t.context, t.loadDuration));
            });
        },
        setAuthorization: function(t) {
            var i = e.user.get("token");
            t.Authorization = "Bearer " + i;
        },
        setPlatformHeaders: function(e) {
            a(e, n.headers);
        }
    });
}),
define("helpers/Cookie", ["wunderbits/global", "project!core"], function(e, t) {
    var i = e.document
      , n = e.location.hostname
      , o = e.chrome
      , a = !!(o && o.app && o.app.runtime);
    return t.WBSingleton.extend({
        _setCookie: function(e) {
            if (!a) {
                var t = e ? "false" : "true"
                  , o = ["LOGGEDIN=" + t];
                if (o.push("path=/"),
                o.push("domain=" + n),
                e)
                    o.push("expires=" + new Date(0).toUTCString());
                else {
                    var r = new Date();
                    r.setFullYear(r.getFullYear() + 1),
                    o.push("expires=" + r.toUTCString());
                }
                i.cookie = o.join(";");
            }
        },
        killCookie: function() {
            this._setCookie(!0);
        },
        createCookie: function(e, t, n) {
            var o;
            if (n) {
                var a = new Date();
                a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3),
                o = "; expires=" + a.toUTCString();
            } else
                o = "";
            i.cookie = e + "=" + t + o + "; path=/";
        },
        readCookie: function(e) {
            for (var t = e + "=", n = i.cookie.split(";"), o = 0; o < n.length; o++) {
                for (var a = n[o]; " " == a.charAt(0); )
                    a = a.substring(1, a.length);
                if (0 === a.indexOf(t))
                    return a.substring(t.length, a.length);
            }
            return null;
        },
        eraseCookie: function(e) {
            this.createCookie(e, "", -1);
        }
    });
}),
define("helpers/bootstrap/fetchUser", ["application/runtime", "backend/DatabaseManager", "project!database", "project!core"], function(e, t, i, n, o) {
    function a() {
        var t = location.hash;
        t = t && t.replace(/^#/, ""),
        m.setItem("wantedRoute", t || "").always(function() {
            var t = "/login";
            p ? e.trigger("reload", t) : l.location = t;
        });
    }
    function r() {
        var e = new d();
        return t.init().then(function() {
            t.database.getAll("user", function(t) {
                e.resolve(t[0]);
            }, function() {
                e.resolve(o);
            });
        }),
        e.promise();
    }
    function s() {
        var e = new d()
          , t = new g();
        return t.open("POST", "/authorize", !0),
        t.onreadystatechange = function() {
            var i = 4 === t.readyState;
            if (i && 200 === t.status) {
                var n = JSON.parse(t.response);
                n.uuid ? m.setItem("wl_uuid", n.uuid).always(function() {
                    e.resolve(n);
                }) : e.resolve(n);
            } else
                i && e.reject();
        }
        ,
        t.setRequestHeader("Content-Type", "application/json"),
        t.send(JSON.stringify({
            client_id: c.clientID
        })),
        e.promise();
    }
    var l = e.global
      , c = e.config
      , d = n.WBDeferred
      , u = n.lib.when
      , m = new i.WBLocalStorage()
      , p = e.env.isPackagedApp()
      , g = e.global.XMLHttpRequest || function() {}
    ;
    return function() {
        var e, i, n = new d(), o = new d(), l = new d();
        return p ? o.resolve() : s().done(function(e) {
            i = e;
        }).always(o.resolve, o),
        r().done(function(t) {
            e = t;
        }).always(l.resolve, l),
        u(o, l).done(function() {
            e && p ? n.resolve(e) : !i || e && e.id !== i.id ? t.database.truncate(a) : n.resolve(i);
        }),
        n.promise();
    }
    ;
}),
define("helpers/bootstrap/loadAppWithUserData", ["require", "application/runtime", "helpers/Cookie", "project!database", "project!core"], function(e, t, i, n, o) {
    function a() {
        var e = new c()
          , t = location.hash;
        return t = t ? t.replace(/^#/, "") : "/lists/inbox",
        s.getItem("wantedRoute").done(function(n) {
            s.removeItem("wantedRoute").done(function() {
                t = n ? n : t,
                /^\//.test(t) || (t = "/" + t);
                var o = !l && i.readCookie("AUTHSTATE");
                if (o) {
                    i.eraseCookie("AUTHSTATE");
                    var a = "login" === o ? "/start" : "signup" === o ? "/setup" : null;
                    t = a ? a + t : t;
                }
                location.hash = t,
                e.resolve();
            });
        }),
        e.promise();
    }
    var r = t.$
      , s = new n.WBLocalStorage()
      , l = t.env.isPackagedApp()
      , c = o.WBDeferred;
    return function(t, i, n) {
        a().done(function() {
            r("body").addClass("application-" + t),
            e([i], function(e) {
                new e(t,{
                    userData: n
                });
            });
        });
    }
    ;
}),
function() {
    var e = window.requirejs.config({
        paths: {
            project: "loaders/project",
            template: "loaders/templates",
            partial: "loaders/partials",
            style: "loaders/styles"
        }
    });
    e(["application/runtime", "backend/DatabaseManager", "backend/IOWunderapi", "helpers/Cookie", "helpers/bootstrap/fetchUser", "helpers/bootstrap/loadAppWithUserData"], function(e, t, i, n, o, a) {
        var r = "main"
          , s = "applications/main/Application"
          , l = e.$
          , c = e.env.getEnvInfo();
        l(function() {
            l("body").css("opacity", 1).addClass(c.browser);
        }),
        e.io = new i(),
        "login" === r ? a(r, s, {}) : o().done(function(e) {
            a(r, s, e);
        });
    });
}
.call(this),
define("../build/bootstraps/main", function() {}),
define("wunderbits/BaseEventEmitter", ["project!core"], function(e) {
    return e.WBEventEmitter.extend({
        mixins: [e.mixins.WBDestroyableMixin, e.mixins.WBUtilsMixin, e.mixins.ObservableHashMixin]
    });
}),
define("application/Redirector", ["application/runtime", "wunderbits/BaseEventEmitter", "project!core"], function(e, t, i) {
    var n = i.WBDeferred
      , o = i.lib.when
      , a = e.global
      , r = e._
      , s = t.prototype
      , l = ["starred", "all", "completed", "assigned"];
    return t.extend({
        initialize: function() {
            var t = this;
            s.initialize.apply(t, arguments);
            var i = new n()
              , a = new n();
            t.bindTo(e, "lists:ready", function(e) {
                t.lists = e,
                i.resolve();
            }),
            o(i).done(function() {
                t.bindTo(t.lists, "remove", t.onRemoveList),
                t.bindTo(t.lists, "change:online_id", t.onChangeOnlineId);
            }),
            t.bindTo(e, "tasks:ready", function(e) {
                t.tasks = e,
                a.resolve();
            }),
            o(a).done(function() {
                t.bindTo(t.tasks, "remove", t.onRemoveTask),
                t.bindTo(t.tasks, "change", t.onChangeTask),
                t.bindTo(t.tasks, "change:online_id", t.onChangeOnlineId);
            }),
            t.bindTo(e, "browser:render", t.trackBrowserState),
            t.bindTo(e, "detail:rendered", t.trackDetailTask);
        },
        routeToInbox: function() {
            r.delay(function() {
                e.trigger("route:lists/inbox");
            }, 250);
        },
        trackDetailTask: function(e) {
            var t = this;
            t.lastDetailViewTaskId = e;
        },
        trackBrowserState: function(e) {
            var t = this;
            t.lastBrowserState = e;
        },
        onRemoveList: function(e, t, i) {
            var n = this
              , o = i && i.fromSync;
            o && e.isRouteActive() && n.routeToInbox();
        },
        onRemoveTask: function(t, i, n) {
            var o = this
              , r = a.location.href
              , s = r.indexOf(t.route()) >= 0
              , l = t.attributes.list_id
              , c = o.lists.get(l)
              , d = n && n.fromSync;
            d && s && (o.lastBrowserState === l && c ? e.trigger("detail:close") : o.routeToInbox());
        },
        onChangeOnlineId: function(t) {
            var i = t.attributes;
            if ("inbox" !== i.list_type) {
                var n = e.currentRoute();
                if (n.indexOf(t.id) > -1) {
                    var o = n.replace(t.id, t.attributes.online_id);
                    e.trigger("route:" + o, {
                        replace: !0
                    });
                }
            }
        },
        onChangeTask: function(t) {
            var i = this
              , n = t.id === i.lastDetailViewTaskId
              , o = e.currentRoute()
              , a = o.indexOf(t.id) >= 0 || o.indexOf(t.attributes.online_id) >= 0;
            n && a && (r.contains(l, i.lastBrowserState) && !t.isInSmartList(i.lastBrowserState) ? i.closeDetailView() : "today" !== i.lastBrowserState || t.isInTodayCollection() ? "week" !== i.lastBrowserState || t.isInWeekCollection() || i.closeDetailView() : i.closeDetailView());
        },
        closeDetailView: function() {
            e.trigger("detail:close");
        }
    });
}),
define("wunderbits/mixins/DebounceMixin", ["../lib/dependencies", "project!core"], function(e, t) {
    var i = e._
      , n = t.lib.toArray
      , o = t.WBMixin;
    return o.extend({
        debounce: function(e) {
            function t() {
                o.destroyed || e.apply(o, arguments);
            }
            var o = this
              , a = n(arguments);
            return a[0] = t,
            i.debounce.apply(null, a);
        }
    });
}),
define("wunderbits/WBController", ["application/runtime", "./mixins/DebounceMixin", "./BaseEventEmitter"], function(e, t, i) {
    var n = i.prototype
      , o = e._
      , a = {};
    return i.extend({
        mixins: [t],
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e.cid = o.uniqueId("controller"),
            a[e.cid] = e;
        },
        onDestroy: function() {
            var e = this;
            delete a[e.cid];
        },
        stopEventFully: function(e) {
            e.preventDefault(),
            e.stopPropagation();
        }
    });
}),
define("wunderbits/WBRoutesController", ["./WBController"], function(e) {
    var t = e.prototype;
    return e.extend({
        routes: {},
        initialize: function(e) {
            var i = this;
            e || (e = {}),
            t.initialize.apply(i, arguments),
            i.outlet = e.outlet,
            i.router = e.router;
        }
    });
}),
define("wunderbits/WBFileUploader", ["./lib/dependencies", "project!core", "./helpers/SafeParse"], function(e, t, i) {
    var n = t.WBClass.prototype
      , o = e._;
    return t.WBClass.extend({
        initialize: function(e) {
            var t = this;
            n.initialize.apply(t, arguments),
            t.options = e || {},
            t.acceptedFileTypes = e.acceptedFileTypes || "",
            t.uploadURL = e.uploadURL || "",
            t.uploadAction = e.uploadAction || "POST",
            t.customHeaders = e.customHeaders || "",
            t.fileKey = e.fileKey || "avatar",
            t.extraParams = e.extraParams,
            t.fileName = e.fileName || "",
            t.xhr = new XMLHttpRequest(),
            t.setupFormData();
        },
        isFileTypeAllowed: function(e) {
            var t = this
              , i = e.type
              , n = t.getFileExtension(e);
            return "" === i && n && (i = "application/" + n),
            -1 !== t.acceptedFileTypes.indexOf(i) || "" === t.acceptedFileTypes ? !0 : !1;
        },
        getFileExtension: function(e) {
            return e.name.indexOf(".") >= 0 ? e.name.split(".").pop() : !1;
        },
        upload: function(e) {
            var t = this;
            if (t.file = e,
            t.isFileTypeAllowed(e)) {
                if ("" !== t.fileName) {
                    var n = t.getFileExtension(e);
                    t.fileName = t.fileName + "." + n;
                } else
                    t.fileName = e.name;
                if (t.formData.append(t.fileKey, e, t.fileName),
                t.extraParams) {
                    var a = o.pairs(t.extraParams);
                    o.each(a, function(e) {
                        t.formData.append(e[0], e[1]);
                    });
                }
                t.xhr.open(t.uploadAction, t.uploadURL, !0),
                t.customHeaders && t.setupCustomHeaders();
                var r;
                t.xhr.upload.addEventListener("progress", function(e) {
                    e.lengthComputable && (r = e.loaded / e.total * 100 | 0,
                    r = r -= 5,
                    t.onProgress(r));
                }, !1),
                t.xhr.onreadystatechange = function() {
                    var e = t.xhr.readyState;
                    if (4 === e) {
                        var n = i.json(t.xhr.responseText);
                        t.onComplete(n);
                    }
                }
                ,
                t.xhr.addEventListener("error", function() {
                    t.onError(),
                    t.file = null;
                }, !1),
                t.xhr.send(t.formData);
            }
        },
        setupFormData: function() {
            var e = this;
            e.formData = new FormData();
        },
        setupCustomHeaders: function() {
            var e = this;
            for (var t in e.customHeaders)
                "X-File-Name" !== t ? e.xhr.setRequestHeader(t, e.customHeaders[t]) : e.xhr.setRequestHeader(t, encodeURIComponent(e.file.name));
        },
        onProgress: function(e) {
            var t = this;
            t.options && t.options.onProgress && t.options.onProgress(e);
        },
        onComplete: function(e) {
            var t = this;
            e ? t.options.onUploadComplete(e) : t.onError(),
            t.file = null;
        },
        onError: function() {
            var e = this;
            e.options.onError && "function" == typeof e.options.onError && e.options.onError();
        }
    });
}),
define("helpers/BlobHelper", ["application/runtime", "project!core"], function(e, t) {
    function i(e) {
        return function(t) {
            var i = t.target
              , n = 4 === i.readyState;
            if (n && 200 === i.status) {
                var o = a.createObjectURL(i.response);
                e.resolve(o);
            } else
                n && e.reject();
        }
        ;
    }
    var n = t.WBDeferred
      , o = e.global
      , a = e.global.URL || e.global.webkitURL
      , r = e.$
      , s = {}
      , l = {};
    return t.WBSingleton.extend({
        dataURItoBlob: function(e) {
            for (var t = o.Blob, i = o.ArrayBuffer, n = o.DataView, a = o.atob(e.split(",")[1]), r = e.split(",")[0].split(":")[1].split(";")[0], s = new i(a.length), l = new n(s), c = 0; c < a.length; c++)
                l.setUint8(c, a.charCodeAt(c));
            return new t([s],{
                type: r
            });
        },
        fetchDataURI: function(e) {
            var t = this;
            return /^data:/.test(e) ? new n().resolve(e) : e in s ? new n().resolve(s[e]) : e in l ? l[e] : t.xhrRequest(e);
        },
        xhrRequest: function(e) {
            var t = new n()
              , o = t.promise();
            l[e] = o;
            try {
                var a = new XMLHttpRequest();
                a.open("GET", e, !0),
                a.responseType = "blob",
                a.onreadystatechange = i(t),
                a.send();
            } catch (r) {
                t.reject(r);
            }
            return t.done(function(t) {
                s[e] = t;
            }).always(function() {
                delete l[e];
            }),
            o;
        },
        loadImage: function(t, i, n, o) {
            var a = this;
            i = i instanceof r ? i : r(i),
            a.fetchDataURI(t).done(function(e) {
                i.attr("src", e),
                n && n();
            }).fail(function() {
                e.env.isPackagedApp() ? o && o() : (n && (i[0].onload = n),
                o && (i[0].onerror = o),
                i.attr("src", t));
            });
        }
    });
}),
define("routes/StartRoutesController", ["application/runtime", "project!database", "wunderbits/WBRoutesController", "wunderbits/WBFileUploader", "helpers/BlobHelper", "helpers/PlatformHeaders", "project!core"], function(e, t, i, n, o, a, r) {
    var s = r.lib.createUID
      , l = e._
      , c = e.config
      , d = new t.WBLocalStorage();
    return i.extend({
        hasStarted: !1,
        startApp: function(t) {
            var i = this
              , n = i.deferred().resolve();
            return e.trigger("set:loadContext", "login"),
            i._resetInitialRoute(t, "start/"),
            i.hasStarted = !0,
            n.promise();
        },
        startAppFirstTime: function(e) {
            var t = this;
            return t.hasStarted ? void t._resetInitialRoute(e, "setup/") : t._startup(e);
        },
        _startup: function(e) {
            var t = this;
            t.ensureChromeUID(),
            t._initSettings(),
            t.uploadCachedAvatar(),
            t._onboardUser(),
            t._trackSignup();
            var i = t._getInitialPath(e);
            return t.startApp(i);
        },
        _resetInitialRoute: function(t, i) {
            var n = this
              , o = t || "";
            o = o.replace(i),
            l.defer(function() {
                n.router.isInitialRoute = !0,
                e.trigger("route:" + o);
            });
        },
        _getInitialPath: function(e) {
            var t;
            return t = e.indexOf("business") >= 0 ? "chooseBusinessLists" : "chooseLists";
        },
        _initSettings: function() {
            var t = e.settings.toJSON();
            e.settings.changed = t,
            e.settings.trigger("change", e.settings, {});
        },
        _onboardUser: function() {
            e.trigger("onboarding:newUser");
        },
        _trackSignup: function() {
            e.trigger("trackingService", "Client.SignUp");
        },
        uploadCachedAvatar: function() {
            var t = this
              , i = t.deferred();
            return d.getItem("localAvatar").always(function(r) {
                if (!r)
                    return i.resolve().promise();
                var s = o.dataURItoBlob(r);
                d.getItem("localAvatarName").done(function(o) {
                    s.name = o;
                    var r = l.extend({
                        "X-Access-Token": e.user.attributes.access_token,
                        "X-Client-ID": c.clientID,
                        "X-Requested-With": "XMLHttpRequest",
                        "X-File-Name": o
                    }, a.headers);
                    t.fileUploader = new n({
                        acceptedFileTypes: ["image/gif", "image/jpeg", "image/png"],
                        uploadAction: "POST",
                        uploadURL: c.api.host + "/v1/avatar",
                        customHeaders: r,
                        fileName: "newAvatar",
                        onProgress: function() {},
                        onUploadComplete: function() {
                            d.removeItem("localAvatar").always(i.resolve, i);
                        }
                    }),
                    t.bindTo(e, "user:ready", function() {
                        t.fileUploader.upload(s);
                    });
                });
            }),
            i.promise();
        },
        ensureChromeUID: function() {
            var t = "chromebook-uid";
            e.env.isChromeOS() && e.env.isChromeApp() && e.isInstalledOnChrome() && e.global.chrome.storage.local.get(t, function(i) {
                i && i[t] || (i = {},
                i[t] = s(),
                e.global.chrome.storage.local.set(i));
            });
        }
    });
}),
define("routes/ModalRoutesController", ["application/runtime", "wunderbits/WBRoutesController"], function(e, t, i) {
    var n = e._
      , o = t.prototype;
    return t.extend({
        name: i,
        initialize: function() {
            var e = this;
            if (o.initialize.apply(e, arguments),
            !e.name)
                throw new Error("Cannot initialize without name");
        },
        show: function() {
            var e = this
              , t = e.deferred();
            return e.router.whenInterfaceHasLoaded().done(function() {
                e.beforeShow(t),
                "pending" === t.state() && (e.showModal(),
                t.resolve());
            }),
            t.promise();
        },
        beforeShow: function() {
            var t = this;
            e.trigger("confirmation:cancel"),
            t.stillActive || e.trigger("modal:close");
        },
        showModal: function() {
            var t = this;
            t.triggerUrl = e.currentRoute(),
            e.trigger("modal:show", t.name, t.getOptions()),
            n.defer(function() {
                e.trigger("focus:set", t.focus || t.name);
            });
        },
        shouldTriggerReturnUrl: function() {
            var t = this;
            return e.currentRoute() === t.triggerUrl;
        },
        afterClose: function() {
            var e = this
              , t = e.router
              , i = e.returnRoute || t.interfaceReturnRoute || t.defaultRoute;
            e.shouldTriggerReturnUrl(i) && t.setRoute(i);
        },
        getOptions: function() {
            var e = this;
            return {
                onClose: function() {
                    e.afterClose();
                }
            };
        }
    });
}),
define("routes/FlashCardsRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        name: "flashCards",
        runForList: function(e) {
            var t = this
              , i = t.router
              , n = t.deferred();
            return t.listId = e || "inbox",
            i.whenListHasLoaded(t.listId).done(function(e) {
                t.returnRoute = e.route(),
                t.show().done(n.resolve, n);
            }),
            n.promise();
        },
        getOptions: function() {
            var e = this
              , t = i.getOptions.apply(e, arguments);
            return t.listId = e.listId,
            t;
        }
    });
}),
define("wunderbits/lib/isInstanceOf", [], function() {
    return function(e) {
        return "function" == typeof e && this instanceof e;
    }
    ;
}),
define("wunderbits/mixins/WBInstanceUtilitiesMixin", ["../lib/isInstanceOf", "project!core"], function(e, t) {
    return t.WBMixin.extend({
        isInstanceOf: e
    });
}),
define("wunderbits/WBModel", ["./lib/dependencies", "./mixins/WBInstanceUtilitiesMixin", "project!core"], function(e, t, i) {
    var n = i.lib.createUID
      , o = i.mixins.WBBindableMixin
      , a = i.mixins.WBUtilsMixin
      , r = i.mixins.ObservableHashMixin
      , s = e.Backbone
      , l = s.Model.prototype
      , c = i.WBClass.prototype
      , d = s.Model.extend({
        initialize: function(e) {
            var t = this;
            t.uid = n(),
            c.augmentProperties.call(t),
            c.initMixins.call(t, e);
        },
        destroy: function() {
            var e = this;
            e.destroying = !0,
            l.destroy.apply(e, arguments);
        },
        save: function() {
            var e = this;
            !e.destroying && l.save.apply(e, arguments);
        },
        clear: function() {
            var e = this;
            l.clear.apply(e, arguments),
            e.save(e.defaults);
        }
    });
    return [o, a, t, r].forEach(function(e) {
        e.applyToClass(d);
    }),
    d;
}),
define("models/BaseModel", ["wunderbits/WBModel", "project!core"], function(e, t) {
    var i = t.lib.extend
      , n = e.prototype;
    return e.extend({
        initialize: function(e, t) {
            var i = this;
            n.initialize.apply(i, arguments),
            i.trackLatestRemoteState(t);
        },
        trackLatestRemoteStateFromRevisionChange: function(e, t, i) {
            var n = this;
            n.trackLatestRemoteState(i);
        },
        trackLatestRemoteState: function(e) {
            var t = this;
            if (e = e || {},
            e.fromSync && e.remoteState) {
                var n = e.remoteState;
                delete n.lastUpdateData,
                delete n.revision;
                var o = i({}, t.attributes.lastUpdateData || {}, n);
                t.save({
                    lastUpdateData: o
                }, {
                    fromSync: !0
                });
            }
        },
        ableToSyncBind: void 0,
        trackIsAbleToSync: function() {
            throw new Error("#trackIsAbleToSync called but not overriden");
        },
        isAbleToSync: function() {
            var e = this
              , t = this.attributes
              , i = !!t.online_id || !!t.isAbleToSync;
            return i || e.ableToSyncBind || e.trackIsAbleToSync(),
            i;
        },
        isNotAllowedToSync: function() {
            return !!this.neverSyncOut;
        },
        makeAbleToSync: function() {
            var e = {
                fromSync: !0
            };
            this.set({
                isAbleToSync: !0
            }, e).save({}, e);
        }
    });
}),
define("models/ListResourceBaseModel", ["require", "models/BaseModel"], function(e, t) {
    var i;
    return e(["collections/ListCollection"], function(e) {
        i = e;
    }),
    t.extend({
        isAbleToSync: function() {
            var e = this
              , t = this.attributes
              , i = e.getListOnlineID();
            return i ? e.makeAbleToSync() : t.isAbleToSync || e.ableToSyncBind || e.trackIsAbleToSync(),
            t.isAbleToSync;
        },
        trackIsAbleToSync: function() {
            var e, t, n = this, o = n.attributes, a = o.list_id, r = o.online_list_id;
            if (a && r)
                n.makeAbleToSync();
            else if (a)
                e = new i("/lists/all"),
                t = e.get(a),
                t && (t.attributes.online_id ? n.makeAbleToSync() : n.ableToSyncBind = n.bindOnceTo(t, "change:online_id", function() {
                    n.delay("makeAbleToSync");
                }));
            else
                var s = n.bindTo(n, "change:list_id", function() {
                    o.list_id && (n.trackIsAbleToSync(),
                    n.unbindFrom(s));
                });
        },
        getListOnlineID: function() {
            var e, t, n = this, o = n.attributes;
            return o.list_id && (e = new i("/lists/all"),
            t = e.get(o.list_id)) ? t.attributes.online_id : void 0;
        }
    });
}),
define("models/MembershipModel", ["models/ListResourceBaseModel"], function(e) {
    return e.extend({
        storeName: "memberships",
        defaults: {
            type: "membership",
            user_id: void 0,
            list_id: void 0,
            sender_id: void 0,
            state: void 0,
            listReady: void 0,
            senderReady: void 0,
            userReady: void 0,
            isReady: void 0
        },
        isAccepted: function() {
            return "accepted" === this.attributes.state;
        },
        isPending: function() {
            return "pending" === this.attributes.state;
        },
        isReady: function() {
            return !!this.attributes.isReady;
        }
    });
}),
define("models/LocallyImmutableModel", ["./BaseModel"], function(e) {
    var t = e.prototype;
    return e.extend({
        initialize: function() {
            var e = this;
            t.constructor.__super__.initialize.apply(e, arguments);
        }
    });
}),
define("models/OtherUserModel", ["./LocallyImmutableModel"], function(e) {
    return e.extend({
        storeName: "users",
        defaults: {
            type: "user"
        },
        neverSyncOut: !0,
        isAbleToSync: function() {
            return !1;
        }
    });
}),
define("wunderbits/collections/WBCollection", ["../lib/dependencies", "wunderbits/BaseEventEmitter", "project!core"], function(e, t, i, n) {
    var o = i.lib.fromSuper
      , a = i.lib.extend
      , r = i.lib.assert
      , s = e.Backbone.Collection
      , l = s.prototype
      , c = {
        properties: {
            length: 0,
            models: [],
            _byId: {},
            indexHash: {}
        },
        observes: {
            self: {
                add: "onModelAdd",
                remove: "onModelRemove",
                reset: "onCollectionReset"
            }
        },
        indices: ["online_id"],
        model: n,
        constructor: function(e) {
            var i = this;
            r(i.constructor !== d, "can't initialize WBCollection"),
            r.string(e, "collection url must be a string"),
            r(/(\/[a-z0-9]+)+\/?/.test(e), "invalid url for a collection");
            var n = d.collections;
            if (n[e]instanceof i.constructor)
                return n[e];
            i.url = e,
            n[e] = i,
            t.call(i);
            var o = i.model;
            r(o, "No model class defined"),
            r(o.prototype.storeName, "No store defined"),
            i.resetIndex(),
            i.createIndexBindings(),
            n = null;
        },
        initialize: function() {
            var e = this;
            return e.indices = o.concat(e, "indices"),
            e;
        },
        sort: function(e) {
            var t = this;
            if (!t.comparator)
                throw new Error("Cannot sort a set without a comparator");
            return e || (e = {}),
            "string" == typeof t.comparator || 1 === t.comparator.length ? t.models = t.sortBy(t.comparator, t) : (t._boundComparator = t._boundComparator || t.comparator.bind(t),
            t.models.sort(t._boundComparator)),
            e.silent || t.trigger("sort", t, e),
            t;
        },
        resetIndex: function() {
            var e = this
              , t = e.indexHash;
            e.indices.forEach(function(e) {
                t[e] = {};
            });
        },
        createIndexBindings: function() {
            var e = this
              , t = e.indexHash;
            e.indices.forEach(function(i) {
                var n = t[i];
                e.bindTo(e, "change:" + i, function(e) {
                    n[e.attributes[i]] = e;
                });
            });
        },
        onModelAdd: function(e) {
            var t = this
              , i = t.indexHash
              , n = e.attributes;
            t.indices.forEach(function(t) {
                var o = n[t];
                o && o !== n.id && (i[t][n[t]] = e);
            });
        },
        onModelRemove: function(e) {
            var t = this
              , i = t.indexHash
              , n = e.attributes;
            t.indices.forEach(function(e) {
                e in n && delete i[e][n[e]];
            });
        },
        onCollectionReset: function() {
            var e = this;
            e.resetIndex(),
            e.models.forEach(function(t) {
                e.onModelAdd(t);
            });
        },
        get: function(e) {
            var t = this
              , i = e && e.attributes && "id"in e ? e.id : e;
            return null === i || i === n ? void 0 : t._byId[i] || t.getFromIndex(i);
        },
        getFromIndex: function(e) {
            var t, i = this, n = i.indexHash;
            return i.indices.some(function(i) {
                return t = n[i][e],
                !!t;
            }),
            t;
        },
        getIdByAltId: function(e) {
            var t = e && this.indexHash.online_id[e];
            return t && t.id;
        }
    };
    c = a({}, l, c);
    var d = t.extend(c);
    return d.collections = {},
    d.release = function() {
        d.collections = {};
    }
    ,
    d;
}),
define("collections/BaseCollection", ["wunderbits/collections/WBCollection"], function(e) {
    var t = e.prototype;
    return e.extend({
        initialize: function() {
            var e = this;
            t.initialize.apply(e, arguments),
            /\/all$/.test(e.url) && e.bindTo(e, "change:revision", "trackLatestRemoteStateFromRevisionChange");
        },
        trackLatestRemoteStateFromRevisionChange: function(e, t, i) {
            e.trackLatestRemoteState && e.trackLatestRemoteState.call(e, i);
        }
    });
}),
define("collections/UserCollection", ["application/runtime", "models/OtherUserModel", "./BaseCollection"], function(e, t, i) {
    var n = e._;
    return i.extend({
        model: t,
        comparator: function(t, i) {
            var n = t.attributes
              , o = i.attributes;
            if (e.user.isIDEqual(t.id))
                return -1;
            if (e.user.isIDEqual(i.id))
                return 1;
            var a = n.name ? n.name.toUpperCase() : ""
              , r = o.name ? o.name.toUpperCase() : "";
            return r > a ? -1 : a > r ? 1 : 0;
        },
        createSearchIndex: function() {
            var e = this
              , t = {};
            return e.models.forEach(function(e) {
                var i = e.attributes
                  , n = i.name || i.email;
                t[i.id] = n;
            }),
            t;
        },
        searchByEmailOrName: function(e) {
            var t = this;
            return n.filter(t.models, function(t) {
                var i = t.attributes.name && t.attributes.name.toLowerCase().indexOf(n.escape(e.toLowerCase())) >= 0
                  , o = t.attributes.email && t.attributes.email.toLowerCase().indexOf(n.escape(e.toLowerCase())) >= 0;
                return i || o;
            });
        }
    });
}),
define("collections/MembershipCollection", ["application/runtime", "models/MembershipModel", "./UserCollection", "./BaseCollection"], function(e, t, i, n, o) {
    var a = e._
      , r = n.prototype;
    return n.extend({
        model: t,
        users: new i("/users/all"),
        initialize: function() {
            var e = this;
            e.sort = a.debounce(e.sort, 500),
            r.initialize.apply(e, arguments),
            "/memberships/all" === e.url && (e.comparator = o);
        },
        isListMuted: function() {
            return this.findWhere({
                user_id: "" + e.user.id
            }).attributes.muted;
        },
        destroyRemoved: function() {
            var e = this;
            e.getPendingRemovals().forEach(function(e) {
                e.destroy();
            });
        },
        sort: function() {
            var e = this;
            r.sort.apply(e, arguments);
        },
        nameCache: {},
        getNormalizedName: function(e) {
            var t = this
              , i = t.nameCache;
            return e in i || (i[e] = e.toUpperCase()),
            i[e];
        },
        comparator: function(t, i) {
            var n = this
              , o = n.users.get(t.attributes.user_id) || t
              , a = n.users.get(i.attributes.user_id) || i
              , r = o.attributes
              , s = a.attributes;
            if (e.user.isIDEqual(r.id))
                return -1;
            if (e.user.isIDEqual(s.id))
                return 1;
            var l = r.name ? r.name : r.email ? r.email : ""
              , c = s.name ? s.name : s.email ? s.email : ""
              , d = n.getNormalizedName(l)
              , u = n.getNormalizedName(c);
            return u > d ? -1 : d > u ? 1 : 0;
        },
        restoreRemoved: function() {
            var e = this;
            e.getPendingRemovals().forEach(function(e) {
                e.set("removed", null, {
                    silent: !0
                });
            });
        },
        getPendingRemovals: function() {
            var e = this;
            return e.filter(function(e) {
                return e.attributes.removed;
            });
        }
    });
}),
define("models/ListModel", ["application/runtime", "models/BaseModel", "collections/MembershipCollection"], function(e, t, i, n) {
    var o = e._;
    return t.extend({
        storeName: "lists",
        defaults: {
            type: "list",
            position: n
        },
        route: function(e) {
            var t = this
              , i = t.attributes
              , n = ("inbox" === i.id ? i.id : i.online_id) || i.id;
            return "lists/" + n + (e || "");
        },
        isRouteActive: function() {
            var t = this;
            return 0 === e.currentRoute().indexOf(t.route());
        },
        isSavedSearch: function() {
            return !1;
        },
        getCleanTitle: function() {
            return this.attributes.title;
        },
        isInbox: function() {
            return "inbox" === this.attributes.list_type;
        },
        isShared: function() {
            return !!this.attributes.isShared;
        },
        isMember: function() {
            return "member" === this.attributes.role;
        },
        isMuted: function() {
            return !!this.attributes.muted;
        },
        isOwner: function() {
            return e.user.isIDEqual(this.attributes.owner_id) || "owner" === this.attributes.role;
        },
        isMemberOfList: function(e) {
            var t = this
              , n = new i("/lists/" + t.id + "/memberships")
              , a = o.find(n.models, function(t) {
                return t.attributes.user_id === e || t.attributes.sender_id === e;
            });
            return a;
        },
        isPublic: function() {
            return !!this.attributes["public"];
        },
        getFullPublicURL: function() {
            var t = this
              , i = e.config.domain_name || "www.wunderlist.com"
              , n = "https://" + i;
            return t.isPublic() ? n + "/lists/" + t.attributes.online_id : "";
        },
        getShortenedURL: function() {
            var t = this
              , i = t.deferred()
              , n = t.getFullPublicURL();
            return n ? e.io.post(e.config.urlshortener.host, {
                url: n
            }).done(function(e) {
                i.resolve(e.url);
            }).fail(i.reject) : i.reject(),
            i.promise();
        },
        isAbleToSync: function() {
            return !0;
        }
    });
}),
define("helpers/Positions", ["application/runtime", "project!core"], function(e, t) {
    var i = e._;
    return t.WBSingleton.extend({
        containsInvalidPosition: function(e) {
            for (var t = this, i = e.models, n = 0, o = i.length; o > n; n++)
                if (!t.isValidPosition(i[n].attributes.position) || t.hasDuplicatePosition(i[n], e))
                    return !0;
            return !1;
        },
        hasDuplicatePosition: function(e, t) {
            var i = t.where({
                position: e.attributes.position
            });
            return i.length > 1 || i[0].id !== e.id;
        },
        isValidPosition: function(e) {
            return i.isNumber(e) && !i.isNaN(e);
        }
    });
}),
define("collections/ListCollection", ["application/runtime", "models/ListModel", "./BaseCollection", "helpers/Positions"], function(e, t, i) {
    var n, o, a, r, s = i.prototype, l = e._;
    return i.extend({
        model: t,
        comparator: function(e, t) {
            n = e.attributes,
            o = t.attributes;
            var i = !isNaN(n.position)
              , s = !isNaN(o.position);
            if ("inbox" === n.list_type)
                return -1;
            if ("inbox" === o.list_type)
                return 1;
            if (i && s)
                a = n.position,
                r = o.position;
            else {
                if (i && !s)
                    return -1;
                if (!i && s)
                    return 1;
                a = n.id,
                r = o.id;
            }
            return a > r ? 1 : r > a ? -1 : 0;
        },
        initialize: function() {
            var e = this;
            s.initialize.apply(e, arguments),
            e.bindTo(e, "change:position add remove", "sort");
        },
        hasSavedSearch: function(e) {
            var t = this;
            return !!t.find(function(t) {
                return t.isSavedSearch() && t.getCleanTitle() === e;
            });
        },
        getFirstPosition: function() {
            return Math.floor(l.first(this.models).attributes.position) - 10;
        },
        getLastPosition: function() {
            return Math.floor(l.last(this.models).attributes.position) + 10;
        },
        getNextPosition: function() {
            var e = this
              , t = e.max(function(e) {
                return e.attributes.position;
            })
              , i = t ? t.attributes.position : 0;
            return Math.round(i + 10);
        }
    });
}),
define("models/FolderModel", ["models/BaseModel", "collections/ListCollection"], function(e, t) {
    return e.extend({
        storeName: "folders",
        defaults: {
            type: "folder",
            title: "",
            list_ids: [],
            position: -1,
            expanded: !1
        },
        isExpanded: function() {
            return !!this.attributes.expanded;
        },
        addListId: function(e) {
            var t, i = this.isListIdInFolder(e);
            i || (t = this.attributes.list_ids.concat(e),
            this.save("list_ids", t));
        },
        removeListId: function(e) {
            var t = this.attributes.list_ids;
            t = t.filter(function(t) {
                return t != e;
            }),
            this.save("list_ids", t);
        },
        isListIdInFolder: function(e) {
            return this.attributes.list_ids.some(function(t) {
                return e == t;
            });
        },
        _canSync: function() {
            var e = new t("/lists/all")
              , i = e.models.some(function(e) {
                return !e.attributes.online_id;
            })
              , n = !i;
            return n;
        },
        _reevaluateCanSync: function() {
            var e = this;
            !e.destroyed && e._canSync() && (e.save("isAbleToSync", !0),
            e.unbindFromListOnlineIDChanges());
        },
        isAbleToSync: function() {
            var e = this;
            e.save("isAbleToSync", !1);
            var t = e._canSync();
            return t || e.bindToListOnlineIDChanges(),
            t;
        },
        unbindFromListOnlineIDChanges: function() {
            var e = this;
            e.listOnlineIDBind && e.unbindFrom(e.listOnlineIDBind);
        },
        bindToListOnlineIDChanges: function() {
            var e = this;
            e.unbindFromListOnlineIDChanges();
            var i = new t("/lists/all");
            e.listOnlineIDBind = e.bindTo(i, "change:online_id", "_reevaluateCanSync");
        }
    });
}),
define("collections/comparators", ["vendor/moment", "collections/ListCollection"], function(e, t) {
    function i(e, t) {
        var i = e.attributes ? e.attributes : e;
        return i[t];
    }
    function n(e) {
        return "number" == typeof e;
    }
    function o(e) {
        return "string" == typeof e && 0 !== e.length;
    }
    function a(t) {
        return e(t, "YYYY-MM-DD").sod();
    }
    var r = new t("/lists/all")
      , s = {
        taskListPosition: function(e, t) {
            var n = i(e, "list_id")
              , o = i(t, "list_id")
              , a = r.get(n) || {}
              , l = r.get(o) || {};
            return n === o ? s.position(e, t) : "inbox" === n ? 1 : "inbox" === o ? -1 : s.position(a, l);
        },
        position: function(e, t) {
            var o, a, r = i(e, "position"), s = i(t, "position"), l = n(r), c = n(s);
            return l && c ? s - r : l ? 1 : c ? -1 : (o = i(e, "id"),
            a = i(t, "id"),
            a > o ? 1 : -1);
        },
        completedAt: function(e, t) {
            var n = new Date(i(e, "completed_at"))
              , o = new Date(i(t, "completed_at"));
            return n.valueOf() - o.valueOf();
        },
        starred: function(e, t) {
            var n = i(e, "starred")
              , o = i(t, "starred");
            return o !== n ? o ? 1 : -1 : s.position(e, t);
        },
        completed: function(e, t) {
            var n = i(e, "completed")
              , o = i(t, "completed");
            return o !== n ? o ? 1 : -1 : s.position(e, t);
        },
        assigneeId: function(e, t) {
            var n = i(e, "assignee_id")
              , a = i(t, "assignee_id");
            return n !== a ? o(n) && o(a) ? a > n ? 1 : -1 : o(n) ? -1 : 1 : s.position(e, t);
        },
        dueDate: function(t, n) {
            var o = a(i(t, "due_date"))
              , r = a(i(n, "due_date"))
              , l = e().sod()
              , c = o.diff(l, "days")
              , d = r.diff(l, "days");
            return c === d ? s.position(t, n) : d - c;
        },
        dueDateTodayGroup: function(t, n) {
            var o = a(i(t, "due_date"))
              , r = a(i(n, "due_date"))
              , l = e().sod()
              , c = o.diff(l, "days")
              , d = r.diff(l, "days");
            return c === d ? s.taskListPosition(t, n) : d - c;
        }
    };
    return s;
}),
function(e) {
    function t(e, t, i) {
        for (var n = 0, o = e ? e.length : n; o > n; ) {
            var a = n + o >>> 1;
            i(e[a], t) > 0 ? n = a + 1 : o = a;
        }
        return n;
    }
    "function" == typeof define && define.amd ? define("vendor/sortedindex-compare", [], function() {
        return t;
    }) : "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = t),
    exports.sortedIndex = t) : e.sortedIndex = t;
}(this),
define("collections/SortedCollectionMixin", ["application/runtime", "project!core", "vendor/sortedindex-compare"], function(e, t, i, n) {
    var o = e._
      , a = function() {
        var e;
        return function(t) {
            return e || (e = Object.getPrototypeOf(Object.getPrototypeOf(t))),
            e;
        }
        ;
    }()
      , r = t.WBMixin.extend({
        enableSortedCollection: function(e, t) {
            var i = this;
            i.sorter = e;
            var n = t.map(function(e) {
                return "change:" + e;
            }).join(" ");
            n.length && i.on(n, i._sortTaskOnPropertyChange);
        },
        set: function(e, t) {
            var i = this;
            return i.getSorter && i.getSorter(),
            i.sorter ? i._sortingSet(e, t) : a(i).set.call(i, e, t);
        },
        _sortingSet: function(e, t) {
            var i = this;
            if (!e)
                return e;
            var n = !Array.isArray(e);
            return n && (e = [e]),
            e = e.map(function(e) {
                return i._prepareModel(e);
            }),
            e.forEach(function(e) {
                var n = i._removeModelIfNeeded(e);
                i._addReference(e);
                var o = i._insertModel(e);
                i._fireAddOrMoveEvent(e, n, o, t);
            }),
            n ? e[0] : e;
        },
        _insertModel: function(e) {
            var t = this
              , i = t._getInsertionIndex(e);
            return t.models.splice(i, 0, e),
            t.length = t.models.length,
            i;
        },
        _removeModelIfNeeded: function(e) {
            var t, i = this;
            return i.get(e.id) ? (t = i.indexOf(e),
            i.remove(e, {
                silent: !0
            }),
            t) : !1;
        },
        _fireAddOrMoveEvent: function(e, t, i, n) {
            var a, r = this;
            t !== !1 ? (a = o.extend({}, n, {
                fromIndex: t,
                index: i
            }),
            e.trigger("move", e, r, a)) : (a = o.extend({}, n, {
                index: i
            }),
            e.trigger("add", e, r, a));
        },
        resortModelIfPresentInCollection: function(e, t) {
            var i = this;
            return -1 !== i.indexOf(e) ? i._sortTaskOnPropertyChange(e, null, t) : void 0;
        },
        _sortTaskOnPropertyChange: function(e, t, i) {
            var n = this
              , a = n._adjustTaskIndexToSortScore(e);
            a.fromIndex !== a.index && n.trigger("move", e, n, o.extend({}, i, a));
        },
        _adjustTaskIndexToSortScore: function(t) {
            var i, o = this, a = o.indexOf(t);
            if (0 > a) {
                var r = "Inside a change event, the model does not appear in the collection. Sorting might be messed up by this."
                  , s = new Error(r);
                return e.error.exception(s, "CollectionChangeEventError"),
                void console.error(r);
            }
            return o.models.splice(a, 1),
            i = o._getInsertionIndex(t),
            o.models.splice(i, 0, t),
            -1 === a && (a = n),
            {
                fromIndex: a,
                index: i
            };
        },
        _getInsertionIndex: function(e) {
            var t = this;
            return i(t.models, e, t.sorter);
        },
        sort: function() {
            var e = this;
            e.sorter || e.comparator && a(e).sort.apply(e, arguments);
        },
        _areModelsSorted: function() {
            var e = this;
            return !e.models.some(function(t, i) {
                return 0 !== i ? e.sorter(e.models[i - 1]) > e.sorter(t) : !1;
            });
        },
        _getMissingIDsInModels: function() {
            var e = this;
            return e.models.filter(function(t) {
                return !e._byId[t.id];
            });
        },
        _getDuplicates: function() {
            var e = this;
            return e.models.filter(function(t, i) {
                return e.models.some(function(e, n) {
                    return i !== n && t.id === e.id;
                });
            });
        },
        _checkSorted: function() {
            var t = this;
            if (!t._areModelsSorted()) {
                var i = t.models.map(t.sorter)
                  , n = t._createErrorMessage("Models are not sorted anymore " + JSON.stringify(i))
                  , o = new Error(n);
                e.error.exception(o, "CollectionOrderError"),
                console.error(n);
            }
        },
        _createErrorMessage: function(e) {
            return this.constructor + " " + e;
        },
        _checkDuplicates: function() {
            var t = this
              , i = t._getDuplicates();
            if (0 !== i.length) {
                var n = i.map(function(e) {
                    return e.id;
                })
                  , o = t._createErrorMessage("self.models contains a model twice, which will screw up sorting eventually. Duplicated IDs: " + JSON.stringify(n))
                  , a = new Error(o);
                e.error.exception(a, "CollectionDuplicateError"),
                console.error(o);
            }
        },
        _checkIDs: function() {
            var t = this
              , i = t._getMissingIDsInModels();
            if (0 !== i.length) {
                var n = t.models.map(function(e) {
                    return e.id;
                })
                  , o = t._createErrorMessage("_byId is missing the following IDs: " + JSON.stringify(i) + ", models contains these ids: " + JSON.stringify(n))
                  , a = new Error(o);
                e.error.exception(a, "CollectionHashError"),
                console.error(o);
            }
        },
        _checkInconsistencies: function(e) {
            var t = this;
            t._checkDuplicates(),
            t._checkIDs(),
            e || t._checkSorted();
        }
    });
    return r;
}),
define("collections/FolderCollection", ["models/FolderModel", "collections/comparators", "collections/SortedCollectionMixin", "collections/BaseCollection", "wunderbits/lib/dependencies"], function(e, t, i, n, o) {
    var a = o._
      , r = n.extend({
        model: e,
        sorter: t.position,
        findFolderForListId: function(e) {
            var t = this;
            return a.find(t.models, function(t) {
                return t.attributes.list_ids.some(function(t) {
                    return e == t;
                });
            });
        }
    });
    return i.applyToClass(r),
    r;
}),
define("languages/available", {
    name: "available",
    data: {
        ar: {
            file: "arabic",
            name: "‏العربية‏",
            dir: "rtl"
        },
        bg_BG: {
            file: "bulgarian",
            name: "Български"
        },
        ca_ES: {
            file: "catalan",
            name: "Català"
        },
        cs_CZ: {
            file: "czech",
            name: "Čeština"
        },
        cy_GB: {
            file: "welsh",
            name: "Cymraeg"
        },
        da_DK: {
            file: "danish",
            name: "Dansk"
        },
        de_DE: {
            file: "german",
            name: "Deutsch"
        },
        en_US: {
            file: "english",
            name: "English"
        },
        es_LA: {
            file: "spanish",
            name: "Español"
        },
        fa_IR: {
            file: "persian",
            name: "‏فارسی‏",
            dir: "rtl"
        },
        fr_FR: {
            file: "french",
            name: "Français"
        },
        el_GR: {
            file: "greek",
            name: "Ελληνικά"
        },
        he_IL: {
            file: "hebrew",
            name: "‏עברית‏",
            dir: "rtl"
        },
        hu_HU: {
            file: "hungarian",
            name: "Magyar"
        },
        is_IS: {
            file: "icelandic",
            name: "Íslenska"
        },
        it_IT: {
            file: "italian",
            name: "Italiano"
        },
        ja_JP: {
            file: "japanese",
            name: "日本語"
        },
        ka_GE: {
            file: "georgian",
            name: "ქართული"
        },
        ko_KR: {
            file: "korean",
            name: "한국어"
        },
        mt_MT: {
            file: "maltese",
            name: "Malti"
        },
        my_MY: {
            file: "burmese",
            name: "မြန်မာဘာသာ"
        },
        nl_NL: {
            file: "dutch",
            name: "Nederlands"
        },
        nb_NO: {
            file: "norwegian-bokmal",
            name: "Norsk (bokmål)"
        },
        pl_PL: {
            file: "polish",
            name: "Polski"
        },
        pt_BR: {
            file: "portuguese-brazil",
            name: "Português (Brasil)"
        },
        pt_PT: {
            file: "portuguese",
            name: "Português"
        },
        ro_RO: {
            file: "romanian",
            name: "Română"
        },
        ru_RU: {
            file: "russian",
            name: "Русский"
        },
        sk_SK: {
            file: "slovak",
            name: "Slovenčina"
        },
        sq_AL: {
            file: "albanian",
            name: "Shqip"
        },
        sv_SE: {
            file: "swedish",
            name: "Svenska"
        },
        th_TH: {
            file: "thai",
            name: "ภาษาไทย"
        },
        tr_TR: {
            file: "turkish",
            name: "Türkçe"
        },
        zh_CN: {
            file: "simplified-chinese-china",
            name: "中文(简体)"
        },
        zh_TW: {
            file: "chinese-taiwan",
            name: "中文(台灣)"
        },
        aliases: {
            bg: "bg_BG",
            ca: "ca_ES",
            cy: "cy_GB",
            da: "da_DK",
            de: "de_DE",
            el: "el_GR",
            en: "en_US",
            es: "es_LA",
            fa: "fa_IR",
            fr: "fr_FR",
            grk: "el_GR",
            he: "he_IL",
            hu: "hu_HU",
            is: "is_IS",
            it: "it_IT",
            ja: "ja_JP",
            ka: "ka_GE",
            ko: "ko_KR",
            mt: "mt_MT",
            my: "my_MY",
            nl: "nl_NL",
            no: "nb_NO",
            pl: "pl_PL",
            pt: "pt_PT",
            ro: "ro_RO",
            ru: "ru_RU",
            sk: "sk_SK",
            sv: "sv_SE",
            tr: "tr_TR"
        }
    }
}),
define("wunderbits/helpers/xss", ["project!core"], function(e) {
    return e.WBSingleton.extend({
        clean: function(e) {
            return e || (e = ""),
            e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
        },
        reverseClean: function(e) {
            return e || (e = ""),
            e = e.replace(/\%/g, "&#37;"),
            e = decodeURIComponent(e),
            e.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#37;/g, "%");
        }
    });
}),
define("wunderbits/WBLanguageManager", ["require", "./lib/dependencies", "vendor/handlebars.runtime", "languages/available", "./helpers/xss", "project!core"], function(e, t, i, n, o, a) {
    function r(e) {
        return "-" === e[2] && (e = e.split("-"),
        e[1] = e[1].toUpperCase(),
        e = e.join("_")),
        e;
    }
    var s = a.mixins.WBEventsMixin
      , l = a.mixins.WBBindableMixin
      , c = window
      , d = t._
      , u = "en_US"
      , m = n.data || {}
      , p = m.aliases || {};
    delete m.aliases;
    var g = {}
      , f = a.WBSingleton.extend({
        mixins: [l, s],
        getKeys: function() {
            return g.keys;
        },
        detectLang: function() {
            for (var e = c.navigator, t = r(e.userLanguage || e.language || u); t in p; )
                t = r(p[t]);
            return t;
        },
        fetchData: function(t) {
            var i = this
              , n = m;
            t = t || u;
            var o = n[t] || n[t.substr(0, 2)];
            o = o || n[u] || n[u.substr(0, 2)],
            e(["languages/" + o.file], function(e) {
                i._dataLoaded(t, o, e);
            });
        },
        getLabel: function() {
            var e = d.toArray(arguments)
              , t = e.shift()
              , n = e[e.length - 1];
            n && n.hash && (n = e.pop());
            var a = '<text rel="' + t + '"';
            return e.length && (a += ' data="' + o.clean(e.join("☃")) + '"'),
            a += "></text>",
            new i.SafeString(a);
        },
        getText: function() {
            var e = this
              , t = d.toArray(arguments)
              , i = g.keys
              , n = t.shift()
              , a = i && i[n];
            if (a) {
                if (t && t.length) {
                    a = e._convertSymbols(a),
                    t = e.localizationception(t);
                    var r = 0;
                    return a = a.replace(/\$([0-9])/g, function() {
                        var e = o.clean(t[r].toString())
                          , i = e;
                        return r++,
                        i;
                    });
                }
                return a;
            }
        },
        getDangerousRawText: function() {
            var e = this
              , t = d.toArray(arguments)
              , i = g.keys
              , n = t.shift()
              , o = i[n];
            if (o) {
                if (t && t.length) {
                    o = e._convertSymbols(o),
                    t = e.localizationception(t);
                    var a = 0;
                    return o = o.replace(/\$([0-9])/g, function() {
                        var e = t[a].toString();
                        return a++,
                        e;
                    });
                }
                return o;
            }
        },
        localizationception: function(e) {
            for (var t, i, n = g.keys, o = 0, a = e.length; a > o; o++)
                t = "" + e[o],
                i = n[t.substr(1)],
                "$" === t[0] && i && (e[o] = i);
            return e;
        },
        _dataLoaded: function(e, t, i) {
            var n = this;
            g.name = i.name,
            g.keys = i.data,
            n.trigger("done", e, t, i);
        },
        _convertSymbols: function(e) {
            var t = 0;
            return e.replace(/\$([^0-9]|$)/g, function(e, i) {
                return "$" + ++t + (i || "");
            });
        }
    });
    return i.registerHelper("localized", f.getLabel),
    f;
}),
define("wunderbits/helpers/date", ["vendor/moment", "../WBLanguageManager", "project!core"], function(e, t, i) {
    return i.WBSingleton.extend({
        humanizeDueDate: function(i, n, o) {
            var a, r = e().sod(), s = e(i).sod(), l = r.diff(s, "days"), c = n || "DD.MM.YYYY";
            if (0 === l)
                a = "today";
            else if (1 === l)
                a = "yesterday";
            else {
                if (-1 !== l)
                    return e(i).format(c);
                a = "tomorrow";
            }
            return a = "label_relative_date_" + a,
            o ? a : t.getLabel(a).toString();
        },
        isHumanizeable: function(t) {
            var i = e().sod()
              , n = e(t).sod()
              , o = i.diff(n, "days");
            return 0 === o || 1 === o || -1 === o ? !0 : !1;
        },
        humanizeDueIn: function(t) {
            var i = e()
              , n = e(t)
              , o = n.diff(i, "minutes");
            return e.duration(o, "minutes").humanize();
        },
        isOverdue: function(t) {
            var i = e().sod().unix()
              , n = e(t).sod().unix();
            return i > n;
        },
        now: function(e) {
            return e || (e = new Date()),
            e.setHours(0),
            e.setMinutes(0),
            e.setSeconds(0),
            e.setMilliseconds(0),
            Math.floor(e.getTime() / 1e3);
        },
        getServerNow: function() {
            var t = e().add("minutes", e().zone()).format("YYYY-MM-DDTHH:mm:ss");
            return t + "Z";
        },
        getServerNowWithMilliseconds: function() {
            var t = e().add("minutes", e().zone()).format("YYYY-MM-DDTHH:mm:ss.SSS");
            return t + "Z";
        },
        convertLocalTimeToServerTime: function(t) {
            var i = e(t).add("minutes", e(t, "YYYY-MM-DDTHH:mm:ss").zone()).format("YYYY-MM-DDTHH:mm:ss");
            return i + "Z";
        },
        convertServerTimeToLocalTime: function(t) {
            t = t.replace("Z", "");
            var i = e(t).subtract("minutes", e(t, "YYYY-MM-DDTHH:mm:ss").zone()).format("YYYY-MM-DDTHH:mm:ss");
            return i;
        },
        convertHourTo24HourTime: function(e, t) {
            t = t ? t.toLowerCase() : null;
            var i = 12 !== e && "pm" === t
              , n = 12 === e && "am" === t;
            return e = i ? e + 12 : n ? 0 : e;
        },
        convertServerDateToLocalDate: function(e) {
            return e;
        },
        convertLocalDateToServerDate: function(e) {
            return e;
        },
        ISOString: function(e) {
            return e ? !(e instanceof Date) && (e = new Date(e)) : e = new Date(),
            e.setMilliseconds(0),
            e.toISOString().replace(".000Z", "Z");
        },
        getDatesFromNow: function(e, t) {
            var i = {};
            return t += "Date",
            i.today = 0 === e[t].diff(e.today, "days"),
            i.yesterday = -1 === e[t].diff(e.today, "days"),
            i.earlier = e[t].diff(e.thisYear) < 0,
            i;
        },
        getDefaultTimeFormat: function(e) {
            switch (e) {
            case "en":
            case "es":
            case "gr":
            case "ja":
            case "ko":
            case "zh":
                return "12 hour";

            default:
                return "24 hour";
            }
        }
    });
}),
define("models/TaskModel", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "project!core", "../collections/ListCollection", "../collections/UserCollection", "./ListResourceBaseModel"], function(e, t, i, n, o, a, r, s) {
    var l = n.WBStateModel
      , c = e._
      , d = new o("/lists/all")
      , u = r.prototype;
    return r.extend({
        storeName: "tasks",
        defaults: {
            type: "task",
            assignee_id: null,
            completed: !1,
            starred: !1,
            hasFiles: !1,
            hasNote: !1,
            hasSubtasks: !1,
            created_at: null,
            completed_at: null,
            recurrence_type: s,
            recurrence_count: s,
            recurring_parent_id: null,
            due_date: null,
            position: s,
            unreadCount: 0
        },
        initialize: function() {
            var e = this;
            u.initialize.apply(e, arguments),
            e.attributes.created_at || e.set({
                created_at: i.convertLocalTimeToServerTime(new Date().toISOString())
            }),
            e["transient"] = new l({
                active: !1,
                selected: !1
            });
        },
        sync: function(e, t, i) {
            var n = this;
            n.id && n.isCompleted() ? u.sync.apply(n, ["delete", t, i]) : u.sync.apply(n, arguments);
        },
        getId: function() {
            var e = this;
            return e.attributes.online_id || e.id;
        },
        getList: function() {
            return d.get(this.attributes.list_id);
        },
        route: function(e) {
            var t = this;
            return e && "/" !== e[0] && (e = "/" + e),
            "tasks/" + t.getId() + (e || "");
        },
        isRouteActive: function() {
            var t = this;
            return 0 === e.currentRoute().indexOf(t.route());
        },
        isInList: function(e) {
            var t = this
              , i = t.collection && t.collection.constructor("/lists/" + e + "/tasks");
            return i && !!i.get(t.id);
        },
        isInSmartList: function(e) {
            var t = this
              , i = "/tasks/filter/" + e
              , n = t.collection && t.collection.constructor(i)
              , o = n && !!n.get(t.id);
            return o;
        },
        isInCurrentList: function() {
            var t = this
              , i = e.listId
              , n = t.isInList(i)
              , o = t.isInSmartList(i);
            return n || o;
        },
        isInWeekCollection: function() {
            var e = this
              , t = e.dueFromNow();
            return !e.isCompleted() && e.isInSmartList("week") && c.isNumber(t) && 6 >= t;
        },
        isInTodayCollection: function() {
            var e = this
              , t = e.dueFromNow();
            return !e.isCompleted() && e.isInSmartList("today") && c.isNumber(t) && 0 >= t;
        },
        isSelected: function() {
            var e = this;
            return !!e["transient"].attributes.selected;
        },
        isActive: function() {
            var e = this;
            return !!e["transient"].attributes.active;
        },
        isStarred: function() {
            return this.attributes.starred;
        },
        isAssigned: function() {
            return this.has("assignee_id");
        },
        isAssignedToMe: function() {
            return e.user.isIDEqual(this.attributes.assignee_id);
        },
        isCompleted: function() {
            return !!this.attributes.completed;
        },
        hasNote: function() {
            return !!this.attributes.hasNote;
        },
        hasSubtasks: function() {
            return this.attributes.hasSubtasks;
        },
        hasFiles: function() {
            return this.get("hasFiles");
        },
        hasComments: function() {
            return this.attributes.hasComments;
        },
        hasUnreadComments: function() {
            return this.attributes.hasUnreadComments;
        },
        hasDueDate: function() {
            return this.has("due_date");
        },
        hasAttachment: function() {
            var e = this;
            return e.hasNote() || e.hasSubtasks() || e.hasFiles() || !1;
        },
        dueFromNow: function() {
            var e = this.attributes.due_date
              , i = t().sod()
              , n = e && t(e, "YYYY-MM-DD").sod();
            return e ? n.diff(i, "days") : !1;
        },
        getHumanFormattedDatesForKey: function(i, n) {
            var o = this;
            if (!i)
                throw new Error("Cannot format date without defining what key to use");
            var a = i + "_on"
              , r = i + "_at"
              , s = i + "Relative"
              , l = {}
              , c = o.attributes[r];
            return n.yesterday ? (l[a] = e.language.getText("label_relative_date_yesterday"),
            l[s] = !0) : n.earlier ? l[a] = c && t(c).format("MMM DD, YYYY") : n.today ? (l[a] = c && t(c).fromNow(),
            l[s] = !0) : l[a] = c && t(c).format("ddd, MMM DD"),
            l;
        },
        getHumanFormattedDates: function() {
            var e = this
              , t = e.isCompleted() ? "completed" : "created"
              , n = t + "At"
              , o = i.getDatesFromNow(e.getSoDDates(), n);
            return e.getHumanFormattedDatesForKey(t, o);
        },
        getSoDDates: function() {
            var e = this
              , i = {
                createdAtDate: t(e.attributes.created_at).startOf("day"),
                thisYear: t().startOf("year"),
                today: t().startOf("day"),
                completedAtDate: s
            };
            if (e.isCompleted()) {
                var n = e.attributes.completed_at && t(e.attributes.completed_at);
                i.completedAtDate = n ? n.startOf("day") : t().startOf("day");
            }
            return i;
        },
        belongsToMe: function() {
            var e = this
              , t = e.getList();
            return t && t.isShared() ? e.isAssignedToMe() : !!t;
        },
        getARIAString: function() {
            var t = this
              , i = t.attributes
              , n = i.title;
            return n += t.getCompletedString(),
            n += t.getCommentsString(),
            n += t.getAttachmentsString(),
            n += t.getDueDateString(),
            n += t.getRepeatString(),
            n += t.getAssignmentString(),
            n += t.getStarredString(),
            n += e.language.getText("aria_more_options_via_tab");
        },
        getAssignmentString: function() {
            var t = this
              , i = "";
            if (t.isAssigned()) {
                var n = t.attributes
                  , o = new a("/lists/" + n.list_id + "/assignables")
                  , r = o.get(n.assignee_id)
                  , s = r && r.attributes.name;
                s && (i += "" + e.language.getText("aria_assigned_to_$", s));
            }
            return i;
        },
        getAttachmentsString: function() {
            var t = "";
            return this.hasAttachment() && (t += " " + e.language.getText("aria_has_attachments")),
            t;
        },
        getCommentsString: function() {
            var t = "";
            return this.hasComments() && (t += " " + e.language.getText("aria_has_comments")),
            t;
        },
        getCompletedString: function() {
            var t = "";
            return this.isCompleted() && (t += " " + e.language.getText("voiceover_task_completed")),
            t;
        },
        getDueDateString: function() {
            var n = this
              , o = n.attributes
              , a = "";
            if (n.hasDueDate()) {
                var r, s = i.convertServerDateToLocalDate(o.due_date), l = s && i.humanizeDueDate(s, null, !0);
                r = i.isHumanizeable(s) && -1 !== l.indexOf("label_relative_date_") ? e.language.getText("label_due_$", "$" + l) : e.language.getText("label_due_on", t(s, "YYYY-MM-DD").format("ddd, MMM D, YYYY")),
                a += " " + r;
            }
            return a;
        },
        getRepeatString: function() {
            var t = this
              , i = t.attributes
              , n = i.recurrence_type
              , o = i.recurrence_count
              , a = "";
            if (n && o && "none" !== n.toLowerCase() && "s" !== c.last(n)) {
                var r;
                1 === o ? r = e.language.getText("label_repeat_" + n).toString() : o > 1 && (r = e.language.getText("label_repeat_" + n + "_$_plural", o).toString()),
                r && (a = " " + r);
            }
            return a;
        },
        getStarredString: function() {
            var t = "";
            return this.isStarred() && (t += " " + e.language.getText("voiceover_task_starred")),
            t;
        }
    });
}),
define("collections/SortedCollection", ["application/runtime", "models/TaskModel", "collections/SortedCollectionMixin", "project!core", "wunderbits/lib/dependencies"], function(e, t, i, n, o) {
    var a = e._
      , r = o.Backbone
      , s = r.Collection.prototype
      , l = n.WBClass
      , c = n.mixins.WBBindableMixin
      , d = r.Collection.extend(a.extend({}, l.prototype, {
        initialize: function() {
            var e = this;
            e.initialize = function() {}
            ,
            l.call(e),
            delete e.initialize,
            l.prototype.initialize.call(e),
            s.initialize.call(e);
        }
    }));
    return c.applyToClass(d),
    i.applyToClass(d),
    d;
}),
define("collections/FilteredTaskCollection", ["models/TaskModel", "collections/SortedCollection"], function(e, t) {
    return t.extend({
        model: e,
        initialize: function(e, i) {
            var n = this;
            t.prototype.initialize.call(n);
            var o = i.sortProperties.filter(function(e) {
                return -1 === i.filterProperties.indexOf(e);
            });
            n.enableSortedCollection(i.sorter, o),
            n.filterFunction = i.filter,
            n.sourceCollection = i.sourceCollection,
            n.allSortProperties = i.sortProperties,
            n.filterEvents = i.filterProperties.map(function(e) {
                return "change:" + e;
            }).join(" ");
        },
        bindRemovingEvents: function() {
            var e = this;
            e.filterEvents.length && e.bindTo(e.sourceCollection, e.filterEvents, e.removeModelIfNeeded),
            e.bindTo(e.sourceCollection, "reset", e.forwardReset),
            e.bindTo(e.sourceCollection, "remove", e.forwardRemove);
        },
        bindAddingEvents: function() {
            var e = this;
            e.filterEvents.length && e.bindTo(e.sourceCollection, e.filterEvents, e.forwardAddIfNotAlreadyAdded),
            e.bindTo(e.sourceCollection, "add", e.forwardAdd);
        },
        removeModelIfNeeded: function(e, t, i) {
            var n = this;
            if (n.filterFunction(e)) {
                var o = Object.keys(e.previousAttributes())
                  , a = o.filter(function(e) {
                    return -1 !== n.allSortProperties.indexOf(e);
                });
                a.length && n.resortModelIfPresentInCollection(e);
            } else
                n.remove(e, i);
        },
        set: function(e, i) {
            var n = this;
            e && (Array.isArray(e) || (e = [e]),
            e = e.filter(n.filterFunction),
            t.prototype.set.call(n, e, i));
        },
        forwardRemove: function(e, t, i) {
            var n = this;
            n.remove(e, i);
        },
        forwardReset: function() {
            var e = this
              , t = e.sourceCollection.models;
            t = t.filter(e.filterFunction),
            e.reset(t);
        },
        forwardAdd: function(e, t, i) {
            var n = this;
            n.add(e, i);
        },
        forwardAddIfNotAlreadyAdded: function(e, t, i) {
            var n = this;
            n.get(e) || n.add(e, i);
        }
    });
}),
define("collections/TaskCollection", ["application/runtime", "vendor/moment", "models/TaskModel", "./BaseCollection", "collections/SortedCollectionMixin", "collections/FilteredTaskCollection", "collections/comparators"], function(e, t, i, n, o, a, r) {
    function s(e, t, i) {
        return e + t * (i + 1);
    }
    var l = e._
      , c = n.prototype
      , d = n.extend({
        model: i,
        initialize: function() {
            var e = this;
            c.initialize.apply(e, arguments),
            e.sorter = null,
            e.isSpecificTaskList() && e._createSubCollections(),
            e._createOverdueCollection();
        },
        checkPositions: function() {},
        _createSubCollections: function() {
            var e = this;
            e.doneTasks && e.openTasks || (e.doneTasks = new a(e.models,{
                sorter: r.completedAt,
                sortProperties: ["completed_at"],
                filter: function(e) {
                    return !!e.attributes.completed;
                },
                filterProperties: ["completed"],
                sourceCollection: e
            }),
            e.openTasks = new a(e.models,{
                sorter: r.position,
                sortProperties: ["position"],
                filter: function(e) {
                    return !e.attributes.completed;
                },
                filterProperties: ["completed"],
                sourceCollection: e
            }),
            e.openTasksWithPosition = new a(e.openTasks.models,{
                sorter: r.position,
                sortProperties: ["position"],
                filter: function(e) {
                    return !isNaN(e.attributes.position);
                },
                filterProperties: ["position"],
                sourceCollection: e.openTasks
            }),
            ["doneTasks", "openTasks", "openTasksWithPosition"].forEach(function(t) {
                e[t].bindRemovingEvents(),
                e[t].bindAddingEvents();
            }));
        },
        _createOverdueCollection: function() {
            var e = this;
            e.overdueTasks = new a(e.models,{
                sorter: r.position,
                sortProperties: ["position"],
                filter: function(e) {
                    var t = e.attributes;
                    if (t.completed || !t.due_date)
                        return !1;
                    var i = e.dueFromNow()
                      , n = l.isNumber(i) && 0 > i;
                    return !!n;
                },
                filterProperties: ["due_date", "completed"],
                sourceCollection: e
            }),
            e.overdueTasks.bindRemovingEvents(),
            e.overdueTasks.bindAddingEvents();
        },
        getSorter: function() {
            var e = this;
            return !e.sorter && e.isSpecificTaskList() && e.enableSortedCollection(r.position, ["position"]),
            e.sorter;
        },
        isSpecificTaskList: function() {
            var e = this;
            return e.url && 0 === e.url.indexOf("/lists/") && e.url.indexOf("/tasks") === e.url.length - 6;
        },
        validateTask: function(e) {
            return !e.attributes.completed;
        },
        filterByIds: function(e) {
            return this.models.filter(function(t) {
                return l.contains(e, t.id);
            });
        },
        getDoneTasks: function() {
            var e = this;
            if (!e.isSpecificTaskList())
                throw new Error("wrong url");
            return e.doneTasks;
        },
        getOpenTasks: function() {
            var e = this;
            if (!e.isSpecificTaskList())
                throw new Error("wrong url");
            return e.openTasks;
        },
        getPreviousPosition: function(e, t) {
            var i = this
              , n = i.openTasksWithPosition
              , o = e && i.get(e);
            return o ? o.attributes.position : n.length ? n.at(0).attributes.position - 10 * (t + 1) : -10;
        },
        getNextPosition: function(e, t) {
            var i = this
              , n = i.openTasksWithPosition
              , o = e && i.get(e);
            return o ? o.attributes.position : n.length ? n.at(n.length - 1).attributes.position + 10 * (t + 1) : 10 * (t + 1);
        },
        getPositionInterpolatorBetweenIds: function(e, t, i) {
            var n = this
              , o = n.getPreviousPosition(e, i)
              , a = n.getNextPosition(t, i)
              , r = (a - o) / (i + 1);
            return s.bind(null, o, r);
        },
        getNewTopPosition: function() {
            var e = this
              , t = e.openTasksWithPosition
              , i = t.at(0)
              , n = e.getPositionInterpolatorBetweenIds(null, i ? i.getId() : null, 1);
            return n(0);
        },
        getNewBottomPosition: function() {
            var e = this
              , t = e.openTasksWithPosition
              , i = t.at(t.length - 1)
              , n = i ? i.getId() : null
              , o = e.getPositionInterpolatorBetweenIds(n, null, 1);
            return o(0);
        },
        moveTasksBetweenIds: function(e, t, i, n) {
            var o = this
              , a = o.getPositionInterpolatorBetweenIds(t, i, e.length);
            o._repositionTasks(e, a, n);
        },
        _repositionTasks: function(e, t, i) {
            var n = this
              , o = n.getListId();
            e.forEach(function(e, a) {
                var r = e.get("list_id") !== o
                  , s = {
                    position: t(a)
                };
                r && (s.list_id = o),
                e.isCompleted() && (s.completed = !1),
                e.set(s, i),
                r && n.add(e, i);
            });
        },
        _shouldInsertTaskAtTop: function(t, i) {
            var n = "top" === e.settings.attributes.new_task_location;
            return t.isStarred() ? !0 : i ? !n : n;
        },
        addTaskToList: function(e, t, i, n) {
            var o = this
              , a = e.attributes.assignee_id
              , r = {
                list_id: o.getListId(),
                isAbleToSync: !1,
                online_list_id: null
            };
            r.position = o._shouldInsertTaskAtTop(e, i) ? o.getNewTopPosition() : o.getNewBottomPosition(),
            t && (!t.isShared() || a && !t.isMemberOfList(a)) && (r.assignee_id = null),
            e.save(r, n);
        },
        getListId: function() {
            var e = this.url.indexOf("/", 1) + 1
              , t = this.url.lastIndexOf("/");
            return this.url.substring(e, t);
        },
        getActiveItem: function() {
            return l.find(this.models, function(e) {
                return e.isActive();
            });
        }
    });
    return o.applyToClass(d),
    d;
}),
define("actions/services/ListLookup", ["project!core", "collections/FolderCollection", "collections/ListCollection", "collections/TaskCollection"], function(e, t, i, n) {
    function o(e, t) {
        var i, n = e.length;
        for (i = 0; n > i; ++i)
            if (t(e[i]))
                return i;
        return -1;
    }
    var a = e.WBClass.prototype
      , r = e.WBClass.extend({
        initialize: function() {
            var e = this;
            a.initialize.apply(e, arguments),
            e.allLists = new i("/lists/all"),
            e.sortableLists = new i("/lists/sortable"),
            e.acceptedLists = new i("/lists/accepted"),
            e.pendingLists = new i("/lists/pending"),
            e.allFolders = new t("/folders/all");
        },
        getTaskCollection: function(e) {
            return new n("/lists/" + e + "/tasks");
        },
        getListModel: function(e) {
            return this.allLists.get(e);
        },
        getFolderModel: function(e) {
            return this.allFolders.findFolderForListId(e);
        },
        getLastListPosition: function() {
            var e = this
              , t = e.sortableLists;
            t.sort();
            var i = t.at(t.length - 1);
            return i ? i.attributes.position : void 0;
        },
        getListBefore: function(e) {
            var t = this
              , i = t.sortableLists.models
              , n = t._getListIndex(i, e);
            return n > 0 ? i[n - 1] : void 0;
        },
        getListAfter: function(e) {
            var t = this
              , i = t.sortableLists.models
              , n = t._getListIndex(i, e);
            return n >= 0 && n < i.length - 1 ? i[n + 1] : void 0;
        },
        _getListIndex: function(e, t) {
            var i = o(e, function(e) {
                return e.id === t;
            });
            return i;
        }
    });
    return r;
}),
define("models/FeatureModel", ["./BaseModel"], function(e) {
    return e.extend({
        storeName: "features",
        defaults: {
            type: "feature"
        },
        neverSyncOut: !0,
        isAbleToSync: function() {
            return !1;
        }
    });
}),
define("collections/FeatureCollection", ["models/FeatureModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/FeatureLookup", ["project!core", "collections/FeatureCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allFeatures = new t("/features/all");
        },
        getFeatureModelByName: function(e) {
            return this.allFeatures.findWhere({
                name: e
            });
        },
        getFeaturesCollection: function() {
            return this.allFeatures;
        },
        isFeatureEnabled: function(e) {
            var t = this
              , i = t.getFeatureModelByName(e);
            return !(!i || "on" !== i.attributes.variant);
        }
    });
    return i;
}),
define("backend/S3Uploader", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "wunderbits/BaseEventEmitter", "project!core"], function(e, t, i, n, o, a) {
    var r = o.WBDeferred
      , s = e._
      , l = 6291456
      , c = e.w_
      , d = e.global
      , u = n.prototype
      , m = d.XMLHttpRequest
      , p = m && "upload"in new m()
      , g = d.File && d.File.prototype || {}
      , f = "slice"in g || "webkitSlice"in g;
    return n.extend({
        initialize: function(e, t) {
            var i = this;
            i.file = e,
            i.setType(),
            i.name = t,
            i.uploaded = 0,
            u.initialize.call(i),
            c.bindAll.apply(i, c.functions(i));
        },
        setType: function() {
            var e = this
              , t = /^text\//;
            e.type = e.file.type || "application/octet-stream",
            t.test(e.type) && (e.type += "; charset=utf-8");
        },
        getOutlet: function() {
            var t = new r();
            return e.sdk.initialized.done(function() {
                var i = e.sdk.getOutlet().uploads;
                t.resolve(i);
            }),
            t.promise();
        },
        upload: function() {
            var e = this;
            e.getOutlet().done(function(t) {
                t.create({
                    file_name: e.name,
                    content_type: e.type,
                    file_size: e.file.size
                }).done(function(t) {
                    e.uploadData = t,
                    e.uploaded = 0,
                    e.writeData = t.part,
                    e.trigger("api:data", t),
                    e._uploadChunked(t);
                }).fail(function() {
                    s.delay(function() {
                        e.retryUpload();
                    }, 5e3);
                });
            });
        },
        retryUpload: function() {
            var e, n = this;
            n.uploadData ? (e = t(n.uploadData.part.date).format("YYYY-MM-DDTHH:mm:ssZ"),
            e = e && i.convertServerTimeToLocalTime(e),
            e = e && t(e).valueOf() - Date.now() < 5e3,
            e ? n.upload() : n._uploadChunked(n.writeData)) : n.upload();
        },
        destroy: function() {},
        _updateStatus: function(e) {
            var t = this;
            1 === e ? t.trigger("change:state", 1) : 2 === e && (t.trigger("change:state", 2),
            t.trigger("upload:complete"));
        },
        _trackProgress: function(e) {
            var t = this
              , i = Math.floor((t.uploaded + e) / t.file.size * 100);
            t.progess = i,
            t.trigger("change:progress", i);
        },
        _handleAPIError: function(e) {
            console.error("S3Uploader:_handleAPIError", arguments);
            var t = this;
            e = e || {},
            t.trigger("api:error", e);
        },
        _uploadError: function(e, t) {
            console.error("S3Uploader:_uploadError", arguments);
            var i = this;
            "error:fileDeleted" === t ? i.trigger(t) : i.trigger("upload:error", e);
        },
        _uploadChunked: function(e) {
            var t, i = this, n = i.file, o = 0;
            i.uploadId = e.id,
            i.chunks = [],
            i.writeInfos = [];
            for (var a = n && (n.slice || n.webkitSlice); o < n.size; )
                t = a.call(n, o, o += l),
                i.chunks.push(t);
            i.trigger("change:state", 1),
            i._requestChunkSignature(0);
        },
        _requestChunkSignature: function(e) {
            var t = this;
            0 === e ? (t.writeInfos[e] = t.uploadData.part,
            t._uploadChunk(e)) : t.getOutlet().done(function(i) {
                i.getPart(t.uploadId, e + 1).done(function(i) {
                    t.writeInfos[e] = i.part,
                    t._uploadChunk(e);
                }).fail(t._handleAPIError, t);
            });
        },
        _uploadChunk: function(t) {
            var i = this
              , n = i.writeInfos[t]
              , o = i.chunks[t];
            if (o === a)
                return void i.trigger("error:fileDeleted");
            var r = e.io.upload(n.url, o, {
                "x-amz-date": n.date,
                Authorization: n.authorization
            });
            r.fail(i._uploadError, i),
            i.bindTo(r, "change:progress", "_trackProgress"),
            i.once("upload:abort", r.abort, r),
            i.once("upload:start", r.send, r),
            r.done(function(e) {
                i.uploaded += o.size,
                i.chunks[t] = e.getResponseHeader("ETag"),
                t < i.chunks.length - 1 ? i._requestChunkSignature(t + 1) : i.getOutlet().done(function(e) {
                    e.finish(i.uploadId).done(function() {
                        i.trigger("change:state", 2, i.uploadId, i.chunks),
                        i.trigger("upload:complete");
                    }).fail(i._handleAPIError, i);
                });
            });
        },
        canUpload: function() {
            return p;
        },
        hasFileSlicing: function() {
            return f;
        }
    });
}),
define("models/FileModel", ["application/runtime", "backend/S3Uploader", "./BaseModel", "project!core", "vendor/moment", "wunderbits/helpers/date"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = n.WBDeferred
      , c = i.prototype;
    return i.extend({
        storeName: "files",
        defaults: {
            type: "file",
            task_id: r,
            list_id: r,
            upload_id: r,
            user_id: r,
            file_name: r,
            content_type: r,
            file_size: r,
            local_created_at: r,
            updated_at: r,
            url: r,
            revision: r,
            preview: r
        },
        initialize: function(e, t) {
            t = t || {};
            var i = this;
            if (c.initialize.apply(i, arguments),
            i.file = t.file,
            i.task = t.task,
            i.file && i.task) {
                var n = new l();
                i.task.attributes.online_id ? n.resolve() : i.bindOnceTo(i.task, "change:online_id", n.resolve, n),
                n.done(function() {
                    i.uploadWhenOnline();
                });
            } else
                i.attributes.online_id || i.attributes.file_provider || s.defer(function() {
                    i.destroy({
                        fromSync: !0
                    });
                });
            i.on("change:state", i.onStateChange),
            i.on("destroy", function() {
                i.aborted = !0,
                i.uploader && i.uploader.trigger("upload:abort");
            });
        },
        destroy: function(e) {
            var t = e || {}
              , i = this;
            !t.fromStorage && c.destroy.apply(i, arguments);
        },
        getOnlinePromise: function() {
            var t = this
              , i = new l()
              , n = e.isOnline();
            if (n)
                i.resolve();
            else
                var o = t.bindTo(e.state, "change:online", function() {
                    e.isOnline() && (i.resolve(),
                    t.unbindFrom(o));
                });
            return i.promise();
        },
        getOutlet: function() {
            var t = new l();
            return e.sdk.initialized.done(function() {
                var i = e.sdk.getOutlet()
                  , n = i.files
                  , o = i.previews;
                t.resolve(n, o);
            }),
            t.promise();
        },
        fetchPreview: function() {
            var e = this
              , t = new l();
            if (!e.fetchingPreview) {
                e.fetchingPreview = !0;
                var i = e.attributes.online_id;
                i ? e.getOutlet().done(function(n, o) {
                    o.getPreview(i, "web", "retina").done(function(i, n) {
                        204 === n && (i = {}),
                        e.save({
                            preview: i
                        }, {
                            fromSync: !0
                        }),
                        t.resolve();
                    }).always(function() {
                        e.fetchingPreview = !1;
                    }).fail(function(i, n) {
                        404 !== n && setTimeout(function() {
                            e.getPreviewUrl().done(t.resolve, t);
                        }, 5e3);
                    });
                }) : e.fetchingPreview = !1;
            }
            return t.promise();
        },
        getPreviewUrl: function() {
            var e, t = this, i = new l(), n = t.attributes, r = n.preview;
            return r && (e = o(n.expires_at).format("YYYY-MM-DDTHH:mm:ssZ"),
            e = e && a.convertServerTimeToLocalTime(e),
            e = e && o(e).valueOf() < Date.now()),
            !r || e ? t.fetchPreview().done(function() {
                i.resolve(n.preview && n.preview.url);
            }) : i.resolve(r.url),
            i.promise();
        },
        uploadWhenOnline: function() {
            var e = this
              , t = e.getOnlinePromise();
            t.done(function() {
                e.defer("upload");
            });
        },
        retryUpload: function() {
            var e = this;
            if (!e.destroyed && !e.aborted && e.uploader) {
                var t = e.getOnlinePromise();
                t.done(function() {
                    e.uploader.retryUpload(),
                    e.trigger("upload:retrying");
                });
            }
        },
        upload: function() {
            var i = this
              , n = i.attributes.file_name
              , o = new t(i.file,n);
            i.uploader = o,
            i.stateBind = i.bindTo(o, "change:state", i.onUploadStateChange),
            i.trigger("hasUploader", o),
            o.once("api:data", function() {
                i.uploadErrorBind = i.bindTo(o, "upload:error", i.retryUpload),
                i.sourceFileDeletedBind = i.bindTo(o, "error:fileDeleted", i.onSourceFileDelete),
                o.publish("upload:start");
            });
            var a = function(e) {
                var t;
                e.response && e.response.data && e.response.data.error && (t = e.response.data.error),
                i.handleUploadError(n, t);
            };
            o.once("api:error", a),
            o.upload();
            var r = n.split(".");
            r.length > 1 && e.trigger("analytics:Files:UploadExtension", r[r.length - 1]);
        },
        onSourceFileDelete: function() {
            var t = this
              , i = function() {
                var n = e.focus;
                if ("confirmation" !== n) {
                    var o = s.escape(t.attributes.file_name);
                    e.trigger("modal:confirm", {
                        customTitle: e.language.getLabel("file_uploaded_unsuccessfully", o).toString(),
                        customText: e.language.getLabel("file_uploaded_failed_deleted", o).toString(),
                        confirmText: e.language.getLabel("button_ok").toString(),
                        hideCancel: !0,
                        confirm: function() {
                            t.remoteDestroy(),
                            e.trigger("focus:set", n);
                        }
                    });
                } else
                    setTimeout(i, 1e3);
            };
            i();
        },
        handleUploadError: function(t, i) {
            var n = this;
            i = i || "";
            var o = function() {
                var a = e.focus;
                "confirmation" !== a ? e.trigger("modal:confirm", {
                    customTitle: e.language.getLabel("file_uploaded_unsuccessfully", s.escape(t)).toString(),
                    customText: i,
                    confirmText: e.language.getLabel("button_ok").toString(),
                    hideCancel: !0,
                    confirm: function() {
                        n.remoteDestroy(),
                        e.trigger("focus:set", a);
                    }
                }) : setTimeout(o, 1e3);
            };
            o();
        },
        onUploadStateChange: function(e, t, i) {
            var n = this;
            1 === e ? n.save({
                state: 1
            }, {
                fromSync: !0
            }) : 2 === e && n.save({
                state: 2,
                upload_id: t,
                etags: i
            }, {
                fromSync: !0
            });
        },
        onStateChange: function() {
            var e = this;
            2 === e.attributes.state && (e.stateBind && e.unbindFrom(e.stateBind),
            e.uploadErrorBind && e.unbindFrom(e.uploadErrorBind),
            e.sourceFileDeletedBind && e.unbindFrom(e.sourceFileDeletedBind),
            e.uploader && delete e.uploader,
            e.file && delete e.file);
        },
        remoteDestroy: function() {
            var e = this;
            console.debug("file deleted, here is where from:"),
            console.trace(),
            e.destroy();
        },
        trackIsAbleToSync: function() {
            var e = this;
            e.ableToSyncBind = e.bindOnceTo(e, "change:upload_id", "makeAbleToSync");
        },
        isAbleToSync: function() {
            var e = this
              , t = this.attributes
              , i = !!t.upload_id || !!t.file_provider
              , n = i || !!t.online_id || !!t.isAbleToSync;
            return n || e.ableToSyncBind || e.trackIsAbleToSync(),
            n;
        }
    });
}),
define("collections/BaseCollections/SortedByCreatedAtCollection", ["../BaseCollection", "wunderbits/WBModel", "vendor/moment"], function(e, t, i) {
    var n = "YYYY-MM-DDTHH:mm:ss.SSSZ";
    return e.extend({
        model: t,
        newestOnTop: !0,
        createdAtCache: {},
        getValueOfCreatedAt: function(e, t) {
            var o, a = this, r = t ? a.localCreatedAtCache : a.createdAtCache, s = t ? "local_created_at" : "created_at";
            if (e.id in r)
                o = r[e.id];
            else {
                var l = e.attributes;
                o = r[e.id] = l[s] ? i(l[s], n).valueOf() : 0;
            }
            return o;
        },
        comparator: function(e, t) {
            var i = this;
            if (e.attributes.created_at && t.attributes.created_at) {
                var n = i.getValueOfCreatedAt(e)
                  , o = i.getValueOfCreatedAt(t);
                return n > o ? i.newestOnTop ? -1 : 1 : o > n ? i.newestOnTop ? 1 : -1 : i.sortByLocalCreate(e, t);
            }
            return i.sortByLocalCreate(e, t);
        },
        localCreatedAtCache: {},
        sortByLocalCreate: function(e, t) {
            var i = this
              , n = i.getValueOfCreatedAt(e, !0)
              , o = i.getValueOfCreatedAt(e, !0);
            if (n > o)
                return i.newestOnTop ? -1 : 1;
            if (o > n)
                return i.newestOnTop ? 1 : -1;
            var a = e.attributes.id
              , r = t.attributes.id;
            return a > r ? i.newestOnTop ? -1 : 1 : r > a ? i.newestOnTop ? 1 : -1 : 0;
        }
    });
}),
define("collections/FileCollection", ["models/FileModel", "./BaseCollections/SortedByCreatedAtCollection"], function(e, t) {
    return t.extend({
        model: e,
        newestOnTop: !0
    });
}),
define("actions/services/FileLookup", ["project!core", "collections/FileCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allFiles = new t("/files/all");
        },
        getFileModel: function(e) {
            return this.allFiles.get(e);
        },
        getFileCollection: function(e) {
            return new t("/tasks/" + e + "/files");
        },
        getFileModels: function(e) {
            var t = this;
            return e.map(function(e) {
                return t.getFileModel(e);
            });
        }
    });
    return i;
}),
define("actions/services/FolderLookup", ["project!core", "collections/FolderCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            var e = this;
            e.allFolders = new t("/folders/all");
        },
        getFolderModel: function(e) {
            return this.allFolders.get(e);
        }
    });
    return i;
}),
define("collections/TemporaryInviteCollection", ["./UserCollection", "models/OtherUserModel", "./BaseCollection"], function(e, t, i) {
    return i.extend({
        model: t.extend({
            storeName: "none"
        }),
        contacts: new e("/users/all"),
        sync: function() {},
        comparator: function(e) {
            var t = this
              , i = t.contacts.get(e.id);
            return i && i.attributes.name || e.id;
        }
    });
}),
define("actions/services/MembershipLookup", ["application/runtime", "project!core", "collections/MembershipCollection", "collections/TemporaryInviteCollection"], function(e, t, i, n) {
    var o = t.WBClass.extend({
        initialize: function() {
            var e = this;
            e.allMemberships = new i("/memberships/all"),
            e.temporaryMemberships = new n("/memberships/temporary");
        },
        getOwnMembershipModelForList: function(t) {
            var i = this.getMembershipCollection(t);
            return i.findWhere({
                user_id: "" + e.user.id
            });
        },
        getMembershipModel: function(e) {
            return this.allMemberships.get(e);
        },
        getPendingMemberships: function() {
            return new i("/memberships/me/pending");
        },
        getMembershipCollection: function(e) {
            return new i("/lists/" + e + "/memberships");
        },
        getTemporaryMembershipCollection: function() {
            return new i("/memberships/temporary");
        }
    });
    return o;
}),
define("actions/services/TaskLookup", ["application/runtime", "project!core", "collections/TaskCollection"], function(e, t, i) {
    function n(e, t) {
        var i, n = e.length;
        for (i = 0; n > i; ++i)
            if (t(e[i]))
                return i;
        return -1;
    }
    var o = e._
      , a = t.WBClass.extend({
        initialize: function() {
            var e = this;
            e.allTasks = new i("/tasks/all"),
            e.completedTasks = new i("/tasks/filter/completed"),
            e.searchTasks = new i("/tasks/search");
        },
        getTaskModel: function(e) {
            return this.allTasks.get(e);
        },
        getCompletedTaskModel: function(e) {
            return this.completedTasks.get(e);
        },
        getCurrentSearchTaskCollection: function() {
            return new i("/search/" + encodeURIComponent(e.currentSearchTerm));
        },
        getSmartListTaskCollection: function(e, t) {
            var n = "/tasks/filter/" + e;
            return t && (n += "/" + t),
            new i(n);
        },
        getTaskCollection: function(e) {
            return new i("/lists/" + e + "/tasks");
        },
        getTaskModels: function(e) {
            var t = this;
            return o.compact(e.map(function(e) {
                return t.getTaskModel(e);
            }));
        },
        getLastTaskPosition: function(e) {
            var t = new i("/lists/" + e + "/tasks");
            t.sort();
            var n = t.at(t.length - 1);
            return n ? n.attributes.position : void 0;
        },
        getTaskAfter: function(e) {
            var t = this
              , n = t.getTaskModel(e);
            if (n) {
                var o = new i("/lists/" + n.attributes.list_id + "/tasks").models
                  , a = t._getTaskIndex(o, e);
                if (a >= 0 && a < o.length - 1)
                    return o[a + 1];
            }
        },
        _getTaskIndex: function(e, t) {
            var i = n(e, function(e) {
                return e.id === t;
            });
            return i;
        }
    });
    return a;
}),
define("models/TaskResourceBaseModel", ["models/BaseModel", "collections/TaskCollection"], function(e, t) {
    return e.extend({
        isAbleToSync: function() {
            var e = this
              , i = this.attributes
              , n = new t("/tasks/all")
              , o = n.get(i.task_id)
              , a = !1;
            o && (a = !!o.attributes.online_id);
            var r = !!i.online_id || !!i.isAbleToSync || a;
            return r || e.ableToSyncBind || e.trackIsAbleToSync(),
            r;
        },
        trackIsAbleToSync: function() {
            var e, i, n = this, o = n.attributes;
            o.task_id && (e = new t("/tasks/all"),
            i = e.get(o.task_id),
            i && (n.ableToSyncBind = n.bindOnceTo(i, "change:online_id", function() {
                n.delay("makeAbleToSync");
            })));
        }
    });
}),
define("models/TaskCommentModel", ["application/runtime", "wunderbits/helpers/strings", "models/TaskResourceBaseModel"], function(e, t, i, n) {
    var o = i.prototype;
    return i.extend({
        storeName: "taskComments",
        defaults: {
            type: "task_comment",
            author: n,
            text: n,
            local_created_at: n,
            read: n,
            revision: n
        },
        observes: {
            self: {
                "change:local_created_at": "forceDateFormat"
            }
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(e, arguments),
            e.forceDateFormat();
        },
        isRead: function() {
            return !!this.attributes.read;
        },
        canDelete: function() {
            return !!this.attributes.canDelete;
        },
        forceDateFormat: function() {
            var e = this
              , i = e.attributes
              , n = i.local_created_at;
            n = n && n.replace(/\.([\d]*)Z/, function(e, i) {
                return i = i.substr(0, 3),
                i = t.pad(i, 3, !0),
                "." + i + "Z";
            }),
            e.save("local_created_at", n);
        }
    });
}),
define("collections/TaskCommentsCollection", ["application/runtime", "models/TaskCommentModel", "./BaseCollections/SortedByCreatedAtCollection", "vendor/moment"], function(e, t, i, n) {
    var o = e._;
    return i.extend({
        model: t,
        newestOnTop: !1,
        getUserCreatedModels: function() {
            var t = this
              , i = n()
              , a = o.where(t.models, function(t) {
                return e.user.isIDEqual(t.attributes.author.id) && 0 === n(t.attributes.created_at).diff(i, "days");
            });
            return a;
        }
    });
}),
define("models/TaskCommentsStateModel", ["models/BaseModel"], function(e) {
    return e.extend({
        storeName: "taskCommentsStates",
        defaults: {
            type: "task_comments_state"
        },
        isAbleToSync: function() {
            return !0;
        }
    });
}),
define("collections/TaskCommentsStateCollection", ["models/TaskCommentsStateModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/CommentLookup", ["project!core", "collections/TaskCommentsCollection", "collections/TaskCommentsStateCollection"], function(e, t, i) {
    var n = e.WBClass.extend({
        initialize: function() {
            var e = this;
            e.allComments = new t("/taskComments/all");
        },
        getCommentModel: function(e) {
            var t = this;
            return t.allComments.get(e);
        },
        getCommentsCollection: function(e) {
            return new t("/tasks/" + e + "/comments");
        },
        getCommentsStateCollection: function(e) {
            return new i("/tasks/" + e + "/taskCommentsStates");
        }
    });
    return n;
}),
define("models/SubtaskModel", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "models/TaskResourceBaseModel"], function(e, t, i, n, o) {
    var a = n.prototype;
    return n.extend({
        storeName: "subtasks",
        defaults: {
            type: "subtask",
            created_at: null,
            completed: !1,
            completed_at: null,
            task_id: null,
            position: o
        },
        initialize: function() {
            var e = this;
            if (a.initialize.apply(e, arguments),
            !e.attributes.created_at) {
                var t = new Date().toISOString();
                e.set({
                    created_at: i.convertLocalTimeToServerTime(t)
                });
            }
        },
        isCompleted: function() {
            return !!this.attributes.completed;
        },
        getHumanFormattedDatesForKey: function(i, n) {
            var o = this;
            if (!i)
                throw new Error("Cannot format date without defining what key to use");
            var a = i + "_on"
              , r = i + "_at"
              , s = i + "Relative"
              , l = {};
            return n.yesterday ? (l[a] = e.language.getText("label_relative_date_yesterday"),
            l[s] = !0) : n.earlier ? l[a] = t(o.get(r)).format("MMM DD, YYYY") : n.today ? (l[a] = t(o.get(r)).fromNow(),
            l[s] = !0) : l[a] = t(o.get(r)).format("ddd, MMM DD"),
            l;
        },
        getHumanFormattedDates: function() {
            var e = this
              , t = e.isCompleted() ? "completed" : "created"
              , n = t + "At"
              , o = i.getDatesFromNow(e.getSoDDates(), n);
            return e.getHumanFormattedDatesForKey(t, o);
        },
        getSoDDates: function() {
            var e = this
              , i = {
                createdAtDate: t(e.attributes.created_at).startOf("day"),
                thisYear: t().startOf("year"),
                today: t().startOf("day"),
                completedAtDate: o
            };
            if (e.isCompleted()) {
                var n = e.attributes.completed_at && t(e.attributes.completed_at);
                i.completedAtDate = n ? n.startOf("day") : t().startOf("day");
            }
            return i;
        }
    });
}),
define("collections/SubtaskCollection", ["application/runtime", "models/SubtaskModel", "collections/SortedCollectionMixin", "./BaseCollection"], function(e, t, i, n) {
    var o, a, r, s, l = n.prototype, c = n.extend({
        model: t,
        initialize: function() {
            var e = this;
            l.initialize.apply(e, arguments);
        },
        getSorter: function() {
            var e = this;
            return e.sorter || e.enableSortedCollection(e.handleSorting, ["position"]),
            e.sorter;
        },
        handleSorting: function(e, t) {
            o = t.attributes,
            a = e.attributes;
            var i = !isNaN(o.position)
              , n = !isNaN(a.position);
            if (i && n)
                r = o.position,
                s = a.position;
            else {
                if (i && !n)
                    return -1;
                if (!i && n)
                    return 1;
                r = o.id,
                s = a.id;
            }
            return r > s ? 1 : s > r ? -1 : 0;
        },
        getNewBottomPosition: function() {
            var e, t = this;
            return t.models.length ? (e = t.models[t.models.length - 1],
            e.attributes.position + 10) : 0;
        }
    });
    return i.applyToClass(c),
    c;
}),
define("actions/services/SubTaskLookup", ["project!core", "collections/SubtaskCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            var e = this;
            e.allSubTasks = new t("/subtasks/all");
        },
        getSubTaskModel: function(e) {
            var t = this;
            return t.allSubTasks.get(e);
        },
        getSubTaskCollection: function(e) {
            return new t("/tasks/" + e + "/subtasks");
        },
        getSubTaskModels: function(e) {
            var t = this;
            return e.map(function(e) {
                return t.getSubTaskModel(e);
            });
        }
    });
    return i;
}),
define("models/ReminderModel", ["models/TaskResourceBaseModel"], function(e) {
    return e.extend({
        storeName: "reminders",
        defaults: {
            type: "reminder",
            date: null,
            task_id: null
        },
        observes: {
            self: {
                "change:date": "dateChanged"
            }
        },
        dateChanged: function() {
            var e = this;
            e.set({
                reminded: !1
            });
        }
    });
}),
define("collections/ReminderCollection", ["models/ReminderModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/ReminderLookup", ["project!core", "collections/ReminderCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allReminders = new t("/reminders/all");
        },
        getReminderModel: function(e) {
            return this.allReminders.get(e);
        },
        getReminderCollectionForTask: function(e) {
            return new t("/tasks/" + e + "/reminders");
        },
        getReminderModelForTask: function(e) {
            return this.getReminderCollectionForTask(e).models[0];
        }
    });
    return i;
}),
define("models/NoteModel", ["models/TaskResourceBaseModel"], function(e, t) {
    return e.extend({
        storeName: "notes",
        defaults: {
            type: "note",
            task_id: t,
            content: t
        }
    });
}),
define("collections/NoteCollection", ["models/NoteModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/NoteLookup", ["project!core", "collections/NoteCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allNotes = new t("/notes/all");
        },
        getNoteModel: function(e) {
            return this.allNotes.get(e);
        },
        getNoteCollectionForTask: function(e) {
            return new t("/tasks/" + e + "/notes");
        },
        getNoteModelForTask: function(e) {
            return this.getNoteCollectionForTask(e).models[0];
        }
    });
    return i;
}),
define("actions/services/UserLookup", ["project!core", "collections/UserCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allUsers = new t("/users/all");
        },
        getUserModel: function(e) {
            return this.allUsers.get(e);
        },
        getAssignableCollectionForList: function(e) {
            return new t("/lists/" + e + "/assignables");
        }
    });
    return i;
}),
define("actions/services/Date", ["project!core", "wunderbits/helpers/date"], function(e, t) {
    var i = e.WBClass.extend({
        getServerNow: function() {
            return t.getServerNow();
        },
        today: function() {
            return new Date();
        },
        tomorrow: function() {
            var e = new Date();
            return e.setDate(e.getDate() + 1),
            e;
        }
    });
    return i;
}),
define("models/NotificationModel", ["models/BaseModel"], function(e) {
    return e.extend({
        storeName: "desktopNotifications",
        defaults: {
            type: "desktop_notification"
        },
        neverSyncOut: !0,
        isAbleToSync: function() {
            return !1;
        }
    });
}),
define("collections/NotificationCollection", ["models/NotificationModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/DesktopNotificationLookup", ["project!core", "collections/NotificationCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            var e = this;
            e.allNotifications = new t("/notifications/all");
        },
        getNotificationModel: function(e) {
            var t = this;
            return t.allNotifications.get(e);
        },
        getReminderNotificationForTask: function(e) {
            var t = this;
            return t.allNotifications.findWhere({
                url: "wunderlist://tasks/" + e,
                event: "ReminderDue"
            });
        }
    });
    return i;
}),
define("models/ActivitiesModel", ["./LocallyImmutableModel"], function(e) {
    return e.extend({
        storeName: "activities",
        defaults: {
            type: "activities"
        },
        isAbleToSync: function() {
            return !1;
        }
    });
}),
define("collections/ActivitiesCollection", ["models/ActivitiesModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("models/ConversationsModel", ["models/LocallyImmutableModel"], function(e) {
    return e.extend({
        storeName: "conversations",
        defaults: {
            type: "conversations"
        },
        neverSyncOut: !0,
        isAbleToSync: function() {
            return !1;
        }
    });
}),
define("collections/ConversationsCollection", ["models/ConversationsModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("models/UnreadActivitiesCountModel", ["models/BaseModel"], function(e) {
    return e.extend({
        storeName: "unreadActivitiesCounts",
        defaults: {
            type: "unread_activities_count"
        },
        neverSyncOut: !0,
        isAbleToSync: function() {
            return !1;
        }
    });
}),
define("collections/UnreadActivitiesCountCollection", ["models/UnreadActivitiesCountModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/ActivityCenterLookup", ["collections/ActivitiesCollection", "collections/ConversationsCollection", "collections/UnreadActivitiesCountCollection", "project!core"], function(e, t, i, n) {
    var o = n.WBClass.extend({
        initialize: function() {
            var n = this;
            n.allConversations = new t("/conversations/all"),
            n.allActivities = new e("/activities/all"),
            n.allUnreadActivitiesCounts = new i("/unreadActivitiesCounts/all");
        },
        getUnreadCountsModel: function() {
            return this.allUnreadActivitiesCounts.at(0);
        },
        getStreamCollection: function(e) {
            var t = this;
            return "conversations" === e ? t.allConversations : "activities" === e ? t.allActivities : void 0;
        },
        getStreamModel: function(e) {
            return this.getStreamCollection(e).at(0);
        }
    });
    return o;
}),
define("models/ProductModel", ["wunderbits/WBModel"], function(e) {
    return e.extend({
        storeName: "none",
        defaults: {
            type: "Product"
        },
        idAttribute: "product_id"
    });
}),
define("collections/ProductsCollection", ["models/ProductModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/ProductLookup", ["project!core", "collections/ProductsCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allProducts = new t("/products/all");
        },
        getProductModel: function(e) {
            return this.allProducts.findWhere({
                id: e
            });
        }
    });
    return i;
}),
define("models/ServiceModel", ["./BaseModel"], function(e) {
    return e.extend({
        storeName: "services",
        defaults: {
            type: "service",
            provider_id: null,
            provider_type: null,
            username: null,
            oauth_access_token: null
        },
        isAbleToSync: function() {
            return !0;
        }
    });
}),
define("collections/ServiceCollection", ["models/ServiceModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/ServiceLookup", ["project!core", "collections/ServiceCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allServices = new t("/services/all");
        },
        getServiceModel: function(e) {
            return this.allServices.get(e);
        }
    });
    return i;
}),
define("actions/services/SmartcardsLookup", ["application/runtime", "project!core"], function(e, t) {
    var i = e.global.navigator
      , n = t.WBDeferred
      , o = t.WBClass.extend({
        getLocationData: function() {
            var e = new n()
              , t = e.resolve.bind(e)
              , o = e.reject.bind(e, void 0);
            return i.geolocation.getCurrentPosition(t, o, {
                enableHighAccuracy: !0,
                timeout: 5e3
            }),
            e.promise();
        },
        fetchSmartcards: function(t) {
            var i = this
              , o = new n()
              , a = i.getLocationData();
            return a.always(function(i) {
                var n = i && i.coords
                  , a = n && n.latitude
                  , r = n && n.longitude;
                e.sdk.getOutlet().smartcards.forTask(t, a, r).done(o.resolve, o).fail(o.reject, o);
            }),
            o.promise();
        }
    });
    return o;
}),
define("models/SubscriptionModel", ["./BaseModel"], function(e) {
    return e.extend({
        storeName: "subscriptions",
        defaults: {
            type: "subscription"
        },
        neverSyncOut: !0,
        isAbleToSync: function() {
            return !1;
        },
        getTeamMembers: function() {
            return this.attributes.members || [];
        },
        resetTeamStatus: function() {}
    });
}),
define("collections/SubscriptionCollection", ["models/SubscriptionModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/SubscriptionLookup", ["project!core", "collections/SubscriptionCollection"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function() {
            this.allSubscriptions = new t("/subscriptions/all");
        },
        getSubscriptionModel: function(e) {
            return this.allSubscriptions.get(e);
        }
    });
    return i;
}),
define("models/InvoiceModel", ["wunderbits/WBModel"], function(e) {
    return e.extend({
        storeName: "invoices",
        defaults: {
            type: "Invoice"
        },
        idAttribute: "number"
    });
}),
define("collections/InvoiceCollection", ["models/InvoiceModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("actions/services/InvoiceLookup", ["application/runtime", "project!core", "collections/InvoiceCollection"], function(e, t, i) {
    var n = t.WBClass.extend({
        initialize: function() {
            this.allInvoices = new i("/invoices/all");
        },
        fetchInvoices: function() {
            var i = this
              , n = new t.WBDeferred();
            return e.sdk.getOutlet().invoices.all().done(function(e) {
                i.allInvoices.reset(e),
                n.resolve(i.allInvoices);
            }),
            n.promise();
        },
        getInvoiceModel: function(e) {
            return this.allInvoices.findWhere({
                id: e
            });
        }
    });
    return n;
}),
define("actions/Duplication", ["application/runtime", "project!core"], function(e, t) {
    var i = t.WBStateModel
      , n = t.WBDeferred
      , o = t.lib.toArray
      , a = t.lib.when
      , r = t.mixins.WBBindableMixin
      , s = t.WBClass.prototype
      , l = t.WBClass.extend({
        mixins: [r],
        initialize: function(e, t, i, n, o, a, r, l, c, d, u, m) {
            var p = this;
            s.initialize.apply(p, arguments),
            p.createList = e,
            p.createTask = t,
            p.createSubtask = i,
            p.createReminder = n,
            p.createNote = o,
            p.repositionTask = a,
            p.listLookup = r,
            p.taskLookup = l,
            p.reminderLookup = c,
            p.subtaskLookup = d,
            p.noteLookup = u,
            p.sidebarActions = m,
            p.initializeState();
        },
        initializeState: function() {
            var e = this;
            e.state = new i({
                copiedTaskIds: [],
                copiedListIds: [],
                copiedTasksCount: 0,
                copiedListsCount: 0
            }),
            e.bindTo(e.state, "change:copiedTaskIds change:copiedListIds", "_updateCounts");
        },
        _updateCounts: function() {
            var e = this
              , t = e.state.attributes
              , i = t.copiedTaskIds
              , n = t.copiedListIds;
            e.state.save({
                copiedTasksCount: i ? i.length : 0,
                copiedListsCount: n ? n.length : 0
            });
        },
        duplicateNote: function(e, t) {
            var i = this
              , o = new n()
              , a = i.noteLookup.getNoteModelForTask(e);
            return a ? i.createNote.createNote(a.attributes.content, t).done(o.resolve, o).fail(o.reject, o) : o.reject(),
            o.promise();
        },
        duplicateReminder: function(e, t) {
            var i = this
              , o = new n()
              , a = i.reminderLookup.getReminderModelForTask(e);
            return a ? i.createReminder.createReminder(a.attributes.date, t).done(o.resolve, o).fail(o.reject, o) : o.reject(),
            o.promise();
        },
        duplicateSubtasks: function(e, t) {
            var i = this
              , o = new n()
              , r = i.subtaskLookup.getSubTaskCollection(e);
            if (r) {
                var s = r.models.map(function(e, n) {
                    var o = e.attributes;
                    return i.createSubtask.createSubtask(o.title, 10 * n, t);
                });
                a(s).done(o.resolve, o).fail(o.reject, o);
            } else
                o.reject();
            return o.promise();
        },
        duplicateTaskResources: function(e, t) {
            var i = this;
            return a([i.duplicateSubtasks(e, t), i.duplicateReminder(e, t), i.duplicateNote(e, t)]).promise();
        },
        duplicateTasks: function(e, t) {
            var i = this
              , n = i.taskLookup.getTaskCollection(e);
            n && n.models.forEach(function(e) {
                var n = e.attributes
                  , o = {
                    frequency: n.recurrence_count,
                    interval: n.recurrence_type
                };
                i.createTask.createTask(n.title, t, n.starred, n.due_date, o, void 0, void 0, n.position, void 0, n.completed).done(function(t) {
                    i.duplicateTaskResources(e.id, t.id);
                });
            });
        },
        duplicateList: function(e) {
            var t = this
              , i = new n()
              , o = t.listLookup.getListModel(e);
            if (o) {
                var a = t._getDuplicatedListTitle(o);
                t.createList.createList(a).done(function(e) {
                    t.duplicateTasks(o.id, e.id),
                    t._positionNewList(e, o),
                    i.resolve(e);
                });
            } else
                i.reject();
            return i.promise();
        },
        pasteTasks: function(e) {
            var t = this
              , i = new n()
              , o = t.taskLookup.getTaskModel(e)
              , a = o && t.listLookup.getListModel(o.attributes.list_id)
              , r = t.state.attributes.copiedTaskIds;
            return r && r.length && o && a ? t._createPastedTasks(a, e).always(i.resolve, i) : i.resolve(),
            i.promise();
        },
        pasteTasksToList: function(e) {
            var t = this
              , i = new n()
              , o = t.listLookup.getListModel(e)
              , a = t.state.attributes.copiedTaskIds;
            return o && a && a.length ? t._createPastedTasks(o).always(i.resolve, i) : i.resolve(),
            i.promise();
        },
        copyTasks: function(e) {
            Array.isArray(e) && this.state.save({
                copiedTaskIds: e,
                copiedListIds: []
            });
        },
        copyLists: function(e) {
            Array.isArray(e) && this.state.save({
                copiedListIds: e,
                copiedTaskIds: []
            });
        },
        pasteLists: function(e) {
            var t = this
              , i = new n()
              , o = t.listLookup.getListModel(e)
              , a = t.state.attributes.copiedListIds;
            return a && a.length && o && t._createPastedLists(o).always(i.resolve, i),
            i.promise();
        },
        copiedTasksCount: function() {
            return this.state.attributes.copiedTasksCount;
        },
        copiedListsCount: function() {
            return this.state.attributes.copiedListsCount;
        },
        hasCopiedLists: function() {
            return !!this.copiedListsCount();
        },
        hasCopiedTasks: function() {
            return !!this.copiedTasksCount();
        },
        _positionNewList: function(e, t) {
            var i = this
              , n = i.listLookup.getListBefore(t.id)
              , o = i.sidebarActions.getFolderforList(t.id);
            if (o) {
                var a = n && n.id;
                i.sidebarActions.getFolderActions(o.id).moveList(e.id, a, t.id);
            } else
                i.sidebarActions.repositionList.moveListsTo([e], n, t);
        },
        _positionListAfter: function(e, t) {
            var i = this
              , n = i.listLookup.getListAfter(t.id)
              , o = i.sidebarActions.getFolderforList(t.id);
            if (o) {
                var a = n && n.id;
                i.sidebarActions.getFolderActions(o.id).moveList(e.id, t.id, a);
            } else
                i.sidebarActions.repositionList.moveListsTo([e], t, n);
        },
        _createPastedTasks: function(e, t) {
            var i = this
              , r = new n()
              , s = i.state.attributes.copiedTaskIds
              , l = s.map(function(t) {
                var o = new n()
                  , a = i.taskLookup.getTaskModel(t);
                if (a) {
                    var r = i.taskLookup.getLastTaskPosition(e.id)
                      , s = a && a.attributes
                      , l = {
                        frequency: s.recurrence_count,
                        interval: s.recurrence_type
                    };
                    i.createTask.createTask(s.title, e.id, s.starred, s.due_date, l, void 0, void 0, r, void 0, void 0).done(function(e) {
                        i.duplicateTaskResources(t, e.id).always(o.resolve.bind(o, e));
                    }).fail(o.resolve, o);
                } else
                    o.resolve();
                return o.promise();
            });
            return a(l).done(function() {
                var n = i._flattenPastedItems(o(arguments));
                i._movePastedTasks(n, t, e.id),
                r.resolve(n);
            }),
            r.promise();
        },
        _createPastedLists: function(e) {
            var t = this
              , i = new n()
              , r = t.state.attributes.copiedListIds
              , s = r.map(function(i) {
                var o = new n()
                  , a = t.listLookup.getListModel(i);
                if (a) {
                    var r = t._getDuplicatedListTitle(a);
                    t.createList.createList(r).done(function(i) {
                        t.duplicateTasks(a.id, i.id),
                        t._positionListAfter(i, e),
                        o.resolve(i);
                    });
                } else
                    o.resolve();
                return o.promise();
            });
            return a(s).done(function() {
                var e = t._flattenPastedItems(o(arguments));
                i.resolve(e);
            }),
            i.promise();
        },
        _getDuplicatedListTitle: function(t) {
            var i, n, o = this;
            i = t.isInbox() ? e.language.getDangerousRawText("smart_list_inbox") : t.attributes.title;
            var a = o._getNumberOfPreviousCopies(i);
            if (0 === a)
                n = e.language.getDangerousRawText("duplicated_list_title_$", i);
            else {
                var r = a + 1;
                n = e.language.getDangerousRawText("duplicated_list_title_increment_$_$", i, r);
            }
            return n;
        },
        _getNumberOfPreviousCopies: function(t) {
            var i = this
              , n = e.language.getText("duplicated_list_title_$", t)
              , o = i.listLookup.allLists
              , a = o.models.filter(function(e) {
                return 0 === e.attributes.title.indexOf(n);
            });
            return a.length;
        },
        _flattenPastedItems: function(e) {
            var t = e.map(function(e) {
                return e[0];
            });
            return t.filter(function(e) {
                return !!e;
            });
        },
        _extractIds: function(e) {
            return e.map(function(e) {
                return e.id;
            });
        },
        _movePastedTasks: function(t, i, n) {
            var o = this
              , a = e.settings.attributes.new_task_location
              , r = o._extractIds(t)
              , s = o.taskLookup.getTaskAfter(i)
              , l = s && s.id;
            if (i)
                o.repositionTask.moveTasksBetweenIds(n, r, i, l);
            else if ("top" === a) {
                var c = o.taskLookup.getTaskCollection(n)
                  , d = c.models[0];
                d && o.repositionTask.moveTasksBetweenIds(n, r, void 0, d.id);
            }
        }
    });
    return l;
}),
define("actions/Print", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.runtime = e;
        },
        _print: function(e) {
            var t = this
              , i = t.runtime;
            i.trigger("set:printType", e),
            (i.env.isChrome() || i.env.isNodeWebkit()) && i.trigger("print:start"),
            setTimeout(function() {
                window.print(),
                setTimeout(function() {
                    i.trigger("set:printType", null);
                }, 1e3);
            }, 300),
            i.trigger("analytics:TaskActionBar:PrintList", e);
        },
        printList: function() {
            this._print("list");
        },
        printSelected: function() {
            this._print("selectedTasks");
        }
    });
}),
define("actions/OpenUrl", ["project!core"], function(e) {
    var t = e.WBDeferred
      , i = e.WBClass;
    return i.extend({
        initialize: function(e) {
            this.runtime = e;
        },
        _executeUrlOpen: function(e) {
            var i = new t();
            try {
                e(),
                i.resolve();
            } catch (n) {
                console.error(n),
                i.reject(n);
            }
            return i.promise();
        },
        _openPackagedAppUrl: function(e) {
            var t = this
              , i = t.runtime.global
              , n = i.document;
            return t._executeUrlOpen(function() {
                var t = n.createElement("a");
                t.href = e,
                t.target = "_blank",
                n.body.appendChild(t),
                t.click(),
                i.setTimeout(function() {
                    n.body.removeChild(t);
                }, 200);
            });
        },
        _openUrlInNewWindow: function(e) {
            var t = this;
            return t._executeUrlOpen(function() {
                t.runtime.global.open(e, "_blank");
            });
        },
        _openUrlInSameWindow: function(e) {
            var t = this;
            return t._executeUrlOpen(function() {
                t.runtime.global.location.href = e;
            });
        },
        openUrl: function(e, i) {
            function n(t) {
                return t.call(o, e).done(a.resolve, a).fail(a.reject, a);
            }
            var o = this
              , a = new t();
            return n(o.runtime.env.isPackagedApp() ? o._openPackagedAppUrl : i ? o._openUrlInNewWindow : o._openUrlInSameWindow),
            a.promise();
        }
    });
}),
define("actions/DeleteTask", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.taskLookup = e;
        },
        deleteTasks: function(e, t) {
            var i = this;
            e.forEach(function(e) {
                var n = i.taskLookup.getTaskModel(e);
                n && n.destroy(t);
            });
        }
    });
}),
define("actions/MoveTask", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.taskLookup = e;
        },
        moveTasks: function(e, t, i) {
            var n = this;
            e.forEach(function(e) {
                var o = n.taskLookup.getTaskModel(e);
                o && o.save({
                    list_id: t
                }, i);
            });
        }
    });
}),
define("actions/StarTask", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.listLookup = e,
            i.taskLookup = t;
        },
        _unstarTask: function(e, t) {
            var i = {
                starred: !1
            };
            e.save(i, t);
        },
        _starTask: function(e, t) {
            var i = this
              , n = {
                starred: !0
            };
            if (t.moveToTop) {
                var o = i.listLookup.getTaskCollection(e.attributes.list_id);
                n.position = o.getNewTopPosition();
            }
            e.save(n, t);
        },
        unstarTasks: function(e, t) {
            var i = this;
            e.reverse(),
            e.forEach(function(e) {
                var n = i.taskLookup.getTaskModel(e);
                n && i._unstarTask(n, t);
            });
        },
        starTasks: function(e, t) {
            var i = this;
            e.reverse(),
            e.forEach(function(e) {
                var n = i.taskLookup.getTaskModel(e);
                n && i._starTask(n, t);
            });
        },
        toggleStarred: function(e, t) {
            var i = this;
            e.reverse(),
            e.forEach(function(e) {
                var n = i.taskLookup.getTaskModel(e);
                n && n.isStarred() ? i._unstarTask(n, t) : n && i._starTask(n, t);
            });
        }
    });
    return t;
}),
define("actions/CompleteTask", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e, t, i, n) {
            var o = this;
            o.listLookup = e,
            o.taskLookup = t,
            o.dateService = i,
            o.subtaskLookup = n;
        },
        _uncompleteTask: function(e, t) {
            var i = this
              , n = i.taskLookup.getTaskCollection(e.attributes.list_id)
              , o = n.getNewBottomPosition() + 10;
            e.save({
                completed: !1,
                completed_at: null,
                position: o
            }, t);
            var a = i.subtaskLookup.getSubTaskCollection(e.id)
              , r = a.models;
            r && r.forEach(function(e) {
                e.save({
                    completed: !1
                });
            });
        },
        _completeTask: function(e, t) {
            var i = this;
            e.save({
                completed: !0,
                completed_at: i.dateService.getServerNow()
            }, t);
            var n = i.subtaskLookup.getSubTaskCollection(e.id)
              , o = n.models;
            o && o.forEach(function(e) {
                e.isCompleted() || e.save({
                    completed: !0
                });
            });
        },
        uncompleteTasks: function(e, t) {
            var i = this;
            e.forEach(function(e) {
                var n = i.taskLookup.getTaskModel(e);
                n && i._uncompleteTask(n, t);
            });
        },
        completeTasks: function(e, t) {
            var i = this;
            e.forEach(function(e) {
                var n = i.taskLookup.getTaskModel(e);
                n && i._completeTask(n, t);
            });
        },
        toggleCompleted: function(e, t) {
            var i = this;
            return e.map(function(e) {
                var n = i.taskLookup.getTaskModel(e);
                return n && n.isCompleted() ? (i._uncompleteTask(n, t),
                !1) : n ? (i._completeTask(n, t),
                !0) : void 0;
            });
        }
    });
    return t;
}),
define("actions/CompleteSubTask", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e, t, i) {
            var n = this;
            n.listLookup = e,
            n.subTaskLookup = t,
            n.dateService = i;
        },
        _uncompleteSubtask: function(e, t) {
            e.save({
                completed: !1,
                completed_at: null
            }, t);
        },
        completeSubTask: function(e, t) {
            this._completeSubtask(e, t);
        },
        unCompleteSubTask: function(e, t) {
            this._uncompleteSubtask(e, t);
        },
        _completeSubtask: function(e, t) {
            var i = this;
            e.save({
                completed: !0,
                completed_at: i.dateService.getServerNow()
            }, t);
        },
        uncompleteSubTasks: function(e, t) {
            var i = this;
            i.subTaskLookup.forEach(function(e) {
                var n = i.subTaskLookup.getSubTaskModel(e);
                n && i._uncompleteSubtask(n, t);
            });
        },
        completeSubTasks: function(e, t) {
            var i = this;
            e.forEach(function(e) {
                var n = i.subTaskLookup.getSubTaskModel(e);
                n && i._completeSubtask(n, t);
            });
        },
        toggleSubtasksCompleted: function(e, t) {
            var i = this;
            e.forEach(function(e) {
                var n = i.subTaskLookup.getSubTaskModel(e)
                  , o = n && n.isCompleted();
                n && o ? i._uncompleteSubtask(n, t) : n && i._completeSubtask(n, t);
            });
        }
    });
    return t;
}),
define("actions/DeleteSubTask", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.subTaskLookup = e;
        },
        deleteSubTask: function(e, t) {
            var i = this
              , n = i.subTaskLookup.getSubTaskModel(e);
            n && n.destroy(t);
        }
    });
}),
define("actions/ReparentTask", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.listLookup = e,
            i.taskLookup = t;
        },
        moveTasksToList: function(e, t) {
            var i = this
              , n = i.taskLookup.getTaskModels(t)
              , o = i.listLookup.getListModel(e)
              , a = i.listLookup.getTaskCollection(e);
            n.forEach(function(e) {
                e.attributes.list_id !== o.id && a.addTaskToList(e, o);
            });
        }
    });
    return t;
}),
define("actions/AutomaticReminder", ["application/runtime", "project!core", "wunderbits/helpers/date", "vendor/moment"], function(e, t, i, n) {
    var o = "YYYY-MM-DD"
      , a = "YYYY-MM-DDTHH:mm:ssZ"
      , r = "YYYY-MM-DDTHH:mm:ss"
      , s = t.WBClass.extend({
        initialize: function(e, t, i, n) {
            var o = this;
            o._reminderLookup = e,
            o._taskLookup = t,
            o._dateService = i,
            o._featureLookup = n;
        },
        _momentToday: function() {
            return n().sod();
        },
        _isDueToday: function(e) {
            var t = this
              , i = t._momentToday()
              , o = n(e).sod()
              , a = i.diff(o, "days")
              , r = 0 === a;
            return r;
        },
        _isTaskModelDueToday: function(e) {
            var t = this
              , i = t._momentToday()
              , a = n(e.attributes.due_date, o).sod()
              , r = i.diff(a, "days")
              , s = 0 === r;
            return s;
        },
        _isDueInThePast: function(e) {
            var t = this
              , i = t._momentToday()
              , o = n(e).sod()
              , a = o.diff(i, "days")
              , r = 0 > a;
            return r;
        },
        _isTaskModelDueInThePast: function(e) {
            var t = this
              , i = t._momentToday()
              , a = n(e.attributes.due_date, o).sod()
              , r = a.diff(i, "days")
              , s = 0 > r;
            return s;
        },
        _shouldUpdateTaskModelReminder: function(e, t) {
            if (!t)
                return !0;
            var i = e.previousAttributes()
              , r = i && i.due_date && n(i.due_date, o).sod()
              , s = r && n(t.attributes.date, a).sod()
              , l = r && 0 === r.diff(s, "days");
            return !!l;
        },
        _oneHourLaterServerTime: function() {
            var e = n().add("hours", 1).format(r);
            return e = i.convertLocalTimeToServerTime(e);
        },
        _nineAmOnServerTime: function(e) {
            var t = n(e).sod().add("hours", 9).format(r);
            return t = i.convertLocalTimeToServerTime(t);
        },
        _nineAmOnModelDateServerTime: function(e) {
            var t = n(e, o).sod().add("hours", 9).format(r);
            return t = i.convertLocalTimeToServerTime(t);
        },
        _getReminderTimeForTimestamp: function(e) {
            var t, i = this, n = i._isDueInThePast(e);
            if (!n) {
                var o = i._isDueToday(e);
                return t = o ? i._oneHourLaterServerTime() : i._nineAmOnServerTime(e);
            }
        },
        _getReminderTimeForTaskModel: function(e, t) {
            var i, n = this, o = n._isTaskModelDueInThePast(e);
            if (!o) {
                var a = n._shouldUpdateTaskModelReminder(e, t);
                if (a) {
                    var r = n._isTaskModelDueToday(e);
                    i = r ? n._oneHourLaterServerTime() : n._nineAmOnModelDateServerTime(e.attributes.due_date);
                }
                return i;
            }
        },
        _createUpdate: function(t, i, n) {
            var o = this;
            e.trigger("trackingService", "Client.reminder.autocreate"),
            n ? n.save({
                date: t
            }) : o._reminderLookup.allReminders.add({
                task_id: i.id,
                date: t
            });
        },
        isSettingEnabled: function() {
            var t = e.settings.get("automatic_reminders");
            return "off" !== t;
        },
        getForTimestamp: function(e) {
            var t, i = this;
            return i.isSettingEnabled() && (t = i._getReminderTimeForTimestamp(e)),
            t;
        },
        getForTask: function(e, t) {
            var i, n = this;
            if (n.isSettingEnabled()) {
                var o = n._taskLookup.getTaskModel(e)
                  , a = n._reminderLookup.getReminderModelForTask(e);
                i = n._getReminderTimeForTaskModel(o, a),
                i && t && n._createUpdate(i, o, a);
            }
            return i;
        },
        destroyForTask: function(e) {
            var t = this
              , i = t._taskLookup.getTaskModel(e)
              , n = t._reminderLookup.getReminderModelForTask(e);
            if (i && n) {
                var o = t._shouldUpdateTaskModelReminder(i, n);
                o && n.destroy();
            }
        }
    });
    return s;
}),
define("actions/TaskAssignee", ["project!core"], function(e) {
    var t = e.WBDeferred
      , i = e.WBClass.extend({
        initialize: function(e) {
            this.taskLookup = e;
        },
        removeTaskAssignee: function(e) {
            var t = this
              , i = t.taskLookup.getTaskModel(e);
            i && i.save({
                assignee_id: null
            });
        },
        updateTaskAssignee: function(e, i) {
            var n = this
              , o = new t()
              , a = n.taskLookup.getTaskModel(i)
              , r = a.attributes.assignee_id;
            return a && e && e !== r ? (a.save({
                assignee_id: e
            }),
            o.resolve(a)) : o.reject(a),
            o.promise();
        }
    });
    return i;
}),
define("actions/TaskDue", ["project!core", "wunderbits/helpers/date", "vendor/moment"], function(e, t, i) {
    var n = ["never", "days", "weeks", "months", "years", "custom"]
      , o = e.WBClass.extend({
        initialize: function(e, t, i) {
            var n = this;
            n.dateService = t,
            n.taskLookup = e,
            n.automaticReminderService = i;
        },
        setTasksDueToday: function(e, t) {
            var i = this
              , n = i.dateService.today();
            i.setTasksDueAt(e, n, null, null, !0, t);
        },
        setTasksDueTomorrow: function(e, t) {
            var i = this
              , n = i.dateService.tomorrow();
            i.setTasksDueAt(e, n, null, null, !0, t);
        },
        removeDueDate: function(e, t) {
            var i = this;
            i.setTasksDueAt(e, null, null, null, !1, t);
        },
        setTasksDueAt: function(e, o, a, r, s, l) {
            var c = this;
            null !== r && void 0 !== r && (-1 === n.indexOf(r) && console.error("invalid recurrenceType when setting task due date: " + r),
            r = String(r).substr(0, r.length - 1).toLowerCase()),
            null !== a && void 0 !== a && (a = 0 !== a ? Number(a) : void 0),
            e.forEach(function(e) {
                var n = c.taskLookup.getTaskModel(e);
                if (n) {
                    var d = n.attributes;
                    if (!a && s && (a = d.recurrence_count),
                    !r && s && (r = d.recurrence_type),
                    n.save({
                        due_date: o && t.convertLocalDateToServerDate(i(o).format("YYYY-MM-DD")),
                        recurrence_count: a,
                        recurrence_type: r,
                        local_change: !0
                    }, l),
                    o) {
                        var u = !0;
                        c.automaticReminderService.getForTask(e, u);
                    } else
                        c.automaticReminderService.destroyForTask(e);
                }
                a = null,
                r = null;
            });
        }
    });
    return o;
}),
define("actions/TaskReminder", ["application/runtime", "project!core", "wunderbits/helpers/date", "wunderbits/helpers/strings", "vendor/moment"], function(e, t, i, n, o) {
    var a = e._
      , r = t.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.reminderLookup = e,
            i.createReminder = t;
        },
        upsertTaskReminder: function(e, t, r, s, l, c) {
            var d, u = this, m = u.reminderLookup.getReminderModelForTask(e);
            "number" != typeof t || a.isNaN(t) ? m && m.destroy() : (null !== r && null !== s && null !== l && (r = c ? i.convertHourTo24HourTime(r, l) : r,
            d = o(t).sod().add({
                h: n.pad(r, 2),
                m: n.pad(s, 2)
            }).format("YYYY-MM-DDTHH:mm:ss")),
            d = i.convertLocalTimeToServerTime(d),
            m ? m.save({
                task_id: e,
                date: d
            }) : u.createReminder.createReminder(d, e));
        }
    });
    return r;
}),
define("actions/TaskTitle", ["project!core"], function(e) {
    var t = e.WBDeferred
      , i = e.WBClass.extend({
        initialize: function(e) {
            this.taskLookup = e;
        },
        updateTaskTitle: function(e, i) {
            var n = this
              , o = new t()
              , a = n.taskLookup.getTaskModel(i)
              , r = a && a.attributes.title;
            return a && e && e !== r ? (a.save("title", e),
            o.resolve(a)) : o.reject(a),
            o.promise();
        }
    });
    return i;
}),
define("actions/AssignLimit", ["application/runtime", "project!core"], function(e, t) {
    var i = t.WBClass.extend({
        limit: 25,
        initialize: function(e) {
            this.taskLookup = e;
        },
        getAssignCount: function(e) {
            return e.filter(function(e) {
                return e.isAssigned();
            }).length;
        },
        getListAssignCount: function(e) {
            var t = this
              , i = t.taskLookup.getTaskCollection(e);
            return t.getAssignCount(i.openTasks);
        },
        getTaskAssignCount: function(e) {
            var t = this
              , i = t.taskLookup.getTaskModels(e);
            return t.getAssignCount(i);
        },
        isLimitReached: function(e, t, i) {
            var n = this
              , o = n.getListAssignCount(e);
            if (t) {
                var a = i ? t.length : n.getTaskAssignCount(t)
                  , r = o + a;
                return r > n.limit;
            }
            return o >= n.limit;
        },
        isUserAllowedToAssign: function(t, i, n) {
            return e.areProLimitsEnabled() ? !this.isLimitReached(t, i, n) || e.user.isPro() : !0;
        },
        reached: function() {
            e.trigger("route:goPro/assigning");
        }
    });
    return i;
}),
define("actions/AssignTask", ["project!core", "actions/AssignLimit"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function(e, i, n) {
            var o = this;
            o.listLookup = e,
            o.taskLookup = i,
            o.currentUserId = n,
            o.limit = new t(i);
        },
        assignTasksToMe: function(e, t) {
            var i = this;
            i.assignTasksToUserId(e, i.currentUserId, t);
        },
        assignTasksToUserId: function(e, t, i) {
            var n = this
              , o = n.taskLookup.getTaskModels(e);
            o.forEach(function(e) {
                var o = n.listLookup.getListModel(e.attributes.list_id);
                o.isShared() && e.set("assignee_id", t, i);
            });
        }
    });
    return i;
}),
define("actions/RepositionTask", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.listLookup = e,
            i.taskLookup = t;
        },
        moveTasksBetweenIds: function(e, t, i, n, o) {
            var a = this
              , r = a.taskLookup.getTaskModels(t)
              , s = a.listLookup.getTaskCollection(e);
            s.moveTasksBetweenIds(r, i, n, o);
        }
    });
    return t;
}),
define("actions/RepositionSubTask", ["project!core"], function(e) {
    var t = e.lib.clone
      , i = e.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.taskLookup = e,
            i.subTaskLookup = t;
        },
        moveSubTaskTo: function(e, i, n, o, a) {
            var r = this
              , s = r.subTaskLookup.getSubTaskCollection(o)
              , l = r.subTaskLookup.getSubTaskModel(e);
            if (s && l) {
                var c = t(s.models)
                  , d = c.indexOf(l);
                c.splice(d, 1);
                var u = r._getIndex(i, c)
                  , m = r._getIndex(n, c);
                m > -1 ? c.splice(m, 0, l) : u > -1 && u > c.length - 1 ? c.splice(u + 1, 0, l) : c.push(l),
                c.forEach(function(e, t) {
                    e.save({
                        position: 10 * t
                    }, a);
                });
            }
        },
        _getIndex: function(e, t) {
            var i = this
              , n = e && t.indexOf(i.subTaskLookup.getSubTaskModel(e));
            return null === n || void 0 === n ? -1 : n;
        }
    });
    return i;
}),
define("actions/CreateList", ["project!core", "collections/ListCollection", "collections/MembershipCollection"], function(e, t, i) {
    var n = e.WBDeferred
      , o = e.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.listLookup = e,
            i.reparentTask = t;
        },
        createListWith: function(e, t, i, o) {
            var a = this
              , r = new n();
            return a.createList(e, t).done(function(e) {
                i && a.addListMemberships(e.attributes.id, i),
                o && o.length && a.reparentTask.moveTasksToList(e.attributes.id, o),
                r.resolve(e);
            }).fail(r.reject.bind(r)),
            r.promise();
        },
        createList: function(e, i) {
            var o = this
              , a = new n()
              , r = new t("/lists/all")
              , s = o.listLookup.getLastListPosition();
            return void 0 === s ? s = 0 : s += 10,
            r.add({
                title: e,
                position: s,
                role: "owner",
                "public": !!i
            }, {
                success: function(e) {
                    a.resolve(e);
                },
                error: function(e) {
                    a.reject(e);
                }
            }),
            a.promise();
        },
        addListMemberships: function(e, t) {
            var n = new i("/memberships/all");
            t.forEach(function(t) {
                var i = {
                    list_id: e
                };
                t.indexOf("@") >= 0 ? i.email = t : i.user_id = t,
                n.add(i);
            });
        },
        modifyListWith: function(e, t, i, n) {
            var o = this
              , a = o.listLookup.getListModel(e);
            a && (a.save({
                title: t
            }),
            n.destroyRemoved(),
            o.addListMemberships(e, i));
        }
    });
    return o;
}),
define("actions/DeleteList", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.listLookup = e;
        },
        deleteList: function(e, t) {
            var i = this
              , n = i.listLookup.getListModel(e);
            n && n.destroy(t);
        }
    });
}),
define("actions/DeleteComment", ["application/runtime", "project!core"], function(e, t) {
    return t.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.commentLookup = e,
            i.settings = t;
        },
        _deleteCommentModel: function(e) {
            e && e.destroy();
        },
        deleteComment: function(t, i) {
            var n = this
              , o = n.commentLookup.getCommentModel(t);
            if (o && o.canDelete()) {
                var a = "true" === n.settings.attributes.confirm_delete_entity;
                a ? e.trigger("modal:confirm", {
                    customTitle: e.language.getLabel("label_are_you_sure_permanently_delete_X_comment").toString(),
                    customText: e.language.getLabel("label_cant_undo").toString(),
                    confirmText: e.language.getLabel("button_delete").toString(),
                    confirm: function() {
                        n._deleteCommentModel(o),
                        i && i.confirm && i.confirm();
                    },
                    cancel: function() {
                        i && i.cancel && i.cancel();
                    }
                }) : n._deleteCommentModel(o);
            }
        }
    });
}),
define("actions/DeleteFile", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            this.fileLookup = e;
        },
        deleteFile: function(e, t) {
            var i = this.fileLookup.getFileModel(e);
            i && i.destroy(t);
        }
    });
}),
define("actions/DeleteReminder", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            this.reminderLookup = e;
        },
        deleteReminder: function(e, t) {
            var i = this
              , n = i.reminderLookup.getReminderModel(e);
            n && (n.set("date", null),
            n.destroy(t));
        }
    });
}),
define("actions/CreateComment", ["application/runtime", "wunderbits/helpers/date", "wunderbits/helpers/strings", "project!core"], function(e, t, i, n) {
    var o = n.WBClass.extend({
        initialize: function(e, t) {
            var i = this;
            i.allComments = e.allComments,
            i.taskLookup = t;
        },
        createComment: function(n, o) {
            var a = this
              , r = t.getServerNowWithMilliseconds()
              , s = i.emojiTokensToUnicode(n)
              , l = a.taskLookup.getTaskModel(o);
            a.allComments.add({
                text: s,
                task_id: o,
                local_created_at: r,
                read: !0,
                author: {
                    id: e.user.id,
                    name: e.user.attributes.name
                }
            }, {
                task: l,
                comment: s,
                userAdded: !0
            });
        }
    });
    return o;
}),
define("actions/CreateFile", ["wunderbits/helpers/date", "project!core"], function(e, t) {
    var i = t.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.fileLookup = e,
            this.allFiles = e.allFiles;
        },
        _normalizeMimeType: function(e) {
            var t = /^text\//
              , i = e || "application/octet-stream";
            return t.test(i) && (i += "; charset=utf-8"),
            i;
        },
        createDropboxFile: function(t, i, n, o, a, r) {
            var s = this
              , l = e.getServerNow();
            s.allFiles.add({
                file_provider: "dropbox",
                content_type: "application/octet-stream",
                file_name: t,
                file_size: i,
                file_icon: o,
                url: n,
                task_id: a,
                user_id: r,
                created_at: l,
                local_created_at: l,
                state: 2
            });
        },
        createFile: function(t, i, n, o, a) {
            var r = this
              , s = e.getServerNow();
            r.allFiles.add({
                created_at: s,
                local_created_at: s,
                file_name: t,
                content_type: r._normalizeMimeType(i),
                task_id: n,
                user_id: o
            }, a);
        }
    });
    return i;
}),
define("actions/CreateTask", ["project!core", "models/TaskModel", "wunderbits/helpers/date", "collections/TaskCollection", "collections/ListCollection", "collections/NoteCollection", "collections/SubtaskCollection"], function(e, t, i, n, o, a, r) {
    var s = e.WBDeferred
      , l = e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.taskLookup = e,
            t.lists = new o("/lists/all"),
            t.notes = new a("/notes/all"),
            t.subTasks = new r("/subtasks/all");
        },
        createTask: function(e, t, o, a, r, l, c, d, u, m) {
            var p = this
              , g = new s()
              , f = new n("/tasks/all");
            return void 0 === d ? d = 0 : d += 10,
            f.add({
                title: e,
                list_id: t,
                assignee_id: u,
                position: d,
                due_date: a ? i.convertLocalDateToServerDate(a) : null,
                starred: o || !1,
                recurrence_count: r && r.frequency,
                recurrence_type: r && r.interval,
                completed: !!m
            }, {
                success: function(e) {
                    l && p.notes.add({
                        content: l,
                        task_id: e.id
                    }),
                    c && c.forEach(function(i) {
                        p.subTasks.add({
                            title: i.title,
                            list_id: t,
                            task_id: e.id
                        });
                    }),
                    g.resolve(e);
                },
                error: function(e) {
                    g.reject(e);
                }
            }),
            g.promise();
        }
    });
    return l;
}),
define("actions/CreateSubtask", ["project!core"], function(e) {
    var t = e.WBDeferred
      , i = e.WBClass.extend({
        initialize: function(e) {
            this.allSubtasks = e.allSubTasks;
        },
        createSubtask: function(e, i, n) {
            var o = this
              , a = new t();
            return o.allSubtasks.add({
                title: e,
                position: i,
                task_id: n
            }, {
                success: function(e) {
                    a.resolve(e);
                },
                error: function(e) {
                    a.reject(e);
                }
            }),
            a.promise();
        }
    });
    return i;
}),
define("actions/CreateReminder", ["wunderbits/helpers/date", "vendor/moment", "project!core"], function(e, t, i) {
    var n = i.WBDeferred
      , o = i.WBClass.extend({
        initialize: function(e) {
            this.allReminders = e.allReminders;
        },
        createReminderFromDateAndTime: function(i, n, o) {
            var a = this
              , r = n.split(":")
              , s = Number(r[0])
              , l = Number(r[1]);
            if (null !== i && null !== s && null !== l) {
                var c = t(i).sod().add({
                    h: s,
                    m: l
                }).format("YYYY-MM-DDTHH:mm:ss");
                c = e.convertLocalTimeToServerTime(c),
                a.createReminder(c, o);
            }
        },
        createReminder: function(e, t) {
            var i = this
              , o = new n();
            return i.allReminders.add({
                date: e,
                task_id: t
            }, {
                success: function(e) {
                    o.resolve(e);
                },
                error: function(e) {
                    o.reject(e);
                }
            }),
            o.promise();
        }
    });
    return o;
}),
define("actions/CreateNote", ["project!core"], function(e) {
    var t = e.WBDeferred
      , i = e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.noteLookup = e,
            this.allNotes = e.allNotes;
        },
        upsertNote: function(e, t) {
            var i = this
              , n = i.noteLookup.getNoteModelForTask(t);
            n ? n.save({
                content: e
            }) : i.createNote(e, t);
        },
        createNote: function(e, i) {
            var n = this
              , o = new t();
            return n.allNotes.add({
                content: e,
                task_id: i
            }, {
                success: function(e) {
                    o.resolve(e);
                },
                error: function(e) {
                    o.reject(e);
                }
            }),
            o.promise();
        }
    });
    return i;
}),
define("models/Positions/PositionsModel", ["../BaseModel", "project!core"], function(e, t) {
    var i = t.lib.clone;
    return e.extend({
        defaults: {
            type: "positions",
            revision: void 0,
            values: [],
            localValues: [],
            syncedIDs: []
        },
        insert: function(e, t) {
            var n = this
              , o = n.getValues();
            o = i(o),
            n.removeFromArray(e, o);
            var a = o.indexOf(t);
            if (-1 !== a) {
                var r = [a, 0];
                r = r.concat(e),
                o.splice.apply(o, r),
                n.save("values", o);
            } else
                console.warn("Unable to insert IDs because before ID", t, "not in positions.");
        },
        prepend: function(e) {
            var t = this
              , n = t.getValues();
            n = i(n),
            t.removeFromArray(e, n),
            n.unshift.apply(n, e),
            t.save("values", n);
        },
        append: function(e) {
            var t = this
              , n = t.getValues();
            n = i(n),
            t.removeFromArray(e, n),
            n.push.apply(n, e),
            t.save("values", n);
        },
        removeIDs: function(e) {
            var t = this
              , n = t.getValues();
            n = i(n),
            t.removeFromArray(e, n),
            t.save("values", n);
        },
        getValues: function() {
            var e = this;
            return e.attributes.values;
        },
        removeFromArray: function(e, t) {
            return e.forEach(function(e) {
                var i = t.indexOf(e);
                -1 !== i && t.splice(i, 1);
            }),
            t;
        },
        markIDAsSyncedOut: function(e) {
            var t = this
              , i = t.attributes.syncedIDs || [];
            -1 === i.indexOf(e) && (i.push(e),
            t.save({
                syncedIDs: i
            }, {
                fromSync: !0
            }));
        }
    });
}),
define("collections/Positions/PositionsCollection", ["models/Positions/PositionsModel", "wunderbits/collections/WBCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("models/Positions/ListPositionsModel", ["./PositionsModel"], function(e) {
    return e.extend({
        storeName: "listPositions",
        defaults: {
            type: "list_position",
            online_id: void 0,
            revision: void 0,
            values: [],
            localValues: [],
            syncedIDs: []
        },
        isAbleToSync: function() {
            return !0;
        }
    });
}),
define("collections/Positions/ListPositionsCollection", ["./PositionsCollection", "models/Positions/ListPositionsModel"], function(e, t) {
    return e.extend({
        model: t
    });
}),
define("models/Positions/TaskPositionsModel", ["./PositionsModel"], function(e) {
    return e.extend({
        storeName: "taskPositions",
        defaults: {
            type: "task_position",
            online_id: void 0,
            revision: void 0,
            list_id: void 0,
            online_list_id: void 0,
            values: [],
            localValues: [],
            syncedIDs: []
        },
        isAbleToSync: function() {
            var e = this
              , t = !!e.attributes.online_id;
            return t || e.trackIsAbleToSync(),
            t;
        },
        trackIsAbleToSync: function() {
            var e = this;
            e.bindOnceTo(e, "change:online_id", function() {
                e.delay("makeAbleToSync");
            });
        }
    });
}),
define("collections/Positions/TaskPositionsCollection", ["./PositionsCollection", "models/Positions/TaskPositionsModel"], function(e, t) {
    return e.extend({
        model: t
    });
}),
define("models/TasksCountModel", ["./LocallyImmutableModel"], function(e) {
    return e.extend({
        storeName: "tasksCounts",
        defaults: {
            type: "tasks_count"
        },
        neverSyncOut: !0,
        isAbleToSync: function() {
            return !1;
        }
    });
}),
define("collections/TasksCountCollection", ["models/TasksCountModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        model: e
    });
}),
define("models/SettingModel", ["models/BaseModel"], function(e) {
    return e.extend({
        storeName: "settings",
        defaults: {
            type: "setting"
        },
        isAbleToSync: function() {
            return !0;
        }
    });
}),
define("collections/SettingCollection", ["models/SettingModel", "./BaseCollection"], function(e, t) {
    return t.extend({
        indices: ["key"],
        model: e
    });
}),
define("models/Positions/SubtaskPositionsModel", ["./PositionsModel"], function(e) {
    return e.extend({
        storeName: "subtaskPositions",
        defaults: {
            type: "subtask_position",
            online_id: void 0,
            revision: void 0,
            task_id: void 0,
            online_task_id: void 0,
            values: [],
            localValues: [],
            syncedIDs: []
        },
        isAbleToSync: function() {
            var e = this
              , t = !!e.attributes.online_id;
            return t || e.trackIsAbleToSync(),
            t;
        },
        trackIsAbleToSync: function() {
            var e = this;
            e.bindOnceTo(e, "change:online_id", function() {
                e.delay("makeAbleToSync");
            });
        }
    });
}),
define("collections/Positions/SubtaskPositionsCollection", ["./PositionsCollection", "models/Positions/SubtaskPositionsModel"], function(e, t) {
    return e.extend({
        model: t
    });
}),
define("backend/Sync/DataProcessors/Incoming/CollectionsByType", ["collections/FeatureCollection", "collections/FileCollection", "collections/ListCollection", "collections/FolderCollection", "collections/Positions/ListPositionsCollection", "collections/MembershipCollection", "collections/NotificationCollection", "collections/TaskCollection", "collections/TaskCommentsCollection", "collections/TaskCommentsStateCollection", "collections/Positions/TaskPositionsCollection", "collections/TasksCountCollection", "collections/ReminderCollection", "collections/ServiceCollection", "collections/SettingCollection", "collections/SubtaskCollection", "collections/Positions/SubtaskPositionsCollection", "collections/NoteCollection", "collections/UserCollection", "collections/UnreadActivitiesCountCollection", "collections/SubscriptionCollection"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w) {
    var k = {
        desktop_notifications: new r("/desktopNotifications/all"),
        features: new e("/features/all"),
        files: new t("/files/all"),
        lists: new i("/lists/all"),
        folders: new n("/folders/all"),
        list_positions: new o("/listPositions/all"),
        memberships: new a("/memberships/all"),
        notes: new h("/notes/all"),
        reminders: new m("/reminders/all"),
        services: new p("/services/all"),
        settings: new g("/settings/all"),
        subtasks: new f("/subtasks/all"),
        subtask_positions: new b("/subtaskPositions/all"),
        tasks: new s("/tasks/all"),
        task_comments: new l("/taskComments/all"),
        task_comments_states: new c("/taskCommentsStates/all"),
        task_positions: new d("/taskPositions/all"),
        tasks_counts: new u("/tasksCounts/all"),
        users: new v("/users/all"),
        unread_activities_counts: new _("/unreadActivitiesCounts/all"),
        subscriptions: new w("/subscriptions/all")
    }
      , x = {
        desktop_notification: k.desktop_notifications,
        assignee: k.users,
        created_by: k.users,
        feature: k.features,
        file: k.files,
        list: k.lists,
        folder: k.folders,
        list_position: k.list_positions,
        membership: k.memberships,
        note: k.notes,
        reminder: k.reminders,
        sender: k.users,
        service: k.services,
        setting: k.settings,
        subtask: k.subtasks,
        subtask_position: k.subtask_positions,
        task: k.tasks,
        task_comment: k.task_comments,
        last_read: k.task_comments,
        task_comments_state: k.task_comments_states,
        task_position: k.task_positions,
        tasks_count: k.tasks_counts,
        user: k.users,
        unread_activities_count: k.unread_activities_counts,
        subscription: k.subscriptions
    };
    return x;
}),
define("backend/Sync/DataProcessors/Incoming/Base", ["project!core", "./CollectionsByType"], function(e, t) {
    return e.WBClass.extend({
        type: void 0,
        remapIDTypes: [],
        collections: t,
        processData: function(e) {
            var t = this;
            return e = t.remapIDs(e);
        },
        remapIDs: function(e) {
            var t = this;
            return "id"in e && (e = t.remapID(e)),
            t.remapIDTypes.forEach(function(i) {
                i + "_id"in e && (e = t.remapIDofType(e, i));
            }),
            e;
        },
        remapID: function(e) {
            var t = this;
            e.id = "" + e.id,
            e.online_id = e.id;
            var i = t.collections[t.type]
              , n = i.get(e.id);
            return n && e.id !== n.id && (e.id = n.id),
            e;
        },
        remapIDofType: function(e, t) {
            var i = this
              , n = t ? t + "_id" : "id";
            if (void 0 !== e[n]) {
                var o = "online_" + n;
                e[n] = "" + e[n],
                e[o] = e[n];
                var a = i.collections[t]
                  , r = a.get(e[n]);
                r && (e[n] = r.id);
            }
            return e;
        }
    });
}),
define("backend/Sync/DataProcessors/Incoming/DesktopNotification", ["backend/Sync/DataProcessors/Incoming/Base"], function(e) {
    return e.extend({
        type: "desktop_notification"
    });
}),
define("backend/Sync/DataProcessors/Incoming/Feature", ["backend/Sync/DataProcessors/Incoming/Base"], function(e) {
    return e.extend({
        type: "feature"
    });
}),
define("backend/Sync/DataProcessors/Incoming/File", ["./Base"], function(e) {
    return e.extend({
        type: "file",
        remapIDTypes: ["list", "task", "user"]
    });
}),
define("backend/Sync/DataProcessors/Incoming/List", ["backend/Sync/DataProcessors/Incoming/Base"], function(e) {
    var t = e.prototype;
    return e.extend({
        type: "list",
        remapIDs: function(e) {
            var i = this;
            return e = t.remapIDs.call(i, e),
            "list_type"in e && "inbox" === e.list_type && (e.id = "inbox"),
            e;
        }
    });
}),
define("backend/Sync/DataProcessors/Incoming/Folder", ["backend/Sync/DataProcessors/Incoming/Base"], function(e) {
    var t = e.prototype;
    return e.extend({
        type: "folder",
        processData: function(e) {
            var i = this;
            return e = t.processData.call(i, e),
            e.list_ids && (e.list_ids = i._mapListIDsToLocalIDs(e.list_ids)),
            delete e.position,
            e;
        },
        _mapListIDsToLocalIDs: function(e) {
            var t = this
              , i = t.collections.list;
            return e.map(function(e) {
                var t = i.get(e);
                return "" + (t ? t.id : e);
            });
        }
    });
}),
define("backend/Sync/DataProcessors/Incoming/PositionBase", ["backend/Sync/DataProcessors/Incoming/Base", "project!core"], function(e, t) {
    var i = t.lib.clone;
    return e.extend({
        parentType: void 0,
        valueType: void 0,
        processData: function(e) {
            var t = this;
            return e = t.remapIDs(e),
            t.parentType && (e = t.remapIDByParentLookup(e)),
            "values"in e && Array.isArray(e.values) && (e = t.remapValuesIDs(e),
            e = t.spliceInLocalIDs(e)),
            e;
        },
        remapIDByParentLookup: function(e) {
            var t = this
              , i = t.collections[t.type]
              , n = t.parentType + "_id"
              , o = e[n]
              , a = t.collections[t.parentType]
              , r = a && a.get(o)
              , s = {};
            s[n] = r ? r.id : o;
            var l = s[n] && i.findWhere(s);
            return l && (e.id = l.id),
            e;
        },
        remapValuesIDs: function(e) {
            for (var t, n, o = this, a = o.collections[o.valueType], r = e.values, s = 0, l = r.length; l > s; s++)
                t = "" + r[s],
                n = a.get(t),
                r[s] = n ? n.id : t;
            return e.values = r,
            e.remoteValues = i(r),
            e;
        },
        spliceInLocalIDs: function(e) {
            var t = this
              , n = t.collections[t.type]
              , o = n.get(e.id)
              , a = e.values;
            if (o) {
                var r = o.attributes.localValues
                  , s = o.attributes.syncedIDs || [];
                t.iterateAndSplice(a, r, s);
            }
            return e.localValues = i(a),
            e;
        },
        iterateAndSplice: function(e, t, i) {
            var n = this;
            t.forEach(function(o) {
                n.spliceInLocalID(o, e, t, i);
            });
        },
        spliceInLocalID: function(e, t, i, n) {
            var o = this
              , a = i.indexOf(e)
              , r = o.isIDSynced(e, n)
              , s = {
                localBeforeIndex: void 0,
                localAfterIndex: void 0,
                localBeforeID: void 0,
                localAfterID: void 0
            };
            r ? o.getIDsAndIndexesRelativeToRemoteValues(e, t, s) : o.getIDsAndIndexesRelativeToLocalValues(a, i, s),
            o.cleanOutLocalID(e, t);
            var l = s.localBeforeID ? t.indexOf(s.localBeforeID) : -1
              , c = s.localAfterID ? t.indexOf(s.localAfterID) : -1;
            r && s.localBeforeID && l >= 0 ? t.splice(l + 1, 0, e) : r && s.localAfterID && c >= 0 ? o.insertBeforeRemoteValue(t, c, e) : 0 === a ? t.unshift(e) : o.spliceRelativeToLocalValuesOnly(a, t, i, e);
        },
        getIDsAndIndexesRelativeToLocalValues: function(e, t, i) {
            var n = i.localBeforeIndex = 0 !== e && e - 1
              , o = i.localAfterIndex = e !== t.length - 1 && e + 1;
            i.localBeforeID = n ? t[n] : void 0,
            i.localAfterID = o ? t[o] : void 0;
        },
        getIDsAndIndexesRelativeToRemoteValues: function(e, t, i) {
            var n = t.indexOf(e)
              , o = i.localBeforeIndex = 0 !== n && n - 1
              , a = i.localAfterIndex = n !== t.length - 1 && n + 1;
            i.localBeforeID = o ? t[o] : void 0,
            i.localAfterID = a ? t[a] : void 0;
        },
        cleanOutLocalID: function(e, t) {
            var i = t.indexOf(e);
            i >= 0 && t.splice(i, 1);
        },
        insertBeforeRemoteValue: function(e, t, i) {
            0 === t ? e.unshift(i) : e.splice(t, 0, i);
        },
        spliceRelativeToLocalValuesOnly: function(e, t, i, n) {
            var o = i[e - 1]
              , a = t.indexOf(o);
            t.splice(a + 1, 0, n);
        },
        isIDSynced: function(e, t) {
            return /^lw/.test(e) ? t.indexOf(e) >= 0 : !0;
        },
        logValues: function(e, t) {
            var i = this
              , n = t.map(function(e) {
                var t = i.collections[i.valueType].get("" + e);
                return t ? t.attributes.title : e;
            });
            console.debug(e, n);
        }
    });
}),
define("backend/Sync/DataProcessors/Incoming/ListPosition", ["./PositionBase"], function(e) {
    return e.extend({
        type: "list_position",
        valueType: "list"
    });
}),
define("backend/Sync/DataProcessors/Incoming/ListChildResource", ["./Base"], function(e) {
    return e.extend({
        remapIDTypes: ["list", "created_by", "assignee"]
    });
}),
define("backend/Sync/DataProcessors/Incoming/Membership", ["backend/Sync/DataProcessors/Incoming/ListChildResource"], function(e) {
    return e.extend({
        type: "membership",
        remapIDTypes: ["list", "user", "sender"]
    });
}),
define("backend/Sync/DataProcessors/Incoming/TaskChildResource", ["./Base"], function(e) {
    return e.extend({
        remapIDTypes: ["task", "list"]
    });
}),
define("backend/Sync/DataProcessors/Incoming/Note", ["./TaskChildResource"], function(e) {
    return e.extend({
        type: "note"
    });
}),
define("backend/Sync/DataProcessors/Incoming/Reminder", ["./TaskChildResource"], function(e) {
    return e.extend({
        type: "reminder"
    });
}),
define("backend/Sync/DataProcessors/Incoming/Service", ["backend/Sync/DataProcessors/Incoming/Base"], function(e) {
    return e.extend({
        type: "service"
    });
}),
define("backend/Sync/DataProcessors/CrossClientSettings", [], function() {
    var e = ["new_task_location", "confirm_delete_entity", "behavior_star_tasks_to_top", "automatic_reminders", "smart_dates", "smart_dates_remove_from_todo", "account_locale", "auto_reminder_noticeperiod", "auto_reminder_timeinterval", "background", "migrated_wunderlist_one_user", "newsletter_subscription_enabled", "notifications_email_enabled", "notifications_push_enabled", "notifications_desktop_enabled", "print_completed_items", "show_completed_items", "show_subtask_progress", "smartlist_visibility_all", "smartlist_visibility_assigned_to_me", "smartlist_visibility_done", "smartlist_visibility_starred", "smartlist_visibility_today", "smartlist_visibility_week", "sound_checkoff_enabled", "sound_notification_enabled", "start_of_week", "today_smart_list_visible_tasks", "consumed_quota_assigning_overall", "consumed_quota_assigning_daily", "consumed_quota_assigning_daily_date", "consumed_quota_comments_overall", "consumed_quota_comments_daily", "consumed_quota_comments_daily_date", "consumed_quota_files_overall", "consumed_quota_files_daily", "consumed_quota_files_daily_date", "campaign_iyf4_invited_friends", "campaign_iyf4_notification", "campaign_iyf4_notification_last_date", "campaign_iyf4_notification_variation", "terms_accepted_at"]
      , t = {};
    return e.forEach(function(e) {
        t[e] = !0;
    }),
    t;
}),
define("backend/Sync/DataProcessors/Incoming/Setting", ["./Base", "../CrossClientSettings"], function(e, t) {
    var i = /^web_/;
    return e.extend({
        type: "setting",
        processData: function(e) {
            var t = this;
            return e = t.remapID(e),
            e = t.remapKeys(e);
        },
        remapKeys: function(e) {
            var n, o = this, a = {}, r = e.key, s = e.value;
            if (!r) {
                var l = o.collections.setting.get(e.id);
                if (l) {
                    var c = l.attributes;
                    r = c.web ? "web_" + c.key : c.key;
                }
            }
            return r && i.test(r) ? (n = r.replace(i, ""),
            t[n] || (a.key = n,
            "value"in e && (a.value = s),
            a.web = !0)) : r && t[r] && (a.key = r,
            "value"in e && (a.value = s),
            a.web = !1),
            o.mapImportantSettingsAttributes(e, a),
            a;
        },
        mapImportantSettingsAttributes: function(e, t) {
            return Object.keys(t).length && ["id", "online_id", "revision", "matryoshkaRevision", "type"].forEach(function(i) {
                void 0 !== e[i] && (t[i] = e[i]);
            }),
            t;
        }
    });
}),
define("backend/Sync/DataProcessors/Incoming/Subtask", ["./TaskChildResource"], function(e) {
    return e.extend({
        type: "subtask"
    });
}),
define("backend/Sync/DataProcessors/Incoming/SubtaskPosition", ["./PositionBase"], function(e) {
    return e.extend({
        type: "subtask_position",
        parentType: "task",
        remapIDTypes: ["task"],
        valueType: "subtask"
    });
}),
define("backend/Sync/DataProcessors/Incoming/Task", ["backend/Sync/DataProcessors/Incoming/ListChildResource"], function(e) {
    var t = e.prototype;
    return e.extend({
        type: "task",
        importantAttributes: ["assignee_id", "due_date", "recurrence_type", "recurrence_count", "recurring_parent_id"],
        processData: function(e, i) {
            var n = this;
            return e = t.processData.apply(n, arguments),
            i && (e = n.checkForMissingImportantAttributes(e)),
            e;
        },
        checkForMissingImportantAttributes: function(e) {
            return this.importantAttributes.forEach(function(t) {
                t in e || (e[t] = void 0);
            }),
            e;
        }
    });
}),
define("backend/Sync/DataProcessors/Incoming/TaskComment", ["./TaskChildResource"], function(e) {
    return e.extend({
        type: "task_comment"
    });
}),
define("backend/Sync/DataProcessors/Incoming/TaskCommentsState", ["./Base"], function(e) {
    return e.extend({
        type: "task_comments_state",
        remapIDTypes: ["task", "list", "last_read"]
    });
}),
define("backend/Sync/DataProcessors/Incoming/TaskPosition", ["./PositionBase"], function(e) {
    return e.extend({
        type: "task_position",
        parentType: "list",
        remapIDTypes: ["list"],
        valueType: "task"
    });
}),
define("backend/Sync/DataProcessors/Incoming/TasksCount", ["./Base"], function(e) {
    return e.extend({
        type: "tasks_count",
        remapIDTypes: ["list"]
    });
}),
define("backend/Sync/DataProcessors/Incoming/User", ["backend/Sync/DataProcessors/Incoming/Base"], function(e) {
    return e.extend({
        type: "user"
    });
}),
define("backend/Sync/DataProcessors/Incoming/UnreadActivitiesCount", ["./Base"], function(e) {
    return e.extend({
        type: "unread_activities_count"
    });
}),
define("backend/Sync/DataProcessors/Incoming/Subscription", ["backend/Sync/DataProcessors/Incoming/Base"], function(e) {
    return e.extend({
        type: "subscription"
    });
}),
define("backend/Sync/DataProcessors/Incoming", ["project!core", "./Incoming/DesktopNotification", "./Incoming/Feature", "./Incoming/File", "./Incoming/List", "./Incoming/Folder", "./Incoming/ListPosition", "./Incoming/Membership", "./Incoming/Note", "./Incoming/Reminder", "./Incoming/Service", "./Incoming/Setting", "./Incoming/Subtask", "./Incoming/SubtaskPosition", "./Incoming/Task", "./Incoming/TaskComment", "./Incoming/TaskCommentsState", "./Incoming/TaskPosition", "./Incoming/TasksCount", "./Incoming/User", "./Incoming/UnreadActivitiesCount", "./Incoming/Subscription"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k) {
    return e.WBClass.extend({
        processors: {
            desktop_notification: new t(),
            feature: new i(),
            file: new n(),
            list: new o(),
            folder: new a(),
            list_position: new r(),
            membership: new s(),
            note: new l(),
            reminder: new c(),
            service: new d(),
            setting: new u(),
            subtask: new m(),
            subtask_position: new p(),
            task: new g(),
            task_comment: new f(),
            task_comments_state: new b(),
            task_position: new h(),
            tasks_count: new v(),
            user: new _(),
            unread_activities_count: new w(),
            subscription: new k()
        },
        processData: function(e, t) {
            var i = this
              , n = i.processors[e.type];
            return n ? e = n.processData(e, t) : console.warn("no incomming processor defined for type", e.type),
            e;
        }
    });
}),
define("actions/CreateService", ["backend/Sync/DataProcessors/Incoming", "project!core"], function(e, t) {
    var i = t.WBClass.extend({
        initialize: function(t) {
            var i = this;
            i.processor = new e(),
            i.allServices = t.allServices;
        },
        createLocalService: function(e) {
            var t = this;
            e = t.processor.processData(e),
            t.allServices.add(e, {
                merge: !0,
                fromSync: !0
            });
        }
    });
    return i;
}),
define("actions/MuteList", ["project!core"], function(e) {
    var t = e.mixins.WBBindableMixin
      , i = e.WBClass.prototype
      , n = e.WBClass.extend({
        mixins: [t],
        initialize: function(e, t) {
            var n = this;
            i.initialize.apply(n, arguments),
            n.membershipLookup = e,
            n.userID = t;
        },
        setListMuted: function(e, t) {
            var i = this
              , n = "" + i.userID
              , o = i.membershipLookup.getMembershipCollection(e)
              , a = o.findWhere({
                user_id: n
            })
              , r = {
                muted: !!t
            };
            if (a)
                a.save(r);
            else
                var s = i.bindTo(o, "add", function(e) {
                    n === e.attributes.user_id && (e.save(r),
                    i.unbindFrom(s));
                });
        }
    });
    return n;
}),
define("actions/sidebar/Hierarchy", ["application/runtime", "project!core", "collections/SortedCollection", "collections/comparators"], function(e, t, i, n) {
    var o = e._
      , a = t.mixins.WBBindableMixin
      , r = t.WBClass.extend({
        initialize: function(e, t) {
            var o = this;
            o.lists = e,
            o.folders = t,
            o.rootCollection = new i(),
            o.rootCollection.enableSortedCollection(n.position, ["position"]),
            o.folderCollections = {},
            o.collectionsFilled = !1,
            o.bindTo(o.lists, "add", "_listAdded"),
            o.bindTo(o.lists, "remove", "_listRemoved"),
            o.bindTo(o.folders, "change:list_ids", "_folderListsChanged"),
            o.bindTo(o.folders, "add", "_folderAdded"),
            o.bindTo(o.folders, "remove", "_folderRemoved");
        },
        getCollectionForFolder: function(e) {
            var t = this
              , o = t.folders.get(e)
              , a = t.folderCollections[e];
            return a || (t.folderCollections[e] = a = new i(),
            a.enableSortedCollection(n.position, ["position"]),
            t.bindTo(a, "add remove change:position", t._updateFolderPosition.bind(t, o, a))),
            a;
        },
        getRootCollection: function() {
            var e = this;
            return e.collectionsFilled || (e.collectionsFilled = !0,
            e._fillCollectionWithInitialData()),
            e.rootCollection;
        },
        _fillCollectionWithInitialData: function() {
            var e = this
              , t = e.getRootCollection();
            e.lists.models.forEach(function(t) {
                var i = e._getCollectionForList(t);
                i.add(t);
            }),
            e.folders.models.forEach(function(e) {
                t.add(e);
            });
        },
        _updateFolderPosition: function(e, t) {
            var i = t.models[0];
            e && e.save({
                position: i && i.attributes.position
            });
        },
        _getCollectionForList: function(e) {
            var t, i = this, n = i.folders.findFolderForListId(e.id);
            return t = n ? i.getCollectionForFolder(n.id) : i.getRootCollection();
        },
        _listAdded: function(e) {
            var t = this
              , i = t._getCollectionForList(e);
            i.add(e);
        },
        _listRemoved: function(e) {
            var t = this
              , i = t._getCollectionForList(e);
            i.remove(e);
        },
        _folderListsChanged: function(e) {
            var t = this
              , i = e.previous("list_ids")
              , n = e.attributes.list_ids
              , a = o.difference(i, n)
              , r = o.difference(n, i);
            a.forEach(function(i) {
                var n = t.lists.get(i);
                n && t._listRemovedFromFolder(n, e);
            }),
            r.forEach(function(i) {
                var n = t.lists.get(i);
                n && t._listAddedToFolder(n, e);
            });
        },
        _listRemovedFromFolder: function(e, t) {
            var i = this
              , n = i.getCollectionForFolder(t.id);
            n.remove(e);
            var o = i.getRootCollection();
            o.add(e);
        },
        _listAddedToFolder: function(e, t) {
            var i = this
              , n = i.getCollectionForFolder(t.id);
            n.add(e);
            var o = i.getRootCollection();
            o.remove(e);
        },
        _folderAdded: function(e) {
            var t = this
              , i = t.getRootCollection()
              , n = t.getCollectionForFolder(e.id);
            e.attributes.list_ids.forEach(function(e) {
                var o = t.lists.get(e);
                o && (n.add(o),
                i.remove(o));
            }),
            i.add(e);
        },
        _folderRemoved: function(e) {
            var t = this
              , i = t.getCollectionForFolder(e.id)
              , n = t.getRootCollection();
            i.models.forEach(function(e) {
                n.add(e);
            }),
            i.reset(),
            delete t.folderCollections[e.id],
            n.remove(e);
        }
    });
    return a.applyToClass(r),
    r;
}),
define("actions/sidebar/RepositionList", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e) {
            this.listLookup = e;
        },
        moveListsTo: function(e, t, i, n) {
            var o = t && t.attributes.position || 0
              , a = i && i.attributes.position || 0
              , r = a - o
              , s = (r ? r : 10) / (e.length + 1);
            !t && i ? o = a - 10 : !i && t && (s = 10),
            e.forEach(function(e, t) {
                if (e) {
                    var i = o + s * (t + 1);
                    e.save({
                        position: i
                    }, n);
                }
            });
        },
        repositionHandleAtRoot: function(e, t, i) {
            var n = this;
            return n.moveListsTo(e.getLists(), t && t.getTopList(), i && i.getTopList());
        },
        repositionListInFolder: function(e, t, i) {
            var n, o, a = this, r = a.listLookup.getListModel(e);
            return n = t ? a.listLookup.getListModel(t) : a.listLookup.getListBefore(i),
            o = i ? a.listLookup.getListModel(i) : a.listLookup.getListAfter(t),
            a.moveListsTo([r], n, o);
        },
        ensureListIsSiblingOrAfter: function(e, t) {
            var i, n = this, o = n.listLookup.getListModel(e), a = n.listLookup.getListModel(t);
            o.attributes.position < a.attributes.position && (i = n.listLookup.getListBefore(a.id),
            i && n.moveListsTo([o], i, a));
        }
    });
    return t;
}),
define("actions/sidebar/FolderHandle", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e, t) {
            this.folderId = e,
            this.hierarchy = t;
        },
        getTopList: function() {
            var e = this.getLists();
            return e[0];
        },
        getBottomList: function() {
            var e = this.getLists();
            return e[e.length - 1];
        },
        getLists: function() {
            return this.hierarchy.getCollectionForFolder(this.folderId).models.slice();
        }
    });
    return t;
}),
define("actions/sidebar/ListHandle", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e) {
            this.listModel = e;
        },
        getTopList: function() {
            return this.listModel;
        },
        getBottomList: function() {
            return this.listModel;
        },
        getLists: function() {
            return [this.listModel];
        }
    });
    return t;
}),
define("actions/sidebar/Folder", ["actions/sidebar/FolderHandle", "project!core"], function(e, t) {
    var i = t.WBClass.extend({
        initialize: function(e, t, i, n, o) {
            var a = this;
            a.folderModel = e,
            a.allFolders = t,
            a.repositionList = i,
            a.hierarchy = n,
            a.listLookup = o;
        },
        dissolve: function() {
            var e = this;
            e.folderModel.destroy();
        },
        rename: function(e) {
            var t = this;
            t.folderModel.save({
                title: e
            });
        },
        getListCollection: function() {
            var e = this;
            return e.hierarchy.getCollectionForFolder(e.folderModel.id);
        },
        moveList: function(e, t, i) {
            var n = this;
            n.repositionList.repositionListInFolder(e, t, i);
            var o = n.allFolders.findFolderForListId(e);
            o && o.removeListId(e),
            n.folderModel.addListId(e);
        },
        appendList: function(t) {
            var i = this
              , n = new e(i.folderModel.id,i.hierarchy)
              , o = n.getBottomList()
              , a = o && i.listLookup.getListAfter(o.id);
            i.moveList(t, o && o.id, a && a.id);
        }
    });
    return i;
}),
define("actions/Sidebar", ["project!core", "models/FolderModel", "actions/sidebar/Hierarchy", "actions/sidebar/RepositionList", "actions/sidebar/FolderHandle", "actions/sidebar/ListHandle", "actions/sidebar/Folder"], function(e, t, i, n, o, a, r) {
    var s = "application/x-wunderlist-list"
      , l = "application/x-wunderlist-folder"
      , c = e.WBClass.extend({
        initialize: function(e, t, o) {
            var a = this;
            a.listLookup = o,
            a.allFolders = t,
            a.sortedLists = e,
            a.hierarchy = new i(a.sortedLists,a.allFolders),
            a.repositionList = new n(o);
        },
        createFolder: function(e, t, i) {
            var n = this;
            n.allFolders.models.forEach(function(e) {
                e.isListIdInFolder(t) && e.removeListId(t);
            }),
            i && n.repositionList.ensureListIsSiblingOrAfter(t, i);
            var o = [t];
            i && o.unshift(i);
            var a = {
                title: e,
                list_ids: o,
                expanded: !0
            }
              , r = this.allFolders.add(a);
            return r.id;
        },
        removeListFromFolder: function(e) {
            var t = this
              , i = t.listLookup.getFolderModel(e);
            if (i) {
                var n = new o(i.id,t.hierarchy)
                  , r = n.getBottomList()
                  , s = r && t.listLookup.getListAfter(r.id)
                  , l = s && new a(s);
                t.moveListInRoot(e, n, l);
            }
        },
        moveListInRoot: function(e, t, i) {
            var n = this
              , o = n.getFolderforList(e);
            o && o.removeListId(e);
            var r = n.sortedLists.get(e)
              , s = new a(r);
            n.repositionList.repositionHandleAtRoot(s, t, i);
        },
        repositionFolder: function(e, t, i) {
            var n = new o(e,this.hierarchy);
            this.repositionList.repositionHandleAtRoot(n, t, i);
        },
        expandFolderForList: function(e) {
            var t = this.getFolderforList(e);
            t && t.save("expanded", !0);
        },
        getRootCollection: function() {
            return this.hierarchy.getRootCollection();
        },
        getFolderforList: function(e) {
            return this.allFolders.findFolderForListId(e);
        },
        getFolderActions: function(e) {
            var t = this
              , i = t.allFolders.get(e);
            return new r(i,t.allFolders,t.repositionList,t.hierarchy,t.listLookup);
        },
        createIdHandle: function(e, t) {
            var i, n = this;
            return t === s ? (i = n.sortedLists.get(e),
            new a(i)) : t === l ? new o(e,n.hierarchy) : void console.trace("invalid mimeType to be used in the sidebar reordering: " + t);
        }
    });
    return c;
}),
define("actions/UpdateComment", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            this.commentLookup = e;
        },
        _processModels: function(e) {
            return e.filter(function(e) {
                return !!e.attributes.online_id;
            }),
            e.sort(function(e, t) {
                return parseInt(e.attributes.online_id, 10) > parseInt(t.attributes.online_id, 10) ? 1 : -1;
            }),
            e;
        },
        markAllReadForTask: function(e) {
            var t = this
              , i = t.commentLookup.getCommentsCollection(e)
              , n = t.commentLookup.getCommentsStateCollection(e).at(0)
              , o = t._processModels(i.models)
              , a = o[o.length - 1];
            n && a && n.save({
                last_read_id: a.id,
                unread_count: 0
            });
        }
    });
}),
define("actions/UpdateList", ["project!core"], function(e) {
    return e.WBClass.extend({
        initialize: function(e) {
            this.listLookup = e;
        },
        _updateListPublished: function(e, t) {
            var i = this
              , n = i.listLookup.getListModel(e);
            n && n.save({
                "public": t
            });
        },
        publishList: function(e) {
            this._updateListPublished(e, !0);
        },
        unpublishList: function(e) {
            this._updateListPublished(e, !1);
        }
    });
}),
define("actions/UpdateProducts", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e) {
            this.allProducts = e.allProducts;
        },
        updateProducts: function(e) {
            this.allProducts.reset(e);
        }
    });
    return t;
}),
define("actions/UpdateSubtaskTitle", ["project!core"], function(e) {
    var t = e.WBClass.extend({
        initialize: function(e) {
            this.allSubtasks = e.allSubTasks;
        },
        updateSubtaskTitle: function(e, t) {
            var i = this.allSubtasks.get(t);
            i && e && i.save({
                title: e
            });
        }
    });
    return t;
}),
define("helpers/collectionSorting", ["vendor/lodash", "vendor/moment", "project!core"], function(e, t, i) {
    return i.WBSingleton.extend({
        dualBinarySort: function(e, i, n, o, a, r) {
            var s, l, c, d = n.attributes[e], u = o.attributes[e], m = n.attributes[i], p = o.attributes[i];
            if (d === u && m === p)
                l = n.id,
                c = o.id,
                s = l > c ? 1 : c > l ? -1 : 0;
            else if (d === u) {
                if ("due_date" === i)
                    l = t(m).valueOf(),
                    c = t(p).valueOf();
                else {
                    if ("completed_at" === i || n.attributes.completed_at && o.attributes.completed_at)
                        return this.handleCompletedSorting(n, o);
                    l = m,
                    c = p;
                }
                s = l > c ? 1 : c > l ? -1 : 0;
            } else if (d && !u)
                s = a ? 1 : -1;
            else if (!d && u)
                s = a ? -1 : 1;
            else if (d && u && r) {
                if ("due_date" === e)
                    l = t(d).valueOf(),
                    c = t(u).valueOf();
                else {
                    if ("completed_at" === i || n.attributes.completed && o.attributes.completed)
                        return this.handleCompletedSorting();
                    l = d,
                    c = u;
                }
                s = l > c ? 1 : c > l ? -1 : 0;
            }
            return s;
        },
        handleCompletedSorting: function(e, t) {
            var i = e.attributes.completed_at && Date.parse(e.attributes.completed_at)
              , n = t.attributes.completed_at && Date.parse(t.attributes.completed_at);
            return i > n ? -1 : n > i ? 1 : 0;
        },
        sortAndRemove: function(t, i) {
            var n = e.groupBy(t, i);
            return delete n[-1],
            t = [],
            e.each(n, function(e) {
                t = t.concat(e);
            }),
            t;
        }
    });
}),
define("actions/DestructiveSorting", ["application/runtime", "helpers/collectionSorting", "helpers/Positions", "vendor/moment", "project!core"], function(e, t, i, n, o, a) {
    var r = e._
      , s = ["alpha", "dueDate", "assignee", "position", "creation", "priority"];
    return o.WBClass.extend({
        initialize: function(e, t, i) {
            var n = this;
            n.userLookup = e,
            n.listLookup = t,
            n.taskLookup = i;
        },
        resortCollection: function(e, t, i) {
            var n = this;
            if (e) {
                var o;
                o = e.models[0] && /task/i.test(e.models[0].attributes.type) ? e.where({
                    completed: !1
                }) : r.clone(e.models),
                e.remove(o, {
                    fromDestructiveSort: !0
                });
                var a = "sortBy" + t.charAt(0).toUpperCase() + t.substring(1, t.length);
                o = n[a](o, i);
                var s = 0;
                return r.each(o, function(e) {
                    e.save({
                        position: s
                    }),
                    s += 10;
                }),
                e.add(o, {
                    bypassSort: !0,
                    fromDestructiveSort: !0
                }),
                o;
            }
        },
        resortList: function(e, t) {
            var i = this
              , n = i.taskLookup.getTaskCollection(e);
            if (n.models.length && !(r.indexOf(s, t) < 0)) {
                var o = i.resortCollection(n, t, e);
                return o;
            }
        },
        resortSortableLists: function(e) {
            var t = this
              , i = t.listLookup.sortableLists;
            if (i.models.length && !(r.indexOf(s, e) < 0)) {
                var n = t.resortCollection(i, e);
                return n;
            }
        },
        sortByPosition: function(e) {
            return e.sort(function(e, t) {
                var n = e.attributes.position
                  , o = t.attributes.position;
                return i.isValidPosition(n) && i.isValidPosition(o) && n !== o ? o > n ? -1 : n > o ? 1 : 0 : e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
            }),
            e;
        },
        sortByAlpha: function(e) {
            function t(e) {
                var t = i[e.id];
                return t !== a ? t : (i[e.id] = (e.attributes.title || "").toLowerCase(),
                i[e.id]);
            }
            var i = {};
            return e.sort(function(e, i) {
                var n = t(e)
                  , o = t(i);
                return n === o && (n = e.attributes.position,
                o = i.attributes.position),
                n > o ? 1 : o > n ? -1 : 0;
            }),
            e;
        },
        sortByDueDate: function(e) {
            function t(e, t) {
                var i = o[t][e.id];
                return i !== a ? i : (o[t][e.id] = e.attributes[t] ? n(e.attributes[t]).valueOf() : a,
                o[t][e.id]);
            }
            var i = this
              , o = {
                created_at: {},
                due_date: {}
            }
              , s = r.filter(e, function(e) {
                return !!e.attributes.due_date;
            })
              , l = r.filter(e, function(e) {
                return !e.attributes.due_date;
            });
            return s.sort(function(e, n) {
                return i._withDueDateSort(e, n, t);
            }),
            l.sort(function(e, n) {
                return i._withoutDuedateSort(e, n, t);
            }),
            e = s.concat(l);
        },
        _withDueDateSort: function(e, t, i) {
            var n = i(e, "due_date")
              , o = i(t, "due_date");
            return n === o && (n = e.attributes.position,
            o = t.attributes.position),
            n > o ? 1 : o > n ? -1 : 0;
        },
        _withoutDuedateSort: function(e, t, i) {
            var n = this;
            return e.attributes.created_at && t.attributes.created_at ? n._notMissingCreatedAtSort(e, t, i) : n._missingCreatedAtSort(e, t);
        },
        _missingCreatedAtSort: function(e, t) {
            var i = e.attributes.created_at
              , n = t.attributes.created_at;
            return !i && n ? 1 : i && !n ? -1 : 0;
        },
        _notMissingCreatedAtSort: function(e, t, i) {
            var n = i(e, "created_at")
              , o = i(t, "created_at");
            return n === o && (n = e.attributes.position,
            o = t.attributes.position),
            n > o ? 1 : o > n ? -1 : 0;
        },
        sortByAssignee: function(e, t) {
            function i(e) {
                var i = o[e.id];
                if (i !== a)
                    return i;
                var r = n.getAssigneeNameFromId(e.attributes.assignee_id, t);
                return o[e.id] = r && r.toLowerCase(),
                o[e.id];
            }
            var n = this
              , o = {}
              , s = r.filter(e, function(e) {
                return !!e.attributes.assignee_id;
            })
              , l = r.filter(e, function(e) {
                return !e.attributes.assignee_id;
            });
            return s.sort(function(e, t) {
                var n = i(e)
                  , o = i(t);
                return n === o && (n = e.attributes.position,
                o = t.attributes.position),
                n > o ? 1 : o > n ? -1 : 0;
            }),
            l = n.sortByDueDate(l),
            e = s.concat(l);
        },
        sortByCreation: function(e) {
            return e.sort(function(e, t) {
                var i, n;
                return i = e.attributes.created_at,
                n = t.attributes.created_at,
                i === n && (i = e.attributes.position,
                n = t.attributes.position),
                i > n ? 1 : n > i ? -1 : 0;
            }),
            e;
        },
        sortByPriority: function(e) {
            var t = this
              , i = r.filter(e, function(e) {
                return !!e.attributes.starred;
            })
              , n = r.filter(e, function(e) {
                return !e.attributes.starred;
            });
            return i = t.sortByDueDate(i),
            n = t.sortByDueDate(n),
            e = i.concat(n);
        },
        getAssigneeNameFromId: function(e, t) {
            var i = this.userLookup.getAssignableCollectionForList(t);
            return i.get(e).attributes.name;
        }
    });
}),
define("helpers/validatePassword", [], function() {
    var e = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/]
      , t = {
        "password-presence": function(e) {
            return e ? void 0 : "login_empty_password";
        },
        "password-length": function(e) {
            return e.length < 8 ? "login_password_too_short" : void 0;
        },
        "password-characters": function(t) {
            var i = e.map(function(e) {
                return e.test(t);
            }).filter(function(e) {
                return e;
            });
            return i.length < 2 ? "login_password_too_short" : void 0;
        }
    };
    return function(e) {
        for (var i, n = null, o = Object.keys(t); !n && o.length; )
            i = t[o.shift()],
            n = i(e);
        return n;
    }
    ;
}),
define("actions/ChangePassword", ["project!core", "helpers/validatePassword"], function(e, t) {
    var i = e.WBClass.extend({
        initialize: function(e) {
            var t = this;
            t.user = e;
        },
        changePassword: function(t, i, n) {
            var o = this
              , a = new e.WBDeferred()
              , r = o._validateNewPassword(i, n);
            return r ? a.reject(r).promise() : (o.user.getUserService().changePassword(i, t).done(function() {
                a.resolve();
            }).fail(function() {
                a.reject("settings_account_change_password_error");
            }),
            a.promise());
        },
        _validateNewPassword: function(e, i) {
            var n = t(e)
              , o = t(i)
              , a = e !== i ? "login_password_not_match" : null;
            return n || o || a;
        }
    });
    return i;
}),
define("actions/Factory", ["project!core", "application/runtime", "collections/ListCollection", "collections/FolderCollection", "actions/services/ListLookup", "actions/services/FeatureLookup", "actions/services/FileLookup", "actions/services/FolderLookup", "actions/services/MembershipLookup", "actions/services/TaskLookup", "actions/services/CommentLookup", "actions/services/SubTaskLookup", "actions/services/ReminderLookup", "actions/services/NoteLookup", "actions/services/UserLookup", "actions/services/Date", "actions/services/DesktopNotificationLookup", "actions/services/ActivityCenterLookup", "actions/services/ProductLookup", "actions/services/ServiceLookup", "actions/services/SmartcardsLookup", "actions/services/SubscriptionLookup", "actions/services/InvoiceLookup", "actions/Duplication", "actions/Print", "actions/OpenUrl", "actions/DeleteTask", "actions/MoveTask", "actions/StarTask", "actions/CompleteTask", "actions/CompleteSubTask", "actions/DeleteSubTask", "actions/ReparentTask", "actions/AutomaticReminder", "actions/TaskAssignee", "actions/TaskDue", "actions/TaskReminder", "actions/TaskTitle", "actions/AssignTask", "actions/RepositionTask", "actions/RepositionSubTask", "actions/CreateList", "actions/DeleteList", "actions/DeleteComment", "actions/DeleteFile", "actions/DeleteReminder", "actions/CreateComment", "actions/CreateFile", "actions/CreateTask", "actions/CreateSubtask", "actions/CreateReminder", "actions/CreateNote", "actions/CreateService", "actions/MuteList", "actions/Sidebar", "actions/UpdateComment", "actions/UpdateList", "actions/UpdateProducts", "actions/UpdateSubtaskTitle", "actions/DestructiveSorting", "actions/ChangePassword"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S, L, D, j, M, z, I, A, P, B, F, E, O, R, $, W, N, V, U, H, Y, q, K, G, Z, X, J, Q, ee, te, ie, ne, oe, ae, re) {
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
define("mixins/ResourceMixin", ["application/runtime", "project!core"], function(e, t, i) {
    return t.WBMixin.extend({
        getResource: function(e, t) {
            var i = this;
            return t = t || i.deferred(),
            i.router.whenAuthorized(function() {
                i.router[i.resourceName + "sDeferred"].done(function(n) {
                    var o = n.get(e);
                    o ? t.resolve(o) : i.handleNotFound(e, t);
                });
            }),
            t.promise();
        },
        handleNotFound: function(t, n) {
            var o = this;
            o.open404(n),
            e.lastListID = i;
        },
        open404: function(e) {
            var t = this;
            e.reject(),
            t.router.open404(t.resourceName);
        }
    });
}),
define("routes/ResourceRoutesController", ["wunderbits/WBRoutesController", "mixins/ResourceMixin"], function(e, t) {
    var i = e.prototype;
    return e.extend({
        mixins: [t],
        initialize: function() {
            var e = this;
            i.initialize.apply(e, arguments),
            e.createReadyDeferred();
        },
        createReadyDeferred: function() {
            var e = this
              , t = e.deferred();
            e.router.whenAuthorized(function() {
                e.router[e.resourceName + "sDeferred"].done(function(e) {
                    t.resolve(e);
                });
            }),
            e[e.resourceName + "sReady"] = t.promise();
        },
        setFocus: function() {}
    });
}),
define("routes/TasksRoutesController", ["application/runtime", "actions/Factory", "routes/ResourceRoutesController"], function(e, t, i) {
    var n = e._
      , o = i.prototype;
    return i.extend({
        resourceName: "task",
        initialize: function() {
            var e = this;
            e.taskLookup = t.taskLookup(),
            o.initialize.apply(e, arguments);
        },
        show: function(t, i, n) {
            var o = this
              , a = o.deferred();
            return o.getResource(t).done(function(t) {
                o.open(t, {
                    attribute: i,
                    fullscreen: !!n
                }).done(a.resolve, a);
                var r = t.attributes.online_id;
                if (r && t.id !== t.attributes.online_id && e.currentRoute().indexOf(t.id) >= 0) {
                    var s = e.currentRoute().replace(t.id, t.attributes.online_id);
                    e.trigger("route:" + s, {
                        replace: !0
                    });
                }
            }).fail(a.resolve, a),
            a.promise();
        },
        focus: function(e, t) {
            var i = this
              , n = i.deferred();
            return i.getResource(e).done(function(e) {
                i.open(e, {
                    focusAttribute: t
                }).done(n.resolve, n);
            }).fail(n.resolve, n),
            n.promise();
        },
        edit: function(t, i, n) {
            var o = this
              , a = o.deferred();
            return o.getResource(t).done(function(t) {
                return t.attributes.completed ? (a.resolve(),
                e.trigger("route:" + t.route())) : void o.open(t, {
                    attribute: i,
                    fullscreen: !!n
                }).done(a.resolve, a);
            }).fail(a.resolve, a),
            a.promise();
        },
        open: function(t, i) {
            var n = this
              , o = n.deferred()
              , a = n.router.interfaceReturnRoute;
            return i || (i = {}),
            (!a || a.indexOf("tasks/") < 0) && (n.taskReturnRoute = a || "lists/" + t.attributes.list_id),
            n.requestComments(t),
            t.isCompleted() && n.requestCompletedTaskWithResources(t),
            e.trigger("browser:taskId", t.id),
            n.outlet.openTask(t, {
                editAttribute: i.attribute,
                focusAttribute: i.focusAttribute,
                returnRoute: n.taskReturnRoute,
                options: {
                    fullscreen: i.fullscreen,
                    edit: i.openEdit
                }
            }),
            n.setFocus(i),
            n.defer(o.resolve, o),
            o.promise();
        },
        handleNotFound: function(t, i) {
            var n = this
              , a = arguments;
            e.sdk.initialized.done(function() {
                e.sdk.getOutlet().tasks.getID(t).done(function(e) {
                    e.completed ? n.fetchCompletedTask(e, i) : n.fetchTask(e, i);
                }).fail(function() {
                    o.handleNotFound.apply(n, a);
                });
            });
        },
        fetchCompletedTask: function(t, i) {
            var n = this
              , a = t.id
              , r = t.list_id
              , s = n.bindTo(e, "sync:ended", function(e, t) {
                if ("fetchCompleted" === t) {
                    n.unbindFrom(s);
                    var r = n.taskLookup.getCompletedTaskModel(a);
                    r ? i.resolve(r) : o.handleNotFound.call(n, a, i);
                }
            });
            e.sync.onSync(!1, "completed", "tasks", r);
        },
        fetchTask: function(t, i) {
            var n = this
              , a = t.id
              , r = n.bindTo(e, "sync:ended", function(e, t) {
                if ("fetchTask" === t) {
                    n.unbindFrom(r);
                    var s = n.taskLookup.getTaskModel(a);
                    s ? i.resolve(s) : o.handleNotFound.call(n, a, i);
                }
            });
            e.sync.onSync(!1, "task", a);
        },
        requestComments: function(t) {
            n.delay(function() {
                e.trigger("requestComments", t.attributes.online_id);
            }, 400);
        },
        requestCompletedTaskWithResources: function(t) {
            e.trigger("sync:start", !1, "completed", "task", t.attributes.online_id, !0);
        },
        showComments: function(t) {
            var i = this;
            return e.trigger("route:tasks/" + t + "/comments/edit"),
            i.deferred().resolve().promise();
        },
        setFocus: function(t) {
            var i = "browser";
            t.fullscreen ? i = "fullscreenNote" : (t.attribute || t.focusAttribute) && (i = "detail"),
            e.trigger("focus:set", i);
        }
    });
}),
define("routes/DebugRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    return t.extend({
        name: "debug"
    });
}),
define("routes/LabsRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        name: "labs",
        beforeShow: function(t) {
            var n = this;
            e.isLabsEnabled() ? i.beforeShow.apply(n, arguments) : (t.resolve(),
            e.trigger("route:lists/inbox"));
        }
    });
}),
define("routes/RateRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    return t.extend({
        name: "rate"
    });
}),
define("routes/ListOptionsRoutesController", ["application/runtime", "./ModalRoutesController", "mixins/ResourceMixin"], function(e, t, i) {
    var n = t.prototype;
    return t.extend({
        name: "listOptions",
        resourceName: "list",
        mixins: [i],
        "new": function() {
            var e = this;
            return e.model = null,
            e.tab = null,
            e.show();
        },
        newWithTasks: function(e) {
            var t = this;
            t.taskIds = e.split(","),
            t["new"]();
        },
        isRelatedUrl: function(e) {
            var t = this;
            return e.indexOf("lists/new") >= 0 || e.indexOf("lists/" + t.id + "/edit") >= 0;
        },
        beforeShow: function() {
            var e = this
              , t = e.router;
            e.isRelatedUrl(t.previousRoute) || n.beforeShow.apply(e, arguments);
        },
        shouldTriggerReturnUrl: function() {
            var t = this;
            return t.isRelatedUrl(e.currentRoute());
        },
        edit: function(t, i) {
            var n = this
              , o = n.router
              , a = n.deferred()
              , r = n.deferred();
            return n.tab = i,
            n.id = t,
            "inbox" === t ? (e.trigger("route:lists/inbox"),
            a.resolve().promise()) : (n.returnRoute = "lists/" + t,
            o.previousRoute && 0 === o.previousRoute.indexOf(n.returnRoute) ? r.resolve() : o.whenListHasLoaded(t).done(function() {
                r.resolve();
            }),
            r.done(function() {
                n.getResource(t).done(function(e) {
                    n.model = e,
                    n.taskIds = null,
                    n.show(),
                    a.resolve();
                });
            }),
            a.promise());
        },
        getOptions: function() {
            var e = this
              , t = n.getOptions.apply(e, arguments);
            return e.model && (t.model = e.model),
            e.taskIds && (t.taskIds = e.taskIds),
            t.tab = e.tab,
            t;
        }
    });
}),
define("routes/TellRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    return t.extend({
        name: "tell"
    });
}),
define("routes/BackgroundRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    return t.extend({
        name: "backgrounds"
    });
}),
define("routes/GoProRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    return t.extend({
        name: "goPro",
        afterClose: function() {
            var e = this
              , t = e.router
              , i = e.returnRoute || t.interfaceReturnRoute || t.defaultRoute;
            i = i.replace("assignee/edit", "assignee/focus"),
            e.shouldTriggerReturnUrl(i) && t.setRoute(i);
        }
    });
}),
define("routes/ChooseListsRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    return t.extend({
        name: "chooseLists"
    });
}),
define("routes/ChooseBusinessListsRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    return t.extend({
        name: "chooseBusinessLists"
    });
}),
define("routes/PreferencesRoutesController", ["application/runtime", "./ModalRoutesController"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        name: "preferences",
        focus: "settings",
        show: function(e, t) {
            var n = this;
            return n.section = e,
            n.subsection = t,
            n.translateSections(),
            i.show.apply(n, arguments);
        },
        beforeShow: function() {
            var e = this
              , t = e.router;
            0 !== t.previousRoute.indexOf("preferences") && i.beforeShow.apply(e, arguments);
        },
        showModal: function() {
            var t = this
              , n = t.router;
            0 !== n.previousRoute.indexOf("preferences") && i.showModal.apply(t, arguments),
            e.trigger("settings:section", t.section, t.subsection);
        },
        shouldTriggerReturnUrl: function() {
            var t = this;
            return 0 === e.currentRoute().indexOf(t.name);
        },
        afterClose: function() {
            var e = this
              , t = e.router;
            e.returnRoute && e.returnRoute.indexOf("connect/facebook") >= 0 && (e.returnRoute = t.defaultRoute),
            i.afterClose.apply(e, arguments);
        },
        translateSections: function() {
            var t = this;
            "account" === t.section && t.subsection && "pro" === t.subsection && (e.user.isPro() ? e.trigger("route:preferences/account") : t.section = "account-pro"),
            "teams" === t.section && t.subsection && "manage" === t.subsection && (t.section = "team-manage"),
            "team-manage" !== t.section && "teams" !== t.section || !e.user.isProTeamMember() || (t.section = "account");
        }
    });
}),
define("routes/SearchRoutesController", ["application/runtime", "wunderbits/WBRoutesController"], function(e, t) {
    return t.extend({
        show: function(t) {
            var i = this
              , n = i.deferred()
              , o = e.currentRoute();
            return e.state.set("inSearchState", !0),
            e.lastListID = null,
            i.router.whenAuthorized(function() {
                var a = i.router.searchReturnRoute || i.router.defaultRoute
                  , r = 2e3
                  , s = !0;
                i.router.whenInterfaceHasLoaded().done(function() {
                    function l() {
                        o === e.currentRoute() && (e.trigger("search:start", t, a, {
                            inboxID: "inbox"
                        }),
                        s && e.global.setTimeout(l, r));
                    }
                    i.router.outlet.goToPage("lists"),
                    i.router.outlet.activeView && i.router.outlet.activeView.toggleDetailView(!1, !1),
                    i.router.whenDataHasLoaded().done(function() {
                        s = !1;
                    }),
                    l(),
                    n.resolve();
                });
            }),
            n.promise();
        }
    });
}),
define("routes/ListRoutesController", ["application/runtime", "actions/Factory", "routes/ResourceRoutesController"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        resourceName: "list",
        initialize: function() {
            var e = this;
            e.listLookup = t.listLookup(),
            n.initialize.apply(e, arguments);
        },
        getResource: function(t, i) {
            var o = this;
            return i = i || o.deferred(),
            o.listsReady.done(function(a) {
                var r = a.get(t);
                if (r) {
                    if ("inbox" !== t && r.attributes.online_id && r.id !== r.attributes.online_id && e.currentRoute().indexOf(r.id) >= 0) {
                        var s = e.currentRoute().replace(r.id, r.attributes.online_id);
                        e.trigger("route:" + s, {
                            replace: !0
                        });
                    }
                    i.resolve(r);
                } else
                    n.getResource.call(o, t, i);
            }),
            i.promise();
        },
        show: function(t) {
            var i = this
              , n = i.deferred();
            return -1 === i.router.currentRoute.indexOf("search") && e.trigger("search:cancel"),
            e.smartLists.indexOf(t) >= 0 ? i.showSmartList(t) : (i.getResource(t).done(function(t) {
                n.resolve(),
                e.currentRoute().indexOf(t.id) >= 0 && i.setFocus(),
                i.outlet.openList(t);
            }).fail(n.reject, n),
            n.promise());
        },
        handleNotFound: function(t, i) {
            var o = this
              , a = arguments;
            e.sdk.initialized.done(function() {
                e.sdk.getOutlet().lists.getID(t).done(function(e) {
                    o.fetchList(e, i);
                }).fail(function() {
                    n.handleNotFound.apply(o, a);
                });
            });
        },
        fetchList: function(t, i) {
            var o = this
              , a = t.id
              , r = o.bindTo(e, "sync:ended", function(e, t) {
                if ("fetchList" === t) {
                    o.unbindFrom(r);
                    var s = o.listLookup.getListModel(a);
                    s ? i.resolve(s) : n.handleNotFound(a, i);
                }
            });
            e.sync.onSync(!1, "list", a);
        },
        showSmartList: function(t) {
            var i = this
              , n = i.deferred();
            return i.listsReady.done(function() {
                e.smartLists.indexOf(t) >= 0 ? (e.trigger("browser:taskId", null),
                i.outlet.openFilter(t),
                i.setFocus(),
                "completed" === t && e.trigger("sync:start", !1, "completed", "all"),
                n.resolve()) : n.reject();
            }),
            n.promise();
        },
        inbox: function() {
            var e = this
              , t = e.deferred();
            return e.listsReady.done(function(i) {
                var n = i.find(function(e) {
                    return "inbox" === e.attributes.list_type;
                });
                e.show(n && n.id).always(function() {
                    t.resolve();
                });
            }),
            t.promise();
        },
        "new": function(t) {
            var i = this
              , n = i.show(t);
            return n.done(function() {
                i.outlet.activeView && i.outlet.activeView.toggleDetailView(!1, !0),
                i.defer(i.outlet.setFocusToAddTask, i.outlet),
                e.trigger("search:cancel");
            }),
            n;
        },
        setFocus: function() {
            e.trigger("focus:set", "sidebar");
        }
    });
}),
define("routes/ConversationsRoutesController", ["application/runtime", "wunderbits/WBRoutesController"], function(e, t) {
    return t.extend({
        name: "conversations",
        show: function() {
            var t = this
              , i = t.router
              , n = t.deferred()
              , o = i.interfaceReturnRoute;
            return i.whenAuthorized(function() {
                i.whenInterfaceHasLoaded().done(function() {
                    e.trigger(t.name + ":open", {
                        returnRoute: o
                    }),
                    n.resolve();
                });
            }),
            n.promise();
        }
    });
}),
define("routes/ActivitiesRoutesController", ["application/runtime", "./ConversationsRoutesController"], function(e, t) {
    return t.extend({
        name: "activities",
        redirect: function() {
            var e = this
              , t = e.deferred();
            return e.router.setRoute(e.name),
            t.resolve().promise();
        }
    });
}),
define("routes/FolderRoutesController", ["application/runtime", "routes/ResourceRoutesController"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        resourceName: "folder",
        getResource: function(e, t) {
            var n = this;
            return t = t || n.deferred(),
            n.foldersReady.done(function(o) {
                var a = o.get(e);
                a ? t.resolve(a) : i.getResource.call(n, e, t);
            }),
            t.promise();
        },
        edit: function(e) {
            var t = this;
            t.router.whenInterfaceHasLoaded().done(function() {
                t.getResource(e).done(function(e) {
                    var i = {
                        returnRoute: t.router.interfaceReturnRoute
                    };
                    t.outlet.editFolder(e, i);
                });
            });
        },
        setFocus: function() {
            e.trigger("focus:set", "sidebar");
        }
    });
}),
define("wunderbits/WBRouter", ["./WBRuntime", "./mixins/WBInstanceUtilitiesMixin", "project!core"], function(e, t, i, n) {
    var o = e
      , a = o._
      , r = o.Backbone
      , s = o.global
      , l = i.WBDeferred
      , c = i.mixins.WBEventsMixin
      , d = i.mixins.WBBindableMixin
      , u = i.mixins.WBUtilsMixin
      , m = i.lib.when
      , p = r.Router.prototype
      , g = i.WBClass.prototype
      , f = s.history && s.history.replaceState
      , b = r.Router.extend({
        "implements": {},
        _basicRoutes: {
            "": "_triggerDefault",
            "/": "_triggerDefault",
            ":route": "_trigger404",
            ":route/*subroute": "_trigger404"
        },
        didFireSetRoute: {},
        constructor: function(e) {
            var t = this;
            return e || (e = {}),
            t.outlet = e.outlet || t.outlet,
            g.augmentProperties.call(t),
            g.initMixins.call(t, e),
            t.bindTo(o, "route", t.setRoute),
            this.isInitialRoute = !0,
            p.constructor.apply(t, arguments),
            t.params = {},
            t.implementControllers(),
            t;
        },
        before: function() {},
        open404: function() {},
        onBackOrForward: function() {},
        triggerRoute: function() {
            var e = new l();
            return e.resolve().promise();
        },
        parseParams: function(e) {
            var t = {}
              , i = s.location;
            return e = e || i.href.split(/\?|#/)[1] || "",
            e.length && (a.each(e.split("&"), function(e) {
                e = e.split("="),
                t[e[0]] = e[1] || null;
            }),
            f && a.defer(function() {
                var e = i.protocol + "//" + i.host + i.pathname + i.hash;
                try {
                    s.history.replaceState(null, "noParams", e);
                } catch (t) {
                    console.error("unable to replace state", t);
                }
            })),
            t;
        },
        parseQueryString: function(e) {
            for (var t = e.split("&"), i = {}, n = 0; n < t.length; n++) {
                var o = t[n].split("=");
                o[0].length && o[1] && o[1].length && (0 === n && (o[0] = 0 === o[0].indexOf("?") ? o[0].substring(1) : o[0]),
                i[decodeURIComponent(o[0])] = decodeURIComponent(o[1]));
            }
            return i;
        },
        start: function() {
            var e = this;
            e.hasStarted || (e.params = e.parseParams(),
            !r.History.started && r.history.start(),
            e.hasStarted = !0,
            e.trigger("started"));
        },
        _trigger404: function() {
            this.open404();
        },
        _triggerDefault: function() {
            var e = this;
            e.defaultRoute && e.setRoute(e.defaultRoute);
        },
        _getRoutesHash: function() {
            var e = this;
            return a.extend(e.routes || {}, e._basicRoutes);
        },
        implementControllers: function() {
            var e = this;
            e.controllers = {};
            for (var t in e["implements"]) {
                var i = e["implements"][t];
                e.controllers[t] = new i({
                    outlet: e.outlet,
                    router: e
                });
            }
        },
        _bindRoutes: function() {
            var e = this;
            e.routes = e._getRoutesHash(),
            p._bindRoutes.apply(e, arguments);
        },
        route: function(e, t) {
            var i = this
              , n = function() {
                var n = arguments;
                i.didFireSetRoute[o.currentRoute()] || (i.shouldTriggerRoutes = null);
                var a = i.before.apply(i, [e, t])
                  , r = i
                  , s = "function" == typeof t ? t : i[t];
                if (t.indexOf("#") > 0) {
                    var c = t.split("#")
                      , d = i.controllers[c[0]]
                      , u = c[1];
                    r = d,
                    s = d[u],
                    d.params = i.params,
                    d.stillActive = i.lastController === d,
                    i.lastController = d;
                }
                if (a !== !1 && i.shouldTriggerRoutes !== !1 && "function" == typeof s) {
                    var p = function() {
                        var e = new l();
                        i.routing = e.promise(),
                        i.previousRoute = i.currentRoute || "",
                        i.currentRoute = o.currentRoute();
                        var t = i.triggerRoute(i.currentRoute);
                        t.done(function() {
                            var t = s.apply(r, n) || [];
                            i.isInitialRoute = !1,
                            m(t).always(function() {
                                e.resolve(),
                                o.trigger("routed", i.currentRoute, i.previousRoute);
                            });
                        });
                    };
                    m(i.routing || []).always(p, i);
                }
                i.shouldTriggerRoutes = null;
            };
            p.route.call(i, e, t, n);
        },
        setRoute: function(e, t) {
            var i = this;
            if (t = t || {},
            t.params && a.each(t.params, function(e, t) {
                t = decodeURIComponent(t),
                e = decodeURIComponent(e),
                i.params[t] = e;
            }),
            a.isArray(e) && (e = e[0]),
            i.didFireSetRoute[e] = !0,
            a.delay(function() {
                delete i.didFireSetRoute[e];
            }, 500),
            t.trigger === n && (t.trigger = !0),
            i.shouldTriggerRoutes = t.trigger,
            t.replace && f)
                try {
                    s.history.replaceState(null, "", "#/" + e || "");
                } catch (o) {
                    console.error("unable to replace state", o);
                }
            else if (!t.replaceOnly)
                try {
                    i.navigate("#/" + (e || ""), t);
                } catch (o) {
                    console.error("unable to navigate", o);
                }
        }
    });
    return c.applyToClass(b),
    d.applyToClass(b),
    u.applyToClass(b),
    t.applyToClass(b),
    b;
}),
function() {
    function e() {
        return {
            classCheckAttribute: function(e, t) {
                return 'Attribute "' + e + '" must be instance of ' + t;
            },
            typeCheckAttribute: function(e, t) {
                return 'Attribute "' + e + '" must be of type "' + t + '"';
            }
        };
    }
    define("wunderbits/errorFactory", e);
}(window),
define("wunderbits/WBValidationHelper", ["./lib/dependencies", "project!core", "./errorFactory"], function(e, t, i) {
    var n = ["array", "string", "number", "object", "boolean", "element", "function"]
      , o = t.WBSingleton.extend({
        capitalize: function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1);
        },
        isValidEmail: function(e) {
            var t = /^[^\s\n@]*[^\s\n\.@]\@[^\s\n\.@][^\s\n@]*(?=\.[^\s\.\n @]+$)\.[^\s\.\n @]+$/;
            return e && t.test(e);
        },
        classCheckAttribute: function(e, t, n, o) {
            var a = e && e[t];
            if (!a || !a.isInstanceOf || !a.isInstanceOf(n)) {
                var r = i.classCheckAttribute(t, o);
                throw new Error(r);
            }
            return a;
        },
        typeCheckAttribute: function(e, t, a) {
            var r = e && e[t]
              , s = "is" + o.capitalize(a);
            if (-1 === n.indexOf(a) || !r || !o[s](r)) {
                var l = i.typeCheckAttribute(t, a);
                throw new Error(l);
            }
            return r;
        },
        isEqual: function(e, t) {
            return e === t;
        },
        isPasswordLengthOk: function(e) {
            return e.length >= 5;
        }
    })
      , a = Object.prototype.toString;
    return n.forEach(function(e) {
        var t = o.capitalize(e);
        o["is" + t] = function(e) {
            return a.call(e) === "[object " + t + "]";
        }
        ;
    }),
    o;
}),
define("applications/main/Router", ["application/runtime", "application/Redirector", "helpers/Cookie", "routes/StartRoutesController", "routes/FlashCardsRoutesController", "routes/TasksRoutesController", "routes/DebugRoutesController", "routes/LabsRoutesController", "routes/RateRoutesController", "routes/ListOptionsRoutesController", "routes/TellRoutesController", "routes/BackgroundRoutesController", "routes/GoProRoutesController", "routes/ChooseListsRoutesController", "routes/ChooseBusinessListsRoutesController", "routes/PreferencesRoutesController", "routes/SearchRoutesController", "routes/ListRoutesController", "routes/ActivitiesRoutesController", "routes/ConversationsRoutesController", "routes/FolderRoutesController", "wunderbits/WBRouter", "wunderbits/WBValidationHelper", "project!core"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C) {
    var T = y.WBDeferred
      , S = ["me", "activities", "activitycenter", "conversations", "debug", "labs", "preferences", "tell-your-friends", "backgrounds", "goPro", "chooseLists", "rate", "addList", "lists/new", "folders"]
      , L = e._
      , D = k.prototype;
    return k.extend({
        defaultRoute: "lists/inbox",
        "implements": {
            start: n,
            flashcard: o,
            tasks: a,
            debug: r,
            labs: s,
            rate: l,
            tell: d,
            background: u,
            chooseBusinessLists: g,
            goPro: m,
            chooseLists: p,
            preferences: f,
            listOptions: c,
            search: b,
            list: h,
            activities: v,
            conversations: _,
            folders: w
        },
        routes: {
            "setup/*path": "start#startAppFirstTime",
            "start/*path": "start#startApp",
            me: "openUserMenu",
            conversations: "conversations#show",
            activities: "activities#show",
            activitycenter: "activities#redirect",
            search: "search#show",
            "search/:term": "search#show",
            labs: "labs#show",
            "labs/flash-cards/:id": "flashcard#runForList",
            "undefinedlists/:id": "openListWithIDAndFixURL",
            "lists/new": "listOptions#new",
            "lists/new/:taskids": "listOptions#newWithTasks",
            "lists/:id/edit": "listOptions#edit",
            "lists/:id/edit/:tab": "listOptions#edit",
            "lists/inbox": "list#inbox",
            "lists/:id": "list#show",
            "lists/:id/tasks/new": "list#new",
            "folders/:id/edit": "folders#edit",
            "tasks/:id": "tasks#show",
            "tasks/:id/:attr/focus": "tasks#focus",
            "tasks/:id/:attr/edit": "tasks#edit",
            "tasks/:id/:attr/edit/:fullscreen": "tasks#edit",
            "tasks/:id/comments": "tasks#showComments",
            "tasks/:id/:attr/:fullscreen": "tasks#show",
            "add/?*URI": "addURIItemToInbox",
            "preferences/:section(/:subsection)": "preferences#show",
            rate: "rate#show",
            "tell-your-friends": "tell#show",
            backgrounds: "background#show",
            "goPro/:type": "goPro#show",
            chooseLists: "chooseLists#show",
            chooseBusinessLists: "chooseBusinessLists#show",
            debug: "debug#show",
            "payment/:params": "validatePayment",
            "_=_": "_triggerDefault"
        },
        initialize: function(n) {
            var o = this;
            n = n || {},
            D.initialize.apply(o, arguments),
            o.redirector = new t(),
            e.user.on("deleted", function() {
                if (o.loggingOut = !0,
                console.debug("router deleted bind triggered"),
                i.killCookie(),
                e.env.isPackagedApp())
                    e.reload("/login");
                else {
                    console.debug("about to write location.href to", "/logout");
                    var t = e.config
                      , n = t.auth && t.auth.host || "";
                    setTimeout(function() {
                        var t = n + "/logout";
                        e.global.location.assign(t),
                        console.debug("location.assigned to", t);
                    }, 1e3);
                }
            }),
            o.listsDeferred = new T(),
            o.bindTo(e, "lists:ready", o.listsDeferred.resolve, o.listsDeferred),
            o.tasksDeferred = new T(),
            o.bindTo(e, "tasks:ready", o.tasksDeferred.resolve, o.tasksDeferred),
            o.foldersDeferred = new T(),
            o.bindTo(e, "folders:ready", o.foldersDeferred.resolve, o.foldersDeferred),
            e.on("set:returnRouteAsInbox", o.setReturnRouteAsInbox);
        },
        start: function() {
            var e = this;
            D.start.apply(e, arguments),
            e.outlet.openMainInterface();
        },
        triggerRoute: function(t) {
            var i = this
              , n = new T()
              , o = e.user.getAuthorization();
            if (i.loggingOut)
                return n.reject().promise();
            "connected" === i.params.oauth && (delete i.params.oauth,
            e.hasRouted.done(function() {
                e.trigger("route:preferences/account");
            }));
            var a = function() {
                n.reject();
                var i = "/login/";
                t && (i += t),
                e.reload(i);
            };
            return o.done(function() {
                n.resolve(),
                i.updateInterfaceReturnURL();
            }),
            o.fail(function() {
                a();
            }),
            n.promise();
        },
        _triggerDefault: function() {
            var t = this;
            e.user.getAuthorization().done(function() {
                D._triggerDefault.apply(t, arguments);
            }).fail(function() {
                t.setRoute("welcome");
            });
        },
        whenAuthorized: function(t) {
            var n = this
              , o = function() {
                e.trigger("timer:start"),
                t(),
                n.lastAuthRoute = e.currentRoute(),
                e.trigger("update:lastAuthRoute", n.lastAuthRoute),
                n.updateInterfaceReturnURL();
            };
            e.user.getAuthorization().done(o).fail(function() {
                i.killCookie(),
                e.trigger("timer:stop"),
                e.trigger("route:welcome");
            });
        },
        open404: function(t) {
            var i = this;
            e.trigger("analytics:Application:404", e.currentRoute());
            var n;
            if (e.global.location.href.indexOf("access_token") >= 0)
                n = e.global.location.href.split("access_token=")[1],
                n = n.split("&")[0],
                i.loginWithFBToken(n);
            else if (e.user.attributes.access_token) {
                i.openDefault({
                    "404": !0
                });
                var o = i.outlet;
                i.defer(o.openTBV404, o, t),
                e.lastListID = C;
            } else
                e.global.location.href.indexOf("access_token") >= 0 ? (n = e.global.location.href.split("access_token=")[1],
                n = n.split("&")[0],
                i.loginWithFBToken(n)) : e.trigger("route:welcome");
        },
        updateInterfaceReturnURL: function() {
            var t = this
              , i = e.currentRoute()
              , n = !0;
            i && (i = i.replace("/action/share", ""),
            i = i.replace("/share", ""),
            L.each(S, function(e) {
                (i.indexOf(e) > -1 || 0 === i.indexOf("lists") && i.indexOf("/edit") > 0) && (n = !1);
            })),
            n && (t.interfaceReturnRoute = i),
            t.updateSearchReturnURL();
        },
        updateSearchReturnURL: function() {
            var t = this
              , i = e.currentRoute()
              , n = L.clone(S);
            n.push("search", "tasks");
            var o = !0;
            L.each(n, function(e) {
                i.indexOf(e) > -1 && (o = !1);
            }),
            o && (t.searchReturnRoute = i);
        },
        whenInterfaceHasLoaded: function() {
            var e = this
              , t = e.deferred()
              , i = function() {
                e.outlet.off("page", i),
                e.defer(t.resolve, t);
            };
            return e.outlet.on("page", i),
            e.isInitialRoute ? e.openDefault() : i(),
            t.promise();
        },
        whenDataHasLoaded: function() {
            var t = this
              , i = new T();
            return t.bindOnceTo(e, "db:allDataLoaded", i.resolve, i),
            i.promise();
        },
        whenListHasLoaded: function(e) {
            var t = this
              , i = new T()
              , n = function() {
                t.listsDeferred.done(function(o) {
                    var a = o.get(e);
                    t.outlet.off("page", n),
                    t.defer(i.resolve, i, a);
                });
            };
            return t.outlet.on("page", n),
            t.controllers.list.show(e),
            i.promise();
        },
        openUserMenu: function() {
            var t = this;
            t.whenAuthorized(function() {
                var i = t.interfaceReturnRoute;
                t.whenInterfaceHasLoaded().done(function() {
                    t.outlet.hideModals(),
                    e.trigger("toolbar:userMenu:open", {
                        returnRoute: i
                    }),
                    e.trigger("focus:set", "userMenu");
                });
            });
        },
        setReturnRouteAsInbox: function() {
            var e = this;
            e.interfaceReturnRoute = "lists/inbox";
        },
        openDefault: function(e) {
            e = e || {};
            var t = this;
            e[404] || t.whenAuthorized(function() {
                t.controllers.list.show("inbox");
            });
        },
        addURIItemToInbox: function(t) {
            var i = this
              , n = i.parseQueryString(t) || {};
            n.title && i.whenAuthorized(function() {
                i.tasksDeferred.done(function() {
                    e.trigger("route:" + i.defaultRoute),
                    e.once("sync:ended", function() {
                        e.trigger("add:fromURI", n);
                    }),
                    e.trigger("sync:start");
                });
            });
        },
        validatePayment: function(t) {
            var i, n, o = this, a = "authorised" === t, r = ["preferences/account", "preferences/team-manage"];
            o.whenAuthorized(function() {
                o.listsDeferred.done(function() {
                    var s = function() {
                        i = e.user.attributes.product,
                        n = e.user.attributes.group_product,
                        t = i && i.product_id ? t + ":" + i.product_id : a ? t + ":noProductSyncedForUser:" + e.user.id : t,
                        e.trigger("analytics:ProAccounts:returnStatus", t);
                    };
                    a ? (o.outlet.showLoading(),
                    e.once("sync:ended", function() {
                        o.outlet.hideLoading(),
                        o.whenListHasLoaded("inbox").done(function() {
                            var t = n ? 1 : 0;
                            !e.user.isPro() && e.user.attributes.group_product && e.trigger("groupProduct:addAdmin"),
                            o.delay(o.setRoute, 800, o, r[t]);
                        }),
                        s();
                    }),
                    e.trigger("sync:start", !0, "payment")) : (o.whenListHasLoaded("inbox").done(function() {
                        o.setRoute("preferences/account");
                    }),
                    s());
                });
            });
        }
    });
}),
define("wunderbits/lib/queryParser", [], function() {
    function e(e) {
        for (var t, i, n = e.split("&"), o = {}; n.length; )
            t = n.shift().split("="),
            i = t[0],
            i.length && (o[i] = t[1]);
        return o;
    }
    return e;
}),
define("backend/languageManager", ["application/runtime", "vendor/moment", "wunderbits/WBLanguageManager", "wunderbits/lib/queryParser"], function(e, t, i, n) {
    function o(e, i) {
        var n = {};
        a.each(i, function(e, t) {
            if (/^momentjs_[a-zA-Z_]+$/.test(t)) {
                var i = t.split("_");
                if (i.shift(),
                1 === i.length)
                    n[i[0]] = e.split("_");
                else {
                    for (var o; 1 !== i.length; )
                        o = i.shift(),
                        o = n[o] || (n[o] = {});
                    o[i[0]] = e;
                }
            }
        }),
        n.meridian = l[e] || l.en,
        n.ordinal = c[e] || c.en;
        try {
            t.lang(e, n);
        } catch (o) {
            o.message = "bad moment localization for " + e;
        }
    }
    var a = e._
      , r = e.global.location
      , s = n(r.search.substr(1))
      , l = {
        en: function(e, t, i) {
            return e > 11 ? i ? "pm" : "PM" : i ? "am" : "AM";
        }
    }
      , c = {
        en: function(e) {
            var t = e % 10;
            return 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        }
    }
      , d = i;
    return i.extend({
        init: function() {
            var t = this
              , i = e.language
              , n = e.settings;
            i.getLabel = a.bind(t.getLabel, t),
            i.getText = a.bind(t.getText, t),
            i.getDangerousRawText = a.bind(t.getDangerousRawText, t);
            var o = s.hl || t.detectLang();
            n.set("language", o),
            t.bindTo(n, "change:language", t.onLanguageChange),
            t.bindTo(d, "done", t.onDone),
            i.set("code", o),
            d.fetchData(o);
        },
        onLanguageChange: function() {
            var t = e.language
              , i = e.settings
              , n = i.get("language");
            t.set("code", n),
            d.fetchData(n);
        },
        onDone: function(t, i, n) {
            var a = e.language
              , r = i.dir || "ltr"
              , s = document.head.parentNode;
            s.setAttribute("dir", r),
            s.setAttribute("lang", t),
            a.set("dir", r),
            e.state.set("textDirection", r),
            o(t, n.data),
            a.set("data", n.data),
            a.ready.resolve(),
            e.trigger("language:change");
        }
    });
}),
define("backend/search/searchWorker", [], function() {
    return function() {
        function e(e, t) {
            s.index(e),
            self.postMessage({
                callbackId: t,
                data: "_index(" + e.id + ") done"
            });
        }
        function t(e, t) {
            s.add(e),
            self.postMessage({
                callbackId: t,
                data: "_add(" + e.id + ") done"
            });
        }
        function i(e, t) {
            s.remove(e),
            self.postMessage({
                callbackId: t,
                data: "_unIndex(" + e.id + ") done"
            });
        }
        function n(e, t) {
            var i = s.searchAll(e);
            self.postMessage({
                callbackId: t,
                data: i
            });
        }
        function o(e, t, i) {
            var n = s.getSuggestionsForField(e, t);
            self.postMessage({
                callbackId: i,
                data: n
            });
        }
        function a(e) {
            self.postMessage({
                callbackId: e
            });
        }
        !function l(e, t, i) {
            function n(a, r) {
                if (!t[a]) {
                    if (!e[a]) {
                        var s = "function" == typeof require && require;
                        if (!r && s)
                            return s(a, !0);
                        if (o)
                            return o(a, !0);
                        var c = new Error("Cannot find module '" + a + "'");
                        throw c.code = "MODULE_NOT_FOUND",
                        c;
                    }
                    var d = t[a] = {
                        exports: {}
                    };
                    e[a][0].call(d.exports, function(t) {
                        var i = e[a][1][t];
                        return n(i ? i : t);
                    }, d, d.exports, l, e, t, i);
                }
                return t[a].exports;
            }
            for (var o = "function" == typeof require && require, a = 0; a < i.length; a++)
                n(i[a]);
            return n;
        }({
            1: [function(e) {
                function t(e) {
                    return e && e.__esModule ? e : {
                        "default": e
                    };
                }
                var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
                }
                  , n = e("./index")
                  , o = t(n);
                void 0 !== ("undefined" == typeof self ? "undefined" : i(self)) ? self.Triedex = o["default"] : void 0 !== ("undefined" == typeof window ? "undefined" : i(window)) && (window.Triedex = o["default"]);
            }
            , {
                "./index": 2
            }],
            2: [function(e, t, i) {
                function n(e) {
                    return e && e.__esModule ? e : {
                        "default": e
                    };
                }
                Object.defineProperty(i, "__esModule", {
                    value: !0
                });
                var o = e("./triedex/Triedex")
                  , a = n(o);
                i["default"] = a["default"];
            }
            , {
                "./triedex/Triedex": 9
            }],
            3: [function(e, t, i) {
                function n(e) {
                    for (var t = [], i = e.length; i--; )
                        t = t.concat(e[i]);
                    return t;
                }
                function o(e) {
                    for (var t = [], i = {}, n = e.length; n--; )
                        i[e[n]] || (i[e[n]] = !0,
                        t.push(e[n]));
                    return t;
                }
                function a(e, t) {
                    return e.filter(function(e) {
                        return -1 !== t.indexOf(e);
                    });
                }
                function r() {
                    for (var e = Array.prototype.slice.call(arguments), t = e.pop(); e.length; )
                        t = a(t, e.pop());
                    return t;
                }
                Object.defineProperty(i, "__esModule", {
                    value: !0
                }),
                i.flatten = n,
                i.unique = o,
                i.intersection = r;
            }
            , {}],
            4: [function(e, t, i) {
                function n(e) {
                    return o.unique(e.split(a));
                }
                Object.defineProperty(i, "__esModule", {
                    value: !0
                }),
                i["default"] = n;
                var o = e("./arrayTools")
                  , a = /[\s]+/;
            }
            , {
                "./arrayTools": 3
            }],
            5: [function(e, t, i) {
                function n(e, t) {
                    var i = []
                      , n = e.split("")
                      , o = n.shift()
                      , a = t[o];
                    for (a && i.push(a); n.length && a; )
                        o = n.shift(),
                        a = a[o],
                        a && i.push(a);
                    return i;
                }
                function o(e, t) {
                    for (var i = e.split(""), n = i.shift(), o = t[n]; i.length && o; )
                        n = i.shift(),
                        o = o[n];
                    return o;
                }
                function a(e) {
                    var t = e.reduce(function(e, t) {
                        return t._ids && (e = e.concat(t._ids)),
                        e;
                    }, []);
                    return p.unique(t);
                }
                function r(e) {
                    var t = Object.keys(e)
                      , i = t.reduce(function(t, i) {
                        return "_ids" !== i && t.push(e[i]),
                        t;
                    }, []);
                    return i;
                }
                function s(e) {
                    for (var t = [], i = r(e); i && i.length; )
                        i.forEach(function(e) {
                            return t.push(e);
                        }),
                        i = p.flatten(i.map(r));
                    return t;
                }
                function l(e, t) {
                    var i = e._ids = e._ids || [];
                    -1 === i.indexOf(t) && i.push(t);
                }
                function c(e, t) {
                    var i = t[e];
                    return i || (i = t[e] = {}),
                    i;
                }
                function d(e, t) {
                    var i = e._ids
                      , n = i && i.indexOf(t);
                    i && -1 !== n && i.splice(n, 1);
                }
                function u(e) {
                    Object.keys(e).forEach(function(t) {
                        if ("_ids" !== t) {
                            var i = e[t]
                              , n = 0 === r(i).length
                              , o = !i._ids || 0 === i._ids.length;
                            n && o && delete e[t];
                        }
                    });
                }
                function m(e, t, i) {
                    var o = n(e, i)
                      , a = o.pop();
                    for (a && d(a, t); o.length; ) {
                        var r = o.pop();
                        u(r);
                    }
                    u(i);
                }
                Object.defineProperty(i, "__esModule", {
                    value: !0
                }),
                i.getNodesForTokenLeaf = n,
                i.getLeafForToken = o,
                i.extractIdsFromNodes = a,
                i.getNodeChildren = r,
                i.getAllChildrenOfNode = s,
                i.addIdToNode = l,
                i.addNodeToParent = c,
                i.removeIdFromNode = d,
                i.removeDeadBranches = u,
                i.removeFromPrefixBranch = m;
                var p = e("./arrayTools");
            }
            , {
                "./arrayTools": 3
            }],
            6: [function(e, t, i) {
                function n(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function");
                }
                var o = function() {
                    function e(e, t) {
                        for (var i = 0; i < t.length; i++) {
                            var n = t[i];
                            n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n);
                        }
                    }
                    return function(t, i, n) {
                        return i && e(t.prototype, i),
                        n && e(t, n),
                        t;
                    }
                    ;
                }();
                Object.defineProperty(i, "__esModule", {
                    value: !0
                });
                var a = function() {
                    function e(t) {
                        n(this, e),
                        this._idKey = t.idKey,
                        this._byId = {};
                    }
                    return o(e, [{
                        key: "add",
                        value: function(e) {
                            var t = this;
                            t._byId[e[t._idKey]] = e;
                        }
                    }, {
                        key: "remove",
                        value: function(e) {
                            var t = this;
                            delete t._byId[e[t._idKey]];
                        }
                    }, {
                        key: "update",
                        value: function(e) {
                            return this.add(e);
                        }
                    }, {
                        key: "get",
                        value: function(e) {
                            return this._byId[e];
                        }
                    }]),
                    e;
                }();
                i["default"] = a;
            }
            , {}],
            7: [function(e, t, i) {
                function n(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function");
                }
                var o = function() {
                    function e(e, t) {
                        for (var i = 0; i < t.length; i++) {
                            var n = t[i];
                            n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n);
                        }
                    }
                    return function(t, i, n) {
                        return i && e(t.prototype, i),
                        n && e(t, n),
                        t;
                    }
                    ;
                }();
                Object.defineProperty(i, "__esModule", {
                    value: !0
                });
                var a = function() {
                    function e() {
                        n(this, e);
                        var t = this;
                        t._byToken = {},
                        t._byId = {};
                    }
                    return o(e, [{
                        key: "_removeToken",
                        value: function(e) {
                            delete this._byToken[e];
                        }
                    }, {
                        key: "_removeIdFromToken",
                        value: function(e, t) {
                            var i = this
                              , n = i._byToken[t];
                            if (n) {
                                var o = n.indexOf(e);
                                n.splice(o, 1),
                                n.length || i._removeToken(t);
                            }
                        }
                    }, {
                        key: "_getOrCreateArray",
                        value: function(e, t) {
                            return t[e] = Array.isArray(t[e]) ? t[e] : [],
                            t[e];
                        }
                    }, {
                        key: "_addValueToIdInHash",
                        value: function(e, t, i) {
                            var n = this._getOrCreateArray(t, i);
                            -1 === n.indexOf(e) && n.push(e);
                        }
                    }, {
                        key: "_addIdToToken",
                        value: function(e, t) {
                            var i = this;
                            i._addValueToIdInHash(e, t, i._byToken);
                        }
                    }, {
                        key: "_addTokenToId",
                        value: function(e, t) {
                            var i = this;
                            i._addValueToIdInHash(e, t, i._byId);
                        }
                    }, {
                        key: "add",
                        value: function(e, t) {
                            var i = this;
                            i._addIdToToken(t, e),
                            i._addTokenToId(e, t);
                        }
                    }, {
                        key: "removeId",
                        value: function(e) {
                            var t = this
                              , i = t._byId[e];
                            i && i.forEach(function(i) {
                                return t._removeIdFromToken(e, i);
                            });
                        }
                    }, {
                        key: "getForId",
                        value: function(e) {
                            return this._byId[e] || [];
                        }
                    }]),
                    e;
                }();
                i["default"] = a;
            }
            , {}],
            8: [function(e, t, i) {
                function n(e) {
                    if (e && e.__esModule)
                        return e;
                    var t = {};
                    if (null != e)
                        for (var i in e)
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t["default"] = e,
                    t;
                }
                function o(e) {
                    return e && e.__esModule ? e : {
                        "default": e
                    };
                }
                function a(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function");
                }
                var r = function() {
                    function e(e, t) {
                        for (var i = 0; i < t.length; i++) {
                            var n = t[i];
                            n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n);
                        }
                    }
                    return function(t, i, n) {
                        return i && e(t.prototype, i),
                        n && e(t, n),
                        t;
                    }
                    ;
                }();
                Object.defineProperty(i, "__esModule", {
                    value: !0
                });
                var s = e("./Tokens")
                  , l = o(s)
                  , c = e("../lib/trieTools")
                  , d = n(c)
                  , u = e("../lib/arrayTools")
                  , m = function() {
                    function e(t) {
                        a(this, e);
                        var i = this;
                        i._trie = {},
                        i._byID = {},
                        i._applyOptions(t);
                    }
                    return r(e, [{
                        key: "_applyOptions",
                        value: function(e) {
                            var t = this;
                            t._field = e.field,
                            t._idKey = e.idKey,
                            t._tokenizer = e.tokenizer,
                            t._beforeTokenize = e.beforeTokenize,
                            t._afterTokenize = e.afterTokenize,
                            t._tokens = e.tokens || new l["default"]();
                        }
                    }, {
                        key: "_applyBeforeTokenize",
                        value: function(e) {
                            var t = this;
                            return t._beforeTokenize ? t._beforeTokenize(e) : e;
                        }
                    }, {
                        key: "_applyAfterTokenize",
                        value: function(e) {
                            var t = this;
                            return t._afterTokenize ? t._afterTokenize(e) : e;
                        }
                    }, {
                        key: "_formatForIndex",
                        value: function(e) {
                            return e.toLowerCase();
                        }
                    }, {
                        key: "_getTokens",
                        value: function(e) {
                            var t = this
                              , i = t._applyBeforeTokenize(e)
                              , n = t._tokenizer(i);
                            return t._applyAfterTokenize(n);
                        }
                    }, {
                        key: "_getSearchTokens",
                        value: function(e) {
                            var t = this;
                            return u.unique(t._getTokens(e).map(function(e) {
                                return t._formatForIndex(e);
                            }));
                        }
                    }, {
                        key: "_getRemovalTokens",
                        value: function(e) {
                            var t = this;
                            return u.unique(t._tokens.getForId(e).map(function(e) {
                                return t._formatForIndex(e);
                            }));
                        }
                    }, {
                        key: "_saveToken",
                        value: function(e, t) {
                            this._tokens.add(e, t);
                        }
                    }, {
                        key: "_removeFromPrefixBranch",
                        value: function(e, t) {
                            d.removeFromPrefixBranch(e, t, this._trie);
                        }
                    }, {
                        key: "_removeFromSuffixBranches",
                        value: function(e, t) {
                            for (var i = e; i.length; )
                                i = i.substring(1),
                                this._removeFromPrefixBranch(e, t);
                        }
                    }, {
                        key: "_removeFromTokens",
                        value: function(e) {
                            this._tokens.removeId(e);
                        }
                    }, {
                        key: "_remove",
                        value: function(e) {
                            var t = this
                              , i = e[t._idKey]
                              , n = t._getRemovalTokens(i);
                            n.forEach(function(e) {
                                t._removeFromPrefixBranch(e, i),
                                t._removeFromSuffixBranches(e, i);
                            }),
                            t._removeFromTokens(i);
                        }
                    }, {
                        key: "_addNode",
                        value: function(e, t) {
                            var i = this;
                            return t ? d.addNodeToParent(e, t) : d.addNodeToParent(e, i._trie);
                        }
                    }, {
                        key: "_addPrefixBranch",
                        value: function(e, t) {
                            var i = this
                              , n = e.length - 1
                              , o = void 0;
                            e.split("").forEach(function(e, a) {
                                var r = i._addNode(e, o);
                                a === n && d.addIdToNode(r, t),
                                o = r;
                            });
                        }
                    }, {
                        key: "_addSuffixBranches",
                        value: function(e, t) {
                            for (var i = e; i.length; )
                                i = i.substring(1),
                                this._addPrefixBranch(i, t);
                        }
                    }, {
                        key: "_add",
                        value: function(e) {
                            var t = this
                              , i = e[t._field]
                              , n = e[t._idKey]
                              , o = i && t._getTokens(i);
                            o && o.forEach(function(e) {
                                var i = t._formatForIndex(e);
                                t._addPrefixBranch(i, n),
                                t._addSuffixBranches(i, n),
                                t._saveToken(e, n);
                            });
                        }
                    }, {
                        key: "_getIdsForToken",
                        value: function(e) {
                            var t = this
                              , i = []
                              , n = d.getLeafForToken(e, t._trie);
                            return n && (i.push(n),
                            i = i.concat(d.getAllChildrenOfNode(n))),
                            d.extractIdsFromNodes(i);
                        }
                    }, {
                        key: "_getTokensForIds",
                        value: function(e) {
                            var t = this
                              , i = e.map(function(e) {
                                return t._tokens.getForId(e);
                            });
                            return u.unique(u.flatten(i));
                        }
                    }, {
                        key: "index",
                        value: function(e) {
                            var t = this;
                            t._remove(e),
                            t._add(e);
                        }
                    }, {
                        key: "add",
                        value: function(e) {
                            this._add(e);
                        }
                    }, {
                        key: "remove",
                        value: function(e) {
                            this._remove(e);
                        }
                    }, {
                        key: "search",
                        value: function(e) {
                            var t = this
                              , i = t._getSearchTokens(e)
                              , n = i.map(function(e) {
                                return t._getIdsForToken(e);
                            });
                            return u.intersection.apply(null, n);
                        }
                    }, {
                        key: "getSuggestions",
                        value: function(e) {
                            var t = this
                              , i = t.search(e)
                              , n = t._getTokensForIds(i)
                              , o = e.toLowerCase();
                            return n.filter(function(e) {
                                return 0 === e.toLowerCase().indexOf(o);
                            });
                        }
                    }]),
                    e;
                }();
                i["default"] = m;
            }
            , {
                "../lib/arrayTools": 3,
                "../lib/trieTools": 5,
                "./Tokens": 7
            }],
            9: [function(e, t, i) {
                function n(e) {
                    return e && e.__esModule ? e : {
                        "default": e
                    };
                }
                function o(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function");
                }
                var a = function() {
                    function e(e, t) {
                        for (var i = 0; i < t.length; i++) {
                            var n = t[i];
                            n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n);
                        }
                    }
                    return function(t, i, n) {
                        return i && e(t.prototype, i),
                        n && e(t, n),
                        t;
                    }
                    ;
                }();
                Object.defineProperty(i, "__esModule", {
                    value: !0
                });
                var r = e("./Trie")
                  , s = n(r)
                  , l = e("./Tokens")
                  , c = n(l)
                  , d = e("./Documents")
                  , u = n(d)
                  , m = e("../lib/arrayTools")
                  , p = e("../lib/tokenizer")
                  , g = n(p)
                  , f = function() {
                    function e(t) {
                        o(this, e);
                        var i = this;
                        i._applyOptions(t),
                        i._tokens = new c["default"](),
                        i._documents = new u["default"]({
                            idKey: i._idKey
                        }),
                        i._createTries(t.fields);
                    }
                    return a(e, [{
                        key: "_applyOptions",
                        value: function(e) {
                            var t = this;
                            t._idKey = e.idKey || "id",
                            t._tokenizer = e.tokenizer || g["default"];
                        }
                    }, {
                        key: "_createTries",
                        value: function(e) {
                            var t = this;
                            t._tries = {},
                            Object.keys(e).forEach(function(i) {
                                return t._createTrie(i, e[i]);
                            });
                        }
                    }, {
                        key: "_createTrie",
                        value: function(e, t) {
                            var i = this
                              , n = {
                                field: e,
                                tokenizer: i._tokenizer,
                                tokens: void 0,
                                idKey: i._idKey
                            };
                            t.ownTokens || (n.tokens = i._tokens),
                            i._tries[e] = new s["default"](n);
                        }
                    }, {
                        key: "_getChangedFields",
                        value: function(e) {
                            var t = this
                              , i = t._documents.get(e[t._idKey])
                              , n = Object.keys(t._tries)
                              , o = void 0;
                            return o = i ? n.reduce(function(t, n) {
                                return i[n] !== e[n] && t.push(n),
                                t;
                            }, []) : n;
                        }
                    }, {
                        key: "index",
                        value: function(e) {
                            var t = this;
                            t._getChangedFields(e).forEach(function(i) {
                                var n = t._tries[i];
                                n.index(e);
                            }),
                            t._documents.update(e);
                        }
                    }, {
                        key: "add",
                        value: function(e) {
                            var t = this;
                            Object.keys(t._tries).forEach(function(i) {
                                var n = t._tries[i];
                                n.add(e);
                            }),
                            t._documents.add(e);
                        }
                    }, {
                        key: "remove",
                        value: function(e) {
                            var t = this
                              , i = t._tries;
                            Object.keys(i).forEach(function(t) {
                                i[t].remove(e);
                            }),
                            t._documents.remove(e);
                        }
                    }, {
                        key: "searchAll",
                        value: function(e) {
                            var t = this
                              , i = t._tries
                              , n = Object.keys(i).map(function(t) {
                                return i[t].search(e);
                            });
                            return m.unique(m.flatten(n));
                        }
                    }, {
                        key: "getSuggestionsForField",
                        value: function(e, t) {
                            return this._tries[t].getSuggestions(e);
                        }
                    }]),
                    e;
                }();
                i["default"] = f;
            }
            , {
                "../lib/arrayTools": 3,
                "../lib/tokenizer": 4,
                "./Documents": 6,
                "./Tokens": 7,
                "./Trie": 8
            }]
        }, {}, [1]);
        var r = self.Triedex
          , s = new r({
            idKey: "id",
            fields: {
                title: {},
                note: {},
                assignee: {
                    ownTokens: !0
                },
                files: {},
                tags: {
                    ownTokens: !0
                }
            }
        });
        self.onmessage = function(r) {
            var s = r.data.command
              , l = r.data.document
              , c = r.data.field
              , d = r.data.callbackId
              , u = r.data.text;
            switch (s) {
            case "index":
                e(l, d);
                break;

            case "add":
                t(l, d);
                break;

            case "unIndex":
                i(l, d);
                break;

            case "search":
                n(u, d);
                break;

            case "suggestions":
                o(u, c, d);
                break;

            case "clear":
                a(d);
            }
        }
        ;
    }
    ;
}),
