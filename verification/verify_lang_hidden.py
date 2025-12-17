from playwright.sync_api import sync_playwright, expect
import time

def verify_lang_toggle_hidden():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Wait for dev server to be ready
        try:
            page.goto("http://localhost:5174", timeout=10000)
        except:
            time.sleep(5)
            page.goto("http://localhost:5174")

        # Wait for Hero section
        expect(page.locator("#hero")).to_be_visible()

        # Check that 'CN' button is NOT visible
        # We look for the button with text "CN"
        cn_button = page.get_by_role("button", name="CN")

        # It should be hidden or not attached. Since we added 'hidden' class to parent,
        # the button itself is still in DOM but not visible (display: none).
        expect(cn_button).not_to_be_visible()

        # Take a screenshot to verify UI cleanliness
        page.screenshot(path="verification/hero_no_lang.png")

        browser.close()

if __name__ == "__main__":
    verify_lang_toggle_hidden()
