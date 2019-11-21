import axios, { AxiosResponse } from 'axios'
import jsonp from '../utils/jsonp'
import { commonParams, options } from './config'
import {
  ISliderListResult,
  IDiscListResult,
  IDiscSongListResult
} from '../types'

const debug = process.env.NODE_ENV !== 'production'

export function getSliderList(): Promise<ISliderListResult> {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uni: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList(): Promise<IDiscListResult> {
  const url = debug
    ? '/api/getDiscList'
    : 'http://127.0.0.1:9095/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    rnd: Math.random(),
    // 不是jsonp
    format: 'json'
  })

  return axios
    .get(url, {
      params: data
    })
    .then((res: AxiosResponse) => Promise.resolve(res.data))
}

export function getDiscSongList(disstid: string): Promise<IDiscSongListResult> {
  const url = debug ? '/api/getCdInfo/' : 'http://127.0.0.1:9095/api/getCdInfo'
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios
    .get(url, {
      params: data
    })
    .then((res: AxiosResponse) => Promise.resolve(res.data))
}
