import './Toolbar.css'
import { useLanguage } from '../../LanguageContext.jsx'

function VoiceInputButton() {
  const { t } = useLanguage()
  const handleClick = () => {
    alert(t.voiceNotImplemented)
  }

  return (
    <button className="toolbar-section" onClick={handleClick}>
      🎙️
    </button>
  )
}

export default VoiceInputButton
