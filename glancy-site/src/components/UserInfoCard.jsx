import './UserInfoCard.css'
import Avatar from './Avatar.jsx'

function UserInfoCard({ user = {} }) {
  const { username = '', email = '', age = '', gender = '', interests = '', goal = '' } = user

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: save logic
  }

  return (
    <div className="user-card">
      <div className="avatar-area">
        <Avatar width={80} height={80} style={{ borderRadius: '20px' }} />
      </div>
      <form onSubmit={handleSubmit} className="info-form">
        <div className="username">{username}</div>
        <div className="email">{email}</div>
        <div className="basic">
          <div className="item">{age}</div>
          <div className="item">{gender}</div>
          <div className="item">{interests}</div>
          <div className="item">{goal}</div>
        </div>
        <div className="actions">
          <button type="submit" className="save-btn">保存</button>
          <button type="button" className="cancel-btn">取消</button>
        </div>
      </form>
    </div>
  )
}

export default UserInfoCard
