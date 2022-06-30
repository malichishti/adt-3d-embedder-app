# adt-3d-embedder-app

This is a quick React App to show how to **embed** Azure Dgital Twins 3d scene into any app.

# Pre-req

It is expected that you have ADT setup and the 3d Scene running as per https://docs.microsoft.com/en-us/azure/digital-twins/how-to-use-3d-scenes-studio

# Setup App Registration

1. Create App Registration as per https://docs.microsoft.com/azure/digital-twins/how-to-create-app-registration-portal
2. Choose Single-page application and add your app base URL or redirect URL e.g. http://localhost:3000 
3. Add API permissions as below:
<img width="242" alt="image" src="https://user-images.githubusercontent.com/17155996/176611791-76f74671-47d5-4a94-bdfd-0ac5616d37ce.png">

5. Give **Storage Blob Data Owner** access to the App Registration on the Storage Account. Check [this](https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal?tabs=current) to see how Role assignments are done.
6. Give **Azure Digital Twins Data Owner** access to the App Registration on the ADT service.

# Enable CORS on Storage

Add your app base url e.g. http://localhost:3000 into the CORS for the Storage account in Azure like below:

<img width="558" alt="image" src="https://user-images.githubusercontent.com/17155996/176610425-3c4ddfab-902c-427c-9cd6-9b969f0ed083.png">

# Configure and Run the app

Update the .env file with your settings, i have left my settings in to give you an example of what is expected. Most of the settings would come from the app registeration created above. Once .env file has been updated run `npm start` in the root folder.

In the browser, go to the url as below:

> http://localhost:3000/?sceneId=PUT_SCENE_ID_HERE

In order to get a scene Id go to your 3d Scene builder and click on the Share button in **View** mode. The share url would have a scene Id in it which you can use above.

Now you are ready to use this app to learn how to embed the ADT 3d Scene Viewer in your App or just use this app as an embedder into any iframe.

Example:
![image](https://user-images.githubusercontent.com/17155996/176613123-61e34867-cc58-487b-ae75-49f79397aa03.png)


# Links
https://docs.microsoft.com/en-us/azure/digital-twins/how-to-use-3d-scenes-studio#embed-scenes-in-custom-applications
