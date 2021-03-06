App.controller('discover', function (page) {
    page.querySelector('.submit').addEventListener('click', function(){
        App.load('submitgroup', 'slideon-down');
    });

    function callback(str){
      // console.log(str);
      $('.supercontainer').append(str);
    }

    $(page).on('appShow', function(){

      zerver.get('API/hashtag', function(hashtags){
        super_el = $('<div class="groupcontainer"></div>');
        for(var i = 0; i< hashtags.length; i++){
          el = $('<div class="populate_group"><div class="info"></div></div>');
          el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
          el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
          super_el.append(el);
        }
        callback(super_el);
      });
    });
});
