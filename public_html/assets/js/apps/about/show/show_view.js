define(["app", "tpl!apps/about/show/templates/message.tpl"], function(SondageManager, MessageTpl){
    SondageManager.module("AboutApp.Show.View", function(View, SondageManager, Backbone, Marionette, $, _){
        View.Message = Marionette.ItemView.extend({
            template: MessageTpl
        });
    });
    
    return SondageManager.AboutApp.Show.View;
});