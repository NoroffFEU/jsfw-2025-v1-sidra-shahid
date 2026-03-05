import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Left column */}
        <div className={styles.col}>
          <div className={styles.brand}>
            <Image
              src="/next-white-logo-01.svg"
              alt="Company logo"
              width={140}
              height={40}
              className={styles.logo}
              priority
            />
          </div>

          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <MdLocationOn className={styles.icon} />
              <span>Sundet 38, 3619 Kongsberg</span>
            </li>

            <li className={styles.infoItem}>
              <MdPhone className={styles.icon} />
              <span>+47 45867128</span>
            </li>

            <li className={styles.infoItem}>
              <MdEmail className={styles.icon} />
              <span>info@nexa.com</span>
            </li>
          </ul>
        </div>

        {/* Middle column */}
        <div className={styles.col}>
          <h4 className={styles.heading}>HELPFUL LINKS</h4>
          <ul className={styles.linkList}>
            <li>
              <Link className={styles.link} href="/#products">
                Products
              </Link>
            </li>

            <li className={styles.textItem}>Find a Store</li>
            <li className={styles.textItem}>Features</li>
            <li className={styles.textItem}>Privacy Policy</li>
            <li className={styles.textItem}>Blog</li>
            <li className={styles.textItem}>Press Kit</li>
          </ul>
        </div>

        {/* Right column */}
        <div className={styles.col}>
          <h4 className={styles.heading}>SHOP</h4>
          <ul className={styles.linkList}>
            <li className={styles.textItem}>About Us</li>
            <li className={styles.textItem}>Career</li>
            <li className={styles.textItem}>Shipping Methods</li>
            <li className={styles.textItem}>Contact</li>
            <li className={styles.textItem}>Support</li>
            <li className={styles.textItem}>Retailer</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} NEXT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
