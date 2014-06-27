define(["app"], function(SondageManager) {
    SondageManager.module("UserApp.Sondage.Views", function(Views, SondageManager, Backbone, Marionette, $, _) {

        Views.SondageContenuToolbarView = Marionette.ItemView.extend({
            template: _.template('<button class="btn btn-primary js-valider">Valider</button>'),
            triggers: {
                "click .js-valider": "user:sondage:submit"
            }
        });
    });

    return SondageManager.UserApp.Sondage.Views.SondageContenuToolbarView;
});