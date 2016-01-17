// Пользователи и группы
Ext.define('App.view.buyer.queryControl' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.queryControl',
    layout  : 'fit',
    
    initComponent : function() {
        this.items = [{
            xtype : 'buyerQueryList'
        }];
        this.callParent(arguments);
    }
    
});

Ext.define('App.view.buyer.queryList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerQueryList',
    title   : 'Список запросов',
    columnLines : true,
    forceFit    : true,
    border  : false,
    tbar : [
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить',
                iconCls : 'icon-add'
            }
        },{
            xtype : 'buttongroup',
            items : {
                text    : 'Редактировать',
                iconCls : 'icon-edit'
            }
        },{
            xtype : 'buttongroup',
            items : {
                text    : 'Удалить',
                iconCls : 'icon-cross'
            }
        },
        '->'
    ],
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'queryStore',
            columns : [
                { header : 'ID', dataIndex : 'id', width : 25, hidden : true },
                { header : 'Менеджер', dataIndex : 'man_name', width : 250, sortable : true },
                { header : 'Время', dataIndex : 'date', width : 120, sortable : true }
            ]
        });
        this.callParent(arguments);
    }
    
});
