import React, { useState } from 'react';
import './index.css';

import teamImage from './assets/team.jpg'; // add an image named 'team.jpg' in src/assets/
import logo from './assets/logo.png';

const jobs = [
  { id: 1, title: "Frontend Developer", level: "Fresher" },
  { id: 2, title: "Backend Developer", level: "Experienced" },
  { id: 3, title: "UI/UX Designer", level: "Fresher" },
  { id: 4, title: "DevOps Engineer", level: "Experienced" },
];

export default function App() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', jobRole: '', file: null });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData({ name: '', email: '', file: null });
    setSubmitted(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert("File size must be less than 3MB.");
      return;
    }
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.file) {
      setSubmitted(true);
      setTimeout(() => setSelectedJob(null), 2000);
    }
  };

  return (
    <>
      <nav className="navbar">
  <div className="logo">
    <img src={logo} alt="DSEdify Logo" className="logo-img" />
    <span>DSEdify</span>
  </div>
  <a href="#career">Career</a>
</nav>


      <header className="hero" id="career">
        <div className="hero-content">
          <div>
            <h1>Career</h1>
            <p>
              At DSEdify, we empower technology-driven minds to thrive. Our team is built with innovative individuals who collaborate and grow. Whether you're just starting or seasoned with experience, DSEdify offers opportunities that align with your vision. Explore our roles and be part of something transformative. We believe in continuous learning, open culture, and innovation-led growth. We're not just hiring, we're shaping the future of tech education and IT services.
            </p>
          </div>
          <img src={teamImage} alt="Team Meeting" />
        </div>
      </header>

      <section className="jobs">
        <h2>Open Positions</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title} <span>({job.level})</span></h3>
              <button onClick={() => handleApply(job)}>Apply</button>
            </li>
          ))}
        </ul>
      </section>

   {selectedJob && (
  <div className="form-popup">
    <div className="form-container">
      {/* Close button */}
      <button className="close-button" onClick={() => setSelectedJob(null)}>×</button>

      <h2>Apply for a Job Role</h2>

      <form onSubmit={handleSubmit}>
        {/* Job selection dropdown */}
        <label htmlFor="job-select">Select Job Role:</label>
        <select
          id="job-select"
          value={formData.jobRole || selectedJob.title}
          onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
          required
        >
          {jobs.map((job) => (
            <option key={job.id} value={job.title}>
              {job.title} ({job.level})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && <p className="success">Application Submitted Successfully!</p>}
    </div>
  </div>
)}

    </>
  );
}
