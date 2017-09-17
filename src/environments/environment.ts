// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  razorpay_api_key : 'rzp_test_fTKyjp0r9a2HEx',
  google_maps : {
      apiKey: 'AIzaSyDHnk-B5voE01PGVefEjnGvHohVA8QDY8M'
  },
  firebase: {
    apiKey: 'AIzaSyDjWLvY90sbbZOOd8DQ36WZ89tnVfWIGu0',
    authDomain: 'blowhorntest.firebaseapp.com',
    databaseURL: 'https://blowhorntest.firebaseio.com',
    projectId: 'blowhorntest',
    storageBucket: 'blowhorntest.appspot.com',
    messagingSenderId: '322133066794',
  }
};
