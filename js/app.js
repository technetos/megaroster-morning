$(document).foundation()

var megaRoster = {
  init: function() {
    this.setupEventListeners();
  },

  setupEventListeners: function() {
    document.querySelector('form').onsubmit = this.addStudent;
  },

  addStudent: function(ev) {
    ev.preventDefault();
    console.log('hello world');
  },

}

megaRoster.init();
