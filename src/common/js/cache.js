const SEARCH_KEY = '__search__'//搜索的key
const SEARCH_MAX_LEN = 15//最大只能存15条数据

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

//保存收藏列表
export function saveFavorite(song) {
	//先获取本地存储的收藏列表
	var songs = window.localStorage.FAVORITE_KEY;
	if(!songs){
	   songs = [];	
	}else{
	   songs = JSON.parse(songs)
	}
	
	var index = songs.findIndex(function(item){
		return item.id = song.id;					 
	});
	
	if (index >= 0) {
		return ;
	}
	
	songs.unshift(song);//插入一条记录在数组最前
	
	if(songs.length > FAVORITE_MAX_LEN){
		songs.pop();
	}
	
	window.localStorage.FAVORITE_KEY = JSON.stringify(songs);//将数据保存在本地
	return songs;
    
}

//删除收藏
export function deleteFavorite(song){
	//先获取本地存储的收藏列表
	var songs = window.localStorage.FAVORITE_KEY;
	if(!songs){
	   songs = [];	
	}else{
	   songs = JSON.parse(songs)
	}
	
	var index = songs.findIndex(function(item){
		return item.id = song.id;					 
	});
	
	if(index > -1){
		songs.splice(index,1);
	}
	
	window.localStorage.FAVORITE_KEY = JSON.stringify(songs);//将数据保存在本地
	return songs;	
	
}

//获取本地收藏列表
export function loadFavorite(){
	//先获取本地存储的收藏列表
	var songs = window.localStorage.FAVORITE_KEY;
	if(!songs){
	   songs = [];	
	}else{
	   songs = JSON.parse(songs)
	}
	
	return songs;
	
}

//本地保存播放历史歌曲记录
export function savePlay(song){
	var songs = window.localStorage.PLAY_KEY;
	if(!songs){
	   songs = [];	
	}else{
	   songs = JSON.parse(songs)
	}	
	
	var index = songs.findIndex(function(item){
		return item.id = song.id;					 
	});	
	
	if(index===0){
		return;//列表中已经有歌曲 并且在第一条 所以不用处理 了 直接返回
	}
	if(index >0){
		songs.splice(index,1);//有相同的歌曲在列表中 先将其删除 后再添加 并且放在第一位
	}
	songs.unshift(song);
	
	if(songs.length > PLAY_MAX_LEN){
		songs.pop();
	}
	window.localStorage.PLAY_KEY = JSON.stringify(songs);//将数据保存在本地
	return songs;
	
}
//获取历史播放歌曲列表
export function loadPlay() {
	var songs = window.localStorage.PLAY_KEY;
	if(!songs){
	   songs = [];	
	}else{
	   songs = JSON.parse(songs)
	}	
	return songs;
}

//保存搜索关键词到本地列表
export function saveSearch(query) {
	var searches =  window.localStorage.SEARCH_KEY;//获取search_key如果没有返回[]
	if(!searches){
	   searches = [];	
	}else{
	   searches = JSON.parse(searches);
	}	
	var index = searches.findIndex((item)=>{
		return item === query;							
	});
	
	if(index===0){
	  return	
	}
	if(index > 0){
		searches.splice(index,1);
	}
	searches.unshift(query);
	if(searches.length > SEARCH_MAX_LEN){
		searches.pop();
	}	
	window.localStorage.SEARCH_KEY = JSON.stringify(searches);//将数据保存在本地
	
	return searches;
}
//
export function deleteSearch(query) {
	var searches =  window.localStorage.SEARCH_KEY;//获取search_key如果没有返回[]
	if(!searches){
	   searches = [];	
	}else{
	   searches = JSON.parse(searches);
	}	
	var index = searches.findIndex((item)=>{
		return item === query;							
	});	
	if(index>-1){
		searches.splice(index,1);
	}
	window.localStorage.SEARCH_KEY = JSON.stringify(searches);//将数据保存在本地
	return searches;
}

export function loadSearch() {
	var searches =  window.localStorage.SEARCH_KEY;//获取search_key如果没有返回[]
	if(!searches){
	   searches = [];	
	}else{
	   searches = JSON.parse(searches);
	}	
	return searches;
}

export function clearSearch() {
  window.localStorage.removeItem(SEARCH_KEY);
  return []
}