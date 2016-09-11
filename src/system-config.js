// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    'angular2-jwt': 'vendor/angular2-jwt',
    'ts-md5': 'vendor/ts-md5',
};
/** User packages configuration. */
var packages = {
    "vendor/angular2-jwt": {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'angular2-jwt.js'
    },
    "vendor/ts-md5": {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'md5.js'
    },
};
// const paths: any = {
//  'app/*': 'app/*'
// }
// const packageConfigPaths: any = [
//   // '../node_modules/angular2-jwt/package.json'
// ]
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app',
    'app/shared',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ defaultJSExtensions: true, map: map, packages: packages });
