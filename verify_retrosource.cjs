const { chromium } = require('./node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  // Home page
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.screenshot({ path: './verify_home.png', fullPage: true });

  const header = await page.locator('.header').count();
  const crt = await page.locator('.home__crt').count();
  const arcade = await page.locator('.arcade-body').count();
  const carousel = await page.locator('.carousel').count();
  const newsTitle = await page.locator('.home__news-header h1').textContent().catch(() => 'not found');

  console.log('HOME: header=' + header + ' crt=' + crt + ' arcade=' + arcade + ' carousel=' + carousel);
  console.log('HOME: title=' + newsTitle);

  // Products page
  await page.goto('http://localhost:3002/products', { waitUntil: 'networkidle' });
  await page.screenshot({ path: './verify_products.png', fullPage: true });

  const prodTitle = await page.locator('.product-display__title').textContent().catch(() => 'not found');
  const prodPrice = await page.locator('.product-display__price').textContent().catch(() => 'not found');
  const navBtns = await page.locator('.arcade-body__nav-btn').count();
  const abBtns = await page.locator('.arcade-body__action-btn').count();

  console.log('PRODUCTS: title=' + prodTitle + ' price=' + prodPrice);
  console.log('PRODUCTS: navBtns=' + navBtns + ' A/B=' + abBtns);

  // Right nav
  await page.locator('#btn_right').click();
  await page.waitForTimeout(300);
  const nextTitle = await page.locator('.product-display__title').textContent().catch(() => 'not found');
  console.log('PRODUCTS: after right nav title=' + nextTitle);
  await page.screenshot({ path: './verify_products_nav.png', fullPage: true });

  // Wishlist (A)
  await page.locator('#buttonA').click();
  await page.waitForTimeout(500);
  const wishText = await page.locator('.product-display__action-btn').first().textContent().catch(() => '');
  console.log('PRODUCTS: after A wishlist btn=' + wishText.trim());

  // Cart (B)
  await page.locator('#buttonB').click();
  await page.waitForTimeout(500);
  const cartOpen = await page.locator('.cart-aside.open').count();
  console.log('PRODUCTS: cartOpen=' + cartOpen);
  await page.screenshot({ path: './verify_cart.png', fullPage: true });

  // Close cart, test filter
  await page.locator('.cart-aside__close').click().catch(() => {});
  await page.waitForTimeout(200);
  await page.locator('.filter-toggle-btn').click();
  await page.waitForTimeout(300);
  const filterOpen = await page.locator('.filter-panel.open').count();
  console.log('PRODUCTS: filterOpen=' + filterOpen);
  await page.screenshot({ path: './verify_filter.png', fullPage: true });

  // FAQ
  await page.goto('http://localhost:3002/faq', { waitUntil: 'networkidle' });
  const faqItems = await page.locator('.faq-item').count();
  await page.locator('.faq-question').first().click();
  await page.waitForTimeout(200);
  const faqAnswer = await page.locator('.faq-answer').count();
  console.log('FAQ: items=' + faqItems + ' answer_open=' + faqAnswer);
  await page.screenshot({ path: './verify_faq.png', fullPage: true });

  // 404
  await page.goto('http://localhost:3002/does-not-exist', { waitUntil: 'networkidle' });
  const err404 = await page.locator('.error-page').count();
  console.log('404: error-page=' + err404);
  await page.screenshot({ path: './verify_404.png', fullPage: true });

  await browser.close();
  console.log('Screenshots saved.');
})();
