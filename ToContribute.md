# Document
* **[中文版](./ToContribute_CN.md)**

## Step by step
### First Step : Add a new key file
1. create a key file js file under folder "keys"
2. name it "key_2_{UnitID}"
3. format key
```js
window.key_2_{UnitID} = {
  'key-{UnitID}-{SectionID}-{SisterID}':{
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
  'key-1-2-10': {
    type: 'blank',
    content: `1.editorial   2.recovery   3.accuracy    4.substance    5.managerial 
    6.margin  7.assembly  8.Ministry  9.survival  10.tradition  11.consistency   12.efficient
    `
  },
  'key-1-2-11': {
    type: 'cloze',
    content: `1-5:  L C J A I          6-10:  O N E H F`
  },
  'key-1-2-12': {
    type: 'blank',
    content: `1.feel obliged to  2.be serious about  3.run into  4.distinguish between  5.thrust upon   6.was allergic to   7.get lost  8.be attracted to  9.make sense   10.looked upon as`
  },
  'key-1-6-4': {
    type: 'mc',
    content: `D.   2. A   3. C   4. A   5. C   6. B   7. C    8. D  `
  },
  'key-1-6-6': {
    type: 'blank',
    content: `mysterious   2. desperate   3.  devise    4. negotiate   5.  recalled 
    6. specifically    7. depict      8. Ignorance    9. Expand    10 confusion
    `
  },
  'key-1-6-7': {
    type: 'blank',
    content: `apply to     2. in a bid to      3.  end up         4. speaking of  
    5.  get hold of   6. appealed to   7. leaving ..behind     8. focus on 
    `
  },
  'key-1-7-3': {
    type: 'blankB',
    content: `1 essential framework    2 proper vocabulary   3 excellent control  4 language deficit
    5 high standards        6 language proficiency  7 acquire knowledge 
     8 competent communication   9 overcome deficiencies       10 sketch thoughts 
     11 effective communication     12 advanced vocabulary
    `
  }
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

