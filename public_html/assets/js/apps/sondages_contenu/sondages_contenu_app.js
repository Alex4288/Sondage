define(["app"], function(SondageManager) {
    SondageManager.module("SondagesContenuApp", function(SondagesContenuApp, SondageManager, Backbone, Marionette, $, _) {
        SondagesContenuApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "sondages/:id": "showSondage"
            }
        });

        var API = {
            showSondage: function(id) {
                require(["apps/sondages_contenu/show/show_controller"], function(ShowController) {
                    ShowController.showSondage(id);
                    SondageManager.execute("set:active:header", "sondages");
                });
            }
        };

        SondageManager.on("sondage_contenus:show", function(id) {
            SondageManager.navigate("sondages/" + id);
            API.showSondage(id);
        });
        SondageManager.addInitializer(function() {
            new SondagesContenuApp.Router({
                controller: API
            });
        });
    });

    return SondageManager.SondagesContenuApp;
});
