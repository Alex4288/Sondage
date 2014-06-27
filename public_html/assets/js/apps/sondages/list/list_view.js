define(["app"
            , "tpl!apps/sondages/list/templates/layout.tpl"
            , "tpl!apps/sondages/list/templates/panel.tpl"
            , "tpl!apps/sondages/list/templates/missing.tpl"
            , "tpl!apps/sondages/list/templates/list.tpl"
            , "tpl!apps/sondages/list/templates/list_item.tpl"
            , "entities/type_sondage_id"], function(SondageManager, LayoutTpl, PanelTpl, MissingTpl, ListTpl, ListItemTpl) {
    SondageManager.module("SondagesApp.List.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Layout = Marionette.Layout.extend({
            template: LayoutTpl,
            regions: {
                panelRegion: "#panel-region",
                sondagesRegion: "#sondages-region"
            }
        });

        View.Panel = Marionette.ItemView.extend({
            template: PanelTpl,
            triggers: {
                "click button.js-compose": "sondage:compose",
                "click button.js-new": "sondage:new"
            },
            events: {
                "click button.js-filter": "filterClicked"
            },
            ui: {
                criterion: "input.js-filter-criterion"
            },
            filterClicked: function() {
                var criterion = this.$(".js-filter-criterion").val();
                this.trigger("sondages:filter", criterion);
            },
            onSetFilterCriterion: function(criterion) {
                $(this.ui.criterion).val(criterion);
            }
        });

        View.Sondage = Backbone.Marionette.ItemView.extend({
            tagName: "tr",
            template: ListItemTpl,
            templateHelpers: function() {
                return {
                    typeStr: this.options.typesSondageId.findWhere({id: parseInt(this.model.get('type_sondage'))}).get('description')
                };
            },
            triggers: {
                "click td a.js-compose": "sondage:compose",
                "click td a.js-edit": "sondage:edit",
                "click button.js-delete": "sondage:delete",
                "click button.js-publish": "sondage:publish",
                "click .js-showUsers": "sondage:user:show"
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

        var NoSondagesView = Backbone.Marionette.ItemView.extend({
            template: MissingTpl,
            tagName: "tr",
            className: "alert"
        });

        View.Sondages = Backbone.Marionette.CompositeView.extend({
            tagName: "table",
            className: "table table-hover",
            template: ListTpl,
            emptyView: NoSondagesView,
            itemView: View.Sondage,
            itemViewContainer: "tbody",
            initialize: function() {
                this.listenTo(this.collection, "reset", function() {
                    this.appendHtml = function(collectionView, itemView, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },
            itemViewOptions: {
                typesSondageId: SondageManager.Entities.TypeSondageId
            },
            onCompositeCollectionRendered: function() {
                this.appendHtml = function(collectionView, itemView, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
    });

    return SondageManager.SondagesApp.List.View;
});