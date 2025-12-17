from playwright.sync_api import sync_playwright, expect
import time

def verify_neon_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Wait for dev server to be ready
        try:
            page.goto("http://localhost:5173", timeout=10000)
        except:
            time.sleep(5)
            page.goto("http://localhost:5173")

        # Wait for Hero section
        expect(page.locator("#hero")).to_be_visible()

        # Check for Name "YAN YUQI" (It's a HackerText component so text might animate, but eventually stabilize)
        # We can check if the hacker text container exists
        hero_text = page.locator("#hero .text-6xl")
        expect(hero_text).to_be_visible()

        # Take a screenshot of the Hero section
        page.screenshot(path="verification/hero_section.png")

        # Check Language Toggle
        # Click 'CN' button
        page.get_by_role("button", name="CN").click()
        # Verify text changes to Chinese (e.g., '首页' instead of 'HOME' in nav)
        # Nav button 0 is Home/首页
        expect(page.get_by_text("0. 首页")).to_be_visible()

        # Take a screenshot of the Chinese Hero section
        page.screenshot(path="verification/hero_cn.png")

        # Scroll to Work section (Index 3)
        # We can use the nav button to scroll
        page.get_by_text("3. 经历").click()
        time.sleep(2) # Wait for scroll animation

        # Take screenshot of Work timeline
        page.screenshot(path="verification/work_timeline.png")

        # Verify Work Timeline elements
        expect(page.locator("#work")).to_be_visible()
        expect(page.get_by_text("融媒体中心部委")).to_be_visible()

        browser.close()

if __name__ == "__main__":
    verify_neon_ui()
