define(["app"], function(SondageManager) {
    SondageManager.module("Entities", function(Entities, SondageManager, Backbone, Marionette, $, _) {
        Entities.Sondage = Backbone.Model.extend({
            urlRoot: SondageManager.config.apiPath + "sondages",
            idAttribute: "_id",
            defaults: {
                title: "",
                body_sondage: "",
                type_sondage: 0,
                publish: 0
            },
            validate: function(attrs, options) {
                var errors = {};
                if (!attrs.title) {
                    errors.title = "Le Titre Du Sondage Ne Peut Pas Etre Vide.";
                }
                if (!attrs.body_sondage) {
                    errors.body_sondage = "Le Corps Du Sondage Ne Peut Pas Etre Vide.";
                }
                if (!attrs.type_sondage) {
                    errors.type_sondage = "Le Type De Sondage Ne Peut Pas Etre Vide.";
                }
                if (!attrs.publish) {
                    errors.publish = "L'état Du Sondage Ne Peut Pas Etre Vide.";
                }
                else {
                    if (attrs.publish != 0 && attrs.publish != 1) {
                        errors.publish = "L'état Du Sondage Ne Peut Etre Que '1' Qui Correspond à 'Oui' Où '0' Qui Correspond à 'Non'.";
                    }
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.SondageCollection = Backbone.Collection.extend({
            url: SondageManager.config.apiPath + "sondages",
            model: Entities.Sondage,
            comparator: "title",
            parse: function(response) {
                console.log(response);
                return response;
            }
        });

//        var initializeSondages = function() {
//            var sondages = new Entities.SondageCollection([
//                {id: 1, title: "Titre 1.", bodySondage: "Corps Du Sondage 1.", type_sondage: "1", publish: "1"},
//                {id: 2, title: "Titre 2.", bodySondage: "Corps Du Sondage 2.", type_sondage: "2", publish: "0"},
//                {id: 3, title: "Titre 3.", bodySondage: "Corps Du Sondage 3.", type_sondage: "3", publish: "1"},
//                {id: 4, title: "Titre 4.", bodySondage: "Corps Du Sondage 4.", type_sondage: "1", publish: "0"},
//                {id: 5, title: "Titre 5.", bodySondage: "Corps Du Sondage 5.", type_sondage: "2", publish: "1"},
//                {id: 6, title: "Titre 6.", bodySondage: "Corps Du Sondage 6.", type_sondage: "3", publish: "0"}
//            ]);
//            sondages.forEach(function(sondage) {
//                sondage.save();
//            });
//            return sondages.models;
//        };

        var API = {
            getSondageEntities: function() {
                var sondages = new Entities.SondageCollection();
                var defer = $.Deferred();
                sondages.fetch({
                    url: SondageManager.config.apiPath + "sondages",
                    success: function(data) {
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getSondageEntity: function(sondageId) {
                var sondage = new Entities.Sondage({id: sondageId});
                var defer = $.Deferred();
                setTimeout(function() {
                    sondage.fetch({
                        url: SondageManager.config.apiPath + "sondages/" + sondageId,
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

        SondageManager.reqres.setHandler("sondage:entities", function() {
            return API.getSondageEntities();
        });

        SondageManager.reqres.setHandler("sondage:entity", function(id) {
            return API.getSondageEntity(id);
        });

        SondageManager.reqres.setHandler("sondage:entity:new", function(id) {
            return new Entities.Sondage();
        });
    });

    return;
});
