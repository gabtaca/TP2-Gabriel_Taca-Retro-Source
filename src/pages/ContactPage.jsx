export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="contact-info__item">
            <strong>Address:</strong>
            <span>1234 Arcade Avenue, Montreal, QC, Canada H1A 2B3</span>
          </div>

          <div className="contact-info__item">
            <strong>Phone:</strong>
            <a href="tel:+15141234567">(514) 123-4567</a>
          </div>

          <div className="contact-info__item">
            <strong>Email:</strong>
            <a href="mailto:hello@retrosource.ca">hello@retrosource.ca</a>
          </div>

          <div className="contact-info__item">
            <strong>Hours:</strong>
            <span>Mon – Fri, 9am – 6pm EST</span>
          </div>

          <div className="contact-info__map">
            <p>📍 Visit us at our retro arcade on Arcade Avenue!</p>
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
              Map integration coming soon.
            </p>
          </div>
      </div>
    </div>
  );
}
