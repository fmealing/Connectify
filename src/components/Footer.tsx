import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#ff8c81] text-text py-12">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="Facebook"
          className="text-2xl"
          style={{ color: "#4267B2" }} // Facebook's official color
          target="_blank" // Open in new tab
          rel="noreferrer" // Security measure
        >
          <FontAwesomeIcon icon={faFacebook} size="xl" />
        </a>
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="Twitter"
          className="text-2xl"
          style={{ color: "#1DA1F2" }} // Twitter's official color
          target="_blank" // Open in new tab
          rel="noreferrer" // Security measure
        >
          <FontAwesomeIcon icon={faTwitter} size="xl" />
        </a>
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="Instagram"
          className="text-2xl"
          style={{ color: "#E1306C" }} // Instagram's official color
          target="_blank" // Open in new tab
          rel="noreferrer" // Security measure
        >
          <FontAwesomeIcon icon={faInstagram} size="xl" />
        </a>
        <a
          href="https://linkedin.com/in/florian-mealing"
          aria-label="LinkedIn"
          className="text-2xl"
          style={{ color: "#0077B5" }} // LinkedIn's official color
          target="_blank" // Open in new tab
          rel="noreferrer" // Security measure
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
