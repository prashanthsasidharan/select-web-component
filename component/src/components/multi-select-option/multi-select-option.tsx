import { Component, h, Host, Element } from "@stencil/core";
import { SelectOption, SelectOptions } from './multi-select-option.interface';
import { Event, EventEmitter, HTMLStencilElement, Prop } from '@stencil/core/internal';

@Component({
  tag : 'multi-select-option',
  styleUrl: 'multi-select-option.css',
  shadow: true
})

export class MultiSelectOption {
  @Element() element: HTMLStencilElement;

  @Event() multiSelectOptionClick: EventEmitter;
  @Event() multiSelectOptMouseEnter: EventEmitter;

  @Prop() value: string;

  handleItemSelect = () => {
    this.multiSelectOptionClick.emit(this.value);
  };

  handleItemMounseEnter = () => {
    this.multiSelectOptMouseEnter.emit(this.value)
  }

  render() {
    return (
    <Host>
      <li
        onClick={this.handleItemSelect}
        onMouseEnter={this.handleItemMounseEnter}
        class="option"
        // class={`option ${
        //   this.isOptionSelected(option) ? "selected" : ""
        // } ${index === this.highlightedIndex ? "highlighted" : ""}`}
      >
        <slot />
      </li>
    </Host>
    )
  }
}