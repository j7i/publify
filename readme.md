## HSR Project II

_Publify is a simple project offering the possibility to create adverts based on certain categories.  
Basically users can store two types of adverts: demands and seekings which can be published.  
Other users can respond to public advert by contacting the owner._

- [react](https://reactjs.org/)
- [postcss](https://postcss.org/)
- [next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [now](https://zeit.co/docs/v1/getting-started/introduction-to-now/)
- [material-ui](https://github.com/mui-org/material-ui)

## Get started locally

To get started make sure that you've cloned the repository and installed [yarn](https://yarnpkg.com/lang/en/).  
Navigate to the directory of the repository and install the dependencies using the command: `yarn` _(short for `yarn install`)_

As this project is using firebase, make sure you have created a [new firebase project](https://firebase.google.com/docs/web/setup) by your own.  
The next step is to provide your newly created projects credentials:

1. Replace the client credentials inside `lib/@config/firebase/client.js` with your own.
2. Additionally we need to provide the server credentials e.g. as [now-secret](https://zeit.co/docs/v1/getting-started/secrets):  
   _You already installed the required dev-dependency: [now-env](https://github.com/zeit/now-env)_

- Create a file named `now-secrets.json` in the root directory of this repository.
- Inside the file you have to store your server credentials as base64 string which you've downloaded via [firebase serviceaccounts](https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk).

Your secrets file should look like this:

```
{
  "@server_credentials": "credentials-as-base64-string",
  "@google_maps_api_key": "google-api-key-with-access-to-your-maps-api"
}
```

Now you're ready to run `yarn dev` to serve publify locally.
