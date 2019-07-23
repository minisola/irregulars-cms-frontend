/* eslint-disable class-methods-use-this */
import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Banner {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addBanner(info) {
    const res = await post('v1/banner/', info)
    return res
  }

  async editBanner(id, info) {
    const res = await put(`v1/book/${id}`, info)
    return res
  }

  async delectBanner(id) {
    const res = await _delete(`v1/book/${id}`)
    return res
  }

  async getBanners() {
    const res = await get('v1/book/')
    return res
  }
}

export default new Banner()
