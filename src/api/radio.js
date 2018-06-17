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

export function getRadioSonglist(radioId) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  let data = {"songlist":{"module":"pf.radiosvr","method":"GetRadiosonglist","param":{"id":radioId,"firstplay":1,"num":10}}}
  const datas = Object.assign({}, commonParams, {
    needNewCode: 0,
    callback:'getradiosonglist47197189254706573',
    // jsonpCallback:'getradiosonglist47197189254706573',
    format:'jsonp',
    // loginUin:'1369526524',
    platform: 'yqq',
    data:JSON.stringify(data)
  })
  return jsonp(url, datas, options)
}