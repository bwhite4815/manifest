describe("Gallery", function() {
  var gallery;

  beforeEach(function() {
    gallery = new Gallery();
  });
  it("should be able to add an item", function() {
    gallery.addFavorite('1');
    expect(gallery.getFavorites()).toEqual(['1']);
  });
  it("should be able to clear favorites", function() {
    gallery.addFavorite('1');
    gallery.clearFavorites();
    expect(gallery.getFavorites()).toEqual([]);
  });
  it("should be able to add multiple items", function() {
    gallery.addFavorite('1');
    gallery.addFavorite('2');
    gallery.addFavorite('3');
    gallery.addFavorite('4');
    expect(gallery.getFavorites()).toEqual(['1','2','3','4']);
  });
  it("should be able to set favorites", function() {
    gallery.setFavorites(['1','2','4']);
    expect(gallery.getFavorites()).toEqual(['1','2','4']);
  });
  it("should be able to remove a favorite from beginning", function() {
    gallery.setFavorites(['1','2','4']);
    gallery.removeFavorite('1');
    expect(gallery.getFavorites()).toEqual(['2','4']);
  });
  it("should be able to remove a favorite from middle", function() {
    gallery.setFavorites(['1','2','4']);
    gallery.removeFavorite('2');
    expect(gallery.getFavorites()).toEqual(['1','4']);
  });
  it("should be able to remove a favorite from end", function() {
    gallery.setFavorites(['1','2','4']);
    gallery.removeFavorite('4');
    expect(gallery.getFavorites()).toEqual(['1','2']);
  });
  it("should be able to test if an item is in the favorites (at begin)", function() {
    gallery.setFavorites(['1','2','3','4']);
    expect(gallery.inFavorites('1')).toEqual(true);
  });
  it("should be able to test if an item is in the favorites (at middle)", function() {
    gallery.setFavorites(['1','2','3','4']);
    expect(gallery.inFavorites('3')).toEqual(true);
  });
  it("should be able to test if an item is in the favorites (at end)", function() {
    gallery.setFavorites(['1','2','3','4']);
    expect(gallery.inFavorites('4')).toEqual(true);
  });
  it("should be able to test if an item is in the favorites (not in list)", function() {
    gallery.setFavorites(['1','2','3','4']);
    expect(gallery.inFavorites('8')).toEqual(false);
  });
  it("should be able add an item to favorites and if it already exists to take the end of line", function() {
    gallery.setFavorites(['1','2','3','4']);
    gallery.addFavorite('1');
    expect(gallery.getFavorites()).toEqual(['2','3','4','1']);
    gallery.setFavorites(['1','2','3','4']);
    gallery.addFavorite('2');
    expect(gallery.getFavorites()).toEqual(['1','3','4','2']);
    gallery.setFavorites(['1','2','3','4']);
    gallery.addFavorite('4');
    expect(gallery.getFavorites()).toEqual(['1','2','3','4']);
  });
  it("should be able toggle an item", function() {
    gallery.setFavorites(['1','2','3','4']);
    gallery.toggleFavorite('1');
    expect(gallery.getFavorites()).toEqual(['2','3','4']);
    gallery.setFavorites(['1','2','3','4']);
    gallery.toggleFavorite('2');
    expect(gallery.getFavorites()).toEqual(['1','3','4']);
    gallery.setFavorites(['1','2','3']);
    gallery.toggleFavorite('4');
    expect(gallery.getFavorites()).toEqual(['1','2','3','4']);
  });
  it("should not be able to create a duplicate item in favorites", function() {
    gallery.setFavorites(['1','2','3','4']);
    gallery.addFavorite('1');
    expect(gallery.getFavorites()).toEqual(['2','3','4','1']);
  });

});