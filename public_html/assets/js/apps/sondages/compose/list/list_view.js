define(["app"
            , "tpl!apps/sondages/compose/list/templates/layout.tpl"
            , "tpl!apps/sondages/compose/list/templates/panel.tpl"
            , "tpl!apps/sondages/compose/list/templates/missing.tpl"
            , "tpl!apps/sondages/compose/list/templates/list.tpl"
            , "tpl!apps/sondages/compose/list/templates/list_item.tpl"
            , "entities/type_sondage_id"], function(SondageManager, LayoutTpl, PanelTpl, MissingTpl, ListTpl, ListItemTpl) {
    SondageManager.module("SondagesApp.Common.Views", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Layout = Marionette.Layout.extend({
            template: LayoutTpl,
            regions: {
                panelRegion: "#panel-region",
                questionRegion: "#question-region"
            }
        });
        View.Panel = Marionette.ItemView.extend({
            template: PanelTpl,
            triggers: {
                "click button.js-new": "question:new"
            }
        });
        View.Question = Backbone.Marionette.ItemView.extend({
            tagName: "tr",
            template: ListItemTpl,
            initialize: function() {
                console.log(this.model);
            },
            triggers: {
                "click td a.js-edit": "question:edit",
                "click button.js-delete": "question:delete"
            },
            events: {
                "click": "highlightName"
            },
            flash: function(cssClass) {
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            },
            highlightName: function(e) {
                this.$el.toggleClass("Attention");
            },
            remove: function() {
                this.$el.fadeOut(function() {
                    $(this).remove();
                });
            }
        });
        var NoQuestionsView = Backbone.Marionette.ItemView.extend({
            template: MissingTpl,
            tagName: "tr",
            className: "alert"
        });


        View.Questions = Backbone.Marionette.CompositeView.extend({
            tagName: "table",
            className: "table table-hover",
            template: ListTpl,
            emptyView: NoQuestionsView,
            itemView: View.Question,
            itemViewContainer: "tbody",
            initialize: function() {
                this.listenTo(this.collection, "reset", function() {
                    this.appendHtml = function(collectionView, itemView, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },
            itemViewOptions: {
                typesQuestionId: SondageManager.Entities.TypeQuestionId
            }
            ,
            onCompositeCollectionRendered: function() {
                this.appendHtml = function(collectionView, itemView, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });

    });
    return SondageManager.SondagesApp.Common.Views;
});
