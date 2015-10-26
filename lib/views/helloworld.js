import {res} from '../resource.js';
import _ from 'lodash';
import console from '../utils/cocos-ex/cocos-console.js';

import { createStore } from 'redux';
import todoApp from '../store/reducers';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../store/actions';

const store = createStore(todoApp);

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const HelloWorldLayer = cc.Layer.extend({
  sprite: null,
  ctor: function () {
    //////////////////////////////
    // 1. super init first
    this._super();

    // console.log(_.random(1, 20));

    /////////////////////////////
    // 2. add a menu item with "X" image, which is clicked to quit the program
    //    you may modify it.
    // ask the window size
    var size = cc.winSize;

    // add a "close" icon to exit the progress. it's an autorelease object
    var closeItem = new cc.MenuItemImage(
      res.CloseNormal_png,
      res.CloseSelected_png,
      function () {
        cc.log("Menu is clicked!");
      }, this);
    closeItem.attr({
      x: size.width - 20,
      y: 20,
      anchorX: 0.5,
      anchorY: 0.5
    });

    console.log(_.random(1, 10));

    var menu = new cc.Menu(closeItem);
    menu.x = 0;
    menu.y = 0;
    this.addChild(menu, 1);

    /////////////////////////////
    // 3. add your codes below...
    // add a label shows "Hello World"
    // create and initialize a label
    var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
    // position the label on the center of the screen
    helloLabel.x = size.width / 2;
    helloLabel.y = 0;
    // add the label as a child to this layer
    this.addChild(helloLabel, 5);

    // add "HelloWorld" splash screen"
    this.sprite = new cc.Sprite(res.HelloWorld_png);
    this.sprite.attr({
      x: size.width / 2,
      y: size.height / 2,
      scale: 0.5,
      rotation: 180
    });
    this.addChild(this.sprite, 0);
    console.log('gen beg');
    this.gen();
    console.log('gen end');

    this.sprite.runAction(
      cc.sequence(
        cc.rotateTo(2, 0),
        cc.scaleTo(2, 1, 1)
        )
      );
    helloLabel.runAction(
      cc.spawn(
        cc.moveBy(2.5, cc.p(0, size.height - 40)),
        cc.tintTo(2.5, 255, 125, 0)
        )
      );
    this.reduxText();
    return true;
  },

  reduxText: function () {
    // 打印初始状态
    console.log('init', store.getState());

    // 监听 state 更新时，打印日志
    const unsubscribe = store.subscribe(() =>
      console.log(store.getState())
      );

    // 发起一系列 action
    store.dispatch(addTodo('Learn about actions'));
    store.dispatch(addTodo('Learn about reducers'));
    store.dispatch(addTodo('Learn about store'));
    store.dispatch(completeTodo(0));
    store.dispatch(completeTodo(1));
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

    // 停止监听 state 更新
    unsubscribe();
  },

  gen: async function gen() {
    console.log('timeout begin');
    await timeout(1000);
    console.warn('timeout end');
  },
});

const HelloWorldScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new HelloWorldLayer();
    this.addChild(layer);
  }
});

export default HelloWorldScene;
