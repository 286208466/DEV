/*
const url = "/:org_id/org/dashboard";
const params = { org_id: "123", user_id: "aaa" };
replacedUrl = formatPath(url, params)
console.log(replacedUrl); // 输出: "/123/org/dashboard"
*/
export const formatDynamicUrl = (url, params = {}) => {
  console.log("params", params)
  let replacedUrl = url;
  Object.keys(params).forEach((key) => {
    replacedUrl = replacedUrl.replace(`:${key}`, params[key]);
  });
  console.log("replacedUrl", replacedUrl)
  return replacedUrl;
};

/*
// 使用示例
console.log(pathToParametrized(
  "/users/12345/profile", 
  {userId: "12345"}
)); // 输出: "/users/:userId/profile"

console.log(pathToParametrized(
  "/prefix-123-suffix/value",
  {id: "123"},
  {exactSegments: false}
)); // 输出: "/prefix-:id-suffix/value"
*/
export function pathToParametrized(path, params, options = {}) {
  const {
    exactSegments = true, // 是否要求精确匹配整个路径段
    ignoreCase = false, // 是否忽略大小写
    strictSlash = true, // 是否严格匹配斜杠
  } = options;

  let result = path;
  const flags = ignoreCase ? "gi" : "g";

  // 按照参数值长度从长到短排序
  const sortedParams = Object.entries(params).sort(
    ([, a], [, b]) => b.length - a.length
  );

  for (const [key, value] of sortedParams) {
    let pattern;
    if (exactSegments) {
      // 精确匹配整个路径段
      pattern = `(^|${strictSlash ? "/" : "/?"})${escapeRegExp(value)}(?=$|/${
        strictSlash ? "" : "?"
      })`;
    } else {
      // 允许部分匹配
      pattern = escapeRegExp(value);
    }

    const regex = new RegExp(pattern, flags);
    result = result.replace(regex, `$1:${key}`);
  }

  return result;
}
