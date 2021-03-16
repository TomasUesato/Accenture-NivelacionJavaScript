sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "EjercicioIntegrador/EjercicioIntegrador/util/Services",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/core/Fragment",
        "EjercicioIntegrador/EjercicioIntegrador/util/Constants",
        "EjercicioIntegrador/EjercicioIntegrador/util/Formatter"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Services, Filter, FilterOperator, Fragment, Constants, Formatter) {
		"use strict";

		return Controller.extend("EjercicioIntegrador.EjercicioIntegrador.controller.Main", {
            Formatter: Formatter,//definido en el controlador para poder usarlo en la vista
			onInit: function () {
                this.loadModelProductos();
                this.loadModelSearch();
                sap.ui.getCore().getConfiguration().setLanguage("ES");

            },

            loadModelProductos: async function() {
            let oResponse = await Services.getLocalJSON(Constants.routes.JSON.productos);
	        let oData = oResponse[0]; 
 
            var oModel = new JSONModel() 
            oModel.setData(oData);
             
            this.getView().setModel(oModel, "productosJSON");
            },

            loadModelSearch: async function() {
            let oResponse = await Services.getLocalJSON(Constants.routes.JSON.search);
	        let oData = oResponse[0]; 
 
            var oModelSearch = new JSONModel() 
            oModelSearch.setData(oData);
             
            this.getView().setModel(oModelSearch, "SearchModel");
            },
            

        onSearch: function(oEvent) {
        
        var sFragmentId = this.getView().createId("Panel2");                                
        var oTabla = sap.ui.core.Fragment.byId(sFragmentId, "idTablaProductos");
        var oBinding = oTabla.getBinding("items");
        

        var aFilters = [];
        var sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
            var oFilter = new Filter("producto", FilterOperator.Contains, sQuery);
            aFilters.push(oFilter);

            var oFilter = new Filter("proveedor", FilterOperator.Contains, sQuery);
            aFilters.push(oFilter);

                 
            var oFilters = new Filter(aFilters)
            }
        

        oBinding.filter(oFilters, "Application"); 
               
        },
        onOpenDialog: function() {
    

            this.getView().byId("idPanel").setVisible(true);

            const oView = this.getView()
            if (!this._oFragment) {
                Fragment.load({
                    id: oView.getId(),
                name: Constants.routes.FRAGMENTS.Display,
                        controller: this
                }).then(function (oDialog) {
                    this._oFragment = oDialog;
                    this.getView().addDependent(this._oFragment);
                    this._oFragment.open();
                }.bind(this));
                return;
            }
        this._oFragment.open();
        },


        onCloseDialog: function() {
            this.byId(Constants.ids.FRAGMENTS.Display).close();
        },
            
        onPressEN: function() {
            sap.ui.getCore().getConfiguration().setLanguage("EN");
        },

        onPressES: function() {
            sap.ui.getCore().getConfiguration().setLanguage("ES");
        }
            
        })
    })
    
