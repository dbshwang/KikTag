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



  page.querySelector(".populate_group").addEventListener('click' , function(event) {
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

    App.dialog({
        title        : 'Rate this group',
        rawHTML      : radio.HTML,
        theme        : 'submit-lock',
        okButton     : 'Rate',
        cancelButton : 'Cancel'
        }, function(status) {
        if (status && radio.selected) {
            console.log(radio.selected.id);
            console.log('do your stuff');
        } else {

        }
    });
  });

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