"""Debug: ver qué selectores funcionan en Google Maps hoy."""
from playwright.sync_api import sync_playwright
from urllib.parse import quote_plus
import time

url = "https://www.google.com/maps/search/restaurant+villa+carlos+paz/"

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=["--disable-blink-features=AutomationControlled", "--no-sandbox"],
    )
    context = browser.new_context(
        viewport={"width": 1440, "height": 900},
        locale="es-AR",
        user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    )
    context.add_init_script("Object.defineProperty(navigator,'webdriver',{get:()=>undefined})")
    page = context.new_page()
    page.goto(url, wait_until="domcontentloaded", timeout=30000)
    time.sleep(5)

    # Screenshot para ver qué cargó
    page.screenshot(path="/tmp/maps-debug.png", full_page=False)
    print("Screenshot: /tmp/maps-debug.png")

    # Ver qué elementos hay
    print("\n--- Buscando selectores comunes ---")
    for sel in [
        "[role='feed']",
        "[role='article']",
        "a.Nv2PK",
        ".qBF1Pd",
        ".fontHeadlineSmall",
        "div.Nv2PK",
        "a[href*='/maps/place/']",
        "[role='feed'] > div",
        "div[role='article']",
        "a.QeTfA",  # otro selector común
        ".hfpxzc",
    ]:
        els = page.query_selector_all(sel)
        print(f"  {sel}: {len(els)} elementos")

    # Buscar todos los links que parecen ser de places
    print("\n--- Links a /maps/place/ ---")
    place_links = page.query_selector_all("a[href*='/maps/place/']")
    print(f"  {len(place_links)} links a places encontrados")
    for i, link in enumerate(place_links[:3]):
        print(f"  [{i+1}] texto: {link.inner_text()[:80]}")
        print(f"       href: {link.get_attribute('href')[:100]}")

    # Ver el HTML del panel izquierdo (primeros 2000 chars)
    print("\n--- HTML del primer resultado (primeros 3000 chars) ---")
    feed = page.query_selector("[role='feed']")
    if feed:
        html = feed.inner_html()
        print(html[:3000])
    else:
        # Si no hay feed, mostrar todo el body
        print("No hay [role='feed'], mostrando body...")
        body = page.query_selector("body")
        if body:
            print(body.inner_html()[:3000])

    browser.close()
