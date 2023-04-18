'use strict';
{
  class Panel {
    constructor(counter) {
      this.counter = counter;
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.textContent = 'Reset';
      this.el.addEventListener('click', () => {
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    check() {
        this.el.classList.add('pressed');
        this.counter.countClear();
        this.el.textContent = 'Clear!';
    }

  }

  class Board {
    constructor(counter) {
      this.counter = counter;
      this.panel = new Panel(this.counter);
      this.setup();
    }

    setup() {
      const board = document.getElementById('board');
      board.appendChild(this.panel.getEl());
    }

    activate() {
      this.panel.activate(this.counter.getCount());
    }

  }

  class Counter {
    constructor() {
      this.board = new Board(this);

      const btn = document.getElementById('btn');
      this.count = 0;

      btn.addEventListener('click', () => {
        // カウンターを一つ上げる
        this.countUp();
        // ボードに値表示
        this.board.activate();
      });
      this.setup();
    }

    setup() {
      const container = document.getElementById('container');
    }

    countUp() {
      this.count++;
    }

    getCount() {
      return this.count;
    }
 
    countClear() {
      this.count = 0;
    }

  }

  new Counter();
}
