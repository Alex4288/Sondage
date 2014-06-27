define(["app", "apps/sondages_contenu/common/views"], function(SondageManager, CommonViews) {
    SondageManager.module("SondagesContenuApp.Edit.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.ContenuSondage = CommonViews.Form.extend({
            title: "Modifier Réponse",
            
            initialize: function() {
                View.ContenuSondage.__super__.initialize.apply(this, arguments);
                this.intitule = "Modifier " + this.model.get("intitule");
            },
            onRender: function() {
                if (this.options.generateIntitule) {
                    var $intitule = $("<h1>", {text: this.intitule});
                    this.$el.prepend($intitule);
                }
                this.$(".js-submit").text("Modifier Réponse");
            }
        });
    });

    return SondageManager.SondagesContenuApp.Edit.View;
});
