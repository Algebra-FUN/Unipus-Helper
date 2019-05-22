chrome.storage.sync.get('setting',res => {
    document.getElementById('rate').value = res.setting.correctRate
    document.getElementById('autoRun').checked = res.setting.autoRun
    document.getElementById('submit').onclick = () => {
        let setting = {
            correctRate:document.getElementById('rate').value,
            autoRun:document.getElementById('autoRun').checked
        }
        chrome.storage.sync.set({setting},() => {})
    }
})




