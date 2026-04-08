/*==================================================
使用示例
const div = document.getElementById('myDiv');
addClass(div, 'active');
removeClass(div, 'hidden');
if (hasClass(div, 'active')) {
  toggleClass(div, 'highlight');
}
==================================================*/

/**
 * 添加class
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 要添加的class名
 */
function addClass(element, className) {
  if (element && className) {
    element.classList.add(className);
  }
}

/**
 * 删除class
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 要删除的class名
 */
function removeClass(element, className) {
  if (element && className) {
    element.classList.remove(className);
  }
}

/**
 * 切换class
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 要切换的class名
 */
function toggleClass(element, className) {
  if (element && className) {
    element.classList.toggle(className);
  }
}

/**
 * 检查是否包含class
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 要检查的class名
 * @returns {boolean} 是否包含该class
 */
function hasClass(element, className) {
  if (element && className) {
    return element.classList.contains(className);
  }
  return false;
}

export default {
  addClass,
  removeClass,
  toggleClass,
  hasClass,
};

/*==================================================
使用示例
// 链式调用
classHelper('#myDiv')
  .add('active', 'highlight')
  .remove('hidden')
  .toggle('selected');

// 单独使用
const manager = classHelper(document.getElementById('myDiv'));
if (manager.has('active')) {
  manager.add('visible');
}
==================================================*/
class ClassManager {
  constructor(element) {
    this.element = element;
  }

  /**
   * 添加一个或多个class
   * @param {...string} classNames - 要添加的class名(可多个)
   * @returns {ClassManager} 返回自身以便链式调用
   */
  add(...classNames) {
    if (this.element) {
      classNames.forEach((className) => {
        if (className) this.element.classList.add(className);
      });
    }
    return this;
  }

  /**
   * 删除一个或多个class
   * @param {...string} classNames - 要删除的class名(可多个)
   * @returns {ClassManager} 返回自身以便链式调用
   */
  remove(...classNames) {
    if (this.element) {
      classNames.forEach((className) => {
        if (className) this.element.classList.remove(className);
      });
    }
    return this;
  }

  /**
   * 切换一个或多个class
   * @param {...string} classNames - 要切换的class名(可多个)
   * @returns {ClassManager} 返回自身以便链式调用
   */
  toggle(...classNames) {
    if (this.element) {
      classNames.forEach((className) => {
        if (className) this.element.classList.toggle(className);
      });
    }
    return this;
  }

  /**
   * 检查是否包含某个class
   * @param {string} className - 要检查的class名
   * @returns {boolean} 是否包含该class
   */
  has(className) {
    if (this.element && className) {
      return this.element.classList.contains(className);
    }
    return false;
  }
}

/**
 * 获取ClassManager实例
 * @param {HTMLElement|string} element - DOM元素或选择器
 * @returns {ClassManager} ClassManager实例
 */
export function classHelper(element) {
  const el =
    typeof element === "string" ? document.querySelector(element) : element;
  return new ClassManager(el);
}

/*==================================================

==================================================*/
