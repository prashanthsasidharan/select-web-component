import { Component, h, Host, Element } from "@stencil/core";
import { Event, EventEmitter, HTMLStencilElement, Prop } from '@stencil/core/internal';

@Component({
  tag : 'select-web-option',
  styleUrl: 'select-option.css',
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
      >
        <slot />
        <div id="tick-mark"></div>
      </li>
    </Host>
    )
  }
}