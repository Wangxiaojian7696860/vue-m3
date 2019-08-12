export const actions = {
    selectPlay({commit,state},{list,index}){
		
        commit('changeSequenceList',list);
		commit('changePlayList',list);
		commit('changeCurrentIndex',index);
		commit('changePlaying',true);
		commit('changeFullScreen',true);
    }
}
