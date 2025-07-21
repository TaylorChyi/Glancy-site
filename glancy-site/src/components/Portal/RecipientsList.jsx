import { useEffect, useState } from 'react'
import { apiRequest } from '../../api/client.js'
import { API_PATHS } from '../../config/api.js'
import { useLanguage } from '../../LanguageContext.jsx'

function RecipientsList({ onError }) {
  const { t } = useLanguage()
  const [recipients, setRecipients] = useState([])
  const [newEmail, setNewEmail] = useState('')

  const loadRecipients = () => {
    apiRequest(API_PATHS.alertsRecipients)
      .then((data) => setRecipients(data))
      .catch((err) => onError && onError(err.message))
  }

  useEffect(() => {
    loadRecipients()
  }, [])

  const addRecipient = async (e) => {
    e.preventDefault()
    onError && onError('')
    try {
      await apiRequest(API_PATHS.alertsRecipients, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail })
      })
      setNewEmail('')
      loadRecipients()
    } catch (err) {
      onError && onError(err.message)
    }
  }

  const deleteRecipient = async (email) => {
    onError && onError('')
    try {
      await apiRequest(`${API_PATHS.alertsRecipients}/${encodeURIComponent(email)}`, {
        method: 'DELETE'
      })
      loadRecipients()
    } catch (err) {
      onError && onError(err.message)
    }
  }

  return (
    <>
      <h3>Email Recipients</h3>
      <ul>
        {recipients.map((r) => (
          <li key={r}>
            {r}
            <button type="button" onClick={() => deleteRecipient(r)}>
              {t.deleteButton}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={addRecipient}>
        <input
          placeholder="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button type="submit">{t.saveButton}</button>
      </form>
    </>
  )
}

export default RecipientsList
