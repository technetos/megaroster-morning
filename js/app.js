$(document).foundation()

var megaRoster = {
  init: function() {
    this.setupEventListeners();
  },

  setupEventListeners: function() {
    document.querySelector('#studentForm').onsubmit = this.addStudent.bind(this);
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    var studentName = f.studentName.value;
    var item = this.buildListItem(studentName);
    var list = document.querySelector('#studentList');
    list.appendChild(item);
  },

  buildListItem: function(studentName) {
    var item = document.createElement('li');
    item.innerText = studentName;
    return item;
  },
}

megaRoster.init();
