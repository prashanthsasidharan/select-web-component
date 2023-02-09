import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked singleSelectValue = 'football';
  @tracked multiSelectValue = ['football'];

  get stringifiedMultiSelectValue() {
    return JSON.stringify(this.multiSelectValue);
  }

  @action
  singleSelectHandler(e) {
    this.singleSelectValue = e.target.value
  }
  @action
  multiSelectHandler(e) {
    this.singleSelectValue = e.target.value
  }
}