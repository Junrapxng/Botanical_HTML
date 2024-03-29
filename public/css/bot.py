from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import datetime

# Set the path to the ChromeDriver executable (replace with your own path)
chromedriver_path = 'D:/Users/Bom/Downloads/chromedriver.exe'

# URL of the login page
login_url = 'http://sportbooking.mfu.ac.th/login.php?d1=1'

# Your login credentials
username = '6331501042'
password = 'f'

# Define the desired time to run the script (24-hour format)
desired_time = "10:10"  # For example, 9:00 AM

# Calculate the number of seconds until the desired time
now = datetime.datetime.now()
desired_datetime = datetime.datetime.strptime(desired_time, "%H:%M")
time_difference = desired_datetime - now

# Sleep until the desired time
if time_difference.total_seconds() > 0:
    time.sleep(time_difference.total_seconds())

# Create a Chrome WebDriver instance
driver = webdriver.Chrome(executable_path=chromedriver_path)

# Navigate to the login page
driver.get(login_url)

# Find the username and password input fields by their HTML attributes
username_field = driver.find_element_by_id('username')  # Replace with the actual HTML attribute of the username field
password_field = driver.find_element_by_id('password')  # Replace with the actual HTML attribute of the password field

# Input your credentials
username_field.send_keys(username)
password_field.send_keys(password)

# Submit the form (assuming it's a standard HTML form with a submit button)
password_field.send_keys(Keys.RETURN)

# Optionally, you can add a delay to see the result
time.sleep(5)

# Close the browser
driver.quit()
