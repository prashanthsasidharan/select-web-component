import './App.css';
import { useState } from 'react';

function App() {


  let [singleSelectValue, setSingleSelectValue] = useState('football');
  let [multiSelectValue, setMultiSelectValue] = useState(['football']);
  return (
    <div style={{display: 'flex', gap: '20px', justifyContent:"space-between", flexWrap: 'wrap'}}>
      <select-web 
        value={singleSelectValue}
        onChange={(e) => setSingleSelectValue(e.target.value)}
      >
        <select-web-option value="football">Footbal</select-web-option>
        <select-web-option value="cricket">Cricket</select-web-option>
        <select-web-option value="duster">Duster</select-web-option>
        <select-web-option value="basket">Basket</select-web-option>
      </select-web>

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
    </div>
  );
}

export default App;