import {saveSearch, savePlay, saveFavorite,deleteFavorite} from '../common/js/cache'
import {shuffle} from '../common/js/util'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const actions = {
    selectPlay({commit,state},{list,index}){
		
        commit('changeSequenceList',list);
		
		if(state.mode==2){
		  list = shuffle(list); 
		  index = findIndex(list, list[index])	
		}
		
		commit('changePlayList',list);
		commit('changeCurrentIndex',index);
		commit('changePlaying',true);
		commit('changeFullScreen',true);
	},
	randomPlay({commit}, {list}){
		commit('changeSequenceList',list);
		commit('changeMode',2);
		list = shuffle(list); 
		commit('changeFullScreen',true);
		commit('changePlaying',true);
		commit('changeCurrentIndex',0);
		commit('changePlayList',list);
		 
	},
	savePlayHistory({commit,state},song){
		commit('changePlayhistory', savePlay(song))
	},
	saveFavorite({commit,state},song){
		commit('changeFavoriteList', saveFavorite(song))
	},
	deleteFavorite({commit,state},song){
		commit('changeFavoriteList', deleteFavorite(song))
	}	
	
}
