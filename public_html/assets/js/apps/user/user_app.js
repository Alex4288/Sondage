define(["app"], function(SondageManager) {
    SondageManager.module("UserApp", function(UserApp, SondageManager, Backbone, Marionette, $, _) {
        UserApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "/user/sondages/:id": "showSondage"
            }
        });

        var API = {
            showSondage: function(id) {
                require(["apps/user/sondage/controller"], function(UserSondageController) {
                    UserSondageController.show(id);
//                    SondageManager.execute("set:active:header", "sondages");
                });
            }
        };

        SondageManager.on("user:sondage:show", function(sondage) {
            SondageManager.navigate("/user/sondages/" + sondage.get('_id'));
            API.showSondage(sondage.get('_id'));
        });

        SondageManager.addInitializer(function() {
            new UserApp.Router({
                controller: API
            });
        });
    });

    return SondageManager.UserApp;
});
