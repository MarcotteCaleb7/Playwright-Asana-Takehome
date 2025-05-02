import { test, expect, type Page } from '@playwright/test'
import { SignInPage } from '../pages/SignInPage'
import testData from '../data/testData.json'

test.describe('Asana Takehome', () => {
  let signInPage: SignInPage

  for (let testName in testData){

    test(testName, async ({ page }) => {
      //Initialize test data, sign in, and go to relevant application page
      signInPage = new SignInPage(page)
      let thisTestData=testData[testName]
      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/')
      await signInPage.signIn(thisTestData.credentials.username, thisTestData.credentials.password)
      await page.locator(`button:has-text("${thisTestData.page}")`).click()

      //Assert that column contains entry with expected name
      let column = page.locator('div[class="flex flex-col w-80 bg-gray-50 rounded-lg p-4"]', {hasText: thisTestData.column})
      let entry = column.locator('div[class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"]', {hasText: thisTestData.name})
      await expect(entry).toHaveCount(1)
      
      //Assert that entry contrains expected tags
      let tags = entry.locator('div[class="flex flex-wrap gap-2 mb-3"] > span')
      expect(await tags.allInnerTexts()).toEqual(thisTestData.tags)
    })
  }

})

