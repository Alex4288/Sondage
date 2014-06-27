define(["app", "tpl!apps/sondages_contenu/show/templates/missing.tpl"], function(SondageManager, missingTpl) {
    SondageManager.module("SondagesContenuApp.Show.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.MissingSondage = Marionette.ItemView.extend({
            template: missingTpl
        });
    });

    return SondageManager.SondagesContenuApp.Show.View;
});
