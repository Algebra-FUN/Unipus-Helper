//注入页面用于控制DOM

//通过DOM判断是否为Unipus
function isTarget() {
    if (document.getElementById('UnitID')) {
        return true
    }
    return false
}

var UnitID, SectionID, SisterID

function getPageInfo() {
    UnitID = document.getElementById('UnitID').value
    SectionID = document.getElementById('SectionID').value
    SisterID = document.getElementById('SisterID').value
}

var keyTab, keyData

function isDataEmpty(obj) {
    for (var i in obj) {
        return false
    }
    return true
}

var setting

//在Storage中搜寻答案
function searchKey() {
    keyTab = `key-${UnitID}-${SectionID}-${SisterID}`
    console.log(`keyTab=${keyTab}`)
    chrome.storage.sync.get('setting', res => {
        setting = res.setting
        chrome.storage.sync.get(keyTab, data => {
            if (isDataEmpty(data)) {
                console.log('not found key for this quiz')
                return
            }
            keyData = data
            console.log(keyData)
            fillBlank()
        })
    })
}

//initial raw key format
function BBQ(str) {
    let result = []
    let word = []
    for (let i = 0; str[i]; i++) {
        let c = str.charCodeAt(i)
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122) || str[i] === ' ') {
            word.push(str[i])
        } else {
            result.push(word.join('').replace(/(^\s*)|(\s*$)/g, ""))
            word = []
        }
    }
    result.push(word.join('').replace(/(^\s*)|(\s*$)/g, ""))
    return result.filter(e => e !== '')
}

//转化答案
function parseKey(type, content) {
    let result = BBQ(content)
    if (type === 'blank') {
        return result
    } else if (type === 'mc') {
        return result.join('').replace(/[ ]/g,"").toLowerCase()
    } else if (type === 'cloze') {
        return result.join('').replace(/[ ]/g,"").toLowerCase()
    } else if (type === 'blankB') {
        return result.join(' ').split(' ')
    } else if (type === 'collocation'){
        return result.map(e => e.split(' ')[1])
    }
    return content
}

//随机造错
function misWord(content = []) {
    console.log(`correctRate=${setting.correctRate}%`)
    for (let i = 0; content[i]; i++) {
        if (Math.random() < 1 - setting.correctRate / 100) {
            let str = content[i]
            let rdL = Math.floor(Math.random() * str.length)
            console.log(`from:${str}`)
            content[i] = str.substr(0, rdL - 1) + str.substr(rdL, str.length)
            console.log(`to:${content[i]}`)
        }
    }
    return content
}

//自动填充信息
function fillBlank() {
    let { type, content } = keyData[keyTab]
    content = parseKey(type, content)
    console.log(content)
    if (type === 'blank') {
        doBlank(misWord(content))
    } else if (type === 'mc') {
        doMC(content)
    } else if (type === 'cloze') {
        doCloze(content)
    } else if (type === 'blankB') {
        doBlankB(content)
    } else if (type === 'collocation'){
        doCollocation(content)
    }

}

function doCollocation(keys = []){
    let greens = document.getElementsByClassName('green')
    console.log(greens)
    let orders = []
    Array.prototype.forEach.call(greens,item => orders.push(keys.indexOf(item.innerHTML.slice(3))))
    orders.forEach((order,index) => {
        greens[index].innerHTML = keys[index]
        greens[index].id = `Item_${order}`
    })
}

function doCloze(content = '') {
    for (let i = 0; content[i]; i++) {
        let key = document.getElementById(`list_${content.charCodeAt(i) - 96}`).innerHTML
        document.getElementById(`Item_0_${i}`).value = key
    }
    console.log('blank be filled')
}

function doBlank(content = []) {
    for (let r = 0,i = 0; content[i]; r++,i++) {
        document.getElementById(`Blank_${r}_0`).value = content[i]
        for(let k = 1;document.getElementById(`Blank_${r}_${k}`);k++){
            document.getElementById(`Blank_${r}_${k}`).value = content[++i]
        }
    }
    console.log('blank be filled')
}

function doBlankB(content = []){
    for(let i = 0; content[i];i++){
        document.getElementById(`Blank_0_${i}`).value = content[i]
    }
}

const mcf = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 }

function doMC(content = '') {
    for (let i = 0; i < content.length; i++) {
        document.getElementsByName(`Radio_${i}`)[mcf[content.charAt(i)]].click()
    }
    console.log('MC be clicked')
}

function main() {
    if (!isTarget()) {
        console.log('this is not Unipus or no quiz to do')
        return
    }
    getPageInfo()
    searchKey()
}
chrome.storage.sync.get('isRun', res => {
    //console.log(`isRun=${res.isRun}`)
    if (!res.isRun) {
        return
    }
    document.addEventListener('DOMContentLoaded', main)
})