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
    this.prependChild(list, item);
    f.reset();
    f.studentName.focus();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  buildListItem: function(studentName) {
    var item = document.createElement('li');
    var deleteLink = this.buildLink({
      text: 'remove',
      handler: function(ev) {
        var list = item.parentElement;
        list.removeChild(item);
      }
    });

    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function(ev) {
        item.style.border = '2px CornflowerBlue dashed';
      }
    });

    item.innerText = studentName;
    item.appendChild(deleteLink);
    item.appendChild(promoteLink);
    return item;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = '#';
    link.innerText = options.text;
    link.onclick = options.handler;
    return link;
  },
}

megaRoster.init();
