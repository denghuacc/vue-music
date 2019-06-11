// 第三方操作缓存的库
import storage from 'good-storage'

// 搜索的 key
const SEARCH_KEY = '__SEARCH__'
const SEARCH_MAX_LENGTH = 15

// 播放的 key
const PLAY_KEY = '__PLAY__'
const PLAY_MAX_LENGTH = 200

// 收藏的 key
const FAVORITE_KEY = '__FAVORITE__'
const FAVORITE_MAX_LENGTH = 200

// 插入数组的方法
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)

  // 数组中存在这个值并且在第一个位置，不执行操作
  if (index === 0) {
    return
  }

  // 数组中存在这个值但是不在第一个，删掉这个值
  if (index > 0) {
    arr.splice(index, 1)
  }

  // 把这个值添加到数组的最前面
  arr.unshift(val)

  // 数组元素超过最大值，删掉数组的最后一个元素
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 从数组中删除元素的方法
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)

  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存搜索历史到缓存中
export function saveSearch(query) {
  // 从本地中获取搜索缓存，没有则为空数组
  let searches = storage.get(SEARCH_KEY, [])

  // 把搜索关键词插入到数组中
  insertArray(searches, query, item => item === query, SEARCH_MAX_LENGTH)

  // 保存最新的搜索历史数组到本地缓存中
  storage.set(SEARCH_KEY, searches)

  return searches
}

// 获取本地缓存中的搜索历史，没有则为空数组
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除本地缓存中的某个关键词
export function deleteSearch(query) {
  // 先从本地中获取搜索缓存，没有则为空数组
  let searches = storage.get(SEARCH_KEY, [])

  // 把数组中的搜索关键词删掉
  deleteFromArray(searches, item => {
    return item === query
  })

  // 保存最新的搜索历史数组到本地缓存中
  storage.set(SEARCH_KEY, searches)

  return searches
}

// 清空缓存，并返回空数组
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 保存播放的歌曲到本地缓存
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])

  insertArray(songs, song, item => item.id === song.id, PLAY_MAX_LENGTH)

  storage.set(PLAY_KEY, songs)
  return songs
}

// 获取本地缓存的播放历史
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 保存收藏的歌曲到本地缓存
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, item => song.id === item.id, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 从本地缓存中删除收藏的歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, item => song.id === item.id)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 从本地缓存中获取收藏的歌曲
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
