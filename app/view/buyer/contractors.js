// Подрядчики  - главная панель
Ext.define('App.view.buyer.contractors' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.contractors',
    border  : false,
    layout  : 'border',
    
    initComponent : function() {
        this.items = [
            {   // Список подрядчиков
                region  : 'center',
                xtype   : 'buyerContractorsList'
            },
            {   // Подробная информация
                region          : 'south',
                collapsible     : true,
                collapseMode    : 'mini',
                hideCollapseTool: true,
                split           : true,
                height          : 215,
                layout          : 'fit',
                xtype           : 'buyerAboutContractor'
            }
        ];
        this.callParent(arguments);
    }
    
});

// Список подрядчиков
Ext.define('App.view.buyer.contractorsList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.buyerContractorsList',
    title   : 'Список подрядчиков',
    columnLines : true,
    forceFit    : true,
    tbar : [
        {
            xtype : 'buttongroup',
            items : {
                text    : 'Новый подрядчик',
                iconCls : 'icon-add',
                id      : 'btnAddContractor'
            }
        },{
            xtype : 'buttongroup',
            items : {
                text    : 'Редактировать',
                iconCls : 'icon-edit',
                id      : 'btnEditContractor'
            }
        },{
            xtype : 'buttongroup',
            items : {
                text    : 'Удалить',
                iconCls : 'icon-cross',
                id      : 'btnDeleteContractor'
            }
        },
        '->',
        {
            xtype       : 'searchfield',
            emptyText   : 'строка для поиска'
        },
        { xtype: 'displayfield', width: 20}
    ],
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'contractorsStore',
            columns : [
                { header : '№',                dataIndex : 'id',       width : 25,  hidden : false },
                { header : 'Название',          dataIndex : 'name',     width : 120, sortable : true },
                { header : 'Город',             dataIndex : 'city',     width : 60, sortable : true },
                { header : 'Юридические лица',  dataIndex : 'entities', width : 180, sortable : true },
                { header : 'Телефоны ',         dataIndex : 'phones',   width : 120, sortable : true },
                { header : 'Электронная почта', dataIndex : 'emails',   width : 120, sortable : true },
                { header : 'Сайт',              dataIndex : 'site',     width : 120, sortable : true ,
                    renderer: function(v,m,rec){
                        return '<a href="http://'+v+'" target="_blank">'+rec.data.sitename+'</a>';
                    }
                }
            ]
        });
        this.callParent(arguments);
    }
    
});

// Подробная информация
Ext.define('App.view.buyer.aboutContractor', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.buyerAboutContractor',
    
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
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Редактировать',
                        iconCls : 'icon-edit',
                        id      : 'btnEditContractorDetailed'
                    }
                },{
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Удалить',
                        iconCls : 'icon-cross',
                        id      : 'btnDeleteContractorDetailed'
                    }
                }
    ],
            defaultType: 'displayfield',
            items: [{
                fieldLabel: 'Название',
                name: 'name'
            },{
                fieldLabel: 'Город',
                name: 'city'
            },{
                fieldLabel: 'Юридические лица',
                name: 'entities'
            },{
                fieldLabel: 'Телефоны',
                name: 'phones'
            },{
                fieldLabel: 'Электронная почта',
                name: 'emails'
            },{
                fieldLabel: 'Сайт',
                name: 'site'
            }]
        });
        this.callParent(arguments);
    }
    
});


// Окно добавления подрядчика
Ext.define('App.view.buyer.addContrWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.buyerAddContrWin',
    width   : 500,
    title   : 'Подрядчик <i>(Новая запись)</i>',
    
    initComponent : function() {
        this.items = { xtype : 'buyerAddContrForm' };
        this.callParent(arguments);
    }
});

// Форма для окна
Ext.define('App.view.buyer.addContrForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.buyerAddContrForm',
    border      : false,
    //autoScroll  : true,
    buttonAlign : 'center',
    bodyStyle   : 'background: #DFE8F6; padding : 15px;',    
    defaults    : {
        anchor : '100%'
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
        var saveLegalEntity = function (btn, id, name, details, is_edit) {
            var parent = btn.up('fieldset');
            if (is_edit){
                var fieldcontainer = btn.up('fieldcontainer');
                fieldcontainer.items.items[2].setValue(name);
                fieldcontainer.items.items[4].setValue(details);
            } else {
                if (parent.podrazdcount>3){ return true; }
                parent.podrazdcount++;
                var newid=Ext.id();
                parent.insert(
                    parent.podrazdcount-1,
                    {
                        xtype       : 'fieldcontainer',
                        defaults	: { xtype : 'displayfield', hideLabel : true },
                        id          : newid,
                        layout      : 'hbox',
                        items       : [
                            {
                                xtype       : 'hidden',
                                name        : 'id',
                                value       : 1
                            },
                            {
                                xtype       : 'displayfield',
                                value       : parent.podrazdcount + '.',
                                width       : 20
                            },
                            {
                                value       : name,
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 5
                            },
                            {
                                value       : details,
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 5
                            },
                            {
                                xtype       : 'button',
                                iconCls     : 'icon-edit',
                                tooltip     : 'Редактировать юридическое лицо',
                                width       : 22,
                                handler     : function (btn){
                                    Ext.create('App.view.buyer.addLegalEntityWin', {
                                        title       : 'Редактировать юридическое лицо',
                                        addButton   : btn,
                                        isEdit      : true,
                                        saveFunc    : saveLegalEntity
                                    }).show();
                                }
                            },
                            {
                                xtype       : 'button',
                                iconCls     : 'icon-minus',
                                tooltip     : 'Удалить юридическое лицо',
                                width       : 22,
                                handler     : function (btn){
                                    parent.remove(newid);
                                    parent.podrazdcount--;
                                    parent.doLayout();
                                }
                            }
                        ]
                    }
                )
            }
        };

        return [
        {
            xtype       : 'fieldset',
            border      : false,
            baseCls     : 'x-plain',
            style       : 'border-top: 1px solid #8AABDF; margin: 0; padding: 8px 0 8px;',
            title		: '<b>1. Подрядчик&nbsp;&nbsp;<b>',
            buttonAlign : 'center',
            defaults	: {
                anchor      : '100%',
                labelWidth  : 130,
                xtype       : 'textfield'
            },
            items:[
                {
                    fieldLabel  : 'Название',
                    name        : 'name'
                },
                {
                    fieldLabel  : 'Город',
                    allowBlank  : false,
                    name        : 'city'
                },
                {
                    fieldLabel  : 'Описание',
                    xtype       : 'textarea',
                    name        : 'description',
                    height      : 50
                }
            ]
        },
        {
                xtype 		: 'fieldset',
                border      : false,
                baseCls     : 'x-plain',
                style       : 'border-top: 1px solid #8AABDF; margin: 0; padding: 8px 0 8px;',//overflow: hidden;
                title		: '<b>2. Сайт &nbsp;&nbsp;<b>',
                buttonAlign : 'center',
                podrazdcount: 1,
                defaults	: { anchor  : '100%'},
                items		: [
                    {
                        xtype       : 'fieldcontainer',
                        defaults	: { xtype : 'textfield', hideLabel : true },
                        layout      : 'hbox',
                        items       : [
                            {
                                xtype       : 'displayfield',
                                value       : '1.',
                                width       : 20
                            },
                            {
                                emptyText   : 'название сайта',
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 5
                            },
                            {
                                emptyText   : 'адрес сайта',
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 27
                            }
                        ]
                    },
                    {
                        xtype   : 'panel',
                        anchor  : '100%',
                        border  : false,
                        buttonAlign : 'center',
                        buttons : [
                            {
                                text    : 'Добавить сайт',
                                iconCls : 'icon-add',
                                width   : 200,
                                handler : function(btn){
                                    var parent=btn.ownerCt.ownerCt.ownerCt;
                                    
                                    if (parent.podrazdcount>3){
                                        return true;
                                    }
                                    parent.podrazdcount++;
                                    var newid=Ext.id();
                                    parent.insert(
                                        parent.podrazdcount-1,
                                        {
                                            xtype       : 'fieldcontainer',
                                            id          : newid,
                                            defaults	: { xtype : 'textfield', hideLabel : true },
                                            layout      : 'hbox',
                                            items   : [
                                                {
                                                    xtype       : 'displayfield',
                                                    value       : parent.podrazdcount + '.',
                                                    width       : 20
                                                },
                                                {
                                                    emptyText   : 'название сайта',
                                                    flex        : 1
                                                },
                                                {
                                                    xtype       : 'label',
                                                    width       : 5
                                                },
                                                {
                                                    emptyText   : 'адрес сайта',
                                                    flex        : 1
                                                },
                                                {
                                                    xtype       : 'label',
                                                    width       : 5
                                                },{
                                                    xtype       : 'button',
                                                    iconCls     : 'icon-minus',
                                                    tooltip     : 'Удалить сайт',
                                                    width       : 22,
                                                    handler : function (btn){
                                                        parent.remove(newid);
                                                        parent.podrazdcount--;
                                                        parent.doLayout();
                                                    }
                                                }
                                            ]
                                        }
                                    );
                                    return true;
                                }
                            }
                        ]
                    }
                ]
        },
        {
                xtype 		: 'fieldset',
                border      : false,
                baseCls     : 'x-plain',
                style       : 'border-top: 1px solid #8AABDF; margin: 0; padding: 8px 0 8px;',//overflow: hidden;
                title		: '<b>3. Электронная почта &nbsp;&nbsp;<b>',
                buttonAlign : 'center',
                podrazdcount: 1,
                defaults	: { anchor : '100%' },
                items		: [
                    {
                        xtype       : 'fieldcontainer',
                        defaults	: { xtype : 'textfield', hideLabel : true },
                        layout      : 'hbox',
                        items       : [
                            {
                                xtype       : 'displayfield',
                                value       : '1.',
                                width       : 20
                            },
                            {
                                emptyText   : 'название e-mail\'а',
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 5
                            },
                            {
                                emptyText   : 'e-mail',
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 27
                            }
                        ]
                    },
                    {
                        xtype   : 'panel',
                        anchor  : '100%',
                        border  : false,
                        buttonAlign : 'center',
                        buttons : [
                            {
                                text    : 'Добавить электронную почту',
                                iconCls : 'icon-add',
                                width   : 200,
                                handler : function(btn){
                                    var parent=btn.ownerCt.ownerCt.ownerCt;
                                    
                                    if (parent.podrazdcount>3){
                                        return true;
                                    }
                                    parent.podrazdcount++;
                                    var newid=Ext.id();
                                    parent.insert(
                                        parent.podrazdcount-1,
                                        {
                                            xtype       : 'fieldcontainer',
                                            defaults	: { xtype : 'textfield', hideLabel : true },
                                            id          : newid,
                                            layout      : 'hbox',
                                            items       : [
                                                {
                                                    xtype       : 'displayfield',
                                                    value       : parent.podrazdcount + '.',
                                                    width       : 20
                                                },
                                                {
                                                    emptyText   : 'название e-mail\'а',
                                                    flex        : 1
                                                },
                                                {
                                                    xtype       : 'label',
                                                    width       : 5
                                                },
                                                {
                                                    emptyText   : 'e-mail',
                                                    flex        : 1
                                                },
                                                {
                                                    xtype       : 'label',
                                                    width       : 5
                                                },{
                                                    xtype       : 'button',
                                                    iconCls     : 'icon-minus',
                                                    tooltip     : 'Удалить электронную почту',
                                                    width       : 22,
                                                    handler : function (btn){
                                                        parent.remove(newid);
                                                        parent.podrazdcount--;
                                                        parent.doLayout();
                                                    }
                                                }
                                            ]
                                        }
                                    );
                                    return true;
                                }
                            }
                        ]
                    }
                    
                ]
        },
        {
                xtype 		: 'fieldset',
                border      : false,
                baseCls     : 'x-plain',
                style       : 'border-top: 1px solid #8AABDF; margin: 0; padding: 8px 0 8px;',//overflow: hidden;
                title		: '<b>4. Юридические лица &nbsp;&nbsp;<b>',
                buttonAlign : 'center',
                podrazdcount: 1,
                defaults	: { anchor : '100%' },
                items		: [
                    {
                        xtype       : 'fieldcontainer',
                        defaults	: { xtype : 'displayfield', hideLabel : true },
                        layout      : 'hbox',
                        items       : [
                            {
                                xtype       : 'hidden',
                                name        : 'id',
                                value       : 0
                            },
                            {
                                xtype       : 'displayfield',
                                value       : '1.',
                                width       : 20
                            },
                            {
                                value       : 'Наименование',
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 5
                            },
                            {
                                value       : 'Реквизиты',
                                flex        : 1
                            },
                            {
                                xtype       : 'label',
                                width       : 5
                            },
                            {
                                xtype       : 'button',
                                iconCls     : 'icon-edit',
                                tooltip     : 'Редактировать юридическое лицо',
                                width       : 22,
                                handler     : function (btn) {
                                    Ext.create('App.view.buyer.addLegalEntityWin', {
                                        title       : 'Редактировать юридическое лицо',
                                        addButton   : btn,
                                        isEdit      : true,
                                        saveFunc    : saveLegalEntity
                                    }).show();
                                }
                            },
                            {
                                xtype       : 'label',
                                width       : 22
                            }                            
                        ]
                    },
                    {
                        xtype   : 'panel',
                        anchor  : '100%',
                        border  : false,
                        buttonAlign : 'center',
                        buttons : [
                            {
                                text    : 'Добавить юридическое лицо',
                                iconCls : 'icon-add',
                                width   : 200,
                                handler : function(btn){
                                    Ext.create('App.view.buyer.addLegalEntityWin', {
                                        addButton   : btn,
                                        isEdit      : false,
                                        saveFunc    : saveLegalEntity
                                    }).show();
                                }
                            }
                        ]
                    }
                ]
        },
        {
                xtype 		: 'fieldset',
                border      : false,
                baseCls     : 'x-plain',
                style       : 'border-top: 1px solid #8AABDF; margin: 0; padding: 8px 0 8px;',//overflow: hidden;
                title		: '<b>5. Телефоны &nbsp;&nbsp;<b>',
                podrazdcount: 1,
                buttonAlign : 'center',
                defaults	: { anchor : '100%' },
                items		: [
                    {
                        xtype       : 'fieldcontainer',
                        defaults	: { xtype : 'textfield', hideLabel : true },
                        layout      : 'hbox',
                        items       : [
                            {
                                xtype       : 'displayfield',
                                value       : '1.',
                                width       : 20
                            },
                            {
                                xtype       : 'textfield',
                                emptyText   : 'Название',
                                flex        : 1
                            },
                            {
                                width       : 5,
                                xtype       : 'label'
                            },
                            {
                                width       : 25,
                                xtype       : 'displayfield',
                                value       : '+7 ('
                            },
                            {
                                emptyText   : 'код',
                                name        : 'phone_code',
                                width       : 34
                            },
                            {
                                width       : 10,
                                xtype       : 'displayfield',
                                value       : ')'
                            },
                            {
                                emptyText   : 'номер',
                                name        : 'phone_number',
                                width       : 80
                            },
                            {
                                xtype       : 'displayfield',
                                width       : 5
                            },
                            {
                                emptyText   : 'доб.',
                                name        : 'phone_add',
                                width       : 40
                            },
                            {
                                xtype       : 'label',
                                width       : 27
                            }
                        ]
                    },
                    {
                        xtype   : 'panel',
                        anchor  : '100%',
                        border  : false,
                        buttonAlign : 'center',
                        buttons : [
                            {
                                text    : 'Добавить телефонный номер',
                                iconCls : 'icon-add',
                                width   : 200,
                                handler : function(btn){
                                    var parent=btn.ownerCt.ownerCt.ownerCt;
                                    
                                    if (parent.podrazdcount>3){
                                        return true;
                                    }
                                    parent.podrazdcount++;
                                    var newid=Ext.id();
                                    parent.insert(
                                        parent.podrazdcount-1,
                                        {
                                            xtype       : 'fieldcontainer',
                                            defaults	: { xtype : 'textfield', hideLabel : true },
                                            id          : newid,
                                            layout      : 'hbox',
                                            items       : [
                                                {
                                                    xtype       : 'displayfield',
                                                    value       : parent.podrazdcount + '.',
                                                    width       : 20
                                                },
                                                {
                                                    xtype       : 'textfield',
                                                    emptyText   : 'Название',
                                                    flex        : 1
                                                },
                                                {
                                                    width       : 5,
                                                    xtype       : 'label'
                                                },
                                                {
                                                    width       : 25,
                                                    xtype       : 'displayfield',
                                                    value       : '+7 ('
                                                },
                                                {
                                                    emptyText   : 'код',
                                                    name        : 'phone_code',
                                                    width       : 34
                                                },
                                                {
                                                    width       : 10,
                                                    xtype       : 'displayfield',
                                                    value       : ')'
                                                },
                                                {
                                                    emptyText   : 'номер',
                                                    name        : 'phone_number',
                                                    width       : 80
                                                },
                                                {
                                                    xtype       : 'displayfield',
                                                    width       : 5
                                                },
                                                {
                                                    emptyText   : 'доб.',
                                                    name        : 'phone_add',
                                                    width       : 40
                                                },
                                                {
                                                    xtype       : 'label',
                                                    width       : 5
                                                },
                                                {
                                                    xtype       : 'button',
                                                    iconCls     : 'icon-minus',
                                                    tooltip     : 'Удалить телефонный номер',
                                                    width       : 22,
                                                    handler : function (btn) {
                                                        parent.remove(newid);
                                                        parent.podrazdcount--;
                                                        parent.doLayout();
                                                    }
                                                }
                                            ]
                                        }
                                    );
                                    return true;
                                }
                            }
                        ]                        
                    }
                ]
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
                                    var form = btn.up('buyerAddContrForm').getForm();
                                    var vals = form.getValues();
                                    vals.phones = vals.phones.join(';')
                                    Ext.Ajax.request({
                                        url     : 'data/sss.php',
                                        params  : vals,
                                        success : function(response) {
                                            var text = response.responseText;
                                            Ext.Msg.alert('Success', text.msg);
                                        }
                                    });
                                    btn.up('buyerAddContrWin').close();
                                } else {
                                    btn.up('buyerAddContrWin').close();
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
                        this.up('buyerAddContrWin').close();
                    }
                }
            }
        ];
    }
});

// Окно добавления нового запроса
Ext.define('App.view.buyer.addLegalEntityWin', {
    extend  : 'Ext.window.Window',
    resizable : false,
    scrollbars: 'auto',
    width: 500,
    modal: true,
    alias   : 'widget.buyerAddLegalEnWin',
    border  : false,
    title: 'Добавить юридическое лицо',
    layout  : 'fit',
    initComponent : function() {
        Ext.apply(this, {
            items : [
                {
                    xtype: 'form',
                    scrollbars: 'auto',
                    bodyStyle   : 'background: #DFE8F6; padding : 15px;',
                    defaults    : {
                        anchor  : '100%',
                        xtype   : 'textfield',
                        labelWidth  : 200
                    },
                    items:  this.getformItems(),
                    tbar : [
                        {
                            xtype : 'buttongroup',
                            items : {
                                text    : 'Сохранить',
                                iconCls: 'icon-save',
                                handler : function(btn) {
                                    var form = btn.up('form').getForm(),
                                        bname = form.findField('brief_name').getValue(),
                                        fname = form.findField('complete_name').getValue(),
                                        win = btn.up('window');
                                        
                                    Ext.Msg.show({
                                        title:'Юридическое лицо',
                                        msg: 'Сохранить изменения?',
                                        scope: this,
                                        buttons: Ext.Msg.YESNO,
                                        icon: Ext.MessageBox.QUESTION,
                                        fn: function(btn) {
                                            if (btn == 'yes') win.saveFunc(win.addButton, 12, bname, fname, win.isEdit);
                                            win.close();
                                        }
                                    });
                                },
                                scope   : this
                            }
                        },
                        '->',
                        {
                            xtype : 'buttongroup',
                            items : {
                                text    : 'Закрыть',
                                id      : 'buyerquaeryaddclosebutton',
                                handler : function(btn) {
                                    var form = btn.up('form').getForm(),
                                        bname = form.findField('brief_name').getValue(),
                                        fname = form.findField('complete_name').getValue(),
                                        win = btn.up('window');
                                        
                                    Ext.Msg.show({
                                        title:'Юридическое лицо',
                                        msg: 'Сохранить изменения?',
                                        scope: this,
                                        buttons: Ext.Msg.YESNO,
                                        icon: Ext.MessageBox.QUESTION,
                                        fn: function (btn) {
                                            if (btn == 'yes') win.saveFunc(win.addButton, 12, bname, fname, win.isEdit);
                                            win.close();
                                        }
                                    });
                                },
                                scope   : this
                            }
                        }
                    ]
                },
            ]

        });
        this.callParent(arguments);
        if (this.isEdit) {
            var form = this.down('form').getForm(),
                fieldcontainer = this.addButton.up('fieldcontainer'),
                name = fieldcontainer.items.items[2].getValue(),
                details = fieldcontainer.items.items[4].getValue();
                
           form.findField('brief_name').setValue(name);
           form.findField('complete_name').setValue(details);
        }
    },
    
    getformItems : function() {
        return [
            {
                allowBlank  : false,
                name        : 'brief_name',
                maxLength   : 25,
                fieldLabel  : 'Краткое наименование юрлица'
            },
            {
                allowBlank  : false,
                name        : 'complete_name',
                maxLength   : 25,
                fieldLabel  : 'Полное наименование юрлица'
            },
            {
                xtype           : 'combo',
                fieldLabel      : 'Форма собственности',
                mode            : 'local',
                triggerAction   : 'all',
                editable        : false,
                store           : ['ЗАО','ООО','ИП','ОАО'],
                selectOnFocus   : true,
                hiddenName      : 'type_organization'
            },
            {
                name        : 'legal_address',
                fieldLabel  : 'Юридический адрес'
            },
            {
                name        : 'de_facto_address',
                fieldLabel  : 'Фактический адрес'
            },
            {
                allowBlank  : false,
                name        : 'okpo',
                fieldLabel  : 'ОКПО'
            },
            {
                name        : 'ogrn',
                fieldLabel  : 'ОГРН'
            },
            {
                name        : 'inn',
                fieldLabel  : 'ИНН'
            },
            {
                name        : 'kpp',
                fieldLabel  : 'КПП'
            },
            {
                name        : 'settlement_account',
                fieldLabel  : 'Расчетный счет'
            },
            {
                name        : 'bank',
                fieldLabel  : 'Обслуживающий банк'
            },
            {
                name        : 'ks',
                fieldLabel  : 'К/с'
            },
            {
                name        : 'bik',
                fieldLabel  : 'БИК'
            }
        ]
    }
});

