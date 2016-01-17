// Сторе
Ext.define('App.store.buyertermplateexportpropertiesstore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.contractors',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'field', 'begin', 'end'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/contractors/buyertermplateexportproperties.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
