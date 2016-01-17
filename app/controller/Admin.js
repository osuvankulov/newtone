// Контролер
Ext.define('App.controller.Admin', {
    extend  : 'Ext.app.Controller',

    views   : [
        'admin.users'
    ],
    
    stores  : [ 
        'userStore',
        'departmentList',
        'groupStore',
        'roleStore',
        'podrazdStore'
    ],
    
    init    : function() {
        this.control({
            '#usersAddUserBtn'  : { click   : this.addUser },
            '#editUser' : { click   : this.editUser },
            '#delUser'  : { click   : this.delUser },
            '#addGroup' : { click   : this.addGroup },
            '#editGroup': { click   : this.editGroup },
            '#delGroup' : { click   : this.delGroup },
            '#userPassRefresh' : { click   : this.userPassRefresh },
            '#userBlock' : { click   : this.userBlock },
            '#addDepartment' : { click   : this.addDepartment },
            '#editDepartment' : { click   : this.editDepartment },
            '#editDepartmentInfo' : { click   : this.editDepartment },
            '#delDepartmentInfo' : { click   : this.delDepartment },
            'departmentList'  : {
                //При изменении записи (выборки) на гриде
                'selectionchange'   : this.selectContractor,
                //Двойной клик на гриде
                'itemdblclick': this.editDepartment
            },
            '#delDepartmentInfo': {click: this.deleteDepartment},
            '#delDepartment': {click: this.deleteDepartment}
            
        });
    },

    addUser     : function () {
        Ext.create('App.view.admin.addUserWin').show();
    },
    
    editUser    : function () {
        Ext.create('App.view.admin.addUserWin').show();
    },
    
    delUser     : function () {
        //Ext.create('App.view.admin.addUserWin').show();
    },
    
    addGroup    : function () {
        Ext.create('App.view.admin.addGroupWin').show();
    },
    
    editGroup   : function () {
        Ext.create('App.view.admin.addGroupWin').show();
    },

    delGroup    : function () {
        //Ext.create('App.view.admin.addUserWin').show();
    },
    editDepartment   : function () {
        Ext.create('App.view.admin.editDepartmentWin').show();
    },
    addDepartment   : function () {
        Ext.create('App.view.admin.editDepartmentWin').show();
    },
    userPassRefresh    : function () {
        Ext.create('widget.adminUserPassRefreshWin').show();
    },
    
    userBlock    : function () {
        Ext.create('App.view.admin.userBlockWin').show();
    },
    
    //Показ записи в нижнем окне при изменение выборки
    selectContractor    : function (view, sel, opt) {
        var aboutPanel = Ext.getCmp('cardPanel').down('departmentInfoPanel');
        if (sel.length) aboutPanel.loadRecord(sel[0]);
            else  aboutPanel.getForm().reset();
    },
    //Удаление отдела
    deleteDepartment: function (btn){
        console.log('delDepartment');
        Ext.Msg.show({
             title:'Отделы',
             msg: 'Удалить выбранный отдел?',
             buttons: Ext.Msg.YESNO,
             icon: Ext.MessageBox.QUESTION
        });
    }
    
});
