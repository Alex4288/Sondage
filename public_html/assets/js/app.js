define(["marionette"
            , "apps/config/marionette/regions/dialog"], function(Marionette) {
    var SondageManager = new Marionette.Application();

    SondageManager.config = {
        apiPath: "http://localhost:4711/api/"
    };

    (function() {
        var proxiedSync = Backbone.sync;

        Backbone.sync = function(method, model, options) {
            options || (options = {});

            if (typeof options.crossDomain === 'undefined') {
                options.crossDomain = true;
            }
            options.headers = {
                Accept: "application/json",
//                'X-Api-Key': window.proxiMenusConfig.key
            };
            return proxiedSync(method, model, options);
        };
    })();

    SondageManager.addRegions({
        headerRegion: "#header-region",
        mainRegion: "#main-region",
        dialogRegion: Marionette.Region.Dialog.extend({
            el: "#dialog-region"
        })
    });

    SondageManager.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    SondageManager.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    SondageManager.startSubApp = function(appName, args) {
        var currentApp = appName ? SondageManager.module(appName) : null;
        if (SondageManager.currentApp === currentApp) {
            return;
        }

        if (SondageManager.currentApp) {
            SondageManager.currentApp.stop();
        }

        SondageManager.currentApp = currentApp;
        if (currentApp) {
            currentApp.start(args);
        }
    };

    SondageManager.on("initialize:after", function() {
        if (Backbone.history) {
            require(["apps/sondages/sondages_app"
                        , "apps/sondages_contenu/sondages_contenu_app"
                        , "apps/about/about_app"
                        , "apps/user/user_app"], function() {
                Backbone.history.start();

                if (SondageManager.getCurrentRoute() === "") {
                    SondageManager.trigger("sondages:list");
                }
            });
        }
    });

    return SondageManager;
});
