define(["app", "tpl!apps/sondages_contenu/show/templates/layout.tpl"], function(SondageManager, LayoutTpl) {
    SondageManager.module("SondagesContenuApp.Show.Layout", function(Layout, SondageManager, Backbone, Marionette, $, _) {
        Layout.Sondage = Marionette.Layout.extend({
            template: LayoutTpl,
            regions: {
                panelRegion: "#panel-region",
                sondagesContenuRegion: "#sondages-contenu-region",
                sondagesParametresRegion: "#sondages-parametres-region"
            }
        });
    });

    return SondageManager.SondagesContenuApp.Show.Layout.Sondage;
});