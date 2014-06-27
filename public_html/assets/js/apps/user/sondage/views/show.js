define(["app"
            , "tpl!apps/user/sondage/templates/sondage_contenu_item.tpl"
            , "tpl!apps/user/sondage/templates/sondage_contenu_missing.tpl"
            , "tpl!apps/user/sondage/templates/sondage_contenu_quantitative.tpl"
            , "tpl!apps/user/sondage/templates/sondage_contenu_ranking.tpl"
            , "entities/sondage"
            , "entities/type_sondage_id"], function(SondageManager, SondageContenuItemTpl, SondageContenuMissingTpl, SondageContenuQuantitativeTpl, SondageContenuRankingTpl) {
    SondageManager.module("UserApp.Sondage.Views", function(Views, SondageManager, Backbone, Marionette, $, _) {

        var MissingSondageContenuView = Marionette.ItemView.extend({
            template: SondageContenuMissingTpl
        });

        var templates = [null, SondageContenuItemTpl, SondageContenuRankingTpl, SondageContenuQuantitativeTpl];

        var SondageContenuItemView = Marionette.ItemView.extend({
            triggers: {
                "click .js-up": "user:monter",
                "click .js-down": "user:descendre"
            },
            getTemplate: function() {
                return templates[this.options.type_sondage];
            }});

        Views.SondageContenuView = Marionette.CollectionView.extend({
            tagName: 'form',
            itemView: SondageContenuItemView,
            emptyView: MissingSondageContenuView,
            itemViewOptions: function() {
                return {type_sondage: this.model.get('type_sondage')};
            },
            getResultats: function() {
                return $('input[name="sondage"]:checked').val();
            }
        });

    });
    return SondageManager.UserApp.Sondage.Views.SondageContenuView;
});