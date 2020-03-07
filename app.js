// --------------- UI controller --------------------

var UIcontroller = (function(){

	var DOMStrings = {
		inputType: '.input-items',
		itemContainer: '.todo-list',
		container: '.list-container',
	}
		
	return{
		getDomStrings: function() {
			return DOMStrings;
		},

		getInput: function() {
			return {
				description: document.querySelector(DOMStrings.inputType).value,
			};
		},

		// Adding the TODO items into the list
		addListItem: function(desc){
			var element, html, newHtml;

			element = DOMStrings.itemContainer;
			html = '<div class="todo-items clearfix" id="item-0">'+
					'<div class="item-description">%description%</div>'+
					'<div class="item-delete">'+
					'<button class="item-delete--btn"><i class="far fa-times-circle"></i></button>'+
					'</div>'+'</div>';

			newHtml = html.replace('%description%', desc);

			// insert the HTML into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		// Clearing the Input Fields After Entring the elements
		clearFields: function(){
			var fields, fieldArr;

			fields = document.querySelector(DOMStrings.inputType);
			fields.value = ''; // clearing the field
			fields.focus(); // get back to the main field

		},

		// Deleting the Item form the TODO list
		deleteListItem: function(selectorID){
			var items = document.getElementById(selectorID);
			items.parentNode.removeChild(items);
		}
	}

})();


// --------------- APP Controller --------------------

var appController = (function(UICtrl) {

	var setUpEventListener = function(){
		var DOM = UICtrl.getDomStrings();

		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.which === 13){
				addItem();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', deleteItem);
	};


	var addItem = function() {		

		// get the input field value
		var inputText = UICtrl.getInput();
		if(inputText !== '' && inputText.description.length > 0){
			
			// 1. add items to the UI
			UICtrl.addListItem(inputText.description);

			// 2. clear the fields
			UICtrl.clearFields();			 
		}
	};

	var deleteItem = function(event) {
		var itemId, splitID, ID;

		itemId = event.target.parentNode.parentNode.parentNode.id;
		if(itemId){
			UICtrl.deleteListItem(itemId);
		};
	}

	return {
		init: function() {
			console.log('Application has started!');
			setUpEventListener();
		}
	}
})(UIcontroller);
appController.init();