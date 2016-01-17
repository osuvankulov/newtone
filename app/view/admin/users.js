// Пользователи и группы
Ext.define('App.view.admin.users' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.userPanel',
    title   : 'Пользователи и группы',
    layout  : 'fit',
    
    initComponent : function() {
        this.items = Ext.create('Ext.tab.Panel', {
            minTabWidth : 160,
            resizeTabs  : true,
            border      : false,
            items       : [{
                title : 'Пользователи',
                xtype : 'adminUsersTab'
            },{
                title : 'Группы',
                xtype : 'adminGroupsTab'
            },{
                title : 'Отделы',
                xtype : 'departmentsTab'
            }
            ]
        });
        this.callParent(arguments);
    }
    
});



// Таб Пользователи
Ext.define('App.view.admin.usersTab' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.adminUsersTab',
    border  : false,
    layout  : 'border',

    initComponent : function() {
        Ext.apply(this, {
            items : [
                this.buildUsersPanel(),
                this.buildDetailsPanel()
            ]
        });
        this.callParent(arguments);
        
        this.on('activate', function () {
            this.down('adminUserList').getStore().load();
            //this.down('adminUserInfoPanel').resetForm();
        }, this);
    },

    buildUsersPanel : function() {
        return {
            region  : 'center',
            border  : false,
            style   : 'border-bottom: #99BCE8 1px solid;',
            xtype   : 'adminUserList',
            tbar : [
                {
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Добавить',
                        iconCls : 'icon-add',
                        id      : 'usersAddUserBtn'
                    }
                },{
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Редактировать',
                        iconCls : 'icon-edit',
                        id      : 'editUser'
                    }
                },{
                    xtype : 'buttongroup',
                    items : {
                        text    : 'Удалить',
                        iconCls : 'icon-cross',
                        id      : 'delUser'
                    }
                },
                '->'
            ]
        };
    },

    buildDetailsPanel : function() {
        return {
            region          : 'south',
            collapsible     : true,
            collapseMode    : 'mini',
            hideCollapseTool: true,
            height          : 236,
            split           : true,
            border          : false,
            bodyStyle       : 'background: #DFE8F6;',
            layout : {
                type    : 'hbox',
                align   : 'stretch'
            },
            defaults        : {flex : 1},
            items : [
                {
                    title   : 'Информация о пользователе',
                    layout  : 'fit',
                    border  : false,
                    style   : 'border-top: #99BCE8 1px solid; border-right: #99BCE8 1px solid;',
                    items   : {
                        xtype : 'adminUserInfoPanel'
                    }
                },
                {
                    title   : 'Список привилегий',
                    margins : '0 0 0 5',
                    layout  : 'fit',
                    border  : false,
                    style   : 'border-top: #99BCE8 1px solid; border-left: #99BCE8 1px solid;',
                    items   : {
                        xtype : 'adminUserPrivilegesTree'
                    }
                }
            ]
        };
    }

});

//Грид список пользователей
Ext.define('App.view.admin.userList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.adminUserList',
    columnLines : true,
    forceFit    : true,
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'userStore',
            columns : [
                { header : 'ID', dataIndex : 'id', width : 25, hidden : true },
                { header : 'ФИО', dataIndex : 'full_name', width : 250, sortable : true },
                { header : 'Логин', dataIndex : 'username', width : 70, align : 'center' },
                { header : 'Роль', dataIndex : 'role', width : 70, align : 'center' },
                { header : 'Подразделение', dataIndex : 'podrazd', width : 180 }
            ]
        });
        this.callParent(arguments);
    }
    
});

Ext.define('App.view.admin.userInfoPanel', {
    extend      : 'Ext.form.FormPanel',
    alias       : 'widget.adminUserInfoPanel',
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',
    defaults    : {xtype : 'displayfield', anchor : '100%', labelWidth  : 125},
    autoScroll  : true,
    border      : false,

    initComponent : function() {
        this.items = this.buildFormItems();
        this.tbar = this.buildTbar();
        this.callParent(arguments);
    },

    buildFormItems : function() {
        return [
            {
                fieldLabel  : 'ФИО',
                name        : 'full_name'
            },
            {
                fieldLabel  : 'Логин',
                name        : 'username'
            },
            {
                fieldLabel  : 'Рабочий телефон',
                name        : 'phone_work'
            },
            {
                fieldLabel  : 'Мобильный телефон',
                name        : 'phone_mobile'
            },
            {
                fieldLabel  : 'Факс',
                name        : 'fax'
            },
            {
                fieldLabel  : 'Emal',
                name        : 'email'
            },
            {
                fieldLabel  : 'Зарегистрирован с',
                name        : 'date'
            }
        ];
    },

    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text    : 'Обновить пароль',
                    iconCls : 'icon-key-edit',
                    id      : 'userPassRefresh'
                }
            },
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Заблокировать',
                    iconCls : 'icon-lock',
                    id      : 'userBlock'
                }
            }
        ];
    }

});

Ext.define('App.view.admin.userPrivilegesTree', {
    extend      : 'Ext.tree.TreePanel',
    alias       : 'widget.adminUserPrivilegesTree',
    useArrows   : true,
    autoScroll  : true,
    border      : false,

    initComponent : function() {
        Ext.apply(this, {
            root : {
                children : this.buildChildren()
            },
            rootVisible : false,
            tbar : this.buildTbar()
        });
        this.callParent(arguments);

        this.on('checkchange', function(node, is_checked) {

            if (! node.isLeaf()) {
                node.expand(true, false, function(node){
                    node.eachChild(function(n){
                        n.getUI().toggleCheck(is_checked);
                    });
                });
            }

        });
    },

    buildChildren : function() {
        return [
            {text : 'Менеджер', iconCls : 'icon-action', checked : true, expanded : true,
                children : [
                    {text : 'Запросы', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Байер', checked : true, iconCls : 'icon-action', expanded : true,
                children : [
                    {text : 'Управление запросами', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Управление шаблонами', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Подрядчики', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Управление базой рекламоносителей и объектов', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Администрирование', checked : true, iconCls : 'icon-action', expanded : true,
                children : [
                    {text : 'Пользователи и группы', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            }
        ];
    },

    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Сохранить изменения',
                    iconCls : 'icon-save'
                }
            }
        ];
    }

});








// Группы пользователей
Ext.define('App.view.admin.adminGroupsTab', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.adminGroupsTab',
    border  : false,
    layout  : 'border',

    initComponent : function() {
        Ext.apply(this, {
            items : [
                this.buildUsersPanel(),
                this.buildDetailsPanel()
            ]
        });
        this.callParent(arguments);
        
        this.on('activate', function () {
            this.down('adminGroupList').getStore().load();
        }, this);
        
    },

    buildUsersPanel : function() {
        return {
            region  : 'center',
            border  : false,
            style   : 'border-bottom: #99BCE8 1px solid;',
            xtype   : 'adminGroupList',
            tbar    : [{
                xtype : 'buttongroup',
                items : {
                    text    : 'Добавить',
                    iconCls : 'icon-add',
                    id      : 'addGroup'
                }
            },{
                xtype : 'buttongroup',
                items : {
                    text    : 'Редактировать',
                    iconCls : 'icon-edit',
                    id      : 'editGroup'
                }
            },{
                xtype : 'buttongroup',
                items : {
                    text    : 'Удалить',
                    iconCls : 'icon-cross',
                    id      : 'delGroup'
                }
            }]
        };
    },

    buildDetailsPanel : function() {
        return {
            region  : 'south',
            height  : 236,
            collapsible     : true,
            collapseMode    : 'mini',
            hideCollapseTool: true,
            split           : true,
            border      : false,
            bodyStyle   : 'background: #DFE8F6;',
            layout  : {
                type    : 'hbox',
                align   : 'stretch'
            },
            defaults    : {flex : 1},
            items       : [
                {
                    title   : 'Информация о группе',
                    layout  : 'fit',
                    border  : false,
                    style   : 'border-top: #99BCE8 1px solid; border-right: #99BCE8 1px solid;',
                    items   : {
                        xtype : 'adminGroupInfoPanel'
                    }
                }
            ]
        };
    }
});



//Информация об отделе
Ext.define('App.view.admin.departmentInfoPanel', {
    extend      : 'Ext.form.FormPanel',
    alias       : 'widget.departmentInfoPanel',
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',
    defaults    : {xtype : 'displayfield', anchor : '100%', labelWidth  : 185},
    autoScroll  : true,
    border      : false,

    initComponent : function() {
        this.items = this.buildFormItems();
        this.tbar = this.buildTbar();
        this.callParent(arguments);
    },

    buildFormItems : function() {
        return [{
            fieldLabel  : 'Название',
            name        : 'department'
        },
        {
            fieldLabel  : 'Типы рекламы',
            name        : 'adverttypes'
        }];
    },
    
    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Редактировать',
                    iconCls : 'icon-edit',
                    id: 'editDepartmentInfo'
                }
            },
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Удалить',
                    iconCls : 'icon-cross',
                    id: 'delDepartmentInfo'
                }
            }
        ];
    }

});

//Грид отделы
Ext.define('App.view.admin.departmentList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.departmentList',
    columnLines : true,
    forceFit    : true,
    
    initComponent : function() {
        Ext.apply(this, {
            store   : 'departmentList',
            columns : [
                { header : 'ID', dataIndex : 'id', width : 25, hidden : true },
                { header : 'Отдел', dataIndex : 'department', width : 250, sortable : true },
                { header : 'Типы рекламы', dataIndex : 'adverttypes', width : 120, align : 'center' },
                { header : 'Список участников', dataIndex : 'userlist', width : 250}
            ]
        });
        this.callParent(arguments);
    }
    
});


//
//Дерево Типы рекламы
//
Ext.define('App.view.admin.advertTypesTree', {
    extend      : 'Ext.tree.TreePanel',
    alias       : 'widget.advertTypesTree',
    useArrows   : true,
    border      : false,
    autoScroll  : true,
    
    initComponent : function() {
        Ext.apply(this, {
            root : {
                children : this.buildChildren()
            },
            rootVisible : false,
            tbar : this.buildTbar()
        });
        this.callParent(arguments);

        this.on('checkchange', function(node, is_checked) {

            if (! node.isLeaf()) {
                node.expand(true, false, function(node){
                    node.eachChild(function(n){
                        n.getUI().toggleCheck(is_checked);
                    });
                });
            }

        });
    },

    buildChildren : function() {
        return [
            {text : 'Группа 1', iconCls : 'icon-action', checked : true, expanded : true,
                children : [
                    {text : 'Тип рекламы 1', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 2', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 3', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 4', checked : false, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Группа 2', iconCls : 'icon-action', checked : true, expanded : true,
                children : [
                    {text : 'Тип рекламы 1', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 2', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 3', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 4', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Группа 3', iconCls : 'icon-action', checked : true, expanded : true,
                children : [
                    {text : 'Тип рекламы 1', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 2', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 3', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 4', checked : false, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Группа 4', iconCls : 'icon-action', checked : true, expanded : true,
                children : [
                    {text : 'Тип рекламы 1', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 2', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 3', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Тип рекламы 4', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            }
        ];
    },

    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Сохранить изменения',
                    iconCls : 'icon-save'
                }
            }
        ];
    }

});

// Таб Отделы
Ext.define('App.view.admin.departmentsTab', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.departmentsTab',
    border  : false,
    layout  : 'border',

    initComponent : function() {
        Ext.apply(this, {
            items : [
                this.buildDepartmentPanel (),
                this.buildDetailsPanel()
            ]
        });
        this.callParent(arguments);
        
        this.on('activate', function () {
            this.down('departmentList').getStore().load();
            //this.down('adminGroupInfoPanel').resetForm();
        }, this);
        
    },

    buildDepartmentPanel : function() {
        return {
            region  : 'center',
            border  : false,
            style   : 'border-bottom: #99BCE8 1px solid;',
            xtype   : 'departmentList',
            tbar    : [{
                xtype : 'buttongroup',
                items : {
                    text    : 'Добавить',
                    iconCls : 'icon-add',
                    id      : 'addDepartment'
                }
            },{
                xtype : 'buttongroup',
                items : {
                    text    : 'Редактировать',
                    iconCls : 'icon-edit',
                    id      : 'editDepartment'
                }
            },{
                xtype : 'buttongroup',
                items : {
                    text    : 'Удалить',
                    iconCls : 'icon-cross',
                    id      : 'delDepartment'
                }
            }]
        };
    },

    buildDetailsPanel : function() {
        return {
            region  : 'south',
            height  : 236,
            collapsible     : true,
            collapseMode    : 'mini',
            hideCollapseTool: true,
            split           : true,
            border      : false,
            bodyStyle   : 'background: #DFE8F6;',
            layout  : {
                type    : 'hbox',
                align   : 'stretch'
            },
            defaults    : {flex : 1},
            items       : [
                {
                    title   : 'Информация об отделе',
                    layout  : 'fit',
                    border  : false,
                    style   : 'border-top: #99BCE8 1px solid; border-right: #99BCE8 1px solid;',
                    items   : {
                        xtype : 'departmentInfoPanel'
                    }
                },
                {
                    title   : 'Типы рекламы',
                    margins : '0 0 0 5',
                    layout  : 'fit',
                    border  : false,
                    style   : 'border-top: #99BCE8 1px solid; border-left: #99BCE8 1px solid;',
                    items : {
                        xtype : 'advertTypesTree'
                    }
                }
            ]
        };
    }
});



Ext.define('App.view.admin.groupList', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.adminGroupList',
    columnLines : true,
    stripeRows  : true,
    forceFit    : true,
    border      : false,
    
    initComponent : function() {
        this.store   = 'groupStore';
        this.columns = this.buildColumns();
        this.callParent(arguments);
    },

    buildColumns : function() {
        return [
            {header : 'ID', dataIndex : 'id', width : 25, hidden : true},
            {header : 'Группа', dataIndex : 'name', width : 130, sortable : true},
            {header : 'Список участников', dataIndex : 'userlist', width : 250}
        ];
    }
    
});

Ext.define('App.view.admin.groupInfoPanel', {
    extend      : 'Ext.form.FormPanel',
    alias       : 'widget.adminGroupInfoPanel',
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',
    defaults    : {xtype : 'displayfield', anchor : '100%', labelWidth  : 185},
    autoScroll  : true,
    border      : false,

    initComponent : function() {
        this.items = this.buildFormItems();
        //this.tbar = this.buildTbar();
        this.callParent(arguments);
    },

    buildFormItems : function() {
        return [{
            fieldLabel  : 'Название',
            name        : 'name'
        },
        {
            fieldLabel  : 'Дата последнего изменения',
            name        : 'date'
        }];
    }

});

Ext.define('App.view.admin.groupPrivilegesTree', {
    extend      : 'Ext.tree.TreePanel',
    alias       : 'widget.adminGroupPrivilegesTree',
    useArrows   : true,
    border      : false,
    autoScroll  : true,
    
    initComponent : function() {
        Ext.apply(this, {
            root : {
                children : this.buildChildren()
            },
            rootVisible : false,
            tbar : this.buildTbar()
        });
        this.callParent(arguments);

        this.on('checkchange', function(node, is_checked) {

            if (! node.isLeaf()) {
                node.expand(true, false, function(node){
                    node.eachChild(function(n){
                        n.getUI().toggleCheck(is_checked);
                    });
                });
            }

        });
    },

    buildChildren : function() {
        return [
            {text : 'Оператор', iconCls : 'icon-action', checked : true, expanded : true,
                children : [
                    {text : 'Заемщики', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Одобренные займы', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Отказы и доработка', checked : false, iconCls : 'icon-action', leaf : true},
                    {text : 'Возврат от кассира', checked : false, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Касса', checked : true, iconCls : 'icon-action', expanded : true,
                children : [
                    {text : 'Операции займов', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Другие операции', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Операции за смену', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Безопасность', checked : true, iconCls : 'icon-action', expanded : true,
                children : [
                    {text : 'Проверка займов', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'История изменений анкет', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Информация о заёмщиках', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Должники', checked : true, iconCls : 'icon-action', expanded : true,
                children : [
                    {text : '3 дня до возврата', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'долг 1 - 30 дней', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'долг 30 - 60 дней', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'долг > 60 дней', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'В суде', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Назначение куратора', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Аналитика и отчёты', checked : true, iconCls : 'icon-action', expanded : true,
                children : [
                    {text : 'Основной отчёт', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Ежедневный отчёт', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Учёт возврата займов по отделениям', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            },
            {text : 'Администрирование', checked : true, iconCls : 'icon-action', expanded : true,
                children : [
                    {text : 'Пользователи и группы', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Офисы', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Организация', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Настройки займов', checked : true, iconCls : 'icon-action', leaf : true},
                    {text : 'Справочники', checked : true, iconCls : 'icon-action', leaf : true}
                ]
            }
        ];
    },

    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Сохранить изменения',
                    iconCls : 'icon-save'
                }
            }
        ];
    }

});


// Окно добавления нового пользователя
Ext.define('App.view.admin.addUserWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.adminAddUserWin',
    width   : 400,
    //height  : 455,
    title   : 'Пользователь <i>(Новая запись)</i>',
    
    initComponent : function() {
        this.items = { xtype : 'adminAddUserForm' };
        this.callParent(arguments);
    }
});

Ext.define('App.view.admin.addUserForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.adminAddUserForm',
    border      : false,
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',
    defaults    : { anchor : '100%', labelWidth  : 130, xtype : 'textfield' },
    initComponent : function() {
        Ext.apply(this, {
            items : this.buildFormItems(),
            tbar : this.buildTbar()
        });
        this.callParent(arguments);
        
    },
    
    buildFormItems : function() {
        return [
            {
                fieldLabel  : 'ФИО',
                name        : 'full_name',
                //vtype       : 'name64',
                allowBlank  : false
            },
            {
                xtype       : 'fieldcontainer',
                fieldLabel  : 'Паспорт',
                defaults    : {xtype : 'textfield'},
                layout      : 'hbox',
                items   : [{
                    width       : 60,
                    name        : 'passport_seria',
                    emptyText   : 'серия'
                }, {
                    xtype   : 'splitter'
                }, {
                    flex        : 1,
                    name        : 'passport_number',
                    emptyText   : 'номер'
                }]
            },
            {
                fieldLabel  : 'Адрес',
                //vtype       : 'limit60',
                name        : 'address'
            },
            {
                fieldLabel  : 'Рабочий телефон',
                //vtype       : 'phone',
                name        : 'phone_work'
            },
            {
                fieldLabel  : 'Мобильный телефон',
                //vtype       : 'phone',
                name        : 'phone_mobile'
            },
            {
                fieldLabel  : 'Факс',
                //vtype       : 'phone',
                name        : 'fax'
            },
            {
                fieldLabel  : 'Email',
                //vtype       : 'email',
                name        : 'email'
            },
            {
                xtype : 'fieldset',
                title : 'Параметры доступа',
                defaults : { xtype : 'textfield', labelWidth  : 119 },
                podrazdcount: 1,
                items : [
                    {
                        store         : 'roleStore',
                        fieldLabel    : 'Роль',
                        id            : 'userGroupField',
                        xtype         : 'combo',
                        hiddenName    : 'group',
                        displayField  : 'name',
                        valueField    : 'id',
                        triggerAction : 'all',
                        mode          : 'remote',
                        multiSelect   : true,
                        //readOnly      : true,
                        selectOnFocus : true,
                        editable      : false,
                        emptyText     : 'выберите роль...',
                        allowBlank   : false,
                        anchor        : '100%'
                    },
                    {
                        xtype: 'fieldcontainer',
                        anchor        : '100%',
                        fieldLabel: 'Подразделение',
                        store         : 'podrazdStore',
                        multiSelect   : true,
                        id            : 'podrazdlist',
                        xtype         : 'combo',
                        hiddenName    : 'podrazd',
                        displayField  : 'name',
                        valueField    : 'id',
                        triggerAction : 'all',
                        mode          : 'remote',
                        selectOnFocus : true,
                        editable      : false,
                        emptyText     : 'выберите подразделение...',
                        allowBlank   : false
                    },
                    {
                        fieldLabel  : 'Логин',
                        allowBlank  : false,
                        name        : 'username',
                        anchor      : '100%'
                    },
                    {
                        fieldLabel  : 'Пароль',
                        inputType   : 'password',
                        id          : 'userPasswordField',
                        allowBlank  : false,
                        name        : 'password',
                        anchor      : '100%'
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
                    iconCls : 'icon-save'
                }
            },
            '->',
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Закрыть',
                    handler : function() {
                        this.up('adminAddUserWin').close();
                    }
                }
            }
        ];
    }
    
});

// Окно блокировки пользователя
Ext.define('App.view.admin.userBlockWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.adminUserBlockWin',
    width : 400,
    //height : 208,
    title : 'Блокировка пользователя',
    
    initComponent : function() {
        this.items = {
            xtype : 'adminUserBlockForm'
        };
        this.callParent(arguments);
    }
    
});

Ext.define('App.view.admin.userBlockForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.adminUserBlockForm',
    border      : false,
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',

    initComponent : function() {
        Ext.apply(this, {
            items : this.buildFormItems(),
            tbar : this.buildTbar()
        });
        this.callParent(arguments);
    },
    
    buildFormItems : function() {
        return [
            {
                fieldLabel  : 'Укажите причину',
                labelAlign  : 'top',
                xtype       : 'textarea',
                name        : 'comment',
                allowBlank  : false,
                anchor      : '100%'
            }
        ];
    },
    
    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : [
                    {
                        text    : 'Сохранить',
                        iconCls : 'icon-save',
                        width   : 90
                    }
                ]
            },
            '->',
            {
                xtype : 'buttongroup',
                items : [
                    {
                        text : 'Закрыть',
                        handler : function(btn) {
                            this.up('adminUserBlockWin').close();
                        }
                    }
                ]
            }
        ];
    }   
});

// Окно изменения пароля
Ext.define('App.view.admin.userPassRefreshWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.adminUserPassRefreshWin',
    width   : 270,
    //height  : 150,
    title   : 'Сменить пароль',
    
    initComponent : function() {
        this.items = { xtype : 'adminUserPassRefreshForm' };
        this.callParent(arguments);
    }
    
});

Ext.define('App.view.admin.userPassRefreshForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.adminUserPassRefreshForm',
    border      : false,
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',
    defaults    : { xtype : 'textfield', labelWidth  : 100, anchor : '100%', inputType: 'password' },
    
    initComponent : function() {
        Ext.apply(this, {
            items : this.buildFormItems(),
            tbar : this.buildTbar()
        });
        this.callParent(arguments);
    },
    
    buildFormItems : function() {
        return [
            {
                width           : 150,
                fieldLabel      : 'Пароль',
                name            : 'password',
                allowBlank      : false
            },
            {
                width           : 150,
                fieldLabel      : 'Повтор пароля',
                allowBlank      : false
            }
        ];
    },
    
    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text    : 'Сохранить',
                    iconCls : 'icon-save'
                }
            },
            '->',
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Закрыть',
                    handler : function() {
                        this.up('adminUserPassRefreshWin').close();
                    }
                }
            }
        ];
    }
    
});


// Окно добавления нового отдела
Ext.define('App.view.admin.editDepartmentWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.editDepartmentWin',
    width   : 400,
    //height  : 150,
    title   : 'Отдел',
    
    initComponent : function() {
        this.items = { xtype : 'adminAddDepartmentForm' };
        this.callParent(arguments);
    }
    
});


//Форма редактирования отдела
Ext.define('App.view.admin.adminAddDepartmentForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.adminAddDepartmentForm',
    border      : false,
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',
    defaults    : { xtype : 'textfield', labelWidth  : 80, anchor : '100%' },
    
    initComponent : function() {
        Ext.apply(this, {
            items : this.buildFormItems(),
            tbar : this.buildTbar()
        });
        this.callParent(arguments);
    },
    
    buildFormItems : function() {
        return [
            {
                fieldLabel  : 'Название',
                name        : 'name',
                //vtype       : 'name64',
                allowBlank  : false
            }
        ];
    },
    
    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text    : 'Сохранить',
                    iconCls : 'icon-save',
                    handler : function(btn) {
                        Ext.Msg.show({
                             title:'Отделы',
                             msg: 'Сохранить изменения?',
                             buttons: Ext.Msg.YESNO,
                             icon: Ext.MessageBox.QUESTION,
                             scope: this,
                             fn: function(btn){
                                this.up('editDepartmentWin').close();
                             }
                        });
                    }
                }
            },
            '->',
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Закрыть',
                    handler : function() {
                        Ext.Msg.show({
                             title:'Отделы',
                             msg: 'Сохранить изменения?',
                             buttons: Ext.Msg.YESNO,
                             icon: Ext.MessageBox.QUESTION,
                             scope: this,
                             fn: function(btn){
                                this.up('editDepartmentWin').close();
                             }
                        });
                    }
                }
            }
        ];
    }
    
});

// Окно добавления новой группы пользователей
Ext.define('App.view.admin.addGroupWin', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.adminAddGroupWin',
    width   : 400,
    //height  : 150,
    title   : 'Группа <i>(Новая запись)</i>',
    
    initComponent : function() {
        this.items = { xtype : 'adminAddGroupForm' };
        this.callParent(arguments);
    }
    
});

Ext.define('App.view.admin.addGroupForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.adminAddGroupForm',
    border      : false,
    bodyStyle   : 'background: #DFE8F6; padding : 10px 15px;',
    defaults    : { xtype : 'textfield', labelWidth  : 80, anchor : '100%' },
    
    initComponent : function() {
        Ext.apply(this, {
            items : this.buildFormItems(),
            tbar : this.buildTbar()
        });
        this.callParent(arguments);
    },
    
    buildFormItems : function() {
        return [
            {
                fieldLabel  : 'Название',
                name        : 'name',
                //vtype       : 'name64',
                allowBlank  : false
            }
        ];
    },
    
    buildTbar : function() {
        return [
            {
                xtype : 'buttongroup',
                items : {
                    text    : 'Сохранить',
                    iconCls : 'icon-save'
                }
            },
            '->',
            {
                xtype : 'buttongroup',
                items : {
                    text : 'Закрыть',
                    handler : function() {
                        this.up('adminAddGroupWin').close();
                    }
                }
            }
        ];
    }
    
});

