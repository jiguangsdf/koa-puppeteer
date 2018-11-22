
'use strict';

const puppeteer = require('puppeteer');
const uuidv4 = require('uuid/v4');

async function render(url){

    console.log(`[puppeteer.app.render] DEBUG: Rendering: ${url}`);

    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true,
        args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--enable-features=NetworkService',
        '-—disable-dev-tools'
        ]
    });

    const page = await browser.newPage();

    // 暂停所有媒体缓冲
    page.frames().forEach((frame) => {
        frame.evaluate(() => {
          document.querySelectorAll('video, audio').forEach(m => {
            if (!m) return;
            if (m.pause) m.pause();
            m.preload = 'none';
          });
         });
        });

    try {
    	// await 50 seconds for spiders default: 30000
        await page.goto(url, {timeout:50000,waitUntil: ['domcontentloaded', 'load','networkidle0']});
        // 获取原始内容
        let raw = true;
        if (raw){
            // 去处块级作用域影响
            var content = page.content()
        } else {
            // 净化页面
            var content = await page.evaluate(() => {
                let content = '';
                if (document.doctype) {
                    content = new XMLSerializer().serializeToString(document.doctype);
                }
                const doc = document.documentElement.cloneNode(true);
                // Remove scripts except JSON-LD
                const scripts = doc.querySelectorAll('script:not([type="application/ld+json"])');
                scripts.forEach(s => s.parentNode.removeChild(s));
                // Remove import tags
                const imports = doc.querySelectorAll('link[rel=import]');
                imports.forEach(i => i.parentNode.removeChild(i));
                const { origin, pathname } = location;
                // Inject <base> for loading relative resources
                if (!doc.querySelector('base')){
                        const base = document.createElement('base');
                base.href = origin + pathname;
                doc.querySelector('head').appendChild(base);
                }
                // Try to fix absolute paths
                const absEls = doc.querySelectorAll('link[href^="/"], script[src^="/"], img[src^="/"]');
                absEls.forEach(el => {
                const href = el.getAttribute('href');
                const src = el.getAttribute('src');
                if (src && /^\/[^/]/i.test(src)){
                el.src = origin + src;
                } else if (href && /^\/[^/]/i.test(href)){
                el.href = origin + href;
                }
                });
                content += doc.outerHTML;
                // Remove comments
                content = content.replace(/<!--[\s\S]*?-->/g, '');

                    return content;
                })
            }

        console.log(`[puppeteer.app.render] DEBUG: Render successfully URL: ${url}`);
        return content;
    } catch (e){
        console.log(`[puppeteer.app.render] ERROR: Render failed URL: ${url} Error:${e}`);
        return 'render error';
    }
}

module.exports = render;


