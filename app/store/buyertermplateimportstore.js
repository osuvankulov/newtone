// Сторе
Ext.define('App.store.buyertermplateimportstore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.contractors',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'author', 'name', 'type', 'comment'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/contractors/buyertermplateimport.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
