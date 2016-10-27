
var App = {

    contactList: new ContactList(),
    detailview: new DetailView(),
    editview: new EditView(),
    buttonhandler: new ButtonHandlers(),
    ajaxhandler: new AjaxHandler(),
    
    init: function() {
        App.detailview.init();
        App.editview.init();
        App.contactList.init();
        App.buttonhandler.init();
    }

};


App.init();
