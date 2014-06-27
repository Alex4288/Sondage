define(["app"
            , "tpl!apps/sondages_contenu/list/templates/layout.tpl"
            , "tpl!apps/sondages_contenu/list/templates/panel.tpl"
            , "tpl!apps/sondages_contenu/list/templates/missing.tpl"
            , "tpl!apps/sondages_contenu/list/templates/list.tpl"
            , "tpl!apps/sondages_contenu/list/templates/list_item.tpl"
            , "entities/type_sondage_id"], function(SondageManager, LayoutTpl, PanelTpl, MissingTpl, ListTpl, ListItemTpl) {
    SondageManager.module("SondagesContenuApp.List.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Layout = Marionette.Layout.extend({
            template: LayoutTpl,
            regions: {
                sondagesContenuRegion: "#sondages-contenu-region",
                sondagesParametresRegion: "#sondages-parametres-region"
            }
        });

        View.Panel = Marionette.ItemView.extend({
            template: PanelTpl,
            triggers: {
                "click button.js-new": "sondageContenu:new"
            }
        });

        View.Sondage = Marionette.ItemView.extend({
            tagName: "tr",
            template: ListItemTpl,
            triggers: {
                "click td a.js-edit": "sondage:edit"
            },
            events: {
                "click": "highlightName",
                "click button.js-delete": "deleteClicked"
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
                this.$el.toggleClass("Warning");
            },
            deleteClicked: function(e) {
                e.stopPropagation();
                this.model.collection.remove(this.model);
            },
            remove: function() {
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var NoSondagesView = Backbone.Marionette.ItemView.extend({
            template: MissingTpl,
            tagName: "tr",
            className: "alert"
        });

        View.SondageContenus = Backbone.Marionette.CompositeView.extend({
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
            onCompositeCollectionRendered: function() {
                this.appendHtml = function(collectionView, itemView, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
    });

    return SondageManager.SondagesContenuApp.List.View;
    ;
});
