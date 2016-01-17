// Управление шаблонами Импорт.

Ext.define('App.view.buyer.templateControlImport', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.templateControlImport',
    layout  : 'border',
    border  : false,
    initComponent : function() {
        this.items = [
                {
                    xtype: 'TemplateControlImportList',
                    title: 'Шаблоны импорта'
                },{
                    xtype: 'templateControlImportBottom',
                    title: 'Шаблон: Для объектов'
                }
            ]
        this.callParent(arguments);
    }
    
});

//нижняя панель
Ext.define('App.view.buyer.templateControlImportBottom', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.templateControlImportBottom',
    region: 'south',
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
                    text    : 'Редактировать',
                    iconCls : 'icon-edit',
                    handler : function (btn) {
                        Ext.create('App.view.buyer.addImportTemplate', {
                            title : 'Редактирование шаблона импорта',
                            is_load : true
                        }).show();
                    }
                }
            },
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Экспортировать',
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
            //style   : 'border-top: #99BCE8 1px solid; border-right: #99BCE8 1px solid;',
            items   : {
                xtype : 'buyertemplateimportinfopanel'
            }
        },
        {
            margins : '0 0 0 5',
            layout  : 'fit',
            border  : false,
            //style   : 'border-top: #99BCE8 1px solid; border-left: #99BCE8 1px solid;',
            items   : {
                xtype : 'templateControlImportPropertiesList'
            }
        }
    ]
});


Ext.define('App.view.buyer.buyertemplateimportinfopanel', {
    extend      : 'Ext.form.FormPanel',
    alias       : 'widget.buyertemplateimportinfopanel',
    bodyStyle   : 'background: #DFE8F6; padding : 15px;',
    defaults    : {xtype : 'displayfield', anchor : '100%', labelWidth  : 125},
    autoScroll  : true,
    border      : false,

    initComponent : function() {
        this.items = this.buildFormItems();
        //this.tbar = this.buildTbar();
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
                fieldLabel  : 'Тип шаблона',
                name        : 'type',
                value: 'Объект'
            },
            {
                fieldLabel  : 'Создан',
                name        : 'createddate',
                value: '20.09.2011 15:47'
            },
            {
                fieldLabel  : 'Изменен',
                name        : 'changedate',
                value: '25.09.2011 14:13'
            },
            {
                fieldLabel  : 'Комментарий',
                value        : 'Тестовый шаблон для импорта объектов'
            }
        ];
    }

});



//Грид свойства шаблонов импорта
Ext.define('App.view.buyer.templateControlImportPropertiesList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.templateControlImportPropertiesList',
    columnLines : true,
    forceFit    : true,
    border      : false,
    style   : 'border-left: #99BCE8 1px solid; border-left: #99BCE8 1px solid;',
    title: 'Содержимое шаблона',
    region: 'center',
    initComponent : function() {
        Ext.apply(this, {
            store   : 'buyertermplateimportpropertiesstore',
            columns : [
                { header : 'Поле', dataIndex : 'field', width : 150, sortable : true },
                { header : 'Начало', dataIndex : 'begin', width : 70, align : 'center', sortable : true },
                { header : 'Конец', dataIndex : 'end', width : 70, align : 'center', sortable : true }
            ]
        });
        this.callParent(arguments);
    }
});


//Грид список шаблонов импорта
Ext.define('App.view.buyer.templateControlImportList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.TemplateControlImportList',
    columnLines : true,
    forceFit    : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    region: 'center',
    initComponent : function() {
        Ext.apply(this, {
            store   : 'buyertermplateimportstore',
            columns : [
                { header : '№', dataIndex : 'id', width : 25, hidden : false , sortable : true},
                { header : 'Автор', dataIndex : 'author', width : 150, sortable : true },
                { header : 'Название', dataIndex : 'name', width : 150, align : 'center', sortable : true },
                { header : 'Тип', dataIndex : 'type', width : 70, align : 'center', sortable : true },
                { header : 'Комментарий', dataIndex : 'comment', sortable : true }
            ]
        });
        this.callParent(arguments);
    },
    tbar : [
                {
                    xtype : 'buttongroup',
                    items :[
                            {
                                text    : 'Носители',
                                enableToggle: true,
                                id      : 'templateImportFilterNositelBtn'
                            },{
                                text    : 'Объекты',
                                enableToggle: true,
                                id      : 'templateImportFilterObjectsBtn'
                            },{
                                text    : 'Все',
                                enableToggle: true,
                                id      : 'templateImportFilterAllBtn'
                            }
                        ]
                },'-',{
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Новый шаблон',
                        iconCls : 'icon-add',
                        id      : 'templateImportAddBtn'
                    }
                },
                '->',
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Удалить шаблоны',
                        iconCls: 'icon-delete',
                        id      : 'templateImportDel'
                    }
                },
                {
                    xtype       : 'searchfield',
                    emptyText   : 'поиск'
                }
            ]
});



//Окно добавления нового шаблона импорта
Ext.define('App.view.buyer.addImportTemplate', {
    extend  : 'Ext.window.Window',
    scrollbars: 'auto',
    width: 450, is_load : false,
    modal: true,
    alias   : 'widget.addImportTemplate',
    border  : false,
    title: 'Новый шаблон импорта',
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
                                title:'Шаблоны импорта',
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
                        id: 'buyerquaeryaddclosebutton',
                        handler : function() {
                            Ext.Msg.show({
                                title:'Шаблоны импорта',
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
        
        if (this.is_load) {
            this.down('form').getForm().setValues({
                'name':'Тестовый шаблон',
                'type':'Носитель',
                'comment':'Тестовый шаблон для экспорта ответов по наружной рекламе.'
            });
        }
        
    },
    
    getformItems : function() {
        return [
            {
                xtype: 'textfield',
                fieldLabel: 'Название',
                name: 'name'
            },
            {
                store         : ['Объект', 'Носитель'],
                fieldLabel    : 'Тип',
                xtype         : 'combo',
                name          : 'type',
                selectOnFocus : true,
                editable      : false,
                emptyText     : 'выберите тип...',
                allowBlank    : false,
                anchor        : '100%',
                listeners     : {
                    select  : function (field, val, opts) {
                        var url = val[0].data.field1=='Объект'?'data/templates/import/objprop.json':'data/templates/import/advmediaprop.json',
                            grid = field.nextSibling();
                            
                        grid.getStore().getProxy().url = url;
                        grid.getStore().load();
                    },
                    scope: this
                }
            },
            {
                xtype: 'gridpanel',
                height: 250,//178,
                columnLines : true,
                forceFit    : true,
                title: 'Содержимое шаблона',
                store   : 'buyertermplateimportpropertiesstore',
                columns : [
                    { header : 'Поле', dataIndex : 'field', width : 150, sortable : true,
                        field: {
                            xtype: 'combobox',
                            typeAhead: true,
                            triggerAction: 'all',
                            selectOnTab: true,
                            store: [
                                "Категория",
                                "Вид носителя",
                                "Размещение",
                                "Размер",
                                "Сторона",
                                "Количество",
                                "Транспорт",
                                "Маршрут",
                                "Url",
                                "Позиция",
                                "Название",
                                "Виз издания",
                                "Станция метро"
                            ],
                            lazyRender: true,
                            listClass: 'x-combo-list-small'
                        }
                    },
                    { header : 'Начало', dataIndex : 'begin', width : 70, align : 'center', sortable : true, field: {xtype:'textfield'} },
                    { header : 'Конец', dataIndex : 'end', width : 70, align : 'center', sortable : true, field: {xtype:'textfield'} }
                ],
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ]
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
