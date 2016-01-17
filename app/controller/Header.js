// Контролер
Ext.define('App.controller.Header', {
    extend  : 'Ext.app.Controller',

    views   : [
        'main.Header'
    ],
    
    init    : function() {
        this.control({
            '#lk-logout': {
                click: this.logout
            }
        });
    },

    logout  : function () {
        console.log('#lk-logout');
        Ext.Ajax.request({
            scope : this,
            url : 'data/logout.json',
            success : function() {
                window.location.href = '/';
            },
            failure : function() {
                window.location.href = '/';
            }
        });
    }

});
