import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getGroupRadioList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg'
  
    const data = Object.assign({}, commonParams, {
      channel:'radio',
      page:'index',
      tpl:'wk',
      new:1,
      p:Math.random(),
      uin: 0,
      needNewCode: 0,
      platform: 'yqq'
    })
    return jsonp(url, data, options)
}