const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sos2021-sep-mcc.herokuapp.com/');
    await page.screenshot({ path: './tests/fotolocalhost.png' });

    const[response] = await Promise.all([
        page.waitForNavigation(),
        page.click("#apis > div > div > div.row > div > div > a"),
    ]);
    await page.waitForTimeout(1000);

    await page.screenshot({ path: './tests/psychologyclick.png' });

    var rowCount = (await page.$$("body > main > main > table > tbody > tr")).length;

    console.log(`Inital row count=  ${rowCount}`);

    await page.focus('#country');
    await page.keyboard.type("Melilla");

    await page.focus('#year');
    await page.keyboard.type("2018");

    await page.focus('#psychology_women');
    await page.keyboard.type("7");

    await page.focus('#psychology_men');
    await page.keyboard.type("8");

    await page.focus('#psychology_population');
    await page.keyboard.type("10");

    /*await page.$eval('#country', el => el.value = "Melilla");
    await page.$eval('#year', el => el.value = "2018");
    await page.$eval('#psychology_women', el => el.value = "7");
    await page.$eval('#psychology_men', el => el.value ="8");
    await page.$eval('#psychology_population', el => el.value = "10");*/

    await page.screenshot({ path: './tests/psychologydata.png' });

    await page.waitForTimeout(1000);

    await page.click("#addPsychology"),
    


    await page.waitForTimeout(2000);

    await page.screenshot({ path: './tests/psychologydataadded.png' });

    await browser.close();
})();