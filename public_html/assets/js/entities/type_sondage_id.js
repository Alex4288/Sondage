define(["app"], function(SondageManager) {
    SondageManager.module("Entities", function(Entities, SondageManager, Backbone, Marionette, $, _) {
        Entities.TypeSondageId = new Backbone.Collection(
                [
                    {id: 1, description: 'Une Réponse Possible.'},
                    {id: 2, description: 'Plusieurs Réponses Possibles.'},
                    {id: 3, description: 'Quantitatif.'}
                ]
        );
    });

    return;
});
