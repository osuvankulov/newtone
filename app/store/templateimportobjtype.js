// Сторе
Ext.define('App.store.templateimportobjtype', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.contractors',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/contractors/templateimportobjtype.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
