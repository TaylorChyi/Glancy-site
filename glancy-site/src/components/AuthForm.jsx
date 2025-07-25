import { useState } from 'react'
import PhoneInput from './PhoneInput.jsx'
import CodeButton from './CodeButton.jsx'
import MessagePopup from './MessagePopup.jsx'
import { Button } from './index.js'
import styles from '../AuthPage.module.css'

function AuthForm({
  method,
  placeholders,
  secretType = 'password',
  secretPlaceholder,
  showCodeButton = () => false,
  onSendCode,
  onSubmit,
  validateAccount
}) {
  const [account, setAccount] = useState('')
  const [secret, setSecret] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateAccount && !validateAccount(account)) {
      setPopupMsg('Invalid account')
      setPopupOpen(true)
      return
    }
    setPopupMsg('')
    try {
      await onSubmit({ account, secret })
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles['auth-form']}>
        {method === 'phone' ? (
          <PhoneInput value={account} onChange={setAccount} />
        ) : (
          <input
            className={styles['auth-input']}
            placeholder={placeholders[method]}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        )}
        <div className={styles['password-row']}>
          <input
            className={styles['auth-input']}
            type={secretType}
            placeholder={
              typeof secretPlaceholder === 'function'
                ? secretPlaceholder(method)
                : secretPlaceholder
            }
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          {showCodeButton(method) && <CodeButton onClick={onSendCode} />}
        </div>
        <Button type="submit" className={styles['auth-primary-btn']}>
          Continue
        </Button>
      </form>
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}

export default AuthForm
