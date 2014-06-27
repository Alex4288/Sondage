define(["app", "apps/header/list/list_controller"], function(SondageManager, ListController) {
    SondageManager.module("HeaderApp", function(Header, SondageManager, Backbone, Marionette, $, _) {
        var API = {
            listHeader: function() {
                    ListController.listHeader();
            }
        };

        SondageManager.commands.setHandler("set:active:header", function(name) {
            SondageManager.HeaderApp.List.Controller.setActiveHeader(name);
        });

        Header.on("start", function() {
            API.listHeader();
        });
    });

    return SondageManager.HeaderApp;
});
