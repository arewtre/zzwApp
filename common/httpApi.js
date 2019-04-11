/**
 * API接口配置文件
 */
module.exports = {
	home : {
		banner:"getData.php?ac=getBanner", // 首页banner 
		navlist:"getData.php?ac=getCategory", // 首页导航
		sydata:"getData.php?ac=getSyData", // 获取数据
		newsdata:"getData.php?ac=newsdata", // 文章详情数据
		newsmoduledata:"getData.php?ac=newsmoduledata", // 文章模块数据
		newscatedata:"getData.php?ac=newscatedata", // 文章分类数据
		getsearchdata:"getData.php?ac=getSearchData",//获取热门搜索
		getcate:"getData.php?ac=getcate",//获取热门搜索
		getgonggao:"getData.php?ac=getgonggao",//获取热门搜索
		getComment:"getData.php?ac=getComment",//获取评论数据
		addComment:"getData.php?ac=addComment",//评论
	},
	common:{
		couponlist:"index/couponlist", // 公共加载商品
		config:"config/getinfo", // 获取服务端配置
		update:"config/update", // 检测更新 
	},
	user:{
		checkLogin:"getData.php?ac=checkLogin"//登录
	},
	company:{
		getCompanyList:"company.php"//获取公司数据
	},
	goods:{
		iteminfo:"items/goodsinfo", // 商品详情 加载 
	}
}