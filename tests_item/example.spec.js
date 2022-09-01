// @ts-check
const { test, expect } = require('@playwright/test');

// const baseURL = "https://kashi-invoice.netlify.app"
const baseURL = "http://localhost:3000"

const { itemsRoute, addItemRoute } = require("../src/mocks/itemHandlers.js");

test.beforeEach(async ({ page }) => {
  await itemsRoute(page);
  await addItemRoute(page);
});



test('test', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto(baseURL);
  // Click text=Item
  await page.locator('text=Item').click();
  await expect(page).toHaveURL(`${baseURL}/item`);
  // Click [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').click();
  // Select name
  await page.locator('select').selectOption('name');
  // Click [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').click();
  // Fill [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').fill('');
  // Select description
  await page.locator('select').selectOption('description');
  // Click [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').click();
  // Fill [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').fill('nice');
  // Double click button >> nth=2
  await page.locator('button').nth(2).dblclick();
  // Double click button >> nth=1
  await page.locator('button').nth(1).dblclick();
  // Select name
  await page.locator('select').selectOption('name');
  // Click [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').click();
  // Fill [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').fill('');
  // Click text=Add Item
  await page.locator('text=Add Item').click();
  await expect(page).toHaveURL(`${baseURL}/addItem`);
  // Click [placeholder="Name"]
  await page.locator('[placeholder="Name"]').click();
  // Fill [placeholder="Name"]
  await page.locator('[placeholder="Name"]').fill('surfExcel');
  // Click [placeholder="price"]
  await page.locator('[placeholder="price"]').click();
  // Fill [placeholder="price"]
  await page.locator('[placeholder="price"]').fill('299');
  // Click [placeholder="Description"]
  await page.locator('[placeholder="Description"]').click();
  // Fill [placeholder="Description"]
  await page.locator('[placeholder="Description"]').fill('good product');
  // Click text=Save Item
  await page.locator('text=Save Item').click();
  await expect(page).toHaveURL(`${baseURL}/item`);
  // Select name
  await page.locator('select').selectOption('name');
  // Click [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').click();
  // Fill [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').fill('surfExcel');
  // expect(await page.locator("tr").count()).toEqual(2);
});





// test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/React App/);

//   // create a locator
//   const getStarted = page.locator('a', { hasText: 'Item' });
//   // const getStarted = page.locator('text=Item');

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute('href', "/item");

//   // Click the get started link.
//   await getStarted.click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*item/);
// });