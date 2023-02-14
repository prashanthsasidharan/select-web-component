
# Single and Multi Select Web Component

Compatible select web component which works with any framework or no framework. This component is created using stencilJs 



## Demo

Insert gif or link to demo


## Features
- Single Select
- Multi-select
- Accessiblitiy
- Clear options
- Select/Deselect options


## Usage/Examples

**For Single select in react**,

```

  let [singleSelectValue, setSingleSelectValue] = useState('football');

  return (
    <select-web 
        value={singleSelectValue}
        onChange={(e) => setSingleSelectValue(e.target.value)}
    >
        <select-web-option value="football">Footbal</select-web-option>
        <select-web-option value="cricket">Cricket</select-web-option>
        <select-web-option value="duster">Duster</select-web-option>
        <select-web-option value="basket">Basket</select-web-option>
    </select-web>
  )
```

**For Multi select in react**,

- Pass multipe=true attribute to the select-web component
- As HTML does not allow to pass array as attribute, strigify the array and then pass in value attribute as below

```
let [multiSelectValue, setMultiSelectValue] = useState(['football']);

return (
    <select-web 
        multiple
        value={JSON.stringify(multiSelectValue)}
        onChange={(e) => setMultiSelectValue([...e.target.value])}
    >
        <select-web-option value="football">Footbal</select-web-option>
        <select-web-option value="cricket">Cricket</select-web-option>
        <select-web-option value="duster">Duster</select-web-option>
        <select-web-option value="basket">Basket</select-web-option>
    </select-web>
)
```
## Shortcuts

- `space` / `enter`: toggles the dropdown
- `up`, `down`: navigates up and down the dropdown items
- `enter`: to select/deselect the dropdown item


## Run Locally

Clone the project

```bash
  git clone https://github.com/prashanthsasidharan/select-web-component.git
```

Go to the project directory

```bash
  cd select-web-component
```

Install component dependencies

```bash
  cd component, yarn
```

Component server runs at http://localhost:3000/

```bash
  Yarn start
```

Install Ember-demo dependencies

```bash
  cd ember-demo, yarn
```

Ember-demo server runs at http://localhost:3001/

```bash
  yarn start
```

Install React-demo dependencies

```bash
  cd react-select-demo, yarn
```

React-demo server runs at http://localhost:3002/

```bash
  yarn start
```

Install Plain-js-demo dependencies

```bash
  cd plain-demo
```

Plain-js-demo server runs at http://localhost:3003/

```bash
  yarn start
```

View the app using http://localhost:3000/ in browser tab


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Tech Stack

**Component:** Stencil js

**Demos:** Ember, React, Vanilla js


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/prashanth-sasidharan-7a32301a8/)
[![devto](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white)](https://dev.to/prashan81992916)

## Contributing

Contributions are always welcome!

