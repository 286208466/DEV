class FileUtils {
  /*
// 使用示例
loadScript('https://example.com/script.js')
  .then(() => {
    console.log('脚本加载成功');
    // 使用加载的脚本
  })
  .catch(err => {
    console.error('加载出错:', err);
  });
*/
  static loadScript(url, options = {}) {
    // 检查是否已加载
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      return Promise.resolve(existingScript);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;

      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`脚本加载失败: ${url}`));

      document.head.appendChild(script);
    });
  }

  // 并行加载多个脚本
  /*
// 使用示例
loadScripts([
  'https://example.com/script1.js',
  'https://example.com/script2.js'
]).then(() => {
  console.log('所有脚本加载完成');
}).catch(err => {
  console.error('加载出错:', err);
});
*/
  static loadScripts(urls) {
    return Promise.all(urls.map((url) => loadScript(url)));
  }

  /*
文件大小格式化函数
// 基本使用
console.log(formatImageSize(500));         // "500 Bytes"
console.log(formatImageSize(1024));       // "1 KB"
console.log(formatImageSize(1048576));     // "1 MB"
console.log(formatImageSize(123456789));  // "117.74 MB"
*/
  static formatImageSize(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
    );
  }

  /*
文件大小格式化函数
带千位分隔符的版本
// 使用示例
console.log(formatImageSizeWithSeparator(123456789)); // "117.74 MB"
console.log(formatImageSizeWithSeparator(1234567890)); // "1.15 GB"
*/
  static formatImageSizeWithSeparator(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const sizeValue = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
    const formattedValue = sizeValue.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });

    return formattedValue + " " + sizes[i];
  }

  /*
文件大小格式化函数
自适应精度（自动减少小数位数）
 // 使用示例
console.log(formatImageSizeAutoPrecision(1536));      // "1.5 KB"
console.log(formatImageSizeAutoPrecision(1048576));  // "1 MB"
console.log(formatImageSizeAutoPrecision(1536000));  // "1.46 MB"
*/
  static formatImageSizeAutoPrecision(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const sizeInUnit = bytes / Math.pow(k, i);
    // 根据大小自动决定小数位数
    const decimals = sizeInUnit < 10 ? 2 : sizeInUnit < 100 ? 1 : 0;

    return parseFloat(sizeInUnit.toFixed(decimals)) + " " + sizes[i];
  }

  /**
   * 根据路径下载文件
   * @param { filepath = string } 文件路径
   */
  static download(filepath) {
    var iframe = document.getElementById("downloadframe");
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

  /*
    // 示例
    console.log(getFileExtension('document.pdf'));      // 'pdf'
    console.log(getFileExtension('.gitignore'));        // ''
    console.log(getFileExtension('archive.tar.gz'));    // 'gz'
    console.log(getFileExtension('noextension'));       // ''
  */
  static getFileExtension(filename) {
    const lastDotIndex = filename.lastIndexOf(".");

    // 如果没有点，或者点在最前面（隐藏文件如 .gitignore）
    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return "";
    }

    return filename.slice(lastDotIndex + 1);
  }

  /*
  // 示例
console.log(getFileExtensionWithDot('document.pdf'));      // '.pdf'
  
  */

  static getFileExtensionWithDot(filename) {
    const lastDotIndex = filename.lastIndexOf(".");

    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return "";
    }

    return filename.slice(lastDotIndex); // 包含点
  }

  /*
  // 示例
console.log(getAllExtensions('archive.tar.gz'));    // ['tar', 'gz']
console.log(getAllExtensions('document.pdf'));      // ['pdf']
  
  */
  static getAllExtensions(filename) {
    const parts = filename.split(".");

    if (parts.length <= 1) {
      return [];
    }

    // 移除第一个部分（文件名），返回所有扩展名
    return parts.slice(1);
  }

  /*
  // 从HTML文件输入中获取
  <input type="file" id="fileInput" onchange="handleFileSelect(event)">

  function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const extension = getExtensionFromFile(file);
    console.log(`文件扩展名: ${extension}`);
  }
}
  */
  static getExtensionFromFile(file) {
    const name = file.name || "";
    const lastDotIndex = name.lastIndexOf(".");

    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return "";
    }

    return name.slice(lastDotIndex + 1).toLowerCase();
  }

  /*
  
  // 示例使用
console.log(FileExtensionUtils.getExtension('photo.JPG'));  // 'jpg'
console.log(FileExtensionUtils.isImage('photo.JPG'));       // true
console.log(FileExtensionUtils.isDocument('report.pdf'));   // true
  */
  // 获取扩展名
  static getExtension(filename) {
    const match = filename.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : "";
  }

  // 判断是否是图片
  static isImage(filename) {
    const ext = this.getExtension(filename);
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    return imageExtensions.includes(ext);
  }

  // 判断是否是视频
  static isVideo(filename) {
    const ext = this.getExtension(filename);
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"];
    return videoExtensions.includes(ext);
  }

  // 判断是否是文档
  static isDocument(filename) {
    const ext = this.getExtension(filename);
    const docExtensions = [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "txt",
    ];
    return docExtensions.includes(ext);
  }

  static isCompressedFile(filename) {
    // 获取文件扩展名
    const extension = this.getExtension(filename).toLowerCase();

    // 常见的压缩文件扩展名
    const compressedExtensions = [
      // 常见压缩格式
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
      "bz2",
      "xz",
      // 压缩包格式
      "tar.gz",
      "tgz",
      "tar.bz2",
      "tbz2",
      "tb2",
      "tar.xz",
      "txz",
      // 其他压缩格式
      "cab",
      "arj",
      "z",
      "lz",
      "lzma",
      "lzo",
      // 存档格式
      "iso",
      "dmg",
      "img",
      "vhd",
      "vhdx",
      // Windows相关
      "msi",
      "msix",
      "appx",
      "appxbundle",
      // 其他
      "jar",
      "war",
      "ear",
      "apk",
      "ipa",
    ];

    return compressedExtensions.includes(extension);
  }
}

export default FileUtils;
