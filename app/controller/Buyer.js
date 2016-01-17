// Контролер
Ext.define('App.controller.Buyer', {
    extend  : 'Ext.app.Controller',

    views   : [
        'buyer.queryControl',
        'buyer.templateControlImport',
        'buyer.templateControlExport',
        'buyer.contractors',
        'buyer.addServ',
        'buyer.advMedia',
        'buyer.objects'
    ],
    
    stores  : [
        'queryStore',
        'contractorsStore',
        'queryList',
        'answerStore',
        'querycategory',
        'queryvidnositel',
        'querycity',
        'queryrazmeshstore',
        'queryrazmerstore',
        'queryvidizdstore',
        'querymetrostore',
        'querydaysstore',
        'querySearchAnswersStore',
        'querySearchResultsStore',
        'buyertermplateimportstore',
        'buyertermplateimportpropertiesstore',
        'templateimportobjtype',
        'buyertermplateexportstore',
        'buyertermplateexportpropertiesstore',
        'buyertemplateexportaddstore',
        'addServStore',
        'additionServResultsStore',
        'queryAddServStore',
        
        
        'queryListPropVals'
    ],
    
    init    : function() {
        this.control({
            '#addUser'  : { 
                click   : this.addUser 
            },
            
            'contractors'  : {
                'activate'   : this.contractorsActivate
            },
            //Байер шаблоны импорта
            'templateControlImport' : {
                'activate': this.templateControlImportActivate
            },
            //Байер шаблоны экспорта
            'templateControlExport': {
                'activate': this.templateControlExportActivate
            },
            'addExportTemplate': {
              'activate': this.addExportTemplateActivate
            },
            'queryControl':{
                'activate'  : this.queryControlActivate
            },
            'buyerAnswerList button':{
                'click'  : this.answerListBtn
            },
            
            'viewExportTemplate': {
                'activate': this.viewExportTemplateActivate
            },
            
            'buyerContractorsList'  : {
                //При изменении записи (выборки) на гриде
                'selectionchange'   : this.selectContractor,
                //Двойной клик на гриде
                'itemdblclick': this.editContractor
            },
            //Добавление запроса Байер
            '#addbuyerquery': {
                'click': this.addBuyerQuery  
            },
            // Окно запроса Байер
            'addBuyerQuery': {
                'resize': this.resizeBuyerQueryWin
            },
            //Добавление нового поиска запроса
            '#addbuyerquerysearch': {
                'click'  : this.addbuyerquerysearch
            },
            //Редактирование шаблона экспорта
            '#templateexporteditbtn':{
                'click': this.templateExportEdit
            },
            //Добавить шаблонэкспорта
            '#templateExportAddBtn': {
                'click': this.templateExportAdd
            },
            //Просмотр шаблона экспорта
            '#templateControlExportBottomViewBtn':{
                'click': this.templateControlExportView
            },
            '#btnAddContractor'  : {
                'click'   : this.addNewContractor
            },
            '#btnEditContractor'  : {
                'click'   : this.editContractor
            },
            '#btnAddContractorDetailed'  : {
                'click'   : this.addNewContractor
            },
            '#btnEditContractorDetailed'  : {
                'click'   : this.editContractor
            },
            '#btnDeleteContractor': {
                'click': this.deleteContractor
            },
            '#btnDeleteContractorDetailed' : {
                'click': this.deleteContractor
            },
            '#btnbuyerquerysearch' : {
                'click': this.buyerQuerySearch
            },
            'addBuyerQuerySearch button' : {
                'click': this.addBuyerQuerySearchClick
            },
            '#templateImportAddBtn' : {
                'click': this.addTemplateImport
            },
            'addServ'  : {
                'activate'   : this.addServActivate
            },
            'buyerAddServList' : {
                //При изменении записи (выборки) на гриде
                'selectionchange'   : this.selectAddServ,
                //Двойной клик на гриде
                'itemdblclick'      : this.editAddServ
            },
            'buyerAddServList button' : {
                'click' :   this.addServBtn
            },
            'buyerAddServWin button' : {
                'click' :   this.addServWinBtn
            },
            'buyerQueryAddServList button' : {
                'click' :   this.addQueryServBtn
            },
            'BuyerQuerySearch button' : {
                'click' :   this.searchWinBtn
            },
            'buyerQueryList button' : {
                'click' :   this.queryListBtn
            },
            'buyerObjects button' : {
                'click' :   this.buyerObjectsBtn
            },
            'buyerAdvMedia button' : {
                'click' :   this.buyerAdvMediaBtn
            }
        });
    },
    //Редактирование шаблона экспорта
    templateExportEdit: function(){
        Ext.create('App.view.buyer.addExportTemplate',{
            title: 'Редактирование шаблона экспорта'
        }).show();
    },
    //Просмотр шаблона экспорта
    templateControlExportView: function(){
        Ext.create('App.view.buyer.viewExportTemplate').show();
    },
    //Активация просмотра щаблона экспорта
    viewExportTemplateActivate: function(panel){
        panel.down('gridpanel').getStore().load();
    },
    
    //Добавление шаблона экспорта
    templateExportAdd: function(){
        Ext.create('App.view.buyer.addExportTemplate',{
            title: 'Новый шаблон экспорта'
        }).show();
    },
    //Добавление запроса Байера
    addBuyerQuery: function(){
        Ext.create('App.view.buyer.addBuyerQuery').show();
    },
    //Окно запроса Байера
    resizeBuyerQueryWin: function (wind){
        
        var win = wind.getSize(), client = Ext.getBody().getViewSize(),
            x = (client.width-win.width)/2, y = (client.height-win.height)/2;
            
        wind.setPosition(x, y);
        
    },
    //Добавление нового поиска к запросу
    addbuyerquerysearch: function(){
        Ext.create('App.view.buyer.addBuyerQuerySearch').show();
    },
    //Добавление нового щаблона импорта
    addTemplateImport: function(){
        Ext.create('App.view.buyer.addImportTemplate').show();
    },
    addUser     : function () {
        Ext.create('App.view.admin.addUserWin').show();
    },
    queryControlActivate: function(panel){
        panel.down('buyerQueryList').getStore().load();
        panel.down('buyerAnswerList').getStore().load();

    },
    addExportTemplateActivate: function(panel){
        panel.down('gridpanel').getStore().load();
    },
    templateControlImportActivate:function(panel){
        panel.down('TemplateControlImportList').getStore().load();
        panel.down('templateControlImportPropertiesList').getStore().load();

    },
    templateControlExportActivate: function(panel){
        panel.down('templateControlExportList').getStore().load();
        panel.down('templateControlExportPropertiesList').getStore().load();
    },
    contractorsActivate    : function (panel) {
        panel.down('buyerContractorsList').getStore().load();
        panel.down('buyerAboutContractor').getForm().reset();
    },
    
    //Показ записи в нижнем окне при изменение выборки
    selectContractor    : function (view, sel, opt) {
        var aboutPanel = Ext.getCmp('cardPanel').down('buyerAboutContractor');
        if (sel.length) aboutPanel.loadRecord(sel[0]);
            else  aboutPanel.getForm().reset();
    },
    
    //Добавление записи
    addNewContractor    : function (btn) {
        Ext.create('App.view.buyer.addContrWin').show();
    },
    
    //Редактирование записи
    editContractor    : function (btn) {
        Ext.create('App.view.buyer.addContrWin').show();
    },
    
    //Удаление подрядчика
    deleteContractor: function (btn){
        Ext.Msg.show({
             title:'Подрядчики',
             msg: 'Удалить выбранного подрядчика?',
             buttons: Ext.Msg.YESNO,
             icon: Ext.MessageBox.QUESTION
        });
    },
    
    //Байер Поиск по запросу
    buyerQuerySearch: function (btn){
        Ext.create('App.view.buyer.BuyerQuerySearch').show();
    },
    
    //Обработчик нажатий кнопок Окна нового поиска в запросах
    addBuyerQuerySearchClick: function(btn){
        switch (btn.name) {
            case 'save':      // Добавить объект
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
                    break;
        }
    },
    
    // Управление запросами -> Ответы -> Кнопки TopToolbar'а
    answerListBtn: function (btn) {
    
        switch (btn.name) {
        
            case 'addObj':      // Добавить объект
                    Ext.create('App.view.buyer.addBuyerQuery', {
                        title       : 'Добавить объект',
                        isObject    : true
                    }).show();
                    break;

            case 'addState':     //Добавить статусы/тарифы
                    Ext.create('App.view.buyer.addStatusRatesWin', {isEdit:false}).show();
                    break;
                    
            case 'addServ':     // Дополнительные услуги
                    Ext.create('App.view.buyer.addServWin').show();
                    break;
            
        }
    },
    
    /*
        *******************    Дополнительные услуги  ************************
    */
    
    addServActivate    : function (panel) {
        panel.down('buyerAddServList').getStore().load();
        panel.down('buyerAboutService').getForm().reset();
    },
    
    //Показ доп. услуги в нижнем окне
    selectAddServ    : function (view, sel, opt) {
        var aboutPanel = Ext.getCmp('cardPanel').down('buyerAboutService');
        if (sel.length) aboutPanel.loadRecord(sel[0]);
            else  aboutPanel.getForm().reset();
    },
    
    //Редактирование доп. услуги
    editAddServ    : function (view, rec/*, item, index, event, options*/) {
        var win = Ext.create('App.view.buyer.addAdditionServWin');
        win.rec = rec;
        win.show();
    },
    
    //Удаление доп. услуги
    deleteAddServ: function (id){
        Ext.Msg.show({
            title   :'Дополнительные услуги',
            msg     : 'Удалить выбранную услугу?',
            buttons : Ext.Msg.YESNO,
            icon    : Ext.MessageBox.QUESTION
        });
    },
    
    addServWinBtn: function (btn) {
            
        switch (btn.name) {
        
            case 'save':     //Сохранить
                    Ext.Msg.show({
                        title:'Дополнительные услуги',
                        msg: 'Сохранить изменения?',
                        scope: this,
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.MessageBox.QUESTION,
                        fn: function(msgbtn) {
                            /*if (msgbtn == 'yes') {
                                btn.up('window').close();
                            }*/
                        }
                    });
                    break;
                    
            case 'close':     //Закрыть
                    Ext.Msg.show({
                        title:'Дополнительные услуги',
                        msg: 'Сохранить изменения?',
                        scope: this,
                        buttons: Ext.Msg.YESNOCANCEL,
                        icon: Ext.MessageBox.QUESTION,
                        fn: function(msgbtn) {
                            if (msgbtn == 'yes') {
                                btn.up('window').close();
                            } else if (msgbtn == 'no'){
                                btn.up('window').close();
                            } else { // cancel
                                // close this messagebox
                            }
                        }
                    });
                    break;
                    
        }
    },
    
    addServBtn: function (btn) {
        var grid = btn.up('buyerAddServList'),
            sm = grid.getSelectionModel();
            
        switch (btn.name) {
        
            case 'editServ':     //Редактирование записи
                    if (sm.hasSelection()) {
                        this.editAddServ(grid, sm.getSelection()[0]);
                    } else {
                        Ext.Msg.alert('Внимание', 'Выберите дополнительную услугу.');
                    }
                    break;
                    
            case 'addServ':     //Добавление записи
                    this.editAddServ();
                    break;
                    
            case 'delServ':     //Удаление записи
                    if (sm.hasSelection()) {
                        this.deleteAddServ(sm.getSelection()[0].id);
                    } else {
                        Ext.Msg.alert('Внимание', 'Выберите дополнительную услугу.');
                    }
                    break;
        }
    },
    
    addQueryServBtn: function (btn) {
        var grid = btn.up('buyerQueryAddServList'),
            sm = grid.getSelectionModel();
            
        switch (btn.name) {
        
            case 'addServ':     //Добавление записи
                    this.editQueryAddServ();
                    break;
                    
            case 'delServ':     //Удаление записи
                    if (sm.hasSelection()) {
                        this.deleteQueryAddServ(sm.getSelection()[0].id);
                    } else {
                        Ext.Msg.alert('Внимание', 'Выберите дополнительную услугу.');
                    }
                    break;
        }
    },
    //Редактирование доп. услуги
    editQueryAddServ    : function (view, rec/*, item, index, event, options*/) {
        var win = Ext.create('App.view.buyer.addServFromListWin');
        win.show();
    },
    //Удаление доп. услуги
    deleteQueryAddServ: function (id){
        Ext.Msg.show({
            title   :'Дополнительные услуги',
            msg     : 'Удалить выбранную услугу?',
            buttons : Ext.Msg.YESNO,
            icon    : Ext.MessageBox.QUESTION
        });
    },
    
    searchWinBtn: function (btn) {
        switch (btn.name) {
        
            case 'AddObj':     //Добавить объект
                    Ext.create('App.view.buyer.addBuyerQuery', {
                        title       : 'Добавить объект',
                        isObject    : true
                    }).show();
                    break;
                    
            case 'saveSel':     //Сохранить выбор
                    Ext.Msg.show({
                        title: 'Сохранить выбор.',
                        msg: 'Вы желаете сохранить выбор?',
                        scope: this,
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.MessageBox.QUESTION,
                        fn: function(){}
                    });
                    break;
                    
            case 'addState':     //Добавить статусы и тарифы
                    Ext.create('App.view.buyer.addStatusRatesWin', {isEdit:false}).show();
                    break;
                    
        }
    },
    
    queryListBtn: function (btn) {
        switch (btn.name) {
        
            case 'notice':     //Показать уведомления
                    Ext.create('App.view.buyer.showNotificationWin').show();
                    break;
                    
        }
    },
    
    buyerObjectsBtn: function (btn) {
        switch (btn.name) {
        
            case 'import':     //Показать окно импорта объектов
                    Ext.create('App.view.buyer.importFilesWin', { isImport:true, isObject:true }).show();
                    break;
                    
            case 'export':     //Показать окно импорта объектов
                    Ext.create('App.view.buyer.importFilesWin', { isImport:false, isObject:true }).show();
                    break;
                    
            case 'addObject':     //Добавить объект
                    Ext.create('App.view.buyer.addBuyerQuery', {title:'Добавить объект',isObject:true}).show();
                    break;
                    
            case 'del':     //Удалить
                    Ext.Msg.show({
                        title:'Удаление',
                        msg: 'Вы действительно хотите удалить?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.MessageBox.ERROR,
                        fn: function(){}
                    });
                    break;
                    
            case 'editState':     //Редактировать статусы/тарифы
                    Ext.create('App.view.buyer.addStatusRatesWin', {isEdit:true}).show();
                    break;
                    
        }
    },
    
    buyerAdvMediaBtn: function (btn) {
        switch (btn.name) {
        
            case 'import':     //Показать окно импорта рекламаносителей
                    Ext.create('App.view.buyer.importFilesWin', { isImport:true, isObject:false }).show();
                    break;
                    
            case 'export':     //Показать окно импорта рекламаносителей
                    Ext.create('App.view.buyer.importFilesWin', { isImport:false, isObject:false }).show();
                    break;
                    
            case 'addMedia':     //Добавить носитель
                    Ext.create('App.view.buyer.addBuyerQuery', {title:'Добавить носитель'}).show();
                    break;
                    
            case 'del':     //Удалить
                    Ext.Msg.show({
                        title:'Удаление',
                        msg: 'Вы действительно хотите удалить?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.MessageBox.ERROR,
                        fn: function(){}
                    });
                    break;
                    
            case 'addState':     //Добавить статусы/тарифы
                    Ext.create('App.view.buyer.addStatusRatesWin', {isEdit:false}).show();
                    break;
                    
        }
    }

});
 