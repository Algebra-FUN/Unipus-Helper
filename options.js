chrome.storage.sync.get('setting',res => {
    document.getElementById('rate').value = res.setting.correctRate
    document.getElementById('submit').onclick = () => {
        let setting = {
            correctRate:document.getElementById('rate').value
        }
        chrome.storage.sync.set({setting},() => {})
    }
})




