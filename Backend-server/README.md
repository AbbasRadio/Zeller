# Zeller React Native Code Challenge

## 1. Goal
Your goal is to build a React Native app that displays and filters a list of users. Designs for the application are provided, and the user list and filtering should be achieved by connecting to a provided Graphql endpoint. We are most interested in the way you structure your code, your use of typescript, and your approach to testing. 

## 2. Requirements
- Your app should display a list of users that are returned by the listZellerCustomers query. The graphql schema you will need, and the connection details can be found in aws-exports.js and schema.gql
- Your app should have a list of selectable user types that include Admin and Manager. Selecting a user type should perform a query against listZellerCustomers using that user type as a filter. 
- Your app should run on IOS or android
- Designs for the user feature are provided below (4). If you wish to add navigation, navigation bars, drawers etc, feel free to do so.
- Tests are VERY important
- Make sure to have clean and readable source code

## 3. Bonus Points

These features are absolutely not required, however if you finish your project eary and wish to continue, here are some ideas

- Implement App navigation with a second, empty homescreen
- Implemenent a text search box that filters users by name
- Implement a pull to refresh on the list
 

## 4. Designs
![alt text](zeller-customers-design.png)



