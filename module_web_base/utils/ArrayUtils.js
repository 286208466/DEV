class ArrayUtils {
  /*
数组指定位置插入元素
let arr = [1, 2, 3, 4, 5];
insertAt(arr, 2, 'a', 'b');
console.log(arr); // 输出: [1, 2, 'a', 'b', 3, 4, 5]
*/
  static insertAt(array, index, ...elements) {
    array.splice(index, 0, ...elements);
    return array;
  }
}

export default ArrayUtils;
