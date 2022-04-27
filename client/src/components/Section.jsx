import React from 'react'

function Section({ children }) {
  return (
    <div className="section">{children}</div>
  )
}

export function SectionTitle({ children }) {
  return (
    <div className="section__title">{children}</div>
  )
}

export function SectionBody({ children }) {
  return (
    <div className="section__body">{children}</div>
  )
}

export default Section