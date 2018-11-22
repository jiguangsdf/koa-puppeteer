
// site: http://jiguang.in
// email: s1@jiguang.in
// updateAt: 2018-11-22:31:24.517Z


'use strict';


const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router')
const router = new Router()

const api = require("./routes/api")


// middlewares
app.use(bodyparser());


// request log
app.use(async (ctx, next) => {
	await next();
	const time = ctx.response.get('X-Response-Time'); 
	console.log(`[puppeteer.app] DEBUG: ${ ctx.ip } ${ctx.method} ${ctx.url} - ${ctx.status} ${ctx.length} ${time} ${ctx.headers['user-agent']}`);
});

// middlewares
app.use(async (ctx, next) => {

	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
	ctx.set('X-Powered-By','Koajs');
	ctx.set('X-Engine-By','Puppeteer');

});

// errorhandler
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = { status: ctx.status ,error: err.name,message: err.message };
		ctx.app.emit("error", err, ctx);
	}
});

// error log
app.on('error', (err, ctx) => {
	console.error('[puppeteer.app] ERROR: ', err.message);
});

// routes
router.use('/',api.routes(),api.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3200,'0.0.0.0',async ()=> {
	
	console.log(`[puppeteer.app] DEBUG: Puppeteer App start in http://0.0.0.0:3200`)
});













