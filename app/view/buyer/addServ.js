// Дополнительные услуги  - главная панель
Ext.define('App.view.buyer.addServ' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.addServ',
    border  : false,
    layout  : 'border',
    
    initComponent : function() {
        this.items = [
            {   // Список доп. услуг
                region  : 'center',
                xtype   : 'buyerAddServList'
            },
            {   // Подробная информация
                region          : 'south',
                collapsible     : true,
                collapseMode    : 'mini',
                hideCollapseTool: true,
                split           : true,
                height          : 160,
                layout          : 'fit',
                xtype           : 'buyerAboutService'
            }
        ];
        this.callParent(arguments);
    }
    
});

// Список дополнительных услуг
Ext.define('App.view.buyer.addServList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerAddServList',
    title   : 'Дополнительные услуги',
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
        },{
            xtype : 'buttongroup',
            items : {
                text    : 'Редактировать услугу',
                name    : 'editServ',
                iconCls : 'icon-edit'
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
        { xtype: 'displayfield', width: 20}
    ],
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'addServStore',
            columns : [
                { header : 'ID',            dataIndex : 'id',           width : 25,  hidden   : true },
                { header : 'Название',      dataIndex : 'name',         width : 120, sortable : true },
                { header : 'Цена',          dataIndex : 'price',        width : 60,  sortable : true },
                { header : 'Тип рекламы',   dataIndex : 'type',         width : 80,  sortable : true },
                { header : 'Подрядчик',     dataIndex : 'contractor',   width : 180, sortable : true },
                { header : 'Описание',      dataIndex : 'description',  width : 180, sortable : true }
            ]
        });
        this.callParent(arguments);
    }
    
});

// Подробная информация
Ext.define('App.view.buyer.aboutService', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.buyerAboutService',
    
    initComponent : function() {
        Ext.apply(this, {
            title       : 'Подробная информация',
            bodyPadding : 15,
            bodyStyle   : 'background: #DFE8F6;',
            layout      : 'anchor',
            defaults    : {
                labelWidth  : 200,
                anchor      : '100%'
            },
            defaultType: 'displayfield',
            items: [
            {
                fieldLabel: 'Название',
                name: 'name'
            },{
                fieldLabel: 'Цена',
                name: 'price'
            },{
                fieldLabel: 'Тип рекламы',
                name: 'type'
            },{
                fieldLabel: 'Подрядчик',
                name: 'contractor'
            },{
                fieldLabel: 'Описание',
                name: 'description'
            }]
        });
        this.callParent(arguments);
    }
    
});



// Окно добавления дополнительных услуг
Ext.define('App.view.buyer.addAdditionServWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.buyerAddAdditionServWin',
    width   : 400,
    title   : 'Добавить услугу',
    
    initComponent : function() {
        this.items = { xtype : 'buyerAddServForm' };
        this.callParent(arguments);
        
        this.on('show', function () {
            if (this.rec) {
                this.setTitle('Редактировать услугу');
                var contractor = this.down('buyerAddServForm').getForm().findField('contractor');
                this.down('buyerAddServForm').loadRecord(this.rec);
                contractor.setValue(this.rec.data.contractor.split(', '));
            } else {
                this.setTitle('Добавить услугу');
            }
        }, this);
        
        this.on('hide', function () {
            this.down('buyerAddServForm').getForm().reset();
            this.rec = null;
        }, this);
    }
    
});

// Форма для окна
Ext.define('App.view.buyer.addServForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.buyerAddServForm',
    border      : false,
    //autoScroll  : true,
    buttonAlign : 'center',
    bodyStyle   : 'background: #DFE8F6; padding : 15px;',    
    defaults    : {
        anchor      : '100%',
        labelWidth  : 130
    },
    defaultType : 'textfield',
    
    initComponent : function() {
        Ext.apply(this, {
            items   : this.buildFormItems(),
            tbar    : this.buildTbar()
        });
        this.callParent(arguments);
    },
    
    buildFormItems : function() {
        return [
            {
                fieldLabel: 'Название',
                allowBlank  : false,
                name: 'name'
            },
            {
                fieldLabel: 'Цена',
                allowBlank  : false,
                name: 'price'
            },
            {
                fieldLabel: 'Тип рекламы',
                name: 'type',
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
                    'Щит',
                    'Ситилайт'
                ]
                
            },
            {
                fieldLabel: 'Подрядчик',
                name: 'contractor',
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                multiSelect: true,
                delimiter: ', ',
                store: [
                    'Вюрст-Медиа',
                    'Мособлреклама',
                    'Москва+',
                    'Екатеринбург-реклама',
                    '...'
                ]
                
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Описание',
                allowBlank  : false,
                name: 'description'
            }
        ];
    },
    
    buildTbar : function() {
        return [
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Сохранить',
                    iconCls : 'icon-save',
                    handler : function(btn) {
                        Ext.Msg.show({
                            title:'Подрядчики',
                            msg: 'Сохранить изменения?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(tmpbtn){
                                if (tmpbtn=="yes") {
                                    var form = btn.up('buyerAddServForm').getForm();
                                    var vals = form.getValues();
                                    //vals.phones = vals.phones.join(';')
                                    console.log(vals);
                                    /*Ext.Ajax.request({
                                        url     : 'data/sss.php',
                                        params  : vals,
                                        success : function(response) {
                                            var text = response.responseText;
                                            Ext.Msg.alert('Success', text.msg);
                                        }
                                    });*/
                                    
                                    btn.up('buyerAddAdditionServWin').close();
                                } else {
                                    btn.up('buyerAddAdditionServWin').close();
                                }
                                
                            },
                            icon: Ext.MessageBox.QUESTION
                        });
                    }
                }
            },
            '->',
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Закрыть',
                    handler : function() {
                        this.up('buyerAddAdditionServWin').close();
                    }
                }
            }
        ];
    }
});
