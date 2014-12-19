App._Dialog = function (window, document, Clickable, App, Utils, OldDialog, kik) {
	var DIALOG_INDICATOR_CLASS = 'app-dialog-visible';

	var onReady = [],
		currentCallback,
		dialogQueue;

	kik.ready(function () {
		if (App.platform !== 'android' || App.platformVersion >= 4) {
			flushDialogQueue();
		} else {
			setTimeout(flushDialogQueue, 500);
		}
	});

	App.dialog = function (options, callback) {
		if ((typeof options !== 'object') || (options === null)) {
			throw TypeError('dialog options must be an object, got ' + options);
		}

		// backwards compat: you can use a boolean for the built-in dark theme.
		switch (typeof options.dark) {
			case 'undefined':
			case 'boolean':
				break;
			default:
				throw TypeError('dialog dark mode must a boolean if defined, got ' + options.dark);
		}
		if (options.dark) {
			options.theme = "dark";
		}

		switch (typeof options.text) {
			case 'undefined':
			case 'string':
				break;
			default:
				if ( !Utils.isNode(options.text) ) {
					throw TypeError('dialog text must be a string if defined, got ' + options.text);
				}
		}

		for (var key in options) {
			if (key === "theme" || key === "title" || key.substr(key.length-6) === 'Button') {
				switch (typeof options[key]) {
					case 'undefined':
					case 'string':
						break;
					default:
						throw TypeError('dialog option "'+key+'" must be a string if defined, got ' + options[key]);
				}
			}
		}

		switch (typeof callback) {
			case 'undefined':
				callback = function () {};
			case 'function':
				break;
			default:
				throw TypeError('callback must be a function if defined, got ' + callback);
		}

		return showDialog(options, callback);
	};

	App.dialog.close = function (status) {
		return closeDialog(status || false);
	};
	OldDialog.close = App.dialog.close;

	App.dialog.status = function () {
		return hasDialog();
	};
	OldDialog.status = App.dialog.status;

	return App.dialog;

	function dialogReady(func) {
		if ( !onReady ) {
			func();
		} else {
			onReady.push(func);
		}
	}
	function flushDialogQueue() {
		if (onReady) {
			var funcs = onReady.slice();
			onReady = null;
			funcs.forEach(function (func) {
				func();
			});
		}
	}

	function createDialog (options, callback) {
		var dialogContainer = document.createElement('div');
		dialogContainer.className += ' app-dialog-container';
		if (Utils.os.ios && (Utils.os.version <= 5)) {
			dialogContainer.className += ' ios5';
		}
		if (!Utils.os.android || (Utils.os.version >= 4)) {
			dialogContainer.addEventListener('touchstart', function (e) {
				if (e.target === dialogContainer) {
					e.preventDefault();
				}
			}, false);
		}

		if (options.cancelButton) {
			dialogContainer.addEventListener('touchstart', function (e) {
				if (e.target === dialogContainer) {
					closeDialog();
				}
			}, false);
		}

		var dialog = document.createElement('div');
		dialog.className = 'app-dialog';
		if (options.theme) {
			dialog.className += ' ' + options.theme;
		}
		dialogContainer.appendChild(dialog);

		if (options.title) {
			var title = document.createElement('div');
			title.className = 'title';
			title.textContent = options.title;
			dialog.appendChild(title);
		}

		if (options.text || options.rawText) {
			var text = document.createElement('div');
			text.className = 'text';
			if ( Utils.isNode(options.text) ) {
				text.appendChild(options.text);
			}
			else if (options.rawText) {
				text.innerHTML = options.rawText;
			}
			else {
				text.textContent = options.text;
			}
			dialog.appendChild(text);
		}

		if (options.rawHTML) {
			dialog.appendChild(options.rawHTML);
		}

		for (var key in options) {
			if (options[key] && (key.substr(key.length-6) === 'Button') && (key !== 'okButton') && (key !== 'cancelButton')) {
				var buttonName = key.substr(0, key.length-6),
					button     = document.createElement('div');
				button.className = 'button';
				button.setAttribute('data-button', buttonName);
				button.textContent = options[key];
				Clickable(button);
				button.addEventListener('click', handleChoice, false);
				dialog.appendChild(button);
			}
		}

		if (options.cancelButton) {
			var button = document.createElement('div');
			button.className = 'button close first';
			if ( !options.okButton )
            button.className += ' first';
			button.setAttribute('data-button', 'close');
			button.textContent = options.cancelButton;
			Clickable(button);
			button.addEventListener('click', handleChoice, false);
			dialog.appendChild(button);
		}

		if (options.okButton) {
			var button = document.createElement('div');
			button.className = 'button ok last';
			if ( !options.cancelButton )
            button.className += '';
			button.setAttribute('data-button', 'ok');
			button.textContent = options.okButton;
			Clickable(button);
			button.addEventListener('click', handleChoice, false);
			dialog.appendChild(button);
		}

		function handleChoice () {
			var buttonName = this.getAttribute('data-button');
			if (buttonName === 'close') {
				buttonName = false;
			}
			callback(buttonName);
		}

		return dialogContainer;
	}

	function showDialog (options, callback, force) {
		if (dialogQueue && !force) {
			dialogQueue.push([ options, callback ]);
			return;
		}
		dialogQueue = dialogQueue || [];

		var dialogLock  = false,
			dialog      = createDialog(options, dialogClosed),
			innerDialog = dialog.firstChild;
		currentCallback = dialogClosed;

		dialogReady(function () {
			document.body.appendChild(dialog);
			setTimeout(function () {
				dialog.className += ' enabled';
				document.body.className += ' ' + DIALOG_INDICATOR_CLASS;
			}, 50);
		});

		function dialogClosed (status) {
			if (status && dialog.querySelector('.submit-lock')) {
				return;
			}

			if (dialogLock) {
				return;
			}
			dialogLock = true;

			currentCallback = null;

			dialog.className = dialog.className.replace(/\benabled\b/g, '')+' closing';
			if (status) {
				dialog.className += ' closing-success';
			} else {
				dialog.className += ' closing-fail';
			}
			document.body.className = document.body.className.replace(new RegExp('\\b'+DIALOG_INDICATOR_CLASS+'\\b', 'g'), '');

			setTimeout(function () {
				processDialogQueue();
				callback(status);
			}, 0);

			setTimeout(function () {
				try {
					dialog.parentNode.removeChild(dialog);
				} catch (err) {}
			}, 600);

			return true;
		}
	}

	function closeDialog (status) {
		if (currentCallback) {
			return currentCallback(status || false);
		}
	}

	function hasDialog () {
		return !!currentCallback;
	}

	function processDialogQueue () {
		if ( !dialogQueue ) {
			return;
		}

		if ( !dialogQueue.length ) {
			dialogQueue = null;
			return;
		}

		var args = dialogQueue.shift();
		args.push(true);
		showDialog.apply(window, args);
	}
}(window, document, Clickable, App, App._Utils, App._Dialog, kik);