//后台总控制JS

//当被安装时
chrome.runtime.onInstalled.addListener(function () {

  //总数据库
  const data = {
    isRun: true,
    setting: {
      correctRate: 100,
      autoRun: false
    }
  }

  window.keys.forEach(i => Object.assign(data,window[i]))

  //初始化内存
  chrome.storage.sync.set(data, function () {
    console.log('key init');
  });
  chrome.browserAction.setBadgeText({ text: 'Uni' });
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 128, 0, 255] });
});
