const CheckPassword = (password) => {
    if (password.toLowerCase() != password && password.length > 6) {
        return true;
    } else {
        return false;
    }
}

const CheckPhone = (phone) => {
    return !isNaN(phone);
}

const nilChecker = function (postData, number, optional) {
    for (let key in postData) {
        let isSkip = false;
        for (let i = 0; i < optional.length; i++) {
            if (optional[i] == key) {
                isSkip = true;
                break;
            }
        }
        //判斷post中的 value是否為undefined 或者 可跳過
        if (!isSkip && !isNaN(postData[key]) &&
            (postData[key].length == 0 || postData[key] === undefined)) {
            return false;
        }
    }
    return true;
}

module.exports = {
    CheckPassword,
    CheckPhone,
    nilChecker
}