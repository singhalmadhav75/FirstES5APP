sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
	"sap/ui/model/FilterOperator"
], (Controller,JSONModel,Filter,Sorter,FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {
	// 		var oModel = new JSONModel();
	// 		oModel.loadData("/model/mockData/toolsData.json");
	//  this.getView().setModel(oModel, "toolsModel");
        },
        onDetailView:function(){
            //get router object
            let oRouter=this.getOwnerComponent().getRouter()
            //use navigation method
            oRouter.navTo("RouteDetail");
        },
        onSort:function(){

			if(!this.bDescending){

				this.bDescending = false;	

			}

			var oSorter = new Sorter("toolsName",this.bDescending);

			var oList = this.getView().byId("idListCtrl");

			var oBinding = oList.getBinding("items");

			oBinding.sort(oSorter);

			this.bDescending = !this.bDescending;

		},

		onSearch:function(oControlEvent){

			var oSearchStr = oControlEvent.getParameter("query") || oControlEvent.getParameter("newValue");

			var oName = new Filter("toolsName",FilterOperator.Contains,oSearchStr);

			var oAvail = new Filter("availability",FilterOperator.Contains,oSearchStr);

			var aFilter = [oName,oAvail];

			var mainFilter = new Filter({

					filters:aFilter,

					and:false

			});

			var oList = this.getView().byId("idListCtrl");
			var oBinding = oList.getBinding("items");
			oBinding.filter(mainFilter);

		},
		onItemSelect:function(oEvent){
            var oList=oEvent.getParameter("listItem");
            let sPath=oList.getBindingContextPath();
            let aItems=sPath.split("/")
            let id=aItems[aItems.length-1]

            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail",{
                index:id
            })

			// var oList=oEvent.getParameter("listItem");	
			// // var sPath=oList.oBindingContexts.ToolModel.sPath;
			
			// var sPath=oList.getBindingContextPath();
			// var completePath="toolsModel>"+sPath;
			// // this.onDetailView();
			// var oApp=this.getView().getParent();
			// var oDetail=oApp.getAggregation("pages")[1];
			// oDetail
            // .bindElement(completePath);
			// this.onDetailView();
		}
    });
});