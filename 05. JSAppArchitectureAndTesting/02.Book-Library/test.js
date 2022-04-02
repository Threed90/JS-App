const expect = require('chai').expect;
const {chromium} = require('playwright-chromium');
//url has to be change, based of your url server for testing
const url = 'http://127.0.0.1:5500/02.Book-Library/index.html';
const options = { headless: true, slowMo: 200 }

describe('UI testing of book library application:', function(){
    
    this.timeout(20000);

    let browser, page;

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());

    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it("Should load all each author's and book's data in a row", async () => {
        await page.goto(url);
        await page.click('#loadBooks');

        const rows = page.locator('tbody tr');

        const texts = await rows.allTextContents();

        let isContainFirstRow = texts[0].includes("Harry Potter and the Philosopher's Stone") && texts[0].includes('J.K.Rowling');
        let isContainSecondRow = texts[1].includes('C# Fundamentals') && texts[1].includes('Svetlin Nakov');

        expect(isContainFirstRow).to.be.true;
        expect(isContainSecondRow).to.be.true;
    });

    it('Should send correct http request when submit button is clicked', async () => {
        await page.goto(url);
        await page.fill('input[name="title"]', 'testTitle');
        await page.fill('input[name="author"]', 'testAuthor');

        let [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Submit')
        ]);

        const data = JSON.parse(request.postData());

        expect(data.title).to.be.equal('testTitle');
        expect(data.author).to.be.equal('testAuthor');
    });

    it('Should add new book to the table when it is submitted and load book button is pressed', async () => {
        await page.goto(url);
        await page.click('#loadBooks');
        let rows = page.locator('tbody tr');
        let numOfRowsBeforeNewBook = await rows.count();

        await page.fill('input[name="title"]', 'testTitle');
        await page.fill('input[name="author"]', 'testAuthor');
        await page.click('text=Submit');
        await page.click('#loadBooks');

        //let rowsAfterNewBook = page.locator('tbody tr');
        //let numOfBooksAfterNewBook = await rowsAfterNewBook.count();

        let expected = numOfRowsBeforeNewBook + 1;
        let actual = await rows.count();

        expect(actual).to.be.equal(expected);
    });

    it('Should not add new book if any of input fields are empty', async () => {
        await page.goto(url);
        await page.click('#loadBooks');
        let rows = page.locator('tbody tr');
        let numOfRowsBeforeNewBook = await rows.count();

        await page.fill('input[name="title"]', 'testTitle');
        await page.fill('input[name="author"]', '');
        await page.click('text=Submit');
        await page.click('#loadBooks');

        
        let numOfBooksAfterNewBook = await rows.count();

        let expected = numOfRowsBeforeNewBook;
        let actual = numOfBooksAfterNewBook;

        expect(actual).to.be.equal(expected);
    });


    it('Should fill the inputs when edit button is clicked', async () => {
        await page.goto(url);
        await page.click('#loadBooks');

        await page.click('.editBtn');

        

        let title = await page.inputValue('#editForm input[name="title"]');
        let author = await page.inputValue('#editForm input[name="author"]');

        

        expect(title.includes("Harry Potter and the Philosopher's Stone")).to.be.true;
        expect(author.includes("J.K.Rowling")).to.be.true;
    });

    it('Edit button should change the row content', async () =>{
        await page.goto(url);
        await page.click('#loadBooks');

        await page.click('.editBtn');

        await page.fill('#editForm input[name="title"]', "Harry Potter and the Philosopher's Stone testInfo");
        
        await page.click('text=Save');
        await page.click('#loadBooks');
        let rows = page.locator('tbody tr');
        const texts = await rows.allTextContents();

        expect(texts[0].includes('testInfo')).to.be.true;
    });

    it('Delete bottun should delete the row of data', async () => {
        await page.goto(url);
        await page.click('#loadBooks');

        let rows = page.locator('tbody tr');
        let countBefore = await rows.count();
        
        page.on('dialog', dialog => dialog.accept());
        await page.click('tbody tr:last-of-type td:nth-of-type(3) .deleteBtn');

        await page.click('#loadBooks');
        let countAfter = await rows.count();

        expect(countAfter).to.be.equal(countBefore - 1);
    });
})