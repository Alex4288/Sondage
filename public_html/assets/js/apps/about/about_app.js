define(["app"], function(SondageManager) {
    SondageManager.module("AboutApp", function(AboutApp, SondageManager, Backbone, Marionette, $, _) {
        AboutApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "about": "showAbout"
            }
        });

        var API = {
            showAbout: function() {
                require(["apps/about/show/show_controller"], function(ShowController) {
                    ShowController.showAbout();
                    SondageManager.execute("set:active:header", "about");
                });
            }
        };

        SondageManager.on("about:show", function() {
            SondageManager.navigate("about");
            API.showAbout();
        });

        SondageManager.addInitializer(function() {
            new AboutApp.Router({
                controller: API
            });
        });
    });

    return SondageManager.AboutApp;
});