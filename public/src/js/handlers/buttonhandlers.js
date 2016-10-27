
var ButtonHandlers = function() {

    this.contactsbtns = document.getElementsByClassName("contacts");
    this.favoritesbtns = document.getElementsByClassName("favorites");
    this.addcontactbtn = document.getElementById("addcontactbtn");

    this.init = function() {
        for(var x = 0; x < this.contactsbtns.length; x++) {
            this.contactsbtns[x].addEventListener("click", this.contactsClicked.bind(this));
            this.favoritesbtns[x].addEventListener("click", this.favoritesClicked.bind(this));
        }
        
        this.addcontactbtn.addEventListener("click", App.contactList.newContact.bind(App.contactList));
    };
    
    this.contactsClicked = function() {
        for(var x = 0; x < this.contactsbtns.length; x++) {
            this.favoritesbtns[x].classList.remove("active");
            this.contactsbtns[x].classList.add("active");
        }
        
        App.contactList.showAll();
        
    };
    
    this.favoritesClicked = function() {
        for(var x = 0; x < this.contactsbtns.length; x++) {
            this.favoritesbtns[x].classList.add("active");
            this.contactsbtns[x].classList.remove("active");
        }
        App.contactList.showFavorites();
    };

};
