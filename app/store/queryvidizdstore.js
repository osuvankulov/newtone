// Сторе
Ext.define('App.store.queryvidizdstore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.user',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/query/queryvidizd.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
