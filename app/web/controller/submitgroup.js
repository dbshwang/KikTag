App.controller('submitgroup', function (page) {

    
//    var id = "96794b00-8737-11e4-b4a9-0800200c9a66";
//    var amount = 50;
//    var sku = "com.kiktag.promo";
//    
//    kik.Points(id, amount, sku, function(err) {
//        console.log(err);    
//    });
    
    page.querySelector('#submit').addEventListener('click' , (function(event) {
        event.preventDefault();
        var checkvalue = formCheck();

        if(checkvalue == true) {
            form_desc 		= $('#desc').val();
            form_hashtag 	= $('#hashtag').val();
            form_category = $('#category').find(":selected").text();
            user_ = ''
            if (kik.getUser) {
                kik.getUser(function (user) {
                    if (user) {
                        user_ = user.username;
                    }
                }, true);
            }
            formData = { data: { desc: form_desc, hashtag: form_hashtag, category: form_category, user: user_ }};
            zerver.post('API/hashtag', formData , function(str){
                if (str == 'Error') {
                  App.dialog({
                    title: 'Group Already Exists',
                    myButton: 'OK'
                  });
                }
                else {
                  var stack = App.getStack();
                  if (stack.length < 2){
                      App.load('discover');
                      App.removeFromStack(-1);
                  } else if (stack[stack.length - 2][0] === 'discover'){
                      // Creation dialog from Discover Groups --> Submit a Group page
                      App.back();
                          App.dialog({
                          title: 'Group Sucessfully Created',
                          myButton: 'OK'
                      });
                  } else {
                      App.load('discover');
                      App.removeFromStack(-1);
                      // Creation dialog from Submit a Group page
                      App.dialog({
                          title: 'Group Sucessfully Created',
                          myButton: 'OK'
                      });
                  }
              }
            });
        }
    }));

    // Array to hold all the form values
    function formCheck() {
        var fields = new Array();
        fields[0] = page.querySelector("#hashtag").value;
        fields[1] = page.querySelector("#desc").value;
        var temp = page.querySelector("#category");
        fields[2] = temp.options[temp.selectedIndex].value;

        // Checking empty fields
        for(var i = 0; i < fields.length; i++) {
            if(fields[i] == "" ||
            fields[i] == "Choose a category" ||
            fields[i] == "#" ||
            fields[0].indexOf('#') != 0 ||
            fields[0].length <= 2) {
                switch(i) {
                    case 0:
                    page.querySelector('#ehashtag').textContent = "*";
                    page.querySelector('#edesc').textContent = "";
                    page.querySelector('#ecategory').textContent = "";
                    App.dialog({
                        title: 'Error: Invalid Hashtag',
                        text: 'Please enter a valid hashtag',
                        myButton: 'OK'
                    });
                    break;
                    case 1:
                    page.querySelector('#edesc').textContent = "*";
                    page.querySelector('#ehashtag').textContent = "";
                    page.querySelector('#ecategory').textContent = "";
                    App.dialog({
                        title: 'Error: Invalid Description',
                        text: 'Please enter a valid description',
                        myButton: 'OK'
                    });
                    break;
                    default:
                    page.querySelector('#ecategory').textContent = "*";
                    page.querySelector('#ehashtag').textContent = "";
                    page.querySelector('#edesc').textContent = "";
                    App.dialog({
                        title: 'Error: Invalid Category',
                        text: 'Please enter a valid category',
                        myButton: 'OK'
                    });
                }
                return false;
            }
        }
        return true;
    }
});
