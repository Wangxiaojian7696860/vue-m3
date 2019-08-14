import {playMode} from '../common/js/config'
import {loadPlay,loadFavorite,loadSearch} from '../common/js/cache'
export const state = {
    singer:{},//存当前选择的歌手信息 通过它的id可以切换到相关歌手页面
    disc:{},//相当于singer//recommend子目录 disc.vue
    playing:false,//播放状态
    fullScreen:false,//全屏播放
    playList:[],//播放列表
    sequenceList:[],//顺序播放列表因为播放可以随机播放	
    currentIndex:-1,
    mode:playMode.sequence,
    playHistory:loadPlay(),
    searchHistory:loadSearch(),
    favoriteList:loadFavorite()
}
