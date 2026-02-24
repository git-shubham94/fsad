import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParticipationForm = () => {
  const { students, addParticipation, activityCategories } = useAppContext();

  const [formData, setFormData] = useState({
    studentId: '',
    activityName: '',
    activityCategory: '',
    role: '',
    duration: '',
    skills: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const participationData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean)
    };

    addParticipation(participationData);

    toast.success('🎉 Participation added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    });

    setFormData({
      studentId: '',
      activityName: '',
      activityCategory: '',
      role: '',
      duration: '',
      skills: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="form-container">
        <h2>➕ Add Participation Record</h2>
        <p className="form-description">
          Record student club activities and event participations
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Select Student *</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a student</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNumber}) - {s.department}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Activity Name *</label>
            <input
              type="text"
              name="activityName"
              value={formData.activityName}
              onChange={handleChange}
              placeholder="e.g., Coding Club, Football Team"
              required
            />
          </div>

          <div className="form-group">
            <label>Activity Category *</label>
            <select
              name="activityCategory"
              value={formData.activityCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity Type</option>
              {activityCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Role / Position *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., President, Member, Captain"
              required
            />
          </div>

          <div className="form-group">
            <label>Duration *</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 1 year, 6 months"
              required
            />
          </div>

          <div className="form-group">
            <label>Skills Gained *</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., Leadership, Teamwork, Communication"
              required
            />
            <small style={{ color: '#7f8c8d', fontSize: '12px', marginTop: '5px', display: 'block' }}>
              Separate multiple skills with commas
            </small>
          </div>

          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <button
  type="submit"
  className="custom-btn custom-btn-primary full-width"
>
  Add Participation
</button>

        </form>
      </div>
    </>
  );
};

export default ParticipationForm;
