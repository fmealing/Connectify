import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#ff8c81] text-text py-12 relative w-full">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="Facebook"
          className="text-2xl"
          style={{ color: "#4267B2" }}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} size="xl" />
        </a>
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="Twitter"
          className="text-2xl"
          style={{ color: "#1DA1F2" }}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} size="xl" />
        </a>
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="Instagram"
          className="text-2xl"
          style={{ color: "#E1306C" }}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} size="xl" />
        </a>
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="LinkedIn"
          className="text-2xl"
          style={{ color: "#0077B5" }}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} size="xl" />
        </a>
      </div>

      {/* Links */}
      <ul className="flex justify-center space-x-6 mb-4">
        <li>
          <a href="/" className="hover:text-primary">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-primary">
            About
          </a>
        </li>
        <li>
          <a href="/services" className="hover:text-primary">
            Services
          </a>
        </li>
        <li>
          <a href="/team" className="hover:text-primary">
            Team
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-primary">
            Contact
          </a>
        </li>
      </ul>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500">
        © 2024 Florian Mealing. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
