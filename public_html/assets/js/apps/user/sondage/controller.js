define(["app"
            , "apps/user/sondage/views/show_layout"
            , "apps/user/sondage/views/show"
            , "apps/user/sondage/views/toolbar"
            , "entities/questions"
            , "entities/type_sondage_id"], function(SondageManager, SondageShowLayout, SondageContenuView, SondageContenuToolbarView) {
    SondageManager.module("UserApp.Sondage", function(Sondage, SondageManager, Backbone, Marionette, $, _) {
        Sondage.Controller = {
            show: function(id) {
                require(["common/views"
                            , "entities/sondage"], function(CommonViews) {
                    var loadingView = new CommonViews.Loading({
                        title: "Retard De Chargement Artificiel.",
                        message: "Le Chargement Des Données Est Retardée Pour Démontrer L'Usage D'Une Vue De Chargement."
                    });
                    SondageManager.mainRegion.show(loadingView);

                    var fetchingSondage = SondageManager.request("sondage:entity", id);
                    $.when(fetchingSondage).done(function(sondage) {

                        var sondageShowLayout = new SondageShowLayout();
                        var sondageContenuView = new SondageContenuView({model: sondage, collection: SondageManager.Entities.Questions});
                        var sondageContenuToolbarView = new SondageContenuToolbarView();
                        SondageManager.mainRegion.show(sondageShowLayout);
                        sondageShowLayout.sondageShowRegion.show(sondageContenuView);

                        sondageContenuToolbarView.on("user:sondage:submit", function() {
                            require(["entities/sondage_questions"], function() {

                                var newQuestion = new SondageManager.Entities.Sondage_Question();
                                newQuestion.set('question', sondageContenuView.getResultats());
                                newQuestion.set('sondage_id', id);
                                newQuestion.set('key', 'azerty');

                                newQuestion.save(null, {
                                    success: function(question, response, options) {
                                        alert('ok');
                                        console.log(question);
                                    },
                                    error: function(question, response, options) {
                                        SondageShowLayout.triggerMethod("form:data:invalid", newQuestion.validationError);
                                    }
                                });
                            });
                        });

                        sondageShowLayout.toolbarRegion.show(sondageContenuToolbarView);

                        sondageContenuView.on("itemview:user:monter", function(childView, args) {
                            var questions = args.model.collection;
                            var ordre_courant = args.model.get("ordre");
                            if (parseInt(ordre_courant) > 0) {
                                var precedent = questions.findWhere({ordre: parseInt(ordre_courant) - 1});
                                console.log(precedent);
                                args.model.set("ordre", precedent.get("ordre"));
                                precedent.set("ordre", ordre_courant);
                                questions.sort();
                                questions.trigger("reset");
                                console.log(questions);
//                                sondageContenuView.render();
                            }
                        });

                        sondageContenuView.on("itemview:user:descendre", function(childView, args) {
                            var questions = args.model.collection;
                            var ordre_courant = args.model.get("ordre");
                            if (parseInt(ordre_courant) >= 0) {
                                var precedent = questions.findWhere({ordre: parseInt(ordre_courant) + 1});
                                console.log(precedent);
                                args.model.set("ordre", precedent.get("ordre"));
                                precedent.set("ordre", ordre_courant);
                                questions.sort();
                                questions.trigger("reset");
                                console.log(questions);
//                                sondageContenuView.render();
                            }
                        });
                    });
                });
            }
        };
    });
    return SondageManager.UserApp.Sondage.Controller;
});
