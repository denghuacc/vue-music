import axios from 'axios'
import { commonParams, ERR_OK } from './config'
import { getUid } from '../utils/uid'

const debug = process.env.NODE_ENV !== 'production'

// 获取歌词
export function getLyric(mid) {
  const url = debug ? '/api/lyric' : 'http://127.0.0.1:9095/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    format: 'json'
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => res.data)
}

// 获取歌曲链接
export function getSongsUrl(songs) {
  const url = debug ? '/api/getPurlUrl' : 'http://127.0.0.1:9095/api/getPurlUrl'

  let mids = []
  let types = []

  songs.forEach(song => {
    mids.push(song.mid)
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return new Promise((resolve, reject) => {
    let tryTime = 3

    function request() {
      return axios
        .post(url, {
          comm: data,
          req_0: urlMid
        })
        .then(response => {
          const res = response.data
          if (res.code === ERR_OK) {
            let uMid = res.req_0
            if (uMid && uMid.code === ERR_OK) {
              const purlMap = {}
              uMid.data.midurlinfo.forEach(item => {
                if (item.purl) {
                  purlMap[item.songmid] = item.purl
                }
              })
              if (Object.keys(purlMap).length > 0) {
                resolve(purlMap)
              } else {
                retry()
              }
            } else {
              retry()
            }
          } else {
            retry()
          }
        })
    }

    function retry() {
      if (--tryTime >= 0) {
        request()
      } else {
        reject(new Error('Can not get the songs url'))
      }
    }

    request()
  })
}

function genUrlMid(mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}
