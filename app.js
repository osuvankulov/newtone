// Главный 
Ext.Loader.setConfig({enabled:true});

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.grid.PagingScroller'
]);

Ext.application({
    name: 'App',

    appFolder: 'app',

    controllers: [
        'Header',
        'Content',
        'Admin',
        'Buyer'
    ],
    
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout      : 'border',
            cls         : 'body-bg',
            defaults    : {border : false},
            items       : [{
                region  : 'north',
                xtype   : 'mainheader'
            },{
                region  : 'center',
                xtype   : 'maincontent'
            }]
        });
    }
    
});

