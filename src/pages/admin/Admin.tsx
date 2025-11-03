import { useNavigate } from 'react-router-dom'
import './admin.scss'

const Admin = () => {
  const navigate = useNavigate()

  return (
    <div className="admin-center-container admin-panel-flex">
      <h2 className="admin-title">Admin Panel</h2>
      <div className="admin-btn-row">
        <button
          className="admin-big-btn"
          onClick={() => navigate('/admin/tekshirshga')}
        >
          Tekshirish
        </button>
        <button
          className="admin-big-btn green"
          onClick={() => navigate('/admin/qoshishga')}
        >
          Qoshish
        </button>
      </div>
    </div>
  )
}

export default Admin