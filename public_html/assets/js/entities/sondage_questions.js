define(["app"], function(SondageManager) {
    SondageManager.module("Entities", function(Entities, SondageManager, Backbone, Marionette, $, _) {
        Entities.Sondage_Question = Backbone.Model.extend({
            urlRoot: SondageManager.config.apiPath + "sondage_questions",
            idAttribute: "_id",
            defaults: {
                sondage_id: "",
                question: "",
                cle_utilisateur: ""
            },
            validate: function(attrs, options) {
                var errors = {};
                if (!attrs.sondage_id) {
                    errors.sondage_id = "L'ID Du Sondage Ne Peut Pas Etre Vide.";
                }
                if (!attrs.question) {
                    errors.question = "La Question Du Sondage Ne Peut Pas Etre Vide";
                }
                if (!attrs.cle_utilisateur) {
                    errors.cle_utilisateur = "La Clé Utilisateur Ne Peut Pas Etre Vide";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.Sondage_QuestionCollection = Backbone.Collection.extend({
            url: SondageManager.config.apiPath + "sondage_questions",
            model: Entities.Sondage_Question,
            comparator: "question",
            parse: function(response) {
                console.log(response);
                return response;
            }
        });

        var API = {
            getSondage_QuestionEntities: function(sondageId) {
                var sondages_Questions = new Entities.Sondage_QuestionCollection();
                var defer = $.Deferred();
                sondages_Questions.fetch({
                    url: SondageManager.config.apiPath + "sondage_questions" + sondageId + "/sondage_questions",
                    success: function(data) {
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getSondage_QuestionEntity: function(questionId) {
                var sondage_Question = new Entities.Sondage_Question({id: questionId});
                var defer = $.Deferred();
                setTimeout(function() {
                    sondage_Question.fetch({
                        url: SondageManager.config.apiPath + "sondage_questions",
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

        SondageManager.reqres.setHandler("sondage_questions:entities", function(sondageId) {
            return API.getSondage_QuestionEntities(sondageId);
        });

        SondageManager.reqres.setHandler("sondage_questions:entity", function(id) {
            return API.getSondage_QuestionEntity(id);
        });

        SondageManager.reqres.setHandler("sondage_questions:entity:new", function(id) {
            return new Entities.Sondage_Question();
        });
    });

    return;
});
