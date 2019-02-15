// pages/movie-detail/movie-detail.js
var util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: [],
        originalTitle: [],
        percentage: '',
        percentageUse: '',
        casts: [],
        genres: [],
        castsInfo: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.movieId)
        wx.request({
            url: 'https://douban.uieee.com/v2/movie/subject/'+ options.movieId,
            header: {
                // "content-type": "application/xml"
                "Content-Type": "json"
            },
            success: (res)=>{
                this.setData({
                    movie: res.data,
                    originalTitle: res.data.original_title,
                    percentage: res.data.rating.average * 10,
                    casts: util.convertToCastString(res.data.casts),
                    genres: res.data.genres.join("、"),
                    castsInfo: util.convertToCastInfo(res.data.casts)
                })
                // console.log(this.data.movie)
            }
        })

    },
    // 加载预览图片
    viewMoviePostImg: function(e){
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            urls: [src],
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})