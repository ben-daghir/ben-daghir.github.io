var image_r = document.getElementById('image-r');
var image_g = document.getElementById('image-g');
var image_b = document.getElementById('image-b');
var image_k = document.getElementById('image-k');
var image_labels = document.getElementById('image-labels');
var image_fids = document.getElementById('image-fids');
var floating_label = document.getElementById('floating-label');

var translateRGBK = function(scrollPercent) {
    var max_r = -525;
    var max_g = -175;
    var max_b = 175;
    var max_k = 525;

    image_r.style.transform = 'translate(' + max_r * scrollPercent + 'px, 0)';
    image_g.style.transform = 'translate(' + max_g * scrollPercent + 'px, 0)';
    image_b.style.transform = 'translate(' + max_b * scrollPercent + 'px, 0)';
    image_k.style.transform = 'translate(' + max_k * scrollPercent + 'px, 0)';
}

var translateDiagrams = function(scrollPercent) {
    var max = 400;
    image_labels.style.transform = 'translate(' + (-max * scrollPercent) + 'px, 0)';
    image_fids.style.transform = 'translate(' + max * scrollPercent + 'px, 0)';
}

var textFade = function(scrollPercent, c) {
    var captions = document.getElementsByClassName(c);
    for (var i = 0; i < captions.length; i++) {
        captions[i].style.opacity = scrollPercent;
    }
}

var fadeDiagrams = function(scrollPercent) {
    image_labels.style.opacity = scrollPercent
    image_fids.style.opacity = scrollPercent
}

var pauseScroll = function(pause) {
    if (pause) {
//        scrollContainer.style.overflowY = 'hidden'
//        document.body.style.overflowY = 'hidden'
//        setTimeout(() => {
//            scrollContainer.style.overflowY = 'scroll';
//            document.body.style.overflowY = 'scroll'
//        }, 1000)

    }
    return false
}


var scrollContainer = document.getElementById('scroll-container');
updateScroll = function(){
    console.log(scrollContainer.scrollTop)
    var scrollTop = scrollContainer.scrollTop

    if (500 > scrollTop && scrollTop >= 0) {
        floating_label.style.opacity = 0;
        translateRGBK(scrollTop / 500);
        textFade(0, 'image-caption');
        pause1 = true;

    } else if (750 > scrollTop && scrollTop >= 500) {
        floating_label.style.opacity = 0;
        textFade(1, 'image-caption');
        pause1 = pauseScroll(pause1);

    } else if (1400 > scrollTop && scrollTop >= 900) {
        translateRGBK(1 - ((scrollTop - 900) / (1400 - 900)));
        textFade(0, 'image-caption');
        textFade(0, 'diagram-caption');
        fadeDiagrams(0);
        pause2 = true;

    } else if (1650 > scrollTop && scrollTop >= 1400) {
        translateRGBK(0);
        textFade(1, 'diagram-caption');
        fadeDiagrams(1);
        pause2 = pauseScroll(pause2);
        translateDiagrams(0);

    } else if (2300 > scrollTop && scrollTop >= 1800) {
        textFade(0, 'diagram-caption');
        translateDiagrams((scrollTop - 1800) / (2300 - 1800));

    } else if (2800 > scrollTop && scrollTop >= 2300) {
        translateDiagrams(1);

    }

    if (25 >= scrollTop) {floating_label.style.opacity = 1;}

}

console.log('adding event listeners...')
scrollContainer.addEventListener("scroll", updateScroll);

