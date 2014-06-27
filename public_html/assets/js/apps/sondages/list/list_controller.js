define(["app"
            , "apps/sondages/list/list_view"], function(SondageManager, View) {
    SondageManager.module("SondagesApp.List", function(List, SondageManager, Backbone, Marionette, $, _) {
        List.Controller = {
            listSondages: function(criterion) {
                require(["common/views", "entities/sondage"], function(CommonViews) {
                    var loadingView = new CommonViews.Loading();
                    SondageManager.mainRegion.show(loadingView);

                    var fetchingSondages = SondageManager.request("sondage:entities");

                    var sondagesListLayout = new View.Layout();
                    var sondagesListPanel = new View.Panel();

                    require(["entities/common"], function(FilteredCollection) {
                        $.when(fetchingSondages).done(function(sondages) {
                            var sondageView;
                            if (sondages !== undefined) {
                                sondageView = new View.Sondages({
                                    collection: sondages
                                });
                                sondageView.on("sondages:edit", function(sondages) {
                                    SondageManager.trigger("sondages:edit", sondages.get("id"));
                                });
                            }
                            else {
                                sondageView = new View.MissingSondage();
                            }
                            SondageManager.mainRegion.show(sondageView);

                            var filteredSondages = SondageManager.Entities.FilteredCollection({
                                collection: sondages,
                                typefilterFunction: function(filterCriterion) {
                                    var criterion = filterCriterion.toLowerCase();
                                    return function(sondage) {
                                        if (sondage.get("title").toLowerCase().indexOf(criterion) !== -1 || sondage.get("body_sondage").toLowerCase().indexOf(criterion) !== -1) {
                                            return sondage;
                                        }
                                    };
                                }
                            });

                            if (criterion) {
                                filteredSondages.filter(criterion);
                                sondagesListPanel.once("show", function() {
                                    sondagesListPanel.triggerMethod("set:filter:criterion", criterion);
                                });
                            }

                            var sondagesListView = new View.Sondages({
                                collection: filteredSondages
                            });

                            sondagesListPanel.on("sondages:filter", function(filterCriterion) {
                                filteredSondages.filter(filterCriterion);
                                SondageManager.trigger("sondages:filter", filterCriterion);
                            });

                            sondagesListLayout.on("show", function() {
                                sondagesListLayout.panelRegion.show(sondagesListPanel);
                                sondagesListLayout.sondagesRegion.show(sondagesListView);
                            });

                            sondagesListPanel.on("sondage:new", function() {
                                require(["apps/sondages/new/new_view"], function(NewView) {
                                    var newSondage = SondageManager.request("sondage:entity:new");

                                    var view = new NewView.Sondage({
                                        model: newSondage
                                    });

                                    view.on("form:submit", function(data) {
//                                        if (sondages.length > 0) {
//                                            var highestId = sondages.max(function(c) {
//                                                return c.id;
//                                            }).get("id");
//                                            data.id = highestId + 1;
//                                        }
//                                        else {
//                                            data.id = 1;
//                                        }

                                        newSondage.save(data, {
                                            success: function(reponse, response, options) {
                                                console.log(reponse);
                                            },
                                            error: function(reponse, response, options) {
//                                       view.triggerMethod("form:data:invalid", newReponse.validationError);
                                                console.log(response);
                                            }
                                        });
//                                        if (newSondage.save(data)) {
//                                            sondages.add(newSondage);
//                                            view.trigger("dialog:close");
//                                            var newSondageView = sondagesListView.children.findByModel(newSondage);
//                                            if (newSondageView) {
//                                                newSondageView.flash("success");
//                                            }
//                                        }
//                                        else {
//                                            view.triggerMethod("form:data:invalid", newSondage.validationError);
//                                        }
                                    });
                                    SondageManager.dialogRegion.show(view);
                                });
                            });

                            sondagesListView.on("itemview:sondage:compose", function(childView, args) {
                                SondageManager.trigger("sondages:compose", args.model);
                            });

                            sondagesListView.on("itemview:sondage:user:show", function(childView, args) {
                                SondageManager.trigger("user:sondage:show", args.model);
                            });

                            sondagesListView.on("itemview:sondage:edit", function(childView, args) {
                                require(["apps/sondages/edit/edit_view"], function(EditView) {
                                    var model = args.model;
                                    var view = new EditView.Sondage({
                                        model: model
                                    });

                                    view.on("form:submit", function(data) {
                                        if (model.save(data)) {
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

                            sondagesListView.on("itemview:sondage:delete", function(childView, args) {
                                args.model.destroy();
                            });
                            SondageManager.mainRegion.show(sondagesListLayout);
                        });
                    });
                });
            }
        };
    });
    return SondageManager.SondagesApp.List.Controller;
});
