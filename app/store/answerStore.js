// Сторе Список ответов запроса
Ext.define('App.store.answerStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.query',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'carrier', 'contractor_code', 'city','size','status','begindate','enddate','rkperiod', 'addserv'],
    
    
    proxy: {
        type    : 'ajax',
        url     : 'data/query/answerlist.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
