// Сторе
Ext.define('App.store.menuTree', {
    extend  : 'Ext.data.TreeStore',
    model   : 'App.model.menuTree',

    filters : [{
        property    : 'module', 
        value       : 'first_Module'
    }],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/treemenu.json',
        root    : {
            expanded : true
        }
    }
});
