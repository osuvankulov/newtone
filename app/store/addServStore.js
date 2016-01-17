// Сторе
Ext.define('App.store.addServStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.contractors',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'name', 'price', 'type', 'contractor', 'description'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/addserv/list.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
