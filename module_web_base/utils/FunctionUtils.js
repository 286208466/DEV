class FunctionUtils {
  //设置cookie
  setCookie(key, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
  }

  //获取cookie
  getCookie(key) {
    let nameEQ = key + "=";
    let ca = document.cookie.split(";");
    for (let i = 0, max = ca.length; i < max; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  //iframe下载文件
  download(filepath) {
    let iframe = document.getElementById("downloadframe");
    if (iframe) {
      iframe.src = filepath;
    } else {
      iframe = document.createElement("iframe");
      iframe.src = filepath;
      iframe.style.display = "none";
      iframe.id = "downloadframe";
      document.body.appendChild(iframe);
    }
  }
}

export default FunctionUtils;
