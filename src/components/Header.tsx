"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import {
  MdOutlineShoppingCart,
  MdPerson,
  MdMenu,
  MdClose,
  MdSearch,
} from "react-icons/md";
import Toast from "@/components/Toast";
import CartDrawer from "@/components/CartDrawer";
import { useRouter } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";

import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const cartCount = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const html = document.documentElement;

    if (menuOpen || cartOpen) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const handleUserClick = () => {
    const sessionEmail = getSessionEmail();

    if (!sessionEmail) {
      router.push("/login?redirect=/account");
      return;
    }

    router.push("/account");
  };

  return (
    <header className={styles.header}>
      {/* TOP ROW */}
      <div className={styles.topRow}>
        {/* LEFT */}
        <div className={styles.left}>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>

          <nav className={styles.nav}>
            <Link
              href="/#products"
              className={styles.navLink}
              onClick={() => {
                setSearchText("");
                setMenuOpen(false);
              }}
            >
              Products
            </Link>

            <span className={styles.navLink}>Daily Deals</span>
            <span className={styles.navLink}>About</span>
            <Link
              href="/contact"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* CENTER */}
        <div className={styles.center}>
          <Link
            href="/?reset=1#products"
            className={styles.logoLink}
            aria-label="Home"
            onClick={() => {
              setSearchText("");
              setMenuOpen(false);
            }}
          >
            <Image
              src="/next-logo-01-01.svg"
              alt="nexa logo"
              width={400}
              height={120}
              className={styles.logoImg}
              priority
            />
          </Link>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <form
            className={styles.searchDesktop}
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchText.trim();
              router.push(
                q ? `/?q=${encodeURIComponent(q)}#products` : "/#products",
              );
              setSearchText("");
            }}
          >
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="What are you looking for today?"
              className={styles.searchInput}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          {/* USER BUTTON */}
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="User"
            onClick={handleUserClick}
          >
            <MdPerson />
          </button>

          {/* CART ICON OPENS DRAWER */}
          <div className={styles.cartWrap}>
            <button
              type="button"
              className={styles.cartLink}
              aria-label="Open cart"
              onClick={openCart}
            >
              <MdOutlineShoppingCart className={styles.cartIcon} />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.toastLayer}>
        <Toast target="header" />
      </div>

      {/* SEARCH ROW (mobile) */}
      <form
        className={styles.searchMobile}
        onSubmit={(e) => {
          e.preventDefault();
          const q = searchText.trim();
          router.push(
            q ? `/?q=${encodeURIComponent(q)}#products` : "/#products",
          );
          setSearchText("");
        }}
      >
        <MdSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="What are you looking for today?"
          className={styles.searchInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>

      {/* MOBILE MENU BACKDROP */}
      {menuOpen && <div className={styles.backdrop} onClick={closeMenu} />}

      {/* MOBILE PANEL */}
      <div className={`${styles.mobilePanel} ${menuOpen ? styles.open : ""}`}>
        <Link
          className={styles.mobileLink}
          href="/#products"
          onClick={() => {
            setSearchText("");
            closeMenu();
          }}
        >
          Products
        </Link>
        <a className={styles.mobileLink} href="#deals" onClick={closeMenu}>
          Daily Deals
        </a>
        <a className={styles.mobileLink} href="#about" onClick={closeMenu}>
          About
        </a>
        <Link
          href="/contact"
          className={styles.mobileLink}
          onClick={() => {
            setSearchText("");
            closeMenu();
          }}
        >
          Contact Us
        </Link>
      </div>

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </header>
  );
}
