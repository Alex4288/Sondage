define(["app"], function(SondageManager) {
    SondageManager.module("Entities", function(Entities, SondageManager, Backbone, Marionette, $, _) {
        Entities.Sondage_Contenu = Backbone.Model.extend({
            urlRoot: SondageManager.config.apiPath + "sondage_contenus",
            idAttribute: "_id",
            defaults: {
                intitule: ""
            },
            validate: function(attrs, options) {
                var errors = {};
                if (!attrs.intitule) {
                    errors.intitule = "L'Intitulé Pour La Réponse Du Sondage Ne Peut Pas Etre Vide.";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.Sondage_ContenusCollection = Backbone.Collection.extend({
            url: SondageManager.config.apiPath + "sondage_contenus",
            model: Entities.Sondage_Contenu,
            comparator: "intitule",
            parse: function(response) {
                console.log(response);
                return response;
            }
        });
        var API = {
            getSondage_ContenuEntities: function() {
                var sondages_Contenus = new Entities.Sondage_ContenusCollection();
                var defer = $.Deferred();
                sondages_Contenus.fetch({
                    url: SondageManager.config.apiPath + "sondage_contenus",
                    success: function(data) {
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getSondage_ContenuEntity: function(sondage_ContenusId) {
                var sondage_Contenu = new Entities.Sondage_Contenu({id: sondage_ContenusId});
                var defer = $.Deferred();
                setTimeout(function() {
                    sondage_Contenu.fetch({
                        url: SondageManager.config.apiPath + "sondage_contenus",
                        success: function(data) {
                            defer.resolve(data);
                        },
                        error: function(data) {
                            defer.resolve(undefined);
                        }
                    });
                }, 2000);
                return defer.promise();
            }
        };

        SondageManager.reqres.setHandler("sondage_contenus:entities", function() {
            return API.getSondage_ContenuEntities();
        });

        SondageManager.reqres.setHandler("sondage_contenus:entity", function(id) {
            return API.getSondage_ContenuEntity(id);
        });

        SondageManager.reqres.setHandler("sondage_contenus:entity:new", function(id) {
            return new Entities.Sondage_Contenu();
        });
    });

    return;
});
