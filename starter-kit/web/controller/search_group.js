App.controller('search_group', function (page) {

    page.querySelector('.submit').addEventListener('click', function(){
        App.load('kik_group', 'slideon-down');
    });

    function callback(str){
      // console.log(str);
      $('.supercontainer').append(str);
    }

    $(page).on('appShow', function(){
      zerver.get('API/view', function(hashtags){
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

    page.querySelector('.list').addEventListener('click', function(){
        $("#scrollbar").toggle();
    });
});
