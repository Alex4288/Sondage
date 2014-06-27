define(["app"
            , "tpl!apps/user/sondage/templates/show_layout.tpl"], function(SondageManager, SondageShowLayoutTpl) {
    SondageManager.module("UserApp.Sondage.Views", function(Views, SondageManager, Backbone, Marionette, $, _) {
        Views.sondageShowLayout = Marionette.Layout.extend({
            className: "row",
            template: SondageShowLayoutTpl,
            regions: {
                sondageShowRegion: "#sondage-show-region",
                toolbarRegion: "#sondage-toolbar-region"
            }
        });
    });

    return SondageManager.UserApp.Sondage.Views.sondageShowLayout;
});