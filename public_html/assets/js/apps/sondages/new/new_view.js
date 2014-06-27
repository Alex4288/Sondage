define(["app"
      , "apps/sondages/common/views"], function(SondageManager, CommonViews) {
    SondageManager.module("SondagesApp.New.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Sondage = CommonViews.Form.extend({
            title: "Nouveau Sondage",
            onRender: function() {
                this.$(".js-submit").text("Créer Sondage");
            }
        });
    });

    return SondageManager.SondagesApp.New.View;
});
