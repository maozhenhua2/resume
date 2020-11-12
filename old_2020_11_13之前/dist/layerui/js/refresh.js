var data = [{
  "url": "imgs/pic.png",
  "title": "捷豹路虎经销商",
  "complete": true,
  "progress": 10,
  "time": "2018-1-10"
}, {
  "url": "imgs/pic.png",
  "title": "捷豹路虎经销商",
  "complete": false,
  "progress": 10,
  "time": "2018-1-10"
}, {
  "url": "imgs/pic.png",
  "title": "捷豹路虎经销商",
  "complete": false,
  "progress": 10,
  "time": "2018-1-10"
}, {
  "url": "imgs/pic.png",
  "title": "捷豹路虎经销商",
  "complete": false,
  "progress": 10,
  "time": "2018-1-10"
}, {
  "url": "imgs/pic.png",
  "title": "捷豹路虎经销商",
  "complete": false,
  "progress": 10,
  "time": "2018-1-10"
}, {
  "url": "imgs/pic.png",
  "title": "捷豹路虎经销商",
  "complete": false,
  "progress": 10,
  "time": "2018-1-10"
}];

var i = 0;
var swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  mousewheel: true,
  on: {
    // touchMove: function (event) {
    //   if (swiper.translate > 0 && $('.update').length === 0) {
    //     $('.swiper-wrapper').prepend(update);
    //     console.log('update');
    //   }
    // },
    touchEnd: function (event) {
      var y = $('.swiper-container').height() - $('.swiper-wrapper')[0].scrollHeight - 70;
      // console.log(swiper.translate, y);
      if (swiper.translate < y) {
        setTimeout(function () {
          var index = $('.swiper-slide').length;
          data.push({
            "url": "imgs/pic.png",
            "title": "捷豹路虎经销商",
            "complete": false,
            "progress": i++,
            "time": new Date().toLocaleString().split(' ')[0]
          });
          render(getHtml(data));
          console.log('end');
        }, 500);
      }
      if (swiper.translate >= 0) {
        setTimeout(function () {
          console.log('update');
          data.length = 4;
          render(getHtml(data));
        }, 500);
      }

    }
  }
});

function template(obj) {
  var className = 'complete';
  if (!obj.complete) {
    className = ''
  }
  var html = '<li>';
  html += '<div class="' + className + '" data-progress="' + obj.progress + '%">';
  html += '<div class="img" style="background-image: url(' + obj.url + ');"></div>';
  html += '<div class="text">';
  html += '<p>' + obj.title + '</p>';
  html += '<div class="time">';
  html += '<span>发布时间：' + obj.time + '</span>';
  html += '<i class="icon icon-star"></i>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</li>';
  return html;
}

function getHtml(data) {
  var html = '<div class="swiper-slide"><ul>';
  data.map(function (dom, i) {
    html += template(dom);
  });
  html += '</ul></div>';
  return html;
}

function render(html) {
  $('.swiper-wrapper').html(html);
  swiper.update();
}

function onlyOne(sel, className) {
  $(sel).on('click', function () {
    $(this).addClass(className).siblings().removeClass(className);
  });
}
