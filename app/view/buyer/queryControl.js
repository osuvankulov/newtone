// Байер->управление запросами
Ext.define('App.view.buyer.queryControl' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.queryControl',
    border  : false,
    layout  : 'border',
    
    initComponent : function() {
        this.items = [
            {
                region: 'center',
                xtype : 'buyerQueryList'
            },
            {
                region          : 'south',
                collapsible     : true,
                collapseMode    : 'mini',
                hideCollapseTool: true,
                split           : true,
                height          : 193,
                layout          : 'fit',
                xtype : 'buyerAnswerList'
            }
        ];
        this.callParent(arguments);
    }
    
});

// Верхняя панель
Ext.define('App.view.buyer.queryList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerQueryList',
    title   : 'Запросы',
    columnLines : true,
    forceFit: true,
    tbar : [
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить запрос',
                id      : 'addbuyerquery',
                iconCls : 'icon-add'
            }
        },
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Поиск по запросу',
                iconCls : 'icon-search',
                id      : 'btnbuyerquerysearch'
            }
        },
        '->',
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Показать уведомления',
                iconCls : 'icon-task-folder',
                name    : 'notice'
            }
        },
        {
            xtype       : 'searchfield',
            emptyText   : 'строка для поиска'
        },
        {xtype: 'displayfield', width: 20}
    ],
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'queryList',
            columns : [
                {header : '№', dataIndex : 'id', width : 50},
                {header : 'Отправлен', dataIndex : 'senddate', width : 120},
                {header : 'Автор', dataIndex : 'createdby', width : 200, sortable : true},
                {header : 'Регион', dataIndex : 'region', width : 180, sortable : true},
                {header : 'Город', dataIndex : 'city', width : 150, sortable : true},
                {header : 'Тип', dataIndex : 'type', width : 150, sortable : true},
                {header : 'Комментарий', dataIndex : 'comment',width: 250,sortable : true}
            ]
        });
        this.callParent(arguments);
    }
    
});

// Нижняя панель
Ext.define('App.view.buyer.answerList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerAnswerList',
    title   : 'Ответы',
    columnLines : true,
    forceFit    : true,
    tbar : [
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Импорт',
                name    : 'import'
            }
        },
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить объект',
                iconCls : 'icon-add',
                name    : 'addObj'
            }
        },
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить статусы/тарифы',
                name    : 'addState',
                iconCls : 'icon-add'
            }
        },
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Дополнительные услуги',
                iconCls : 'icon-add-folder',
                name    : 'addServ'
            }
        },
        /*{
            text    : 'Тест',
            iconCls : 'icon-add-folder',
            name    : 'testBtn',
            handler : function (b) {
            
                var store = Ext.create('Ext.data.ArrayStore', {
                    fields: [
                       {name: 'id', type: 'int'},
                       {name: 'name'},
                       {name: 'value'}
                    ],
                    data: [
                        [ 1, 'Категория',       'наружная'          ],
                        [ 2, 'Вид носителя',    'Баннер'            ],
                        [ 3, 'Город',           'Москва'            ],
                        [ 4, 'Размещение',      'Рекламные страницы'],
                        [ 5, 'Адрес',           ''                  ],
                        [ 6, 'Размер',          '5 х 10'            ],
                        [ 7, 'Номер',           10                  ],
                        [ 8, 'Сторона',         'А'                 ],
                        [ 9, 'Количество',      1                   ],
                        [10, 'Транспорт',       ''                  ],
                        [11, 'Маршрут',         ''                  ],
                        [12, 'Станция метро',   'Авиамоторная'      ],
                        [13, 'URL',             'http,//smyth.ru'   ],
                        [14, 'Позиция',           ''                ],
                        [15, 'Название',          ''                ],
                        [16, 'Издание',           ''                ],
                        [17, 'Начало размещения', '10/15/2011'      ],
                        [18, 'Конец размещения',  '10/15/2011'      ],
                        [19, 'Период РК',         15                ],
                        [20, 'Статус',            'Свободен'        ]
                    ]
                });

                var grid = Ext.create('Ext.grid.Panel', {
                    title: 'Array Grid',
                    viewConfig: {
                        stripeRows: true
                    },
                    store: store,
                    selModel: Ext.create('Ext.selection.CheckboxModel'),
                    columns: [
                        {
                            text     : 'Название',
                            width    : 150,
                            sortable : false,
                            dataIndex: 'name'
                        },
                        {
                            text     : 'Значение',
                            sortable : true,
                            flex     : 1,
                            dataIndex: 'value',
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return value;
                            },
                            field: {
                                xtype: 'combobox',
                                triggerAction: 'all',
                                selectOnTab: true,
                                store: 'queryListPropVals',
                                mode: 'remote',
                                displayField: 'name',
                                valueField: 'name',
                                listClass: 'x-combo-list-small',
                                listeners: {
                                    beforequery : function(e, opts) {
                                        var store = e.combo.store;
                                        store.clearFilter(true);
                                        store.filter('prop_id', e.combo.recPropId);
                                        return true;
                                    }
                                }
                            }
                        }
                    ],
                    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1,
                            listeners:{
                                beforeedit : function (editor, e, options) {
                                    if (editor.colIdx==2) {
                                        editor.column.field.recPropId = editor.record.data.id;
                                    }
                                }
                            }
                    })]
                });


                Ext.define('MyTestWindow', {
                    extend  : 'Ext.window.Window',
                    height  : 500,
                    width   : 900,
                    modal   : true,
                    alias   : 'widget.myTestWindow',
                    border  : false,
                    title   : 'Новый поиск',
                    layout  : 'fit',
                    initComponent : function() {
                        Ext.apply(this, {
                            items : [ grid ]
                        });
                        this.callParent(arguments);
                    }
                });
            
                Ext.create('MyTestWindow').show();
            }
        },*/
        '->',
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Экспорт',
                name    : 'export'
            }
        },
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Отправить ответ',
                name    : 'sendAnsw'
            }
        },
        {
            xtype       : 'searchfield',
            emptyText   : 'строка для поиска'
        }
    ],
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'answerStore',
            columns : [
                {header : '№', dataIndex : 'id', width : 30},
                {header : 'Носитель', dataIndex : 'carrier', width : 50},
                {header : 'ID подрядчика', dataIndex : 'contractor_code', width : 60},
                {header : 'Город', dataIndex : 'city', width : 50},
                {header : 'Размер', dataIndex : 'size', width : 50},
                {header : 'Статус', dataIndex : 'status', width : 50},
                {header : 'Начало размещения', dataIndex : 'begindate', width : 80},
                {header : 'Конец размещения', dataIndex : 'enddate', width : 80},
                {header : 'Период РК', dataIndex : 'rkperiod', width : 60},
                {header : 'Дополнительные услуги', dataIndex : 'addserv', width : 130},
                {
                    xtype:'actioncolumn',
                    width: 50,
                    items: [
                        {
                            icon: 'images/icons/cross.png',
                            width: 50
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
    
});


// Окно добавления нового поиска
Ext.define('App.view.buyer.addBuyerQuerySearch', {
    extend  : 'Ext.window.Window',
    height: 550,
    width: 650,
    modal: true,
    alias   : 'widget.addBuyerQuerySearch',
    border  : false,
    title: 'Новый поиск',
    layout: {
            type: 'hbox',
            align: 'stretch'
        },
    initComponent : function() {
        Ext.apply(this, {
            items : [
                this.buildLeftPanel(),
                this.buildCenterPanel(),
                this.buildRightPanel()
            ],
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Сохранить',
                        iconCls : 'icon-save',
                        name    : 'save'
                    }
                },
                '->',
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Закрыть',
                        handler : function (btn) {
                            Ext.Msg.show({
                                title:'Новый поиск',
                                msg: 'Сохранить изменения?',
                                scope: this,
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.MessageBox.QUESTION,
                                fn: function () {
                                    btn.up('window').close();
                                }
                            });
                        }
                        
                    }
                }
            ]
        });
        this.callParent(arguments);
        
    },
     //Центральная панель с кнопками
    buildCenterPanel : function() {
        return {
            flex  : 1,
            border  : false,
            frame : true,
            xtype   : 'panel',
            layout: {
                        type:'vbox',
                        pack:'center',
                        align:'center'
                    },
            defaults: {
                xtype: 'button'
            },
            items:[
                {
                    text: '>'
                },
                {xtype: 'displayfield', height: 15},
                {
                    text: '> >'
                },
                {xtype: 'displayfield', height: 15},
                {
                    text: '<'
                },
                {xtype: 'displayfield', height: 15},
                {
                    text: '< <'
                }
            ]
        };
    },
    buildLeftPanel : function() {
        return {
            flex  : 4,
            border  : false,
            selModel    : Ext.create('Ext.selection.CheckboxModel'),
            xtype   : 'propertygrid',
            customEditors:{
                "Категория": {
                    store         : 'querycategory',
                    xtype         : 'combo',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите категорию...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Вид носителя":{
                    store         : 'queryvidnositel',
                    xtype         : 'combo',
                    hiddenName    : 'queryvidnositel',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите вид носителя...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Город":{
                    store         : 'querycity',
                    xtype         : 'combo',
                    hiddenName    : 'querycity',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите город...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Размещение":{
                    store         : 'queryrazmeshstore',
                    xtype         : 'combo',
                    hiddenName    : 'queryrazmesh',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите размещение...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Размер":{
                    store         : 'queryrazmerstore',
                    xtype         : 'combo',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите размер...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Станция метро":{
                    store         : 'querymetrostore',
                    xtype         : 'combo',
                    hiddenName    : 'querymetro',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите станцию метро...',
                    allowBlank   : false,
                    anchor        : '100%'
                }

            },
            source: {
                "Категория": "наружная",
                "Вид носителя": "Баннер",
                "Город": "Москва",
                "Размещение":"Рекламные страницы",
                "Адрес":"",
                "Размер":"5 х 10",
                "Номер": 10,
                "Сторона":"А",
                "Количество":1,
                "Транспорт":"",
                "Маршрут":"",
                "Станция метро":"Авиамоторная",
                "URL":"http://smyth.ru",
                "Позиция":"",
                "Название":"",
                "Издание":"",
                "Начало размещения": Ext.Date.parse('10/15/2011', 'm/d/Y'),
                "Конец размещения": Ext.Date.parse('10/15/2011', 'm/d/Y'),
                "Период РК": 15,
                "Стату": "Свободен"
            }

        };
    },
    buildRightPanel : function() {
        return {
            flex  : 4,
            border  : false,
            selModel    : Ext.create('Ext.selection.CheckboxModel'),
            xtype   : 'propertygrid',
            customEditors:{
                "Категория": {
                    store         : 'querycategory',
                    xtype         : 'combo',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите категорию...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Вид носителя":{
                        store         : 'queryvidnositel',
                        xtype         : 'combo',
                        hiddenName    : 'queryvidnositel',
                        displayField  : 'name',
                        valueField    : 'name',
                        triggerAction : 'all',
                        mode          : 'remote',
                        selectOnFocus : true,
                        editable      : false,
                        emptyText     : 'выберите вид носителя...',
                        allowBlank   : false,
                        anchor        : '100%'
                },
                "Город":{
                    store         : 'querycity',
                    xtype         : 'combo',
                    hiddenName    : 'querycity',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите город...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Размещение":{
                    store         : 'queryrazmeshstore',
                    xtype         : 'combo',
                    hiddenName    : 'queryrazmesh',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите размещение...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Размер":{
                    store         : 'queryrazmerstore',
                    xtype         : 'combo',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите размер...',
                    allowBlank   : false,
                    anchor        : '100%'
                },
                "Станция метро":{
                    store         : 'querymetrostore',
                    xtype         : 'combo',
                    hiddenName    : 'querymetro',
                    displayField  : 'name',
                    valueField    : 'name',
                    triggerAction : 'all',
                    mode          : 'remote',
                    selectOnFocus : true,
                    editable      : false,
                    emptyText     : 'выберите станцию метро...',
                    allowBlank   : false,
                    anchor        : '100%'
                }

            },
            source: {
                "Категория": "наружная",
                "Вид носителя": "Баннер",
                "Город": "Москва",
                "Размещение":"Рекламные страницы",
                "Адрес":"",
                "Размер":"5 х 10",
                "Номер": 10,
                "Сторона":"А",
                "Количество":1,
                "Транспорт":"",
                "Маршрут":"",
                "Станция метро":"Авиамоторная",
                "URL":"http://smyth.ru",
                "Позиция":"",
                "Название":"",
                "Издание":"",
                "Начало размещения": Ext.Date.parse('10/15/2011', 'm/d/Y'),
                "Конец размещения": Ext.Date.parse('10/15/2011', 'm/d/Y'),
                "Период РК": 15,
                "Стату": "Свободен"
            }
        };
    }
});

// Окно добавления нового запроса
Ext.define('App.view.buyer.addBuyerQuery', {
    isObject: false,
    extend  : 'Ext.window.Window',
    resizable : false,
    scrollbars: 'auto',
    width: 450,
    maxHeight   : 400,
    modal: true,
    alias   : 'widget.addBuyerQuery',
    border  : false,
    title: 'Добавить запрос',
    layout  : 'fit',
    initComponent : function() {
        Ext.apply(this, {
            items : [
                {
                    xtype: 'form',
                    scrollbars: 'auto',
                    border      : false,
                    autoScroll  : true,
                    bodyStyle   : 'background: #DFE8F6; padding : 15px;',
                    defaults    : {
                        anchor : '100%',
                        labelWidth  : 140,
                        hideMode: 'offsets',
                        hidden: true
                    },
                    items:  this.getformItems()
                }
            ],
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Сохранить',
                        iconCls: 'icon-save',
                        handler : function() {
                            Ext.Msg.show({
                                title:this.up('addBuyerQuery').isObject?'Объект':'Запрос',
                                msg: 'Сохранить изменения?',
                                scope: this,
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.MessageBox.QUESTION,
                                fn: function(){
                                    this.up('addBuyerQuery').close();
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
                        id: 'buyerquaeryaddclosebutton',
                        handler : function() {
                            Ext.Msg.show({
                                title:this.up('addBuyerQuery').isObject?'Объект':'Запрос',
                                msg: 'Сохранить изменения?',
                                scope: this,
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.MessageBox.QUESTION,
                                fn: function(){
                                    this.up('addBuyerQuery').close();
                                }
                            });
                        }
                        
                    }
                }
            ]
        });
        this.callParent(arguments);
        this.on('render', function () {
            if (this.isObject) {
                this.down('form').getForm().findField('state').show();
                this.down('form').getForm().findField('contractor').show();
                this.down('form').getForm().findField('contractor_code').show();
            } else { 
                this.down('form').getForm().findField('state').hide();
                this.down('form').getForm().findField('contractor').hide();
                this.down('form').getForm().findField('contractor_code').hide();
            }
        }, this);
    },
    
    getformItems : function() {
        return [
            {
                store         : 'querycategory',
                fieldLabel    : 'Категория',
                cls           : 'bold-label',
                hidden        : false,
                id            : 'bayercategorylistcombo',
                xtype         : 'combo',
                hiddenName    : 'bayercategorylistcombo',
                displayField  : 'name',
                valueField    : 'id',
                triggerAction : 'all',
                mode          : 'remote',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите категорию...',
                allowBlank   : false,
                anchor        : '100%',
                listeners   : {
                    'select': function(cmb, val){
                        var form = cmb.up('form'),
                            tval=val[0].data.id;

                                            
                        form.items.each(function (item, indx, len) {
                            if (item.getXType()=='fieldcontainer'&&item.name=='aq_amount') { 
                                if (tval==3) item.hide();
                                    else item.show();
                            }
                        });
                

                        if (tval==1) {
                            Ext.getCmp('querycity').show();
                            Ext.getCmp('queryrazmesh').show();
                            Ext.getCmp('aq_address').show();
                            Ext.getCmp('aq_num').show();
                            Ext.getCmp('aq_side').show();
                            Ext.getCmp('aq_transport').hide();
                            Ext.getCmp('aq_marshrut').hide();
                            Ext.getCmp('aq_url').hide();
                            Ext.getCmp('aqSiteName').hide();
                            Ext.getCmp('aq_position').hide();
                            Ext.getCmp('queryvidizd').hide();
                            Ext.getCmp('querymetro').hide();
                            //Ext.getCmp('queryperiodrk').hide();
                        }else if (tval==2){
                            Ext.getCmp('querycity').show();
                            Ext.getCmp('queryrazmesh').hide();
                            Ext.getCmp('aq_address').hide();
                            Ext.getCmp('aq_num').show();
                            Ext.getCmp('aq_side').hide();
                            Ext.getCmp('aq_transport').show();
                            Ext.getCmp('aq_marshrut').show();
                            Ext.getCmp('aq_url').hide();
                            Ext.getCmp('aqSiteName').hide();
                            Ext.getCmp('aq_position').hide();
                            Ext.getCmp('queryvidizd').hide();
                            Ext.getCmp('querymetro').hide();
                            //Ext.getCmp('queryperiodrk').show();
                        }else if (tval==3){
                            Ext.getCmp('querycity').hide();
                            Ext.getCmp('queryrazmesh').hide();
                            Ext.getCmp('aq_address').hide();
                            Ext.getCmp('aq_num').hide();
                            Ext.getCmp('aq_side').hide();
                            Ext.getCmp('aq_transport').hide();
                            Ext.getCmp('aq_marshrut').hide();
                            Ext.getCmp('aq_url').show();
                            Ext.getCmp('aqSiteName').show();
                            Ext.getCmp('aq_position').show();
                            Ext.getCmp('queryvidizd').hide();
                            Ext.getCmp('querymetro').hide();
                            //Ext.getCmp('queryperiodrk').show();
                        }else if (tval==4){
                            Ext.getCmp('querycity').show();
                            Ext.getCmp('queryrazmesh').hide();
                            Ext.getCmp('aq_address').hide();
                            Ext.getCmp('aq_num').hide();
                            Ext.getCmp('aq_side').hide();
                            Ext.getCmp('aq_transport').hide();
                            Ext.getCmp('aq_marshrut').hide();
                            Ext.getCmp('aq_url').hide();
                            Ext.getCmp('aqSiteName').hide();
                            Ext.getCmp('aq_position').hide();
                            Ext.getCmp('queryvidizd').show();
                            Ext.getCmp('querymetro').hide();
                            //Ext.getCmp('queryperiodrk').show();
                        }else if (tval==5){
                            Ext.getCmp('querycity').show();
                            Ext.getCmp('queryrazmesh').show();
                            Ext.getCmp('aq_address').hide();
                            Ext.getCmp('aq_num').show();
                            Ext.getCmp('aq_side').hide();
                            Ext.getCmp('aq_transport').hide();
                            Ext.getCmp('aq_marshrut').hide();
                            Ext.getCmp('aq_url').hide();
                            Ext.getCmp('aqSiteName').hide();
                            Ext.getCmp('aq_position').hide();
                            Ext.getCmp('queryvidizd').hide();
                            Ext.getCmp('querymetro').show();
                            //Ext.getCmp('queryperiodrk').show();
                        }else if (tval==6){
                            Ext.getCmp('querycity').show();
                            Ext.getCmp('queryrazmesh').show();
                            Ext.getCmp('aq_address').show()();
                            Ext.getCmp('aq_num').hide();
                            Ext.getCmp('aq_side').hide();
                            Ext.getCmp('aq_transport').hide();
                            Ext.getCmp('aq_marshrut').hide();
                            Ext.getCmp('aq_url').hide();
                            Ext.getCmp('aqSiteName').hide();
                            Ext.getCmp('aq_position').show()();
                            Ext.getCmp('queryvidizd').hide();
                            Ext.getCmp('querymetro').hide();
                            //Ext.getCmp('queryperiodrk').show();
                        }
                        
                        Ext.getCmp('queryvidnositel').show();
                        Ext.getCmp('queryrazmer').show();
                        form.down('fieldset').show();
                        
                    }
                }
            },
            {
                xtype       : 'combobox',
                cls         : 'bold-label',
                multiSelect : true,
                fieldLabel  : 'Подрядчик',
                name        : 'contractor',
                emptyText   : 'выберите подрядчика...',
                typeAhead   : true,
                triggerAction: 'all',
                selectOnTab : true,
                store       : [
                    'Вюрст-Медиа',
                    'Мособлреклама',
                    'Москва+',
                    'Екатеринбург-реклама',
                    '...'
                ]
            },
            {
                xtype       : 'textfield',
                cls         : 'bold-label',
                fieldLabel  : 'ID подрядчика',
                name        : 'contractor_code'
            },
            {
                id            : 'queryvidnositel',
                xtype         : 'combo',
                cls           : 'bold-label',
                multiSelect   : true,
                store         : 'queryvidnositel',
                fieldLabel    : 'Вид носителя',
                hiddenName    : 'queryvidnositel',
                displayField  : 'name',
                valueField    : 'id',
                triggerAction : 'all',
                mode          : 'remote',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите вид носителя...',
                allowBlank   : false,
                anchor        : '100%'
            },
            {
                store         : 'querycity',
                fieldLabel    : 'Город',
                id            : 'querycity',
                xtype         : 'combo',
                multiSelect   : true,
                hiddenName    : 'querycity',
                displayField  : 'name',
                valueField    : 'id',
                triggerAction : 'all',
                mode          : 'remote',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите город...',
                allowBlank   : false,
                anchor        : '100%'
            },
            {
                store         : 'queryrazmeshstore',
                fieldLabel    : 'Размещение',
                id            : 'queryrazmesh',
                xtype         : 'combo',
                multiSelect   : true,
                hiddenName    : 'queryrazmesh',
                displayField  : 'name',
                valueField    : 'id',
                triggerAction : 'all',
                mode          : 'remote',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите размещение...',
                allowBlank   : false,
                anchor        : '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Адрес',
                id: "aq_address",
                name: 'address'
            },
            {
                store         : 'queryrazmerstore',
                fieldLabel    : 'Размер',
                cls           : 'bold-label',
                id            : 'queryrazmer',
                xtype         : 'combo',
                multiSelect   : true,
                hiddenName    : 'queryrazmer',
                displayField  : 'name',
                valueField    : 'id',
                triggerAction : 'all',
                mode          : 'remote',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите размер...',
                allowBlank   : false,
                anchor        : '100%'
            },
            {
                xtype: 'textfield',
                id: 'aq_num',
                fieldLabel: 'Номер',
                name: 'num'
            },
            {
                xtype: 'textfield',
                id: 'aq_side',
                fieldLabel: 'Сторона',
                name: 'side'
            },
            {
                xtype       : 'fieldcontainer',
                name        : 'aq_amount',
                layout      : 'hbox',
                items       : [
                    {
                        anchor : '100%',
                        labelWidth  : 140,
                        xtype: 'numberfield',
                        fieldLabel: 'Количество',
                        flex    : 1,
                        allowDecimals: false,
                        name: 'amount',
                        minValue: 0
                    },
                    {
                        xtype       : 'button',
                        iconCls     : 'icon-add',
                        tooltip     : 'Добавить',
                        btnname     : 'add',
                        width       : 22,
                        handler     : function (btn) {
                            var cont = btn.up('fieldcontainer'),
                                form = btn.up('form'),
                                index, i = 1;

                            if (btn.btnname == 'add') {
                                form.items.each(function (item, indx, len) { console.log('add');
                                    if (item.getXType()=='fieldcontainer'&&item.name=='aq_amount'&&cont==item) { 
                                        index = indx; return; 
                                    }
                                });
                                form.insert(index+1, cont.cloneConfig({}));
                            } else {
                                form.remove(cont);
                            }
                            
                            form.items.each(function (item, indx, len) {
                                if (item.getXType()=='fieldcontainer'&&item.name=='aq_amount') {
                                    item.show();
                                    var bbar = item.items.getAt(1);
                                    if (i==1) {
                                        bbar.btnname = 'add';
                                        bbar.setIconCls('icon-add');
                                    } else {
                                        bbar.btnname = 'del';
                                        bbar.setIconCls('icon-minus');
                                    }
                                    i++;
                                }
                            });
                            
                        }
                    }
                ]
                
                
            },
            {
                xtype: 'textfield',
                id: 'aq_transport',
                fieldLabel: 'Транспорт',
                name: 'transportname'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Маршрут',
                id: 'aq_marshrut',
                name: 'marshrut'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Название сайта',
                id: 'aqSiteName',
                name: 'aq_site_name'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'URL',
                id: 'aq_url',
                name: 'aq_url'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Позиция',
                id: 'aq_position',
                name: 'position'
            },
            {
                store         : 'queryvidizdstore',
                fieldLabel    : 'Вид издания',
                id            : 'queryvidizd',
                xtype         : 'combo',
                multiSelect   : true,
                hiddenName    : 'queryvidizd',
                displayField  : 'name',
                valueField    : 'id',
                triggerAction : 'all',
                mode          : 'remote',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите вид издания...',
                allowBlank   : false,
                anchor        : '100%'
            },
            {
                store         : 'querymetrostore',
                fieldLabel    : 'Станция метро',
                id            : 'querymetro',
                xtype         : 'combo',
                multiSelect   : true,
                hiddenName    : 'querymetro',
                displayField  : 'name',
                valueField    : 'id',
                triggerAction : 'all',
                mode          : 'remote',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите станцию метро...',
                allowBlank   : false,
                anchor        : '100%'
            },
            {
                store         : ['свободен', 'занят', 'вторая бронь', 'резерв', 'гарантированно'],
                fieldLabel    : 'Статус',
                cls           : 'bold-label',
                name          : 'state',
                xtype         : 'combo',
                multiSelect   : true,
                triggerAction : 'all',
                mode          : 'local',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'установите статус...',
                allowBlank   : false,
                anchor        : '100%'
            },
            {
                xtype   : 'fieldset',
                multiSelect   : true,
                name    : 'period',
                title   : '1',
                collapsible: true,
                defaults    : {
                    anchor      : '100%',
                    labelWidth  : 140
                },
                items: [
                    {
                        xtype       : 'datefield',
                        cls         : 'bold-label',
                        fieldLabel  : 'Начало размещения'
                    },
                    {
                        xtype       : 'datefield',
                        cls           : 'bold-label',
                        fieldLabel: 'Конец размещения'
                    },
                    {
                        xtype       : 'fieldcontainer',
                        cls         : 'bold-label',
                        fieldLabel  : 'Период РК',
                        layout      : 'hbox',
                        items   : [
                            {
                                xtype       : 'numberfield',
                                allowDecimals: false,
                                flex        : 2,
                                width       : 60,
                                name        : 'queryperiodrkdays',
                                minValue: 0
                            }, {
                                xtype   : 'splitter'
                            }, {
                                flex: 1,
                                store         : 'querydaysstore',
                                xtype         : 'combo',
                                hiddenName    : 'querydays',
                                displayField  : 'name',
                                valueField    : 'id',
                                triggerAction : 'all',
                                mode          : 'remote',
                                selectOnFocus : true,
                                editable      : false,
                                allowBlank   : false
                            }
                        ]
                    },
                    {
                        xtype       : 'panel',
                        height      : 26,
                        layout: {
                            type    : 'hbox',
                            align   : 'stretch'
                        },
                        border      : false,
                        bodyStyle   : 'background: #DFE8F6; padding : 0 15px;',
                        items   : [
                            {
                                xtype   : 'button',
                                text    : 'Добавить новый период',
                                flex    : 1,
                                handler : function (btn) {
                                    var fieldset = btn.up('fieldset'),
                                        form = btn.up('form'),
                                        index, i = 1;

                                    form.items.each(function (item, indx, len) {
                                        if (item.getXType()=='fieldset'&&item.name=='period'&&fieldset==item) { index = indx; return; }
                                    });
                                    form.insert(index+1, fieldset.cloneConfig({}));
                                    form.items.each(function (item, indx, len) {
                                        if (item.getXType()=='fieldset'&&item.name=='period') {
                                            item.show();
                                            var bbar = item.items.getAt(3);
                                            if (i!=1) {
                                                bbar.items.getAt(1).show();
                                                bbar.items.getAt(2).show();
                                            } else {
                                                bbar.items.getAt(1).hide();
                                                bbar.items.getAt(2).hide();
                                            }
                                            item.setTitle(i++);
                                        }
                                    });
                                }
                            },
                            { hidden:true,xtype:'tbspacer',width:20},
                            {
                                hidden  : true,
                                xtype   : 'button',
                                text    : 'Удалить',
                                flex    : 1,
                                handler : function (btn) {
                                    var fieldset = btn.up('fieldset'),
                                        form = btn.up('form'), 
                                        i = 1;
                                        
                                    form.remove(fieldset);
                                    form.items.each(function (item, indx, len) {
                                        if (item.getXType()=='fieldset'&&item.name=='period') {
                                            var bbar = item.items.getAt(3);
                                            if (i!=1) {
                                                bbar.items.getAt(1).show();
                                                bbar.items.getAt(2).show();
                                            } else {
                                                bbar.items.getAt(1).hide();
                                                bbar.items.getAt(2).hide();
                                            }
                                            item.setTitle(i++);
                                        }
                                    });
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

// Окно поиска по запросу
Ext.define('App.view.buyer.BuyerQuerySearch', {
    extend  : 'Ext.window.Window',
    height: 570,
    scrollbars: 'auto',
    width: 1020,
    modal: true,
    alias   : 'widget.BuyerQuerySearch',
    border  : false,
    title   : 'Поиск по запросу',
    layout  : 'border',
    initComponent : function() {
        Ext.apply(this, {
            items :
            [
                this.getTopPanel(),
                this.getCenterPanel(),
                this.getBottomPanel()
            ]
        });
        this.callParent(arguments);
        
    },
    getBottomPanel: function(){
        return {
            xtype: 'gridpanel',
            region: 'south',
            split: true,
            height: 400,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            collapsible     : true,
            collapseMode    : 'mini',
            title   : 'Результаты',
            columnLines : true,
            forceFit    : true,
            border  : false,
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Импорт'
                    }
                },
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Добавить объект',
                        iconCls : 'icon-add',
                        name    : 'AddObj'
                    }
                },
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Сохранить выбор',
                        iconCls : 'icon-save',
                        name    : 'saveSel'
                    }
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
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Добавить к результату',
                        iconCls : 'icon-add-folder'
                    }
                },
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Исключить из результата',
                        iconCls : 'icon-delete-folder'
                    }
                },
                {
                    xtype       : 'searchfield',
                    emptyText   : 'поиск по результатам'
                }
            ],
            store   : 'querySearchResultsStore',
            columns : [
                {header : 'Подрядчик', dataIndex : 'podryadchik'},
                {header : '№', dataIndex : 'numb'},
                {header : 'Носитель', dataIndex : 'carrier', width : 120},
                {header : 'Город', dataIndex : 'city', width : 120},
                {header : 'Размещение', dataIndex : 'razmesh', width : 120},
                {header : 'Размер', dataIndex : 'size', width : 120},
                {header : 'Сторона', dataIndex : 'side', width : 120},
                {header : 'Статус', dataIndex : 'status', width : 120},
                {header : 'Начало', dataIndex : 'begindate', width : 120},
                {header : 'Конец', dataIndex : 'enddate', width : 120},
                {
                    xtype:'actioncolumn',
                    width: 50,
                    items: [
                        {
                            icon: 'images/icons/cross.png',
                            width: 50,
                            getClass: function(value,metadata,record){
                                var tmpval = record.get('side');
                                if (tmpval == "А" ) {
                                    return 'x-hide-display';
                                } else {
                                    return 'x-grid-center-icon';
                                }
                            }

                        },
                        {
                            icon: 'images/icons/tick2.png',
                            width: 50,
                            getClass: function(value,metadata,record){
                                var tmpval = record.get('side');
                                if (tmpval == "Б" ) {
                                    return 'x-hide-display';
                                } else {
                                    return 'x-grid-center-icon';
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    getCenterPanel: function(){
        return {
            xtype: 'gridpanel',
            region: 'center',
            title   : 'Поиски',
            columnLines : true,
            forceFit    : true,
            height: 150,
            border  : false,
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Новый поиск',
                        iconCls : 'icon-add',
                        id : 'addbuyerquerysearch'
                    }
                },
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Обновить результат',
                        iconCls : 'icon-refresh'
                    }
                },
                '->',
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Удалить поиск',
                        iconCls : 'icon-delete'
                    }
                },
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Объединить результаты'
                    }
                },
                {
                    xtype       : 'searchfield',
                    emptyText   : 'поиск по поискам'
                }
            ],
            store   : 'querySearchAnswersStore',
            columns : [
                {header : '№', dataIndex : 'id', width : 50},
                {header : 'Отправлен', dataIndex : 'senddate', width : 120},
                {header : 'Автор', dataIndex : 'author', width : 120},
                {header : 'Носитель', dataIndex : 'carrier', width : 120},
                {header : 'Город', dataIndex : 'city', width : 120},
                {header : 'Параметры запроса', dataIndex : 'queryparams', width : 120}
            ]
        }
    },
    getTopPanel: function() {
        return {
            xtype: 'form',
            title: 'Запрос №344 от Сусанина Ивана',
            region: 'north',
            border : false,
            layout: 'hbox',
            bodyStyle   : 'background: #DFE8F6; ',
            defaults:{
              style: 'border-width: 0px',
              xtype:'fieldset',
                    flex: 1,
                    defaults: {
                        xtype: 'displayfield'
                    }
            },
            items   :[
                {
                    items :[
                        {
                            fieldLabel: '<b>Категория</b>',
                            value: 'Наружная реклама'
                        }, {
                            fieldLabel: '<b>Носитель</b>',
                            value : 'ситилайт'
                        }, {
                            fieldLabel: '<b>Город</b>',
                            value : 'Калининград'
                        }, {
                            fieldLabel: '<b>Размещение</b>',
                            value : 'перекрёсток'
                        }, {
                            fieldLabel: '<b>Адрес</b>',
                            value : 'ул. Гоголя, пл. Восстания'
                        }
                    ]
                },
                {
                    items :[
                        {
                            fieldLabel: '<b>Размер</b>',
                            value: '1 х 2, 1 х 3'
                        }, {
                            fieldLabel: '<b>Номер</b>',
                            value : '12 (64)'
                        }, {
                            fieldLabel: '<b>Сторона</b>',
                            value : 'А, Б'
                        }, {
                            fieldLabel: '<b>Количество</b>',
                            value : '4'
                        }, {
                            fieldLabel: '<b>Станция метро</b>',
                            value : 'Академическая, Вос...'
                        }
                    ]
                },
                {
                    items :[
                        {
                            fieldLabel: '<b>Транспорт</b>',
                            value: 'троллейбус'
                        }, {
                            fieldLabel: '<b>Маршрут</b>',
                            value : '24, 54, 21, 66, 112'
                        }, {
                            fieldLabel: '<b>Вид издания</b>',
                            value : 'газета'
                        }, {
                            fieldLabel: '<b>Название</b>',
                            value : 'Аргументы и Факты'
                        }, {
                            fieldLabel: '<b>Url</b>',
                            value : '<a href="http://aif.ru" target="_blank">www.aif.ru</a>'
                        }
                    ]
                },
                {
                    items :[
                        {
                            fieldLabel: '<b>Позиция</b>',
                            value: 'верхний баннер'
                        }, {
                            fieldLabel: '<b>Начало размещения</b>',
                            value : '20.09.2011'
                        }, {
                            fieldLabel: '<b>Конец размещения</b>',
                            value : '20.01.2012'
                        }, {
                            fieldLabel: '<b>Период РК</b>',
                            value : '1 месяц'
                        }
                    ]
                }
            ]
        }
    }
});

// Окно дополнительные услуги
Ext.define('App.view.buyer.addServWin', {
    extend  : 'Ext.window.Window',
    height  : 450,
    closable : false,
    //scrollbars  : 'auto',
    width   : 860,
    //modal   : true,
    alias   : 'widget.buyerAddServWin',
    border  : false,
    title   : 'Дополнительные услуги: запрос №165 от Ивана Сусанина, Москва, Метро',
    layout  : 'border',
    tbar : [
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Сохранить',
                iconCls : 'icon-save',
                name    : 'save'
            }
        },
        '->',
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Закрыть',
                name    : 'close'
            }
        }
    ],
    
    initComponent   : function() {
        Ext.apply(this, {
            items :
            [
                this.getCenterPanel(),
                this.getBottomPanel()
            ]
        });
        this.callParent(arguments);
        
        this.on('show', function () {
            this.down('buyerQueryAddServList').getStore().load();
        }, this);
        
    },
    getCenterPanel: function(){
        return {
            xtype   : 'buyerQueryAddServList',
            border  : false,
            region  : 'center'
        }
    },
    getBottomPanel: function(){
        return {
            xtype: 'gridpanel',
            region: 'south',
            split: true,
            height: 200,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            collapsible     : true,
            collapseMode    : 'mini',
            title   : 'Объекты',
            columnLines : true,
            forceFit    : true,
            //border  : false,
            tbar : [
                {
                    xtype : 'buttongroup',
                    defaults: {toggleGroup : 'answerSelect', width : 100},
                    items : [
                        {
                            text    : 'Отмеченные',
							handler	: function(btn) {if (!btn.pressed) btn.toggle();}
                        },
                        {
                            text    : 'Неотмеченные',
							handler	: function(btn) {if (!btn.pressed) btn.toggle();}
                        },
                        {
                            text    : 'Все',
                            pressed : true,
							handler	: function(btn) {if (!btn.pressed) btn.toggle();}
                        }
                    ]
                },
                '->',
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Экспорт',
                        width   : 100
                    }
                },
                ' ',
                {
                    xtype       : 'searchfield',
                    emptyText   : 'поиск'
                },
                {xtype: 'displayfield', width: 20}
            ],
            store   : 'additionServResultsStore',
            columns : [
                {header : 'ID',        dataIndex : 'id',           width : 25,  hidden   : true},
                {header : 'Носитель',  dataIndex : 'carrier', width : 120},
                {header : 'Подрядчик', dataIndex : 'contractor', width : 120},
                {header : 'ID подрядчика', dataIndex : 'contractor_code', width : 80},
                {header : 'Город',     dataIndex : 'city', width : 80},
                {header : 'Размер',    dataIndex : 'size', width : 60},
                {header : 'Статус',    dataIndex : 'status', width : 60},
                {header : 'Начало',    dataIndex : 'begin', width : 60},
                {header : 'Конец',     dataIndex : 'end', width : 60},
                {header : 'Период РК', dataIndex : 'period', width : 60},
                {
                    xtype:'actioncolumn',
                    width: 50,
                    items: [{
                        getClass : function(v, meta, rec) {
                            if (rec.data.begin) return 'icon-cross';
                        },
                        tooltip: 'Удалить',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title   :'Удаление объекта',
                                msg     : 'Вы уверены что хотите удалить?',
                                scope   : this,
                                buttons : Ext.Msg.YESNO,
                                icon    : Ext.MessageBox.QUESTION,
                                fn      : function (msgbtn) {
                                    if (msgbtn == 'yes') {
                                        grid.getStore().removeAt(rowIndex);
                                    }
                                }
                            });
                        }
                    }]
                }
            ]
        }
    }
});

// Список дополнительных услуг
Ext.define('App.view.buyer.queryAddServList', {
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.buyerQueryAddServList',
    title       : 'Дополнительные услуги',
    style       : 'border-left: #99BCE8 1px solid; border-right: #99BCE8 1px solid; border-bottom: #99BCE8 1px solid;',
    columnLines : true,
    forceFit    : true,
    selModel    : Ext.create('Ext.selection.CheckboxModel'),
    tbar : [
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Добавить услугу',
                name    : 'addServ',
                iconCls : 'icon-add'
            }
        },
        '->',
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Удалить',
                name    : 'delServ',
                iconCls : 'icon-cross'
            }
        },
        ' ',
        {
            xtype       : 'searchfield',
            emptyText   : 'строка для поиска'
        },
        {xtype: 'displayfield', width: 20}
    ],
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'queryAddServStore',
            columns : [
                {header : 'ID',            dataIndex : 'id',           width : 25,  hidden   : true},
                {header : 'Название',      dataIndex : 'name',         width : 120, sortable : true},
                {header : 'Цена',          dataIndex : 'price',        width : 60,  sortable : true},
                {header : 'Тип рекламы',   dataIndex : 'type',         width : 80,  sortable : true},
                {header : 'Подрядчик',     dataIndex : 'contractor',   width : 180, sortable : true},
                {header : 'Описание',      dataIndex : 'description',  width : 180, sortable : true}
            ]
        });
        this.callParent(arguments);
    }
    
});

// Окно добавления дополнительной услуги из списка  App.view.buyer.addQueryAdditionServWin
Ext.define('App.view.buyer.addServFromListWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.buyerAddServFromListWin',
    width   : 300,
    title   : 'Добавить услугу',
    layout  : 'fit',
    
    initComponent : function() {
        this.callParent(arguments);
    },
    
    tbar    : [
        {
            xtype   : 'buttongroup',
            items   : {
                text    : 'Добавить',
                iconCls : 'icon-add',
                handler : function(btn) {
                    this.up('window').close();
                }
            }
        },
        '->',
        {
            xtype   : 'buttongroup',
            items   : {
                text    : 'Закрыть',
                iconCls : 'icon-cross',
                handler : function() {
                    this.up('window').close();
                }
            }
        }
    ],
    
    items   : {
        xtype       : 'form',
        border      : false,
        bodyStyle   : 'background: #DFE8F6; padding : 15px;',    
        defaults    : {
            anchor      : '100%',
            labelAlign  : 'top'
        },
        items       : [
            {
                fieldLabel  : 'Выберите услугу',
                name        : 'type',
                xtype       : 'combobox',
                //typeAhead   : false,
                //triggerAction: 'all',
                //selectOnTab : true,
                store : [
                    'Монтаж(щит)',
                    'Монтаж(ситилайт)',
                    'Изготовление(щит)',
                    'Изготовление(ситилайт)',
                    'Контроль',
                ]
            },
            {
                hideLabel   :  true,
                boxLabel    : 'Для всех доступных объектов',
                name        : 'forall',
                xtype       : 'checkbox'
            } 
        ]
    }
});

// Окно уведомлений (Запросы->Показать уведомления)
Ext.define('App.view.buyer.showNotificationWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.buyerShowNoticeWin',
    width   : 450,
    height  : 350,
    title   : 'Уведомления по запросу №345',
    layout  : 'fit',
    new_nots    : 1,
    total_nots  : 7,
    
    initComponent : function() {
        Ext.apply(this, {
            tbar    : [
                {xtype: 'tbspacer', width: 5, height:20},
                {xtype: 'tbtext', text: 'Новых уведомлений:'},
                {xtype: 'tbtext', text: this.new_nots.toString(),  width: 20},
                '->',
                {xtype: 'tbtext', text: 'Всего уведомлений:'},
                {xtype: 'tbtext', text: this.total_nots.toString(), width: 20}
            ],
            items : [{ xtype : 'buyerNoticeList' }]
        });
        this.callParent(arguments);
    }
});


var noteStore = Ext.create('Ext.data.ArrayStore', {
    fields:['type', 'time', 'head1', 'head2', 'head3', 'val1', 'val2', 'val3', 'is_new'],
    data: [
        ['Статус',  '16:47 01.10.2011', 'Объект',   'Период',   'Статус',
            'щит М-968', '21.10.2011 - 20.11.2011', 'продан', 1],
        
        ['Тариф',   '11:35 01.10.2011', 'Объект',   'Период',   'Цена',
            'щит 22-9744', '10.10.2011 - 15.11.2011', '15400', 0],
        
        ['Данные',  '10:16 01.10.2011', 'Объект','Старый адрес','Новый адрес',
            'щит М-968', 'ул. Гагарина, 17/2', 'ул. Гагарина, 21', 0],
        
        ['Статус',  '18:05 30.09.2011', 'Объект',   'Период',   'Статус',
            'щит М-968', '21.11.2011 - 20.12.2011', 'свободен', 0],
        
        ['Статус',  '09:45 30.09.2011', 'Объект',   'Период',   'Статус',
            'щит U811445544', '12.11.2011 - 20.12.2011', 'резерв', 0],
        
        ['Статус',  '12:34 29.09.2011', 'Объект',   'Период',   'Статус',
            'щит 787477', '12.11.2011 - 20.12.2011', 'свободен', 0],
        
        ['Данные',  '14:08 28.09.2011', 'Объект','Старый размер','Новый размер',
            'ситилайт 18198', '1,5 x 2', '1,5 x 2,2', 0]
    ]
});


function renderLast1(value, p, r) {
    var color; 
    if (r.data['type']=='Статус') color = 'green';
        else if (r.data['type']=='Тариф') color = 'red'; 
            else color = 'blue';
    return Ext.String.format('<span style="color:{0}; font-weight:bold;">{1}</span><br/><b>{2}</b><br/>{3}<br/>', color, r.data['type'], value, r.data['val1']);
}
function renderLast2(value, p, r) {
    return Ext.String.format('<br/><b>{0}</b><br/>{1}<br/>', value, r.data['val2']);
}
function renderLast3(value, p, r) {
    var color; 
    if (r.data['type']=='Статус') color = 'green';
        else if (r.data['type']=='Тариф') color = 'red'; 
            else color = 'blue';
    return Ext.String.format('<span style="color:{0}; font-weight:bold;">{1}</span><br/><b>{2}</b><br/>{3}<br/>', color, r.data['time'], value, r.data['val3']);
}
// Список уведомлений
Ext.define('App.view.buyer.noticeList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerNoticeList',
    border  : false,
    //columnLines : true,
    forceFit: true,
    viewConfig : { 
        forceFit : true, 
        emptyText : 'Нет записей',
        enableRowBody : true,
        getRowClass : function(record, rowIndex, p, store) {
           if(record.data.is_new){ 
                return 'new-notice-row';
            }
        }
    },
    
    initComponent : function() {
        Ext.apply(this, {
            store   : noteStore,
            columns : [
                {header : '', dataIndex : 'head1', renderer: renderLast1},
                {header : '', dataIndex : 'head2', renderer: renderLast2},
                {header : '', dataIndex : 'head3', renderer: renderLast3}
            ]
        });
        this.callParent(arguments);
    }    
});

