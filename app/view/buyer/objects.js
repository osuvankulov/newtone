// Дополнительные услуги  - главная панель
Ext.define('App.view.buyer.objects' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.buyerObjects',
    border  : false,
    layout  : 'border',
    
    initComponent : function() {
        this.items = [
            {   // Список доп. услуг
                region  : 'center',
                xtype   : 'buyerObjectsList'
            },
            {   // Подробная информация
                region          : 'south',
                collapsible     : true,
                collapseMode    : 'mini',
                hideCollapseTool: true,
                split           : true,
                height          : 160,
                layout          : 'fit',
                xtype           : 'buyerAboutObject'
            }
        ];
        this.callParent(arguments);
    }
    
});

// Список объектов
Ext.define('App.view.buyer.objectsList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerObjectsList',
    title   : 'Управление базой объектов',
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
                text    : 'Редактировать статусы/тарифы',
                name    : 'editState',
                iconCls : 'icon-edit'
            }
        },
        {xtype:'tbspacer'},
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить объект',
                name    : 'addObject',
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
            fields:['id', 'contractor', 'contractor_code', 'type', 'size', 'city', 'addres', 'period', 'price', 'status', 'modified'],
            data: [ 
                [1, 'Мособлреклама', '54804', 'Щит', '5 х 10', 'Москва', 'ул. Кутузова, 69', '30', 'свободен', '25000', '01.10.2011 14:52'],
                [2, 'Вюрст Медиа', '9870100015', 'Щит', '5 х 10', 'Москва', 'въезд в Балашику с Щелковского шоссе', '15', 'свободен', '15500', '30.09.2011 17:12'],
                [3, 'Мособлреклама', '54787', 'Щит', '5 х 10', 'Москва', 'пр. Мира, 14/1', '30', 'продан', '25000', '01.10.2011 14:52']
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
                { header : 'Адрес',         dataIndex : 'addres',           width : 170, sortable : true },
                { header : 'Период',        dataIndex : 'period',           width :  50, sortable : true },
                { header : 'Статус',        dataIndex : 'status',           width :  50, sortable : true },
                { header : 'Прайс',         dataIndex : 'price',            width :  50, sortable : true },
                { header : 'Изменён',       dataIndex : 'modified',         width :  80, sortable : true }
            ]
        });
        this.callParent(arguments);
    }
    
});

// Подробная информация
Ext.define('App.view.buyer.aboutObject', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.buyerAboutObject',
    
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
                    fieldLabel: 'Статус',
                    name: 'status'
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



// Импорт-Экспорт рекламоносителей/объектов
Ext.define('App.view.buyer.importFilesWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.buyerImportFiles',
    width   : 350,
    layout  : 'fit',
    
    initComponent : function() {
        
        var title = this.isImport?'Импорт ':'Экспорт ';
        title +=    this.isObject?'объектов':'рекламаносителей';
        
        Ext.apply(this, {
            title   : title,
            tbar    : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : this.isImport?'Импорт':'Экспорт',
                        iconCls : 'icon-save',
                        name    : 'import',
                        handler : function() {
                            Ext.Msg.show({
                                title   : 'Импорт',
                                msg     : this.isImport?'Импортировать файл?':'Экспортировать в файл?',
                                scope   : this,
                                buttons : Ext.Msg.YESNO,
                                icon    : Ext.MessageBox.QUESTION,
                                fn : function(){
                                    this.close();
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
                        handler : function() {
                            this.close();
                        }
                        
                    }
                }
            ],
            items : [{ 
                xtype       : 'form',
                scrollbars  : 'auto',
                border      : false,
                bodyStyle   : 'background: #DFE8F6; padding : 15px;',
                defaults    : {
                    anchor      : '100%',
                    labelAlign  : 'top',
                    hideMode    : 'offsets'
                },
                items       :  [
                    {
                        hidden      : !this.isImport,
                        disable     : !this.isImport,
                        xtype       : 'filefield',
                        cls         : 'bold-label',
                        fieldLabel  : 'Файл',
                        name        : 'file'
                    },
                    {
                        fieldLabel  : 'Шаблон '+(this.isImport?'импорта':'экспорта'),
                        name        : 'template',
                        cls         : 'bold-label',
                        xtype       : 'combobox',
                        emptyText   : 'выберите шаблон...',
                        typeAhead   : true,
                        triggerAction: 'all',
                        selectOnTab : true,
                        store       : [
                            'Шаблон для щитов',
                            'банеры',
                            'ситилайты',
                            'листовки',
                            'транспорт'
                        ]
                    }                    
                ]
                
            }]
        });
        this.callParent(arguments);
    }
});

