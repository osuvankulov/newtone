// Заголовок
Ext.define('App.view.main.Header' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.mainheader',
    
    region       : 'north',
    height       : 40,
    boxMaxHeight : 40,
    baseCls      : 'body-bg',
    border       : false,
    
    initComponent : function() {
        this.html = new Ext.XTemplate(
            '<div style="height:40px; width: 100%; overflow:hidden;">',
            '<div class="company-title"><i>Рекламное агентство Ньютон <sup style="font-size:12px;">®<sup/></i></div>'+
            '<div id="animEl">&nbsp;</div>' +
            '<ul class="main-menu">' +
            '<li class="box"><span>Офис:&nbsp;&nbsp;<b>{office}</b></span></li>' +
            '<li>&nbsp;&nbsp;&nbsp;&nbsp;</li>' +
            '<li class="box"><span>Пользователь:&nbsp;&nbsp;<b>{user}</b></span></li>' +
            '<li>&nbsp;&nbsp;&nbsp;&nbsp;</li>' +
            '<li><a href="javaScript:void(0)" id="lk-logout">Выход</a></li>' +
            '</ul>',
            '</div>'
        ).apply({user : 'Иванов Иван Иванович', office : 'Главный офис'});

        this.callParent(arguments);
    }
});