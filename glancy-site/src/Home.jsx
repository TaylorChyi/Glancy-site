import './components/Layout.css'

function Home() {
  return (
    <>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Where should we begin?</h1>
      <form className="input-box">
        <input type="text" placeholder="Ask anything" />
        <button type="button" className="icon-btn">🎤</button>
        <button type="submit" className="icon-btn">📶</button>
      </form>
    </>
  )
}

export default Home
