// Сторе
Ext.define('App.store.buyertermplateimportpropertiesstore', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.contractors',

    remoteSort  : true,
    sorters     : [{
        property    : 'name',
        direction   : 'ASC'
    }],
    
    fields  : ['id', 'field', 'begin', 'end'],
    
    proxy: {
        type    : 'ajax',
        url     : 'data/templates/import/advmediaprop.json',
        reader  : {
            type            : 'json',
            root            : 'records',
            totalProperty   : 'totalcount'
        }
    }
});
