
var DetailView = function() {

    this.contact = null;
    this.detailView = document.getElementById("contactdetails");
    this.backbtn = document.getElementById("backtolist");
    this.favoritebtn = document.getElementById("isfavorite");
    this.callbtn = document.getElementById("callbtn");
    this.emailbtn = document.getElementById("emailbtn");
    this.isOpen = false;

    this.init = function() {
        this.backbtn.addEventListener('click', this.closeView.bind(this));
        this.favoritebtn.addEventListener('click', this.favorite.bind(this));
    };
    
    this.setContact = function(c) {
        this.contact = c;
        this.renderView();
        this.openView();
    };
    
    this.openView = function() {
        if(this.isOpen) return;
        
        this.detailView.style.display = "block";
        this.detailView.classList.add('showdetails');
        this.detailView.classList.remove('hidedetails');
        
        this.isOpen = true;
    };
    
    this.closeView = function() {
        if(this.isOpen === false) return;
        
        this.detailView.classList.remove('showdetails');
        this.detailView.classList.add('hidedetails');
        setTimeout(function(){
            this.detailView.style.display = "none";
        }.bind(this), 200);
        
        this.isOpen = false;
    };
    
    this.fillElement = function(element, value) {
        var element = document.getElementById(element);
        var text = document.createTextNode(value);
        element.innerHTML = "";
        element.appendChild(text);
    };
    
    this.renderView = function() {
        var contactphoto = this.contact.photo === "" ? "assets/images/nophoto.png" : this.contact.photo;
        document.getElementById("contactphoto").src = contactphoto;
        this.fillElement("contactname", this.contact.contactname);
        this.fillElement("workphone", this.contact.workphone);
        this.fillElement("mobilephone", this.contact.mobilephone);
        this.fillElement("workemail", this.contact.workemail);
        this.fillElement("privateemail", this.contact.privateemail);
        this.fillElement("address", this.contact.address);
        this.fillElement("notes", this.contact.notes);
        var isfavorite = this.contact.favorite ? "favorite-btn-active" : "favorite-btn";
        this.favoritebtn.className = isfavorite;
        this.callbtn.setAttribute("href", "tel:" + this.contact.workphone);
        this.emailbtn.setAttribute("href", "mailto:" + this.contact.workemail);
    };
    
    this.favorite = function() {
        var isfavorite = this.contact.favorite ? false : true;
        var classname = isfavorite ? "favorite-btn-active" : "favorite-btn";
        this.favoritebtn.className = classname;
        this.contact.setFavorite(isfavorite);
    }

};
