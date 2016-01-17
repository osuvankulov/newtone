// Сторе
Ext.define('App.store.buyertermplateexportstore', {
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
        url     : 'data/contractors/buyertermplateexport.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
