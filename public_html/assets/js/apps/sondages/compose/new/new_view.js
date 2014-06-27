define(["app"
      , "apps/sondages/compose/common/views"], function(SondageManager, CommonViews) {
    SondageManager.module("SondagesApp.New.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Question = CommonViews.Form.extend({
            title: "Nouvelle Question",
            onRender: function() {
                this.$(".js-submit").text("Créer Question");
            }
        });
    });

    return SondageManager.SondagesApp.New.View;
});
