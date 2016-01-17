//  Список запросов
Ext.define('App.view.content.queriesList' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.queriesList',
    border  : false,
    layout  : 'fit',
    myPageSize : 10,

    initComponent : function() {
        this.items = [
            this.buildQueryGrid()
        ];
        
        this.callParent(arguments);

    },
    buildQueryGrid : function() {
        var gridStore = new Ext.data.ArrayStore({
            fields  : ['id', 'region', 'city', 'type', 'comment'],
            data : [
                [1, 'Московская обл.', 'Москва', 'Щиты', 'Волоколамское_027+950_L_Б'],
                [1, 'Московская обл.', 'Москва', 'Метро', 'На стациях метро ...'],
                [1, 'Московская обл.', 'Москва', 'Щиты', 'Дмитровское_024+900_L_А']
            ]
        });
        var Grid = Ext.create('Ext.grid.Panel', {
            title       : 'Список запросов',
            columnLines : true,
            forceFit    : true,
            store   : gridStore,
            columns : [
                {header : 'ID', dataIndex : 'id', width : 25, hidden : true, sortable : true},
                {header : 'Регион', dataIndex : 'region', width : 100, sortable : true},
                {header : 'Город',  dataIndex : 'city', width : 100, sortable : true},
                {header : 'Тип',    dataIndex : 'type', width : 100, sortable : true},
                {header : 'Комментарий',    dataIndex : 'comment', width : 200}
            ],
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        xtype   : 'button',
                        iconCls : 'icon-add',
                        text    : 'Новый запрос'
                    }
                },
                '->'
            ]
        });
        return Grid;
    }

});
