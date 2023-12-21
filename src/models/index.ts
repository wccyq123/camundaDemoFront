/*
 * @Autor: wcy
 * @Date: 2022-02-22 10:16:34
 * @LastEditors: wcy
 * @LastEditTime: 2022-02-22 11:10:17
 * @description: 
 */
const model: any = {
  namespace: 'model',
  //数据
  state: {
    name: 'jack',
  },
  //异步修改数据
  effects: {
    *getName(_, { call, put, select }) { // payload参数
      console.log(213);
    }
  },
  //同步修改数据
  reducers: {
    saveName(state = { name: '' }, { payload }): any {  // state是当前状态的值，如果未被修改过，那么state为空，默认值为{ name: '' }。  payload 是调用dispatch时传过来的值。
      return {
        ...state,
        name: payload   //请求到的数据
      };
    }
  },
};

export default model;