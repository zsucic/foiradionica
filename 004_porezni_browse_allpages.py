# Generated by Selenium IDE
import unittest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


class TestPorezni(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.vars = {}

    def tearDown(self):
        self.driver.quit()

    def test_porezni(self):
        self.driver.get("https://duznici.porezna-uprava.hr/fo/svi/1.html")
        self.driver.set_window_size(1920, 1040)
        finalTable=[]
        headerRow=[]
        #now we'll loop untill all pages are exhausted and then we'll break
        while True:
            tableOfInterest = self.driver.find_element(By.CLASS_NAME, "dataTable")
            rowsInTable = tableOfInterest.find_elements(By.TAG_NAME, "tr")
            # we do this only if we haven't stored header before...
            if len(headerRow) == 0:
                ### let's collect the table header first to avoid repeating it later
                for th in rowsInTable[0].find_elements(By.TAG_NAME, "td"):
                    headerRow.append(th.text)
                ### save the headerRow at the beginning of the table
                finalTable.append(headerRow)

            # skip the header row so we start from 1 instead of 0...
            # and skip the last row because it's the nav bar...
            for rowIdx in range(1,len(rowsInTable)-1):
                print("processing row: {} {}".format(rowIdx, rowsInTable[rowIdx].text))
                row=rowsInTable[rowIdx]
                #fetch all the columns in that row
                columnsInRow=row.find_elements(By.TAG_NAME,"td")
                finalRow=[]
                #loop through the columns and fetch their content
                for column in columnsInRow:
                    finalRow.append(column.text)
                #add pure text to our final table...
                finalTable.append(finalRow)
            #once we're done with collecting data from this page, find the buttons on the bottom "navBar"
            navBar=self.driver.find_element(By.CLASS_NAME,"navBarLinks")
            navButtons=navBar.find_elements(By.TAG_NAME,"a")
            #if the last navBar button has ">>" in it's text, it's not the last page, so we click on the one before that...
            if navButtons[-1].text==">>":
                navButtons[-2].click()
            else:
                #otherwise we break as we're done
                break
        for row in finalTable:
            print(row)