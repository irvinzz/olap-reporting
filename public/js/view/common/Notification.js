var Ext = Ext || {};

Ext.Loader.require(
    'Ext.ux.window.Notification'
);

Ext.define('Olap.view.common.Notification', {
    extend: 'Ext.ux.window.Notification',
    position: 'br',
    manager: 'demo1',
    iconCls: 'ux-notification-icon-information',
    autoCloseDelay: 5000,
    slideInDuration: 800,
    spacing: 20
});