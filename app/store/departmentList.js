// Сторе
Ext.define('App.store.departmentList', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.admin.departmentList',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'department', 'adverttypes', 'userlist'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/user/departmentlist.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
