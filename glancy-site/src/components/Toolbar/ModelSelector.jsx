import { useState } from 'react'
import './Toolbar.css'

function ModelSelector() {
  const [model, setModel] = useState(
    () => localStorage.getItem('dictionaryModel') || 'model-a'
  )

  return (
    <div className="toolbar-section">
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="model-a">Model A</option>
        <option value="model-b">Model B</option>
      </select>
    </div>
  )
}

export default ModelSelector
