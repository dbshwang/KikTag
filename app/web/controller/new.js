App.controller('new', function (page) {
    function callback(str){
      $(page).find('.app-content').append(str);
    }

    function openDialog(el){
              var stars = [
              { id: 'star1', optionClass: 'star', checkClass: 'checked' },
              { id: 'star2', optionClass: 'star', checkClass: 'checked' },
              { id: 'star3', optionClass: 'star', checkClass: 'checked' },
              { id: 'star4', optionClass: 'star', checkClass: 'checked' },
              { id: 'star5', optionClass: 'star', checkClass: 'checked' }
              ];
              var radio = new Radio({ items: stars, id: 'stars'}, function () {
                if (radio.HTML.parentNode) {
                  radio.HTML.parentNode.classList.remove('submit-lock');
                }
              });
              opts = {
                title        : el.find('h3').text(),
                rawHTML      : radio.HTML,
                theme        : 'submit-lock',
                cancelButton : 'Cancel',
                okButton     : 'Rate'
              }


              App.dialog(opts, function(choice) {
                if(choice && radio.selected) {
                  rating = radio.selected.id.slice(-1);
                    zerver.put('API/hashtag', {groupName: opts['title'], rating : rating}, function(str){

                    });
                }
              });

    }

    $(page).on('appReady', function(){
        category = ($(page).data('page'));
        zerver.get('API/hashtag', {category: category} , function(hashtags){
          super_el = $('<div class="groupcontainer"></div>');
          var i =0;
          for(i = 0; i< hashtags.length; i++){
            el = $('<div class="populate_group"><div class="info"></div></div>');
            el.find('.info').append('<h3>' + hashtags[i]['hashtag'] + '</h3>');
            el.find('.info').append('<p>' + hashtags[i]['desc'] + '</p>');
            el.find('.info').append('<div class="rater">Rate the group</div>')

            el.on('click', function(){
              openDialog($(this));
            });
            super_el.append(el);
          }
          callback(super_el);
        });
    });

});
