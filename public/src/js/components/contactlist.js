
var ContactList = function() {

    var self = this;
    this.contacts = [];
    this.container = document.getElementById("contactlist");
    this.searchbar = document.getElementById("search");
    
    this.init = function() {
        this.retrieveContacts();
        this.searchbar.addEventListener("keyup", this.filterContacts.bind(this));
    };
    
    this.retrieveContacts = function() {
        App.ajaxhandler.getRequest("contacts", function(response){
            this.contacts = response.map(x => new Contact(x));
            this.renderContactList();
        }.bind(this));
    };
    
    this.renderContactList = function() {
        for (var x in self.contacts) {
            this.container.appendChild(this.contacts[x].renderListItem());
        }
    };
    
    this.showFavorites = function() {
        var favorites = this.contacts.filter(x => x.favorite === true);
        this.container.innerHTML = "";
        
        for(var x in favorites) {
            this.container.appendChild(favorites[x].getListItem());
        }
    };
    
    this.showAll = function() {
        this.container.innerHTML = "";
         for (var x in self.contacts) {
            this.container.appendChild(this.contacts[x].getListItem());
        }
    };
    
    this.filterContacts = function() {
        var value = this.searchbar.value;
        var filtered = this.contacts.filter(x => x.contactname.toLowerCase().indexOf(value) != -1);
        this.container.innerHTML = "";
        
        for(var x in filtered) {
                this.container.appendChild(filtered[x].getListItem());
        }
    };
    
    this.newContact = function() {
        App.ajaxhandler.postRequest("contacts/new", {contactname: "New Contact"}, function(response){
            this.contacts.push(new Contact({
                id: response.id,
                contactname: "New Contact"
            }));
            var contactindex = this.contacts.length - 1;
            this.container.appendChild(this.contacts[contactindex].renderListItem());
            App.detailview.setContact(this.contacts[contactindex]);
            App.editview.setContact(this.contacts[contactindex]);
            this.contacts[contactindex].select();
            App.editview.editMode();
        }.bind(this));
    }
    
    this.deleteContact = function(c) {
        App.ajaxhandler.getRequest("contacts/delete/" + c.id, function(response){
            this.contacts = this.contacts.filter(x => x != c);
            this.container.innerHTML = "";
            this.renderContactList();
            App.detailview.closeView();
        }.bind(this));
        
    };
    
    this.deselectAll = function() {
        for(var x in this.contacts) {
            this.contacts[x].listitem.classList.remove("active");
        }
    }

}
