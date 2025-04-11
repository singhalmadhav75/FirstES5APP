sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.DetailView", {
        onInit() {
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched,this)
        },
        onRouteMatched:function(oEvent){
                // console.log(oEvent)
                let index=oEvent.getParameter("arguments").index;
                let sPath="toolsModel>/toolData/"+index;
                let oView=this.getView();
                oView.bindElement(sPath);
        },
        onListView:function(){
            //get router object
            let oRouter=this.getOwnerComponent().getRouter();
            //use navigation method
            oRouter.navTo("RouteMaster");
        }


    });
});