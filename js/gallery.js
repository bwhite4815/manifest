var nameOfGallery = "";
var favorites = [];
function Gallery(name) {
	nameOfGallery = name;
	if(nameOfGallery != null && localStorage.getItem(nameOfGallery) != null) {
		this.setFavorites(JSON.parse(localStorage.getItem(nameOfGallery)));
	}
}
Gallery.prototype.getFavorites = function() {
	console.log('get favorites: '+favorites);
	return favorites;
};
Gallery.prototype.setFavorites = function(fav) {
	favorites = fav;
	console.log('set favorites: '+favorites);
};
Gallery.prototype.clearFavorites = function() {
	favorites = [];
	console.log('clear favorites: '+favorites);
};
Gallery.prototype.saveFavorites = function() {
	if(nameOfGallery != null) {
		localStorage.setItem(nameOfGallery, JSON.stringify(favorites));
	}
	console.log('save favorites: '+favorites);
};
Gallery.prototype.addFavorite = function(item) {
	console.log('add favorite: '+favorites);
	if(this.inFavorites(item)) { 
		this.removeFavorite(item);
	}	
	favorites.push(item);
	console.log('add favorite: '+favorites);
};
Gallery.prototype.removeFavorite = function(item) {
	favorites = $.grep(favorites, function(value) { return value != item; });
	console.log('remove ' + item + ' from favorite: ' + favorites);
};
Gallery.prototype.toggleFavorite = function(item) {
	console.log('toggle favorite: '+favorites);
	if(this.inFavorites(item)) {
		this.removeFavorite(item);
	} else {
		this.addFavorite(item);
	}
};
Gallery.prototype.inFavorites = function(item) {
	console.log('is ' + item + ' in favorites: ' + favorites + "?");
	if($.inArray(item, favorites) >= 0) {
		console.log('yep');
		return true;
	} else {
		console.log('nope');
		return false;
	}
};