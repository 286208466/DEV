### react 页面标准写法

```js
import React, { FC } from "react";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Suspense,
} from "react";

import { connect, bindActionCreators } from "react-redux";
import { SET_USERINFO } from "../../store/action";
// import * as actions from "./redux/actions";

import styles from "./index.module.scss";

const App = (props) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <div>11111111111111111111</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  global: state.global,
  user: state.user,
  temporary: state.temporary,
});
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(actions, dispatch);
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    SET_USERINFO(data) {
      dispatch(SET_USERINFO(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
```
