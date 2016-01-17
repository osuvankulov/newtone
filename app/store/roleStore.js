// Сторе
Ext.define('App.store.roleStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.admin.role',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/user/roles.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
