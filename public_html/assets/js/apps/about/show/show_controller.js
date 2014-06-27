define(["app", "apps/about/show/show_view"], function(SondageManager, View){
    SondageManager.module("AboutApp.Show", function(Show, SondageManager, Backbone, Marionette, $, _){
        Show.Controller = {
            showAbout: function(){
                var view = new View.Message();
                SondageManager.mainRegion.show(view);
            }
        };
    });
    
    return SondageManager.AboutApp.Show.Controller;
});