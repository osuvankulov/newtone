// Сторе Список результатов запроса
Ext.define('App.store.additionServResultsStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.query',
    autoLoad: true,
    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : [ 'id', 'carrier', 'contractor', 'contractor_code', 'city', 'size', 'status', 'begin', 'end', 'period' ],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/addserv/results.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
