
'use strict';

const puppeteer = require('puppeteer');
const uuidv4 = require('uuid/v4');

async function fullScreenshot(url,filename){

    console.log(`[puppeteer.app.screenshot.full] DEBUG: Screenshoting URL: ${url} Filename: ${filename}`);

    let width = 1920;
    let height = 1080;

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
    // Set resolution
    page.setViewport({width,height});

    try {

        await page.goto(url, {waitUntil: ['domcontentloaded', 'load','networkidle0']});
        await page.screenshot({path: `/app/fullscreenshot/${filename}`,fullPage: true,encoding:'binary',type:'png'});
        browser.close();
        console.log(`[puppeteer.app.screenshot.full] DEBUG: Screenshots successfully URL: ${url} Filename: ${filename}`);
    } catch (e){
        console.log(`[puppeteer.app.screenshot.full] ERROR: Screenshots failed URL: ${url} Error:${e}`); 
    }
}

module.exports = fullScreenshot;