import {saveSearch, savePlay, saveFavorite} from '../common/js/cache'
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
	}
	
}
