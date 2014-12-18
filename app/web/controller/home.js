App.controller('home', function (page) {
    page.querySelector('.submit').addEventListener('click', function(){
        App.load('kik_group', 'slideon-down');
    });
});
