// Сторе
Ext.define('App.store.buyertemplateexportaddstore', {
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
        url     : 'data/contractors/buyertemplateexportadd.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
