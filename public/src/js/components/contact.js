var Contact = function(data) {

    this.id = data.id === undefined ? 0 : data.id;
    this.photo = data.photo === undefined ? "" : data.photo;
    this.contactname = data.contactname === undefined ? "" : data.contactname;
    this.workphone = data.workphone === undefined ? "" : data.workphone;
    this.mobilephone = data.mobilephone === undefined ? "" : data.mobilephone;
    this.workemail = data.workemail === undefined ? "" : data.workemail;
    this.privateemail = data.privateemail === undefined ? "" : data.privateemail;
    this.address = data.address === undefined ? "" : data.address;
    this.notes = data.notes === undefined ? "" : data.notes;
    this.favorite = data.favorite === undefined ? false : data.favorite;
    
    this.listitem = null;

    this.renderListItem = function() {
        this.listitem = document.createElement("li");
        this.listitem.addEventListener('click', this.clicked.bind(this));
        if(this.favorite) this.listitem.className = "favorite";
        var textnode = document.createTextNode(this.contactname.substring(0,20));
        var contactphoto = this.photo === "" ? "assets/images/nophoto.png" : this.photo;
        this.listitem.innerHTML = '<img src="'+contactphoto+'" alt="" />'+
                       '<div class="contact-name"></div>';
        this.listitem.getElementsByClassName("contact-name")[0].appendChild(textnode);
        return this.listitem;
    };
    
    this.updateListItem = function() {
        if(this.favorite) this.listitem.className = "favorite";
        
        var textnode = document.createTextNode(this.contactname.substring(0,20));
        var contactphoto = this.photo === "" ? "assets/images/nophoto.png" : this.photo;
        this.listitem.innerHTML = '<img src="'+contactphoto+'" alt="" />'+
                       '<div class="contact-name"></div>';
        this.listitem.getElementsByClassName("contact-name")[0].appendChild(textnode);
        return this.listitem;
    }
    
    this.getListItem = function() {
        return this.updateListItem();
    }
    
    this.clicked = function() {
        App.detailview.setContact(this);
        App.editview.setContact(this);
        App.editview.viewMode();
        this.select();
    }
    
    this.select = function() {
        App.contactList.deselectAll();
        this.listitem.classList.add("active");
    }
    
    this.updateContact = function(data) {
        this.contactname = data.contactname || "";
        this.workphone = data.workphone || "";
        this.mobilephone = data.mobilephone || "";
        this.workemail = data.workemail || "";
        this.privateemail = data.privateemail || "";
        this.address = data.address || "";
        this.notes = data.notes || "";
        
        App.ajaxhandler.postRequest("contacts/update/" + this.id, {
            contactname: this.contactname,
            photo: this.photo,
            workphone: this.workphone,
            mobilephone: this.mobilephone,
            workemail: this.workemail,
            privateemail: this.privateemail,
            address: this.address,
            notes: this.notes
        }, function(response){
            this.updateListItem();
        }.bind(this));
    };
    
    this.setFavorite = function(isFavorite) {
        App.ajaxhandler.postRequest("contacts/favorite/" + this.id, {
            favorite: isFavorite
        }, function(response){
            this.favorite = isFavorite;
            this.listitem.className = isFavorite ? "favorite" : "";
            this.select();
        }.bind(this));
    }
}
