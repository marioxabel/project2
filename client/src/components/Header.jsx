import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <Link to="/childpage">Child Page</Link>
      <Link to="/parentpage">Parent Page</Link>
      <p>
        
      </p>
    </div>
  )
}