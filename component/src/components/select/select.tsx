import { Component, h, Host, State, Prop, Watch, Listen, Event, EventEmitter, Element  } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";

@Component({
  tag : 'select-web',
  styleUrl: 'select.css',
  shadow: true
})

export class MultiSelect {
  @Element() element: HTMLStencilElement;

  @State() isOpen: boolean = false;

  /** Highlights the items based on index */
  @State() highlightedValue: string = '';
  
  /** Adds multiple select functionality */
  @Prop() multiple = false;
  
  /** Selected items value */
  @Prop({ mutable: true}) value;

  /** Handler for clicking an item */
  @Event() change: EventEmitter;

  /** List of items to displayed in the dropdown */
  @Prop() options = [];

  @Watch('value')
  updatevalue() {
    if (this.multiple && typeof this.value === 'string') {
      this.value = JSON.parse(this.value);
    }
  }

  @Watch('value')
  highlightSelectedItems() {
    if (this.multiple) {
      this.value.forEach((v) => this.addItemClass(v, "selected"));
    } else {
      this.addItemClass(this.value, "selected");
    }
  }

  componentWillLoad() {
    // parsing stingified array for multiple select mode in this hook to update the value even before 
    // the component is rendered to prevent errors
    this.updatevalue();
    this.highlightedValue = this.multiple ? this.value[0] : this.value;
  }

  componentDidLoad() {
    this.highlightSelectedItems();
  }

  @Listen('multiSelectOptionClick')
  handleItemSelected(event) {
    event.stopPropagation();
    this.selectOption(event.detail);
  }

  @Listen('multiSelectOptMouseEnter')
  highlightMouseEnteredItem(event) {
    // remove highligh class from previously highlighted element and add it to the mouse enterd element
    this.removeItemClass(this.highlightedValue, "highlighted")
    this.highlightedValue = event.detail;
    this.addItemClass(this.highlightedValue, "highlighted");
  }

  addItemClass(value, className) {
    value && this.element.querySelector(`[value=${value}]`)?.shadowRoot.querySelector('li').classList.add(className);
  }

  removeItemClass(value, className) {
    value && this.element.querySelector(`[value=${value}]`)?.shadowRoot.querySelector('li').classList.remove(className);
  }

  selectOption(option){
    if (this.multiple) {
      if (this.value.includes(option)) {
        this.removeItemClass(option, 'selected');
        this.value = this.value.filter(o => o !== option);
      } else {
        this.value = [...this.value, option];
      }
    } else {
      this.removeItemClass(this.value, "selected");
      if (option !== this.value) {
        this.value = option;
      }
    }
    this.change.emit(this.value);
  }

  clearOptions() {
    if(this.multiple) {
      let items = this.element.children;
      for( let ele=0; ele<items.length; ele++) {
        this.removeItemClass(items[ele].getAttribute('value'), 'selected');
      }
      this.value = [];
    } else {
      this.value = '';
    }
    this.change.emit(this.value);
  }

  addAccessiblity = (e: KeyboardEvent) => {
    switch (e.code) {
      case "Enter":
      case "Space":
        if (this.isOpen) this.selectOption(this.highlightedValue)
        this.isOpen = !this.isOpen;
        break
      case "ArrowUp":
      case "ArrowDown": {
        if (!this.isOpen) {
          this.isOpen = true;
          break
        }
        let options =  this.element.querySelectorAll('select-web-option');
        let highlightedElement = this.element.querySelector(`[value=${this.highlightedValue}]`);
        let highlightedIndex = 0; 
        options.forEach((op, index) => {
          if (highlightedElement == op) {
            highlightedIndex = index
          }
        });

        const newValue =  highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
        if (newValue >= 0 && newValue < options.length) {
          this.highlightMouseEnteredItem({detail: options[newValue].getAttribute('value')});
        }
        break
      }
      case "Escape":
        this.isOpen = false;
        break
    }
  }

  render() {
    return (
    <Host
      onBlur={() => this.isOpen = false}
      onClick={() => this.isOpen = !this.isOpen}
      onKeyDown={this.addAccessiblity}
      tabIndex={0}
    >
      <div class="container">
        <span class="value">
          {this.multiple
            ? this.value.map((v, i)=> (
                <button
                  key={i}
                  onClick={() => {
                    this.removeItemClass(v, "selected")
                    this.selectOption(v)
                  }}
                  class="option-badge"
                >
                  {v}
                  <span class="remove-btn">&times;</span>
                </button>
              ))
            : this.value}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            this.clearOptions();
            this.isOpen = false;
          }}
          class="clear-btn"
        >
          &times;
        </button>
        <div class="divider"></div>
        <div class="caret"></div>
        <ul class={`options ${this.isOpen ? 'show' : ""}`}>
          <slot />
        </ul>
      </div>
    </Host>
    )
  }
}

