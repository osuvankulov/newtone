// Сторе Список ответов запроса
Ext.define('App.store.querySearchAnswersStore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.query',
    autoLoad: true,
    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'senddate', 'author','carrier','city','queryparams'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/query/querysearchanswers.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
