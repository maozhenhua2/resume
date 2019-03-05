// 设置子菜单高度用于过渡动画
document.querySelectorAll(".nav-list li div").forEach(function (dom, i) {
  var h = dom.querySelector("ul").offsetHeight;
  dom.setAttribute("data-height", h);
});

// 导航菜单

// var divs = Array.prototype.slice.call(document.querySelectorAll(".nav-list li>div"));
// divs.map(function (dom, i) {
//   if (dom.children[0].children.length > 6) {
//     dom.parentNode.className += ' mult-col';
//   }
// });

document.querySelector(".nav-list").addEventListener("click", function (e) {
  var target = e.target;
  var parent = e.target.parentNode;
  var dom;
  if (target.nodeName.toLowerCase() === "a") {
    dom = target;
  }

  if (parent.nodeName.toLowerCase() === "a") {
    dom = parent;
  }

  if (!dom) {
    return false;
  }

  nava(dom);
});

document.querySelector("body").addEventListener("click", function (e) {
  var target = e.target;
  var parent = isInSel(target.parentNode, "nav-list");
  if (parent.nodeName.toLowerCase() === 'body') {
    var active = document.querySelector('.nav-list>ul>li.active');
    if (active) {
      var className = active.className;
      active.className = className.replace('active', '');
    }
  }
});

function nava(dom) {
  var _thisa = dom;
  // 根元素
  var _this = dom.parentNode;
  var className = _this.className;
  // 子菜单
  var div = dom.parentNode.querySelector("div");

  // 切换子菜单状态class
  if (className.match("active")) {
    _this.className = className.replace("active", "");
  } else {
    _this.className += " active";
  }
  // 设置子菜单高度
  if (div) {
    if (className.match("active")) {
      div.style.height = "0px";
    } else {
      var h = div.getAttribute("data-height");
      div.style.height = h + "px";
    }

  } else {

  }
  // 隐藏同级其他导航子菜单
  var parentNode = _this.parentNode;
  parentNode.childNodes.forEach(function (dom, i) {
    if (dom.nodeType === 1) {
      if (dom.children[0] !== _thisa) {
        dom.className = "";
      }
    }
  });
}

// 移动端切换导航显示隐藏按钮
document.querySelector(".nav-btn").addEventListener("click", function () {
  var classs = document.querySelector("nav").className;
  if (!classs.match("show")) {
    document.querySelector("nav").className += "show in";
    setTimeout(function () {
      var classs = document.querySelector("nav").className;
      document.querySelector("nav").className = classs.replace("in", "");
    }, 1000);
  } else {
    document.querySelector("nav").className = classs.replace("show", "out");
    var events = ["transitionend", "oTransitionEnd", "otransitionend"];
    setTimeout(function () {
      var classs = document.querySelector("nav").className;
      document.querySelector("nav").className = classs.replace("out", "");
    }, 2000);
  }
});
