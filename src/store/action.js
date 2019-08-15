import {saveSearch, savePlay, saveFavorite,deleteFavorite} from '../common/js/cache'
export const actions = {
    selectPlay({commit,state},{list,index}){
		
        commit('changeSequenceList',list);
		commit('changePlayList',list);
		commit('changeCurrentIndex',index);
		commit('changePlaying',true);
		commit('changeFullScreen',true);
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
