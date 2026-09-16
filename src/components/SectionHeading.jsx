export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="section-heading reveal">
      {label && <div className="section-heading__label">{label}</div>}
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
