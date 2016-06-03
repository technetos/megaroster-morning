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
    var span = document.createElement('span');
    span.innerText = studentName;
    span.className = 'studentName';
    item.appendChild(span);
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

  toggleEditable: function(el) {
    var toggleElement = el.parentElement.querySelector('.toggleEdit');
    if (el.contentEditable === "true") {
        el.contentEditable = "false";
        toggleElement.innerHTML = "edit";
    } else {
        el.contentEditable = "true";
        toggleElement.innerHTML = "update";
        el.focus();
    }
  },

  appendLinks: function(item) {
    var span = document.createElement('span');
    span.className = 'actions';

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

    span.appendChild(deleteLink);
    span.appendChild(promoteLink);

    span.appendChild(this.buildLink({
      text: 'up',
      className: 'up',
      handler: function() {
        if (item !== this.rosterElement.firstElementChild) {
          this.moveUp(item);
        }
      }
    }));

    span.appendChild(this.buildLink({
      text: 'down',
      className: 'down',
      handler: function() {
        if (item !== this.rosterElement.lastElementChild) {
          this.moveDown(item);
        }
      }
    }));

    span.appendChild(this.buildLink({
      text: 'edit',
      className: 'toggleEdit',
      handler: function() {
        this.toggleEditable(item.querySelector('span.studentName'));
      }
    }));

    item.appendChild(span);
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = '#';
    link.innerText = options.text;
    link.onclick = options.handler.bind(this);
    link.className = options.className;
    return link;
  },
}

megaRoster.init('#studentList');
