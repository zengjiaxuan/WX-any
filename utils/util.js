const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//演员名字组成一个字符串
function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}
//演员名字和图片组成一个数组
function convertToCastInfo(casts) {
    var castsinfo = [];
    for (var index in casts) {
        var cast = {
            img: casts[index].avatars?casts[index].avatars.large:"",
            name: casts[index].name
        }
        castsinfo.push(cast)
    }
    return castsinfo
}

module.exports = {
    formatTime: formatTime,
    convertToCastString: convertToCastString,
    convertToCastInfo: convertToCastInfo
}