var Radio = function (document) {
	function Radio(options, callback) {
		this.HTML = document.createElement('div');
		this.HTML.className = 'radio';

		if (options.center)
			this.HTML.style.textAlign = 'center';
		if (options.id)
			this.HTML.id = options.id;

		for (var i = 0; i < options.items.length; ++i) {
			var option = document.createElement('div');
			option.key = i;
			option.className = options.items[i].optionClass || 'option';

			if (options.items[i].id){
				option.id = options.items[i].id;
			}

			check = document.createElement('div');
			check.className = options.items[i].checkClass || 'option-check';
			option.appendChild(check);

			if (options.items[i].text) {
				text = document.createElement('div');
				text.className = options.items[i].textClass || 'option-text';
				text.textContent = options.items[i].text;
				option.appendChild(text);
			}

			Clickable(option);
			option.addEventListener('click', select.bind(this, option, options.items, i, callback), false);
			this.HTML.appendChild(option);
		}
	};

	Radio.prototype = {
		HTML: null,
		selected: null,
		selectedOption: {}
	};

	function select(option, items, index, callback) {
		if (option.key === this.selectedOption.key) {
			return;
		}

		for (var i = 0; i <= 4; ++i){
			document.querySelector('#star' + (i + 1)).classList.remove('selected');
		}

		for (var i = 0; i <= index; ++i){
			document.querySelector('#star' + (i + 1)).classList.add('selected');
		}

		this.selectedOption = option;
		this.selected = items[index];

		callback && callback(items[index]);
	}

	return Radio;
}(document);
