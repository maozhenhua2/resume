(function () {
  function setDefFontSize() {
    // 设置文档默认字体大小
    var vw = window.innerWidth / 100;
    var vh = window.innerHeight / 100;
    var vmax = Math.max(vw, vh);
    document.querySelector('html').style.fontSize = 3 * vmax + 'px';
  }

  function setMobileFontSize() {
    if (isMobile().any()) {
      setDefFontSize();
      window.addEventListener('resize', function () {
        setDefFontSize();
      });
    } else {
      document.querySelector('html').style.fontSize = 14 + 'px';
    }
  }

  setMobileFontSize();
}());

function isMobile() {
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
  };
  return isMobile;
}
