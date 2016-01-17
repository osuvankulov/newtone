// Сторе
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