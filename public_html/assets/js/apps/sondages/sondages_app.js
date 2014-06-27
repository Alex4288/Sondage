define(["app"], function(SondageManager) {
    SondageManager.module("SondagesApp", function(SondagesApp, SondageManager, Backbone, Marionette, $, _) {
        SondagesApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "sondages/compose/:id": "listQuestions",
                "sondages": "listSondages",
                "sondages(?filter=:criterion)": "listSondages",
                "sondages/:id/edit": "editSondage"
            }
        });

        var API = {
            listQuestions: function(id) {
                require(["apps/sondages/compose/list/list_controller"], function(ListController) {
                    ListController.listQuestions(id);
                    SondageManager.execute("set:active:header", "questions");
                });
            },
            
            listSondages: function(criterion) {
                require(["apps/sondages/list/list_controller"], function(ListController) {
                    ListController.listSondages(criterion);
                    SondageManager.execute("set:active:header", "sondages");
                });
            },
            editSondage: function(id) {
                require(["apps/sondages/edit/edit_controller"], function(EditController) {
                    EditController.editSondage(id);
                    SondageManager.execute("set:active:header", "sondages");
                });
            }
        };
        
        SondageManager.on("sondages:compose", function(sondage) {
            SondageManager.navigate("sondages");
            API.listQuestions(sondage.get("_id"));
        });

        SondageManager.on("sondages:list", function() {
            SondageManager.navigate("sondages");
            API.listSondages();
        });

        SondageManager.on("sondages:filter", function(criterion) {
            if (criterion) {
                SondageManager.navigate("sondages/filter/criterion:" + criterion);
            }
            else {
                SondageManager.navigate("sondages");
            }
        });

        SondageManager.on("sondage:edit", function(id) {
            SondageManager.navigate("sondages/" + id + "/edit");
            API.editSondage(id);
        });

        SondageManager.addInitializer(function() {
            new SondagesApp.Router({
                controller: API
            });
        });
    });

    return SondageManager.SondagesApp;
});
