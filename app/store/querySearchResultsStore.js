// Сторе Список результатов запроса
Ext.define('App.store.querySearchResultsStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.query',
    autoLoad: true,
    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'podryadchik', 'numb','carrier','city','razmesh','size','side','status','begindate','enddate'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/query/querysearchresults.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
