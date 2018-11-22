
'use strict';

const puppeteer = require('puppeteer');
const uuidv4 = require('uuid/v4');

async function pdf(url,width,height,filename,format){

    console.log(`[puppeteer.app.pdf] DEBUG: Saving PDF URL: ${url} Filename: ${filename}`);

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
        // format 的优先级高于 width,height 如果设置了，将覆盖 width 和 height 配置 默认是 'Letter'。
        await page.pdf({path: `/app/pdf/${filename}`,format: format?format:null,headerTemplate:`${page.url} ${page.title}`,width:width,height:height});
        browser.close();
        console.log(`[puppeteer.app.pdf] DEBUG: Save PDF successfully URL: ${url} Filename: ${filename}`);
    } catch (e){
        console.log(`[puppeteer.app.pdf] ERROR: Save PDF failed URL: ${url} Error:${e}`); 
    }
}

module.exports = pdf;