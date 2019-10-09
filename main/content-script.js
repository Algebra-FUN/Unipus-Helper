//注入页面用于控制DOM

//通过DOM判断是否为Unipus
function isTarget() {
    if (document.getElementById('UnitID')) {
        return true
    }
    return false
}

var locator
var autoRun = false

function getPageInfo() {
    locator = window.location.href.match(/book(?<BookID>\d+)\/.+UnitID=(?<UnitID>\d+)&SectionID=(?<SectionID>\d+)&SisterID=(?<SisterID>\d+)/).groups
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
    let { BookID, UnitID, SectionID, SisterID } = locator
    keyTab = `key-${BookID}-${UnitID}-${SectionID}-${SisterID}`
    console.log(`keyTab=${keyTab}`)
    chrome.storage.sync.get('setting', res => {
        setting = res.setting
        chrome.storage.sync.get(keyTab, data => {
            if (isDataEmpty(data)) {
                console.log('not found key for this quiz')
                goNext()
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
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122) || str[i] === ' ' || str[i] === '-') {
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
        return result.join('').replace(/[ ]/g, "").toLowerCase()
    } else if (type === 'cloze') {
        return result.join('').replace(/[ ]/g, "").toLowerCase().split('-').join('')
    } else if (type === 'blankB') {
        return result.join(' ').split(' ')
    } else if (type === 'collocation') {
        return result.map(e => e.split(' ').slice(1).join(' '))
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
    } else if (type === 'collocation') {
        doCollocation(content)
    }

}

function doCollocation(keys = []) {
    let greens = document.getElementsByClassName('s-tz')
    let texts = Array.prototype.map.call(greens, item => item.innerHTML)
    keys.forEach((key, index) => {
        for (let i = 0; texts[i]; i++) {
            if (key === texts[i].slice(3)) {
                greens[index].innerHTML = texts[i]
                greens[index].id = `Item_${i}`
                break
            }
        }
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
    for (let r = 0, i = 0; content[i]; r++ , i++) {
        document.getElementById(`Blank_${r}_0`).value = content[i]
        for (let k = 1; document.getElementById(`Blank_${r}_${k}`); k++) {
            document.getElementById(`Blank_${r}_${k}`).value = content[++i]
        }
    }
    console.log('blank be filled')
}

function doBlankB(content = []) {
    for (let i = 0; content[i]; i++) {
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

function goNext() {
    if (!autoRun) {
        return
    }
    if (document.getElementsByClassName('next')[0]) {
        console.log('goNext')
        document.getElementsByClassName('next')[0].click()
    }
}

function waitforThree(what, text) {
    setTimeout(what, 3000)
    console.log(`wait for ${text}...3`)
    setTimeout(() => console.log(`wait for ${text}...2`), 1000)
    setTimeout(() => console.log(`wait for ${text}...1`), 2000)
}

function waitforSubmit() {
    if (!autoRun) {
        return
    }
    let submit = document.getElementsByClassName('submit')[0]
    if ((submit.children[0] && submit.children[0].innerText === 'Answer') || submit.innerText === 'Answer') {
        waitforThree(goNext, 'check answer')
        return
    }
    waitforThree(() => {
        submit.click()
        console.log('submit')
        waitforSure()
    }, 'submit')
}

function waitforSure() {
    waitforThree(() => {
        document.getElementsByClassName('layui-layer-btn0')[0].click()
        console.log('ensure')
    }, 'sure')
}

function main() {
    if (!isTarget()) {
        console.log('this is not Unipus or no quiz to do')
        goNext()
        return
    }
    getPageInfo()
    searchKey()
    waitforSubmit()
}

chrome.storage.sync.get('isRun', res => {
    //console.log(`isRun=${res.isRun}`)
    if (!res.isRun) {
        return
    }
    chrome.storage.sync.get('setting', res => {
        autoRun = res.setting.autoRun
        document.addEventListener('DOMContentLoaded', main)
    })
})