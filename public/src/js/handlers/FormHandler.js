
var FormHandler = function(fields) {

    this.fields = fields;
    
    this.getFieldValue = function(fieldname) {
    
        var field = document.getElementsByName(fieldname);
        if(field.length > 0) {
            return field[0].value;
        } else {
            return "";
        }
    
    };

    this.getAllValues = function() {
    
        var data = {};
        for(var x in this.fields) {
            data[fields[x]] = this.getFieldValue(this.fields[x]);
        }
        return data;
    
    };
    
    this.fillForm = function() {
        for(var x in this.fields) {
            var inputfield = document.getElementsByName(this.fields[x])[0];
            var viewelement = document.getElementById(this.fields[x]);
            inputfield.value = App.editview.contact[this.fields[x]];
        }
    };

};
