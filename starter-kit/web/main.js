(function (App) {
	try {
		App.restore();
	} catch (err) {
		App.load('home');
	}
    
    kik.browser.setOrientationLock('portrait');
})(App);
