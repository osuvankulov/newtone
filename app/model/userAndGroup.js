// Модели
Ext.define('App.model.groupList', {
    extend  : 'Ext.data.Model',
    fields  : ['id', 'name', 'permissions']
});

Ext.define('App.model.userList', {
    extend  : 'Ext.data.Model',
    fields  : ['id', 'full_name', 'username', 'group', 'is_blocked']
});

Ext.define('App.model.departmentList', {
    extend  : 'Ext.data.Model',
    fields  : ['id', 'name', 'adverttypes']
});