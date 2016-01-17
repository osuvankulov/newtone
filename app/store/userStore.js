// Сторе
Ext.define('App.store.userStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.admin.usersList',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'full_name', 'username', 'podrazd', 'role','is_blocked'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/user/list.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
