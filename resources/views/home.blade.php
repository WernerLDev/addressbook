<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Address book</title>
        <link rel="stylesheet" href="assets/css/normalize.css">
        <link rel="stylesheet" href="assets/css/main.css">
        
    </head>

    <body>
        
        <div class="menu-desktop">
            <ul class="buttonbar buttonbar-vertical">
                <li class="contacts active"><a href="#">All contacts</a></li>
                <li class="favorites"><a href="#">Favorites</a></li>
            </ul>
            <img class="loading" id="loadinggif" src="assets/images/loading.gif" alt="" />
        </div>
        
        
        <div class="contact-list">
            <div class="searchcontacts">
                <input type="text" id="search" placeholder="Search contacts" />
            </div>
            <div class="scroll-pane">
                <ul class="list" id="contactlist"></ul>
            </div>
            
        
            <ul class="buttonbar">
                <li class="contacts mobile-only active"><a href="#">Contacts</a></li>
                <li class="favorites mobile-only"><a href="#">Favorites</a></li>
                <li class="add desktop-center" id="addcontactbtn"><a href="#">add contact</a></li>
            </ul>
        </div>
        
        <div id="contactdetails" class="contact-detail">
            <div class="mobile-header">
                <a href="#" id="backtolist" class="back">Back</a>
            </div>
            <div class="scroll-pane">
                <div class="row detailhead">
                    <div class="col-left">
                        <div class="photowrapper">
                            <img class="contactphoto" id="contactphoto" src="assets/images/nophoto.png" alt="" />
                            <div class="filechoose editmode">Upload photo</div>
                            <input id="photouploadbtn" name="photoselect" type="file" class="uploadinput editmode" />
                            <img class="uploadgif" id="uploadgif" src="assets/images/uploading.gif" />
                            <input type="hidden" name="photo" />
                        </div>
                    </div>
                    <div class="col-right contactname">
                        <h1 id="contactname" class="viewmode"></h1>
                        <input type="text" name="contactname" value="" class="editmode" />
                    </div>
                    <a href="#" id="isfavorite" class="favorite-btn"></a>
                    
                </div>
                <div class="row">
                    <div class="col-left graytext">Work phone</div>
                    <div class="col-right viewmode" id="workphone"></div>
                    <div class="col-right editmode"><input type="tel" name="workphone" value="" /></div>
                </div>
                <div class="row borderbottom">
                    <div class="col-left graytext">Mobile phone</div>
                    <div class="col-right viewmode" id="mobilephone"></div>
                    <div class="col-right editmode"><input type="tel" name="mobilephone" value="" /></div>
                </div>
                <div class="row">
                    <div class="col-left graytext">Work E-mail</div>
                    <div class="col-right viewmode" id="workemail"></div>
                    <div class="col-right editmode"><input type="email" name="workemail" value="" /></div>
                </div>
                <div class="row borderbottom">
                    <div class="col-left graytext">Private E-mail</div>
                    <div class="col-right viewmode" id="privateemail"></div>
                    <div class="col-right editmode"><input type="email" name="privateemail" value="" /></div>
                </div>
                <div class="row borderbottom">
                    <div class="col-left graytext">Address</div>
                    <div class="col-right whitespace-wrap viewmode" id="address"></div>
                    <div class="col-right editmode"><textarea name="address"></textarea></div>
                </div>
                <div class="row">
                    <div class="col-left graytext">Notes</div>
                    <div class="col-right whitespace-wrap viewmode" id="notes"></div>
                    <div class="col-right editmode"><textarea name="notes"></textarea></div>
                </div>
            </div>
             <ul class="buttonbar viewmode">
                <li class="call"><a id="callbtn" href="#">Call</a></li>
                <li class="email"><a id="emailbtn" href="#">Email</a></li>
                <li class="edit right" id="editbtn"><a href="#">Edit</a></li>
            </ul>
            <ul class="buttonbar editmode">
                <li class="delete" id="deletebtn"><a href="#">Delete</a></li>
                <li class="save right" id="savebtn"><a href="#">save</a></li>
            </ul>
        </div>
        <script src="assets/js/main.min.js" type="text/javascript"></script>
    </body>

</html>
