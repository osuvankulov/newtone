// Сторе
Ext.define('App.store.queryStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.query',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'man_name', 'date'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/query/list.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});

Ext.define('App.store.queryListPropVals', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.queryListPropVals',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'prop_id', 'name'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/query/propertyVals.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});