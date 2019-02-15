//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        dataId: "1",
        cssActive: "1",
        requestUrl: "in_theaters",
        theatesList: [],
        countIndex: 20  ,
        startIndex: -20,
        castsInfo: [],
        searchShow: false,
        searchHide: true,
        searchName: '',
        searchList: [],
    },
    onLoad: function () {

        this.resetData()
        this.loading()
        this.getData()
    },
    onShow: function(){

    },
    // 上拉触底
    onReachBottom: function(){
        // console.log("上拉触底")
        this.loading()
        this.getData()
    },
    // 导航栏切换点击事件
    check:function(e){
        this.setData({
            dataId: e.target.dataset.id,
            requestUrl: e.target.id,
            countIndex: 20,
            startIndex: -20
        })
        this.resetData()
        this.loading()
        this.getData()
    },
    // 搜索点击聚焦
    onBindFocus: function(e){
        this.setData({
            searchShow: true,
            searchHide: false
        })
    },
    // 搜索点击失焦
    onBindBlur: function(){
        this.setData({
            // searchShow: false,
            // searchHide: true
        })
    },
    // 获取input输入值
    searchName(e){
        // console.log(e.detail)
        this.setData({
            searchName: e.detail.value
        })
        this.getSearchData()
    },
    // 关闭搜索页面
    searchClose(){
        // console.log("guanbi")
        this.setData({
            searchShow: false,
            searchHide: true,
            searchName: '',
            searchList: [],
        })
    },
    resetData: function(){
        this.setData({
            theatersList:[]
        })
    },
    getData: function(){

        wx.request({
          url: 'https://douban.uieee.com/v2/movie/' + this.data.requestUrl ,
            header: {
                // "content-type": "application/xml"
              'content-type': 'json'
            },
            data: {
                start: this.data.startIndex+=20,
                count: this.data.countIndex
            },
            success: (res) => {
                wx.hideToast()
                const titleItem = res.data.subjects
                const newList = this.data.theatersList.concat(titleItem)
                // console.log(newList.length+"qqqqqq"+this.data.startIndex)
                for(var item in newList){
                    // console.log(newList[item].title)
                }
                if(newList.length>res.data.total){
                    wx.showToast({
                        title: '已经没有更多数据了',
                    })
                } else {
                    this.setData({
                        theatersList: newList,
                    })
                }
                // console.log(this.data.theatersList)
            }
        })
    },
    // 获得搜索请求内容
    getSearchData: function(){
        wx.request({
            url: 'https://douban.uieee.com/v2/movie/search?tag=' + this.data.searchName+'&start=0&count=20',
            // method: 'GET',
            header: {
                // "Content-type": "application/xml"
                // "Content-type": "json"
              'content-type': 'json'
            },
            success: (res)=>{
                // console.log(res.data.subjects)
                this.setData({
                    searchList: res.data.subjects,
                })
            }
        })
    },
    loading: function(){
        wx.showToast({
            title: '玩命加载中...',
            icon: 'loading',
            duration: 10000
        })
    }
})