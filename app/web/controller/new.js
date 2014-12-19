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
