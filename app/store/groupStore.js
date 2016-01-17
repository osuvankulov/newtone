// Сторе
Ext.define('App.store.groupStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.admin.usersGroupList',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name', 'userlist'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/group/list.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
