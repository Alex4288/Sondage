define(["app", "apps/header/list/list_view"], function(SondageManager, View) {
    SondageManager.module("HeaderApp.List", function(List, SondageManager, Backbone, Marionette, $, _) {
        List.Controller = {
            listHeader: function() {
                require(["entities/header"], function() {
                    var links = SondageManager.request("header:entities");
                    var headers = new View.Headers({collection: links});

                    headers.on("brand:clicked", function() {
                        SondageManager.trigger("sondages:list");
                    });

                    headers.on("itemview:navigate", function(childView, model) {
                        var trigger = model.get("navigationTrigger");
                        SondageManager.trigger(trigger);
                    });

                    SondageManager.headerRegion.show(headers);
                });
            },
            setActiveHeader: function(headerUrl) {
                var links = SondageManager.request("header:entities");
                var headerToSelect = links.find(function(header) {
                    return header.get("url") === headerUrl;
                });
                headerToSelect.select();
                links.trigger("reset");
            }
        };
    });

    return SondageManager.HeaderApp.List.Controller;
});
