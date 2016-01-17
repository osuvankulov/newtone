// Сторе
Ext.define('App.store.querydaysstore', {
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
        url     : 'data/query/querydays.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
