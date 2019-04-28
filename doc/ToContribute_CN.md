# 答案贡献文档
### 如何贡献答案

## 步骤
### 第一步 : 添加新的答案文件
1. 在"keys"文件夹下，创建一个新的JS文件
2. 命名为"key_2_{UnitID}"
3. 格式化答案
```js
window.key_2_{UnitID} = {
  'key-{UnitID}-{SectionID}-{SisterID}':{
    type:'{type}',
    /* 参数可取范围
       type = {'blank','mc','cloze','blankB'}
    */
    content:'{keyString}'
  }
}
```
参数意义
* ID：题号(如页面URL)
* type：对应题目类型

  | blank | mc | cloze | blankB |
  | ------ | ------ | ------ | ------ |
  | 填空题 | 单项选择题 | Cloze题 | B组填空题 |
* keyString：直接粘贴对应答案字符串

[答案JS文件模板](../keys/key_2_1.js)
```js
window.key_2_1 = {
  'key-1-2-7': {
    type: 'blank',
    content: `1.condense   2.exceed     3.deficit    4.exposure    5.asset  
    6.adequate   7.competent  8.adjusting  9.precisely  10.beneficial
    `
  },
  'key-1-2-9': {
    type: 'blank',
    content: 'managerial/editorial/substance/survival/tradition/margin/consistency/accuracy/efficient/recovery/ministry/assembly'
  },
  'key-1-2-11': {
    type: 'cloze',
    content: `1-5:  L C J A I          6-10:  O N E H F`
  },
  ……………… 更多详见 "./keys/key_2_1.js"
}
```
[更多详见](../keys/key_2_1.js)
### 第二步 :在"key-config.js"文件中添加配置
```js
window.keys = [
  'key_2_1',
  '{新答案文件名}'
  // add the new key file name here
]
```
### 最后一步 : 在"background.html"文件中添加配置
```html
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!--主控制逻辑配置-->
  <!--请勿修改-->
  <script src="background.js"></script>
  <script src="key-config.js"></script>
  
  <!--答案配置列表-->
  <script src="./keys/key_2_1.js"></script>
  <!--在此添加新答案文件配置-->
  <script src="{新答案文件的链接}"></script>
</head>
</html>
```

## 完成
到此为止，完成以上步骤，你已经为这个项目添加了一个新的答案文件，做出了卓越的贡献。

