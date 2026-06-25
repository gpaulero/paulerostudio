"""
Check website status for each dealership found.
For each: try to fetch the URL, extract title, check viewport, evaluate quality.
"""
import urllib.request
import urllib.error
import ssl
import re
import json
from concurrent.futures import ThreadPoolExecutor, as_completed

# Dealerships with suspected own website URL (those without go directly to "Sin web")
SITES_TO_CHECK = {
    "AutoFamily": "https://autofamily.com.ar",
    "DG Automotores": "https://www.dgautomotores.com.ar",
    "Montironi Ford": "https://montironiford.com",
    "CBA Automotores": "https://cbaautomotores.com.ar",
    "La Falda Automotores": "https://lafaldaautomotores.com",
    "Automotores Chahin (KIA)": "https://www.automotoreschahin.com.ar",
    "Cetrogar Motos": "https://cetrogarmotos.com.ar",
    "SP Automotores (Canva)": "https://spautomotores.my.canva.site",
    "Dos Ruedas La Falda (Wix)": "https://dosruedasconsultas.wixsite.com/dos-ruedas",
    "Automotores Martínez (Google Sites)": "https://sites.google.com/view/automotoresmartinez/p%C3%A1gina-principal",
    "Montironi (corporativo)": "https://montironi.com",
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
    "Accept": "text/html,application/xhtml+xml",
}


def check_site(name: str, url: str) -> dict:
    result = {"name": name, "url": url, "status": None, "title": "", "has_viewport": False,
              "has_meta_desc": False, "is_canva_wix_sites": False, "html_chars": 0,
              "notes": []}
    try:
        req = urllib.request.Request(url, headers=HEADERS, method="GET")
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            html = resp.read(200_000).decode("utf-8", errors="ignore")
            result["status"] = resp.status
            result["html_chars"] = len(html)
            # title
            m = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
            if m:
                result["title"] = m.group(1).strip()[:120]
            # viewport
            if re.search(r'name=["\']viewport["\']', html, re.I):
                result["has_viewport"] = True
            else:
                result["notes"].append("Sin meta viewport (probablemente NO responsive)")
            # meta description
            if re.search(r'name=["\']description["\']\s+content=', html, re.I):
                result["has_meta_desc"] = True
            else:
                result["notes"].append("Sin meta description (SEO débil)")
            # Detect builder platforms
            low = html.lower()
            if "canva" in low or "canva.com" in low:
                result["is_canva_wix_sites"] = True
                result["notes"].append("Hecho en Canva (no es sitio profesional)")
            if "wix.com" in low or "wixsite" in low or "static.wixstatic" in low:
                result["is_canva_wix_sites"] = True
                result["notes"].append("Hecho en Wix (limitado)")
            if "sites.google.com" in url or "google.com/_/sharing" in low:
                result["is_canva_wix_sites"] = True
                result["notes"].append("Google Sites (no es sitio profesional)")
            # Check for HTTPS redirect
            # Check if it's basically a Facebook redirect / parking page
            if "parking" in low and "this domain" in low:
                result["notes"].append("PÁGINA DE PARKING — dominio no usado")
            if "<h1" not in low:
                result["notes"].append("Sin H1 (estructura SEO pobre)")
    except urllib.error.HTTPError as e:
        result["status"] = e.code
        result["notes"].append(f"HTTP error {e.code}")
    except Exception as e:
        result["status"] = "ERR"
        result["notes"].append(f"Error: {str(e)[:80]}")
    return result


def evaluate(result: dict) -> str:
    """Return one of: Excelente / Decente / Obsoleta / Sin web profesional / Inaccesible"""
    if result["status"] == "ERR":
        return "Inaccesible"
    if result["status"] and result["status"] >= 400:
        return "Inaccesible"
    if result["is_canva_wix_sites"]:
        return "Web amateur (Canva/Wix/Google Sites)"
    score = 0
    if result["has_viewport"]:
        score += 1
    if result["has_meta_desc"]:
        score += 1
    if result["html_chars"] > 5000:
        score += 1
    if score >= 3:
        return "Decente"
    if score == 2:
        return "Decente pero simple"
    if score == 1:
        return "Obsoleta / básica"
    return "Obsoleta / básica"


if __name__ == "__main__":
    results = []
    with ThreadPoolExecutor(max_workers=4) as ex:
        futures = {ex.submit(check_site, n, u): n for n, u in SITES_TO_CHECK.items()}
        for f in as_completed(futures):
            r = f.result()
            r["evaluacion"] = evaluate(r)
            results.append(r)
            print(f"✓ {r['name']:<40} → {r['evaluacion']}")
    # Save
    with open("/home/z/my-project/scripts/research/web_check_results.json", "w", encoding="utf-8") as fp:
        json.dump(results, fp, ensure_ascii=False, indent=2)
    print(f"\n=== {len(results)} sitios verificados ===")
    print(f"Guardado en web_check_results.json")
