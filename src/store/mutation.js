export const mutations = {
    changeDisc(state,item){
        state.disc = item
    },
    changeSinger(state,item){
        state.singer = item
    },
    changePlaying(state,item){
        state.playing = item
    },
	changeFullScreen(state,item){
		state.fullScreen = item
	},
	changePlayList(state,item){
		state.playList = item
	},
	changeSequenceList(state,item){
		state.sequenceList = item
	},
	changeCurrentIndex(state,item){
		state.currentIndex = item
	},
	changeMode(state,item){
		state.mode = item
	}		
}
