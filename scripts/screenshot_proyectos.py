"""Captura screenshots de los 2 proyectos en producción."""
import asyncio
from playwright.async_api import async_playwright
import os

OUT_DIR = "/home/z/my-project/public"
os.makedirs(OUT_DIR, exist_ok=True)

PROYECTOS = [
    {
        "name": "project-compucity-real.png",
        "url": "https://www.compucityonline.com",
        "selector": None  # full page
    },
    {
        "name": "project-etersomos-real.png",
        "url": "https://www.etersomos.com",
        "selector": None
    }
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for proy in PROYECTOS:
            context = await browser.new_context(
                viewport={"width": 1280, "height": 800},
                user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
            )
            page = await context.new_page()
            try:
                await page.goto(proy["url"], wait_until="networkidle", timeout=30000)
                await page.wait_for_timeout(2000)  # extra para animaciones
                out_path = os.path.join(OUT_DIR, proy["name"])
                # Screenshot solo del viewport (no full page) para que se vea como lo vería un user
                await page.screenshot(path=out_path, full_page=False)
                size_kb = os.path.getsize(out_path) // 1024
                print(f"✅ {proy['name']} ({size_kb} KB)")
            except Exception as e:
                print(f"❌ {proy['name']}: {e}")
            finally:
                await context.close()
        await browser.close()

asyncio.run(main())
