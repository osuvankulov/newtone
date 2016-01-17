// Управление шаблонами Экспорт.

Ext.define('App.view.buyer.templateControlExport' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.templateControlExport',
    layout  : 'border',
    border  : false,
    initComponent : function() {
        this.items = [
                {
                    xtype: 'templateControlExportList',
                    title: 'Шаблоны Экспорта'
                },{
                    xtype: 'templateControlExportBottom',
                    title: 'Шаблон: Для наружки'
                }
            ]
        this.callParent(arguments);
    }
    
});

//Грид список шаблонов импорта
Ext.define('App.view.buyer.TemplateControlExportList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.templateControlExportList',
    columnLines : true,
    forceFit    : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    region: 'center',
    initComponent : function() {
        Ext.apply(this, {
            store   : 'buyertermplateexportstore',
            columns : [
                { header : '№', dataIndex : 'id', width : 25, hidden : false , sortable : true},
                { header : 'Автор', dataIndex : 'author', width : 100, sortable : true },
                { header : 'Название', dataIndex : 'name', width : 100, align : 'center', sortable : true },
                { header : 'Комментарий', dataIndex : 'comment', width: 150, sortable : true }
            ]
        });
        this.callParent(arguments);
    },
    tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Новый шаблон',
                        iconCls : 'icon-add',
                        id      : 'templateExportAddBtn'
                    }
                },{
                    xtype : 'buttongroup',
                    items :[
                            {
                                text    : 'Загрузить шаблон',
                                enableToggle: true
                            }
                        ]
                },
                '->',
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Удалить шаблоны',
                        iconCls: 'icon-delete',
                        id      : 'templateExportDel'
                    }
                },
                {
                    xtype       : 'searchfield',
                    emptyText   : 'поиск'
                }
            ]
});



//нижняя панель
Ext.define('App.view.buyer.templateControlExportBottom', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.templateControlExportBottom',
    region  : 'south',
    collapsible     : true,
    collapseMode    : 'mini',
    hideCollapseTool: true,
    height          : 250,
    split           : true,
    bodyStyle       : 'background: #DFE8F6;',
    layout : {
        type    : 'hbox',
        align   : 'stretch'
    },
    tbar: [
           {
                xtype : 'buttongroup',
                items : {
                    text    : 'Просмотр шаблона',
                    id: 'templateControlExportBottomViewBtn'
                }
            },
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Редактировать шаблон',
                    iconCls: 'icon-edit',
                    id: 'templateexporteditbtn'
                }
            },{
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Экспортировать пример',
                    iconCls : 'icon-export-table'
                }
            },
            '->',
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Удалить',
                    iconCls : 'icon-delete'
                }
            }
    ],
    defaults        : {flex : 1},
    items : [
        {
            layout  : 'fit',
            border  : false,
            style   : 'border-right: #99BCE8 1px solid;',
            items   : {
                xtype : 'buyertemplateexportinfopanel'
            }
        },
        {
            margins : '0 0 0 5',
            layout  : 'fit',
            border  : false,
            style   : 'border-left: #99BCE8 1px solid;',
            items   : {
                xtype : 'templateControlExportPropertiesList'
            }
        }
    ]
});

//нижняя панель. панель информации
Ext.define('App.view.buyer.buyertemplateexportinfopanel', {
    extend      : 'Ext.form.FormPanel',
    alias       : 'widget.buyertemplateexportinfopanel',
    bodyStyle   : 'background: #DFE8F6; padding : 15px;',
    defaults    : {xtype : 'displayfield', anchor : '100%', labelWidth  : 125},
    autoScroll  : true,
    border      : false,

    initComponent : function() {
        this.items = this.buildFormItems();
        this.callParent(arguments);
    },

    buildFormItems : function() {
        return [
            {
                fieldLabel  : 'Автор',
                name        : 'author',
                value: 'Сусанин Иван'
            },
            {
                fieldLabel  : 'Создан',
                name        : 'createddate',
                value: '20.09.2011 15:47'
            },
            {
                fieldLabel  : 'Изменен',
                name        : 'changedate',
                value: '20.09.2011 17:55'
            },
            {
                fieldLabel  : 'Комментарий',
                value        : 'Тестовый шаблон для экспорта ответов по наружной рекламе'
            }
        ];
    }

});



//Грид свойства шаблонов экспорта
Ext.define('App.view.buyer.templateControlExportPropertiesList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.templateControlExportPropertiesList',
    columnLines : true,
    forceFit    : true,
    border      : false,
    title: 'Содержимое шаблона',
    region: 'center',
    initComponent : function() {
        Ext.apply(this, {
            store   : 'buyertermplateexportpropertiesstore',
            columns : [
                { header : 'Поле', dataIndex : 'field', width : 150, sortable : true },
                { header : 'Начало', dataIndex : 'begin', width : 70, align : 'center', sortable : true },
                { header : 'Конец', dataIndex : 'end', width : 70, align : 'center', sortable : true }
            ]
        });
        this.callParent(arguments);
    }
});




//Окно добавления или редактирования шаблона импорта
Ext.define('App.view.buyer.addExportTemplate', {
    extend  : 'Ext.window.Window',
    scrollbars: 'auto',
    width: 450,
    modal: true,
    alias   : 'widget.addExportTemplate',
    border  : false,
    title: 'Новый шаблон экспорта',
    layout  : 'fit',
    initComponent : function() {
        Ext.apply(this, {
            items :
            [
                {
                    xtype: 'form',
                    scrollbars: 'auto',
                    border      : false,
                    bodyStyle   : 'background: #DFE8F6; padding : 15px;',
                    defaults    : {
                        anchor : '100%',
                        labelWidth  : 130
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
                                title:'Шаблоны экспорта',
                                msg: 'Сохранить изменения?',
                                scope: this,
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.MessageBox.QUESTION,
                                fn: function(){
                                    this.up('window').close();
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
                        handler : function() {
                            Ext.Msg.show({
                                title:'Шаблоны экспорта',
                                msg: 'Сохранить изменения?',
                                scope: this,
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.MessageBox.QUESTION,
                                fn: function(){
                                    this.up('window').close();
                                }
                            });
                        }
                        
                    }
                }
            ]
        });
        this.callParent(arguments);
        
    },
    
    getformItems : function() {
        return [
            {
                xtype: 'textfield',
                fieldLabel: 'Название',
                name: 'name'
            },
            {
                xtype: 'gridpanel',
                height: 300,
                columnLines : true,
                forceFit    : true,
                title: 'Содержимое шаблона',
                store   : 'buyertemplateexportaddstore',
                columns : [
                    { header : 'Поле', dataIndex : 'field', width : 150, sortable : true,
                        field: {
                            xtype: 'combobox',
                            typeAhead: true,
                            triggerAction: 'all',
                            selectOnTab: true,
                            store: [
                                ["Категория","Категория"],
                                ["Вид носителя","Вид носителя"],
                                ["Размещение","Размещение"],
                                ["Размер","Размер"],
                                ["Сторона","Сторона"],
                                ["Количество","Количество"],
                                ["Транспорт","Транспорт"],
                                ["Маршрут","Маршрут"],
                                ["Url","Url"],
                                ["Позиция","Позиция"],
                                ["Название","Название"],
                                ["Вид издания","Вид издания"],
                                ["Станция метро","Станция метро"],
                                ["прайс","прайс"],
                                ["С/С размещения в мес.  ","С/С размещения в мес."],
                                ["Стоимость размещения  в мес. включая все налоги","Стоимость размещения в мес. включая все налоги"],
                                ["Стоимость монтажа, включая все налоги","Стоимость монтажа, включая все налоги"],
                                ["Стоимость изготовления, включая все налоги","Стоимость изготовления, включая все налоги"],
                                ["Сссылка на изображение","Сссылка на изображение"]
                            ],
                            lazyRender: true,
                            listClass: 'x-combo-list-small'
                        }
                    },
                    { header : 'Начало', dataIndex : 'begin', width : 70, align : 'center', sortable : true },
                    { header : 'Конец', dataIndex : 'end', width : 70, align : 'center', sortable : true }
                ],
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ]
            }, {
              xtype: 'displayfield'
            },
            {
                xtype: 'textarea',
                margin: '10 0 0 0',
                labelAlign : 'top',
                fieldLabel: 'Комментарий',
                height: 80,
                name: 'comment'
            }
        ]
    }
});




//Окно просмотра импорта
Ext.define('App.view.buyer.viewExportTemplate', {
    extend  : 'Ext.window.Window',
    scrollbars: 'auto',
    width: 450,
    modal: true,
    alias   : 'widget.viewExportTemplate',
    border  : false,
    title: 'Просмотр шаблон экспорта',
    layout  : 'fit',
    initComponent : function() {
        Ext.apply(this, {
            items :
            [
                {
                    xtype: 'form',
                    scrollbars: 'auto',
                    border      : false,
                    bodyStyle   : 'background: #DFE8F6; padding : 15px;',
                    defaults    : {
                        anchor : '100%',
                        labelWidth  : 130
                    },
                    items:  this.getformItems()
                }
                
            ],
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Редактировать',
                        id: 'templateexportvieweditbtn',
                        iconCls: 'icon-edit',
                        handler: function(btn){
                            this.up("viewExportTemplate").close();
                            Ext.create('App.view.buyer.addExportTemplate',{
                                title: 'Редактирование шаблона экспорта'
                            }).show();
                        }
                    }
                },{
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Экспортировать пример'
                        
                    }
                },
                '->',
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Закрыть',
                        handler : function() {
                            this.up("viewExportTemplate").close();
                        }
                        
                    }
                }
            ]
        });
        this.callParent(arguments);
        
    },
    
    getformItems : function() {
        //return [];
        return [
            {
                xtype: 'displayfield',
                fieldLabel: 'Название',
                value: 'Сусанин Иван',
                name: 'name'
            },{
                xtype: 'displayfield',
                fieldLabel: 'Создан',
                value: '20.09.2011 14:23',
                name: 'created'
            },{
                xtype: 'displayfield',
                fieldLabel: 'Изменён',
                value: '01.10.2011 09:50',
                name: 'changed'
            },
            {
                xtype: 'gridpanel',
                height: 300,
                columnLines : true,
                forceFit    : true,
                title: 'Содержимое шаблона',
                store   : 'buyertemplateexportaddstore',
                columns : [
                    { header : 'Поле', dataIndex : 'field', width : 150, sortable : true},
                    { header : 'Начало', dataIndex : 'begin', width : 70, align : 'center', sortable : true },
                    { header : 'Конец', dataIndex : 'end', width : 70, align : 'center', sortable : true }
                ]
            },  {
              xtype: 'displayfield'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Комментарий',
                labelAlign: 'top',
                height: 60,
                value: 'Тестовый шаблон для экспорта ответов по наружной рекламе.',
                name: 'comment'
            }
        ]
    }
});