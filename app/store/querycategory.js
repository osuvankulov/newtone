// Сторе список категорий рекламы байера
Ext.define('App.store.querycategory', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.query',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/query/querycategory.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
