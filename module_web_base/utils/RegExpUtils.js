class RegExpUtils {
  //验证url
  isUrl(str) {
    return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
      str,
    );
  }

  /*
文件夹名称校验

禁止非法字符
*/
  static isFolderName(name) {
    // 基本长度检查
    if (typeof name !== "string" || name.length === 0 || name.length > 255) {
      return false;
    }

    // 去除首尾空格后检查是否相等
    if (name.trim() !== name) {
      return false;
    }

    // 检查非法字符
    const illegalChars = /[<>:"/\\|?*\x00-\x1F]/;
    if (illegalChars.test(name)) {
      return false;
    }

    // 检查Windows保留名称
    const windowsReserved = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
    if (windowsReserved.test(name)) {
      return false;
    }

    // 检查以点开头
    if (/^\./.test(name)) {
      return false;
    }

    // 检查以空格结尾
    if (/\s$/.test(name)) {
      return false;
    }

    // 检查是否包含路径分隔符
    if (name.includes("/") || name.includes("\\")) {
      return false;
    }

    return true;
  }
}

export default RegExpUtils;
