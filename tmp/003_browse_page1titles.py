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


class TestFoibrowse(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.vars = {}

    def tearDown(self):
        self.driver.quit()

    def test_foibrowse(self):
        self.driver.get("https://www.foi.unizg.hr/en/news")
        self.driver.set_window_size(1920, 1040)
        newsBlock=self.driver.find_element_by_class_name("view-novosti")
        allNewsOnPage=newsBlock.find_elements_by_class_name("ostalo-naslov")
        for newsOnPage in allNewsOnPage:
            title=newsOnPage.text
            print(title)
        # assert self.driver.find_element(By.LINK_TEXT, "CECIIS 2021 confirmed the international significance of the FOI conference").text == "CECIIS 2021 confirmed the international significance of the FOI conference"
        # self.driver.find_element(By.LINK_TEXT, "next ›").click()
        # assert self.driver.find_element(By.LINK_TEXT, "CECIIS 2020 conference deadline extended").text == "CECIIS 2020 conference deadline extended"
        # self.driver.find_element(By.LINK_TEXT, "last »").click()
