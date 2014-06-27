define(["app"
      , "apps/sondages/compose/common/views"], function(SondageManager, CommonViews) {
    SondageManager.module("SondagesApp.Edit.View", function(View, SondageManager, Backbone, Marionette, $, _) {
        View.Question = CommonViews.Form.extend({
            initialize: function() {
                View.Question.__super__.initialize.apply(this, arguments);
                this.title = "Modifier Question";
            },
            onRender: function() {
                if (this.options.generateTitle) {
                    var $title = $("<h1>", {text: this.title});
                    this.$el.prepend($title);
                }
                this.$(".js-submit").text("Modifier Question");
            }
        });
    });

    return SondageManager.SondagesApp.Edit.View;
});
