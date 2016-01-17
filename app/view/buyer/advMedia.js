// Дополнительные услуги  - главная панель
Ext.define('App.view.buyer.advMedia' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.buyerAdvMedia',
    border  : false,
    layout  : 'border',
    
    initComponent : function() {
        this.items = [
            {   // Список доп. услуг
                region  : 'center',
                xtype   : 'buyerAdvMediaList'
            },
            {   // Подробная информация
                region          : 'south',
                collapsible     : true,
                collapseMode    : 'mini',
                hideCollapseTool: true,
                split           : true,
                height          : 160,
                layout          : 'fit',
                xtype           : 'buyerAboutMedia'
            }
        ];
        this.callParent(arguments);
    }
    
});

// Список дополнительных услуг
Ext.define('App.view.buyer.advMediaList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerAdvMediaList',
    title   : 'Управление базой рекламоносителей',
    columnLines : true,
    forceFit    : true,
    selModel    : Ext.create('Ext.selection.CheckboxModel'),
    tbar : [
        {xtype:'tbspacer'},
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Импорт',
                name    : 'import',
                iconCls : ''
            }
        },
        {xtype:'tbspacer'},
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Экспорт',
                name    : 'export',
                iconCls : ''
            }
        },
        {xtype:'tbspacer'},
        {
            store         : ['есть', 'нет', 'все'],
            value         : 'все',
            labelWidth    : 80,
            width         : 155,
            fieldLabel    : 'Изображения',
            name          : 'pics',
            xtype         : 'combo',
            triggerAction : 'all',
            mode          : 'local',
            selectOnFocus : true,
            editable      : false
        },
        '->',
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить статусы/тарифы',
                name    : 'addState',
                iconCls : 'icon-add'
            }
        },
        {xtype:'tbspacer'},
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить носитель',
                name    : 'addMedia',
                iconCls : 'icon-add'
            }
        },
        {xtype:'tbspacer'},
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Удалить',
                name    : 'del',
                iconCls : 'icon-cross'
            }
        },
        {xtype:'tbspacer'},
        {
            xtype       : 'searchfield',
            emptyText   : 'строка для поиска'
        },
        {xtype:'tbspacer'}
    ],
    
    initComponent : function() {
        
        var advMediaListStore = Ext.create('Ext.data.ArrayStore', {
            fields:['id', 'contractor', 'contractor_code', 'type', 'size', 'city', 'addres', 'period', 'price', 'modified'],
            data: [ 
                [1, 'Мособлреклама', '54787', 'Щит', '5 х 10', 'Москва', 'пр. Мира, 14/1', '30', '25000', '01.10.2011 14:52'],
                [2, 'Мособлреклама', '54804', 'Щит', '5 х 10', 'Москва', 'ул. Кутузова, 69', '30', '25000', '01.10.2011 14:52'],
                [3, 'Вюрст Медиа', '9870100015', 'Щит', '5 х 10', 'Москва', 'въезд в Балашику с Щелковского шоссе', '15', '15500', '30.09.2011 17:12']
            ]
        });
        
        Ext.apply(this, {
            store   : advMediaListStore,
            columns : [
                { header : 'ID',            dataIndex : 'id',               width :  25, hidden   : true },
                { header : 'Подрядчик',     dataIndex : 'contractor',       width :  80, sortable : true },
                { header : 'ID подрядчика', dataIndex : 'contractor_code',  width :  80, sortable : true },
                { header : 'Тип',           dataIndex : 'type',             width :  60, sortable : true },
                { header : 'Размер',        dataIndex : 'size',             width :  60, sortable : true },
                { header : 'Город',         dataIndex : 'city',             width :  60, sortable : true },
                { header : 'Адрес',         dataIndex : 'addres',           width : 150, sortable : true },
                { header : 'Период',        dataIndex : 'period',           width :  50, sortable : true },
                { header : 'Прайс',         dataIndex : 'price',            width :  50, sortable : true },
                { header : 'Изменён',       dataIndex : 'modified',         width :  70, sortable : true }
            ]
        });
        this.callParent(arguments);
    }
    
});

// Подробная информация
Ext.define('App.view.buyer.aboutMedia', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.buyerAboutMedia',
    
    initComponent : function() {
        Ext.apply(this, {
            title       : 'Подробнee: <i>щит 54787(Мособлреклама)</i>',
            bodyStyle   : 'background: #DFE8F6;',
            bodyPadding : 15,
            layout      : {
                type    :   'hbox',
                align   :   'stretch'
            },
            defaults    : {
                border      : false,
                flex        : 1,
                bodyStyle   : 'background: #DFE8F6;',
                layout      : 'anchor',
                defaultType : 'displayfield',
                defaults    : {
                    labelWidth  : 140,
                    anchor      : '100%'
                }
            },
            items       : [{
                items: [
                {
                    fieldLabel  : 'Категория',
                    name        : 'cat',
                    value       : 'Наружная реклама'
                },
                {
                    fieldLabel  : 'Носитель',
                    name        : 'media',
                    value       : 'Щит'
                },
                {
                    fieldLabel  : 'Город',
                    name        : 'city'
                },
                {
                    fieldLabel  : 'Размещение',
                    name        : 'contractor'
                },
                {
                    fieldLabel  : 'Адрес',
                    name        : 'description'
                }]
            },{
                items: [
                {
                    fieldLabel: 'Размер',
                    name: 'name'
                },
                {
                    fieldLabel: 'Номер',
                    name: 'price'
                },
                {
                    fieldLabel: 'Сторона',
                    name: 'type'
                },
                {
                    fieldLabel: 'Изображение',
                    name: 'contractor'
                },
                {
                    fieldLabel: 'Изменён',
                    name: 'description'
                }]
            },{
                items: [
                {
                    fieldLabel: 'Период размещения',
                    name: 'name'
                },
                {
                    fieldLabel: 'Прайс',
                    name: 'price'
                }]
            }]
        });
        this.callParent(arguments);
    }
    
});


// Добавить-Редактировать статусы и тарифы
Ext.define('App.view.buyer.addStatusRatesWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.buyerRatesWin',
    width   : 500,
    height  : 400,
    layout  : 'border',

    initComponent : function() {
        
        var title = (this.isEdit?'Редактировать ':'Добавить ') + 'статусы и тарифы';
        
        Ext.apply(this, {
            title   : title,
            items   : [
                this.itemForm(),
                this.itemGrid()
            ]
        });
        this.callParent(arguments);
    },
    
    itemForm: function () {
        return Ext.create('Ext.panel.Panel', {
            region      : 'north',
            border      : false,
            style       : 'border-bottom: #99BCE8 1px solid;',
            height      : 90,
            bodyStyle   : 'background: #DFE8F6;',
            bodyPadding : '10px 15px',
            layout      : {
                type    :   'hbox',
                align   :   'stretch'
            },
            defaults    : {
                border      : false,
                bodyStyle   : 'background: #DFE8F6;',
                layout      : 'anchor',
                defaultType : 'displayfield',
                defaults    : {
                    labelWidth  : 140,
                    //labelAlign  : 'right',
                    cls         : 'bold-label',
                    anchor      : '100%'
                }
            },
            items       : [{
                flex        : 1,
                items: [
                {
                    fieldLabel  : 'Носитель',
                    name        : 'cat',
                    value       : 'Щит'
                },
                {
                    fieldLabel  : 'Номер подрядчика',
                    name        : 'media',
                    value       : '60784'
                },
                {
                    fieldLabel  : 'Подрядчик',
                    name        : 'contractor',
                    value       : 'Мособлреклама'
                }]
            },
            {
                width       : 180,
                defaults    : {
                    labelWidth  : 80,
                    cls         : 'bold-label',
                    anchor      : '100%'
                },
                items: [
                {
                    fieldLabel  : 'Город',
                    name        : 'cat',
                    value       : 'Москва'
                },
                {
                    fieldLabel  : 'Размер',
                    name        : 'size',
                    value       : '5 x 10'
                },
                {
                    fieldLabel  : 'Адрес',
                    name        : 'addres',
                    value       : 'пр. Мира, 117'
                }]
            }]
        });
    },
    
    itemGrid: function () {
        var genData = (!this.isEdit)?
        [
            [],[],[],[],[],[],[],[],
            [],[],[],[],[],[],[],[]
        ]:[
            ['9/1/2011',  '9/30/2011', 'продан', ''],
            ['10/1/2011', '10/31/2011', 'вторая бронь', '1700'],
            ['11/1/2011', '11/30/2011', 'свободен', '1700'],
            ['12/1/2011', '1/3/2012', 'свободен', '1700'],
            [],[],[],[],[],[],[],[],[],[],[],[]
        ];
        
        return Ext.create('Ext.grid.Panel', {
            region  :'center',
            border  : false,
            columnLines : true,
            forceFit    : true,
            tbar    : [
                { xtype : 'tbspacer' },
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : this.isEdit?'Сохранить':'Добавить',
                        iconCls : this.isEdit?'icon-save':'icon-add',
                        name    : 'save',
                        handler : function(btn) {
                            Ext.Msg.show({
                                title   : this.isEdit?'Сохранить':'Добавить',
                                msg     : this.isEdit?'Добавить запись?':'Сохранить запись?',
                                scope   : this,
                                buttons : Ext.Msg.YESNO,
                                icon    : Ext.MessageBox.QUESTION,
                                fn : function(){
                                    btn.up('window').close();
                                }
                            });
                        }
                    }
                },
                '->',
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Закрыть',
                        name    : 'close',
                        scope   : this,
                        handler : function(btn) {
                            btn.up('window').close();
                        }

                    }
                },
                { xtype : 'tbspacer' }
            ],
            store   : Ext.create('Ext.data.ArrayStore', {
                fields:[
                    {name: 'begin', type: 'date'},
                    {name: 'end',   type: 'date'},
                    'status', 
                    'rate'
                ],
                data: genData
            }),
            columns : [
                { header : 'Начало', dataIndex : 'begin',   width :  80, sortable : true, xtype: 'datecolumn', format:'d.m.Y', field: {
                        xtype:'datefield', format: 'm.d.Y' }},
                { header : 'Конец',  dataIndex : 'end',     width :  80, sortable : true, xtype: 'datecolumn', format:'d.m.Y', field: {
                        xtype:'datefield', format: 'm.d.Y' }},
                { header : 'Статус', dataIndex : 'status',  width : 120, sortable : true, 
                    field: {
                        xtype:'combobox',
                        store: ['свободен', 'продан', 'вторая бронь']
                    }},
                { header : 'Тариф', dataIndex : 'rate',     width :  80, sortable : true, field: {xtype:'textfield'} },
                { xtype : 'actioncolumn',  width : 50,
                    items: [{
                        getClass : function(v, meta, rec) {
                            if (rec.data.begin) return 'icon-cross';
                        },
                        tooltip: 'Удалить',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            grid.getStore().removeAt(rowIndex);
                        }
                    }]
                }
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]
        });
    }
        
});
