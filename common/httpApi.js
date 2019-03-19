/**
 * API接口配置文件
 */
module.exports = {
	home : {
		banner:"getBanner", // 首页banner 
		navlist:"getCategory", // 首页导航
		sydata:"getSyData", // 获取数据
		newsdata:"newsdata", // 文章详情数据
		newsmoduledata:"newsmoduledata", // 文章模块数据
		newscatedata:"newscatedata", // 文章分类数据
		getsearchdata:"getSearchData",//获取热门搜索
		getcate:"getCate"//获取热门搜索
	},
	common:{
		couponlist:"index/couponlist", // 公共加载商品
		config:"config/getinfo", // 获取服务端配置
		update:"config/update", // 检测更新 
	},
	user:{
		checkLogin:"checkLogin"//登录
	},
	goods:{
		iteminfo:"items/goodsinfo", // 商品详情 加载 
	}
}