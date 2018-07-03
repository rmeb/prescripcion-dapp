import React from 'react';

export default ({loading, label, className = "btn btn-primary btn-block"}) => (
  <button type="submit" className={className} disabled={loading}>{loading ? <i className="fas fa-circle-notch fa-spin"></i> : label}</button>
)
