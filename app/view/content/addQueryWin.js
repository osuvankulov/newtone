
Ext.define('App.view.content.addQueryWin' ,{
    extend  : 'Ext.window.Window',
    alias   : 'widget.addQueryWin',
    title   : 'Новый запрос',
    shadow  : 'frame',
    layout  : 'fit',
    resizable : false,
    constrain : true,
    width   : 400,
    
    initComponent : function() {
        this.items = [{ xtype   : 'addQueryForm' }];
        
        this.callParent(arguments);
    }
    
});

Ext.define('App.view.content.addQueryForm', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.addQueryForm',
    border      : false,
    bodyStyle   : 'background: #DFE8F6; padding : 15px;',
    defaults    : { anchor : '100%', xtype : 'textfield', labelWidth  : 90 },
    
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
                fieldLabel  : 'Регион'
            },
            {
                fieldLabel  : 'Город'
            },
            {
                fieldLabel  : 'Тип'
            },
            {
                fieldLabel  : 'Комментарий',
                xtype       : 'textarea'
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
                    handler : function () {
                        this.up('addQueryWin').close();
                    }
                }
            },
            '->',
            {
                xtype   : 'buttongroup',
                items   : {
                    text    : 'Закрыть',
                    handler : function () {
                        this.up('addQueryWin').close();
                    }
                }
            }
        ];
    }
    
});

