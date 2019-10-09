# Document
* **[中文版](./ToContribute_CN.md)**

## Step by step
### First Step : Add a new key file
1. create a key file js file under folder "keys"
2. name it "key_{BookIndex}_{UnitID}"
3. format key
```js
window.key_{BookIndex}_{UnitID} = {
  'key-{BookID}-{UnitID}-{SectionID}-{SisterID}':{
    type:'{type}',
    /* range of varable
       type = {'blank','mc','cloze','blankB'}
    */
    content:'{keyString}'
  }
}
```

template "./keys/key_2_1.js"
```js
window.key_2_1 = {
  'key-138-1-2-7': {
        type: 'blank',
        content: `1.condense   2.exceed     3.deficit    4.exposure    5.asset  
    6.adequate   7.competent  8.adjusting  9.precisely  10.beneficial
    `
    },
    'key-138-1-2-9': {
        type: 'blank',
        content: 'managerial/editorial/substance/survival/tradition/margin/consistency/accuracy/efficient/recovery/ministry/assembly'
    },
    'key-138-1-2-10': {
        type: 'blank',
        content: `1.editorial   2.recovery   3.accuracy    4.substance    5.managerial 
    6.margin  7.assembly  8.Ministry  9.survival  10.tradition  11.consistency   12.efficient
    `
    },
    'key-138-1-2-11': {
        type: 'cloze',
        content: `1-5:  L C J A I          6-10:  O N E H F`
    },
}
```
### Second Step : add config in "key-config.js"
```js
window.keys = [
  'key_2_1',
  // add the new key file name here
]
```
### Final Step : add config in "background.html"
```html
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!--main logic script-->
  <!--don't edit them-->
  <script src="background.js"></script>
  <script src="key-config.js"></script>
  
  <!--keys config list-->
  <script src="./keys/key_2_1.js"></script>
  <!--add new key file's link here-->
  <script src="{link to the key file}"></script>
</head>
</html>
```

## The Step end
Finished these steps, You have made a great contribute!

