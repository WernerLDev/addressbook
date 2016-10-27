
var EditView = function() {

    this.contact = null;
    
    this.viewmodeElems = document.getElementsByClassName("viewmode");
    this.editmodeElems = document.getElementsByClassName("editmode");
    this.fields = ["photo", "contactname", "workphone", "mobilephone", "workemail", "privateemail",
                   "address", "notes"];
    this.form = new FormHandler(this.fields);
    
    this.editbtn = document.getElementById("editbtn");
    this.savebtn = document.getElementById("savebtn");
    this.deletebtn = document.getElementById("deletebtn");
    this.uploadbtn = document.getElementById("photouploadbtn");

    this.init = function() {
        this.editbtn.addEventListener('click', this.editMode.bind(this));
        this.savebtn.addEventListener('click', this.saveContact.bind(this));
        this.deletebtn.addEventListener('click', this.deleteContact.bind(this));
        this.uploadbtn.addEventListener('change', this.fileChanged);
    };
    
    this.fileChanged = function() {
        App.ajaxhandler.fileRequest("contacts/uploadphoto", this.files[0], function(response){
            if(response.status === "success"){
                document.getElementById("contactphoto").src = response.photo;
                App.editview.contact.photo = response.photo;
                document.getElementsByName("photo")[0].value = response.photo;
            } else {
                alert(response.status);
            }
        });
    };
    
    this.setContact = function(c) {
        this.contact = c;
    };
    
    this.saveContact = function() {
        this.contact.updateContact(this.form.getAllValues());
        App.detailview.renderView();
        this.viewMode();
    };
    
    this.deleteContact = function() {
        App.contactList.deleteContact(this.contact);
    };
    
    this.editMode = function() {
        this.form.fillForm();
        for(var i = 0; i < this.viewmodeElems.length; i++) {
            this.viewmodeElems[i].style.display = "none";
        }
        for(var i = 0; i < this.editmodeElems.length; i++) {
            this.editmodeElems[i].style.display = "block";
        }
        document.getElementsByName("contactname")[0].focus();
    };
    
    this.viewMode = function() {
        for(var i = 0; i < this.viewmodeElems.length; i++) {
            this.viewmodeElems[i].style.display = "block";
        }
        for(var i = 0; i < this.editmodeElems.length; i++) {
            this.editmodeElems[i].style.display = "none";
        }
    };

};
