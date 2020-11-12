// 获取光标位置
(function($, undefined) {
	$.fn.getCursorPosition = function() {
		var el = $(this).get(0);
		var pos = 0;
		if ('selectionStart' in el) {
			pos = el.selectionStart;
		} else if ('selection' in document) {
			el.focus();
			var Sel = document.selection.createRange();
			var SelLength = document.selection.createRange().text.length;
			Sel.moveStart('character', -el.value.length);
			pos = Sel.text.length - SelLength;
		}
		return pos;
	}
})(jQuery);
// 单条数据模板
var ddtemplate = function(obj) {
	var imgclass = '';
	var imghtml = '';
	var ddtitle = '';
	if (obj.img) {
		imgclass = ' has-img';
		imghtml = '<span class="img"><img src="' + obj.img + '" alt=""></span>'
	}
	if (obj.lastadd) {
		ddtitle = '<h1 class="dd-title"><span>添加新内容</span><span>新添加的内容将在原主楼后显示</span></h1>';
	}
	return '' +
		'<dd>' +
		'  ' + ddtitle +
		'  <div class="list-content' + imgclass + '">' +
		'    ' + imghtml +
		'    <textarea placeholder="正文不少于4个字" maxlength="500">' + obj.value + '</textarea>' +
		'    <a class="remove-part" href="#"><i class="icon-close"></i></a>' +
		'  </div>' +
		'  <div class="list-panel">' +
		'    <p>' +
		'      <a>移至顶部</a>' +
		'      <a>上移</a>' +
		'      <a>下移</a>' +
		'    </p>' +
		'    <a class="sort"><i class="icon-sort"></i></a>' +
		'  </div>' +
		'  <a class="face"><i class="icon-face"></i></a>' +
		'</dd>';
};

$('#wrapper, #main').css({
	height: window.screen.availHeight + 'px'
});

// 表情文字
var faceArr = [
	"[\u5fae\u7b11]", "[\u6487\u5634]", "[\u8272]", "[\u53d1\u5446]", "[\u5f97\u610f]", "[\u6d41\u6cea]",
	"[\u5bb3\u7f9e]", "[\u95ed\u5634]", "[\u7761]", "[\u5927\u54ed]", "[\u5c34\u5c2c]", "[\u53d1\u6012]",
	"[\u8c03\u76ae]", "[\u563b\u563b]", "[\u60ca\u8bb6]", "[\u96be\u8fc7]", "[\u9177]", "[\u51b7\u6c57]",
	"[\u6293\u72c2]", "[\u5410]", "[\u5077\u7b11]", "[\u53ef\u7231]", "[\u767d\u773c]", "[\u50b2\u6162]",
	"[\u9965\u997f]", "[\u56f0]", "[\u60ca\u6050]", "[\u6c57]", "[\u61a8\u7b11]", "[\u5927\u5175]", "[\u594b\u6597]",
	"[\u5492\u9a82]", "[\u7591\u95ee]", "[\u5618]", "[\u6655]", "[\u6298\u78e8]", "[\u8870]", "[\u9ab7\u9ac5]",
	"[\u6572\u6253]", "[\u518d\u89c1]", "[\u64e6\u6c57]", "[\u6316\u9f3b]", "[\u9f13\u638c]", "[\u7cd7\u5927\u4e86]",
	"[\u574f\u7b11]", "[\u5de6\u54fc\u54fc]", "[\u53f3\u54fc\u54fc]", "[\u54c8\u6b20]", "[\u9119\u89c6]",
	"[\u59d4\u5c48]", "[\u5feb\u54ed\u4e86]", "[\u9634\u9669]", "[\u4eb2\u4eb2]", "[\u5413]", "[\u53ef\u601c]",
	"[\u83dc\u5200]", "[\u897f\u74dc]", "[\u5564\u9152]", "[\u7bee\u7403]", "[\u4e52\u4e53]", "[\u5496\u5561]",
	"[\u996d]", "[\u732a\u5934]", "[\u73ab\u7470]", "[\u51cb\u96f6]", "[\u793a\u7231]", "[\u7231\u5fc3]",
	"[\u5fc3\u788e]", "[\u86cb\u7cd5]", "[\u95ea\u7535]", "[\u70b8\u5f39]", "[\u5200]", "[\u8db3\u7403]",
	"[\u74e2\u866b]", "[\u4fbf\u4fbf]", "[\u6708\u4eae]", "[\u592a\u9633]", "[\u793c\u7269]", "[\u62e5\u62b1]",
	"[\u5f3a]", "[\u5f31]", "[\u63e1\u624b]", "[\u80dc\u5229]", "[\u62b1\u62f3]", "[\u52fe\u5f15]", "[\u62f3\u5934]",
	"[\u5dee\u52b2]", "[\u7231\u4f60]", "[NO]", "[OK]"
];
var i = 0;
var l = faceArr.length;
var pagesize = 24;
var pagebox = $('.face-box .swiper-wrapper');
var pageIndex = 0;
var html = '';
for (; i < l; i++) {
	var h = '<button title="' + faceArr[i] + '"><i class="icon-faces" style="background-position: ' + (i * -24) + 'px 0"></i></button>';

	if (i % pagesize === 0) {
		pageIndex = 0;
		html += '<div class="swiper-slide">';
		html += h;
	} else {
		pageIndex++;
		html += h;
		if (pageIndex >= (pagesize - 1)) {
			html += '</div>';
		}
	}
}
pagebox.html(html);

var swiper = new Swiper('.swiper-container', {
	pagination: {
		el: '.swiper-pagination'
	},
	observer: true,
	observeParents: true,
});

// 显示排序面板
$('#list').on('click', '.sort', function() {
	var p = $(this).prev();
	p.toggleClass('show');
});

$('#list').on('focus', 'textarea', function() {
	var dd = $(this).parentsUntil('dd').parent('dd');
	dd.click();
	$('#faceBox').removeClass('show');
	// $('.add-list').addClass('hide');
	dd.children('.face').removeClass('show-faceBox');

	var container = $('#main');
	container.scrollTop(dd.offset().top - container.offset().top + container.scrollTop() - $('#header').outerHeight(true));
});

$('#list').on('blur', 'textarea', function() {
	var textarea = $(this);
	var pos = textarea.getCursorPosition();
	textarea.attr('data-pos', pos);
	$('.add-list').removeClass('hide');
});

$('#list').on('click', '.face', function() {
	var _this = $(this);
	// _this.addClass('show');
	_this.toggleClass('show-faceBox');
	_this.parent('dd').addClass('focus');
	if (_this.hasClass('show-faceBox')) {
		$('#faceBox').addClass('show');
	} else {
		$('#faceBox').removeClass('show');
	}
});

$('#list').on('click', 'dd', function() {
	var _this = $(this);
	var focus = _this.hasClass('focus');
	if (!focus) {
		_this.addClass('focus');
	}
	// _this.find('.face').addClass('show');
	_this.siblings('dd').removeClass('focus').find('.face').removeClass('show-faceBox');
});

$('#list').on('click', '.remove-part', function() {
	var dd = $(this).parentsUntil('dd').parent('dd');
	layer.open({
		className: 'layout-text-left',
		content: '删除后内容不能恢复，是否确定删除？',
		btn: ['确定', '取消'],
		yes: function(index) {
			dd.remove();
			layer.close(index);
		}
	});
});

$('#faceBox').on('click', '.swiper-slide button', function() {
	var _this = $(this);
	var txt = _this.attr('title');
	var textarea = $('dd.focus textarea');
	var pos = textarea.attr('data-pos') - 0 || textarea.getCursorPosition();
	var arr = textarea.val().split('');
	arr.splice(pos, 0, txt);
	textarea.val(arr.join(''));
	textarea.attr('data-pos', pos + txt.length);
	return false;
});

$('#addimg').on('click', function() {
	$('#imgfile').click();
});

$('#add-dd').on('click', function() {
	var obj = {
		img: '',
		value: '',
		lastadd: false
	};
	var html = ddtemplate(obj);

	$('#list').append(html);

	autosize($('#list dd:last-child textarea'));

});

$('#imgfile').on('change', function() {
	var imgdom = '';

	var files = $(this)[0].files;
	var i = 0;
	var l = files.length;
	for (; i < l; i++) {
		imgdom = document.createElement('span');
		imgdom.className = 'img';
		var img = document.createElement('img');
		imgdom.appendChild(img);
		img.src = window.URL.createObjectURL(files[i]);
		img.onload = function() {
			window.URL.revokeObjectURL(this.src);
		};
	}

	var dd = $('#list dd.focus');

	if (!dd.length) {
		dd = $('#list dd:last-child');
		dd.click();
	}

	if (dd.children('.list-content').hasClass('has-img')) {
		dd.children('.list-content').children('.img').remove();
		dd.children('.list-content').prepend(imgdom);
	} else {
		dd.children('.list-content').addClass('has-img').prepend(imgdom);
	}
	// console.log(files)
});

$(document).on('click', function(e) {
	var tag = $(e.target);
	if (!(
			tag[0].nodeName.toLowerCase() === 'textarea' ||
			tag.hasClass('face') ||
			tag.hasClass('icon-face') ||
			tag.children('.icon-faces').length ||
			tag.hasClass('icon-faces')
		)) {
		$('.face').removeClass('show-faceBox');
		$('#faceBox').removeClass('show');
	}

});

// 排序
$('#list').on('click', '.list-panel p a', function() {
	var _this = $(this);
	var dd = _this.parentsUntil('dd').parent('dd');
	var dl = dd.parent();
	var ddIndex = dd.index() - 1;
	var index = _this.index();

	// 第一个禁止上移和移至顶部
	if (ddIndex === 0 && (index === 0 || index === 1)) {
		return false;
	}
	// 最后一个禁止下移
	if (ddIndex === dl.children('dd').length - 1 && index === 2) {
		return false;
	}
	// console.log(ddIndex, dl.children('dd').length - 1);

	// 最后一个添加
	// if (ddIndex === dl.children('dd').length - 1 && (index === 0 || index === 1)) {
	//   var obj = {
	//     img: dd.find('img').attr('src'),
	//     value: dd.find('textarea').val(),
	//     lastadd: false
	//   };
	//   var html = ddtemplate(obj);
	//   dd.before(html);
	//
	//   dd.children('.list-content').removeClass('has-img');
	//   dd.find('.img').remove();
	//   dd.find('textarea').val('');
	//
	//   return false;
	// }

	var first = dl.find('dd').eq(0);
	var prev = dd.prev('dd');
	var next = dd.next('dd');

	switch (index) {
		// 到顶部
		case 0:
			first.before(dd);
			break;
			// 上移
		case 1:
			prev.before(dd);
			break;
			// 下移
		case 2:
			next.after(dd);
			break;
	}
});

// 点击显示大图
$('#list').on('click', '.img', function() {
	var img = $(this).children('img').clone();
	$('#zoomImg').html(img).addClass('show');
});

$('#zoomImg').on('click', function() {
	$(this).html('').removeClass('show');
});

// 绑数据
(function() {
	var i = 0;
	var l = 10;
	var html = '';
	for (; i < l; i++) {
		var obj = {
			img: '',
			value: '数据行' + (i + 1),
			lastadd: false
		};

		if (i === 0) {
			obj.img = 'images/smiling.svg';
		}

		if (i === l - 1) {
			obj.lastadd = true;
			obj.value = '';
		}
		html += ddtemplate(obj);
	}
	$('#list').append(html);
	autosize($('textarea'));
}());