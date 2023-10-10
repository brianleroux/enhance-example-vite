import MorphdomMixin from "https://unpkg.com/@enhance/morphdom-mixin@1.1.0/dist/index.js?module=true";
import ShadowElement from 'https://unpkg.com/@enhance/shadow-element@1.0.3/dist/index.js?module=true'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'

let styles = `
  :host {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.lit:hover {
    filter: drop-shadow(0 0 2em #325cffaa);
  }

  .card {
    padding: 2em;
  }

  .read-the-docs {
    color: #888;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }

  ::slotted(h1) {
    font-size: 3.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  }`

export class MyElement extends MorphdomMixin(ShadowElement) {

  static get observedAttributes() {
    return ["docsHint", "count"]
  }

  constructor() {
    super()
    this.docsHint = 'Click on the Vite and Lit logos to learn more'
    this.count = 0
    let button = this.shadowRoot.querySelector('.card button')
    button.addEventListener('click', this.click.bind(this))
  }

  render ({html}) {
    return html`
      <style>${ styles }</style>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button>
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `
  }

  click() {
    this.count += 1
    this.setAttribute('count', this.count)
  }
}

window.customElements.define('my-element', MyElement)
