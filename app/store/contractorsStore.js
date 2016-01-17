// Сторе
Ext.define('App.store.contractorsStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.contractors',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name', 'city', 'entities', 'phones', 'emails', 'site','sitename'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/contractors/list.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
