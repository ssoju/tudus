
define("views/TaskDetail/TaskDetailAssignView", ["application/runtime", "vendor/moment", "actions/Factory", "wunderbits/mixins/UnicodeEmojiViewMixin", "./SectionView", "views/AvatarView", "views/Assigning/AssignToUserPopoverView", "views/TaskDetail/Controllers/TaskDetailAssigningController", "template!detailview/detailAssign", "partial!symbols/assigned", "partial!symbols/delete"], function(e, t, i, n, o, a, r, s, l, c, d, u) {
    var m = e._
      , p = o.prototype
      , g = o.extend({
        sectionName: "assignee",
        template: l,
        className: "section section-item detail-assign",
        "implements": [s],
        emits: {
            click: "toggle:edit",
            "click .section-delete": "delete:assignee",
            "click .save": "save:assignee",
            "keyup .section-edit input": "input:autocomplete",
            keydown: "keydown"
        },
        observes: {
            runtime: {
                assigneeSelected: ">assignee:selected"
            }
        },
        initialize: function() {
            var t = this;
            p.initialize.apply(t, arguments),
            t.listLookup = i.listLookup(),
            t.userLookup = i.userLookup(),
            t.taskAssignee = i.taskAssignee(),
            t.ready = t.deferred(),
            t.assignablesReady = t.deferred(),
            t.bindTo(e, "users:ready", t.resolveAssignables);
        },
        renderData: {
            assignee_id: u,
            name: u
        },
        formatData: function(e) {
            var t = this
              , i = t.model.attributes;
            return e.assignee_id = i.assignee_id,
            e.name = i.name,
            e;
        },
        render: function(e) {
            var t = this;
            t.unbindFromModel(),
            t.unbindFromList(),
            t.unbindFromAssignables(),
            t.options = e,
            t.model = e.model;
            var i = [t.assignablesReady];
            return e.animationDeferred && i.push(e.animationDeferred),
            t.when(i).done(function() {
                t.requestAnimationFrame(function() {
                    t.bindToModel(),
                    t.bindToList(),
                    t.bindToAssignables();
                    var e = t.model.attributes;
                    p.render.call(t, t.formatData(t.renderData)),
                    t.$el.addClass("hidden"),
                    t.$el[e.assignee_id ? "addClass" : "removeClass"]("assigned"),
                    e.assignee_id && t.renderAssignee(e.assignee_id),
                    t.toggleAssigningVisibility(),
                    t.ready.resolve();
                });
            }, t),
            t;
        },
        resolveAssignables: function() {
            this.assignablesReady.resolve();
        },
        hideEditMode: function() {
            var e = this
              , t = e.$(".section-edit");
            e.$el.hasClass("editing") && (t.siblings().not(".detail-assigned").removeClass("hidden"),
            t.addClass("hidden"),
            e.$el.removeClass("editing"),
            e.closePopovers(),
            e.autoCompleteBind && e.unbindFrom(e.autoCompleteBind),
            e.trySetFocusRoute());
        },
        unbindFromModel: function() {
            var e = this;
            e.model && e.unbindFromTarget(e.model);
        },
        unbindFromList: function() {
            var e = this;
            e.shareBind && e.unbindFrom(e.shareBind);
        },
        unbindFromAssignables: function() {
            var e = this;
            e.assignables && e.unbindFromTarget(e.assignables);
        },
        bindToModel: function() {
            var e = this;
            e.unbindFromModel(),
            e.bindTo(e.model, "change:assignee_id", e.updateAssignee);
        },
        bindToList: function() {
            var e = this
              , t = e.listLookup.getListModel(e.model.attributes.list_id);
            e.unbindFromList(),
            t && (e.shareBind = e.bindTo(t, "change:isShared", function() {
                e.render(e.options);
            })),
            e.isShared = t ? t.isShared() : e.options.isShared;
        },
        bindToAssignables: function() {
            var e = this;
            e.unbindFromAssignables();
            var t = e.model.attributes.list_id;
            e.assignables = e.userLookup.getAssignableCollectionForList(t),
            e.bindTo(e.assignables, "add remove", e.toggleAssigningVisibility),
            e.bindTo(e.assignables, "add", e.checkNewAssignable);
        },
        toggleAssigningVisibility: function() {
            var e = this;
            e.$el.toggleClass("hidden", !e.assignables.models.length || !e.isShared);
        },
        showEditMode: function() {
            var t = this
              , i = t.$(".section-edit");
            t.isEditing = !0,
            e.trigger("route:" + t.model.route("/assignee/edit"), {
                trigger: !1
            }),
            e.trigger("popover:close"),
            i.siblings().not(".wundercon, a, .detail-assigned").addClass("hidden"),
            i.removeClass("hidden"),
            t.$el.addClass("editing");
            var n, o, a = t.model.attributes;
            a.assignee_id && (o = t.assignables.get(a.assignee_id),
            n = o && o.attributes.name),
            t.updateInput(n || ""),
            i.find("input").select(),
            t.openAssignPopover(),
            t.autoCompleteBind && t.autoCompleteBind.target || (t.autoCompleteBind = t.bindTo(e, "autoComplete:assign", t.assignToUser));
        },
        triggerFocusChange: function() {
            e.trigger("focus:set", "detail");
        },
        openAssignPopover: function(t) {
            var i = this;
            if (!i.assignPopover) {
                i.defer(function() {
                    e.trigger("focus:set", "assignPopover");
                });
                var n = i.model.attributes
                  , o = {
                    name: "detail-assign",
                    target: i.$(".section-edit"),
                    position: "bottom",
                    listId: n.list_id,
                    taskId: n.id,
                    assignedTo: n.assignee_id,
                    offset: 70,
                    margin: 0,
                    hideNoAssign: !1,
                    onClose: function() {
                        i.destroySubview(i.assignPopover),
                        i.assignPopover = null,
                        i.hideEditMode();
                    }
                };
                t && m.extend(o, t),
                i.assignPopover = i.addSubview(new r(o)),
                i.bindTo(i.assignPopover, "clear:assigned", function() {
                    i.trigger("delete:assignee");
                }),
                i.assignPopover.toggle("open", o),
                i.preventInputBlur = !0;
            }
        },
        closePopovers: function() {
            var e = this;
            e.destroyed || (e.assignPopover && e.assignPopover.toggle("close", {}),
            e.isEditing = !1,
            e.preventInputBlur = !1);
        },
        assignToUser: function(e, t, i, n) {
            var o = this;
            n === o.model.id && (o.taskAssignee.updateTaskAssignee(e, n),
            o.$el.addClass("assigned"),
            o.closePopovers(),
            o.trigger("hide:edit"),
            o.isEditing = !1);
        },
        updateAssignee: function(e) {
            var t = this;
            return e.attributes.assignee_id ? void t.renderAssignee(e.attributes.assignee_id) : (t.cancelChanges(),
            void t.resetView());
        },
        checkNewAssignable: function(e) {
            var t = this
              , i = t.model && t.model.attributes.assignee_id;
            i && e.id === i && t.renderAssignee(i);
        },
        renderAssignee: function(e) {
            var t = this
              , i = t.$(".detail-assigned")
              , n = e
              , o = t.assignables.get(n);
            if (!n || !o)
                return void i.addClass("hidden");
            t.avatarView = t.avatarView || t.addSubview(new a({
                size: "medium"
            }), "avatarView"),
            t.$el.addClass("assigned"),
            i.removeClass("hidden").html(t.avatarView.render({
                id: n
            }).$el);
            var r = t.$(".section-title");
            r.text(o.attributes.name),
            t.renderEmoji(r);
        },
        resetView: function() {
            var t = this;
            t.$(".detail-assigned").addClass("hidden"),
            t.$el.removeClass("assigned"),
            t.$(".section-title").html(e.language.getText("label_assign_to"));
        },
        cancelChanges: function(e) {
            var t = this;
            t.isEditing = !1,
            t.closePopovers(),
            t.trigger("hide:edit"),
            e && e.stopPropagation();
        },
        focusSelf: function() {
            this.$el.focus();
        },
        updateInput: function(t) {
            this.$("input").val(t).attr("aria-label", e.language.getText("aria_assign_to_$", t));
        },
        resetInput: function() {
            this.$("input").val("").attr("aria-label", "");
        }
    });
    return n.applyToClass(g),
    g;
}),
define("views/TaskDetail/Controllers/TaskDetailDateKeyController", ["wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            keydown: "onKeydown",
            focus: "focusSelf"
        },
        onKeydown: function(t) {
            var i = this.view;
            t.which !== e.enter || i.isEditVisible() || i.trigger("toggle:edit");
        },
        focusSelf: function() {
            this.view.focusSelf();
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailDateClickController", ["application/runtime", "wunderbits/WBViewController"], function(e, t) {
    return t.extend({
        "implements": {
            "toggle:edit": "toggleEditMode",
            "delete:dueDate": "deleteDueDate",
            "save:dueDate": "saveDueDate",
            "datePicker:input": "datePickerInputMousedown"
        },
        toggleEditMode: function(t) {
            var i, n = this, o = n.view;
            n.view.preventInputBlur || o.ready.done(function() {
                i = o.isEditVisible(),
                o.popover.isEventOnIgnoredElement(t) || (i || (n.offset = n.view.getDetailOffset(),
                o.showEditMode(),
                "0px" !== n.offset ? n.delay(function() {
                    o.popover.trigger("popover:open");
                }, 250) : o.popover.trigger("popover:open"),
                e.trigger("route:" + o.model.route("/duedate/edit"), {
                    trigger: !1
                }),
                o.triggerFocusChange()),
                t && t.stopPropagation());
            });
        },
        deleteDueDate: function(e) {
            var t = this
              , i = t.view;
            i.saveDefaults(),
            i.cancelChanges(e),
            e && t.stopEventFully(e);
        },
        saveDueDate: function(e) {
            var t = this
              , i = t.view;
            i.saveChanges(),
            i.cancelChanges(e),
            e && t.stopEventFully(e);
        },
        datePickerInputMousedown: function() {
            var e = this
              , t = e.view;
            t.preventInputBlur = !0,
            e.delay(function() {
                t.preventInputBlur = !1;
            }, 250);
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailDatePickerController", ["application/runtime", "vendor/moment", "wunderbits/data/keycodes", "wunderbits/helpers/date", "wunderbits/WBViewController"], function(e, t, i, n, o) {
    var a = e.$;
    return o.extend({
        "implements": {
            "datePicker:blur": "datePickerInputBlur",
            "forceFF:event": "forceFFChangeEvent",
            "save:click": "saveChanges",
            "cancel:click": "cancelChanges",
            "datepicker:keydown": "editDateKeyDown",
            "keydown:saveButton": "onSaveButtonKeydown",
            "keydown:deleteButton": "onDeleteOrSaveKeydown"
        },
        editDateKeyDown: function(e) {
            var t = this
              , n = t.view;
            t.shiftKeyDown = !1,
            e.shiftKey && e.which == i.tab && (t.shiftKeyDown = !0),
            e.which === i.enter ? (n.saveChanges(),
            n.cancelChanges(e)) : e.which === i.esc ? n.cancelChanges(e) : e.which === i.tab && n.trigger("datePicker:input");
        },
        saveChanges: function() {
            this.view.saveChanges();
        },
        cancelChanges: function() {
            this.view.cancelChanges();
        },
        onSaveButtonKeydown: function(e) {
            var t = this
              , n = this.view;
            e.shiftKey || e.which !== i.tab || (n.focusDateInput(),
            t.stopEventFully(e)),
            t.onDeleteOrSaveKeydown(e);
        },
        onDeleteOrSaveKeydown: function(e) {
            var t = this;
            e.which === i.esc && (t.view.cancelChanges(e),
            t.stopEventFully(e));
        },
        forceFFChangeEvent: function(e) {
            var t = this
              , i = t.view;
            i.preventInputBlur = !0,
            a(e.currentTarget).blur().focus();
        }
    });
}),
define("wunderbits/WBDatePickerInputView", ["./lib/dependencies", "vendor/moment", "./data/keycodes", "./helpers/date", "./helpers/selection", "./WBView"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = e._
      , l = a.prototype;
    return a.extend({
        tagName: "input",
        attributes: {
            type: "text"
        },
        className: "datepicker-input medium",
        events: {
            input: "_debouncedUpdateInput",
            keydown: "_handleKeydown"
        },
        initialize: function(e) {
            var t = this;
            l.initialize.apply(t, arguments),
            t._options = e || {},
            t.settingsModel = t._options.settingsModel,
            t.datePickerModel = t._options.datePickerModel,
            t.bindTo(t.datePickerModel, "change:date", t.updateOnChangeModel),
            t._debouncedUpdateInput = s.debounce(t._updateInput, 50);
        },
        render: function() {
            var e, t = this, i = t.datePickerModel.attributes.date;
            if (l.render.call(t, {}),
            !i || s.isNaN(i))
                t.$el.val(null).attr("data-key-value", null);
            else if (e = n.humanizeDueDate(new Date(i), t.settingsModel.attributes.date_format, !0),
            e !== t.$el.val()) {
                var o = t._options && t._options.onModelChange(e);
                t.$el.val(o).attr("data-key-value", e),
                t.renderPlaceHolders();
            }
            return t;
        },
        updateOnChangeModel: function(e, t, i) {
            var n = this;
            i = i || {},
            i.fromInput || n.render();
        },
        _updateInput: function() {
            var e = this
              , t = r.trim(e.$el.val())
              , i = r.trim(n.humanizeDueDate(new Date(e.datePickerModel.attributes.date), e.settingsModel.attributes.date_format)).toLowerCase();
            t !== i && e.datePickerModel.parseSmartDate(t, e.options.futureOnly, e.options.noRepeats, !0);
        },
        _handleKeydown: function(e) {
            var t = this;
            (37 === e.which || 38 === e.which || 39 === e.which || 40 === e.which) && t._handleDateInputArrows(e);
        },
        _handleDateInputArrows: function(e) {
            var a, r = this, s = r.datePickerModel.attributes.date, l = r.settingsModel.attributes.date_format, c = r.$el, d = l.indexOf("YYYY"), u = l.indexOf("MM"), m = l.indexOf("DD"), p = o.getCaretPos(c[0]);
            if ((e.which === i.up || e.which === i.down) && e.preventDefault(),
            s) {
                var g = e.shiftKey ? 5 : 1
                  , f = n.isHumanizeable(new Date(s));
                if (f || p >= m && m + 2 >= p ? (!f || e.which !== i.up && e.which !== i.down || (p = 0),
                e.which === i.up ? a = t(s).add("days", g) : e.which === i.down && (a = t(s).subtract("days", g))) : p >= d && d + 4 >= p ? e.which === i.up ? a = t(s).add("years", g) : e.which === i.down && (a = t(s).subtract("years", g)) : p >= u && u + 2 >= p && (e.which === i.up ? a = t(s).add("months", g) : e.which === i.down && (a = t(s).subtract("months", g))),
                p === c.val().length && e.which === i.right ? a = t(s).add("days", g) : 0 === p && e.which === i.left && (a = t(s).subtract("days", g)),
                a) {
                    if (r.options.futureOnly && a < t().sod())
                        return;
                    r.datePickerModel.set("date", a.valueOf()),
                    o.setCaretToPos(c[0], p);
                }
            }
        }
    });
}),
define("/styles/detailview/popover.js", {
    name: "detailview/popover",
    data: "#wunderlist-base .numeric-date{width:80%;margin:10px 25px 0 25px;}#wunderlist-base .numeric-date input{min-width:100%;-webkit-border-radius:2px;border-radius:2px}#wunderlist-base .behavior-section{padding:0 12px;}#wunderlist-base .behavior-section .date .select.arrow-hidden::before,#wunderlist-base .behavior-section .time .select.arrow-hidden::before{display:none}#wunderlist-base .option-controls{border-top:1px solid #e0e0e0;margin:10px 0;padding:10px 5px 0 5px;text-align:center;}#wunderlist-base .option-controls button{width:100%}"
}),
define("/templates/detailview/datePicker.js", {
    name: "detailview/datePicker",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="numeric-date"></div> <div class="calendar-date"></div> <div class="behavior-section"></div> <div class="option-controls cols"> <div class="col-50"> <button class="gray cancel">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_cancel", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</button> </div> <div class="col-50"> <button class="blue save">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "button_save", {
                name: "localized",
                hash: {},
                data: n
            }))) + "</button> </div> </div>";
        },
        useData: !0
    }
}),
define("views/TaskDetail/TaskDetailDatePickerView", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "wunderbits/WBBlurHelper", "views/TaskDetail/Controllers/TaskDetailDatePickerController", "wunderbits/WBDatePickerView", "wunderbits/WBDatePickerInputView", "wunderbits/WBPopoverView", "wunderbits/WBViewPresenter", "style!detailview/popover", "template!detailview/datePicker"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = l.prototype;
    return l.extend({
        "implements": [o],
        styles: [c],
        template: d,
        observes: {
            behaviorView: {
                "cancel:changes": "cancelChanges",
                "save:changes": "saveChanges"
            }
        },
        emits: {
            "click .save": "save:click",
            "click .cancel": "cancel:click",
            "mousedown #edit-repeat-frequency, #edit-repeat-interval, #edit-repeat, #edit-repeat option, a.detail-delete, a.detail-save": "datePicker:input",
            "blur #edit-repeat-frequency, #edit-repeat": "datePicker:blur",
            "keyup #edit-repeat, #edit-repeat-interval": "forceFF:event",
            "keydown input": "datepicker:keydown",
            "keydown .save": "keydown:saveButton",
            "keydown a.detail-delete": "keydown:deleteButton"
        },
        initialize: function(t) {
            var i = this;
            i.options = t || {};
            var n = i.options.behaviorView;
            i.datePicker = i.addSubview(new a({
                futureOnly: !1,
                hideNoDate: !0,
                hideCancel: !0,
                startDay: e.settings.attributes.start_of_week,
                settingsModel: e.settings
            })),
            i.datePickerInput = i.addSubview(new r({
                futureOnly: !1,
                settingsModel: e.settings,
                noRepeats: t.repeat || null,
                datePickerModel: i.datePicker.model,
                onModelChange: i.updateDate.bind(i)
            })),
            i.behaviorView = new n({
                model: i.datePicker.model
            }),
            u.initialize.apply(i, arguments),
            i.bindTo(e.settings, "change:start_of_week", "updateStartDay");
        },
        updateDate: function(t) {
            var i = e.language.getText(t)
              , n = i ? i : t;
            return n;
        },
        updateStartDay: function() {
            var t = this;
            t.datePicker.isRendered = !1,
            t.datePicker.setStartDay(e.settings.attributes.start_of_week),
            t.datePicker.render();
        },
        render: function() {
            var e = this;
            return u.render.call(e),
            e.$(".numeric-date").html(e.datePickerInput.render().$el),
            e.$(".calendar-date").html(e.datePicker.render().$el),
            e.$(".behavior-section").html(e.behaviorView.render().$el),
            e;
        },
        getFrequency: function() {
            var e = this.$("#edit-repeat-frequency")
              , t = parseInt(e.val(), 10);
            return t;
        },
        focusDateInput: function() {
            this.datePickerInput.$el.focus();
        },
        renderFrequency: function(e) {
            var t = this.$("#edit-repeat-frequency");
            t.val(e);
        },
        saveChanges: function() {
            this.trigger("save:changes");
        },
        cancelChanges: function() {
            this.trigger("cancel:changes");
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailRepeatController", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i, n, o) {
    var a = e.$
      , r = e._;
    return o.extend({
        "implements": {
            "change:repeat": "changeEditRepeat",
            "change:interval": "changeEditRepeat",
            "change:frequency": "changeCustomFrequency",
            "frequency:keydown": "editRepeatFrequencyKeyDown",
            "repeat:keydown": "editRepeatKeyDown"
        },
        changeEditRepeat: function(e) {
            var t, i = this, n = i.view, o = a(e.currentTarget), s = o.val();
            "custom" === s || "never repeats" === s ? (n.toggleEditCustomRepeat(),
            i.defer(function() {
                t = "never repeats" === s ? {
                    interval: null,
                    frequency: null
                } : {
                    interval: "days",
                    frequency: 1
                },
                n.model.set(t);
            })) : i.editRepeatPresets(s),
            n.preventInputBlur = !0,
            r.delay(function() {
                n.preventInputBlur = !1;
            }, 100);
        },
        changeCustomFrequency: function() {
            var e = this
              , t = e.view
              , i = t.getFrequency();
            i = i > 0 ? i : 1,
            t.renderFrequency(i),
            t.focusFrequency(),
            e.defer(function() {
                e.view.model.set("frequency", i);
            });
        },
        editRepeatPresets: function(e) {
            var i = this
              , n = i.view;
            "undefined" != typeof n.inputPresets[e] ? i.defer(function() {
                n.model.attributes.date || n.model.set("date", t().sod().valueOf()),
                n.model.set({
                    interval: n.inputPresets[e].interval,
                    frequency: n.inputPresets[e].frequency
                });
            }) : n.changeCustomInterval();
            var o = n.inputPresets[e] && n.inputPresets[e].interval;
            n.toggleTitleRepeat(o),
            n.toggleDescriptionRepeat(o);
        },
        editRepeatKeyDown: function(e) {
            var t = this;
            e.which === n.enter ? t.stopEventFully(e) : e.which === n.esc && t.view.cancelChanges(e);
        },
        editRepeatFrequencyKeyDown: function(e) {
            var t = this
              , i = t.view
              , o = i.getFrequency();
            e.which === n.up ? o += 1 : e.which === n.down ? o = o > 1 ? o - 1 : 1 : e.which === n.enter ? (i.saveChanges(),
            i.cancelChanges(e)) : e.which === n.esc && i.cancelChanges(e),
            e.which === n.up || e.which === n.down ? (i.renderFrequency(o),
            i.model.set("frequency", o),
            i.focusFrequency()) : e.which === n.backspace && (i.renderFrequency(""),
            i.model.set("frequency", 1));
        }
    });
}),
define("/templates/detailView/repeatPicker.js", {
    name: "detailview/repeatPicker",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return '<label for="edit-repeat" value="' + r((o = t.label_repeat || e && e.label_repeat,
            typeof o === a ? o.call(e, {
                name: "label_repeat",
                hash: {},
                data: n
            }) : o)) + '"/> <span class="select"> <select id="edit-repeat" class="big"> <option value="never" data-key-text="label_repeat_never"selected></option> <option value="daily" data-key-text="label_repeat_every_day"></option> <option value="weekly" data-key-text="label_repeat_every_week"></option> <option value="monthly" data-key-text="label_repeat_every_month"></option> <option value="yearly" data-key-text="label_repeat_every_year"></option> <option value="custom" data-key-text="label_repeat_custom"></option> </select> </span> <span id="edit-custom-repeat" class="hidden"> ' + r((o = t.localized || e && e.localized || s,
            o.call(e, "label_every", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' <input id="edit-repeat-frequency" type="text" class="small" value="0" size="2"/> <span class="select"> <select id="edit-repeat-interval"> <option value="never repeats" data-key-text="label_repeat_never"></option> <option value="days" data-key-text="label_time_day_plural" selected></option> <option value="weeks" data-key-text="label_time_week_plural"></option> <option value="months" data-key-text="label_time_month_plural"></option> <option value="years" data-key-text="label_time_year_plural"></option> </select> </span> </span> ';
        },
        useData: !0
    }
}),
define("views/TaskDetail/TaskDetailRepeatPickerView", ["application/runtime", "wunderbits/WBViewPresenter", "vendor/moment", "./Controllers/TaskDetailRepeatController", "template!detailView/repeatPicker"], function(e, t, i, n, o) {
    var a = t.prototype;
    return t.extend({
        template: o,
        "implements": [n],
        emits: {
            "change #edit-repeat": "change:repeat",
            "change #edit-repeat-interval": "change:interval",
            "input #edit-repeat-frequency": "change:frequency",
            "keydown #edit-repeat, #edit-repeat-interval": "repeat:keydown",
            "keydown #edit-repeat-frequency": "frequency:keydown"
        },
        inputPresets: {
            never: {
                interval: null,
                frequency: null
            },
            daily: {
                interval: "days",
                frequency: 1
            },
            weekly: {
                interval: "weeks",
                frequency: 1
            },
            monthly: {
                interval: "months",
                frequency: 1
            },
            yearly: {
                interval: "years",
                frequency: 1
            }
        },
        intialize: function(e) {
            var t = this;
            t.options = e || {},
            t.model = t.options.model,
            a.intialize.apply(t, arguments);
        },
        renderEditorDate: function(e, t, i) {
            var n = this;
            i = i || {};
            var o = n.model.attributes.date
              , a = n.$("#edit-repeat")
              , r = n.$("#edit-custom-repeat");
            o ? n.$el.addClass("date") : (n.$el.removeClass("date"),
            a.find("option:eq(0)").prop("selected", !0),
            r.addClass("hidden"),
            r.find("option:eq(1)").prop("selected", !0)),
            n.renderEditorRepeat();
        },
        toggleTitleRepeat: function(e) {
            this.$(".section-title").toggleClass("repeat", e);
        },
        toggleDescriptionRepeat: function(e) {
            this.$(".section-description").toggleClass("repeat", e);
        },
        renderEditorRepeat: function() {
            var e = this;
            if (!e.repeatEditorOpen) {
                var t = e.model.attributes.date
                  , i = e.model.attributes.interval
                  , n = e.model.attributes.frequency
                  , o = e.$("#edit-repeat")
                  , a = e.$("#edit-custom-repeat");
                if (t && i && n)
                    if (o.find("option:eq(5)").prop("selected", !0),
                    a.find('option[value="' + String(i).toLowerCase().substr(0, String(i).length) + '"]').prop("selected", !0),
                    a.find("#edit-repeat-frequency").val(Number(n)),
                    1 !== parseInt(n, 10))
                        o.addClass("hdden"),
                        e.$(".select:first").addClass("arrow-hidden"),
                        a.removeClass("hidden");
                    else {
                        var r = {
                            days: "daily",
                            weeks: "weekly",
                            months: "monthly",
                            years: "yearly"
                        };
                        o.find("option").not('option[value="' + r[i] + '"]').removeAttr("selected"),
                        o.find('option[value="' + r[i] + '"]').attr("selected", "selected");
                    }
                else
                    o.find("option:eq(0)").prop("selected", !0),
                    a.find("option:eq(1)").prop("selected", !0);
                var s = a.is(":visible");
                o[s ? "addClass" : "removeClass"]("hidden"),
                e.$(".select:first")[s ? "addClass" : "removeClass"]("arrow-hidden");
            }
        },
        getFrequency: function() {
            var e = this.$("#edit-repeat-frequency")
              , t = parseInt(e.val(), 10);
            return t;
        },
        renderFrequency: function(e) {
            var t = this.$("#edit-repeat-frequency");
            t.val(e);
        },
        focusFrequency: function() {
            this.$("#edit-repeat-frequency").focus();
        },
        toggleEditCustomRepeat: function() {
            var e = this
              , t = e.$("#edit-repeat")
              , n = e.$("#edit-custom-repeat")
              , o = e.$(".section-title")
              , a = e.$(".section-description")
              , r = !n.is(":visible");
            t.toggleClass("hidden"),
            e.$(".select:first").toggleClass("arrow-hidden"),
            n.toggleClass("hidden"),
            r ? (n.find("#edit-repeat-interval option:eq(1)").prop("selected", !0),
            e.defer(function() {
                e.preventInputBlur = !0,
                n.find("#edit-repeat-frequency").val(1).focus(),
                e.model.set();
            }),
            o.addClass("repeat"),
            a.addClass("repeat"),
            e.defer(function() {
                e.model.attributes.date || e.model.set("date", i().sod().valueOf()),
                e.model.set({
                    interval: "days",
                    frequency: 1
                });
            })) : (t.find("option:eq(0)").prop("selected", !0),
            o.removeClass("repeat"),
            a.removeClass("repeat"));
        },
        changeCustomInterval: function() {
            var e = this
              , t = e.$("#edit-repeat-interval").val();
            e.defer(function() {
                e.model.attributes.date || e.model.set("date", i().sod().valueOf()),
                e.model.set("interval", t);
            });
        },
        saveChanges: function() {
            this.trigger("save:changes");
        },
        cancelChanges: function() {
            this.trigger("cancel:changes");
        }
    });
}),
define("/templates/detailview/detailDate.js", {
    name: "detailview/detailDate",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="section-icon">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "date", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</div> <div class="section-content"> <div class="section-title">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_due_date", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="section-description"></div> </div> <a class="section-delete" data-key-aria-label="button_delete" data-key-title="button_delete" tabindex="0"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        useData: !0
    }
}),
define("/templates/symbols/date.js", {
    name: "symbols/date",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="date" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="date"> <path d="M2.5,7 C2.22,7 2,6.78 2,6.5 L2,3.5 C2,2.68 2.68,2 3.5,2 L16.5,2 C17.32,2 18,2.68 18,3.5 L18,6.5 C18,6.78 17.78,7 17.5,7 L2.5,7 Z M3,6 L17,6 L17,3.5 C17,3.22 16.78,3 16.5,3 L3.5,3 C3.22,3 3,3.22 3,3.5 L3,6 Z M3.5,18 C2.68,18 2,17.32 2,16.5 L2,8.5 C2,8.22 2.22,8 2.5,8 C2.78,8 3,8.22 3,8.5 L3,16.5 C3,16.78 3.22,17 3.5,17 L16.5,17 C16.78,17 17,16.78 17,16.5 L17,8.5 C17,8.22 17.22,8 17.5,8 C17.78,8 18,8.22 18,8.5 L18,16.5 C18,17.32 17.32,18 16.5,18 L3.5,18 Z M8.5,12 C7.68,12 7,11.32 7,10.5 L7,9.5 C7,8.68 7.68,8 8.5,8 C9.32,8 10,8.68 10,9.5 L10,10.5 C10,11.32 9.32,12 8.5,12 L8.5,12 Z M5.5,11 C5.22,11 5,10.78 5,10.5 L5,9.5 C5,9.22 5.22,9 5.5,9 C5.78,9 6,9.22 6,9.5 L6,10.5 C6,10.78 5.78,11 5.5,11 L5.5,11 Z M8.5,9 C8.22,9 8,9.22 8,9.5 L8,10.5 C8,10.78 8.22,11 8.5,11 C8.78,11 9,10.78 9,10.5 L9,9.5 C9,9.22 8.78,9 8.5,9 L8.5,9 Z M11.5,11 C11.22,11 11,10.78 11,10.5 L11,9.5 C11,9.22 11.22,9 11.5,9 C11.78,9 12,9.22 12,9.5 L12,10.5 C12,10.78 11.78,11 11.5,11 L11.5,11 Z M14.5,11 C14.22,11 14,10.78 14,10.5 L14,9.5 C14,9.22 14.22,9 14.5,9 C14.78,9 15,9.22 15,9.5 L15,10.5 C15,10.78 14.78,11 14.5,11 L14.5,11 Z M5.5,15 C5.22,15 5,14.78 5,14.5 L5,13.5 C5,13.22 5.22,13 5.5,13 C5.78,13 6,13.22 6,13.5 L6,14.5 C6,14.78 5.78,15 5.5,15 L5.5,15 Z M8.5,15 C8.22,15 8,14.78 8,14.5 L8,13.5 C8,13.22 8.22,13 8.5,13 C8.78,13 9,13.22 9,13.5 L9,14.5 C9,14.78 8.78,15 8.5,15 L8.5,15 Z M11.5,15 C11.22,15 11,14.78 11,14.5 L11,13.5 C11,13.22 11.22,13 11.5,13 C11.78,13 12,13.22 12,13.5 L12,14.5 C12,14.78 11.78,15 11.5,15 L11.5,15 Z M14.5,15 C14.22,15 14,14.78 14,14.5 L14,13.5 C14,13.22 14.22,13 14.5,13 C14.78,13 15,13.22 15,13.5 L15,14.5 C15,14.78 14.78,15 14.5,15 L14.5,15 Z"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("views/TaskDetail/TaskDetailDateView", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "wunderbits/WBBlurHelper", "actions/Factory", "models/TaskModel", "views/TaskDetail/Controllers/TaskDetailDateKeyController", "views/TaskDetail/Controllers/TaskDetailDateClickController", "./TaskDetailDatePickerView", "./TaskDetailRepeatPickerView", "./SectionView", "wunderbits/WBPopoverView", "project!core", "template!detailview/detailDate", "partial!symbols/date", "partial!symbols/delete"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p) {
    var g = e._
      , f = e.$
      , b = m.WBDeferred
      , h = e.env.isIE()
      , v = "change:due_date change:recurrence_type change:recurrence_count"
      , _ = d.prototype;
    return d.extend({
        sectionName: "duedate",
        template: p,
        "implements": [r, s],
        className: "section section-item detail-date",
        attributes: {
            tabindex: 0,
            role: "button",
            "aria-haspopup": !0
        },
        emits: {
            click: "toggle:edit",
            "click .section-delete": "delete:dueDate",
            keydown: "keydown"
        },
        observes: {
            "*children": {
                "cancel:changes": "cancelChanges",
                "save:changes": "saveChanges"
            }
        },
        initialize: function() {
            var e = this;
            _.initialize.apply(e, arguments),
            e.ready = new b(),
            e.picker = e.addSubview(new l({
                behaviorView: c
            })),
            e.taskDueService = o.taskDue();
        },
        render: function(e) {
            var i = this;
            return i.model && i.unbindFromTarget(i.model),
            i.model = e.model,
            i.datePickerModel = i.picker.datePicker.model,
            e.animationDeferred.done(function() {
                i.requestAnimationFrame(function() {
                    i.model.attributes.due_date ? i.datePickerModel.set("date", i.model.attributes.due_date) : i.datePickerModel.set("date", t().sod().valueOf()),
                    _.render.call(i),
                    i.renderDisplayDate(),
                    i.renderPopover(),
                    i.bindTo(i.model, v, i.renderDisplayDate),
                    i.ready.resolve();
                });
            }),
            i;
        },
        renderPopover: function() {
            var e = this;
            e.popover && (e.popover.destroy(),
            e.resetDatePickerModel()),
            e.popover = e.addSubview(new u({
                context: e,
                name: "detail-date",
                content: e.picker,
                target: e.$el,
                ignoredElements: [e.picker.datePickerInput.$el, e.$("#edit-repeat"), e.$("#edit-repeat option"), e.$("#edit-repeat-frequency"), e.$("#edit-repeat-interval")],
                position: "bottom",
                closeOthers: !0,
                bindToTarget: !1,
                animation: !0,
                offset: 0,
                margin: -1,
                onShow: e.onPopoverShow,
                onClose: function() {
                    e.defer(function() {
                        e.popoverOpen = !1;
                    });
                },
                onBlur: function() {
                    e.preventInputBlur || (e.saveChanges(),
                    e.hideEditMode());
                }
            }));
        },
        renderDisplayDate: function() {
            var n, o, a, r, s = this, l = i.convertServerDateToLocalDate(s.model.attributes.due_date), c = s.model.attributes.recurrence_type, d = s.model.attributes.recurrence_count, u = s.$(".section-title"), m = s.$(".section-description"), p = l && i.humanizeDueDate(l, null, !0);
            if (l) {
                var f = t(l)
                  , b = t().sod();
                if (s.$el.addClass("date"),
                i.isHumanizeable(l) && -1 !== p.indexOf("label_relative_date_"))
                    n = e.language.getLabel("label_due_$", "$" + p),
                    o = e.language.getText("label_due_$", "$" + p);
                else {
                    var h = "ddd, MMM D";
                    b.year() !== f.year() && (h += ", YYYY");
                    var v = f.format(h);
                    n = e.language.getLabel("label_due_on", v),
                    o = e.language.getText("label_due_on", v);
                }
                u.html(n.toString());
                var _ = f.diff(b, "days") < 0;
                s.$el.toggleClass("overdue", _),
                c && d && "none" !== c.toLowerCase() && "s" !== g.last(c) ? (1 === d ? (r = e.language.getLabel("label_repeat_" + c).toString(),
                a = e.language.getText("label_repeat_" + c)) : d > 1 && (r = e.language.getLabel("label_repeat_" + c + "_$_plural", d).toString(),
                a = e.language.getText("label_repeat_" + c + "_$_plural", d)),
                r && (m.html(r),
                u.addClass("repeat"),
                m.addClass("repeat"))) : (u.removeClass("repeat"),
                m.empty().removeClass("repeat"));
            } else
                s.$el.removeClass("date"),
                r = e.language.getLabel("placeholder_set_due_date").toString(),
                u.html(r).removeClass("repeat"),
                m.empty().removeClass("repeat");
            s.$el.attr("aria-label", o ? o + a : e.language.getText("placeholder_set_due_date")),
            s.renderLocalized(),
            s.repeatEditorOpen = !1;
        },
        onPopoverShow: function() {
            var i = this;
            i.popoverOpen = !0,
            i.isEditing || (i.resetDatePickerModel(),
            !i.model.attributes.due_date && i.datePickerModel.set("date", t().sod()),
            i.picker.behaviorView.renderEditorDate(),
            i.isEditing = !0,
            i.bindTo(e, "popover:close", i.closeAndHideEditMode)),
            i.picker.datePicker.onChangeDate(),
            i.repeatEditorOpen = !0,
            i.picker && i.picker.datePicker.monthsRenderedDeferred.resolve();
        },
        resetDatePickerModel: function() {
            var e = this
              , n = i.convertServerDateToLocalDate(e.model.attributes.due_date)
              , o = e.model.attributes.recurrence_type
              , a = e.model.attributes.recurrence_count;
            n && (n = t(n).valueOf(),
            "none" === o && (o = null),
            o && "s" !== g.last(o) && (o = String(o).toLowerCase() + "s"),
            a && (a = Number(a))),
            e.picker.datePicker.setDate(n),
            n && o && a ? e.datePickerModel.set({
                interval: o,
                frequency: a
            }, {
                silent: !0
            }) : e.datePickerModel.set({
                interval: null,
                frequency: null
            });
        },
        closePopover: function() {
            var e = this;
            e.popover.trigger("popover:close", {
                fadeOut: !0
            });
        },
        closeAndHideEditMode: function() {
            var e = this;
            e.closePopover(),
            e.hideEditMode(),
            e.isEditing = !1,
            e.resetDatePickerModel(),
            h && n.run();
        },
        showEditMode: function() {
            var e = this;
            e.$el.addClass("editing"),
            g.defer(function() {
                e.picker.datePickerInput.$el.focus();
            });
        },
        hideEditMode: function() {
            var e = this;
            e.isEditVisible() && (e.model.attributes.due_date || e.$el.removeClass("date"),
            e.$el.removeClass("editing"),
            e.trySetFocusRoute());
        },
        isEditVisible: function() {
            var e = this;
            return !(!e.popover || !e.popover.popoverOpened);
        },
        getDetailOffset: function() {
            return f("#detail").css("right");
        },
        cancelChanges: function(e) {
            var t = this;
            t.datePickerModel.set({
                date: i.convertServerDateToLocalDate(t.model.attributes.due_date)
            }),
            t.defer(function() {
                t.trigger("datePicker:input"),
                t.closeAndHideEditMode();
            }),
            e && e.stopPropagation();
        },
        saveChanges: function() {
            var e = this
              , t = e.model.id
              , i = e.datePickerModel.attributes.date
              , n = e.datePickerModel.attributes.interval
              , o = e.datePickerModel.attributes.frequency;
            e.isEditing = !1,
            i ? e.taskDueService.setTasksDueAt([t], i, o, n) : e.saveDefaults(),
            e.resetDatePickerModel(),
            e.closePopover(),
            e.hideEditMode();
        },
        saveDefaults: function() {
            var e = this;
            e.taskDueService.removeDueDate([e.model.id]);
        },
        silentRouteToTask: function() {
            var t = this
              , i = e.currentRoute().indexOf("tasks/" + t.model.id + "/duedate/edit") >= 0;
            i && e.trigger("route:" + t.model.route(), {
                trigger: !1
            });
        },
        triggerFocusChange: function() {
            e.trigger("focus:set", "detail");
        },
        focusSelf: function() {
            this.$el.focus();
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailReminderViewController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i, n) {
    var o = n.prototype;
    return n.extend({
        "implements": {
            "toggle:edit": "onToggleEditMode",
            "click:delete": "onDeleteReminder",
            focus: "onFocus",
            keydown: "keydown"
        },
        initialize: function() {
            var e = this;
            o.initialize.apply(e, arguments),
            e.deleteReminder = t.deleteReminder();
        },
        keydown: function(e) {
            var t = this
              , n = t.view;
            e.which !== i.enter || n.isEditVisible() || (t.onToggleEditMode(),
            t.stopEventFully(e));
        },
        onFocus: function(e) {
            "self" === e && this.view.focusSelf();
        },
        onDeleteReminder: function(t) {
            var i = this
              , n = i.view;
            t && t.stopPropagation(),
            n.reminderModel && i.deleteReminder.deleteReminder(n.reminderModel.id),
            n.resetDatePicker(),
            n.renderDisplayDate(),
            n.closePopover(),
            n.hideEditMode(),
            n.toggleDateClass(!1),
            e.trigger("route:" + n.model.route("/reminder/focus"));
        },
        onToggleEditMode: function(t) {
            var i, n = this, o = n.view;
            o.ready.done(function() {
                t && t.stopPropagation(),
                o.popover.isEventOnIgnoredElement(t) || (i = o.isEditVisible(),
                i || (o.showEditMode(),
                o.popover.trigger("popover:open"),
                e.trigger("route:" + o.model.route("/reminder/edit"), {
                    trigger: !1
                }),
                o.triggerFocusChange()));
            });
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailTimePickerController", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "wunderbits/WBViewController"], function(e, t, i, n, o, a) {
    var r = e._;
    return a.extend({
        "implements": {
            "click:save": "onSaveReminder",
            "keydown:datepickerInput": "onEditDateKeyDown",
            "keydown:hours": "onEditHourKeyDown",
            "keydown:minutes": "onEditMinuteKeyDown",
            "mousedown:datepicker": "onDatePickerInputMousedown",
            "focus:time": "onTimeFocus",
            "blur:time": "onTimeBlur",
            "keydown:saveButton": "onSaveButtonKeydown",
            "keydown:deleteButton": "onDeleteOrSaveKeydown"
        },
        onSaveButtonKeydown: function(e) {
            var t = this
              , i = this.view;
            e.shiftKey || e.which !== n.tab || (i.focusDateInput(),
            t.stopEventFully(e)),
            t.onDeleteOrSaveKeydown(e);
        },
        onDeleteOrSaveKeydown: function(e) {
            var t = this;
            e.which === n.esc && (t.view.onCancelChanges(e),
            t.stopEventFully(e));
        },
        onSaveReminder: function(e) {
            var t = this
              , i = t.view;
            i.saveChanges(),
            i.cancelChanges(),
            e && e.stopPropagation();
        },
        onEditDateKeyDown: function(e) {
            var t = this
              , i = t.view;
            e.shiftKey && e.keyCode == n.tab && (i.shiftKeyDown = !0),
            e.which === n.enter ? t.onSaveReminder(e) : e.which === n.esc ? i.cancelChanges() : e.which === n.tab && t.onDatePickerInputMousedown();
        },
        onEditHourKeyDown: function(t) {
            var i = this
              , a = i.view
              , r = a.getHour()
              , s = t.which
              , l = "12 hour" === e.settings.attributes.time_format;
            if (s === n.up)
                r = (l ? 12 : 23) > r ? r + 1 : l ? 1 : 0,
                a.renderHour(o.pad(r, 2));
            else if (s === n.down)
                r = r > (l ? 1 : 0) ? r - 1 : l ? 12 : 23,
                a.renderHour(o.pad(r, 2));
            else if (s === n.enter || s === n.esc)
                i.onEditDateKeyDown(t);
            else if (s === n.tab)
                i.onDatePickerInputMousedown();
            else if (!(n.zero <= s && s <= n.nine || n.padZero <= s && s <= n.padNine))
                return !1;
        },
        onEditMinuteKeyDown: function(e) {
            var t = this
              , i = t.view
              , a = i.getMinute()
              , r = e.which;
            if (r === n.up)
                a = 59 > a ? a + 1 : 0,
                i.renderMinute(o.pad(a, 2));
            else if (r === n.down)
                a = a > 0 ? a - 1 : 59,
                i.renderMinute(o.pad(a, 2));
            else if (r === n.enter || r === n.esc)
                t.onEditDateKeyDown(e);
            else if (r === n.left || e.which === n.right || r === n.backspace || r === n.del)
                ;
            else if (r === n.tab)
                t.onDatePickerInputMousedown();
            else if (!(n.zero <= r && r <= n.nine || n.padZero <= r && r <= n.padNine))
                return !1;
        },
        onDatePickerInputMousedown: function() {
            var e = this.view;
            e.preventInputBlur = !0,
            r.delay(function() {
                e.preventInputBlur = !1;
            }, 250);
        },
        onDatePickerInputBlur: function() {
            var e = this
              , t = e.view;
            return t.shiftKeyDown ? (t.saveChanges(),
            t.hideEditMode(),
            void (t.shiftKeyDown = !1)) : (t.popoverOpen || t.preventInputBlur || (t.saveChanges(),
            t.hideEditMode()),
            void (t.preventInputBlur = !1));
        },
        onTimeFocus: function() {
            this.view.toggleTimeFocusClass(!0);
        },
        onTimeBlur: function() {
            this.view.toggleTimeFocusClass(!1);
        }
    });
}),
define("views/TaskDetail/TaskDetailTimePickerView", ["application/runtime", "wunderbits/WBViewPresenter", "vendor/moment", "wunderbits/helpers/date", "wunderbits/helpers/strings", "./Controllers/TaskDetailTimePickerController", "template!detailview/timePicker"], function(e, t, i, n, o, a, r) {
    var s = t.prototype
      , l = e.$;
    return t.extend({
        template: r,
        "implements": [a],
        className: "time",
        emits: {
            "keydown .datepicker-input": "keydown:datepickerInput",
            "keydown #edit-reminder-time-hour": "keydown:hours",
            "keydown #edit-reminder-time-minute": "keydown:minutes",
            "mousedown #edit-reminder-time-container, #edit-reminder-time-ampm, #edit-reminder-time-ampm options": "mousedown:datepicker",
            "blur #edit-reminder-time-hour, #edit-reminder-time-minute, #edit-reminder-time-ampm": "blur:datepicker",
            "focus #edit-reminder-time-hour, #edit-reminder-time-minute": "focus:time",
            "blur #edit-reminder-time-hour, #edit-reminder-time-minute": "blur:time",
            "keydown a.detail-save": "keydown:saveButton",
            "keydown a.detail-delete": "keydown:deleteButton"
        },
        initialize: function(e) {
            var t = this;
            t.options = e || {},
            t.model = t.options.model,
            s.initialize.apply(t, arguments);
        },
        render: function() {
            var e = this;
            return s.render.call(e, e.model.attributes),
            e.renderEditorDate(),
            e;
        },
        toggleTimeFocusClass: function(e) {
            var t = this;
            t.$("#edit-reminder-time-container").toggleClass("focus", e);
        },
        getHour: function() {
            return parseInt(this.$("#edit-reminder-time-hour").val(), 10);
        },
        renderHour: function(e) {
            this.$("#edit-reminder-time-hour").val(e);
        },
        getMinute: function() {
            return parseInt(this.$("#edit-reminder-time-minute").val(), 10);
        },
        renderMinute: function(e) {
            this.$("#edit-reminder-time-minute").val(e);
        },
        getAMPM: function() {
            return this.$("#edit-reminder-time-ampm").val();
        },
        renderEditorDate: function() {
            var t, o = this, a = o.model.attributes.date, r = o.taskModel.attributes.due_date, s = o.reminderModel && o.reminderModel.attributes.date, l = s ? i(n.convertServerTimeToLocalTime(s)).format("HH:mm") : null, c = i().sod(), d = r && i(r).diff(c, "days") > 0;
            o.$el.toggleClass("date", !a),
            !o.reminderModel && r && d ? (t = i(r).subtract("d", e.settings.attributes.auto_reminder_noticeperiod).valueOf(),
            o.model.attributes.date || o.model.set("date", t),
            l || (l = i().sod().add("m", e.settings.attributes.auto_reminder_timeinterval).format("HH:mm"))) : o.reminderModel || (t = i().sod().valueOf(),
            o.model.attributes.date || o.model.set("date", t),
            l || (l = i().add("h", 1).subtract("minutes", i().format("mm")).format("HH:mm"))),
            l && o.renderTime(l);
        },
        renderTime: function(t) {
            var i, n, a, r = this, s = "12 hour" === e.settings.attributes.time_format, c = r.$("#edit-reminder-time-ampm"), d = t.split(":"), u = Number(d[0]);
            s ? (i = u > 12 ? u - 12 : d[0],
            i = 0 === u ? 12 : i,
            a = u >= 12 ? "pm" : "am",
            c.removeClass("hidden"),
            c.find("option").each(function(e, t) {
                t = l(t),
                t.prop("selected", t.val() === a);
            })) : (c.addClass("hidden"),
            i = u),
            n = d[1],
            r.$("#edit-reminder-time-hour").val(o.pad(i, 2)),
            r.$("#edit-reminder-time-minute").val(o.pad(n, 2));
        },
        saveChanges: function() {
            this.trigger("save:changes");
        },
        cancelChanges: function() {
            this.trigger("cancel:changes");
        }
    });
}),
define("/templates/detailview/detailReminder.js", {
    name: "detailview/detailReminder",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="section-icon">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "reminder", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</div> <div class="section-content"> <div class="section-title">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "placeholder_remind_me", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="section-description"></div> </div> <a class="section-delete" data-key-aria-label="button_delete" data-key-title="button_delete" tabindex="0"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        useData: !0
    }
}),
define("/templates/symbols/reminder.js", {
    name: "symbols/reminder",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return ' <svg class="reminder" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="reminder"> <path d="M3.26,6.6 C3.1,6.24 3,5.88 3,5.5 C3,4.12 4.12,3 5.5,3 C6.04,3 6.54,3.18 6.98,3.5 C7.2,3.66 7.52,3.62 7.68,3.4 C7.86,3.18 7.8,2.86 7.58,2.7 C6.98,2.24 6.24,2 5.5,2 C3.58,2 2,3.58 2,5.5 C2,6.02 2.12,6.54 2.38,7.04 C2.46,7.22 2.64,7.32 2.82,7.32 C2.9,7.32 2.98,7.3 3.04,7.28 C3.3,7.14 3.4,6.84 3.26,6.6 L3.26,6.6 Z M14.5,2 C13.76,2 13.04,2.24 12.42,2.7 C12.2,2.86 12.16,3.18 12.32,3.4 C12.48,3.62 12.8,3.66 13.02,3.5 C13.46,3.18 13.98,3 14.5,3 C15.88,3 17,4.12 17,5.5 C17,5.88 16.92,6.24 16.74,6.6 C16.62,6.84 16.72,7.14 16.96,7.28 C17.04,7.3 17.1,7.32 17.18,7.32 C17.36,7.32 17.54,7.22 17.64,7.04 C17.88,6.54 18,6.02 18,5.5 C18,3.58 16.44,2 14.5,2 L14.5,2 Z M17,11 C17,7.14 13.86,4 10,4 C6.14,4 3,7.14 3,11 C3,13 3.84,14.82 5.2,16.1 L4.14,17.14 C3.96,17.34 3.96,17.66 4.14,17.86 C4.24,17.96 4.38,18 4.5,18 C4.62,18 4.76,17.96 4.86,17.86 L5.98,16.72 C7.12,17.52 8.5,18 10,18 C11.5,18 12.88,17.52 14.02,16.72 L15.14,17.86 C15.24,17.96 15.38,18 15.5,18 C15.62,18 15.76,17.96 15.86,17.86 C16.04,17.66 16.04,17.34 15.86,17.14 L14.8,16.1 C16.16,14.82 17,13 17,11 L17,11 Z M4,11 C4,7.7 6.7,5 10,5 C13.3,5 16,7.7 16,11 C16,14.3 13.3,17 10,17 C6.7,17 4,14.3 4,11 L4,11 Z M10.5,7 C10.22,7 10,7.22 10,7.5 L10,11 L7.46,11 C7.2,11 6.96,11.22 6.96,11.5 C6.96,11.78 7.2,12 7.46,12 L10.5,12 C10.78,12 11,11.78 11,11.5 L11,7.5 C11,7.22 10.78,7 10.5,7 L10.5,7 Z" id="…"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("views/TaskDetail/TaskDetailReminderView", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "wunderbits/helpers/strings", "wunderbits/WBBlurHelper", "actions/Factory", "views/TaskDetail/Controllers/TaskDetailReminderViewController", "./SectionView", "./TaskDetailDatePickerView", "./TaskDetailTimePickerView", "wunderbits/WBPopoverView", "project!core", "template!detailview/detailReminder", "partial!symbols/reminder", "partial!symbols/delete"], function(e, t, i, n, o, a, r, s, l, c, d, u, m) {
    var p = e.$
      , g = e.env.isIE()
      , f = s.prototype
      , b = u.WBDeferred;
    return s.extend({
        sectionName: "reminder",
        template: m,
        className: "section section-item detail-reminder",
        attributes: {
            tabindex: 0,
            role: "button",
            "aria-haspopup": !0
        },
        "implements": [r],
        emits: {
            click: "toggle:edit",
            "click .section-delete": "click:delete",
            keydown: "keydown"
        },
        observes: {
            "*children": {
                "cancel:changes": "onCancelChanges",
                "save:changes": "saveChanges"
            },
            settings: {
                "change:time_format": "renderDisplayDate"
            },
            language: {
                change: "renderDisplayDate"
            },
            datePickerModel: {
                "change:date": "onDatePickerChangeDate"
            }
        },
        initialize: function() {
            var t = this;
            t.ready = new b(),
            t.taskReminder = a.taskReminder(),
            t.reminderLookup = a.reminderLookup(),
            t.picker = t.addSubview(new l({
                behaviorView: c,
                repeat: !0
            })),
            t.datePickerModel = t.picker.datePicker.model,
            t.settings = e.settings,
            t.language = e.language,
            f.initialize.apply(t, arguments);
        },
        render: function(e) {
            var t = this;
            return t.model = e.model,
            t.picker.behaviorView.taskModel = t.model,
            t.reminderModel && t.unbindFromTarget(t.reminderModel),
            t.reminders = t.reminderLookup.getReminderCollectionForTask(t.model.id),
            t.reminderModel = t.reminders.models.length ? t.reminders.models[0] : null,
            t.picker.behaviorView.reminderModel = t.reminderModel,
            t.bindToReminders(),
            t.reminderModel && t.bindTo(t.reminderModel, "change:date", t.renderDisplayDate),
            e.animationDeferred.done(function() {
                t.requestAnimationFrame(function() {
                    f.render.call(t, t.model.toJSON()),
                    t.$(".section-edit").prepend(t.picker.render().$el),
                    t.renderPopover(),
                    t.renderDisplayDate(),
                    t.ready.resolve();
                });
            }),
            t;
        },
        renderPopover: function() {
            var e = this;
            e.popover && !e.popover.destroyed && (e.popover.destroy(),
            e.resetDatePicker()),
            e.popover = e.addSubview(new d({
                context: e,
                content: e.picker,
                target: e.$el,
                ignoredElements: [e.$(".datepicker-input"), e.$("#edit-reminder-time"), e.$("#edit-reminder-method"), e.$("#edit-reminder-time-hour"), e.$("#edit-reminder-time-minute"), e.$("#edit-reminder-time-ampm")],
                position: "bottom",
                closeOthers: !0,
                bindToTarget: !1,
                offset: 0,
                margin: -1,
                onShow: e.onPopoverShow,
                onClose: function() {
                    e.defer(function() {
                        e.popoverOpen = !1;
                    });
                },
                onBlur: function() {
                    e.isEditVisible() && (e.trigger("save"),
                    e.hideEditMode());
                }
            }));
        },
        renderDisplayDate: function() {
            var n, o, a, r, s, l, c, d, u = this, m = u.reminderModel ? u.reminderModel.attributes.date : null, g = m ? t(i.convertServerTimeToLocalTime(m)).valueOf() : null, f = m ? t(g).format("HH:mm") : null, b = u.$(".section-description"), h = u.$(".section-title"), v = g && i.humanizeDueDate(g), _ = "12 hour" === e.settings.attributes.time_format;
            if (m) {
                var w = t();
                if (u.$el.addClass("date"),
                i.isHumanizeable(new Date(g)))
                    n = v;
                else {
                    var k = t(g)
                      , x = "ddd, MMM D";
                    w.year() !== k.year() && (x += ", YYYY"),
                    n = k.format(x);
                }
                b.html(n.toString()).addClass("repeat");
                var y = t(i.convertServerTimeToLocalTime(u.reminderModel.attributes.date))
                  , C = y.diff(w)
                  , T = 0 > C;
                u.$el.toggleClass("overdue", T),
                l = f.split(":"),
                _ ? (a = Number(l[0]) > 12 ? l[0] - 12 : l[0],
                a = 0 === Number(l[0]) ? 12 : a,
                s = Number(l[0]) >= 12 ? "PM" : "AM") : a = l[0],
                r = l[1],
                o = a + ":" + r,
                o = _ ? o + " " + s : o,
                c = e.language.getLabel("label_remind_me_at_$", o).toString(),
                d = e.language.getText("label_remind_me_at_$", o),
                h.html(c).addClass("repeat");
            } else
                u.$el.removeClass("date"),
                c = e.language.getLabel("placeholder_remind_me").toString(),
                h.html(c).removeClass("repeat"),
                b.html("").removeClass("repeat");
            n = n ? n.toString() : "",
            /<text/.test(n) && (n = e.language.getText(p(n).attr("rel")));
            var S = m ? d + ", " + n : e.language.getText("placeholder_remind_me");
            u.$el.attr("aria-label", S),
            u.renderLocalized();
        },
        bindToReminders: function() {
            var e = this;
            e.bindTo(e.reminders, "add remove", function() {
                e.reminderModel && e.unbindFromTarget(e.reminderModel),
                e.reminderModel = e.reminders && e.reminders.models.length ? e.reminders.models[0] : null,
                e.reminderModel && e.bindTo(e.reminderModel, "change:date", e.renderDisplayDate);
                var i = e.reminderModel ? e.reminderModel.attributes.date : null;
                i = i ? t(i).valueOf() : i,
                !e.datePickerModel.attributes.date && e.datePickerModel.set("date", i),
                e.picker.behaviorView.reminderModel = e.reminderModel,
                e.renderDisplayDate();
            });
        },
        onDatePickerChangeDate: function() {
            var e = this;
            e.$el.toggleClass("date", !!e.datePickerModel.attributes.date);
        },
        resetDatePicker: function() {
            var o = this
              , a = "12 hour" === e.settings.attributes.time_format
              , r = o.reminderModel ? o.reminderModel.attributes.date : null;
            r = r ? t(i.convertServerTimeToLocalTime(r)).valueOf() : null;
            var s, l, c, d, u = o.$("#edit-reminder-time-hour"), m = o.$("#edit-reminder-time-minute"), g = o.reminderModel ? t(i.convertServerTimeToLocalTime(o.reminderModel.attributes.date)).format("HH:mm") : null;
            r ? (o.datePickerModel.set({
                date: r,
                interval: null,
                frequency: null
            }),
            s = g.split(":"),
            a ? (l = Number(s[0]) > 12 ? s[0] - 12 : s[0],
            0 === Number(s[0]) && (l = 12)) : l = s[0],
            c = s[1],
            d = Number(s[0]) >= 12 ? "pm" : "am",
            u.val(n.pad(l, 2)),
            m.val(n.pad(c, 2)),
            o.$("#edit-reminder-time-ampm option").each(function(e, t) {
                t = p(t),
                t.prop("selected", t.val() === d);
            })) : (o.datePickerModel.set({
                date: null,
                interval: null,
                frequency: null
            }),
            o.$el.removeClass("date"),
            u.val(""),
            m.val(""));
        },
        onPopoverShow: function() {
            var n = this
              , o = n.reminderModel ? n.reminderModel.attributes.date : null
              , a = n.model.attributes.due_date;
            n.popoverOpen = !0,
            n.isEditVisible() || (o = o ? t(i.convertServerTimeToLocalTime(o)).valueOf() : a ? a : Date.now(),
            n.datePickerModel.parse(o),
            n.isEditing = !0,
            n.bindTo(e, "popover:close", n.closeAndHideEditMode)),
            n.picker.datePicker.onChangeDate(),
            n.picker && n.picker.datePicker.monthsRenderedDeferred.resolve();
        },
        closeAndHideEditMode: function() {
            var e = this;
            e.closePopover(),
            e.hideEditMode(),
            e.isEditing = !1,
            e.resetDatePicker(),
            g && o.run();
        },
        closePopover: function() {
            var e = this;
            e.popover.trigger("popover:close", {
                fadeOut: !0
            }),
            e.isEditVisible() && e.$(".section-edit .datepicker-input").focus();
        },
        showEditMode: function() {
            var e = this
              , t = e.$el.find(".section-edit");
            t.removeClass("hidden"),
            e.$el.addClass("editing"),
            e.defer(function() {
                e.picker.datePickerInput.$el.focus();
            });
        },
        hideEditMode: function() {
            var e = this
              , t = e.$el.find(".section-edit");
            e.isEditVisible() && (t.siblings().removeClass("hidden"),
            t.addClass("hidden"),
            e.$el.removeClass("editing"),
            e.reminderModel || e.$el.removeClass("date"),
            e.trySetFocusRoute());
        },
        saveChanges: function() {
            var t = this
              , i = t.datePickerModel.attributes.date
              , n = t.picker.behaviorView.getHour()
              , o = t.picker.behaviorView.getMinute()
              , a = t.picker.behaviorView.getAMPM()
              , r = "12 hour" === e.settings.attributes.time_format;
            t.isEditing = !1,
            t.taskReminder.upsertTaskReminder(t.model.id, i, n, o, a, r),
            t.hideEditMode(),
            t.resetDatePicker(),
            t.closePopover();
        },
        onCancelChanges: function(t) {
            var i = this
              , n = i.reminderModel && i.reminderModel.attributes.date;
            i.datePickerModel.set({
                date: n || null
            }),
            i.defer(function() {
                i.trigger("mousedown:datepicker"),
                i.hideEditMode(),
                i.closePopover(),
                i.isEditing = !1,
                (!i.reminderModel || i.reminderModel && !i.reminderModel.attributes.date) && i.$el.removeClass("date repeat"),
                i.resetDatePicker(),
                g && o.run(),
                e.trigger("route:" + i.model.route("/reminder/focus"));
            }),
            t && t.stopPropagation();
        },
        toggleDateClass: function(e) {
            this.$el.toggleClass("date", e);
        },
        isEditVisible: function() {
            return this.$el.hasClass("editing");
        },
        silentRouteToTask: function() {
            var t = this
              , i = e.currentRoute().indexOf(t.model.route("/reminder/edit")) >= 0;
            i && e.trigger("route:" + t.model.route(), {
                trigger: !1
            });
        },
        triggerFocusChange: function() {
            e.trigger("focus:set", "detail");
        },
        focusSelf: function() {
            this.$el.focus();
        },
        focusDateInput: function() {
            this.$("input.datepicker-input").focus();
        }
    });
}),
define("/templates/WBExpandableTextarea.js", {
    name: "WBExpandableTextarea",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return '<pre><span></span><br/></pre> <textarea tabindex="0" class="' + r((o = t.className || e && e.className,
            typeof o === a ? o.call(e, {
                name: "className",
                hash: {},
                data: n
            }) : o)) + '">' + r((o = t.content || e && e.content,
            typeof o === a ? o.call(e, {
                name: "content",
                hash: {},
                data: n
            }) : o)) + "</textarea>  ";
        },
        useData: !0
    }
}),
define("/styles/WBExpandableTextarea.js", {
    name: "WBExpandableTextarea",
    data: '.expandingArea{position:relative;}.expandingArea pre{margin:0;padding:0 !important;border:0 !important;display:block;visibility:hidden}.expandingArea textarea{overflow:hidden;position:absolute;top:0;left:0;width:100%;height:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:none;margin:0;border:0;padding:0}.explorer .body .expandingArea textarea{top:-1px}.expandingArea textarea,.expandingArea pre{font-family:"Lato","Geneva CY","Lucida Grande","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif;padding:0;background:transparent;border:none;white-space:pre-wrap;word-wrap:break-word;text-shadow:none !important}html:lang(ja_JP) .expandingArea textarea,html:lang(ja_JP) .expandingArea pre{font-family:"Lato","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Microsoft Yahei","微软雅黑","STXihei","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_CN) .expandingArea textarea,html:lang(zh_CN) .expandingArea pre{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}html:lang(zh_TW) .expandingArea textarea,html:lang(zh_TW) .expandingArea pre{font-family:"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif}'
}),
define("wunderbits/WBExpandableTextareaView", ["./lib/dependencies", "./WBView", "./WBModel", "./helpers/selection", "template!WBExpandableTextarea", "style!WBExpandableTextarea"], function(e, t, i, n, o, a) {
    var r = e._
      , s = e.w_
      , l = t.prototype;
    return t.extend({
        template: o,
        styles: [a],
        className: "expandingArea active",
        events: {
            click: "_onClick",
            "input textarea": "_onInput",
            "keydown textarea": "_onKeyDown"
        },
        initialize: function(e) {
            var t = this;
            l.initialize.apply(t, arguments),
            t.model = new i(),
            t._options = e || {};
        },
        render: function(e) {
            var t = this
              , i = t.model.toJSON();
            t._options = s.merge(t._options, e || {}),
            t._options.lineHeight = parseInt(t._options.lineHeight, 10) || 26,
            t._options.fontSize = parseInt(t._options.fontSize, 10) || 13,
            r.each(e, function(e, t) {
                i[t] = e;
            }),
            l.render.call(t, i),
            t.$("textarea, pre").css({
                "line-height": t._options.lineHeight + "px",
                "font-size": t._options.fontSize + "px"
            });
            var n = t.$("textarea");
            return t._options.placeholderKey && (n.attr("data-key-placeholder", t._options.placeholderKey),
            n.attr("data-key-aria-label", t._options.placeholderKey)),
            t.$("span").text(t.$("textarea").val()),
            t.renderLocalized(),
            t;
        },
        setEnabled: function(e) {
            var t = this;
            t.setContent(""),
            t.$el.attr("disabled", !e).toggleClass("disabled", !e);
        },
        setContent: function(e) {
            var t = this;
            t.$("span").text(e),
            t.$("textarea").val(e),
            t._onInput();
        },
        onDestroy: function() {},
        _onClick: function(e) {
            e.stopPropagation();
        },
        _onKeyDown: function(e) {
            var t = this
              , i = t._options || {}
              , n = t.$("textarea")
              , o = n.val()
              , a = [13, 27, 8, 38, 40, 37, 39]
              , s = [46];
            i.maxLength && (r.include(s, e.which) || !e.metaKey && !r.include(a, e.which) && o.length >= i.maxLength && e.preventDefault());
        },
        _onInput: function() {
            var e, t = this, i = t.$("pre"), o = t.$("textarea"), a = o.val();
            if (t._options && t._options.maxLength && a.length >= t._options.maxLength && (a = a.substr(0, t._options.maxLength)),
            o.val() !== a) {
                var s = o[0].selectionStart;
                o.val(a),
                n.setCaretToPos(o[0], s);
            }
            e = t._options && "function" == typeof t._options.spanProcessor ? t._options.spanProcessor(r.escape(a)) : r.escape(a),
            i.html(e + "\n");
        }
    });
}),
define("/styles/WBContentFakable.js", {
    name: "WBContentFakable",
    data: ".content-fakable .display-view{overflow:hidden;white-space:pre-wrap;word-wrap:break-word;}.content-fakable .display-view span{white-space:pre-wrap;-webkit-user-select:text !important;-moz-user-select:text !important;-ms-user-select:text !important;user-select:text !important}.content-fakable textarea,.content-fakable pre{-moz-tab-size:1;-o-tab-size:1;-webkit-tab-size:1;-moz-tab-size:1;-o-tab-size:1;tab-size:1}"
}),
define("wunderbits/WBContentFakable", ["./WBRuntime", "./helpers/selection", "./WBView", "./WBModel", "./WBExpandableTextareaView", "./mixins/LinkingViewMixin", "./mixins/EmailLinkingViewMixin", "./mixins/UnicodeEmojiViewMixin", "./helpers/strings", "project!core", "style!WBContentFakable"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = e.$
      , m = e._
      , p = c.WBDeferred
      , g = i.prototype
      , f = i.extend({
        className: "content-fakable",
        styles: [d],
        events: function() {
            var t = {
                "mouseup .display-view span": "_onClickWord",
                "mousedown .display-view span": "setNewFocus",
                "keydown .edit-view textarea": "_onEditKeydown",
                "keyup .edit-view textarea": "_debouncedOnEditKeyup",
                "blur .edit-view textarea": "_onEditBlur"
            };
            if (e.env.isTouchDevice()) {
                var i = {
                    "ontouchstart .display-view span": "_onClickWord",
                    "mousedown .display-view span": "_override",
                    "mouseup .display-view span": "_override"
                };
                m.extend({}, t, i);
            }
            return t;
        },
        _override: function() {},
        initialize: function() {
            var e = this;
            e.rendered = new p(),
            g.initialize.apply(e, arguments),
            e.model = new n(),
            e.bindTo(e.model, "change:content", e._onUpdateContent),
            e.textareaView = e.addSubview(new o(e.options)),
            e._debouncedOnEditKeyup = m.debounce(e._editKeyUpHandler, 1e3),
            e._debouncedRenderDisplay = m.debounce(e.renderDisplayView, 1e4);
        },
        render: function(e) {
            var t, i, n = this;
            return n.$el && n.$el.children().remove(),
            g.render.apply(n, arguments),
            n._options = e || {},
            n._options.context = e.context || n,
            n._options.markupDelay = n._options.markupDelay || 0,
            n._isVisible = n._options.scrollContainer ? !1 : !0,
            n.model.set({
                content: n._options.content,
                maxLength: n._options.maxLength
            }, {
                silent: !0
            }),
            t = n.model.attributes.content,
            i = t && e.showLoading ? "Loading ..." : m.escape(n.model.attributes.content),
            n.$el.empty().append('<div class="display-view"/><div class="edit-view hidden"/>'),
            n.$(".display-view").empty().append(i),
            n.$(".edit-view").empty()[0].appendChild(n.textareaView.render({
                content: t,
                maxLength: n.model.attributes.maxLength,
                spanProccessor: n._markupForDisplay
            }).el),
            n.destroyed ? void 0 : (n._options.scrollContainer ? n.scrollCheck() : n.renderDisplayView(),
            n._isEditing = !1,
            n.rendered.resolve(),
            n);
        },
        renderDisplayView: function() {
            var e = this;
            if (!e.destroyed) {
                var t = e.$(".display-view")
                  , i = u("<span/>")
                  , n = e.model.attributes.content || "";
                i.text(n),
                e.wrapTextNodesInSpan(i),
                t.html(i.html()),
                e._isVisible = !0,
                i.remove(),
                i = null;
                var o = e.$(".display-view span");
                e._options.convertLinks && (e.renderEmails(o),
                e.renderLinks(o)),
                e.renderEmoji(o);
            }
        },
        onDestroy: function() {
            var e = this;
            e.destroySubviews();
        },
        wrapTextNodesInSpan: function(e) {
            var t = e.contents().filter(function() {
                return 3 === this.nodeType;
            })
              , i = u.each(t, function() {
                u(this).wrap("<span>");
            });
            return i;
        },
        onRemove: function() {
            var e = this;
            e.model.off("change:content", e._onUpdateContent),
            e._options.scrollContainer && u(e._options.scrollContainer).off("scroll");
        },
        onShowEditMode: function() {
            var e = this
              , t = e._options || {};
            if (!t.disableEdit) {
                var i = e.$(".edit-view")
                  , n = e.$(".display-view");
                "function" == typeof t.breaker && t.breaker.call(t.context) || (e._isEditing = !0,
                n.addClass("hidden"),
                i.removeClass("hidden").find("textarea").focus(),
                "function" == typeof t.onShowEdit && t.onShowEdit.call(t.context));
            }
        },
        _onHideEditMode: function() {
            var e = this
              , t = e._options || {}
              , i = e.$(".edit-view")
              , n = e.$(".display-view");
            e._isEditing = !1,
            n.removeClass("hidden"),
            i.addClass("hidden"),
            "function" == typeof t.onShowDisplay && t.onShowDisplay.call(t.context);
        },
        _onEditKeydown: function(e) {
            var t = this
              , i = t._options;
            if (i.saveOnEnter && 13 === e.which) {
                if (i.multiLine && e.shiftKey)
                    return;
                e.preventDefault(),
                t._onHideEditMode(),
                t._onSaveChanges();
            } else
                27 === e.which && t._onCancelChanges();
        },
        setNewFocus: function(e) {
            var t = this;
            t.trigger("focusElement"),
            t.selectionCollapsed || e.stopPropagation();
        },
        _onClickWord: function(e) {
            var t = this
              , i = t._options
              , n = u(e.target).closest("span");
            if (!("function" == typeof i.breaker && i.breaker.call(i.context) || i.disableEdit)) {
                var o = n.prevAll().text().length;
                t.editCursorPosition = (t._getSelectionOffset(n[0]) || 0) + o,
                t.delay(t._moveCursorToNewPosition, 50);
            }
        },
        _getSelectionOffset: function(e) {
            var t, i = this, n = 0;
            if (i.selectionCollapsed = !1,
            window.getSelection) {
                var o = window.getSelection();
                if (0 === o.rangeCount)
                    return;
                t = o.getRangeAt(0);
                var a = t.cloneRange();
                a.selectNodeContents(e),
                o.isCollapsed || "Range" !== o.type || i._isEditing ? "Caret" === o.type && (i.rangeStart = null) : (i.selectionCollapsed = !0,
                i.rangeStart = t.startOffset,
                i.rangeEnd = t.endOffset,
                a.setStart(t.startContainer, t.startOffset)),
                a.setEnd(t.endContainer, t.endOffset),
                n = a.toString().length;
            } else if (document.selection && document.selection.type) {
                var r = document.selection.createRange()
                  , s = document.body.createTextRange();
                s.moveToElementText(e),
                s.setEndPoint("EndToEnd", r),
                n = s.text.length;
            }
            return n;
        },
        _moveCursorToNewPosition: function() {
            var e, i = this, n = i._options || {};
            i.selectionCollapse = !1;
            var o = i.$(".display-view")
              , a = i.$(".edit-view");
            if (!("function" == typeof n.breaker && n.breaker.call(n.context) || n.disableEdit)) {
                i._isEditing = !0,
                n.scrollContainer && (e = n.scrollContainer.scrollTop()),
                o.addClass("hidden"),
                a.removeClass("hidden");
                var r = a.find("textarea").focus();
                i.rangeStart ? t.setSelectionRange(r[0], i.rangeStart, i.rangeEnd) : t.setCaretToPos(r[0], i.editCursorPosition),
                e && n.scrollContainer.scrollTop(e),
                "function" == typeof n.onShowEdit && n.onShowEdit.call(n.context);
            }
        },
        _onEditBlur: function() {
            var e = this;
            e._onHideEditMode(),
            e._onSaveChanges(),
            e.defer(e.renderDisplayView);
        },
        scrollCheck: function() {
            var e, t, i, n, o, a, r, s, l, c, d = this, m = 100;
            d._isVisible || (e = u(d._options.scrollContainer),
            e.length && (t = d.$el,
            i = e.position(),
            n = e.height(),
            o = t.offset(),
            a = 0,
            r = o.top,
            s = !1,
            l = i.top + n,
            c = i.top,
            l >= r - m && (s = !0,
            s !== d._isVisible && s === !0 && d.renderDisplayView())));
        },
        _onUpdateContent: function() {
            var e = this;
            e._isEditing || e.updateTextArea(),
            e.renderDisplayView();
        },
        isEditing: function() {
            return !!this._isEditing;
        },
        updateTextArea: function() {
            var e = this
              , t = e.$("textarea")
              , i = e.model.attributes.content;
            u.trim(t.val()) !== i && (t.val(i),
            t.text(i),
            e.$("pre").text(i + "\n"));
        },
        _onEditKeyup: function() {},
        _editKeyUpHandler: function() {
            var e = this;
            !e.destroyed && e._options && e._options.autoSave && (e._onSaveChanges(),
            e._debouncedRenderDisplay());
        },
        _onCancelChanges: function() {
            var e = this;
            e.$("textarea").val(e.model.attributes.content),
            e._onHideEditMode();
        },
        _onSaveChanges: function() {
            var e = this
              , t = u.trim(e.$("textarea").val());
            t = l.emojiTokensToUnicode(t),
            t !== e.model.attributes.content && e.model.set("content", t);
        }
    });
    return [a, r, s].forEach(function(e) {
        e.applyToClass(f);
    }),
    f;
}),
define("views/TaskDetail/Controllers/TaskDetailNoteFullscreenViewController", ["application/runtime", "wunderbits/helpers/selection", "wunderbits/data/keycodes", "wunderbits/WBModalViewController"], function(e, t, i, n, o) {
    var a = e.$;
    return n.extend({
        onDebouncedKeydown: o,
        "implements": {
            "close:self": "closeSelf",
            "focus:changed": "onChangeFocus",
            "click:close": "onClose",
            "click:content": "onToggleEditMode",
            "click:body": "onToggleEditMode",
            "keydown:textarea": "onTextareaKeydown",
            mousedown: "onMouseDown",
            mouseup: "fixScroll"
        },
        onChangeFocus: function(e) {
            var t = this;
            t.view.currentFocus = e;
        },
        closeSelf: function() {
            var t = this
              , i = t.view;
            i.isEditing || e.trigger("route:" + i.taskModel.route());
        },
        onClose: function() {
            var t = this
              , i = t.view
              , n = i.taskModel
              , o = i.isEditing ? "/note/edit" : "/note/focus";
            !i.destroyed && n && "function" == typeof n.route && e.trigger("route:" + n.route(o));
        },
        onToggleEditMode: function(e) {
            var i = this
              , n = i.view
              , r = !1;
            e && (r = a(e.target).is("span")),
            r || (n.contentFakable.onShowEditMode(),
            i.cursor !== o && t.setCaretToPos(n.$el.find("textarea")[0], i.cursor),
            n.changeUrl(!0));
        },
        onTextareaKeydown: function(e) {
            var t = this
              , n = t.view
              , o = n.$el.parent().find(".close")
              , a = o.is(":focus");
            e.which !== i.tab || a ? e.which === i.tab && a && (t.stopEventFully(e),
            n.$(".note-body").click()) : (t.stopEventFully(e),
            o.focus());
        },
        onMouseDown: function(e) {
            var t = this;
            t.cursor = t.getCaretFromMouse(e);
        },
        getCaretFromMouse: function(e) {
            var i, n = this, o = n.view, r = a(e.target).is("span"), s = o.$el.find("textarea")[0], l = o.$el.find(".note")[0];
            return !r && s && l && (i = t.getCaretFromMousePos(s, l, e)),
            i;
        },
        fixScroll: function(e) {
            var t = this
              , i = t.view
              , n = i.$el.find(".note")
              , a = n.position().top
              , r = i.$el.find(".content-inner");
            t.cursor === o && ("mousedown" === e.type ? t.scrollTop = a : t.scrollTop && 0 !== t.scrollTop && r.scrollTop(-t.scrollTop));
        }
    });
}),
define("/templates/modals/noteModal.js", {
    name: "modals/noteModal",
    data: {
        "1": function(e, t, i, n) {
            var o, a, r = "function", s = ' <div class="head"> <h2 class="title">';
            return a = t.title || e && e.title,
            o = typeof a === r ? a.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : a,
            (o || 0 === o) && (s += o),
            s += "</h2> ",
            o = t["if"].call(e, e && e.close, {
                name: "if",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (s += o),
            s + " </div> ";
        },
        "2": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return ' <a class="close" tabindex="0" data-key-aria-label="button_done"> ' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
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
            }) : a)) + ' shown"> ';
            return o = t["if"].call(e, e && e.title, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + ' <div class="content"> <div class="content-inner"> <div class="note selectable"> <div class="note-body"> </div> </div> </div> </div> </div>';
        },
        useData: !0
    }
}),
define("/styles/modals/noteModal.js", {
    name: "modals/noteModal",
    data: '#fullscreen-note{background:#fbf9e3;width:480px;height:100%;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;}#fullscreen-note .content{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}#fullscreen-note .head{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;}#fullscreen-note .head h2{text-shadow:0 1px 0 #fff;text-align:center;font-weight:bold;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;color:#b29559;margin:12px 10px;padding:0;font-size:14px;text-shadow:0 1px 0 rgba(255,255,255,0.65);-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}#fullscreen-note .head .close{padding:10px;}#fullscreen-note .head .close:focus{-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);z-index:500}#fullscreen-note .head .close svg{fill:#737272}#fullscreen-note .content-inner{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;background:#fbf9e3;padding:0;overflow-x:hidden;overflow-y:auto;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-bottom:4px;}#fullscreen-note .content-inner a{color:#328ad6}#fullscreen-note .note{background-image:-webkit-linear-gradient(top, rgba(0,0,0,0.08) 1px, transparent 1px);background-image:-moz-linear-gradient(top, rgba(0,0,0,0.08) 1px, transparent 1px);background-image:-o-linear-gradient(top, rgba(0,0,0,0.08) 1px, transparent 1px);background-image:-ms-linear-gradient(top, rgba(0,0,0,0.08) 1px, transparent 1px);background-image:linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px);-webkit-background-size:100% 26px;-moz-background-size:100% 26px;background-size:100% 26px;border:none;padding:7px 15px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}#fullscreen-note .note.selectable div,#fullscreen-note .note.selectable span{-webkit-user-select:text !important;-moz-user-select:text !important;-ms-user-select:text !important;user-select:text !important}#fullscreen-note .note .note-body,#fullscreen-note .note .note-edit{margin-top:0;padding:0;font-size:14px;line-height:26px;min-height:200px;word-wrap:break-word}#fullscreen-note .note textarea{-webkit-box-shadow:none;box-shadow:none}html[dir="rtl"] #fullscreen-note a.close{left:0;right:initial}body.msie #fullscreen-note .note{background-image:-webkit-linear-gradient(top, rgba(0,0,0,0.08) 2px, transparent 1px);background-image:-moz-linear-gradient(top, rgba(0,0,0,0.08) 2px, transparent 1px);background-image:-o-linear-gradient(top, rgba(0,0,0,0.08) 2px, transparent 1px);background-image:-ms-linear-gradient(top, rgba(0,0,0,0.08) 2px, transparent 1px);background-image:linear-gradient(to bottom, rgba(0,0,0,0.08) 2px, transparent 1px)}'
}),
define("views/TaskDetail/TaskDetailNoteFullscreenView", ["application/runtime", "actions/Factory", "wunderbits/WBContentFakable", "wunderbits/WBModalView", "views/TaskDetail/Controllers/TaskDetailNoteFullscreenViewController", "wunderbits/WBBlurHelper", "project!core", "template!modals/noteModal", "style!modals/noteModal"], function(e, t, i, n, o, a, r, s, l, c) {
    var d = e._
      , u = e.$
      , m = r.WBDeferred
      , p = r.lib.when
      , g = n.prototype
      , f = a;
    return n.extend({
        templates: {
            note: s
        },
        styles: [l],
        "implements": [o],
        observes: {
            runtime: {
                "fullscreenNote:close": ">close:self",
                "focus:changed": ">focus:changed"
            }
        },
        emits: {
            "click .close": "click:close",
            "click .content": "click:content",
            "click .note-body": "click:body",
            blur: "click:close",
            keydown: "keydown:textarea",
            mousedown: "mousedown",
            mouseup: "mouseup"
        },
        initialize: function(n) {
            var o = this;
            n || (n = {}),
            g.initialize.apply(o, arguments),
            o.ready = new m(),
            o.notesReady = o.deferred(),
            o.listsReady = o.deferred(),
            o.contentFakable = o.addSubview(new i({
                fontSize: 14,
                lineheight: 26
            })),
            o.noteLookup = t.noteLookup(),
            o.createNote = t.createNote(),
            o.listLookup = t.listLookup(),
            o.bindTo(e, "notes:ready", function() {
                o.notesReady.resolve();
            }),
            o.bindTo(e, "lists:ready", function() {
                o.listsReady.resolve();
            }),
            p([o.listsReady, o.notesReady]).done(function() {
                o.ready.resolve();
            });
        },
        renderData: {
            id: "fullscreen-note",
            title: c,
            close: "Close"
        },
        formatData: function(e) {
            var t = this
              , i = t.taskModel && t.taskModel.attributes;
            return i && (e.title = d.escape(t.getListTitleFromID(i.list_id) + " - " + i.title)),
            e;
        },
        render: function(e) {
            var t = this;
            return t.rendered = t.deferred(),
            t.$el && t.$el.children().remove(),
            t.taskModel = e.taskModel,
            t.notes = t.taskModel && t.noteLookup.getNoteCollectionForTask(t.taskModel.id),
            t.noteModel = t.notes && t.notes.models.length ? t.notes.models[0] : null,
            t.ready.done(function() {
                var e = t.templates.note(t.formatData(t.renderData));
                t.$el.html(e),
                t.$(".note-body").append(t.contentFakable.render({
                    context: t,
                    content: t.noteModel ? t.noteModel.attributes.content : "",
                    maxLength: 1e9,
                    autoSave: !0,
                    convertLinks: !0,
                    saveOnEnter: !1,
                    onShowDisplay: t.onDisplay,
                    onShowEdit: t.onEdit,
                    scrollContainer: t.$(".content-inner")
                }).$el),
                t.$(".close").removeClass("blue"),
                t.rendered.resolve();
            }),
            t.$el.addClass("hidden"),
            t.setupBinds(),
            t.delay(function() {
                t.trigger("click:content");
            }, 500),
            t;
        },
        setupBinds: function() {
            var e = this;
            e.notesBind && e.unbindFrom(e.notesBind),
            e.contentBind && e.unbindFrom(e.contentBind),
            e.taskBind && e.unbindFrom(e.taskBind),
            e.notesBind = e.notes && e.bindTo(e.notes, "add remove", "onNoteAddRemove"),
            e.contentBind = e.bindTo(e.contentFakable.model, "change:content", e.onSaveChanges),
            e.taskBind = e.taskModel && e.bindTo(e.taskModel, "change:title", e.onChangeTitle);
        },
        onNoteAddRemove: function() {
            var e = this;
            e.noteModel && e.unbindFromTarget(e.noteModel),
            e.noteModel = e.notes && e.notes.models.length ? e.notes.models[0] : null,
            e.noteModel && e.bindTo(e.noteModel, "change:content", e.onChangeContent),
            e.onChangeContent();
        },
        onDestroy: function() {
            var e = this
              , t = e.contentFakable;
            !t.destroyed && t.destroy();
        },
        _getUrl: function(e) {
            var t = this.taskModel;
            return t && t.route(e);
        },
        getDisplayUrl: function() {
            return this._getUrl("/note/fullscreen");
        },
        getEditUrl: function() {
            return this._getUrl("/note/edit/fullscreen");
        },
        onDisplay: function() {
            var e = this;
            e.isEditing = !1,
            e.changeUrl(!1),
            f.run();
        },
        changeUrl: function(t) {
            var i = this
              , n = {
                trigger: !1
            }
              , o = i.getEditUrl()
              , a = i.getDisplayUrl();
            (e.currentRoute() === o || e.currentRoute() === a) && (n.replace = !0);
            var r = t ? o : a;
            r && e.trigger("route:" + r, n);
        },
        onEdit: function() {
            var e = this;
            e.isEditing = !0,
            e.changeUrl(!0);
        },
        onSaveChanges: function() {
            var t = this;
            if (-1 !== e.currentRoute().indexOf("/fullscreen")) {
                var i = t.contentFakable.model.attributes.content;
                t.createNote.upsertNote(i, t.taskModel.id);
            }
        },
        onChangeContent: function() {
            var e = this;
            e.rendered.done(function() {
                var t = e.noteModel
                  , i = t ? t.attributes.content : "";
                u.trim(e.contentFakable.model.attributes.content) !== u.trim(i) && e.contentFakable.model.set("content", i);
            });
        },
        onChangeTitle: function() {
            var e = this;
            e.rendered.done(function() {
                var t = e.$el.find(".head .title");
                t.text(e.getListTitleFromID(e.taskModel.attributes.list_id) + " : " + e.taskModel.attributes.title);
            });
        },
        getListTitleFromID: function(t) {
            return "inbox" === t ? e.language.getText("smart_list_inbox") : this.listLookup.getListModel(t).attributes.title;
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailNoteViewController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        "implements": {
            mousedown: "onMouseDown",
            "toggle:edit": "debouncedOnToggleEditMode",
            "show:fullscreen": "debouncedOnShowFullscreen",
            "force:fullscreen": "onShowFullscreen",
            focus: "onFocusSelf",
            "blur:note": "onBlurNote",
            keydown: "handleKeys",
            "event:kill": "stopEventFully"
        },
        handleKeys: function(i) {
            var n = this
              , o = n.view
              , a = i.target === o.el;
            if (o.isEditing() || i.which !== t.enter)
                i.which !== t.esc || a || (e.trigger("route:" + o.model.route("/note/focus")),
                n.stopEventFully(i));
            else {
                var r = e.currentRoute().indexOf("/openFullscreenNote/") >= 0;
                r ? n.onShowFullscreen() : n.debouncedOnToggleEditMode(),
                n.stopEventFully(i);
            }
        },
        onFocusSelf: function() {
            this.view.focusSelf();
        },
        initialize: function() {
            var e = this;
            e.debouncedOnShowFullscreen = e.debounce(e.onShowFullscreen, 250, !0),
            n.initialize.apply(e, arguments);
        },
        onMouseDown: function(e) {
            var t = this
              , i = t.view;
            i.cursor = i.getCaretFromMouse(e),
            i.fixScroll(),
            i.triggerFocusChange();
        },
        fixScroll: function() {
            this.view.fixScroll.apply(this.view, arguments);
        },
        debouncedOnToggleEditMode: function() {
            var e = this;
            e.view.toggleFullscreenButton(!0),
            e.view.debouncedOnToggleEditMode.apply(this.view, arguments);
        },
        onBlurNote: function() {
            var t = this;
            t.view.toggleFullscreenButton(!1),
            t.defer(function() {
                e.trigger("route:" + t.view.model.route("/note/focus"));
            });
        },
        onShowFullscreen: function() {
            var t = this.view;
            e.trigger("route:" + t.model.route("/note/edit/fullscreen"));
        }
    });
}),
define("/templates/symbols/fullscreen.js", {
    name: "symbols/fullscreen",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="fullscreen" width="20px" height="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"> <g> <path d="M12.5,10c-0.276,0-0.5,0.224-0.5,0.5v3c0,0.275-0.225,0.5-0.5,0.5h-6C5.224,14,5,13.775,5,13.5v-6 C5,7.224,5.224,7,5.5,7h3C8.776,7,9,6.776,9,6.5S8.776,6,8.5,6h-3C4.673,6,4,6.673,4,7.5v6C4,14.327,4.673,15,5.5,15h6 c0.827,0,1.5-0.673,1.5-1.5v-3C13,10.224,12.776,10,12.5,10z"/> <path d="M14.962,4.309c-0.051-0.122-0.148-0.22-0.271-0.271C14.63,4.013,14.565,4,14.5,4h-4 C10.224,4,10,4.224,10,4.5S10.224,5,10.5,5h2.793l-5.146,5.146c-0.195,0.195-0.195,0.512,0,0.707C8.244,10.951,8.372,11,8.5,11 s0.256-0.049,0.354-0.146L14,5.707V8.5C14,8.776,14.224,9,14.5,9S15,8.776,15,8.5v-4C15,4.435,14.987,4.37,14.962,4.309z"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/detailview/detailNote.js", {
    name: "detailview/detailNote",
    data: {
        "1": function() {
            return "hidden";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="section-icon">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "options", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</div> <div class="section-content top"> <div class="section-title note-add ';
            return o = t.unless.call(e, e && e.showAddButton, {
                name: "unless",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '"> ' + s((a = t.localized || e && e.localized || r,
            a.call(e, "placeholder_add_note", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> <div class="note-body selectable ',
            o = t["if"].call(e, e && e.showAddButton, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '"></div> </div> <div class="section-attachments"> <a class="open-fullscreen-note" data-key-aria-label="aria_note_fullscreen" data-key-title="aria_note_fullscreen" role="button" aria-haspopup="true" tabindex="0"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "fullscreen", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> </div> ";
        },
        useData: !0
    }
}),
define("/styles/detailview/_note.js", {
    name: "detailview/_note",
    data: ".note.hasNote .section-icon svg{fill:#e29600}.note .note-body,.note .note-edit{height:auto;border:none;font-size:15px;line-height:20px;word-wrap:break-word;}.note .note-body .expandingArea textarea,.note .note-edit .expandingArea textarea,.note .note-body .expandingArea pre,.note .note-edit .expandingArea pre{min-height:100px !important}.note .note-body.selectable div,.note .note-edit.selectable div,.note .note-body.selectable span,.note .note-edit.selectable span{-webkit-user-select:text !important;-moz-user-select:text !important;-ms-user-select:text !important;user-select:text !important}.note .open-fullscreen-note{fill:#262626}.note textarea{-webkit-box-shadow:none;box-shadow:none}.note a{color:#328ad6}"
}),
define("views/TaskDetail/TaskDetailNoteView", ["application/runtime", "project!core", "actions/Factory", "wunderbits/helpers/selection", "views/TaskDetail/TaskDetailNoteFullscreenView", "wunderbits/WBContentFakable", "wunderbits/WBViewPresenter", "views/TaskDetail/Controllers/TaskDetailNoteViewController", "partial!symbols/fullscreen", "template!detailview/detailNote", "style!detailview/_note"], function(e, t, i, n, o, a, r, s, l, c, d, u) {
    var m = e.$
      , p = t.WBStateModel
      , g = t.lib.when
      , f = r.prototype;
    return r.extend({
        template: c,
        styles: [d],
        className: "section section-item note",
        attributes: {
            "data-key-aria-label": "placeholder_add_note",
            role: "textbox",
            "aria-multiline": !0,
            tabindex: 0
        },
        "implements": [s],
        observes: {
            runtime: {
                "focus:changed": "onChangeFocus"
            },
            contentFakableModel: {
                "change:content": "onSaveChanges"
            },
            noteState: {
                "change:isEditing": "handleStates",
                "change:hasNote": "handleStates"
            }
        },
        emits: {
            "click .note-add": "toggle:edit",
            "click .note-body": "toggle:edit",
            "mousedown .note-body": "mousedown",
            "mousedown .note-add": "event:kill",
            "click .open-fullscreen-note": "show:fullscreen",
            "blur textarea": "blur:note",
            keydown: "keydown"
        },
        renderData: {
            showAddButton: !0
        },
        formatData: function(e) {
            var t = this;
            e = f.formatData.call(t, e);
            var i = t.noteState.attributes;
            return e.showAddButton = !i.hasNote && !i.isEditing,
            e;
        },
        _override: function() {},
        initialize: function() {
            var t = this;
            t.contentFakable = t.addSubview(new a({
                placeholderKey: "placeholder_add_note",
                lineHeight: 20,
                fontSize: 15
            })),
            t.contentFakableModel = t.contentFakable.model,
            t.noteState = new p({}),
            f.initialize.apply(t, arguments),
            t.createNote = i.createNote(),
            t.noteLookup = i.noteLookup(),
            t.debouncedScrollCheck = t.debounce(t.scrollCheck, 250),
            t.debouncedOnToggleEditMode = t.debounce(t.onToggleEditMode, 250, !0),
            t.renderedOnce = t.deferred(),
            t.notesReady = t.deferred(),
            t.bindOnceTo(e, "notes:ready", function() {
                t.notesReady.resolve();
            });
        },
        render: function(e) {
            var t = this;
            return t.rendered = t.deferred(),
            t.model && t.unbindFromTarget(t.model),
            t.notes && t.unbindFromTarget(t.notes),
            t.scrollBind && t.unbindFrom(t.scrollBind),
            t.options = e || {},
            t.model = t.options.model || t.model,
            t.notes = t.noteLookup.getNoteCollectionForTask(t.model.id),
            t.bindTo(t.notes, "add remove", "onNoteAddRemove"),
            t.noteModel = t.notes.models.length ? t.notes.models[0] : null,
            e.animationDeferred.done(function() {
                var e = t.formatData(t.renderData);
                f.render.call(t, e);
                var i = t.noteModel ? t.noteModel.attributes.content : "";
                t._setHasNote(!!i),
                t.$(".note-body")[0].appendChild(t.contentFakable.render({
                    context: t,
                    disableEdit: t.isNoteDisabled,
                    content: i,
                    maxLength: 1e9,
                    autoSave: !0,
                    convertLinks: !0,
                    saveOnEnter: !1,
                    onShowDisplay: t.onDisplay,
                    onShowEdit: t.onEdit,
                    scrollContainer: m("#detail .body")
                }).el),
                t.noteModel && t.bindTo(t.noteModel, "change:content", t.onChangeTitle),
                t.scrollBind = t.bindTo(m("#detail .body"), "scroll", t.debouncedScrollCheck),
                t.renderAriaLabel(),
                t.rendered.resolve(),
                t.renderedOnce.resolve();
            }),
            t;
        },
        handleStates: function() {
            var e = this;
            e.rendered.done(function() {
                var t = e.noteState.attributes
                  , i = t.isEditing || t.hasNote;
                e.$el.toggleClass("hasNote", t.hasNote),
                e.$(".note-add").toggleClass("hidden", i),
                e.$(".note-body").toggleClass("hidden", !i);
            });
        },
        _setHasNote: function(e) {
            this.noteState.save({
                hasNote: e
            });
        },
        _setEditing: function(e) {
            this.noteState.save({
                isEditing: e
            });
        },
        isEditing: function() {
            return this.noteState.attributes.isEditing;
        },
        renderAriaLabel: function() {
            var t = this
              , i = t.noteModel ? t.noteModel.attributes.content : "";
            i = i && i.length ? i : e.language.getText("placeholder_add_note");
            var n = e.language.getText("aria_press_enter_to_edit");
            t.$el.attr("aria-label", i + n);
        },
        onNoteAddRemove: function() {
            var e = this;
            e.noteModel && e.unbindFromTarget(e.noteModel),
            e.noteModel = e.notes && e.notes.models.length ? e.notes.models[0] : null,
            e.noteModel && e.bindTo(e.noteModel, "change:content", e.onChangeTitle),
            e.onChangeTitle();
        },
        onDestroy: function() {
            var e = this.contentFakable;
            !e.destroyed && e.destroy();
        },
        scrollCheck: function() {
            this.contentFakable.scrollCheck();
        },
        onDisplay: function() {
            var t = this;
            t._setEditing(!1),
            e.trigger("route:" + t.model.route(), {
                trigger: !1
            }),
            e.trigger("focus:set", "browser");
        },
        onEdit: function() {
            var t = this;
            t._setEditing(!0),
            e.trigger("route:" + t.model.route("/note/edit"), {
                trigger: !1
            }),
            t.triggerFocusChange(),
            t.$("textarea").focus();
        },
        onToggleEditMode: function(t) {
            var i = this
              , o = !1;
            g(i.renderedOnce, i.notesReady).done(function() {
                return t && (o = m(t.target).is("span"),
                i.isNoteDisabled) ? (t.stopPropagation(),
                t.preventDefault(),
                i._setEditing(!0),
                void i.trigger("force:fullscreen")) : void (o || i.rendered.done(function() {
                    i.contentFakable.onShowEditMode(),
                    i.cursor !== u && n.setCaretToPos(i.$el.find("textarea")[0], i.cursor),
                    e.trigger("route:" + i.model.route("/note/edit"), {
                        trigger: !1
                    }),
                    i.triggerFocusChange();
                }));
            });
        },
        toggleFullscreenButton: function(e) {
            this.$(".open-fullscreen-note").toggleClass("hidden", !!e);
        },
        onOpenFullscreen: function(e) {
            var t = this;
            e = e || t.isEditing();
            var i = t.addSubview(new o(), "fullscreen");
            m("#modals").append(i.render({
                taskModel: t.model
            }).el),
            i && t.defer(function() {
                !i.destroyed && i.$el && (i.$el.removeClass("hidden"),
                e && (i.contentFakable.onShowEditMode(),
                t.delay(function() {
                    !i.destroyed && i.$el && i.$el.find("textarea").focus();
                }, 100)),
                t.toggleFullscreenButton(!1));
            });
        },
        fixScroll: function() {
            var e = this
              , t = "div.detail-date"
              , i = e.$el.parent().find(t).position();
            i && (e.scrollTop = i.top);
        },
        getCaretFromMouse: function(e) {
            var t, i = this, o = m(e.target).is("span"), a = i.$el.find("textarea")[0], r = i.$el[0];
            return !o && a && r && (t = n.getCaretFromMousePos(a, r, e)),
            t;
        },
        onChangeTitle: function() {
            var e = this
              , t = e.noteModel
              , i = t ? t.attributes.content : ""
              , n = {
                content: i
            };
            e._setHasNote(!!i),
            e.rendered.done(function() {
                e.contentFakable.model.set(n);
            }),
            e.renderAriaLabel();
        },
        onSaveChanges: function() {
            var t = this
              , i = t.model && !t.model.destroying;
            if (i = i && "fullscreenNote" !== t._currentFocus) {
                var n = t.contentFakable.model.attributes.content;
                t.createNote.upsertNote(n, t.model.id),
                e.trigger("detail:checkBounds");
            }
        },
        focusFullscreenButton: function() {
            this.$(".open-fullscreen-note").focus();
        },
        onChangeFocus: function(e) {
            this._currentFocus = e;
        },
        triggerFocusChange: function() {
            e.trigger("focus:set", "detail");
        },
        focusSelf: function() {
            var e = this;
            e.renderedOnce.done(function() {
                e.defer(function() {
                    e.$el.focus();
                });
            });
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailTitleController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "wunderbits/WBViewController"], function(e, t, i, n, o) {
    var a = e.$
      , r = o.prototype
      , s = e.global;
    return o.extend({
        "implements": {
            "click:title": "titleClicked",
            "keydown:title": "titleKeyDown",
            "keydown:textarea": "editTitleKeyDown",
            "blur:textarea": "debounceEditBlur",
            "focus:detail": "focusDetail",
            "silentRoute:edit": "silentRouteToTitleEdit",
            focus: "focusTitle"
        },
        initialize: function() {
            var e = this;
            e.debounceEditBlur = e.debounce(e.editTitleBlur, 100, {
                leading: !0
            }),
            e.taskTitle = t.taskTitle(),
            r.initialize.apply(e, arguments);
        },
        focusTitle: function() {
            this.view.trigger("title:focus");
        },
        titleKeyDown: function(e) {
            var t = this;
            e.which === i.enter && (t.view.trigger("title:toggle:edit"),
            t.stopEventFully(e));
        },
        titleClicked: function(t) {
            var i = this;
            return t ? void (a(t.target)[0] === i.view.$el[0] ? i.editWasBlurred && (i.editWasBlurred = !1) : (i.silentRouteToTitleEdit(),
            e.trigger("analytics:detailView:click:title"))) : (i.view.trigger("title:toggle:edit"),
            void i.view.selectTitle());
        },
        editTitleKeyDown: function(e) {
            var t = this;
            e.which === i.enter ? (t.debounceEditBlur(),
            t.stopEventFully(e)) : e.which === i.esc ? (t.view.trigger("title:toggle:edit", !1),
            t.view.trySetFocusRoute(),
            t.stopEventFully(e)) : e.which === i.backspace || e.which === i.del || (e.metaKey && 86 === e.which ? t.view.trigger("title:render", !0) : e.which === i.tab && (t.focusTitle(),
            t.stopEventFully(e)));
        },
        editTitleBlur: function() {
            var e, t = this;
            t.editWasBlurred = !0,
            e = s.setTimeout(function() {
                t.editWasBlurred = !1;
            }, 100),
            t.saveTitleChanges(),
            t.view.trySetFocusRoute();
        },
        saveTitleChanges: function() {
            var e = this
              , t = e.view
              , i = n.trim(e.view.$("textarea").val())
              , o = t.model.id;
            e.taskTitle.updateTaskTitle(i, o).fail(function() {
                t.destroyed || 0 !== i.length || t.trigger("title:contentFakable:revert");
            });
        },
        silentRouteToTitleEdit: function() {
            var t = this;
            t.focusDetail(),
            e.trigger("route:" + t.view.model.route("/title/edit"), {
                trigger: !1
            });
        },
        focusDetail: function() {
            e.trigger("focus:set", "detail");
        }
    });
}),
define("/templates/detailview/detailTitle.js", {
    name: "detailview/detailTitle",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return '<span class="title-text">' + r((o = t.title || e && e.title,
            typeof o === a ? o.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : o)) + "</span>";
        },
        useData: !0
    }
}),
define("views/TaskDetail/TaskDetailTitleView", ["application/runtime", "helpers/Animator", "wunderbits/helpers/selection", "views/TaskDetail/Controllers/TaskDetailTitleController", "wunderbits/WBContentFakable", "./SectionView", "template!detailview/detailTitle"], function(e, t, i, n, o, a, r) {
    var s = e.$
      , l = a.prototype;
    return a.extend({
        sectionName: "title",
        className: "title",
        attributes: {
            tabindex: 0
        },
        template: r,
        "implements": [n],
        observes: {
            events: {
                "title:contentFakable:revert": "revertContentFakable",
                "title:toggle:edit": "toggleEditTitle",
                "title:render": "renderTitle",
                "title:show:edit": "forceEditMode",
                "title:focus": "focusTitle"
            },
            contentFakable: {
                focusElement: "triggerFocus"
            }
        },
        emits: {
            click: "click:title",
            keydown: "keydown:title",
            "keydown textarea": "keydown:textarea",
            "keyup textarea": "keyup:textarea",
            "blur textarea": "blur:textarea"
        },
        initialize: function() {
            var e = this;
            e.contentFakable = e.addSubview(new o({
                lineHeight: 24,
                fontSize: 16
            })),
            l.initialize.apply(e, arguments);
        },
        setAnimationDefaults: function() {
            var e = this
              , t = s("#detail")
              , i = e.$el
              , n = i.clone(!1).addClass("clone")
              , o = t.find(".body")
              , a = o.clone(!1).addClass("clone");
            n.css("visibility", "hidden"),
            n.find(".title-text").removeClass("hidden").text(""),
            t.find(".inner").append(n, a),
            a = t.find(".body.clone"),
            n = t.find(".title.clone"),
            e.defaultTitleContainerHeight = n.height(),
            e.defaultBodyContainerTop = Number(a.css("top").replace("px", "")),
            n.remove(),
            a.remove();
        },
        render: function(e) {
            var t = this;
            return e = e || {},
            e.model && (t.model = e.model),
            t.model && t.setupModel(t.model),
            l.render.call(t),
            t.setAnimationDefaults(),
            t.renderContentFakable(),
            t.hasRendered = !0,
            t;
        },
        renderWithModel: function(e) {
            var t = this;
            e !== t.model && (t.setupModel(e),
            t.hasRendered ? (t.renderTitle(),
            t.renderContentFakableWithModel()) : (t.render(),
            t.renderContentFakableWithModel()));
        },
        setupModel: function(e) {
            var t = this;
            t.model && t.unbindFromTarget(t.model),
            t.model = e || t.model,
            t.bindTo(t.model, "change:title", t.changeTitle);
        },
        renderTitle: function() {
            var e = this;
            e.$el.attr("aria-label", "Title: " + e.model.attributes.title);
        },
        renderContentFakable: function() {
            var e = this
              , t = e.$(".title-text");
            t.html(e.contentFakable.render({
                context: e,
                content: e.model.attributes.title,
                maxLength: 255,
                autoSave: !1,
                convertLinks: !1,
                saveOnEnter: !0
            }).el);
        },
        renderContentFakableWithModel: function() {
            var e = this
              , t = e.contentFakable;
            t.model.set({
                content: e.model.attributes.title
            }),
            t.isEditing() && t.updateTextArea();
        },
        revertContentFakable: function() {
            var e = this;
            e.contentFakable.render({
                context: e,
                content: e.model.attributes.title,
                maxLength: 255
            });
        },
        toggleEditTitle: function(e) {
            var t = this
              , i = t.$el
              , n = i.find(".expandingArea")
              , o = i.find(".title-text")
              , a = t.isEditingTitle();
            a && e !== !0 || e === !1 ? (n.find("textarea").val(""),
            o.removeClass("hidden")) : (t.contentFakable.onShowEditMode(),
            n.removeClass("hidden").find("textarea"),
            t.trigger("silentRoute:edit"));
        },
        forceEditMode: function() {
            var e = this;
            e.contentFakable.onShowEditMode(),
            e.$(".expandingArea").removeClass("hidden");
        },
        selectTitle: function() {
            this.$el.find(".expandingArea textarea").select();
        },
        changeTitle: function() {
            var e = this
              , t = e.model.attributes
              , i = e.contentFakable.model.attributes.content === t.title;
            e.isEditingTitle() || i || e.contentFakable.model.set({
                content: t.title
            });
        },
        focusTitle: function() {
            this.$el.focus();
        },
        triggerFocus: function() {
            this.trigger("focus");
        },
        isEditingTitle: function() {
            return !this.$(".edit-view").hasClass("hidden");
        }
    });
}),
define("/templates/detailview/file.js", {
    name: "detailview/file",
    data: {
        "1": function() {
            return ' <span class="icon-file files-dropbox-small"/> ';
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = t.helperMissing, c = '<div class="section-icon"></div> <div class="section-content section-content-file" tabindex="0" aria-label="' + s((a = t.fileName || e && e.fileName,
            typeof a === r ? a.call(e, {
                name: "fileName",
                hash: {},
                data: n
            }) : a)) + '" role="button"> <div class="file-preview"> <img class="file-image" /> <div class="file-extension">' + s((a = t.extension || e && e.extension,
            typeof a === r ? a.call(e, {
                name: "extension",
                hash: {},
                data: n
            }) : a)) + '</div> </div> <div class="file-info"> ';
            return o = t["if"].call(e, e && e.isDropbox, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' <a class="file-name" title="' + s((a = t.fileName || e && e.fileName,
            typeof a === r ? a.call(e, {
                name: "fileName",
                hash: {},
                data: n
            }) : a)) + '">' + s((a = t.fileName || e && e.fileName,
            typeof a === r ? a.call(e, {
                name: "fileName",
                hash: {},
                data: n
            }) : a)) + '</a> <div class="file-progress"> <div class="bar"/> </div> <div class="file-meta" title="' + s((a = t.title || e && e.title,
            typeof a === r ? a.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : a)) + '"> <span class="creator left"></span> <span class="ago">' + s((a = t.ago || e && e.ago,
            typeof a === r ? a.call(e, {
                name: "ago",
                hash: {},
                data: n
            }) : a)) + '</span> <span class="waiting"> &middot; ' + s((a = t.localized || e && e.localized || l,
            a.call(e, "upload_file_not_synced_yet", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</span> </div> </div> <a class="file-delete" data-key-title="button_delete"> ' + s((a = t.symbol || e && e.symbol || l,
            a.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> </div> ";
        },
        useData: !0
    }
}),
define("/styles/detailview/_file.js", {
    name: "detailview/_file",
    data: '.files-list li{position:relative;overflow:hidden}.section-content-file{position:relative;-webkit-border-radius:3px;border-radius:3px;overflow:hidden;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}.section-content-file:after{content:\'\';position:absolute;top:0;border:1px solid rgba(0,0,0,0.1);bottom:0;left:0;right:0;-webkit-border-radius:3px;border-radius:3px;pointer-events:none}.section-content-file:hover .file-delete{opacity:1;-ms-filter:none;filter:none}.file-preview{width:40px;height:40px;}.file-preview .file-extension{text-align:center;color:#f7f7f7;text-transform:uppercase;font-size:11px;height:40px;width:40px;padding-top:15px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:#63b4be}.file-preview .file-image{display:none;height:32px;width:32px;-webkit-border-radius:3px;border-radius:3px}.file-info{margin:0 10px;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;}.file-info .file-progress{display:none;height:6px;width:206px;-webkit-border-radius:8px;border-radius:8px;border:1px solid #9bb8d1;margin-top:9px;}.file-info .file-progress .bar{-webkit-transition:1ms width ease-in;-moz-transition:1ms width ease-in;-o-transition:1ms width ease-in;-ms-transition:1ms width ease-in;transition:1ms width ease-in;background:#ccdae6;height:100%;width:0%;-webkit-border-radius:1px;border-radius:1px}.file-info .file-cancel{display:none;position:absolute;top:28px;right:12px}.file-info .file-name{font-size:13px;font-weight:bold;color:#262626;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:block}.file-info .file-meta{color:#737272;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;}.file-info .file-meta .ago,.file-info .file-meta .waiting{display:inline-block;vertical-align:top;font-size:11px;margin:0 6px}.file-info .file-meta .waiting{font-weight:bold;display:none}.file-info .file-meta .file-size{font-size:10px}.file-delete{margin:0 5px;fill:#262626;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0)}.failed .file-info .file-progress{width:184px;margin-left:22px}.hasPreview:not(.uploading) .file-info{z-index:2;position:absolute;left:0;right:0;bottom:0;padding:8px;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);-webkit-transition:200 opacity ease;-moz-transition:200 opacity ease;-o-transition:200 opacity ease;-ms-transition:200 opacity ease;transition:200 opacity ease;margin:0;}.hasPreview:not(.uploading) .file-info .file-name,.hasPreview:not(.uploading) .file-info .file-meta{color:#fff}.hasPreview:not(.uploading):hover .file-info,.hasPreview:not(.uploading):hover .file-preview:after{opacity:1;-ms-filter:none;filter:none}.hasPreview:not(.uploading) .file-preview{width:100%;height:148px;overflow:hidden;position:relative;float:none;margin:0;}.hasPreview:not(.uploading) .file-preview:after{content:\'\';background:rgba(0,0,0,0.5);position:absolute;left:0;top:0;right:0;bottom:0;z-index:1;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);-webkit-transition:100ms opacity ease;-moz-transition:100ms opacity ease;-o-transition:100ms opacity ease;-ms-transition:100ms opacity ease;transition:100ms opacity ease;-webkit-border-radius:3px;border-radius:3px}.hasPreview:not(.uploading) .file-preview .file-image{width:100%;display:block;min-height:100%;height:auto}.hasPreview:not(.uploading) .file-preview .file-extension{display:none}.hasPreview:not(.uploading) .file-delete{position:absolute;right:0;top:5px;fill:#fff;z-index:1}li.waiting .file-info .file-meta .waiting{display:inline}li.enqueued{display:none}.files-list li.uploading .file-info .file-progress,.files-list li.uploading .file-info .cancel-action{display:block}.files-list li.uploading .file-meta,.files-list li.uploading .file-delete{display:none}'
}),
define("views/TaskDetail/TaskDetailFileView", ["application/runtime", "actions/Factory", "vendor/moment", "helpers/BlobHelper", "wunderbits/helpers/date", "wunderbits/WBView", "views/AvatarView", "template!detailview/file", "style!detailview/_file"], function(e, t, i, n, o, a, r, s, l, c) {
    var d = e._
      , u = a.prototype
      , m = {
        text: {
            checks: [/^text/, /ms-word|iwork-pages|opendocument.text/],
            className: "text"
        },
        packages: {
            checks: [/^application\/(zip|rar|gzip|x-tar|x-apple-diskimage)/],
            className: "package"
        },
        pdf: {
            checks: [/^application\/pdf/],
            className: "pdf"
        },
        audio: {
            checks: [/^audio/],
            className: "audio"
        },
        movies: {
            checks: [/^video/],
            className: "movie"
        },
        images: {
            checks: [/^image/],
            className: "image"
        },
        presentation: {
            checks: [/presentation|powerpoint|iwork-keynote/],
            className: "presentation"
        },
        table: {
            checks: [/spreadsheet|ms-excel|iwork-numbers/],
            className: "table"
        }
    };
    return a.extend({
        styles: [l],
        template: s,
        tagName: "li",
        className: "section-item section-item-file",
        events: {
            click: "onClick",
            "click .file-delete": "onDelete",
            "click .file-cancel": "onCancelUpload"
        },
        renderData: {
            ago: c,
            user_id: c,
            extension: c,
            isEnqueued: c,
            isPro: c,
            isUploading: c,
            isUploadingDone: c,
            isWaiting: c,
            fileName: c,
            previewUrl: c,
            isDropbox: c
        },
        getAvailablePreviewSizes: function() {
            var e = this
              , t = e.model.attributes
              , i = !1
              , n = t.preview;
            if (n) {
                var o = n.size && parseInt(n.size.split("x")[0], 10);
                o >= 300 && (i = !0);
            }
            return i ? "normal" : "small";
        },
        formatData: function(t) {
            var n = this;
            t = u.formatData.call(n, t);
            var a = n.model.attributes;
            return t.ago = i(o.convertServerTimeToLocalTime(a.created_at)).fromNow(),
            t.user_id = n.model.attributes.user_id,
            t.extension = n.getExtensionFromName(a.file_name),
            t.isWaiting = a.state === c && !a.online_id,
            t.isEnqueued = 0 === a.state,
            t.isUploading = 1 === a.state,
            t.isUploadingDone = !(2 !== a.state || !a.online_id),
            t.isPro = e.user.isPro(),
            t.fileName = a.file_name,
            t.previewUrl = a.previewUrl,
            t.isDropbox = "dropbox" === a.file_provider,
            t.title = t.ago,
            t.isWaiting && (t.title += " &middot; " + e.language.getText("upload_file_not_synced_yet")),
            t;
        },
        initialize: function(i) {
            var n = this;
            if (u.initialize.apply(n, arguments),
            n.deleteFile = t.deleteFile(),
            n.tryDelete = n.debounce(n.tryDelete, 1e3, !0),
            n.openUrl = t.openUrl(),
            i.model) {
                var o = n.model = i.model;
                n.bindTo(o, "change:preview", n.renderPreview),
                n.bindTo(o, "change:state", n.onModelStateChange),
                n.bindTo(o, "change:url", function() {
                    n.onModelStateChange(),
                    n.updatePreviewIcon(),
                    n.renderPreview();
                }),
                n.bindTo(o, "destroy", n.onDestroySelf),
                n.bindTo(o, "upload:retrying", n.onRetryUpload),
                n.bindTo(e, "time:nextMinute", n.updateCreatedAt),
                o.uploader ? n.setUploader(o.uploader) : n.bindTo(o, "hasUploader", n.setUploader);
            }
            n.bindTo(n, "delete:file", "onDelete");
        },
        render: function() {
            var t = this;
            if (!t.model || t.destroyed)
                return t;
            var i = t.$el
              , n = t.formatData(t.renderData);
            return u.render.call(t, n),
            n.previewUrl && i.addClass("hasPreview"),
            n.isUploading ? e.user.isIDEqual(n.user_id) ? (i.addClass("uploading"),
            i.toggleClass("failed", !t.uploader)) : i.addClass("enqueued") : n.isUploadingDone ? i.removeClass("uploading") : n.isEnqueued ? i.addClass("enqueued").removeClass("uploading") : n.isWaiting && i.addClass("waiting").removeClass("uploading"),
            t.updatePreviewIcon(),
            t.renderPreview(),
            t.renderAvatar(n.user_id),
            t.uploader && t.onUploadProgress(t.uploader.progress),
            i.attr("rel", t.model.id),
            t.renderAriaLabel(),
            t;
        },
        renderAriaLabel: function() {
            var t = this;
            if (t.collection && t.model && 0 === t.collection.models.indexOf(t.model)) {
                var i = t.model.attributes.file_name
                  , n = e.language.getText("aria_file_navigation_info");
                t.$(".file").attr("aria-label", i + " - " + n);
            }
        },
        setUploader: function(e) {
            var t = this;
            if (!t.uploader) {
                var i = t.bindTo(e, "change:progress", t.onUploadProgress)
                  , n = t.bindTo(e, "change:state", t.onUploadStateChange)
                  , o = t.bindTo(e, "upload:error", t.onUploadError)
                  , a = t.on("cancel:upload", function() {
                    e.trigger("upload:abort"),
                    t.deleteSelf();
                });
                t.bindTo(e, "upload:complete", function() {
                    t.unbindFrom(i),
                    t.unbindFrom(n),
                    t.unbindFrom(o),
                    t.unbindFrom(a),
                    e.destroy(),
                    t.uploader = t.model.uploader = null;
                }),
                t.uploader = t.model.uploader = e;
            }
        },
        renderPreview: function() {
            var e = this;
            e.model.getPreviewUrl().done(function(t) {
                t && !e.destroyed && e.loadPreview(t);
            });
        },
        previewLoadSuccess: function() {
            var e = this;
            if (!e.destroyed) {
                var t = "small" === e.getAvailablePreviewSizes();
                e.$el.addClass("hasPreview"),
                e.$el.toggleClass("small-preview", t);
            }
        },
        previewLoadFailure: function(e) {
            var t = this;
            !t.destroyed && t.delay(function() {
                t.loadPreview(e);
            }, 3e3);
        },
        loadPreview: function(e) {
            var t = this
              , i = t.$(".file-image");
            n.loadImage(e, i, t.previewLoadSuccess.bind(t), function() {
                t.previewLoadFailure(e);
            });
        },
        renderAvatar: function(e) {
            var t = this
              , i = t.$(".creator");
            t.avatarView = t.avatarView || t.addSubview(new r({
                size: "tiny"
            }), "avatarView"),
            i.html(t.avatarView.render({
                id: e
            }).$el);
        },
        updatePreviewIcon: function() {
            var e = this;
            "dropbox" === e.model.attributes.file_provider ? e.renderDropboxPreviewIcon() : e.renderNormalPreviewIcon();
        },
        renderNormalPreviewIcon: function() {
            var e, t = this, i = !1, n = t.model.attributes.content_type;
            d.each(m, function(t) {
                i || d.each(t.checks, function(o) {
                    !i && o.test(n) && (e = t.className,
                    i = !0);
                });
            });
            var o = t.$(".file > .icon-file");
            i && e ? (o.addClass(e + "-thumb"),
            t.$el.addClass(e)) : o.addClass("document-thumb");
        },
        renderDropboxPreviewIcon: function() {
            var e = this
              , t = e.model.attributes.file_icon
              , i = e.$(".file > .icon-file");
            t ? (e.$el.addClass("dropbox-preview"),
            i.css("background-image", "url(" + t + ")")) : i.addClass("document-thumb");
        },
        onClick: function() {
            var e = this
              , t = e.model.attributes.url
              , i = !0;
            t && e.openUrl.openUrl(t, i);
        },
        onCancelUpload: function(e) {
            var t = this;
            t.trigger("cancel:upload"),
            t.$el.addClass("uploading"),
            t.onDelete(e);
        },
        onDelete: function(t, i) {
            var n = this;
            if (t && t.preventDefault(),
            t && t.stopPropagation(),
            !n.isDeleting) {
                var o = "true" === e.settings.get("confirm_delete_entity")
                  , a = function() {
                    n.deleteSelf(),
                    i && i.confirm && i.confirm();
                };
                o ? e.trigger("modal:confirm", {
                    customTitle: e.language.getLabel("label_are_you_sure_permanently_delete_$_file", d.escape(n.model.attributes.file_name)).toString(),
                    customText: e.language.getLabel("label_cant_undo").toString(),
                    confirmText: e.language.getLabel("label_delete_file").toString(),
                    confirm: a,
                    cancel: i && i.cancel
                }) : a();
            }
        },
        tryDelete: function() {
            var e = this;
            e.deleteFile.deleteFile(e.model.id, {
                forRemote: !0
            });
        },
        deleteSelf: function() {
            var e = this;
            e.destroyed || (e.isDeleting = !0,
            e.$el.addClass("deleting"),
            e.tryDelete());
        },
        onDestroySelf: function() {
            var e = this;
            e.$el.addClass("deleting"),
            e.delay(function() {
                e.destroy();
            }, 400);
        },
        onUploadStateChange: function(e) {
            var t = this
              , i = t.$el;
            i.removeClass("waiting"),
            t.$(".file-meta").attr("title", t.formatData().title),
            0 === e ? i.addClass("enqueued") : 1 === e ? i.removeClass("enqueued").addClass("uploading") : 2 === e && t.model.attributes.url && i.removeClass("enqueued uploading");
        },
        onModelStateChange: function() {
            var e = this
              , t = e.model.attributes;
            2 === t.state && t.url && e.$el.removeClass("enqueued uploading failed");
        },
        onUploadProgress: function(e) {
            var t = this;
            (e > t.progress || !t.progress) && (t.progress = e,
            t.$(".file-progress .bar").css({
                width: e + "%"
            }));
        },
        onUploadError: function() {
            var e = this;
            e.$el.addClass("uploading failed");
        },
        onRetryUpload: function() {
            var e = this;
            e.$el.addClass("uploading"),
            e.$el.removeClass("failed");
        },
        updateCreatedAt: function() {
            var e = this
              , t = i(o.convertServerTimeToLocalTime(e.model.get("created_at"))).fromNow();
            e.$(".file-meta .ago").text(t);
        },
        getExtensionFromName: function(e) {
            var t = e.split(".");
            return t.length > 1 ? t[t.length - 1] : "";
        }
    });
}),
define("vendor/recorderWorker", [], function() {
    return function() {
        function e(e) {
            d = e.sampleRate;
        }
        function t(e) {
            m.push(e[0]),
            p.push(e[1]),
            u += e[0].length;
        }
        function i(e, t) {
            var i = a(m, u)
              , n = a(p, u)
              , o = r(i, n)
              , s = c(o)
              , l = new Blob([s],{
                type: e
            });
            this.postMessage({
                id: t,
                data: l
            });
        }
        function n(e) {
            var t = [];
            t.push(a(m, u)),
            t.push(a(p, u)),
            this.postMessage({
                id: e,
                data: t
            });
        }
        function o() {
            u = 0,
            m = [],
            p = [];
        }
        function a(e, t) {
            for (var i = new Float32Array(t), n = 0, o = 0; o < e.length; o++)
                i.set(e[o], n),
                n += e[o].length;
            return i;
        }
        function r(e, t) {
            for (var i = e.length + t.length, n = new Float32Array(i), o = 0, a = 0; i > o; )
                n[o++] = e[a],
                n[o++] = t[a],
                a++;
            return n;
        }
        function s(e, t, i) {
            for (var n = 0; n < i.length; n++,
            t += 2) {
                var o = Math.max(-1, Math.min(1, i[n]));
                e.setInt16(t, 0 > o ? 32768 * o : 32767 * o, !0);
            }
        }
        function l(e, t, i) {
            for (var n = 0; n < i.length; n++)
                e.setUint8(t + n, i.charCodeAt(n));
        }
        function c(e) {
            var t = new ArrayBuffer(44 + 2 * e.length)
              , i = new DataView(t);
            return l(i, 0, "RIFF"),
            i.setUint32(4, 32 + 2 * e.length, !0),
            l(i, 8, "WAVE"),
            l(i, 12, "fmt "),
            i.setUint32(16, 16, !0),
            i.setUint16(20, 1, !0),
            i.setUint16(22, 2, !0),
            i.setUint32(24, d, !0),
            i.setUint32(28, 4 * d, !0),
            i.setUint16(32, 4, !0),
            i.setUint16(34, 16, !0),
            l(i, 36, "data"),
            i.setUint32(40, 2 * e.length, !0),
            s(i, 44, e),
            i;
        }
        var d, u = 0, m = [], p = [];
        this.onmessage = function(a) {
            switch (a.data.command) {
            case "init":
                e(a.data.config);
                break;

            case "record":
                t(a.data.buffer);
                break;

            case "exportWAV":
                i(a.data.type, a.data.id);
                break;

            case "getBuffer":
                n(a.data.id);
                break;

            case "clear":
                o();
            }
        }
        ;
    }
    ;
}),
function(e) {
    "function" == typeof define && define.amd ? define("vendor/recorder", ["wunderbits/global", "vendor/recorderWorker"], function(t, i) {
        return e(t, i);
    }) : e(window);
}
.call(this, function(e, t) {
    if (e.URL && e.Blob) {
        var i = "(" + t.toString() + ")()"
          , n = new Blob([i],{
            type: "application/javascript"
        })
          , o = e.URL.createObjectURL(n)
          , a = o
          , r = function(e, t) {
            var i = t || {}
              , n = i.bufferLen || 4096
              , o = this.context = e.context
              , r = o.createJavaScriptNode || o.createScriptProcessor;
            this.node = r.call(o, n, 2, 2);
            var s = new Worker(i.workerPath || a);
            s.postMessage({
                command: "init",
                config: {
                    sampleRate: o.sampleRate
                }
            });
            var l = !1
              , c = 0
              , d = {};
            this.sendMessage = function(e, t) {
                ++c,
                e.id = c,
                d[c] = t,
                s.postMessage(e);
            }
            ,
            s.onmessage = function(e) {
                "function" == typeof d[e.data.id] && d[e.data.id](e.data.data),
                d[e.data.id] = null;
            }
            ,
            this.node.onaudioprocess = function(e) {
                l && s.postMessage({
                    command: "record",
                    buffer: [e.inputBuffer.getChannelData(0), e.inputBuffer.getChannelData(1)]
                });
            }
            ,
            this.configure = function(e) {
                for (var t in e)
                    e.hasOwnProperty(t) && (i[t] = e[t]);
            }
            ,
            this.record = function(e) {
                var t = e || i.callback;
                l = !0,
                "function" == typeof t && d();
            }
            ,
            this.stop = function(e) {
                var t = e || i.callback;
                l = !1,
                "function" == typeof t && d();
            }
            ,
            this.clear = function(e) {
                var t = e || i.callback;
                this.sendMessage({
                    command: "clear"
                }, t);
            }
            ,
            this.getBuffer = function(e) {
                var t = e || i.callback;
                this.sendMessage({
                    command: "getBuffer"
                }, t);
            }
            ,
            this.exportWAV = function(e, t) {
                var n = e || i.callback;
                t = t || i.type || "audio/wav",
                this.sendMessage({
                    command: "exportWAV",
                    type: t
                }, n);
            }
            ,
            e.connect(this.node),
            this.node.connect(this.context.destination);
        };
        return r.forceDownload = function(t, i) {
            var n = (e.URL || e.webkitURL).createObjectURL(t)
              , o = e.document.createElement("a");
            o.href = n,
            o.download = i || "output.wav";
            var a = document.createEvent("Event");
            a.initEvent("click", !0, !0),
            o.dispatchEvent(a);
        }
        ,
        e.Recorder = r,
        r;
    }
}),
define("/templates/detailview/audioRecorder.js", {
    name: "detailview/audioRecorder",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<audio></audio> <a class="start-recording-audio" tabindex="0" data-key-title="title_start_pause_recording_audio" role="button"> <span class="icon-file record-audio"/> </a> <a class="play-recorded-audio disabled" tabindex="0" data-key-title="title_play_recorded_audio" role="button"> <span class="icon-file play-audio"/> </a> <span class="duration">00:00</span> <a class="clear-recorded-audio" tabindex="0" data-key-title="title_clear_recorded_audio" role="button"> <span class="icon-file clear-audio"/> </a> <a class="upload-recorded-audio disabled" tabindex="0" data-key-title="title_upload_recorded_audio" role="button"> <span class="icon-file upload-audio"/> </a>';
        },
        useData: !0
    }
}),
define("/styles/_recorder.js", {
    name: "_recorder",
    data: ".audio-recorder-container{-webkit-border-radius:3px;border-radius:3px;border:1px solid #c9c9c9;background:#fff;margin:11px 0 10px 0;text-align:center;font-size:0;}.audio-recorder-container a{display:inline-block;width:48px;float:none;padding:10px 0;margin:0 2px;font-weight:bold;text-align:center}.audio-recorder-container span{display:inline-block}.audio-recorder-container .duration{width:84px;font-size:16px;font-weight:bold;color:#737272;}.audio-recorder-container .duration.recording,.audio-recorder-container .duration.playing{color:#262626}.audio-recorder-container a,.audio-recorder-container .duration{vertical-align:middle}.audio-recorder-container .start-recording-audio{color:#f00}.audio-recorder-container .play-recorded-audio{color:#008000}"
}),
define("views/TaskDetail/TaskDetailRecordAudioFileView", ["application/runtime", "wunderbits/helpers/strings", "wunderbits/WBView", "vendor/recorder", "project!core", "wunderbits/data/keycodes", "template!detailview/audioRecorder", "style!_recorder"], function(e, t, i, n, o, a, r, s) {
    var l = e._
      , c = e.global
      , d = i.prototype
      , u = o.WBDeferred
      , m = e.env.isUserMediaSupported();
    return i.extend({
        className: "audio-recorder-container",
        template: r,
        tagName: "div",
        events: {
            keydown: "handleKeys",
            "click .start-recording-audio": "oncClickRecord",
            "click .stop-recording-audio": "stopRecording",
            "click .clear-recorded-audio": "clearRecording",
            "click .upload-recorded-audio:not(.disabled)": "uploadRecording",
            "click .play-recorded-audio": "playRecordedAudio"
        },
        styles: [s],
        initialize: function(e) {
            var t = this;
            d.initialize.apply(t, arguments),
            t.model = e && e.taskModel,
            t.AudioContext = c.AudioContext || c.webkitAudioContext,
            t.updateDuration = t.updateDuration.bind(t);
        },
        render: function() {
            var e = this;
            return m && e.AudioContext && (d.render.call(e, {}),
            e.model.get("online_id") ? e.setup() : e.bindOnceTo(e.model, "change:online_id", e.setup),
            e.delegateEvents()),
            e;
        },
        handleKeys: function(t) {
            var i = this
              , n = i.$("a")
              , o = n.first()
              , r = n.last();
            t.which !== a.tab || t.shiftKey ? t.which === a.tab && t.shiftKey ? o.is(":focus") && (r.focus(),
            i.stopEventFully(t)) : t.which === a.esc && (i.clearRecording(),
            e.trigger("route:" + i.model.route("addFile/focus"))) : r.is(":focus") && (o.focus(),
            i.stopEventFully(t));
        },
        stopEventFully: function(e) {
            e.preventDefault(),
            e.stopPropagation();
        },
        setModel: function(e) {
            var t = this;
            t.model = e,
            t.duration = 0,
            t.render();
        },
        setup: function() {
            var e = this;
            e.url = c.URL || c.webkitURL,
            e.audio = e.$("audio")[0];
            var t = e.$("audio")
              , i = e.$(".play-recorded-audio");
            e.audioEndBind && e.unbindFrom(e.audioEndBind),
            e.audioEndBind = e.bindTo(t, "ended", function() {
                i.removeClass("playing"),
                e.$(".duration").removeClass("playing recording"),
                e.displayDuration();
            }),
            e.timeupdateBind && e.unbindFrom(e.timeupdateBind),
            e.timeupdateBind = e.bindTo(t, "timeupdate", function() {
                i.hasClass("playing") && e.displayDuration(Math.floor(e.audio.currentTime));
            });
        },
        onFail: function(e) {
            console.log("Rejected!", e);
        },
        onSuccess: function(e) {
            var t = this;
            t.streamResource = t.streamResource || e;
            var i = t.$(".start-recording-audio");
            if (!t.context) {
                var o = c.AudioContext || c.webkitAudioContext;
                t.context = new o(),
                t.context.createGain();
            }
            !t.mediaStreamSource && (t.mediaStreamSource = t.context.createMediaStreamSource(t.streamResource)),
            !t.recorder && (t.recorder = new n(t.mediaStreamSource)),
            t.recorder.record(),
            i.hasClass("paused") ? t.continueUpdatingDuration() : t.startUpdatingDuration(),
            i.addClass("recording").removeClass("paused"),
            t.$(".duration").addClass("recording"),
            t.$(".stop-recording-audio").removeClass("disabled"),
            t.$(".play-recorded-audio").removeClass("disabled"),
            t.$(".upload-recorded-audio").removeClass("disabled"),
            t.recording = !0;
        },
        oncClickRecord: function() {
            var t = this;
            if (m && !t.streamResource)
                if (t.recorder && t.recorder.stop(),
                e.env.isChromeApp() && e.env.isChrome()) {
                    var i = c.chrome;
                    i.permissions.request({
                        permissions: ["audioCapture"]
                    }, function(e) {
                        e ? t.requestAudioPermission() : t.onFail(arguments);
                    });
                } else
                    t.requestAudioPermission();
            else
                t.streamResource && t.recording ? (t.recorder.stop(),
                t.recording = !1,
                t.$(".start-recording-audio").addClass("paused").removeClass("recording"),
                t.$(".duration").removeClass("recording"),
                t.putAnAudioOnTheAudio(),
                t.stopUpdatingDuration()) : t.streamResource ? t.onSuccess() : console.log("navigator.getUserMedia not present");
        },
        requestAudioPermission: function() {
            var t = this;
            e.env.getUserMedia({
                audio: !0,
                video: !1
            }, t.onSuccess.bind(t), t.onFail.bind(t));
        },
        stopRecording: function() {
            var e = this;
            e.recorder && !e.$(".stop-recording-audio").hasClass("disabled") && (e.$(".start-recording-audio, .duration").removeClass("recording"),
            e.$(".play-recorded-audio").removeClass("disabled"),
            e.recorder.stop(),
            e.stopUpdatingDuration(),
            e.putAnAudioOnTheAudio());
        },
        clearRecording: function() {
            var e = this;
            e.recorder && e.recorder.clear(),
            e.recording = !1,
            e.duration = 0,
            e.blob = null,
            e.audio && (e.audio.setAttribute("src", ""),
            e.audio.load()),
            e.$(".start-recording-audio").removeClass("recording paused"),
            e.$(".duration").removeClass("recording playing"),
            e.$(".play-recorded-audio").addClass("disabled"),
            e.$(".upload-recorded-audio").addClass("disabled"),
            e.displayDuration(),
            e.trigger("recording:clear");
        },
        putAnAudioOnTheAudio: function() {
            var e = this
              , i = new u();
            return e.recorder && e.recorder.exportWAV(function(n) {
                if (!e.destroyed) {
                    var o = t.dateString();
                    e.audio.src = e.url.createObjectURL(n),
                    n.name = "recording-" + o + ".wav",
                    e.blob = n,
                    e.$(".upload-recorded-audio").removeClass("disabled");
                    var a = function() {
                        i.resolve(),
                        e.audio.removeEventListener("canplaythrough", a, !1);
                    };
                    e.audio.addEventListener("canplaythrough", a, !1);
                }
            }),
            i.promise();
        },
        playRecordedAudio: function() {
            var e = this
              , t = e.$(".play-recorded-audio")
              , i = e.$(".duration")
              , n = t.hasClass("playing")
              , o = new u();
            e.streamResource && e.recording ? (e.recorder.stop(),
            e.recording = !1,
            e.$(".start-recording-audio").addClass("paused").removeClass("recording"),
            e.$(".duration").removeClass("recording"),
            e.putAnAudioOnTheAudio().done(o.resolve, o),
            e.stopUpdatingDuration()) : o.resolve(),
            o.done(function() {
                var o = e.audio && 4 === e.audio.readyState;
                !o || t.hasClass("disabled") || n ? o && n && (e.audio.pause(),
                e.audio.currentTime = 0,
                t.removeClass("playing"),
                i.removeClass("playing"),
                e.displayDuration()) : (t.addClass("playing"),
                i.addClass("playing"),
                e.audio.pause(),
                e.audio.currentTime = 0,
                e.audio.play());
            });
        },
        uploadRecording: function() {
            var e = this
              , t = new u();
            e.$(".start-recording-audio").removeClass("recording"),
            e.$(".play-recorded-audio").removeClass("playing").addClass("disabled"),
            e.$(".upload-recorded-audio").addClass("disabled"),
            e.$(".stop-recording-audio").addClass("disabled"),
            e.$(".duration").removeClass("playing, recording"),
            e.streamResource && e.recording ? (e.recorder.stop(),
            e.recording = !1,
            e.$(".start-recording-audio").addClass("paused").removeClass("recording"),
            e.$(".duration").removeClass("recording"),
            e.putAnAudioOnTheAudio().done(t.resolve, t),
            e.stopUpdatingDuration()) : t.resolve(),
            t.done(function() {
                e.blob && e.trigger("upload:audioFile", e.blob),
                e.duration = 0,
                e.blob = null,
                e.audio.setAttribute("src", ""),
                e.audio.load(),
                e.displayDuration(),
                e.clearRecording();
            });
        },
        getDurationString: function(e) {
            var i = this;
            return e = l.isNumber(e) ? e : i.duration,
            t.pad(Math.floor(e / 60), 2) + ":" + t.pad(e % 60, 2);
        },
        displayDuration: function(e) {
            var t = this
              , i = t.$(".duration");
            e = l.isNumber(e) ? e : t.duration,
            i.text(t.getDurationString(e)),
            i.hasClass("hidden") && i.removeClass("hidden");
        },
        updateDuration: function() {
            var e = this;
            e.duration += 1,
            e.displayDuration();
        },
        startUpdatingDuration: function() {
            var e = this;
            e.duration = 0,
            e.displayDuration(),
            e.updateDurationInterval = c.setInterval(e.updateDuration, 1e3);
        },
        continueUpdatingDuration: function() {
            var e = this;
            e.displayDuration(),
            e.updateDurationInterval = c.setInterval(e.updateDuration, 1e3);
        },
        stopUpdatingDuration: function() {
            var e = this;
            c.clearTimeout(e.updateDurationInterval);
        }
    });
}),
define("vendor/dropboxDropIns", ["wunderbits/global"], function(e) {
    return function() {
        var t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S, L, D, j, M, z, I = e, A = [].slice, P = [].indexOf || function(e) {
            for (var t = 0, i = this.length; i > t; t++)
                if (t in this && this[t] === e)
                    return t;
            return -1;
        }
        ;
        return null == (L = I.Dropbox) && (I.Dropbox = {}),
        null == (D = Dropbox.baseUrl) && (Dropbox.baseUrl = "https://www.dropbox.com"),
        null == (j = Dropbox.blockBaseUrl) && (Dropbox.blockBaseUrl = "https://dl.dropbox.com"),
        Dropbox.addListener = function(e, t, i) {
            e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent("on" + t, function(e) {
                return e.preventDefault = function() {
                    return this.returnValue = !1;
                }
                ,
                i(e);
            });
        }
        ,
        Dropbox.removeListener = function(e, t, i) {
            e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent("on" + t, i);
        }
        ,
        o = function(e) {
            var t, i;
            return i = encodeURIComponent(Dropbox.VERSION),
            t = -1 === e.indexOf("?") ? "?" : "&",
            "" + e + t + "version=" + i;
        }
        ,
        r = function(e, t) {
            var i, n, a, r, s, l, c, d, u;
            return l = encodeURIComponent(I.location.protocol + "//" + I.location.host),
            i = encodeURIComponent(Dropbox.appKey),
            r = encodeURIComponent(e.linkType || ""),
            c = encodeURIComponent(e._trigger || "js"),
            s = Boolean(e.multiselect),
            n = encodeURIComponent((null != (u = e.extensions) && "function" == typeof u.join ? u.join(" ") : void 0) || ""),
            a = Boolean(e.folderselect),
            t = Boolean(t),
            d = "" + Dropbox.baseUrl + "/chooser?origin=" + l + "&app_key=" + i + "&link_type=" + r,
            d += "&trigger=" + c + "&multiselect=" + s + "&extensions=" + n + "&folderselect=" + a + "&iframe=" + t,
            o(d);
        }
        ,
        C = function() {
            var e, t, i;
            return t = encodeURIComponent(I.location.protocol + "//" + I.location.host),
            e = encodeURIComponent(Dropbox.appKey),
            i = "" + Dropbox.baseUrl + "/saver?origin=" + t + "&app_key=" + e,
            o(i);
        }
        ,
        _ = 1,
        g = function(e, t) {
            var i, n, a, r;
            if (i = encodeURIComponent(Dropbox.appKey),
            r = "" + Dropbox.baseUrl + "/dropins/job_status?job=" + t + "&app_key=" + i,
            r = o(r),
            a = function(t) {
                var i;
                "COMPLETE" === t.status ? ("function" == typeof e.progress && e.progress(1),
                "function" == typeof e.success && e.success()) : "PENDING" === (i = t.status) || "DOWNLOADING" === i ? (null != t.progress && "function" == typeof e.progress && e.progress(t.progress / 100),
                setTimeout(n, 1500)) : "FAILED" === t.status && "function" == typeof e.error && e.error(t.error);
            }
            ,
            "withCredentials"in new XMLHttpRequest())
                n = function() {
                    var t;
                    return t = new XMLHttpRequest(),
                    t.onload = function() {
                        return a(JSON.parse(t.responseText));
                    }
                    ,
                    t.onerror = function() {
                        return "function" == typeof e.error ? e.error() : void 0;
                    }
                    ,
                    t.open("GET", r, !0),
                    t.send();
                }
                ;
            else if (Dropbox.disableJSONP) {
                if ("undefined" == typeof XDomainRequest || null === XDomainRequest || "https:" !== document.location.protocol)
                    throw new Error("Unable to find suitable means of cross domain communication");
                n = function() {
                    var t;
                    return t = new XDomainRequest(),
                    t.onload = function() {
                        return a(JSON.parse(t.responseText));
                    }
                    ,
                    t.onerror = function() {
                        return "function" == typeof e.error ? e.error() : void 0;
                    }
                    ,
                    t.open("get", r),
                    t.send();
                }
                ;
            } else
                n = function() {
                    var t, i, n;
                    return t = "DropboxJsonpCallback" + _++,
                    i = !1,
                    I[t] = function(e) {
                        return i = !0,
                        a(e);
                    }
                    ,
                    n = document.createElement("script"),
                    n.src = "" + r + "&callback=" + t,
                    n.onreadystatechange = function() {
                        var t;
                        return "loaded" === n.readyState ? (i || "function" == typeof e.error && e.error(),
                        null != (t = n.parentNode) ? t.removeChild(n) : void 0) : void 0;
                    }
                    ,
                    document.getElementsByTagName("head")[0].appendChild(n);
                }
                ;
            return "function" == typeof e.progress && e.progress(0),
            n();
        }
        ,
        f = function(e, t, i) {
            var n, o, a;
            switch (n = JSON.parse(e.data),
            n.method) {
            case "ready":
                null != i.files && (a = JSON.stringify({
                    method: "files",
                    params: i.files
                }),
                o = "undefined" != typeof b && null !== b && i._popup ? b.contentWindow : e.source,
                o.postMessage(a, Dropbox.baseUrl)),
                "function" == typeof i.ready && i.ready();
                break;

            case "files_selected":
            case "files_saved":
                "function" == typeof t && t(),
                "function" == typeof i.success && i.success(n.params);
                break;

            case "progress":
                "function" == typeof i.progress && i.progress(n.params);
                break;

            case "close_dialog":
                "function" == typeof t && t(),
                "function" == typeof i.cancel && i.cancel();
                break;

            case "web_session_error":
                "function" == typeof t && t(),
                "function" == typeof i.webSessionFailure && i.webSessionFailure();
                break;

            case "web_session_unlinked":
                "function" == typeof t && t(),
                "function" == typeof i.webSessionUnlinked && i.webSessionUnlinked();
                break;

            case "resize":
                "function" == typeof i.resize && i.resize(n.params);
                break;

            case "error":
                "function" == typeof t && t(),
                "function" == typeof i.error && i.error(n.params);
                break;

            case "job_id":
                "function" == typeof t && t(),
                g(i, n.params);
                break;

            case "_debug_log":
                "undefined" != typeof console && null !== console && console.log(n.params.msg);
            }
        }
        ,
        b = null,
        l = function() {
            /\bTrident\b/.test(navigator.userAgent) && (b = document.createElement("iframe"),
            b.setAttribute("id", "dropbox_xcomm"),
            b.setAttribute("src", Dropbox.baseUrl + "/static/api/1/xcomm.html"),
            b.style.display = "none",
            document.getElementsByTagName("body")[0].appendChild(b));
        }
        ,
        Dropbox.createChooserWidget = function(e) {
            var t;
            return t = c(r(e, !0)),
            t._handler = function(i) {
                i.source === t.contentWindow && i.origin === Dropbox.baseUrl && f(i, null, e);
            }
            ,
            Dropbox.addListener(I, "message", t._handler),
            t;
        }
        ,
        Dropbox.cleanupWidget = function(e) {
            if (!e._handler)
                throw new Error("Invalid widget!");
            Dropbox.removeListener(I, "message", e._handler),
            delete e._handler;
        }
        ,
        y = function(e, t) {
            var i, n;
            return i = (I.screenX || I.screenLeft) + ((I.outerWidth || document.documentElement.offsetWidth) - e) / 2,
            n = (I.screenY || I.screenTop) + ((I.outerHeight || document.documentElement.offsetHeight) - t) / 2,
            "width=" + e + ",height=" + t + ",left=" + i + ",top=" + n;
        }
        ,
        Dropbox._dropinsjs_loaded ? void ("undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("dropins.js included more than once")) : (Dropbox._dropinsjs_loaded = !0,
        null == (M = Dropbox.appKey) && (Dropbox.appKey = null != (z = document.getElementById("dropboxjs")) ? z.getAttribute("data-app-key") : void 0),
        S = function(e) {
            return e;
        }
        ,
        t = "https://www.dropbox.com/developers/dropins/chooser/js",
        n = ["text", "documents", "images", "video", "audio"],
        Dropbox.init = function(e) {
            null != e.translation_function && (S = e.translation_function),
            Dropbox.appKey = e.appKey;
        }
        ,
        c = function(e) {
            var t;
            return t = document.createElement("iframe"),
            t.src = e,
            t.style.display = "block",
            t.style.backgroundColor = "white",
            t.style.border = "none",
            t;
        }
        ,
        x = function(e) {
            var t, i, n, o, a, r, s, l;
            if ("string" == typeof e[0])
                o = e.shift(),
                i = "string" == typeof e[0] ? e.shift() : p(o),
                n = {
                    files: [{
                        url: o,
                        filename: i
                    }]
                };
            else {
                if (n = e.shift(),
                null == n)
                    throw new Error("Missing arguments. See documentation.");
                if ((null != (s = n.files) ? !s.length : !0) && "function" != typeof n.files)
                    throw new Error("Missing files. See documentation.");
                for (l = n.files,
                a = 0,
                r = l.length; r > a; a++)
                    t = l[a],
                    t.filename || (t.filename = p(t.url));
            }
            return n;
        }
        ,
        Dropbox.save = function() {
            var e, t, i, n, o, a, r;
            if (e = 1 <= arguments.length ? A.call(arguments, 0) : [],
            n = x(e),
            !Dropbox.isBrowserSupported())
                return void alert(S("Your browser does not support the Dropbox Saver"));
            if (n._popup = !0,
            "object" != typeof n.files || !n.files.length)
                throw new Error("Opening the saver failed. The object passed in must have a 'files' property that contains a list of objects.  See documentation.");
            for (r = n.files,
            o = 0,
            a = r.length; a > o; o++)
                if (i = r[o],
                "string" != typeof i.url)
                    throw new Error("File urls to download incorrectly configured.  Each file must have a url. See documentation.");
            return t = y(352, 237),
            k(C(n), t, n);
        }
        ,
        k = function(e, t, i) {
            var n, o, a, r, s;
            if (n = function() {
                r.closed || r.close(),
                Dropbox.removeListener(I, "message", o),
                clearInterval(s);
            }
            ,
            o = function(e) {
                (e.source === r || e.source === (null != b ? b.contentWindow : void 0)) && f(e, n, i);
            }
            ,
            a = function() {
                r.closed && (n(),
                "function" == typeof i.cancel && i.cancel());
            }
            ,
            r = I.open(e, "dropbox", "" + t + ",resizable=yes,location=yes"),
            !r)
                throw new Error("Failed to open a popup window. Dropbox.choose and Dropbox.save should only be called from within a user-triggered event handler such as a tap or click event.");
            return r.focus(),
            s = setInterval(a, 100),
            Dropbox.addListener(I, "message", o),
            r;
        }
        ,
        T = function(e) {
            var i, o, a, r, s;
            if (null == e.success && "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("You must provide a success callback to the Chooser to see the files that the user selects"),
            o = function() {
                return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("The provided list of extensions or file types is not valid. See Chooser documentation: " + t),
                "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("Available file types are: " + n.join(", ")),
                delete e.extensions;
            }
            ,
            null != e.extensions)
                if ("[object Array]" === Object.prototype.toString.call(e.extensions))
                    for (s = e.extensions,
                    a = 0,
                    r = s.length; r > a; a++)
                        i = s[a],
                        !i.match(/^\.[\.\w$#&+@!()\-'`_~]+$/) && P.call(n, i) < 0 && o();
                else
                    o();
            return e;
        }
        ,
        a = function(e) {
            var t, i, n, o, a, s, l, d;
            return Dropbox.isBrowserSupported() ? (d = 660,
            o = 440,
            void (e.iframe ? (l = c(r(e, !0)),
            l.style.width = d + "px",
            l.style.height = o + "px",
            s = document.createElement("div"),
            s.style.position = "fixed",
            s.style.left = s.style.right = s.style.top = s.style.bottom = "0px",
            s.style.zIndex = "1000",
            t = document.createElement("div"),
            t.style.position = "absolute",
            t.style.left = t.style.right = t.style.top = t.style.bottom = "0px",
            t.style.backgroundColor = "rgb(160, 160, 160)",
            t.style.opacity = "0.2",
            t.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",
            a = document.createElement("div"),
            a.style.position = "relative",
            a.style.width = d + "px",
            a.style.margin = "125px auto 0px auto",
            a.style.border = "1px solid #ACACAC",
            a.style.boxShadow = "rgba(0, 0, 0, .2) 0px 4px 16px",
            a.appendChild(l),
            s.appendChild(t),
            s.appendChild(a),
            document.body.appendChild(s),
            n = function(t) {
                t.source === l.contentWindow && f(t, function() {
                    document.body.removeChild(s),
                    Dropbox.removeListener(I, "message", n);
                }, e);
            }
            ,
            Dropbox.addListener(I, "message", n)) : (i = y(d, o),
            k(r(e), i, e)))) : void alert(S("Your browser does not support the Dropbox Chooser"));
        }
        ,
        Dropbox.choose = function(e) {
            null == e && (e = {}),
            e = T(e),
            a(e);
        }
        ,
        Dropbox.isBrowserSupported = function() {
            var e;
            return e = v(),
            Dropbox.isBrowserSupported = function() {
                return e;
            }
            ,
            e;
        }
        ,
        v = function() {
            var e, t, i, n;
            for (n = [/Windows Phone/, /BB10;/, /CriOS/],
            t = 0,
            i = n.length; i > t; t++)
                if (e = n[t],
                e.test(navigator.userAgent))
                    return !1;
            return "undefined" == typeof JSON || null === JSON || null == I.postMessage ? !1 : !0;
        }
        ,
        m = function(e) {
            return e.replace(/\/+$/g, "").split("/").pop();
        }
        ,
        p = function(e) {
            var t;
            return t = document.createElement("a"),
            t.href = e,
            m(t.pathname);
        }
        ,
        s = function(e, t) {
            var i;
            return null != t ? t.innerHTML = "" : (t = document.createElement("a"),
            t.href = "#"),
            t.className += " dropbox-dropin-btn",
            t.className += Dropbox.isBrowserSupported() ? " dropbox-dropin-default" : " dropbox-dropin-disabled",
            i = document.createElement("span"),
            i.className = "dropin-btn-status",
            t.appendChild(i),
            e = document.createTextNode(e),
            t.appendChild(e),
            t;
        }
        ,
        Dropbox.createChooseButton = function(e) {
            var t;
            return null == e && (e = {}),
            e = T(e),
            t = s(S("Choose from Dropbox")),
            Dropbox.addListener(t, "click", function(i) {
                i.preventDefault(),
                a({
                    success: function(i) {
                        t.className = "dropbox-dropin-btn dropbox-dropin-success",
                        "function" == typeof e.success && e.success(i);
                    },
                    cancel: e.cancel,
                    linkType: e.linkType,
                    multiselect: e.multiselect,
                    extensions: e.extensions,
                    iframe: e.iframe,
                    _trigger: "button"
                });
            }),
            t;
        }
        ,
        Dropbox.createSaveButton = function() {
            var e, t, i;
            return e = 1 <= arguments.length ? A.call(arguments, 0) : [],
            i = x(e),
            t = e.shift(),
            t = s(S("Save to Dropbox"), t),
            Dropbox.addListener(t, "click", function(e) {
                var n;
                return e.preventDefault(),
                t.className.indexOf("dropbox-dropin-error") >= 0 || t.className.indexOf("dropbox-dropin-default") >= 0 || t.className.indexOf("dropbox-dropin-disabled") >= 0 ? (n = ("function" == typeof i.files ? i.files() : void 0) || i.files,
                (null != n ? n.length : void 0) ? void Dropbox.save({
                    files: n,
                    success: function() {
                        t.className = "dropbox-dropin-btn dropbox-dropin-success",
                        "function" == typeof i.success && i.success();
                    },
                    progress: function(e) {
                        t.className = "dropbox-dropin-btn dropbox-dropin-progress",
                        "function" == typeof i.progress && i.progress(e);
                    },
                    cancel: function() {
                        "function" == typeof i.cancel && i.cancel();
                    },
                    error: function(e) {
                        t.className = "dropbox-dropin-btn dropbox-dropin-error",
                        "function" == typeof i.error && i.error(e);
                    }
                }) : (t.className = "dropbox-dropin-btn dropbox-dropin-error",
                void ("function" == typeof i.error && i.error("Missing files")))) : void 0;
            }),
            t;
        }
        ,
        w = function(e, t) {
            return "background: " + e + ";\nbackground: -moz-linear-gradient(top, " + e + " 0%, " + t + " 100%);\nbackground: -webkit-linear-gradient(top, " + e + " 0%, " + t + " 100%);\nbackground: linear-gradient(to bottom, " + e + " 0%, " + t + " 100%);\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr='" + e + "', endColorstr='" + t + "',GradientType=0);";
        }
        ,
        d = document.createElement("style"),
        d.type = "text/css",
        u = '@-webkit-keyframes rotate {\n  from  { -webkit-transform: rotate(0deg); }\n  to   { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes rotate {\n  from  { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.dropbox-dropin-btn, .dropbox-dropin-btn:link, .dropbox-dropin-btn:hover {\n  display: inline-block;\n  height: 14px;\n  font-family: "Lucida Grande", "Segoe UI", "Tahoma", "Helvetica Neue", "Helvetica", sans-serif;\n  font-size: 11px;\n  font-weight: 600;\n  color: #636363;\n  text-decoration: none;\n  padding: 1px 7px 5px 3px;\n  border: 1px solid #ebebeb;\n  border-radius: 2px;\n  border-bottom-color: #d4d4d4;\n  ' + w("#fcfcfc", "#f5f5f5") + "\n}\n\n.dropbox-dropin-default:hover, .dropbox-dropin-error:hover {\n  border-color: #dedede;\n  border-bottom-color: #cacaca;\n  " + w("#fdfdfd", "#f5f5f5") + "\n}\n\n.dropbox-dropin-default:active, .dropbox-dropin-error:active {\n  border-color: #d1d1d1;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,0.1);\n}\n\n.dropbox-dropin-btn .dropin-btn-status {\n  display: inline-block;\n  width: 15px;\n  height: 14px;\n  vertical-align: bottom;\n  margin: 0 5px 0 2px;\n  background: transparent url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-saver-status.png') no-repeat;\n  position: relative;\n  top: 2px;\n}\n\n.dropbox-dropin-default .dropin-btn-status {\n  background-position: 0px 0px;\n}\n\n.dropbox-dropin-progress .dropin-btn-status {\n  width: 18px;\n  margin: 0 4px 0 0;\n  background: url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-progress.png') no-repeat center center;\n  -webkit-animation-name: rotate;\n  -webkit-animation-duration: 1.7s;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: linear;\n  animation-name: rotate;\n  animation-duration: 1.7s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n\n.dropbox-dropin-success .dropin-btn-status {\n  background-position: -15px 0px;\n}\n\n.dropbox-dropin-disabled {\n  background: #e0e0e0;\n  border: 1px #dadada solid;\n  border-bottom: 1px solid #ccc;\n  box-shadow: none;\n}\n\n.dropbox-dropin-disabled .dropin-btn-status {\n  background-position: -30px 0px;\n}\n\n.dropbox-dropin-error .dropin-btn-status {\n  background-position: -45px 0px;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 1.4) {\n  .dropbox-dropin-btn .dropin-btn-status {\n    background-image: url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-saver-status-2x.png');\n    background-size: 60px 14px;\n    -webkit-background-size: 60px 14px;\n  }\n\n  .dropbox-dropin-progress .dropin-btn-status {\n    background: url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-progress-2x.png') no-repeat center center;\n    background-size: 20px 20px;\n    -webkit-background-size: 20px 20px;\n  }\n}\n\n.dropbox-saver:hover, .dropbox-chooser:hover {\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.dropbox-chooser, .dropbox-dropin-btn {\n  line-height: 11px !important;\n  text-decoration: none !important;\n  box-sizing: content-box !important;\n  -webkit-box-sizing: content-box !important;\n  -moz-box-sizing: content-box !important;\n}\n",
        d.styleSheet ? d.styleSheet.cssText = u : d.textContent = u,
        document.getElementsByTagName("head")[0].appendChild(d),
        setTimeout(l, 0),
        i = function() {
            return document.removeEventListener ? document.removeEventListener("DOMContentLoaded", i, !1) : document.detachEvent && document.detachEvent("onreadystatechange", i),
            h();
        }
        ,
        "complete" === document.readyState ? setTimeout(i, 0) : document.addEventListener ? document.addEventListener("DOMContentLoaded", i, !1) : document.attachEvent("onreadystatechange", i),
        Dropbox.VERSION = "2",
        void (h = function() {
            var e, t, i, n;
            for (n = document.getElementsByTagName("a"),
            t = 0,
            i = n.length; i > t; t++)
                e = n[t],
                P.call((e.getAttribute("class") || "").split(" "), "dropbox-saver") >= 0 && !function(e) {
                    Dropbox.createSaveButton({
                        files: function() {
                            return [{
                                url: e.getAttribute("data-url") || e.href,
                                filename: e.getAttribute("data-filename") || m(e.pathname)
                            }];
                        }
                    }, e);
                }(e);
        }
        ));
    }
    .call(e),
    e.Dropbox;
}),
define("views/TaskDetail/Files/Controllers/DropboxDropInsController", ["application/runtime", "actions/Factory", "wunderbits/helpers/date", "vendor/dropboxDropIns", "wunderbits/WBViewController"], function(e, t, i, n, o) {
    n.init({
        appKey: "l42m5s3zw1vruc3"
    });
    var a = o.prototype;
    return o.extend({
        "implements": {
            "click:dropbox": "onClickDropBox"
        },
        initialize: function() {
            var e = this;
            e.createFile = t.createFile(),
            e.setupDropInsOptions(),
            a.initialize.apply(e, arguments);
        },
        setupDropInsOptions: function() {
            var e = this;
            e.dropInsOptions = {
                success: e.onDropboxAttached.bind(e),
                cancel: e.onDropboxCancelled.bind(e),
                linkType: "preview",
                multiselect: !0
            };
        },
        onDropboxAttached: function(e) {
            var t = this;
            e.forEach(t.saveFile.bind(t));
        },
        onDropboxCancelled: function() {
            console.debug("dropbox canceled");
        },
        onClickDropBox: function() {
            n.choose(this.dropInsOptions);
        },
        saveFile: function(t) {
            var i = this
              , n = i.view.taskModel;
            i.createFile.createDropboxFile(t.name, t.bytes, t.link, t.icon, n.id, e.user.id);
        }
    });
}),
define("/templates/symbols/dropbox.js", {
    name: "symbols/dropbox",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="dropbox" width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"> <g> <polygon points="6.515,2.227 1.535,5.478 4.979,8.236 10,5.135 "/> <polygon points="1.535,10.994 6.515,14.245 10,11.336 4.979,8.236 "/> <polygon points="10,11.336 13.485,14.245 18.465,10.994 15.021,8.236 "/> <polygon points="18.465,5.478 13.485,2.227 10,5.135 15.021,8.236 "/> <polygon points="10.01,11.962 6.515,14.862 5.02,13.886 5.02,14.981 10.01,17.973 15.001,14.981 15.001,13.886 13.505,14.862"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("views/TaskDetail/Files/DropboxDropInsView", ["application/runtime", "wunderbits/WBViewPresenter", "./Controllers/DropboxDropInsController", "template!symbols/dropbox"], function(e, t, i, n) {
    var o = t.prototype;
    return t.extend({
        tagName: "span",
        className: "add-dropbox",
        "implements": [i],
        attributes: {
            tabindex: 0,
            role: "button",
            "data-key-aria-label": "voiceover_add_file_dropbox_button",
            "data-key-title": "voiceover_add_file_dropbox_button"
        },
        emits: {
            click: "click:dropbox"
        },
        template: n,
        initialize: function(e) {
            var t = this;
            t.setTaskModel(e.taskModel),
            o.initialize.apply(t, arguments);
        },
        render: function() {
            var e = this;
            return o.render.apply(e, arguments),
            e.renderAriaAttributes(),
            e;
        },
        setTaskModel: function(e) {
            this.taskModel = e;
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailFilesController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/helpers/date", "helpers/Animator", "wunderbits/WBViewController"], function(e, t, i, n, o) {
    var a = e.$;
    return o.extend({
        "implements": {
            "click:clippy": "onClickClippy",
            "click:recordFile": "onClickShowAudioRecorder",
            "keydown:addFiles": "onAddFilesKeydown",
            "keydown:listFiles": "onListFilesKeydown",
            "route:listComments": "onRouteListComments"
        },
        onRouteListComments: function() {
            e.trigger("route:" + this.view.model.route("/listComments/focus"));
        },
        onClickClippy: function() {
            this.view.fileSelectorView.$el.click();
        },
        onAddFilesKeydown: function(i) {
            var n = this
              , o = n.view
              , r = o.$(o.uploaders.join(", "));
            i.which === t.enter ? (a(i.target).click(),
            n.stopEventFully(i)) : i.which !== t.tab || i.shiftKey ? i.which === t.tab && i.shiftKey && (e.trigger("update:direction", "prev"),
            0 === o.currentUploaderNum ? e.trigger("route:" + o.model.route("/openFullscreenNote/focus")) : o.focusPrevUploader(),
            n.stopEventFully(i)) : (e.trigger("update:direction", "next"),
            r.length - 1 === o.currentUploaderNum ? e.trigger("route:" + o.model.route("/listFiles/focus")) : o.focusNextUploader(),
            n.stopEventFully(i));
        },
        onListFilesKeydown: function(i) {
            var n = this
              , o = n.view;
            i.which === t.enter ? (a(i.target).click(),
            n.stopEventFully(i)) : i.which !== t.tab || i.shiftKey ? i.which === t.tab && i.shiftKey ? (e.trigger("update:direction", "prev"),
            e.trigger("route:" + o.model.route("/addFile/focus")),
            n.stopEventFully(i)) : i.which === t.up ? o.focusPrevItem() : i.which === t.down && o.focusNextItem() : (e.trigger("update:direction", "next"),
            e.trigger("route:" + o.model.route("/listComments/focus")),
            n.stopEventFully(i));
        },
        onFocusSelf: function() {
            this.view.focusSelf();
        },
        onClickShowAudioRecorder: function() {
            this.view.showAudioRecorder();
        }
    });
}),
define("views/TaskDetail/Controllers/FilesContextMenuController", ["application/runtime", "wunderbits/ContextMenuController"], function(e, t) {
    var i = e._;
    return t.extend({
        type: "files",
        "implements": {
            "contextmenu:label_open_file": "openFile",
            "contextmenu:label_delete_file": "deleteFile"
        },
        items: {
            label_open_file: void 0,
            label_delete_file: void 0
        },
        getContextMenuKeys: function() {
            return ["label_open_file", "label_delete_file"];
        },
        openFile: function() {
            var e = this
              , t = e.target.getAttribute("rel")
              , i = t && e.actions.fileLookup.getFileModel(t)
              , n = i && i.attributes.url
              , o = !0;
            n && e.actions.openUrl.openUrl(n, o);
        },
        deleteFile: function() {
            var t = this
              , n = t.target.getAttribute("rel")
              , o = n && t.actions.fileLookup.getFileModel(n);
            if (o) {
                var a = i.escape(o.attributes.file_name)
                  , r = "true" === e.settings.get("confirm_delete_entity")
                  , s = function() {
                    t.actions.deleteFile.deleteFile(n);
                };
                r ? e.trigger("modal:confirm", {
                    customTitle: e.language.getLabel("label_are_you_sure_permanently_delete_$_file", a).toString(),
                    customText: e.language.getLabel("label_cant_undo").toString(),
                    confirmText: e.language.getLabel("label_delete_file").toString(),
                    confirm: s
                }) : s();
            }
        }
    });
}),
define("/templates/symbols/clip.js", {
    name: "symbols/clip",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="clip" width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"> <g> <path id="XMLID_2_" d="M7,17c-1.335,0-2.591-0.521-3.536-1.465S2,13.336,2,12c0-1.335,0.52-2.591,1.464-3.536l5.312-5.312 c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707L4.171,9.171C3.416,9.927,3,10.932,3,12s0.416,2.073,1.171,2.828 c1.511,1.512,4.146,1.512,5.657,0l6.441-6.441c0.473-0.472,0.732-1.1,0.732-1.768c0-0.668-0.26-1.296-0.732-1.768 c-0.945-0.945-2.592-0.943-3.535,0l-6.441,6.441c-0.39,0.39-0.39,1.024,0,1.414c0.378,0.377,1.036,0.377,1.414,0l4.562-4.562 c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707l-4.562,4.562c-0.755,0.756-2.073,0.756-2.828,0 c-0.78-0.779-0.78-2.049,0-2.828l6.441-6.441c1.32-1.321,3.627-1.323,4.949,0c0.661,0.661,1.025,1.54,1.025,2.475 s-0.364,1.814-1.025,2.475l-6.441,6.441C9.591,16.479,8.335,17,7,17z"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/detailview/files.js", {
    name: "detailview/files",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="audio-recorder hidden"/> <div class="section-item files-add"> <div class="section-icon add-file" tabindex="0" role="button" data-key-aria-label="voiceover_detail_view_attachment_button_hint">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "clip", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</div> <div class="section-content"> <div class="section-title files-add-label"> ' + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_add_new_file", {
                name: "localized",
                hash: {},
                data: n
            }))) + ' </div> </div> <div class="section-attachments"> <span class="add-sound" tabindex="0" role="button" data-key-aria-label="label_add_a_voice_recording" data-key-title="label_add_a_voice_recording">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "speech", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> </div> </div>  <ul class="files-list"></ul> ';
        },
        useData: !0
    }
}),
define("/styles/detailview/_files.js", {
    name: "detailview/_files",
    data: ".dropTarget{display:none}.drop .dropTarget{display:block}#detail .inner.drop > .dropTarget{position:absolute;top:0;left:0;right:0;bottom:0;z-index:9999}.section-files.hasFiles .section-icon svg{fill:#63b4be}.section-files.offline .add-sound,.section-files.notSynced .add-sound{display:none}.section-files.offline span,.section-files.notSynced span{fill:#737272;display:inline-block;padding:5px;}.section-files.offline span:hover,.section-files.notSynced span:hover{fill:#262626}"
}),
define("views/TaskDetail/TaskDetailFilesView", ["application/runtime", "actions/Factory", "vendor/moment", "wunderbits/helpers/strings", "wunderbits/WBViewPresenter", "views/TaskDetail/TaskDetailFileView", "views/TaskDetail/TaskDetailRecordAudioFileView", "views/TaskDetail/Files/DropboxDropInsView", "wunderbits/views/WBFileSelectorView", "./Controllers/TaskDetailFilesController", "./Controllers/FilesContextMenuController", "partial!symbols/clip", "template!detailview/files", "style!detailview/_files", "style!_fileupload"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g) {
    var f = e.$
      , b = e._
      , h = e.global
      , v = h.Blob
      , _ = o.prototype
      , w = !!e.global.Blob;
    return o.extend({
        className: "section section-files",
        styles: [p, g],
        template: m,
        attributes: {
            tabindex: 0
        },
        "implements": [c, d],
        observes: {
            runtime: {
                "focus:listFiles": "focusFirstFile",
                "file:delete": "deleteFile"
            }
        },
        emits: {
            "contextmenu .files-list .section-item-file": "contextmenu:files",
            "click .add-file": "click:clippy",
            "click .add-sound": "click:recordFile",
            "keydown .files-add": "keydown:addFiles",
            "keydown .files-list .section-item-file": "keydown:listFiles"
        },
        initialize: function() {
            var e = this;
            _.initialize.apply(e, arguments),
            e.fileLookup = t.fileLookup(),
            e.createFile = t.createFile(),
            e.currentItemNum = 0,
            e.currentUploaderNum = 0,
            e.uploaders = [".add-file", ".add-sound:not(.hidden)", ".add-dropbox:not(.hidden)"];
        },
        render: function(e) {
            var t = this;
            return t.currentItemNum = 0,
            t.currentUploaderNum = 0,
            t.taskModelBind && t.unbindFrom(t.taskModelBind),
            t.model && t.unbindFromTarget(t.model),
            t.collectionBind && t.unbindFrom(t.collectionBind),
            t.productBind && t.unbindFrom(t.productBind),
            t.audioBind && t.unbindFrom(t.audioBind),
            t.model = e.model || t.model,
            t.model ? (e.animationDeferred.done(function() {
                t.requestAnimationFrame(function() {
                    t.setupCollectionbinds(),
                    _.render.apply(t, arguments),
                    t.renderFileSelector(),
                    t.renderFilesCollectionViews(),
                    t.renderAudioRecorder(),
                    t.renderFileSelectorPlaceholder(),
                    t.renderDropboxDropInsView(),
                    t.checkHasFiles();
                });
            }),
            t) : t;
        },
        setupCollectionbinds: function() {
            var t = this;
            t.collection = t.fileLookup.getFileCollection(t.model.id),
            t.collectionBind = t.bindTo(t.collection, "add", t.onAddFile),
            t.taskModelBind = t.bindTo(t.model, "change:hasFiles", t.checkHasFiles),
            t.productBind = t.bindTo(e.user, "change:pro", function() {
                !t.fileSelectorView && t.renderFileSelector(),
                !t.audioRecorderView && t.renderAudioRecorder(),
                t.audioRecorderView && t.audioRecorderView.$el.removeClass("hidden"),
                t.$(".add-sound").removeClass("hidden");
            });
        },
        renderFilesCollectionViews: function() {
            var e = this;
            b.each(e._namedSubviews, function(t, i) {
                "audioRecorderView" !== i && "selectorView" !== i && "dropboxView" !== i && e.destroySubview(t);
            });
            var t = document.createDocumentFragment();
            e.collection.models.length && b.each(e.collection.models, function(i) {
                var n = e.getRenderedFileView(i).el;
                t.appendChild(n);
            }),
            e.$(".files-list").append(t);
        },
        renderAudioRecorder: function() {
            var t = this
              , i = e.env.isUserMediaSupported();
            t.$(".add-sound").toggleClass("hidden", !i),
            i && (t.audioRecorderView ? t.audioRecorderView.setModel(t.model) : (t.audioRecorderView = t.addSubview(new r({
                taskModel: t.model
            }), "audioRecorderView"),
            t.audioRecorderView.render()),
            t.audioBind && t.unbindFrom(t.audioBind),
            t.audioBind = t.bindTo(t.audioRecorderView, "upload:audioFile", function(i) {
                t._upload(i),
                t.$(".files-add").removeClass("hidden"),
                t.$(".audio-recorder").addClass("hidden"),
                e.trigger("analytics:Files:UploadType", "browserRecordedAudio");
            }),
            t.audioClearBind && t.unbindFrom(t.audioClearBind),
            t.audioClearBind = t.bindTo(t.audioRecorderView, "recording:clear", function() {
                t.$(".files-add").removeClass("hidden"),
                t.$(".audio-recorder").addClass("hidden"),
                t.resetAudioRecorder();
            }),
            t.$(".audio-recorder").append(t.audioRecorderView.el));
        },
        focusNextItem: function() {
            var e = this
              , t = e.$(".file");
            e.currentItemNum < t.length - 1 && (e.currentItemNum += 1,
            f(t.get(e.currentItemNum)).focus());
        },
        focusPrevItem: function() {
            var t = this
              , i = t.$(".file");
            t.currentItemNum > 0 ? (t.currentItemNum -= 1,
            f(i.get(t.currentItemNum)).focus()) : 0 === t.currentItemNum && 1 === i.length && e.trigger("route:" + t.model.route("addFile/focus"));
        },
        focusFirstUploader: function() {
            var e = this;
            e.currentUploaderNum = 0,
            e.$(e.uploaders[e.currentUploaderNum]).focus();
        },
        focusNextUploader: function() {
            var e = this;
            e.currentUploaderNum < e.uploaders.length - 1 && (e.currentUploaderNum += 1,
            e.$(e.uploaders[e.currentUploaderNum]).focus());
        },
        focusPrevUploader: function() {
            var e = this;
            e.currentUploaderNum > 0 && (e.currentUploaderNum -= 1,
            e.$(e.uploaders[e.currentUploaderNum]).focus());
        },
        getRenderedFileView: function(e) {
            var t = this
              , i = t.getSubview(e.id);
            return i || (i = new a({
                model: e,
                collection: t.collection
            }),
            i = t.addSubview(i, e.id).render()),
            i;
        },
        renderFileSelector: function() {
            var t = this
              , i = t.$(".files-add-label");
            if (!t.fileSelectorView) {
                var n = f("#detail > .inner")
                  , o = new l({
                    dropTarget: n,
                    urlBlocker: "preferences/account"
                });
                t.fileSelectorView = t.addSubview(o, "selectorView"),
                t.bindTo(t.fileSelectorView, "selected:files", t._uploadMultiple.bind(t)),
                t.bindTo(t.fileSelectorView, "dropped:text", t._uploadText.bind(t));
            }
            t.fileSelectorView.setElement(i);
            var a = e.language.getLabel("label_add_new_file").toString();
            t.$(".files-add-label").html(a),
            t.renderLabels();
        },
        renderFileSelectorPlaceholder: function() {
            var t, i = this, n = e.language.getLabel("label_add_new_file").toString(), o = i.$(".files-add-label"), a = o.find("text");
            a ? a.replaceWith(n) : o.append(n),
            i.renderLabels(),
            i.$(".files-add").removeClass("offline notSynced").addClass(t);
        },
        renderDropboxDropInsView: function() {
            var t = this;
            !e.env.isChromeApp() && e.user.showSocialButtons() && (t.dropboxView ? t.dropboxView.setTaskModel(t.model) : t.dropboxView = t.addSubview(new s({
                taskModel: t.model
            }), "dropboxView"),
            t.dropboxView.render(),
            t.$(".add-sound").after(t.dropboxView.el));
        },
        _uploadMultiple: function(t) {
            var i = this;
            b.each(t, function(t) {
                var n = !e.user.isPro() && t.size > 5e6;
                e.areProLimitsEnabled() && n ? e.trigger("route:goPro/files") : i._upload(t);
            }),
            i.renderFileSelector();
        },
        _upload: function(t) {
            var i = this;
            if (t && i.isDetailViewOpen()) {
                var n = t.name
                  , o = t.type
                  , a = {
                    task: i.model,
                    file: t
                };
                i.createFile.createFile(n, o, i.model.id, e.user.id, a);
            }
        },
        _uploadText: function(e) {
            var t = this;
            if (e.length && w) {
                var i = new v([e],{
                    type: "text/plain"
                });
                i.name = n.dateString() + ".txt",
                t._upload(i);
            }
        },
        focusFirstFile: function(t) {
            var i = this;
            t = t || "next";
            var n = i.$(".file");
            0 === n.length ? "next" === t ? i.trigger("route:listComments", t) : e.trigger("route:" + i.model.route("addFile/focus")) : i.$(".file:first").focus();
        },
        focusCurrentItem: function() {
            var t = this
              , i = t.$(".file")
              , n = i.get(t.currentItemNum);
            n ? n.focus() : e.trigger("route:" + t.model.route("addFile/focus"));
        },
        checkHasFiles: function() {
            var e = this
              , t = e.model.hasFiles();
            e.$el.toggleClass("hasFiles", t);
        },
        onAddFile: function(t, n, o) {
            var a = this
              , r = a.getRenderedFileView(t);
            o.uploader && r.setUploader(o.uploader);
            var s = a.$(".files-list");
            a.collection.sort();
            var l = a.collection.models
              , c = i(t.attributes.created_at).valueOf()
              , d = t.attributes.file_name.toLowerCase()
              , u = b.find(l.reverse(), function(e) {
                return c < i(e.attributes.created_at).valueOf();
            })
              , m = b.find(l.reverse(), function(e) {
                return c > i(e.attributes.created_at).valueOf();
            })
              , p = b.find(l.reverse(), function(e) {
                var t = c === i(e.attributes.created_at).valueOf();
                return t && d > e.attributes.file_name.toLowerCase();
            })
              , g = b.find(l.reverse(), function(e) {
                var t = c === i(e.attributes.created_at).valueOf();
                return t && d < e.attributes.file_name.toLowerCase();
            });
            u = p ? p : u,
            m = g ? g : m;
            var f = m && s.find("li[rel=" + m.id + "]")
              , h = u && s.find("li[rel=" + u.id + "]");
            h && h.length ? h.after(r.el) : f && f.length && (!h || h && !h.length) ? f.before(r.el) : s.append(r.el),
            e.trigger("detail:checkBounds");
        },
        deleteFile: function() {
            var e = this
              , t = e.$(".file").get(e.currentItemNum)
              , i = f(t).parent("li").attr("rel")
              , n = e.getSubview(i);
            n.trigger("delete:file", !1, {
                confirm: function() {
                    e.focusPrevItem();
                },
                cancel: function() {
                    e.focusCurrentItem();
                }
            });
        },
        showAudioRecorder: function() {
            var e = this;
            e.$(".audio-recorder").removeClass("hidden"),
            e.$(".files-add").addClass("hidden"),
            e.$(".start-recording-audio").focus();
        },
        resetAudioRecorder: function() {
            var e = this;
            e.$(".add-sound").focus();
        },
        isDetailViewOpen: function() {
            return h.location.href.indexOf("/tasks/") >= 0;
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailSubTaskItemViewController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController"], function(e, t, i) {
    var n = i.prototype;
    return i.extend({
        "implements": {
            "click:done": "onToggleDone",
            "click:title": "onClickToEdit",
            "click:delete": "onDelete"
        },
        initialize: function() {
            var e = this;
            n.initialize.apply(e, arguments),
            e.completeSubTask = t.completeSubTask(),
            e.deleteSubTask = t.deleteSubTask();
        },
        onToggleDone: function() {
            var e = this
              , t = e.view;
            e.completeSubTask.toggleSubtasksCompleted([t.model.id]);
        },
        onClickToEdit: function() {
            this.view.showEditMode();
        },
        onDelete: function(t) {
            var i = this
              , n = i.view
              , o = "true" === e.settings.attributes.confirm_delete_entity
              , a = function() {
                n.destroyed || (i.deleteSubTask.deleteSubTask(n.model.id),
                n.destroy(),
                t && t.confirm && t.confirm());
            };
            o ? e.trigger("modal:confirm", {
                customTitle: e.language.getLabel("label_are_you_sure_permanently_delete_$_subtask", n.model.escape("title")).toString(),
                customText: e.language.getLabel("label_cant_undo").toString(),
                confirmText: e.language.getLabel("label_delete_subtask").toString(),
                confirm: a,
                cancel: t && t.cancel
            }) : a();
        }
    });
}),
define("/templates/detailview/detailSubTask.js", {
    name: "detailview/detailSubTask",
    data: {
        "1": function() {
            return " checked";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="section-icon"> <a class="subtask-checkbox checkBox';
            return o = t["if"].call(e, e && e.completed, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "task-check", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " " + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "task-checked", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </a> </div> <div class="section-content top"> <div class="section-title selectable"></div> </div> <a class="section-delete"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        useData: !0
    }
}),
define("views/TaskDetail/TaskDetailSubTaskItemView", ["application/runtime", "actions/Factory", "wunderbits/helpers/selection", "wunderbits/WBValidationHelper", "views/TaskDetail/Controllers/TaskDetailSubTaskItemViewController", "wunderbits/WBContentFakable", "wunderbits/WBViewPresenter", "template!detailview/detailSubTask"], function(e, t, i, n, o, a, r, s, l) {
    var c = e.$
      , d = r.prototype;
    return r.extend({
        template: s,
        tagName: "li",
        className: "section-item subtask",
        "implements": [o],
        attributes: {
            tabindex: 0
        },
        emits: {
            "click .subtask-checkbox": "click:done",
            "click .section-title": "click:title",
            "click .section-delete": "click:delete"
        },
        initialize: function(e) {
            var i = this;
            d.initialize.apply(i, arguments),
            e = e || {},
            i.parent = e.parent || i.parent,
            i.model = e.model || i.model,
            i.parentCollection = e.collection || i.collection,
            i.contentFakable = i.addSubview(new a({
                lineHeight: 20,
                fontSize: 15
            })),
            i.updateSubtaskTitle = t.updateSubtaskTitle();
        },
        renderData: {
            completed: l
        },
        formatdata: function(e) {
            return e.completed = this.model.isCompleted(),
            e;
        },
        render: function(e) {
            return this.setModelAndRender(e);
        },
        setModelAndRender: function(e) {
            var t = this;
            return e = e || {},
            t.options = e,
            t.parent = e.parent || t.parent,
            t.model = t.options.model || t.model,
            d.render.call(t, t.formatdata(t.renderData)),
            t.renderAriaLabel(),
            t.model.isCompleted() && t.$el.addClass("done"),
            t.$el.attr("rel", t.model.id),
            t.$(".section-title")[0].appendChild(t.contentFakable.render({
                context: t,
                content: t.model.attributes.title,
                maxLength: 255,
                autoSave: !1,
                convertLinks: !0,
                saveOnEnter: !0,
                multiLine: !0,
                showLoading: !1,
                scrollContainer: c("#detail .body"),
                markupDelay: t.options.delay || 0
            }).el),
            t.bindTo(t.contentFakable.model, "change:content", t.onSaveChanges),
            t.bindTo(t.model, "change:completed", t.onUpdateDone),
            t.bindTo(t.model, "change:title", t.updateTitleFromSync),
            t;
        },
        scrollCheck: function() {
            var e = this;
            e.contentFakable.scrollCheck();
        },
        updateTitleFromSync: function() {
            var e = this;
            e.$(".edit-view").hasClass("hidden") && e.contentFakable.model.attributes.content !== e.model.attributes.title && e.contentFakable.model.set({
                content: e.model.attributes.title
            }),
            e.renderAriaLabel();
        },
        renderAriaLabel: function() {
            var t = this
              , i = t.model.attributes.title
              , n = e.language.getText("aria_subtask")
              , o = ""
              , a = t.parentCollection.models.indexOf(t.model);
            if (0 === a) {
                var r = e.language.getText("aria_press_enter_to_edit")
                  , s = e.language.getText("aria_press_$_to_complete", e.settings.attributes.shortcut_mark_task_done)
                  , l = e.language.getText("aria_press_$_to_complete", e.settings.attributes.shortcut_delete)
                  , c = e.language.getText("aria_subtask_navigation_info");
                o += r + s + l + c;
            }
            t.$el.attr("aria-label", i + " - " + n + o);
        },
        showEditMode: function(e) {
            var t = this
              , n = !1;
            if (e && (n = c(e.target).is("span")),
            !n && (t.contentFakable.onShowEditMode(),
            e)) {
                var o = t.$("textarea");
                i.setCaretToPos(o[0], o.val().length);
            }
            t.triggerFocusChange();
        },
        onUpdateDone: function() {
            var e = this
              , t = e.$(".subtask-checkbox")
              , i = e.model.isCompleted();
            i ? (t.addClass("checked"),
            e.$el.addClass("done")) : (t.removeClass("checked"),
            e.$el.removeClass("done"));
        },
        onSaveChanges: function() {
            var e = this
              , t = e.contentFakable.model.attributes.content;
            t ? e.updateSubtaskTitle.updateSubtaskTitle(t, e.model.id) : e.contentFakable.model.set("content", e.model.attributes.title);
        },
        triggerFocusChange: function() {
            e.trigger("focus:set", "detail");
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailSubTaskAddViewController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/helpers/strings", "wunderbits/WBViewController"], function(e, t, i, n, o) {
    var a = o.prototype;
    return o.extend({
        "implements": {
            "click:title": "onShowEditMode",
            "keydown:textedit": "onTaskEditKeydown",
            "blur:textedit": "onTaskEditBlur",
            "focus:textedit": "onTaskEditFocus"
        },
        initialize: function() {
            var e = this;
            a.initialize.apply(e, arguments),
            e.subTaskLookup = t.subTaskLookup(),
            e.createSubtask = t.createSubtask();
        },
        onShowEditMode: function() {
            var e = this.view;
            e.model && e.showEditMode();
        },
        proLimitReached: function() {
            var t = this.view
              , i = t.getRenderedSubtasksCount();
            return e.areProLimitsEnabled() && !e.user.isPro() && i >= 25;
        },
        onSaveChanges: function() {
            var t = this
              , i = t.view
              , o = i.model.id
              , a = i.getTextInput()
              , r = a.length > 0;
            if (r)
                if (t.proLimitReached())
                    e.trigger("route:goPro/subtasks");
                else {
                    a = n.emojiTokensToUnicode(a);
                    var s = t.subTaskLookup.getSubTaskCollection(o)
                      , l = s.getNewBottomPosition();
                    t.createSubtask.createSubtask(a, l, o),
                    i.resetTextInputs();
                }
        },
        onTaskEditKeydown: function(e) {
            var t = this
              , n = t.view;
            if (e.which === i.esc)
                n.cancelChanges();
            else if (e.which === i.enter) {
                if (e.shiftKey)
                    return;
                e.preventDefault(),
                t.onSaveChanges(),
                t.proLimitReached() || n.showEditMode();
            } else
                e.which === i.tab && (n.fromTab = !0,
                t.stopEventFully(e));
        },
        onTaskEditBlur: function() {
            var t = this;
            t.onSaveChanges(),
            t.proLimitReached() || (t.view.onHideEditMode(),
            t.defer(function() {
                e.trigger("route:" + t.view.model.route("/addSubtasks/focus"));
            }));
        },
        onTaskEditFocus: function() {
            var t = this;
            t.defer(function() {
                e.trigger("route:" + t.view.model.route("/listSubtasks/edit"), {
                    trigger: !1
                });
            });
        }
    });
}),
define("/templates/detailview/detailSubTaskAdd.js", {
    name: "detailview/detailSubTaskAdd",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="section-icon">' + r((o = t.symbol || e && e.symbol || a,
            o.call(e, "plus-small", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</div> <div class="section-content top"> <div class="section-title">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "placeholder_add_subtask", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> <div class="section-edit hidden"></div> </div> ';
        },
        useData: !0
    }
}),
define("views/TaskDetail/TaskDetailSubTaskAddView", ["application/runtime", "views/TaskDetail/Controllers/TaskDetailSubTaskAddViewController", "wunderbits/WBExpandableTextareaView", "wunderbits/WBViewPresenter", "partial!symbols/plus-small", "template!detailview/detailSubTaskAdd"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = n.prototype;
    return n.extend({
        template: a,
        className: "section-item subtask-add",
        "implements": [t],
        attributes: {
            tabindex: 0,
            role: "input",
            "data-key-aria-label": "placeholder_add_subtask"
        },
        emits: {
            "click .section-title": "click:title",
            "keydown .section-edit textarea": "keydown:textedit",
            "blur .section-edit textarea": "blur:textedit",
            "focus .section-edit textarea": "focus:textedit"
        },
        initialize: function(e) {
            var t = this;
            s.initialize.apply(t, arguments),
            t.options = e || {},
            t.options.lineHeight = 20,
            t.options.fontSize = 15,
            t.textareaView = t.addSubview(new i(t.options));
        },
        setModelAndRender: function(e) {
            var t, i = this;
            return i.model = e || i.model,
            t = i.model.toJSON(),
            s.render.call(i, t),
            i.$(".section-edit")[0].appendChild(i.textareaView.render({
                content: "",
                maxLength: 255,
                placeholderKey: "placeholder_add_subtask"
            }).el),
            i;
        },
        setModel: function(e) {
            var t = this;
            t.model = e;
        },
        showEditMode: function() {
            var e = this
              , t = e.$(".section-edit")
              , i = e.$(".section-title");
            i.addClass("hidden"),
            t.removeClass("hidden").find("textarea").val("").focus(),
            e.triggerFocusChange();
        },
        onHideEditMode: function(t) {
            var i, n = this, o = n.$(".section-edit"), a = n.$(".section-title");
            a.removeClass("hidden"),
            o.addClass("hidden"),
            n.fromTab || t || (i = !0),
            t ? e.trigger("route:" + n.model.route("/subtasks/focus")) : n.silentRouteToTask(t, i);
        },
        cancelChanges: function() {
            var e = this;
            e.$("textarea").val(""),
            e.onHideEditMode(!0);
        },
        getTextInput: function() {
            var e = this;
            return r.trim(e.$("textarea").val());
        },
        resetTextInputs: function() {
            var e = this;
            e.$("textarea").val(""),
            e.$("pre").text('""');
        },
        getRenderedSubtasksCount: function() {
            var e = this;
            return e.$el.prev("ul").children().length;
        },
        silentRouteToTask: function(t, i) {
            var n = this
              , o = "tasks/" + n.model.id
              , a = e.currentRoute().indexOf(o) >= 0;
            a ? e.trigger("route:" + o, {
                trigger: !1
            }) : (t || i) && e.trigger("route:" + o),
            n.fromTab = !1;
        },
        triggerFocusChange: function() {
            e.trigger("focus:set", "detail");
        }
    });
}),
define("/styles/detailview/_subtasks.js", {
    name: "detailview/_subtasks",
    data: '.subtasks.hasSubtasks .plus-small{fill:#67ae2b}.subtask .section-title{color:#262626 !important}.subtask a{color:#328ad6}.subtask.done .section-title{color:#aaa !important}.subtask.done .display-view{text-decoration:line-through}.subtask.done .subtask-checkbox{opacity:.7;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";filter:alpha(opacity=70)}.subtask.done a{color:#87bbe7}.subtask .task-check{stroke:#67ae2b}'
}),
define("views/TaskDetail/TaskDetailSubTaskCollectionView", ["application/runtime", "views/TaskDetail/TaskDetailSubTaskItemView", "views/TaskDetail/TaskDetailSubTaskAddView", "views/OrderedListView", "helpers/dnd/index", "helpers/domtools", "actions/Factory", "wunderbits/WBViewPresenter", "style!detailview/_subtasks"], function(e, t, i, n, o, a, r, s, l) {
    var c = e._
      , d = "application/x-wunderlist-subtask"
      , u = n.prototype;
    return n.extend({
        tagName: "ul",
        styles: [l],
        initialize: function(e) {
            var t = this;
            t.repositionSubTask = r.repositionSubTask(),
            t.subTaskLookup = r.subTaskLookup(),
            u.initialize.apply(t, arguments),
            t.options = e || {},
            t.options.lineHeight = 20,
            t._enableDragToReorderList();
        },
        getViewInstanceForModel: function(e) {
            var i = this
              , n = c.merge({}, i.options, {
                model: e,
                parent: i.model
            })
              , o = i.addSubview(new t(n), e.attributes.type + e.id);
            return i.dragHelper.prepareItem(o.el),
            o;
        },
        _enableDragToReorderList: function() {
            var e = this;
            e.dragHelper = o.createDragList(e.el, {
                mimeType: d,
                itemToData: e._itemToData.bind(e),
                getDragImage: e._createDragImageElement.bind(e),
                disposeDragImage: e._disposeDragImage.bind(e),
                effectAllowed: ["move"]
            }),
            e.dropHelper = o.createDropBetweenList(e.el, {
                dropTargetTopClass: "dragAreaTop",
                dropTargetTopHeight: 2,
                dropTargetBottomClass: "dragAreaBottom",
                dropTargetBottomHeight: 0,
                mimeTypes: [d]
            }),
            e.bindTo(e.dropHelper, "droppedBetween", e._onDropSubtask),
            e.dragHelper.enable(),
            e.dropHelper.enable();
        },
        render: function(e) {
            var t = this;
            return t.collection && t.unbindFromTarget(t.collection),
            t.$el.empty(),
            t.options = e || {},
            t.model = t.options.model,
            t.options.reRender = !0,
            t.collection = t.subTaskLookup.getSubTaskCollection(t.model.id),
            t.options.collection = t.collection,
            u.render.apply(t, arguments),
            t;
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
            i.classList.add("subtask-drag-clone"),
            i.style.height = t.height;
            var n = window.document.body;
            return n.appendChild(i),
            i;
        },
        _onDropSubtask: function(e, t, i) {
            var n = this
              , o = t && t.getAttribute("rel")
              , a = i && i.getAttribute("rel");
            n.repositionSubTask.moveSubTaskTo(e, o, a, n.model.id);
        },
        scrollCheck: function() {
            var e = this;
            c.each(e.subviews, function(e) {
                "function" == typeof e.scrollCheck && e.scrollCheck();
            });
        },
        focusSelf: function() {
            this.$el.focus();
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailSubTasksViewController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController"], function(e, t, i) {
    var n = e.$;
    return i.extend({
        "implements": {
            "keydown:addSubtasks": "onAddSubtasksKeydown",
            "keydown:listSubtasks": "onListSubtasksKeydown",
            "route:addSubtasks": "onRouteAddSubtasks",
            "click:subtask": "updateCurrentFocusIndex"
        },
        onRouteAddSubtasks: function() {
            var t = this
              , i = t.view;
            e.trigger("route:" + i.model.route("/addSubtasks/focus"));
        },
        onAddSubtasksKeydown: function(e) {
            var i = this
              , n = e.target.classList.contains("subtask-add");
            n && e.which === t.enter && (i.view.addSubTaskView.showEditMode(),
            i.stopEventFully(e));
        },
        onListSubtasksKeydown: function(i) {
            var o = this
              , a = o.view;
            i.which === t.enter ? (a.focusCurrentItem(),
            n(i.target).find(".subtask-title").click(),
            o.stopEventFully(i)) : i.which === t.esc ? (a.focusCurrentItem(),
            e.trigger("route:" + a.model.route("/listSubtasks/focus"), {
                trigger: !1
            }),
            o.stopEventFully(i)) : i.which !== t.tab || i.shiftKey ? i.which === t.tab && i.shiftKey ? (e.trigger("route:" + a.model.route("/reminder/focus")),
            o.stopEventFully(i)) : i.which === t.up ? a.focusPrevItem() : i.which === t.down && a.focusNextItem() : (e.trigger("route:" + a.model.route("/addSubtasks/focus")),
            o.stopEventFully(i));
        },
        updateCurrentFocusIndex: function(e) {
            var t = this
              , i = t.view
              , o = n(e.target).closest("li")[0];
            if (o) {
                var a = i.$(".subtask").index(o);
                i.currentItemNum = a;
            }
        },
        focusSelf: function() {
            this.view.focusSelf();
        }
    });
}),
define("views/TaskDetail/TaskDetailSubtasksView", ["application/runtime", "views/TaskDetail/TaskDetailSubTaskCollectionView", "views/TaskDetail/TaskDetailSubTaskAddView", "views/TaskDetail/Controllers/TaskDetailSubTasksViewController", "actions/Factory", "wunderbits/WBViewPresenter"], function(e, t, i, n, o, a) {
    var r = e.$
      , s = a.prototype;
    return a.extend({
        className: "section subtasks",
        attributes: {
            tabindex: 0
        },
        observes: {
            runtime: {
                "tasks:markDone": "toggleCompleteSubtaskFromShortcut",
                "subtask:delete": "deleteSubtaskFromShortcut"
            }
        },
        emits: {
            "keydown .subtask-add": "keydown:addSubtasks",
            "keydown .subtask": "keydown:listSubtasks",
            "click .subtask": "click:subtask"
        },
        "implements": [n],
        initialize: function(e) {
            var n = this;
            s.initialize.apply(n, arguments),
            n.subTasksLookup = o.subTaskLookup(),
            n.completeSubtask = o.completeSubTask(),
            n.deleteSubtask = o.deleteSubTask(),
            n.model = e.model,
            n.subtasksSubView = n.addSubview(new t({
                collection: n.subTasksLookup.getSubTaskCollection(n.model.id)
            })),
            n.addSubTaskView = n.addSubview(new i()),
            n.currentItemNum = 0;
        },
        render: function(e) {
            var t = this
              , i = arguments;
            t.currentItemNum = 0,
            t.model = e.model,
            t.taskModelBind && t.unbindFrom(t.taskModelBind),
            t.hasRenderredOnce || s.render.apply(t, arguments);
            var n = function() {
                t.renderDeferred.apply(t, i);
            };
            return e.animationDeferred ? e.animationDeferred.done(n) : n(),
            t.hasRenderredOnce = !0,
            t.taskModelBind = t.bindTo(t.model, "change:hasSubtasks", t.checkHasSubtasks),
            t.checkHasSubtasks(),
            t;
        },
        renderDeferred: function(e) {
            var t = this;
            s.render.apply(t, arguments),
            t.inputEl = t.addSubTaskView.setModelAndRender(e.model).el,
            t.subtasksSubView.render({
                model: t.model
            }).el;
            var i = document.createDocumentFragment();
            i.appendChild(t.subtasksSubView.el),
            i.appendChild(t.inputEl),
            t.$el.append(i);
        },
        focusCurrentItem: function() {
            var e = this
              , t = e.$(".subtask")
              , i = t.get(e.currentItemNum);
            i ? i.focus() : e.trigger("route:addSubtasks");
        },
        focusNextItem: function() {
            var e = this
              , t = e.$(".subtask");
            e.currentItemNum < t.length - 1 && (e.currentItemNum += 1,
            t.get(e.currentItemNum).focus());
        },
        focusPrevItem: function() {
            var e = this
              , t = e.$(".subtask");
            e.currentItemNum > 0 && (e.currentItemNum -= 1);
            var i = t.get(e.currentItemNum);
            i && i.focus();
        },
        getActiveSubtaskModel: function() {
            var e = this
              , t = e.$(".subtask")
              , i = t.get(e.currentItemNum);
            i = i ? i : t.is(":focus");
            var n = r(i).attr("rel")
              , o = e.subTasksLookup.getSubTaskModel(n);
            return o;
        },
        toggleCompleteSubtaskFromShortcut: function() {
            var e = this
              , t = e.getActiveSubtaskModel();
            t && t.isCompleted() ? e.completeSubtask.unCompleteSubTask(t) : t && e.completeSubtask.completeSubTask(t);
        },
        deleteSubtaskFromShortcut: function() {
            var e = this
              , t = e.getActiveSubtaskModel();
            if (t) {
                var i = e.subtasksSubView.getSubview(t.id);
                i.trigger("click:delete", {
                    confirm: function() {
                        e.focusPrevItem();
                    },
                    cancel: function() {
                        e.focusCurrentItem();
                    }
                });
            }
        },
        markAllSubTasksAsDone: function() {
            var e = this
              , t = e.subTasksLookup.getSubTaskModels([e.model.id]);
            e.completeSubtask.completeSubTasks(t);
        },
        focusFirstSubtask: function(e) {
            var t = this;
            t.currentItemNum = 0;
            var i = t.$(".subtask");
            0 === i.length ? "next" === e ? t.defer(function() {
                t.trigger("route:addSubtasks");
            }) : t.trigger("route:addSubtasks") : t.$(".subtask:first").focus();
        },
        checkHasSubtasks: function() {
            var e = this
              , t = e.model.hasSubtasks();
            e.$el.toggleClass("hasSubtasks", t);
        },
        focusSelf: function() {
            this.$el.focus();
        }
    });
}),
define("views/TaskDetail/SmartCards/BingMapView", ["application/runtime", "wunderbits/WBViewPresenter"], function(e, t) {
    var i = e.global
      , n = t.prototype;
    return t.extend({
        className: "bing-map",
        render: function(e) {
            var t = this;
            return n.render.call(t),
            t.renderBingMap(e.coordinates),
            t;
        },
        renderBingMap: function(e) {
            var t = this
              , n = i.Microsoft;
            n && new n.Maps.Map(t.el,{
                credentials: "AjUG8ok1EdiI_xDh5jdsjWVgGdm0R5A6K1_yGp1iTFHpUzJElmgSQ-ULSCSdlksG",
                center: new n.Maps.Location(e[0],e[1]),
                mapTypeId: n.Maps.MapTypeId.road,
                zoom: 7,
                showDashboard: !1,
                enableSearchLogo: !1
            });
        }
    });
}),
define("/templates/detailview/smartcard.js", {
    name: "detailview/smartcard",
    data: {
        "1": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, (o = e && e.image,
            null == o || o === !1 ? o : o.thumbnailUrl), {
                name: "if",
                hash: {},
                fn: this.program(2, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "2": function(e) {
            var t, i = "function", n = this.escapeExpression;
            return ' <div class="smart-card-thumbnail"> <img src="' + n((t = e && e.image,
            t = null == t || t === !1 ? t : t.thumbnailUrl,
            typeof t === i ? t.apply(e) : t)) + '" title="' + n((t = e && e.image,
            t = null == t || t === !1 ? t : t.name,
            typeof t === i ? t.apply(e) : t)) + '" width="' + n((t = e && e.image,
            t = null == t || t === !1 ? t : t.width,
            typeof t === i ? t.apply(e) : t)) + '" height="' + n((t = e && e.image,
            t = null == t || t === !1 ? t : t.height,
            typeof t === i ? t.apply(e) : t)) + '"/> </div> ';
        },
        "4": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="smart-card-author">' + r((o = t.author || e && e.author,
            typeof o === a ? o.call(e, {
                name: "author",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "6": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="smart-card-contentRating">' + r((o = t.contentRating || e && e.contentRating,
            typeof o === a ? o.call(e, {
                name: "contentRating",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "8": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="smart-card-year">' + r((o = t.releaseYear || e && e.releaseYear,
            typeof o === a ? o.call(e, {
                name: "releaseYear",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "10": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="smart-card-duration">' + r((o = t.duration || e && e.duration,
            typeof o === a ? o.call(e, {
                name: "duration",
                hash: {},
                data: n
            }) : o)) + " min</span> ";
        },
        "12": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="smart-card-genre">' + r((o = t.genre || e && e.genre,
            typeof o === a ? o.call(e, {
                name: "genre",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "14": function(e) {
            var t, i = "function", n = this.escapeExpression;
            return ' <a href="http://bing.com/maps/default.aspx?where1=' + n((t = e && e.address,
            t = null == t || t === !1 ? t : t.text,
            typeof t === i ? t.apply(e) : t)) + '"><span class="smart-card-address">' + n((t = e && e.address,
            t = null == t || t === !1 ? t : t.text,
            typeof t === i ? t.apply(e) : t)) + "</span></a> ";
        },
        "16": function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = "function", c = ' <div class="smart-card-rating-container"> <div class="smart-card-rating-wrapper"> <div class="smart-card-rating bg"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </div> <div class="smart-card-rating" style="width:' + s((o = e && e.rating,
            o = null == o || o === !1 ? o : o.percentage,
            typeof o === l ? o.apply(e) : o)) + '%"> <div class="smart-card-rating-inner"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "star-filled", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </div> </div> </div> ";
            return o = t["if"].call(e, (o = e && e.rating,
            null == o || o === !1 ? o : o.provider), {
                name: "if",
                hash: {},
                fn: this.program(17, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + " </div> ";
        },
        "17": function(e) {
            var t, i = "function", n = this.escapeExpression;
            return ' <div class="smart-card-rating-provider"> ' + n((t = e && e.rating,
            t = null == t || t === !1 ? t : t.provider,
            typeof t === i ? t.apply(e) : t)) + " </div> ";
        },
        "19": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <div class="smart-card-description"> ' + r((o = t.description || e && e.description,
            typeof o === a ? o.call(e, {
                name: "description",
                hash: {},
                data: n
            }) : o)) + " </div> ";
        },
        "21": function(e, t, i, n) {
            var o, a = ' <div class="smart-card-actions"> ';
            return o = t.each.call(e, e && e.actions, {
                name: "each",
                hash: {},
                fn: this.program(22, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " </div> ";
        },
        "22": function(e) {
            var t, i = "function", n = this.escapeExpression;
            return ' <a class="button full outlined" href="' + n((t = e && e.target,
            t = null == t || t === !1 ? t : t.url,
            typeof t === i ? t.apply(e) : t)) + '" target="_blank"> ' + n((t = e && e.displayName,
            typeof t === i ? t.apply(e) : t)) + " </a> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = t.helperMissing, c = '<div class="section-icon ' + s((a = t.type || e && e.type,
            typeof a === r ? a.call(e, {
                name: "type",
                hash: {},
                data: n
            }) : a)) + '"> ' + s((a = t.symbol || e && e.symbol || l,
            a.call(e, e && e.icon, {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </div> <div class="section-content"> <div class="smart-card-content ' + s((a = t.type || e && e.type,
            typeof a === r ? a.call(e, {
                name: "type",
                hash: {},
                data: n
            }) : a)) + '"> <div class="smart-card-header"> ';
            return o = t["if"].call(e, e && e.image, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += ' <div class="smart-card-info"> <div class="smart-card-title">' + s((a = t.title || e && e.title,
            typeof a === r ? a.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : a)) + '</div> <div class="smart-card-meta"> ',
            o = t["if"].call(e, e && e.author, {
                name: "if",
                hash: {},
                fn: this.program(4, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.contentRating, {
                name: "if",
                hash: {},
                fn: this.program(6, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.releaseYear, {
                name: "if",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.duration, {
                name: "if",
                hash: {},
                fn: this.program(10, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.genre, {
                name: "if",
                hash: {},
                fn: this.program(12, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, e && e.address, {
                name: "if",
                hash: {},
                fn: this.program(14, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " </div> ",
            o = t["if"].call(e, e && e.rating, {
                name: "if",
                hash: {},
                fn: this.program(16, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " </div> </div> ",
            o = t["if"].call(e, e && e.description, {
                name: "if",
                hash: {},
                fn: this.program(19, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c += " ",
            o = t["if"].call(e, (o = e && e.actions,
            null == o || o === !1 ? o : o.length), {
                name: "if",
                hash: {},
                fn: this.program(21, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (c += o),
            c + ' </div> <div class="smart-card-footer"> ' + s((a = t.symbol || e && e.symbol || l,
            a.call(e, "bing", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' <span class="smart-card-powered">powered by bing</span> </div> </div> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/amazon.js", {
    name: "symbols/amazon",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="amazon"> <path d="M17.8602769,16.8667985 C15.7280617,18.4403358 12.6363255,19.2774705 9.97430461,19.2774705 C6.24320866,19.2774705 2.88360224,17.8985 0.341080335,15.6026754 C0.141541047,15.4225447 0.319586553,15.1760078 0.559546982,15.3157174 C3.30257058,16.9118713 6.69473847,17.8729962 10.1983853,17.8729962 C12.5617389,17.8729962 15.1599201,17.3828097 17.5503815,16.3685919 C17.9109637,16.2157294 18.2131599,16.6064671 17.8602769,16.8667985 L17.8602769,16.8667985 Z M18.7477776,15.8538639 C18.4749349,15.5046702 16.944706,15.6884901 16.2573862,15.7706156 C16.0491852,15.7953174 16.0169445,15.6139035 16.2046141,15.4820536 C17.4252684,14.6245479 19.4251526,14.872368 19.6577345,15.1590053 C19.8919205,15.4488505 19.5964612,17.4538675 18.4524787,18.4109824 C18.276358,18.5582308 18.1090594,18.4796341 18.1871749,18.2853881 C18.4442983,17.6424995 19.0207807,16.2032181 18.7477776,15.8538639 L18.7477776,15.8538639 Z" id="arrow" fill="#EC912D"></path> <path d="M13.44,14.0558621 C13.2782759,14.2006897 13.0451724,14.2106897 12.8631034,14.1131034 C12.0517241,13.4386207 11.9065517,13.1272414 11.4631034,12.4851724 C10.1227586,13.8510345 9.17310345,14.2606897 7.43724138,14.2606897 C5.38103448,14.2606897 3.78206897,12.9917241 3.78206897,10.4548276 C3.78206897,8.47206897 4.85586207,7.12413793 6.3862069,6.46310345 C7.71103448,5.88172414 9.56172414,5.7762069 10.977931,5.61758621 L10.977931,5.30034483 C10.977931,4.71896552 11.0234483,4.03172414 10.6810345,3.52965517 C10.3837931,3.08 9.81275862,2.89517241 9.31034483,2.89517241 C8.37896552,2.89517241 7.55068966,3.37241379 7.34758621,4.36172414 C7.30517241,4.58137931 7.14482759,4.79896552 6.92344828,4.81034483 L4.55655172,4.55413793 C4.35655172,4.50896552 4.13413793,4.34896552 4.19206897,4.0437931 C4.73586207,1.17241379 7.32896552,0.304827586 9.65310345,0.304827586 C10.8406897,0.304827586 12.3941379,0.622068966 13.3310345,1.52068966 C14.5186207,2.63068966 14.4044828,4.11103448 14.4044828,5.72344828 L14.4044828,9.52793103 C14.4044828,10.672069 14.8796552,11.1741379 15.3262069,11.7910345 C15.482069,12.0131034 15.5172414,12.2772414 15.3182759,12.4393103 C14.8196552,12.8575862 13.9331034,13.6275862 13.4455172,14.0613793 L13.44,14.0558621 L13.44,14.0558621 Z M10.977931,8.10206897 C10.977931,9.0537931 11.0006897,9.84655172 10.5210345,10.6924138 C10.1327586,11.38 9.51586207,11.8024138 8.83034483,11.8024138 C7.89413793,11.8024138 7.34586207,11.0882759 7.34586207,10.0317241 C7.34586207,7.95206897 9.21137931,7.57344828 10.977931,7.57344828 L10.977931,8.10206897 L10.977931,8.10206897 Z" id="a" fill="#0A0B09"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/flickr.js", {
    name: "symbols/flickr",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="logo" transform="translate(0.000000, 6.125000)"> <path d="M19.9195041,4.25719008 C19.9195041,6.60876033 18.0135537,8.51454545 15.6621488,8.51454545 C13.3109091,8.51454545 11.4049587,6.60876033 11.4049587,4.25719008 C11.4049587,1.9061157 13.3109091,0 15.6621488,0 C18.0135537,0 19.9195041,1.9061157 19.9195041,4.25719008" id="pink" fill="#DB2176"></path> <path d="M8.51454545,4.25719008 C8.51454545,6.60876033 6.60859504,8.51454545 4.25719008,8.51454545 C1.9061157,8.51454545 0,6.60876033 0,4.25719008 C0,1.9061157 1.9061157,0 4.25719008,0 C6.60859504,0 8.51454545,1.9061157 8.51454545,4.25719008" id="blue" fill="#375C9A"></path> </g> <g id="flickr"></g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/imdb.js", {
    name: "symbols/imdb",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"> <stop stop-color="#ECD53B" offset="0%"></stop> <stop stop-color="#B6902F" offset="100%"></stop> </linearGradient> <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2"> <stop stop-color="#C6A929" offset="0%"></stop> <stop stop-color="#966E1E" offset="100%"></stop> </linearGradient> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="imdb"> <rect id="Rectangle-2" stroke="url(#linearGradient-2)" fill="url(#linearGradient-1)" x="0" y="0" width="20" height="20"></rect> <path d="M2,7 L3.65904059,7 L3.65904059,13.434963 L2,13.434963 L2,7 L2,7 Z M7.1896679,7 L6.80590406,10.0103704 L6.5697417,8.37481481 C6.49889299,7.84740741 6.43394834,7.39111111 6.36900369,7 L4.2199262,7 L4.2199262,13.434963 L5.67232472,13.434963 L5.67822878,9.18666667 L6.28634686,13.434963 L7.3195572,13.434963 L7.90405904,9.09125926 L7.90405904,13.434963 L9.35055351,13.434963 L9.35055351,7 L7.1896679,7 L7.1896679,7 Z M11.9430258,8.16148148 C12.0073801,8.19703704 12.0487085,8.2557037 12.0658303,8.33925926 C12.0906273,8.42222222 12.095941,8.61185185 12.095941,8.90222222 L12.095941,11.397037 C12.095941,11.8237037 12.0658303,12.0844444 12.0132841,12.1792593 C11.9601476,12.28 11.8125461,12.3274074 11.5757934,12.3274074 L11.5757934,8.10162963 C11.7535055,8.10162963 11.8769004,8.12 11.9430258,8.16148148 L11.9430258,8.16148148 Z M11.9241328,13.434963 C12.3197048,13.434963 12.6214022,13.4118519 12.8162362,13.3703704 C13.0169742,13.3288889 13.1822878,13.2518519 13.3121771,13.1386667 C13.4473801,13.0325926 13.541845,12.8785185 13.5949815,12.682963 C13.6481181,12.4874074 13.6841328,12.1016296 13.6841328,11.5274074 L13.6841328,9.26962963 C13.6841328,8.65925926 13.6605166,8.24977778 13.6191882,8.04296296 C13.5837638,7.83555556 13.4946125,7.64592593 13.3470111,7.48059259 C13.1994096,7.30814815 12.9815498,7.18962963 12.698155,7.112 C12.4200738,7.04148148 11.9542435,7 11.1571956,7 L9.91734317,7 L9.91734317,13.434963 L11.9241328,13.434963 L11.9241328,13.434963 Z M16.3994096,11.877037 C16.3994096,12.1851852 16.3822878,12.3807407 16.3521771,12.4637037 C16.3232472,12.5460741 16.1874539,12.5881481 16.0870849,12.5881481 C15.9926199,12.5881481 15.9217712,12.5460741 15.8922509,12.4696296 C15.8562362,12.3925926 15.8391144,12.2088889 15.8391144,11.925037 L15.8391144,10.2231111 C15.8391144,9.93274074 15.8562362,9.74962963 15.8863469,9.67851852 C15.9158672,9.60740741 15.9808118,9.57185185 16.0758672,9.57185185 C16.1756458,9.57185185 16.3114391,9.60740741 16.3462731,9.6962963 C16.3822878,9.77866667 16.3994096,9.95703704 16.3994096,10.2231111 L16.3994096,11.877037 L16.3994096,11.877037 Z M14.2450185,7 L14.2450185,13.434963 L15.7387454,13.434963 L15.8391144,13.0266667 C15.9749077,13.192 16.1225092,13.317037 16.2878229,13.4 C16.4466421,13.477037 16.6892989,13.5185185 16.8782288,13.5185185 C17.143321,13.5185185 17.3682657,13.4533333 17.5571956,13.3111111 C17.7461255,13.1748148 17.8701107,13.0088889 17.9226568,12.8192593 C17.9698893,12.6296296 18,12.3451852 18,11.9594074 L18,10.1525926 C18,9.76740741 17.9881919,9.51259259 17.9698893,9.39407407 C17.9527675,9.27555556 17.9055351,9.15111111 17.8228782,9.02666667 C17.7337269,8.90222222 17.6103321,8.80740741 17.4509225,8.7362963 C17.2909225,8.67111111 17.102583,8.63555556 16.8782288,8.63555556 C16.6892989,8.63555556 16.4466421,8.67703704 16.2819188,8.74755556 C16.1225092,8.82518519 15.9749077,8.94311111 15.8391144,9.09777778 L15.8391144,7 L14.2450185,7 L14.2450185,7 Z" id="logo" fill="#0B0B0A"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/imgur.js", {
    name: "symbols/imgur",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="imgur"> <g id="g3797"> <rect id="Rectangle-1" fill="#000000" x="0" y="0" width="20" height="20" rx="3"></rect> <path d="M4,10.016092 C3.99998897,8.36465686 4.59298185,6.94910967 5.77897866,5.76943947 C6.96495339,4.58986802 8.3881319,4.00005487 10.0485142,4 C11.6873175,4.00005487 13.088939,4.58986802 14.2533678,5.76943947 C15.4177746,6.94910967 15.999989,8.36465686 16,10.016092 C15.999989,11.6890563 15.4231693,13.1046035 14.2695411,14.2627336 C13.1158907,15.4209514 11.7088854,16.0000439 10.0485142,16 C8.34500695,16.0000439 6.91103893,15.4209514 5.74663218,14.2627336 C4.58220337,13.1046035 3.99998897,11.6890563 4,10.016092 L4,10.016092 Z" id="path3001-4" fill="#89C623"></path> </g> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/instagram.js", {
    name: "symbols/instagram",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="instagram" fill="#125688"> <path d="M0,2.49257535 C0,1.11596399 1.1181422,0 2.49257535,0 L17.5074246,0 C18.884036,0 20,1.1181422 20,2.49257535 L20,17.5074246 C20,18.884036 18.8818577,20 17.5074246,20 L2.49257535,20 C1.11596399,20 0,18.8818577 0,17.5074246 L0,2.49257535 L0,2.49257535 Z M2.5,8.75 L2.5,16.2469084 C2.5,16.9302987 3.06102822,17.5 3.75309161,17.5 L16.2469084,17.5 C16.9302987,17.5 17.5,16.9389718 17.5,16.2469084 L17.5,8.75 L16.1249774,8.75 C16.2069621,9.15388743 16.25,9.5719177 16.25,10 C16.25,13.4517796 13.4517796,16.25 10,16.25 C6.54822031,16.25 3.75,13.4517796 3.75,10 C3.75,9.5719177 3.79303783,9.15388743 3.87502265,8.75 L2.5,8.75 L2.5,8.75 Z M10,13.75 C12.0710678,13.75 13.75,12.0710678 13.75,10 C13.75,7.92893219 12.0710678,6.25 10,6.25 C7.92893219,6.25 6.25,7.92893219 6.25,10 C6.25,12.0710678 7.92893219,13.75 10,13.75 L10,13.75 L10,13.75 Z M13.75,2.5 L16.2513043,2.5 C16.9409399,2.5 17.5,3.05332541 17.5,3.7486957 L17.5,6.25 L13.75,6.25 L13.75,2.5 L13.75,2.5 Z" id="logo"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/spotify.js", {
    name: "symbols/spotify",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="spotify" fill="#1ED760"> <path d="M9.99998808,2.36985576e-06 C4.48028139,2.36985576e-06 -1.41154075e-08,4.48028378 -1.41154075e-08,9.99999046 C-1.41154075e-08,15.5316445 4.48028139,19.9999785 9.99998808,19.9999785 C15.5316421,19.9999785 19.9999761,15.5196971 19.9999761,9.99999046 C20.0119236,4.48028378 15.5316421,2.36985576e-06 9.99998808,2.36985576e-06 L9.99998808,2.36985576e-06 L9.99998808,2.36985576e-06 Z M14.5877963,14.4324821 C14.408585,14.7311676 14.0262676,14.8147995 13.7275823,14.6355883 C11.373941,13.2018983 8.42292903,12.879318 4.93428324,13.6678475 C4.59975556,13.739532 4.26522788,13.5364259 4.19354338,13.2018983 C4.12185888,12.8673705 4.32496497,12.5328429 4.65949264,12.4611584 C8.4707187,11.5889969 11.744311,11.9593669 14.3727428,13.5722681 C14.6833756,13.7514794 14.7789549,14.1337968 14.5877963,14.4324821 L14.5877963,14.4324821 L14.5877963,14.4324821 Z M15.8183803,11.7084711 C15.5913793,12.078841 15.1134826,12.1863678 14.7431126,11.9713143 C12.0549438,10.3106233 7.95697976,9.83272662 4.77896682,10.8004674 C4.36080722,10.9199416 3.93070021,10.6929407 3.81122603,10.2867285 C3.69175187,9.86856887 3.91875279,9.43846186 4.33691238,9.3189877 C7.96892717,8.21982532 12.4850508,8.74551167 15.5794319,10.645151 C15.925907,10.8602045 16.0453811,11.3381012 15.8183803,11.7084711 L15.8183803,11.7084711 L15.8183803,11.7084711 Z M15.925907,8.86498585 C12.7001044,6.95339911 7.38350375,6.77418786 4.30107013,7.70608638 C3.81122603,7.86140281 3.28553968,7.5746648 3.13022327,7.08482069 C2.97490684,6.59497659 3.26164485,6.06929024 3.75148896,5.91397383 C7.28792441,4.83870629 13.1660536,5.05375979 16.8697529,7.25208453 C17.3118074,7.51492772 17.4551764,8.08840373 17.1923331,8.53045817 C16.9414374,8.98446001 16.3679614,9.12782902 15.925907,8.86498585 L15.925907,8.86498585 L15.925907,8.86498585 Z" id="Shape"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/vine.js", {
    name: "symbols/vine",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="vine" fill="#00AA7F"> <path d="M18.75,9.94272078 C18.23577,10.0614784 17.738402,10.1138386 17.2906283,10.1138386 C14.7720481,10.1138386 12.8329764,8.35148048 12.8329764,5.28719851 C12.8329764,3.78521276 13.4125468,3.00409571 14.2321531,3.00409571 C15.0118981,3.00409571 15.5317075,3.70502652 15.5317075,5.12701237 C15.5317075,5.93558281 15.3156008,6.82160657 15.1559694,7.34582954 C15.1559694,7.34582954 15.9321188,8.70234961 18.0543791,8.28601473 C18.5050666,7.2836557 18.75,5.98552064 18.75,4.84676426 C18.75,1.78242018 17.190758,-3.75581877e-09 14.3321475,-3.75581877e-09 C11.3939384,-3.75581877e-09 9.67475495,2.26316493 9.67475495,5.24732279 C9.67475495,8.20359246 11.054032,10.741167 13.3285466,11.8973768 C12.3721222,13.8142689 11.1551422,15.502714 9.88596431,16.7749485 C7.583243,13.9858835 5.50152591,10.2651427 4.64726558,3.00409571 L1.25,3.00409571 C2.81959485,15.0970623 7.49713505,18.9476166 8.73389074,19.6869946 C9.4335411,20.1076151 10.0358628,20.0876153 10.6755662,19.7269324 C11.679787,19.1548214 14.6950531,16.1343281 16.3663161,12.5962579 C17.0678263,12.5943325 17.9106799,12.5136493 18.75,12.3236495 L18.75,9.94272078" id="vine-logo"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/wikipedia.js", {
    name: "symbols/wikipedia",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="wikipedia" fill="#000000"> <path d="M19.9862223,3.29945361 L15.8515555,3.29945361 L15.5555555,3.3503425 L15.5555555,3.74767583 C15.5555555,3.7943425 15.6966666,3.83345361 15.7357778,3.86256472 C15.7731111,3.89412027 15.8742223,3.91123138 15.916,3.91123138 L16.2906666,3.92989806 C16.7155555,3.94989806 16.8448889,4.04212027 17.0104445,4.19767583 C17.1728889,4.35878695 17.1995555,4.63212027 17.0728889,5.0163425 L13.4184445,14.5561203 L13.2788889,14.5143425 L10.9575556,9.29278695 C10.9911111,9.2143425 11.0113333,9.1703425 11.0113333,9.1703425 L12.912,5.26412027 C13.1328889,4.85212027 13.3468889,4.48389806 13.4555555,4.3123425 C13.6542223,3.99945361 13.7506666,3.9403425 14.2917778,3.91300916 C14.4024445,3.91300916 14.4446666,3.85878695 14.4446666,3.74900916 L14.4446666,3.35389805 L14.4168889,3.31145361 C14.4168889,3.31145361 12.1448889,3.30367583 11.1104445,3.31145361 L11.1111111,3.35212028 L11.1111111,3.74745361 C11.1111111,3.79567583 11.0844444,3.83412027 11.1211111,3.86323138 C11.1602222,3.89478695 11.1766667,3.91100916 11.2186667,3.91100916 L11.3735556,3.93078695 C11.7962222,3.95078695 11.9855556,4.07212027 12.0428889,4.1483425 C12.144,4.28500916 12.1913333,4.43078695 11.9464444,5.01745361 L10.4831111,8.22189806 L9.16066666,5.24945361 C8.72711111,4.29967583 8.61977778,4.00567583 9.27355555,3.95078695 L9.44911111,3.91012027 C9.57488889,3.91012027 9.55533334,3.8603425 9.55533334,3.76589806 L9.55533334,3.3503425 L9.54222222,3.3163425 C9.54222222,3.3163425 7.12,3.3163425 6.01488889,3.31700916 L6,3.35767583 L6,3.7743425 C6,3.86789806 6.09222223,3.89189806 6.26333334,3.91767583 C6.87555555,4.00567583 6.86488889,4.07612027 7.46977778,5.39456472 C7.56022222,5.59212027 7.82733334,6.18789806 7.82733334,6.18789806 L9.206,9.16367583 C9.206,9.16367583 9.36244445,9.54589806 9.60711111,10.1392314 L7.60355555,14.5310092 L7.48911111,14.4985647 C7.48911111,14.4985647 4.38,7.29456472 3.48088889,4.88389806 C3.38622223,4.63567583 3.34511111,4.44989806 3.34511111,4.33545361 C3.34511111,4.09056472 3.546,3.95789806 3.94777777,3.94012027 L4.55911111,3.91812027 C4.68422223,3.91812027 4.88888889,3.86567583 4.88888889,3.75656472 L4.88888889,3.36145361 L4.70466666,3.32056472 C4.70466666,3.32056472 0.895777777,3.31589805 0.126444445,3.32056472 L0,3.36145361 L0,3.77745361 C0,3.85212027 0.0995555555,3.89856472 0.272666666,3.9183425 C0.745777778,3.94700916 1.06355555,4.02923138 1.21244445,4.16789806 C1.36088889,4.30745361 1.522,4.66012027 1.73088889,5.20967583 C2.86133334,8.19278695 5.26466666,13.5163425 6.43444445,16.548787 C6.77066666,17.3761202 7.19533334,17.5050091 7.70844445,16.522787 C8.23711111,15.4454536 9.30355555,13.0543425 10.0815556,11.2890092 C10.8093333,13.0498981 11.8002222,15.4323425 12.2782222,16.5114536 C12.6586666,17.3752314 13.0926666,17.4605647 13.5328889,16.5372314 C14.6846666,13.7252314 18.0482222,5.26256472 18.0482222,5.26256472 C18.1935555,4.84723138 18.3966666,4.52723138 18.6584445,4.29478695 C18.9182222,4.06523138 19.3048889,3.93545361 19.8471111,3.91012027 C19.9568889,3.91012027 20,3.85478695 20,3.74767583 L20,3.3503425 L19.9862223,3.29945361 L19.9862223,3.29945361 Z" id="Wikipedia"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/yelp.js", {
    name: "symbols/yelp",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="yelp" fill="#D9242A"> <path d="M8.36640089,12.7040834 C8.68997523,12.6203537 8.90755643,12.3141779 8.92962539,11.9230226 C8.9501402,11.5228071 8.74841133,11.1682055 8.41706623,11.0410488 C8.41706623,11.0410488 7.50260349,10.6573918 7.50011685,10.6573918 C4.36259581,9.32677669 4.22210051,9.27428941 4.06326622,9.27210244 C3.82206191,9.2627297 3.6054132,9.38801186 3.45683631,9.62857857 C3.14103273,10.1493899 3.00768653,11.7883678 3.11678797,12.8768541 C3.15533092,13.236142 3.21874031,13.535132 3.31012441,13.7141512 C3.43632151,13.9609663 3.64892943,14.1084306 3.8916879,14.1168661 C4.04648139,14.125614 4.14314962,14.0978082 7.06308944,13.1321047 C7.06308944,13.1321047 8.36111677,12.7072076 8.36640089,12.7040834 L8.36640089,12.7040834 L8.36640089,12.7040834 Z M10.0029224,13.9340979 C9.64049428,13.7910075 9.25040226,13.879736 9.03157773,14.1609179 C9.03157773,14.1609179 8.39219981,14.942291 8.38971316,14.942291 C6.19027797,17.5966479 6.09982635,17.7191182 6.0460527,17.8765802 C6.01341553,17.969995 5.99942816,18.0674714 6.01155054,18.1661975 C6.02460541,18.3061635 6.08583898,18.4458172 6.18903464,18.5745361 C6.69817467,19.1984473 9.14316581,20.1232233 9.92334987,19.9863814 C10.1953264,19.9351439 10.3917711,19.7783068 10.476317,19.5433637 C10.5269823,19.3924628 10.5328881,19.288113 10.5412805,16.1341898 C10.5412805,16.1341898 10.5487404,14.740465 10.5496729,14.7260935 C10.5698769,14.3852385 10.3563365,14.0746888 10.0029224,13.9340979 L10.0029224,13.9340979 L10.0029224,13.9340979 Z M17.6574294,14.552698 C17.5337189,14.4570961 17.4386048,14.4196053 14.5208408,13.4348438 C14.5208408,13.4348438 13.2408417,13.0002616 13.2243676,12.9918262 C12.9150915,12.8684186 12.560745,12.982141 12.3229598,13.2851925 C12.077093,13.5944927 12.0388609,14.0012691 12.2359273,14.3108815 L12.7512839,15.1725478 C14.483852,18.0655968 14.6159549,18.2699224 14.7409087,18.3702105 C14.9336234,18.5261102 15.1788685,18.5520415 15.4343711,18.4458172 C16.1710389,18.1437029 17.7798966,16.0404625 17.8930387,15.231596 C17.9315817,14.9497892 17.8457925,14.7070356 17.6574294,14.552698 L17.6574294,14.552698 L17.6574294,14.552698 Z M12.9564319,11.2378761 C12.9564319,11.2378761 12.9427554,11.2619328 12.9390254,11.2666192 C13.1022113,11.2025722 13.3950134,11.1291525 13.9274657,10.999184 C17.2440251,10.173759 17.3717763,10.1290823 17.5026359,10.0409786 C17.7034323,9.90257468 17.8041413,9.66981858 17.7870456,9.38582489 C17.7870456,9.37613973 17.7882889,9.3680167 17.7870456,9.35739427 C17.7018781,8.520722 16.2739237,6.34249976 15.5714473,5.98946031 C15.322783,5.86605271 15.0728754,5.87448816 14.8677275,6.01664122 C14.7393545,6.10318276 14.6448621,6.232214 12.8693994,8.72879658 C12.8693994,8.72879658 12.0665248,9.85289921 12.056889,9.86352164 C11.8449028,10.1275202 11.8430378,10.5074281 12.0491183,10.832037 C12.2626587,11.1682055 12.6250868,11.3325407 12.9564319,11.2378761 L12.9564319,11.2378761 L12.9564319,11.2378761 Z M10.098969,0.536094137 C10.0308971,0.283967726 9.8397365,0.103698904 9.56309754,0.0318413149 C8.71763913,-0.184356302 5.48220654,0.748230237 4.88168241,1.38463854 C4.68958928,1.59083858 4.61809831,1.84577681 4.67560191,2.07040988 C4.76916184,2.27036143 8.77949436,8.75535265 8.77949436,8.75535265 C9.37255857,9.74323829 9.85589969,9.59015038 10.0138015,9.53953764 C10.1713924,9.48923732 10.6519361,9.33614942 10.5972299,8.18361618 C10.540348,6.8326935 10.1455935,0.815401462 10.098969,0.536094137 L10.098969,0.536094137 L10.098969,0.536094137 Z" id="logo"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/youtube.js", {
    name: "symbols/youtube",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <linearGradient x1="-1.11022302e-14%" y1="50%" x2="100%" y2="50%" id="linearGradient-1"> <stop stop-color="#E52D27" offset="0%"></stop> <stop stop-color="#BF171D" offset="100%"></stop> </linearGradient> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="youtube"> <g id="logo" transform="translate(0.000000, 3.625000)"> <path d="M19.0051789,1.02583889 C18.2446523,0.247201161 17.3921777,0.243335055 17.0012434,0.197764757 C14.2025356,0 10.0043272,0 10.0043272,0 C9.99563366,0 5.79752313,0 2.99871751,0.197764757 C2.60776348,0.243335055 1.75560232,0.247201161 0.994801507,1.02583889 C0.395144157,1.61909488 0.20000979,2.96627996 0.20000979,2.96627996 C0.20000979,2.96627996 0,4.54832146 0,6.13034382 L0,7.61349338 C0,9.1954966 0.20000979,10.7775189 0.20000979,10.7775189 C0.20000979,10.7775189 0.395144157,12.1247232 0.994801507,12.7179791 C1.75560232,13.496636 2.75496598,13.472004 3.20007832,13.5536133 C4.8000979,13.7035876 10,13.75 10,13.75 C10,13.75 14.2025356,13.743818 17.0012434,13.5460725 C17.3921777,13.500483 18.2446523,13.496636 19.0051789,12.7179791 C19.6048754,12.1247232 19.8002839,10.7775189 19.8002839,10.7775189 C19.8002839,10.7775189 20,9.1954966 20,7.61349338 L20,6.13034382 C20,4.54832146 19.8002839,2.96627996 19.8002839,2.96627996 C19.8002839,2.96627996 19.6048754,1.61909488 19.0051789,1.02583889 L19.0051789,1.02583889 Z" id="button" fill="url(#linearGradient-1)"></path> <path d="M7.5,10 L12.5,6.8858885 L7.5,3.75 L7.5,10" id="play" fill="#FFFFFF"></path> </g> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/link.js", {
    name: "symbols/link",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="link" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="link"> <path d="M9.5,12.685 C9.42,12.685 9.34,12.665 9.28,12.645 C8.06,12.025 7.26,10.945 7.06,9.645 C6.84,8.385 7.26,7.085 8.18,6.185 L10.18,4.185 C11.74,2.625 14.28,2.625 15.84,4.185 C17.4,5.745 17.4,8.285 15.84,9.845 L15.4,10.285 C15.3,10.425 15.12,10.605 14.86,10.865 C14.66,11.065 14.34,11.065 14.14,10.865 C13.96,10.665 13.96,10.365 14.14,10.165 L14.58,9.725 C14.68,9.585 14.88,9.385 15.14,9.145 C16.3,7.965 16.3,6.065 15.14,4.885 C13.96,3.725 12.06,3.725 10.88,4.885 L8.88,6.885 C8.2,7.565 7.88,8.545 8.04,9.485 C8.2,10.465 8.8,11.285 9.72,11.745 C9.98,11.865 10.06,12.165 9.94,12.425 C9.86,12.585 9.68,12.685 9.5,12.685 L9.5,12.685 Z M5.82,9.205 C5.9,9.285 5.96,9.405 5.96,9.525 C5.96,9.665 5.92,9.785 5.84,9.865 C5.5,10.225 5.02,10.725 4.86,10.865 C3.7,12.045 3.7,13.945 4.86,15.105 C6,16.245 7.98,16.245 9.12,15.105 L11.12,13.105 C11.8,12.445 12.12,11.465 11.96,10.525 C11.8,9.545 11.2,8.725 10.28,8.265 C10.04,8.145 9.94,7.845 10.06,7.585 C10.18,7.345 10.48,7.245 10.74,7.365 C11.94,7.985 12.74,9.065 12.94,10.365 C13.16,11.625 12.74,12.925 11.82,13.825 L9.82,15.825 C9.06,16.585 8.06,16.985 7,16.985 C5.92,16.985 4.92,16.585 4.16,15.825 C2.6,14.265 2.6,11.725 4.16,10.165 L5.06,9.225 C5.28,9.005 5.6,9.005 5.82,9.205 L5.82,9.205 Z" id="∏"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/information.js", {
    name: "symbols/information",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path d="M9.5,2.5 C5.634,2.5 2.5,5.634 2.5,9.5 C2.5,13.366 5.634,16.5 9.5,16.5 C13.366,16.5 16.5,13.366 16.5,9.5 C16.5,5.634 13.366,2.5 9.5,2.5" id="bg" fill="#EFF8E8"></path> <path d="M16.5,9.5 L16,9.5 C16,11.297 15.273,12.918 14.096,14.096 C12.918,15.273 11.297,16 9.5,16 C7.704,16 6.082,15.273 4.904,14.096 C3.727,12.918 3,11.297 3,9.5 C3,7.703 3.727,6.082 4.904,4.904 C6.082,3.727 7.704,3 9.5,3 C11.297,3 12.918,3.727 14.096,4.904 C15.273,6.082 16,7.703 16,9.5 L17,9.5 C17,5.358 13.642,2 9.5,2 C5.358,2 2,5.358 2,9.5 C2,13.642 5.358,17 9.5,17 C13.642,17 17,13.642 17,9.5 L16.5,9.5 Z M9,8.5 L9,12.5 C9,12.776 9.224,13 9.5,13 C9.776,13 10,12.776 10,12.5 L10,8.5 C10,8.224 9.776,8 9.5,8 C9.224,8 9,8.224 9,8.5 Z M9.5,7.25 C9.698,7.25 9.891,7.17 10.03,7.03 C10.17,6.891 10.25,6.697 10.25,6.5 C10.25,6.302 10.17,6.109 10.03,5.97 C9.891,5.83 9.698,5.75 9.5,5.75 C9.303,5.75 9.109,5.83 8.97,5.97 C8.83,6.109 8.75,6.302 8.75,6.5 C8.75,6.697 8.83,6.891 8.97,7.03 C9.109,7.17 9.303,7.25 9.5,7.25 Z" id="info" fill="#65B01B"></path> <g id="info"></g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/movie.js", {
    name: "symbols/movie",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="movie"> <path d="M15.5,4.5 L4.5,4.5 C3.395,4.5 2.5,5.395 2.5,6.5 L2.5,15.5 C2.5,16.605 3.395,17.5 4.5,17.5 L15.5,17.5 C16.605,17.5 17.5,16.605 17.5,15.5 L17.5,6.5 C17.5,5.395 16.605,4.5 15.5,4.5 Z M13.681,6.786 C14.558,6.906 15.253,7.589 15.387,8.463 C15.539,9.455 15.538,10.578 15.383,11.568 C15.248,12.434 14.567,13.109 13.7,13.237 C11.247,13.601 8.753,13.601 6.3,13.237 C5.434,13.109 4.751,12.433 4.617,11.568 C4.462,10.578 4.461,9.455 4.613,8.463 C4.748,7.588 5.441,6.906 6.319,6.786 C8.762,6.452 11.238,6.452 13.681,6.786 Z" id="bg" fill="#E9F3FB"></path> <path d="M10,3.95277778 L5.703,2.043 C5.451,1.931 5.155,2.045 5.043,2.297 C4.931,2.549 5.045,2.845 5.297,2.957 L7.64375,4 L4.5,4 C3.119,4 2,5.119 2,6.5 L2,15.5 C2,16.881 3.119,18 4.5,18 L15.5,18 C16.881,18 18,16.881 18,15.5 L17.5,15.5 L17,15.5 C16.999,16.328 16.328,16.999 15.5,17 L4.5,17 C3.672,16.999 3.001,16.328 3,15.5 L3,6.5 C3.001,5.672 3.672,5.002 4.5,5 L9.99068701,5 C9.99688441,5.00009854 10.0030947,5.00010772 10.0093125,5 L15.5,5 C16.328,5.002 16.999,5.672 17,6.5 L17,15.5 L18,15.5 L18,6.5 C18,5.119 16.881,4 15.5,4 L12.35625,4 L14.703,2.957 C14.955,2.845 15.069,2.549 14.957,2.297 C14.845,2.045 14.549,1.931 14.297,2.043 L10,3.95277778 L10,3.95277778 Z M4.5,16 C4.632,16 4.76,15.947 4.854,15.854 C4.947,15.76 5,15.632 5,15.5 C5,15.368 4.947,15.24 4.854,15.146 C4.76,15.053 4.632,15 4.5,15 C4.368,15 4.24,15.053 4.146,15.146 C4.053,15.24 4,15.368 4,15.5 C4,15.632 4.053,15.76 4.146,15.854 C4.24,15.947 4.368,16 4.5,16 Z M6.5,16 C6.632,16 6.76,15.947 6.854,15.854 C6.947,15.76 7,15.632 7,15.5 C7,15.368 6.947,15.24 6.854,15.146 C6.76,15.053 6.632,15 6.5,15 C6.368,15 6.24,15.053 6.146,15.146 C6.053,15.24 6,15.368 6,15.5 C6,15.632 6.053,15.76 6.146,15.854 C6.24,15.947 6.368,16 6.5,16 Z M15.5,16 C15.632,16 15.76,15.947 15.854,15.854 C15.947,15.76 16,15.632 16,15.5 C16,15.368 15.947,15.24 15.854,15.146 C15.76,15.053 15.632,15 15.5,15 C15.368,15 15.24,15.053 15.146,15.146 C15.053,15.24 15,15.368 15,15.5 C15,15.632 15.053,15.76 15.146,15.854 C15.24,15.947 15.368,16 15.5,16 Z M13.5,16 C13.632,16 13.76,15.947 13.854,15.854 C13.947,15.76 14,15.632 14,15.5 C14,15.368 13.947,15.24 13.854,15.146 C13.76,15.053 13.632,15 13.5,15 C13.368,15 13.24,15.053 13.146,15.146 C13.053,15.24 13,15.368 13,15.5 C13,15.632 13.053,15.76 13.146,15.854 C13.24,15.947 13.368,16 13.5,16 Z M13.681,6.786 L13.613,7.281 C14.271,7.371 14.792,7.884 14.892,8.539 C14.965,9.011 15,9.522 15,10.033 C15,10.53 14.962,11.028 14.889,11.491 C14.788,12.14 14.277,12.646 13.627,12.743 C12.424,12.921 11.212,13.01 10,13.01 C8.788,13.01 7.576,12.921 6.373,12.743 C5.724,12.647 5.211,12.139 5.111,11.491 C5.037,11.021 5,10.513 5,10.005 C5,9.504 5.036,9.003 5.107,8.539 C5.208,7.882 5.728,7.372 6.387,7.281 C7.586,7.117 8.793,7.035 10,7.035 C11.207,7.035 12.414,7.117 13.613,7.281 L13.749,6.291 C12.505,6.12 11.253,6.035 10,6.035 C8.748,6.035 7.495,6.12 6.251,6.291 C5.155,6.441 4.287,7.293 4.119,8.388 C4.039,8.908 4,9.456 4,10.005 C4,10.562 4.04,11.118 4.123,11.645 C4.291,12.727 5.145,13.572 6.227,13.732 C7.478,13.917 8.739,14.01 10,14.01 C11.261,14.01 12.522,13.917 13.773,13.732 C14.856,13.572 15.709,12.727 15.877,11.645 C15.958,11.128 16,10.582 16,10.033 C16,9.476 15.962,8.918 15.881,8.388 C15.713,7.293 14.845,6.441 13.749,6.291 L13.681,6.786 Z" fill="#2B88D9"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/book.js", {
    name: "symbols/book",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="book"> <path d="M12.5,3.5 C11.5,3.5 10.707,3.793 10,4.5 C9.293,3.793 8.5,3.5 7.5,3.5 C5.924,3.5 2.5,4.5 2.5,4.5 L2.5,16.5 C2.5,16.5 5.924,15.5 7.5,15.5 C8.5,15.5 9.293,15.793 10,16.5 C10.707,15.793 11.5,15.5 12.5,15.5 C14.076,15.5 17.5,16.5 17.5,16.5 L17.5,4.5 C17.5,4.5 14.076,3.5 12.5,3.5" id="bg" fill="#FCF8EB"></path> <path d="M3.19051904,16.8263127 C3.61773766,16.7104306 4.06936556,16.5945335 4.52449795,16.4864774 C4.85799134,16.4073004 5.18096784,16.3353513 5.48884784,16.2723131 C6.34299152,16.0974276 7.03784838,16 7.5,16 C8.39396531,16 9.05080011,16.2579069 9.64644661,16.8535534 C9.84170876,17.0488155 10.1582912,17.0488155 10.3535534,16.8535534 C10.9491999,16.2579069 11.6060347,16 12.5,16 C12.9621516,16 13.6570085,16.0974276 14.5111522,16.2723131 C14.8190322,16.3353513 15.1420087,16.4073004 15.4755021,16.4864774 C15.9306344,16.5945335 16.3822623,16.7104306 16.809481,16.8263127 C17.0654127,16.8957336 17.2557643,16.9495574 17.3598278,16.9799497 C17.679866,17.0734188 18,16.8334081 18,16.5 L18,4.5 C18,4.27784423 17.8534194,4.08233041 17.6401722,4.02005027 C17.5302357,3.98794263 17.3337748,3.9323914 17.071269,3.86118731 C16.6344252,3.74269439 16.1727406,3.62421652 15.7064979,3.51352264 C15.3633783,3.43206024 15.0303848,3.3578797 14.7117402,3.29263738 C13.7965178,3.10524606 13.0458992,3 12.5,3 C11.3120117,3 10.8950195,3.29263738 10,3.86118734 C10,3.86118734 8.6528251,3 7.5,3 C6.95410075,3 6.20348221,3.10524606 5.28825976,3.29263738 C4.96961515,3.3578797 4.63662168,3.43206024 4.29350205,3.51352264 C3.82725944,3.62421652 3.36557484,3.74269439 2.92873096,3.86118731 C2.66622522,3.9323914 2.46976431,3.98794263 2.35982777,4.02005027 C2.14658056,4.08233041 2,4.27784423 2,4.5 L2,16.5 C2,16.8334081 2.32013398,17.0734188 2.64017223,16.9799497 C2.74423569,16.9495574 2.93458728,16.8957336 3.19051904,16.8263127 Z M3.00000001,4.82631266 C3.42721863,4.71043058 4.06936556,4.59453348 4.52449795,4.48647736 C4.85799134,4.40730039 5.18096784,4.33535132 5.48884784,4.27231305 C6.34299152,4.09742758 7.03784838,4 7.5,4 C8.39396531,4 9.05080011,4.25790689 9.64644661,4.85355339 C9.84170876,5.04881554 10.1582912,5.04881554 10.3535534,4.85355339 C10.3693917,4.83771503 11.3658445,4 12.5,4 C12.9621516,4 13.6570085,4.09742758 14.5111522,4.27231305 C14.8190322,4.33535132 15.1420087,4.40730039 15.4755021,4.48647736 C15.9306344,4.59453348 16.5727812,4.80764086 16.9999998,4.92352295 C16.9999998,5.25592041 16.9999998,15.2199707 16.9999998,15.861187 C16.5631559,15.7426941 16.1727406,15.6242165 15.7064979,15.5135226 C15.3633783,15.4320602 15.0303848,15.3578797 14.7117402,15.2926374 C13.7965178,15.1052461 13.041426,15.0588801 12.5,15 C11.0839842,14.8460083 9.97539595,15.861187 9.97539595,15.861187 C9.18729245,15.0730835 8.6528251,15 7.5,15 C6.95410075,15 6.20348221,15.1052461 5.28825976,15.2926374 C4.96961515,15.3578797 4.63662168,15.4320602 4.29350205,15.5135226 C3.82725944,15.6242165 3.43684389,15.7426941 3.00000001,15.861187 C2.88928222,15.5135231 3.00000001,5.253479 3.00000001,4.82631266 Z M8.627,6.152 C8.284,6.062 7.911,6 7.5,6 C6.641,6.003 5.437,6.247 4.385,6.492 C4.117,6.555 3.95,6.824 4.013,7.093 C4.076,7.362 4.345,7.529 4.614,7.465 C5.628,7.225 6.826,6.997 7.5,7 C7.811,7 8.091,7.046 8.373,7.119 C8.64,7.19 8.914,7.03 8.984,6.763 C9.054,6.496 8.894,6.222 8.627,6.152 Z M8.627,12.174 C8.284,12.083 7.911,12.021 7.5,12.021 C6.641,12.024 5.437,12.268 4.385,12.513 C4.117,12.576 3.95,12.846 4.013,13.114 C4.076,13.383 4.345,13.55 4.614,13.487 C5.628,13.246 6.826,13.018 7.5,13.021 C7.811,13.022 8.091,13.067 8.373,13.141 C8.64,13.211 8.914,13.051 8.984,12.784 C9.054,12.517 8.894,12.244 8.627,12.174 Z M8.627,9.152 C8.284,9.062 7.911,9 7.5,9 C6.641,9.003 5.437,9.247 4.385,9.492 C4.117,9.555 3.95,9.824 4.013,10.093 C4.076,10.362 4.345,10.529 4.614,10.465 C5.628,10.225 6.826,9.997 7.5,10 C7.811,10 8.091,10.046 8.373,10.119 C8.64,10.19 8.914,10.03 8.984,9.763 C9.054,9.496 8.894,9.222 8.627,9.152 Z M11.627,7.119 C11.909,7.046 12.189,7 12.5,7 C13.174,6.997 14.372,7.225 15.386,7.465 C15.654,7.529 15.924,7.362 15.987,7.093 C16.05,6.824 15.883,6.555 15.614,6.492 C14.563,6.247 13.358,6.003 12.5,6 C12.089,6 11.716,6.062 11.373,6.152 C11.106,6.222 10.946,6.496 11.016,6.763 C11.086,7.03 11.36,7.19 11.627,7.119 Z M11.627,13.119 C11.909,13.046 12.189,13 12.5,13 C13.174,12.997 14.372,13.225 15.386,13.465 C15.654,13.529 15.924,13.362 15.987,13.093 C16.05,12.824 15.883,12.555 15.614,12.492 C14.563,12.247 13.358,12.003 12.5,12 C12.089,12 11.716,12.062 11.373,12.152 C11.106,12.222 10.946,12.496 11.016,12.763 C11.086,13.03 11.36,13.189 11.627,13.119 Z M11.627,10.119 C11.909,10.046 12.189,10 12.5,10 C13.174,9.997 14.372,10.225 15.386,10.465 C15.654,10.529 15.924,10.362 15.987,10.093 C16.05,9.824 15.883,9.555 15.614,9.492 C14.563,9.247 13.358,9.003 12.5,9 C12.089,9 11.716,9.062 11.373,9.152 C11.106,9.222 10.946,9.496 11.016,9.763 C11.086,10.03 11.36,10.19 11.627,10.119 Z" fill="#E6B035"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/place.js", {
    name: "symbols/place",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="place"> <path d="M10,2.5 C6.963,2.5 4.5,4.962 4.5,8 C4.5,9.519 5.116,10.894 6.111,11.889 C6.213,11.992 6.32,12.09 6.43,12.184 C7.921,13.458 9.087,15.085 9.804,16.911 L10.035,17.5 L10.303,16.818 C11.014,15.009 12.139,13.426 13.607,12.152 C13.706,12.066 13.803,11.976 13.896,11.883 C14.887,10.888 15.5,9.515 15.5,8 C15.5,4.962 13.037,2.5 10,2.5 Z M11.5,8 C11.5,8.828 10.828,9.5 10,9.5 C9.172,9.5 8.5,8.828 8.5,8 C8.5,7.172 9.172,6.5 10,6.5 C10.828,6.5 11.5,7.172 11.5,8 Z" id="bg" fill="#F9DBD9"></path> <path d="M16,8 C16,4.686 13.314,2 10,2 C6.686,2 4,4.686 4,8 C4,9.655 4.672,11.158 5.757,12.243 C5.869,12.354 5.985,12.462 6.105,12.564 C7.535,13.785 8.652,15.345 9.339,17.094 L9.57,17.683 C9.645,17.874 9.83,18 10.035,18 C10.241,18 10.426,17.874 10.501,17.683 L10.769,17.001 C11.45,15.267 12.526,13.752 13.934,12.53 C14.043,12.436 14.148,12.337 14.25,12.236 C15.331,11.152 16,9.652 16,8 L15,8 C15,9.379 14.444,10.624 13.541,11.53 C13.457,11.614 13.369,11.696 13.279,11.774 C11.752,13.099 10,16.1054077 10,16.1054077 C9.253,14.2024077 8.308,13.131 6.755,11.804 C6.654,11.718 6.558,11.629 6.464,11.536 C5.559,10.629 5,9.382 5,8 C5,6.618 5.559,5.371 6.464,4.464 C7.371,3.559 8.618,3 10,3 C11.382,3 12.629,3.559 13.535,4.464 C14.441,5.371 15,6.618 15,8 L15.5,8 L16,8 Z M11.5,8 L11,8 C10.999,8.552 10.552,8.999 10,9 C9.448,8.999 9.001,8.552 9,8 C9.001,7.448 9.448,7.001 10,7 C10.552,7.001 10.999,7.448 11,8 L12,8 C12,6.895 11.105,6 10,6 C8.895,6 8,6.895 8,8 C8,9.105 8.895,10 10,10 C11.105,10 12,9.105 12,8 L11.5,8 Z" fill="#DB4C3F"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/bing.js", {
    name: "symbols/bing",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="bing" fill="#FFB900"> <path d="M7.22995951,2.29499388 C7.22802956,5.77565178 7.23333691,9.25630969 7.22754707,12.7364851 C5.85825027,13.9499388 4.49570828,15.1711122 3.12930639,16.3874608 C6.46956072,14.6336222 9.80692012,12.8749588 13.1452445,11.1177428 C12.2188703,10.6970145 11.2905662,10.2806286 10.3646746,9.85893538 C9.74178444,8.4997708 9.11262199,7.14350113 8.48780192,5.78481903 C11.584883,6.73049265 14.6809992,7.68099114 17.7771153,8.63004216 C17.7775978,10.14312 17.7771153,11.6566802 17.7775978,13.169758 C14.2535161,15.2700219 10.7279869,17.3678734 7.20438772,19.4686198 C5.80276432,18.4862772 4.40210589,17.5034521 3,16.5220745 L3,1 C4.41079065,1.42941302 5.82109881,1.8602735 7.22995951,2.29499388 Z"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/star-filled.js", {
    name: "symbols/star-filled",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="star-filled" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" fill-rule="evenodd"> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z"> </path> </g> </svg> ';
        },
        useData: !0
    }
}),
define("views/TaskDetail/SmartCards/SmartcardView", ["application/runtime", "./BingMapView", "wunderbits/WBViewPresenter", "template!detailview/smartcard", "partial!symbols/amazon", "partial!symbols/flickr", "partial!symbols/imdb", "partial!symbols/imgur", "partial!symbols/instagram", "partial!symbols/spotify", "partial!symbols/vine", "partial!symbols/wikipedia", "partial!symbols/yelp", "partial!symbols/youtube", "partial!symbols/link", "partial!symbols/information", "partial!symbols/movie", "partial!symbols/book", "partial!symbols/place", "partial!symbols/bing", "partial!symbols/star-filled"], function(e, t, i, n, o) {
    var a = ["movie", "book", "place"]
      , r = {
        "READ REVIEWS": "Read reviews on $",
        NAVIGATE: "View on $",
        "VIEW ON": "View on $",
        "WATCH MOVIE": "Watch on $",
        "LISTEN TO BOOK": "Listen on $",
        "BOOK TICKETS": "Book tickets on $",
        "VIEW MENU": "View menu on $",
        "READ BOOK": "Read on $",
        "READ EXCERPT": "Read excerpt on $",
        "PLAY SOUNDTRACK": "Play soundtrack on $",
        "READ GUIDES": "Read guides on $",
        "VIEW DEALS": "View deals on $",
        "PLAY MUSIC": "Listen on $",
        "PLAY ALBUM": "Listen on $",
        "WATCH TRAILER": "Watch Trailer on $",
        "FIND CONCERTS": "Find Concerts",
        "FLIGHT TO": "Check Flights on $",
        "BOOK TOUR": "Book Tour",
        "BUY GAME": "Buy Game on $",
        "READ MORE": "Read more on $",
        SEARCH: "Search on $"
    }
      , s = i.prototype;
    return i.extend({
        template: n,
        className: "section-item smart-card",
        "implements": [],
        attributes: {
            tabindex: 0
        },
        renderData: {
            icon: "link",
            description: o,
            shouldShowDescription: !1,
            image: o,
            title: o,
            type: o,
            url: o,
            actions: [],
            attributions: [],
            author: o,
            genre: o,
            datePublished: o,
            contentRating: o,
            duration: o,
            rating: o,
            address: o
        },
        formatActions: function(e) {
            return e.map(function(e) {
                var t = e.displayName;
                return t in r && (e.displayName = r[t].replace("$", e.target.displayName)),
                e;
            }).slice(0, 2);
        },
        formatdata: function(t) {
            var i = this
              , n = !e.env.isChromeApp()
              , o = i.cardData;
            return t.icon = -1 !== a.indexOf(o.type) ? o.type : "information",
            t.author = o.author,
            t.description = o.description,
            n && (t.image = o.image),
            t.title = o.title,
            t.type = o.type,
            t.url = o.url,
            t.actions = o.actions ? i.formatActions(o.actions) : t.actions,
            t.attributions = o.attributions ? o.attributions : t.attributions,
            t.genre = o.genre,
            t.releaseYear = o.datePublished && o.datePublished.split("-")[0],
            t.contentRating = o.contentRating,
            t.duration = o.duration && i.formatDuration(o.duration),
            t.rating = o.rating && i.formatRating(o.rating),
            t.address = o.address,
            t;
        },
        render: function(t) {
            var i = this
              , n = !e.env.isChromeApp();
            return i.cardData = t,
            s.render.call(i, i.formatdata(i.renderData)),
            "bingMaps" === t.type && n && i.renderBingMap(t),
            i;
        },
        renderBingMap: function(e) {
            var i = this
              , n = i.addSubview(new t()).render(e).el;
            i.$(".smart-card-content-inner").before(n);
        },
        formatDuration: function(e) {
            var t = -1 !== e.indexOf("S") && -1 === e.indexOf("H")
              , i = e.split(/PT|H|M|S/).map(function(e) {
                return parseInt(e, 10);
            });
            return t ? i[1] + ":" + i[2] : 60 * i[1] + i[2];
        },
        formatRating: function(e) {
            var t = Math.round(e.ratingValue / e.bestRating * 10);
            return {
                value: t,
                percentage: 10 * t,
                max: e.bestRating,
                provider: e.provider && e.provider.name
            };
        }
    });
}),
define("/styles/detailview/_smartcards.js", {
    name: "detailview/_smartCards",
    data: "#wunderlist-base #detail .smart-cards .smart-cards-content:empty + .smart-cards-footer{display:none}#wunderlist-base #detail .smart-cards .smart-card{padding-top:8px;padding-bottom:8px;}#wunderlist-base #detail .smart-cards .smart-card .smart-card-footer{display:none}#wunderlist-base #detail .smart-cards .smart-card:last-child .smart-card-footer{display:block}#wunderlist-base #detail .smart-cards:empty{display:none}#wunderlist-base #detail .smart-cards .smart-card-content{border:1px solid rgba(0,0,0,0.1);-webkit-border-radius:3px;border-radius:3px;background:#fff;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:10px 5px 10px 5px}#wunderlist-base #detail .smart-cards .smart-card-header{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex}#wunderlist-base #detail .smart-cards .smart-card-footer{padding-top:6px;}#wunderlist-base #detail .smart-cards .smart-card-footer svg{width:12px;height:12px}#wunderlist-base #detail .smart-cards .smart-card-info,#wunderlist-base #detail .smart-cards .smart-card-thumbnail{margin:0 5px;font-size:0;}#wunderlist-base #detail .smart-cards .smart-card-info img,#wunderlist-base #detail .smart-cards .smart-card-thumbnail img{-webkit-border-radius:3px;border-radius:3px;max-width:75px;height:auto}#wunderlist-base #detail .smart-cards .smart-card-title{font-size:15px;color:#262626;font-weight:bold}#wunderlist-base #detail .smart-cards .smart-card-meta{margin:5px 0;}#wunderlist-base #detail .smart-cards .smart-card-meta span{color:#737272;font-size:12px;margin:3px 0;}#wunderlist-base #detail .smart-cards .smart-card-meta span:after{content:' ∙ '}#wunderlist-base #detail .smart-cards .smart-card-meta span:last-child:after{content:''}#wunderlist-base #detail .smart-cards .smart-card-actions{margin:0 5px;}#wunderlist-base #detail .smart-cards .smart-card-actions .button{margin-top:10px}#wunderlist-base #detail .smart-cards .smart-card-description{margin:10px 5px 0 5px;color:#737272}#wunderlist-base #detail .smart-cards .smart-card-url{font-size:10px;font-weight:normal;margin:0;margin-top:3px;word-wrap:break-word;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;}#wunderlist-base #detail .smart-cards .smart-card-url a{color:#a3a3a2}#wunderlist-base #detail .smart-cards .smart-card-rating-container{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:horizontal;-moz-box-orient:horizontal;-o-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;font-size:12px;color:#737272;}#wunderlist-base #detail .smart-cards .smart-card-rating-container .smart-card-rating-wrapper{width:80px;position:relative;}#wunderlist-base #detail .smart-cards .smart-card-rating-container .smart-card-rating-wrapper .smart-card-rating{position:absolute;overflow:hidden;}#wunderlist-base #detail .smart-cards .smart-card-rating-container .smart-card-rating-wrapper .smart-card-rating svg{height:14px;width:14px;fill:#ecab00}#wunderlist-base #detail .smart-cards .smart-card-rating-container .smart-card-rating-wrapper .smart-card-rating .smart-card-rating-inner{width:80px}#wunderlist-base #detail .smart-cards .smart-card-rating-container .smart-card-rating-wrapper .smart-card-rating.bg svg{fill:#ccc}#wunderlist-base #detail .smart-cards .smart-card-rating-container .smart-card-rating-provider{margin:0 5px}#wunderlist-base #detail .smart-cards .smart-card-powered{color:#737272;font-size:10px;text-transform:uppercase;margin:0 5px}"
}),
define("views/TaskDetail/TaskDetailSmartCardsView", ["application/runtime", "actions/Factory", "views/TaskDetail/SmartCards/SmartcardView", "wunderbits/WBViewPresenter", "project!core", "style!detailview/_smartcards"], function(e, t, i, n, o, a, r) {
    var s = n.prototype;
    return n.extend({
        className: "section smart-cards",
        styles: [a],
        attributes: {
            tabindex: 0
        },
        formatdata: function(e) {
            return e;
        },
        initialize: function() {
            var e = this;
            s.initialize.apply(e, arguments),
            e.smartcardsLookup = t.smartcardsLookup();
        },
        render: function(e) {
            var t = this;
            t.options = e || t.options,
            s.render.call(t, t.formatdata(t.renderData)),
            t.taskModelBind && t.unbindFrom(t.taskModelBind);
            var i = function() {
                t.taskModel = t.options.model,
                t.taskModelBind = t.bindTo(t.taskModel, "change:revision", t.render.bind(t, r)),
                t.renderSmartCards();
            };
            return t.options.animationDeferred ? t.options.animationDeferred.done(i) : i(),
            t;
        },
        renderSmartCards: function() {
            var t = this
              , n = e.isNightly() || e.isBeta() || e.isDev();
            if (n) {
                var o = t.taskModel.attributes.online_id;
                o && t.smartcardsLookup.fetchSmartcards(o).done(function(e) {
                    if (!t.destroyed && t.taskModel.attributes.online_id === o) {
                        t.destroySubviews();
                        var n = document.createDocumentFragment()
                          , a = e && e[0];
                        a && console.debug("smartcards source " + a.sourceURL),
                        e.forEach(function(e) {
                            var o = t.addSubview(new i());
                            n.appendChild(o.render(e).el);
                        }),
                        t.el.appendChild(n);
                    }
                });
            }
        }
    });
}),
define("/templates/detailview/detailInfo.js", {
    name: "detailview/detailInfo",
    data: {
        "1": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.isShared, {
                name: "if",
                hash: {},
                fn: this.program(2, n),
                inverse: this.program(7, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "2": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.completedRelative, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.program(5, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "3": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_completed_$_by_$", e && e.completed_on, e && e.completed_by, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "5": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_completed_by_$_on_$", e && e.completed_by, e && e.completed_on, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "7": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.completedRelative, {
                name: "if",
                hash: {},
                fn: this.program(8, n),
                inverse: this.program(10, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "8": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_completed_$", e && e.completed_on, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "10": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_completed_on_$", e && e.completed_on, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "12": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.isShared, {
                name: "if",
                hash: {},
                fn: this.program(13, n),
                inverse: this.program(18, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "13": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.createdRelative, {
                name: "if",
                hash: {},
                fn: this.program(14, n),
                inverse: this.program(16, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "14": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_created_$_by_$", e && e.created_on, e && e.created_by, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "16": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_created_by_$_on_$", e && e.created_by, e && e.created_on, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "18": function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.createdRelative, {
                name: "if",
                hash: {},
                fn: this.program(19, n),
                inverse: this.program(21, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        "19": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_created_$", e && e.created_on, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        "21": function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return " " + r((o = t.localized || e && e.localized || a,
            o.call(e, "label_created_on_$", e && e.created_on, {
                name: "localized",
                hash: {},
                data: n
            }))) + " ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = " ";
            return o = t["if"].call(e, e && e.isCompleted, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.program(12, n),
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " ";
        },
        useData: !0
    }
}),
define("views/TaskDetail/Comments/TaskDetailInfoView", ["application/runtime", "vendor/moment", "wunderbits/helpers/date", "actions/Factory", "wunderbits/WBView", "project!core", "template!detailview/detailInfo", "wunderbits/mixins/UnicodeEmojiViewMixin"], function(e, t, i, n, o, a, r, s, l) {
    var c = a.WBDeferred
      , d = e._
      , u = o.prototype
      , m = o.extend({
        template: r,
        className: "detail-info",
        initialize: function() {
            var e = this;
            e.listLookup = n.listLookup(),
            e.userLookup = n.userLookup(),
            u.initialize.apply(e, arguments);
        },
        renderData: {
            isShared: l,
            isCompleted: l,
            createdRelative: l,
            created_by: l,
            created_on: l,
            completedRelative: l,
            completed_by: l,
            completed_on: l
        },
        formatData: function(t) {
            var i = this;
            t = u.formatData.call(i, t);
            var n = i.listLookup.getListModel(i.model.attributes.list_id);
            t.isShared = n && n.isShared(),
            t.isCompleted = i.model.isCompleted();
            var o = t.isCompleted ? "completed" : "created"
              , a = o + "Relative"
              , r = o + "_by_id"
              , s = o + "_by"
              , l = o + "_on"
              , c = i.model.attributes[r] || e.user.id
              , d = c === e.user.id ? e.user : i.userLookup.getUserModel(c);
            d ? t[s] = d.escape("name") : t.isShared = !1;
            var m = i.model.getHumanFormattedDates();
            return t[l] = m[l],
            t[a] = m[a],
            t;
        },
        render: function(t) {
            var i = this;
            return i.emojiRendered = new c(),
            t && d.extend(i.options, t),
            i.model = t && t.model || i.model,
            i.onNextMinuteBind || (i.onNextMinuteBind = i.bindTo(e, "time:nextMinute", i.renderDeferred, i)),
            i.initModelBindings(),
            i.options.animationDeferred.done(i.renderDeferred, i),
            i;
        },
        renderDeferred: function() {
            var e = this;
            u.render.call(e, e.formatData(e.renderData)),
            e.$el.css("visibility", "hidden"),
            e.emojiRendered.done(function() {
                e.$el.removeAttr("style");
            }),
            e.defer(e.emojify, e);
        },
        initModelBindings: function() {
            var e = this;
            if (!e.model)
                throw new Error("Cannot init model bindings without model");
            e.modelChangeCompletedBind && e.unbindFrom(e.modelChangeCompletedBind),
            e.listShareBind && e.unbindFrom(e.listShareBind),
            e.modelChangeCompletedBind = e.bindTo(e.model, "change:completed", function() {
                e.render();
            });
            var t = e.listLookup.getListModel(e.model.attributes.list_id);
            t && (e.listShareBind = e.bindTo(t, "change:isShared", e.render));
        },
        emojify: function() {
            var e = this
              , t = e.$("text").attr("rel")
              , i = t.indexOf("by_$_on_$") > 0
              , n = e.$(i ? ".token_0" : ".token_1");
            n.addClass("flex"),
            e.renderEmoji(n),
            e.emojiRendered.resolve();
        }
    });
    return s.applyToClass(m),
    m;
}),
define("views/TaskDetail/Comments/Controllers/CommentViewController", ["wunderbits/WBViewController", "actions/Factory"], function(e, t) {
    var i = e.prototype;
    return e.extend({
        "implements": {
            "delete:comment": "deleteComment"
        },
        initialize: function() {
            var e = this;
            i.initialize.apply(e, arguments),
            e.deleteCommentInteractor = t.deleteComment();
        },
        deleteComment: function(e) {
            var t = this;
            t.deleteCommentInteractor.deleteComment(t.view.model.id, e);
        }
    });
}),
define("/templates/detailview/commentItem.js", {
    name: "detailview/commentItem",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression, s = t.helperMissing;
            return '<div class="section-icon picture"></div> <div class="section-content"> <span class="comment-author">' + r((o = t.author || e && e.author,
            typeof o === a ? o.call(e, {
                name: "author",
                hash: {},
                data: n
            }) : o)) + '</span> <span class="comment-time">' + r((o = t.time_stamp || e && e.time_stamp,
            typeof o === a ? o.call(e, {
                name: "time_stamp",
                hash: {},
                data: n
            }) : o)) + '</span> <div class="comment-text">' + r((o = t.text || e && e.text,
            typeof o === a ? o.call(e, {
                name: "text",
                hash: {},
                data: n
            }) : o)) + '</div> </div> <a class="section-delete" data-key-aria-label="button_delete" data-key-title="button_delete" deletetabindex="0" aria-label="Delete"> ' + r((o = t.symbol || e && e.symbol || s,
            o.call(e, "delete", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> ";
        },
        useData: !0
    }
}),
define("views/TaskDetail/Comments/TaskDetailCommentView", ["application/runtime", "views/AvatarView", "./Controllers/CommentViewController", "wunderbits/WBViewPresenter", "wunderbits/helpers/date", "vendor/moment", "wunderbits/mixins/LinkingViewMixin", "wunderbits/mixins/EmailLinkingViewMixin", "wunderbits/mixins/TaggingViewMixin", "wunderbits/mixins/UnicodeEmojiViewMixin", "template!detailview/commentItem"], function(e, t, i, n, o, a, r, s, l, c, d, u) {
    var m = n.prototype
      , p = n.extend({
        className: "section-item section-item-comment",
        tagName: "li",
        template: d,
        "implements": [i],
        attributes: {
            tabindex: 0
        },
        emits: {
            "click .section-delete": "delete:comment"
        },
        observes: {
            model: {
                change: "renderTimestamp",
                destroy: "destroy",
                "change:canDelete": "render"
            }
        },
        renderData: {
            author: u,
            time_stamp: u,
            comment: u
        },
        formatData: function(e) {
            var t = this
              , i = t.model && t.model.attributes;
            return i && (e.author = i.author ? i.author.name : "author unknown",
            e.time_stamp = t.getTimestamp(),
            e.text = i.text || ""),
            e;
        },
        initialize: function() {
            var e = this;
            m.initialize.apply(e, arguments);
        },
        render: function() {
            var t = this;
            if (!t.model)
                return t;
            m.render.call(t, t.renderData);
            var i;
            if (t.model) {
                var n = t.model.attributes.author;
                i = n && "" + n.id;
                var o = n && n.avatar;
                i && t.renderAvatar(i, o);
            }
            i && e.user.isIDEqual(i) && t.$el.addClass("active-user"),
            t.model.canDelete() || t.$(".section-delete").remove();
            var a = t.$(".comment-text");
            return t.renderEmoji(t.$(".comment-author")),
            t.renderEmoji(a),
            t.renderLinks(a),
            t.renderEmails(a),
            t.renderTags(a),
            t.$el.attr("rel", t.model.id),
            t.$el.attr("data-server-data", t.model.attributes.created_at),
            t.$el.attr("data-local-date", t.model.attributes.local_created_at),
            t;
        },
        getTimestamp: function() {
            var t, i = this, n = i.model.attributes, r = n.created_at ? o.convertServerTimeToLocalTime(n.created_at) : n.local_created_at;
            return t = n.online_id ? a(r).from(a().utc()) : e.language.getText("upload_file_not_synced_yet");
        },
        renderTimestamp: function() {
            var e = this;
            e.$(".comment-time").html(e.getTimestamp());
        },
        renderAvatar: function(i, n) {
            var o = this;
            o.avatarView = o.avatarView || o.addSubview(new t({
                listId: e.listId,
                url: n,
                id: i
            }), "avatarView"),
            o.$(".picture").html(o.avatarView.render({
                id: i,
                size: "medium"
            }).$el);
        }
    });
    return [r, s, l, c].forEach(function(e) {
        e.applyToClass(p);
    }),
    p;
}),
define("views/TaskDetail/Comments/Controllers/InputController", ["application/runtime", "actions/Factory", "wunderbits/WBViewController", "wunderbits/helpers/date", "wunderbits/helpers/selection", "wunderbits/data/keycodes", "wunderbits/helpers/strings"], function(e, t, i, n, o, a, r, s) {
    var l = e.$
      , c = i.prototype;
    return i.extend({
        state: s,
        "implements": {
            "focus:textarea": "setFocus",
            "blur:textarea": "removeFocus",
            "keydown:textarea": "handleKeys",
            "click:comment-last": "setInputFocus"
        },
        initialize: function() {
            var e = this;
            c.initialize.apply(e, arguments),
            e.createComment = t.createComment();
        },
        handleKeys: function(t) {
            var i = this
              , n = i.view.$("textarea")
              , o = l.trim(n.val());
            t.which === a.enter && (t.shiftKey || (t.preventDefault(),
            o.length > 0 && (i.createComment.createComment(o, i.view.model.id),
            e.trigger("commentAdded"),
            e.trigger("detail:scrollToEnd", null, !0),
            i.delay(i.resetInput, 1))));
        },
        resetInput: function() {
            var e = this;
            e.view.$(".comments-body").css("margin-bottom", 0),
            e.view.getSubview("textarea").setContent("");
        },
        setInputFocus: function() {
            e.trigger("detail:scrollToEnd", !0);
        },
        setFocus: function() {
            var t = this
              , i = t.view
              , n = e.currentRoute();
            e.trigger("popover:close"),
            t.defer(function() {
                i.$(".input-fake").addClass("focus"),
                e.trigger("focus:set", "comments");
            }),
            -1 === n.indexOf("comments/edit") && e.trigger("route:" + i.model.route("/comments/edit"), {
                trigger: !1
            });
        },
        removeFocus: function() {
            var t = this;
            t.defer(function() {
                t.view.$(".input-fake").removeClass("focus"),
                e.currentRoute() === t.view.model.route("/comments/edit") && e.trigger("route:" + t.view.model.route(), {
                    trigger: !1
                });
            });
        }
    });
}),
define("/templates/detailview/comments.js", {
    name: "detailview/comments",
    data: {
        "1": function() {
            return " has-comments ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = '<div class="comments-bottom ';
            return o = t["if"].call(e, e && e.hasComments, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '"> <div class="last-comment hidden"> <span class="unread-count hidden">' + s((a = t.unreadCount || e && e.unreadCount,
            typeof a === r ? a.call(e, {
                name: "unreadCount",
                hash: {},
                data: n
            }) : a)) + '</span> </div> <div class="comments-add"> <div class="input-fake" /> </div> </div> ';
        },
        useData: !0
    }
}),
define("/styles/detailview/_comments.js", {
    name: "detailview/_comments",
    data: '#wunderlist-base .comments-bottom{z-index:9003;border-top:1px solid #ebebeb;background:#fff;}#wunderlist-base .comments-bottom .unread-count{position:absolute;display:none;right:15px;top:10px;background:#d74e48;color:#fff;font-size:10px;line-height:10px;-webkit-border-radius:20px;border-radius:20px;padding:2px 2px 3px 2px;text-align:center;min-width:11px}#wunderlist-base .comments-bottom .button{padding:9px 20px !important}#wunderlist-base .comments-add{padding:10px 10px 0 10px;}#wunderlist-base .comments-add .input-fake{min-height:32px;padding:7px}#wunderlist-base .last-comment li,#wunderlist-base .comments-main li{line-height:15px;}#wunderlist-base .last-comment li .comment-author,#wunderlist-base .comments-main li .comment-author{font-weight:bold;max-width:100px;display:inline-block;vertical-align:top;height:16px;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}#wunderlist-base .last-comment li .comment-time,#wunderlist-base .comments-main li .comment-time{color:#737272;font-weight:normal}#wunderlist-base .last-comment li .comment-text,#wunderlist-base .comments-main li .comment-text{line-height:18px;word-break:break-word;white-space:pre-wrap}#wunderlist-base .last-comment li .comment-text,#wunderlist-base .comments-main li .comment-text,#wunderlist-base .last-comment li span.emoji,#wunderlist-base .comments-main li span.emoji,#wunderlist-base .last-comment li .linkout,#wunderlist-base .comments-main li .linkout{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}#wunderlist-base .last-comment li .comment-text a,#wunderlist-base .comments-main li .comment-text a,#wunderlist-base .last-comment li span.emoji a,#wunderlist-base .comments-main li span.emoji a,#wunderlist-base .last-comment li .linkout a,#wunderlist-base .comments-main li .linkout a{color:#328ad6 !important}#wunderlist-base .last-comment{z-index:2;position:absolute;right:0;left:0;top:-44px;background:#fff;padding:0;border-top:1px solid #ebebeb;}#wunderlist-base .last-comment li{padding-top:10px !important;cursor:pointer;}#wunderlist-base .last-comment li .comment-text{max-width:300px;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:block}#wunderlist-base .comments-main{position:relative;}#wunderlist-base .comments-main .spinner{opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);height:0;-webkit-transition:all 250ms ease;-moz-transition:all 250ms ease;-o-transition:all 250ms ease;-ms-transition:all 250ms ease;transition:all 250ms ease;position:relative;}#wunderlist-base .comments-main .spinner span{top:0;margin-top:10px}#wunderlist-base .comments-main .spinner.spinning{opacity:1;-ms-filter:none;filter:none;height:32px}#wunderlist-base .has-comments .unread-count{display:block}#wunderlist-base .has-comments li.update{padding:0;text-align:center;height:4px;margin-top:4px;}#wunderlist-base .has-comments li.update .comment-text{text-align:center;position:absolute;right:0;left:0;top:-8px;color:#777;font-size:12px;}#wunderlist-base .has-comments li.update .comment-text:before{background:url("images/textures/divider.png") center top repeat-x;content:\'\';z-index:9995;height:12px;width:100%;position:absolute;top:44px;left:0}#wunderlist-base .has-comments li.update .comment-text span{padding:0 5px;z-index:9999;position:relative}'
}),
define("views/TaskDetail/Comments/TaskDetailCommentsView", ["application/runtime", "wunderbits/data/keycodes", "views/AvatarView", "views/TaskDetail/Comments/TaskDetailCommentView", "views/TaskDetail/Comments/Controllers/InputController", "wunderbits/WBExpandableTextareaView", "vendor/moment", "wunderbits/WBViewPresenter", "template!detailview/comments", "style!detailview/_comments"], function(e, t, i, n, o, a, r, s, l, c, d) {
    var u = s.prototype;
    return s.extend({
        className: "comments",
        styles: [c],
        "implements": [o],
        template: l,
        emits: {
            "focus textarea": "focus:textarea",
            "blur textarea": "blur:textarea",
            "keydown textarea": "keydown:textarea",
            "keyup textarea": "keyup:textarea",
            "click .last-comment": "click:comment-last"
        },
        observes: {
            runtime: {
                "time:nextMinute": "renderLastComment"
            },
            events: {
                lastComment: "renderLastComment"
            }
        },
        renderData: {
            hasComments: d,
            unreadCount: d,
            hasUnreadComments: d,
            commentsUnreachable: d
        },
        formatData: function(e) {
            var t = this
              , i = t.model.attributes;
            return e.hasComments = i.hasComments,
            e.unreadCount = i.unreadCount,
            e.hasUnreadComments = e.unreadCount > 0,
            e.commentsUnreachable = !t.commentsReachable,
            e;
        },
        initialize: function() {
            var e = this;
            u.initialize.apply(e, arguments),
            e.expandableTextareaView = e.addSubview(new a({
                maxLength: 1e3,
                fontSize: 15,
                lineHeight: 20,
                placeholderKey: "placeholder_add_comments"
            }), "textarea");
        },
        render: function(e) {
            var t = this;
            return t.model && t.unbindFromTarget(t.model),
            t.model = e && e.model || t.model,
            t.model ? (t.bindToModel(),
            e.animationDeferred.done(function() {
                t.requestAnimationFrame(function() {
                    u.render.call(t, t.formatData(t.renderData)),
                    t.$(".input-fake").prepend(t.expandableTextareaView.render().el),
                    t.$(".last-comment").addClass("hidden"),
                    t.updateUnreadCount();
                });
            }),
            t) : t;
        },
        bindToModel: function() {
            var e = this;
            e.bindTo(e.model, "change:unreadCount", e.updateUnreadCount);
        },
        handlePageRequestFail: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.$(".error");
                t.removeClass("hidden"),
                e.delay(function() {
                    t.addClass("hidden");
                }, 1e4);
            });
        },
        renderLastComment: function(e) {
            var t = this;
            t.requestAnimationFrame(function() {
                var i = e && e.attributes.task_id === t.model.id;
                i && (t.lastComment && t.lastComment.destroy(),
                t.lastComment = t.addSubview(new n({
                    model: e
                })),
                t.$(".last-comment").append(t.lastComment.render().el));
            });
        },
        updateUnreadCount: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.model.attributes.unreadCount
                  , i = e.$(".unread-count");
                t > 0 ? i.removeClass("hidden").html(t) : i.addClass("hidden").html("");
            });
        }
    });
}),
define("views/TaskDetail/Comments/Controllers/CommentListController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/WBViewController", "wunderbits/helpers/date"], function(e, t, i, n, o) {
    return i.extend({
        state: o,
        "implements": {
            "fetch:comments": "fetchComments",
            keydown: "handleKeys",
            "route:addComment": "onRouteAddComment"
        },
        onRouteAddComment: function() {
            e.trigger("route:" + this.view.model.route("/addComments/focus"));
        },
        fetchComments: function() {
            var t = this
              , i = t.view
              , n = i.model.attributes.online_id;
            n && (i.showLoader(),
            e.trigger("sync:start", !1, "comments", n),
            t.bindOnceTo(e, "sync:ended", i.removeLoader, i));
        },
        handleKeys: function(i) {
            var n = this
              , o = n.view;
            i.which !== t.tab || i.shiftKey ? i.which === t.tab && i.shiftKey ? (e.trigger("update:direction", "prev"),
            e.trigger("route:" + o.model.route("/listFiles/focus")),
            n.stopEventFully(i)) : i.which === t.up ? o.focusPrevItem() : i.which === t.down && o.focusNextItem() : (e.trigger("update:direction", "next"),
            e.trigger("route:" + o.model.route("/addComments/focus")),
            n.stopEventFully(i));
        }
    });
}),
define("/templates/detailview/commentList.js", {
    name: "detailview/commentList",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = t.helperMissing, r = this.escapeExpression;
            return '<div class="state loading spinner"><span class="dark"/> <div class="error hidden">' + r((o = t.localized || e && e.localized || a,
            o.call(e, "comment_request_failed", {
                name: "localized",
                hash: {},
                data: n
            }))) + '</div> </div> <ul class="comments-list"></ul> ';
        },
        useData: !0
    }
}),
define("views/TaskDetail/Comments/TaskDetailCommentListView", ["application/runtime", "views/TaskDetail/Comments/TaskDetailCommentView", "views/TaskDetail/Comments/Controllers/CommentListController", "actions/Factory", "wunderbits/WBViewPresenter", "wunderbits/helpers/date", "vendor/moment", "template!detailview/commentList", "style!detailview/_comments"], function(e, t, i, n, o, a, r, s, l, c) {
    var d = e._
      , u = e.$
      , m = o.prototype;
    return o.extend({
        template: s,
        styles: [l],
        "implements": [i],
        className: "comments-main",
        observes: {
            runtime: {
                nextPageLoaded: "handleLoadedPage",
                "commentsPage:fail": "handlePageRequestFail",
                "time:nextMinute": "updateTimestamps",
                "comment:delete": "deleteComment"
            },
            env: {
                online: "onOnline",
                offline: "onOffline"
            }
        },
        emits: {
            keydown: "keydown"
        },
        formatData: function(e) {
            var t = this;
            return e = m.formatData.call(t, e);
        },
        initialize: function() {
            var t = this;
            t.currentItemNum = 0,
            t.isOnline = !0,
            t.env = e.env,
            m.initialize.apply(t, arguments),
            t.commentLookup = n.commentLookup(),
            t.debounceRemoveLoader = t.debounce(t.removeLoader, 100),
            t.debounceShowLoader = t.debounce(t.showLoader, 100, !0),
            t.commentsReady = t.deferred(),
            t.bindOnceTo(e, "taskComments:ready", function() {
                t.commentsReady.resolve();
            });
        },
        render: function(e) {
            var t = this;
            return t.currentItemNum = 0,
            t.model && t.unbindFromTarget(t.model),
            t.model = e && e.model,
            t.collection = t.commentLookup.getCommentsCollection(t.model.id),
            e.animationDeferred.done(function() {
                t.requestAnimationFrame(function() {
                    t.$el.removeClass("has-comments"),
                    m.render.call(t, t.formatData(t.renderData)),
                    t.renderCollection(),
                    t.adding = !1;
                });
            }),
            t;
        },
        renderCollection: function() {
            var t = this;
            t.when(t.commentsReady).done(function() {
                !t.adding && t.debounceRemoveLoader(),
                t.collection.models.length && (t.$el.addClass("has-comments"),
                t.renderComments()),
                t.bindToCollection(),
                e.trigger("detail:checkBounds"),
                t.trigger("fetch:comments");
            }, t);
        },
        bindToCollection: function() {
            var e = this;
            e.collectionBind && e.unbindFrom(e.collectionBind),
            e.collectionRemoveBind && e.unbindFrom(e.collectionRemoveBind),
            e.collectionBind = e.bindTo(e.collection, "add", "onCommentAdd"),
            e.collectionRemoveBind = e.bindTo(e.collection, "remove", "onCommentRemove");
        },
        onOnline: function() {
            var e = this;
            e.isOnline = !0,
            e.renderOnlineState();
        },
        onOffline: function() {
            var e = this;
            e.isOnline = !1,
            e.delay(e.renderOfflineState, 500);
        },
        onCommentAdd: function(t, i, n) {
            var o = this;
            o.adding = !0,
            o.debounceRemoveLoader(),
            o.addedComment(t, i, n),
            e.trigger("detail:checkBounds"),
            o.trigger("lastComment", d.last(o.collection.models));
        },
        onCommentRemove: function() {
            var e = this;
            e.trigger("lastComment", d.last(e.collection.models));
        },
        focusNextItem: function() {
            var e = this
              , t = e.$(".comment");
            e.currentItemNum < t.length - 1 && (e.currentItemNum += 1,
            u(t.get(e.currentItemNum)).focus());
        },
        focusPrevItem: function() {
            var t = this
              , i = t.$(".comment");
            t.currentItemNum > 0 ? (t.currentItemNum -= 1,
            u(i.get(t.currentItemNum)).focus()) : 0 === t.currentItemNum && i.length > 0 ? u(i.first()).focus() : t.defer(function() {
                e.trigger("route:" + t.model.route("/addComments/focus"));
            });
        },
        showLoader: function() {
            this.$(".spinner").addClass("spinning");
        },
        removeLoader: function() {
            var t = this;
            t.delay(function() {
                t.$(".spinner").removeClass("spinning"),
                t.$(".fetch-error").addClass("hidden"),
                e.trigger("detail:checkBounds");
            }, 500);
        },
        addedComment: function(t, i, n) {
            var o = this;
            if (!o.getSubview(t.id))
                if (o.$el.addClass("has-comments"),
                n && n.addBefore) {
                    var a = o.$el.closest(".body")
                      , r = a.scrollTop()
                      , s = o.renderSingleComment(t).$el;
                    s.hide().fadeIn(750);
                    var l = s.outerHeight();
                    a.scrollTop(r + l);
                } else
                    n && n.onDemand ? (o.renderSingleComment(t),
                    e.trigger("commentList:debounceScroll")) : o.renderSingleComment(t, n);
        },
        renderSingleComment: function(e, i) {
            var n = this
              , o = n.$(".comments-list")
              , a = d.map(o.children("li"), function(e) {
                return u(e).attr("rel");
            });
            n.collection.sort();
            var s = document.createDocumentFragment()
              , l = n.addSubview(new t({
                model: e
            }), e.id);
            if (l.render(),
            s.appendChild(l.el),
            i && i.userAdded)
                return void o.append(s);
            for (var m, p, g = null, f = null, b = d.clone(n.collection.models), h = 0, v = b.length; v > h; h++)
                p = b[h],
                p.id === e.id && (m = h,
                h = v);
            for (var _, w = m - 1, k = m + 1; m && w >= 0 && !g; )
                _ = b[w] && b[w].id,
                -1 !== a.indexOf(_) ? g = _ : --w;
            for (; m < b.length - 1 && k < b.length && !f; )
                _ = b[k] && b[k].id,
                -1 !== a.indexOf(_) ? f = _ : ++k;
            var x = g && o.find('li[rel="' + g + '"]')
              , y = f && o.find('li[rel="' + f + '"]')
              , C = x && x.size()
              , T = y && y.size();
            if (C && !T || C && T)
                x.after(s);
            else if (!C && T)
                y.before(s);
            else {
                var S = b[b.length - 1]
                  , L = S && r(S.attributes.created_at).valueOf()
                  , D = r(e.attributes.created_at).valueOf()
                  , j = L !== c ? D >= L : !0;
                o[j ? "append" : "prepend"](s);
            }
            return l;
        },
        renderComments: function() {
            var e = this;
            if (!e.destroyed && e.collection) {
                e.collection.sort();
                for (var i = document.createDocumentFragment(), n = 0, o = e.collection.models.length; o > n; n++) {
                    var a = e.collection.models[n]
                      , r = e.addSubview(new t({
                        model: a
                    }), a.id);
                    i.appendChild(r.render().el);
                }
                e.trigger("lastComment", d.last(e.collection.models)),
                e.$(".comments-list").html(i);
            }
        },
        handleLoadedPage: function(e) {
            var t = this;
            t.debounceRemoveLoader(),
            e.length || t.renderLabels();
        },
        renderPageRequestFail: function() {
            var e = this;
            e.debounceRemoveLoader(),
            e.$(".fetch-error").removeClass("hidden");
        },
        renderOfflineState: function() {
            this.debounceRemoveLoader();
        },
        renderOnlineState: function() {
            this.debounceRemoveLoader();
        },
        updateTimestamps: function() {
            var e = this
              , t = e.collection && e.collection.models
              , i = t && t.length;
            i && t.forEach(function(t) {
                var i = e.getSubview(t.id);
                i && i.renderTimestamp();
            });
        },
        scrollToEnd: function(t) {
            e.trigger("detail:scrollToEnd", t);
        },
        focusCurrentItem: function() {
            var t = this
              , i = t.$(".comment")
              , n = i.get(t.currentItemNum);
            n ? n.focus() : e.trigger("route:" + t.model.route("comments/focus"));
        },
        deleteComment: function() {
            var e = this
              , t = e.$(".comment").get(e.currentItemNum)
              , i = u(t).attr("rel")
              , n = e.getSubview(i);
            n.trigger("delete:comment", {
                confirm: function() {
                    e.focusPrevItem();
                },
                cancel: function() {
                    e.focusCurrentItem();
                }
            });
        },
        focusFirstComment: function(t) {
            var i = this;
            t = t || "next";
            var n = i.$(".comment");
            0 === n.length ? "next" === t ? i.trigger("route:addComment") : (e.trigger("focus:listFiles", t),
            e.trigger("route:" + i.model.route("/listFiles/focus"), {
                trigger: !1
            })) : i.$(".comment:first").focus();
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailClickController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/helpers/date", "helpers/Animator", "helpers/animation", "actions/Factory", "wunderbits/WBViewController", "project!core"], function(e, t, i, n, o, a, r, s) {
    var l = e.$
      , c = e._
      , d = s.lib.extend
      , u = r.prototype;
    return r.extend({
        "implements": {
            "toggle:view": "toggleDetailView",
            "toggle:done": "debouncedToggleDone",
            "toggle:starred": "debouncedToggleStar",
            "click:delete": "debouncedDeleteTask",
            "click:close": "debouncedClose",
            close: "debouncedClose"
        },
        initialize: function() {
            var e = this;
            e.starTask = a.starTask(),
            e.completeTask = a.completeTask(),
            e.deleteTaskInteractor = a.deleteTask(),
            e.debouncedToggleDone = e.debounce(e.toggleDone, 250, !0),
            e.debouncedToggleStar = e.debounce(e.toggleStarred, 250, !0),
            e.debouncedDeleteTask = e.debounce(e.deleteTask, 250, !0),
            e.debouncedClose = e.debounce(e.close, 250, !0),
            u.initialize.apply(e, arguments);
        },
        toggleDetailView: function(e) {
            var t = this
              , i = l(e.target).hasClass("stack");
            i && t.view.trigger("close");
        },
        toggleDone: function() {
            var t = this
              , i = t.view
              , a = i.model;
            if (!n.isAnimatingOrClone(l('li[rel="' + a.id + '"]'))) {
                var r = "analytics:Tasks:" + (a.isCompleted() ? "unmarkDone" : "markDone");
                e.trigger(r, "detail");
                var s = o.animateOptions("completion");
                t.completeTask.toggleCompleted([a.id], s),
                i.subtasksSubView.markAllSubTasksAsDone(),
                s && s.animations.run(),
                e.trigger("analytics:detailView:toggle:done");
            }
        },
        toggleStarred: function() {
            var t = this
              , i = t.view.model
              , n = "true" === e.settings.attributes.behavior_star_tasks_to_top
              , a = {
                moveToTop: n
            }
              , r = n && o.animateOptions("starred");
            r && (a = d(a, r)),
            t.starTask.toggleStarred([i.id], a),
            r && r.animations.run(),
            e.trigger("analytics:detailView:toggle:starred");
        },
        deleteTask: function(t) {
            var i = this
              , n = "true" === e.settings.attributes.confirm_delete_entity;
            t && i.stopEventFully(t);
            var o = function() {
                i.close(),
                setTimeout(function() {
                    i.deleteTaskInteractor.deleteTasks([i.view.model.id]),
                    e.trigger("task:deleted", i.view.model);
                }, 250);
            };
            if (n) {
                var a = {
                    confirm: o,
                    customTitle: e.language.getLabel("label_are_you_sure_permanently_delete_$_task", i.view.model.escape("title")).toString(),
                    customText: e.language.getLabel("label_cant_undo").toString(),
                    confirmText: e.language.getLabel("label_delete_task").toString()
                };
                e.trigger("modal:confirm", a);
            } else
                o();
        },
        close: function(t) {
            var i, n = this, o = n.view;
            return c.isFunction(t) && (i = t,
            t = null),
            t && n.stopEventFully(t),
            o.model ? void e.trigger("tasks:toggleSelected") : void (i && c.delay(i, 100));
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailFocusController", ["application/runtime", "actions/Factory", "wunderbits/data/keycodes", "wunderbits/helpers/date", "helpers/Animator", "wunderbits/WBBlurHelper", "wunderbits/WBViewController"], function(e, t, i, n, o, a, r) {
    var s = e._
      , l = r.prototype
      , c = "self"
      , d = {
        assignee: "assignSubView",
        duedate: "dateSubView",
        reminder: "reminderSubView",
        subtasks: "subtasksSubView",
        note: "noteSubView",
        files: "filesSubView"
    }
      , u = ["title", "completed", "starred", "assignee", "duedate", "reminder", "listSubtasks", "addSubtasks", "note", "openFullscreenNote", "addFile", "listFiles", "listComments", "addComments", "closeDetailView", "delete"];
    return r.extend({
        "implements": {
            "focus:attribute": "focusAttribute",
            "focus:next": "focusNextAttribute",
            "focus:prev": "focusPrevAttribute",
            "focus:fromTab": "focusFromTab"
        },
        initialize: function() {
            var i = this;
            l.initialize.apply(i, arguments),
            i.listLookup = t.listLookup(),
            i.currentEditMode = null,
            i.bindTo(e, "route", i.updateLastFocus),
            i.bindTo(e, "update:direction", i.updateDirection);
        },
        focusAttribute: function(e) {
            var t = this
              , i = t.view;
            switch (e) {
            case "title":
                var n = !i.titleSubView.isEditingTitle();
                n && i.titleSubView.trigger("focus", c);
                break;

            case "completed":
                i.focusCompleted();
                break;

            case "starred":
                i.focusStarred();
                break;

            case "listSubtasks":
                i.focusListSubtasks(t.direction);
                break;

            case "addSubtasks":
                i.focusAddSubtasks();
                break;

            case "closeDetailView":
                i.focusCloseDetailView();
                break;

            case "delete":
                i.focusDelete();
                break;

            case "openFullscreenNote":
                i.focusOpenFullscreenButton();
                break;

            case "addFile":
                i.focusAddFile();
                break;

            case "listFiles":
                i.focusListFiles(t.direction);
                break;

            case "listComments":
                t.defer(function() {
                    i.trigger("focus:listComments", t.direction);
                });
                break;

            case "addComments":
                t.defer(function() {
                    i.trigger("focus:addComments");
                });
                break;

            default:
                var o = d[e];
                i[o] && i[o].trigger("focus", c);
            }
        },
        updateDirection: function(e) {
            this.direction = e;
        },
        cycleFocus: function(t) {
            var i, n = this, o = n.view, r = s.indexOf(u, n.currentFocus);
            if (n.updateDirection(t),
            a.run(),
            "next" === t ? i = r === u.length - 1 ? 0 : r + 1 : "prev" === t && (i = r > 0 ? r - 1 : u.length - 1),
            "assignee" === u[i]) {
                var l = n.listLookup.getListModel(o.model.attributes.list_id);
                l.isShared() || (i = "next" === t ? i + 1 : i - 1);
            }
            e.trigger("route:" + o.model.route(u[i] + "/focus"));
        },
        focusFromTab: function(e) {
            var t = this
              , n = e.which === i.tab;
            n && !e.shiftKey ? t.focusElement(e, "next") : n && e.shiftKey ? t.focusElement(e, "prev") : t.checkForEsc(e);
        },
        checkForEsc: function(t) {
            var n = this;
            if (t.which === i.esc && n.currentFocus) {
                var o = e.currentRoute();
                e.trigger(o.indexOf("/focus") >= 0 ? "route:" + n.view.model.route() : "route:" + n.view.model.route(n.currentFocus + "/focus")),
                n.stopEventFully(t);
            }
        },
        focusElement: function(e, t) {
            var i = this;
            i.cycleFocus(t),
            i.stopEventFully(e);
        },
        focusNextAttribute: function(e) {
            var t = this;
            e.which !== i.tab || e.shiftKey ? t.checkForEsc(e) : t.focusElement(e, "next");
        },
        focusPrevAttribute: function(e) {
            var t = this;
            e.which === i.tab && e.shiftKey && t.focusElement(e, "prev");
        },
        updateLastFocus: function(e) {
            var t = this
              , i = e && e[0];
            if (i) {
                var n = i.split("/");
                "tasks" === n[0] && "focus" === n[3] && (t.currentFocus = n[2]);
            }
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailEditController", ["application/runtime", "wunderbits/data/keycodes", "wunderbits/helpers/date", "helpers/Animator", "wunderbits/WBBlurHelper", "wunderbits/WBViewController"], function(e, t, i, n, o, a) {
    var r = e._
      , s = a.prototype;
    return a.extend({
        "implements": {
            "start:edit": "openEditMode"
        },
        initialize: function() {
            var t = this;
            s.initialize.apply(t, arguments),
            t.currentEditMode = null,
            t.bindTo(e, "route", t.updateLastOpenEditMode);
        },
        openEditMode: function(e, t) {
            var i = this
              , n = i.view;
            if (e)
                switch (t = t || {},
                e) {
                case "title":
                    var o = n.titleSubView.$(".edit-view").hasClass("hidden");
                    o && n.titleSubView.trigger("click:title");
                    break;

                case "assignee":
                    i.currentEditMode = "assignee",
                    n.assignSubView.trigger("toggle:edit");
                    break;

                case "duedate":
                    n.dateSubView.trigger("toggle:edit");
                    break;

                case "reminder":
                    n.reminderSubView.trigger("click:self");
                    break;

                case "subtasks":
                    var a = n.subtasksSubView.addSubTaskView;
                    a.$el.hasClass("hidden") ? (i.currentEditMode = "subtasks",
                    i.cycleEditMode(t.direction)) : a.showEditMode();
                    break;

                case "note":
                    var r = n.noteSubView;
                    t.fullscreen ? r.onOpenFullscreen(t.edit) : r.onToggleEditMode();
                    break;

                case "comments":
                    i.defer(function() {
                        n.trigger("focus:comments");
                    });
                }
        },
        cycleEditMode: function(e) {
            var t = this
              , i = t.view
              , n = ["title", "duedate", "reminder", "subtasks", "note", "comments"];
            i.isShared && n.splice(1, 0, "assignee");
            var a, s = r.indexOf(n, t.currentEditMode);
            o.run(),
            "next" === e ? a = s === n.length - 1 ? 0 : s + 1 : "prev" === e && s > 0 && (a = s - 1),
            t.openEditMode(n[a], {
                direction: e
            });
        },
        updateLastOpenEditMode: function(e) {
            var t = this
              , i = e && e[0];
            if (i) {
                var n = i.split("/");
                "tasks" === n[0] && "edit" === n[3] && (t.currentEditMode = n[2]);
            }
        }
    });
}),
define("views/TaskDetail/Controllers/TaskDetailCommentsController", ["actions/Factory", "wunderbits/WBViewController"], function(e, t) {
    var i = t.prototype;
    return t.extend({
        "implements": {
            "comments:read:all": "onAllCommentsRead"
        },
        initialize: function() {
            var t = this;
            i.initialize.apply(t, arguments),
            t.updateComment = e.updateComment();
        },
        onAllCommentsRead: function() {
            var e = this
              , t = e.view.model;
            t && e.updateComment.markAllReadForTask(t.id);
        }
    });
}),
define("/templates/symbols/close-right.js", {
    name: "symbols/close-right",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="close-right" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="close-right"> <path d="M4.5,18 C3.12,18 2,16.88 2,15.5 L2,4.5 C2,3.12 3.12,2 4.5,2 L15.5,2 C16.88,2 18,3.12 18,4.5 L18,15.5 C18,16.88 16.88,18 15.5,18 L4.5,18 Z M4.5,3 C3.68,3 3,3.68 3,4.5 L3,15.5 C3,16.32 3.68,17 4.5,17 L15.5,17 C16.32,17 17,16.32 17,15.5 L17,4.5 C17,3.68 16.32,3 15.5,3 L4.5,3 Z M7.5,15 C7.38,15 7.24,14.96 7.14,14.86 C6.96,14.66 6.96,14.34 7.14,14.14 L11.3,10 L7.14,5.86 C6.96,5.66 6.96,5.34 7.14,5.14 C7.34,4.96 7.66,4.96 7.86,5.14 L12.36,9.64 C12.54,9.84 12.54,10.16 12.36,10.36 L7.86,14.86 C7.76,14.96 7.62,15 7.5,15 L7.5,15 Z" id="i"></path> </g> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/detail-starred.js", {
    name: "symbols/detail-starred",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="100%" height="100%" viewBox="0 0 22 49" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M0,0l0,48.48c0,0.28 0.22,0.42 0.48,0.34l10.04,-3.66c0.28,-0.1 0.7,-0.1 0.96,0l10.04,3.66c0.28,0.08 0.48,-0.06 0.48,-0.34l0,-48.48l-22,0ZM14.56,30.06l1.68,5.26c0.08,0.18 0,0.38 -0.16,0.5c-0.14,0.1 -0.36,0.1 -0.52,0l-4.46,-3.24l-4.46,3.24c-0.08,0.06 -0.18,0.08 -0.28,0.08c-0.08,0 -0.18,-0.02 -0.24,-0.08c-0.16,-0.12 -0.24,-0.32 -0.16,-0.5l1.68,-5.26l-4.46,-3.24c-0.14,-0.1 -0.22,-0.32 -0.16,-0.52c0.06,-0.16 0.24,-0.3 0.42,-0.3l5.54,0l1.68,-5.26c0.14,-0.36 0.74,-0.36 0.88,0l1.7,5.26l5.5,0c0.2,0 0.36,0.14 0.44,0.3c0.06,0.2 -0.02,0.42 -0.16,0.52l-4.46,3.24Z"> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/detail-star.js", {
    name: "symbols/detail-star",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg width="100%" height="100%" viewBox="0 0 22 49" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M11,20.48c-0.18,0 -0.36,0.08 -0.44,0.26l-1.68,5.26l-5.54,0c-0.18,0 -0.36,0.12 -0.42,0.3c-0.06,0.2 0.02,0.4 0.16,0.5l4.46,3.24l-1.68,5.26c-0.08,0.18 0,0.38 0.16,0.5c0.06,0.06 0.16,0.1 0.24,0.1c0.1,0 0.2,-0.04 0.28,-0.1l4.46,-3.24l4.46,3.24c0.08,0.06 0.18,0.08 0.28,0.08c0.08,0 0.18,-0.02 0.24,-0.08c0.16,-0.12 0.24,-0.32 0.16,-0.5l-1.68,-5.26l4.46,-3.24c0.14,-0.1 0.22,-0.3 0.16,-0.5c-0.08,-0.18 -0.24,-0.3 -0.42,-0.3l-5.52,0l-1.7,-5.26c-0.08,-0.18 -0.26,-0.26 -0.44,-0.26ZM11,22.66l1.2,3.64l0.22,0.7l4.54,0l-3.68,2.66l0.22,0.7l1.18,3.64l-3.68,-2.66l-3.68,2.66l1.18,-3.64l0.22,-0.7l-3.68,-2.66l4.56,0l0.22,-0.7l1.18,-3.64Z"> </g> </svg>';
        },
        useData: !0
    }
}),
define("/templates/symbols/detail-check.js", {
    name: "symbols/detail-check",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="detail-check" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-3.271,0 -9.729,0 -13,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,3.271 0,9.729 0,13c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c3.271,0 9.729,0 13,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-3.271 0,-9.729 0,-13Z" style="fill:none;stroke-width:1px"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/symbols/detail-checked.js", {
    name: "symbols/detail-checked",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<svg class="detail-checked" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M8.489,15c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.232 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c3.242,-5.361 6.486,-9.443 10.767,-13.559c0.198,-0.192 0.517,-0.185 0.707,0.013c0.192,0.2 0.186,0.516 -0.014,0.707c-4.356,4.189 -7.625,8.344 -10.927,13.896c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004" style="fill-rule:nonzero;"/> <path d="M15.5,20l-13,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-13c0,-1.379 1.121,-2.5 2.5,-2.5l11,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-11,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,13c0,0.827 0.673,1.5 1.5,1.5l13,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-11c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,11c0,1.379 -1.121,2.5 -2.5,2.5" style="fill-rule:nonzero;"/> </g> </svg> ';
        },
        useData: !0
    }
}),
define("/templates/detailview/detail.js", {
    name: "detailview/detail",
    data: {
        "1": function() {
            return " checked";
        },
        "3": function() {
            return "true";
        },
        "5": function() {
            return "false";
        },
        "7": function() {
            return " hidden ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = t.helperMissing, s = this.escapeExpression, l = '<div class="inner"> <div class="top"> <a class="detail-checkbox checkBox';
            return o = t["if"].call(e, e && e.completed, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" role="checkbox" aria-checked="',
            o = t["if"].call(e, e && e.completed, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.program(5, n),
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" data-key-aria-label="smart_list_completed" tabindex="0"> <span data-key-title="contextual_mark_as_completed">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "detail-check", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> <span data-key-title="contextual_mark_as_notcompleted">' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "detail-checked", {
                name: "symbol",
                hash: {},
                data: n
            }))) + '</span> </a> <a class="detail-star" role="checkbox" aria-checked="',
            o = t["if"].call(e, e && e.starred, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.program(5, n),
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" data-key-aria-label="smart_list_starred" tabindex="0"> <span class="star-wrapper ',
            o = t["if"].call(e, e && e.starred, {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += '" data-key-title="contextual_mark_as_starred"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "detail-star", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> <span class="starred-wrapper ',
            o = t.unless.call(e, e && e.starred, {
                name: "unless",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '" data-key-title="contextual_mark_as_unstarred"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "detail-starred", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </span> </a> <div class="title-container"></div> </div> <div class="body"></div> <div class="dropTarget"></div> <div class="bottom"> <a class="detail-close" tabindex="0" data-key-aria-label="button_hide_detail_view" data-key-title="button_hide_detail_view"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "close-right", {
                name: "symbol",
                hash: {},
                data: n
            }))) + ' </a> <a class="detail-trash" role="button" data-key-aria-label="label_delete_task" tabindex="0" data-key-title="label_delete_task"> ' + s((a = t.symbol || e && e.symbol || r,
            a.call(e, "trash", {
                name: "symbol",
                hash: {},
                data: n
            }))) + " </a> </div> </div> ";
        },
        useData: !0
    }
}),
define("/styles/_detail.js", {
    name: "_detail",
    data: "#detail .inner{position:relative;background:#fff;overflow:hidden;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-orient:vertical;-moz-box-orient:vertical;-o-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100vh;}#detail .inner.drop:before{position:absolute;content:'';height:100%;width:100%;z-index:10000;background:rgba(50,138,214,0.05);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border:3px solid rgba(50,138,214,0.4)}#detail .title{min-height:24px;overflow:hidden;padding:16px 50px 14px;font-size:16px;line-height:24px;font-weight:bold;border-bottom:1px solid #ebebeb;}#detail .title textarea,#detail .title pre{font-weight:bold}#detail .title-container{position:relative;z-index:1;}#detail .title-container .title:focus .content-fakable{color:#328ad6}#detail .detail-checkbox:focus span{-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8)}#detail .detail-checkbox{position:absolute;left:18px;top:18px;z-index:5}#detail .star-wrapper,#detail .starred-wrapper{position:absolute;right:15px;top:-4px;z-index:5;width:22px;height:49px}#detail .star-wrapper{fill:rgba(0,0,0,0.3)}#detail .starred-wrapper{fill:#d74e48}#detail .detail-star:focus .star-wrapper{fill:rgba(0,0,0,0.5)}#detail .detail-star:focus .starred-wrapper{fill:#c2312a}#detail .body{background:#fafafa;overflow:auto;padding-bottom:16px;right:0;left:0;overflow-x:hidden;-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}#detail .body .subtask:focus:after,#detail .body .subtask-add:focus:after,#detail .body .note:focus:after,#detail .body .comment:focus:after,#detail .body .file-add:focus:after{content:'';position:absolute;left:7px;right:7px;top:5px;bottom:5px;-webkit-box-shadow:0 0 0 1px rgba(50,138,214,0.8);box-shadow:0 0 0 1px rgba(50,138,214,0.8);pointer-events:none}#detail .body .section-item-file:focus{border:1px solid #328ad6}#detail .body .subtask:focus{z-index:600}#detail .body .detail-close:focus,#detail .body .open-fullscreen-note:focus,#detail .body .start-recording-audio:focus,#detail .body .play-recorded-audio:focus,#detail .body .clear-recorded-audio:focus,#detail .body .upload-recorded-audio:focus,#detail .body .add-sound:focus,#detail .body .add-file:focus,#detail .body .add-dropbox:focus{-webkit-box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8);box-shadow:inset 0 0 0 1px rgba(50,138,214,0.8)}#detail .bottom{position:relative;}#detail .bottom .detail-info{font-size:11px;text-align:center;padding:14px 35px;color:#a3a3a2;}#detail .bottom .detail-info text{display:-webkit-inline-box;display:-moz-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-box;display:inline-flex;max-width:100%;height:15px}#detail .bottom .detail-info .flex{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}#detail .bottom .detail-info .token_0,#detail .bottom .detail-info .token_1{padding:0 4px}#detail .bottom .detail-close,#detail .bottom .detail-trash{position:absolute;bottom:8px;opacity:.6;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)\";filter:alpha(opacity=60);}#detail .bottom .detail-close:hover,#detail .bottom .detail-trash:hover{opacity:.8;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";filter:alpha(opacity=80)}#detail .bottom .detail-close:active,#detail .bottom .detail-trash:active{opacity:1;-ms-filter:none;filter:none}#detail .bottom .detail-close:focus,#detail .bottom .detail-trash:focus{color:#328ad6;fill:#328ad6}#detail .bottom .detail-close{left:8px}#detail .bottom .detail-trash{right:6px}#detail .bottom a:focus .wundercon{color:#328ad6;fill:#328ad6}"
}),
define("/styles/detailview/section.js", {
    name: "detailview/section",
    data: "#wunderlist-base #detail .section{position:relative;padding:8px 0;}#wunderlist-base #detail .section:before{content:'';position:absolute;bottom:0;left:50px;right:0;border-bottom:1px solid #ebebeb}#wunderlist-base #detail .section-item{padding-left:10px;padding-right:10px;position:relative;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-align:center;-moz-box-align:center;-o-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}#wunderlist-base #detail .section-item.section-item-comment{padding-top:16px}#wunderlist-base #detail .section-item.section-item-file{margin:8px 0}#wunderlist-base #detail .section-item .section-delete,#wunderlist-base #detail .section-item .section-icon,#wunderlist-base #detail .section-item .section-attachments{-webkit-align-self:flex-start;align-self:flex-start;-ms-flex-item-align:start;-webkit-flex-shrink:0;flex-shrink:0;height:32px;min-width:32px;fill:#a3a3a2;}#wunderlist-base #detail .section-item .section-delete svg,#wunderlist-base #detail .section-item .section-icon svg,#wunderlist-base #detail .section-item .section-attachments svg{margin:6px}#wunderlist-base #detail .section-item .section-attachments,#wunderlist-base #detail .section-item .section-delete{margin-left:auto;}#wunderlist-base #detail .section-item .section-attachments a,#wunderlist-base #detail .section-item .section-delete a,#wunderlist-base #detail .section-item .section-attachments span,#wunderlist-base #detail .section-item .section-delete span{height:32px;width:32px;display:inline-block}#wunderlist-base #detail .section-item .section-attachments svg,#wunderlist-base #detail .section-item .section-delete svg{fill:#737272}#wunderlist-base #detail .section-item .section-content{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:auto;-ms-flex:auto;flex:auto;margin-right:8px;margin-left:8px;overflow:hidden;}#wunderlist-base #detail .section-item .section-content.top{-webkit-align-self:flex-start;align-self:flex-start;-ms-flex-item-align:start;padding:6px 0}#wunderlist-base #detail .section-item .section-title{white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;font-size:15px;line-height:20px;color:#9fa2a6}#wunderlist-base #detail .section-item .section-description{display:none;font-size:11px}#wunderlist-base #detail .section-item .section-delete{visibility:hidden}#wunderlist-base #detail .section-item.subtask:hover .section-delete,#wunderlist-base #detail .section-item.date:hover .section-delete,#wunderlist-base #detail .section-item.assigned:hover .section-delete,#wunderlist-base #detail .section-item.section-item-comment:hover .section-delete,#wunderlist-base #detail .section-item.subtask:focus .section-delete,#wunderlist-base #detail .section-item.date:focus .section-delete,#wunderlist-base #detail .section-item.assigned:focus .section-delete,#wunderlist-base #detail .section-item.section-item-comment:focus .section-delete{visibility:visible}#wunderlist-base #detail .section-item:focus:after{content:'';position:absolute;left:7px;right:7px;top:5px;bottom:5px;-webkit-box-shadow:0 0 0 1px rgba(50,138,214,0.8);box-shadow:0 0 0 1px rgba(50,138,214,0.8);pointer-events:none}#wunderlist-base #detail .section-item.date .section-description.repeat{display:block;}#wunderlist-base #detail .section-item.date .section-description.repeat.hidden{display:none}#wunderlist-base #detail .section-item.date .select{width:80%}#wunderlist-base #detail .section-item.date.overdue .section-title{color:#b3312d}#wunderlist-base #detail .section-item.date.overdue .date,#wunderlist-base #detail .section-item.date.overdue .reminder{fill:#b3312d}#wunderlist-base #detail .section-item.date .section-title,#wunderlist-base #detail .section-item.assigned .section-title{color:#328ad6}#wunderlist-base #detail .section-item.date .date,#wunderlist-base #detail .section-item.assigned .date,#wunderlist-base #detail .section-item.date .assigned,#wunderlist-base #detail .section-item.assigned .assigned,#wunderlist-base #detail .section-item.date .reminder,#wunderlist-base #detail .section-item.assigned .reminder{fill:#328ad6}#wunderlist-base #detail .section-item.date .assigned,#wunderlist-base #detail .section-item.assigned .assigned{display:none}#wunderlist-base #detail .section-item.editing .section-delete{display:block}#wunderlist-base #detail .section-item.editing .section-edit{display:inline-block}html[dir=rtl] #wunderlist-base #detail .section:before{right:50px;left:0}"
}),
define("views/TaskDetail/TaskDetailView", ["application/runtime", "wunderbits/helpers/date", "wunderbits/data/keycodes", "helpers/domtools", "wunderbits/helpers/selection", "models/TaskModel", "views/TaskDetail/TaskDetailAssignView", "views/TaskDetail/TaskDetailDateView", "views/TaskDetail/TaskDetailReminderView", "views/TaskDetail/TaskDetailNoteView", "views/TaskDetail/TaskDetailTitleView", "views/TaskDetail/TaskDetailFilesView", "views/TaskDetail/TaskDetailSubtasksView", "views/TaskDetail/TaskDetailSmartCardsView", "views/TaskDetail/Comments/TaskDetailInfoView", "views/TaskDetail/Comments/TaskDetailCommentsView", "views/TaskDetail/Comments/TaskDetailCommentListView", "views/TaskDetail/Controllers/TaskDetailClickController", "views/TaskDetail/Controllers/TaskDetailFocusController", "views/TaskDetail/Controllers/TaskDetailEditController", "views/TaskDetail/Controllers/TaskDetailCommentsController", "wunderbits/WBViewPresenter", "wunderbits/WBContentFakable", "wunderbits/WBValidationHelper", "wunderbits/WBBlurHelper", "project!core", "partial!symbols/trash", "partial!symbols/close-right", "partial!symbols/detail-starred", "partial!symbols/detail-star", "partial!symbols/detail-check", "partial!symbols/detail-checked", "template!detailview/detail", "style!_detail", "style!detailview/section", "style!checkBox"], function(e, t, i, n, o, a, r, s, l, c, d, u, m, p, g, f, b, h, v, _, w, k, x, y, C, T, S, L, D, j, M, z, I, A, P, B, F) {
    var E = e._
      , O = e.$
      , R = e.global
      , $ = C
      , W = y
      , N = k.prototype
      , V = T.WBDeferred;
    return k.extend({
        template: I,
        id: "detail",
        styles: [A, P, B],
        "implements": [h, v, _, w],
        emits: {
            click: "toggle:view",
            "click .detail-checkbox": "toggle:done",
            "click a.detail-star": "toggle:starred",
            "click .detail-trash": "click:delete",
            "click .detail-close": "click:close",
            "touchstart .detail-checkbox": "toggle:done",
            "touchstart a.detail-star": "toggle:starred",
            "keydown .title": "focus:fromTab",
            "keydown .detail-checkbox": "focus:fromTab",
            "keydown a.detail-star": "focus:fromTab",
            "keydown div.detail-date:not(.editing)": "focus:fromTab",
            "keydown div.detail-reminder:not(.editing)": "focus:fromTab",
            "keydown div.detail-assign:not(.editing)": "focus:fromTab",
            "keydown .subtasks": "focus:fromTab",
            "keydown .note": "focus:fromTab",
            "keydown .files-add": "focus:fromTab",
            "keydown .comments-add textarea": "focus:fromTab",
            "keydown a.detail-trash": "focus:fromTab",
            "keydown a.detail-close": "focus:fromTab"
        },
        observes: {
            events: {
                "scroll:top": "scrollToTop",
                "route:addFile": "focusAddFile",
                "cancel:changes": "cancelSubviewChanges",
                "focus:addComments": "focusAddComments",
                "focus:listComments": "focusListComments"
            },
            runtime: {
                "detail:scrollToEnd": "scrollToEnd",
                "detail:close": "closeSelf",
                "detail:navigate": "navigate",
                "detail:checkBounds": "debouncedUpdateCommentsInterface",
                "window:resize": "debouncedUpdateCommentsInterface"
            },
            settings: {
                "change:show_completed_items": "onUpdateDone"
            },
            commentsListSubView: {
                lastComment: "pipeLastComment"
            }
        },
        initialize: function() {
            var t = this;
            t.debouncedUpdateCommentsInterface = t.debounce(t.updateCommentsInterface, 250),
            t.commentsSubView = t.addSubview(new f()),
            t.commentsListSubView = t.addSubview(new b()),
            t.titleSubView = t.addSubview(new d()),
            t.settings = e.settings,
            N.initialize.apply(t, arguments),
            t.state = new e.Backbone.Model(),
            t.assignSubView = t.addSubview(new r()),
            t.dateSubView = t.addSubview(new s()),
            t.reminderSubView = t.addSubview(new l()),
            t.noteSubView = t.addSubview(new c()),
            t.filesSubView = t.addSubview(new u()),
            t.infoSubView = t.addSubview(new g()),
            t.smartCartdsView = t.addSubview(new p());
        },
        renderData: {
            completed: F,
            starred: F
        },
        attributes: {
            role: "contentinfo"
        },
        formatData: function(e) {
            var t = this.model;
            return e.completed = t.isCompleted(),
            e.starred = t.isStarred(),
            e;
        },
        render: function() {
            var e = this;
            return N.render.call(e, e.formatData(e.renderData)),
            e.subtasksSubView = e.addSubview(new m({
                model: e.model
            })),
            e.hasRenderedOnce || e.renderTitleView().done(e.renderInitialTitleHeight, e),
            e.renderSubviews(),
            e.bindToBodyScroll(),
            e.hasRenderedOnce = !0,
            e;
        },
        renderTitleView: function() {
            var e = this
              , t = new V();
            return e.requestAnimationFrame(function() {
                var i = e.titleSubView.render({
                    model: e.model,
                    isShared: e.isShared
                }).el;
                e.titleSubView.renderWithModel(e.model),
                e.$(".title-container").append(i),
                e.titleSubView.renderTitle(),
                t.resolve();
            }),
            t.promise();
        },
        renderInitialTitleHeight: function() {
            var e = this;
            e.requestAnimationFrame(function() {
                var t = e.$("div.title")
                  , i = e.titleSubView.defaultBodyContainerTop + (t.height() - e.titleSubView.defaultTitleContainerHeight) + "px";
                e.$(".body").not(".clone").css({
                    top: i
                });
            });
        },
        renderSubviews: function() {
            var t = this;
            t.requestAnimationFrame(function() {
                var i = t.$el
                  , n = t.$(".body")
                  , o = t.model.attributes
                  , a = 250
                  , r = t.$el.position().left + t.$el.width() >= O(R).width() ? a : 0
                  , s = t.animationDeferred = t.getAnimationPromise(!!r, a);
                t.hasRenderedOnce && s.done(function() {
                    t.titleSubView.renderWithModel(t.model);
                }),
                o.completed && i.addClass("complete");
                var l = {
                    model: t.model,
                    delay: r,
                    animationDeferred: s,
                    isShared: t.isShared
                }
                  , c = t.infoSubView.render(l).el
                  , d = t.commentsSubView.render(l).el
                  , u = t.renderAssignView()
                  , m = t.dateSubView.render(l).el
                  , p = t.reminderSubView.render(l).el
                  , g = t.subtasksSubView.render(l).el
                  , f = t.noteSubView.render(l).el
                  , b = t.filesSubView.render(l).el
                  , h = t.commentsListSubView.render(l).el
                  , v = t.smartCartdsView.render(l).el;
                if (!t.hasRederedSubviewsOnce) {
                    var _ = document.createDocumentFragment();
                    [u, m, p, g, f, b, v, h].forEach(function(e) {
                        _.appendChild(e);
                    }),
                    n[0].appendChild(_),
                    [d, c].forEach(function(e) {
                        t.$(".bottom")[0].appendChild(e);
                    }),
                    t.hasRederedSubviewsOnce = !0;
                }
                e.trigger("detail:rendered", t.model.id),
                t.defer(t.updateCommentsInterface, t);
            });
        },
        renderAssignView: function() {
            var e = this;
            return e.assignSubView.render({
                model: e.model,
                isShared: e.isShared,
                animationDeferred: e.animationDeferred
            }).el;
        },
        renderWithModel: function(e, t) {
            var i = this;
            return i.onClose = t && t.onClose,
            i.isShared = t && t.isShared,
            e === i.model ? i.trigger("scroll:top") : (i.setupModelBinds(e),
            void (i.hasRenderedOnce ? (i.onUpdateStarred(),
            i.onUpdateDone(),
            i.renderSubviews()) : i.render()));
        },
        getAnimationPromise: function(e, t) {
            var i = this
              , o = new V();
            if (e) {
                var a = function() {
                    o.resolve();
                };
                n.once(i.el, "transitionend", a),
                setTimeout(function() {
                    o.resolve();
                }, t || 1e3);
            } else
                o.resolve();
            return o.promise();
        },
        bindToBodyScroll: function() {
            var t = this;
            t.$(".body").scroll(function() {
                e.trigger("interface:scroll"),
                t.updateCommentsInterface();
            });
        },
        setupModelBinds: function(e) {
            var t = this;
            t.model && t.unbindFromTarget(t.model),
            t.model = e || t.model,
            W.classCheckAttribute(t, "model", a, "TaskModel"),
            t.bindTo(t.model, "change:starred", t.onUpdateStarred),
            t.bindTo(t.model, "change:completed", t.onUpdateDone),
            t.bindTo(t.model, "change:list_id", t.closeSelf),
            t.bindTo(t.model, "change:list_id", t.renderAssignView);
        },
        pipeLastComment: function(e) {
            this.commentsSubView.trigger("lastComment", e);
        },
        navigate: function(t) {
            var i = this;
            "left" === t && ($.run(),
            e.trigger("route:" + i.model.route()));
        },
        onUpdateStarred: function() {
            var e = this
              , t = e.model.isStarred();
            e.$(".star-wrapper").toggleClass("hidden", t),
            e.$(".starred-wrapper").toggleClass("hidden", !t);
        },
        onUpdateDone: function() {
            var t = this;
            if (t.model) {
                var i = t.model.isCompleted()
                  , n = t.$(".detail-checkbox")
                  , o = "true" === e.settings.attributes.show_completed_items;
                i && !o && t.closeSelf(),
                t.$el.toggleClass("complete", i),
                n.toggleClass("checked", i);
            }
        },
        closeSelf: function(e) {
            var t = this;
            "function" == typeof e ? E.defer(e) : t.trigger("close");
        },
        scrollToTop: function(e) {
            var t = this
              , i = t.$(".body");
            e ? i.animate({
                scrollTop: 0
            }, 100) : i.scrollTop(0);
        },
        scrollToEnd: function(e, t) {
            var i = this
              , n = i.$(".body")
              , o = n[0].scrollHeight;
            t && (e = !i.wasScrolledToBottom),
            e ? n.animate({
                scrollTop: o
            }, 500) : n.scrollTop(o);
        },
        updateCommentsInterface: function() {
            var e = this
              , t = e.isScrolledToBottom()
              , i = e.wasScrolledToBottom = t.isScrolledToBottom
              , n = t.isScrolledToOffsetBottom;
            e.$(".last-comment").toggleClass("hidden", n),
            i && e.model && e.trigger("comments:read:all");
        },
        isScrolledToBottom: function() {
            var e, t = this, i = t.$(".body"), n = t.$(".comments-list li").last(), o = i.scrollTop() + i.outerHeight(), a = i.length && i[0].scrollHeight, r = o >= a, s = !1;
            if (n.length) {
                var l = 37
                  , c = n.outerHeight() - l;
                e = a - c;
            }
            return s = o >= (e || 0),
            {
                isScrolledToBottom: r,
                isScrolledToOffsetBottom: s
            };
        },
        cancelSubviewChanges: function() {
            var e = this;
            e.dateSubView.cancelChanges(),
            e.reminderSubView.onCancelChanges(),
            e.assignSubView.cancelChanges();
        },
        focusAddComments: function() {
            this.commentsSubView.$("textarea").focus();
        },
        focusListComments: function(e) {
            this.commentsListSubView.focusFirstComment(e);
        },
        focusCompleted: function() {
            this.$(".detail-checkbox").focus();
        },
        focusStarred: function() {
            this.$(".detail-star").focus();
        },
        focusListSubtasks: function(e) {
            this.subtasksSubView.focusFirstSubtask(e);
        },
        focusAddSubtasks: function() {
            this.$(".subtask-add").focus();
        },
        focusDelete: function() {
            this.$(".detail-trash").focus();
        },
        focusCloseDetailView: function() {
            this.$(".detail-close").focus();
        },
        focusAddFile: function() {
            this.filesSubView.focusFirstUploader();
        },
        focusListFiles: function(e) {
            this.filesSubView.focusFirstFile(e);
        },
        focusOpenFullscreenButton: function() {
            this.noteSubView.focusFullscreenButton();
        }
    });
}),
define("/templates/sounds/audioElement.js", {
    name: "sounds/audioElement",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return '<audio id="' + r((o = t.name || e && e.name,
            typeof o === a ? o.call(e, {
                name: "name",
                hash: {},
                data: n
            }) : o)) + '" class="hidden"> <source class="ogg" src="" type="audio/ogg"/> <source class="m4a" src="" type="audio/mp4"/> </audio>';
        },
        useData: !0
    }
}),
define("views/Sounds/SoundPlayer", ["application/runtime", "helpers/URLResolver", "wunderbits/WBView", "template!sounds/audioElement"], function(e, t, i, n) {
    var o = e.$
      , a = i.prototype
      , r = {
        bell: "wl3-notification",
        complete: "wl3-complete"
    };
    return i.extend({
        id: "audio-player",
        templates: {
            audioElement: n
        },
        initialize: function() {
            var t = this;
            a.initialize.apply(t, arguments),
            t.bindTo(e, "sounds:play", t.debounce(t.play, 250, !0));
        },
        render: function() {
            var e = this;
            return a.render.apply(e, arguments),
            Object.keys(r).forEach(function(i) {
                var n = r[i];
                e.el.appendChild(o(e.templates.audioElement({
                    name: n
                }))[0]);
                var a = e.$("#" + n);
                try {
                    a.find(".ogg").attr("src", t.resolve("sounds/" + n + ".ogg")),
                    a.find(".m4a").attr("src", t.resolve("sounds/" + n + ".m4a"));
                } catch (s) {
                    console.error("unable to set audio src - sound is likely disabled", s);
                }
            }),
            e;
        },
        play: function(e) {
            function t() {
                n.removeEventListener("canplaythrough", t),
                n.pause(),
                n.currentTime = 0,
                n.play();
            }
            var i = this
              , n = i.$el.find("#" + r[e])[0];
            n && n.load && (n.load(),
            n.addEventListener("canplaythrough", t));
        }
    });
}),
define("/templates/print/printItem.js", {
    name: "print/printItem",
    data: {
        "1": function() {
            return ' <span class="task-starred"></span> ';
        },
        "3": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="duedate"> ' + r((o = t.due_date || e && e.due_date,
            typeof o === a ? o.call(e, {
                name: "due_date",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "5": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <span class="assignee">' + r((o = t.assignee_name || e && e.assignee_name,
            typeof o === a ? o.call(e, {
                name: "assignee_name",
                hash: {},
                data: n
            }) : o)) + "</span> ";
        },
        "7": function(e, t, i, n) {
            var o, a = ' <ul class="subtasks"> ';
            return o = t.each.call(e, e && e.subtasks, {
                name: "each",
                hash: {},
                fn: this.program(8, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (a += o),
            a + " </ul> ";
        },
        "8": function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = ' <li class="';
            return o = t["if"].call(e, e && e.completed, {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l + '"> ' + s((a = t.title || e && e.title,
            typeof a === r ? a.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : a)) + " </li> ";
        },
        "9": function() {
            return "done";
        },
        "11": function(e, t, i, n) {
            var o, a = "function", r = this.escapeExpression;
            return ' <div class="note">' + r((o = t.note || e && e.note,
            typeof o === a ? o.call(e, {
                name: "note",
                hash: {},
                data: n
            }) : o)) + "</div> ";
        },
        compiler: [5, ">= 2.0.0"],
        main: function(e, t, i, n) {
            var o, a, r = "function", s = this.escapeExpression, l = "";
            return o = t["if"].call(e, e && e.starred, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t["if"].call(e, e && e.due_date, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t["if"].call(e, e && e.assignee_name, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += ' <span class="title">' + s((a = t.title || e && e.title,
            typeof a === r ? a.call(e, {
                name: "title",
                hash: {},
                data: n
            }) : a)) + "</span> ",
            o = t["if"].call(e, e && e.subtasks, {
                name: "if",
                hash: {},
                fn: this.program(7, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l += " ",
            o = t["if"].call(e, e && e.note, {
                name: "if",
                hash: {},
                fn: this.program(11, n),
                inverse: this.noop,
                data: n
            }),
            (o || 0 === o) && (l += o),
            l;
        },
        useData: !0
    }
}),
define("views/Print/PrintTaskItem", ["application/runtime", "actions/Factory", "wunderbits/WBView", "wunderbits/helpers/date", "vendor/moment", "template!print/printItem"], function(e, t, i, n, o, a) {
    var r = i.prototype;
    return i.extend({
        template: a,
        tagName: "li",
        initialize: function() {
            var e = this;
            r.initialize.apply(e, arguments),
            e.noteLookup = t.noteLookup(),
            e.subtaskLookup = t.subTaskLookup(),
            e.userLookup = t.userLookup();
        },
        render: function() {
            var t = this
              , i = t.model.toJSON()
              , n = t.subtaskLookup.getSubTaskCollection(i.id)
              , a = t.noteLookup.getNoteCollectionForTask(i.id);
            return i.due_date && (i.due_date = o(i.due_date, "YYYY-MM-DD").format(e.settings.attributes.date_format)),
            i.assignee_id && (i.assignee_name = t.getAssigneeNameFromId(i.assignee_id, i.list_id)),
            n.length && (i.subtasks = n.toJSON()),
            a.length && (i.note = a.models[0].attributes.content),
            i.completed && t.$el.addClass("done"),
            r.render.call(t, i),
            t;
        },
        getAssigneeNameFromId: function(e, t) {
            var i = this.userLookup.getAssignableCollectionForList(t)
              , n = i.get(e);
            return n ? n.attributes.name : "";
        }
    });
}),
define("/templates/print/print.js", {
    name: "print/print",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<h1></h1> <ul class="uncompleted"></ul> <ul class="completed"></ul> <div class="note"></div>';
        },
        useData: !0
    }
}),
define("/templates/print/printSmartList.js", {
    name: "print/printSmartList",
    data: {
        compiler: [5, ">= 2.0.0"],
        main: function() {
            return '<h2 class="title"><span></span></h2> <ul class="uncompleted"></ul> <ul class="completed"></ul>';
        },
        useData: !0
    }
}),
define("views/Print/PrintListItem", ["application/runtime", "actions/Factory", "wunderbits/WBView", "views/Print/PrintTaskItem", "template!print/print", "template!print/printSmartList"], function(e, t, i, n, o, a) {
    var r = e._
      , s = i.prototype;
    return i.extend({
        templates: {
            lists: o,
            smartLists: a
        },
        initialize: function(e) {
            var i = this;
            e = e || {},
            i.template = i.templates[e.isSmartList ? "smartLists" : "lists"],
            s.initialize.apply(i, arguments),
            i.listId = e.listId,
            i.taskIds = e.taskIds,
            e.isSmartList ? (i.isSmartList = !0,
            i.smartListModels = e.smartListModels,
            i.smartListTitle = e.smartListTitle) : (i.lists = t.listLookup().allLists,
            i.tasks = t.taskLookup().getTaskCollection(i.listId));
        },
        render: function() {
            var e = this;
            return s.render.apply(e, arguments),
            e.taskIds && e.taskIds.length ? e._printselectedItems() : e._printList(),
            e;
        },
        _setIcon: function(e) {
            var t = this;
            t.$("h1").addClass(e);
        },
        _setTitle: function(e) {
            var t = this;
            t.isSmartList ? t.$("h2.title span").text(e) : t.$("h1").text(e);
        },
        _printselectedItems: function() {
            var e = this
              , t = document.createDocumentFragment()
              , i = e.$("ul.uncompleted")
              , o = e._filterModelsByIds(e._getModels(), e.taskIds);
            r.each(o, function(i) {
                t.appendChild(e.addSubview(new n({
                    model: i
                })).render().el);
            }),
            i.append(t),
            e._setTitle(e._getListName()),
            e._setIcon(e.listId);
        },
        _getListName: function() {
            var t, i = this;
            if (i.isSmartList)
                t = i.smartListTitle;
            else {
                var n = i.lists.get(i.listId);
                t = n ? n.isInbox() ? e.language.getText("smart_list_inbox") : n.attributes.title : "";
            }
            return t;
        },
        _getModels: function() {
            var e = this;
            return e.isSmartList ? e.smartListModels : e.tasks.models;
        },
        _printList: function() {
            var t = this
              , i = document.createDocumentFragment()
              , o = document.createDocumentFragment()
              , a = t.$("ul.uncompleted")
              , s = t.$("ul.completed")
              , l = t._getListName()
              , c = "true" === e.settings.attributes.print_completed_items || "completed" === t.listId;
            r.each(t._getModels(), function(e) {
                e.attributes.completed ? c && o.appendChild(t.addSubview(new n({
                    model: e
                })).render().el) : i.appendChild(t.addSubview(new n({
                    model: e
                })).render().el);
            }),
            a.append(i);
            var d = o.childNodes.length > 0;
            c && d && ("completed" !== t.listId && s.before('<h2 class="completed-heading"><span>' + e.language.getText("smart_list_completed") + "</span></h2>"),
            s.append(o)),
            t._setTitle(l),
            t._setIcon(t.listId);
        },
        _filterModelsByIds: function(e, t) {
            return r.filter(e, function(e) {
                return r.indexOf(t, e.attributes.id) > -1;
            });
        }
    });
}),
