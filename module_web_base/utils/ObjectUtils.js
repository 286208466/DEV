class ObjectUtils {
  /*
通过传入字符串如 'a.b.c' 来获取对象 obj 中对应的值，即 obj.a.b.c 的值
示例对象：let obj = { a: { b: { c: 1 } } };
传入 'a.b.c' 返回 1。
*/
  static getValueByPath(obj, path, defaultValue = undefined) {
    if (typeof obj !== "object" || obj === null) {
      return defaultValue;
    }

    // 将路径字符串分割成数组
    const keys = path.split(".");
    let result = obj;

    // 逐级访问属性
    for (let key of keys) {
      // 如果当前级别为null或undefined，返回默认值
      if (result === null || result === undefined) {
        return defaultValue;
      }

      // 处理数组索引
      if (!isNaN(key) && Array.isArray(result)) {
        key = parseInt(key, 10);
      }

      // 访问下一级属性
      result = result[key];
    }

    // 如果最终结果是undefined，返回默认值
    return result !== undefined ? result : defaultValue;
  }
}

export default ObjectUtils;
