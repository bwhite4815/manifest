var gall = new Gallery('thing-1');

// Document ready
$(function() {
    // gall.clearFavorites();
    // gall.removeFavorite('1');

    /* Favorite button */
    var favBtn = $('#favorite-btn');
    var favBtnTime = Hammer(favBtn).on("tap", function(event) {
        var val = $('#thumb-scroller-wrapper a.active img').attr('id').split('-').pop();
        console.log(event.target);
        gall.toggleFavorite(val - 1);
        gall.saveFavorites();
        $('#favorite-btn').toggleClass('favorited');
    });
    favBtn.click(function(){ return false; });

    /* Fullscreen button */
    var fullscreenBtn = $('#fullscreen-btn');
    // if this feature isn't supported, then hide
    console.log('Screenfull Supported/allowed: ' + !!screenfull.enabled);
    if(!screenfull.enabled) { fullscreenBtn.hide(); }
    // on tap, fullscreen the image
    var fullscreenBtnTime = Hammer(fullscreenBtn).on("tap", function(event) {
        var val = $('#thumb-scroller-wrapper a.active img').attr('id').split('-').pop() - 1;
        // TODO: fullscreen carousel at this index.
        console.log('fullscreen item ' + val + ': ' + $('.thelist li:eq('+val+') img')[0].src);
        screenfull.request($('.thelist li:eq('+val+') img')[0]);
    });
    fullscreenBtn.click(function(){ return false; });

	/* Resizing the carousel. The carousel width needs a specific width for the CSS transitions. */
    methodToFixCarousel();
    $(window).bind("resize", methodToFixCarousel);

    function methodToFixCarousel(e) 
    {
    	/* main scroller */
    	var w = $('#scroller-wrapper').width();
    	var n = $("#scroller-wrapper .thelist li").size();
    	var k = w * n;
    	console.log('Resize main scroller to ' + k);
    	console.log('Resize main scroller items to ' + w);
    	$('#scroller').css('width', k);
	    $('#scroller-wrapper li').css('width', w);

	    /* nav scroller */
    	var widthThumb = 150; // each thumb is being generated as 150px, so this is the width in the calculation.
    	var tn = $("#thumb-scroller-wrapper .thelist li").size();
        console.log('elements in nav carousel '+tn);
	    var tk = tn * widthThumb;
	    console.log('Resize nav scroller to ' + tk);
    	console.log('Nav scroller thumbs are ' + widthThumb);
    	$('#thumb-scroller').css('width', tk);
	    $('#thumb-scroller-wrapper li').css('width', widthThumb);
	}

});



$(window).load(function() {
    var myScroll;
    var myNavScroll;

    loaded();
    function loaded() {
        myScroll = new iScroll('scroller-wrapper', {
            snap: true,
            momentum: false,
            hScrollbar: false,
            onScrollEnd: function () {
                console.log("current page: " + this.currPageX);
                $('#thumb-scroller-wrapper a.active').removeClass('active');
                var t = Math.floor(this.currPageX) + 1;
                $('#thumb-scroller-wrapper li:nth-child(' + t + ') a').addClass('active');
                changeFavoriteCheck(t - 1);
            }
        });
        myNavScroll = new iScroll('thumb-scroller-wrapper', {
            snap: true,
            momentum: false,
            hScrollbar: false,
            onScrollEnd: function () {
                console.log("current page: " + this.currPageX);
            }
        });
    }
    changeFavoriteCheck(0);
    function changeFavoriteCheck(num) {
        if(gall.inFavorites(num)) {
            $('#favorite-btn').addClass('favorited');
        } else {
            $('#favorite-btn').removeClass('favorited');
        }
    }
    /* Navigation Carousel */
    var element = $('#thumb-scroller-wrapper a');
    var hammertime = Hammer(element).on("tap", function(event) {
        var val = event.target.id.split('-').pop();
        myScroll.scrollToPage((val-1), 0, 200);
        $('#thumb-scroller-wrapper a.active').removeClass('active');
        var t = Math.floor(val);
        $('#thumb-scroller-wrapper li:nth-child(' + t + ') a').addClass('active');
    });
    element.click(function(){ return false; });
});