import { useState, useEffect } from 'react'
import { useUser } from '../context/AppContext.jsx'
import PaymentModal from './PaymentModal.jsx'
import './UpgradeModal.css'
import { useLanguage } from '../LanguageContext.jsx'

function UpgradeModal({ open, onClose }) {
  const { user } = useUser()
  const currentPlan = user?.plan || 'free'
  const [selected, setSelected] = useState(currentPlan)
  const [payOpen, setPayOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    if (open) {
      setSelected(currentPlan)
    }
  }, [open, currentPlan])

  if (!open) return null

  const plans = [
    { id: 'free', label: 'Free' },
    { id: 'month', label: 'Monthly \u00a520' },
    { id: 'quarter', label: 'Quarterly \u00a550' },
    { id: 'year', label: 'Yearly \u00a5180' }
  ]

  const confirm = () => {
    if (selected !== currentPlan) {
      setPayOpen(true)
    } else {
      onClose()
    }
  }

  return (
    <div className="upgrade-overlay" onClick={onClose}>
      <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{t.choosePlan}</h3>
        <div className="plans">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`plan${p.id === currentPlan ? ' current' : ''}${
                selected === p.id ? ' selected' : ''}`}
              onClick={() => setSelected(p.id)}
            >
              {p.label}
            </div>
          ))}
        </div>
        <div className="actions">
          <button type="button" onClick={confirm}>{t.confirm}</button>
          <button type="button" onClick={onClose}>{t.cancelButton}</button>
        </div>
        <PaymentModal
          open={payOpen}
          onClose={() => {
            setPayOpen(false)
            onClose()
          }}
        />
      </div>
    </div>
  )
}

export default UpgradeModal
