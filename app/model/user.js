// Модели
Ext.define('App.model.user', {
    extend  : 'Ext.data.Model',
    fields  : ['id', 'full_name', 'username', 'group', 'is_blocked']
});
