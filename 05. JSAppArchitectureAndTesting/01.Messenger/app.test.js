const expect = require('chai').expect;
const {chromium} = require('playwright-chromium');

const options = { headless : false, slowMo : 200 };
//url has to be change, based of your url server for testing
let url = 'http://127.0.0.1:5500/01.Messenger/index.html';

describe('UI testing of Messenger application:', function(){
    this.timeout(10000);

    let browser, page;

    before(async () => browser = await chromium.launch());
    beforeEach(async () => page = await browser.newPage());

    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it('Should load initial messeges after refresh button is clicked', async() =>{
        await page.goto(url);

        await page.click('#refresh');
        
        let actual = await page.inputValue('#messages');
        let expected = 'Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))';

        expect(actual.includes(expected)).to.be.true;
        
    });

    it('Should send correct request to the server when send button is clicked', async () => {
        
        await page.goto(url);
        await page.fill('#author', 'testAuthor');
        await page.fill('#content', 'testContent');

        let [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('#submit')
        ]);

        const data = JSON.parse(request.postData());
        
        expect(data.author).to.be.equal('testAuthor');
        expect(data.content).to.be.equal('testContent');
        
    });

    it('Should append new message to the edn of the textarea', async () => {
        await page.goto(url);

        await page.fill('#author', 'uniqueAuthor');
        await page.fill('#content', 'uniqueContent');

        await page.click('#submit');

        await page.click('#refresh');

        let textAreaValue = await page.inputValue('#messages');

        let actual = textAreaValue.split('\n').pop();
        let expected = `uniqueAuthor: uniqueContent`;

        expect(actual).to.be.equal(expected);
    });
})