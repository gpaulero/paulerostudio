"""Recaptura Compucity cerrando popups y esperando más."""
import asyncio
from playwright.async_api import async_playwright
import os

OUT_DIR = "/home/z/my-project/public"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
        )
        page = await context.new_page()

        print("→ Cargando www.compucityonline.com...")
        await page.goto("https://www.compucityonline.com", wait_until="domcontentloaded", timeout=45000)
        
        # Esperar a que cargue el contenido principal
        await page.wait_for_timeout(4000)
        
        # Intentar cerrar popups/modals comunes
        popup_closed = False
        # Selectores típicos de botones de cerrar popup
        close_selectors = [
            'button:has-text("Cerrar")',
            'button:has-text("Close")',
            'button:has-text("X")',
            '[aria-label="Close"]',
            '[aria-label="close"]',
            '.modal-close',
            '.popup-close',
            '.close-button',
            'button.close',
            'button[title="Cerrar"]',
            'button[title="Close"]',
            'svg[aria-label="close"]',
            '.mfp-close',
            '.dismiss',
        ]
        for selector in close_selectors:
            try:
                el = page.locator(selector).first
                if await el.is_visible(timeout=500):
                    await el.click(timeout=1000)
                    print(f"  ✓ Popup cerrado con selector: {selector}")
                    popup_closed = True
                    await page.wait_for_timeout(1500)
                    break
            except Exception:
                continue
        
        if not popup_closed:
            # Intentar Escape
            await page.keyboard.press("Escape")
            print("  → Intenté cerrar con Escape")
            await page.wait_for_timeout(1500)
        
        # Hacer scroll suave para disparar lazy-load
        await page.evaluate("window.scrollTo(0, 100)")
        await page.wait_for_timeout(800)
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1500)
        
        # Capturar
        out_path = os.path.join(OUT_DIR, "project-compucity-real.png")
        await page.screenshot(path=out_path, full_page=False)
        size_kb = os.path.getsize(out_path) // 1024
        print(f"✅ Captura nueva: {out_path} ({size_kb} KB)")
        
        await context.close()
        await browser.close()

asyncio.run(main())
