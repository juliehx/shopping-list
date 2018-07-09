var state = {
	items: []
};

var addItem = function(state, item) {
	state.items.push(item);
};

var removeItem = function(state, index) {
	state.items.splice(index, 1);
};

var updateState = function(state, index, check) {
	state.items[index].checked = check;
};

var renderControls = function() {
	return `<div class="shopping-item-controls">
				<button class="js-shopping-item-toggle">
					<span class="button-label">check</span>
				</button>'
				<button class="js-shopping-item-delete">
					<span class="button-label">delete</span>
				</button>
			</div>`;
};

var checkItems = function(state, element) {
	state.items.forEach(function(item) {
		if(item.checked) {
			element.find(".js-shopping-item:contains('"+item.item+"')").addClass('shopping-item__checked');
		}
	});
}

var renderList = function(state, element) {
	var itemHTML = state.items.map(function(item) {
		return '<li><span class="js-shopping-item">' + item.item + '</span>' +
					renderControls() +
				'</li>';
	});
	element.html(itemHTML);
	checkItems(state, element);
};

$('#js-shopping-list-form').on('submit', function(event) {
	event.preventDefault();
	var item = $('#shopping-list-entry').val();
	addItem(state, {item:item, checked:false});
	renderList(state, $('.shopping-list'));
	$('#shopping-list-entry').val("");
});

$('.shopping-list').on('click', '.js-shopping-item-delete', function(event) {
	var itemIndex = $(this).closest('li').index();
	removeItem(state, itemIndex);
	renderList(state, $('.shopping-list'));
});

$('.shopping-list').on('click', '.js-shopping-item-toggle', function(event) {
	var itemIndex = $(this).closest('li').index();
	updateState(state, itemIndex, true);
	renderList(state, $('.shopping-list'));
});