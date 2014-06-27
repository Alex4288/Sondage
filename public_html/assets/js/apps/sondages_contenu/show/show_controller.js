define(["app"
            , "apps/sondages_contenu/show/views/empty"
            , "apps/sondages_contenu/list/list_view"
            , "entities/sondage_contenus"
            , "entities/type_sondage_id"], function(SondageManager, SondageShowView, ListContenuView) {
    SondageManager.module("SondagesContenuApp.Show", function(Show, SondageManager, Backbone, Marionette, $, _) {
        Show.Controller = {
            showSondage: function(id) {
                require(["common/views"
                            , "apps/sondages_contenu/show/show_layout"
                            , "entities/sondage"], function(CommonViews, showLayout) {
                    var loadingView = new CommonViews.Loading({
                        title: "Retard De Chargement Artificiel.",
                        message: "Le Chargement Des Données Est Retardée Pour Démontrer L'Usage D'Une Vue De Chargement."
                    });
                    SondageManager.mainRegion.show(loadingView);

//                    var sondages = SondageManager.request("sondage:entities");

                    var questions = new Backbone.Collection(
                            [
                                {id: 1, intitule: "Aller à Saint-Etienne.", ordre: 0},
                                {id: 2, intitule: "Aller à Rotterdam.", ordre: 1},
                                {id: 3, intitule: "Aller à Brooklyn.", ordre: 2},
                                {id: 4, intitule: "Aller à Melbourne.", ordre: 3},
                                {id: 5, intitule: "Aller à Sydney.", ordre: 4},
                                {id: 6, intitule: "Aller à Berlin.", ordre: 5}
                            ]
                            );

//                    var sondagesListView = new View.Sondage({
//                        collection: questions
//                    });

//                    sondagesListView.on("itemview:sondage:delete", function(childView, model) {
//                        questions.remove(model);
//                    });

//                    SondageManager.mainRegion.show(sondagesListView);

                    var fetchingSondage = SondageManager.request("sondage:entity", id);
                    $.when(fetchingSondage).done(function(sondage) {

                        var layoutView = new showLayout();
//                        var sondagesListLayout = new ListContenuView.Layout();
                        var sondagesListPanel = new ListContenuView.Panel();
                        var listContenuView = new ListContenuView.SondageContenus({collection: questions});
                        SondageManager.mainRegion.show(layoutView);
                        layoutView.sondagesContenuRegion.show(listContenuView);

//                        layoutView.on('show',function(){
//                            layoutView.sondagesContenuRegion.show(listContenuView);
//                        });
//                        SondageManager.mainRegion.show(layoutView);


                        layoutView.panelRegion.show(sondagesListPanel);
//                        sondagesListLayout.on("show", function() {
//                           sondagesListLayout.sondagesContenuRegion.show(sondagesListPanel);
//                            sondagesListLayout.sondagesParametresRegion.show(sondagesListView);
//                        });

                        sondagesListPanel.on("sondageContenu:new", function() {
                            require(["apps/sondages_contenu/new/new_view"], function(NewView) {
                                var newSondage = new SondageManager.Entities.Sondage_Contenu();

                                var view = new NewView({
                                    model: newSondage
                                });

                                view.on("form:submit", function(data) {
                                    if (questions.length > 0) {
                                        var highestId = questions.max(function(c) {
                                            return c.id;
                                        }).get("id");
                                        data.id = highestId + 1;
                                    }
                                    else {
                                        data.id = 1;
                                    }
                                    if (newSondage.save(data)) {
                                        questions.add(newSondage);
                                        view.trigger("dialog:close");
                                        var newSondageView = listContenuView.children.findByModel(newSondage);
                                        if (newSondageView) {
                                            newSondageView.flash("success");
                                        }
                                    }
                                    else {
                                        view.triggerMethod("form:data:invalid", newSondage.validationError);
                                    }
                                });

                                SondageManager.dialogRegion.show(view);
                            });
                        });

                        listContenuView.on("itemview:sondage:edit", function(childView, args) {
                            require(["apps/sondages_contenu/edit/edit_view"], function(EditView) {
                                var model = args.model;
                                var view = new EditView.ContenuSondage({
                                    model: model
                                });

                                view.on("form:submit", function(data) {
                                    if (model.save(data, {url: "sondage_contenus"})) {
                                        childView.render();
                                        view.trigger("dialog:close");
                                        childView.flash("success");
                                    }
                                    else {
                                        view.triggerMethod("form:data:invalid", model.validationError);
                                    }
                                });

                                SondageManager.dialogRegion.show(view);
                            });
                        });

                        var sondageView;
                        if (sondage !== undefined) {
                            sondageView = new SondageShowView.MissingSondage();
                            sondageView = new SondageShowView.Sondage({
                                model: sondage,
                                typeStr: SondageManager.Entities.TypeSondageId.findWhere({id: parseInt(sondage.get("type_sondage"))}).get("description")
                            });

                            layoutView.sondagesParametresRegion.show(sondageView);

                            sondageView.on("sondage:edit", function(sondage) {
                                SondageManager.trigger("sondage:edit", sondage.get("id"));
                            });
                        }
                        else {
                            sondageView = new SondageShowView.MissingSondage();
                            model: sondage;
                        }

                    });
                });
            }
        };
    });
    return SondageManager.SondagesContenuApp.Show.Controller;
});
