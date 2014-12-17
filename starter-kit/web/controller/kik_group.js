App.controller('kik_group', function (page) {

    page.querySelector('#submit').addEventListener('click' , (function(event) {
        console.log('here');
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
            API.create(formData, function(str){
              console.log(str);
              
                var stack = App.getStack();
                if (stack.length < 2){
                    App.load('search_group');
                    App.removeFromStack(-1);
                } else if (stack[stack.length - 2][0] === 'search_group'){
                    // Creation dialog from Discover Groups --> Submit a Group page
                    App.back();
                        App.dialog({
                        title: 'Group Sucessfully Created',
                        okButton: 'OK'
                    });
                } else {
                    App.load('search_group');
                    App.removeFromStack(-1);
                    // Creation dialog from Submit a Group page
                    App.dialog({
                        title: 'Group Sucessfully Created',
                        okButton: 'OK'
                    });
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
                                        okButton: 'OK'
                                    });
                                    break;
                                case 1:
                                    page.querySelector('#edesc').textContent = "*";
                                    page.querySelector('#ehashtag').textContent = "";
                                    page.querySelector('#ecategory').textContent = "";
                                    App.dialog({
                                        title: 'Error: Invalid Description',
                                        text: 'Please enter a valid description',
                                        okButton: 'OK'
                                    });
                                    break;
                                default:
                                    page.querySelector('#ecategory').textContent = "*";
                                    page.querySelector('#ehashtag').textContent = "";
                                    page.querySelector('#edesc').textContent = "";
                                    App.dialog({
                                        title: 'Error: Invalid Category',
                                        text: 'Please enter a valid category',
                                        okButton: 'OK'
                                    });
                        }
						return false;
					}
				}
				return true;
			}
});
