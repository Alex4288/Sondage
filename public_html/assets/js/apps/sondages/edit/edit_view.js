define(["app"
      , "apps/sondages/common/views"], function(SondageManager, CommonViews) {
    SondageManager.module("SondagesApp.Edit.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Sondage = CommonViews.Form.extend({
            initialize: function() {
                View.Sondage.__super__.initialize.apply(this, arguments);
                this.title = "Modifier " + this.model.get("title");
            },
            onRender: function() {
                if (this.options.generateTitle) {
                    var $title = $("<h1>", {text: this.title});
                    this.$el.prepend($title);
                }
                this.$(".js-submit").text("Modifier Sondage");
            }
        });
    });

    return SondageManager.SondagesApp.Edit.View;
});
