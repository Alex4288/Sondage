define(["app"
      , "apps/sondages_contenu/common/views"], function(SondageManager, CommonViews) {
    SondageManager.module("SondagesContenuApp.New.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Sondage_Contenu = CommonViews.Form.extend({
            title: "Nouvelle Réponse",
            onRender: function() {
                this.$(".js-submit").text("Créer Réponse");
            }
        });
    });

    return SondageManager.SondagesContenuApp.New.View.Sondage_Contenu;
});
