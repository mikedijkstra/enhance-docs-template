/* global HTMLElement, DOMParser, document, customElements */
import SearchForm from "../elements/site-search-form.mjs";
import SearchResultsList from "../elements/site-search-results.mjs";
import li from "../elements/site-search-result.mjs";
import API from "./api.mjs";
const api = API();

function nodeFromString(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstElementChild;
}

class EnhanceElement extends HTMLElement {
  constructor() {
    super();
    this.storeChangedCallback = this.storeChangedCallback.bind(this);
    const templateName = `${this.tagName.toLowerCase()}-template`;
    const template = document.getElementById(templateName);
    if (template) {
      this.template = template;
    } else {
      this.template = document.createElement("template");
      this.template.innerHTML = this.render({
        html: this.html,
        state: this.state,
      });
      this.template.setAttribute("id", templateName);
    }
  }

  html(strings, ...values) {
    const collect = [];
    for (let i = 0; i < strings.length - 1; i++) {
      collect.push(strings[i], values[i]);
    }
    collect.push(strings[strings.length - 1]);
    return collect.join("");
  }

  get state() {
    const attrs = this.attributes.length
      ? this.attrsToObject(this.attributes)
      : {};
    const store = this.api?.store || {};

    return {
      attrs,
      store,
    };
  }

  attrsToObject(attrs = []) {
    const attrsObj = {};
    for (let d = attrs.length - 1; d >= 0; d--) {
      let attr = attrs[d];
      attrsObj[attr.nodeName] = attr.nodeValue;
    }
    return attrsObj;
  }

  storeChangedCallback() {}
  render() {}
}

class SearchFormElement extends EnhanceElement {
  constructor() {
    super();
    this.api = api;
    this.submit = this.submit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.focus = this.focus.bind(this);
    this.addEventListener("submit", this.submit);
    this.form = this.querySelector("form");
    this.textInput = this.querySelector('input[type="text"]');
    this.textInput.addEventListener("focus", this.focus);
  }

  render(args) {
    return SearchForm(args);
  }

  connectedCallback() {
    //this.textInput.focus();
  }

  focus() {}

  resetForm() {
    this.textInput.value = "";
    //this.textInput.focus();
  }

  submit(e) {
    e.preventDefault();
    this.api.create(this.form);
  }
}

customElements.define("site-search-form", SearchFormElement);

class SearchResultList extends EnhanceElement {
  keys = ["searchResults"];
  constructor() {
    super();
    this.api = api;
    this.api.subscribe(this.storeChangedCallback, this.keys);
    this.list = this.querySelector("ul");
  }

  storeChangedCallback(store = {}) {
    const { searchResults = [] } = store;

    const items = this.querySelectorAll("li");
    items.forEach((item) => {
      this.list.removeChild(item);
    });

    searchResults.forEach((t) => {
      this.list.append(nodeFromString(li(t)));
    });
  }

  render(args) {
    return SearchResultsList(args);
  }
}

customElements.define("site-search-results", SearchResultList);
