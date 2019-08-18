import {saveSearch, savePlay, saveFavorite,deleteFavorite} from '../common/js/cache'
import {shuffle} from '../common/js/util'
export const actions = {
    selectPlay({commit,state},{list,index}){
		
        commit('changeSequenceList',list);
		
		if(state.mode==2){
			list = shuffle(list);
			index = list.findIndex((item) => {
              return item.id === state.currentSong.id
            })
		}
		
		commit('changePlayList',list);
		commit('changeCurrentIndex',index);
		commit('changePlaying',true);
		commit('changeFullScreen',true);
	},
	deleteSongList({commit}){
		commit('changeSequenceList',[]);
		commit('changePlayList',[]);
		commit('changeCurrentIndex',-1);
		commit('changePlaying',false);		
	},
	deleteSong({commit,state},song){
		var playlist = state.playList.slice();
		var sequenceList = state.sequenceList.slice();
		var currentIndex = state.currentIndex;	
		playlist.splice(currentIndex,1);
		sequenceList.splice(currentIndex,1);
		currentIndex--;
		
		
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
