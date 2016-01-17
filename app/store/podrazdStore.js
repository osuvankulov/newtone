// Сторе
Ext.define('App.store.podrazdStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.admin.podrazd',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/user/podrazd.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
