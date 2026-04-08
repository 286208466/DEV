import dom from "./dom";

import ArrayUtils from "./ArrayUtils";
import DateUtils from "./DateUtils";
import FileUtils from "./FileUtils";
import FunctionUtils from "./FunctionUtils";

import NumberUtils from "./NumberUtils";
import ObjectUtils from "./ObjectUtils";
import PrintUitls from "./PrintUitls";
import RegExpUtils from "./RegExpUtils";
import StringUtils from "./StringUtils";
export default {
  ...dom,
  ArrayUtils,
  DateUtils,
  FileUtils: FileUtils,
  FunctionUtils,
  NumberUtils: NumberUtils,
  ObjectUtils,
  PrintUitls: PrintUitls,

  RegExpUtils: RegExpUtils,
  StringUtils,
};
