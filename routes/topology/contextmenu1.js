//지역 생성 삭제 컨텍스트메뉴
$(function(){
$.contextMenu({
    selector: '#left1',
    trigger: 'left',
    callback: function(key, options) {
      //지역 생성
      if(key =="edit"){
        var myWindow = window.open("windowOpen.html", "myWindow",  "width=400,height=100,left=300, top=200"); //지역생성팝업창.
      }
      //지역 삭제
      else if(key =="delete"){
        var txt;
        var r = confirm("정말로 삭제하시겠습니까 ?");
        if (r == true) {
          txt = "네"; //노드삭제
        } else {
          txt = "아니오"; //노드삭제 취소 원상태
        }
      }
    },
    items: {
        "edit": {name: "지역 추가", icon: "edit"},
        "delete": {name: "지역 삭제", icon: "delete"},
    }
});
});


//
$(function(){
  $.contextMenu({
      selector: '.context-menu-one',
      items: {
          // <input type="text">
          name: {
              name: "Text",
              type: 'text',
              value: "Hello World",
              events: {
                  keyup: function(e) {
                      // add some fancy key handling here?
                      window.console && console.log('key: '+ e.keyCode);
                  }
              }
          },
          sep1: "---------",
          // <input type="checkbox">
          yesno: {
              name: "Boolean",
              type: 'checkbox',
              selected: true
          },
          sep2: "---------",
          // <input type="radio">
          radio1: {
              name: "Radio1",
              type: 'radio',
              radio: 'radio',
              value: '1'
          },
          radio2: {
              name: "Radio2",
              type: 'radio',
              radio: 'radio',
              value: '2',
              selected: true
          },
          radio3: {
              name: "Radio3",
              type: 'radio',
              radio: 'radio',
              value: '3'
          },
          radio4: {
              name: "Radio3",
              type: 'radio',
              radio: 'radio',
              value: '4',
              disabled: true
          },
          sep3: "---------",
          // <select>
          select: {
              name: "Select",
              type: 'select',
              options: {1: 'one', 2: 'two', 3: 'three'},
              selected: 2
          },
          // <textarea>
          area1: {
              name: "Textarea with height",
              type: 'textarea',
              value: "Hello World",
              height: 40
          },
          area2: {
              name: "Textarea",
              type: 'textarea',
              value: "Hello World"
          },
          sep4: "---------",
          key: {
              name: "Something Clickable",
              callback: $.noop
          }
      },
      events: {
          show: function(opt) {
              // this is the trigger element
              var $this = this;
              // import states from data store
              $.contextMenu.setInputValues(opt, $this.data());
              // this basically fills the input commands from an object
              // like {name: "foo", yesno: true, radio: "3", &hellip;}
          },
          hide: function(opt) {
              // this is the trigger element
              var $this = this;
              // export states to data store
              $.contextMenu.getInputValues(opt, $this.data());
              // this basically dumps the input commands' values to an object
              // like {name: "foo", yesno: true, radio: "3", &hellip;}
          }
      }
  });
});
