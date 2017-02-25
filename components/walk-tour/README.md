#Polymer Walk Tour Element.

DEMO - https://aruntk.github.io/walk-tour/

## Customizable Walk Through Tour Element

Presents a web application by showing contextual dialogs and
highlighting elements on the page.

This element shows a guided tour through a web application. The
different steps of the tour can be easily configured.

Tour can be controlled using keyboard events as well mouse click events

Right key for Next
Left key  for Previous
Esc key for Skip

## How To Use

1. Import walk-tour.html. If you want to use custom tour element import just the walk-tour-behavior.
2. Include `<walk-tour></walk-tour>` tag in project
3. Add MyBehaviors.WalkTourBehavior to component behaviors. 
4. Call `_showhelp` Function from Web Compomnent whose help is to be shown

this._showHelp( element , Message Title, Message Body, Version Number);

### Version Number is if we want to update message later on  
### Default Value : 1

For Eg
```js
this._showHelp( this.$.searchboxx ,  "Search Box" ," I am search box",1, 'optional_unique_id');
```
> Note that id is used as a key to save cookies. So remember to set an id to the element.

### Updated Message for same Webcomponent

```js
this._showHelp( this.$.searchboxx ,  "Search Box" ," I am search box with changed message",2, 'optional_unique_id');
```

### Optional unique id

If you have more than one elements with same id (possibly inside two different custom elements) or and element with no id you'll have to pass a unique id to show separate tours for the elements.

```js
this._showHelp( this.querySelector('search-box-1') ,  "Search Box 1" ," I am search box 1", 1, 'sb1');
this._showHelp( this.querySelector('search-box-2') ,  "Search Box 2" ," I am search box 2", 1, 'sb2');
```

```js
this._showHelp( elementA.$.searchboxx ,  "Search Box inside element A" ," I am search box", 1, 'sba');
this._showHelp( elementB.$.searchboxx ,  "Search Box inside element B" ," I am the other search box", 1, 'sbb');
```

### Pass array of message can be passed to use message in list view

For Eg

```js
this._showHelp(this.$.searchboxx ,"Search Box", ["Search Your Queries Here Powered By Google!",
"Bullets can be used as well",
"Bullet 2","Bullet 3"],
1);
```

### Help can be timed according to developer ,when the help is to be shown

For Eg to show help after 15 sec 

```js

this.async(function() {
this._showHelp(this.$.searchboxx ,"Search Box", ["Search Your Queries Here Powered By Google!","Bullets can be used as well","Bullet 2","Bullet 3"],1);

}
,15000);

```

### Customizing Welcome Screen

```html

<walk-tour {{welcomeShow}}="false" {{welcomeTitle}}="Welcome Title to be shown" {{welcomeMsg}}=="Welcome Message to be shown" ></walk-tour> 

```
Default Values are:
```js
welcomeShow:true,
welcomeTitle:"Welcome",
welcomeMsg:"You can go to and fro between elements using mouse as well as keyboard (left, right keys and esc key to exit). Click on screen to move to next"
```
### Force Restarting the tour

Clear the walk-tour-viewed key value pair from localstorage.

```js
document.querySelector("walk-tour")._cookies = {};
```

Now run `this._showHelp`.
