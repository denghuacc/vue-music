// 歌手类
export default class Singer {
  constructor({ id, name }) {
    this.id = id
    this.name = name
    this.avatar = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
