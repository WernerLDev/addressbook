
var AjaxHandler = function() {
    
    this.loading = document.getElementById("loadinggif");
    this.uploadgif = document.getElementById("uploadgif");
    
    this.sendRequest = function(apicall, data, type, callback) {
        this.loading.style.display = "block";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                callback(JSON.parse(xmlhttp.responseText));
                this.loading.style.display = "none";
            }
        }.bind(this);
        xmlhttp.open(type, apicall, true);
        var params = this.prepareParams(data);
        if(type === "POST") {
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader("Content-length", params.length);
            xmlhttp.setRequestHeader("Connection", "close");
        }
        xmlhttp.send(params);
    }
    
    this.getRequest = function(apicall, callback) {
        this.sendRequest(apicall, {}, "GET", callback);
    };
    
    this.postRequest = function(apicall, data, callback) {
        this.sendRequest(apicall, data, "POST", callback);
    };
    
    this.deleteRequest = function(apicall, callback) {
        this.sendRequest(apicall, {}, "DELETE", callback);
    };
    
    this.fileRequest = function(apicall, file, callback) {
        if (!file.type.match('image.*')) {
            alert("I want an image, not this...");
            return;
        }
        this.uploadgif.style.display = "block";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                callback(JSON.parse(xmlhttp.responseText));
                this.uploadgif.style.display = "none";
            }
        }.bind(this);
        var formdata = new FormData();
        formdata.append("photo", file, file.name);
        xmlhttp.open("POST", apicall, true);
        xmlhttp.send(formdata);
    }
    
    this.prepareParams = function(data) {
        var output = [];
        for(var x in data) {
            output.push(x + "=" + encodeURIComponent(data[x]));
        }
        return output.join("&");
    };
};

