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
    this.prependChild(this.rosterElement, item);
    f.reset();
    f.studentName.focus();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  buildListItem: function(studentName) {
    var item = document.createElement('li');
    item.innerText = studentName;
    this.appendLinks(item);

    return item;
  },

  promote: function(item) {
    this.prependChild(this.rosterElement, item);
  },

  moveUp: function(item) {
    var previousElement = item.previousElementSibling;
    this.rosterElement.insertBefore(item, previousElement);
  },

  moveDown: function(item) {
    this.moveUp(item.nextElementSibling);
  },

  appendLinks: function(item) {
    var deleteLink = this.buildLink({
      text: 'remove',
      handler: function(ev) {
        this.rosterElement.removeChild(item);
      }
    });

    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function() {
        this.promote(item);
      }
    });

    item.appendChild(deleteLink);
    item.appendChild(promoteLink);

    item.appendChild(this.buildLink({
      text: 'up',
      handler: function() {
        this.moveUp(item);
      }
    }));

    item.appendChild(this.buildLink({
      text: 'down',
      handler: function() {
        this.moveDown(item);
      }
    }));
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = '#';
    link.innerText = options.text;
    link.onclick = options.handler.bind(this);
    return link;
  },
}

megaRoster.init('#studentList');
