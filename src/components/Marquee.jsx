export default function Marquee({ text = 'Welcome!' }) {
  return (
    <div className="marquee-wrap">
      <div className="marquee-inner">
        <span className="marquee-text">{text}</span>
        <span className="marquee-text" aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}
