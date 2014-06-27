define(["app"
      , "tpl!apps/sondages/common/templates/form.tpl"
   , "backbone.syphon"
   , "entities/type_sondage_id"], function(SondageManager, FormTpl) {
    SondageManager.module("SondagesApp.Common.Views", function(Views, SondageManager, Backbone, Marionette, $, _) {
        var SelectView = Marionette.ItemView.extend({
            tagName: "option",
            template: _.template("<%- description %>"),
            onRender: function() {
                this.$el.attr('value', this.model.get("id"));
                if (this.model.get("id") == this.options.type_id) {
                    this.$el.attr('selected', "");
                }
            }
        });
        var SelectCollectionView = Marionette.CollectionView.extend({
            tagName: "select",
            itemView: SelectView,
            onRender: function() {
                this.$el.attr('name', "type_sondage");
                this.$el.attr('id', "sondage-type_sondage");
            },
            onShow: function() {
                this.$el.before("<label>Type De Sondage:</label>");
            }
        });
        Views.Form = Marionette.Layout.extend({
            template: FormTpl,
            events: {
                "click button.js-submit": "submitClicked"
            },
            regions: {
                typeSondageRegion: "#type-sondage-region"
            },
            initialize: function() {
                var selectCollectionView = new SelectCollectionView({
                    collection: SondageManager.Entities.TypeSondageId,
                    itemViewOptions: {
                        type_id: this.model.get("type_sondage")
                    }
                });
                this.on("show", function() {
                    this.typeSondageRegion.show(selectCollectionView);
                });
            },
            submitClicked: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            onFormDataInvalid: function(errors) {
                var $view = this.$el;

                var clearFormErrors = function() {
                    var $form = $view.find("form");
                    $form.find(".help-inline.error").each(function() {
                        $(this).remove();
                    });
                    $form.find(".control-group.error").each(function() {
                        $(this).removeClass("error");
                    });
                };

                var markErrors = function(value, key) {
                    var $controlGroup = $view.find("#sondage-" + key).parent();
                    var $errorEl = $("<span>", {class: "help-inline error", text: value});
                    $controlGroup.append($errorEl).addClass("error");
                };

                clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    });

    return SondageManager.SondagesApp.Common.Views;
});
