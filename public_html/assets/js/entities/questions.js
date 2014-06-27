define(["app"], function(SondageManager) {
    SondageManager.module("Entities", function(Entities, SondageManager, Backbone, Marionette, $, _) {
        Entities.Question = Backbone.Model.extend({
            urlRoot: SondageManager.config.apiPath + "questions",
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
                    errors.question = "La Question Du Sondage Ne Peut Pas Etre Vide.";
                }
                if (!attrs.cle_utilisateur) {
                    errors.cle_utilisateur = "La Clé Utilisateur Ne Peut Pas Etre Vide";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.QuestionCollection = Backbone.Collection.extend({
            url: SondageManager.config.apiPath + "questions",
            model: Entities.Question,
            comparator: "question",
            parse: function(response) {
                console.log(response);
                return response;
            }
        });

        var API = {
            getQuestionEntities: function(sondageId) {
                var questions = new Entities.QuestionCollection();
                var defer = $.Deferred();
                questions.fetch({
                    url: SondageManager.config.apiPath + "sondages/" + sondageId + "/sondage_questions",
                    success: function(data) {
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getQuestionEntity: function(questionId) {
                var question = new Entities.Question({id: questionId});
                var defer = $.Deferred();
                setTimeout(function() {
                    question.fetch({
                        url: SondageManager.config.apiPath + "questions/" + questionId,
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

        SondageManager.reqres.setHandler("question:entities", function(sondageId) {
            return API.getQuestionEntities(sondageId);
        });

        SondageManager.reqres.setHandler("question:entity", function(id) {
            return API.getQuestionEntity(id);
        });

        SondageManager.reqres.setHandler("question:entity:new", function(id) {
            return new Entities.Question();
        });
    });

    return;
});
