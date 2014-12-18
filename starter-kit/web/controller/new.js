App.controller('new', function (page) {
    
    function callback(str){
      // console.log(str);
      $('.supercontainer').append(str);
    }

    $(page).on('appReady', function(){
      zerver.get('API/view', function(hashtags){
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
});