// Главная панельExt.define('App.view.content.mainPanel', {    extend  : 'Ext.panel.Panel',    alias   : 'widget.mainpanel',        region  : 'south',    layout  : {        type            : 'card',        deferredRender  : true,         forcelayout     : true    },    border  : false,    margins : '5 5 5 0',    items   : [        { xtype : 'queriesList' },        { xtype : 'userPanel' },        { xtype : 'queryControl' },        { xtype : 'contractors' },        { xtype : 'templateControlImport'},        { xtype : 'templateControlExport'},        { xtype : 'addServ' },        { xtype : 'buyerAdvMedia' },        { xtype : 'buyerObjects' }    ],    initComponent: function() {        this.callParent(arguments);    },        switchPanel: function(xtype) {        if (xtype=="templateControl"){            return true;        }        var layout = this.getLayout();                 var newPanel     = this.down(xtype);        var newCardIndex = this.items.indexOf(newPanel);                var activePanel = layout.activeItem;        var activePanelIndex = this.items.indexOf(activePanel);                if (newCardIndex !== activePanelIndex) {            layout.setActiveItem(newCardIndex);              if (newPanel.onRefresh) {                newPanel.onRefresh();            }            }        return true;    }    });