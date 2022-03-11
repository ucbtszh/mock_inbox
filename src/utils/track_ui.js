/*  This script tracks eight categories of user interaction events and writes every event to the Realtime DB:
      1. rendered HTML selection
      2. pointer movement (x,y coordinates)
      3. hovering
      4. key presses
      5. clicks
      6. scrolls
      7. screen resizing
      8. window visibility changes
    All above event types are tracked at the parent context level.
    Categories 1 and 5 are also applied at iframe context levels from within Task.vue.  */

import { writeEvent } from "../utils/rtdb";

let events_screensize = [
  "onresize",
  "onfullscreenchange",
  "onmozfullscreenchange",
  "onwebkitfullscreenchange",
  "onmsfullscreenchange",
];
let events_visibility = "visibilitychange";
let events_pointermove = "pointermove";
let events_clicks = [
  "onclick",
  "ondblclick",
  "oncontextmenu",
  "onauxclick"
];
let events_selection = "selectionchange";
let events_keylog = ["onkeydown", "onkeyup"]; // keep just in case
let events_scroll = ["onwheel", "onscroll"];
let events_hover = ["onpointerover", "onpointerout"];

export default {
  mounted() {
    this.selectionHandler = (event) => {
      // handle text selection events on main window
      let selection = document.getSelection();
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        DOM_element: selection.focusNode.nodeValue,
        char_start_index: selection.focusOffset,
        text_selection: selection.toString(),
        selection_type: selection.type
      };
      if (selection.toString() === "" || !selection.focusNode.nodeValue) return;
      else {
        writeEvent(this.$user, "selection", eventData);
        // console.log("selection", eventData)
      }
    };
    this.clickHandler = (event) => {
      // handle click events on main window
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        DOM_element: event.target.tagName,
        DOM_id: event.target.id,
        page_X: event.pageX,
        page_Y: event.pageY
      };
      writeEvent(this.$user, "clicks", eventData);
      // console.log("click", eventData)
    };
    this.hoverHandler = (event) => {
      // handle hover events on main window
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        DOM_element: event.target.tagName,
        DOM_id: event.target.id,
        page_X: event.pageX,
        page_Y: event.pageY,
        pixel_ratio: window.devicePixelRatio
      };
      writeEvent(this.$user, "hovers", eventData);
      // console.log("hover", eventData);
    };
    this.keylogHandler = (event) => {
      // handle key press events on main window
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        DOM_element: event.target.tagName,
        key_value: event.key,
      };
      writeEvent(this.$user, "keylog", eventData);
      // console.log("key", eventData);
    };
    this.pointerCoordsHandler = (event) => {
      // handle pointer movement events on main window
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        page_X: event.pageX,
        page_Y: event.pageY,
        // pressure: event.pressure,
        // pointer_type: event.pointerType,
      };
      writeEvent(this.$user, "pointer_coords", eventData);
      // console.log("pointermove", eventData);
    };
    this.screensizeHandler = (event) => {
      // handle screen size events on main window
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
        pixel_ratio: window.devicePixelRatio,
      };
      writeEvent(this.$user, "screen_resize", eventData);
      // console.log("resize", eventData);
    };
    this.scrollHandler = (event) => {
      // handle scroll events on main window
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        scroll_X: window.pageXOffset,
        scroll_Y: window.pageYOffset,
      };
      writeEvent(this.$user, "scrolls", eventData);
      // console.log("scroll", eventData);
    };
    this.visibilityHandler = (event) => {
      // handle visibility change events on main window
      let status = "";
      if (document.visibilityState === "hidden") {
        status = "hidden";
      }
      if (document.visibilityState === "visible") {
        status = "visible";
      }
      let eventData = {
        // view: this.$route.name,
        ts: event.timeStamp,
        event_name: event.type,
        visibility_state: status,
      };
      writeEvent(this.$user, "visibility", eventData);
      // console.log("visibility", eventData);
    };

    document.addEventListener(events_visibility, this.visibilityHandler);

    document.addEventListener(events_pointermove, this.pointerCoordsHandler);

    document.addEventListener(events_selection, this.selectionHandler);

    Object.keys(window).forEach((key) => {
      if (events_clicks.includes(key)) {
        document.addEventListener(key.slice(2), this.clickHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_hover.includes(key)) {
        document.addEventListener(key.slice(2), this.hoverHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_keylog.includes(key)) {
        document.addEventListener(key.slice(2), this.keylogHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_screensize.includes(key)) {
        window.addEventListener(key.slice(2), this.screensizeHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_scroll.includes(key)) {
        document.addEventListener(key.slice(2), this.scrollHandler);
      }
    });
  },
  beforeDestroy() {
    clearTimeout(this.trackiFrames);
    document.removeEventListener(events_visibility, this.visibilityHandler);
    document.removeEventListener(events_pointermove, this.pointerCoordsHandler);
    document.removeEventListener(events_selection, this.selectionHandler);

    Object.keys(window).forEach((key) => {
      if (events_clicks.includes(key)) {
        document.removeEventListener(key.slice(2), this.clickHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_hover.includes(key)) {
        document.removeEventListener(key.slice(2), this.hoverHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_keylog.includes(key)) {
        document.removeEventListener(key.slice(2), this.keylogHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_screensize.includes(key)) {
        window.removeEventListener(key.slice(2), this.screensizeHandler);
      }
    });
    Object.keys(window).forEach((key) => {
      if (events_scroll.includes(key)) {
        document.removeEventListener(key.slice(2), this.scrollHandler);
      }
    });
  },
};
