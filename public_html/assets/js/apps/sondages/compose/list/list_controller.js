define(["app"
            , "apps/sondages/compose/list/list_view"], function(SondageManager, View) {
    SondageManager.module("SondagesApp.List", function(List, SondageManager, Backbone, Marionette, $, _) {
        List.Controller = {
            listQuestions: function(sondageId) {
                require(["common/views", "entities/questions"], function(CommonViews) {
                    var loadingView = new CommonViews.Loading();
                    SondageManager.mainRegion.show(loadingView);
                    var coll = SondageManager.Entities.Questions;

                    var fetchingQuestions = SondageManager.request("question:entities", sondageId);

                    var questionsListLayout = new View.Layout();
                    var questionsListPanel = new View.Panel();
                    SondageManager.mainRegion.show(questionsListLayout);
//                    require(["entities/common"], function(FilteredCollection) {
                    $.when(fetchingQuestions).done(function(questions) {


                        questionsListLayout.panelRegion.show(new View.Questions({collection: questions}));
                        var questionView;
                        if (questions !== undefined) {
                            questionView = new View.Questions({
                                collection: questions
                            });
                            questionView.on("questions:edit", function(questions) {
                                SondageManager.trigger("questions:edit", questions.get("id"));
                            });
                        }
                        else {
                            questionView = new View.MissingQuestion();
                        }
                        SondageManager.mainRegion.show(questionView);

                        var questionsListView = new View.Questions({
                            collection: questions
                        });
//
//                        questionsListPanel.on("questionsListLayout:filter", function(filterCriterion) {
//                            filteredQuestions.filter(filterCriterion);
//                            SondageManager.trigger("questions:filter", filterCriterion);
//                        });

                        questionsListLayout.on("show", function() {
                            questionsListLayout.panelRegion.show(questionsListPanel);
                            questionsListLayout.questionRegion.show(questionsListView);
                        });

                        questionsListPanel.on("question:new", function() {
                            require(["apps/sondages/compose/new/new_view"], function(NewView) {
                                var newQuestion = SondageManager.request("question:entity:new");
                                var cleUtilisateur = 'azerty';
                                var view = new NewView.Question({
                                    model: newQuestion
                                });

                                view.on("form:submit", function(data) {
                                    data.sondage_id = sondageId;
                                    data.cle_utilisateur = cleUtilisateur;
                                    newQuestion.save(data, {
                                        success: function(question, response, options) {
                                            console.log(question);
                                            questionsListView.collection.add(question);
                                            questionsListView.collection.trigger("reset");
                                        },
                                        error: function(question, response, options) {
                                            console.log(response);
                                        }
                                    });
                                });
                                SondageManager.dialogRegion.show(view);
                            });
                        });

                        questionsListView.on("itemview:question:edit", function(childView, args) {
                            require(["apps/sondages/compose/edit/edit_view"], function(EditView) {
                                var model = args.model;
                                var cleUtilisateur = 'azerty';

                                var view = new EditView.Question({
                                    model: model
                                });

                                view.on("form:submit", function(data) {
                                    data.sondage_id = sondageId;
                                    data.cle_utilisateur = cleUtilisateur;
                                    model.save(data, {
                                        success: function(question, response, options) {
                                            console.log(question);
                                        },
                                        error: function(question, response, options) {
                                            console.log(response);
                                        }
                                    });
                                });

                                SondageManager.dialogRegion.show(view);
                            });
                        });

                        questionsListView.on("itemview:question:delete", function(childView, args) {
                            args.model.destroy();
                        });
                        SondageManager.mainRegion.show(questionsListLayout);
                    });
                });
//                });
            }
        };
    });
    return SondageManager.SondagesApp.List.Controller;
});