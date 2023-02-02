import { Component, h, Host, State, Prop, Watch, Listen, Event, EventEmitter, Element  } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import { SelectOption, SelectOptions } from './multi-select.interface';

@Component({
  tag : 'multi-select',
  styleUrl: 'multi-select.css',
  shadow: true
})

export class MultiSelect {
  @Element() element: HTMLStencilElement;

  @State() isOpen: boolean = false;

  /** Highlights the items based on index */
  @State() highlightedValue: string = '';
  
  /** Adds multiple select functionality */
  @Prop() multiple;
  
  /** Selected items value */
  @Prop() value;

  /** Handler for clicking an item */
  @Event() change: EventEmitter;

  /** List of items to displayed in the dropdown */
  @Prop() options: SelectOptions = [];

  /** This is the value state used interally, created this to prevent mutating value prop and thereby casuing unnecessary rerenders */
  selectValue: any;

  @Watch('value')
  updateSelectValue() {
    this.selectValue = this.multiple ? JSON.parse(this.value): this.value;
  }

  @Watch('value')
  highlightSelectedItems() {
    if (this.multiple) {
      this.selectValue.forEach((v) => this.addItemClass(v, "selected"));
    } else {
      this.addItemClass(this.selectValue, "selected");
    }
  }

  componentWillLoad() {
    // parsing stingified array for multiple select mode in this hook to update the value even before 
    // the component is rendered to prevent errors
    this.updateSelectValue();
    this.highlightedValue = this.multiple ? this.selectValue[0] : this.selectValue;
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
    this.element.querySelector(`[value=${value}]`)?.shadowRoot.querySelector('li').classList.add(className);
  }

  removeItemClass(value, className) {
    this.element.querySelector(`[value=${value}]`)?.shadowRoot.querySelector('li').classList.remove(className);
  }

  selectOption(option){
    if (this.multiple) {
      if (this.selectValue.includes(option)) {
        this.change.emit(this.selectValue.filter(o => o !== option))
      } else {
        this.change.emit([...this.selectValue, option])
      }
    } else {
      this.removeItemClass(this.value, "selected");
      if (option !== this.selectValue) {
        this.change.emit(option)
      }
    }
  }

  clearOptions() {
    if(this.multiple) {
      let selectedElements = this.element.querySelectorAll('.selected');
      for( let ele=0; ele<selectedElements.length; ele++) {
        selectedElements[ele].classList.remove('selected');
      }

      this.change.emit([]);
    } else {
      this.change.emit(undefined)
    }
  }

  addAccessiblity = (e: KeyboardEvent) => {
    console.log(this.isOpen);
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
          
          let options =  this.element.querySelectorAll('multi-select-option');
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
            ? this.selectValue.map((v, i)=> (
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
            : this.selectValue}
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