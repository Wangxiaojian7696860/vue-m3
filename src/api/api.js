export class singer{
    constructor(name,dissid){
      this.name = name;
      this.descname = `这里是${name}的歌曲列表，欢迎您收听！`;
      this.dissid = dissid;
      this.avtar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${dissid}.jpg?max_age=2592000`;
    }
}
export class song{
  constructor({songid,songmid,singer,songname,albumname,interval,albummid}){
     this.id = songid;
     this.mid = songmid;
     this.singer = filterSinger(singer);
     this.name = songname;
     this.album = albumname;
     this.duration = interval;
     this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
     this.url = `https://wangxiaojian7696860.github.io/cao/static/music/C400${songmid}.mp3`
  }
}

function filterSinger(singer) {
  //有些名字是两个人的 要连在一起
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
