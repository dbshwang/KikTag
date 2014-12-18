App.controller('new', function (page) {
    function callback(str){
      $(page).find('.app-content').append(str);
    }

    function openDialog(el){
      opts = {
        title: $(el).find('h3').text(),
        cancelButton : 'cancel',
        viewButton   : 'View'
      };

      App.dialog(opts, function(choice, cancelButton){
          if(choice == 'view'){
            console.log('hi');
            kik.open('kik-share://kik.com/g/' + opts['title']);
          }
        });
    }
    $(page).on('appReady', function(){
        category = ($(page).data('page'));
        zerver.get('API/view', {category: category} , function(hashtags){
          super_el = $('<div class="groupcontainer"></div>');
          var i =0;
          for(i = 0; i< hashtags.length; i++){
            el = $('<div class="populate_group"><div class="info"></div></div>');
            el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
            el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
            el.on('click', function(){
              openDialog($(this));
            });
            super_el.append(el);
          }
          callback(super_el);
        });
    });
});

App.controller('new', function (page) {
  function callback(str){
    console.log(str);
    $(page).find('.app-content').append(str);
  }

  $(page).on('appReady', function(){
    category = ($(page).data('page'));
    zerver.get('API/view', {category: category} , function(hashtags){
      super_el = $('<div class="groupcontainer"></div>');
      for(var i = 0; i< hashtags.length; i++){
        el = $('<div class="populate_group"><div class="info"></div></div>');
        el.find('.info').append('<h3>' + '<a href="kik-share://kik.com/g/' + hashtags[i]['hashtag'] + '">' + hashtags[i]['hashtag'] + '</a></h3>');
        el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
        super_el.append(el);
      }
      callback(super_el);
    });

  });

  //  TAPPING ON A GROUP IN DISCOVER GROUP PAGE --> GROUPS NAMES NEED TO AUTOMATICALLY BE INPUTTED
  node = document.createElement("div");
  node.className = "rating";
  $(node).append('<label> <input type="radio" name="star" value="1"/> <img src="img/star.png"> <input type="radio" name="star" value="2"/> <img src="img/star.png"> <input type="radio" name="star" value="3"/> <img src="img/star.png"> <input type="radio" name="star" value="4"/> <img src="img/star.png"> <input type="radio" name="star" value="5"/> <img src="img/star.png"> </label>');

  var logID = 'log',
  log = $('<div id="'+logID+'"></div>');
  $('body').append(log);
  $('[type*="radio"]').change(function () {
    var me = $(this);
    log.html(me.attr('value'));
  });

  page.querySelector(".populate_group").addEventListener('click' , (function(event) {
    App.dialog({title: "#Poop",
    text: "Rate the Group",
    rawHTML: node,
    viewButton: "View Group",
    okButton: "Cancel",
    dark: false
  }, function(choice) {
    if(choice === "view") {
      kik.open('kik-share://kik.com/g/#poop');
    }
  }
)
}));
});
