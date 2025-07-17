import './Toolbar.css'

function VoiceInputButton() {
  const handleClick = () => {
    alert('Voice input not implemented')
  }

  return (
    <button className="toolbar-section" onClick={handleClick}>
      🎙️
    </button>
  )
}

export default VoiceInputButton
