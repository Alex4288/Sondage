define(["app", "backbone.picky"], function(SondageManager) {
    SondageManager.module("Entities", function(Entities, SondageManager, Backbone, Marionette, $, _) {
        Entities.Header = Backbone.Model.extend({
            initialize: function() {
                var selectable = new Backbone.Picky.Selectable(this);
                _.extend(this, selectable);
            }
        });

        Entities.HeaderCollection = Backbone.Collection.extend({
            model: Entities.Header,
            initialize: function() {
                var singleSelect = new Backbone.Picky.SingleSelect(this);
                _.extend(this, singleSelect);
            }
        });

        var initializeHeaders = function() {
            Entities.headers = new Entities.HeaderCollection([
                {name: "Accueil", url: "accueil", navigationTrigger: "accueil:show"},
                {name: "Sondages", url: "sondages", navigationTrigger: "sondages:list"},
                {name: "À Propos", url: "about", navigationTrigger: "about:show"},
                {name: "Statistiques", url: "statistiques", navigationTrigger: "statistiques:show"},
                {name: "Inscription", url: "inscription", navigationTrigger: "inscription:show"},
                {name: "Connexion", url: "connexion", navigationTrigger: "connexion:show"}
            ]);
        };

        var API = {
            getHeaders: function() {
                if (Entities.headers === undefined) {
                    initializeHeaders();
                }
                return Entities.headers;
            }
        };

        SondageManager.reqres.setHandler("header:entities", function() {
            return API.getHeaders();
        });
    });

    return;
});
