import './Toolbar.css'

function ClearButton({ onClear }) {
  return (
    <button className="toolbar-section" onClick={onClear}>
      Clear
    </button>
  )
}

export default ClearButton
