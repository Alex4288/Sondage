define(["app"
      , "tpl!apps/sondages/compose/common/templates/form.tpl"
   , "backbone.syphon"], function(SondageManager, FormTpl) {
    SondageManager.module("SondagesApp.Compose.Common.Views", function(Views, SondageManager, Backbone, Marionette, $, _) {
        
        Views.Form = Marionette.Layout.extend({
            template: FormTpl,
            events: {
                "click button.js-submit": "submitClicked"
            },
            submitClicked: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            onRender: function() {
                if (!this.options.asModal) {
                    var $title = $("<h1>", {text: this.title});
                    this.$el.prepend($title);
                }
            },
            onShow: function() {
                if(this.options.asModal) {
                    this.$el.dialog({
                        modal: true,
                        title: this.title,
                        width: "auto"
                    });
                }
            },
            onFormDataInvalid: function(errors) {
                var $view = this.$el;
                
                var clearFormErrors = function() {
                    var $form = $view.find("form");
                    $form.find(".help-inline.error").each(function() {
                        $(this).removeClass("error");
                    });
                };
                
                var markErrors = function(value, key) {
                    var $controlGroup = $view.find("#question-" + key).parent();
                    var $errorEl = $("<span>",
                                        { class: "help-inline error", text: value });
                    $controlGroup.append($errorEl).addClass("error");
                };
                
                clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    });
    return SondageManager.SondagesApp.Compose.Common.Views;
});










//        Views.Layout = Marionette.Layout.extend({
//            template: LayoutTpl,
//            regions: {
//                panelRegion: "#panel-region",
//                : "#questions-region"
//            }
//        });
//
//        Views.Panel = Marionette.ItemView.extend({
//            template: PanelTpl,
//            triggers: {
//                "click button.js-new": "question:new"
//            }
//        });
//
//        Views.Reponse = Backbone.Marionette.ItemView.extend({
//            tagName: "tr",
//            template: ListItemTpl,
//            triggers: {
//                "click td a.js-edit": "question:edit",
//                "click button.js-delete": "question:delete"
//            },
//            events: {
//                "click": "highlightName"
//            },
//            flash: function(cssClass) {
//                var $view = this.$el;
//                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
//                    setTimeout(function() {
//                        $view.toggleClass(cssClass);
//                    }, 500);
//                });
//            },
//            highlightName: function(e) {
//                this.$el.toggleClass("Attention");
//            },
//            remove: function() {
//                this.$el.fadeOut(function() {
//                    $(this).remove();
//                });
//            }
//        });
//
//        var NoQuestionsView = Backbone.Marionette.ItemView.extend({
//            template: MissingTpl,
//            tagName: "tr",
//            className: "alert"
//        });
//
//        Views.Questions = Backbone.Marionette.CompositeView.extend({
//            tagName: "table",
//            className: "table table-hover",
//            template: ListTpl,
//            emptyView: NoQuestionsView,
//            itemView: Views.Question,
//            itemViewContainer: "tbody",
//            initialize: function() {
//                this.listenTo(this.collection, "reset", function() {
//                    this.appendHtml = function(collectionView, itemView, index) {
//                        collectionView.$el.append(itemView.el);
//                    };
//                });
//            },
//            itemViewOptions: {
//                typesQuestionId: SondageManager.Entities.TypeQuestionId
//            },
//            onCompositeCollectionRendered: function() {
//                this.appendHtml = function(collectionView, itemView, index) {
//                    collectionView.$el.prepend(itemView.el);
//                };
//            }
//        });
//    });
//
//    return SondageManager.SondagesApp.Compose.Views;
//});
