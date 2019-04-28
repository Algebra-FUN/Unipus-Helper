//后台总控制JS

//当被安装时
chrome.runtime.onInstalled.addListener(function () {

  //总数据库
  const data = {
    isRun: true,
    setting: {
      correctRate: 97
    }
  }

  window.keys.forEach(i => Object.assign(data,window[i]))

  //初始化内存
  chrome.storage.sync.set(data, function () {
    console.log('key init');
  });
  chrome.browserAction.setBadgeText({ text: 'Uni' });
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 128, 0, 255] });
  //增加适用页面Rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: '211.81.52.7/book' },//适用页面URL
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
