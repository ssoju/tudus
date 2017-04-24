
define("backend/search", ["backend/database", "actions/Factory", "wunderbits/WBRuntime", "backend/search/searchWorker", "wunderbits/BaseSingleton", "project!core"], function(e, t, i, n, o, a, r) {
    function s(e, t) {
        C = C >= 1e6 ? 0 : C,
        ++C,
        e.callbackId = C,
        T[C] = t,
        k && k.postMessage(e);
    }
    var l, c, d = a.WBDeferred, u = i.global, m = u.URL || u.webkitURL || {}, p = u.Blob, g = u.Worker, f = t.userLookup(), b = t.noteLookup(), h = t.taskLookup(), v = t.fileLookup(), _ = /^#/, w = /[\s]+/;
    c = i.env.isFirefox() ? "(" + n.toSource() + ")()" : "(" + n.toString() + ")()";
    var k;
    if (i.env.isIE())
        k = "Worker"in u && new u.Worker("/helpers/workerHelper.js"),
        k && k.postMessage(c);
    else {
        var x = p && new p([c],{
            type: "application/javascript"
        })
          , y = x && m.createObjectURL && m.createObjectURL(x);
        k = y && g && new g(y);
    }
    var C = 0
      , T = {
        console: function(e) {
            console.log(e);
        }
    };
    k && (k.onmessage = function(e) {
        "function" == typeof T[e.data.callbackId] && T[e.data.callbackId](e.data.data),
        "console" !== e.data.callbackId && (T[e.data.callbackId] = null);
    }
    );
    var S = o.extend({
        init: function(t) {
            var i = this;
            l = t.stores,
            i.createIndexFromLocalStores(),
            i.bindTo(e, "index", "indexModel");
        },
        search: function(e, t, i) {
            this.searchAll(e, t).done(i);
        },
        searchAll: function(e, t) {
            var i = new d();
            return s({
                command: "search",
                text: t,
                index: e
            }, function(e) {
                i.resolve(e || []);
            }),
            i.promise();
        },
        searchTags: function(e, t) {
            var i = new d();
            return s({
                command: "suggestions",
                text: e,
                field: "tags"
            }, function(e) {
                i.resolve(e),
                t && t(e);
            }),
            i.promise();
        },
        _extractTags: function(e) {
            var t = e.split(w).filter(function(e) {
                return _.test(e);
            });
            return t.length ? t.join(" ") : r;
        },
        _extractFiles: function(e) {
            var t = v.getFileCollection(e)
              , i = t.models.map(function(e) {
                return e.attributes.file_name;
            });
            return i.length ? i.join(" ") : r;
        },
        _indexFile: function(e, t) {
            var i = this
              , n = new d()
              , o = h.getTaskModel(t.attributes.task_id);
            return o ? i._indexTask(e, o).always(n.resolve, n) : n.resolve(),
            n.promise();
        },
        _indexNote: function(e, t) {
            var i = this
              , n = new d()
              , o = h.getTaskModel(t.attributes.task_id);
            return o ? i._indexTask(e, o).always(n.resolve, n) : n.resolve(),
            n.promise();
        },
        _indexTask: function(e, t) {
            var i = this
              , n = t.attributes
              , o = n.assignee_id
              , a = b.getNoteModelForTask(t.id)
              , r = o && f.getUserModel(o)
              , s = i._extractFiles(t.id)
              , l = i._extractTags(n.title);
            return i.executeIndexing(e, {
                id: n.id,
                title: n.title,
                note: a && a.attributes.content,
                assignee: r && r.attributes.name,
                files: s,
                tags: l
            });
        },
        indexModel: function(e, t, i) {
            var n = this
              , o = new d()
              , a = l[t]
              , s = a.fullTextIndexFields;
            if (s === r)
                return o.resolve().promise();
            switch (t) {
            case "tasks":
                n._indexTask(e, i).always(o.resolve, o);
                break;

            case "notes":
                n._indexNote(e, i).always(o.resolve, o);
                break;

            case "files":
                n._indexFile(e, i).always(o.resolve, o);
            }
            return o.promise();
        },
        unIndex: function(e) {
            var t = new d();
            return s({
                command: "unIndex",
                document: e
            }, function() {
                t.resolve();
            }),
            t.promise();
        },
        index: function(e) {
            var t = new d();
            return s({
                command: "index",
                document: e
            }, function() {
                t.resolve();
            }),
            t.promise();
        },
        add: function(e) {
            var t = new d();
            return s({
                command: "add",
                document: e
            }, function() {
                t.resolve();
            }),
            t.promise();
        },
        executeIndexing: function(e, t) {
            var i = this
              , n = new d();
            return "delete" === e ? i.unIndex(t).done(n.resolve, n) : "create" === e ? i.add(t).done(n.resolve, n) : "update" === e ? i.index(t).done(n.resolve, n) : n.resolve(),
            n.done(function() {
                i.trigger("index:changed");
            }),
            n.promise();
        },
        clear: function(e) {
            s({
                command: "clear"
            }, e);
        },
        createIndexFromLocalStores: function() {
            var e = this;
            i.once("db:allDataLoaded", function() {
                function t(t) {
                    for (var i = t.models, n = t.model.prototype.storeName, o = 0, a = i.length; a > o; o++)
                        e.indexModel("create", n, i[o]);
                }
                var n, o;
                for (var a in l)
                    n = l[a],
                    o = a,
                    "fullTextIndexFields"in n && i.on(o + ":ready", t);
            });
        }
    });
    return e.on("ready", S.init, S),
    S;
}),
define("collections/Managers/BaseManager", ["application/runtime", "wunderbits/BaseEventEmitter", "wunderbits/mixins/DebounceMixin", "project!core"], function(e, t, i, n) {
    var o = n.lib.clone
      , a = n.lib.fromSuper;
    return t.extend({
        mixins: [i],
        runtime: e,
        collections: {},
        fromSyncOptions: {
            fromSync: !0
        },
        initialize: function() {
            var e = this;
            e.setupCollections(),
            e.setupBinds();
        },
        setupCollections: function() {
            var e = this
              , t = a.merge(e, "collections")
              , i = {};
            for (var n in t)
                i[n] = new e.CollectionClass(t[n]);
            e.collections = i;
        },
        setupBinds: function() {},
        persistModel: function(e, t, i) {
            i || (i = {}),
            !i.fromStorage && e && e.save({}, i);
        },
        destroyModels: function(e) {
            for (var t, i = this, n = o(e), a = 0, r = n.length; r > a; a++)
                t = n[a],
                t.destroy(i.fromSyncOptions);
        },
        getLocalSaveOptions: function(e) {
            var t = this;
            return e && e.fromStorage ? e : t.fromSyncOptions;
        },
        hasUpdateOptions: function(e) {
            return !e || !e.fromStorage;
        },
        addOrRemoveFromCollection: function(e, t, i, n) {
            var o = this;
            e ? o._addToCollection(t, i, n) : o._removeFromCollection(t, i, n);
        },
        _addToCollection: function(e, t, i) {
            this._inCollection(e, t) || e.add(t, i);
        },
        _removeFromCollection: function(e, t, i) {
            this._inCollection(e, t) && e.remove(t, i);
        },
        _inCollection: function(e, t) {
            return !!e.get(t.id);
        }
    });
}),
define("collections/Managers/SearchManager", ["application/runtime", "backend/search", "wunderbits/helpers/strings", "collections/TaskCollection", "collections/SubtaskCollection", "collections/FileCollection", "collections/ReminderCollection", "collections/Managers/BaseManager"], function(e, t, i, n, o, a, r, s, l) {
    var c = s.prototype
      , d = e._;
    return s.extend({
        observes: {
            runtime: {
                "search:keywords": "onSearchWithKeywords"
            }
        },
        files: l,
        tasks: l,
        subtasks: l,
        initialize: function() {
            var e = this;
            e.files = new a("/files/all"),
            e.tasks = new n("/tasks/all"),
            e.subtasks = new o("/subtasks/all"),
            c.initialize.apply(e, arguments),
            e.resetSearch = d.debounce(e.resetSearch, 100),
            e.bindTo(e.tasks, "add change:title", "resetSearch"),
            e.bindTo(e.files, "add remove", "resetSearch"),
            e.bindTo(e.subtasks, "add remove change:title", "resetSearch"),
            e.bindTo(t, "index:changed", "resetSearch");
        },
        resetSearch: function() {
            var t = this
              , i = e.state.attributes.inSearchState;
            t.lastKeywords && t.lastOptions && i && t.onSearchWithKeywords(t.lastKeywords, t.lastOptions);
        },
        onSearchWithKeywords: function(o, a) {
            var r = this;
            a = a || {},
            a.term = o,
            r.lastOptions = a,
            r.lastKeywords = o;
            var s = o
              , l = o.match(/list=([a-z0-9]+)/);
            l && (l = l[1],
            o = o.replace("list=" + l, ""));
            var c = new RegExp(i.escapeForRegex(o),"i")
              , u = []
              , m = r.subtasks.filter(function(e) {
                return c.test(e.attributes.title);
            });
            m = d.map(m, function(e) {
                return e.attributes.task_id;
            });
            var p = r.files.filter(function(e) {
                return c.test(e.attributes.file_name);
            });
            p = d.map(p, function(e) {
                return r.tasks.getIdByAltId(e.attributes.resource_id);
            }),
            t.search("tasks", o, function(t) {
                var i = "/search/" + encodeURIComponent(s)
                  , c = new n(i);
                u = d.unique(u.concat(t, m, p));
                var g = d.compact(d.map(u, function(e) {
                    var t = r.tasks.get(e)
                      , i = t && t.attributes.list_id;
                    return l && l !== i ? !1 : t;
                }));
                c.reset(g);
                var f = new n("/search");
                f.reset(g),
                g.length ? (e.trigger("browser:hide404"),
                e.trigger("collection:search:ready", i, a)) : e.trigger("browser:show404", "search", o);
            });
        }
    });
}),
define("collections/Managers/TagsManager", ["application/runtime", "./BaseManager", "backend/search", "project!core"], function(e, t, i, n) {
    var o = n.WBDeferred
      , a = n.lib.when
      , r = e._;
    return t.extend({
        observes: {
            runtime: {
                "tags:getSuggestions": "getTagSuggestions",
                "tags:getTagCloud": "getTagCloud"
            }
        },
        getTagSuggestions: function(t, n) {
            i.searchTags(t, function(t) {
                t = r.difference(t, n),
                e.trigger("tags:suggestions", t);
            });
        },
        getTagCloud: function() {
            var t = [];
            i.searchTags("#").done(function(n) {
                var s = {};
                r.each(n, function(e) {
                    s[e] = new o(),
                    i.search("tasks", e, function(i) {
                        t.push({
                            tag: e,
                            ids: i
                        }),
                        s[e].resolve();
                    });
                }),
                a(r.toArray(s)).done(function() {
                    e.trigger("tags:tagCloud", t);
                });
            });
        }
    });
}),
define("collections/Managers/TasksCollectionManager", ["application/runtime", "wunderbits/collections/WBCollection", "collections/ListCollection", "collections/TaskCollection", "collections/Positions/TaskPositionsCollection", "collections/Managers/BaseManager", "collections/comparators", "vendor/moment"], function(e, t, i, n, o, a, r, s, l) {
    var c = a.prototype
      , d = e._
      , u = t.collections;
    return a.extend({
        CollectionClass: n,
        collections: {
            all: "/tasks/all"
        },
        observes: {
            "collections.all": {
                "change:starred": "starredCheck",
                "change:assignee_id": ["assignedCheck", "userScopeCheck"],
                "change:completed": ["completedCheck", "completedSound", "starredCheck", "dateCheck", "assignedCheck", "userScopeCheck", "trackSignificantEvent"],
                "change:due_date": ["dateCheck", "userScopeCheck"],
                "change:list_id": ["listIdCheck", "userScopeCheck"],
                add: ["persistModel", "starredCheck", "assignedCheck", "completedCheck", "dateCheck", "userScopeCheck", "listIdCheck", "updateTaskPosition", "emitItemAdded", "trackTaskCreate"],
                destroy: ["detachModel", "cascadeDestruction"]
            },
            runtime: {
                "day:ended": "updateDueDates"
            },
            acceptedLists: {
                "add remove": ["updateSmartListTasks", "userScopeCheckFromList"],
                "change:isShared": "userScopeCheckFromList"
            }
        },
        acceptedLists: new i("/lists/accepted"),
        latestDate: l,
        formattedToday: l,
        initialize: function() {
            var e = this;
            e.taskPositions = new o("/taskPositions/all"),
            c.initialize.apply(e, arguments),
            e.setupSmartListCollections();
        },
        filters: {},
        setupSmartListCollections: function() {
            for (var e = this, t = ["all", "starred", "completed", "today", "week", "assigned"], i = 0, o = t.length; o > i; i++) {
                var a = t[i];
                e.filters[a] = new n("/tasks/filter/" + a),
                e.filters[a].comparator = e.getComparatorForSmartList(a);
            }
            ["week", "today"].forEach(function(t) {
                var i = t + "/user";
                e.filters[i] = new n("/tasks/filter/" + i),
                e.filters[i].comparator = e.getComparatorForSmartList(t);
            }),
            d.times(7, function(t) {
                var i = "todayPlus" + t;
                e.filters[i] = new n("/tasks/filter/" + i),
                e.filters[i].comparator = e.getComparatorForSmartList("week");
                var o = i + "/user";
                e.filters[o] = new n("/tasks/filter/" + o),
                e.filters[o].comparator = e.getComparatorForSmartList("week");
            });
        },
        getComparatorForSmartList: function(e) {
            var t = {
                starred: "starred",
                completed: "completedAt",
                today: "dueDate",
                week: "dueDate"
            };
            return r[t[e]] || r.position;
        },
        trackSignificantEvent: function(t, i, n) {
            n = n || {},
            i && !n.fromStorage && !n.fromSync && e.env.isChrome() && e.trigger("significantEvent:added");
        },
        detachModel: function(e, t, i) {
            for (var o = this, a = o.filters.length, r = 0; a > r; r++) {
                var s = o.filters[r];
                s.remove(e, s, i);
            }
            var l = e.attributes.list_id
              , c = new n("/lists/" + l + "/tasks");
            c.remove(e, i);
        },
        cascadeDestruction: function(e) {
            var t = this
              , i = n.collections
              , o = ["comments", "files", "notes", "reminders", "subtasks", "subtaskPositions"];
            o.forEach(function(n) {
                var o = i["/tasks/" + e.id + "/" + n];
                o && t.destroyModels(o.models);
            });
        },
        listIdCheck: function(e, t, i) {
            var o = this
              , a = e.attributes.list_id
              , r = o.collections[a] || new n("/lists/" + a + "/tasks")
              , s = e.previous("list_id")
              , l = s && new n("/lists/" + s + "/tasks");
            l && o._removeFromCollection(l, e),
            o._addToCollection(r, e, i),
            o.collections[a] || (o.collections[a] = r);
        },
        isListIDIsAccepted: function(e) {
            var t = this
              , i = t.acceptedLists.get(e);
            return !!i;
        },
        updateSmartListTasks: function(e, t, i) {
            var o = this
              , a = new n("/lists/" + e.id + "/tasks");
            a.forEach(function(e) {
                o.starredCheck(e, l, i),
                o.assignedCheck(e, l, i),
                o.dateCheck(e, l, i),
                o.completedCheck(e, l, i);
            });
        },
        starredCheck: function(e, t, i) {
            var n = this
              , o = e.attributes
              , a = o.starred && !o.completed
              , r = n.isListIDIsAccepted(o.list_id);
            i.sort = !1;
            var s = a && r;
            n.addOrRemoveFromCollection(s, n.filters.starred, e, i);
        },
        assignedCheck: function(t, i, n) {
            var o = this
              , a = t.attributes
              , r = e.user.isIDEqual(a.assignee_id) && !a.completed
              , s = o.isListIDIsAccepted(a.list_id)
              , l = r && s;
            o.addOrRemoveFromCollection(l, o.filters.assigned, t, n);
        },
        completedCheck: function(e, t, i) {
            var n = this
              , o = e.attributes
              , a = o.completed
              , r = n.isListIDIsAccepted(o.list_id);
            i.sort = !1;
            var s = a && r;
            n.addOrRemoveFromCollection(s, n.filters.completed, e, i);
            var c = !(a || !r);
            n.addOrRemoveFromCollection(c, n.filters.all, e, i),
            !i.fromStorage && e.hasChanged() && n.dateCheck(e, l, i);
        },
        completedSound: function(t, i, n) {
            var o = n.fromStorage || n.fromSync;
            !o && t.isCompleted() && "true" === e.settings.attributes.sound_checkoff_enabled && e.trigger("sounds:play", "complete");
        },
        updateTaskPosition: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = e.attributes
                  , a = n.getTaskPositionModel(o.list_id)
                  , r = a && a.attributes.values
                  , s = r && r.indexOf(e.id);
                if (s !== l && -1 !== s) {
                    var c = 10 * s;
                    o.position !== c && e.save({
                        position: c
                    }, i);
                }
            }
        },
        getTaskPositionModel: function(e) {
            var t = u["/lists/" + e + "/taskPositions"];
            return t && t.models[0];
        },
        getLatestDate: function() {
            var e = this;
            return e.latestDate = Date.now(),
            e.latestDate;
        },
        getFormattedToday: function() {
            var e = this;
            return e.getLatestDate(),
            s().sod().format("YYYY-MM-DD");
        },
        shouldUpdateFormattedToday: function() {
            var e = this
              , t = 864e5
              , i = e.getLatestDate()
              , n = new Date(e.formattedToday).valueOf();
            return i - n > t;
        },
        throttledGetFormattedToday: function() {
            var e = this;
            return e.formattedToday = e.formattedToday && e.shouldUpdateFormattedToday() ? e.getFormattedToday() : e.formattedToday ? e.formattedToday : e.getFormattedToday(),
            e.formattedToday;
        },
        dateCheck: function(e, t, i) {
            i = i || {};
            var n, o, a, r = this, l = e.attributes.due_date, c = r.throttledGetFormattedToday(), d = l && l === c;
            l && (a = s(l).diff(s().sod(), "days"),
            0 >= a ? (n = !0,
            a = 0) : 6 >= a && (o = !0));
            var u = !e.isCompleted()
              , m = r.isListIDIsAccepted(e.attributes.list_id);
            i.sort = !1,
            d = (d || n) && u;
            var p = d && m;
            r.addOrRemoveFromCollection(p, r.filters.today, e, i),
            o = (o || n) && u;
            var g = o && m;
            r.addOrRemoveFromCollection(g, r.filters.week, e, i);
            for (var f = 0; 7 > f; f++) {
                var b = a === f && u
                  , h = r.filters["todayPlus" + f]
                  , v = b && m;
                r.addOrRemoveFromCollection(v, h, e, i);
            }
        },
        updateDueDates: function() {
            for (var e = this, t = e.collections.all, i = 0, n = t.models.length; n > i; i++) {
                var o = t.models[i];
                o.has("due_date") && o.trigger("change:due_date", o);
            }
        },
        emitItemAdded: function(t, i, n) {
            n.fromStorage || n.fromSync || e.trigger("onboarding:itemAdded");
        },
        trackTaskCreate: function(t, i, n) {
            n.fromStorage || n.fromSync || e.trigger("trackingService", "Client.TaskCreate");
        },
        addFromURI: function(t) {
            var i = this
              , o = i.collections.all
              , a = new n("/lists/inbox/tasks")
              , r = "top" === e.settings.attributes.new_task_location
              , s = r ? a.getNewTopPosition() : a.getNewBottomPosition();
            o.add({
                title: t.title && t.title,
                note: t.note && t.note,
                list_id: "inbox",
                position: s
            });
        },
        userScopeCheck: function(e) {
            var t = this
              , i = ["week", "today"];
            d.times(7, function(e) {
                i.push("todayPlus" + e);
            }),
            i.forEach(function(i) {
                var n = i + "/user"
                  , o = t.filters[i]
                  , a = t.filters[n]
                  , r = o.get(e) && e.belongsToMe();
                t.addOrRemoveFromCollection(r, a, e);
            });
        },
        userScopeCheckFromList: function(e) {
            var t = this
              , i = new n("/lists/" + e.id + "/tasks");
            i.models.forEach(function(e) {
                t.userScopeCheck(e);
            });
        }
    });
}),
define("collections/Managers/SubtasksCollectionManager", ["application/runtime", "./BaseManager", "wunderbits/collections/WBCollection", "collections/SubtaskCollection", "collections/Positions/SubtaskPositionsCollection", "collections/TaskCollection"], function(e, t, i, n, o, a, r) {
    var s = i.collections;
    return t.extend({
        CollectionClass: n,
        collections: {
            all: "/subtasks/all"
        },
        observes: {
            "collections.all": {
                "change:task_id": "onChangeTaskID",
                add: ["persistModel", "onSubtaskAdd", "updateSubtaskPosition", "updateTaskHasSubtasksFromSubtask", "updateSubtaskCompletionPercentageFromSubtask"],
                remove: ["onSubtaskRemove", "updateTaskHasSubtasksFromSubtask", "updateSubtaskCompletionPercentageFromSubtask"],
                "change:completed": ["updateSubtaskCompletionPercentageFromSubtask", "completedSound"]
            },
            tasks: {
                add: ["updateTaskHasSubtasksFromTask", "updateSubtaskCompletionPercentageFromTask"]
            }
        },
        tasks: new a("/tasks/all"),
        subtaskPositions: new o("/subtaskPositions/all"),
        onSubtaskAdd: function(e, t, i) {
            var n = this;
            n.taskIDCheck(e, t, i, "add");
        },
        onSubtaskRemove: function(e, t, i) {
            this.taskIDCheck(e, t, i, "remove");
        },
        onChangeTaskID: function(e, t, i) {
            var o = this
              , a = e.previous("task_id");
            if (a) {
                var s = new n("/tasks/" + a + "/subtasks");
                s.remove(e, i);
            }
            o.taskIDCheck(e, r, i, "add");
        },
        taskIDCheck: function(e, t, i, o) {
            var a = e.attributes.task_id;
            if (a) {
                var r = new n("/tasks/" + a + "/subtasks");
                r[o](e, i);
            }
        },
        updateSubtaskPosition: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = e.attributes
                  , a = n.getSubtaskPositionModel(o.task_id)
                  , s = a && a.attributes.values
                  , l = s && s.indexOf(e.id);
                if (l !== r && -1 !== l) {
                    var c = 10 * l;
                    o.position !== c && e.save({
                        position: l
                    }, i);
                }
            }
        },
        getSubtaskPositionModel: function(e) {
            var t = s["/tasks/" + e + "/subtaskPositions"];
            return t && t.models[0];
        },
        updateTaskHasSubtasksFromSubtask: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = e.attributes.task_id
                  , a = n.tasks.get(o);
                a && n.updateTaskHasSubtasksFromTask(a, r, i);
            }
        },
        updateTaskHasSubtasksFromTask: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = n.hasSubtasks(e.id);
                e.attributes.hasSubtasks !== o && e.save({
                    hasSubtasks: o
                }, i);
            }
        },
        hasSubtasks: function(e) {
            var t = s["/tasks/" + e + "/subtasks"];
            return !(!t || !t.length);
        },
        updateSubtaskCompletionPercentageFromSubtask: function(e, t, i) {
            var n = this;
            i = n.getLocalSaveOptions(i);
            var o = e.attributes.task_id
              , a = n.tasks.get(o);
            a && n.updateSubtaskCompletionPercentage(a, r, i);
        },
        updateSubtaskCompletionPercentageFromTask: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = e.id
                  , a = n.collections.all
                  , r = a.where({
                    task_id: o
                });
                r.length && (i = n.getLocalSaveOptions(i),
                e.save({
                    subtaskCompletion: n.getSubtaskCompletionPercent(r)
                }, i));
            }
        },
        getSubtaskCompletionPercent: function(e) {
            var t = e.filter(function(e) {
                return !e.attributes.completed;
            })
              , i = e.filter(function(e) {
                return e.attributes.completed;
            })
              , n = i.length / (t.length + i.length);
            return n = isNaN(n) ? 0 : n,
            Math.floor(100 * n);
        },
        updateSubtaskCompletionPercentage: function(e, t, i) {
            var o = this;
            i = o.getLocalSaveOptions(i);
            var a, r = new n("/tasks/" + e.id + "/subtasks"), s = r.where({
                completed: !1
            }), l = r.where({
                completed: !0
            });
            a = l.length / (s.length + l.length),
            a = isNaN(a) ? 0 : a,
            a = Math.floor(100 * a),
            e.save({
                subtaskCompletion: a
            }, i);
        },
        completedSound: function(t, i, n) {
            var o = n.fromStorage || n.fromSync;
            !o && t.isCompleted() && "true" === e.settings.attributes.sound_checkoff_enabled && e.trigger("sounds:play", "complete");
        }
    });
}),
define("collections/Managers/BasePositionsCollectionManager", ["application/runtime", "./BaseManager", "collections/TaskCollection", "collections/Positions/TaskPositionsCollection", "project!core"], function(e, t, i, n, o, a) {
    var r = o.lib.assert
      , s = t.prototype;
    return t.extend({
        CollectionClass: n,
        collections: {
            all: "/taskPositions/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "updatePositions"],
                "change:values": "updatePositions",
                "change:revision": "onRevisionChange"
            },
            allThings: {
                add: "onModelPositionChange",
                "change:position": "onModelPositionChange",
                "change:online_id": "onChangeOnlineID"
            }
        },
        allThings: a,
        parentKey: a,
        updateQueue: a,
        persistModel: function(e, t, i) {
            i || (i = {}),
            !i.fromStorage && e && e.save({}, i);
        },
        forceApiSync: function(e) {
            var t = this;
            t.defer(function() {
                e.changed.values = e.attributes.values,
                e.trigger("change", e, {});
            });
        },
        onRevisionChange: function(e) {
            var t = this
              , i = e.previousAttributes();
            "revision"in i && i.revision === a && t.defer(function() {
                e.save({
                    values: i.values,
                    localValues: i.values
                }),
                t.updatePositions(e, a, {
                    fromSync: !0
                });
            });
        },
        initialize: function() {
            var e = this;
            e.updateQueue = [];
            var t = "Must be defined";
            r.object(e.allThings, t),
            r.string(e.parentKey, t),
            s.initialize.apply(e, arguments);
        },
        updatePositions: function(e, t, i) {
            var n = this;
            if (i.fromSync) {
                var o = e.previousAttributes();
                if (!("revision"in o && o.revision === a)) {
                    var r = e.attributes.values;
                    r.forEach(function(e) {
                        var t = n.allThings.get(e)
                          , o = t && r && r.indexOf(t.id);
                        o !== a && -1 !== o && t.save({
                            position: 10 * o
                        }, i);
                    });
                }
            }
        },
        onChangeOnlineID: function(e) {
            var t = this
              , i = e.attributes[t.parentKey]
              , n = t.findPositionsModelFromParentID(i);
            n && t.defer(function() {
                n.changed.values = n.attributes.values,
                n.trigger("change", n, {});
            });
        },
        onModelPositionChange: function(e, t, i) {
            if (i || (i = {}),
            !i.fromStorage && !i.fromSync) {
                var n = this
                  , o = e.attributes[n.parentKey];
                n.defer(function() {
                    n.onPositionChange(n.getScopedThingCollection(o), o);
                });
            }
        },
        getScopedThingCollection: function() {
            throw new Error("I AM ABSTRACT OVERRIDE ME");
        },
        getValues: function(e) {
            var t = [];
            return e.sort(),
            e.models.forEach(function(e) {
                t.push(e.id);
            }),
            t;
        },
        onPositionChange: function(e, t) {
            var i = this
              , n = i.getValues(e)
              , o = i.findPositionsModelFromParentID(t);
            if (o)
                o.save({
                    values: n,
                    localValues: n
                });
            else {
                var a = {
                    values: n,
                    localValues: n
                };
                a[i.parentKey] = t,
                i.collections.all.add(a);
            }
        },
        findPositionsModelFromParentID: function(e) {
            var t = this
              , i = {};
            return i[t.parentKey] = e,
            t.collections.all.findWhere(i);
        }
    });
}),
define("collections/Managers/TaskPositionsCollectionManager", ["./BasePositionsCollectionManager", "collections/TaskCollection", "collections/Positions/TaskPositionsCollection"], function(e, t, i) {
    return e.extend({
        CollectionClass: i,
        collections: {
            all: "/taskPositions/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "updatePositions", "addToParentCollection"],
                "change:values": "updatePositions",
                "change:revision": "onRevisionChange",
                "change:online_id": "forceApiSync",
                remove: "removeFromParentCollection"
            }
        },
        allThings: new t("/tasks/all"),
        parentKey: "list_id",
        getValues: function(e) {
            var t = [];
            return e.sort(),
            e.models.forEach(function(e) {
                !e.attributes.completed && t.push(e.id);
            }),
            t;
        },
        getScopedThingCollection: function(e) {
            return new t("/lists/" + e + "/tasks");
        },
        addToParentCollection: function(e, t, n) {
            var o = e.attributes.list_id
              , a = new i("/lists/" + o + "/taskPositions");
            a.add(e, n);
        },
        removeFromParentCollection: function(e, t, n) {
            var o = e.attributes.list_id
              , a = new i("/lists/" + o + "/taskPositions");
            a.remove(e, n);
        }
    });
}),
define("collections/Managers/SubtaskPositionsCollectionManager", ["./BasePositionsCollectionManager", "collections/SubtaskCollection", "collections/Positions/SubtaskPositionsCollection"], function(e, t, i) {
    return e.extend({
        CollectionClass: i,
        collections: {
            all: "/subtaskPositions/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "updatePositions", "addToParentCollection"],
                "change:values": "updatePositions",
                "change:online_id": "forceApiSync",
                remove: "removeFromParentCollection"
            }
        },
        allThings: new t("/subtasks/all"),
        parentKey: "task_id",
        getScopedThingCollection: function(e) {
            return new t("/tasks/" + e + "/subtasks");
        },
        addToParentCollection: function(e, t, n) {
            var o = e.attributes
              , a = o.task_id
              , r = !(n && n.fromStorage && !o.values.length);
            if (r) {
                var s = new i("/tasks/" + a + "/subtaskPositions");
                s.add(e, n);
            }
        },
        removeFromParentCollection: function(e, t, n) {
            var o = e.attributes.task_id
              , a = new i("/tasks/" + o + "/subtaskPositions");
            a.remove(e, n);
        }
    });
}),
define("collections/Managers/ListsCollectionManager", ["application/runtime", "collections/ListCollection", "collections/Positions/ListPositionsCollection", "collections/TaskCollection", "collections/MembershipCollection", "collections/Managers/BaseManager", "vendor/moment"], function(e, t, i, n, o, a, r, s) {
    var l = a.prototype;
    return a.extend({
        CollectionClass: t,
        collections: {
            all: "/lists/all",
            accepted: "/lists/accepted",
            sortable: "/lists/sortable",
            pending: "/lists/pending"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "updateListPosition", "checkSortable", "checkPending"],
                "change:owner_id": ["checkSortable"],
                destroy: ["detachModel", "cascadeDestruction"]
            }
        },
        listPositions: new i("/listPositions/all"),
        initialize: function() {
            var t = this;
            l.initialize.call(t, arguments),
            e.ready.done(function() {
                t.userMemberships = new o("/users/" + e.user.id + "/memberships"),
                t.bindTo(t.userMemberships, "change:state", "updateCollectionFromMembership");
            }),
            t.bindOnceTo(e, "lists:ready", "setupInbox");
        },
        setupInbox: function() {
            var e = this
              , t = e.collections.all
              , i = t.get("inbox");
            i || t.add({
                id: "inbox",
                title: "",
                list_type: "inbox"
            }, e.fromSyncOptions);
        },
        checkSortable: function(t, i, n) {
            var a = this
              , r = a.collections.sortable
              , s = t.attributes;
            if (!t.isInbox()) {
                var l = "owner" === s.role
                  , c = new o("/lists/" + t.id + "/memberships")
                  , d = c.findWhere({
                    user_id: "" + e.user.id
                });
                l || d && d.isAccepted() ? r.add(t, n) : r.remove(t, n);
            }
        },
        checkPending: function(t, i) {
            var n = this
              , a = n.collections.pending
              , r = n.collections.accepted
              , s = new o("/lists/" + t.id + "/memberships")
              , l = s.findWhere({
                user_id: "" + e.user.id
            });
            l && l.isPending() ? (r.remove(t, i),
            a.add(t, i)) : (l || t.isOwner() || t.isInbox()) && (a.remove(t, i),
            r.add(t, i));
        },
        updateCollectionFromMembership: function(e) {
            var t = this
              , i = t.collections.all.get(e.attributes.list_id);
            i && (t.checkPending(i),
            t.checkSortable(i));
        },
        updateListPosition: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                n.getLocalSaveOptions(i);
                var o = e.attributes;
                if (o.online_id) {
                    var a = n.listPositions.models[0]
                      , r = a && a.attributes.values
                      , l = r && r.indexOf(e.id);
                    l !== s && -1 !== l && e.save({
                        position: 10 * l
                    }, i);
                }
            }
        },
        detachModel: function(e, t, i) {
            var n = this;
            n.collections.sortable.remove(e, i),
            n.collections.all.remove(e, i);
        },
        cascadeDestruction: function(e) {
            var i = this
              , n = t.collections
              , o = ["tasks", "taskPositions", "memberships"];
            o.forEach(function(t) {
                var o = n["/lists/" + e.id + "/" + t];
                o && i.destroyModels(o.models);
            });
            var a = i.listPositions.at(0);
            a && a.removeIDs([e.id]);
        }
    });
}),
define("vendor/setImmediate", ["wunderbits/global"], function(e, t) {
    function i(e) {
        return g[p] = n.apply(t, e),
        p++;
    }
    function n(e) {
        var i = [].slice.call(arguments, 1);
        return function() {
            "function" == typeof e ? e.apply(t, i) : new Function("" + e)();
        }
        ;
    }
    function o(e) {
        if (f)
            setTimeout(n(o, e), 0);
        else {
            var t = g[e];
            if (t) {
                f = !0;
                try {
                    t();
                } finally {
                    a(e),
                    f = !1;
                }
            }
        }
    }
    function a(e) {
        delete g[e];
    }
    function r() {
        m = function() {
            var e = i(arguments);
            return process.nextTick(n(o, e)),
            e;
        }
        ;
    }
    function s() {
        if (e.postMessage && !e.importScripts) {
            var t = !0
              , i = e.onmessage;
            return e.onmessage = function() {
                t = !1;
            }
            ,
            e.postMessage("", "*"),
            e.onmessage = i,
            t;
        }
    }
    function l() {
        var t = "setImmediate$" + Math.random() + "$"
          , n = function(i) {
            i.source === e && "string" == typeof i.data && 0 === i.data.indexOf(t) && o(+i.data.slice(t.length));
        };
        e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n),
        m = function() {
            var n = i(arguments);
            return e.postMessage(t + n, "*"),
            n;
        }
        ;
    }
    function c() {
        var e = new MessageChannel();
        e.port1.onmessage = function(e) {
            var t = e.data;
            o(t);
        }
        ,
        m = function() {
            var t = i(arguments);
            return e.port2.postMessage(t),
            t;
        }
        ;
    }
    function d() {
        var e = b.documentElement;
        m = function() {
            var t = i(arguments)
              , n = b.createElement("script");
            return n.onreadystatechange = function() {
                o(t),
                n.onreadystatechange = null,
                e.removeChild(n),
                n = null;
            }
            ,
            e.appendChild(n),
            t;
        }
        ;
    }
    function u() {
        m = function() {
            var e = i(arguments);
            return setTimeout(n(o, e), 0),
            e;
        }
        ;
    }
    if (e.setImmediate)
        return e.setImmediate;
    var m, p = 1, g = {}, f = !1, b = e.document, h = Object.getPrototypeOf && Object.getPrototypeOf(e);
    return h = h && h.setTimeout ? h : e,
    "[object process]" === {}.toString.call(e.process) ? r() : s() ? l() : e.MessageChannel ? c() : b && "onreadystatechange"in b.createElement("script") ? d() : u(),
    h.setImmediate = m,
    h.clearImmediate = a,
    h.setImmediate;
}),
define("collections/Managers/FoldersCollectionManager", ["vendor/setImmediate", "collections/FolderCollection", "collections/ListCollection", "collections/Managers/BaseManager"], function(e, t, i, n) {
    return n.extend({
        CollectionClass: t,
        collections: {
            all: "/folders/all"
        },
        observes: {
            "collections.all": {
                add: "persistModel",
                "change:list_ids": "checkLength"
            },
            lists: {
                destroy: "detachListID"
            }
        },
        lists: new i("/lists/all"),
        detachListID: function(e) {
            var t = this;
            t.collections.all.models.forEach(function(t) {
                t.isListIdInFolder(e.id) && t.removeListId(e.id);
            });
        },
        checkLength: function(t) {
            e(function() {
                t.attributes.list_ids.length || t.destroy();
            });
        }
    });
}),
define("collections/Managers/ListPositionsCollectionManager", ["application/runtime", "./BaseManager", "collections/ListCollection", "collections/Positions/ListPositionsCollection"], function(e, t, i, n, o) {
    var a = t.prototype;
    return t.extend({
        CollectionClass: n,
        collections: {
            all: "/listPositions/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "updateListsPositions"],
                "change:values": "updateListsPositions"
            },
            sortableLists: {
                add: ["updateListPositionFromListAdd", "onListModelPositionChange"],
                "change:position": "onListModelPositionChange",
                "change:online_id": "onChangeOnlineListID"
            }
        },
        sortableLists: new i("/lists/sortable"),
        initialize: function() {
            var e = this;
            a.initialize.apply(e, arguments),
            e.handleListModelPositionChange = e.debounce(e.handleListModelPositionChange, 100);
        },
        updateListsPositions: function(e, t, i) {
            var n = this
              , a = e.attributes.values;
            a.forEach(function(e) {
                var t = n.sortableLists.get(e)
                  , r = t && a && a.indexOf(t.id);
                r !== o && -1 !== r && t.save({
                    position: 10 * r
                }, i);
            });
        },
        updateListPositionFromListAdd: function(e, t, i) {
            var n = this;
            i = n.getLocalSaveOptions(i);
            var a = n.collections.all.at(0)
              , r = a && a.attributes.values.indexOf(e.id);
            r !== o && -1 !== r && e.save({
                position: 10 * r
            }, i);
        },
        onChangeOnlineListID: function(e, t, i) {
            var n = this;
            n.onListModelPositionChange(e, o, i);
        },
        onListModelPositionChange: function(e, t, i) {
            var n = this;
            i || (i = {}),
            i.fromStorage || i.fromSync || n.defer(function() {
                n.handleListModelPositionChange();
            });
        },
        handleListModelPositionChange: function() {
            var e = this
              , t = []
              , i = e.sortableLists;
            i.sort(),
            i.models.forEach(function(e) {
                t.push(e.id);
            });
            var n = e.collections.all.at(0);
            n && n.save({
                values: t,
                localValues: t
            });
        }
    });
}),
define("collections/Managers/MembershipsCollectionManager", ["application/runtime", "collections/MembershipCollection", "collections/ListCollection", "collections/Positions/ListPositionsCollection", "collections/UserCollection", "collections/Managers/BaseManager"], function(e, t, i, n, o, a, r) {
    return a.extend({
        CollectionClass: t,
        collections: {
            all: "/memberships/all",
            pendingInvites: "/memberships/me/pending"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "addMembershipToSubCollections", "acceptanceCheck", "pendingCheck", "listOwnershipCheck", "updateListShared", "updateListMutedFromMembership", "updateMembershipListReady", "updateMembershipSenderReady", "updateMembershipUserReady"],
                destroy: ["onMembershipDestroyed"],
                "change:state": ["acceptanceCheck", "pendingCheck"],
                "change:listReady change:senderReady change:userReady": "updateMembershipIsReady",
                "change:muted": "updateListMutedFromMembership",
                "change:isReady": "acceptanceCheck",
                "change:sender_id": "updateMembershipSenderReady"
            },
            lists: {
                add: ["updateStateCollectionsFromList", "updateMembershipListReadyFromList", "updateOwnershipFromList", "updateSharedStateFromList", "updateListMutedFromList"],
                remove: ["cleanupLocalMembershipsFromList"],
                "change:online_id": "migrateLostMemberships"
            },
            users: {
                add: ["updateMembershipUserReadyFromUser", "updateMembershipSenderReadyFromUser"]
            }
        },
        lists: new i("/lists/all"),
        listPositions: new n("/listPositions/all"),
        pendingLists: new i("/lists/pending"),
        acceptedLists: new i("/lists/accepted"),
        sortableLists: new i("/lists/sortable"),
        users: new o("/users/all"),
        onMembershipDestroyed: function(i) {
            var n = this
              , a = i.attributes
              , r = a.list_id
              , s = a.user_id
              , l = new t("/lists/" + r + "/memberships");
            l.remove(i);
            var c = new t("/users/" + a.user_id + "/memberships");
            c.remove(i);
            var d = new t("/senders/" + a.sender_id + "/memberships");
            d.remove(i);
            var u = new o("/lists/" + a.list_id + "/assignables")
              , m = n.users.get(a.user_id);
            m && u.remove(m),
            e.user.isIDEqual(s) && n.cleanupOwnMembershipRelatedData(i),
            n.saveListSharedState(r);
        },
        cleanupOwnMembershipRelatedData: function(e) {
            var t = this
              , i = e.attributes
              , n = t.lists.get(i.list_id);
            if (n) {
                n.destroy(t.fromSyncOptions);
                var o = t.listPositions.at(0);
                o && o.removeIDs([n.id]);
            }
        },
        cleanupLocalMembershipsFromList: function(e, i, n) {
            var o = this;
            n = o.getLocalSaveOptions(n);
            var a = new t("/lists/" + e.id + "/memberships");
            a.models.forEach(function(e) {
                e.destroy(n);
            });
        },
        addMembershipToSubCollections: function(e) {
            var i = e.attributes
              , n = new t("/lists/" + i.list_id + "/memberships");
            n.add(e);
            var o = new t("/users/" + i.user_id + "/memberships");
            o.add(e);
            var a = new t("/senders/" + i.sender_id + "/memberships");
            a.add(e);
        },
        acceptanceCheck: function(t, i, n) {
            var a = this
              , r = t.attributes
              , s = new o("/lists/" + r.list_id + "/assignables")
              , l = a.users.get(r.user_id)
              , c = l && l.attributes;
            if (c && (c.title || c.email)) {
                var d = t.isAccepted();
                a.addOrRemoveFromCollection(d, s, l);
            }
            e.user.isIDEqual(r.user_id) && a.handleListAcceptence(t, n);
        },
        pendingCheck: function(t) {
            var i, n = this, o = t.attributes, a = t.isPending();
            e.user.isIDEqual(o.user_id) && (n.addOrRemoveFromCollection(a, n.collections.pendingInvites, t),
            i = n.lists.get(o.list_id),
            i && (n.addOrRemoveFromCollection(a, n.pendingLists, i),
            n.addOrRemoveFromCollection(!a, n.acceptedLists, i)));
        },
        updateStateCollectionsFromList: function(e, i, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                var a = new t("/lists/" + e.id + "/memberships");
                a.models.forEach(function(e) {
                    o.defer(function() {
                        o.acceptanceCheck(e, i, n),
                        o.pendingCheck(e, i, n);
                    });
                });
            }
        },
        handleListAcceptence: function(e, t) {
            var i = this
              , n = i.lists.get(e.attributes.list_id);
            if (n) {
                var o = e.isAccepted();
                n.isInbox() || i.addOrRemoveFromCollection(o, i.sortableLists, n, t),
                i.addOrRemoveFromCollection(o, i.acceptedLists, n, t);
            }
        },
        updateListShared: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = e.attributes.list_id;
                n.saveListSharedState(o, i);
            }
        },
        updateListMutedFromMembership: function(t, i, n) {
            var o = this
              , a = t.attributes;
            if (o.hasUpdateOptions(n) && e.user.isIDEqual(a.user_id)) {
                n = o.getLocalSaveOptions(n);
                var r = a.list_id
                  , s = !!a.muted
                  , l = o.lists.get(r);
                l && l.attributes.muted !== s && l.save({
                    muted: s
                }, n);
            }
        },
        updateListMutedFromList: function(i, n, o) {
            var a = this;
            if (a.hasUpdateOptions(o)) {
                var s = new t("/lists/" + i.id + "/memberships")
                  , l = s.findWhere({
                    user_id: "" + e.user.id
                });
                l && a.updateListMutedFromMembership(l, r, o);
            }
        },
        getListMembers: function(i) {
            var n = new t("/lists/" + i + "/memberships");
            return n.models.slice().filter(function(t) {
                return !e.user.isIDEqual(t.attributes.user_id);
            });
        },
        saveListSharedState: function(e, t) {
            var i = this;
            t = i.getLocalSaveOptions(t);
            var n = i.getListMembers(e)
              , o = i.lists.get(e);
            if (o) {
                var a = !!n.length;
                o.attributes.isShared !== a && o.save({
                    isShared: a
                }, t);
            }
        },
        updateSharedStateFromList: function(e, t, i) {
            var n = this;
            n.hasUpdateOptions(i) && (i = n.getLocalSaveOptions(i),
            n.saveListSharedState(e.id, i));
        },
        updateMembershipListReady: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = e.attributes.list_id
                  , a = o && n.lists.get(o)
                  , r = !!a;
                e.attributes.listReady !== r && e.save({
                    listReady: r
                }, i);
            }
        },
        updateMembershipListReadyFromList: function(e, i, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                var a = new t("/lists/" + e.id + "/memberships");
                a.models.forEach(function(e) {
                    o.defer(function() {
                        o.updateMembershipListReady(e, i, n);
                    });
                });
            }
        },
        updateMembershipSenderReady: function(t, i, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                n = o.getLocalSaveOptions(n);
                var a = t.attributes.sender_id
                  , r = a && o.users.get(a);
                !r && e.user.isIDEqual(a) && (r = e.user);
                var s = !!r;
                t.attributes.senderReady !== s && t.save({
                    senderReady: s
                }, n);
            }
        },
        updateMembershipSenderReadyFromUser: function(e, i, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                var a = new t("/senders/" + e.id + "/memberships");
                a.models.forEach(function(e) {
                    o.defer(function() {
                        o.updateMembershipSenderReady(e, i, n);
                    });
                });
            }
        },
        updateMembershipUserReady: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = e.attributes.user_id
                  , a = o && n.users.get(o)
                  , r = !!a;
                e.attributes.userReady !== r && e.save({
                    userReady: r
                }, i);
            }
        },
        updateMembershipUserReadyFromUser: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = n.collections.all.where({
                    user_id: e.id
                });
                o.forEach(function(e) {
                    n.defer(function() {
                        n.updateMembershipUserReady(e, t, i);
                    });
                });
            }
        },
        updateMembershipIsReady: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = e.attributes
                  , a = o.listReady && o.senderReady && o.userReady;
                a = !!a,
                e.attributes.isReady !== a && e.save({
                    isReady: !!a
                }, i);
            }
        },
        listOwnershipCheck: function(t, i, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                n = o.getLocalSaveOptions(n);
                var a, r = t.attributes, s = e.user.isIDEqual(r.user_id), l = o.lists.get(r.list_id);
                s && r.owner ? a = "owner" : s && !r.owner && (a = "member");
                var c = {};
                r.owner && (c.owner_id = r.user_id),
                a && (c.membershipID = t.id,
                c.role = a),
                Object.keys(c).length && l && l.save(c, n);
            }
        },
        updateOwnershipFromList: function(e, i, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                var a = new t("/lists/" + e.id + "/memberships");
                a.forEach(function(e) {
                    o.defer(function() {
                        o.listOwnershipCheck(e, i, n);
                    });
                });
            }
        },
        migrateLostMemberships: function(e, t, i) {
            var n = this
              , a = e.attributes;
            if (i.fromSync === !0 && a.online_id) {
                var r = new o("/lists/" + a.online_id + "/assignables")
                  , s = new o("/lists/" + e.id + "/assignables");
                r.models.forEach(function(e) {
                    r.remove(e, n.fromSyncOptions),
                    s.add(e, n.fromSyncOptions);
                });
            }
        }
    });
}),
define("collections/Managers/RemindersCollectionManager", ["./BaseManager", "collections/ReminderCollection", "collections/TaskCollection"], function(e, t, i) {
    return e.extend({
        CollectionClass: t,
        collections: {
            all: "/reminders/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "reminderTaskIDCheck", "reminderListIDCheck"]
            },
            tasks: {
                add: "checkListIDFromTask"
            }
        },
        tasks: new i("/tasks/all"),
        reminderTaskIDCheck: function(e) {
            var i = e.attributes.task_id
              , n = new t("/tasks/" + i + "/reminders");
            n.add(e);
        },
        reminderListIDCheck: function(e) {
            var i = this
              , n = e.attributes.task_id
              , o = i.tasks.get(n);
            if (o) {
                var a = o.attributes.list_id
                  , r = new t("/lists/" + a + "/reminders");
                r.add(e);
            }
        },
        checkListIDFromTask: function(e) {
            var t = this
              , i = t.collections.all.where({
                task_id: e.id
            });
            i.forEach(function(e) {
                t.reminderListIDCheck(e);
            });
        }
    });
}),
define("collections/Managers/ServicesCollectionManager", ["application/runtime", "./BaseManager", "collections/ServiceCollection"], function(e, t, i) {
    return t.extend({
        CollectionClass: i,
        collections: {
            all: "/services/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "onServiceAdd"]
            }
        },
        onServiceAdd: function(t, i, n) {
            if (this.hasUpdateOptions(n)) {
                var o = t.attributes
                  , a = o.provider_id
                  , r = o.provider_type;
                a && e.user.save(r + "_id", a);
            }
        }
    });
}),
define("helpers/pinnedSite", ["wunderbits/global", "project!core"], function(e, t) {
    return t.WBSingleton.extend({
        flashWindow: function() {
            try {
                e.external && e.external.msIsSiteMode && e.external.msIsSiteMode() && e.external.msSiteModeActivate();
            } catch (t) {}
        },
        createJumpListCategory: function(t) {
            try {
                e.external && e.external.msIsSiteMode && e.external.msIsSiteMode() && e.external.msSiteModeCreateJumpList(t);
            } catch (i) {}
        },
        addJumpListItem: function(t, i, n) {
            try {
                e.external && e.external.msIsSiteMode && e.external.msIsSiteMode() && e.external.msSiteModeAddJumpListItem(t, i, n, "self");
            } catch (o) {}
        }
    });
}),
define("helpers/URLResolver", ["urls"], function(e) {
    function t(e) {
        return /(https?:)?\/\//.test(e) ? e : i[e] ? n + i[e] : (n + "/" + e).replace(/\/+/, "/");
    }
    var i = e.urlMap || {}
      , n = e.baseUrl || "/";
    return {
        resolve: t
    };
}),
define("wunderbits/mixins/ThrottleMixin", ["../lib/dependencies", "project!core"], function(e, t) {
    var i = e._
      , n = t.lib.toArray
      , o = t.WBMixin;
    return o.extend({
        throttle: function(e) {
            function t() {
                o.destroyed || e.apply(o, arguments);
            }
            var o = this
              , a = n(arguments);
            return a[0] = t,
            i.throttle.apply(null, a);
        }
    });
}),
define("wunderbits/BaseView", ["./lib/dependencies", "project!core", "vendor/handlebars.runtime", "./mixins/DebounceMixin", "./mixins/ThrottleMixin"], function(e, t, i, n, o) {
    function a(e) {
        return e && e.data ? i.template(e.data) : "function" == typeof e ? e : void 0;
    }
    var r = t.lib.createUID
      , s = t.mixins.WBEventsMixin
      , l = t.mixins.WBBindableMixin
      , c = t.mixins.WBUtilsMixin
      , d = t.WBClass.prototype
      , u = e.Backbone
      , m = u.View.extend({
        initialize: function(e) {
            var t = this;
            t.uid = r(),
            t.options = e || {},
            d.augmentProperties.call(t),
            d.initMixins.call(t, e);
        }
    }, {
        extend: function(e, t) {
            if (requirejs.isBrowser) {
                e || (e = {}),
                e.template && (e.template = a(e.template));
                var i = e.templates || {};
                Object.keys(i).forEach(function(e) {
                    i[e] = a(i[e]);
                });
            }
            return u.View.extend.call(this, e, t);
        }
    });
    return [s, l, c, n, o].forEach(function(e) {
        e.applyToClass(m);
    }),
    m;
}),
define("wunderbits/mixins/WBSubviewsMixin", ["../lib/dependencies", "../BaseView", "project!core"], function(e, t, i) {
    function n(e) {
        function t(e) {
            for (var i in e)
                "uid" !== i && ("renderData" === i && t(e[i]),
                delete e[i]);
        }
        return e._detached && s.cleanData([e.el]),
        e.trigger && e.trigger("destroy"),
        e.unbind(),
        e.unbindAll && e.unbindAll(),
        e._superView && e._superView.trigger && e._superView.trigger("destroyed:subview", e),
        e.onDestroy && e.onDestroy(),
        t(e),
        e.destroyed = !0,
        e;
    }
    function o(e, t) {
        return t._name && delete e._namedSubviews[t._name],
        e._subviews = r.without(e._subviews, t),
        e;
    }
    var a = i.WBMixin
      , r = e._
      , s = e.$;
    return a.extend({
        initialize: function() {
            var e = this;
            e.bindTo(e, "destroyed:subview", "unbindFromTarget");
        },
        addSubview: function(e, i) {
            var n = this;
            if (!(e && e instanceof t))
                throw new Error("Cannot add invalid or undefined subview");
            return !n._subviews && (n._subviews = []),
            e._superView = n,
            n.state && e.state && !r.isEmpty(e.state) ? e.parentState = n.state : n.state && (e.state = n.state),
            "undefined" != typeof i && (e._name = i,
            !n._namedSubviews && (n._namedSubviews = {}),
            n._namedSubviews[i] && n.destroySubview(i),
            n._namedSubviews[i] = e),
            n._subviews.push(e),
            e;
        },
        getSubview: function(e) {
            var t = this;
            return t._namedSubviews && t._namedSubviews[e];
        },
        destroySubview: function(e) {
            var i = this
              , n = e instanceof t ? e : i._namedSubviews && i._namedSubviews[e];
            n && n.destroy({
                silent: !0
            });
        },
        destroySubviews: function() {
            var e = this;
            if (e._subviews)
                for (var t, i = r.clone(e._subviews), n = 0, o = i.length; o > n; n++)
                    t = i[n],
                    t && !t.destroyed && t.destroy();
        },
        destroy: function() {
            var e = this;
            return e.destroyed ? e : (e._superView && o(e._superView, e),
            e.destroySubviews(),
            e._claimedElement ? (e.$el && e.$el.empty(),
            s.cleanData([e.el])) : e.$el && e.$el.remove(),
            n(e, !0),
            e = null);
        },
        detach: function() {
            var e = this;
            return e._detached = !0,
            e.$el.detach(),
            e;
        },
        cleanData: function() {
            var e = this;
            e.el && (s.cleanData(e.el.getElementsByTagName("*")),
            s.cleanData([e.el]));
        },
        delegateSubviewsEvents: function() {
            var e = this;
            r.invoke(e._subviews, "delegateSubviewEvents");
        },
        delegateSubviewEvents: function() {
            var e = this;
            e.delegateSubviewsEvents(),
            e.delegateEvents();
        }
    });
}),
define("wunderbits/WBStyleApplier", ["./lib/dependencies", "vendor/md5", "urls", "wunderbits/BaseEventEmitter", "project!core"], function(e, t, i, n, o) {
    var a = e._
      , r = o.lib.createUID
      , s = i.urlMap
      , l = i.baseUrl || "/"
      , c = n.prototype
      , d = {};
    return n.extend({
        initialize: function(e, t) {
            var i = this;
            if (c.initialize.apply(i, arguments),
            !a.isString(e))
                throw new Error("Cannot initialize WBStyleApplier without a namespace");
            if (!a.isString(t))
                throw new Error("Cannot initialize WBStyleApplier without styles");
            i.name = e,
            i.rawStyle = t;
        },
        getElementId: function() {
            var e = this;
            return t(e.name);
        },
        remove: function() {
            var e = this
              , t = e.getElementId();
            if (d[t] && e.target && (d[t] = a.without(d[t], e.target.uid),
            !d[t].length)) {
                var i = document.getElementById(t);
                i.parentNode.removeChild(i);
            }
            e.target.off("destroy", e.remove, e);
        },
        apply: function(e) {
            var t = this;
            if (!e || !a.isFunction(e.on))
                throw new Error("Cannot apply styles without valid target");
            e.uid || (e.uid = r()),
            t.target = e;
            var i = t.getElementId()
              , n = document.getElementById(i);
            if (n)
                return void (~d[i].indexOf(e.uid) || (d[i].push(e.uid),
                e.on("destroy", t.remove, t)));
            var o = document.getElementsByTagName("head")[0]
              , c = document.createElement("style");
            c.id = i,
            c.type = "text/css",
            c.setAttribute("data-requiremodule", t.name),
            c.setAttribute("data-requirecontext", "styles");
            var u = t.rawStyle.replace(/url\(\"([^\"]+)/g, function(e) {
                return e.replace(/url\(\"([^\"]+)/, function(e, t) {
                    return /^(https?:)?\/\//.test(t) ? 'url("' + t : /^data:/.test(t) ? 'url("' + t : (s && (t = s[t]),
                    'url("' + l + t);
                });
            })
              , m = document.createTextNode(u);
            c.styleSheet ? c.styleSheet.cssText = m.nodeValue : c.appendChild(m),
            o.appendChild(c),
            d[i] = [e.uid],
            e.on("destroy", t.remove, t);
        }
    });
}),
define("wunderbits/mixins/WBStylesApplierMixin", ["project!core", "../WBStyleApplier"], function(e, t) {
    return e.WBMixin.extend({
        initialize: function() {
            var e = this;
            e.autoApplyStyles !== !1 && e.applyStyles();
        },
        applyStyles: function() {
            var e = this;
            if (Array.isArray(e.styles))
                for (var i, n = 0, o = e.styles.length; o > n; n++) {
                    if (i = e.styles[n],
                    i instanceof t || !i.name || !i.data || (i = new t(i.name,i.data)),
                    "function" != typeof i && "function" != typeof i.apply)
                        throw new Error("Cannot apply style, not valid WBStyleApplier (sub)class");
                    i.apply(e);
                }
        }
    });
}),
define("wunderbits/mixins/HidableViewMixin", ["project!core"], function(e) {
    var t = e.WBDeferred
      , i = e.WBMixin;
    return i.extend({
        show: function() {
            var e = this;
            return !e.destroyed && e.$el && e.$el.removeClass("hidden"),
            e;
        },
        hide: function() {
            var e = this;
            return !e.destroyed && e.$el && e.$el.addClass("hidden"),
            e;
        },
        fadeOut: function(e, i) {
            var n = this
              , o = new t()
              , a = i ? n.$(i) : n.$el;
            return a.fadeOut(e, function() {
                o.resolve();
            }),
            o.promise();
        },
        fadeIn: function(e, i) {
            var n = this
              , o = new t()
              , a = i ? n.$(i) : n.$el;
            return a ? a.fadeIn(e, function() {
                o.resolve();
            }) : o.resolve(),
            o.promise();
        }
    });
}),
function(e) {
    e("vendor/when", ["require"], function(e) {
        function t(e, t, i, n) {
            return o(e).then(t, i, n);
        }
        function i(e) {
            return new n(e,W.PromiseStatus && W.PromiseStatus());
        }
        function n(e, t) {
            function i() {
                return d ? d.inspect() : S();
            }
            function n(e, t, i, n, o) {
                function a(a) {
                    a._when(e, t, i, n, o);
                }
                u ? u.push(a) : L(function() {
                    a(d);
                });
            }
            function o(e) {
                if (u) {
                    var i = u;
                    u = H,
                    d = c(s, e),
                    L(function() {
                        t && g(d, t),
                        l(i, d);
                    });
                }
            }
            function a(e) {
                o(new m(e));
            }
            function r(e) {
                if (u) {
                    var t = u;
                    L(function() {
                        l(t, new p(e));
                    });
                }
            }
            var s, d, u = [];
            s = this,
            this._status = t,
            this.inspect = i,
            this._when = n;
            try {
                e(o, a, r);
            } catch (f) {
                a(f);
            }
        }
        function o(e) {
            return e instanceof n ? e : a(e);
        }
        function a(e) {
            return i(function(t) {
                t(e);
            });
        }
        function r(e) {
            return t(e, function(e) {
                return new m(e);
            });
        }
        function s() {
            function e(e, i, r) {
                t.resolve = t.resolver.resolve = function(t) {
                    return o ? a(t) : (o = !0,
                    e(t),
                    n);
                }
                ,
                t.reject = t.resolver.reject = function(e) {
                    return o ? a(new m(e)) : (o = !0,
                    i(e),
                    n);
                }
                ,
                t.notify = t.resolver.notify = function(e) {
                    return r(e),
                    e;
                }
                ;
            }
            var t, n, o;
            return t = {
                promise: H,
                resolve: H,
                reject: H,
                notify: H,
                resolver: {
                    resolve: H,
                    reject: H,
                    notify: H
                }
            },
            t.promise = n = i(e),
            t;
        }
        function l(e, t) {
            for (var i = 0; i < e.length; i++)
                e[i](t);
        }
        function c(e, t) {
            if (t === e)
                return new m(new TypeError());
            if (t instanceof n)
                return t;
            try {
                var i = t === Object(t) && t.then;
                return "function" == typeof i ? d(i, t) : new u(t);
            } catch (o) {
                return new m(o);
            }
        }
        function d(e, t) {
            return i(function(i, n) {
                L(function() {
                    try {
                        B(e, t, i, n);
                    } catch (o) {
                        n(o);
                    }
                });
            });
        }
        function u(e) {
            this.value = e;
        }
        function m(e) {
            this.value = e;
        }
        function p(e) {
            this.value = e;
        }
        function g(e, t) {
            function i() {
                t.fulfilled();
            }
            function n(e) {
                t.rejected(e);
            }
            e.then(i, n);
        }
        function f(e) {
            return e && "function" == typeof e.then;
        }
        function b(e, n, o, a, r) {
            return t(e, function(e) {
                function s(i, o, a) {
                    function r(e) {
                        p(e);
                    }
                    function s(e) {
                        m(e);
                    }
                    var l, c, d, u, m, p, g, f;
                    if (g = e.length >>> 0,
                    l = Math.max(0, Math.min(n, g)),
                    d = [],
                    c = g - l + 1,
                    u = [],
                    l)
                        for (p = function(e) {
                            u.push(e),
                            --c || (m = p = j,
                            o(u));
                        }
                        ,
                        m = function(e) {
                            d.push(e),
                            --l || (m = p = j,
                            i(d));
                        }
                        ,
                        f = 0; g > f; ++f)
                            f in e && t(e[f], s, r, a);
                    else
                        i(d);
                }
                return i(s).then(o, a, r);
            });
        }
        function h(e, t, i, n) {
            function o(e) {
                return t ? t(e[0]) : e[0];
            }
            return b(e, 1, o, i, n);
        }
        function v(e, t, i, n) {
            return x(e, j).then(t, i, n);
        }
        function _() {
            return x(arguments, j);
        }
        function w(e) {
            return x(e, C, T);
        }
        function k(e, t) {
            return x(e, t);
        }
        function x(e, i, o) {
            return t(e, function(e) {
                function a(n, a, r) {
                    function s(e, s) {
                        t(e, i, o).then(function(e) {
                            l[s] = e,
                            --d || n(l);
                        }, a, r);
                    }
                    var l, c, d, u;
                    if (d = c = e.length >>> 0,
                    l = [],
                    !d)
                        return void n(l);
                    for (u = 0; c > u; u++)
                        u in e ? s(e[u], u) : --d;
                }
                return new n(a);
            });
        }
        function y(e, i) {
            var n = B(P, arguments, 1);
            return t(e, function(e) {
                var o;
                return o = e.length,
                n[0] = function(e, n, a) {
                    return t(e, function(e) {
                        return t(n, function(t) {
                            return i(e, t, a, o);
                        });
                    });
                }
                ,
                A.apply(e, n);
            });
        }
        function C(e) {
            return {
                state: "fulfilled",
                value: e
            };
        }
        function T(e) {
            return {
                state: "rejected",
                reason: e
            };
        }
        function S() {
            return {
                state: "pending"
            };
        }
        function L(e) {
            1 === E.push(e) && F(D);
        }
        function D() {
            l(E),
            E = [];
        }
        function j(e) {
            return e;
        }
        function M(e) {
            throw "function" == typeof W.reportUnhandled ? W.reportUnhandled() : L(function() {
                throw e;
            }),
            e;
        }
        t.promise = i,
        t.resolve = a,
        t.reject = r,
        t.defer = s,
        t.join = _,
        t.all = v,
        t.map = k,
        t.reduce = y,
        t.settle = w,
        t.any = h,
        t.some = b,
        t.isPromise = f,
        t.isPromiseLike = f,
        z = n.prototype,
        z.then = function(e, t, i) {
            var o = this;
            return new n(function(n, a, r) {
                o._when(n, r, e, t, i);
            }
            ,this._status && this._status.observed());
        }
        ,
        z["catch"] = z.otherwise = function(e) {
            return this.then(H, e);
        }
        ,
        z["finally"] = z.ensure = function(e) {
            function t() {
                return a(e());
            }
            return "function" == typeof e ? this.then(t, t)["yield"](this) : this;
        }
        ,
        z.done = function(e, t) {
            this.then(e, t)["catch"](M);
        }
        ,
        z["yield"] = function(e) {
            return this.then(function() {
                return e;
            });
        }
        ,
        z.tap = function(e) {
            return this.then(e)["yield"](this);
        }
        ,
        z.spread = function(e) {
            return this.then(function(t) {
                return v(t, function(t) {
                    return e.apply(H, t);
                });
            });
        }
        ,
        z.always = function(e, t) {
            return this.then(e, e, t);
        }
        ,
        I = Object.create || function(e) {
            function t() {}
            return t.prototype = e,
            new t();
        }
        ,
        u.prototype = I(z),
        u.prototype.inspect = function() {
            return C(this.value);
        }
        ,
        u.prototype._when = function(e, t, i) {
            try {
                e("function" == typeof i ? i(this.value) : this.value);
            } catch (n) {
                e(new m(n));
            }
        }
        ,
        m.prototype = I(z),
        m.prototype.inspect = function() {
            return T(this.value);
        }
        ,
        m.prototype._when = function(e, t, i, n) {
            try {
                e("function" == typeof n ? n(this.value) : this);
            } catch (o) {
                e(new m(o));
            }
        }
        ,
        p.prototype = I(z),
        p.prototype._when = function(e, t, i, n, o) {
            try {
                t("function" == typeof o ? o(this.value) : this.value);
            } catch (a) {
                t(a);
            }
        }
        ;
        var z, I, A, P, B, F, E, O, R, $, W, N, V, U, H;
        if (V = e,
        E = [],
        W = "undefined" != typeof console ? console : t,
        "object" == typeof process && process.nextTick)
            F = process.nextTick;
        else if (U = "function" == typeof MutationObserver && MutationObserver || "function" == typeof WebKitMutationObserver && WebKitMutationObserver)
            F = function(e, t, i) {
                var n = e.createElement("div");
                return new t(i).observe(n, {
                    attributes: !0
                }),
                function() {
                    n.setAttribute("x", "x");
                }
                ;
            }(document, U, D);
        else
            try {
                F = V("vertx").runOnLoop || V("vertx").runOnContext;
            } catch (Y) {
                N = setTimeout,
                F = function(e) {
                    N(e, 0);
                }
                ;
            }
        return O = Function.prototype,
        R = O.call,
        B = O.bind ? R.bind(R) : function(e, t) {
            return e.apply(t, P.call(arguments, 2));
        }
        ,
        $ = [],
        P = $.slice,
        A = $.reduce || function(e) {
            var t, i, n, o, a;
            if (a = 0,
            t = Object(this),
            o = t.length >>> 0,
            i = arguments,
            i.length <= 1)
                for (; ; ) {
                    if (a in t) {
                        n = t[a++];
                        break;
                    }
                    if (++a >= o)
                        throw new TypeError();
                }
            else
                n = i[1];
            for (; o > a; ++a)
                a in t && (n = e(n, t[a], a, t));
            return n;
        }
        ,
        t;
    });
}("function" == typeof define && define.amd ? define : function(e) {
    module.exports = e(require);
}
),
define("helpers/domtools", ["vendor/when", "application/runtime", "project!core"], function(e, t, i) {
    function n(e, t) {
        e.innerHTML = "",
        e.appendChild(document.createTextNode(t));
    }
    function o(e, t, i) {
        function n() {
            e.removeEventListener(t, n, !1),
            i.apply(null, arguments);
        }
        return e.addEventListener(t, n, !1),
        function() {
            e.removeEventListener(t, n, !1);
        }
        ;
    }
    function a(t, i, n, r) {
        var s, l;
        return t.parentElement ? n ? f().then(a.bind(null, t, i, !1, r)) : ("number" != typeof r && (r = 2e3),
        s = e.defer(),
        t.classList.contains(i) ? s.resolve() : (k.setTimeout(function() {
            l && (l(),
            l = null),
            s.resolve(!1);
        }, r),
        l = o(t, "transitionend", function(e) {
            l = null,
            e.stopPropagation(),
            s.resolve(!0);
        }),
        t.classList.add(i)),
        s.promise) : e.resolve();
    }
    function r(e, t) {
        for (; e && e !== t && 1 === e.nodeType; )
            e = e.parentNode;
        return e === t;
    }
    function s(e, t, i) {
        for (; e && e !== t && 1 === e.nodeType && !i(e); )
            e = e.parentNode;
        return e ? 1 !== e.nodeType ? null : e === t ? null : e : null;
    }
    function l(e, t) {
        return s(t, e, function(t) {
            return t.parentNode === e;
        });
    }
    function c(e, t, i) {
        return i = i.toUpperCase(),
        s(e, t, function(e) {
            return e.tagName === i;
        });
    }
    function d(e, t, i) {
        return s(e, t, function(e) {
            var t = i.some(function(t) {
                return !e.classList.contains(t);
            });
            return !t;
        });
    }
    function u() {
        return !0;
    }
    function m(e, t) {
        var i = e.parentElement.firstChild
          , n = 0;
        for (t || (t = u); 1 !== i.nodeType; )
            i = i.nextSibling;
        for (; i !== e; ) {
            t(i) && ++n;
            do
                i = i.nextSibling;
            while (1 !== i.nodeType);
        }
        return n;
    }
    function p(t) {
        var i = e.defer();
        return k.setTimeout(i.resolve.bind(i), t),
        i.promise;
    }
    function g(e) {
        "function" == typeof setImmediate ? k.setImmediate(e) : k.setTimeout(e, 1);
    }
    function f() {
        var t = e.defer();
        return g(t.resolve.bind(t)),
        t.promise;
    }
    function b(e) {
        if (!e)
            return null;
        do
            e = e.nextSibling;
        while (e && 1 !== e.nodeType);return e;
    }
    function h(e) {
        if (!e)
            return null;
        do
            e = e.previousSibling;
        while (e && 1 !== e.nodeType);return e;
    }
    function v(e, t) {
        var i = t || document;
        return i.querySelector('[rel="' + e + '"]');
    }
    function _(e, t) {
        var i = e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector;
        return i.call(e, t);
    }
    function w(e, t, i) {
        e.setAttribute(t, i);
    }
    var k = t.global;
    return i.WBSingleton.extend({
        setAttribute: w,
        setText: n,
        once: o,
        closest: c,
        closestClassList: d,
        getDirectChildOf: l,
        isChildOf: r,
        elementIndex: m,
        transition: a,
        delay: p,
        setImmediate: g,
        nextElement: b,
        previousElement: h,
        byRel: v,
        elementMatchesSelector: _
    });
}),
define("wunderbits/mixins/LocalizedViewMixin", ["helpers/domtools", "../lib/dependencies", "../helpers/xss", "../WBLanguageManager", "project!core"], function(e, t, i, n, o) {
    var a = o.WBMixin
      , r = o.lib.toArray;
    return a.extend({
        initialize: function() {
            var e = this;
            e.bindTo(n, "done", e.renderLocalized);
        },
        renderLocalized: function() {
            var e = this;
            e.renderLabels(),
            e.renderPlaceHolders(),
            e.renderTitles(),
            e.renderOptions(),
            e.renderAriaAttributes(),
            e.trigger("localized");
        },
        convertSymbols: function(e) {
            var t = 0;
            return e.replace(/\$([^0-9]|$)/g, function(e, i) {
                return "$" + ++t + (i || "");
            });
        },
        replaceSymbols: function(e, t) {
            var n = 0;
            return e.replace(/\$([0-9])/g, function() {
                var e = i.clean(t[n])
                  , o = '<token class="token_' + n + '" title="' + e + '">' + e + "</token>";
                return n++,
                o;
            });
        },
        renderLabels: function(e) {
            var t, i, o, a, r = this, s = n.getKeys(), l = e || r.el, c = l && l.querySelectorAll("text[rel]");
            if (c.length)
                for (var d = 0, u = c.length; u > d; d++)
                    t = c[d],
                    i = t.getAttribute("rel"),
                    o = s[i],
                    o && (a = t.getAttribute("data"),
                    a && a.length && (a = a.split("☃"),
                    o = r.convertSymbols(o),
                    a = n.localizationception(a),
                    o = r.replaceSymbols(o, a)),
                    t.innerHTML = o);
            s = null;
        },
        renderAttributes: function(t, o, a, s) {
            var l = this
              , c = l.el && l.el.querySelectorAll(o) || [];
            c = r(c);
            var d, u, m, p, g;
            if (l.el && c.push(l.el),
            c.length)
                for (var f = 0, b = c.length; b > f; f++)
                    d = c[f],
                    u = d.getAttribute("data-key-" + t),
                    u && (p = [u],
                    m = d.getAttribute("data-" + t),
                    m && (m = m.split("☃"),
                    p.push(m)),
                    g = n.getText.apply(n, p) || u,
                    s && (g = i.reverseClean(g)),
                    a ? e.setText(d, g) : d.setAttribute(t, g));
        },
        renderTitles: function() {
            var e = this;
            e.renderAttributes("title", "[data-key-title]");
        },
        renderPlaceHolders: function() {
            var e = this;
            e.renderAttributes("placeholder", "input[data-key-placeholder], textarea[data-key-placeholder], input[data-key-value]", !1, !0),
            e.renderAttributes("value", "input[data-key-value], textarea[data-key-value]");
        },
        renderOptions: function() {
            var e = this
              , t = !0;
            e.renderAttributes("text", "option[data-key-text]", t, !0);
        },
        renderAriaAttributes: function() {
            var e = this;
            e.renderAttributes("aria-label", "[data-key-aria-label]");
        }
    });
}),
define("wunderbits/mixins/ABTestableMixin", ["project!core"], function(e) {
    return e.WBMixin.extend({
        makeABTestable: function(e, t) {
            var i, n, o = this;
            if (e = e || .5,
            "number" != typeof e || 0 >= e || e >= 1)
                throw new Error("weight for A/B testing should be a number between 0 & 1 , excluding those values");
            t && (n = parseInt(t, 16),
            isNaN(n) || (i = Math.floor(n % (1 / e)))),
            i || (i = Math.floor(Math.random() / e)),
            o.ABMode = "AB".substr(1 > i ? 0 : 1, 1);
            var a = o["initialize" + o.ABMode];
            return "function" == typeof a ? a.apply(o) : void 0;
        },
        renderAB: function() {
            var e = this
              , t = e["render" + e.ABMode];
            return "function" == typeof t ? t.apply(e) : e;
        },
        forceInitOfType: function(e) {
            var t = this;
            t.ABMode = e;
            var i = t["initialize" + e];
            return "function" == typeof i ? i.apply(t) : void 0;
        },
        forceRenderOfType: function(e) {
            var t = this;
            t.ABMode = e;
            var i = t["render" + e];
            return "function" == typeof i ? i.apply(t) : t;
        }
    });
}),
define("wunderbits/WBView", ["./global", "./BaseView", "project!core", "./mixins/WBSubviewsMixin", "./mixins/WBStylesApplierMixin", "./mixins/HidableViewMixin", "./mixins/LocalizedViewMixin", "./mixins/ABTestableMixin"], function(e, t, i, n, o, a, r, s) {
    var l = i.lib.fromSuper
      , c = i.lib.merge
      , d = e.requestAnimationFrame
      , u = t.prototype
      , m = t.extend({
        renderData: {},
        state: {},
        styles: [],
        initialize: function() {
            var e = this;
            u.initialize.apply(e, arguments),
            e.renderData = l.merge(e, "renderData"),
            e.state = l.merge(e, "state");
        },
        formatData: function(e) {
            var t = this;
            return c({}, t.renderData, e);
        },
        render: function(e) {
            var t = this;
            t.$el.empty();
            var i = t.template;
            if ("function" == typeof i) {
                var n = t.data = t.formatData(e);
                t.$el.html(i(n)),
                t.renderLocalized();
            }
            return t.ABMode && t.renderAB(),
            t.postRender(),
            t.delegateEvents(),
            t.isRendered = !0,
            t.trigger("rendered"),
            t;
        },
        postRender: function() {},
        requestAnimationFrame: function(e) {
            var t = this;
            d(function() {
                !t.destroyed && e();
            });
        }
    }, {
        extend: function(e, i) {
            e || (e = {});
            var n = [];
            return n.push.apply(n, this.prototype.styles),
            n.push.apply(n, e.styles),
            e.styles = n,
            t.extend.call(this, e, i);
        }
    });
    return [n, o, r, s, a].forEach(function(e) {
        e.applyToClass(m);
    }),
    m;
}),
define("helpers/notifications", ["application/runtime", "wunderbits/WBView", "helpers/URLResolver", "wunderbits/BaseSingleton"], function(e, t, i, n) {
    var o, a, r = e._, s = e.global, l = 1e3, c = 3e4, d = !1, u = !1, m = [], p = [], g = {}, f = i.resolve("images/icon.png"), b = {};
    return n.extend({
        start: function() {
            var e = this;
            o = e.delay("_showNextNotification", l);
        },
        stop: function() {
            clearInterval(o);
        },
        _checkSupport: function() {
            var e = this
              , t = s.chrome
              , i = !1;
            try {
                t && (i = !0);
            } catch (n) {}
            return !d && i && t.notifications ? (d = !0,
            a = t.notifications,
            e._setupChromeAppListeners()) : !d && s.Notification && (d = !0,
            a = s.Notification),
            d;
        },
        _setupChromeAppListeners: function() {
            a.onClosed.addListener(function(e) {
                var t = b[e] || {};
                t.onClosed && t.onClosed(),
                b[e] = null;
            }),
            a.onClicked.addListener(function(e) {
                var t = b[e] || {};
                t.onClick && t.onClick();
            }),
            a.onButtonClicked.addListener(function(e, t) {
                var i = b[e] || {}
                  , n = i.buttons
                  , o = n && n[t];
                o && o.onClick && o.onClick();
            });
        },
        _getPermission: function(e) {
            var t = this;
            t._permissionGranted() || a.requestPermission(function() {
                t._permissionGranted() && "function" == typeof e && e();
            });
        },
        _permissionGranted: function() {
            return a.create ? u = !0 : a.checkPermission ? u = 0 === a.checkPermission() : a.permission && (u = "granted" === a.permission),
            u;
        },
        _createNotification: function(e) {
            var t, i = this;
            return g[e.notificationId] ? void 0 : (g[e.notificationId] = !0,
            s.Notification && !a.create ? t = i._createW3CNotification(e) : a.create && (t = i._createChromeAppNotification(e),
            b[e.notificationId] = {
                onClick: e.onClick,
                onClose: e.onClose,
                buttons: e.buttonHandlers
            }),
            i._attachNotificationEventHandlers(t, e),
            t);
        },
        _createW3CNotification: function(e) {
            var t = new a(e.title,{
                title: e.title,
                body: e.text,
                icon: e.icon
            });
            return t;
        },
        _createChromeAppNotification: function(e) {
            var t = a.create(e.notificationId, {
                type: e.templateType || "basic",
                iconUrl: e.icon,
                title: e.title,
                message: e.text,
                eventTime: e.eventTime,
                buttons: e.buttons,
                imageUrl: e.imageUrl,
                items: e.items
            }, function() {
                console.log(arguments);
            });
            return t;
        },
        _attachNotificationEventHandlers: function(e, t) {
            e && (e.ondisplay = e.onshow = t.onOpen || function() {
                t.timeout && r.delay(function() {
                    e.cancel();
                }, c);
            }
            ,
            e.onclick = t.onClick || function() {
                e.cancel();
            }
            ,
            e.onclose = t.onClose || null);
        },
        _queueNotification: function(e) {
            m.push(e);
        },
        _displayQueuedNotifications: function() {
            var e, t, i = this, n = 2e3, o = 50, a = {
                type: "text",
                icon: f,
                title: ""
            };
            d && u && m.length ? (m.length >= o ? a.text = i._groupNotifications(n) : (t = m.shift(),
            a = r.extend({}, a, t),
            a.timeout = t.timeout === !1 ? !1 : !0,
            a.icon = t.userAvatar || f),
            e = i._createNotification(a),
            e && r.isFunction(e.show) && e.show()) : console.error("not allowed", d, u);
        },
        _groupNotifications: function(e) {
            for (var t, i = ""; m.length && i.length <= e; )
                t = m.shift(),
                i += t.text + ", ";
            return i;
        },
        _showNextNotification: function() {
            var e = this;
            m.length > 0 && e._displayQueuedNotifications(),
            o = e.delay("_showNextNotification", l);
        },
        create: function(e) {
            var t, i = this;
            return d || i._checkSupport() ? void (u || i._permissionGranted() ? (t = e,
            t && i._queueNotification(t)) : (p.push(e),
            i.requestPermission())) : !1;
        },
        requestPermission: function() {
            var t = this
              , i = ["preferences", "social"]
              , n = !1
              , o = e.currentRoute();
            if (r.each(i, function(e) {
                o.indexOf(e) >= 0 && (n = !0);
            }),
            !n && (d || t._checkSupport())) {
                if ("false" === e.settings.attributes.notifications_desktop_enabled || t._permissionGranted())
                    return;
                e.trigger("modal:confirm", {
                    customTitle: e.language.getLabel("notifications_desktop_enable_heading").toString(),
                    customText: e.language.getLabel("enable_desktop_notifications_text").toString(),
                    confirm: function() {
                        t._getPermission(function() {
                            t._emptyCreateQueue(),
                            t._displayQueuedNotifications();
                        });
                    },
                    cancel: function() {
                        e.settings.save({
                            notifications_desktop_enabled: "false"
                        });
                    },
                    keepTrying: !0
                });
            }
        },
        _emptyCreateQueue: function() {
            var e = this;
            p.length > 0 && (r.each(p, function(t) {
                e.create(t);
            }),
            p = []);
        }
    });
}),
define("collections/Managers/BaseNotificationsManager", ["application/runtime", "actions/Factory", "helpers/pinnedSite", "helpers/URLResolver", "helpers/BlobHelper", "helpers/notifications", "./BaseManager", "collections/NotificationCollection", "collections/TaskCollection", "collections/FileCollection", "project!core"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = d.WBDeferred
      , m = d.lib.when
      , p = e._
      , g = e.config
      , f = p.once(i.createJumpListCategory)
      , b = r.prototype;
    return r.extend({
        CollectionClass: s,
        collections: {
            all: "/desktopNotifications/all",
            unread: "/desktopNotifications/unread"
        },
        observes: {
            "collections.all": {
                "change:read": "notificationReadCheck",
                add: ["persistModel", "notificationReadCheck", "passToIEPinnedSite"]
            },
            "runtime.settings": {
                "change:notifications_desktop_enabled": "onDesktopNotificationsSettingChange"
            }
        },
        tasks: new l("/tasks/all"),
        initialize: function() {
            var e = this;
            e.reminderLookup = t.reminderLookup(),
            e.taskLookup = t.taskLookup(),
            e.openUrl = t.openUrl(),
            b.initialize.apply(e, arguments);
        },
        passToIEPinnedSite: function(t) {
            if (e.env.isIE()) {
                var o = n.resolve("images/favicon.ico")
                  , a = t.attributes.summary
                  , r = e.language.getText("label_activity_center");
                e.ready.done(function() {
                    f(r),
                    p.defer(function() {
                        i.addJumpListItem(a, "/#/activitycenter", o);
                    }),
                    i.flashWindow();
                });
            }
        },
        getAvatar: function(e) {
            var t = new u()
              , i = e.attributes
              , n = i.sender_id;
            if (n) {
                var a = g.api.host + "/v1/avatar?user_id=" + n + "&fallback=false";
                o.fetchDataURI(a).always(function(e) {
                    t.resolve(e);
                });
            } else
                t.resolve();
            return t.promise();
        },
        getFile: function(e, t) {
            var i = this
              , n = new u()
              , a = e.attributes
              , r = i.extractFileID(a.url);
            if (r && t) {
                var s = new c("/tasks/" + t.id + "/files")
                  , l = s.get(r);
                l ? l.getPreviewUrl().done(function(e) {
                    e ? o.fetchDataURI(e).always(function(e) {
                        n.resolve(e, l);
                    }) : n.resolve();
                }) : n.resolve();
            } else
                n.resolve();
            return n.promise();
        },
        createNotification: function(t, i, n, o) {
            var r = this
              , s = t.attributes
              , l = function() {
                t.save({
                    read: !0
                }),
                this.cancel && this.cancel();
            }
              , c = function() {
                var t = s.url && s.url.replace(/^wunderlist:\/\//, "");
                t && e.trigger("route:" + t),
                l.call(this);
            }
              , d = {
                notificationId: t.id,
                type: "text",
                title: "Wunderlist",
                text: t.attributes.message,
                timeout: !1,
                onClick: c,
                onClose: l,
                userAvatar: i
            };
            n && (d.templateType = "image",
            d.imageUrl = n),
            o && (d.buttons = [{
                title: "Download " + o.attributes.file_name
            }],
            d.buttonHandlers = [{
                onClick: function() {
                    r.openUrl.openUrl(o.attributes.url);
                }
            }]),
            a.create(d),
            t.save({
                notified: !0
            });
        },
        isReminderLocallyNotified: function(e) {
            var t, i = this, n = i.taskLookup.getTaskModel(e);
            if (n) {
                var o = i.reminderLookup.getReminderModelForTask(n.id);
                t = o && o.attributes.reminded;
            }
            return !!t;
        },
        notificationReadCheck: function(t) {
            var i, n = this, o = t.attributes, a = e.settings.attributes, r = n.extractTaskID(o.url);
            "ReminderDue" === o.event && (i = n.isReminderLocallyNotified(r));
            var s = !!o.read
              , l = !!o.notified
              , c = "true" === a.notifications_desktop_enabled;
            if (n.collections.unread[s ? "remove" : "add"](t),
            !i && !s && !l && c) {
                var d = r && n.tasks.get(r)
                  , u = n.getAvatar(t)
                  , p = n.getFile(t, d);
                m(u, p).done(function(e, i) {
                    var o = e[0]
                      , a = i[0]
                      , r = i[1];
                    n.createNotification(t, o, a, r);
                });
            }
        },
        extractTaskID: function(e) {
            var t, i = /wunderlist:\/\/tasks\/(\d+).?/, n = e && e.match(i);
            return n && n.length && (t = n[1]),
            t;
        },
        extractFileID: function(e) {
            var t, i = /\/files\/(\d+).?/, n = e && e.match(i);
            return n && n.length && (t = n[1]),
            t;
        },
        onDesktopNotificationsSettingChange: function(t) {
            var i = this
              , n = t.attributes.notifications_desktop_enabled;
            n !== !0 || a._permissionGranted || (e.trigger("popover:close"),
            e.trigger("settings:close"),
            i.delay(a.requestPermission, 300));
        }
    });
}),
define("collections/Managers/DesktopNotificationsManager", ["application/runtime", "helpers/pinnedSite", "helpers/URLResolver", "helpers/BlobHelper", "helpers/notifications", "wunderbits/helpers/date", "collections/NotificationCollection", "collections/TaskCollection", "collections/FileCollection", "collections/Managers/BaseNotificationsManager"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = e._;
    return c.extend({
        observes: {
            runtime: {
                "browser:marketplace:add": ["checkToCreateBrowserNotification", "checkToCreateChromeInstallNotification"]
            }
        },
        debounceUpdateCommentNotification: d,
        setupBinds: function() {
            var e = this;
            e.debounceUpdateCommentNotification = u.debounce(e.updateCommentNotification, 250);
        },
        checkToCreateBrowserNotification: function() {
            var t = this
              , i = parseInt(e.settings.attributes.app_open_count, 10);
            2 === i && t.createAddToBrowserNotification();
        },
        checkToCreateChromeInstallNotification: function() {
            var t = this
              , i = parseInt(e.settings.attributes.app_open_count, 10);
            4 === i && t.createChromeInstallQuickAddNotification();
        },
        updateCommentNotification: function(e) {
            var t = this
              , i = t.collections.all
              , n = i.get(e.id);
            n && (i.remove(n),
            n.destroy()),
            i.add(e, t.fromSyncOptions);
        },
        createAddToBrowserNotification: function() {
            var t = this
              , i = e.env.getBrowser()
              , n = {};
            if (e.env.isChrome()) {
                var o = t.collections.all;
                e.settings.attributes.add_to_chrome || o.get(i) || (n.id = i,
                n.message = e.language.getText("notification_add_to_browser"),
                n.summary = n.message,
                n.position = 0,
                n.trigger = "browser:add",
                n.read = !1,
                o.add(n, t.fromSyncOptions),
                e.settings.save({
                    add_to_chrome: "true"
                }));
            }
        },
        createChromeInstallQuickAddNotification: function() {
            var t = this
              , i = e.env.getBrowser()
              , n = {};
            if ("chrome" === i) {
                var o = i + "_extension"
                  , a = t.collections.all;
                e.settings.attributes.add_extension_to_chrome || a.get(o) || (n.message = e.language.getText("notification_add_extension_to_browser"),
                n.summary = n.message,
                n.id = o,
                n.position = 0,
                n.trigger = "browser:add",
                n.read = !1,
                a.add(n, t.fromSyncOptions),
                e.settings.save({
                    add_extension_to_chrome: "true"
                }));
            }
        }
    });
}),
define("collections/Managers/FilesCollectionManager", ["./BaseManager", "wunderbits/collections/WBCollection", "collections/FileCollection", "collections/TaskCollection"], function(e, t, i, n, o) {
    var a = t.collections;
    return e.extend({
        CollectionClass: i,
        collections: {
            all: "/files/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "onFilesAdd", "updateTaskHasFilesFromFile"],
                remove: ["detachModel", "updateTaskHasFilesFromFile"]
            },
            tasks: {
                add: ["updateTaskHasFilesFromTask"]
            }
        },
        tasks: new n("/tasks/all"),
        onFilesAdd: function(e, t, n) {
            n || (n = {});
            var o = e.attributes.task_id
              , a = new i("/tasks/" + o + "/files");
            a.add(e, n);
        },
        detachModel: function(e, t, n) {
            var o = e.attributes.task_id
              , a = new i("/tasks/" + o + "/files");
            a.remove(e, n);
        },
        updateTaskHasFilesFromFile: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var a = e.attributes.task_id
                  , r = n.tasks.get(a);
                r && n.updateTaskHasFilesFromTask(r, o, i);
            }
        },
        updateTaskHasFilesFromTask: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = n.taskHasFiles(e.id);
                e.attributes.hasFiles !== o && e.save({
                    hasFiles: o
                }, i);
            }
        },
        taskHasFiles: function(e) {
            var t = a["/tasks/" + e + "/files"]
              , i = t && t.length;
            return !!i;
        }
    });
}),
define("collections/Managers/TaskCommentsCollectionManager", ["application/runtime", "./BaseManager", "wunderbits/collections/WBCollection", "collections/TaskCommentsCollection", "collections/TaskCollection", "collections/ListCollection"], function(e, t, i, n, o, a, r) {
    var s = i.collections;
    return t.extend({
        CollectionClass: n,
        collections: {
            all: "/taskComments/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "onCommentAdd", "updateTaskHasCommentsFromComment", "updateListHasCommentsFromComment", "updateCanDeleteComment"],
                "change:read": ["updateTasAndListkHasCommentsOnChange"],
                remove: ["updateTaskHasCommentsFromComment", "updateListHasCommentsFromComment"]
            },
            tasks: {
                remove: "updateListHasCommentsFromTask",
                "change:list_id": "updateListHasCommentsFromTask",
                "change:hasUnreadComments": "updateListHasCommentsFromTask",
                "change:completed": "updateListHasCommentsFromTask"
            },
            lists: {
                add: "updateListHasCommentsFromList",
                "change:muted": "updateListHasCommentsFromList",
                "change:role": "updateCanDeleteCommentsFromList",
                "change:owner_id": "updateCanDeleteCommentsFromList"
            }
        },
        tasks: new o("/tasks/all"),
        lists: new a("/lists/all"),
        onCommentAdd: function(e, t, i) {
            var o = this;
            i || (i = {});
            var a = e.get("task_id");
            a = o.tasks.getIdByAltId(a) || a;
            var r = new n("/tasks/" + a + "/comments");
            r.add(e, i);
        },
        updateTasAndListkHasCommentsOnChange: function(e, t, i) {
            var n = this;
            n.updateTaskHasCommentsFromComment(e, r, i),
            n.updateListHasCommentsFromComment(e, r, i);
        },
        updateTaskHasComments: function(e, t) {
            var i = this;
            t = i.getLocalSaveOptions(t);
            var o = new n("/tasks/" + e + "/comments")
              , a = i.tasks.get(e);
            if (a) {
                var r = a.attributes
                  , s = r.hasComments ? r.hasComments : !!o.length;
                a.attributes.hasComments !== s && a.save({
                    hasComments: s
                }, t);
            }
        },
        updateCanDeleteComment: function(t, i, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                var a = t.attributes
                  , r = a.author
                  , s = e.user.isIDEqual(r.id)
                  , l = o.tasks.get(a.task_id)
                  , c = l && o.lists.get(l.attributes.list_id)
                  , d = c && c.isOwner() || s;
                t.save({
                    canDelete: d
                });
            }
        },
        updateCanDeleteCommentsFromList: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = s["/lists/" + e.id + "/tasks"];
                o && o.each(function(e) {
                    var t = s["/tasks/" + e.id + "/comments"];
                    t && t.each(function(e) {
                        n.updateCanDeleteComment(e, t, {});
                    });
                });
            }
        },
        updateTaskHasCommentsFromComment: function(e, t, i) {
            var n = this
              , o = e.attributes.task_id;
            n.updateTaskHasComments(o, i);
        },
        updateListHasComments: function(e, t) {
            var i = this;
            t = i.getLocalSaveOptions(t);
            var n = i.lists.get(e);
            if (n) {
                var a = new o("/lists/" + n.id + "/tasks")
                  , r = a.findWhere({
                    hasUnreadComments: !0,
                    completed: !1
                })
                  , s = !n.isMuted() && !!r;
                n.attributes.hasUnreadComments !== s && n.save({
                    hasUnreadComments: s
                }, t);
            }
        },
        updateListHasCommentsFromComment: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = e.attributes.task_id
                  , a = n.tasks.get(o)
                  , r = a && a.attributes.list_id;
                r && n.updateListHasComments(r, i);
            }
        },
        updateListHasCommentsFromList: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = e.id;
                n.updateListHasComments(o, i);
            }
        },
        updateListHasCommentsFromTask: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = e.previous("list_id")
                  , a = e.attributes.list_id;
                n.defer(function() {
                    n.updateListHasComments(a, i),
                    o && o !== a && n.updateListHasComments(o, i);
                });
            }
        }
    });
}),
define("collections/Managers/TaskCommentsStatesCollectionManager", ["./BaseManager", "wunderbits/collections/WBCollection", "collections/TaskCommentsStateCollection", "collections/TaskCollection"], function(e, t, i, n, o) {
    var a = t.collections;
    return e.extend({
        CollectionClass: i,
        collections: {
            all: "/taskCommentsStates/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "addToScopedCollection", "updateTasksHaveCommentsFromState"],
                "change:unread_count": "updateTasksHaveCommentsFromStateChange",
                remove: ["updateTasksHaveCommentsFromStateRemoval"]
            },
            tasks: {
                add: "updateTaskHasCommentsFromTask"
            }
        },
        tasks: new n("/tasks/all"),
        addToScopedCollection: function(e, t, n) {
            var o = this;
            n = o.getLocalSaveOptions(n);
            var a = e.attributes.task_id
              , r = new i("/tasks/" + a + "/taskCommentsStates");
            r.add(e);
        },
        updateTaskUnreadCount: function(e, t, i) {
            var n = this;
            i = n.getLocalSaveOptions(i);
            var o = n.tasks.get(e);
            o && o.save({
                unreadCount: t || 0
            }, i);
        },
        updateTaskHasStateReadComments: function(e, t) {
            var i = this;
            t = i.getLocalSaveOptions(t);
            var n = i.tasks.get(e);
            n && n.save({
                hasComments: !0,
                hasUnreadComments: !1
            }, t);
        },
        updateTaskHasStateUnreadComments: function(e, t) {
            var i = this;
            t = i.getLocalSaveOptions(t);
            var n = i.tasks.get(e);
            n && n.save({
                hasComments: !0,
                hasUnreadComments: !0
            }, t);
        },
        updateTasksHaveCommentsFromState: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                var o = e.attributes
                  , a = o.task_id;
                o.unread_count > 0 ? n.updateTaskHasStateUnreadComments(a, i) : n.updateTaskHasStateReadComments(a, i),
                n.updateTaskUnreadCount(a, o.unread_count, i);
            }
        },
        updateTasksHaveCommentsFromStateRemoval: function(e, t, i) {
            var n = this;
            i = n.getLocalSaveOptions(i);
            var o = n.tasks.get(e.attributes.task_id);
            o && o.save({
                hasComments: !1,
                hasUnreadComments: !1,
                unreadCount: 0
            }, i);
        },
        updateTasksHaveCommentsFromStateChange: function(e, t) {
            this.updateTasksHaveCommentsFromState(e, o, t);
        },
        updateTaskHasCommentsFromTask: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = n.getStateFromTask(e.id);
                if (o) {
                    var a = o.attributes
                      , r = e.attributes
                      , s = {
                        hasComments: !0,
                        hasUnreadComments: a.unread_count > 0,
                        unreadCount: a.unread_count || 0
                    }
                      , l = {};
                    Object.keys(s).forEach(function(e) {
                        r[e] !== s[e] && (l[e] = s[e]);
                    }),
                    Object.keys(l).length && e.save(l, i);
                }
            }
        },
        getStateFromTask: function(e) {
            var t = a["/tasks/" + e + "/taskCommentsStates"];
            return t && t.models[0];
        }
    });
}),
define("collections/Managers/ProductsCollectionManager", ["./BaseManager", "collections/ProductsCollection"], function(e, t) {
    return e.extend({
        CollectionClass: t,
        collections: {
            all: "/products/all"
        }
    });
}),
define("collections/Managers/NotesCollectionManager", ["./BaseManager", "wunderbits/collections/WBCollection", "collections/NoteCollection", "collections/TaskCollection"], function(e, t, i, n) {
    var o = t.collections;
    return e.extend({
        CollectionClass: i,
        collections: {
            all: "/notes/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "noteTaskIdCheck", "updateTaskHasNote"],
                "change remove": "updateTaskHasNote"
            },
            tasks: {
                add: "updateTaskHasNoteFromTask"
            }
        },
        tasks: new n("/tasks/all"),
        updateTaskHasNote: function(e, t, n) {
            var o = this;
            if (o.hasUpdateOptions(n)) {
                n = o.getLocalSaveOptions(n);
                var a = e.attributes.task_id
                  , r = new i("/tasks/" + a + "/notes")
                  , s = o.tasks.get(a);
                if (s) {
                    var l = r.at(0)
                      , c = l && l.attributes
                      , d = c && c.content && c.content.length
                      , u = !!d;
                    s.attributes.hasNote !== u && s.save({
                        hasNote: u
                    }, n);
                }
            }
        },
        noteTaskIdCheck: function(e) {
            var t = e.attributes.task_id
              , n = new i("/tasks/" + t + "/notes");
            n.add(e);
        },
        updateTaskHasNoteFromTask: function(e, t, i) {
            var n = this;
            if (n.hasUpdateOptions(i)) {
                i = n.getLocalSaveOptions(i);
                var o = n.taskHasNote(e.id);
                e.attributes.hasNote !== o && e.save({
                    hasNote: o
                }, i);
            }
        },
        taskHasNote: function(e) {
            var t = o["/tasks/" + e + "/notes"]
              , i = t && t.models[0]
              , n = i && i.attributes
              , a = n && n.content && n.content.length;
            return !!a;
        }
    });
}),
define("collections/Managers/SettingsCollectionManager", ["application/runtime", "./BaseManager", "collections/SettingCollection", "backend/Sync/DataProcessors/CrossClientSettings", "project!core"], function(e, t, i, n, o, a) {
    var r = o.WBDeferred
      , s = t.prototype;
    return t.extend({
        CollectionClass: i,
        collections: {
            all: "/settings/all"
        },
        observes: {
            "collections.all": {
                add: "persistModel",
                "add change remove": "onSetting"
            },
            "runtime.settings": {
                change: "onLocalSettingChange",
                "change:language": "onLanguageChange"
            }
        },
        settingsReady: a,
        initialize: function() {
            var t = this;
            s.initialize.apply(t, arguments);
            var i = t.settingsReady = new r();
            t.bindOnceTo(e, "db:allDataLoaded", i.resolve, i);
        },
        onSetting: function(e, t, i) {
            var n = this;
            i = n.getLocalSaveOptions(i);
            var o = n.runtime.settings
              , r = e.attributes
              , s = i.remove ? "unset" : "set";
            o[s](r.key, r.value, i),
            o.save(a, i);
        },
        onLocalSettingChange: function(e, t) {
            if (!t.fromStorage && !t.fromSync) {
                var i = this
                  , n = i.collections.all
                  , o = e.changedAttributes();
                o && i.settingsReady.done(function() {
                    Object.keys(o).forEach(function(e) {
                        i.saveSetting(e, o[e], n);
                    });
                });
            }
        },
        saveSetting: function(t, i, o) {
            e.settings.ready.done(function() {
                var e = o.getFromIndex(t);
                if (e)
                    e.save({
                        value: i
                    });
                else {
                    var a = {
                        key: t,
                        value: i
                    };
                    n[t] || (a.web = !0),
                    o.add(a);
                }
            });
        },
        onLanguageChange: function(e, t) {
            var i = this;
            i.defer(function() {
                e.save("account_locale", t);
            });
        }
    });
}),
define("collections/Managers/UsersCollectionManager", ["application/runtime", "./BaseManager", "collections/UserCollection", "collections/MembershipCollection", "project!core"], function(e, t, i, n, o) {
    var a = o.lib.clone;
    return t.extend({
        CollectionClass: i,
        collections: {
            all: "/users/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "addUserToAssignableCollection"],
                remove: "removeUserFromAssignableCollection",
                change: "updateOwnUser"
            }
        },
        updateOwnUser: function(t, i) {
            var n = this;
            if (i.fromSync && e.user.isIDEqual(t.id)) {
                var o = a(t.changed);
                delete o.revision,
                delete o.matryoshkaRevision,
                e.user.save(o, n.fromSyncOptions);
            }
        },
        addUserToAssignableCollection: function(e) {
            var t = !0;
            this.addOrRemoveUserAssignable(e, t);
        },
        removeUserFromAssignableCollection: function(e) {
            var t = !1;
            this.addOrRemoveUserAssignable(e, t);
        },
        addOrRemoveUserAssignable: function(e, t) {
            var o = this
              , a = new n("/users/" + e.id + "/memberships");
            a.each(function(n) {
                var a = n.attributes.list_id
                  , r = new i("/lists/" + a + "/assignables");
                o.addOrRemoveFromCollection(t, r, e);
            });
        }
    });
}),
define("collections/Managers/TasksCountsCollectionManager", ["./BaseManager", "collections/TasksCountCollection", "collections/ListCollection"], function(e, t, i) {
    return e.extend({
        CollectionClass: t,
        collections: {
            all: "/tasksCounts/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "updateListCompletedCount"],
                "change:completed_count change:uncompleted_count": "updateListCompletedCount"
            }
        },
        lists: new i("/lists/all"),
        updateListCompletedCount: function(e, t, i) {
            var n = this;
            i = n.getLocalSaveOptions(i);
            var o = e.attributes
              , a = o.list_id
              , r = n.lists.get(a);
            r && r.save({
                completedTasksCount: o.completed_count
            }, i);
        }
    });
}),
define("collections/Managers/UnreadActivitiesCountCollectionManager", ["application/runtime", "./BaseManager", "collections/UnreadActivitiesCountCollection"], function(e, t, i) {
    var n = e._
      , o = t.prototype;
    return t.extend({
        CollectionClass: i,
        collections: {
            all: "/unreadActivitiesCounts/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "checkForNewNotifications"],
                "change:activities change:conversations": ["checkForNewNotifications"]
            }
        },
        previousCounts: {
            activities: 0,
            conversations: 0
        },
        initialize: function() {
            var e = this;
            e.triggerSound = n.debounce(e.triggerSound, 500),
            o.initialize.apply(e, arguments);
        },
        checkForNewNotifications: function(e) {
            var t = this
              , i = e.attributes
              , n = t.previousCounts
              , o = i.activities
              , a = i.conversations
              , r = o && o > n.activities
              , s = a && a > n.conversations;
            (r || s) && t.triggerSound(),
            n.activities = o || 0,
            n.conversations = a || 0;
        },
        triggerSound: function() {
            "true" === e.settings.attributes.sound_notification_enabled && e.trigger("sounds:play", "bell");
        }
    });
}),
define("collections/Managers/ActivitiesCollectionManager", ["./BaseManager", "collections/ActivitiesCollection"], function(e, t) {
    return e.extend({
        CollectionClass: t,
        collections: {
            all: "/activities/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel"]
            }
        }
    });
}),
define("collections/Managers/ConversationsCollectionManager", ["./BaseManager", "collections/ConversationsCollection"], function(e, t) {
    return e.extend({
        CollectionClass: t,
        collections: {
            all: "/conversations/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel"]
            }
        }
    });
}),
define("collections/Managers/SubscriptionCollectionManager", ["application/runtime", "./BaseManager", "collections/SubscriptionCollection"], function(e, t, i, n) {
    return t.extend({
        CollectionClass: i,
        collections: {
            all: "/subscriptions/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel", "updateSubCollections", "updateUserFlags"],
                remove: ["cleanupFromCollections", "updateUserFlags"]
            }
        },
        activeSubscriptions: new i("/subscriptions/active"),
        individualSubscriptions: new i("/subscriptions/individual"),
        teamSubscriptions: new i("/subscriptions/team"),
        expiredSubscriptions: new i("/subscriptions/expired"),
        updateSubCollections: function(e) {
            var t = this
              , i = e.attributes
              , n = !!i.expired_at;
            if (n)
                t.expiredSubscriptions.add(e),
                t.removeFromActiveSubCollections(e);
            else {
                t.activeSubscriptions.add(e);
                var o = i.team ? t.teamSubscriptions : t.individualSubscriptions;
                o.add(e);
            }
        },
        removeFromActiveSubCollections: function(e) {
            var t = this;
            t.activeSubscriptions.remove(e),
            t.teamSubscriptions.remove(e),
            t.individualSubscriptions.remove(e);
        },
        cleanupFromCollections: function(e) {
            var t = this;
            ["active", "expired", "individual", "team"].forEach(function(i) {
                t[i + "Subscriptions"].remove(e);
            });
        },
        updateUserFlags: function(t, i, o) {
            var a = this
              , r = a.getLocalSaveOptions(o)
              , s = !!a.individualSubscriptions.length
              , l = !!a.teamSubscriptions.length
              , c = s && a.individualSubscriptions.at(0)
              , d = l && a.teamSubscriptions.at(0)
              , u = s || l
              , m = {
                pro: u,
                individualSubscription: s ? c.id : n,
                teamSubscription: l ? d.id : n,
                isAdmin: l && e.user.isIDEqual(d.attributes.admin.id),
                productID: u && (c ? c.attributes.product_id : d.attributes.product_id)
            };
            e.user.save(m, r);
        }
    });
}),
define("collections/Managers/FeaturesCollectionManager", ["application/runtime", "./BaseManager", "collections/FeatureCollection"], function(e, t, i) {
    return t.extend({
        CollectionClass: i,
        collections: {
            all: "/features/all"
        },
        observes: {
            "collections.all": {
                add: ["persistModel"]
            }
        }
    });
}),
define("collections/CollectionManager", ["application/runtime", "wunderbits/helpers/strings", "wunderbits/BaseEventEmitter", "backend/database", "collections/Managers/SearchManager", "collections/Managers/TagsManager", "collections/Managers/TasksCollectionManager", "collections/Managers/SubtasksCollectionManager", "collections/Managers/TaskPositionsCollectionManager", "collections/Managers/SubtaskPositionsCollectionManager", "collections/Managers/ListsCollectionManager", "collections/Managers/FoldersCollectionManager", "collections/Managers/ListPositionsCollectionManager", "collections/Managers/MembershipsCollectionManager", "collections/Managers/RemindersCollectionManager", "collections/Managers/ServicesCollectionManager", "collections/Managers/DesktopNotificationsManager", "collections/Managers/FilesCollectionManager", "collections/Managers/TaskCommentsCollectionManager", "collections/Managers/TaskCommentsStatesCollectionManager", "collections/Managers/ProductsCollectionManager", "collections/Managers/NotesCollectionManager", "collections/Managers/SettingsCollectionManager", "collections/Managers/UsersCollectionManager", "collections/Managers/TasksCountsCollectionManager", "collections/Managers/UnreadActivitiesCountCollectionManager", "collections/Managers/ActivitiesCollectionManager", "collections/Managers/ConversationsCollectionManager", "collections/Managers/SubscriptionCollectionManager", "collections/Managers/FeaturesCollectionManager", "vendor/setImmediate", "project!core"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S, L, D, j, M, z) {
    var I = e._
      , A = z.WBDeferred
      , P = z.lib.when
      , B = i.prototype
      , F = Function.prototype
      , E = {
        features: j,
        settings: x,
        memberships: p,
        folders: u,
        listPositions: m,
        lists: d,
        users: y,
        taskPositions: l,
        tasks: r,
        subtaskPositions: c,
        subtasks: s,
        reminders: g,
        services: f,
        desktopNotifications: b,
        files: h,
        taskComments: v,
        taskCommentsStates: _,
        notes: k,
        tasksCounts: C,
        products: w,
        subscriptions: D,
        unreadActivitiesCounts: T,
        activities: S,
        conversations: L
    }
      , O = ["files", "notes", "reminders", "subtaskPositions", "subtasks", "taskComments", "taskCommentsStates"];
    return i.extend({
        properties: {
            collections: {}
        },
        initialize: function() {
            var i = this;
            B.initialize.apply(i, arguments),
            i.setupManagers(),
            i.loadAllFromDB(),
            i.initialDataLoaded = new A(),
            i.allDataLoaded = new A(),
            i.tasksLoaded = new A(),
            i.membershipsLoaded = new A(),
            i.bindOnceTo(e, "db:allTasksLoaded", i.tasksLoaded.resolve, i.tasksLoaded),
            i.bindOnceTo(e, "db:allMembershipsLoaded", i.membershipsLoaded.resolve, i.membershipsLoaded);
            var n = [i.tasksLoaded, i.membershipsLoaded];
            O.forEach(function(o) {
                var a = i[o + "Loaded"] = new A();
                n.push(a),
                i.bindOnceTo(e, "db:all" + t.capitalizeFirstLetter(o) + "Loaded", a.resolve, a);
            }),
            P(n).done(i.allDataLoaded.resolve, i.allDataLoaded),
            i.bindToRuntime();
        },
        bindToRuntime: function() {
            var t = this;
            t.allDataLoaded.done(function() {
                t.bindTo(e, "storage:updated", function(i, n) {
                    var o = n.split(":")
                      , a = o[0]
                      , r = o[2];
                    if (a !== e.sessionID) {
                        var s = Array.isArray(i) && i[0];
                        s && r && t.onStorageUpdate(s, r);
                    }
                }),
                t.bindTo(e, "storage:destroyed", function(i, n) {
                    var o = n.split(":")
                      , a = o[0]
                      , r = o[2];
                    if (a !== e.sessionID) {
                        var s = Array.isArray(i) && i[0];
                        s && r && t.onStorageDestroy(s, r);
                    }
                });
            });
        },
        onStorageUpdate: function(e, t) {
            var i = this
              , o = i.collections[e];
            o && setTimeout(function() {
                n.crud.read(e, {
                    id: t
                }).then(function(e) {
                    if (e) {
                        if (e.online_id && e.online_id !== e.id) {
                            var i = o._byId[e.online_id];
                            i && i.destroy({
                                fromSync: !0
                            });
                        }
                        var n = o.get(t);
                        n ? (delete e.id,
                        n.save(e, {
                            fromStorage: !0
                        })) : o.add(e, {
                            fromStorage: !0
                        });
                    }
                });
            }, 100);
        },
        onStorageDestroy: function(e, t) {
            var i = this
              , n = i.collections[e];
            if (n) {
                var o = n._byId[t];
                o && o.destroy({
                    fromStorage: !0,
                    fromSync: !0
                });
            }
        },
        getCollectionFromStoreName: function(e) {
            return this.collections[e];
        },
        onDestroy: function() {
            var e, t = this;
            for (var i in E)
                e = t[i + "CollectionManager"],
                e.destroy();
        },
        setupManagers: function() {
            var e, t, i = this, n = i.collections;
            for (var r in E)
                e = E[r],
                t = i[r + "CollectionManager"] = new e(),
                n[r] = t.collections.all,
                t.collections.all.sort = F;
            i.searchManager = new o(),
            i.tagsManager = new a();
        },
        loadAllFromDB: function() {
            var t = this
              , i = t.collections;
            e.trigger("timeline:start", "refresh_db_load"),
            t.collectionsArr = I.toArray(i),
            t.collectionKeys = I.keys(i),
            t.getCollection(0);
        },
        getCollection: function(t) {
            var i = this
              , n = i.collectionsArr[t]
              , o = i.collectionKeys[t];
            i.loadCollectionFromDB(n, o).done(function() {
                ++t,
                t < i.collectionsArr.length ? i.getCollection(t) : (i.initialDataLoaded.resolve(),
                i.allDataLoaded.done(function() {
                    e.isSyncing = !1,
                    e.trigger("sync:database:ended"),
                    e.trigger("timeline:end", "refresh_db_load"),
                    e.publish("db:allDataLoaded");
                }));
            });
        },
        loadCollectionFromDB: function(i, o) {
            var a = this;
            e.trigger("sync:database:started"),
            e.isSyncing = !0;
            var r = new A()
              , s = !1
              , l = i.model
              , c = l.prototype.storeName;
            return "none" !== c && c ? (n.getAll(c, function(n) {
                for (var l, c = 0, d = n.length; d > c; c++)
                    l = n[c],
                    (!l || l.deleted_at || l["delete"]) && (n.splice(c, 1),
                    --c,
                    --d);
                if ("tasks" === o) {
                    var u = a.loadTasksForRoute(n, i, s);
                    n = u[0],
                    s = u[1],
                    a.initialTaskIDs = n.map(function(e) {
                        return e.id;
                    });
                } else if (O.indexOf(o) >= 0) {
                    var m = a.loadTaskResourceForRoute(o, a.initialTaskIDs, n, i, s);
                    n = m[0],
                    s = m[1];
                } else if ("memberships" === o) {
                    var p = a.loadOwnMemberships(n, i, s);
                    n = p[0],
                    s = p[1];
                }
                a.addToCollection(n, i).done(function() {
                    s || e.publish("db:all" + t.capitalizeFirstLetter(o) + "Loaded"),
                    e.publish(o + ":ready", i),
                    "tasks" === o && (e.trigger("timeline:end", "user_login"),
                    e.trigger("timeline:start", "wanted_tasks_loaded")),
                    r.resolve();
                });
            }),
            r.promise()) : (e.publish(o + ":ready", i),
            r.resolve().promise());
        },
        addToCollection: function(e, t) {
            function i() {
                if (e.length) {
                    var r = e.splice(0, n);
                    t.add(r, a),
                    M(i);
                } else
                    o.resolve();
            }
            var n = 250
              , o = new A()
              , a = {
                sort: !1,
                fromStorage: !0,
                merge: !0
            };
            return M(i),
            o.promise();
        },
        loadTasksForRoute: function(t, i, n) {
            var o, a = this;
            if (e.isOnListRoute() && (o = e.getIdFromRoute()),
            e.isOnTaskRoute()) {
                var r = e.getIdFromRoute()
                  , s = I.find(t, function(e) {
                    return e.id === r || e.online_id === r;
                });
                o = s && s.list_id;
            }
            if (o) {
                var l = new RegExp(e.smartLists.join("|"),"i");
                l.test(o) && (o = "inbox");
                for (var c = [], d = [], u = 0, m = t.length; m > u; u++)
                    t[u].list_id === o || t[u].online_list_id === o ? c.push(t[u]) : d.push(t[u]);
                c.length && (n = !0,
                t = c,
                P(e.hasRouted, a.initialDataLoaded).done(function() {
                    a.addToCollection(d, i).done(function() {
                        e.publish("db:allTasksLoaded");
                    });
                }));
            }
            return [t, n];
        },
        loadTaskResourceForRoute: function(i, n, o, a, r) {
            var s = this;
            n = n || [];
            for (var l, c = [], d = [], u = !1, m = 0, p = o.length; p > m; m++)
                l = o[m],
                u = n.indexOf(l.task_id) >= 0,
                u = u || n.indexOf(l.online_task_id) >= 0,
                u ? c.push(o[m]) : d.push(o[m]);
            return c.length && (r = !0,
            o = c,
            P(e.hasRouted, s.initialDataLoaded).done(function() {
                s.addToCollection(d, a).done(function() {
                    e.publish("db:all" + t.capitalizeFirstLetter(i) + "Loaded");
                });
            })),
            [o, r];
        },
        loadOwnMemberships: function(t, i, n) {
            for (var o = this, a = [], r = [], s = "" + e.user.id, l = 0, c = t.length; c > l; l++)
                t[l].user_id === s ? a.push(t[l]) : r.push(t[l]);
            return a.length && (n = !0,
            t = a,
            P(e.hasRouted, o.initialDataLoaded).done(function() {
                o.addToCollection(r, i).done(function() {
                    e.publish("db:allMembershipsLoaded");
                });
            })),
            [t, n];
        }
    });
}),
define("models/RootModel", ["application/runtime", "wunderbits/WBModel", "project!core"], function(e, t, i, n) {
    var o = i.WBDeferred
      , a = t.prototype;
    return t.extend({
        storeName: "root",
        defaults: {
            _key: "root",
            matryoshkaRevision: n
        },
        initialize: function() {
            var e = this;
            return a.initialize.apply(e, arguments),
            e.hasFetched = new o(),
            e.fetch({
                success: e.onFetchSuccess.bind(e),
                error: e.onFetchError.bind(e)
            }),
            e;
        },
        onFetchSuccess: function() {
            var t = this;
            t.hasFetched.resolve(),
            t.trigger("ready", t),
            e.publish("root:ready", t);
        },
        onFetchError: function() {
            var e = this;
            e.hasFetched.resolve();
        },
        isIDEqual: function(e) {
            return e = "" + e,
            "" + this.attributes.id === e;
        }
    });
}),
define("helpers/Auth/OAuthHelper", ["application/runtime", "project!sdk", "project!core"], function(e, t, i) {
    var n = e.global
      , o = n.chrome
      , a = n.location
      , r = e.env.isChromeApp()
      , s = t.services.oauth
      , l = e.config
      , c = e._;
    return i.WBSingleton.extend({
        redirectUrl: r ? "https://" + o.runtime.id + ".chromiumapp.org/" : a.protocol + "//" + a.host + "/" + (e.isLocalDev() ? "" : "webapp"),
        authUrl: function(e, t) {
            var i = this;
            t = t || {},
            t.redirect_uri = t.redirect_uri ? t.redirect_uri : i.redirectUrl,
            e = "?" === c.last(e) ? e : e + "?";
            var n, o, a = [];
            for (n in t)
                o = encodeURIComponent(t[n]),
                a.push(n + "=" + o);
            return e + a.join("&");
        },
        createService: function(t, i) {
            l.accessToken = e.user.attributes.access_token;
            var n = new s({
                config: l
            });
            return n.connect(t, i);
        }
    });
}),
define("helpers/ChromeIdentity", ["application/runtime", "project!core"], function(e, t) {
    var i = e.global
      , n = !1;
    if (e.env.isChromeApp()) {
        var o = i.chrome;
        n = o && o.identity;
    }
    return t.WBSingleton.extend({
        identity: n
    });
}),
define("helpers/Auth/facebook", ["application/runtime", "helpers/Auth/OAuthHelper", "helpers/ChromeIdentity", "project!core"], function(e, t, i, n, o) {
    var a = e.global
      , r = e._
      , s = e.$
      , l = e.config
      , c = n.WBDeferred
      , d = i.identity
      , u = e.env.isPackagedApp();
    return n.WBSingleton.extend({
        providerName: "facebook",
        authBaseUrl: "https://graph.facebook.com/oauth/authorize?",
        authParams: function() {
            return {
                client_id: l.facebook.appID,
                redirect_uri: t.redirectUrl,
                type: "user_agent",
                display: "page"
            };
        },
        authUrl: function() {
            var e = this
              , i = e.authParams();
            return t.authUrl(e.authBaseUrl, i);
        },
        getFacebookOAuthToken: function(i, n) {
            var o, r, s = this, d = a.location, m = new c();
            r = "https://www.facebook.com/dialog/oauth?",
            o = d.protocol + "//" + d.hostname + (e.isLocalDev() ? "" : "/webapp"),
            o = o + "/?u=" + i,
            d.hash.length && (o += d.hash);
            var p = ["client_id=" + l.facebook.appID, "redirect_uri=" + encodeURIComponent(o)];
            p.push("response_type=token"),
            p.push("scope=email");
            var g = r + p.join("&");
            return u ? s.connectWithIdentity().done(function(e) {
                n ? t.createService("facebook", e).done(m.resolve, m).fail(m.reject, m) : m.resolve(e);
            }).fail(m.reject, m) : a.location.href = g,
            m.promise();
        },
        connectWithIdentity: function() {
            var e = this
              , t = new c();
            return d.launchWebAuthFlow({
                url: e.authUrl(),
                interactive: !0
            }, function(i) {
                var n = e.parseTokenString(i);
                i !== o && n.token ? t.resolve(n.token) : t.reject();
            }),
            t.promise();
        },
        getFacebookUserGraph: function(t, i) {
            s.ajax({
                url: "https://graph.facebook.com/v2.2/me",
                type: "GET",
                data: {
                    access_token: t,
                    fields: "id,name,email,picture"
                },
                dataType: u ? "json" : "jsonp",
                xhrFields: {
                    withCredentials: !1
                },
                success: function(n) {
                    e.user.facebookData = n,
                    e.user.facebookData.token = t;
                    var o = n.picture && n.picture.data && n.picture.data.url;
                    n.avatar = o || "https://graph.facebook.com/v2.2/" + n.id + "/picture?width=68&height=68",
                    r.isFunction(i) && i(n);
                },
                error: function() {}
            });
        },
        parseTokenString: function(e) {
            var t = {}
              , i = e.split("&");
            return r.each(i, function(e) {
                if (e.indexOf("/") >= 0) {
                    var i = e.split("/");
                    t.url = r.initial(i).join("/");
                }
                if (e.indexOf("access_token=") >= 0)
                    t.token = e.split("=")[1];
                else {
                    var n = e.match(/^lists((\/\w*)*)/);
                    n && (t.url = n[0]);
                }
            }),
            t.url || (t.url = ""),
            t;
        }
    });
}),
define("models/UserModel", ["project!database", "application/runtime", "vendor/moment", "collections/SubscriptionCollection", "helpers/Cookie", "helpers/Auth/facebook", "wunderbits/WBModel", "wunderbits/WBValidationHelper", "project!sdk", "project!core"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = t._
      , m = t.config
      , p = t.global
      , g = t.console
      , f = c.WBDeferred
      , b = c.lib.when
      , h = c.lib.extend
      , v = t.Backbone
      , _ = r.prototype
      , w = s
      , k = new f()
      , x = new e.WBLocalStorage();
    return r.extend({
        storeName: "user",
        defaults: {
            _key: "wunderlist_user_1",
            language: "en",
            avatar: null,
            token: null,
            pro: !1,
            terms_accepted_at: null,
            group_product: null,
            matryoshkaRevision: 0
        },
        initialize: function() {
            var e = this;
            return _.initialize.apply(e, arguments),
            e.hasFetched = new f(),
            e.subscriptionsReady = new f(),
            e.subscriptionCollection = new n("/subscriptions/active"),
            e.bindOnceTo(t, "subscriptions:ready", e.subscriptionsReady.resolve, e.subscriptionsReady),
            e.bindTo(t, "user:logout", e.logout),
            e.fetch({
                success: e._onFetchSuccess.bind(e),
                error: e._onFetchSuccess.bind(e)
            }),
            e.authorization = k.promise(),
            e.bindTo(t, "day:ended", e.trackStillLoggedIn),
            e.avatarCacheTimestamp = i().unix(),
            e.bindTo(e, "change:avatar", function() {
                e.avatarCacheTimestamp = i().unix();
            }),
            e.bindTo(e, "deleted", function() {
                x.setItem("user:logout", !0);
            }),
            p.addEventListener("storage", function(t) {
                "user:logout" === t.key && e.forceLogout();
            }),
            e;
        },
        sync: function(e, i, n) {
            var o = this;
            if (t.env.isNodeWebkit()) {
                var a = n.success
                  , r = i.attributes;
                "read" === e && "migrated" === r.access_token ? o.decryptToken(r, a, n) : "update" === e && "migrated" !== r.access_token && o.encryptToken(r, a, n);
            }
            v.sync.apply(o, arguments);
        },
        decryptToken: function(e, i, n) {
            var o = this;
            n.success = function(a) {
                "function" == typeof t.getDecryptedToken && ("string" == typeof a.migrated_token ? a.access_token = t.getDecryptedToken(a.migrated_token) : o.migrateAccessToken(e, i, n)),
                i.call(this, a);
            }
            ;
        },
        encryptToken: function(e, i, n) {
            var o = e.access_token;
            "function" == typeof t.getEncryptedToken && (e.migrated_token = t.getEncryptedToken(o),
            e.access_token = "migrated"),
            n.success = function() {
                e.access_token = o,
                i.apply(this, arguments);
            }
            ;
        },
        migrateAccessToken: function(e, t, i) {
            var n = this;
            n.encryptToken(e, t, i),
            n.decryptToken(e, t, i);
        },
        getAuthorization: function() {
            var e = this
              , t = new f();
            return e.hasFetched.done(function() {
                !e.attributes.access_token || e.attributes.deleted_at ? t.reject() : (k.resolve(),
                t.resolve.apply(t, arguments));
            }),
            t.promise();
        },
        _onFetchSuccess: function() {
            var e, i = this;
            i.hasFetched.resolve(),
            k.resolve(),
            t.trigger("analytics:User:previouslyLoggedIn"),
            e = -1 !== t.currentRoute().indexOf("start/") ? "login" : "normalLoad",
            i.trigger("ready", i),
            t.publish("user:ready", i, e);
        },
        validate: function(e) {
            var t = this;
            return e.email && e.email && !w.isValidEmail(e.email) ? t.trigger("error", "login_email_not_valid") : void 0;
        },
        url: function() {
            return "/me";
        },
        registerSuccess: function(e, i) {
            var n = this;
            n.unset("password"),
            delete e.password_confirmation,
            e.new_user = !0,
            n._trackSignupSuccess(),
            n.save(e, {
                success: function() {
                    n.trigger("registered"),
                    n.trigger("ready", n),
                    t.trigger("browser:marketplace:add"),
                    i && u.isFunction(i.success) && i.success();
                }
            });
        },
        _trackSignupSuccess: function() {
            t.trigger("analytics:User:registerSuccess");
        },
        registerFailure: function(e, i) {
            var n = this;
            if (n.clear(),
            e && e.error) {
                if ("api_error_account_already_exists" === e.error.translation_key)
                    return n.trigger("error", "api_error_account_already_exists"),
                    void t.trigger("analytics:User:registerFailure", "api_error_account_already_exists");
                if ("api_error_validation_error_unable_to_signup" === e.error.translation_key)
                    return n.trigger("error", "api_error_validation_error_unable_to_signup"),
                    void t.trigger("analytics:User:registerFailure", "api_error_validation_error_unable_to_signup");
                if (e.error && e.translation_key) {
                    var o = e.translation_key;
                    if (o.indexOf("validation_error") > 0)
                        return n.trigger("error", o),
                        void t.trigger("analytics:User:registerFailure", o);
                }
            }
            n.trigger("error", "api_error_internet_connection_error");
            var a = "[" + i + "] " + (e && e.message || "No error information provided by the API");
            t.trigger("analytics:User:registerFailure", a);
        },
        register: function(e, t) {
            var i = this;
            delete e.FBOauth,
            delete e.FBId,
            t = t || {},
            e.password_confirmation = e.password;
            var n = i.getInviteToken();
            n && (e.invite_token = n,
            i.unsetInviteToken());
            var o = l.services.auth
              , a = new o({
                config: m,
                clientID: m.clientID
            })
              , r = a.signup(e.name, e.email, e.password, e.password_confirmation, p.navigator.language);
            r.done(function() {
                a.login(e.email, e.password).done(function(e) {
                    i.registerSuccess(e, t);
                }).fail(i.registerFailure, i);
            }).fail(i.registerFailure, i);
        },
        setInviterId: function(e) {
            var i = this;
            t.env.isPackagedApp() || (i.inviterId = e,
            x.setItem("inviterId", e));
        },
        unsetInviterId: function() {
            t.env.isPackagedApp() || x.removeItem("inviterId");
        },
        getInviterId: function() {
            var e, i = this;
            return t.env.isPackagedApp() || (e = i.inviterId ? i.inviterId : x.getItem("inviterId")),
            e;
        },
        setInviteToken: function(e) {
            var i = this;
            t.env.isPackagedApp() || (i.inviteToken = e,
            x.setItem("inviteToken", e));
        },
        unsetInviteToken: function() {
            t.env.isPackagedApp() || x.removeItem("inviteToken");
        },
        getInviteToken: function() {
            var e, i = this;
            return t.env.isPackagedApp() || (e = i.inviteToken ? i.inviteToken : x.getItem("inviteToken")),
            e;
        },
        loginSuccess: function(e, i) {
            var n = this;
            n.unset("password"),
            e.deleted_at = null,
            t.trigger("analytics:User:loginSuccess");
            var o = function() {
                i && "function" == typeof i.callback && i.callback(),
                n.trigger("loggedIn"),
                n.loginReady();
            };
            n.save(e, {
                success: function() {
                    o();
                },
                error: function() {
                    g.log("model save error", arguments);
                }
            });
        },
        loginReady: function() {
            var e = this;
            e.trigger("ready", e),
            t.unpublish("user:ready").publish("user:ready", e, "login"),
            t.trigger("browser:marketplace:add");
        },
        loginFailure: function(e) {
            var i = this
              , n = "object" == typeof e ? e : d
              , o = n && n.error;
            o ? "incorrect_credentials" === o.type ? (t.trigger("analytics:User:loginFailure", "not_found"),
            i.trigger("error", "api_error_incorrect_login")) : o.translation_key && i.trigger("error", o.translation_key) : i.trigger("error", "api_error_connection_error"),
            i.clear();
        },
        login: function(e, i) {
            var n = this;
            if (!e.email)
                return n.trigger("error", "login_empty_email");
            if (!e.password || e.password.length < 1)
                return n.trigger("error", "login_empty_password");
            var o = t.config
              , a = l.services.auth
              , r = new a({
                config: o,
                clientID: o.clientID
            });
            r.login(e.email, e.password).done(function(e) {
                n.loginSuccess(e, i);
            }).fail(n.loginFailure.bind(n));
        },
        pseudoLogin: function(e) {
            var i = this;
            t.bindOnceTo(i, "change:token", i.loginReady),
            i.set({
                token: e
            });
        },
        logout: function() {
            var e = this;
            t.publish("user:loggingOut"),
            e.bindOnceTo(t, "sync:ended", function() {
                t.unpublish("user:loggingOut"),
                e.forceLogout();
            }),
            t.trigger("timer:stop"),
            t.pendingChanges() ? (g.debug("triggering a sync ..."),
            t.trigger("sync:start", !1, "logout")) : t.isSyncing ? g.debug("I think I am still syncing ...") : (g.debug("calling forceLogout"),
            e.forceLogout()),
            e.delay(e._checkLogoutStatus, 5e3);
        },
        showSocialButtons: function() {
            return "CN" !== this.attributes.country;
        },
        forceLogout: function(e) {
            "object" == typeof e && (e = "");
            var i = this;
            t.trigger("timer:stop"),
            i.clear(),
            i.save(),
            o.killCookie(),
            x.removeItem("wl_instance_id").always(function() {
                g.debug("localStorage remove completed ..."),
                t.trigger("db:truncate", function() {
                    g.debug("db:truncate completed"),
                    t.trigger("trackers:clear", function() {
                        g.debug("trackers:clear completed"),
                        t.trigger("db:nuke"),
                        t.unpublish("user:ready"),
                        i.trigger("deleted", e);
                    });
                });
            });
        },
        _checkLogoutStatus: function() {
            var e = this;
            e.bindOnceTo(t, "user:loggingOut", function() {
                t.trigger("popover:close"),
                u.delay(function() {
                    e.logOutPopoverOpen || (e.logOutPopoverOpen = !0,
                    t.trigger("modal:confirm", {
                        customTitle: t.language.getLabel("logout_timeout_title").toString(),
                        customText: t.language.getLabel("logout_timeout_text").toString(),
                        confirmText: t.language.getLabel("button_log_out").toString(),
                        cancelText: t.language.getLabel("button_retry").toString(),
                        confirm: function() {
                            e.forceLogout();
                        },
                        cancel: function() {
                            e.logOutPopoverOpen = !1,
                            e.delay(e._checkLogoutStatus, 5e3);
                        }
                    }));
                }, 500);
            });
        },
        getUserService: function() {
            var e = this
              , t = l.services.user
              , i = h(m, {
                accessToken: e.attributes.access_token
            })
              , n = new t({
                config: i
            });
            return n;
        },
        forgotPassword: function(e, t) {
            var i = l.services.forgot_password
              , n = new i({
                config: m
            });
            n.requestReset(e.email).done(function() {
                t.success();
            }).fail(function(e) {
                var i = e && e.error && e.error.translation_key;
                t.error(i ? "login_email_not_valid" : "api_error_connection_error");
            });
        },
        changeName: function(e, t) {
            var i = this
              , n = i.attributes
              , o = n.name;
            t = t || {},
            i.getUserService().update(n.revision, e).done(function(e) {
                i.save({
                    name: e.name
                }, {
                    fromSync: !0
                }),
                t.success && t.success(e);
            }).fail(function(e) {
                i.save({
                    name: o
                }),
                t.error && t.error(e);
            });
        },
        changeEmail: function(e, t, i) {
            i = i || {};
            var n = this
              , o = n.attributes
              , a = o.email;
            n.getUserService().changeEmail(e, t).done(function(e) {
                n.save({
                    email: e.email
                }, {
                    fromSync: !0
                }),
                i.success && i.success(e);
            }).fail(function(e) {
                n.save({
                    email: a
                }),
                i.error && i.error(e);
            });
        },
        deleteUser: function(e, i) {
            var n = this;
            i = i || {},
            t.trigger("analytics:User:deleteAccount"),
            n.getUserService().deleteSelf(e).done(function() {
                n.forceLogout();
            }).fail(function(e) {
                i.error(e);
            });
        },
        getAvatarURL: function(e, t) {
            var i = this;
            return t = t || 128,
            m.api.host + "/v1/avatar?user_id=" + i.id + "&size=" + t + "&timestamp=" + i.avatarCacheTimestamp + (e ? "&fallback=false" : "");
        },
        cancelProAutoRenew: function(e, n) {
            var o = this;
            t.sdk.getServices().done(function(t) {
                var a = o.subscriptionCollection.get(o.attributes.individualSubscription)
                  , r = a.attributes.revision;
                t.http.subscriptions.update(parseInt(a.id, 10), r, {
                    canceled_at: i().sod().valueOf()
                }).done(e).fail(n);
            });
        },
        isPro: function() {
            var e = this;
            return !!e.attributes.pro;
        },
        getAdminName: function() {
            return t.user.attributes.product.admin && t.user.attributes.product.admin.name;
        },
        isProTeamMember: function() {
            var e, t = this, i = t.attributes, n = i.teamSubscription;
            return b(t.subscriptionsReady).done(function() {
                e = t.subscriptionCollection.get(n);
            }),
            !!e && !t.isIDEqual(e.attributes.admin.id);
        },
        isProTeamAdmin: function() {
            return this.attributes.isAdmin;
        },
        trackStillLoggedIn: function() {
            var e = this;
            e.attributes.access_token && t.trigger("analytics:User:previouslyLoggedIn", "newDay");
        },
        isIDEqual: function(e) {
            return e = "" + e,
            "" + this.attributes.id === e;
        }
    });
}),
define("models/data/DefaultSettings", {
    id: "userSettings",
    type: "userSettings",
    language: "en_US",
    date_format: "DD.MM.YYYY",
    start_of_week: "sun",
    enable_natural_date_recognition: "true",
    new_task_location: "top",
    behavior_star_tasks_to_top: "true",
    confirm_delete_entity: "true",
    print_completed_items: "false",
    time_format: "12 hour",
    account_locale: "en",
    migrated_wunderlist_one_user: "true",
    add_to_chrome: "false",
    add_to_firefox: "false",
    app_first_used: "false",
    significant_event_count: "0",
    new_installation: "false",
    last_open_app_date: "0",
    chrome_rating_later: "undefined",
    chrome_app_rating_later: "undefined",
    shortcut_delete: "CTRL + BACKSPACE",
    shortcut_add_new_list: "CTRL + SHIFT + L",
    shortcut_goto_inbox: "CTRL + I",
    shortcut_add_new_task: "CTRL + N",
    shortcut_mark_task_done: "CTRL + D",
    shortcut_mark_task_starred: "CTRL + S",
    shortcut_goto_search: "CTRL + F",
    shortcut_goto_filter_assigned: "CTRL + 1",
    shortcut_goto_filter_starred: "CTRL + 2",
    shortcut_goto_filter_today: "CTRL + 3",
    shortcut_goto_filter_week: "CTRL + 4",
    shortcut_goto_filter_all: "CTRL + 5",
    shortcut_goto_filter_completed: "CTRL + 6",
    shortcut_goto_preferences: "CTRL + P",
    shortcut_show_notifications: "CTRL + SHIFT + A",
    shortcut_select_all_tasks: "CTRL + A",
    shortcut_copy_tasks: "CTRL + C",
    shortcut_paste_tasks: "CTRL + V",
    shortcut_send_via_email: "CTRL + E",
    shortcut_sync: "R",
    smartlist_visibility_starred: "auto",
    smartlist_visibility_all: "hidden",
    smartlist_visibility_today: "auto",
    smartlist_visibility_done: "hidden",
    smartlist_visibility_week: "auto",
    smartlist_visibility_assigned_to_me: "auto",
    today_smart_list_visible_tasks: "all",
    background: "wlbackground06",
    automatic_reminders: "on",
    smart_dates: "on",
    smart_dates_remove_from_todo: "on",
    notifications_email_enabled: "true",
    notifications_push_enabled: "true",
    notifications_desktop_enabled: "true",
    sound_checkoff_enabled: "true",
    sound_notification_enabled: "true",
    newsletter_subscription_enabled: "false",
    show_completed_items: "true",
    show_subtask_progress: "true",
    pro_trial_limit_assigning: "3",
    pro_trial_limit_files: "3",
    pro_trial_limit_comments: "10",
    onboarding_add_todo: "false",
    onboarding_click_share_list: "false",
    onboarding_click_create_list: "false",
    enable_html_context_menus: "true"
}),
define("models/UserSettingsModel", ["application/runtime", "./data/DefaultSettings", "wunderbits/helpers/strings", "wunderbits/helpers/date", "wunderbits/WBModel", "project!core"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = a.WBDeferred
      , c = o.prototype
      , d = i
      , u = (e.global.navigator.language || "en").substr(0, 2).toLowerCase()
      , m = t;
    return m.time_format = n.getDefaultTimeFormat(u),
    m._locale = u,
    o.extend({
        defaults: s.clone(m),
        initialize: function() {
            var t = this;
            return c.initialize.apply(t, arguments),
            t.ready = new l(),
            t.hasFetched = new l(),
            t.bindOnceTo(e, "sync:ended", "_checkDefaultCompatibility"),
            t.bindTo(e, "settings:ready", "_fetchSuccess"),
            t.bindTo(t, "change", "checkShortcutValues"),
            t;
        },
        resetShortcuts: function() {
            var e = this
              , t = {};
            s.each(e.defaults, function(e, i) {
                /^shortcut_/.test(i) && (t[i] = e);
            }),
            e.save(t),
            e.defer("_checkDefaultCompatibility");
        },
        set: function(e, t, i) {
            var n = this;
            if (s.isObject(e))
                s.each(e, function(t, i) {
                    if (s.isObject(t))
                        throw new Error("Cannot set nested object as value");
                    var n = null === t || t === r;
                    e[i] = n ? null : d.convertValueToString(t);
                });
            else {
                var o = null === t || t === r;
                t = o ? null : d.convertValueToString(t);
            }
            return c.set.call(n, e, t, i),
            n;
        },
        _checkDefaultCompatibility: function(e) {
            var t = this
              , i = ["shortcut_add_new_task", "shortcut_goto_preferences"];
            s.each(i, function(i) {
                if (t.defaults[i] === t.get(i)) {
                    var n = t["_getDefault_" + i];
                    if (s.isFunction(n)) {
                        var o = n.call(t)
                          , a = {};
                        a[i] = o,
                        t[e ? "save" : "set"](a);
                    }
                }
            });
        },
        _getDefault_shortcut_add_new_task: function() {
            var t;
            return t = e.env.isWindows() && e.env.isChrome() ? "CTRL + 0" : "CTRL + N";
        },
        _getDefault_shortcut_goto_preferences: function() {
            var t;
            return t = e.env.isWindows() && e.env.isIE() || e.env.isNodeWebkit() ? "CTRL + M" : "CTRL + P";
        },
        _fetchSuccess: function() {
            var t = this;
            t.trigger("change:background"),
            t.hasFetched.resolve(),
            e.user.attributes.loginSuccessful ? t.ready.resolve() : t.bindOnceTo(e.user, "change:loginSuccessful", function() {
                t.ready.resolve();
            });
        },
        isSettingSet: function(e) {
            return "true" === this.get(e);
        },
        isTouchEnabled: function() {
            var t = e.env.getEnvIdentifier();
            return "1" === this.attributes[t];
        },
        isScopedFiltersEnabled: function() {
            var e = "today_smart_list_visible_tasks";
            return "current_user" === this.attributes[e];
        },
        checkShortcutValues: function() {
            var e = this
              , t = e.changedAttributes()
              , i = [];
            s.each(t, function(t, n) {
                0 === n.indexOf("shortcut_") && (i.push(n),
                s.each(e.attributes, function(i, o) {
                    0 === o.indexOf("shortcut_") && n !== o && i === t && e.set(o, "INVALID");
                }));
            });
        },
        isAbleToSync: function() {
            return !0;
        }
    });
}),
define("models/LanguageModel", ["application/runtime", "wunderbits/WBModel", "project!core"], function(e, t, i) {
    var n = t.prototype
      , o = i.WBDeferred;
    return t.extend({
        defaults: {
            id: "wunderlist_language",
            code: "en"
        },
        initialize: function() {
            var e = this;
            return n.initialize.apply(e, arguments),
            e.ready = new o(),
            e;
        },
        url: function() {
            return "/languages";
        }
    });
}),
define("helpers/TrackingService", ["application/runtime", "wunderbits/helpers/date", "wunderbits/helpers/SafeParse", "project!database", "project!sdk", "project!sync", "project!core"], function(e, t, i, n, o, a, r) {
    var s = r.WBDeferred
      , l = r.lib.createUID
      , c = new n.WBLocalStorage()
      , d = e.config
      , u = e._;
    return r.WBSingleton.extend({
        ready: new s(),
        init: function() {
            var t = this;
            t.tryToUploadOutOfAppEvent = u.debounce(t.tryToUploadOutOfAppEvent, 500),
            t.trackEvent = t.trackEvent.bind(t),
            e.ready.done(function() {
                e.on("trackingService", t.trackEvent),
                e.on("page:visible", t.trackAppVisible),
                t.trackAppVisible(),
                c.getItem("wl_uuid").done(function(e) {
                    e ? (t.uuid = e,
                    t.ready.resolve()) : t.createNewUUID();
                }).fail(function() {
                    t.createNewUUID();
                });
            });
        },
        trackAppVisible: function() {
            e.trigger("trackingService", "UI.Show", "App");
        },
        createNewUUID: function() {
            var e = this;
            e.uuid = l(),
            c.setItem("wl_uuid", e.uuid).always(e.ready.resolve, e.ready);
        },
        trackEvent: function(e, i) {
            var n = this
              , o = {
                event: e,
                time: t.ISOString(new Date())
            };
            return i && (o.params = {
                element: i
            }),
            n.addEventToOutOfAppQueue(o);
        },
        getUserEventsService: function() {
            var t = this;
            if (!t.userEventsService) {
                var i = o.services.userEvents
                  , n = a.helpers.headers;
                d.extendHeaders = function(e) {
                    n.extendHeaders(e),
                    e["x-client-device-id"] = t.uuid;
                }
                ;
                var r = e.user && e.user.attributes.access_token;
                r && (d.accessToken = r),
                t.userEventsService = new i({
                    config: d,
                    clientID: d.clientID
                }),
                o.headers.init(d);
            }
            return t.userEventsService;
        },
        createOutOfAppQueue: function() {
            var e = new s()
              , t = [];
            return c.setItem("wl_events_queue", JSON.stringify(t)).always(function() {
                e.resolve(t);
            }),
            e.promise();
        },
        getOutOfAppQueue: function() {
            function e() {
                t.createOutOfAppQueue().done(n.resolve, n);
            }
            var t = this
              , n = new s();
            return c.getItem("wl_events_queue").done(function(t) {
                var o = i.json(t);
                Array.isArray(o) ? n.resolve(o) : e();
            }).fail(e, t),
            n.promise();
        },
        updateOutOfAppQueue: function(e) {
            return c.setItem("wl_events_queue", JSON.stringify(e));
        },
        addEventToOutOfAppQueue: function(e) {
            var t = this;
            e.id = t.uuid + l(),
            t.getOutOfAppQueue().done(function(i) {
                i.push(e),
                t.updateOutOfAppQueue(i).done(t.tryToUploadOutOfAppEvent, t);
            });
        },
        tryToUploadOutOfAppEvent: function() {
            var e = this;
            e.uploadOutOfAppEvent();
        },
        uploadOutOfAppEvent: function() {
            var e = this;
            e.uploadingOutOfAppEvent ? e.shouldTryToUploadOutOfAppEvent = !0 : (e.uploadingOutOfAppEvent = !0,
            e.getOutOfAppQueue().done(function(t) {
                var i = t.shift()
                  , n = "[object Object]" === Object.prototype.toString.call(i);
                if (n) {
                    var o = e.getUserEventsService();
                    o.create(i, i.id).done(function() {
                        e.updateOutOfAppQueue(t);
                    }).always(function() {
                        e.uploadingOutOfAppEvent = !1,
                        (e.shouldTryToUploadOutOfAppEvent || t.length) && u.delay(function() {
                            e.tryToUploadOutOfAppEvent();
                        }, 1e3);
                    });
                } else
                    e.uploadingOutOfAppEvent = !1,
                    t.length && u.delay(function() {
                        e.tryToUploadOutOfAppEvent();
                    }, 1e3);
            }));
        }
    });
}),
define("backend/Sync/Mixins/ScopedCollections", ["project!core", "wunderbits/helpers/strings", "wunderbits/collections/WBCollection"], function(e, t, i) {
    var n = i.collections;
    return e.WBMixin.extend({
        getScopedCollection: function(e, t, i, o) {
            var a = this
              , r = a.getScopedCollectionURL(e, t, i)
              , s = n[r];
            return o && o(s),
            s;
        },
        getScopedCollectionURL: function(e, t, i) {
            var n, o = this, a = ["feature", "service", "setting", "subscription", "user"];
            if (a.indexOf(e) > -1 && (t = i = void 0),
            e && t && i) {
                t = o.mapScopeType(t, e);
                var r = o.normalizeCollectionType(t)
                  , s = "" + i
                  , l = o.collections[r]
                  , c = l && l.get(s)
                  , d = c ? c.id : s;
                n = "/" + o.formatScopedType(t) + "/" + d + "/" + o.formatScopedType(e);
            } else
                e && (n = "/" + o.formatScopedType(e) + "/all");
            return n;
        },
        mapScopeType: function(e, t) {
            var i = {
                reminder: "list",
                task_comments_state: "list"
            };
            return i[t] ? i[t] : e;
        },
        formatScopedType: function(e) {
            var i = this
              , n = e.split("_");
            n.forEach(function(e, i) {
                n[i] = i > 0 ? t.capitalizeFirstLetter(e) : e;
            });
            var o = n.join("");
            return i.normalizeCollectionType(o);
        }
    });
}),
define("backend/Sync/Mixins/UtilityFunctions", ["project!core"], function(e) {
    return e.WBMixin.extend({
        normalizeCollectionType: function(e) {
            return "s" === e[e.length - 1] ? e : e + "s";
        }
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Base", ["project!core", "collections/FileCollection", "collections/ListCollection", "collections/FolderCollection", "collections/Positions/ListPositionsCollection", "collections/MembershipCollection", "collections/TaskCollection", "collections/TaskCommentsCollection", "collections/TaskCommentsStateCollection", "collections/Positions/TaskPositionsCollection", "collections/ReminderCollection", "collections/ServiceCollection", "collections/SettingCollection", "collections/SubtaskCollection", "collections/Positions/SubtaskPositionsCollection", "collections/NoteCollection", "collections/UserCollection"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b) {
    var h = {
        files: new t("/files/all"),
        lists: new i("/lists/all"),
        folders: new n("/folders/all"),
        list_positions: new o("/listPositions/all"),
        memberships: new a("/memberships/all"),
        notes: new f("/notes/all"),
        reminders: new d("/reminders/all"),
        services: new u("/services/all"),
        settings: new m("/settings/all"),
        subtasks: new p("/subtasks/all"),
        subtask_positions: new g("/subtaskPositions/all"),
        tasks: new r("/tasks/all"),
        task_comments: new s("/taskComments/all"),
        task_comments_states: new l("/taskCommentsStates/all"),
        task_positions: new c("/taskPositions/all"),
        users: new b("/users/all")
    };
    return e.WBClass.extend({
        type: void 0,
        remapIDTypes: [],
        collections: {
            assignee: h.users,
            created_by: h.users,
            file: h.files,
            list: h.lists,
            folder: h.folders,
            list_position: h.list_positions,
            membership: h.memberships,
            note: h.notes,
            reminder: h.reminders,
            sender: h.users,
            service: h.services,
            setting: h.settings,
            subtask: h.subtasks,
            subtask_position: h.subtask_positions,
            task: h.tasks,
            task_comment: h.task_comments,
            task_comments_state: h.task_comments_states,
            last_read: h.task_comments,
            task_position: h.task_positions,
            user: h.users
        },
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
            var t = this
              , i = t.collections[t.type]
              , n = i.get(e.id);
            return n && n.attributes.online_id && (e.id = n.attributes.online_id,
            e.id = parseInt(e.id, 10)),
            e;
        },
        remapIDofType: function(e, t) {
            var i = this
              , n = t + "_id"
              , o = i.collections[t]
              , a = o.get(e[n]);
            return a && (e[n] = a.attributes.online_id),
            e[n] = parseInt(e[n], 10),
            ("number" != typeof e[n] || isNaN(e[n])) && (e[n] = null),
            e;
        }
    });
}),
define("backend/Sync/DataProcessors/Outgoing/File", ["./Base"], function(e) {
    var t = e.prototype
      , i = ["type", "id", "content_type", "file_icon", "file_name", "file_size", "file_provider", "local_created_at", "task_id", "upload_id", "url"];
    return e.extend({
        type: "file",
        processData: function(e) {
            var n = this;
            e = t.processData.apply(n, arguments);
            for (var o in e)
                i.indexOf(o) < 0 && delete e[o];
            return e;
        },
        remapIDTypes: ["list", "task", "user"]
    });
}),
define("backend/Sync/DataProcessors/Outgoing/List", ["./Base"], function(e) {
    return e.extend({
        type: "list"
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Folder", ["./Base"], function(e) {
    var t = e.prototype;
    return e.extend({
        type: "folder",
        processData: function(e) {
            var i = this;
            return e = t.processData.call(i, e),
            e.list_ids && (e.list_ids = i._mapListIDsToOnlineID(e.list_ids)),
            delete e.position,
            delete e.expanded,
            e;
        },
        _mapListIDsToOnlineID: function(e) {
            var t = this
              , i = t.collections.list
              , n = e.map(function(e) {
                var t = i.get(e)
                  , n = t && t.attributes.online_id;
                return n && parseInt(n, 10);
            })
              , o = n.filter(function(e) {
                return void 0 !== e;
            });
            return o;
        }
    });
}),
define("backend/Sync/DataProcessors/Outgoing/PositionBase", ["backend/Sync/DataProcessors/Outgoing/Base"], function(e) {
    return e.extend({
        valueType: void 0,
        processData: function(e) {
            var t = this;
            return e = t.remapIDs(e),
            "values"in e && Array.isArray(e.values) && (e = t.remapValuesIDs(e)),
            e;
        },
        remapValuesIDs: function(e) {
            for (var t, i, n, o = this, a = o.collections[o.valueType], r = e.values, s = !1, l = [], c = 0, d = r.length; d > c; c++)
                t = r[c],
                i = a.get(t),
                i && i.attributes.online_id && (n = parseInt(i.attributes.online_id, 10),
                !isNaN(n) && l.push(n));
            if (l.length) {
                var u = o.collections[o.type].get(e.id)
                  , m = u.attributes.remoteValues;
                l.forEach(function(e, t) {
                    e !== m[t] && (s = !0);
                });
            }
            return s ? e.values = l : delete e.values,
            e.localValues && delete e.localValues,
            e.remoteValues && delete e.remoteValues,
            e.syncedIDs && delete e.syncedIDs,
            e;
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
define("backend/Sync/DataProcessors/Outgoing/ListPosition", ["./PositionBase"], function(e) {
    return e.extend({
        type: "list_position",
        valueType: "list"
    });
}),
define("backend/Sync/DataProcessors/Outgoing/ListChildResource", ["./Base"], function(e) {
    return e.extend({
        remapIDTypes: ["list", "created_by", "assignee"]
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Membership", ["./ListChildResource"], function(e) {
    return e.extend({
        type: "membership",
        remapIDTypes: ["list", "user", "sender"]
    });
}),
define("backend/Sync/DataProcessors/Outgoing/TaskChildResource", ["./Base"], function(e) {
    return e.extend({
        remapIDTypes: ["task", "list"]
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Note", ["./TaskChildResource"], function(e) {
    return e.extend({
        type: "note"
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Reminder", ["./TaskChildResource"], function(e) {
    var t = e.prototype;
    return e.extend({
        type: "reminder",
        processData: function() {
            var e = this
              , i = t.processData.apply(e, arguments);
            return delete i.reminded,
            i;
        }
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Setting", ["./Base", "../CrossClientSettings"], function(e, t) {
    return e.extend({
        type: "setting",
        processData: function(e, t) {
            var i = this;
            return e = i.remapID(e),
            e = "add" === t ? i.remapKey(e) : e,
            delete e.web,
            e;
        },
        remapKey: function(e) {
            var i = e.key;
            return t[i] || (e.key = "web_" + i),
            e;
        }
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Subtask", ["./TaskChildResource"], function(e) {
    return e.extend({
        type: "subtask"
    });
}),
define("backend/Sync/DataProcessors/Outgoing/SubtaskPosition", ["./PositionBase"], function(e) {
    return e.extend({
        type: "subtask_position",
        parentType: "task",
        remapIDTypes: ["task"],
        valueType: "subtask"
    });
}),
define("backend/Sync/DataProcessors/Outgoing/Task", ["./ListChildResource"], function(e) {
    return e.extend({
        type: "task"
    });
}),
define("backend/Sync/DataProcessors/Outgoing/TaskComment", ["./TaskChildResource"], function(e) {
    var t = e.prototype;
    return e.extend({
        type: "task_comment",
        processData: function() {
            var e = this
              , i = t.processData.apply(e, arguments);
            return delete i.canDelete,
            i;
        }
    });
}),
define("backend/Sync/DataProcessors/Outgoing/TaskCommentsState", ["./Base"], function(e) {
    var t = e.prototype;
    return e.extend({
        type: "task_comments_state",
        processData: function(e) {
            var i = this;
            return e = t.processData.apply(i, arguments),
            delete e.unread_count,
            e;
        },
        remapIDTypes: ["task", "list", "last_read"]
    });
}),
define("backend/Sync/DataProcessors/Outgoing/TaskPosition", ["./PositionBase"], function(e) {
    return e.extend({
        type: "task_position",
        remapIDTypes: ["list"],
        valueType: "task"
    });
}),
define("backend/Sync/DataProcessors/Outgoing", ["project!core", "./Outgoing/File", "./Outgoing/List", "./Outgoing/Folder", "./Outgoing/ListPosition", "./Outgoing/Membership", "./Outgoing/Note", "./Outgoing/Reminder", "./Outgoing/Setting", "./Outgoing/Subtask", "./Outgoing/SubtaskPosition", "./Outgoing/Task", "./Outgoing/TaskComment", "./Outgoing/TaskCommentsState", "./Outgoing/TaskPosition"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g) {
    return e.WBClass.extend({
        processors: {
            file: new t(),
            list: new i(),
            folder: new n(),
            list_position: new o(),
            membership: new a(),
            note: new r(),
            reminder: new s(),
            setting: new l(),
            subtask: new c(),
            subtask_position: new d(),
            task: new u(),
            task_comment: new m(),
            task_comments_state: new p(),
            task_position: new g()
        },
        processData: function(e, t) {
            var i = this
              , n = i.processors[e.type];
            return n ? e = n.processData(e, t) : console.warn("no outgoing data processor defined for type", e.type),
            e;
        }
    });
}),
define("backend/Sync/Queues/CreateQueueModel", ["application/runtime"], function(e) {
    var t = e.Backbone;
    return t.Model.extend({
        storeName: "storage",
        defaults: {
            id: "createQueue"
        }
    });
}),
define("backend/Sync/Queues/CreateQueue", ["./CreateQueueModel", "project!core"], function(e, t) {
    var i = t.WBDeferred;
    return t.WBClass.extend({
        initialize: function() {
            var t = this;
            t.ready = new i(),
            t.queue = [],
            t.queueModel = window.CreateQueue = new e({
                id: "createQueue"
            }),
            t.queueModel.fetch({
                success: function() {
                    t.queue = t.queueModel.attributes.queue || [],
                    t.ready.resolve();
                },
                error: function() {
                    t.queue = [],
                    t.ready.resolve();
                }
            });
        },
        add: function(e) {
            var t = this;
            t.queue.push(e.toJSON()),
            t.saveQueue();
        },
        getQueue: function() {
            var e = this;
            return e.queue = e.queue || [],
            e.queue;
        },
        removeByID: function(e) {
            for (var t, i = this, n = i.queue, o = n.length; o--; )
                t = n[o],
                t.id === e && n.splice(o, 1);
            this.saveQueue();
        },
        resetQueue: function() {
            var e = this;
            e.queue = [],
            e.saveQueue();
        },
        saveQueue: function() {
            var e = this;
            e.queueModel.save({
                queue: e.queue
            });
        }
    });
}),
define("backend/Sync/Queues/UpdateQueueModel", ["./CreateQueueModel"], function(e) {
    return e.extend({
        defaults: {
            id: "updateQueue"
        }
    });
}),
define("backend/Sync/Queues/UpdateQueue", ["./UpdateQueueModel", "./CreateQueue", "project!core"], function(e, t, i) {
    var n = i.WBDeferred;
    return t.extend({
        initialize: function() {
            var t = this;
            t.ready = new n(),
            t.queue = [],
            t.queueModel = window.UpdateQueue = new e({
                id: "updateQueue"
            }),
            t.queueModel.fetch({
                success: function() {
                    t.queue = t.queueModel.attributes.queue || [],
                    t.ready.resolve();
                },
                error: function() {
                    t.queue = [],
                    t.ready.resolve();
                }
            });
        }
    });
}),
define("backend/Sync/SyncController/LocalToRemoteMixin", ["../Queues/CreateQueue", "../Queues/UpdateQueue", "project!core"], function(e, t, i) {
    var n = i.lib.clone
      , o = i.WBMixin
      , a = ["task_position", "subtask_position"];
    return o.extend({
        add: function(e, t, i) {
            var n = this;
            n.eventHasSyncableOptions(i) && n.whenModelIsAbleToSync(e, "create", function() {
                var t = e.attributes.type;
                if (-1 === a.indexOf(t)) {
                    var o = e.toJSON();
                    o = n.dataProcessors.outgoing.processData(o, "add"),
                    n.sync.trigger("local:create", e.id, o);
                } else
                    n.change(e, i);
            });
        },
        change: function(e, t) {
            var i = this
              , o = e.attributes
              , a = n(e.changedAttributes(), !0);
            a.type = o.type,
            a.id = o.id;
            var r = function() {
                a = i.dataProcessors.outgoing.processData(a, "change"),
                i.sync.trigger("local:update", o.online_id || o.id, o.revision, a);
            }
              , s = i.eventHasSyncableOptions(t);
            s && e.isAbleToSync() ? r() : s && o.online_id && i.whenModelIsAbleToSync(e, "update", function() {
                r();
            });
        },
        destroy: function(e, t, i) {
            var n = this
              , o = n.eventHasSyncableOptions(i)
              , a = e.isAbleToSync();
            if (o && a) {
                var r = e.attributes
                  , s = e.toJSON();
                n.sync.trigger("local:delete", r.online_id || r.id, s.revision, s);
            } else
                n.createQueue.removeByID(e.id),
                n.updateQueue.removeByID(e.id);
        },
        eventHasSyncableOptions: function(e) {
            return e = e || {},
            !(e.fromSync || e.fromStorage);
        },
        whenModelIsAbleToSync: function(e, t, i) {
            var n = this
              , o = n[t + "Queue"];
            e.isAbleToSync() ? (o.removeByID(e.id),
            "function" == typeof i && i()) : e.isNotAllowedToSync() || (o.add(e),
            n.bindOnceTo(e, "change:isAbleToSync", function() {
                o.removeByID(e.id),
                i();
            }));
        },
        loadFromQueue: function(e) {
            for (var t, i, o, a = this, r = a[e + "Queue"], s = n(r.getQueue(), !0), l = s.length; l--; )
                t = s[l],
                r.removeByID(t.id),
                i = a.collections[a.normalizeCollectionType(t.type)],
                o = i.get(t.id),
                o && a.add(o, i, {});
        }
    });
}),
define("backend/Sync/SyncController/RemoteToLocalMixin", ["vendor/lodash", "project!core", "vendor/setImmediate"], function(e, t, i) {
    var n = t.WBMixin
      , o = t.lib.clone
      , a = {
        fromSync: !0,
        merge: !0
    }
      , r = {
        task_positions: "tasks",
        list_positions: "lists",
        subtask_positions: "subtasks"
    }
      , s = 15
      , l = s
      , c = 30;
    return n.extend({
        remoteToLocalQueue: [],
        flushingRemoteToLocalQueue: !1,
        flushRemoteToLocalQueue: function() {
            for (var e = this, t = 0, n = Date.now(); l > t && e.remoteToLocalQueue.length; ) {
                var o = e.remoteToLocalQueue.shift();
                o(),
                ++t;
            }
            if (t === l) {
                var a = Date.now() - n;
                c >= a ? l = s > l ? s : ++l : l > s ? l = s : l > 1 && --l;
            }
            e.remoteToLocalQueue.length ? (e.flushingRemoteToLocalQueue = !0,
            i(function() {
                e.flushRemoteToLocalQueue();
            })) : e.flushingRemoteToLocalQueue = !1;
        },
        tryToFlushRemoteToLocalQueue: e.debounce(function() {
            var e = this;
            !e.flushingRemoteToLocalQueue && e.flushRemoteToLocalQueue();
        }, c),
        queueRemoteToLocalOp: function(e) {
            var t = this;
            t.remoteToLocalQueue.push(e),
            t.tryToFlushRemoteToLocalQueue();
        },
        getRemoteToLocalOptions: function(t, i, n, r) {
            var s = o(a);
            return (i || n) && (s.success = void 0,
            s.error = void 0,
            e.isFunction(i) && (s.success = i),
            e.isFunction(n) && (s.error = n)),
            t && (s.remoteState = t),
            r && (s.fromMatryoshka = !0),
            s;
        },
        create: function(t, i, n, a, r, s) {
            var l = this;
            t && !n.id ? console.warn(i, "has id", t, "but id not in data") : t || n.length || l.warnNoID(i);
            var c = l.normalizeCollectionType(i)
              , d = l.collections[c];
            d ? l.queueRemoteToLocalOp(function() {
                t = t ? "" + t : void 0,
                n.type = i,
                n = l.dataProcessors.incoming.processData(n);
                var c = d.get(t);
                !c && a && (c = d.get(a));
                var u = l.getRemoteToLocalOptions(o(n), r, s);
                "id"in n && n.id !== t ? (c = d.get(n.id),
                c && c.save(n, u)) : !c && n && n.id ? d.add(n, u) : e.isFunction(r) && r();
            }) : (l.warnNoCollection("create", i),
            e.isFunction(r) && r());
        },
        update: function(t, i, n, a, r, s, l) {
            var c = this;
            if (t || c.warnNoID(i),
            !n || !Object.keys(n).length)
                return void (e.isFunction(r) && r());
            var d = c.normalizeCollectionType(i)
              , u = c.collections[d];
            u ? c.queueRemoteToLocalOp(function() {
                if (t = t ? "" + t : void 0,
                !n.id && (n.id = t),
                n.type = i,
                n = c.dataProcessors.incoming.processData(n, l === !0),
                delete n.id,
                !Object.keys(n).length)
                    return void (e.isFunction(r) && r());
                var d = u.get(t) || a && u.get(a);
                if (d) {
                    var m = o(n)
                      , p = c.trimSameValues(n, d);
                    if (Object.keys(p).length) {
                        var g = c.getRemoteToLocalOptions(m, r, s);
                        g.remoteState = m,
                        d.save(p, g);
                    } else
                        e.isFunction(r) && r();
                } else
                    e.isFunction(r) && r();
            }) : (c.warnNoCollection("update", i),
            e.isFunction(r) && r());
        },
        updateSuccess: function(e, t) {
            var i = this;
            /position/.test(t) && i.onPositionUpdateSuccess.apply(i, arguments);
        },
        onPositionUpdateSuccess: function(e, t, i) {
            var n = this
              , o = n.normalizeCollectionType(t)
              , a = i.values
              , s = n.collections[o].get(e);
            s && a && a.forEach(function(e) {
                var t = n.collections[r[o]].get("" + e)
                  , i = t && t.id;
                i && s.markIDAsSyncedOut(i);
            });
        },
        trimSameValues: function(e, t) {
            var i = t.attributes;
            for (var n in e)
                e[n] === i[n] && delete e[n];
            return e;
        },
        "delete": function(e, t, i, n, o) {
            var a = this;
            e || a.warnNoID(t),
            e = e ? "" + e : void 0,
            o && "task" === t ? a.handleMatryoshkaTaskDeletion(e, t, i, n) : a.handleNormalDeletion(e, t, i, n);
        },
        handleNormalDeletion: function(t, i, n, o) {
            var a = this
              , r = a.collections[a.normalizeCollectionType(i)];
            r ? a.queueRemoteToLocalOp(function() {
                var i = r.get(t);
                if (i) {
                    var s = a.getRemoteToLocalOptions(void 0, n, o);
                    i.destroy(s);
                } else
                    e.isFunction(n) && n();
            }) : (a.warnNoCollection("delete", i),
            e.isFunction(n) && n());
        },
        handleMatryoshkaTaskDeletion: function(e, t, i, n) {
            var o = this
              , a = o.collections.tasks
              , r = a.get(e)
              , s = r && r.isCompleted();
            s || o.handleNormalDeletion(e, t, i, n);
        },
        warnNoCollection: function(e, t) {
            console.warn("no local collection to handle " + e + " for type " + t);
        },
        warnNoID: function(e) {
            console.warn(e, "has no id");
        }
    });
}),
define("backend/Sync/SyncLabs", ["wunderbits/BaseSingleton", "application/runtime"], function(e, t) {
    var i, n = e.extend({
        init: function(e) {
            i = e;
            var o = t.settings;
            n.bindTo(o, "change:labs_force_http_sync_enabled", "checkForForcedHTTP"),
            n.checkForForcedHTTP();
        },
        checkForForcedHTTP: function() {
            var e = t.isLabsEnabled("force_http_sync");
            console.info("using %s for syncing", e ? "REST" : "WebSocket"),
            i.options && (i.options.forceHTTP = e);
        }
    });
    return n;
}),
define("backend/Sync/SyncController", ["application/runtime", "project!database", "backend/database", "project!sdk", "project!sync", "helpers/TrackingService", "./Mixins/ScopedCollections", "./Mixins/UtilityFunctions", "./DataProcessors/Incoming", "./DataProcessors/Outgoing", "./Queues/CreateQueue", "./Queues/UpdateQueue", "./SyncController/LocalToRemoteMixin", "./SyncController/RemoteToLocalMixin", "./SyncLabs", "project!core"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b) {
    var h = f.WBEventEmitter
      , v = f.WBDeferred
      , _ = f.lib.when
      , w = f.lib.clone
      , k = f.lib.toArray
      , x = f.lib.createUID
      , y = new t.WBLocalStorage()
      , C = e._
      , T = ["activities", "desktop_notifications", "conversations", "features", "files", "folders", "list_positions", "lists", "memberships", "notes", "reminders", "services", "settings", "subscriptions", "subtask_positions", "subtasks", "task_comments", "task_comments_states", "task_positions", "tasks", "tasks_counts", "unread_activities_counts", "users"]
      , S = o.models.Tracker
      , L = S.prototype;
    L.storeName = "storage",
    L.sync = i.sync;
    var D = h.prototype;
    return h.extend({
        mixins: [r, m, p, s],
        SyncClass: o,
        sync: b,
        collections: b,
        dataProcessors: {
            incoming: new l(),
            outgoing: new c()
        },
        dbReady: b,
        initialize: function(t) {
            var i = this;
            D.initialize.apply(i, arguments),
            i.dbReady = new v(),
            i.hasSyncedOnce = new v(),
            i.bindOnceTo(e, "db:allDataLoaded", i.dbReady.resolve, i.dbReady),
            i.instanceReady = new v(),
            i.setupInstance(),
            i.collections = t.collections,
            i.setupSync(),
            i.setupBinds(),
            e.pendingChanges = function() {
                return i.pendingChanges.call(i);
            }
            ,
            i.onOwnRootTouch = C.debounce(i.onOwnRootTouch, 1e3);
        },
        setupInstance: function() {
            function e() {
                t.instanceID = x(),
                y.setItem(i, t.instanceID).always(t.instanceReady.resolve, t.instanceReady);
            }
            var t = this
              , i = "wl_instance_id";
            y.getItem(i).done(function(i) {
                i ? (t.instanceID = i,
                t.instanceReady.resolve()) : e();
            }).fail(function() {
                e();
            });
        },
        setupSync: function() {
            var t = this
              , i = t.SyncClass
              , o = e.config;
            t.syncInitialized = new v(),
            t.sdkInitialized = new v(),
            _(a.ready, t.instanceReady).done(function() {
                t.sync = new i({
                    WunderlistSDK: n,
                    clientID: o.clientID,
                    deviceID: a.uuid,
                    instanceID: t.instanceID,
                    accessToken: e.user.attributes.access_token,
                    config: o,
                    models: {
                        root: e.root,
                        user: e.user
                    },
                    collections: t.collections
                }),
                e.sdk = t.sync.sdk,
                e.sync = t.sync,
                g.init(t.sync.sdk),
                t.bindToSync(),
                t.sync.initialized.done(function() {
                    e.trackers = t.sync.trackers;
                }),
                t.sync.initialized.done(t.syncInitialized.resolve, t.syncInitialized),
                t.sync.sdk.initialized.done(t.sdkInitialized.resolve, t.sdkInitialized);
            });
        },
        destroySync: function() {
            var e = this;
            e.unbindFromSync(),
            e.sync.destroy();
        },
        setupBinds: function() {
            var t = this;
            t.createQueue = window.createQueue = new d(),
            t.updateQueue = window.updateQueue = new u(),
            t.dbReady.done(function() {
                t.createQueue.ready.done(function() {
                    t.loadFromQueue("create");
                }),
                t.updateQueue.ready.done(function() {
                    t.loadFromQueue("update");
                }),
                t.hasSyncedOnce.done(function() {
                    e.trigger("hasSyncedOnce");
                }),
                t.bindToCollections();
            }),
            t.bindToRuntime();
        },
        bindToRuntime: function() {
            var t = this;
            t.bindTo(e, "sync:start", "onSync"),
            t.bindTo(e, "trackers:clear", function(e) {
                t.sync.clearTrackers.call(t.sync),
                "function" == typeof e && e();
            }),
            t.bindTo(e, "time:nextMinute", "onNextMinute"),
            t.bindTo(e.user, "change:access_token", "onReauthorize");
        },
        onSync: function(e) {
            var t = this
              , i = arguments
              , n = t.syncInitialized
              , o = t.sdkInitialized
              , r = a.ready
              , s = [t.dbReady, t.instanceReady, n, o, r]
              , l = [t.dbReady, t.instanceReady, n]
              , c = e ? s : l;
            _(c).done(function() {
                var e = t.sync;
                e.onSync.apply(e, i);
            });
        },
        bindToCollections: function() {
            var e = this
              , t = ["add", "change", "destroy"];
            T.forEach(function(i) {
                var n = e.collections[i];
                t.forEach(function(t) {
                    e.bindTo(n, t, function() {
                        e[t].apply(e, arguments);
                    });
                });
            });
        },
        bindToSync: function() {
            var t = this
              , i = ["create", "update", "delete", "fetchLocalData", "fetchPreviousData", "updateSuccess", "invalidMutation"]
              , n = t.sync
              , o = n.sdk;
            i.forEach(function(e) {
                t.bindTo(n, e, t[e].bind(t));
            });
            var a;
            t.bindTo(o, "online", function() {
                e.state.set("online", !0),
                a = setTimeout(function() {
                    t.onSync();
                }, 1e3);
            }),
            t.bindTo(o, "offline", function() {
                a && clearTimeout(a),
                e.state.set("online", !1);
            }),
            t.bindTo(o, "timing:io", function(t) {
                e.trigger("timeline:api", t);
            }),
            t.bindTo(n, "flushing", "onFlush"),
            t.bindTo(n, "sync:ended", function(i, n, o) {
                "matryoshka" !== n && "login" !== n || !o || t.hasSyncedOnce.resolve(),
                e.trigger("sync:ended", i, n, o);
            });
            var r = ["timeline:start", "timeline:end"];
            r.forEach(function(i) {
                t.bindTo(n, i, function() {
                    var t = k(arguments);
                    t.unshift(i),
                    e.trigger.apply(e, t);
                });
            }),
            t.bindTo(n, "touch", "onTouch"),
            t.bindTo(n, "isSyncing", function(t) {
                e.isSyncing = t,
                e.trigger("sync");
            }),
            t.bindTo(o, "unauthorized", "onUnauthorized"),
            t.bindTo(n, "fetchScopedCollection", "getScopedCollection"),
            t.bindTo(n, "before:sync:ended", function() {
                e.trigger("before:sync:ended");
            }),
            n.initialized.done(function() {
                o.initialized.done(function() {
                    e.state.set("online", o.appState.attributes.online);
                });
            });
        },
        unbindFromSync: function() {
            var e = this;
            e.unbindFromTarget(e.sync),
            e.unbindFromTarget(e.sync.sdk);
        },
        onFlush: function(t, i) {
            var n = this;
            t = Array.isArray(t) ? t[0] : t,
            n.flushing = "started" === t,
            e.trigger("sync:" + t, i, "flushing");
            var o = n.sync
              , a = o.sdk
              , r = a && !a.destroyed
              , s = r && a.isSocketOnline()
              , l = o.watcher.isStrategySyncing("matryoshka");
            "ended" !== t || !r || s || l || n.onOwnRootTouch();
        },
        onUnauthorized: function() {
            var t = this;
            t.dbReady.done(function() {
                e.user.forceLogout();
            });
        },
        onReauthorize: function(e) {
            if (e.attributes.access_token) {
                var t = this;
                t.destroySync(),
                t.setupSync();
            }
        },
        onNextMinute: function() {
            var t = this
              , i = 6e4
              , n = "matryoshka"
              , o = t.isSocketConnected();
            if (!o) {
                var a = t.sync && t.sync.watcher
                  , r = Date.now()
                  , s = t.lastPoll || 0
                  , l = r - s >= i;
                l && a && !a.isStrategySyncing(n) && (t.lastPoll = Date.now(),
                e.trigger("sync:start", "false", n));
            }
        },
        isSocketConnected: function() {
            var e = this
              , t = e.sync && e.sync.sdk
              , i = t && t.restSocket
              , n = i && i.socket;
            return !(!n || !n.isConnected());
        },
        onTouch: function(t, i) {
            "root" === i && e.root.isIDEqual(t) && this.onOwnRootTouch();
        },
        onOwnRootTouch: function() {
            var t = this
              , i = "matryoshka";
            t.onOwnRootTouchTimout && clearTimeout(t.onOwnRootTouchTimout);
            var n = !t.pendingChangesInSync()
              , o = !t.sync.watcher.isStrategySyncing(i)
              , a = !t.sync.watcher.isStrategySyncing("login")
              , r = !t.flushing;
            r && n && o && a ? e.trigger("sync:start", "false", i) : t.onOwnRootTouchTimout = setTimeout(function() {
                t.onOwnRootTouch();
            }, 1e3);
        },
        fetchLocalData: function(e, t, i) {
            var n = this;
            e = "" + e;
            var o = n.collections[n.normalizeCollectionType(t)]
              , a = o && o.get(e)
              , r = a && w(a.attributes);
            return "function" == typeof i && i(r),
            r;
        },
        fetchPreviousData: function(e, t, i) {
            var n = this;
            e = "" + e;
            var o = n.collections[n.normalizeCollectionType(t)]
              , a = o && o.get(e)
              , r = a && w(a.attributes.lastUpdateData);
            return r = r && n.dataProcessors.outgoing.processData(r),
            "function" == typeof i && i(r),
            r;
        },
        pendingChangesInSync: function() {
            var e = this.sync;
            return e && e.pendingChanges && e.pendingChanges.call(e) || 0;
        },
        pendingChanges: function() {
            var e = this
              , t = e.pendingChangesInSync()
              , i = e.createQueue.getQueue().length || 0
              , n = e.updateQueue.getQueue().length || 0;
            return t + i + n;
        },
        invalidMutation: function(t) {
            e.error.notify("invalid_mutation", "invalid realtime mutation from the api", {
                mutation: t
            });
        }
    });
}),
define("backend/sync", ["application/runtime", "backend/database", "collections/TaskCommentsCollection", "collections/TaskCommentsStateCollection", "collections/FeatureCollection", "collections/FileCollection", "collections/ListCollection", "collections/FolderCollection", "collections/MembershipCollection", "collections/TaskCollection", "collections/SubtaskCollection", "collections/ReminderCollection", "collections/SettingCollection", "collections/ServiceCollection", "collections/NotificationCollection", "collections/NoteCollection", "collections/Positions/ListPositionsCollection", "collections/Positions/SubtaskPositionsCollection", "collections/Positions/TaskPositionsCollection", "collections/TasksCountCollection", "collections/UserCollection", "collections/SubscriptionCollection", "collections/UnreadActivitiesCountCollection", "collections/ActivitiesCollection", "collections/ConversationsCollection", "wunderbits/BaseEventEmitter", "backend/Sync/SyncController"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S) {
    var L, D = T.prototype, j = e._;
    return T.extend({
        initialize: function() {
            var t = this;
            D.initialize.apply(t, arguments),
            L = t.initCollections(),
            e.once("user:ready", t.initSync, t);
        },
        initSync: function(e, t) {
            var i = this;
            i.initOnLoggedIn(t);
        },
        initOnLoggedIn: function(t) {
            new S({
                collections: L
            });
            var i = !0;
            if ("payment" !== t) {
                var n = !1;
                e.on("database:upgraded", function() {
                    n = !0;
                }),
                e.hasRouted.done(function() {
                    j.defer(function() {
                        n && "normalLoad" === t ? e.trigger("sync:start", i, "login") : e.trigger("sync:start", i, t);
                    });
                });
            }
        },
        initCollections: function() {
            return {
                features: new o("/features/all"),
                files: new a("/files/all"),
                lists: new r("/lists/all"),
                folders: new s("/folders/all"),
                list_positions: new b("/listPositions/all"),
                memberships: new l("/memberships/all"),
                tasks: new c("/tasks/all"),
                task_comments: new i("/taskComments/all"),
                task_comments_states: new n("/taskCommentsStates/all"),
                task_positions: new v("/taskPositions/all"),
                tasks_counts: new _("/tasksCounts/all"),
                subtasks: new d("/subtasks/all"),
                subtask_positions: new h("/subtaskPositions/all"),
                reminders: new u("/reminders/all"),
                notes: new f("/notes/all"),
                services: new p("/services/all"),
                settings: new m("/settings/all"),
                desktop_notifications: new g("/desktopNotifications/all"),
                users: new w("/users/all"),
                subscriptions: new k("/subscriptions/all"),
                unread_activities_counts: new x("/unreadActivitiesCounts/all"),
                activities: new y("/activities/all"),
                conversations: new C("/conversations/all")
            };
        }
    });
}),
define("backend/timer", ["application/runtime", "project!core"], function(e, t) {
    function i() {
        return b.setTime(Date.now()),
        b.getDate();
    }
    function n() {
        return b.setTime(Date.now()),
        b.getMinutes();
    }
    function o() {
        return b.setTime(Date.now()),
        b.getHours();
    }
    function a() {
        r = i(),
        r !== v && (e.trigger("day:ended"),
        v = r),
        s = n(),
        s !== _ && (e.trigger("time:nextMinute"),
        _ = s,
        l = o(),
        l !== w && (e.trigger("time:nextHour"),
        w = l)),
        --h <= 0 && (e.trigger("reminders:check"),
        h = f),
        d = m(a, g);
    }
    var r, s, l, c, d, u = e.global, m = u.setTimeout, p = u.clearTimeout, g = 1e3, f = 1, b = new Date(), h = f, v = i(), _ = n(), w = o();
    return t.WBSingleton.extend({
        init: function() {
            c = !1;
        },
        isRunning: function() {
            return !!c;
        },
        start: function() {
            var e = this;
            e.isRunning() || (d = m(a, g),
            c = !0);
        },
        stop: function() {
            var e = this;
            e.isRunning() && (p(d),
            c = !1);
        }
    });
}),
define("helpers/GoogleAnalytics", ["application/runtime", "wunderbits/helpers/strings", "vendor/ga", "project!core"], function(e, t, i, n) {
    var o = e._
      , a = e.config
      , r = null;
    return n.WBSingleton.extend({
        init: function() {
            var n = this;
            if (a.analytics && a.analytics.ga) {
                i.init(a.analytics.ga),
                i.gaq.push(["_setDomainName", "wunderlist.com"]),
                i.gaq.push(["_setAllowLinker", !0]),
                e.on("analytics", n._trackEvent),
                window.onhashchange = n._trackGAPageView;
                var o = e.env.isPackagedApp() ? "/" : location.pathname
                  , s = o + t.sanitizeHash(location.hash);
                i.gaq.push(["_trackPageview", s]),
                r = s;
            }
        },
        _trackEvent: function() {
            var e = o.toArray(arguments);
            if (o.isArray(e[0])) {
                var t = e.shift();
                ("APIBenchmark-Latency" === t[0] || "APIBenchmark-DownloadTime" === t[0]) && (t[1] = decodeURIComponent(t[1]));
                var n = ["_trackEvent", t[0], t[1] || ""];
                e.length && (1 === e.length && (o.isNumber(e[0]) ? e.unshift(void 0) : e.push(void 0)),
                e[2] = !1,
                n.push.apply(n, e)),
                i.gaq.push(n);
            }
        },
        _trackGAPageView: function() {
            var e = t.sanitizeHash(location.hash)
              , n = location.pathname + e;
            n !== r && (i.gaq.push(["_trackPageview", n]),
            r = n);
        }
    });
}),
define("helpers/PrintHelper", ["application/runtime", "project!core"], function(e, t) {
    var i = e._;
    return t.WBSingleton.extend({
        init: function() {
            var t = this;
            if (t._debouncedBeforePrint = i.debounce(t.beforePrint, 500, {
                leading: !0
            }),
            e.env.isFirefox() || e.env.isIE() || e.env.isEdge())
                window.onbeforeprint = t._debouncedBeforePrint;
            else if (window.matchMedia) {
                var n = window.matchMedia("print")
                  , o = function(e) {
                    e.matches && t._debouncedBeforePrint();
                };
                n.addListener(o);
            }
        },
        beforePrint: function() {
            e.trigger("print:start");
        }
    });
}),
define("helpers/socialPrompts", ["application/runtime", "wunderbits/BaseEventEmitter", "vendor/moment", "project!core"], function(e, t, i, n) {
    var o = e._
      , a = n.WBDeferred
      , r = t.prototype
      , s = e.config
      , l = !1
      , c = {
        rate: "rate",
        tell: "tell-your-friends"
    };
    return t.extend({
        initialize: function() {
            var t = this;
            r.initialize.apply(t, arguments),
            t._ready = new a(),
            t.bindOnceTo(e, "interface:ready", t._ready.resolve, t._ready),
            t._ready.done(t.checkRelease.bind(t));
        },
        triggerRoute: function(t) {
            var i = c[t];
            e.trigger("route:" + i);
        },
        checkShouldOpenDelayedPrompt: function() {
            var t = this
              , n = e.settings.attributes.should_open_social_prompt_on
              , o = e.settings.attributes.should_open_prompt;
            o && n && n === i().format("YYYY-MM-DD") && (t.isOnDisallowedRoute() || (e.settings.save({
                should_open_social_prompt_on: null,
                should_open_prompt: null
            }),
            t.triggerRoute(o)));
        },
        checkRelease: function() {
            var t = this
              , i = new a();
            return e.isLocalDev() ? i.resolve() : (t.bindOnceTo(e, "settings:ready", function() {
                e.settings.ready.done(function() {
                    var n = e.settings.attributes.last_used_release;
                    if (s.release && n !== s.release) {
                        var o = n && n.split(".")
                          , a = s.release && s.release.split(".")
                          , r = o && o[0]
                          , c = o && o[1]
                          , d = r !== a[0] || !r
                          , u = r >= a[0];
                        (r && d || u && c < a[1]) && (t._ready.done(function() {
                            e.settings.save({
                                last_used_release: s.release
                            }),
                            t.isOnDisallowedRoute() || e.trigger("onboarding:existingUser");
                        }),
                        l = !0,
                        t.updateNewInstallationStatus());
                    } else
                        l = !1;
                    i.resolve();
                });
            }),
            i);
        },
        updateNewInstallationStatus: function(t) {
            e.isInstalledOnChrome() && (t || t !== !1 && "true" !== e.settings.attributes.new_installation ? e.settings.save("new_installation", "true") : e.settings.save("new_installation", "false"));
        },
        openPrompt: function(t) {
            var i = this;
            ("rate" !== t || e.user.showSocialButtons()) && (i.isOnDisallowedRoute() ? i.delayOpenPrompt(t, 60) : "socialPrompt" !== e.focus && i.triggerRoute(t));
        },
        delayOpenPrompt: function(t, i) {
            function n() {
                o.isOnDisallowedRoute() || (clearTimeout(a),
                e.off("routed", n));
            }
            var o = this
              , a = setTimeout(function() {
                o.openPrompt(t);
            }, 1e3 * i);
            e.on("routed", n);
        },
        isOnDisallowedRoute: function() {
            var t = ["preferences", "social", "conversations", "activities"]
              , i = !1
              , n = e.currentRoute();
            return o.each(t, function(e) {
                n.indexOf(e) >= 0 && (i = !0);
            }),
            i;
        }
    });
}),
define("helpers/onboarding/BaseOnboardingFlow", ["application/runtime", "project!core"], function(e, t) {
    var i = t.WBEventEmitter
      , n = i.prototype
      , o = e._;
    return i.extend({
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e.bindEvents();
        },
        order: ["AddItem", "AddPeople", "CreateList"],
        settingsMap: {
            AddItem: "onboarding_add_todo",
            AddPeople: "onboarding_click_share_list",
            CreateList: "onboarding_click_create_list"
        },
        bindEvents: function() {
            var t = this
              , i = t.nextInOrder();
            switch (i) {
            case "AddItem":
                t.chooseListBind = t.bindOnceTo(e, "onboarding:chooseListClosed", "showNextAction"),
                t.inputFocusBind = t.bindOnceTo(e, "onboarding:addItemFocus", "closeTooltip"),
                t.itemAddedBind = t.bindOnceTo(e, "onboarding:itemAdded", "itemAdded");
                break;

            case "AddPeople":
                t.shareListClickBind = t.bindTo(e, "onboarding:shareListClicked", "shareListClicked"),
                t.shareListCloseBind = t.bindTo(e, "onboarding:shareListClose onboarding:shareListCancel", "shareListClosed");
                break;

            case "CreateList":
                t.addListClickBind = t.bindTo(e, "onboarding:addListClicked", "closeTooltip");
                break;

            default:
                t.unbindAll();
            }
            t.bindTooltipClose();
        },
        bindTooltipClose: function() {
            var t = this;
            t.bindTo(e, "tooltip:close", "_closeTooltip");
        },
        _closeTooltip: function(e, t, i) {
            var n = this;
            n["hide" + e + "Tooltip"](t, i),
            t && t.unbindAll(),
            n.bindEvents();
        },
        closeTooltip: function() {
            e.trigger("hideTooltip");
        },
        itemAdded: function() {
            var t = this;
            e.trigger("hideTooltip"),
            e.settings.save("onboarding_add_todo", "true"),
            t.showNextAction();
        },
        shareListClicked: function() {
            var t = this;
            e.settings.save("onboarding_click_share_list", "true", {
                success: t.closeTooltip.bind(t)
            });
        },
        shareListClosed: function() {
            var e = this;
            e.showNextAction();
        },
        showAddItemTooltip: function() {
            e.trigger("showTooltip:AddItem");
        },
        showAddPeopleTooltip: function() {
            e.trigger("showTooltip:AddPeople");
        },
        showCreateListTooltip: function() {
            e.trigger("showTooltip:CreateList");
        },
        hideAddItemTooltip: function(t, i) {
            var n = this;
            t && t.popover.trigger("popover:close"),
            e.settings.save("onboarding_add_todo", "true"),
            n.inputFocusBind && n.unbindFrom(n.inputFocusBind),
            i && n.showNextAction();
        },
        hideAddPeopleTooltip: function(t, i) {
            var n = this;
            t && t.popover.trigger("popover:close"),
            e.settings.save("onboarding_click_share_list", "true"),
            i && n.showNextAction();
        },
        hideCreateListTooltip: function(t) {
            var i = this;
            t && t.popover.trigger("popover:close"),
            e.settings.save("onboarding_click_create_list", "true"),
            i.addListClickBind && i.unbindFrom(i.addListClickBind),
            i.showNextAction();
        },
        nextInOrder: function() {
            var t = this;
            return o.find(t.order, function(i) {
                return !e.settings.isSettingSet(t.settingsMap[i]);
            });
        },
        showNextAction: function() {
            var e = this
              , t = e.nextInOrder();
            t && t !== e.lastAction && (e["show" + t + "Tooltip"](),
            e.lastAction = t);
        }
    });
}),
define("helpers/onboarding/ExistingUserOnboardingFlow", ["application/runtime", "./BaseOnboardingFlow"], function(e, t) {
    var i = e._;
    return t.extend({
        order: ["CreateList", "AddPeople"],
        bindEvents: function() {
            var t = this
              , i = t.nextInOrder();
            switch (i) {
            case "AddItem":
                break;

            case "AddPeople":
                t.bindTo(e, "onboarding:addedList", t.addListClosed),
                t.bindTo(e, "onboarding:shareListClicked", t.shareListClicked);
                break;

            default:
                t.unbindAll();
            }
            t.bindTooltipClose();
        },
        hideCreateListTooltip: function(t, i) {
            var n = this;
            t && t.popover.trigger("popover:close"),
            e.settings.save("onboarding_click_create_list", "true"),
            i && n.showNextAction(),
            n.bindEvents();
        },
        addListClosed: function() {
            var e = this;
            i.delay(function() {
                e.showNextAction(),
                e.bindEvents();
            }, 250);
        }
    });
}),
define("helpers/unload", ["application/runtime", "actions/Factory", "project!core"], function(e, t, i) {
    var n = e._
      , o = t.fileLookup();
    return i.WBSingleton.extend({
        init: function() {
            var t = this;
            e.env.isPackagedApp() || (e.on("sync:unload", function() {
                (e.pendingChanges ? e.pendingChanges() : 0) > 0 && e.trigger("sync:start");
            }),
            e.global.addEventListener("beforeunload", function() {
                var i = !0;
                if (e.on("email:emailing", function() {
                    i = !1;
                }),
                e.on("application:reloading", function() {
                    i = !1;
                }),
                i) {
                    var n, o = e.pendingChanges ? e.pendingChanges() : 0, a = t.getUploadingCount();
                    o > 0 || a > 0 ? (o > 0 && e.trigger("sync:unload"),
                    o += a,
                    n = 1 === o ? e.language.getText("userbar_$_unsynced_item", o) : e.language.getText("userbar_$_unsynced_item_plural", o)) : e.isSyncing && (n = e.language.getText("userbar_sync_in_progress"));
                    var r = new Date().valueOf()
                      , s = Math.round((r - e.started) / 1e3 / 60);
                    return e.trigger("analytics:Application:unload", s + " minutes"),
                    n;
                }
            }),
            e.global.addEventListener("unload", function() {
                e.trigger("window:unload");
            }));
        },
        getUploadingCount: function() {
            var e = o.allFiles
              , t = n.filter(e.models, function(e) {
                return e.file;
            });
            return t.length;
        }
    });
}),
define("helpers/RateDialogManager", ["application/runtime", "collections/FeatureCollection", "vendor/moment", "project!core"], function(e, t, i, n) {
    var o = n.WBEventEmitter
      , a = o.prototype;
    return o.extend({
        blockerUrls: ["preferences", "conversations", "activities"],
        initialize: function() {
            var i = this;
            a.initialize.apply(i, arguments),
            i.features = new t("/features/all"),
            i.bindOnceTo(e, "features:ready", function() {
                i.setDefaults(),
                i.bindTo(e, "significantEvent:added", "incrementSignificantEvents"),
                i.bindTo(i.features, "add remove change", "tryOpen"),
                i.bindTo(e, "change:significant_event_count", "tryOpen"),
                i.tryOpen();
            });
        },
        setDefaults: function() {
            var t = e.settings.attributes
              , n = t.app_first_used;
            "false" === n && e.settings.save({
                app_first_used: i().sod().valueOf()
            });
        },
        incrementSignificantEvents: function() {
            var t = parseInt(e.settings.attributes.significant_event_count, 10);
            e.settings.save({
                significant_event_count: ++t
            });
        },
        isOpenOnRouteAllowed: function() {
            var t = this
              , i = e.currentRoute()
              , n = !0;
            return t.blockerUrls.forEach(function(e) {
                0 === i.indexOf(e) && (n = !1);
            }),
            n;
        },
        hasBeenTwoDaysSinceFirstUse: function() {
            var t = this
              , n = i().sod()
              , o = i(e.settings.attributes.app_first_used)
              , a = t.features.findWhere({
                name: "app_rating.days_until_prompt"
            })
              , r = a ? parseInt(a.attributes.variant, 10) : 2;
            return n.diff(o, "days") >= r && t.hasNeverSeenDialog();
        },
        hasTriggeredSignificantEvents: function() {
            var t = this
              , i = parseInt(e.settings.attributes.significant_event_count, 10)
              , n = t.features.findWhere({
                name: "app_rating.significant_events_until_prompt"
            })
              , o = n ? parseInt(n.attributes.variant, 10) : 5;
            return i >= o && t.hasNeverSeenDialog();
        },
        getRateLaterKey: function() {
            var t = e.env.isChromeApp() ? "chrome_app" : "chrome";
            return t + "_rating_later";
        },
        hasNeverSeenDialog: function() {
            var t = this;
            return "undefined" === e.settings.attributes[t.getRateLaterKey()];
        },
        neverShowAgain: function() {
            var t = this;
            return "false" === e.settings.attributes[t.getRateLaterKey()];
        },
        hasWaitedToShowAgain: function() {
            var t = this
              , n = e.settings.attributes[t.getRateLaterKey()];
            if (!o)
                return !1;
            var o = i(n)
              , a = i().sod()
              , r = t.features.findWhere({
                name: "app_rating.days_before_reminding_again"
            })
              , s = r ? parseInt(r.attributes.variant, 10) : 10;
            return a.diff(o, "days") >= s;
        },
        shouldOpen: function() {
            var e = this;
            return !e.isOpenOnRouteAllowed() || e.neverShowAgain() ? !1 : e.hasBeenTwoDaysSinceFirstUse() || e.hasTriggeredSignificantEvents() || e.hasWaitedToShowAgain() ? !0 : !1;
        },
        tryOpen: function() {
            var t = this;
            t.shouldOpen() && (e.trigger("route:rate"),
            e.settings.save(t.getRateLaterKey(), i().sod().valueOf()));
        }
    });
}),
define("helpers/UpdateHelper", ["application/runtime", "project!core"], function(e, t) {
    var i = t.WBClass
      , n = t.mixins.WBUtilsMixin
      , o = e.global
      , a = e.$;
    return i.extend({
        mixins: [n],
        checkInterval: 18e5,
        checkIntervalPackaged: 9e5,
        getVersionURL: function() {
            var t = e.global.location
              , i = t.protocol + "//" + t.host;
            return i + "/version.json?rand=" + Math.random();
        },
        parseVersionNumber: function(e) {
            return parseInt(e.split(".").join(""), 10);
        },
        extractSemverInfo: function(e) {
            var t = e.split(".");
            return t = t.map(function(e) {
                return parseInt(e, 10);
            }),
            {
                major: t[0],
                minor: t[1],
                patch: t[2],
                build: t[3]
            };
        },
        majorEqual: function(e, t) {
            return e.major === t.major;
        },
        minorEqual: function(e, t) {
            return e.minor === t.minor;
        },
        majorOrMinorUpgraded: function(e, t) {
            var i = this.majorEqual(e, t)
              , n = t.major > e.major
              , o = i && t.minor > e.minor;
            return n || o;
        },
        patchOrBuildUpgraded: function(e, t) {
            var i = this
              , n = i.majorEqual(e, t)
              , o = i.minorEqual(e, t)
              , a = t.patch > e.patch
              , r = t.build > e.build;
            return n && o && (a || r);
        },
        checkForUpdates: function() {
            var t = this
              , i = o.gitHash && o.gitHash.split(/[\[\]]/)[1];
            i && a.ajax(t.getVersionURL(), {
                dataType: "text",
                type: "GET"
            }).done(function(n) {
                var o;
                try {
                    o = JSON.parse(n);
                } catch (a) {
                    e.trigger("analytics:Application:failedToFetchVersionFile", a);
                }
                if (o) {
                    var r = o.deployments[0]
                      , s = r && r.commits[0]
                      , l = s && s.sha1;
                    0 === i.indexOf(l) ? t.delay("checkForUpdates", t.checkInterval) : t.reloadWhenIdle();
                }
            });
        },
        checkPackageForUpdate: function(t) {
            var i = this
              , n = e.config.release;
            i.fetchRemotePackageInfo().done(function(o) {
                var a = o.release === n
                  , r = i.extractSemverInfo(n)
                  , s = i.extractSemverInfo(o.release)
                  , l = i.majorOrMinorUpgraded(r, s)
                  , c = i.patchOrBuildUpgraded(r, s)
                  , d = c && t;
                a ? (e.state.set("updateState", "updated"),
                i.delay("checkPackageForUpdate", i.checkIntervalPackaged)) : (l || d) && i.showPackageAppRestartDialog(t);
            });
        },
        fetchRemotePackageInfo: function() {
            return a.ajax("package.json", {
                dataType: "JSON",
                type: "GET"
            });
        },
        showPackageAppRestartDialog: function(t) {
            var i = this
              , n = t ? 0 : 15e3;
            i.delay(function() {
                e.trigger("modal:confirm", {
                    customTitle: e.language.getLabel("label_update_available").toString(),
                    customText: e.language.getLabel("label_update_completed_please_restart").toString(),
                    confirmText: e.language.getLabel("button_restart_wunderlist").toString(),
                    confirm: function() {
                        e.trigger("reload");
                    },
                    cancel: function() {
                        i.delay("checkPackageForUpdate", 108e5),
                        e.state.set("updateState", "default");
                    }
                });
            }, n);
        },
        reload: function(t) {
            return e.trigger("analytics:Application:reloadForUpdate", t),
            setTimeout(function() {
                e.publish("application:reloading");
                var t = o.location;
                t.href = t.pathname + "?_rand=" + Math.random() + t.hash;
            }, 1e4);
        },
        reloadWhenIdle: function() {
            var t = this;
            e.trigger("analytics:Application:updateAvailable");
            var i, n = function() {
                i = t.reload("pageHidden"),
                e.once("page:visible", o);
            }, o = function() {
                clearTimeout(i),
                e.once("page:hidden", n);
            };
            e.isVisible() ? t.reloadWhenHidden(n) : (t.reload("pageNotVisible"),
            e.once("page:visible", o));
        },
        reloadWhenHidden: function(t) {
            var i = this;
            e.once("page:hidden", t);
            var n = 0
              , r = function() {
                n += 1,
                n > 10 && i.reload("userIdle");
            };
            o.setInterval(r, 6e4),
            a(document).mousemove(function() {
                n = 0;
            }).keypress(function() {
                n = 0;
            });
        }
    });
}),
define("wunderbits/WBViewPresenter", ["application/runtime", "./lib/dependencies", "./WBView", "project!core"], function(e, t, i, n) {
    var o = n.lib.merge
      , a = n.lib.toArray
      , r = n.lib.fromSuper
      , s = n.mixins.ControllableMixin
      , l = i.prototype
      , c = t._
      , d = i.extend({
        emits: {},
        observes: {
            model: {},
            collection: {},
            runtime: {}
        },
        eventProxies: {
            tap: ["click", "touchstart"],
            move: ["mousemove", "touchmove"]
        },
        initialize: function() {
            var e = this;
            e.emits = r.merge(e, "emits"),
            l.initialize.apply(e, arguments),
            e.options = r.merge(e, "options"),
            e.createObserveBindings();
        },
        trigger: function(e) {
            var t = this;
            l.trigger.apply(t, arguments);
            var i = a(arguments, 1);
            return t.iterate(e, function(e) {
                t.triggered.apply(t, [e].concat(i));
            }),
            t;
        },
        triggered: function() {
            var e = this
              , t = c.toArray(arguments)
              , i = "*children"
              , n = "*parents";
            if (e._superView && t[0].indexOf(n) < 0) {
                var o = c.clone(t);
                o[0].indexOf(i) < 0 && (o[0] = i + ":" + o[0]),
                e._superView.trigger.apply(e._superView, o);
            }
            if (e._subviews && t[0].indexOf(i) < 0) {
                var a = c.clone(t);
                a[0].indexOf(n) < 0 && (a[0] = n + ":" + a[0]);
                for (var r, s = 0, l = e._subviews.length; l > s; s++)
                    r = e._subviews[s],
                    r.trigger.apply(r, a);
            }
        },
        renderSubview: function(e, t, i) {
            var n = this;
            t || (t = {}),
            i || (i = e.toString()),
            t.state = t.state || n.state;
            var o = n.addSubview(new e(t), i);
            return n.el.appendChild(o.render().el),
            o;
        },
        createObserveBindings: function(t) {
            var i = this;
            t = t || i;
            var n, o, a, r = t.observes;
            for (var s in r) {
                if (n = "events" === s || "*parents" === s || "*children" === s ? i : "runtime" === s ? e : i[s],
                a = r[s],
                n && c.isFunction(n.on) && c.size(a))
                    for (var l in a) {
                        if (o = a[l],
                        c.isArray(o))
                            for (var d = 0, u = o.length; u > d; d++)
                                i._bindObserveeEvent(o[d], n, l, s);
                        else
                            i._bindObserveeEvent(o, n, l, s);
                        o = null;
                    }
                n = null;
            }
            t.constructor.__super__ && i.createObserveBindings.call(i, t.constructor.__super__);
        },
        _bindObserveeEvent: function(e, t, i, n) {
            var o, a = this;
            "*" === n[0] && (i = n + ":" + i),
            o = c.isFunction(e) ? e : ">" === e[0] ? function() {
                var t = [e.substr(1)].concat(c.toArray(arguments));
                a.trigger.apply(a, t);
            }
            : a[e],
            c.isFunction(o) && a.bindTo(t, i, o);
        },
        getEvents: function(e) {
            var t = this
              , i = c.isFunction(t.emits) ? t.emits() : t.emits;
            return o({}, i, e);
        },
        delegateEvents: function(e) {
            var t = this;
            e = t.getEvents(e),
            e = t.mapEventProxies(e),
            c.each(e, function(i, n) {
                e[n] = function() {
                    var e = [i].concat(c.toArray(arguments));
                    t.trigger.apply(t, e);
                }
                ;
            }),
            e = o({}, e, c.result(t, "events")),
            l.delegateEvents.call(t, e);
        },
        mapEventProxies: function(e) {
            var t = this;
            return c.each(e, function(i, n) {
                var o = t.eventProxies[n];
                o && o.length && (c.each(o, function(t) {
                    e[t] = i;
                }),
                delete e[n]);
            }),
            e;
        },
        onDestroy: function() {},
        destroy: function() {
            var e = this
              , t = e.deferred();
            e.renderDestroy(t).always(function() {
                !e.destroyed && l.destroy.call(e);
            });
        },
        renderDestroy: function(e) {
            return e.resolve().promise();
        }
    });
    return s.applyToClass(d),
    d;
}),
define("views/Login/StackView", ["application/runtime", "wunderbits/WBViewPresenter", "project!core"], function(e, t, i) {
    var n = e._
      , o = e.w_
      , a = i.WBDeferred
      , r = i.lib.when
      , s = t.prototype;
    return t.extend({
        viewClasses: {},
        initialize: function() {
            var e = this;
            s.initialize.apply(e, arguments),
            e.views = [];
        },
        createView: function(e, t, i) {
            var n = this
              , a = n.viewClasses[e];
            return new a(o.merge({
                previousView: i
            }, t));
        },
        pushViews: function(e, t) {
            var i = this
              , o = e.pop();
            return n.each(e, function(e) {
                i.pushView(e, !1, t);
            }),
            i.pushView(o, !0, t);
        },
        pushView: function(e, t, i) {
            var r = this
              , s = new a();
            if (n.isArray(e))
                return r.pushViews(e, i);
            var l = r.beforePushView(e);
            if (l) {
                var c = r.views[r.views.length - 1];
                c && c.trigger("before:push");
                var d = r.addSubview(r.createView(e, {}, c));
                d.stackViewName = e,
                o.merge(d.state, c && c.state || {}, i || {}),
                r.views.push(d),
                d.bindTo(d, "close", r.popView, r),
                d.bindTo(d, "open", r.pushView, r),
                d.bindTo(d, "sync", r.syncViews, r),
                r.appendView(d),
                t !== !1 && (r.viewMadeVisible(d),
                n.defer(function() {
                    r.showView(d, c).done(s.resolve, s);
                }));
            } else
                s.resolve();
            return s.promise();
        },
        syncViews: function(e, t) {
            for (var i, o, s = this, l = new a(), c = [], d = [], u = [], m = e[e.length - 1], p = !1, g = 0, f = s.views.length; f > g; g++)
                i = s.views[g],
                o = e[g],
                (o && i.stackViewName !== o || !o) && c.push(i),
                m && i.stackViewName === m && (p = !0),
                i = o = null;
            n.each(c.reverse(), function(e) {
                d.push(s.popView(e, {
                    triggerEvents: p,
                    animate: p,
                    fromSyncViews: !0
                }));
            });
            var b = function() {
                var t = e.shift()
                  , i = n.find(s.views, function(e) {
                    return e.stackViewName === t;
                });
                i || u.push(t),
                e.length && b();
            }
              , h = function() {
                b(),
                r(s.pushViews(u, t)).done(function() {
                    l.resolve();
                });
            };
            return d.length ? r(d).done(h) : h(),
            l.promise();
        },
        popView: function(e, t) {
            var i = this;
            e = e || i.views[i.views.length - 1],
            t || (t = {}),
            t.triggerEvents !== !1 && (t.triggerEvents = !0);
            var n = t.animate;
            e.trigger("before:pop"),
            i.views.pop();
            var a = i.views[i.views.length - 1];
            return a && o.merge(a.state, e.state),
            t.triggerEvents && a && i.viewMadeVisible(a),
            i.removeView(e, a, n);
        },
        appendView: function(e) {
            var t = this;
            e.$el.hide(),
            t.el.appendChild(e.render().el);
        },
        showView: function() {
            return !0;
        },
        removeView: function() {
            return !0;
        },
        viewMadeVisible: function() {},
        beforePushView: function(e) {
            return "string" == typeof e;
        }
    });
}),
define("wunderbits/WBViewController", ["./lib/dependencies", "./WBController", "./WBViewPresenter", "project!core"], function(e, t, i, n, o) {
    var a = e._
      , r = n.lib.fromSuper
      , s = t.prototype;
    return t.extend({
        model: o,
        options: o,
        state: o,
        view: o,
        _viewEvents: o,
        "implements": {
            visible: "viewMadeVisible",
            hidden: "viewMadeHidden"
        },
        initialize: function(e) {
            var t = this;
            s.initialize.apply(t, arguments),
            t.view = e || t.view;
            var n = t.view instanceof i;
            if (!n)
                throw new Error("Cannot initialize without instance of WBViewPresenter as self.view");
            t.model = t.view.model,
            t.options = r.merge(t, "options"),
            t.state = r.merge(t, "state"),
            t.bindViewEvents();
        },
        onDestroy: function() {
            var e = this;
            e.destroyObject(e.options),
            e.destroyObject(e.state),
            e.destroyObject(e._viewEvents),
            s.onDestroy.apply(e, arguments);
        },
        bindViewEvents: function(e) {
            var t = this;
            e || (e = t);
            for (var i in e["implements"])
                t.bindInstanceEvent(i, e);
            e.constructor && e.constructor.__super__ && t.bindViewEvents(e.constructor.__super__);
        },
        bindInstanceEvent: function(e, t) {
            var i, n = this;
            n._viewEvents || (n._viewEvents = {}),
            t["implements"].hasOwnProperty(e) && (i = t["implements"][e],
            i = a.isFunction(i) ? i : a.isFunction(n[i]) ? n[i] : null,
            i && n._viewEvents[e] !== i && (n.bindTo(n.view, e, i),
            n._viewEvents[e] = i));
        },
        stopItCold: function(e) {
            e.preventDefault(),
            e.stopPropagation();
        }
    });
}),
define("views/Login/SelectorController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e.$
      , n = t.prototype;
    return t.extend({
        "implements": {
            "click:select": "onClickSelect",
            "click:microsoft": "openMicrosoftSignin"
        },
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e.bindTo(e.view, "visible", e.viewMadeVisible);
        },
        viewMadeVisible: function() {
            var e = this;
            delete e.hasSelected;
        },
        openMicrosoftSignin: function() {
            this.view.trigger("open", "microsoft-signin");
        },
        onClickSelect: function(t) {
            var n = this;
            if (!n.hasSelected) {
                var o = i(t.target);
                "A" !== t.target.tagName && (o = i(t.target).closest("a"));
                var a = o.attr("rel");
                n.hasSelected = !0,
                a && e.trigger("route:" + a);
            }
        }
    });
}),
define("wunderbits/helpers/url", ["project!core"], function(e) {
    return e.WBSingleton.extend({
        parseQueryString: function(e, t) {
            for (var i, n = e.split("&"), o = n.length + 1; --o; )
                i = n[o - 1].split("="),
                t[i[0]] = decodeURIComponent(i[1]);
        },
        parseUrl: function(e) {
            var t = this
              , i = document.createElement("a");
            i.href = e;
            var n = {};
            return t.parseQueryString(i.search && i.search.substr(1), n),
            t.parseQueryString(i.hash && i.hash.substr(1), n),
            {
                protocol: i.protocol || "http",
                host: i.host || i.hostname,
                path: i.pathname,
                params: n
            };
        }
    });
}),
define("controllers/Auth/BaseController", ["application/runtime", "helpers/Auth/OAuthHelper", "helpers/ChromeIdentity", "wunderbits/helpers/url", "project!sdk", "wunderbits/WBViewController"], function(e, t, i, n, o, a, r) {
    var s = a.prototype
      , l = e.config
      , c = i.identity;
    return a.extend({
        "implements": {
            "create:service": "createService"
        },
        initialize: function() {
            var e = this;
            s.initialize.apply(e, arguments),
            e.on("loading:start", e.loadingStart),
            e.on("loading:end", e.loadingEnd);
        },
        providerName: null,
        authBaseUrl: null,
        authUrl: function() {
            var e = this
              , i = e.authParams();
            return t.authUrl(e.authBaseUrl, i);
        },
        parseToken: function(e) {
            var t = n.parseUrl(e)
              , i = t.params
              , o = i.access_token || i.token;
            return o;
        },
        connectExternal: function(e) {
            var t = this;
            t.providerName = e,
            t.trigger("loading:start"),
            c && c.launchWebAuthFlow({
                url: t.authUrl(e),
                interactive: !0
            }, function(i) {
                var n = i !== r && t.parseToken(i);
                i !== r && n ? t.handleToken(n, e) : t.oauthError();
            });
        },
        handleToken: function(e, t) {
            var i = this;
            e ? i.requestAPIUser(e, t).done(i.apiSuccess, i).fail(function(n, o) {
                i.apiError(o, e, t);
            }) : i.oauthError();
        },
        requestAPIUser: function(e, t) {
            var i = this
              , n = o.services.auth
              , a = new n({
                config: l,
                clientID: l.clientID
            });
            return a.exchangeToken(t || i.providerName, e);
        },
        _loggedIn: function() {
            e.reload("/start/lists/inbox");
        },
        apiSuccess: function(t) {
            var i = this;
            i.loadingEnd(),
            e.user.loginSuccess(t, {
                callback: i._loggedIn
            });
        },
        oauthError: function() {
            var e = this;
            e.loadingEnd();
        },
        apiError: function(e, t, i) {
            var n = this;
            404 === e ? n.requestUserProfile(t, i).done(n.profileSuccess, n).fail(n.profileError, n) : n.loadingEnd();
        },
        profileSuccess: function(e, t) {
            var i = this;
            i.loadingEnd(),
            i.view.trigger("open", "external-signup", !0, {
                providerType: e.providerType || i.providerName,
                providerId: e.providerId,
                name: e.name,
                email: e.email,
                avatar: e.avatar,
                token: t
            });
        },
        profileError: function() {
            var e = this;
            e.loadingEnd();
        },
        createService: function(e, i) {
            return t.createService(e.providerType, e.token).then(i).promise();
        },
        loadingStart: function() {
            var e = this;
            e.view.toggleLoading(!0, e.providerName);
        },
        loadingEnd: function() {
            var e = this;
            e.view.toggleLoading(!1, e.providerName);
        }
    });
}),
define("controllers/Auth/FacebookController", ["application/runtime", "helpers/Auth/facebook", "controllers/Auth/BaseController", "project!core"], function(e, t, i, n) {
    var o = n.WBDeferred;
    return i.extend({
        "implements": {
            "click:facebook": "connectWithFacebook",
            "createService:facebook": "createService"
        },
        providerName: t.providerName,
        authBaseUrl: t.authBaseUrl,
        authParams: t.authParams,
        connectWithFacebook: function() {
            var i = this;
            e.env.isChromeApp() ? i.connectExternal() : t.getFacebookOAuthToken("login/", !1);
        },
        requestUserProfile: function(e) {
            var i = this
              , n = new o();
            return t.getFacebookUserGraph(e, function(t) {
                n.resolve({
                    providerType: i.providerName,
                    providerId: t.id,
                    name: t.name,
                    email: t.email,
                    locale: t.locale,
                    avatar: t.avatar,
                    confirmed: !1
                }, e);
            }),
            n.promise();
        }
    });
}),
define("helpers/Auth/google", ["application/runtime", "helpers/Auth/OAuthHelper", "helpers/ChromeIdentity", "wunderbits/BaseSingleton"], function(e, t, i, n, o) {
    function a(t, i) {
        return e.$.ajax({
            url: u + i,
            xhrFields: {
                withCredentials: !1
            },
            headers: {
                Authorization: "Bearer " + t
            }
        });
    }
    var r = e.global
      , s = e.$
      , l = e._
      , c = e.config
      , d = i.identity
      , u = "https://www.googleapis.com/";
    return n.extend({
        providerName: "google",
        authBaseUrl: "https://accounts.google.com/o/oauth2/auth?",
        authParams: function(e) {
            return {
                client_id: c.google.webAppId,
                response_type: "token",
                redirect_uri: t.redirectUrl,
                scope: c.google.scopes.join(" "),
                state: e || "googleOAuthLogin"
            };
        },
        authUrl: function(e) {
            var i = this
              , n = i.authParams(e);
            return t.authUrl(i.authBaseUrl, n);
        },
        connectWithGoogle: function(i, n) {
            var a = this
              , c = a.deferred();
            return e.env.isChromeApp() && d ? d.getAuthToken({
                interactive: !0
            }, function(e) {
                return e === o ? c.reject() : (d.removeCachedAuthToken({
                    token: e
                }, s.noop),
                void (n ? t.createService("google", e).done(c.resolve, c).fail(c.reject, c) : c.resolve(e)));
            }) : l.defer(function() {
                r.location.href = a.authUrl(i);
            }),
            c.promise();
        },
        requestPlusProfile: function(e) {
            var t = this
              , i = t.deferred();
            return a(e, "plus/v1/people/me").done(function(n) {
                var o = n.emails && n.emails[0] && n.emails[0].value
                  , a = n.image && n.image.url;
                i.resolve({
                    providerType: t.providerName,
                    providerId: n.id,
                    name: n.displayName,
                    email: o,
                    avatar: a,
                    locale: n.language,
                    confirmed: n.verified,
                    token: e
                });
            }).fail(function() {
                i.reject();
            }),
            i.promise();
        }
    });
}),
define("controllers/Auth/GoogleController", ["application/runtime", "helpers/Auth/google", "helpers/ChromeIdentity", "controllers/Auth/BaseController", "project!core"], function(e, t, i, n, o) {
    var a = o.WBDeferred
      , r = i.identity
      , s = n.prototype;
    return n.extend({
        "implements": {
            "click:google": "connectWithGoogle"
        },
        providerName: t.providerName,
        authBaseUrl: t.authBaseUrl,
        authParams: function(e) {
            return t.authParams(e);
        },
        connectWithGoogle: function() {
            var e = this
              , i = !1;
            e.trigger("loading:start"),
            t.connectWithGoogle("googleOAuthLogin", i).done(function(t) {
                e.handleToken(t);
            }).fail(e.oauthError, e);
        },
        requestUserProfile: function(e) {
            var i = new a();
            return t.requestPlusProfile(e).done(function(t) {
                i.resolve(t, e);
            }),
            i.promise();
        },
        loadingStart: function() {
            var t = this;
            e.env.isChromeApp() && r ? r.getProfileUserInfo(function(e) {
                var i = e || {};
                (i.email || i.id) && s.loadingStart.apply(t, arguments);
            }) : s.loadingStart.apply(t, arguments);
        }
    });
}),
define("helpers/Auth/externalAuth", ["application/runtime", "helpers/Auth/OAuthHelper", "project!core"], function(e, t, i) {
    var n = e._
      , o = e.$
      , a = e.env.isPackagedApp();
    return i.WBSingleton.extend({
        authParams: function() {
            return {
                chrome_app: chrome.runtime.id,
                chromeApp: chrome.runtime.id
            };
        },
        getProfile: function(t, i, r) {
            o.ajax({
                url: "https://a.wunderlist.com/api/v1/oauth/" + i + "/profile?provider_token=" + t,
                type: "GET",
                dataType: a ? "json" : "jsonp",
                xhrFields: {
                    withCredentials: !1
                },
                success: function(e) {
                    n.isFunction(r) && r(e);
                },
                error: function() {
                    e.error.notify("Failed to fetch profile for " + i);
                }
            });
        }
    });
}),
define("controllers/Auth/ExternalAuthController", ["application/runtime", "helpers/Auth/OAuthHelper", "helpers/Auth/externalAuth", "controllers/Auth/BaseController", "project!core"], function(e, t, i, n, o) {
    var a = e.config
      , r = o.WBDeferred;
    return n.extend({
        "implements": {
            "click:aad": "connectWithAAD",
            "click:msa": "connectWithMSA"
        },
        authBaseUrl: function(e) {
            return a.api.host + "/v1/oauth/" + e;
        },
        authUrl: function(e) {
            var i = this
              , n = i.authParams();
            return t.authUrl(i.authBaseUrl(e), n);
        },
        authParams: i.authParams,
        connectWithAAD: function() {
            var e = this;
            e.startExternalAuth("aad");
        },
        connectWithMSA: function() {
            var e = this;
            e.startExternalAuth("microsoft");
        },
        startExternalAuth: function(t) {
            var n = this;
            e.env.isChromeApp() ? n.connectExternal(t) : i.getOAuthToken("login/", !1);
        },
        oauthError: function() {
            var e = this;
            e.loadingEnd(),
            e.view.trigger("externalAuth:denied", "error_message_wunderlist_not_added");
        },
        requestUserProfile: function(e, t) {
            var n = new r();
            return i.getProfile(e, t, function(i) {
                n.resolve({
                    providerType: t,
                    providerId: i.id,
                    name: i.name,
                    email: i.email,
                    locale: i.locale,
                    avatar: i.avatar,
                    confirmed: !1
                }, e);
            }),
            n.promise();
        }
    });
}),
define("helpers/LocationHelper", ["wunderbits/global", "project!core"], function(e, t) {
    var i = e.navigator;
    return t.WBSingleton.extend({
        isProbablyInChina: function() {
            var e = i.language
              , t = ["zh", "zh-cn"]
              , n = -(new Date().getTimezoneOffset() / 60);
            return t.indexOf(e) >= 0 && 8 === n;
        }
    });
}),
define("loaders/lib/normalize", [], function() {
    return function(e) {
        return function(t, i) {
            var n = "/" + e + "/";
            if (0 === t.indexOf(n) || /\.js$/.test(t))
                return t;
            var o, a = t.split("/")[0], r = "." === a || ".." === a;
            if (r)
                return o = a + n + t.slice(a.length + 1),
                "/" + i(o + ".js");
            var s = "" === a;
            return o = s ? t : n + t,
            i(o + ".js");
        }
        ;
    }
    ;
}),
define("template", ["loaders/lib/normalize"], function(e) {
    return {
        load: function(e, t, i) {
            t([e], i);
        },
        normalize: e("templates")
    };
}),
define("/templates/login/selector.js", {
    name: "login/selector",
    data: {
        "1": function(e, t, i, n) {
            var o, a = ' <div class="cols buttons-external"> <div class="col-33"> <a class="button big external facebook auth ';
            return o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '" role="button"> <div class="icon-login facebook"></div> <span></span> </a> </div> <div class="col-34"> <a href="" class="button big external microsoft auth ',
            o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '" role="button" tabindex="0"> <div class="icon-login microsoft"></div> <span></span> </a> </div> <div class="col-33"> <a class="button big external google auth ',
            o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + '" role="button"> <div class="icon-login google"></div> <span></span> </a> </div> </div> ';
        },
        "2": function() {
            return "disabled";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "";
            return o = t["if"].call(e, e && e.showSocialButtons, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' <a rel="signup" class="button big blue" role="button"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "login_create_new_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> <a rel="login" class="button big" role="button"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_log_in", {
                name: "localized",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        useData: !0
    }
}),
define("style", ["loaders/lib/normalize"], function(e) {
    return {
        load: function(e, t, i) {
            t([e], i);
        },
        normalize: e("styles")
    };
}),
define("/styles/login/_selector.js", {
    name: "login/_selector",
    data: "#wunderlist-base .login-selector{position:absolute;bottom:0;right:14px;left:14px;}#wunderlist-base .login-selector .button{margin-bottom:14px}"
}),
define("views/Login/SelectorView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Login/SelectorController", "controllers/Auth/FacebookController", "controllers/Auth/GoogleController", "controllers/Auth/ExternalAuthController", "helpers/LocationHelper", "template!login/selector", "style!login/_selector"], function(e, t, i, n, o, a, r, s, l) {
    var c = t.prototype;
    return t.extend({
        url: "welcome",
        className: "login-selector",
        state: {
            enableShortcuts: !1
        },
        styles: [l],
        "implements": [i, n, o, a],
        template: s,
        emits: {
            "touchstart .button": "click:select",
            "click .button": "click:select",
            "click .auth.microsoft": "click:microsoft",
            "click .auth.facebook": "click:facebook",
            "click .auth.google": "click:google"
        },
        formatData: function(t) {
            return t = t || {},
            t.showSocialButtons = !r.isProbablyInChina() && !e.env.isNodeWebkit(),
            t.isChromeApp = e.env.isChromeApp(),
            t;
        },
        fadeIn: function() {
            var e = this;
            return e.state.enableShortcuts = !0,
            c.fadeIn.apply(e, arguments);
        },
        fadeOut: function() {
            var e = this;
            return e.state.enableShortcuts = !1,
            c.fadeOut.apply(e, arguments);
        },
        toggleLoading: function(e, t) {
            var i = this;
            e = !!e,
            i.$el.toggleClass("loading", e),
            i.$(".button, page-form, .auth").toggleClass("disabled", e),
            t && i.$(".auth." + t).toggleClass("loading", e),
            i.$("input").attr("readonly", e);
        }
    });
}),
define("/templates/login/error.js", {
    name: "login/error",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return '<div class="arrow"></div> <p class="message" role="alert">' + r((o = t.message || e && e.message,
            typeof o === a ? o.call(e, {
                name: "message",
                hash: {},
                data: n
            }) : o)) + "</p>";
        },
        useData: !0
    }
}),
define("/styles/login/_error.js", {
    name: "login/_error",
    data: '#wunderlist-base .error{position:absolute;z-index:9999;border:1px solid #c2312a;max-width:210px;background:#d74e48;-webkit-border-radius:3px;border-radius:3px;padding:6px 12px;}#wunderlist-base .error .message{margin:0;font-size:12px;color:#fff;text-shadow:none;font-weight:bold}#wunderlist-base .error .arrow{position:absolute;border-style:solid;border-color:#c2312a transparent transparent transparent;border-width:7px;bottom:-14px;height:0;width:0;opacity:1;-ms-filter:none;filter:none;}#wunderlist-base .error .arrow:before{position:absolute;content:"";margin-left:-7px;bottom:-6px;border-style:solid;border-width:7px;border-color:#d74e48 transparent transparent transparent}'
}),
define("views/Login/ErrorView", ["application/runtime", "wunderbits/WBViewPresenter", "template!login/error", "style!login/_error"], function(e, t, i, n) {
    var o = e.$
      , a = t.prototype;
    return t.extend({
        className: "error popover",
        template: i,
        styles: [n],
        renderData: {
            message: null
        },
        initialize: function() {
            var e = this;
            if (a.initialize.apply(e, arguments),
            "string" != typeof e.options.errorKey)
                throw new Error("options.errorKey must be a string");
            if (!e.options.target || !e.options.target.tagName)
                throw new Error("options.target must be a DOM node element");
            e.options.inputType = e.options.target.getAttribute("type");
        },
        formatData: function(t) {
            var i = this;
            t || (t = {});
            var n = i.options.errorKey;
            return "empty_value" === n ? n = "text" === i.options.inputType ? "login_empty_" + i.options.target.getAttribute("name") : "login_empty_" + i.options.inputType : "too_short" === n ? n = "login_" + i.options.target.getAttribute("name") + "_too_short" : "invalid_email" === n && (n = "login_email_not_valid"),
            t.message = e.language.getText(n),
            t;
        },
        render: function() {
            var e = this
              , t = o(e.options.target);
            return e.bindTo(t, "blur keydown keyup change", e.destroy),
            t.after(a.render.call(e).el),
            e.renderPosition(),
            e;
        },
        renderPosition: function() {
            var e = this
              , t = o(e.options.target)
              , i = t.position()
              , n = t.offsetParent().outerHeight() - i.top;
            e.$el.css({
                left: i.left - 12,
                bottom: n + 10
            });
        }
    });
}),
define("wunderbits/data/tld", {
    list: ["aaa", "aarp", "abarth", "abb", "abbott", "abbvie", "abc", "able", "abogado", "abudhabi", "ac", "academy", "accenture", "accountant", "accountants", "acer", "aco", "active", "actor", "ad", "adac", "ads", "adult", "ae", "aeg", "aero", "aetna", "af", "afamilycompany", "afl", "africa", "africamagic", "ag", "agakhan", "agency", "ai", "aig", "aigo", "airbus", "airforce", "airtel", "akdn", "al", "alcon", "alfaromeo", "alibaba", "alipay", "allfinanz", "allfinanzberater", "allfinanzberatung", "allstate", "ally", "alsace", "alstom", "am", "amazon", "americanexpress", "americanfamily", "amex", "amfam", "amica", "amp", "amsterdam", "an", "analytics", "and", "android", "anquan", "ansons", "anthem", "antivirus", "anz", "ao", "aol", "apartments", "app", "apple", "aq", "aquarelle", "aquitaine", "ar", "arab", "aramco", "archi", "architect", "are", "army", "arpa", "art", "arte", "as", "asda", "asia", "associates", "astrium", "at", "athleta", "attorney", "au", "auction", "audi", "audible", "audio", "auspost", "author", "auto", "autoinsurance", "autos", "avery", "avianca", "aw", "aws", "ax", "axa", "axis", "az", "azure", "ba", "baby", "baidu", "banamex", "bananarepublic", "band", "bank", "banque", "bar", "barcelona", "barclaycard", "barclays", "barefoot", "bargains", "baseball", "basketball", "bauhaus", "bayern", "bb", "bbb", "bbc", "bbt", "bbva", "bcg", "bcn", "bd", "be", "beats", "beauty", "beer", "beknown", "bentley", "berlin", "best", "bestbuy", "bet", "bf", "bg", "bh", "bharti", "bi", "bible", "bid", "bike", "bing", "bingo", "bio", "biz", "bj", "black", "blackfriday", "blanco", "blockbuster", "blog", "bloomberg", "bloomingdales", "blue", "bm", "bms", "bmw", "bn", "bnl", "bnpparibas", "bo", "boats", "boehringer", "bofa", "bom", "bond", "boo", "book", "booking", "boots", "bosch", "bostik", "boston", "bot", "boutique", "box", "br", "bradesco", "bridgestone", "broadway", "broker", "brother", "brussels", "bs", "bt", "budapest", "bugatti", "buick", "build", "builders", "business", "buy", "buzz", "bv", "bw", "bway", "by", "bz", "bzh", "ca", "cab", "cadillac", "cafe", "cal", "call", "calvinklein", "cam", "camera", "camp", "canalplus", "cancerresearch", "canon", "capetown", "capital", "capitalone", "car", "caravan", "cards", "care", "career", "careers", "caremore", "carinsurance", "cars", "cartier", "casa", "case", "caseih", "cash", "cashbackbonus", "casino", "cat", "catalonia", "catering", "catholic", "cba", "cbn", "cbre", "cbs", "cc", "cd", "ceb", "center", "ceo", "cern", "cf", "cfa", "cfd", "cg", "ch", "chanel", "changiairport", "channel", "charity", "chartis", "chase", "chat", "chatr", "cheap", "chesapeake", "chevrolet", "chevy", "chintai", "chk", "chloe", "christmas", "chrome", "chrysler", "church", "ci", "cialis", "cimb", "cipriani", "circle", "cisco", "citadel", "citi", "citic", "city", "cityeats", "ck", "cl", "claims", "cleaning", "click", "clinic", "clinique", "clothing", "cloud", "club", "clubmed", "cm", "cn", "co", "coach", "codes", "coffee", "college", "cologne", "com", "comcast", "commbank", "community", "company", "compare", "computer", "comsec", "condos", "connectors", "construction", "consulting", "contact", "contractors", "cooking", "cookingchannel", "cool", "coop", "corp", "corsica", "country", "coupon", "coupons", "courses", "cpa", "cr", "credit", "creditcard", "creditunion", "cricket", "crown", "crs", "cruise", "cruises", "csc", "cu", "cuisinella", "cv", "cw", "cx", "cy", "cymru", "cyou", "cz", "dabur", "dad", "dance", "data", "date", "dating", "datsun", "day", "dclk", "dds", "de", "deal", "dealer", "deals", "degree", "delivery", "dell", "delmonte", "deloitte", "delta", "democrat", "dental", "dentist", "desi", "design", "deutschepost", "dev", "dhl", "diamonds", "diet", "digikey", "digital", "direct", "directory", "discount", "discover", "dish", "diy", "dj", "dk", "dm", "dnb", "dnp", "do", "docomo", "docs", "doctor", "dodge", "dog", "doha", "domains", "doosan", "dot", "dotafrica", "download", "drive", "dstv", "dtv", "dubai", "duck", "dunlop", "duns", "dupont", "durban", "dvag", "dvr", "dwg", "dz", "earth", "eat", "ec", "eco", "ecom", "edeka", "edu", "education", "ee", "eg", "email", "emerck", "emerson", "energy", "engineer", "engineering", "enterprises", "epost", "epson", "equipment", "er", "ericsson", "erni", "es", "esq", "est", "estate", "esurance", "et", "etisalat", "eu", "eurovision", "eus", "events", "everbank", "exchange", "expert", "exposed", "express", "extraspace", "fage", "fail", "fairwinds", "faith", "family", "fan", "fans", "farm", "farmers", "fashion", "fast", "fedex", "feedback", "ferrari", "ferrero", "fi", "fiat", "fidelity", "fido", "film", "final", "finance", "financial", "financialaid", "finish", "fire", "firestone", "firmdale", "fish", "fishing", "fit", "fitness", "fj", "fk", "flickr", "flights", "flir", "florist", "flowers", "fls", "flsmidth", "fly", "fm", "fo", "foo", "food", "foodnetwork", "football", "ford", "forex", "forsale", "forum", "foundation", "fox", "fr", "free", "fresenius", "frl", "frogans", "frontdoor", "frontier", "ftr", "fujitsu", "fujixerox", "fun", "fund", "furniture", "futbol", "fyi", "ga", "gal", "gallery", "gallo", "gallup", "game", "games", "gap", "garden", "garnier", "gay", "gb", "gbiz", "gcc", "gd", "gdn", "ge", "gea", "gecompany", "ged", "gent", "genting", "geo", "george", "gf", "gg", "ggee", "gh", "gi", "gift", "gifts", "gives", "giving", "gl", "glade", "glass", "gle", "glean", "global", "globalx", "globo", "gm", "gmail", "gmbh", "gmc", "gmo", "gmx", "gn", "godaddy", "gold", "goldpoint", "golf", "goo", "goodhands", "goodyear", "goog", "google", "gop", "got", "gotv", "gov", "gp", "gq", "gr", "grainger", "graphics", "gratis", "gree", "green", "gripe", "grocery", "group", "gs", "gt", "gu", "guardian", "guardianlife", "guardianmedia", "gucci", "guge", "guide", "guitars", "guru", "gw", "gy", "hair", "halal", "hamburg", "hangout", "haus", "hbo", "hdfc", "hdfcbank", "health", "healthcare", "heart", "heinz", "help", "helsinki", "here", "hermes", "hgtv", "hilton", "hiphop", "hisamitsu", "hitachi", "hiv", "hk", "hkt", "hm", "hn", "hockey", "holdings", "holiday", "home", "homedepot", "homegoods", "homes", "homesense", "honda", "honeywell", "horse", "hospital", "host", "hosting", "hot", "hoteis", "hotel", "hoteles", "hotels", "hotmail", "house", "how", "hr", "hsbc", "ht", "htc", "hu", "hughes", "hyatt", "hyundai", "ibm", "icbc", "ice", "icu", "id", "idn", "ie", "ieee", "ifm", "iinet", "ikano", "il", "im", "imamat", "imdb", "immo", "immobilien", "in", "inc", "indians", "industries", "infiniti", "info", "infosys", "infy", "ing", "ink", "institute", "insurance", "insure", "int", "intel", "international", "intuit", "investments", "io", "ipiranga", "iq", "ir", "ira", "irish", "is", "iselect", "islam", "ismaili", "ist", "istanbul", "it", "itau", "itv", "iveco", "iwc", "jaguar", "java", "jcb", "jcp", "je", "jeep", "jetzt", "jewelry", "jio", "jlc", "jll", "jm", "jmp", "jnj", "jo", "jobs", "joburg", "jot", "joy", "jp", "jpmorgan", "jpmorganchase", "jprs", "juegos", "juniper", "jupiter", "justforu", "kaufen", "kddi", "ke", "kerastase", "kerryhotels", "kerrylogisitics", "kerryproperties", "ketchup", "kfh", "kg", "kh", "ki", "kia", "kid", "kids", "kiehls", "kim", "kinder", "kindle", "kitchen", "kiwi", "km", "kn", "koeln", "komatsu", "konami", "kone", "kosher", "kp", "kpmg", "kpn", "kr", "krd", "kred", "ksb", "kuokgroup", "kw", "ky", "kyknet", "kyoto", "kz", "la", "lacaixa", "ladbrokes", "lamborghini", "lamer", "lancaster", "lancia", "lancome", "land", "landrover", "lanxess", "lasalle", "lat", "latino", "latrobe", "law", "lawyer", "lb", "lc", "lds", "le", "lease", "leclerc", "lefrak", "legal", "lego", "lexus", "lgbt", "li", "liaison", "lidl", "life", "lifeinsurance", "lifestyle", "lighting", "like", "lilly", "limited", "limo", "lincoln", "linde", "link", "lipsy", "live", "livestrong", "living", "lixil", "lk", "llc", "llp", "ln", "loan", "loans", "locker", "locus", "loft", "lol", "london", "loreal", "lotte", "lotto", "love", "lpl", "lplfinancial", "lr", "ls", "lt", "ltd", "ltda", "lu", "lunar", "lundbeck", "lupin", "luxe", "luxury", "lv", "ly", "ma", "macys", "madrid", "maif", "mail", "maison", "makeup", "man", "management", "mango", "map", "market", "marketing", "markets", "marriott", "mars", "marshalls", "maserati", "matrix", "mattel", "maybelline", "mba", "mc", "mcd", "mcdonalds", "mckinsey", "md", "me", "med", "media", "medical", "meet", "melbourne", "meme", "memorial", "men", "menu", "meo", "merck", "merckmsd", "metlife", "mg", "mh", "miami", "microsoft", "mih", "mii", "mil", "mini", "mint", "mit", "mitek", "mitsubishi", "mk", "ml", "mlb", "mls", "mm", "mma", "mn", "mnet", "mo", "mobi", "mobile", "mobily", "moda", "moe", "moi", "mom", "monash", "money", "monster", "montblanc", "moon", "mopar", "mormon", "mortgage", "moscow", "moto", "motorcycles", "mov", "movie", "movistar", "mozaic", "mp", "mq", "mr", "mrmuscle", "mrporter", "ms", "msd", "mt", "mtn", "mtpc", "mtr", "mu", "multichoice", "museum", "music", "mutual", "mutualfunds", "mutuelle", "mv", "mw", "mx", "my", "mz", "mzansimagic", "na", "nab", "nadex", "nagoya", "name", "naspers", "nationwide", "natura", "navy", "nba", "nc", "ne", "nec", "neptune", "net", "netaporter", "netbank", "netflix", "network", "neustar", "new", "newholland", "news", "next", "nextdirect", "nexus", "nf", "nfl", "ng", "ngo", "nhk", "ni", "nico", "nike", "nikon", "ninja", "nissan", "nissay", "nl", "no", "nokia", "northlandinsurance", "northwesternmutual", "norton", "now", "nowruz", "nowtv", "np", "nr", "nra", "nrw", "ntt", "nu", "nyc", "nz", "obi", "observer", "off", "office", "okinawa", "olayan", "olayangroup", "oldnavy", "ollo", "olympus", "om", "omega", "one", "ong", "onl", "online", "onyourside", "ooo", "open", "oracle", "orange", "org", "organic", "orientexpress", "origins", "osaka", "otsuka", "ott", "overheidnl", "ovh", "pa", "page", "pamperedchef", "panasonic", "panerai", "paris", "pars", "partners", "parts", "party", "passagens", "patagonia", "patch", "pay", "payu", "pccw", "pe", "persiangulf", "pet", "pets", "pf", "pfizer", "pg", "ph", "pharmacy", "phd", "philips", "phone", "photo", "photography", "photos", "physio", "piaget", "pics", "pictet", "pictures", "pid", "pin", "ping", "pink", "pioneer", "piperlime", "pitney", "pizza", "pk", "pl", "place", "play", "playstation", "plumbing", "plus", "pluto", "pm", "pn", "pnc", "pohl", "poker", "politie", "polo", "porn", "post", "pr", "pramerica", "praxi", "press", "prime", "pro", "prod", "productions", "prof", "progressive", "promo", "properties", "property", "protection", "pru", "prudential", "ps", "pt", "pub", "pw", "pwc", "py", "qa", "qpon", "qtel", "quebec", "quest", "qvc", "racing", "radio", "raid", "ram", "re", "read", "realestate", "realtor", "realty", "recipes", "red", "redken", "redstone", "redumbrella", "rehab", "reise", "reisen", "reit", "reliance", "ren", "rent", "rentals", "repair", "report", "republican", "rest", "restaurant", "retirement", "review", "reviews", "rexroth", "rich", "richardli", "ricoh", "rightathome", "ril", "rio", "rip", "rmit", "ro", "rocher", "rocks", "rockwool", "rodeo", "rogers", "roma", "room", "rs", "rsvp", "ru", "rugby", "ruhr", "run", "rw", "rwe", "ryukyu", "sa", "saarland", "safe", "safety", "safeway", "sakura", "sale", "salon", "samsclub", "samsung", "sandvik", "sandvikcoromant", "sanofi", "sap", "sapo", "sapphire", "sarl", "sas", "saturn", "save", "saxo", "sb", "sbi", "sbs", "sc", "sca", "scb", "schaeffler", "schmidt", "scholarships", "school", "schule", "schwarz", "schwarzgroup", "science", "scjohnson", "scor", "scot", "sd", "se", "search", "seat", "secure", "security", "seek", "select", "sener", "services", "ses", "seven", "sew", "sex", "sexy", "sfr", "sg", "sh", "shangrila", "sharp", "shaw", "shell", "shia", "shiksha", "shoes", "shop", "shopping", "shopyourway", "shouji", "show", "showtime", "shriram", "si", "silk", "sina", "singles", "site", "sj", "sk", "ski", "skin", "skolkovo", "sky", "skydrive", "skype", "sl", "sling", "sm", "smart", "smile", "sn", "sncf", "so", "soccer", "social", "softbank", "software", "sohu", "solar", "solutions", "song", "sony", "soy", "spa", "space", "spiegel", "sport", "sports", "spot", "spreadbetting", "sr", "srl", "srt", "st", "stada", "staples", "star", "starhub", "statebank", "statefarm", "statoil", "stc", "stcgroup", "stockholm", "storage", "store", "stream", "stroke", "studio", "study", "style", "su", "sucks", "supersport", "supplies", "supply", "support", "surf", "surgery", "suzuki", "sv", "svr", "swatch", "swiftcover", "swiss", "sx", "sy", "sydney", "symantec", "systems", "sz", "tab", "taipei", "talk", "taobao", "target", "tata", "tatamotors", "tatar", "tattoo", "tax", "taxi", "tc", "tci", "td", "tdk", "team", "tech", "technology", "tel", "telecity", "telefonica", "temasek", "tennis", "terra", "teva", "tf", "tg", "th", "thai", "thd", "theater", "theatre", "theguardian", "thehartford", "tiaa", "tickets", "tienda", "tiffany", "tips", "tires", "tirol", "tj", "tjmaxx", "tjx", "tk", "tkmaxx", "tl", "tm", "tmall", "tn", "to", "today", "tokyo", "tools", "top", "toray", "toshiba", "total", "tour", "tours", "town", "toyota", "toys", "tp", "tr", "trade", "tradershotels", "trading", "training", "transformers", "translations", "transunion", "travel", "travelchannel", "travelers", "travelersinsurance", "travelguard", "trust", "trv", "tt", "tube", "tui", "tunes", "tushu", "tv", "tvs", "tw", "tz", "ua", "ubank", "ubs", "uconnect", "ug", "uk", "ultrabook", "ummah", "unicom", "unicorn", "university", "uno", "uol", "ups", "uranus", "us", "uy", "uz", "va", "vacations", "vana", "vanguard", "vanish", "vc", "ve", "vegas", "ventures", "venus", "verisign", "vermögensberater", "vermögensberatung", "versicherung", "vet", "vg", "vi", "viajes", "video", "vig", "viking", "villas", "vin", "vip", "virgin", "visa", "vision", "vista", "vistaprint", "viva", "vivo", "vlaanderen", "vn", "vodka", "volkswagen", "volvo", "vons", "vote", "voting", "voto", "voyage", "vu", "vuelos", "wales", "walmart", "walter", "wang", "wanggou", "warman", "watch", "watches", "weather", "weatherchannel", "web", "webcam", "weber", "webjet", "webs", "website", "wed", "wedding", "weibo", "weir", "wf", "whoswho", "wien", "wiki", "williamhill", "wilmar", "win", "windows", "wine", "winners", "wme", "wolterskluwer", "woodside", "work", "works", "world", "wow", "ws", "wtc", "wtf", "xbox", "xerox", "xfinity", "xihuan", "xin", "xperia", "xxx", "xyz", "yachts", "yahoo", "yamaxun", "yandex", "ye", "yellowpages", "yodobashi", "yoga", "yokohama", "you", "youtube", "yt", "yun", "za", "zappos", "zara", "zero", "zip", "zippo", "zm", "zone", "zuerich", "zulu", "zw", "广东", "дети", "мон", "москва", "онлайн", "орг", "рус", "рф", "сайт", "срб", "укр", "қаз", "الاردن", "الجزائر", "السعودية", "السعوديه", "السعودیة", "السعودیۃ", "المغرب", "اليمن", "امارات", "ايران", "ایران", "بازار", "بھارت", "تونس", "سوريا", "سورية", "شبكة", "عمان", "فلسطين", "قطر", "مصر", "مليسيا", "موقع", "भारत", "संगठन", "বাংলা", "ভারত", "ਭਾਰਤ", "ભારત", "இந்தியா", "இலங்கை", "சிங்கப்பூர்", "భారత్", "ලංකා", "ไทย", "გე", "みんな", "世界", "中信", "中国", "中國", "中文网", "企业", "佛山", "八卦", "公司", "公益", "台湾", "台灣", "商城", "商店", "商标", "在线", "娱乐", "我爱你", "手机", "政务", "政府", "新加坡", "机构", "游戏", "移动", "组织机构", "网址", "网店", "网络", "臺灣", "集团", "香港", "삼성", "한국"]
}),
define("wunderbits/helpers/tokenizer", ["project!core", "wunderbits/data/tld"], function(e, t) {
    function i() {
        throw new Error("not implemented");
    }
    var n = t.list
      , o = /\.(\w{2,13})(?:\/|:|$)/;
    return e.WBSingleton.extend({
        createNode: i,
        isValidMatch: function(e) {
            var t = this
              , i = t.validationRegExp;
            if (!i)
                return !0;
            if (!e || !t.validationRegExp.test(e))
                return !1;
            if (t.validateTLD) {
                var a = e.match(o);
                return !!(a && a[1] && n.indexOf(a[1].toLowerCase()) >= 0);
            }
            return !0;
        },
        extractTokens: function(e) {
            if (e && e.length) {
                var t = this
                  , i = []
                  , n = 0;
                return e.replace(t.extractionRegExp, function(e, o, a) {
                    var r = t.invalidLeadingChars;
                    if (!(o > 0 && r && r.test(a[o - 1]))) {
                        if (o > 0) {
                            var s = a.substring(n, o);
                            n += s.length,
                            i.push(s);
                        }
                        i.push(e),
                        n += e.length;
                    }
                }),
                n > 0 && n < e.length && i.push(e.substring(n)),
                i;
            }
        },
        tokenize: function(e) {
            var t = this;
            if (!e.parentNode || "a" !== e.parentNode.nodeName.toLowerCase()) {
                var i = e.nodeValue
                  , n = t.extractTokens(i);
                if (n && n.length && (1 !== n.length || t.isValidMatch(n[0]))) {
                    for (var o, a = []; n.length; )
                        o = n.shift(),
                        o.length && (t.isValidMatch(o) ? a.push(t.createNode(o)) : o && a.push(document.createTextNode(o)));
                    return a;
                }
            }
        }
    });
}),
define("wunderbits/helpers/email", ["./tokenizer"], function(e) {
    return e.extend({
        validateTLD: !0,
        invalidLeadingChars: /[#=@&]/,
        validationRegExp: /^[^\s@＠=]+[@|＠][^\.\s@＠]+(\.[^\.\s@＠]+)+$/,
        extractionRegExp: /[a-z0-9][\/\(\)\{\}\[\]\-\.\+\w]*[@|＠][a-z0-9][\/\(\)\{\}\[\]\-\.\+\w]*\.[a-z]{2,6}/gi,
        createNode: function(e) {
            var t = document.createElement("a");
            return t.className = "email linkout",
            t.target = "_blank",
            t.href = "mailto:" + e,
            t.textContent = e,
            t;
        },
        isValidEmail: function(e) {
            return this.isValidMatch(e);
        },
        extractEmails: function(e) {
            return this.extractTokens(e);
        }
    });
}),
define("vendor/mailcheck", ["vendor/jquery"], function(e) {
    var t = {
        mailcheck: {
            threshold: 3,
            defaultDomains: ["yahoo.com", "google.com", "hotmail.com", "gmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.net", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "sbcglobal.net", "att.net", "gmx.com", "mail.com"],
            defaultTopLevelDomains: ["co.uk", "com", "net", "org", "info", "edu", "gov", "mil"],
            run: function(e) {
                e.domains = e.domains || t.mailcheck.defaultDomains,
                e.topLevelDomains = e.topLevelDomains || t.mailcheck.defaultTopLevelDomains,
                e.distanceFunction = e.distanceFunction || t.sift3Distance;
                var i = t.mailcheck.suggest(encodeURI(e.email), e.domains, e.topLevelDomains, e.distanceFunction);
                i ? e.suggested && e.suggested(i) : e.empty && e.empty();
            },
            suggest: function(e, t, i, n) {
                e = e.toLowerCase();
                var o = this.splitEmail(e)
                  , a = this.findClosestDomain(o.domain, t, n);
                if (a) {
                    if (a != o.domain)
                        return {
                            address: o.address,
                            domain: a,
                            full: o.address + "@" + a
                        };
                } else {
                    var r = this.findClosestDomain(o.topLevelDomain, i);
                    if (o.domain && r && r != o.topLevelDomain) {
                        var s = o.domain;
                        return a = s.substring(0, s.lastIndexOf(o.topLevelDomain)) + r,
                        {
                            address: o.address,
                            domain: a,
                            full: o.address + "@" + a
                        };
                    }
                }
                return !1;
            },
            findClosestDomain: function(e, t, i) {
                var n, o = 99, a = null;
                if (!e || !t)
                    return !1;
                i || (i = this.sift3Distance);
                for (var r = 0; r < t.length; r++) {
                    if (e === t[r])
                        return e;
                    n = i(e, t[r]),
                    o > n && (o = n,
                    a = t[r]);
                }
                return o <= this.threshold && null !== a ? a : !1;
            },
            sift3Distance: function(e, t) {
                if (null == e || 0 === e.length)
                    return null == t || 0 === t.length ? 0 : t.length;
                if (null == t || 0 === t.length)
                    return e.length;
                for (var i = 0, n = 0, o = 0, a = 0, r = 5; i + n < e.length && i + o < t.length; ) {
                    if (e.charAt(i + n) == t.charAt(i + o))
                        a++;
                    else {
                        n = 0,
                        o = 0;
                        for (var s = 0; r > s; s++) {
                            if (i + s < e.length && e.charAt(i + s) == t.charAt(i)) {
                                n = s;
                                break;
                            }
                            if (i + s < t.length && e.charAt(i) == t.charAt(i + s)) {
                                o = s;
                                break;
                            }
                        }
                    }
                    i++;
                }
                return (e.length + t.length) / 2 - a;
            },
            splitEmail: function(e) {
                var t = e.split("@");
                if (t.length < 2)
                    return !1;
                for (var i = 0; i < t.length; i++)
                    if ("" === t[i])
                        return !1;
                var n = t.pop()
                  , o = n.split(".")
                  , a = "";
                if (0 == o.length)
                    return !1;
                if (1 == o.length)
                    a = o[0];
                else {
                    for (var i = 1; i < o.length; i++)
                        a += o[i] + ".";
                    o.length >= 2 && (a = a.substring(0, a.length - 1));
                }
                return {
                    topLevelDomain: a,
                    domain: n,
                    address: t.join("@")
                };
            }
        }
    };
    return e && !function(e) {
        e.fn.mailcheck = function(e) {
            var i = this;
            if (e.suggested) {
                var n = e.suggested;
                e.suggested = function(e) {
                    n(i, e);
                }
                ;
            }
            if (e.empty) {
                var o = e.empty;
                e.empty = function() {
                    o.call(null, i);
                }
                ;
            }
            e.email = this.val(),
            t.mailcheck.run(e);
        }
        ;
    }(e),
    t;
}),
define("views/Login/ValidationController", ["application/runtime", "wunderbits/WBViewController", "wunderbits/helpers/email", "vendor/mailcheck", "wunderbits/data/tld"], function(e, t, i, n, o) {
    var a = e.$
      , r = n.mailcheck
      , s = r.defaultDomains.slice();
    s.push("6wunderkinder.com");
    var l = r.defaultTopLevelDomains.slice();
    l.push.apply(l, o.list);
    var c = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];
    return t.extend({
        "implements": {
            "blur:input": "check"
        },
        correct: function(e) {
            var t = this;
            e = e && e.target || e;
            var i = a(e)
              , o = i.attr("type")
              , r = i.val()
              , c = t.deferred();
            if ("email" === o) {
                var d = r.split("@");
                if ("6w" === d[1]) {
                    if (r = d[0] + "@6wunderkinder",
                    t.corrected || (t.corrected = {}),
                    t.corrected[r] === e)
                        return;
                    t.corrected[r] = e,
                    n.mailcheck.run({
                        email: r,
                        domains: s,
                        topLevelDomains: l,
                        suggested: function(e) {
                            i.val(e.full),
                            c.resolve(e.full);
                        },
                        empty: function() {
                            c.resolve();
                        }
                    });
                }
            } else
                c.resolve();
            return c.promise();
        },
        validate: function(e) {
            var t = this;
            e = e && e.target || e;
            var i = a(e)
              , n = i.attr("type")
              , o = i.val()
              , r = t.deferred();
            return "file" === n && r.resolve(),
            "email" === n ? t.validateEmail(e, o, r) : "password" === n ? t.validatePassword(e, o, r) : t.validateLength(e, o, r),
            r.promise();
        },
        validatePassword: function(e, t, i) {
            var n = this
              , o = n.view.validatePassword
              , a = n.hasPasswordVariety(t)
              , r = n.passwordContainsEmail(t)
              , s = !a || r;
            return o && s ? i.reject("too_short", e) : void n.validateLength(e, t, i);
        },
        passwordContainsEmail: function(e) {
            var t = this
              , i = t.view.$("input[type=email]").val()
              , n = i.split(/@/)[0];
            return n && e && e.indexOf(n) > -1 ? !0 : !1;
        },
        hasPasswordVariety: function(e) {
            var t = 0;
            return c.forEach(function(i) {
                i.test(e) && (t += 1);
            }),
            t >= 2;
        },
        validateEmail: function(e, t, n) {
            i.isValidEmail(t) ? n.resolve(t, e) : n.reject("invalid_email", e);
        },
        validateLength: function(e, t, i) {
            var n = e.getAttribute("data-validate-length") || 1;
            t ? t.length < n ? i.reject("too_short", e) : i.resolve(t, e) : i.reject("empty_value", e);
        },
        validateList: function(e) {
            function t() {
                var a = e.shift();
                i.validate(a).fail(function(e, t) {
                    i.view.renderError(e, t),
                    n.reject(e, t);
                }, i).done(function(i) {
                    var r = a.getAttribute("name");
                    o[r] = i,
                    e.length && t() || n.resolve(o);
                }, i);
            }
            var i = this
              , n = i.deferred()
              , o = {};
            return t(),
            n.promise();
        },
        check: function(e) {
            var t = this;
            e = e && e.target || e;
            var i = t.view.options.correctOnBlur ? t.correct(e) : t.deferred().resolve();
            t.when(i).then(function() {
                t.view.options.validateOnBlur && t.validate(e).fail(t.view.renderError);
            });
        }
    });
}),
define("wunderbits/data/keycodes", {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    shift: 16,
    spacebar: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46,
    zero: 48,
    nine: 57,
    padZero: 96,
    padNine: 105,
    dash: 189,
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    20: "capslock",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "ins",
    46: "del",
    91: "meta",
    93: "meta",
    224: "meta",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
}),
define("views/Login/FormViewController", ["application/runtime", "views/Login/ValidationController", "wunderbits/data/keycodes"], function(e, t, i) {
    var n = e.$;
    return t.extend({
        "implements": {
            "click:submit": "trySubmitForm",
            "change:input": "checkInputKeys",
            before: "beforePopOrPush",
            visible: "bindGlobalKeys",
            hidden: "unbindGlobalKeys"
        },
        viewMadeVisible: function() {
            var e = this;
            e.view.state.email && e.view.renderInputValue(e.view.getInput(".email"), e.view.state.email),
            e.view.state.name && e.view.renderInputValue(e.view.getInput(".name"), e.view.state.name),
            e.view.renderInputValue(null, null, !0);
        },
        beforePopOrPush: function() {
            var e = this;
            e.view.state.email = e.view.$(e.view.getInput(".email")).val();
        },
        bindGlobalKeys: function() {
            var t = this;
            t.view.globalKeysBind || (t.view.globalKeysBind = t.bindTo(n(e.global.document), "keyup", t.checkGlobalKeys));
        },
        unbindGlobalKeys: function() {
            var e = this;
            e.view.globalKeysBind && e.unbindFrom(e.view.globalKeysBind);
        },
        checkGlobalKeys: function(e) {
            var t = this;
            e.which === i.enter && e.target.classList.contains("submit") ? t.trySubmitForm() : e.which === i.esc && t.cancelForm();
        },
        checkInputKeys: function(e) {
            var t = this
              , o = n(e.target);
            t.view.renderSubmitEnabled(!0),
            e.which === i.enter ? t.validate(e.target).done(function() {
                t.stepToNext(e.target);
            }).fail(t.view.renderError, t.view) : e.which === i.esc && o.val("").focus(),
            e.stopPropagation();
        },
        stepToNext: function(e) {
            var t = this
              , i = t.view.$("input")
              , o = i.index(e)
              , a = o + 1
              , r = i[a];
            r ? n(r).select() : (n(e).blur(),
            t.trySubmitForm());
        },
        submitForm: function() {
            var e = this
              , t = e.deferred();
            return t.resolve().promise();
        },
        cancelForm: function() {},
        trySubmitForm: function() {
            var t = this
              , i = t.view.$("input")
              , n = i.length && t.validateList(i.toArray()) || t.deferred().resolve();
            n.done(function(i) {
                function n(e) {
                    t.view.renderError(e),
                    t.unbindFrom(o),
                    t.view.renderSubmitLoading(!1);
                }
                t.view.renderSubmitLoading(!0);
                var o = t.bindTo(e.user, "error", n);
                t.submitForm(i).done(function() {
                    t.destroyed || (t.unbindFrom(o),
                    t.view.renderSubmitLoading(!1));
                }).fail(n);
            }).fail(function() {
                t.view.renderSubmitEnabled(!1);
            });
        }
    });
}),
define("/styles/login/_form.js", {
    name: "login/_form",
    data: "#wunderlist-base .content{background:#fff;-webkit-border-radius:6px;border-radius:6px;border:1px solid #e0e0e0;-webkit-border-radius:3px;border-radius:3px}#wunderlist-base .separator{position:relative;padding:14px;-webkit-box-shadow:inset 0 -1px 0 #e0e0e0;box-shadow:inset 0 -1px 0 #e0e0e0;}#wunderlist-base .separator.noline{-webkit-box-shadow:none;box-shadow:none;}#wunderlist-base .separator.noline.no-bottom-padding{padding-bottom:0}#wunderlist-base .separator.noline.no-top-padding{padding-top:0}#wunderlist-base .separator:last-child{-webkit-box-shadow:none;box-shadow:none}"
}),
define("views/Login/FormView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Login/ErrorView", "views/Login/FormViewController", "style!login/_form", "style!login/_error"], function(e, t, i, n, o, a) {
    var r = t.prototype;
    return t.extend({
        renderData: {
            isChromeApp: e.env.isChromeApp()
        },
        formatData: function(t) {
            return t = t || {},
            t.isChromeApp = e.env.isChromeApp(),
            t;
        },
        options: {
            validateOnBlur: !1,
            correctOnBlur: !0,
            showBackButton: !0
        },
        className: "login-form",
        styles: [o, a],
        "implements": [n],
        emits: {
            "keyup input": "change:input",
            "blur input": "blur:input",
            "click .submit": "click:submit"
        },
        getInput: function(e) {
            var t = this;
            return t.$("input" + (e || ""))[0];
        },
        render: function() {
            var e = this;
            return r.render.apply(e, arguments),
            e.renderLocalized(),
            e.bindTo(e, "externalAuth:denied", e.renderError),
            e;
        },
        renderError: function(e, t) {
            var n = this;
            "api_error_account_already_exists" === e && (t = n.$("input.email")[0]),
            t = t || n.$("input")[0],
            n.$(t).select(),
            n.addSubview(new i({
                errorKey: e,
                target: t
            }), "error").render();
        },
        renderInputValue: function(e, t, i) {
            var n = this
              , o = n.$(e || n.getInput())
              , a = o.attr("type");
            t && "file" !== a && o.val(t),
            i && o.select();
        },
        renderSubmitEnabled: function(e) {
            var t = this;
            t.$(".submit").toggleClass("disabled", !e);
        },
        renderSubmitLoading: function(t) {
            var i = this;
            i.destroyed || (i.$(".submit").toggleClass("loading", t),
            i.renderSubmitEnabled(!t),
            e.trigger("login:enable", !t));
        }
    });
}),
define("views/Login/SignUpController", ["application/runtime", "views/Login/FormViewController", "project!core"], function(e, t, i) {
    var n = i.WBDeferred;
    return t.extend({
        "implements": {
            "click:signin": "openSignIn",
            "click:microsoft": "openMicrosoftSignin"
        },
        submitForm: function(t) {
            var i = this
              , o = new n();
            return e.user.register(t, {
                success: function() {
                    o.resolve(),
                    i.openApp();
                }
            }),
            o.promise();
        },
        openApp: function() {
            var t = this
              , i = t.view
              , n = i.state.path || "lists/inbox";
            n.indexOf("setup") < 0 && (n = "setup/" + n),
            "main" === e.application ? e.trigger("route:" + n) : e.reload("/" + n, !1);
        },
        openMicrosoftSignin: function(e) {
            e && e.preventDefault(),
            this.view.trigger("open", "microsoft-signin");
        },
        openSignIn: function(e) {
            e && e.preventDefault(),
            this.view.trigger("sync", ["selector", "login"]);
        }
    });
}),
define("wunderbits/views/WBFileSelectorView", ["../lib/dependencies", "../WBView"], function(e, t) {
    function i(e) {
        return e = e.originalEvent || e,
        e.preventDefault(),
        e.stopPropagation(),
        !1;
    }
    function n(e) {
        function t() {
            s.trigger("drop:stop");
        }
        function n(e) {
            var t, i = e.originalEvent, n = i.dataTransfer, o = !1;
            try {
                t = n && n.types;
            } catch (a) {
                console.warn(a);
            }
            if (t = t || [],
            t = Array.prototype.slice.call(t),
            t.length) {
                var r = -1 !== t.indexOf("Files")
                  , s = -1 !== t.indexOf("text/html")
                  , l = -1 !== t.indexOf("text/plain") || -1 !== t.indexOf("Text");
                o = r || s || l;
            }
            return o;
        }
        function o() {
            s.on("dragstart", function(e) {
                n(e) && s.trigger("drag:origin", e.target);
            }),
            s.on("dragover", function(e) {
                n(e) && (s.trigger("drop:start"),
                i(e),
                clearTimeout(r));
            }),
            s.on("drop", function(e) {
                t(),
                i(e);
            }),
            s.on("dragleave", function(e) {
                n(e) && (e = e.originalEvent || e,
                r = setTimeout(t, 200));
            }),
            s.bindDrops = null;
        }
        var r, s = a(e);
        return o(),
        s;
    }
    var o = e._
      , a = e.$
      , r = t.prototype
      , s = '<input type="file" multiple style="display:none" />'
      , l = t.extend({
        input: null,
        events: {
            click: "select"
        },
        initialize: function(e) {
            var t = this;
            return e = e || {},
            r.initialize.call(t),
            t.dropTarget = e.dropTarget && e.dropTarget.length ? e.dropTarget : t.$el,
            t.dragAndDropWrapper = n(t.dropTarget),
            e.blocker && (t.blocker = e.blocker),
            e.urlBlocker && (t.urlBlocker = e.urlBlocker),
            t._bindDropEvents(),
            t;
        },
        select: function(e) {
            var t = this;
            t.blocker && t.blocker() || e && a(e.target).is("input[type=file]") || (t.input = a(s),
            t.$el.append(t.input),
            t.input.on("change", function(e) {
                t._filesSelected(e);
            }),
            t.input.click());
        },
        _filesSelected: function(e) {
            var t = this;
            t.input && (t.input.off("change", t._filesSelected),
            t.input.remove(),
            t.input = null);
            var i = e.target.files;
            i.length && t.trigger("selected:files", i);
        },
        _bindDropEvents: function() {
            var e = this;
            e.bindTo(e.dragAndDropWrapper, "drop:start", e._dropStart),
            e.bindTo(e.dragAndDropWrapper, "drop:stop", e._dropStop),
            e.bindTo(e.dragAndDropWrapper, "drop", e._drop),
            e.bindTo(e.dragAndDropWrapper, "drag:origin", e._setOrigin);
        },
        _setOrigin: function(e, t) {
            var i = this;
            i.dropOrigin = t;
        },
        _dropStart: function() {
            var e = this
              , t = !e.urlBlocker || -1 === window.location.hash.indexOf(e.urlBlocker);
            t && e.dropTarget.addClass("drop");
        },
        _dropStop: function() {
            var e = this;
            e.dropTarget.removeClass("drop");
        },
        _drop: function(e) {
            var t = this;
            if (i(e),
            e = e.originalEvent,
            t.dropOrigin)
                return t.dropOrigin = null,
                void t._dropStop();
            t.dropTarget.removeClass("drop");
            var n = e.dataTransfer
              , a = n.files
              , r = n.items;
            if (a.length > 0) {
                if (r && "webkitGetAsEntry"in r[0]) {
                    var s = [];
                    o.each(r, function(e, t) {
                        var i = e.webkitGetAsEntry();
                        i && i.isFile && s.push(a[t]);
                    }),
                    a = s;
                } else
                    a = o.filter(a, function(e) {
                        return e.size > 0;
                    });
                a.length && t.trigger("selected:files", a);
            } else
                t._dropText(n, e);
        },
        _dropText: function(e, t) {
            var i = this;
            e.dropEffect = "copy";
            try {
                var n = t.dataTransfer.getData("text/plain");
                !!n && i.trigger("dropped:text", n);
            } catch (o) {
                console.warn(o);
            }
            try {
                var a = t.dataTransfer.getData("text/html");
                !!a && i.trigger("dropped:html", a);
            } catch (o) {
                console.warn(o);
            }
        }
    });
    return l;
}),
define("/templates/login/avatar-upload.js", {
    name: "login/avatar-upload",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="icon-login picture choose"> <img class="hidden" /> <span></span> </div> <div class="drop-zone"></div> <div class="avatar-upload-el"> </div>';
        },
        useData: !0
    }
}),
define("/styles/login/_avatar-upload.js", {
    name: "login/_avatar-upload",
    data: '#wunderlist-base .avatar-upload{position:relative;cursor:pointer;}#wunderlist-base .avatar-upload .picture{overflow:hidden}#wunderlist-base .avatar-upload .avatar-upload-el{display:none}#wunderlist-base .avatar-upload input{left:auto !important;right:0 !important;z-index:999}#wunderlist-base .avatar-upload img{height:66px;width:66px;margin:0 -100%;}#wunderlist-base .avatar-upload img.landscape{width:auto !important}#wunderlist-base .avatar-upload img.portrait{height:auto !important}#wunderlist-base .avatar-upload .choose.drop + .drop-zone{display:block}#wunderlist-base .avatar-upload .drop-zone{display:none;position:absolute;top:10px;left:50%;margin-left:-33px;height:66px;width:66px;background:rgba(0,0,0,0.2);z-index:9999;-webkit-border-radius:2px;border-radius:2px}#wunderlist-base .avatar-upload.loading .choose{background:-webkit-linear-gradient(#ececec, #e1e1e1) !important;background:-moz-linear-gradient(#ececec, #e1e1e1) !important;background:-o-linear-gradient(#ececec, #e1e1e1) !important;background:-ms-linear-gradient(#ececec, #e1e1e1) !important;background:linear-gradient(#ececec, #e1e1e1) !important;-webkit-box-shadow:inset 0 0 10px rgba(0,0,0,0.25);box-shadow:inset 0 0 10px rgba(0,0,0,0.25);height:66px;width:66px;-webkit-border-radius:2px;border-radius:2px;margin-top:1px}#wunderlist-base .avatar-upload.loading span{-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-webkit-animation:rotate .8s linear infinite;-moz-animation:rotate .8s linear infinite;-o-animation:rotate .8s linear infinite;-ms-animation:rotate .8s linear infinite;animation:rotate .8s linear infinite;display:block;position:absolute;left:50%;top:50%;margin-left:-10px;margin-top:-10px;width:19px;height:19px;background:url("images/loading_black.png");opacity:.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50)}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){#wunderlist-base .avatar-upload.loading span{background:url("images/loading_black@2x.png");-webkit-background-size:19px;-moz-background-size:19px;background-size:19px}}'
}),
define("views/Login/AvatarUploadView", ["application/runtime", "project!database", "helpers/BlobHelper", "wunderbits/WBViewPresenter", "wunderbits/views/WBFileSelectorView", "wunderbits/WBFileUploader", "project!core", "template!login/avatar-upload", "style!login/_avatar-upload"], function(e, t, i, n, o, a, r, s, l) {
    var c = n.prototype
      , d = e.global
      , u = new t.WBLocalStorage()
      , m = r.lib.when;
    return n.extend({
        className: "avatar-upload",
        template: s,
        styles: [l],
        render: function() {
            var e = this;
            if (c.render.apply(e, arguments),
            !e.fileSelectorView) {
                var t = e.$(".choose")
                  , i = new o({
                    dropTarget: t
                });
                e.fileSelectorView = e.addSubview(i, "selectorView"),
                e.fileSelectorView.setElement(e.$(".choose")),
                e.bindTo(e.fileSelectorView, "selected:files", e.setAvatar);
            }
            return e;
        },
        setAvatar: function(e) {
            var t = this
              , i = d.FileReader
              , n = new i();
            t.handleDimensions(e[0]),
            n.onload = function() {
                t.$("img").removeClass("hidden").attr("src", this.result);
                var i = u.setItem("localAvatarName", e[0].name)
                  , n = u.setItem("localAvatar", this.result);
                m(i, n).fail(function() {
                    d.alert("Please choose an avatar image with a filesize that is less than 5mb.");
                });
            }
            ,
            n.readAsDataURL(e[0]);
        },
        handleDimensions: function(e) {
            var t, i = this, n = d.URL, o = d.Image, a = new o();
            i.$("img").removeClass("landscape portrait"),
            a.onload = function() {
                t = this.width < this.height ? "portrait" : "landscape",
                i.$("img").addClass(t);
            }
            ,
            a.src = n.createObjectURL(e);
        }
    });
}),
define("/views/Login/templates/signup.js", {
    name: "views/Login/templates/signup",
    data: {
        "1": function(e, t, i, n) {
            var o, a = ' <div class="cols buttons-external"> <div class="col-33"> <a href="" class="button big external facebook auth ';
            return o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '" role="button" tabindex="0"> <div class="icon-login facebook"></div> <span></span> </a> </div> <div class="col-34"> <a href="" class="button big external microsoft auth ',
            o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '" role="button" tabindex="0"> <div class="icon-login microsoft"></div> <span></span> </a> </div> <div class="col-33"> <a href="" class="button big external google auth ',
            o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + '" role="button" tabindex="0"> <div class="icon-login google"></div> <span></span> </a> </div> </div> ';
        },
        "2": function() {
            return "disabled";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="page-form"> <div class="title center"> Wunderlist </div> <div class="separator center noline"> <div class="picture-wrapper"> </div> </div> <div class="content"> <div class="separator"> <input type="text" name="name" class="chromeless text" data-key-placeholder="label_name" data-key-aria-label="label_name"/> </div> <div class="separator"> <input type="email" name="email" class="chromeless email" data-key-placeholder="label_email" data-key-aria-label="label_email"/> </div> <div class="separator"> <input type="password" data-validate-length="8" name="password" class="chromeless password" data-key-placeholder="label_password" data-key-aria-label="label_password"/> </div> <div class="separator last noline"> <a class="submit button blue big" role="button" tabindex="0"><span></span>' + s((a = t.localized || e && e.localized || r,
            a.call(e, "login_create_new_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </div> </div> </div> ";
            return o = t["if"].call(e, e && e.showSocialButtons, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' <p class="small center accept-terms"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "login_accept_terms", "$settings_terms_of_use", "$settings_privacy_policy", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </p> <p class="center borderTop"> <a href="" class="sign-in" role="button" tabindex="0">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_log_in", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </p> ";
        },
        useData: !0
    }
}),
define("/views/Login/styles/_signup.js", {
    name: "views/Login/styles/_signup",
    data: "#wunderlist-base .login-signup,#wunderlist-base .login-external-signup{margin-top:0;}#wunderlist-base .login-signup .title,#wunderlist-base .login-external-signup .title{padding:0;margin-top:-3px}#wunderlist-base .login-signup .button.cancel,#wunderlist-base .login-external-signup .button.cancel{margin-top:10px}#wunderlist-base .login-external-signup .external-avatar{width:100%}"
}),
define("views/Login/SignUpView", ["application/runtime", "views/Login/FormView", "views/Login/SignUpController", "controllers/Auth/FacebookController", "controllers/Auth/GoogleController", "controllers/Auth/ExternalAuthController", "helpers/LocationHelper", "views/Login/AvatarUploadView", "template!./signup", "style!./_signup"], function(e, t, i, n, o, a, r, s, l, c) {
    var d = e.$
      , u = t.prototype;
    return t.extend({
        validatePassword: !0,
        url: ["signup"],
        className: "login-form login-signup",
        template: l,
        styles: [c],
        "implements": [i, n, o, a],
        emits: {
            "click .auth.facebook": "click:facebook",
            "click .auth.google": "click:google",
            "click .auth.microsoft": "click:microsoft",
            "click .sign-in": "click:signin"
        },
        formatData: function(t) {
            return t = t || {},
            t.showSocialButtons = !r.isProbablyInChina() && !e.env.isNodeWebkit(),
            t.isChromeApp = e.env.isChromeApp(),
            t;
        },
        render: function() {
            var e = this;
            u.render.apply(e, arguments),
            e.renderTermsLinks();
            var t = e.addSubview(new s(), "avatar");
            return e.$(".picture-wrapper").html(t.render().el),
            e;
        },
        renderTermsLinks: function() {
            var e = this
              , t = "http://www.wunderlist.com/"
              , i = e.$(".accept-terms")
              , n = i.find(".token_0")
              , o = i.find(".token_1")
              , a = d('<a href="' + t + 'terms-of-use" target="_blank"></a>').append(n.clone());
            n.replaceWith(a);
            var r = d('<a href="' + t + 'privacy-policy" target="_blank"></a>').append(o.clone());
            o.replaceWith(r);
        },
        toggleLoading: function(e, t) {
            var i = this;
            e = !!e,
            i.$el.toggleClass("loading", e),
            i.$(".button, page-form, .auth").toggleClass("disabled", e),
            t && i.$(".auth." + t).toggleClass("loading", e),
            i.$("input").attr("readonly", e);
        }
    });
}),
define("views/Login/SignInController", ["application/runtime", "views/Login/FormViewController"], function(e, t) {
    var i = e.$
      , n = e._;
    return t.extend({
        "implements": {
            "click:forgot-password": "openForgotPassword",
            "click:microsoft": "openMicrosoftSignin",
            "click:sign-up": "openSignUp"
        },
        submitForm: function(t) {
            var o = this;
            e.trigger("timeline:start", "login_clicked"),
            e.trigger("timeline:start", "login_load_app"),
            e.trigger("timeline:start", "user_login");
            var a = o.deferred()
              , r = this.view.state.path || "lists/inbox";
            return e.user.login(t, {
                callback: function() {
                    e.trigger("timeline:start", "login_refreshing");
                    var o = i(".fake-form form")[0]
                      , a = o.elements;
                    a.namedItem("email").value = t.email,
                    a.namedItem("password").value = t.password,
                    o.submit(),
                    n.delay(function() {
                        e.reload("/start/" + r, !1);
                    }, 50);
                }
            }),
            a.promise();
        },
        openMicrosoftSignin: function(e) {
            e && e.preventDefault(),
            this.view.trigger("open", "microsoft-signin");
        },
        openForgotPassword: function(e) {
            e && e.preventDefault(),
            this.view.trigger("open", "forgot");
        },
        openSignUp: function(e) {
            e && e.preventDefault(),
            this.view.trigger("sync", ["selector", "signup"]);
        }
    });
}),
define("/templates/login/signin.js", {
    name: "login/signin",
    data: {
        "1": function(e, t, i, n) {
            var o, a = ' <div class="cols buttons-external"> <div class="col-33"> <a href="" class="button big external facebook auth ';
            return o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '" role="button" tabindex="0"> <div class="icon-login facebook"></div> <span></span> </a> </div> <div class="col-34"> <a href="" class="button big external microsoft auth ',
            o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '" role="button" tabindex="0"> <div class="icon-login microsoft"></div> <span></span> </a> </div> <div class="col-33"> <a href="" class="button big external google auth ',
            o = t.unless.call(e, e && e.isChromeApp, {
                name: "unless",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + '" role="button" tabindex="0"> <div class="icon-login google"></div> <span></span> </a> </div> </div> ';
        },
        "2": function() {
            return "disabled";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = ' <div class="page-form"> <div class="content"> <div class="separator"> <input type="email" name="email" class="chromeless email" data-key-placeholder="label_email" data-key-aria-label="label_email"/> </div> <div class="separator"> <input type="password" name="password" class="chromeless password" data-key-placeholder="label_password" data-key-aria-label="label_password"/> </div> <div class="separator last noline"> <a class="submit button blue big" role="button" tabindex="0"> <span></span> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "button_log_in", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </a> <p class="center"> <a href="" class="forgot-password" role="button" tabindex="0">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "login_forgot_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </p> </div> </div> </div> ";
            return o = t["if"].call(e, e && e.showSocialButtons, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' <p class="center borderTop"> <a href="" class="sign-up" role="button" tabindex="0">' + s((a = t.localized || e && e.localized || r,
            a.call(e, "login_create_new_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </p> ";
        },
        useData: !0
    }
}),
define("/styles/login/_signin.js", {
    name: "login/_signin",
    data: "#wunderlist-base .login-signin .buttons-external{margin-bottom:14px}"
}),
define("views/Login/SignInView", ["application/runtime", "views/Login/FormView", "views/Login/SignInController", "controllers/Auth/FacebookController", "controllers/Auth/GoogleController", "controllers/Auth/ExternalAuthController", "helpers/LocationHelper", "template!login/signin", "style!login/_signin"], function(e, t, i, n, o, a, r, s, l) {
    return t.extend({
        url: ["login"],
        className: "login-form login-signin",
        styles: [l],
        template: s,
        "implements": [i, n, o, a],
        emits: {
            "click .auth.facebook": "click:facebook",
            "click .auth.google": "click:google",
            "click .auth.microsoft": "click:microsoft",
            "click .forgot-password": "click:forgot-password",
            "click .sign-up": "click:sign-up"
        },
        formatData: function(t) {
            return t = t || {},
            t.showSocialButtons = !r.isProbablyInChina() && !e.env.isNodeWebkit(),
            t.isChromeApp = e.env.isChromeApp(),
            t;
        },
        toggleLoading: function(e, t) {
            var i = this;
            e = !!e,
            i.$el.toggleClass("loading", e),
            i.$(".button, page-form, .auth").toggleClass("disabled", e),
            t && i.$(".auth." + t).toggleClass("loading", e),
            i.$("input").attr("readonly", e);
        }
    });
}),
define("views/Login/ForgotPasswordController", ["application/runtime", "views/Login/FormViewController", "project!core"], function(e, t, i) {
    var n = i.WBDeferred;
    return t.extend({
        "implements": {
            "click:go-back": "close"
        },
        submitForm: function(t) {
            var i = this
              , o = new n();
            return e.user.forgotPassword(t, {
                success: function() {
                    o.resolve(),
                    i.view.renderConfirmation();
                },
                error: function(e) {
                    o.reject(e);
                }
            }),
            o.promise();
        },
        close: function(e) {
            var t = this;
            e && e.preventDefault(),
            t.view.trigger("close");
        }
    });
}),
define("/templates/login/forgot.js", {
    name: "login/forgot",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="page-form"> <div class="content form"> <div class="separator"> <span class="icon-login questionmark"></span> <h2 class="center">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_forgot_password_heading", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h2> <p class="center"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_forgot_password_text", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </p> </div> <div class="separator"> <input type="email" name="email" class="chromeless email" data-key-placeholder="label_email" data-key-aria-label="label_email"/> </div> <div class="separator"> <a class="button big blue submit" role="button" tabindex="0"> <span></span> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_reset_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </div> </div> <p class="small center go-back-link"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_want_to_try_again", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' <a href="" class="go-back" role="button" tabindex="0">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_go_back", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </p> <div class="content confirm" style="display:none;"> <div class="separator noline forgotpwconfirm"> <h2 class="center">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_reset_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</h2> <p class="center">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_password_reset_email_has_been_sent", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> <div class="separator noline no-top-padding"> <a class="button big blue go-back" tabindex="0">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_go_back_sentence", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </div> </div> </div> ";
        },
        useData: !0
    }
}),
define("views/Login/ForgotPasswordView", ["application/runtime", "views/Login/FormView", "views/Login/ForgotPasswordController", "template!login/forgot"], function(e, t, i, n) {
    return t.extend({
        url: "forgot-password",
        className: "login-form login-forgot-password",
        template: n,
        "implements": [i],
        emits: {
            "click .go-back": "click:go-back"
        },
        renderConfirmation: function() {
            var e = this;
            e.fadeOut(300, ".content.form, p.go-back-link").done(function() {
                e.fadeIn(300, ".content.confirm");
            });
        }
    });
}),
define("controllers/Auth/ExternalSignupController", ["application/runtime", "views/Login/FormViewController", "project!core"], function(e, t, i) {
    var n = i.WBDeferred;
    return t.extend({
        "implements": {
            visible: "renderAvatar",
            "click:signin": "openSignIn"
        },
        renderAvatar: function() {
            var e = this;
            e.view.renderAvatar();
        },
        submitForm: function(t) {
            var i = this
              , o = new n()
              , a = this.view.state.path || "lists/inbox";
            return e.user.register(t, {
                success: function() {
                    i.view.state.token ? i.view.trigger("create:service", i.view.state, function() {
                        e.reload("/setup/" + a);
                    }) : e.reload("/setup/" + a);
                },
                error: function() {
                    o.reject();
                }
            }),
            o.promise();
        },
        openSignIn: function() {
            var e = this;
            e.view.trigger("sync", ["selector", "login"]);
        }
    });
}),
define("/templates/login/externalSignUp.js", {
    name: "login/externalSignUp",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return '<div class="page-form"> <div class="content"> <div class="separator center"> <div class="icon-login picture"> <img class="external-avatar" /> </div> <div class="center almost-done"> <h2>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_enter_password", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h2> <p>" + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_enter_password_hint", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <div class="separator"> <input type="text" name="name" class="chromeless text" data-key-placeholder="label_name" value="' + r((o = t.name || e && e.name,
            typeof o === s ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="label_name"/> </div> <div class="separator"> <input type="email" name="email" class="chromeless email" data-key-placeholder="label_email" value="' + r((o = t.email || e && e.email,
            typeof o === s ? o.call(e, {
                name: "email",
                hash: {},
                data: n
            }) : o)) + '" data-key-aria-label="label_email"/> </div> <div class="separator"> <input type="password" data-validate-length="8" name="password" class="chromeless password" data-key-placeholder="label_password" data-key-aria-label="label_password"/> </div> <div class="separator last noline"> <a class="submit button blue big" role="button"><span></span>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_create_new_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</a> </div> </div> </div> <p class="small center accept-terms"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "login_accept_terms", "$settings_terms_of_use", "$settings_privacy_policy", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </p> <p class="center borderTop"> <a class="sign-in" role="button">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_log_in", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </p> ";
        },
        useData: !0
    }
}),
define("views/Login/ExternalSignUpView", ["application/runtime", "helpers/BlobHelper", "views/Login/FormView", "controllers/Auth/ExternalSignupController", "controllers/Auth/BaseController", "template!login/externalSignUp", "style!./_signup"], function(e, t, i, n, o, a, r) {
    var s = e.$
      , l = i.prototype;
    return i.extend({
        className: "login-form login-external-signup",
        options: {
            showBackButton: !0,
            hideRibbon: !0
        },
        styles: [r],
        template: a,
        "implements": [n, o],
        emits: {
            "click .sign-in": "click:signin"
        },
        render: function() {
            var e = this;
            return l.render.apply(e, arguments),
            e.renderTermsLinks(),
            e;
        },
        renderTermsLinks: function() {
            var e = this
              , t = "http://www.wunderlist.com/"
              , i = e.$(".accept-terms")
              , n = i.find(".token_0")
              , o = i.find(".token_1")
              , a = s('<a href="' + t + 'terms-of-use" target="_blank"></a>').append(n.clone());
            n.replaceWith(a);
            var r = s('<a href="' + t + 'privacy-policy" target="_blank"></a>').append(o.clone());
            o.replaceWith(r);
        },
        renderAvatar: function() {
            var e = this
              , i = e.$("img.external-avatar")
              , n = e.state && e.state.avatar;
            n && t.loadImage(n, i);
        }
    });
}),
define("views/Login/MicrosoftSignInController", ["application/runtime", "views/Login/FormViewController", "project!core"], function(e, t) {
    return t.extend({
        "implements": {
            "click:go-back": "close"
        },
        close: function() {
            var e = this;
            e.view.trigger("close");
        }
    });
}),
define("/templates/login/mssignin.js", {
    name: "login/mssignin",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="page-form"> <div class=""> <div class="line borderTop"></div> <div class="center line-text">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_sign_in", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="line borderTop"></div> <button class="full center auth microsoft"><span class="dark"></span>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_label_microsoft_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> <button class="full center auth aad"><span class="dark"></span>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_label_work_or_school_account", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> </div> <p class="center borderTop bottom-back"> <a href="" class="go-back" role="button" tabindex="0">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_go_back", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </p> </div>";
        },
        useData: !0
    }
}),
define("views/Login/MicrosoftSignInView", ["application/runtime", "views/Login/FormView", "views/Login/MicrosoftSignInController", "controllers/Auth/ExternalAuthController", "template!login/mssignin"], function(e, t, i, n, o) {
    return t.extend({
        url: "microsoft",
        className: "login-form login-microsoft-signin",
        template: o,
        "implements": [i, n],
        emits: {
            "click .go-back": "click:go-back",
            "click .auth.aad": "click:aad",
            "click .auth.microsoft": "click:msa"
        },
        toggleLoading: function(e, t) {
            var i = this;
            e = !!e,
            i.$el.toggleClass("loading", e),
            i.$(".button, page-form, .auth").toggleClass("disabled", e),
            t && i.$(".auth." + t).toggleClass("loading", e),
            i.$("input").attr("readonly", e);
        }
    });
}),
define("views/Login/FormsStackController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e._
      , n = t.prototype;
    return t.extend({
        "implements": {
            "click:back": "onClickBack",
            "click:close": "triggerClose"
        },
        initialize: function() {
            var t = this;
            n.initialize.apply(t, arguments),
            t.bindTo(e, "forceLoginState", t.forceStackState);
        },
        forceStackState: function(t) {
            var n = this;
            i.isArray(t) && (t = t[0]),
            i.each(n.view.views, function(e) {
                e.destroy();
            }),
            n.view.views = [],
            e.global.location.hash = "/" + t,
            n.defer(function() {
                e.trigger("startHistory");
            });
        },
        onClickBack: function() {
            var e = this;
            e.view.popView();
        },
        triggerClose: function() {
            e.post("close");
        }
    });
}),
define("/templates/login/formsStack.js", {
    name: "login/formsStack",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<a class="arrow-back transparent"><span class="arrow-back-image"></span></a> <div class="logo icon-login wl-icon small"></div> <div class="logo icon-login ms-logo invisible"></div> <div class="icon-login wl-logotype small"></div> <a class="close transparent"><span class="close-icon"></span></a>  <div class="hidden fake-form"> <iframe src="about:blank" name="fakeFormFrame"></iframe> <form action="/blank" method="post" target="fakeFormFrame"> <input type="text" name="email" /> <input type="password" name="password" /> <input type="submit" /> </form> </div>';
        },
        useData: !0
    }
}),
define("/styles/login/_formsStack.js", {
    name: "login/_formsStack",
    data: '#wunderlist-base .login-stack{background:rgba(250,250,250,0.8);position:absolute;min-height:510px;width:320px;z-index:9999;top:50%;left:50%;margin-top:-255px;margin-left:-160px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:5px;border-radius:5px;-webkit-box-shadow:0 4px 24px 6px rgba(0,0,0,0.3);box-shadow:0 4px 24px 6px rgba(0,0,0,0.3);padding:14px;overflow:hidden;}#wunderlist-base .login-stack a:focus{-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8)}#wunderlist-base .login-stack a:visited:not(.button){color:inherit}#wunderlist-base .login-stack .buttons-external{padding:14px 0 0 0;letter-spacing:-1px;}#wunderlist-base .login-stack .buttons-external div{letter-spacing:normal}#wunderlist-base .login-stack .logo{position:absolute;top:90px;left:50%;margin-left:-63px;z-index:777;-webkit-transition:all 400ms ease;-moz-transition:all 400ms ease;-o-transition:all 400ms ease;-ms-transition:all 400ms ease;transition:all 400ms ease;-webkit-transform:translate3d(0,0,0) scale(1);-moz-transform:translate3d(0,0,0) scale(1);-o-transform:translate3d(0,0,0) scale(1);-ms-transform:translate3d(0,0,0) scale(1);transform:translate3d(0,0,0) scale(1);}#wunderlist-base .login-stack .logo.ms-logo{top:60px}#wunderlist-base .login-stack .logo.small{-webkit-transform:translate3d(0,-50px,0) scale(.9);-moz-transform:translate3d(0,-50px,0) scale(.9);-o-transform:translate3d(0,-50px,0) scale(.9);-ms-transform:translate3d(0,-50px,0) scale(.9);transform:translate3d(0,-50px,0) scale(.9)}#wunderlist-base .login-stack .logo.invisible{-webkit-transform:translate3d(0,-50px,0) scale(.9);-moz-transform:translate3d(0,-50px,0) scale(.9);-o-transform:translate3d(0,-50px,0) scale(.9);-ms-transform:translate3d(0,-50px,0) scale(.9);transform:translate3d(0,-50px,0) scale(.9);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}#wunderlist-base .login-stack .wl-logotype{position:absolute;left:50%;top:220px;margin-left:-100px;-webkit-transition:all 400ms ease;-moz-transition:all 400ms ease;-o-transition:all 400ms ease;-ms-transition:all 400ms ease;transition:all 400ms ease;tansform:translate3d(0,0,0);opacity:1;-ms-filter:none;filter:none;}#wunderlist-base .login-stack .wl-logotype.small{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);-webkit-transform:translate3d(0,-60px,0) scale(.6);-moz-transform:translate3d(0,-60px,0) scale(.6);-o-transform:translate3d(0,-60px,0) scale(.6);-ms-transform:translate3d(0,-60px,0) scale(.6);transform:translate3d(0,-60px,0) scale(.6)}#wunderlist-base .login-stack .wl-logotype.invisible{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}#wunderlist-base .login-stack .arrow-back{-webkit-transition:opacity 400ms ease;-moz-transition:opacity 400ms ease;-o-transition:opacity 400ms ease;-ms-transition:opacity 400ms ease;transition:opacity 400ms ease;z-index:9999;position:absolute;padding:14px;top:0;left:0;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}#wunderlist-base .login-stack h2{font-size:15px}#wunderlist-base .login-stack .page-form .line,#wunderlist-base .login-stack .page-form .line-text{display:inline-block;color:#737272;text-shadow:0 1px 0 rgba(255,255,255,0.6);width:32%}#wunderlist-base .login-stack .page-form .line{border-top:1px solid rgba(0,0,0,0.08);width:33%;position:relative;top:-2px}#wunderlist-base .login-stack .page-form .microsoft{margin-top:30px;margin-bottom:10px}#wunderlist-base .login-stack .page-form .bottom-back{position:absolute;width:90%;bottom:10px}#wunderlist-base .login-stack p{color:#737272;margin-top:14px;font-size:13px;line-height:18px;text-shadow:0 1px 0 rgba(255,255,255,0.6);}#wunderlist-base .login-stack p a:hover{text-decoration:underline}#wunderlist-base .login-stack p.borderTop{border-top:1px solid rgba(0,0,0,0.08);padding-top:14px}#wunderlist-base .login-stack p.small{color:#818181;font-size:12px;line-height:15px;}#wunderlist-base .login-stack p.small a{color:#818181}#wunderlist-base .login-stack input{font-size:16px}#wunderlist-base .login-stack .icon-login.wl-icon{background-position:-115px 0;width:115px;height:115px}#wunderlist-base .login-stack .icon-login.wl-logotype{background-position:0 -185px;width:202px;height:32px}#wunderlist-base .login-stack .icon-login.ms-logo{background-position:0 0;width:115px;height:115px}#wunderlist-base .login-stack .icon-login.whoops,#wunderlist-base .login-stack .icon-login.questionmark{margin:0 auto 10px auto;display:block}#wunderlist-base .login-stack .icon-login.whoops{background-position:-70px -115px;width:45px;height:46px}#wunderlist-base .login-stack .icon-login.questionmark{background-position:-115px -115px;width:43px;height:44px}#wunderlist-base .login-stack .icon-login.picture{background-position:0 -115px;width:70px;height:70px;margin:10px 0 9px 0}#wunderlist-base .login-stack .icon-login.facebook{background-position:-158px -115px;width:24px;height:24px}#wunderlist-base .login-stack .icon-login.microsoft{background-position:0 0;width:115px;height:115px;width:24px;height:24px;-webkit-background-size:50px;-moz-background-size:50px;background-size:50px}#wunderlist-base .login-stack .icon-login.google{background-position:-182px -115px;width:24px;height:24px}#wunderlist-base .login-form{margin-top:190px}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5){#wunderlist-base .login-stack .icon-login{background-image:url("images/sprites/login-retina.png") !important;-webkit-background-size:230px;-moz-background-size:230px;background-size:230px;}#wunderlist-base .login-stack .icon-login.microsoft{-webkit-background-size:48px !important;-moz-background-size:48px !important;background-size:48px !important}}html[dir=rtl] #wunderlist-base .icon-login.picture{margin-left:initial;margin-right:-5px}'
}),
define("views/Login/FormsStackView", ["application/runtime", "views/Login/StackView", "views/Login/SelectorView", "views/Login/SignUpView", "views/Login/SignInView", "views/Login/ForgotPasswordView", "views/Login/ExternalSignUpView", "views/Login/MicrosoftSignInView", "views/Login/FormsStackController", "template!login/formsStack", "style!login/_formsStack"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = e._
      , m = t.prototype;
    return t.extend({
        className: "login-stack",
        viewClasses: {
            selector: i,
            signup: n,
            login: o,
            forgot: a,
            "external-signup": r,
            "microsoft-signin": s
        },
        animationTime: 250,
        styles: [d],
        template: c,
        "implements": [l],
        emits: {
            "click .arrow-back": "click:back",
            "click .close": "click:close"
        },
        selectors: {
            logo: ".logo",
            arrow: ".arrow-back"
        },
        initialize: function() {
            var t = this;
            m.initialize.apply(t, arguments),
            t.bindTo(e, "login:enable", t.renderEnabled);
        },
        render: function(t) {
            var i = this;
            return m.render.call(i, i.formatData(t)),
            e.isEmbedded() && i.$("a.close").removeClass("transparent"),
            i;
        },
        createView: function(e) {
            var t = this
              , i = {};
            return i.animationTime = t.animationTime,
            i.state = t.state,
            m.createView.call(t, e, i);
        },
        appendView: function(e) {
            var t = this;
            e.$el.hide(),
            t.$(t.selectors.logo).after(e.render().el);
        },
        showView: function(e, t) {
            var i = this
              , n = i.deferred()
              , o = t ? i.animationTime : 2 * i.animationTime
              , a = t && t.fadeOut(i.animationTime) || i.deferred().resolve();
            return i.when(a).then(function() {
                t && t.trigger("hidden"),
                e.fadeIn(o).done(function() {
                    e.trigger("visible"),
                    n.resolve();
                });
            }),
            n.promise();
        },
        removeView: function(e, t, i) {
            var n = this
              , o = n.deferred()
              , a = t ? n.animationTime : 2 * n.animationTime;
            return i !== !1 && (i = !0),
            e.fadeOut(a).done(function() {
                var a = t && !t.destroyed && i
                  , r = a && t.fadeIn(n.animationTime) || n.deferred().resolve();
                r.done(function() {
                    !e.destroyed && e.destroy();
                    var i = t && !t.destroyed;
                    i && t.trigger("visible"),
                    o.resolve();
                });
            }),
            o.promise();
        },
        updateArrowVisible: function(e) {
            var t = this
              , i = !e.options.showBackButton;
            t.$(t.selectors.arrow).toggleClass("transparent", i);
        },
        updateLogo: function(e) {
            var t = this
              , i = !0
              , n = !1
              , o = !0;
            "selector" === e.stackViewName ? i = !1 : "signup" === e.stackViewName || "external-signup" === e.stackViewName ? n = !0 : "microsoft-signin" === e.stackViewName && (n = !0,
            o = !1),
            u.defer(function() {
                t.$(".wl-icon, .wl-logotype").toggleClass("small", i).toggleClass("invisible", n),
                t.$(".ms-logo").toggleClass("invisible", o);
            });
        },
        viewMadeVisible: function(t) {
            var i = this
              , n = t.url
              , o = [];
            if (i.updateArrowVisible(t),
            i.updateLogo(t),
            n) {
                u.isArray(n) ? (o = n,
                n = o[0]) : o = [n];
                var a = e.currentRoute();
                o.indexOf(a) < 0 && e.trigger("route:" + n, {
                    trigger: !1
                });
            }
        },
        renderEnabled: function(e) {
            var t = this;
            t.$el.toggleClass("disabled", !e);
        }
    });
}),
define("/styles/_lists.js", {
    name: "_lists",
    data: "#lists{width:280px;background-color:#f7f7f7;z-index:3;}#lists .lists-inner{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100vh;position:relative}#lists .lists-scroll{overflow-y:auto;overflow-x:hidden;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}#lists .filters-collection,#lists .lists-collection,#lists .pending-invites-collection{-webkit-flex-shrink:0;flex-shrink:0}#lists{-webkit-transition:width 100ms ease;-moz-transition:width 100ms ease;-o-transition:width 100ms ease;-ms-transition:width 100ms ease;transition:width 100ms ease;}#lists .moreButton{display:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;height:38px;padding-top:9px;fill:#328ad6;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center}#tasks{-webkit-transition:left 100ms ease;-moz-transition:left 100ms ease;-o-transition:left 100ms ease;-ms-transition:left 100ms ease;transition:left 100ms ease}#lists.collapsed{-webkit-flex-basis:42px;flex-basis:42px;}#lists.collapsed #sync,#lists.collapsed .count,#lists.collapsed .folder-arrow,#lists.collapsed .folder-option,#lists.collapsed .lists-collection,#lists.collapsed .new-list-dropzone,#lists.collapsed .options,#lists.collapsed .overdue-count,#lists.collapsed .sidebarActions-label,#lists.collapsed .stream-counts,#lists.collapsed .tagCloud,#lists.collapsed .title,#lists.collapsed .user-arrow,#lists.collapsed .user-name,#lists.collapsed .foldersGuide{display:none}#lists.collapsed #search-toolbar .search-icon{display:none}#lists.collapsed .moreButton{display:block}"
}),
define("/styles/login/_interface.js", {
    name: "login/_interface",
    data: '#wunderlist-base .login-interface{background:url("images/packaged/blurbg.jpg") center;-webkit-background-size:cover;-moz-background-size:cover;background-size:cover;-webkit-box-shadow:inset 0 0 50px rgba(0,0,0,0.3);box-shadow:inset 0 0 50px rgba(0,0,0,0.3);top:0;height:100%;width:100%;position:fixed;z-index:9999;}#wunderlist-base .login-interface p{font-weight:500}#wunderlist-base .login-interface .icon-login{background-image:url("images/sprites/login.png");vertical-align:middle;display:inline-block}'
}),
define("views/Login/InterfaceView", ["application/runtime", "wunderbits/WBViewPresenter", "views/Login/FormsStackView", "style!_lists", "style!login/_interface"], function(e, t, i, n, o) {
    var a = e.$
      , r = t.prototype;
    return t.extend({
        styles: [n, o],
        className: "login-interface",
        "implements": [],
        syncViews: function(e, t) {
            var i = this;
            return i.isRendered || i.render(),
            i.stack && i.stack.syncViews(e, t);
        },
        render: function() {
            var t = this;
            return t.isRendered ? t : (r.render.apply(t, arguments),
            t.stack = t.renderSubview(i),
            e.env.isPackagedApp() && a("body").addClass("packaged"),
            (e.isEmbedded() || e.env.isPackagedApp()) && t.$el.attr("id", "wunderlist-base"),
            t);
        }
    });
}),
define("wunderbits/WBBlurHelper", ["./lib/dependencies", "project!core"], function(e, t) {
    var i = e.$;
    return t.WBSingleton.extend({
        run: function() {
            var e = i('<input id="blur-hack" style="opacity:0;margin-top:-5000px;position:absolute;" aria-hidden="true"/>');
            i("body").append(e),
            e.click().focus().blur().remove();
        }
    });
}),
define("application/FocusManager", ["application/runtime", "vendor/mousetrap", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/BaseEventEmitter", "wunderbits/WBBlurHelper"], function(e, t, i, n, o, a) {
    var r = e._
      , s = e.$
      , l = e.global.document
      , c = s(l)
      , d = s("body")
      , u = o.prototype
      , m = a
      , p = t
      , g = null
      , f = []
      , b = e.smartLists
      , h = {
        add_new_list: ["lists:new", "analytics:KeyboardShortcut:addList"],
        add_new_task: ["sidebar:selected:add:task", "analytics:KeyboardShortcut:addTask"],
        mark_task_done: ["tasks:markDone", "analytics:KeyboardShortcut:toggleDone"],
        mark_task_starred: ["tasks:toggleStarred", "analytics:KeyboardShortcut:toggleStarred"],
        goto_preferences: ["route:preferences/general"],
        show_notifications: ["route:activitycenter"],
        select_all_tasks: ["tasks:selectAll"],
        send_via_email: ["email:list", "analytics:KeyboardShortcut:sendTaskViaEmail"],
        sync: ["sync:start", "analytics:KeyboardShortcut:sync"],
        copy_tasks: ["tasks:copy", "lists:copy"],
        paste_tasks: ["tasks:paste", "lists:paste"],
        goto_search: ["route:search", "analytics:KeyboardShortcut:gotoSearch"],
        goto_inbox: ["route:lists/inbox", "analytics:KeyboardShortcut:gotoInbox"]
    }
      , v = [37, 38, 39, 40]
      , _ = [187, 189]
      , w = {
        fullscreenNote: "fullscreenNote:close",
        confirmation: "confirmation:cancel",
        settings: "settings:close",
        assignPopover: "assignPopover:cancel",
        tagPopover: "tagPopover:cancel",
        emojiPopover: "emojiPopover:cancel",
        sidebar: "route:me",
        "sidebar-drag": "list:sorting:end",
        userMenu: "toolbar:userMenu:close",
        browser: "browser:drag:clean",
        comments: "comments:close",
        detail: "detail:navigate:left",
        rate: "modal:close",
        tell: "modal:close",
        listOptions: "modal:close",
        goPro: "modal:close",
        addTaskDatePicker: "addTaskDatePicker:cancel"
    }
      , k = {
        confirmation: "confirmation:confirm",
        sidebar: "actions:edit",
        browser: "tasks:editTitle",
        addTaskDatePicker: "addTaskDatePicker:close",
        userMenu: "userMenu:select",
        assignPopover: "assign:select",
        tagPopover: "tag:select",
        emojiPopover: "emoji:select",
        listOptions: "modal:trySubmit"
    }
      , x = {
        browser: "tasks:toggleSelected"
    }
      , y = {
        browser: "taskActions:focus"
    }
      , C = {
        browser: "focus:addTaskInput"
    };
    return o.extend({
        initialize: function() {
            var t = this;
            u.initialize.apply(t, arguments),
            t.print = i.print(),
            t.bindOnceTo(e, "interface:ready", "initShortcuts");
        },
        initShortcuts: function() {
            var e = this;
            e.forEach(h, "_generateShortcutTriggers"),
            e.forEach(b, "_generateSmartListShortcutCallback"),
            e._loadUserShortcuts(),
            e._bindEvents();
        },
        _bindEvents: function() {
            var t = this;
            t.bindTo(e.settings, "change", "_loadUserShortcuts"),
            t.bindTo(e, "focus:revert", t.revertFocus),
            t.bindTo(e, "focus:set", t.setFocus),
            t.bindTo(e, "focus:changed", t._onFocusChanged),
            t.bindTo(c, "keydown", t.handleKeys);
        },
        destroy: function() {
            function e(e) {
                r.each(e, function(t, i) {
                    "uid" !== i && "cid" !== i && delete e[i];
                });
            }
            var t = this;
            t.trigger && t.trigger("destroy"),
            t.unbindAll && t.unbindAll(),
            t.onDestroy && t.onDestroy(),
            e(t),
            t.destroyed = !0;
        },
        setFocus: function(t) {
            t && t !== g && (f.push(t),
            g = t,
            e.trigger("focus:changed", g));
        },
        revertFocus: function() {
            var t = f.pop()
              , i = r.last(f)
              , n = i || t;
            g = n,
            e.trigger("focus:changed", g);
        },
        _generateShortcutTriggers: function(t, i) {
            var n = this;
            n["shortcut_" + i] = function() {
                return n.forEach(t, function(t) {
                    e.trigger(t);
                }),
                !1;
            }
            ;
        },
        _generateSmartListShortcutCallback: function(t) {
            var i = this;
            i["shortcut_goto_filter_" + t] = function() {
                return e.trigger("route:lists/" + t).trigger("analytics:KeyboardShortcut:gotoSmartList", t),
                !1;
            }
            ;
        },
        _onFocusChanged: function(t) {
            var i = this
              , n = d[0].className.split(/\s/)
              , o = /(focus-\w+)/;
            r.each(n, function(e) {
                o.test(e) && d.removeClass(e);
            }),
            d.addClass("focus-" + t),
            i.analyticsTrigger || (i.analyticsTrigger = r.debounce(function() {
                e.trigger("analytics:Application:changedFocus", g);
            }, 250)),
            i.analyticsTrigger();
        },
        _loadUserShortcuts: function() {
            var t = this;
            p.reset();
            var i = e.settings.attributes;
            r.each(i, function(e, n) {
                /^shortcut/.test(n) && e && (e = e.toLowerCase().replace(/\s/g, ""),
                "arrowkeys" === e || "+-" === e ? t[n] = e : i[n].toLowerCase().length > 1 && e !== i.shortcut_sync.toLowerCase() && t[n] && p.bind(e, t[n]));
            });
        },
        handleKeys: function(t) {
            var i = this
              , o = t.which
              , a = e.settings.attributes.shortcut_sync || "r"
              , s = a.toLowerCase().charCodeAt(0);
            return e.env.isNodeWebkit() && t.ctrlKey && 80 === o && (i.print.printList(),
            e.trigger("print:start"),
            t.stopPropagation()),
            e.env.isChromeApp() && t.ctrlKey && 78 === o ? t.preventDefault() : void (o === n.esc ? i.handleEscapeKey(t) : o === n.spacebar ? i.handleSpacebar(t) : o === n.enter ? i.handleEnterKey(t) : o === n.tab ? i.handleTabKey(t) : r.include(v, o) || r.include(_, o) ? i.handleArrowKeys(t) : (o === s || o === s - 32) && i.handleSyncShortcut(t));
        },
        handleEscapeKey: function() {
            var t = this
              , i = new Date().valueOf()
              , n = e.env.getEnvInfo().browser
              , o = "safari" === n ? 500 : 1
              , a = !t._lastTriggeredEscape || t._lastTriggeredEscape < i - o;
            if (a) {
                if (t._lastTriggeredEscape = i,
                e.state.attributes.inSearchState && "browser" === g)
                    return void e.trigger("search:focus");
                var r = w[g];
                r ? ("browser" === g && e.trigger("browser:navigate", "left"),
                e.trigger(r)) : m.run();
            }
        },
        handleSpacebar: function(t) {
            var i = x[g];
            i && (e.trigger(i, t),
            t.preventDefault());
        },
        handleEnterKey: function(t) {
            var i = k[g];
            i && (e.trigger(i, t),
            t.preventDefault());
        },
        handleTabKey: function(t) {
            var i = t.originalEvent
              , n = i.metaKey || i.ctrlKey
              , o = t.shiftKey ? C : y
              , a = o[g];
            a && !n && (e.trigger(a, t),
            t.preventDefault());
        },
        handleArrowKeys: function(t) {
            var i = this
              , n = g && g.charAt(0).toUpperCase() + g.slice(1)
              , o = n && i["_handle" + n + "Navigation"];
            "function" == typeof o && (o.call(i, t),
            e.trigger("analytics:KeyboardNavigation:" + g, t.which));
        },
        handleSyncShortcut: function(e) {
            var t = this
              , i = l.activeElement;
            if (!i || !/input|textarea/i.test(i.tagName)) {
                var n = e.originalEvent;
                n.metaKey || n.ctrlKey || t.shortcut_sync();
            }
        },
        _handleBrowserNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("browser:navigate", n, t.shiftKey);
        },
        _handleDetailNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("detail:navigate", n);
        },
        _handleSidebarNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("sidebar:navigate", n);
        },
        _handleSettingsNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("settings:navigate", n);
        },
        _handleUserMenuNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("userMenu:navigate", n);
        },
        _handleTagPopoverNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("tagPopover:navigate", n);
        },
        _handleEmojiPopoverNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("emojiPopover:navigate", n);
        },
        _handleAssignPopoverNavigation: function(t) {
            var i = this
              , n = i.navKeyToDirection(t, "arrowkeys");
            e.trigger("assignPopover:navigate", n);
        },
        navKeyToDirection: function(t, i) {
            var n = t.target || t.srcElement
              , o = n.tagName
              , a = t.which
              , s = ["assignPopover", "tagPopover", "emojiPopover"]
              , l = ["INPUT", "SELECT", "TEXTAREA"]
              , c = -1 !== r.indexOf(l, o) || n && "true" === n.contentEditable
              , d = -1 === r.indexOf(s, g);
            if (c && d)
                return !1;
            t.preventDefault();
            var u = "rtl" === e.state.attributes.textDirection;
            switch (a) {
            case 37:
                return u ? "right" : "left";

            case 39:
                return u ? "left" : "right";
            }
            if ("arrowkeys" === i)
                switch (a) {
                case 38:
                    return "up";

                case 40:
                    return "down";
                }
            else if ("+-" === i)
                switch (a) {
                case 187:
                    return "up";

                case 189:
                    return "down";
                }
        },
        shortcut_delete: function() {
            if ("browser" === g)
                e.trigger("tasks:delete"),
                e.trigger("analytics:KeyboardShortcut:deleteTask");
            else if ("sidebar" === g)
                e.trigger("lists:delete"),
                e.trigger("analytics:KeyboardShortcut:deleteList");
            else if ("detail" === g) {
                var t = e.currentRoute().toLowerCase();
                t.indexOf("subtasks") >= 0 ? e.trigger("subtask:delete") : t.indexOf("files") >= 0 ? e.trigger("file:delete") : t.indexOf("comments") >= 0 && e.trigger("comment:delete");
            }
            return !1;
        }
    });
}),
define("controllers/Tracking/TrackableEventsController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    var i = e._
      , n = e.$
      , o = t.prototype;
    return t.extend({
        validEvents: ["UI.Tap", "UI.Show", "UI.Dismiss", "UI.Focus"],
        "implements": {
            "track:tap": "trackTap",
            "track:show": "trackShow",
            "track:dismiss": "trackDismiss",
            "track:focus": "trackFocus"
        },
        initialize: function() {
            var e = this;
            i.each(e.validEvents, function(t) {
                var i = t.replace("UI.", "")
                  , o = "track" + i;
                e[o] = function(i) {
                    var o;
                    if ("string" == typeof i)
                        o = i;
                    else if ("target"in i) {
                        var a = n(i.target);
                        a = a.closest("[data-track-path]"),
                        o = a.attr("data-track-path");
                    }
                    e.trackableElementName && o && 0 !== o.indexOf(e.trackableElementName) && (o = e.trackableElementName + "/" + o),
                    o && e.track(t, o);
                }
                ;
            }),
            o.initialize.apply(e, arguments);
        },
        track: function(t, i) {
            var n = this;
            if (!t || n.validEvents.indexOf(t) < 0)
                throw new Error("Cannot track event without valid event name");
            if (!i || "string" != typeof i)
                throw new Error("Cannot track event without valid element path");
            e.trigger("trackingService", t, i);
        }
    });
}),
define("wunderbits/WBModalViewController", ["application/runtime", "controllers/Tracking/TrackableEventsController"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        "implements": {
            close: "closeView",
            "click:close": "closeView"
        },
        initialize: function() {
            var e = this;
            i.initialize.apply(e, arguments),
            e.triggerOpened();
        },
        triggerOpened: function() {
            var e = this
              , t = e.trackableElementName;
            t && e.trackShow(t);
        },
        triggerClosed: function() {
            var e = this
              , t = e.trackableElementName;
            t && e.trackDismiss(t);
        },
        closeView: function() {
            var e = this
              , t = e.view;
            e.destroyed || t.destroyed || (e.triggerClosed(),
            e.onClose = t.options.onClose,
            e.returnFocus = t.returnFocus,
            t.destroy());
        },
        onDestroy: function() {
            var t = this;
            i.onDestroy.call(t),
            "function" == typeof t.onClose && (t.onClose(),
            t.onClose = null),
            t.returnFocus && e.trigger("focus:set", t.returnFocus);
        }
    });
}),
define("/templates/modals/modal.js", {
    name: "modals/modal",
    data: {
        "1": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <div class="content-footer"> <div class="cols"> <div class="col-40"></div> <div class="col-40"></div> <div class="col-20"><button class="full blue close">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_done", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</button></div> </div> </div> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = '<div id="' + s((a = t.id || e && e.id,
            typeof a === r ? a.call(e, {
                name: "id",
                hash: {},
                data: n
            }) : a)) + '" class="dialog ' + s((a = t.name || e && e.name,
            typeof a === r ? a.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : a)) + ' shown"> <div class="content"/> ';
            return o = t["if"].call(e, e && e.close, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + " </div>";
        },
        useData: !0
    }
}),
define("wunderbits/WBModalView", ["application/runtime", "./WBViewPresenter", "./WBModalViewController", "template!modals/modal"], function(e, t, i, n) {
    var o = e.Backbone
      , a = e._
      , r = t.prototype;
    return t.extend({
        templates: {
            dialog: n
        },
        className: "dialog-wrapper",
        "implements": [i],
        emits: {
            "click .close": "click:close"
        },
        initialize: function(t) {
            var i = this;
            r.initialize.apply(i, arguments),
            t && t.model instanceof o.Model && (i.model = t.model),
            t && t.opaque && i.$el.addClass("opaque"),
            i.returnFocus = e.focus;
        },
        render: function(e) {
            var t, i = this;
            if (a.isEmpty(e) && i.model instanceof o.Model)
                e = i.model.toJSON();
            else if (a.isEmpty(e))
                throw new Error("Cannot render modal view without data.");
            return e.name = i.options.name,
            r.render.call(i, e),
            t = i.templates.dialog(e),
            i.$el.html(t),
            i;
        },
        isVisible: function() {
            var e = this;
            return e.$el.is(":visible");
        }
    });
}),
define("labs/FlashCards/FlashCardController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    return i.extend({
        "implements": {
            "input:keydown": "onKeyDown"
        },
        onKeyDown: function(e) {
            var i = this;
            if (e.which === t.enter) {
                var n = i.view.$("input").val();
                i.view.model.answer(n);
            }
        }
    });
}),
define("/templates/labs/flashCard.js", {
    name: "labs/flashCard",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return "<h2>" + r((o = t.question || e && e.question,
            typeof o === a ? o.call(e, {
                name: "question",
                hash: {},
                data: n
            }) : o)) + '</h2> <input type="text" class="big"> <div class="wrong-answer hidden"> <h3>The correct answer is <strong class="correct"></strong></h3> </div> ';
        },
        useData: !0
    }
}),
define("labs/FlashCards/FlashCardView", ["application/runtime", "wunderbits/WBViewPresenter", "labs/FlashCards/FlashCardController", "template!labs/flashCard"], function(e, t, i, n) {
    var o = e._
      , a = t.prototype;
    return t.extend({
        className: "flash-card",
        template: n,
        "implements": [i],
        emits: {
            "keydown input": "input:keydown"
        },
        initialize: function(e) {
            var t = this;
            a.initialize.apply(t, arguments),
            t.model = e.model,
            t.bindTo(t.model, "answer:incorrect", t.renderIncorrectAnswer),
            t.bindTo(t.model, "answer:correct", t.renderCorrectAnswer);
        },
        render: function() {
            var e = this;
            return a.render.call(e, e.options.card),
            o.defer(function() {
                e.$("input").select();
            }),
            e;
        },
        renderCorrectAnswer: function() {
            var e = this;
            e.$("input").addClass("correct").attr("disabled", !0);
        },
        renderIncorrectAnswer: function(e, t) {
            var i = this;
            i.$("input").addClass("incorrect").attr("disabled", !0),
            i.$(".wrong-answer").removeClass("hidden"),
            i.$(".correct").text(t);
        }
    });
}),
define("labs/FlashCards/FlashCardsModel", ["application/runtime", "collections/TaskCollection", "collections/ListCollection", "wunderbits/WBModel", "wunderbits/helpers/date", "wunderbits/helpers/strings"], function(e, t, i, n, o, a) {
    var r = n.prototype
      , s = e._;
    return n.extend({
        defaults: {
            progress: 0,
            current: null,
            correctAnswers: [],
            incorrectAnswers: [],
            correctAnswerDelay: 1e3,
            incorrectAnswerDelay: 3e3,
            correctAnswerLimit: 5
        },
        initialize: function(e, n) {
            var o = this;
            r.initialize.apply(o, arguments),
            o.options = n,
            o.tasks = new t("/lists/" + n.listId + "/tasks"),
            o.allTasks = new t("/tasks/all"),
            o.lists = new i("/lists/all");
        },
        start: function() {
            var t = this;
            e.once("lists:ready", function() {
                var i = t.lists.get(t.options.listId);
                i.isShared() ? t.trigger("stop:error", "shared-list") : e.once("tasks:ready", function() {
                    t.cards = t.getCards(),
                    t.remainingCards = t.cards.slice(0),
                    t.cards.length ? t.nextCard() : t.trigger("stop:error", "no-cards");
                });
            });
        },
        copyAndOpenList: function() {
            var t = this
              , i = t.lists.get(t.options.listId)
              , n = {
                title: i.attributes.title,
                position: i.attributes.position + .1
            };
            t.lists.add(n, {
                success: function(i) {
                    var n = i.attributes.id
                      , o = t.tasks.models.length
                      , a = 0;
                    t.tasks.each(function(i) {
                        var r = i.attributes
                          , s = {
                            title: r.title,
                            list_id: n,
                            starred: r.starred,
                            position: r.position
                        };
                        t.allTasks.add(s, {
                            success: function() {
                                a++,
                                a === o - 1 && e.trigger("route:labs/flash-cards/" + n);
                            }
                        });
                    });
                }
            });
        },
        onCorrectAnswer: function() {
            var e = this
              , t = e.attributes.current
              , i = e.tasks.get(t.id)
              , n = i.attributes.note
              , a = parseInt(n, 10)
              , r = e.attributes.correctAnswerLimit;
            if (s.isNaN(a) ? a = 1 : a++,
            a >= r)
                a = 0,
                i.save({
                    completed: !0,
                    completed_at: o.getServerNow(),
                    note: "0",
                    starred: !1
                });
            else {
                var l = e.attributes.incorrectAnswers.indexOf(t) >= 0;
                i.save({
                    note: "" + a,
                    starred: l
                });
            }
            e.trigger("answer:correct", t.answer),
            e.delay("nextCard", e.attributes.correctAnswerDelay),
            e.attributes.correctAnswers.push(t),
            e.set("correctAnswers", e.attributes.correctAnswers),
            e.updateProgress();
        },
        onIncorrectAnswer: function(e) {
            var t = this
              , i = t.attributes.current
              , n = t.tasks.get(i.id);
            t.remainingCards.push(i),
            t.remainingCards = s.shuffle(t.remainingCards),
            n.save({
                note: "0",
                starred: !0
            }),
            t.trigger("answer:incorrect", e, i.answer),
            t.delay("nextCard", t.attributes.incorrectAnswerDelay),
            t.attributes.incorrectAnswers.push(i),
            t.set("incorrectAnswers", t.attributes.incorrectAnswers);
        },
        answer: function(e) {
            var t = this
              , i = t.attributes.current
              , n = e === i.answer;
            n ? t.onCorrectAnswer() : t.onIncorrectAnswer(e);
        },
        nextCard: function() {
            var e = this
              , t = e.remainingCards.length;
            if (e.updateProgress(),
            t) {
                var i = e.remainingCards.pop()
                  , n = e.attributes.current;
                if (n && n.id === i.id && t > 1)
                    return e.remainingCards.push(i),
                    e.remainingCards = s.shuffle(e.remainingCards),
                    e.nextCard();
                e.set("current", null, {
                    silent: !0
                }),
                e.set("current", i);
            } else
                e.trigger("stop:done", e.getCorrectPercent());
        },
        getCorrectPercent: function() {
            var e = this
              , t = e.attributes.correctAnswers.length
              , i = e.attributes.incorrectAnswers.length
              , n = t + i
              , o = t / n * 100;
            return o;
        },
        updateProgress: function() {
            var e = this
              , t = 100 - e.remainingCards.length / e.cards.length * 100;
            e.set("progress", t);
        },
        getCards: function() {
            var e = this
              , t = [];
            return e.tasks.each(function(i) {
                if (!i.isCompleted()) {
                    var n = e.getCard(i.attributes);
                    n && t.push(n);
                }
            }),
            s.shuffle(t);
        },
        getCard: function(e) {
            var t = e.title.split("=")
              , i = a.trim(t[0])
              , n = a.trim(t[1]);
            return i && n ? {
                id: e.id,
                question: i,
                answer: n
            } : void 0;
        }
    });
}),
define("/templates/labs/flashCards.js", {
    name: "labs/flashCards",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<div class="content-inner"> <div class="progress-outer"> <div class="progress-inner"></div> </div> <div class="cards"></div> <div class="message hidden">Awesome job!</div> </div>';
        },
        useData: !0
    }
}),
define("/styles/labs/_flashCards.js", {
    name: "labs/_flashCards",
    data: "#flashCards.dialog .content-inner{text-align:center;}#flashCards.dialog .content-inner .progress-outer{margin-top:5px;width:100%;height:20px;background-color:#000}#flashCards.dialog .content-inner .progress-inner{height:20px;background-color:#008000;width:0;-webkit-transition:width;-moz-transition:width;-o-transition:width;-ms-transition:width;transition:width}#flashCards.dialog .content-inner h2{margin:75px 20px;font-size:45px}#flashCards.dialog .content-inner input{margin-bottom:10px;text-align:center;padding:23px 10px;font-size:35px;}#flashCards.dialog .content-inner input.incorrect{background-color:#f00;color:#fff}#flashCards.dialog .content-inner input.correct{background-color:#008000;color:#fff}#flashCards.dialog .content-inner .message{font-size:30px;margin:30px;font-weight:bold}#flashCards.dialog .content-inner .wrong-answer{margin-top:10px;margin-bottom:15px;font-size:25px}#flashCards.dialog .content-inner strong.correct{color:#008000}"
}),
define("labs/FlashCards/FlashCardsModalView", ["application/runtime", "wunderbits/WBModalView", "collections/ListCollection", "./FlashCardView", "./FlashCardsModel", "template!labs/flashCards", "style!labs/_flashCards"], function(e, t, i, n, o, a, r) {
    var s = t.prototype;
    return t.extend({
        template: a,
        styles: [r],
        initialize: function(e) {
            var t = this;
            e.opaque = !0,
            s.initialize.call(t, e),
            t.lists = new i("/lists/all"),
            t.model = new o({},e),
            t.bindTo(t.model, "change:progress", t.renderProgress),
            t.bindTo(t.model, "change:current", t.renderCard),
            t.bindTo(t.model, "stop:done", t.renderDone),
            t.bindTo(t.model, "stop:error", t.handleError);
        },
        render: function() {
            var t = this
              , i = t.lists.get(t.options.listId);
            s.render.call(t, {
                id: "flashCards",
                title: "Flash cards: " + i.attributes.title,
                close: e.language.getText("button_done")
            });
            var n = t.$(".content");
            return n.html(t.template(t.formatData(t.renderData))),
            t.$el.addClass("flash-cards"),
            t.$el.css("display", "none"),
            t.renderLocalized(),
            t.defer(t.model.start, t.model),
            t;
        },
        renderDone: function(e) {
            var t, i = this;
            i.destroySubview("card"),
            25 >= e ? t = "Not so great, keep at it! Practice makes perfect!" : 50 >= e ? t = "Good job! A few more rounds then you got this!" : 75 >= e ? t = "Great work, and the only way from here is up!" : 95 >= e ? t = "Awesome, you're nailing this!" : 100 === e && (t = "Amazing! Are you sure you're not cheating? ;)"),
            i.$(".message").text(t).removeClass("hidden"),
            i.delay("close", 2e3);
        },
        renderCard: function() {
            var e = this;
            e.$el.css("display", "block");
            var t = e.model.attributes.current
              , i = e.addSubview(new n({
                card: t,
                model: e.model
            }), "card");
            e.$(".cards").append(i.render().el);
        },
        renderProgress: function() {
            var e = this
              , t = e.model.attributes.progress
              , i = e.$(".progress-outer").width();
            e.$(".progress-inner").width(i * (t / 100));
        },
        close: function() {
            var e = this;
            e.onClose && (e.onClose(),
            e.onClose = null);
        },
        handleError: function(t) {
            var i = this
              , n = i.model;
            i.close();
            var o = "Failed to start Flash Cards";
            "no-cards" === t ? e.trigger("modal:confirm", {
                customTitle: o,
                customText: 'It doesn\'t look like this list contain any tasks that can be used as flash cards. Create one or more tasks with a title like "question = answer", excluding the quotes.',
                confirmText: e.language.getLabel("button_ok").toString(),
                hideCancel: !0
            }) : "shared-list" === t && e.trigger("modal:confirm", {
                customTitle: o,
                customText: "This list is shared, and because of that you can't run it as flash cards. Do you want to make a copy of the list and then start a round of Flash Cards?",
                confirmText: e.language.getLabel("button_yes").toString(),
                cancelText: e.language.getLabel("button_no").toString(),
                confirm: n.copyAndOpenList
            });
        }
    });
}),
define("views/Labs/Controllers/LabsViewController", ["application/runtime", "wunderbits/WBModalViewController"], function(e, t) {
    var i = e.$
      , n = e._;
    return t.extend({
        "implements": {
            "change:input": "onChangeToggleable"
        },
        onChangeToggleable: function(t) {
            var o = i(t.currentTarget)
              , a = {}
              , r = o.attr("id").replace(/-/g, "_")
              , s = o.is(":checked");
            a[r] = s ? "true" : "false",
            e.trigger("analytics:Labs:toggleLabs-" + r, s),
            e.settings.save(a),
            n.delay(function() {
                e.reload("/labs");
            }, 500);
        }
    });
}),
define("/templates/labs/labs.js", {
    name: "labs/labs",
    data: {
        "1": function() {
            return "checked";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = '<div class="content-inner"> <div class="separator"> <div class="cols"> <div class="col-100"> <p>As a beta tester and Wunderlist Pro subscriber, we are giving you a taste of the wicked fresh sauce we are cooking up in our labs. Please give these features a run and send any feedback to <a href="mailto:beta@6wunderkinder.com">beta@6wunderkinder.com</a>.</p> </div> </div> </div> <!-- tag autocomplete --> <div class="separator"> <div class="cols top"> <div class="col-10"> <input id="labs-tag-autocomplete-enabled" type="checkbox" ';
            return o = t["if"].call(e, e && e.labsTagAutoComplete, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '/> </div> <div class="col-90"> <h3>Tag Autocomplete <small>(requires reload)</small></h3> <p> Typing \'#\' in the add task input field will popup a list of previously used tags that you can use for autocompletion. </p> </div> </div> </div> <!-- tag cloud --> <div class="separator"> <div class="cols top"> <div class="col-10"> <input id="labs-tag-cloud-enabled" type="checkbox" ',
            o = t["if"].call(e, e && e.labsTagCloud, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '/> </div> <div class="col-90"> <h3>Tag Cloud <small>(requires reload)</small></h3> <p> Display a tag cloud below the lists in the side bar, with style weights based on the tags\' frequency of occerence. </p> </div> </div> </div> <!-- flash cards --> <div class="separator"> <div class="cols top"> <div class="col-10"> <input id="labs-flash-cards-enabled" type="checkbox" ',
            o = t["if"].call(e, e && e.labsFlashCards, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a += '/> </div> <div class="col-90"> <h3>Flash Cards <small>(requires reload)</small></h3> <p> Use the task titles in your list to practice words and phrases. When you\'ve answered correctly five times, the task will be completed. </p> </div> </div> </div> <!-- developer labs --> <div class="separator"> <div class="cols"> <div class="col-100"> <h2 class="section">Developer Labs (use with caution)</h2> </div> </div> </div> <!-- forces http --> <div class="separator"> <div class="cols top"> <div class="col-10"> <input id="labs-force-http-sync-enabled" type="checkbox" ',
            o = t["if"].call(e, e && e.labsForcedHttpSync, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + '/> </div> <div class="col-90"> <h3>Forced HTTP Sync <small>(requires reload)</small></h3> <p> If this option is enabled, Sync will use REST api instead of the websocket. </p> </div> </div> </div> </div>';
        },
        useData: !0
    }
}),
define("/styles/labs/_labs.js", {
    name: "labs/_labs",
    data: "#labs.dialog{width:500px;}#labs.dialog h2.section{text-align:center;font-weight:bold}#labs.dialog input[type=checkbox]{margin-top:3px;margin-left:5px}"
}),
define("labs/LabsView", ["application/runtime", "wunderbits/WBModalView", "views/Labs/Controllers/LabsViewController", "template!labs/labs", "style!labs/_labs"], function(e, t, i, n, o, a) {
    var r = e._
      , s = t.prototype;
    return t.extend({
        template: n,
        styles: [o],
        "implements": [i],
        emits: {
            "change input": "change:input"
        },
        renderData: {
            labsTagAutoComplete: a,
            labsTagCloud: a,
            labsFlashCards: a,
            labsForcedHttpSync: a
        },
        formatData: function(t) {
            return t.labsTagAutoComplete = e.isLabsEnabled("tag_autocomplete"),
            t.labsTagCloud = e.isLabsEnabled("tag_cloud"),
            t.labsFlashCards = e.isLabsEnabled("flash_cards"),
            t.labsForcedHttpSync = e.isLabsEnabled("force_http_sync"),
            t;
        },
        initialize: function() {
            var t = this;
            t._isRendered = !1,
            s.initialize.apply(t, arguments),
            t.toggleables = [],
            r.each(t.toggleables, function(i) {
                t.bindTo(e.settings, "change:" + i, function() {
                    t._updateToggleable(i);
                });
            });
        },
        render: function(t) {
            var i = this;
            t = t || {};
            var n = {
                id: "labs",
                close: e.language.getText("button_done")
            };
            i.onClose = i.onClose || t && t.onClose,
            s.render.call(i, n);
            var o = i.$(".content");
            return o.html(i.template(i.formatData(i.renderData))),
            i.$el.addClass("labs"),
            i.renderLocalized(),
            i;
        },
        _updateToggleable: function(t) {
            var i = this
              , n = e.settings.get(t)
              , o = i.$el.find("#" + t.replace(/_/g, "-"));
            o.prop("checked", "true" === n);
        }
    });
}),
define("views/Social/controllers/RateModalController", ["application/runtime", "wunderbits/data/keycodes", "vendor/moment", "wunderbits/WBModalViewController"], function(e, t, i, n) {
    var o = e.$;
    return n.extend({
        trackableElementName: "AppRating/Dialog",
        "implements": {
            "click:later": "scheduleLater",
            "click:nothanks": "scheduleNever",
            "click:rate": "scheduleNever",
            "keydown:buttons": "handleButtonKeys",
            keydown: "handleKeys"
        },
        saveAndClose: function(t) {
            var i = this
              , n = e.env.isChromeApp() ? "chrome_app_rating_later" : "chrome_rating_later"
              , o = {};
            o[n] = t,
            e.settings.save(o),
            i.closeView();
        },
        scheduleLater: function(e) {
            var t = this
              , n = i().sod().valueOf();
            t.trackTap(e),
            t.saveAndClose(String(n));
        },
        scheduleNever: function(e) {
            var t = this;
            t.trackTap(e),
            t.saveAndClose("false");
        },
        handleButtonKeys: function(e) {
            var i = this;
            e.which === t.tab && i.handleTabKey(e);
        },
        handleTabKey: function(e) {
            var t = o(e.target)
              , i = this;
            !e.shiftKey && t.hasClass("later") ? (i.view.focusRate(),
            i.stopEventFully(e)) : e.shiftKey && t.hasClass("no-thanks") ? (i.view.focusRate(),
            i.stopEventFully(e)) : e.shiftKey && t.hasClass("rate") && (i.view.focusLater(),
            i.stopEventFully(e));
        }
    });
}),
define("/templates/modals/rateModal.js", {
    name: "modals/rateModal",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression, s = "function";
            return '<div class="content-inner notice" tabindex="0"> <span class="icon wunderlist-icon"></span> <div class="confirm-text"> <h3>' + r((o = t.localized || e && e.localized || a,
            o.call(e, "rate_app_heading", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</h3> <p>" + r((o = t.localized || e && e.localized || a,
            o.call(e, "rate_app_message_web_chrome", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</p> </div> </div> <div class="content-footer"> <div class="cols"> <div class="col-28"> <button class="full no-thanks" data-track-path="NoThankYouButton">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "rate_app_button_no", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> </div> <div class="col-28"> <button class="full later" data-track-path="LaterButton">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "rate_app_button_later", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> </div> <div class="col-44"> <a class="button blue full rate" href="' + r((o = t.url || e && e.url,
            typeof o === s ? o.call(e, {
                name: "url",
                hash: {},
                data: n
            }) : o)) + '" target="_blank" data-track-path="RateButton">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "rate_app_button_yes", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</a> </div> </div> </div> ";
        },
        useData: !0
    }
}),
define("views/Social/RateModalView", ["application/runtime", "wunderbits/WBModalView", "./controllers/RateModalController", "template!modals/rateModal"], function(e, t, i, n) {
    var o = t.prototype;
    return t.extend({
        template: n,
        "implements": [i],
        emits: {
            "click .later": "click:later",
            "click .no-thanks": "click:nothanks",
            "click .rate": "click:rate",
            "keydown button": "keydown:buttons",
            "keydown a.rate": "keydown:buttons",
            keydown: "keydown"
        },
        renderData: {
            url: null
        },
        formatData: function(t) {
            var i = this;
            return t = o.formatData.call(i, t),
            t.id = "rateModal",
            t.url = e.env.isChromeApp() ? "https://chrome.google.com/webstore/detail/wunderlist-for-chrome/ojcflmmmcfpacggndoaaflkmcoblhnbh/reviews" : "https://chrome.google.com/webstore/detail/wunderlist/fjliknjliaohjgjajlgolhijphojjdkc/reviews",
            t;
        },
        render: function() {
            var e = this;
            o.render.call(e, e.formatData(e.renderData));
            var t = e.$(".content");
            return t.html(e.template(e.formatData(e.renderData))),
            e.defer(function() {
                e.delegateEvents(),
                e.$(".content-inner").focus();
            }),
            e.renderLocalized(),
            e;
        },
        focusRate: function() {
            this.$("a.rate").focus();
        },
        focusNoThanks: function() {
            this.$("button.no-thanks").focus();
        },
        focusLater: function() {
            this.$("button.later").focus();
        }
    });
}),
