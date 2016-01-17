// Сторе
Ext.define('App.store.queryList', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.query',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'senddate', 'createdby','region','city','type','comment'],

    proxy: {
        type    : 'ajax',
        url     : 'data/query/querylist.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
