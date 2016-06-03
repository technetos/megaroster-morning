$(document).foundation()

var megaRoster = {
  init: function(rosterElementSelector) {
    this.rosterElement = document.querySelector(rosterElementSelector);
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
    this.prependToList(item);
    f.reset();
    f.studentName.focus();
  },

  prependToList: function(newItem) {
    this.rosterElement.insertBefore(newItem, this.rosterElement.firstChild);
  },

  buildListItem: function(studentName) {
    var item = document.createElement('li');
    item.innerText = studentName;
    this.appendLinks(item);

    return item;
  },

  promote: function(studentItem) {
    studentItem.remove();
    this.prependToList(studentItem);
  },

  moveUp: function(studentItem) {
    var previousElement = studentItem.previousElementSibling;
    studentItem.remove();
    this.rosterElement.insertBefore(studentItem, previousElement);
  },

  moveDown: function(studentItem) {
    var nextElement = studentItem.nextElementSibling;
    studentItem.remove();
    this.rosterElement.insertBefore(studentItem, nextElement.nextElementSibling);
  },

  appendLinks: function(item) {
    var deleteLink = this.buildLink({
      text: 'remove',
      handler: function(ev) {
        this.rosterElement.removeChild(item);
      }.bind(this)
    });

    var promoteLink = this.buildLink({
      text: 'promote',
      handler: this.promote.bind(this, item)
    });

    var moveUpLink = this.buildLink({
      text: 'up',
      handler: this.moveUp.bind(this, item)
    });

    var moveDownLink = this.buildLink({
      text: 'down',
      handler: this.moveDown.bind(this, item)
    });

    item.appendChild(deleteLink);
    item.appendChild(promoteLink);
    item.appendChild(moveUpLink);
    item.appendChild(moveDownLink);
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = '#';
    link.innerText = options.text;
    link.onclick = options.handler;
    return link;
  },
}

megaRoster.init('#studentList');
